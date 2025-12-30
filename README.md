# Alison Holloway - Technical Writing Portfolio

A professional portfolio site showcasing 30+ years of technical writing experience in virtualization, cloud-native platforms, and container technologies. Built with Jekyll and hosted on GitHub Pages.

## About This Portfolio

This site showcases documentation work across:
- Oracle Cloud Native Environment (Kubernetes, containers)
- Oracle VM and virtualization technologies
- Oracle Linux products and storage solutions
- Cloud infrastructure and OpenStack

**Specializations:**
- DITA XML structured authoring
- Installation, upgrade, and deployment guides
- CLI reference documentation
- Release notes and system administration guides

## Directory Structure

```
alison-holloway.github.io/
├── _config.yml              # Site configuration with professional details
├── Gemfile                  # Ruby dependencies
├── index.html               # Home page with professional highlights
├── about.md                 # Professional background and expertise
├── README.md                # This file
├── _layouts/
│   ├── default.html         # Main layout with navigation
│   ├── portfolio-item.html  # Portfolio project layout
│   └── post.html            # Blog post layout
├── _portfolio/              # Portfolio items (collection)
│   ├── sample-installation-guide.md
│   └── oracle-vm-upgrade-guide.md
├── _posts/                  # Blog posts
│   └── 2024-01-15-thirty-years-in-technical-writing.md
├── portfolio/
│   └── index.html           # Portfolio listing with tag filtering
├── blog/
│   └── index.html           # Blog listing
└── assets/
    └── css/
        └── main.css         # Professional styling
```

## Quick Start Guide

### Prerequisites

Ensure you have installed:
- **Git** (already set up with your GitHub account)
- **Ruby 2.7 or higher** (check with `ruby --version`)
- **Bundler gem** (install with `gem install bundler` if needed)

### Initial Setup

1. **Navigate to your local git repository:**

```bash
cd ~/path/to/alison-holloway.github.io
```

2. **Create the directory structure:**

```bash
mkdir -p _layouts _portfolio _posts portfolio blog assets/css
```

3. **Copy files from artifacts:**

Copy each file from the Claude conversation artifacts to the corresponding location:

```
_config.yml                  → (root directory)
Gemfile                      → (root directory)
README.md                    → (root directory)
index.html                   → (root directory)
about.md                     → (root directory)

_layouts/default.html        → _layouts/
_layouts/portfolio-item.html → _layouts/
_layouts/post.html           → _layouts/

_portfolio/sample-installation-guide.md     → _portfolio/
_portfolio/oracle-vm-upgrade-guide.md       → _portfolio/

_posts/2024-01-15-thirty-years-in-technical-writing.md → _posts/

portfolio/index.html         → portfolio/
blog/index.html              → blog/

assets/css/main.css          → assets/css/
```

4. **Review and customize _config.yml:**

The configuration file already contains your information from your resume:
- Email: alison.holloway@pm.me
- LinkedIn: alison-holloway-au
- GitHub: alison-holloway
- Location: Brisbane, Queensland, Australia

Update any details as needed.

5. **Install dependencies:**

```bash
bundle install
```

6. **Run the site locally:**

```bash
bundle exec jekyll serve
```

7. **View your site:**

Open your browser to `http://localhost:4000`

### Using Jekyll Admin

Once the site is running locally, access the admin interface:

```
http://localhost:4000/admin
```

Jekyll Admin provides a visual interface for:
- Creating and editing portfolio items
- Writing blog posts
- Editing pages and configuration
- Managing content without touching code

## Adding Portfolio Items

### Portfolio Item Template

Portfolio items represent your documentation projects. Each item includes metadata about the product, document type, tools used, and a description of the project.

#### Method 1: Using Jekyll Admin (Easiest)

1. Navigate to `http://localhost:4000/admin`
2. Click **Collections** → **Portfolio**
3. Click **New document**
4. Fill in the form fields
5. Save and commit

#### Method 2: Manual File Creation

Create a new file in `_portfolio/` directory:

**Filename format:** `product-name-doc-type.md`  
Examples:
- `olcne-administration-guide.md`
- `oracle-linux-release-notes.md`
- `openstack-deployment-guide.md`

**File content template:**

