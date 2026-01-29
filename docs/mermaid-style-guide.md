# Mermaid Diagram Style Guide

This guide defines the formatting standards for Mermaid diagrams in this repository based on the template in `mermaid_template_latest.mmd`. The `scripts/format-mermaid.py` script automatically enforces these rules.

## Quick Reference Checklist

- [ ] NO init block (template omits it)
- [ ] `flowchart` diagram type (not `graph`)
- [ ] 2-space indentation throughout
- [ ] Use subgraphs for section grouping
- [ ] Short alphanumeric IDs for content nodes
- [ ] Labels in square brackets with quotes: `["Label"]`
- [ ] Two node classes: `chapter` and `workflowNode`
- [ ] Indexed `linkStyle` directives (not `default`)
- [ ] Nodes defined before connections
- [ ] Styles defined after connections

---

## Color Palette

The template uses three brand colors:

| Color | Hex | Usage |
|-------|-----|-------|
| **Blue** | `#235789` | Main arrows, node text color |
| **Yellow** | `#F1D302` | Content node borders (`chapter` class) |
| **Red** | `#C1292E` | Workflow node borders (`workflowNode` class), cross-reference arrows |

---

## No Init Block

Unlike previous versions, the current template does NOT include an init block. Diagrams start directly with the flowchart declaration:

```
flowchart TB
  %% Content here
```

Do NOT include `%%{init: {...}}%%` blocks.

---

## Diagram Structure

### Section Ordering

Diagrams follow this structure:

1. Diagram type declaration (`flowchart TB`)
2. Subgraphs with node definitions (with comments)
3. Inter-subgraph connections
4. Style definitions (`classDef chapter`, `classDef workflowNode`)
5. Class applications (`class ... chapter`, `class ... workflowNode`)
6. Link styles (indexed `linkStyle` directives)

### Indentation

Use **2 spaces** for all indentation. Do not use tabs.

```
flowchart TB
  subgraph Section1["Section One"]
    A1["Topic 1"]
    A2["Topic 2"]
    A1 --> A2
  end

  %% Connections between sections
  Section1 --> Section2

  %% Styles
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  class A1,A2 chapter;
  linkStyle 0 stroke:#235789,stroke-width:3px;
```

### Subgraph Indentation

Content within subgraphs receives an additional 2-space indent:

```
flowchart TB
  subgraph GroupName["Group Label"]
    A["Node A"]
    B["Node B"]
  end
```

---

## Using Subgraphs for Sections

The template uses subgraphs to group related content:

```
subgraph Section1["Section One"]
  A1["Topic 1"]
  A2["Topic 2"]
  A1 --> A2
end

subgraph Section2["Section Two"]
  B1["Subtopic A"]
  B2["Subtopic B"]
  B1 --> B2
end

Section1 --> Section2
```

Subgraph IDs should use PascalCase: `Section1`, `Workflow`, `NextSteps`.

---

## Node Naming Conventions

### Content Nodes

Use **short alphanumeric IDs** for content nodes:

| Pattern | Example | Usage |
|---------|---------|-------|
| Abbreviations | `RN`, `CLI`, `CON`, `K8S` | Document/component references |
| Letter + Number | `A1`, `B2`, `C10` | Sequential items |
| Chapter prefix | `C1`, `C2`, `C3` | Chapter numbering |
| Workflow prefix | `W1`, `W2` | Workflow steps (get `workflowNode` class) |
| Action prefix | `N1`, `N2` | Next steps/actions |

### Workflow Nodes

Nodes with IDs matching pattern `W` + number (e.g., `W1`, `W2`) are automatically classified as workflow nodes and receive the `workflowNode` class with red borders.

### Labels

Always use square brackets with quotes:

```
A["Label Text"]
```

For multi-line labels, use `<br/>`:

```
KC["Kubernetes<br/>Clusters"]
```

---

## Connection Syntax

### Arrow Types

| Syntax | Appearance | Usage | linkStyle |
|--------|------------|-------|-----------|
| `-->` | Solid arrow | Primary flow, hierarchy | Blue (`#235789`) |
| `<-->` | Bidirectional solid | Mutual relationships | Blue (`#235789`) |
| `-.->` | Dotted arrow | Optional, section jumps | Yellow dashed (`#F1D302`) |
| `-. label .-` | Dotted with label | Cross-references | Red dotted (`#C1292E`) |

### Examples

```
%% Primary flow (blue arrows)
Section1 --> A1
Section1 --> A2

%% Section jumps (yellow dashed)
Section3 -.-> Workflow

%% Cross-reference with label (red dotted)
A2 -. ref .- B1
```

---

## Style Definitions (Required)

### Standard Classes

All diagrams must use exactly these two classes from the template:

```
classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
```

### Class Properties

