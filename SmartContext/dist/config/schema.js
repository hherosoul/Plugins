export const DEFAULT_CONFIG = {
    activeDomains: ["general-purpose"],
    roleTags: [],
    pinnedItems: []
};
export function validateConfig(config) {
    if (!config)
        return false;
    if (!Array.isArray(config.activeDomains))
        return false;
    if (!Array.isArray(config.roleTags))
        return false;
    if (!Array.isArray(config.pinnedItems))
        return false;
    return true;
}
export function mergeWithDefaults(config) {
    return {
        ...DEFAULT_CONFIG,
        ...config
    };
}
//# sourceMappingURL=schema.js.map