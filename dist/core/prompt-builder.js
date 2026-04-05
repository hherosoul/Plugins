export class PromptBuilder {
    build(input) {
        const sections = [];
        sections.push(this.buildHeader(input.config));
        if (input.activeDomains.length > 0) {
            sections.push(this.buildActiveDomains(input));
        }
        sections.push(this.buildTierRules(input));
        if (input.dynamicRules.length > 0) {
            sections.push(this.buildDynamicRules(input));
        }
        if (input.config.pinnedItems.length > 0) {
            sections.push(this.buildPinnedItems(input));
        }
        return sections;
    }
    buildFallback() {
        return [
            `# SmartContext — Basic Conversation Guidelines / 基础对话准则

## Tier 0 — Always Prioritize (Never Overlook) / 始终优先（绝不能忽视）
- Content explicitly marked as important by the user / 用户明确标记为重要的内容
- Core constraints and rules that must be followed / 核心约束和必须遵守的规则

## Tier 1 — Highest Priority Focus / 最高优先级关注
- Critical decisions and architectural choices / 关键决策和架构选择
- Core business logic / 核心业务逻辑

## Tier 2 — High Priority Attention / 高优先级注意
- Detailed design and implementation details / 详细设计和实现细节
- List of functional requirements / 功能需求列表

## Tier 3 — Keep In Mind / 记住这些
- Configuration items and coding standards / 配置项和编码规范
- Debug records / 调试记录

## Tier 4 — Can Reference Briefly / 可以简要参考
- Confirmatory responses / 确认性回复
- Duplicate content / 重复内容
- General knowledge / 通用知识`
        ];
    }
    buildHeader(config) {
        return `# SmartContext — Intelligent Conversation Guidelines / 智能对话准则

> Version / 版本: 1.0.0 | Active Domains / 活跃领域: ${config.activeDomains.length > 0 ? config.activeDomains.join(", ") : "General Mode / 通用模式"}

This document provides guidelines for prioritizing and evaluating conversation context, categorizing information into 5 tiers (Tier 0-4) based on importance to help you focus on what matters most.
本文档提供对话上下文的优先级和评估准则，根据重要性将信息分为 5 个层级 (Tier 0-4)，帮助你关注最重要的内容。`;
    }
    buildActiveDomains(input) {
        const domainList = input.activeDomains
            .map(d => `- ${d.domain} (${d.relevance}, Confidence / 置信度: ${(d.confidence * 100).toFixed(0)}%)`)
            .join("\n");
        return `## Active Domains / 活跃领域\n\n${domainList}`;
    }
    buildTierRules(input) {
        const tiers = [
            { key: "tier0", name: "Tier 0 — Always Prioritize (Never Overlook) / 始终优先（绝不能忽视）" },
            { key: "tier1", name: "Tier 1 — Highest Priority Focus / 最高优先级关注" },
            { key: "tier2", name: "Tier 2 — High Priority Attention / 高优先级注意" },
            { key: "tier3", name: "Tier 3 — Keep In Mind / 记住这些" },
            { key: "tier4", name: "Tier 4 — Can Reference Briefly / 可以简要参考" }
        ];
        let result = "";
        for (const tier of tiers) {
            const rules = input.tiers[tier.key];
            if (rules.length > 0) {
                result += `\n## ${tier.name}\n\n`;
                const grouped = new Map();
                for (const rule of rules) {
                    if (!grouped.has(rule.sourceDomain)) {
                        grouped.set(rule.sourceDomain, []);
                    }
                    grouped.get(rule.sourceDomain).push(rule.content);
                }
                for (const [domain, domainRules] of grouped) {
                    result += `### ${domain}\n\n`;
                    for (const rule of domainRules) {
                        result += `- ${rule}\n`;
                    }
                    result += "\n";
                }
            }
        }
        return result.trim();
    }
    buildDynamicRules(input) {
        return `## Dynamic Adjustment Rules / 动态调整规则\n\n${input.dynamicRules.map(r => `- ${r}`).join("\n")}`;
    }
    buildPinnedItems(input) {
        return `## User-Marked Important Content (Tier 0) / 用户标记的重要内容 (Tier 0)\n\n${input.config.pinnedItems.map((item, i) => `${i + 1}. ${item}`).join("\n")}`;
    }
}
//# sourceMappingURL=prompt-builder.js.map