export class SimpleCache {
    cache = new Map();
    ttl;
    constructor(ttlMs = 300_000) {
        this.ttl = ttlMs;
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return undefined;
        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(key);
            return undefined;
        }
        return entry.value;
    }
    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }
    clear() {
        this.cache.clear();
    }
}
//# sourceMappingURL=cache.js.map