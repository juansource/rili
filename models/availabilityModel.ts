import * as Mongoose from "mongoose";
import {AvailabilityIntModel} from '../interfaces/AvailabilityIntModel'

class AvailabilityModel {
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
                availabilityID: Number,
                riliEventID: String,
                availabilties: [{
                    userID: String,
                    individualAvailability: [{
                        rangeStart: Date,
                        rangeEnd: Date,
                    }]
                }]
            }, {collection: 'eventAvailabilities'}
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            this.model = Mongoose.model<AvailabilityIntModel>("EventAvailabilities", this.schema);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveAvailabilityDetails(response:any, value:number) {
        var query = this.model.find({});

        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveAvailabiltiesCount(response:any) {
        var query = this.model.estimatedDocumentCount();
        try {
            const numberOfAvailabilties = await query.exec();
            console.log("numberOfAvailabilties: " + numberOfAvailabilties);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {AvailabilityModel};