export interface SmartContextConfig {
    activeDomains: string[];
    roleTags: string[];
    pinnedItems: string[];
}
export interface SmartContextSkill {
    domain: string;
    name: string;
    summary: string;
    priority: "high" | "medium" | "low";
    tiers: {
        tier0: string[];
        tier1: string[];
        tier2: string[];
        tier3: string[];
        tier4: string[];
    };
    dynamicRules: DynamicRule[];
    domainSpecificRules: string[];
    crossDomainRules: CrossDomainRule[];
    _manualSpecified?: boolean;
}
export interface SkillMetadata {
    domainId: string;
    name: string;
    summary: string;
    path: string;
}
export interface InstallResult {
    success: boolean;
    skillId?: string;
    message: string;
}
export interface UninstallResult {
    success: boolean;
    message: string;
}
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
export interface DynamicRule {
    type: "citation_frequency" | "cross_stage_reference" | "time_decay" | "dependency";
    description: string;
    action: string;
}
export interface CrossDomainRule {
    targetDomain: string;
    rules: string[];
}
export interface ComposedRules {
    activeDomains: DomainDetection[];
    tiers: {
        tier0: AnnotatedRule[];
        tier1: AnnotatedRule[];
        tier2: AnnotatedRule[];
        tier3: AnnotatedRule[];
        tier4: AnnotatedRule[];
    };
    dynamicRules: string[];
    crossDomainRules: string[];
    conflictResolutions: ConflictResolution[];
}
export interface DomainDetection {
    domain: string;
    relevance: "primary" | "secondary" | "associated";
    confidence: number;
}
export interface AnnotatedRule {
    content: string;
    sourceDomain: string;
}
export interface ConflictResolution {
    item: string;
    originalTier: string;
    resolvedTier: string;
    reason: string;
    winnerDomain: string;
}
export interface PromptBuildInput {
    activeDomains: DomainDetection[];
    tiers: {
        tier0: AnnotatedRule[];
        tier1: AnnotatedRule[];
        tier2: AnnotatedRule[];
        tier3: AnnotatedRule[];
        tier4: AnnotatedRule[];
    };
    dynamicRules: string[];
    crossDomainRules: string[];
    config: SmartContextConfig;
    availableTools: Set<string>;
}
export interface RoleAdjustment {
    tags: string[];
    tierAdjustments: {
        pattern: string;
        tierDelta: number;
    }[];
}
export type DomainSpec = string[];
//# sourceMappingURL=types.d.ts.map