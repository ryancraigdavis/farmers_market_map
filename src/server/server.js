// Farmers Market App
// Express - MySQL 
require('dotenv').config({ path: '../../.env' })
const express = require('express');
const http = require('http'); // Because we aren't using a template engine - to serve static html files
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const util = require('util'); // Needed in order to use await/async with pool connections for mysql

// MySQL pool connections
const pool = mysql.createPool({
  	connectionLimit  : 10,
  	host  : process.env.DB_HOST,
  	user  : process.env.DB_USER,
  	password: process.env.DB_PASS,
  	database: process.env.DB_NAME
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
	  		console.error('Database connection was closed.')
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
	  		console.error('Database has too many connections.')
		}
		if (err.code === 'ECONNREFUSED') {
	  		console.error('Database connection was refused.')
		}
  	}

	if (connection) connection.release()

  	return
})

// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
// Why we must use util with pool.query
pool.query = util.promisify(pool.query)

// https://stackoverflow.com/questions/20712712/how-to-pass-variable-from-app-js-to-routes-index-js
// Export the pool variable
module.exports.pool = pool;

// All front end files are found in the /public folder
app.use(express.static(__dirname + '/client'));

// Setting headers and initializing body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req,res,next) {
  	res.setHeader('Access-Control-Allow-Origin', '*');
  	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  	next();
})

// API's
app.use("/api/sites", require("./routes/api/sites"));
app.use("/api/locations", require("./routes/api/locations"));
app.use("/api/updateFilters", require("./routes/api/updateFilters"));

// Run Server
console.log('Express started on port 1359 🔹; press Ctrl-C to terminate.');
http.createServer(app).listen(1359);