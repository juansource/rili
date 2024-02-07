import Mongoose = require("mongoose");

interface RiliEventIntModel extends Mongoose.Document {
    riliEventID: number;  // ask about this
    name: string;
    description: string;
    location: string;
    rangeStart: Date;
    rangeEnd: Date;
    administratorUserID: number; // ask about this
    availabilityID: number;  // ask about this
}
export {RiliEventIntModel};