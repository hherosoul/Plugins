export const DEFAULT_CONFIG = {
    activeDomains: ["general-purpose"],
    roleTags: [],
    pinnedItems: []
};
export function mergeWithDefaults(config) {
    return {
        activeDomains: config.activeDomains ?? DEFAULT_CONFIG.activeDomains,
        roleTags: config.roleTags ?? DEFAULT_CONFIG.roleTags,
        pinnedItems: config.pinnedItems ?? DEFAULT_CONFIG.pinnedItems
    };
}
export const AVAILABLE_DOMAINS = [
    { id: "software-engineering", name: "Software Engineering", description: "Requirements analysis, architecture design, coding implementation, testing validation, deployment operations" }
];
export const AVAILABLE_ROLE_TAGS = [
    { tag: "frontend", name: "Frontend Developer", description: "Prioritize UI constraints, component design, style solutions" },
    { tag: "backend", name: "Backend Developer", description: "Prioritize API contracts, database design, performance metrics" },
    { tag: "architect", name: "Architect", description: "Prioritize architectural decisions, module division, technology choices" },
    { tag: "devops", name: "DevOps", description: "Prioritize deployment config, CI/CD processes, monitoring" },
    { tag: "fullstack", name: "Full Stack Developer", description: "Balanced across layers, no priority adjustment" }
];
//# sourceMappingURL=defaults.js.map