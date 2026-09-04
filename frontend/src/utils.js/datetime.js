import { data } from "react-router-dom"


//converts toISOString() does local → UTC ISO
export function toISOString(localDateTime) {
    return new Date(localDateTime).toISOString()
}

//to convert toDateTimeLocal() does UTC ISO → local datetime
// Used for <input type="datetime-local">
export function toDateTimeLocal(isoDateTime) {

    if(!isoDateTime) {
        return ''  
    }

    const date = new Date(isoDateTime)

    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() - offset)
        .toISOString()
        .slice(0,16);
    
}


// Converts UTC ISO → readable local date/time
// Used for displaying datetime
export function formatDateTime(isoDateTime) {
    if(!isoDateTime) {
        return '';
    }

    return new Date(isoDateTime).toLocaleString()
}

