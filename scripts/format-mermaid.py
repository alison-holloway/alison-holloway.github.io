#!/usr/bin/env python3
"""
Mermaid Diagram Formatter

Formats Mermaid diagrams in Markdown files according to the style guide.
See docs/mermaid-style-guide.md for formatting rules.

Usage:
    python format-mermaid.py [options] [paths...]

Options:
    --dry-run       Preview changes without modifying files
    --validate      Check conformance and exit with code 1 if issues found
    --diff          Show unified diff of changes
    --verbose, -v   Verbose output
"""

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from difflib import unified_diff
from pathlib import Path
from typing import Dict, List, Optional, Tuple


# =============================================================================
# Configuration - Based on mermaid_template_latest.mmd
# =============================================================================

# Template uses NO init block - diagrams start directly with flowchart
# Set to None to omit init block entirely
CANONICAL_INIT_BLOCK = None

INDENT = "  "  # 2 spaces (matching template)

# Color palette from template
# #235789 (blue) - brand blue, used for main arrows and node text
# #F1D302 (yellow) - used for content node borders, workflow arrows
# #C1292E (red) - used for workflow node borders, cross-ref arrows

# Standard style classes from template (two types)
STANDARD_CLASSDEFS = {
    # Main content nodes: white fill, yellow border, blue text
    'chapter': 'fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold',
    # Workflow/process nodes: white fill, red border, blue text
    'workflowNode': 'fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold',
}

# Link styles from template (indexed by connection type)
# Main arrows: thick brand blue
LINKSTYLE_MAIN = 'stroke:#235789,stroke-width:3px'
# Workflow/section jumps: yellow, thick, dashed
LINKSTYLE_WORKFLOW = 'stroke:#F1D302,stroke-width:2.5px,stroke-dasharray:6,5'
# Cross-references: red, thick, dotted
LINKSTYLE_CROSSREF = 'stroke:#C1292E,stroke-width:2.5px,stroke-dasharray:2,5'

# Enforce standard colors - replace custom classDef names with standard ones
ENFORCE_STANDARD_COLORS = True


# =============================================================================
# Data Structures
# =============================================================================

@dataclass
class DiagramElement:
    """Base class for diagram elements."""
    element_type: str
    raw_text: str
    line_number: int
    indent_level: int = 0


@dataclass
class Comment(DiagramElement):
    """A comment line: %% text"""
    text: str = ""


@dataclass
class NodeDefinition(DiagramElement):
    """Node definition: ID["Label"] or ID([Label]) etc."""
    node_id: str = ""
    label: Optional[str] = None
    shape_start: str = "["
    shape_end: str = "]"


@dataclass
class Connection(DiagramElement):
    """Connection between nodes: A --> B"""
    source: str = ""
    target: str = ""
    arrow: str = "-->"
    label: Optional[str] = None


@dataclass
class SubgraphStart(DiagramElement):
    """subgraph ID["Label"]"""
    subgraph_id: str = ""
    label: Optional[str] = None


@dataclass
class SubgraphEnd(DiagramElement):
    """end keyword"""
    pass


@dataclass
class ClassDef(DiagramElement):
    """classDef name properties;"""
    class_name: str = ""
    properties: str = ""


@dataclass
class ClassApplication(DiagramElement):
    """class node1,node2 className;"""
    node_ids: List[str] = field(default_factory=list)
    class_name: str = ""


@dataclass
class LinkStyle(DiagramElement):
    """linkStyle indices properties"""
    indices: List[int] = field(default_factory=list)
    properties: str = ""


@dataclass
class DiagramDeclaration(DiagramElement):
    """flowchart TB or graph LR"""
    diagram_type: str = "flowchart"
    direction: str = "TB"


@dataclass
class OtherLine(DiagramElement):
    """Any line we don't specifically parse but preserve."""
    pass


@dataclass
class InitBlock:
    """The %%{init: ...}%% configuration block."""
    theme: str = "default"
    theme_variables: Dict[str, str] = field(default_factory=dict)
    raw_text: str = ""


