import fs from "fs";
import path from "path";
import { SkillDiscovery } from "./skill-discovery";
import { validateSkillFile } from "../utils/markdown-parser";
export class SkillManager {
    skillsDir;
    discovery;
    constructor(skillsDir) {
        this.skillsDir = skillsDir;
        this.discovery = new SkillDiscovery(skillsDir);
        if (!fs.existsSync(this.skillsDir)) {
            fs.mkdirSync(this.skillsDir, { recursive: true });
        }
    }
    installSkill(skillName, sourcePath) {
        if (!skillName || !skillName.match(/^[a-z0-9-]+$/)) {
            return {
                success: false,
                message: "Invalid skill name, can only contain lowercase letters, numbers, and hyphens"
            };
        }
        if (!fs.existsSync(sourcePath)) {
            return {
                success: false,
                message: `File does not exist: ${sourcePath}`
            };
        }
        try {
            const content = fs.readFileSync(sourcePath, "utf8");
            const validation = validateSkillFile(content);
            if (!validation.valid) {
                return {
                    success: false,
                    message: `Invalid skill file format:\n${validation.errors.join("\n")}`
                };
            }
            const targetDir = path.join(this.skillsDir, `smartcontext-${skillName}`);
            const targetPath = path.join(targetDir, "SKILL.md");
            if (fs.existsSync(targetDir)) {
                return {
                    success: false,
                    message: `Skill already exists: ${skillName}`
                };
            }
            fs.mkdirSync(targetDir, { recursive: true });
            fs.copyFileSync(sourcePath, targetPath);
            this.discovery.clearCache();
            return {
                success: true,
                skillId: skillName,
                message: `Skill installed successfully: ${skillName}`
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Installation failed: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    uninstallSkill(skillName) {
        if (skillName === "general-purpose") {
            return {
                success: false,
                message: "Cannot uninstall general purpose domain"
            };
        }
        const targetDir = path.join(this.skillsDir, `smartcontext-${skillName}`);
        if (!fs.existsSync(targetDir)) {
            return {
                success: false,
                message: `Skill does not exist: ${skillName}`
            };
        }
        try {
            fs.rmSync(targetDir, { recursive: true, force: true });
            this.discovery.clearCache();
            return {
                success: true,
                message: `Skill uninstalled: ${skillName}`
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Uninstallation failed: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
    listAllSkills() {
        return this.discovery.discoverAllSkills();
    }
    getDiscovery() {
        return this.discovery;
    }
}
//# sourceMappingURL=skill-manager.js.map