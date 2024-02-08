import * as Mongoose from "mongoose";
import {CalendarIntModel} from '../interfaces/ICalendarModel'

class CalendarModel {
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
                calendarID: String,
                userID: String,
                riliEvents: [ {
                    riliEventID: String,
                    userDescription: String,
                    avaiabilityEntered: Boolean
                }]
            }, {collection: 'calendars'}
        );
    }

    public async createModel() {
        try {
            // await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<CalendarIntModel>("Calendars", this.schema);
        }
        catch(e) {
            console.error(e);
        }
    }

    public async retrieveCalendarDetails(response:any, value:number) {
        var query = this.model.find({userID: value});

        try {
            const itemArray = await query.exec();
            response.json(itemArray);
        }
        catch(e) {
            console.error(e);
        }
    }

    // public async retrieveCalendarsCount(response:any) {
    //     var query = this.model.estimatedDocumentCount();
    //     try {
    //         const numberOfCalendars = await query.exec();
    //         console.log("numberOfCalendars: " + numberOfCalendars);
    //     }
    //     catch (e) {
    //         console.error(e);
    //     }
    // }
}
export {CalendarModel};