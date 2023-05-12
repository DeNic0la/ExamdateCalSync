

const CONFIG = {
    SOURCE_CAL_ID: process.env.SOURCE_CAL_ID,
    TARGET_CAL_ID: process.env.TARGET_CAL_ID,
    DO_CAL_LOG: process.env.DO_CAL_LOG,
    MONTHS_IN_ADVANCE: process.env.MONTHS_IN_ADVANCE,
    NUMBER_OF_EVENTS_BEFORE_SKIP: process.env.NUMBER_OF_EVENTS_BEFORE_SKIP,
    REQUIRE_CLASSNAME_IN_EVENT: process.env.REQUIRE_CLASSNAME_IN_EVENT,
    CLASS_NAME: process.env.CLASS_NAME,
    REMOVE_CLASSNAME_FROM_EVENT: process.env.REMOVE_CLASSNAME_FROM_EVENT,
}
export function getConfigForKey(key: "SOURCE_CAL_ID"|"TARGET_CAL_ID"|"DO_CAL_LOG"|"CLASS_NAME"):string{
    //@ts-ignore
    const val = CONFIG[key]
    if (val)
        return val;
    throw new Error("ConfigNotDefined")
}

/**
 * Get a Value from the Config or the Fallbackvalue if it is not defined, supports type boolean, number and default to string
 */
export function getConfigForKeyOrFallback<T>(key: "MONTHS_IN_ADVANCE"|"NUMBER_OF_EVENTS_BEFORE_SKIP"|"REQUIRE_CLASSNAME_IN_EVENT"|"REMOVE_CLASSNAME_FROM_EVENT",fallback:T):T{

    const val = CONFIG[key]
    if (val === undefined){
        return fallback
    }
    if (typeof fallback === "boolean"){
        // @ts-ignore
        return (val==="true")
    }
    if (typeof fallback === "number"){
        // @ts-ignore
        return parseInt(val);
    }
    // @ts-ignore
    return val;
}