@dataclass
class MermaidDiagram:
    """A complete parsed Mermaid diagram."""
    source_file: Path
    start_line: int
    end_line: int
    raw_content: str
    init_block: Optional[InitBlock] = None
    declaration: Optional[DiagramDeclaration] = None
    elements: List[DiagramElement] = field(default_factory=list)


@dataclass
class FormatResult:
    """Result of formatting a single diagram."""
    original: str
    formatted: str
    changed: bool
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)


@dataclass
class FileResult:
    """Result of processing a single file."""
    file_path: Path
    diagrams_found: int
    diagrams_changed: int
    original_content: str
    formatted_content: str
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)


# =============================================================================
# Parser
# =============================================================================

class MermaidParser:
    """Parses Mermaid diagram content into structured representation."""

    # Regex patterns
    INIT_BLOCK_PATTERN = re.compile(
        r'%%\{init:\s*(\{.*?\})\s*\}%%',
        re.DOTALL
    )

    DIAGRAM_DECL_PATTERN = re.compile(
        r'^(flowchart|graph)\s*(TB|BT|LR|RL|TD)?\s*$',
        re.IGNORECASE
    )

    COMMENT_PATTERN = re.compile(r'^(\s*)%%\s*(.*)$')

    SUBGRAPH_START_PATTERN = re.compile(
        r'^(\s*)subgraph\s+(\w+)(?:\s*\["([^"]+)"\]|\s*\[([^\]]+)\])?\s*$',
        re.IGNORECASE
    )

    SUBGRAPH_END_PATTERN = re.compile(r'^(\s*)end\s*$', re.IGNORECASE)

    # Node patterns - various shapes
    NODE_PATTERNS = [
        # Stadium shape: ID([Label]) or ID(["Label"])
        re.compile(r'^(\s*)(\w+)\s*\(\[\s*"?([^"\]]*)"?\s*\]\)\s*$'),
        # Trapezoid forward: ID[/"Label"/] - must match before generic rectangle
        re.compile(r'^(\s*)(\w+)\s*\[/\s*"?([^"]*)"?\s*/\]\s*$'),
        # Trapezoid reverse: ID[\"Label"\] - must match before generic rectangle
        re.compile(r'^(\s*)(\w+)\s*\[\\\s*"?([^"]*)"?\s*\\\]\s*$'),
        # Rectangle with quotes: ID["Label"]
        re.compile(r'^(\s*)(\w+)\s*\[\s*"([^"]*)"\s*\]\s*$'),
        # Rectangle without quotes: ID[Label]
        re.compile(r'^(\s*)(\w+)\s*\[\s*([^\]]+)\s*\]\s*$'),
        # Bare node: ID
        re.compile(r'^(\s*)(\w+)\s*$'),
    ]

    # Connection patterns
    CONNECTION_PATTERNS = [
        # With label: A -->|"label"| B or A -->|label| B
        re.compile(
            r'^(\s*)(\w+)\s*(-->|<-->|-.->|---|-\.->)\s*\|"?([^"|]+)"?\|\s*(\w+)\s*$'
        ),
        # Dotted with inline label: A -. "label" .- B
        re.compile(
            r'^(\s*)(\w+)\s*(-\.)\s*"?([^"]+)"?\s*(\.-|-\.->)\s*(\w+)\s*$'
        ),
        # Simple: A --> B
        re.compile(
            r'^(\s*)(\w+)\s*(-->|<-->|-.->|---|-\.->|<-\.->)\s*(\w+)\s*$'
        ),
    ]

    CLASSDEF_PATTERN = re.compile(
        r'^(\s*)classDef\s+(\w+)\s+(.+?);?\s*$',
        re.IGNORECASE
    )

    CLASS_APPLY_PATTERN = re.compile(
        r'^(\s*)class\s+([\w,\s]+)\s+(\w+);?\s*$',
        re.IGNORECASE
    )

    LINKSTYLE_PATTERN = re.compile(
        r'^(\s*)linkStyle\s+([\d,\s]+|default)\s+(.+?)\s*$',
        re.IGNORECASE
    )

    def parse(self, content: str, source_file: Path, start_line: int = 0) -> MermaidDiagram:
        """Parse Mermaid content into structured representation."""
        diagram = MermaidDiagram(
            source_file=source_file,
            start_line=start_line,
            end_line=start_line,
            raw_content=content
        )

        # Extract init block if present
        init_match = self.INIT_BLOCK_PATTERN.search(content)
        if init_match:
            diagram.init_block = self._parse_init_block(init_match)
            # Remove init block from content for further parsing
            content = content[:init_match.start()] + content[init_match.end():]

        # Parse line by line
        lines = content.split('\n')
        current_indent = 0

        for i, line in enumerate(lines):
            line_num = start_line + i
            stripped = line.strip()

            if not stripped:
                continue

            # Calculate indent level
            indent_spaces = len(line) - len(line.lstrip())
            indent_level = indent_spaces // 4

            element = self._parse_line(line, stripped, line_num, indent_level)
            if element:
                if isinstance(element, DiagramDeclaration):
                    diagram.declaration = element
                else:
                    diagram.elements.append(element)

        diagram.end_line = start_line + len(lines) - 1
        return diagram

    def _parse_init_block(self, match: re.Match) -> InitBlock:
        """Parse the init block JSON."""
        init_block = InitBlock(raw_text=match.group(0))
        try:
            # Parse the JSON-like content
            json_str = match.group(1)
            # Handle JavaScript-style booleans
            json_str = json_str.replace('true', 'True').replace('false', 'False')
            data = eval(json_str)  # Safe here as we control input

            init_block.theme = data.get('theme', 'default')
            init_block.theme_variables = data.get('themeVariables', {})
        except Exception:
            pass  # Keep defaults
        return init_block

    def _parse_line(self, line: str, stripped: str, line_num: int,
                    indent_level: int) -> Optional[DiagramElement]:
        """Parse a single line into a DiagramElement."""

        # Diagram declaration
        decl_match = self.DIAGRAM_DECL_PATTERN.match(stripped)
        if decl_match:
            return DiagramDeclaration(
                element_type='declaration',
                raw_text=line,
                line_number=line_num,
                indent_level=0,
                diagram_type=decl_match.group(1).lower(),
                direction=decl_match.group(2) or 'TB'
            )

        # Comment
        comment_match = self.COMMENT_PATTERN.match(line)
        if comment_match:
            return Comment(
                element_type='comment',
                raw_text=line,
                line_number=line_num,
                indent_level=indent_level,
                text=comment_match.group(2)
            )

        # Subgraph start
        subgraph_match = self.SUBGRAPH_START_PATTERN.match(line)
        if subgraph_match:
            label = subgraph_match.group(3) or subgraph_match.group(4)
            return SubgraphStart(
                element_type='subgraph_start',
                raw_text=line,
                line_number=line_num,
                indent_level=indent_level,
                subgraph_id=subgraph_match.group(2),
                label=label
            )

        # Subgraph end
        if self.SUBGRAPH_END_PATTERN.match(line):
            return SubgraphEnd(
                element_type='subgraph_end',
                raw_text=line,
                line_number=line_num,
                indent_level=indent_level
            )

        # classDef
        classdef_match = self.CLASSDEF_PATTERN.match(line)
        if classdef_match:
            return ClassDef(
                element_type='classdef',
                raw_text=line,
                line_number=line_num,
                indent_level=indent_level,
                class_name=classdef_match.group(2),
                properties=classdef_match.group(3).rstrip(';')
            )

        # class application
        class_match = self.CLASS_APPLY_PATTERN.match(line)
        if class_match:
            nodes = [n.strip() for n in class_match.group(2).split(',')]
            return ClassApplication(
                element_type='class_apply',
                raw_text=line,
                line_number=line_num,
                indent_level=indent_level,
                node_ids=nodes,
                class_name=class_match.group(3)
            )

        # linkStyle
        linkstyle_match = self.LINKSTYLE_PATTERN.match(line)
        if linkstyle_match:
            indices_str = linkstyle_match.group(2)
            # Handle 'default' keyword vs numeric indices
            if indices_str.lower() == 'default':
                indices = []  # Empty list means 'default'
            else:
                indices = [int(i.strip()) for i in indices_str.split(',')]
            return LinkStyle(
                element_type='linkstyle',
                raw_text=line,
                line_number=line_num,
                indent_level=indent_level,
                indices=indices,
                properties=linkstyle_match.group(3)
            )

        # Connections (check before nodes since connections contain node IDs)
        for pattern in self.CONNECTION_PATTERNS:
            conn_match = pattern.match(line)
            if conn_match:
                return self._parse_connection(conn_match, line, line_num, indent_level)

        # Nodes
        for pattern in self.NODE_PATTERNS:
            node_match = pattern.match(line)
            if node_match:
                return self._parse_node(node_match, line, line_num, indent_level)

        # Unrecognized - preserve as-is
        return OtherLine(
            element_type='other',
            raw_text=line,
            line_number=line_num,
            indent_level=indent_level
        )

    def _parse_node(self, match: re.Match, line: str, line_num: int,
                    indent_level: int) -> NodeDefinition:
        """Parse a node definition."""
        groups = match.groups()
        node_id = groups[1]
        label = groups[2] if len(groups) > 2 else None

        # Determine shape markers based on the syntax used in the line
        if '([' in line:
            shape_start, shape_end = '([', '])'
        elif '[/' in line and '/]' in line:
            # Trapezoid with forward slashes: [/"label"/]
            shape_start, shape_end = '[/', '/]'
        elif '[\\' in line and '\\]' in line:
            # Reverse trapezoid: [\"label"\]
            shape_start, shape_end = '[\\', '\\]'
        else:
            shape_start, shape_end = '[', ']'

        return NodeDefinition(
            element_type='node',
            raw_text=line,
            line_number=line_num,
            indent_level=indent_level,
            node_id=node_id,
            label=label,
            shape_start=shape_start,
            shape_end=shape_end
        )

    def _parse_connection(self, match: re.Match, line: str, line_num: int,
                          indent_level: int) -> Connection:
        """Parse a connection."""
        groups = match.groups()

        # Different patterns have different group structures
        if len(groups) == 5:  # Labeled connection: A -->|label| B
            source = groups[1]
            arrow = groups[2]
            label = groups[3]
            target = groups[4]
        elif len(groups) == 6:  # Dotted with label: A -. label .- B
            source = groups[1]
            arrow = groups[2] + groups[4]  # Combine -. and .-
            label = groups[3]
            target = groups[5]
        else:  # Simple: A --> B
            source = groups[1]
            arrow = groups[2]
            label = None
            target = groups[3]

        return Connection(
            element_type='connection',
            raw_text=line,
            line_number=line_num,
            indent_level=indent_level,
            source=source,
            target=target,
            arrow=arrow,
            label=label
        )


