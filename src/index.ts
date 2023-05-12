import {syncCallback} from "./sync";

function createTimeDrivenTriggers(){
    ScriptApp.newTrigger('syncCalEvents').timeBased().everyHours(12).create();
}

/**
 * Proxy Function for Trigger
 */
function syncCalEvents(){
    syncCallback();
}