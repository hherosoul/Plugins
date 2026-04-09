import path from "path";
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { createPluginRuntimeStore } from "openclaw/plugin-sdk/runtime-store";
import type { PluginRuntime } from "openclaw/plugin-sdk/runtime-store";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk/plugin-entry";

import { DACConfigStore } from "./config/store";
import { registerAllCommands } from "./commands";
import { SkillManager } from "./core/skill-manager";
import { setupCompactionHook } from "./hooks/compaction-hook";

export const runtimeStore = createPluginRuntimeStore<PluginRuntime>(
  "DomainAwareCompaction: runtime not initialized"
);

export function getRuntime(): PluginRuntime {
  return runtimeStore.getRuntime();
}

export default definePluginEntry({
  id: "domainawarecompaction",
  name: "DomainAwareCompaction — 领域感知压缩",
  description:
    "OpenClaw插件，通过before_prompt_build钩子注入精简的SKILL.md规则，让大模型直接理解领域规则。",

  register(api: OpenClawPluginApi) {
    runtimeStore.setRuntime(api.runtime);

    const stateDir = api.runtime.state.resolveStateDir();
    const skillsDir = path.join(__dirname, "..", "skills");

    const configStore = new DACConfigStore(stateDir);
    const config = configStore.loadConfig();

    const skillManager = new SkillManager(skillsDir);

    setupCompactionHook(api, configStore, skillManager);
    registerAllCommands(api, configStore, skillManager);
  },
});
