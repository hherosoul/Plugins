import { SkillDiscovery } from "./skill-discovery";
import type { InstallResult, UninstallResult, SkillMetadata } from "../types";
export declare class SkillManager {
    private skillsDir;
    private discovery;
    constructor(skillsDir: string);
    installSkill(skillName: string, sourcePath: string): InstallResult;
    uninstallSkill(skillName: string): UninstallResult;
    listAllSkills(): SkillMetadata[];
    getDiscovery(): SkillDiscovery;
}
//# sourceMappingURL=skill-manager.d.ts.map