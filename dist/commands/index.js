import { AVAILABLE_ROLE_TAGS } from "../config/defaults";
export function registerAllCommands(api, configStore, engine, skillManager) {
    api.registerCommand({
        name: "smartcontext-config",
        description: "View SmartContext current configuration",
        acceptsArgs: false,
        handler: (ctx) => {
            const config = configStore.getConfig();
            return {
                text: `# SmartContext Current Configuration

## Active Domains
${config.activeDomains.length > 0 ? config.activeDomains.map((d) => `- ${d}`).join("\n") : "No active domains configured"}

## Role Tags
${config.roleTags.length > 0 ? config.roleTags.map((t) => `- ${t}`).join("\n") : "No role tags configured"}

## Pinned Items (${config.pinnedItems.length})
${config.pinnedItems.map((item, i) => `${i + 1}. ${item}`).join("\n")}`
            };
        }
    });
    api.registerCommand({
        name: "smartcontext-list-skills",
        description: "List all available skills",
        acceptsArgs: false,
        handler: (ctx) => {
            const skills = skillManager.listAllSkills();
            const config = configStore.getConfig();
            return {
                text: `# Available Skills

${skills.map(skill => {
                    const isActive = config.activeDomains.includes(skill.domainId);
                    return `${isActive ? "✅" : "⬜️"} **${skill.name}** (\`${skill.domainId}\`)\n   ${skill.summary}`;
                }).join("\n\n")}

Use skill: \`/smartcontext-add <skill-id>\`
Only use skill: \`/smartcontext-use <skill-id>\`
Remove skill: \`/smartcontext-remove <skill-id>\``
            };
        }
    });
    api.registerCommand({
        name: "smartcontext-install-skill",
        description: "Install new skill",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            const skillName = args[0];
            const skillPath = args.slice(1).join(" ");
            if (!skillName || !skillPath) {
                return {
                    text: "Usage: /smartcontext-install-skill <skill-name> <SKILL.md-path>\n" +
                        "Example: /smartcontext-install-skill writing /Users/hanli/Desktop/writing.md",
                    isError: true
                };
            }
            const result = skillManager.installSkill(skillName, skillPath);
            return {
                text: result.message,
                isError: !result.success
            };
        }
    });
    api.registerCommand({
        name: "smartcontext-uninstall-skill",
        description: "Uninstall skill",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            const skillName = args[0];
            if (!skillName) {
                return {
                    text: "Usage: /smartcontext-uninstall-skill <skill-name>",
                    isError: true
                };
            }
            const result = skillManager.uninstallSkill(skillName);
            const config = configStore.getConfig();
            if (config.activeDomains.includes(skillName)) {
                configStore.saveConfig({
                    activeDomains: config.activeDomains.filter((d) => d !== skillName)
                });
            }
            return {
                text: result.message,
                isError: !result.success
            };
        }
    });
    api.registerCommand({
        name: "smartcontext-use",
        description: "Use only the specified skill (replace others)",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            const skillId = args[0];
            if (!skillId) {
                return {
                    text: "Usage: /smartcontext-use <skill-id>",
                    isError: true
                };
            }
            const skills = skillManager.listAllSkills();
            const exists = skills.some(s => s.domainId === skillId);
            if (!exists) {
                return {
                    text: `Skill does not exist: ${skillId}`,
                    isError: true
                };
            }
            configStore.saveConfig({
                activeDomains: [skillId],
                roleTags: []
            });
            return { text: `Switched to skill: ${skillId}\nCleared all role tags (recommended to set new roles for this domain)` };
        }
    });
    api.registerCommand({
        name: "smartcontext-add",
        description: "Add skill (use with general)",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            const skillId = args[0];
            if (!skillId) {
                return {
                    text: "Usage: /smartcontext-add <skill-id>",
                    isError: true
                };
            }
            const skills = skillManager.listAllSkills();
            const exists = skills.some(s => s.domainId === skillId);
            if (!exists) {
                return {
                    text: `Skill does not exist: ${skillId}`,
                    isError: true
                };
            }
            const config = configStore.getConfig();
            if (!config.activeDomains.includes(skillId)) {
                configStore.saveConfig({
                    activeDomains: [...config.activeDomains, skillId]
                });
            }
            return { text: `Added skill: ${skillId}` };
        }
    });
    api.registerCommand({
        name: "smartcontext-remove",
        description: "Remove skill",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            const skillId = args[0];
            if (!skillId) {
                return {
                    text: "Usage: /smartcontext-remove <skill-id>",
                    isError: true
                };
            }
            if (skillId === "general-purpose") {
                return {
                    text: "Cannot remove general purpose domain",
                    isError: true
                };
            }
            const config = configStore.getConfig();
            const newActiveDomains = config.activeDomains.filter((d) => d !== skillId);
            // 如果删除后只剩通用领域，清除角色标签
            const onlyGeneralPurposeLeft = newActiveDomains.length === 0 ||
                (newActiveDomains.length === 1 && newActiveDomains[0] === "general-purpose");
            configStore.saveConfig({
                activeDomains: newActiveDomains,
                roleTags: onlyGeneralPurposeLeft ? [] : config.roleTags
            });
            let message = `Removed skill: ${skillId}`;
            if (onlyGeneralPurposeLeft) {
                message += "\nCleared all role tags (back to general-purpose domain)";
            }
            return { text: message };
        }
    });
    api.registerCommand({
        name: "smartcontext-reset",
        description: "Reset to default configuration (general only)",
        acceptsArgs: false,
        handler: (ctx) => {
            configStore.saveConfig({
                activeDomains: ["general-purpose"],
                roleTags: [],
                pinnedItems: []
            });
            return { text: "Reset to default configuration" };
        }
    });
    api.registerCommand({
        name: "smartcontext-set-role",
        description: "Set role tags (overwrites all existing)",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            if (args.length === 0) {
                return {
                    text: `# Available Role Tags

${AVAILABLE_ROLE_TAGS.map(r => `- **${r.tag}**: ${r.name} - ${r.description}`).join("\n")}

Usage: \`/smartcontext-set-role <tag1> <tag2> ...\``
                };
            }
            configStore.saveConfig({ roleTags: args });
            return { text: `Set role tags: ${args.join(", ")}` };
        }
    });
    api.registerCommand({
        name: "smartcontext-add-role",
        description: "Add role tags (keeps existing)",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            if (args.length === 0) {
                return {
                    text: `# Available Role Tags

${AVAILABLE_ROLE_TAGS.map(r => `- **${r.tag}**: ${r.name} - ${r.description}`).join("\n")}

Usage: \`/smartcontext-add-role <tag1> <tag2> ...\``
                };
            }
            const config = configStore.getConfig();
            const existingTags = new Set(config.roleTags);
            const addedTags = [];
            const skippedTags = [];
            for (const tag of args) {
                if (existingTags.has(tag)) {
                    skippedTags.push(tag);
                }
                else {
                    addedTags.push(tag);
                }
            }
            if (addedTags.length > 0) {
                configStore.saveConfig({
                    roleTags: [...config.roleTags, ...addedTags]
                });
            }
            let message = "";
            if (addedTags.length > 0) {
                message += `Added role tags: ${addedTags.join(", ")}`;
            }
            if (skippedTags.length > 0) {
                if (message)
                    message += "\n";
                message += `Already exists (skipped): ${skippedTags.join(", ")}`;
            }
            if (!message) {
                message = "No new role tags added";
            }
            return { text: message };
        }
    });
    api.registerCommand({
        name: "smartcontext-remove-role",
        description: "Remove specific role tags",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            if (args.length === 0) {
                return {
                    text: "Usage: /smartcontext-remove-role <tag1> <tag2> ...",
                    isError: true
                };
            }
            const config = configStore.getConfig();
            const existingTags = new Set(config.roleTags);
            const removedTags = [];
            const notFoundTags = [];
            for (const tag of args) {
                if (existingTags.has(tag)) {
                    removedTags.push(tag);
                }
                else {
                    notFoundTags.push(tag);
                }
            }
            if (removedTags.length > 0) {
                configStore.saveConfig({
                    roleTags: config.roleTags.filter((t) => !removedTags.includes(t))
                });
            }
            let message = "";
            if (removedTags.length > 0) {
                message += `Removed role tags: ${removedTags.join(", ")}`;
            }
            if (notFoundTags.length > 0) {
                if (message)
                    message += "\n";
                message += `Not found: ${notFoundTags.join(", ")}`;
            }
            if (!message) {
                message = "No role tags removed";
            }
            return { text: message };
        }
    });
    api.registerCommand({
        name: "smartcontext-clear-role",
        description: "Clear all role tags",
        acceptsArgs: false,
        handler: (ctx) => {
            configStore.saveConfig({ roleTags: [] });
            return { text: "Cleared all role tags" };
        }
    });
    api.registerCommand({
        name: "smartcontext-pin",
        description: "Pin important content",
        acceptsArgs: true,
        handler: (ctx) => {
            const content = ctx.args ? ctx.args.trim() : "";
            if (!content) {
                return { text: "Please specify content to pin, e.g.: /smartcontext-pin This project must use TypeScript", isError: true };
            }
            const config = configStore.getConfig();
            configStore.saveConfig({
                pinnedItems: [...config.pinnedItems, content]
            });
            return { text: `Pinned content: ${content}` };
        }
    });
    api.registerCommand({
        name: "smartcontext-show-pinned",
        description: "Show all pinned content",
        acceptsArgs: false,
        handler: (ctx) => {
            const config = configStore.getConfig();
            return {
                text: `# Pinned Content

${config.pinnedItems.length > 0
                    ? config.pinnedItems.map((item, i) => `${i + 1}. ${item}`).join("\n")
                    : "No pinned content"}

Unpin at index: \`/smartcontext-unpin-at <index>\`
Unpin all: \`/smartcontext-unpin-all\``
            };
        }
    });
    api.registerCommand({
        name: "smartcontext-unpin-at",
        description: "Unpin content at specified index",
        acceptsArgs: true,
        handler: (ctx) => {
            const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
            const indexStr = args[0];
            if (!indexStr) {
                return {
                    text: "Usage: /smartcontext-unpin-at <index>",
                    isError: true
                };
            }
            const index = parseInt(indexStr, 10) - 1;
            const config = configStore.getConfig();
            if (index < 0 || index >= config.pinnedItems.length) {
                return { text: `Invalid index: ${indexStr}`, isError: true };
            }
            const removed = config.pinnedItems[index];
            configStore.saveConfig({
                pinnedItems: config.pinnedItems.filter((_, i) => i !== index)
            });
            return { text: `Unpinned: ${removed}` };
        }
    });
    api.registerCommand({
        name: "smartcontext-unpin-all",
        description: "Unpin all content",
        acceptsArgs: false,
        handler: (ctx) => {
            const config = configStore.getConfig();
            const count = config.pinnedItems.length;
            configStore.saveConfig({
                pinnedItems: []
            });
            return { text: `Unpinned ${count} item(s)` };
        }
    });
}
//# sourceMappingURL=index.js.map