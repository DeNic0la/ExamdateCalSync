import {getConfigForKey} from "./config";

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

