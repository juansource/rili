import * as Mongoose from "mongoose";
import {IAvailabilityModel} from '../interfaces/IAvailabilityModel'

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
                availabilityID: String,
                riliEventID: String,
                availabilities: [ {
                    userID: String,
                    individualAvailability: [ {
                        rangeStart: Date,
                        rangeEnd: Date
                    } ]
                }]
            }, {collection: 'eventAvailabilities'}
        );
    }

    public async createModel() {
        try {
            // await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IAvailabilityModel>("EventAvailabilities", this.schema);
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

    public async retrieveAvailabilitiesCount(response:any, filter:object) {
        var query = this.model.findOne(filter);
        try {
            const innerAvailabilityList = await query.exec();
            if (innerAvailabilityList == null) {
                response.status(404);
                response.json('{count: -1}');
            }
            else {
                console.log("numberOfAvailabilties: " + innerAvailabilityList.availabilities.length);
                response.json('{count:' + innerAvailabilityList.availabilities.length + '}');
            }
            
        }
        catch (e) {
            console.error(e);
        }
    }
}
export {AvailabilityModel};