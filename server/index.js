import functions from "firebase-functions";
import express from 'express'
import {mongoConnectionString} from './config.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

//import all routes
import FeedbackRoutes from './routes/FeedbackRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import EmortionRoutes from "./routes/EmortionRoutes.js";
import LeaderboardRoutes from "./routes/LeaderboardRoutes.js";
import TranslationRoutes from "./routes/TranslationRoutes.js";
import FriendshipRoutes from "./routes/FriendshipRoutes.js";
import {ProfileRoutes} from "./routes/ProfileRoutes.js";


//connect mongo
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionString,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});


export const server = express();

//setup the parsers
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());


server.route('/').get((req,res)=>{
  res.send('this is the emoteit backend landing pgae. nothing here')
})

//call the routes
FeedbackRoutes(server);
TranslationRoutes(server);
UserRoutes(server);
EmortionRoutes(server);
FriendshipRoutes(server);
ProfileRoutes(server);
LeaderboardRoutes(server);



export const emoteit_server = functions.https.onRequest(server);


