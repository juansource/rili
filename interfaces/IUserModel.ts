// import Mongoose = require("mongoose");
import Mongoose from "mongoose";

interface IUserModel extends Mongoose.Document {
    userID: string;
    username: string;
    email: string;
    password: string;
    premiumUser: Boolean;
    calendarID: string;
    createdRiliEvents: [ 
        string
    ]
    contactList: [
        string
    ]
}
export {IUserModel};