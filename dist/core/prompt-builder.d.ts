import type { PromptBuildInput } from "../types";
export declare class PromptBuilder {
    build(input: PromptBuildInput): string[];
    buildFallback(): string[];
    private buildHeader;
    private buildActiveDomains;
    private buildTierRules;
    private buildDynamicRules;
    private buildPinnedItems;
}
//# sourceMappingURL=prompt-builder.d.ts.map