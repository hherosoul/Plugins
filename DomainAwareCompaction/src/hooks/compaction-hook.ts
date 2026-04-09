import type { OpenClawPluginApi } from "openclaw/plugin-sdk/plugin-entry";
import { DACConfigStore } from "../config/store";
import { SkillManager } from "../core/skill-manager";

export function setupCompactionHook(
  api: OpenClawPluginApi,
  configStore: DACConfigStore,
  skillManager: SkillManager
) {
  api.on("before_prompt_build", (event, ctx) => {
    const config = configStore.loadConfig();
    const customInstructions = skillManager.mergeSkillContents(config.activeDomains);

    if (customInstructions) {
      return {
        prependSystemContext: `# Domain-Aware Compaction Guidelines\n\n${customInstructions}`,
      };
    }

    return {};
  });
}
