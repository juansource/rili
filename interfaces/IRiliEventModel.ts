// import Mongoose = require("mongoose");
import Mongoose from "mongoose";

interface IRiliEventModel extends Mongoose.Document {
    riliEventID: string;
    name: string;
    description: string;
    location: string;
    rangeStart: Date;
    rangeEnd: Date;
    userID: string; // representing the owner of the event
    availabilityID: string;
}
export {IRiliEventModel};