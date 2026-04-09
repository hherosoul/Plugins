# 🧠 DomainAwareCompaction — 领域感知压缩插件

OpenClaw 插件，通过智能注入领域规则，让上下文压缩更精准！

---

## 🌟 核心特性 | Core Features

- **领域感知压缩**：根据不同领域的专业规则，智能保留关键信息
- **多领域支持**：预安装 4 个领域技能，可轻松扩展
- **动态切换**：实时启用/禁用领域，规则自动合并
- **优先级系统**：Tier 0-4 分级规则，确保重要信息不丢失

---

- **Domain-aware compaction**: Intelligently preserve critical information based on domain-specific rules
- **Multi-domain support**: 4 pre-installed domain skills, easily extensible
- **Dynamic switching**: Enable/disable domains in real-time, rules auto-merge
- **Priority system**: Tier 0-4 graded rules ensure important information is not lost

---

## 📦 预安装的领域技能 | Pre-installed Domain Skills

| 领域 | 技能 ID | 用途 |
|------|---------|------|
| 🌐 通用 | `dac-general-purpose` | 适用于所有场景的基础压缩规则 |
| 💻 软件工程 | `dac-software-engineering` | 软件开发、架构设计、API 契约 |
| 🌸 园艺 | `dac-floriculture` | 植物栽培、园艺管理、花卉养护 |
| 🧬 生物信息学 | `dac-bioinformatics` | 基因组分析、蛋白质结构、生物数据 |

---

| Domain | Skill ID | Purpose |
|--------|----------|---------|
| 🌐 General | `dac-general-purpose` | Basic compaction rules for all scenarios |
| 💻 Software Engineering | `dac-software-engineering` | Software development, architecture design, API contracts |
| 🌸 Floriculture | `dac-floriculture` | Plant cultivation, gardening management, flower care |
| 🧬 Bioinformatics | `dac-bioinformatics` | Genome analysis, protein structures, biological data |

---

## 🚀 快速开始 | Quick Start

### 安装 | Installation

在 OpenClaw 中安装此插件。

Install this plugin in OpenClaw.

### 基本使用 | Basic Usage

1. **列出所有可用技能** | **List all available skills**

```
/dac-list-skills
```

2. **启用一个领域** | **Enable a domain**

```
/dac-add dac-software-engineering
```

3. **查看当前配置** | **View current config**

```
/dac-config
```

4. **添加更多领域** | **Add more domains**

```
/dac-add dac-floriculture
```

5. **切换到单一领域** | **Switch to single domain**

```
/dac-use dac-bioinformatics
```

---

## ⚡ 完整命令列表 | Complete Command List

| 命令 | 功能 | 示例 |
|------|------|------|
| `/dac-list-skills` | 列出所有可用技能 | `/dac-list-skills` |
| `/dac-use <skill-id>` | 切换到单一技能（禁用其他） | `/dac-use dac-software-engineering` |
| `/dac-add <skill-id>` | 添加技能到已启用列表 | `/dac-add dac-floriculture` |
| `/dac-remove <skill-id>` | 从已启用列表移除技能 | `/dac-remove dac-floriculture` |
| `/dac-config` | 查看当前配置 | `/dac-config` |
| `/dac-set-compaction-level <level>` | 设置压缩级别（conservative|balanced|aggressive） | `/dac-set-compaction-level balanced` |
| `/dac-reset` | 重置为默认配置 | `/dac-reset` |

---

| Command | Function | Example |
|---------|----------|---------|
| `/dac-list-skills` | List all available skills | `/dac-list-skills` |
| `/dac-use <skill-id>` | Switch to single skill (disable others) | `/dac-use dac-software-engineering` |
| `/dac-add <skill-id>` | Add skill to enabled list | `/dac-add dac-floriculture` |
| `/dac-remove <skill-id>` | Remove skill from enabled list | `/dac-remove dac-floriculture` |
| `/dac-config` | View current config | `/dac-config` |
| `/dac-set-compaction-level <level>` | Set compaction level (conservative|balanced|aggressive) | `/dac-set-compaction-level balanced` |
| `/dac-reset` | Reset to default config | `/dac-reset` |

