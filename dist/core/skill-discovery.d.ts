import type { SmartContextSkill, SkillMetadata } from "../types";
export declare class SkillDiscovery {
    private skillsDir;
    private skillCache;
    private metadataCache;
    constructor(skillsDir: string);
    discoverAllSkills(): SkillMetadata[];
    loadSkill(domainId: string): SmartContextSkill | null;
    getSkillMetadata(domainId: string): SkillMetadata | null;
    clearCache(): void;
    private getSkillPath;
    private loadMetadata;
}
//# sourceMappingURL=skill-discovery.d.ts.map