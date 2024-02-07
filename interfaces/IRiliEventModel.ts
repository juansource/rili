// import Mongoose = require("mongoose");
import Mongoose from "mongoose";

interface IRiliEventModel extends Mongoose.Document {
    riliEventID: number;  // ask about this
    name: string;
    description: string;
    location: string;
    rangeStart: Date;
    rangeEnd: Date;
    userID: number; // ask about this
    availabilityID: number;  // ask about this
    // calendar
}
export {IRiliEventModel};