import type { PluginRuntime } from "openclaw/plugin-sdk/runtime-store";
import type { SmartContextSkill, DomainSpec } from "../types";
import { SkillDiscovery } from "./skill-discovery";
export declare class SkillLoader {
    private runtime;
    private discovery;
    constructor(runtime: PluginRuntime, skillsDir: string);
    loadSkills(activeDomains: DomainSpec): SmartContextSkill[];
    getDiscovery(): SkillDiscovery;
}
//# sourceMappingURL=skill-loader.d.ts.map