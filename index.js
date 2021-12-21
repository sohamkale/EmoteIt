import express from 'express'

import bodyParser from 'body-parser'

//import all routes
import feedbackRoutes from './routes/feedbackRoutes.js'

// var path = require('path');
// var cookieParser = require('cookie-parser');
import logger from 'morgan'

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

export const server = express();
const PORT = 5002;

//setup the body parser
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//call the feedback routes
feedbackRoutes(server);

// index.use(logger('dev'));


// app.use(cookieParser());
// index.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


server.listen(PORT,()=>{
    console.log(`The server is up and running on port ${PORT}`);
})

