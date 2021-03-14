const express = require("express");
const router = new express.Router();
const mysql = require('mysql');
const server = require('../../server');
const pool = server.pool;

// Returns the services for a market
router.post("/get_service_lists", async (req, res, next) => {

  try {
    returnArray = [];
  	// Return array that needs to be filled with the objects being called from the DB
    const selectServices = 'SELECT Services.serviceID, Services.serviceName, Services.serviceQuality, ' +
      'ServiceLists.location FROM `ServiceLists` INNER JOIN Services ON ServiceLists.serviceID = Services.serviceID' +
      ' INNER JOIN FarmersMarkets ON ServiceLists.marketID = FarmersMarkets.marketID' +
      ' WHERE FarmersMarkets.marketID = "' + req.body.marketID + '"'

  	// DB Query returning the services for that location
  	pool.query(selectServices, async function(err, rows, fields) {
      for (var i = 0; i < rows.length; i++) {
	  	  var serviceObject = new Object();
        serviceObject = {
          "marketID": req.body.marketID,
          "service": rows[i]
        }
        // Push to the array
        returnArray.push(serviceObject);
      }
      res.send(returnArray);
	  });
  	
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deletes a service list
router.delete("/delete_service_list", async (req, res, next) => {

  try {
    const deleteServiceList = 'DELETE FROM `ServiceLists` WHERE ServiceLists.serviceID = "' + req.body.service.serviceID + '" ' +
    'AND ServiceLists.marketID = "' + req.body.marketID + '"'

    // DB Query returning the services for that location
    pool.query(deleteServiceList, async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Service List Deleted');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Updates a service list
router.put("/update_service_list", async (req, res, next) => {

  try {
    const updateService = 'UPDATE Services SET serviceName = ?, serviceQuality = ? WHERE Services.serviceID = ?'

    // DB Query returning the services for that location
    pool.query(updateService, [req.body.serviceName, req.body.serviceQuality, req.body.serviceID], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Service Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Adds a service list
router.post("/add_service_list", async (req, res, next) => {

  try {
    const addServiceList = 'INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) ' +
    'VALUES (?, ?, ?)'

    // DB Query returning the services for that location
    pool.query(addServiceList, [req.body.serviceID, req.body.marketID, req.body.location], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Service List Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Returns all services
router.get("/get_services", async (req, res) => {

  try {
    returnArray = [];
    // Return array that needs to be filled with the objects being called from the DB
    const selectServices = 'SELECT Services.serviceID, Services.serviceName, Services.serviceQuality FROM `Services`'

    // DB Query returning the services for that location
    pool.query(selectServices, async function(err, rows, fields) {
      for (var i = 0; i < rows.length; i++) {
        var serviceObject = new Object();
        serviceObject = {
          "service": rows[i]
        }
        // Push to the array
        returnArray.push(serviceObject);
      }
      res.send(returnArray);
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deletes a service
router.delete("/delete_service", async (req, res, next) => {

  try {
    const deleteService = 'DELETE FROM `Services` WHERE Services.serviceID = "' + req.body.service.serviceID + '"'

    // DB Query returning the services for that location
    pool.query(deleteService, async function(err, rows, fields) {
      if (err){
        console.log(err);
        res.send('Failure');
      } else {
        res.send('Service Deleted');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Updates a service list
router.put("/update_service", async (req, res, next) => {

  try {
    const updateService = 'UPDATE Services SET serviceName = ?, serviceQuality = ? WHERE Services.serviceID = ?'

    // DB Query returning the services for that location
    pool.query(updateService, [req.body.serviceName, req.body.serviceQuality, req.body.serviceID], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Service Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Adds a service
router.post("/add_service", async (req, res, next) => {

  try {
    const addService = 'INSERT INTO `Services` (`serviceName`, `serviceQuality`) ' +
    'VALUES (?, ?)'

    // DB Query returning the services for that location
    pool.query(addService, [req.body.serviceName, req.body.serviceQuality], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Service Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;