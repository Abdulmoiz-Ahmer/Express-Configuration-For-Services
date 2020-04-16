//Description of the file
//The controller will call model and let model handle all business related logic
//Model will be located under models directory

//Do Validation in controller or create a separate file if you want
//validation function requires data,rules and custom messages are optional
//For more information and options about the validation visit npm package validatorjs

//do imports Below Here
require('dotenv').config();
const Validator = require('validatorjs');
const model = require('../models/authentication');

//do imports Above Here
const controller = {};

//Code Request Handlers Below
controller.login = async (req, res) => {
	const data = {
		email: req.headers.email,
		password: req.headers.password
	};
	const rules = {
		email: 'required|email',
		password: 'required|min:8'
	};
	const validation = new Validator(data, rules);
	if (validation.fails()) {
		res.send({
			status: process.env.CLIENT_ERROR_CODE,
			message: validation.errors.errors
		});
	}
	// req.data = data;

	const response = await model.login(req, res);
	res.send(response);
};

controller.register = async (req, res) => {
	const data = {
		email: req.body.email,
		password: req.body.password,
		isAdmin: req.body.isAdmin
	};
	const rules = {
		email: 'required|email',
		password: 'required|min:8',
		isAdmin: 'required|boolean'
	};
	const validation = new Validator(data, rules);
	if (validation.fails()) {
		res.send({
			status: process.env.CLIENT_ERROR_CODE,
			message: validation.errors.errors
		});
	}

	const response = await model.register(req, res);
	res.send(response);
};

//Code Request Handlers Above
module.exports = controller;
