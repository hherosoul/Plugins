import path from "path";
import fs from "fs";
import type { DACConfig } from "../types";
import { DEFAULT_CONFIG } from "../types";

export class DACConfigStore {
  private configPath: string;

  constructor(stateDir: string) {
    this.configPath = path.join(stateDir, "config.json");
  }

  loadConfig(): DACConfig {
    try {
      if (fs.existsSync(this.configPath)) {
        const content = fs.readFileSync(this.configPath, "utf-8");
        return { ...DEFAULT_CONFIG, ...JSON.parse(content) };
      }
    } catch (error) {
      console.warn("[DomainAwareCompaction] Failed to load config", error);
    }
    return { ...DEFAULT_CONFIG };
  }

  saveConfig(config: DACConfig): void {
    try {
      const dir = path.dirname(this.configPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
    } catch (error) {
      console.warn("[DomainAwareCompaction] Failed to save config", error);
    }
  }
}
