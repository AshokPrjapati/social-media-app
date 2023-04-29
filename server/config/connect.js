const mongoose = require("mongoose");

require('dotenv').config();


// connecting to database using mongosose connect method
const connection = mongoose.connect(process.env.DB_URL);

// default export 
module.exports = connection;