---

## 🎯 工作原理 | How It Works

### 压缩优先级系统 | Compaction Priority System

每个领域规则分为 5 个优先级层级：

Each domain rule is divided into 5 priority tiers:

| 层级 | 重要性 | 压缩处理 |
|------|--------|---------|
| Tier 0 | 最高 | 必须完整保留，不得压缩 |
| Tier 1 | 高 | 几乎完整保留，最小化压缩 |
| Tier 2 | 中高 | 适度压缩，但保留核心 |
| Tier 3 | 中 | 可以压缩，保留摘要 |
| Tier 4 | 低 | 可以安全地大幅压缩或移除 |

---

| Tier | Importance | Compaction Handling |
|------|------------|---------------------|
| Tier 0 | Highest | Must preserve completely, no compression |
| Tier 1 | High | Preserve almost entirely, minimal compression |
| Tier 2 | Medium-High | Moderate compression, but keep core |
| Tier 3 | Medium | Can compress, keep summary |
| Tier 4 | Low | Can safely compress heavily or remove |

---

### 规则注入机制 | Rule Injection Mechanism

使用 `before_prompt_build` 钩子，在每次 LLM 调用前自动注入领域规则，确保：

Uses `before_prompt_build` hook to automatically inject domain rules before each LLM call, ensuring:

- 压缩时遵循领域专业知识
- 关键信息得到优先保护
- 上下文摘要更精准

---

- Compaction follows domain expertise
- Critical information gets priority protection
- Context summaries are more precise

---

## 🛠️ 创建自定义领域技能 | Create Custom Domain Skills

### 技能目录结构 | Skill Directory Structure

```
skills/
└── dac-my-domain/
    └── SKILL.md
```

### 手动安装自定义技能 | Manually Install Custom Skill

1. **创建技能目录** | **Create skill directory**
   
   在插件的 `skills/` 目录下创建新文件夹，命名为 `dac-<your-domain-name>`：
   
   Create a new folder under the plugin's `skills/` directory, named `dac-<your-domain-name>`:
   
   ```
   skills/dac-my-domain/
   ```

2. **创建 SKILL.md 文件** | **Create SKILL.md file**
   
   在该目录下创建 `SKILL.md` 文件。

   Create a `SKILL.md` file in that directory.

3. **重启 OpenClaw** 或 **重新加载插件** | **Restart OpenClaw** or **reload plugin**
   
   插件会自动发现新技能。

   The plugin will automatically discover the new skill.

### 使用大模型生成领域规则 | Use LLM to Generate Domain Rules

你可以使用以下提示词让大模型帮你生成领域规则：

You can use the following prompt to let LLM help you generate domain rules:

---

**提示词 | Prompt:**

```
请帮我创建一个领域感知压缩的 SKILL.md 文件。请遵循以下要求：

1. **YAML 前导元数据**（必填）：
   - `name`: 领域名称（小写，用连字符连接，如 "software-engineering"）
   - `description`: 1-2 句话描述这个领域的压缩规则用途

2. **Tier 0 (Must Preserve - 必须完整保留)**：
   - 列出该领域最重要、绝对不能丢失的核心概念
   - 如：架构决策、API 契约、安全策略等

3. **Tier 1 (Preserve Almost Entirely - 几乎完整保留)**：
   - 列出非常重要的信息，可以小幅压缩但必须保留核心
   - 如：技术规范、关键参数、重要细节

4. **Tier 2 (Compress Moderately - 适度压缩)**：
   - 列出可以适度压缩的信息，保留摘要即可
   - 如：支持性信息、实现细节

5. **Tier 3 (Compress Heavily - 大幅压缩)**：
   - 列出可以大幅压缩的信息
   - 如：背景上下文、示例、次要解释

6. **Tier 4 (Can Remove - 可以移除)**：
   - 列出可以安全移除的信息
   - 如：琐碎细节、重复内容、无关闲聊

请用具体的领域术语，不要用占位符。
```

---

