# SmartContext — Intelligent Conversation Guidelines

<div align="center">

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-org/smartcontext)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-2026.4.2%2B-orange.svg)](https://docs.openclaw.ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-blue.svg)](https://www.typescriptlang.org/)

**Professional Conversation Navigation System for OpenClaw**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

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

1. **Configure the plugin in OpenClaw:**

```typescript
// openclaw.config.ts
{
  plugins: {
    entries: {
      "smartcontext": {
        enabled: true,
        config: {
          activeDomains: ["software-engineering"],
          roleTags: ["frontend"],
          pinnedItems: ["This project uses TypeScript"]
        }
      }
    }
  }
}
```

2. **Restart OpenClaw:**

```bash
openclaw restart
```

### Basic Usage

```bash
# View current configuration
/smartcontext-config

# List available domains
/smartcontext-list

# Switch to specific domain (replace others)
/smartcontext-use software-engineering

# Add domain
/smartcontext-add bioinformatics

# Remove domain
/smartcontext-remove software-engineering

# Set user role tags (replace existing)
/smartcontext-set-role frontend typescript react

# Add role tag(s)
/smartcontext-add-role backend

# Remove role tag(s)
/smartcontext-remove-role frontend

# Clear all role tags
/smartcontext-clear-role

# Pin important content
/smartcontext-pin "This project must support offline functionality"

# Unpin content by index (0-based)
/smartcontext-unpin 0
```

---

## 🏗️ Project Structure

```
smartcontext-plugin/
├── openclaw.plugin.json          # Plugin Manifest (required)
├── package.json                  # npm package configuration
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.ts              # Test configuration
├── README.md                     # Project documentation (Chinese)
│
├── src/
│   ├── index.ts                  # Plugin entry — definePluginEntry
│   ├── types.ts                  # Global type definitions
│   │
│   ├── core/
│   │   ├── guideline-engine.ts   # Guideline generation engine (core: before_prompt_build hook)
│   │   ├── skill-loader.ts       # Skill discovery and loading
│   │   ├── domain-composer.ts    # Multi-domain rule composition
│   │   ├── role-adapter.ts       # User role adaptation
│   │   ├── prompt-builder.ts     # Prompt text builder
│   │   ├── skill-discovery.ts    # Skill discoverer
│   │   └── skill-manager.ts      # Skill manager
│   │
│   ├── commands/
│   │   └── index.ts              # Command registration entry
│   │
│   ├── config/
│   │   ├── schema.ts             # configSchema definition (JSON Schema + Zod)
│   │   ├── defaults.ts           # Default configuration values
│   │   └── store.ts              # Runtime config read/write (disk-based persistence)
│   │
│   └── utils/
│       ├── markdown-parser.ts    # Skill Markdown → structured data parser
│       ├── logger.ts             # Logging utility (api.runtime.logging)
│       └── cache.ts              # Memory cache (Skill rule cache, etc.)
│
├── skills/                       # Built-in Skill templates
│   ├── smartcontext-general-purpose/
│   ├── smartcontext-software-engineering/
│   ├── smartcontext-bioinformatics/
│   └── smartcontext-floriculture/
│
│
├── dist/                         # Build output
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

1. **Create Skill directory:**

```bash
mkdir -p skills/smartcontext-my-domain
```

2. **Create SKILL.md file:**

```markdown
# SmartContext Skill: My Domain

## Domain Summary

Brief description of your domain (1-3 sentences).

## Priority Declaration

When this domain's rules conflict with others, priority: **high**

## Priority Guidelines (Tier 0 → Tier 4)

### Tier 0 — Always Prioritize (Never Overlook)
- Rule item 1
- Rule item 2

### Tier 1 — Highest Priority Focus
- Rule item

### Tier 2 — High Priority Attention
- Rule item

### Tier 3 — Keep In Mind
- Rule item

### Tier 4 — Can Reference Briefly
- Rule item

## Dynamic Adjustment Rules

1. **Rule Type**: Description
2. ...

## Domain-Specific Rules

1. Rule
2. ...

## User Role Adaptation

### Predefined Tags → Priority Adjustment Rules

| Tag | Enhanced Items | Adjustment |
|-----|----------------|------------|
| {tag} | {pattern} | Related items +1 Tier |

### Fallback Rule
Unconfigured roles use default Tier execution without adjustment.

## Cross-Domain Collaboration

When collaborating with {target domain}:
- Collaboration rule
```

3. **Enable the domain:**

```bash
/smartcontext-add my-domain
```

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

1. Check the [documentation](papers/)
2. Search existing [issues](../../issues)
3. Open a new [issue](../../issues/new)

---

<div align="center">

**SmartContext** — Making Professional Conversations More Efficient!

[⬆ Back to Top](#smartcontext--intelligent-conversation-guidelines)

</div>
