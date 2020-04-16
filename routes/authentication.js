//Description of the file
// All request types of a particular route like in this example test will be handled here
// We will point to the controller methods that will handle these routes
//The controllers will be defined and located in controllers directory

const router = require('express').Router();

//do imports Below Here
const authController = require('../controllers/authentication');

//do imports Above Here

//Register all Requests Below Here

router.get('/login', authController.login);
router.post('/register', authController.register);

//Register all Requests Above Here
module.exports = router;
