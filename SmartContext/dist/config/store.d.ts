import type { SmartContextConfig } from "../types";
export declare class SmartContextConfigStore {
    private stateDir;
    private currentConfig;
    private configPath;
    constructor(stateDir?: string | null);
    private loadFromDisk;
    private saveToDisk;
    loadConfig(): SmartContextConfig;
    getConfig(): SmartContextConfig;
    saveConfig(config: Partial<SmartContextConfig>): void;
}
//# sourceMappingURL=store.d.ts.map