// import Mongoose = require("mongoose");
import Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
    userID: number; // string
    username: string;
    email: string;
    password: string;
    premiumUser: Boolean;
    calendarID: string; // ask about this
    createdRiliEvents: [ 
        string
    ]
    contactList: [
        string
    ]
}
export {IUserModel};