# =============================================================================
# Formatter
# =============================================================================

class MermaidFormatter:
    """Formats Mermaid diagrams according to style guide."""

    def format(self, diagram: MermaidDiagram) -> str:
        """Format a diagram according to style rules."""
        lines = []

        # 1. Init block - None means no init block (per template)
        if CANONICAL_INIT_BLOCK is not None:
            lines.append(CANONICAL_INIT_BLOCK)

        # 2. Diagram declaration
        if diagram.declaration:
            decl = diagram.declaration
            lines.append(f"{decl.diagram_type} {decl.direction}")
        else:
            lines.append("flowchart TB")

        # Collect info for standard color enforcement
        # Returns (content_nodes, workflow_nodes)
        if ENFORCE_STANDARD_COLORS:
            content_nodes, workflow_nodes = self._classify_nodes(diagram)
            # Also collect connections for linkStyle generation
            connections = self._collect_connections(diagram)
        else:
            content_nodes, workflow_nodes = set(), set()
            connections = []

        # 3. Format elements maintaining their order and structure
        current_subgraph_depth = 0
        seen_classdef = False
        seen_class_apply = False
        seen_linkstyle = False

        for element in diagram.elements:
            if isinstance(element, SubgraphStart):
                # Subgraph header gets indent based on current depth
                formatted = self._format_element(element, current_subgraph_depth)
                lines.append(formatted)
                current_subgraph_depth += 1
            elif isinstance(element, SubgraphEnd):
                # End keyword gets indent at the level of the subgraph it closes
                current_subgraph_depth = max(0, current_subgraph_depth - 1)
                lines.append(INDENT * (1 + current_subgraph_depth) + "end")
            elif isinstance(element, ClassDef):
                # When enforcing standard colors, replace all classDef with standard ones
                if ENFORCE_STANDARD_COLORS:
                    if not seen_classdef:
                        # Output standard classDef statements once (template uses 2 classes)
                        base_indent = INDENT
                        lines.append(f"{base_indent}classDef chapter {STANDARD_CLASSDEFS['chapter']};")
                        lines.append(f"{base_indent}classDef workflowNode {STANDARD_CLASSDEFS['workflowNode']};")
                        seen_classdef = True
                    # Skip original classDef
                else:
                    formatted = self._format_element(element, current_subgraph_depth)
                    lines.append(formatted)
            elif isinstance(element, ClassApplication):
                # When enforcing standard colors, replace with standard class applications
                if ENFORCE_STANDARD_COLORS:
                    if not seen_class_apply:
                        base_indent = INDENT
                        if content_nodes:
                            lines.append(f"{base_indent}class {','.join(sorted(content_nodes))} chapter;")
                        if workflow_nodes:
                            lines.append(f"{base_indent}class {','.join(sorted(workflow_nodes))} workflowNode;")
                        seen_class_apply = True
                    # Skip original class application
                else:
                    formatted = self._format_element(element, current_subgraph_depth)
                    lines.append(formatted)
            elif isinstance(element, LinkStyle):
                # When enforcing standard colors, generate linkStyle based on connection types
                if ENFORCE_STANDARD_COLORS:
                    if not seen_linkstyle:
                        base_indent = INDENT
                        linkstyles = self._generate_linkstyles(connections)
                        for ls in linkstyles:
                            lines.append(f"{base_indent}{ls}")
                        seen_linkstyle = True
                    # Skip original linkStyle
                else:
                    formatted = self._format_element(element, current_subgraph_depth)
                    lines.append(formatted)
            else:
                # Regular elements get indent inside the subgraph
                formatted = self._format_element(element, current_subgraph_depth)
                lines.append(formatted)

        # If enforcing standard colors and no linkStyle was seen, add linkStyles at the end
        if ENFORCE_STANDARD_COLORS and not seen_linkstyle and connections:
            base_indent = INDENT
            linkstyles = self._generate_linkstyles(connections)
            for ls in linkstyles:
                lines.append(f"{base_indent}{ls}")

        return '\n'.join(lines)

    def _collect_connections(self, diagram: MermaidDiagram) -> List[Connection]:
        """Collect all connections in order for linkStyle generation."""
        connections = []
        for element in diagram.elements:
            if isinstance(element, Connection):
                connections.append(element)
        return connections

    def _generate_linkstyles(self, connections: List[Connection]) -> List[str]:
        """Generate linkStyle directives based on connection types.

        From template:
        - Main arrows (solid -->): brand blue
        - Workflow/section jumps (dotted -.->): yellow dashed
        - Cross-references (dotted with label -. ref .-): red dotted
        """
        if not connections:
            return []

        main_indices = []
        workflow_indices = []
        crossref_indices = []

        for i, conn in enumerate(connections):
            arrow = conn.arrow
            # Cross-reference: connections with inline labels (parsed with label set)
            # These typically look like A -. "label" .- B
            if conn.label and ('-.' in arrow or '.-' in arrow):
                crossref_indices.append(i)
            # Workflow/section jump: dotted arrow (-.->)
            elif '-.>' in arrow or '-.->' in arrow or arrow == '-.->':
                workflow_indices.append(i)
            # Main: solid arrows (-->, <-->, etc.)
            else:
                main_indices.append(i)

        linkstyles = []
        if main_indices:
            indices = ','.join(str(i) for i in main_indices)
            linkstyles.append(f"linkStyle {indices} {LINKSTYLE_MAIN};")
        if workflow_indices:
            indices = ','.join(str(i) for i in workflow_indices)
            linkstyles.append(f"linkStyle {indices} {LINKSTYLE_WORKFLOW};")
        if crossref_indices:
            indices = ','.join(str(i) for i in crossref_indices)
            linkstyles.append(f"linkStyle {indices} {LINKSTYLE_CROSSREF};")

        return linkstyles

    def _classify_nodes(self, diagram: MermaidDiagram) -> tuple:
        """Classify nodes as content (chapter) or workflow (workflowNode).

        Based on mermaid_template_latest.mmd:
        - chapter: Main content nodes (yellow border #F1D302)
        - workflowNode: Workflow/process nodes (red border #C1292E)

        Workflow nodes are identified by:
        - Node IDs starting with 'W' followed by number (W1, W2, etc.)
        - Nodes inside subgraphs named 'Workflow'

        Content nodes are:
        - All other explicitly defined nodes
        - All nodes referenced in connections (except workflow nodes)

        Note: Subgraph IDs themselves are NOT styled - only nodes inside them.
        """
        all_nodes = set()
        subgraph_ids = set()
        workflow_nodes = set()
        in_workflow_subgraph = False

        for element in diagram.elements:
            if isinstance(element, NodeDefinition):
                all_nodes.add(element.node_id)
                # Check if this is a workflow node by ID pattern (W1, W2, etc.)
                if re.match(r'^W\d+$', element.node_id):
                    workflow_nodes.add(element.node_id)
                # If inside a Workflow subgraph, mark as workflow
                elif in_workflow_subgraph:
                    workflow_nodes.add(element.node_id)
            elif isinstance(element, SubgraphStart):
                subgraph_ids.add(element.subgraph_id)
                # Track if we're entering a Workflow subgraph
                if 'Workflow' in element.subgraph_id or (element.label and 'Workflow' in element.label):
                    in_workflow_subgraph = True
            elif isinstance(element, SubgraphEnd):
                in_workflow_subgraph = False
            elif isinstance(element, Connection):
                # Nodes referenced in connections
                all_nodes.add(element.source)
                all_nodes.add(element.target)

        # Content nodes are everything except subgraph IDs and workflow nodes
        content_nodes = all_nodes - subgraph_ids - workflow_nodes

        return content_nodes, workflow_nodes

    def _format_element(self, element: DiagramElement, subgraph_depth: int) -> str:
        """Format a single element with proper indentation.

        subgraph_depth: 0 = top level, 1 = inside first subgraph, etc.
        Elements get one base indent plus subgraph nesting.
        """
        base_indent = INDENT * (1 + subgraph_depth)

        if isinstance(element, Comment):
            return f"{base_indent}%% {element.text}"

        if isinstance(element, NodeDefinition):
            if element.label:
                # Ensure label is quoted
                label = element.label.strip('"')
                if element.shape_start == '([':
                    return f'{base_indent}{element.node_id}(["{label}"])'
                elif element.shape_start == '[/':
                    # Trapezoid shape
                    return f'{base_indent}{element.node_id}[/"{label}"/]'
                elif element.shape_start == '[\\':
                    # Reverse trapezoid shape
                    return f'{base_indent}{element.node_id}[\\"{label}"\\]'
                else:
                    return f'{base_indent}{element.node_id}["{label}"]'
            else:
                return f"{base_indent}{element.node_id}"

        if isinstance(element, Connection):
            if element.label:
                # Check arrow type for label formatting
                if '-.' in element.arrow and '.-' in element.arrow:
                    # Dotted with inline label
                    return f'{base_indent}{element.source} -. "{element.label}" .- {element.target}'
                else:
                    # Standard labeled arrow
                    return f'{base_indent}{element.source} {element.arrow}|"{element.label}"| {element.target}'
            else:
                return f"{base_indent}{element.source} {element.arrow} {element.target}"

        if isinstance(element, SubgraphStart):
            # Subgraph header gets base indent plus its nesting level
            indent = INDENT * (1 + subgraph_depth)
            if element.label:
                return f'{indent}subgraph {element.subgraph_id}["{element.label}"]'
            else:
                return f"{indent}subgraph {element.subgraph_id}"

        if isinstance(element, ClassDef):
            props = element.properties.rstrip(';')
            return f"{base_indent}classDef {element.class_name} {props};"

        if isinstance(element, ClassApplication):
            nodes = ','.join(element.node_ids)
            return f"{base_indent}class {nodes} {element.class_name};"

        if isinstance(element, LinkStyle):
            indices = ','.join(str(i) for i in element.indices)
            return f"{base_indent}linkStyle {indices} {element.properties}"

        if isinstance(element, OtherLine):
            # Preserve original content but fix indentation
            stripped = element.raw_text.strip()
            return f"{base_indent}{stripped}"

        # Fallback
        return element.raw_text


