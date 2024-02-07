import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel'

class UserModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString= DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                userID: String,
                username: String,
                email: String,
                password: String,
                premiumUser: Boolean,
                calendarID: String,
                createdRiliEvents: [ 
                    String
                ],
                contactList: [
                    String
                ]
            }, {collection: 'users'}
        );
    }

    public async createModel() {
        try {
            // await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IUserModel>("Users", this.schema);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveUserDetails(response:any, value:number) {
        var query = this.model.find({});

        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch(e) {
            console.error(e);
        }
    }

    // public async retrieveUserCount(response:any) {
    //     var query = this.model.estimatedDocumentCount();
    //     try {
    //         const numberOfUsers = await query.exec();
    //         console.log("numberOfUsers: " + numberOfUsers);
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    // }
}
export {UserModel};