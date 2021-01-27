const express = require("express");
const router = new express.Router();
const mysql = require('mysql');
const server = require('../../server');
const pool = server.pool;

// Returns the locations of the farmers markets
router.get("/get_markets", async (req, res) => {

  try {
  	// Return array that needs to be filled with the objects being called from the DB
  	returnArray = [];

  	// Need to fix for await
  	// DB Query returning the farmers market locations
  	pool.query('SELECT * FROM FarmersMarket', async function(err, rows, fields) {
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

// Async function used to query the DB and return the address of a market based on an FK passed as an arg
const getAddress = function(address_id) {
	pool.query('SELECT * FROM Addresses WHERE AddressID = "'+address_id+'"', async function(err, rows, fields){
		console.log(rows[0])
  	return rows[0];
  });
}



// Takes the markets object from the above get request and adds in the addresses
router.post("/get_addresses", async (req, res) => {

  try {

  	// DB Query returning the farmers market locations
        // Pull the address from the DB using the FK in FarmersMarket
        // pool.query('SELECT * FROM Addresses WHERE AddressID = "'+rows[i].AddressID+'"', function(err2, rows2, fields2){
        	// farmerReturnObject.address = rows2[0];
        	
        	// // Push to the array
        	// returnArray.push(farmerReturnObject);
        		  // Return the array
	  					res.send('hi');
			  // });



  	
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;