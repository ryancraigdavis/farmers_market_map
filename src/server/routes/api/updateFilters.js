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
    const updateDays = 'SELECT * FROM FarmersMarkets INNER JOIN Addresses ON FarmersMarkets.addressID = Addresses.addressID WHERE monday = ? AND tuesday = ? AND wednesday = ? AND thursday = ? ' +
      ' AND friday = ? AND saturday = ? AND sunday = ?'
  	//DB Query returning the farmers market locations updated by the filters
  	pool.query(updateDays,[req.body.days.monday, req.body.days.tuesday, req.body.days.wednesday, req.body.days.thursday, req.body.days.friday, 
      req.body.days.saturday, req.body.days.sunday], async function(err, rows, fields) {
  		for (var i = 0; i < rows.length; i++) {

        var addressReturnObject = new Object();
        addressReturnObject = {
          "addressID": rows[i].addressID,
          "street": rows[i].street,
          "city": rows[i].city,
          "state": rows[i].state,
          "zip": rows[i].zip,
          "lat": rows[i].lat,
          "lng": rows[i].lng
        }

  			// Return farmers market obj w/o address
  			var farmerReturnObject = new Object();
  			farmerReturnObject = {
          	"name": rows[i].name,
          	"address": addressReturnObject,
          	"start": rows[i].startTime,
          	"end": rows[i].endTime,
          	"monday": rows[i].monday,
          	"tuesday": rows[i].tuesday,
          	"wednesday": rows[i].wednesday,
          	"thursday": rows[i].thursday,
          	"friday": rows[i].friday,
          	"saturday": rows[i].saturday,
          	"sunday": rows[i].sunday
        };

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