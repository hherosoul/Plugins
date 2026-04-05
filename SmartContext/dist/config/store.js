import { DEFAULT_CONFIG, mergeWithDefaults } from "./defaults";
import * as fs from "fs";
import * as path from "path";
export class SmartContextConfigStore {
    stateDir;
    currentConfig = DEFAULT_CONFIG;
    configPath = null;
    constructor(stateDir = null) {
        this.stateDir = stateDir;
        if (stateDir) {
            this.configPath = path.join(stateDir, "smartcontext-config.json");
            this.loadFromDisk();
        }
        else {
            this.currentConfig = DEFAULT_CONFIG;
        }
    }
    loadFromDisk() {
        try {
            if (this.configPath && fs.existsSync(this.configPath)) {
                const data = fs.readFileSync(this.configPath, "utf-8");
                const loadedConfig = JSON.parse(data);
                this.currentConfig = mergeWithDefaults(loadedConfig);
            }
            else {
                this.currentConfig = DEFAULT_CONFIG;
            }
        }
        catch (error) {
            this.currentConfig = DEFAULT_CONFIG;
        }
    }
    saveToDisk() {
        try {
            if (this.configPath) {
                const dir = path.dirname(this.configPath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                fs.writeFileSync(this.configPath, JSON.stringify(this.currentConfig, null, 2), "utf-8");
            }
        }
        catch (error) {
        }
    }
    loadConfig() {
        return this.currentConfig;
    }
    getConfig() {
        return this.currentConfig;
    }
    saveConfig(config) {
        this.currentConfig = mergeWithDefaults({
            ...this.currentConfig,
            ...config
        });
        this.saveToDisk();
    }
}
//# sourceMappingURL=store.js.map