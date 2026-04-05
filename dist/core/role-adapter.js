export class RoleAdapter {
    roleRules = {
        frontend: {
            tags: ["frontend"],
            tierAdjustments: [
                { pattern: "UI", tierDelta: 1 },
                { pattern: "组件", tierDelta: 1 },
                { pattern: "component", tierDelta: 1 },
                { pattern: "样式", tierDelta: 1 },
                { pattern: "style", tierDelta: 1 },
                { pattern: "响应式", tierDelta: 1 },
                { pattern: "responsive", tierDelta: 1 }
            ]
        },
        backend: {
            tags: ["backend"],
            tierAdjustments: [
                { pattern: "API", tierDelta: 1 },
                { pattern: "数据库", tierDelta: 1 },
                { pattern: "database", tierDelta: 1 },
                { pattern: "性能", tierDelta: 1 },
                { pattern: "performance", tierDelta: 1 },
                { pattern: "缓存", tierDelta: 1 },
                { pattern: "cache", tierDelta: 1 }
            ]
        },
        architect: {
            tags: ["architect"],
            tierAdjustments: [
                { pattern: "架构", tierDelta: 1 },
                { pattern: "architecture", tierDelta: 1 },
                { pattern: "模块", tierDelta: 1 },
                { pattern: "module", tierDelta: 1 },
                { pattern: "选型", tierDelta: 1 },
                { pattern: "selection", tierDelta: 1 },
                { pattern: "边界", tierDelta: 1 },
                { pattern: "boundary", tierDelta: 1 }
            ]
        },
        devops: {
            tags: ["devops"],
            tierAdjustments: [
                { pattern: "部署", tierDelta: 1 },
                { pattern: "deployment", tierDelta: 1 },
                { pattern: "CI/CD", tierDelta: 1 },
                { pattern: "监控", tierDelta: 1 },
                { pattern: "monitoring", tierDelta: 1 },
                { pattern: "配置", tierDelta: 1 },
                { pattern: "config", tierDelta: 1 }
            ]
        }
    };
    adapt(rules, roleTags) {
        if (roleTags.length === 0) {
            return rules;
        }
        const adjustedRules = { ...rules };
        const adjustedTiers = { ...rules.tiers };
        for (const roleTag of roleTags) {
            const adjustment = this.roleRules[roleTag];
            if (adjustment) {
                for (const [tier, rulesList] of Object.entries(adjustedTiers)) {
                    const key = tier;
                    for (const rule of rulesList) {
                        for (const ta of adjustment.tierAdjustments) {
                            if (rule.content.includes(ta.pattern)) {
                                this.adjustRuleTier(adjustedTiers, rule, key, ta.tierDelta);
                            }
                        }
                    }
                }
            }
        }
        return {
            ...adjustedRules,
            tiers: adjustedTiers
        };
    }
    adjustRuleTier(tiers, rule, currentTier, delta) {
        const tierOrder = ["tier4", "tier3", "tier2", "tier1", "tier0"];
        const currentIndex = tierOrder.indexOf(currentTier);
        const newIndex = Math.min(Math.max(currentIndex + delta, 0), tierOrder.length - 1);
        if (newIndex !== currentIndex) {
            const currentKey = currentTier;
            const newKey = tierOrder[newIndex];
            const index = tiers[currentKey].indexOf(rule);
            if (index > -1) {
                tiers[currentKey].splice(index, 1);
                tiers[newKey].push(rule);
            }
        }
    }
}
//# sourceMappingURL=role-adapter.js.map