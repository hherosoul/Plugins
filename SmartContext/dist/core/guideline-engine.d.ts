import type { PluginRuntime } from "openclaw/plugin-sdk/runtime-store";
import type { SmartContextConfig } from "../types";
import type { SmartContextConfigStore } from "../config/store";
export declare class SmartContextGuidelineEngine {
    private config;
    private configStore;
    private runtime;
    private skillsDir;
    private skillLoader;
    private composer;
    private roleAdapter;
    private promptBuilder;
    constructor(config: SmartContextConfig, configStore: SmartContextConfigStore, runtime: PluginRuntime, skillsDir: string);
    generate(params: {
        availableTools: Set<string>;
        citationsMode?: any;
    }): string[];
    private resolveActiveDomains;
}
//# sourceMappingURL=guideline-engine.d.ts.map