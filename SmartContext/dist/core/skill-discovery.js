import fs from "fs";
import path from "path";
import { parseSkillMarkdown } from "../utils/markdown-parser";
export class SkillDiscovery {
    skillsDir;
    skillCache = new Map();
    metadataCache = new Map();
    constructor(skillsDir) {
        this.skillsDir = skillsDir;
    }
    discoverAllSkills() {
        const metadata = [];
        if (!fs.existsSync(this.skillsDir)) {
            return metadata;
        }
        const entries = fs.readdirSync(this.skillsDir, { withFileTypes: true });
        for (const entry of entries) {
            if (!entry.isDirectory())
                continue;
            if (!entry.name.startsWith("smartcontext-"))
                continue;
            const skillPath = path.join(this.skillsDir, entry.name, "SKILL.md");
            if (!fs.existsSync(skillPath))
                continue;
            const domainId = entry.name.slice("smartcontext-".length);
            const meta = this.loadMetadata(domainId, skillPath);
            if (meta) {
                metadata.push(meta);
            }
        }
        return metadata;
    }
    loadSkill(domainId) {
        if (this.skillCache.has(domainId)) {
            return this.skillCache.get(domainId);
        }
        const skillPath = this.getSkillPath(domainId);
        if (!skillPath || !fs.existsSync(skillPath)) {
            return null;
        }
        try {
            const content = fs.readFileSync(skillPath, "utf8");
            const skill = parseSkillMarkdown(content, domainId);
            this.skillCache.set(domainId, skill);
            return skill;
        }
        catch (error) {
            return null;
        }
    }
    getSkillMetadata(domainId) {
        if (this.metadataCache.has(domainId)) {
            return this.metadataCache.get(domainId);
        }
        const skillPath = this.getSkillPath(domainId);
        if (!skillPath || !fs.existsSync(skillPath)) {
            return null;
        }
        return this.loadMetadata(domainId, skillPath);
    }
    clearCache() {
        this.skillCache.clear();
        this.metadataCache.clear();
    }
    getSkillPath(domainId) {
        const dirName = `smartcontext-${domainId}`;
        const skillPath = path.join(this.skillsDir, dirName, "SKILL.md");
        return skillPath;
    }
    loadMetadata(domainId, skillPath) {
        try {
            const content = fs.readFileSync(skillPath, "utf8");
            const lines = content.split("\n");
            let name = domainId;
            let summary = "";
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line.startsWith("# SmartContext Skill:")) {
                    name = line.slice("# SmartContext Skill:".length).trim();
                }
                else if (line === "## 领域摘要" || line === "## Domain Summary") {
                    for (let j = i + 1; j < lines.length; j++) {
                        const nextLine = lines[j].trim();
                        if (nextLine.startsWith("##"))
                            break;
                        if (nextLine) {
                            summary = nextLine;
                            break;
                        }
                    }
                    break;
                }
            }
            const metadata = { domainId, name, summary, path: skillPath };
            this.metadataCache.set(domainId, metadata);
            return metadata;
        }
        catch (error) {
            return null;
        }
    }
}
//# sourceMappingURL=skill-discovery.js.map