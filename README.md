# Zhao Qi Team - Cancer Bioinformatics Research Group

[![Deploy Hugo site to Pages](https://github.com/likelet/likelet.github.io/actions/workflows/hugo.yml/badge.svg)](https://github.com/likelet/likelet.github.io/actions/workflows/hugo.yml)
[![Hugo](https://img.shields.io/badge/Hugo-0.128.0-blue.svg)](https://gohugo.io)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Official website for Professor Qi Zhao’s Cancer Bioinformatics Research Group at Sun Yat-sen University Cancer Center (SYSUCC).

🌐 **Live Site**: [https://likelet.github.io/](https://likelet.github.io/)

## About

This repository hosts the source code for the Zhao Qi Team website, a multidisciplinary bioinformatics research group focused on gastrointestinal cancer genomics, immunotherapy biomarkers, and computational oncology.

### Research Focus

- **Cancer Immunotherapy Biomarkers** - Multi-omics mining for patient stratification
- **Cancer Genomics Software & Databases** - Open-source tools and workflows
- **Targeted Therapy for GI Cancers** - Druggable target discovery and resistance mechanisms
- **Machine Learning in Oncology** - AI-driven diagnosis and prognosis models
- **Gut Microbiota & Tumor Microenvironment** - Microbiome-immunity interactions

## Tech Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/) v0.128.0 (Extended)
- **Theme**: [HugoBlox Research Group Template](https://github.com/HugoBlox/hugo-blox-builder)
- **Deployment**: GitHub Pages via GitHub Actions
- **Language**: Go modules for Hugo dependencies

## Project Structure

```
.
├── config/_default/          # Hugo configuration files
│   ├── hugo.yaml            # Main site config
│   ├── params.yaml          # Theme parameters
│   ├── menus.yaml           # Navigation menus
│   └── languages.yaml       # i18n settings
├── content/                 # Markdown content
│   ├── authors/             # Team member profiles
│   ├── post/                # News and blog posts
│   ├── publications/        # Research publications (YAML)
│   ├── tool-db/             # Software tools showcase
│   └── _index.md            # Homepage content
├── layouts/                 # Custom Hugo templates
│   ├── partials/            # Reusable components
│   └── publications/        # Publication list layouts
├── .github/workflows/       # CI/CD automation
│   ├── hugo.yml             # Main deployment workflow
│   └── import-publications.yml  # Auto-update publications
└── go.mod                   # Hugo module dependencies
```

## Local Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.128.0+
- [Go](https://go.dev/dl/) 1.15+
- [Git](https://git-scm.com/)

### Setup

```bash
# Clone the repository
git clone https://github.com/likelet/likelet.github.io.git
cd likelet.github.io

# Initialize Hugo modules
hugo mod get -u

# Start development server
hugo server -D

# Visit http://localhost:1313
```

### Build for Production

```bash
hugo --minify
```

The static site will be generated in the `./public` directory.

## Content Management

### Adding Team Members

Create a new author profile in `content/authors/<name>/`:

```markdown
---
title: Full Name
role: Position
organizations:
  - name: Institution
    url: https://example.com
bio: Short bio
social:
  - icon: envelope
    icon_pack: fas
    link: mailto:email@example.com
user_groups:
  - Researchers
---

Detailed biography here.
```

### Adding Publications

Edit `content/publications/publications.yaml`:

```yaml
- title: "Paper Title"
  authors: Author1, Author2, <strong>Zhao Q*</strong>
  link:
    url: https://pubmed.ncbi.nlm.nih.gov/12345678/
    display: Journal Name, Year
  year: 2024
  highlight: 1  # Featured publication
```

### Adding News Posts

Create `content/post/YY-MM-DD/index.md`:

```markdown
---
title: News Title
date: 2024-01-01
---

News content here.
```

### Adding Software Tools

Create `content/tool-db/<tool-name>/index.md`:

```markdown
---
title: Tool Name
summary: Brief description
url_code: https://github.com/user/repo
tags: [Tools]
---

Detailed description.
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions (`.github/workflows/hugo.yml`).

### Manual Deployment

```bash
# Build the site
hugo --minify --baseURL "https://likelet.github.io/"

# Deploy (if using gh-pages branch)
git subtree push --prefix public origin gh-pages
```

## Key Features

- ✅ Responsive design optimized for mobile and desktop
- ✅ Automatic publication import from YAML
- ✅ Team member profiles with social links
- ✅ News/blog system with featured images
- ✅ Software tools showcase
- ✅ Google Scholar integration
- ✅ SEO optimized with structured data
- ✅ Fast build times with Hugo’s incremental rendering

## Customization

### Theme Settings

Edit `config/_default/params.yaml` to customize:
- Site appearance (theme, fonts, colors)
- SEO metadata
- Social media links
- Analytics integration
- Search functionality

### Navigation Menu

Modify `config/_default/menus.yaml` to adjust the site navigation.

### Custom Layouts

Override default templates by creating files in `layouts/` matching the theme structure.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am ‘Add new feature’`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## Team Software Projects

The team has developed several open-source bioinformatics tools:

- **[LncPipe](https://github.com/likelet/LncPipe)** - Nextflow pipeline for lncRNA analysis
- **[Meskit](https://github.com/Niinleslie/MesKit)** - Cancer evolution analysis toolkit
- **[CaMutQC](https://bioconductor.org/packages/CaMutQC/)** - Somatic mutation quality control
- **[CrossICC](https://github.com/bioinformatist/CrossICC)** - Consensus clustering for cancer subtypes
- **[GPS-SUMO](http://sumosp.biocuckoo.org/)** - SUMOylation site prediction

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Professor Qi Zhao**  
Sun Yat-sen University Cancer Center  
📧 zhaoqi@sysucc.org.cn  
🔗 [Google Scholar](https://scholar.google.com/citations?user=j7LCthMAAAAJ)  
💻 [GitHub](https://github.com/likelet)

---

Built with ❤️ using [Hugo](https://gohugo.io/) and [HugoBlox](https://hugoblox.com/)