```markdown
---
layout: portfolio-item
title: "Document Title"
product: "Product Name"
doc_type: "Installation Guide"
version: "1.0"
date: 2024-12-30
date_completed: 2024-12-30
featured: true
tags:
  - Installation
  - Cloud Native
  - Kubernetes
  - Virtualization
tools:
  - DITA XML
  - Oxygen XML
  - Git
  - Terraform
pdf_url: "https://example.com/path-to-pdf.pdf"
doc_url: "https://docs.oracle.com/path-to-online-docs"
excerpt: "Brief 1-2 sentence description of this documentation project"
---

## Overview

Describe the documentation project, the product it covers, and the purpose of this documentation.

## Documentation Scope

What does this documentation cover? What scenarios or use cases does it address?

## Key Documentation Features

What makes this documentation valuable? Highlight specific features or approaches.

## Documentation Challenges

### Challenge 1: [Challenge Description]

Describe a specific challenge you faced.

**Solution:** How you addressed this challenge.

### Challenge 2: [Another Challenge]

Continue with additional challenges and solutions.

## Technical Approach

Describe how you approached this documentation project:
- Testing methodology
- Collaboration with engineering
- Tools and technologies used

## Target Audience

Who uses this documentation?

## Outcome and Impact

What was the result? How did this documentation help users or the organization?
```

### Portfolio Item Front Matter Fields Explained

- **layout:** Always `portfolio-item`
- **title:** The full document title
- **product:** The product or technology being documented
- **doc_type:** Type of document (Installation Guide, Release Notes, CLI Reference, Upgrade Guide, etc.)
- **version:** Product version (if applicable)
- **date:** Publication date (used for sorting)
- **date_completed:** When you completed this work
- **featured:** Set to `true` to display on home page (limit to 3 featured items)
- **tags:** Categories for filtering (Installation, Virtualization, Cloud Native, etc.)
- **tools:** Tools you used (DITA XML, Git, Terraform, etc.)
- **pdf_url:** Link to PDF version (optional)
- **doc_url:** Link to online documentation (optional)
- **excerpt:** Brief description (appears in portfolio listings)

### Recommended Documentation Types for Your Portfolio

Based on your resume, consider adding projects for these document types:

- **Installation Guides:** Oracle Cloud Native Environment, Oracle VM, OpenStack
- **Upgrade Guides:** Oracle VM upgrades, Oracle Linux version migrations
- **Release Notes:** Feature updates, known issues, compatibility information
- **Administration Guides:** System administration, configuration management
- **CLI Reference Guides:** Command-line interface documentation
- **Deployment Guides:** Production deployment best practices
- **Security Guides:** Security configuration and hardening

## Adding Blog Posts

Blog posts let you share insights about technical writing, documentation best practices, and your professional experience.

### Method 1: Using Jekyll Admin

1. Navigate to `http://localhost:4000/admin`
2. Click **Posts**
3. Click **New post**
4. Write your content in Markdown
5. Add tags and metadata
6. Save and commit

### Method 2: Manual File Creation

Create files in `_posts/` directory:

**Filename format:** `YYYY-MM-DD-title-slug.md`

Example: `2024-12-30-documenting-kubernetes.md`

**File content template:**

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-12-30
tags:
  - Technical Writing
  - Documentation
  - DITA XML
---

Your blog post content here in Markdown format.

## Use Headings to Organize

Write naturally about your experiences, insights, and expertise.

### Code Examples

```bash
kubectl get pods
```

### Lists

- Point one
- Point two
- Point three

### Links

