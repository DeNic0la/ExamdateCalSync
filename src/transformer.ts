import {getConfigForKey} from "./config";
import {CalendarEntryInformation} from "./types";

export function mapToEntry(events: GoogleAppsScript.Calendar.CalendarEvent[]):CalendarEntryInformation[]{
    return events.map(value => ({
        title: value.getTitle(),
        startDate: value.getStartTime(),
        endDate: value.getEndTime(),
    }))
}
export function removeGenericEvents(events: CalendarEntryInformation[]): CalendarEntryInformation[]{
    const classname = getConfigForKey("CLASS_NAME")
    return events.filter(value => value.title.includes(classname))
}
export function removeClassPrefix(events: CalendarEntryInformation[]):CalendarEntryInformation[]{
    const classname = getConfigForKey("CLASS_NAME")
    return  events.map(event => ({
        ...event,
        title: event.title.split(" ").filter(value => !value.includes(classname)).join(" ")
    }))
}