```
Please help me create a SKILL.md file for domain-aware compaction. Please follow these requirements:

1. **YAML front matter** (required):
   - `name`: Domain name (lowercase, hyphen-separated, e.g., "software-engineering")
   - `description`: 1-2 sentences describing the purpose of this domain's compaction rules

2. **Tier 0 (Must Preserve)**:
   - List the most important core concepts of this domain that absolutely cannot be lost
   - E.g., architectural decisions, API contracts, security policies, etc.

3. **Tier 1 (Preserve Almost Entirely)**:
   - List very important information that can be slightly compressed but must keep the core
   - E.g., technical specifications, key parameters, important details

4. **Tier 2 (Compress Moderately)**:
   - List information that can be moderately compressed, just keep a summary
   - E.g., supporting information, implementation details

5. **Tier 3 (Compress Heavily)**:
   - List information that can be heavily compressed
   - E.g., background context, examples, secondary explanations

6. **Tier 4 (Can Remove)**:
   - List information that can be safely removed
   - E.g., trivial details, repetitive content, unrelated chit-chat

Please use specific domain terminology, no placeholders.
```

---

### 生成后的 SKILL.md 示例 | Generated SKILL.md Example

```markdown
---
name: my-domain
description: "My domain rules for intelligent context compaction: preserves core concepts, critical data, and key decisions while compressing non-critical content."
---

# Domain: My Domain

## Tier 0 (Must Preserve - 必须完整保留)
- [ ] Core domain concepts and definitions
- [ ] Critical business rules and constraints
- [ ] Key architectural decisions
- [ ] Security policies and access controls
- [ ] API contracts and interface specifications

## Tier 1 (Preserve Almost Entirely - 几乎完整保留)
- [ ] Important technical specifications
- [ ] Configuration parameters and defaults
- [ ] Key implementation details
- [ ] Critical data structures and schemas

## Tier 2 (Compress Moderately - 适度压缩)
- [ ] Supporting documentation
- [ ] Non-critical implementation details
- [ ] Usage examples (keep 1-2 key examples)
- [ ] Background context (keep high-level summary)

## Tier 3 (Compress Heavily - 大幅压缩)
- [ ] Extended background information
- [ ] Multiple examples (compress to 1-2 key ones)
- [ ] Detailed step-by-step explanations
- [ ] Non-critical discussions and debates

## Tier 4 (Can Remove - 可以移除)
- [ ] Trivial details and minor notes
- [ ] Repetitive content and redundancies
- [ ] Casual conversations and greetings
- [ ] Temporary or outdated information
- [ ] Side comments and personal anecdotes
```

---

## 📊 配置持久化 | Config Persistence

配置自动保存在插件的状态目录中的 `config.json`。

Config is automatically saved in `config.json` under the plugin's state directory.

---

## 🔍 测试核心用例 | Test Core Cases

详见 [测试核心用例文档](./docs/TESTING.md)。

See [Test Core Cases Documentation](./docs/TESTING.md).

---

## 📝 注意事项 | Notes

- 领域规则会影响所有 LLM 调用，包括压缩和正常对话
- 多个领域的规则会自动合并，按优先级处理
- 建议在高优先级任务中使用高压缩级别（balanced/aggressive）
- 普通对话可以使用低压缩级别（conservative）
- 手动安装自定义技能时，请确保 SKILL.md 文件不包含任何敏感信息

---

- Domain rules affect all LLM calls, including compaction and normal conversations
- Rules from multiple domains auto-merge and are processed by priority
- Recommend using higher compaction levels (balanced/aggressive) for high-priority tasks
- Normal conversations can use lower compaction levels (conservative)
- When manually installing custom skills, ensure the SKILL.md file does not contain any sensitive information

---

## 🤝 贡献 | Contributing

欢迎提交新的领域技能！请确保：
- 清晰的 YAML 前导元数据
- 完整的 Tier 0-4 规则
- 领域专业知识准确

---

Welcome to submit new domain skills! Please ensure:
- Clear YAML front matter
- Complete Tier 0-4 rules
- Accurate domain expertise

---

## 📄 许可证 | License

MIT License
