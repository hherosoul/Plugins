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


}
