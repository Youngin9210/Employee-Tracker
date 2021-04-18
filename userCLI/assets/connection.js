// including npm dotenv package to help hide password and important info
require('dotenv').config();
// including node module util
const util = require('util');
// including mysql package to interact with db
const mysql = require('mysql');
// putting connection requirements into a variable to access later in code
const connection = mysql.createConnection({
	// setting host as pre-defined in .env file
	host: process.env.MySQL_HOST,

	// setting port as pre-defined in .env file
	port: process.env.MySQL_PORT,

	// setting user as pre-defined in .env file
	user: process.env.MySQL_USER,

	// setting password as pre-defined in .env file
	password: process.env.MySQL_PASS,
	// setting database as pre-defined in .env file
	database: process.env.MySQL_DB,
});
// starting connection when called
connection.connect();
// promisifying connection
connection.query = util.promisify(connection.query);
// exporting connection
module.exports = connection;
