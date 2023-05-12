import {createTimeDrivenTriggers} from "./triggers";
import {checkConfig, getUniqueEvents, logAllCalIds, replaceTargetEvents} from "./calendar";
import {mapToEntry, removeClassPrefix, removeGenericEvents} from "./transformer";
import {getConfigForKeyOrFallback} from "./config";

checkConfig()
createTimeDrivenTriggers();
if (process.env.DO_CAL_LOG !== "false"){
    logAllCalIds()
}

function sync(){
    const events = getUniqueEvents();
    let entries = mapToEntry(events);
    if (getConfigForKeyOrFallback("REQUIRE_CLASSNAME_IN_EVENT", false)){
        entries = removeGenericEvents(entries);
    }
    if (getConfigForKeyOrFallback("REMOVE_CLASSNAME_FROM_EVENT",false)){
        entries = removeClassPrefix(entries)
    }
    replaceTargetEvents(entries);
}