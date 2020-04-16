// Do all imports below here
// required fetching and modifying variables in env file
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');

require('./config/connection');
// Do all imports above here

//creating express instance to use the server
const server = express();

//Allowing our app to accept json as request arguments
server.use(express.json());

//setting cors so api's can be called from front end technologies
server.use(cors());

//setting up our server to use passport
server.use(passport.initialize());
require('./config/passport')(passport);

//returning express instance from routes file.
const registerRoutes = require('./routes/routes');
registerRoutes(server);

//Starting the server
//The port and host are stored inside env file which will only work if dotenv module is found in project.
server.listen(process.env.PORT, () =>
	console.log(`server is up and running on ${process.env.HOST}:${process.env.PORT}`)
);
