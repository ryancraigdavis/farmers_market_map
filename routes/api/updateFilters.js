const express = require("express");
const router = new express.Router();
const mysql = require('mysql');
const server = require('../../server');
const pool = server.pool;

// Returns the locations of the farmers markets
router.post("/update_filters", async (req, res, next) => {

  try {
  	// Return array that needs to be filled with the objects being called from the DB
  	returnArray = [];

  	//DB Query returning the farmers market locations updated by the filters
  	pool.query('SELECT * FROM FarmersMarket WHERE wednesday = ' + req.body.days.wednesday +'', async function(err, rows, fields) {
  		for (var i = 0; i < rows.length; i++) {

  			// Return farmers market obj w/o address
  			var farmerReturnObject = new Object();
  			farmerReturnObject = {
          	"name": rows[i].Name,
          	"address": null,
          	"start": rows[i].StartTime,
          	"end": rows[i].EndTime,
          	"monday": rows[i].Monday,
          	"tuesday": rows[i].Tuesday,
          	"wednesday": rows[i].Wednesday,
          	"thursday": rows[i].Thursday,
          	"friday": rows[i].Friday,
          	"saturday": rows[i].Saturday,
          	"sunday": rows[i].Sunday
        };

			const ret_address = await pool.query('SELECT * FROM Addresses WHERE AddressID = ?', [rows[i].AddressID]);
			farmerReturnObject.address = ret_address[0];
        // Push to the array
        returnArray.push(farmerReturnObject);

	    };

	  	// Return the array
	  	res.send(returnArray);
	});
  	
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;