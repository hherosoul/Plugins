import { SkillLoader } from "./skill-loader";
import { DomainComposer } from "./domain-composer";
import { RoleAdapter } from "./role-adapter";
import { PromptBuilder } from "./prompt-builder";
export class SmartContextGuidelineEngine {
    config;
    configStore;
    runtime;
    skillsDir;
    skillLoader;
    composer;
    roleAdapter;
    promptBuilder;
    constructor(config, configStore, runtime, skillsDir) {
        this.config = config;
        this.configStore = configStore;
        this.runtime = runtime;
        this.skillsDir = skillsDir;
        this.skillLoader = new SkillLoader(runtime, skillsDir);
        this.composer = new DomainComposer();
        this.roleAdapter = new RoleAdapter();
        this.promptBuilder = new PromptBuilder();
    }
    generate(params) {
        try {
            const config = this.configStore.loadConfig();
            const activeDomains = this.resolveActiveDomains(config);
            const skills = this.skillLoader.loadSkills(activeDomains);
            const rules = this.composer.composeRules(skills);
            const adaptedRules = this.roleAdapter.adapt(rules, config.roleTags);
            const sections = this.promptBuilder.build({
                ...adaptedRules,
                config,
                availableTools: params.availableTools,
            });
            return sections;
        }
        catch (error) {
            this.runtime.logging.getChildLogger({ plugin: "smartcontext" }).error(`Guideline generation failed: ${error}`);
            return this.promptBuilder.buildFallback();
        }
    }
    resolveActiveDomains(config) {
        return config.activeDomains;
    }
}
//# sourceMappingURL=guideline-engine.js.map