//Every Collection(table in case of non-sql db's) will have separate schema files

const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		required: false
	}
});

//implement hashing in pre middleware
// usersSchema.pre('save', function(next) {
	



// 	next();
// });

module.exports = mongoose.model('Users', usersSchema);
