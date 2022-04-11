import express from 'express'
import {mongoConnectionString} from './config.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'


//connect mongo
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//import all routes
import FeedbackRoutes from './routes/FeedbackRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import EmortionRoutes from "./routes/EmortionRoutes.js";



// var path = require('path');
// var cookieParser = require('cookie-parser');
import logger from 'morgan'
import TranslationRoutes from "./routes/TranslationRoutes.js";
import FriendshipRoutes from "./routes/FriendshipRoutes.js";
import SecretEmortionRoutes from "./routes/SecretEmortionRoutes.js";
import {ProfileRoutes} from "./routes/ProfileRoutes.js";

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

export const server = express();
const PORT = 5002;

//setup the body parser
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//call the feedback routes
FeedbackRoutes(server);
TranslationRoutes(server);
UserRoutes(server);
EmortionRoutes(server);
FriendshipRoutes(server);
SecretEmortionRoutes(server);
ProfileRoutes(server);
 // createNotification("61f267dd0017642ca52dc23d", "Hameem Kalo", 1, 2);

// index.use(logger('dev'));


// app.use(cookieParser());
// index.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


server.listen(PORT,()=>{
    console.log(`The server is up and running on port ${PORT}`);
})

