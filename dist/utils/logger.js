import { getRuntime } from "../index";
export function getLogger() {
    try {
        return getRuntime().logging.getChildLogger({ plugin: "smartcontext" });
    }
    catch {
        return {
            error: console.error,
            warn: console.warn,
            info: console.info,
            debug: console.debug
        };
    }
}
//# sourceMappingURL=logger.js.map