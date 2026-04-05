import type { PluginRuntime } from "openclaw/plugin-sdk/runtime-store";
export declare const runtimeStore: {
    setRuntime: (next: PluginRuntime) => void;
    clearRuntime: () => void;
    tryGetRuntime: () => PluginRuntime | null;
    getRuntime: () => PluginRuntime;
};
export declare function getRuntime(): PluginRuntime;
declare const _default: {
    id: string;
    name: string;
    description: string;
    configSchema: import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginConfigSchema;
    register: NonNullable<import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition["register"]>;
} & Pick<import("openclaw/plugin-sdk/plugin-entry").OpenClawPluginDefinition, "kind">;
export default _default;
//# sourceMappingURL=index.d.ts.map