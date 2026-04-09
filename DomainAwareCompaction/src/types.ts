export interface DACConfig {
  activeDomains: string[];
  compactionLevel: "conservative" | "balanced" | "aggressive";
  roleTags: string[];
  enableAutoCompaction: boolean;
}

export const DEFAULT_CONFIG: DACConfig = {
  activeDomains: ["dac-general-purpose"],
  compactionLevel: "balanced",
  roleTags: [],
  enableAutoCompaction: true,
};