[Link text](https://example.com)
```

### Blog Post Ideas

Consider writing about:
- Your experience with DITA XML and structured authoring
- Lessons learned from 30+ years in technical writing
- Documenting cloud-native technologies
- Working with engineering teams
- Migration from DocBook to DITA
- Creating documentation automation scripts
- Technical writing career advice
- Documentation tools and workflows

## Managing PDF Documents

You have several options for hosting PDF versions of your documentation:

### Option 1: GitHub Repository (Recommended for Small PDFs)

1. Create `assets/pdfs/` directory:
```bash
mkdir -p assets/pdfs
```

2. Add your PDFs:
```bash
cp /path/to/your/document.pdf assets/pdfs/
```

3. Reference in portfolio items:
```yaml
pdf_url: "/assets/pdfs/document-name.pdf"
```

**Note:** GitHub has a 100MB file size limit per file.

### Option 2: External Hosting

Host PDFs on:
- docs.oracle.com (if still accessible)
- Personal cloud storage (Google Drive, Dropbox) with public links
- GitHub Releases (for larger files)

Reference with full URL:
```yaml
pdf_url: "https://docs.oracle.com/path/to/document.pdf"
```

### Option 3: GitHub Releases

For files over 100MB:

1. Create a GitHub Release
2. Upload PDFs as release assets
3. Use the direct download link in your portfolio items

## Deploying to GitHub Pages

### First Deployment

1. **Commit all files:**

```bash
git add .
git commit -m "Initial portfolio site with professional content"
```

2. **Push to GitHub:**

```bash
git push origin main
```

3. **Enable GitHub Pages:**

- Go to your repository on GitHub: `https://github.com/alison-holloway/alison-holloway.github.io`
- Click **Settings** → **Pages**
- Under **Source**, select **Deploy from a branch**
- Select **main** branch and **/ (root)** folder
- Click **Save**

4. **Wait for deployment:**

GitHub Pages will build your site (usually 1-3 minutes). You'll see a green checkmark when it's ready.

5. **Visit your live site:**

```
https://alison-holloway.github.io/
```

### Updating Your Site

After making changes locally:

```bash
# Test locally first
bundle exec jekyll serve

# When satisfied with changes
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Pages automatically rebuilds your site within 1-2 minutes of pushing changes.

### Monitoring Deployment

Check deployment status:
- Go to your repository
- Click the **Actions** tab
- View the latest workflow run

If deployment fails, the Actions tab will show error details.

## Customization Guide

### Changing Colors

Edit `assets/css/main.css` and modify the CSS variables:

```css
:root {
  --primary-color: #2c3e50;    /* Headers, navigation */
  --secondary-color: #34495e;   /* Secondary elements */
  --accent-color: #3498db;      /* Links, buttons */
  --text-color: #333;           /* Body text */
  --text-light: #666;           /* Metadata, secondary text */
  --bg-color: #ffffff;          /* Page background */
  --bg-light: #f8f9fa;          /* Card backgrounds */
  --border-color: #e1e4e8;      /* Borders, dividers */
}
```

### Updating Navigation

Edit `_layouts/default.html` to add/remove navigation items:

```html
<nav>
  <ul>
    <li><a href="{{ '/' | relative_url }}">Home</a></li>
    <li><a href="{{ '/portfolio/' | relative_url }}">Portfolio</a></li>
    <li><a href="{{ '/blog/' | relative_url }}">Blog</a></li>
    <li><a href="{{ '/about/' | relative_url }}">About</a></li>
    <!-- Add new pages here -->
  </ul>
</nav>
```

### Adding New Pages

1. Create a new file in the root directory (e.g., `speaking.md` or `publications.html`)

2. Add front matter:

```markdown
---
layout: default
title: "Page Title"
---

Page content here in Markdown or HTML
```

3. Add link to navigation in `_layouts/default.html`

### Modifying the Home Page

Edit `index.html` to:
- Change the professional highlights
- Adjust number of featured portfolio items
- Modify the hero section text
- Add or remove sections

### Customizing Portfolio Display

Edit `portfolio/index.html` to:
- Change sorting order
- Modify grid layout
- Add additional filters
- Adjust card content

## Content Strategy for Your Portfolio

### Priority 1: Add 3-5 Strong Portfolio Items

Focus on your best, most representative work:

1. **Oracle Cloud Native Environment Installation Guide** (already included)
2. **Oracle VM Upgrade Guide** (already included)
3. Add 1-3 more items from different product areas:
   - Oracle OpenStack deployment documentation
   - Oracle Linux release notes
   - CLI reference guide
   - Storage technology documentation (Gluster, Ceph)

### Priority 2: Customize About Page

The about page is already populated with content from your resume, but you should:

- Review and adjust the tone to match your target audience
- Add or remove sections based on what you want to emphasize
- Update the "Get in Touch" section if needed

### Priority 3: Write 2-3 Blog Posts

Share your expertise:

- The "Thirty Years" post is already included
- Consider adding:
  - "Migrating from DocBook to DITA: Lessons Learned"
  - "Documentation Automation with Terraform and Ansible"
  - "Working with Engineering Teams: A Technical Writer's Perspective"

### Priority 4: Add Documentation Samples

If you have PDFs or can link to published documentation:

1. Upload PDFs to `assets/pdfs/` or host externally
2. Update portfolio items with `pdf_url` and `doc_url` fields
3. Consider adding screenshots or excerpts in portfolio item descriptions

## Troubleshooting

### Site Not Building Locally

**Problem:** `bundle exec jekyll serve` fails

**Solutions:**
1. Run `bundle install` to ensure all gems are installed
2. Check Ruby version: `ruby --version` (need 2.7+)
3. Clear Jekyll cache: `bundle exec jekyll clean`
4. Check for syntax errors in YAML front matter

### Changes Not Showing Locally

**Solution:**
1. Stop the server (Ctrl+C)
2. Run `bundle exec jekyll clean`
3. Restart: `bundle exec jekyll serve`

### Port 4000 Already in Use

**Solution:**
```bash
bundle exec jekyll serve --port 4001
```

### GitHub Pages Not Updating

**Check:**
1. Go to repository → **Actions** tab
2. Look for failed builds (red X)
3. Click the failed build to see error details

**Common issues:**
- YAML syntax errors in front matter
- Missing files referenced in layouts
- Incorrect file paths

### Jekyll Admin Not Loading

**Solution:**
1. Ensure jekyll-admin is in your Gemfile
2. Run `bundle install`
3. Restart Jekyll: `bundle exec jekyll serve`
4. Navigate to `http://localhost:4000/admin`

## Professional Tips

### Portfolio Best Practices

1. **Quality over quantity:** 5-10 excellent portfolio items are better than 20 mediocre ones
2. **Tell the story:** Don't just list projects—explain challenges, solutions, and outcomes
3. **Show your process:** Describe how you approached the documentation work
4. **Highlight collaboration:** Mention work with engineering, QA, and other teams
5. **Include metrics:** If possible, mention impact (reduced support cases, improved time-to-deployment)

### SEO Considerations

Your site is already configured with jekyll-seo-tag. To improve search visibility:

1. Use descriptive page titles
2. Write clear excerpts for portfolio items
3. Use relevant tags
4. Include keywords naturally in content
5. Link to published documentation when possible

### Maintaining Your Portfolio

Establish a regular update schedule:

- **Monthly:** Review and update any outdated information
- **After completing projects:** Add new portfolio items within 1-2 weeks
- **Quarterly:** Write a new blog post about your experiences
- **Annually:** Review entire site for accuracy and relevance

## Resources

### Jekyll Documentation
- [Jekyll Official Docs](https://jekyllrb.com/docs/)
- [Jekyll Collections](https://jekyllrb.com/docs/collections/)
- [Jekyll Front Matter](https://jekyllrb.com/docs/front-matter/)

### GitHub Pages
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Basics](https://docs.github.com/en/pages/getting-started-with-github-pages)

### Markdown
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)

### Jekyll Admin
- [Jekyll Admin Documentation](https://github.com/jekyll/jekyll-admin)

## Next Steps

1. **Set up locally:** Follow the Quick Start Guide above
2. **Review content:** Check all pages and make any desired adjustments
3. **Add portfolio items:** Create 3-5 strong portfolio pieces
4. **Customize about page:** Ensure it represents you accurately
5. **Deploy to GitHub Pages:** Push to GitHub and enable Pages
6. **Share your portfolio:** Add the link to your resume and LinkedIn profile

## Support

For Jekyll-specific questions: [Jekyll Documentation](https://jekyllrb.com/docs/)  
For GitHub Pages issues: [GitHub Pages Documentation](https://docs.github.com/en/pages)  
For portfolio content questions: Review this README and the sample portfolio items

---

**Portfolio Site:** https://alison-holloway.github.io/  
**Contact:** alison.holloway@pm.me  
**LinkedIn:** [linkedin.com/in/alison-holloway-au](https://linkedin.com/in/alison-holloway-au)