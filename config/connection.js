//Depending upon the backend do connection setup here
require('dotenv').config();
const mongoose = require('mongoose');

mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch((error) => handleError(error));
mongoose.connection.on('error', (err) => {
	console.log(err);
});

module.exports =  mongoose