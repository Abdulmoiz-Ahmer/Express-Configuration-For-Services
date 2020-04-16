//Description of the file
// All top level routes will be registered here for e.g. if i have test as a module than module
// may have several request points (GET,POST,PATCH,PUT,DELETE) but those will have
// in test file which will be created an located under routes directory and in this file only
// we will point to that file look at /test for example

//import routes file below here
const testRouter = require('../routes/test');
const authRouter = require('../routes/authentication');
const passport = require('passport');

//import routes file above here

function registerRoutes(server) {
	//register top level routes below here

	//when ever /test route is hit followed by something or nothing testRouter will handle it.
    server.use('/test', testRouter);
    //for making protected routes use passport.authenticate with jwt 
    server.use('/test/auth', passport.authenticate('jwt', { session: false }), testRouter);

	//users routes
	server.use('/auth', authRouter);
	//register top level routes above here
}

module.exports = registerRoutes;
