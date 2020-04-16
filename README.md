# Express-Application
BoilerPlate Code for building upon express.

This is boilerplate of express for building rest api's.
The application is structure to be somewhat similar to mvc. 
Though services don't have views so did this setup.

The application is also setup to use mongo atlas, bcrypt hashing, passport authentication with json web tokens.
The logic, registration and test routes has been already setup. Every thing is commented.

To quickly run make sure you have npm setup properly and do following setups:
rename example.env to .env
place your own mongoatlas url and a secret key in .env file
	npm i
	npm run server

