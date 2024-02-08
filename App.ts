import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';

import {AvailabilityModel} from './model/AvailabilityModel';
import {CalendarModel} from './model/CalendarModel';
import {RiliEventModel} from './model/RiliEventModel';
import {UserModel} from './model/UserModel';

class App {
    // ref to Express instance
    public expressApp: express.Application;

    public EventAvailabilities:AvailabilityModel;
    public Calendars:CalendarModel;
    public RiliEvents:RiliEventModel;
    public Users:UserModel;

    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection:string)
    {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.EventAvailabilities = new AvailabilityModel(mongoDBConnection);
        this.Calendars = new CalendarModel(mongoDBConnection);
        this.RiliEvents = new RiliEventModel(mongoDBConnection);
        this.Users = new UserModel(mongoDBConnection);
    }

    // Configure Express middleware.
    private middleware(): void {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use( (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
        });
    }

    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();

        /*
        availabilities
        */

        //create
        router.post('/app/:eventID/availability', async (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;

            jsonObj.availabilityID = id;
            jsonObj.eventID = req.params.eventID;

            try {
                await this.EventAvailabilities.model.create([jsonObj]);
                res.send('{"availabilityID":"' + id + '"}');
            }
            catch (e) {
                console.error(e);
                console.log('Error - Availability Object Creation Failed');
            }
          });


        // retrieveAvailabilityDetails - queries the general information for a availability object
        router.get('/app/availabilities/:availabilityID', async (req, res) => {
            var id = req.params.availabilityID;
            console.log('Query - Single Availability with ID: ' + id);
            await this.EventAvailabilities.retrieveAvailabilityDetails(res, id);
        });

        // retrieveAvailabilities - returns all of the availabilities for a specific event

        // retrieveAvailabiltiesCount - returns the number of availabilities per event
        router.get('/app/availabilities/:availabilityID/count', async (req, res) => {
            var id = req.params.availabilityID;
            console.log('Query - Availabilties with ID: ' + id);
            await this.EventAvailabilities.retrieveAvailabilitiesCount(res, id);
        });


        /*
        user
        */

        // create user
        router.post("/app/user/", async (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;

            jsonObj.userID = id;

            try {
                await this.Users.model.create([jsonObj]);
                res.send('{"id":"' + id + '"}');
            }
            catch (e) {
                console.error(e);
                console.log('Error - User Creation Failed');
            }
        });

        //retrieve user details
        router.get('/app/user/:userID', async (req, res) => {
            var id = req.params.userID;
            console.log('Query - Single User with ID: ' + id);
            await this.Users.retrieveUserDetails(res, id);
        });

        // retrieve user created events
        router.get('/app/user/:userID/createdRiliEvents', async (req, res) => {
            var id = req.params.userID;
            console.log('Query - createdRiliEvents for ID ' + id);
            await this.Users.retrieveCreatedRiliEvents(res, id);
        });

        // retrieve user contacts

        // retrieve total user count
        router.get('/app/user/:userID/userCount', async (req, res) => {
            var id = req.params.userID;
            console.log('Query - Total User Count');
            await this.Users.retrieveUserCount(res);
        });
    }


}

export {App};