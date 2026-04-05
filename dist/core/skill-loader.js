import { SkillDiscovery } from "./skill-discovery";
export class SkillLoader {
    runtime;
    discovery;
    constructor(runtime, skillsDir) {
        this.runtime = runtime;
        this.discovery = new SkillDiscovery(skillsDir);
    }
    loadSkills(activeDomains) {
        const skills = [];
        const generalSkill = this.discovery.loadSkill("general-purpose");
        if (generalSkill) {
            skills.push(generalSkill);
        }
        for (const domain of activeDomains) {
            if (domain !== "general-purpose") {
                const skill = this.discovery.loadSkill(domain);
                if (skill) {
                    skills.push(skill);
                }
            }
        }
        return skills;
    }
    getDiscovery() {
        return this.discovery;
    }
}
//# sourceMappingURL=skill-loader.js.map