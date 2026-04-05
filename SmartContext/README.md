# SmartContext — Intelligent Conversation Guidelines

<div align="center">

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-org/smartcontext)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-2026.4.2%2B-orange.svg)](https://docs.openclaw.ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-blue.svg)](https://www.typescriptlang.org/)

**Professional Conversation Navigation System for OpenClaw**

[Features](#features) • [Quick Start](#quick-start) • [Contributing](#contributing)

</div>

---

## 📖 Overview

**SmartContext** is a professional conversation navigation system designed for OpenClaw. It injects domain-specific, tiered importance guidelines into every conversation, helping LLMs focus on critical information and significantly improving the quality and efficiency of professional conversations.

### Core Value Proposition

- 🎯 **Precise Navigation**: 5-tier importance hierarchy (Tier 0-4) helps LLMs understand what matters
- 🔌 **Domain Adaptation**: Plugin + Skill hybrid architecture for flexible domain-specific rule expansion
- 🎛️ **Manual Control**: Users explicitly specify active domains for precise rule control
- 🚀 **Non-Intrusive**: Injects guidelines via `before_prompt_build` hook without affecting memory-core
- 🔗 **Multi-Domain Collaboration**: Supports cross-domain collaboration with automatic conflict resolution

---

## ✨ Features

### 1. 5-Tier Importance Hierarchy

| Tier | Description | Examples |
|------|-------------|----------|
| **Tier 0** | Always Prioritize (Never Overlook) | User personas, architecture decisions, hard constraints |
| **Tier 1** | Highest Priority Focus | Code reviews, performance optimization, security design |
| **Tier 2** | High Priority Attention | Requirements docs, detailed design, test cases |
| **Tier 3** | Keep In Mind | Coding standards, project configs, debug records |
| **Tier 4** | Can Reference Briefly | General knowledge, confirmations, duplicate content |

### 2. Plugin + Skill Hybrid Architecture

```
SmartContext Plugin (Framework)
├── Core: Guideline Injection Engine
├── Config: Domain Selection Management
└── Extension: Skill Loader

Skill (Domain Rules)
├── General Purpose
├── Software Engineering
├── Bioinformatics
└── Floriculture
```

### 3. User Role Adaptation

Dynamically adjust rule priorities based on user role tags:

| Tag | Enhanced Focus Areas |
|-----|---------------------|
| `frontend` | UI constraints, component design, styling solutions |
| `backend` | API contracts, database design, performance metrics |
| `architect` | Architecture decisions, module partitioning, tech selection |
| `devops` | Deployment configs, CI/CD pipelines, monitoring |
| `fullstack` | Balanced across all layers (no adjustment) |

### 4. Multi-Domain Composition

Supports activating multiple domains simultaneously with automatic conflict resolution and cross-domain collaboration.

---

## 🚀 Quick Start

### Prerequisites

- OpenClaw 2026.4.2 or later
- Node.js 18+

### Installation

Install the plugin using OpenClaw's plugin manager:

```bash
openclaw plugins install clawhub:smartcontext/smartcontext
```

Or using the package name directly:

```bash
openclaw plugins install @smartcontext/openclaw-plugin
```

After installation, restart the OpenClaw gateway:

```bash
openclaw gateway restart
```

**Optional:** Configure your initial settings using the commands in [Basic Usage](#basic-usage).

### Basic Usage

```bash
# Configuration commands
/smartcontext-config                    # View current configuration
/smartcontext-reset                     # Reset to default configuration

# Skill management commands
/smartcontext-list-skills               # List all available skills
/smartcontext-use <skill-id>            # Use only the specified skill
/smartcontext-add <skill-id>            # Add skill
/smartcontext-remove <skill-id>         # Remove skill
/smartcontext-install-skill <name> <path>  # Install new skill
/smartcontext-uninstall-skill <name>    # Uninstall skill

# Role management commands
/smartcontext-set-role <tag1> <tag2>    # Set role tags (overwrites)
/smartcontext-add-role <tag1> <tag2>    # Add role tags
/smartcontext-remove-role <tag1> <tag2> # Remove role tags
/smartcontext-clear-role                 # Clear all role tags

# Pinned content commands
/smartcontext-pin "content"              # Pin important content
/smartcontext-show-pinned                # Show all pinned content
/smartcontext-unpin-at <index>           # Unpin at index (1-based)
/smartcontext-unpin-all                  # Unpin all content
```

---

## 🏗️ Project Structure

```
smartcontext-plugin/
├── openclaw.plugin.json          # Plugin Manifest (required)
├── package.json                  # npm package configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # This file
│
├── src/
│   ├── index.ts                  # Plugin entry
│   ├── types.ts                  # Global type definitions
│   │
│   ├── core/                     # Core modules
│   │   ├── guideline-engine.ts
│   │   ├── skill-loader.ts
│   │   ├── domain-composer.ts
│   │   ├── role-adapter.ts
│   │   ├── prompt-builder.ts
│   │   ├── skill-discovery.ts
│   │   └── skill-manager.ts
│   │
│   ├── commands/                 # User commands
│   │   └── index.ts
│   │
│   ├── config/                   # Configuration management
│   │   ├── schema.ts
│   │   ├── defaults.ts
│   │   └── store.ts
│   │
│   └── utils/                    # Utilities
│       ├── markdown-parser.ts
│       ├── logger.ts
│       └── cache.ts
│
├── skills/                       # Built-in skills
│   ├── smartcontext-general-purpose/
│   ├── smartcontext-software-engineering/
│   ├── smartcontext-bioinformatics/
│   └── smartcontext-floriculture/
│
└── dist/                         # Build output
```

---

## ⚙️ Configuration

### Configuration Schema

| Config Item | Type | Description | Default |
|-------------|------|-------------|---------|
| `activeDomains` | `string[]` | List of enabled domain IDs | `[]` |
| `roleTags` | `string[]` | User role tags (e.g., frontend, backend, architect) | `[]` |
| `pinnedItems` | `string[]` | User manually marked important content (Tier 0 always prioritized) | `[]` |

### Example Configuration

```typescript
{
  plugins: {
    entries: {
      "smartcontext": {
        enabled: true,
        config: {
          activeDomains: ["software-engineering", "bioinformatics"],
          roleTags: ["backend", "architect"],
          pinnedItems: [
            "This project uses TypeScript, no jQuery allowed",
            "Must support mobile responsive design"
          ]
        }
      }
    }
  }
}
```

---

## 🔧 Skill Extension

### Creating Custom Skills

#### Step 1: Create SKILL.md File

First, create your skill file. **Important Notes:**
- ⚠️ **Must use `SKILL.md` as the filename** (exact capitalization)
- Skill name can only contain lowercase letters, numbers, and hyphens

```markdown
# SmartContext Skill: Writing

## Domain Summary

Guidelines for writing and content creation, helping LLMs focus on key content elements, style requirements, and quality standards.

## Priority Declaration

When this domain's rules conflict with others, priority: **medium**

## Priority Guidelines (Tier 0 → Tier 4)

### Tier 0 — Always Prioritize (Never Overlook)
- Target audience and content purpose
- Tone and voice requirements
- Content format specifications
- Any "must" or "must not" constraints

### Tier 1 — Highest Priority Focus
- Key messages and core arguments
- Content structure and outline
- Fact-checking and accuracy requirements
- Style guide compliance

### Tier 2 — High Priority Attention
- Supporting evidence and references
- Word count and length requirements
- SEO keywords and meta descriptions
- Call-to-action elements

### Tier 3 — Keep In Mind
- Grammar and spelling conventions
- Brand voice guidelines
- Content calendar deadlines
- Platform-specific formatting

### Tier 4 — Can Reference Briefly
- General writing tips
- Thesaurus suggestions
- Common grammar rules
- Generic templates

## Dynamic Adjustment Rules

1. **Reference Frequency Boost**: Content repeatedly mentioned by user → +1 Tier
2. **Draft Iteration Focus**: When discussing revisions → draft feedback +1 Tier
3. **Audience-Specific Boost**: When target audience is mentioned → audience-related rules +1 Tier

## Domain-Specific Rules

1. Always prioritize clarity over complexity
2. Maintain consistent terminology throughout
3. Ensure actionable takeaways for the reader

## User Role Adaptation

### Predefined Tags → Priority Adjustment Rules

| Tag | Enhanced Items | Adjustment |
|-----|----------------|------------|
| `copywriter` | Tone, voice, brand guidelines | Related items +1 Tier |
| `technical-writer` | Accuracy, technical precision, documentation structure | Related items +1 Tier |
| `content-marketer` | SEO, CTAs, conversion elements | Related items +1 Tier |

### Fallback Rule
Unconfigured roles use default Tier execution without adjustment.

## Cross-Domain Collaboration

When collaborating with software-engineering:
- API documentation accuracy takes priority over stylistic preferences
- Technical accuracy must be verified before publishing
```

#### Step 2: Install the Skill

Use the install command to add your skill to the plugin. The plugin will automatically create the proper directory structure:

```bash
# Syntax
/smartcontext-install-skill <skill-name> <SKILL.md-path>

# Example (install the writing skill we just created)
/smartcontext-install-skill writing /Users/you/Desktop/writing/SKILL.md
```

#### Step 3: Enable the Skill

After installation, enable your new skill:

```bash
# Add to existing active domains
/smartcontext-add writing

# Or use only this skill
/smartcontext-use writing
```

#### Uninstalling a Skill

```bash
/smartcontext-uninstall-skill writing
```

### SKILL.md Required Sections

| Section | Required | Description |
|---------|----------|-------------|
| `# SmartContext Skill: {Name}` | ✅ Yes | Title line, exact format |
| `## Domain Summary` | ✅ Yes | 1-3 sentence domain description |
| `## Priority Declaration` | ✅ Yes | Priority declaration |
| `## Priority Guidelines (Tier 0 → Tier 4)` | ✅ Yes | 5-tier priority guidelines |
| `### Tier 0` | ✅ Yes | Always prioritize content |
| `### Tier 1-4` | ⚠️ Recommended | Other tiers (at minimum Tier 0 is required) |
| `## Dynamic Adjustment Rules` | ❌ Optional | Dynamic adjustment rules |
| `## Domain-Specific Rules` | ❌ Optional | Domain-specific rules |
| `## User Role Adaptation` | ❌ Optional | User role adaptation |
| `## Cross-Domain Collaboration` | ❌ Optional | Cross-domain collaboration |

### Reference Existing Skills

For inspiration, look at the built-in skills in the `skills/` directory:
- `smartcontext-general-purpose/` - General purpose guidelines
- `smartcontext-software-engineering/` - Software engineering domain
- `smartcontext-bioinformatics/` - Bioinformatics domain
- `smartcontext-floriculture/` - Floriculture domain

---

## 🛠️ Development & Contributing

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build
```

### User Installation

```bash
# User installation command
openclaw plugins install clawhub:smartcontext/smartcontext

# Or directly use package name
openclaw plugins install @smartcontext/openclaw-plugin
```

---

## 📋 OpenClaw Responsibility Boundaries

| Responsibility | OpenClaw | SmartContext Plugin |
|----------------|-----------|----------------------|
| Context Management | ✅ Fully responsible | ❌ Not involved |
| Memory Compression | ✅ Fully responsible | ❌ Not involved |
| Prompt Construction | ✅ Fully responsible | ✅ Inject system context |
| Domain Rule Extension | ❌ Not provided | ✅ Plugin + Skill architecture |
| User Config Management | ❌ Not provided | ✅ Provide CLI interface |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to the OpenClaw team for providing the excellent Plugin SDK
- Inspired by professional conversation navigation needs in software engineering and beyond

---

## 📞 Support

If you have any questions or issues, please:

1. Search existing [issues](../../issues)
2. Open a new [issue](../../issues/new)

---

<div align="center">

**SmartContext** — Making Professional Conversations More Efficient!

[⬆ Back to Top](#smartcontext--intelligent-conversation-guidelines)

</div>
