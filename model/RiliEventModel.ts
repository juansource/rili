import * as Mongoose from "mongoose";
import {IRiliEventModel} from '../interfaces/IRiliEventModel'

class RiliEventModel {
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
                riliEventID: Number,  // ask about this
                name: String,
                description: String,
                location: String,
                rangeStart: Date,
                rangeEnd: Date,
                administratorUserID: Number, // ask about this
                availabilityID: Number  // ask about this
            }, {collection: 'riliEvents'}
        );
    }

    public async createModel() {
        try {
            // await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IRiliEventModel>("RiliEvents", this.schema);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveRiliEventDetails(response:any, value:number) {
        var query = this.model.find({});

        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveRiliEventCount(response:any) {
        var query = this.model.estimatedDocumentCount();
        try {
            const numberOfRiliEvents = await query.exec();
            console.log("numberOfRiliEvents: " + numberOfRiliEvents);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {RiliEventModel};