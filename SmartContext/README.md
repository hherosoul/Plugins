# SmartContext — Intelligent Conversation Guidelines / 智能对话准则

> Professional Conversation Navigation System: Injects domain-specific, tiered importance guidelines into every conversation, helping LLM focus on critical information and improve the quality and efficiency of professional dialogues. / 专业对话导航系统：向每一次对话注入领域特定的、分级的重要性准则，帮助 LLM 专注于关键信息，提升专业对话的质量和效率。

---

## Table of Contents / 目录

- [Overview / 项目概述](#overview--项目概述)
- [Key Features / 核心特性](#key-features--核心特性)
- [Quick Start / 快速开始](#quick-start--快速开始)
- [Usage Guide / 使用指南](#usage-guide--使用指南)
- [Built-in Skills / 内置领域](#built-in-skills--内置领域)
- [Skill Extension / 技能扩展](#skill-extension--技能扩展)
- [Project Structure / 项目结构](#project-structure--项目结构)
- [Development / 开发指南](#development--开发指南)
- [License / 许可证](#license--许可证)

---

## Overview / 项目概述

**SmartContext** is a professional conversation navigation system designed for OpenClaw. Through a Plugin + Skill hybrid architecture, it enables flexible extension and dynamic injection of domain-specific rules.

**SmartContext** 是为 OpenClaw 设计的专业对话导航系统，通过 Plugin + Skill 的混合架构，实现领域特定规则的灵活扩展和动态注入。

### Core Value / 核心价值

- **Precision Navigation / 精准导航**: Based on 5-tier importance system (Tier 0-4), helps LLM understand what matters / 基于 5 层重要性分级体系 (Tier 0-4)，帮助 LLM 理解什么重要
- **Domain Adaptation / 领域适配**: Pluggable Skill architecture, supports any professional domain / 可插拔的 Skill 架构，支持任意专业领域
- **Manual Control / 手动控制**: User explicitly specifies active domains, precise control over rule application / 用户显式指定活跃领域，精确控制规则生效
- **Non-intrusive Integration / 无侵入集成**: Injects guidelines via `before_prompt_build` hook, does not affect memory-core / 通过 `before_prompt_build` 钩子注入准则，不影响 memory-core
- **Multi-domain Collaboration / 多领域协作**: Supports cross-domain collaboration, automatically handles rule conflicts / 支持跨领域协作，自动处理规则冲突

---

## Key Features / 核心特性

### 1. 5-Tier Priority System / 5 层优先级分级体系

| Tier / 层级 | Description / 描述 | Example / 示例 |
|-------------|--------------------|-----------------|
| **Tier 0** | Always Prioritize (Never Overlook) / 始终优先（绝不能忽视） | User personas, architectural decisions, strong constraints / 用户画像、架构决策、强约束 |
| **Tier 1** | Highest Priority Focus / 最高优先级关注 | Code review, performance optimization, security design / 代码审查、性能优化、安全设计 |
| **Tier 2** | High Priority Attention / 高优先级注意 | Requirements doc, detailed design, test cases / 需求文档、详细设计、测试用例 |
| **Tier 3** | Keep In Mind / 记住这些 | Coding conventions, project config, debug records / 编码规范、项目配置、调试记录 |
| **Tier 4** | Can Reference Briefly / 可以简要参考 | General knowledge, confirmatory responses, duplicate content / 通用知识、确认回复、重复内容 |

### 2. Plugin + Skill Hybrid Architecture / Plugin + Skill 混合架构

```
SmartContext Plugin (Framework / 框架)
├── Core: Guideline Injection Engine / 核心：准则注入引擎
├── Config: Domain Selection Management / 配置：领域选择管理
└── Extension: Skill Loader / 扩展：Skill 加载器

Skill (Domain Rules / 领域规则)
├── General Purpose / 通用
├── Software Engineering / 软件工程
├── Bioinformatics / 生物信息学
└── Floriculture / 花艺
```

### 3. Multi-domain Composition / 多领域组合

Supports activating multiple domains simultaneously, automatically handles rule conflicts and cross-domain collaboration.

支持同时激活多个领域，自动处理规则冲突和跨领域协作。

---

## Quick Start / 快速开始

### Installation / 安装

Install the plugin using OpenClaw's plugin manager:

使用 OpenClaw 的插件管理器安装：

```bash
openclaw plugins install clawhub:smartcontext/smartcontext
```

Or using the package name directly:

或者直接使用包名：

```bash
openclaw plugins install @smartcontext/openclaw-plugin
```

After installation, restart the OpenClaw gateway:

安装完成后，重启 OpenClaw gateway：

```bash
openclaw gateway restart
```

### Basic Usage / 基本使用

```bash
# View current configuration / 查看当前配置
/smartcontext-config

# List available skills / 列出可用领域
/smartcontext-list-skills

# Switch to specified skill (replaces others) / 切换到指定领域（替换其他）
/smartcontext-use software-engineering

# Add skill / 添加领域
/smartcontext-add bioinformatics

# Remove skill / 移除领域
/smartcontext-remove software-engineering

# Set role tags (overwrites) / 设置角色标签（覆盖）
/smartcontext-set-role frontend typescript react

# Add role tags / 添加角色标签
/smartcontext-add-role backend

# Remove role tags / 移除角色标签
/smartcontext-remove-role frontend

# Clear all role tags / 清除所有角色标签
/smartcontext-clear-role

# Pin important content / 标记重要内容
/smartcontext-pin "This project must support offline functionality / 本项目必须支持离线功能"

# Show pinned content / 显示固定内容
/smartcontext-show-pinned

# Unpin at index (1-based) / 取消固定指定索引（从 1 开始）
/smartcontext-unpin-at 1

# Unpin all / 取消所有固定
/smartcontext-unpin-all

# Reset to default config / 重置为默认配置
/smartcontext-reset

# Install new skill / 安装新技能
/smartcontext-install-skill my-domain /path/to/SKILL.md

# Uninstall skill / 卸载技能
/smartcontext-uninstall-skill my-domain
```

---

## Usage Guide / 使用指南

### Configuration / 配置说明

| Config Item / 配置项 | Type / 类型 | Description / 说明 | Default / 默认值 |
|----------------------|-------------|---------------------|------------------|
| `activeDomains` | `string[]` | List of active domain IDs / 启用的领域 ID 列表 | `[]` |
| `roleTags` | `string[]` | User role tags / 用户角色标签 | `[]` |
| `pinnedItems` | `string[]` | User-pinned important content / 用户手动标记的重要内容 | `[]` |

---

## Built-in Skills / 内置领域

### 1. General Purpose / 通用

Suitable for all scenarios, provides basic conversation guidelines.

适用于所有场景，提供基础的对话准则。

**Key focus / 核心重点：**
- User's core needs and goals / 用户的核心需求和目标
- Core constraints that must be followed / 必须遵守的核心约束
- Critical decisions and important choices / 关键决策和重要选择

### 2. Software Engineering / 软件工程

Covers the complete lifecycle including requirements analysis, architecture design, coding implementation, testing validation, deployment, and operations.

覆盖完整的软件开发生命周期，包括需求分析、架构设计、编码实现、测试验证、部署运维。

**Key focus / 核心重点：**
- User personas, core usage scenarios, key business rules / 用户画像、核心使用场景、关键业务规则
- Confirmed architectural decisions: technology choices, architectural style, system boundaries, module division / 已确认的架构决策：技术选型、架构风格、系统边界、模块划分
- Code review comments and fix records / 代码审查意见和修复记录
- Security design and privacy protection measures / 安全设计和隐私保护措施
- Database schemas and API contracts / 数据库 schema 和 API 契约

### 3. Bioinformatics / 生物信息学

Integrates biology, computer science, mathematics, and statistics to analyze and interpret biological data.

整合生物学、计算机科学、数学和统计学，用于分析和解释生物数据。

**Key focus / 核心重点：**
- Research objectives, core biological hypotheses, key experimental designs / 研究目标、核心生物学假设、关键实验设计
- Confirmed analysis pipelines: tool chains, parameter configurations, quality control standards / 已确认的分析流程：工具链、参数配置、质量控制标准
- Genomic sequence alignment results and variant calling records / 基因组序列比对结果和变异检测记录
- Patient consent information and data privacy protocols / 患者知情同意信息和数据隐私协议

### 4. Floriculture / 花艺

Integrates horticulture, botany, and environmental science to optimize plant growth, health, and aesthetics.

整合园艺学、植物学和环境科学，优化植物生长、健康和美观。

**Key focus / 核心重点：**
- Gardening objectives, core plant health goals, key cultivation strategies / 园艺目标、核心植物健康目标、关键栽培策略
- Confirmed care regimes: species-specific requirements, critical growth parameters, pest management protocols / 已确认的养护方案：物种特定要求、关键生长参数、病虫害管理协议
- Plant identification results and species-specific care requirements / 植物鉴定结果和物种特定养护要求
- Pest and disease diagnosis records and treatment protocols / 病虫害诊断记录和治疗方案

---

## Skill Extension / 技能扩展

### Creating a New Skill / 创建新技能

**Important / 重要：**
- The skill file **must be named `SKILL.md`** (exact name, case-sensitive) / 技能文件**必须命名为 `SKILL.md`**（精确名称，大小写敏感）
- You can write any format that makes sense to LLM / 你可以写任何 LLM 能理解的格式
- The plugin directly passes the raw content to LLM / 插件直接把原始内容传给大模型

### Quick Steps / 快速步骤

```bash
# 1. Write your SKILL.md file (any format works!) / 编写你的 SKILL.md 文件（任何格式都可以！）

# 2. Install the skill / 安装技能
/smartcontext-install-skill my-domain /path/to/your/SKILL.md

# 3. Enable the skill / 启用技能
/smartcontext-add my-domain
```

### SKILL.md Template / SKILL.md 模板

You can use this as a starting point, but feel free to modify it in any way that works for your domain:

你可以以此为起点，但可以根据你的领域自由修改：

```markdown
# SmartContext Skill: Your Domain Name / 你的领域名称

## Domain Summary / 领域摘要

Brief description of what this domain is about and what it covers.

简要说明这个领域是关于什么的，涵盖哪些内容。

## Priority Declaration / 优先级声明

When rules from this domain conflict with other domains, priority: High/Medium/Low

当此领域的规则与其他领域冲突时，优先级：高/中/低

## Priority Guidelines (Tier 0 → Tier 4) / 优先级指南 (Tier 0 → Tier 4)

### Tier 0 — Always Prioritize (Never Overlook) / 始终优先（绝不能忽视）
- Most important content / 最重要的内容
- Things that must never be overlooked / 绝不能忽视的事情

### Tier 1 — Highest Priority Focus / 最高优先级关注
- Very important content / 非常重要的内容
- Things that should be focused on / 应该重点关注的事情

### Tier 2 — High Priority Attention / 高优先级注意
- Important content / 重要内容
- Things that need attention / 需要注意的事情

### Tier 3 — Keep In Mind / 记住这些
- Useful information / 有用的信息
- Things to remember / 要记住的事情

### Tier 4 — Can Reference Briefly / 可以简要参考
- Less important content / 不太重要的内容
- Things that can be referenced briefly / 可以简要参考的事情

## Dynamic Adjustment Rules / 动态调整规则

- Any dynamic rules you want / 任何你想要的动态规则

## Domain-Specific Rules / 领域特定规则

- Any domain-specific rules / 任何领域特定的规则

## Cross-Domain Collaboration / 跨领域协作

- How to collaborate with other domains / 如何与其他领域协作
```

### Reference Existing Skills / 参考现有技能

For real-world examples, check the built-in skills in the `skills/` directory:

想要真实示例，请查看 `skills/` 目录下的内置技能：

- `skills/smartcontext-general-purpose/SKILL.md`
- `skills/smartcontext-software-engineering/SKILL.md`
- `skills/smartcontext-bioinformatics/SKILL.md`
- `skills/smartcontext-floriculture/SKILL.md`

### Uninstalling a Skill / 卸载技能

```bash
# Uninstall a skill / 卸载技能
/smartcontext-uninstall-skill my-domain
```

---

## Project Structure / 项目结构

```
smartcontext-plugin/
├── openclaw.plugin.json          # Plugin Manifest / 插件清单
├── package.json                  # npm package config / npm 包配置
├── tsconfig.json                 # TypeScript config / TypeScript 配置
├── README.md                     # This file / 本文件
│
├── src/
│   ├── index.ts                  # Plugin entry / 插件入口
│   ├── types.ts                  # Global type definitions / 全局类型定义
│   │
│   ├── core/                     # Core modules / 核心模块
│   │   ├── guideline-engine.ts   # Guideline generation engine / 准则生成引擎
│   │   ├── skill-loader.ts       # Skill discovery & loading / Skill 发现与加载
│   │   ├── domain-composer.ts    # Multi-domain rule composition / 多领域规则组合
│   │   ├── prompt-builder.ts     # Prompt text builder / Prompt 文本构建器
│   │   ├── skill-discovery.ts    # Skill discoverer / Skill 发现器
│   │   └── skill-manager.ts      # Skill manager / Skill 管理器
│   │
│   ├── commands/                 # User commands / 用户命令
│   │   └── index.ts              # Command registration / 命令注册
│   │
│   ├── config/                   # Config management / 配置管理
│   │   ├── schema.ts             # Config schema / 配置 Schema
│   │   ├── defaults.ts           # Default config values / 默认配置值
│   │   └── store.ts              # Config storage / 配置存储
│   │
│   └── utils/                    # Utilities / 工具
│       ├── markdown-parser.ts    # Simple Skill markdown parser / 简单的 Skill Markdown 解析器
│       ├── logger.ts             # Logger / 日志工具
│       └── cache.ts              # Cache / 内存缓存
│
├── skills/                       # Built-in skills / 内置技能
│   ├── smartcontext-general-purpose/
│   ├── smartcontext-software-engineering/
│   ├── smartcontext-bioinformatics/
│   └── smartcontext-floriculture/
│
└── dist/                         # Build output / 构建输出
```

---

## Development / 开发指南

### Local Development / 本地开发

```bash
# 1. Install dependencies / 安装依赖
npm install

# 2. Build the project / 构建项目
npm run build
```

### Build for Release / 发布构建

```bash
# Build the project / 构建项目
npm run build
```

---

## Boundaries with OpenClaw / 与 OpenClaw 的职责边界

| Responsibility / 职责 | OpenClaw | SmartContext Plugin |
|------------------------|----------|----------------------|
| Context Management / 上下文管理 | ✅ Full responsibility / 完全负责 | ❌ Not involved / 不介入 |
| Memory Compression / 内存压缩 | ✅ Full responsibility / 完全负责 | ❌ Not involved / 不介入 |
| Prompt Building / Prompt 构建 | ✅ Full responsibility / 完全负责 | ✅ Inject system context / 注入系统上下文 |
| Domain Rule Extension / 领域规则扩展 | ❌ Not provided / 不提供 | ✅ Plugin + Skill architecture |
| User Config Management / 用户配置管理 | ❌ Not provided / 不提供 | ✅ Command-line interface / 命令行接口 |

---

## License / 许可证

This project is licensed under the MIT License.

本项目采用 MIT 许可证。

---

**SmartContext** — Make professional conversations more efficient! / 让专业对话更高效！
