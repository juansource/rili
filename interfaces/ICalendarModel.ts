// import Mongoose = require("mongoose");
import Mongoose from "mongoose";

interface CalendarIntModel extends Mongoose.Document {
    calendarID: string;
    userID: string;
    riliEvents: [ {
        riliEventID: string;
        userDescription: string;
        avaiabilityEntered: boolean;
    }]
}
export {CalendarIntModel};