| Class | Purpose | Fill | Stroke | Text |
|-------|---------|------|--------|------|
| `chapter` | Content nodes | `#fff` (white) | `#F1D302` (yellow) | `#235789` (blue) |
| `workflowNode` | Workflow/process nodes | `#fff` (white) | `#C1292E` (red) | `#235789` (blue) |

### Node Classification

The formatter automatically classifies nodes:
- **workflowNode**: Nodes with IDs matching `W` + number (W1, W2, etc.)
- **chapter**: All other content nodes

Note: Subgraph IDs are NOT styled as nodes.

### Class Application

```
class A1,A2,B1,B2,C1,C2,N1,N2 chapter;
class W1,W2 workflowNode;
```

---

## Link Styles (Required)

### Indexed Link Styles

The template uses **indexed** linkStyle directives, not `linkStyle default`. Each connection type gets its own style:

```
%% Main arrows: thick brand blue
linkStyle 0,1,2,3 stroke:#235789,stroke-width:3px;

%% Workflow/section jumps: yellow, thick, dashed
linkStyle 4,5 stroke:#F1D302,stroke-width:2.5px,stroke-dasharray:6,5;

%% Cross-references: red, thick, dotted
linkStyle 6 stroke:#C1292E,stroke-width:2.5px,stroke-dasharray:2,5;
```

### Link Style Types

| Type | Color | Style | Usage |
|------|-------|-------|-------|
| Main | `#235789` (blue) | Solid, 3px | Primary connections (`-->`, `<-->`) |
| Workflow | `#F1D302` (yellow) | Dashed, 2.5px | Section jumps (`-.->`) |
| Cross-ref | `#C1292E` (red) | Dotted, 2.5px | References (`-. label .-`) |

The formatter automatically calculates linkStyle indices based on connection order.

---

## Comments

### Comment Syntax

Use `%%` for comments. The formatter preserves existing comments:

```
%% SECTION GROUPS
subgraph Section1["Section One"]
  ...
end

%% PRIMARY STRUCTURE
Section1 --> Section2

%% ===================== STYLES =====================
classDef chapter ...
```

---

## Complete Example

Based on the template (`mermaid_template_latest.mmd`):

```
flowchart TB

  %% --------- SECTION GROUPS ---------
  subgraph Section1["Section One"]
    A1["Topic 1"]
    A2["Topic 2"]
    A1 --> A2
  end

  subgraph Section2["Section Two"]
    B1["Subtopic A"]
    B2["Subtopic B"]
    B1 --> B2
  end

  subgraph Workflow["Workflow / Process"]
    W1["Workflow Step 1"]
    W2["Workflow Step 2"]
    W1 --> W2
  end

  %% ------------- MAIN STRUCTURE -------------
  Section1 --> Section2
  Section2 -.-> Workflow

  %% ------------- CROSS-REFERENCE -------------
  A2 -. ref .- B1

  %% ===================== STYLES =====================
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;

  class A1,A2,B1,B2 chapter;
  class W1,W2 workflowNode;

  %% Main arrows: thick brand blue
  linkStyle 0,1,2 stroke:#235789,stroke-width:3px;
  %% Workflow jump: yellow, dashed
  linkStyle 3 stroke:#F1D302,stroke-width:2.5px,stroke-dasharray:6,5;
  %% Cross-ref: red, dotted
  linkStyle 4 stroke:#C1292E,stroke-width:2.5px,stroke-dasharray:2,5;
```

---

## Common Mistakes to Avoid

1. **Including init block** - Template has no init block
2. **4-space indentation** - Use 2 spaces (matching template)
3. **Custom colors** - Use only `chapter` and `workflowNode` classes
4. **Using `linkStyle default`** - Use indexed linkStyle directives
5. **Missing quotes in labels** - Always quote: `["Label"]`
6. **Missing semicolons** - End classDef and class statements with `;`
7. **Styling subgraph IDs** - Only content nodes get styled

---

## Using the Formatter

The `scripts/format-mermaid.py` script automatically enforces all template rules.

### Commands

```bash
# Preview changes without modifying
python scripts/format-mermaid.py --dry-run

# Check conformance (returns exit code 1 if issues found)
python scripts/format-mermaid.py --validate

# Apply formatting to all diagrams
python scripts/format-mermaid.py

# Show diff of changes
python scripts/format-mermaid.py --diff

# Format specific files
python scripts/format-mermaid.py _portfolio/ocne2_information_architecture.md
```

### What the Formatter Does

- Removes any init block (template has none)
- Applies 2-space indentation
- Replaces all `classDef` with standard `chapter` and `workflowNode`
- Classifies nodes automatically (content vs workflow)
- Generates indexed `linkStyle` based on connection types
- Preserves comments and semantic content

### Idempotency

The formatter is idempotent: running it multiple times produces the same result.
