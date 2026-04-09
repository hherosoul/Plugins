import path from "path";
import fs from "fs";

export class SkillManager {
  private skillsDir: string;
  private discoveredSkills: Map<string, string>;

  constructor(skillsDir: string) {
    this.skillsDir = skillsDir;
    this.discoveredSkills = new Map();
    this.discoverSkills();
  }

  private discoverSkills() {
    try {
      if (!fs.existsSync(this.skillsDir)) {
        return;
      }

      const items = fs.readdirSync(this.skillsDir, { withFileTypes: true });

      for (const item of items) {
        if (!item.isDirectory() || !item.name.startsWith("dac-")) {
          continue;
        }

        const skillMdPath = path.join(this.skillsDir, item.name, "SKILL.md");
        if (fs.existsSync(skillMdPath)) {
          this.discoveredSkills.set(item.name, skillMdPath);
        }
      }
    } catch (error) {
      console.warn("[DomainAwareCompaction] Failed to discover skills", error);
    }
  }

  getAvailableSkills(): string[] {
    return Array.from(this.discoveredSkills.keys());
  }

  getSkillContent(skillId: string): string | null {
    const skillPath = this.discoveredSkills.get(skillId);
    if (!skillPath) {
      return null;
    }

    try {
      return fs.readFileSync(skillPath, "utf-8");
    } catch (error) {
      console.warn(
        `[DomainAwareCompaction] Failed to read skill ${skillId}`,
        error
      );
      return null;
    }
  }

  mergeSkillContents(skillIds: string[]): string {
    const parts: string[] = [];

    for (const skillId of skillIds) {
      const content = this.getSkillContent(skillId);
      if (content) {
        parts.push(content);
      }
    }

    return parts.join("\n\n---\n\n");
  }

  installSkill(name: string, skillMdPath: string): string | null {
    try {
      const skillId = this.generateSkillId(name);
      const skillDir = path.join(this.skillsDir, skillId);

      if (!fs.existsSync(skillDir)) {
        fs.mkdirSync(skillDir, { recursive: true });
      }

      const content = fs.readFileSync(skillMdPath, "utf-8");
      const destPath = path.join(skillDir, "SKILL.md");
      fs.writeFileSync(destPath, content);

      this.discoveredSkills.set(skillId, destPath);
      return skillId;
    } catch (error) {
      console.warn("[DomainAwareCompaction] Failed to install skill", error);
      return null;
    }
  }

  uninstallSkill(skillId: string): boolean {
    try {
      const skillPath = this.discoveredSkills.get(skillId);
      if (!skillPath) {
        return false;
      }

      const skillDir = path.dirname(skillPath);
      if (fs.existsSync(skillDir)) {
        fs.rmSync(skillDir, { recursive: true, force: true });
      }

      this.discoveredSkills.delete(skillId);
      return true;
    } catch (error) {
      console.warn("[DomainAwareCompaction] Failed to uninstall skill", error);
      return false;
    }
  }

  private generateSkillId(name: string): string {
    const normalized = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return `dac-${normalized}`;
  }
}
