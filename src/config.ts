

const CONFIG = {
    SOURCE_CAL_ID: process.env.SOURCE_CAL_ID,
    TARGET_CAL_ID: process.env.TARGET_CAL_ID,
    DO_CAL_LOG: process.env.DO_CAL_LOG
}
export function getConfigForKey(key: "SOURCE_CAL_ID"|"TARGET_CAL_ID"|"DO_CAL_LOG"):string{
    //@ts-ignore
    const val = CONFIG[key]
    if (val)
        return val;
    throw new Error("ConfigNotDefined")
}