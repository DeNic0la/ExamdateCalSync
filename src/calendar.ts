import {getConfigForKey, getConfigForKeyOrFallback} from "./config";
import {CalendarEntryInformation} from "./types";

/**
 * Logs all CalenderIds, meant to figure out the Calendar id for the .env file
 */
export function logAllCalIds(){
    CalendarApp.getAllCalendars().forEach(value => console.log( value.getName() +" | "+value.getId()))
}

/**
 * Throws an error if .env config is not valid
 */
export function checkConfig(){
    let sourceCal = CalendarApp.getCalendarById(getConfigForKey("SOURCE_CAL_ID"));
    let target = CalendarApp.getCalendarById(getConfigForKey("TARGET_CAL_ID"));
    console.log(`Syncing Calenders from ${sourceCal.getName()} to ${target.getName()}`)
}
function getSourceCalEntries(){
    const cal = CalendarApp.getCalendarById(getConfigForKey("SOURCE_CAL_ID"));
    const {startDate,endDate}= getStartAndEndDate();
    return cal.getEvents(startDate,endDate);
}
export function getUniqueEvents(): GoogleAppsScript.Calendar.CalendarEvent[]{
    const threshold = getConfigForKeyOrFallback("NUMBER_OF_EVENTS_BEFORE_SKIP",3);
    let events = getSourceCalEntries();
    let numberOfEntries: {[p:string]:number} = {};
    for (let event of events) {
        const title = event.getTitle();
        numberOfEntries[title] = (numberOfEntries[title] ?? 0) + 1;
    }
    const uniqueEventsName = Object.entries(numberOfEntries).filter(([key,value]) => value <= threshold ).map(([key,value]) => key)
    return events.filter(value => uniqueEventsName.includes(value.getTitle()))
}
export function replaceTargetEvents(events:CalendarEntryInformation[]){
    const {startDate,endDate}= getStartAndEndDate();
    let cal = CalendarApp.getCalendarById(getConfigForKey("TARGET_CAL_ID"));
    cal.getEvents(startDate,endDate).forEach(value => value.deleteEvent());
    for (let {title,endDate,startDate} of events) {
        cal.createEvent(title,startDate,endDate)
    }
}
function getStartAndEndDate(){
    const startDate = new Date();
    let endDate = new Date();
    let months = endDate.getMonth() + getConfigForKeyOrFallback("MONTHS_IN_ADVANCE", 3);
    let year = endDate.getFullYear() + (months > 11 ? 1 : 0);
    months = months % 11
    endDate.setFullYear(year);
    endDate.setMonth(months)
    return {startDate,endDate}
}