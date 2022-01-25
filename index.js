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
import UserRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// var path = require('path');
// var cookieParser = require('cookie-parser');
import logger from 'morgan'
import TranslationRoutes from "./routes/TranslationRoutes.js";
import {createNotification} from "./controllers/NotificationController.js";

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
notificationRoutes(server);
// createNotification("61ef6c1c5c3f6812a4c55ae4", "Putki", 2,"3")

// index.use(logger('dev'));


// app.use(cookieParser());
// index.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


server.listen(PORT,()=>{
    console.log(`The server is up and running on port ${PORT}`);
})

