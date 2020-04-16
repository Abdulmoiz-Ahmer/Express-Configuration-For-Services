//Model will interact with the database and do business logic
//Incase of mongodb as a backend use schemas directory to store schemas
//Incase of mysql additional setting will be required
//Hashing is done using bcrypt
//An example of how to hash is given in register method

//do imports Below Here
require('dotenv').config();
const User = require('../schemas/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//do imports Above Here

const model = {};
//Code Request Handlers Below
model.login = async (req, res) => {
	try {
		const obj = await User.findOne({ email: req.headers.email }).exec();
		if (typeof obj != 'undefined' && obj != null)
			if (bcrypt.compareSync(req.headers.password, obj.password)) {
				//jwt requires payload, secret key and expiry time
				const token = await jwt.sign(
					{
						id: obj.id,
						email: obj.email
					},
					process.env.SECRET_KEY,
					{
						expiresIn: parseInt(process.env.EXPIRES_IN)
					}
				);

				return {
					status: process.env.SUCCESS_CODE,
					data: {
						token: `Bearer ${token}`
					}
				};
			}

		return {
			status: process.env.CLIENT_ERROR_CODE,
			message: 'Incorrect email or password.'
		};
	} catch (err) {
		return {
			status: process.env.SERVER_ERROR_CODE,
			message: err.message
		};
	}
};

model.register = async (req, res) => {
	try {
		const obj = await User.findOne({ email: req.body.email }).exec();
		if (typeof obj != 'undefined' && obj != null) {
			return {
				status: process.env.CLIENT_ERROR_CODE,
				message: 'Email is already associated with another account'
			};
		}

		const hash = await bcrypt.hashSync(req.body.password, parseInt(process.env.ROUNDS));
		let user = new User({
			email: req.body.email,
			password: hash,
			isAdmin: req.body.isAdmin
		});
		const newUser = await user.save();
		return {
			status: process.env.SUCCESS_CODE,
			data: newUser
		};
	} catch (err) {
		return {
			status: process.env.SERVER_ERROR_CODE,
			message: err.message
		};
	}
};

//Code Request Handlers Above

module.exports = model;
