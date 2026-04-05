import path from "path";
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { createPluginRuntimeStore } from "openclaw/plugin-sdk/runtime-store";
import { SmartContextGuidelineEngine } from "./core/guideline-engine";
import { SmartContextConfigStore } from "./config/store";
import { registerAllCommands } from "./commands";
import { SkillManager } from "./core/skill-manager";
export const runtimeStore = createPluginRuntimeStore("SmartContext: runtime not initialized");
export function getRuntime() {
    return runtimeStore.getRuntime();
}
export default definePluginEntry({
    id: "smartcontext",
    name: "SmartContext — Intelligent Conversation Guidelines",
    description: "Injects domain-specific, tiered guidelines into each conversation to help LLM prioritize and focus on what's important.",
    register(api) {
        runtimeStore.setRuntime(api.runtime);
        const stateDir = api.runtime.state.resolveStateDir();
        const skillsDir = path.join(__dirname, "..", "skills");
        const configStore = new SmartContextConfigStore(stateDir);
        const config = configStore.loadConfig();
        const skillManager = new SkillManager(skillsDir);
        const engine = new SmartContextGuidelineEngine(config, configStore, api.runtime, skillsDir);
        api.on("before_prompt_build", (params) => {
            const sections = engine.generate({ availableTools: new Set() });
            return {
                prependSystemContext: sections.join("\n\n"),
            };
        });
        registerAllCommands(api, configStore, engine, skillManager);
    },
});
//# sourceMappingURL=index.js.map