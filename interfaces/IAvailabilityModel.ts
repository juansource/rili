// import Mongoose = require("mongoose");
import Mongoose from "mongoose";

interface IAvailabilityModel extends Mongoose.Document {
    availabilityID: string;
    riliEventID: string;
    availabilities: [ {
        userID: string;
        individualAvailability: [ {
            rangeStart: Date;
            rangeEnd: Date;
        } ]
    }]
}
export {IAvailabilityModel};
