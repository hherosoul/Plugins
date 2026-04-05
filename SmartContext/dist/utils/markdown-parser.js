export function parseSkillMarkdown(content, domainId) {
    const result = {
        domain: domainId,
        name: domainId,
        summary: "",
        priority: "medium",
        tiers: {
            tier0: [],
            tier1: [],
            tier2: [],
            tier3: [],
            tier4: []
        },
        dynamicRules: [],
        domainSpecificRules: [],
        crossDomainRules: []
    };
    const lines = content.split("\n");
    let currentSection = null;
    let currentTier = null;
    let summaryBuffer = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("#")) {
            const heading = trimmed.replace(/^#+\s*/, "");
            if (heading.startsWith("SmartContext Skill:")) {
                result.name = heading.slice("SmartContext Skill:".length).trim() || domainId;
                currentSection = null;
            }
            else if (heading.includes("领域摘要") || heading.includes("Domain Summary")) {
                currentSection = "summary";
                summaryBuffer = [];
            }
            else if (heading.includes("优先级声明") || heading.includes("Priority Declaration")) {
                currentSection = "priority";
            }
            else if (heading.includes("优先级指南") || heading.includes("Priority Guidelines")) {
                currentSection = "tiers";
            }
            else if (heading.includes("动态调整规则") || heading.includes("Dynamic Adjustment Rules")) {
                currentSection = "dynamic";
            }
            else if (heading.includes("领域特定规则") || heading.includes("Domain-Specific Rules")) {
                currentSection = "domainSpecific";
            }
            else if (heading.includes("跨领域协作") || heading.includes("Cross-Domain Collaboration")) {
                currentSection = "crossDomain";
            }
            else {
                currentSection = null;
            }
            continue;
        }
        if (trimmed.startsWith("### Tier")) {
            const match = trimmed.match(/Tier\s+(\d+)/);
            if (match) {
                currentTier = `tier${match[1]}`;
            }
            continue;
        }
        if (!trimmed)
            continue;
        if (trimmed.startsWith("- ") && currentSection) {
            const item = trimmed.slice(2).trim();
            if (currentSection === "tiers" && currentTier) {
                const tierKey = currentTier;
                result.tiers[tierKey].push(item);
            }
            else if (currentSection === "dynamic") {
                result.dynamicRules.push(parseDynamicRule(item));
            }
            else if (currentSection === "domainSpecific") {
                result.domainSpecificRules.push(item);
            }
            else if (currentSection === "crossDomain") {
                result.crossDomainRules.push(parseCrossDomainRule(item));
            }
        }
        else if (currentSection === "summary") {
            summaryBuffer.push(trimmed);
        }
        else if (currentSection === "priority") {
            if (trimmed.includes("高") || trimmed.includes("High")) {
                result.priority = "high";
            }
            else if (trimmed.includes("中") || trimmed.includes("Medium")) {
                result.priority = "medium";
            }
            else if (trimmed.includes("低") || trimmed.includes("Low")) {
                result.priority = "low";
            }
        }
    }
    if (summaryBuffer.length > 0) {
        result.summary = summaryBuffer.join(" ");
    }
    return result;
}
export function validateSkillFile(content) {
    const errors = [];
    const lines = content.split("\n");
    let hasTitle = false;
    let hasTiers = false;
    let hasTier0 = false;
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("# SmartContext Skill:")) {
            hasTitle = true;
        }
        if (trimmed.includes("优先级指南") || trimmed.includes("Priority Guidelines")) {
            hasTiers = true;
        }
        if (trimmed.startsWith("### Tier 0")) {
            hasTier0 = true;
        }
    }
    if (!hasTitle) {
        errors.push("Missing title: Must start with '# SmartContext Skill: <name>'");
    }
    if (!hasTiers) {
        errors.push("Missing Priority Guidelines section");
    }
    if (!hasTier0) {
        errors.push("Missing Tier 0 definition");
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
function parseDynamicRule(text) {
    return {
        type: "citation_frequency",
        description: text,
        action: ""
    };
}
function parseCrossDomainRule(text) {
    return {
        targetDomain: "",
        rules: [text]
    };
}
//# sourceMappingURL=markdown-parser.js.map