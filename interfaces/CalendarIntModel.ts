import Mongoose = require("mongoose");

interface CalendarIntModel extends Mongoose.Document {
    calendarID: number; // ask about this
    userID: number;
    riliEvents: [ {
        riliEventID: string;
        userDescription: string;
        avaiabilityEntered: boolean;
    }]
}
export {CalendarIntModel};