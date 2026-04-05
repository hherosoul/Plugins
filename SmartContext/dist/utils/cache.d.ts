export declare class SimpleCache<K, V> {
    private cache;
    private ttl;
    constructor(ttlMs?: number);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    clear(): void;
}
//# sourceMappingURL=cache.d.ts.map