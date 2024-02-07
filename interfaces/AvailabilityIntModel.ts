import Mongoose = require("mongoose");

interface AvailabilityIntModel extends Mongoose.Document {
    availabilityID: number; // ask about this
    riliEventID: string;
    availabilities: [ {
        userID: string;
        individualAvailability: [ {
            rangeStart: Date;
            rangeEnd: Date;
        } ]
    }]
}
export {AvailabilityIntModel};
