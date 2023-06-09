export function createTimeDrivenTriggers(){
    deleteAllTriggers();
    ScriptApp.newTrigger('sync').timeBased().everyHours(12).create();
}
export function deleteAllTriggers(){
    const triggers = ScriptApp.getProjectTriggers();
    for (const trigger of triggers) {
        ScriptApp.deleteTrigger(trigger)
    }
}