# =============================================================================
# Markdown Processor
# =============================================================================

class MarkdownProcessor:
    """Extracts and replaces Mermaid blocks in Markdown files."""

    MERMAID_BLOCK_PATTERN = re.compile(
        r'(```mermaid\n)(.*?)(```)',
        re.DOTALL
    )

    def __init__(self):
        self.parser = MermaidParser()
        self.formatter = MermaidFormatter()

    def find_mermaid_blocks(self, content: str) -> List[Tuple[int, int, str]]:
        """Find all Mermaid code blocks with their positions.

        Returns list of (start, end, mermaid_content) tuples.
        """
        blocks = []
        for match in self.MERMAID_BLOCK_PATTERN.finditer(content):
            start = match.start()
            end = match.end()
            mermaid_content = match.group(2)
            blocks.append((start, end, mermaid_content))
        return blocks

    def process_file(self, file_path: Path) -> FileResult:
        """Process a Markdown file, formatting all Mermaid blocks."""
        result = FileResult(
            file_path=file_path,
            diagrams_found=0,
            diagrams_changed=0,
            original_content="",
            formatted_content=""
        )

        try:
            content = file_path.read_text(encoding='utf-8')
        except Exception as e:
            result.errors.append(f"Failed to read file: {e}")
            return result

        result.original_content = content
        blocks = self.find_mermaid_blocks(content)
        result.diagrams_found = len(blocks)

        if not blocks:
            result.formatted_content = content
            return result

        # Process blocks in reverse order to maintain positions
        new_content = content
        for start, end, mermaid_content in reversed(blocks):
            try:
                # Parse the diagram
                diagram = self.parser.parse(mermaid_content, file_path)

                # Format it
                formatted = self.formatter.format(diagram)

                # Check if changed
                # Normalize for comparison (strip trailing whitespace)
                original_normalized = mermaid_content.strip()
                formatted_normalized = formatted.strip()

                if original_normalized != formatted_normalized:
                    result.diagrams_changed += 1

                # Replace in content
                new_content = (
                    new_content[:start] +
                    '```mermaid\n' +
                    formatted +
                    '\n```' +
                    new_content[end:]
                )
            except Exception as e:
                result.errors.append(
                    f"Failed to format diagram at position {start}: {e}"
                )

        result.formatted_content = new_content
        return result


