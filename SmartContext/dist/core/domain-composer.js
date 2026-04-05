export class DomainComposer {
    composeRules(skills) {
        const activeDomains = skills.map((skill, index) => ({
            domain: skill.domain,
            relevance: index === 0 ? "primary" : "secondary",
            confidence: 1.0
        }));
        const tiers = {
            tier0: [],
            tier1: [],
            tier2: [],
            tier3: [],
            tier4: []
        };
        const dynamicRules = [];
        const crossDomainRules = [];
        const conflictResolutions = [];
        for (const skill of skills) {
            for (const [tier, rules] of Object.entries(skill.tiers)) {
                const key = tier;
                for (const rule of rules) {
                    tiers[key].push({
                        content: rule,
                        sourceDomain: skill.domain
                    });
                }
            }
            for (const rule of skill.dynamicRules) {
                dynamicRules.push(`[${skill.domain}] ${rule.description}: ${rule.action}`);
            }
            for (const rule of skill.domainSpecificRules) {
                if (!tiers.tier2.some(r => r.content === rule)) {
                    tiers.tier2.push({
                        content: rule,
                        sourceDomain: skill.domain
                    });
                }
            }
        }
        return {
            activeDomains,
            tiers,
            dynamicRules,
            crossDomainRules,
            conflictResolutions
        };
    }
}
//# sourceMappingURL=domain-composer.js.map