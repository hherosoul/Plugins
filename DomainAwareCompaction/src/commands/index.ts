import type { OpenClawPluginApi } from "openclaw/plugin-sdk/plugin-entry";
import type { PluginCommandContext } from "openclaw/plugin-sdk/plugin-entry";
import { DACConfigStore } from "../config/store";
import { SkillManager } from "../core/skill-manager";
import { DEFAULT_CONFIG } from "../types";

export function registerAllCommands(
  api: OpenClawPluginApi,
  configStore: DACConfigStore,
  skillManager: SkillManager
) {
  api.registerCommand({
    name: "dac-list-skills",
    description: "List all available skills",
    acceptsArgs: false,
    handler: (ctx: PluginCommandContext) => {
      const available = skillManager.getAvailableSkills();
      const config = configStore.loadConfig();

      return {
        text: `# 可用技能

${available.map((skillId) => {
  const isActive = config.activeDomains.includes(skillId);
  return `${isActive ? "✅" : "⬜️"} ${skillId}`;
}).join("\n")}

当前已启用: ${config.activeDomains.join(", ") || "无"}`
      };
    }
  });

  api.registerCommand({
    name: "dac-use",
    description: "Switch to a single skill",
    acceptsArgs: true,
    handler: (ctx: PluginCommandContext) => {
      const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
      const skillId = args[0];

      if (!skillId) {
        return {
          text: "用法: /dac-use <skill-id>",
          isError: true
        };
      }

      const available = skillManager.getAvailableSkills();
      if (!available.includes(skillId)) {
        return {
          text: `技能不存在: ${skillId}`,
          isError: true
        };
      }

      configStore.saveConfig({ ...DEFAULT_CONFIG, activeDomains: [skillId] });
      return { text: `✅ 已切换到技能: ${skillId}` };
    }
  });

  api.registerCommand({
    name: "dac-add",
    description: "Add a skill to active skills",
    acceptsArgs: true,
    handler: (ctx: PluginCommandContext) => {
      const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
      const skillId = args[0];

      if (!skillId) {
        return {
          text: "用法: /dac-add <skill-id>",
          isError: true
        };
      }

      const available = skillManager.getAvailableSkills();
      if (!available.includes(skillId)) {
        return {
          text: `技能不存在: ${skillId}`,
          isError: true
        };
      }

      const config = configStore.loadConfig();
      if (!config.activeDomains.includes(skillId)) {
        configStore.saveConfig({
          ...config,
          activeDomains: [...config.activeDomains, skillId]
        });
      }

      return {
        text: `✅ 已添加技能: ${skillId}\n当前已启用技能: ${configStore.loadConfig().activeDomains.join(", ")}`
      };
    }
  });

  api.registerCommand({
    name: "dac-remove",
    description: "Remove a skill from active skills",
    acceptsArgs: true,
    handler: (ctx: PluginCommandContext) => {
      const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
      const skillId = args[0];

      if (!skillId) {
        return {
          text: "用法: /dac-remove <skill-id>",
          isError: true
        };
      }

      const config = configStore.loadConfig();
      configStore.saveConfig({
        ...config,
        activeDomains: config.activeDomains.filter((id) => id !== skillId)
      });

      return {
        text: `✅ 已移除技能: ${skillId}\n当前已启用技能: ${configStore.loadConfig().activeDomains.join(", ")}`
      };
    }
  });

  api.registerCommand({
    name: "dac-install-skill",
    description: "Install a new skill",
    acceptsArgs: true,
    handler: (ctx: PluginCommandContext) => {
      const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
      const name = args[0];
      const path = args.slice(1).join(" ");

      if (!name || !path) {
        return {
          text: "用法: /dac-install-skill <name> <path-to-SKILL.md>",
          isError: true
        };
      }

      const result = skillManager.installSkill(name, path);
      if (result) {
        return { text: `✅ 已安装技能: ${result}` };
      } else {
        return { text: "❌ 安装技能失败", isError: true };
      }
    }
  });

  api.registerCommand({
    name: "dac-uninstall-skill",
    description: "Uninstall a skill",
    acceptsArgs: true,
    handler: (ctx: PluginCommandContext) => {
      const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
      const skillId = args[0];

      if (!skillId) {
        return {
          text: "用法: /dac-uninstall-skill <skill-id>",
          isError: true
        };
      }

      const result = skillManager.uninstallSkill(skillId);
      if (result) {
        const config = configStore.loadConfig();
        configStore.saveConfig({
          ...config,
          activeDomains: config.activeDomains.filter((id) => id !== skillId)
        });
        return { text: `✅ 已卸载技能: ${skillId}` };
      } else {
        return { text: "❌ 卸载技能失败", isError: true };
      }
    }
  });

  api.registerCommand({
    name: "dac-config",
    description: "Show current configuration",
    acceptsArgs: false,
    handler: (ctx: PluginCommandContext) => {
      const config = configStore.loadConfig();
      return {
        text: `📋 当前配置:

已启用技能: ${config.activeDomains.join(", ") || "无"}
压缩级别: ${config.compactionLevel}`
      };
    }
  });

  api.registerCommand({
    name: "dac-set-compaction-level",
    description: "Set compaction level",
    acceptsArgs: true,
    handler: (ctx: PluginCommandContext) => {
      const args = ctx.args ? ctx.args.trim().split(/\s+/) : [];
      const level = args[0] as any;

      if (!level || !["conservative", "balanced", "aggressive"].includes(level)) {
        return {
          text: "用法: /dac-set-compaction-level <conservative|balanced|aggressive>",
          isError: true
        };
      }

      const config = configStore.loadConfig();
      configStore.saveConfig({ ...config, compactionLevel: level });
      return { text: `✅ 压缩级别已设置为: ${level}` };
    }
  });

  api.registerCommand({
    name: "dac-reset",
    description: "Reset to default configuration",
    acceptsArgs: false,
    handler: (ctx: PluginCommandContext) => {
      configStore.saveConfig({ ...DEFAULT_CONFIG });
      return { text: "✅ 配置已重置" };
    }
  });
}