# =============================================================================
# CLI and Main
# =============================================================================

def find_markdown_files(paths: List[str]) -> List[Path]:
    """Find all Markdown files in the given paths."""
    files = []
    for path_str in paths:
        path = Path(path_str)
        if path.is_file():
            if path.suffix.lower() in ['.md', '.markdown']:
                files.append(path)
        elif path.is_dir():
            files.extend(path.rglob('*.md'))
            files.extend(path.rglob('*.markdown'))
    return sorted(set(files))


def generate_diff(original: str, formatted: str, filename: str) -> str:
    """Generate unified diff between original and formatted content."""
    original_lines = original.splitlines(keepends=True)
    formatted_lines = formatted.splitlines(keepends=True)

    diff = unified_diff(
        original_lines,
        formatted_lines,
        fromfile=f"a/{filename}",
        tofile=f"b/{filename}"
    )
    return ''.join(diff)


def print_summary(results: List[FileResult], mode: str, verbose: bool):
    """Print summary of formatting operation."""
    total_files = len(results)
    files_with_diagrams = sum(1 for r in results if r.diagrams_found > 0)
    files_changed = sum(1 for r in results if r.diagrams_changed > 0)
    total_diagrams = sum(r.diagrams_found for r in results)
    diagrams_changed = sum(r.diagrams_changed for r in results)
    total_errors = sum(len(r.errors) for r in results)

    print(f"\n{'=' * 60}")
    print(f"Mermaid Formatting Summary ({mode})")
    print(f"{'=' * 60}")
    print(f"Files scanned:        {total_files}")
    print(f"Files with diagrams:  {files_with_diagrams}")
    print(f"Files with changes:   {files_changed}")
    print(f"Diagrams found:       {total_diagrams}")
    print(f"Diagrams reformatted: {diagrams_changed}")

    if total_errors:
        print(f"Errors:               {total_errors}")

    if verbose:
        print(f"\n{'=' * 60}")
        print("Details by file:")
        print(f"{'=' * 60}")
        for result in results:
            if result.diagrams_found > 0:
                status = "changed" if result.diagrams_changed else "ok"
                print(f"  {result.file_path}: {result.diagrams_found} diagram(s), {status}")
                for error in result.errors:
                    print(f"    ERROR: {error}")


