const express = require("express");
const router = new express.Router();
const mysql = require('mysql');
const server = require('../../server');
const pool = server.pool;

// Returns the locations of the farmers markets
router.post("/update_filters", async (req, res, next) => {

  try {
  	// Return array that needs to be filled with the objects being called from the DB
    // Construction of query
    var updateDays = 'SELECT * FROM FarmersMarkets INNER JOIN Addresses ON FarmersMarkets.addressID = Addresses.addressID WHERE ('
    var count = 0
    if (req.body.days.monday == 1) {
      updateDays = updateDays + 'monday = 1 OR '
      count += 1
    }
    if (req.body.days.tuesday == 1) {
      updateDays = updateDays + 'tuesday = 1 OR '
      count += 1
    }
    if (req.body.days.wednesday == 1) {
      updateDays = updateDays + 'wednesday = 1 OR '
      count += 1
    }
    if (req.body.days.thursday == 1) {
      updateDays = updateDays + 'thursday = 1 OR '
      count += 1
    }
    if (req.body.days.friday == 1) {
      updateDays = updateDays + 'friday = 1 OR '
      count += 1
    }
    if (req.body.days.saturday == 1) {
      updateDays = updateDays + 'saturday = 1 OR '
      count += 1
    }
    if (req.body.days.sunday == 1) {
      updateDays = updateDays + 'sunday = 1 OR '
      count += 1
    }
    if (count >= 1) {
      updateDays = updateDays.substring(0, updateDays.length-4);
      updateDays = updateDays + ')'
    }

    if (count == 0) {
      updateDays = 'SELECT * FROM FarmersMarkets INNER JOIN Addresses ON FarmersMarkets.addressID = Addresses.addressID WHERE (monday = 0 AND tuesday = 0 AND wednesday = 0 AND thursday = 0 ' +
      ' AND friday = 0 AND saturday = 0 AND sunday = 0)'
    }

    // Now add the hours
    if (req.body.hours.anyTime == false && req.body.hours.startTime != "" && req.body.hours.endTime != "") {
      updateDays = updateDays + ' AND (FarmersMarkets.startTime > "'+req.body.hours.startTime+'" AND FarmersMarkets.endTime < "'+req.body.hours.endTime+'")'
    }

  	returnArray = [];
    // const updateDays = 'SELECT * FROM FarmersMarkets INNER JOIN Addresses ON FarmersMarkets.addressID = Addresses.addressID WHERE monday = ? AND tuesday = ? AND wednesday = ? AND thursday = ? ' +
    //  ' AND friday = ? AND saturday = ? AND sunday = ?'
  	//DB Query returning the farmers market locations updated by the filters
  	pool.query(updateDays, async function(err, rows, fields) {
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