//Description of the file
//The controller will call model and let model handle all business related logic
//Model will be located under models directory

//do imports Below Here
const model = require('../models/test');
//do imports Above Here
const controller = {};

//Code Request Handlers Below
controller.get = (req, res) => {
	res.send(model.get());
};

//Code Request Handlers Above
module.exports = controller;