def main():
    parser = argparse.ArgumentParser(
        description='Format Mermaid diagrams according to style guide',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                     Format all .md files in current directory
  %(prog)s --dry-run           Preview changes without modifying files
  %(prog)s --validate          Check conformance (exit 1 if issues)
  %(prog)s --diff              Show unified diff of changes
  %(prog)s _portfolio/         Format files in specific directory
"""
    )

    parser.add_argument(
        'paths',
        nargs='*',
        default=['.'],
        help='Files or directories to process (default: current directory)'
    )

    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview changes without modifying files'
    )

    parser.add_argument(
        '--validate',
        action='store_true',
        help='Check conformance without modifying; exit 1 if issues found'
    )

    parser.add_argument(
        '--diff',
        action='store_true',
        help='Show unified diff of changes'
    )

    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Verbose output'
    )

    args = parser.parse_args()

    # Find files
    files = find_markdown_files(args.paths)

    if not files:
        print("No Markdown files found.")
        return 0

    if args.verbose:
        print(f"Found {len(files)} Markdown file(s) to process")

    # Process files
    processor = MarkdownProcessor()
    results = []

    for file_path in files:
        if args.verbose:
            print(f"Processing: {file_path}")

        result = processor.process_file(file_path)
        results.append(result)

        # Show diff if requested
        if args.diff and result.diagrams_changed > 0:
            diff = generate_diff(
                result.original_content,
                result.formatted_content,
                str(result.file_path)
            )
            if diff:
                print(diff)

        # Write changes if not dry-run or validate
        if not args.dry_run and not args.validate:
            if result.diagrams_changed > 0 and not result.errors:
                try:
                    file_path.write_text(result.formatted_content, encoding='utf-8')
                    if args.verbose:
                        print(f"  Updated: {file_path}")
                except Exception as e:
                    result.errors.append(f"Failed to write file: {e}")

    # Determine mode for summary
    if args.validate:
        mode = "validate"
    elif args.dry_run:
        mode = "dry-run"
    else:
        mode = "format"

    print_summary(results, mode, args.verbose)

    # Exit code
    total_changed = sum(r.diagrams_changed for r in results)
    total_errors = sum(len(r.errors) for r in results)

    if args.validate:
        if total_changed > 0 or total_errors > 0:
            print("\nValidation failed: diagrams need formatting or have errors.")
            return 1
        else:
            print("\nValidation passed: all diagrams conform to style guide.")
            return 0

    if total_errors > 0:
        return 1

    return 0


if __name__ == '__main__':
    sys.exit(main())
