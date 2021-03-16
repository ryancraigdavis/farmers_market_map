const express = require("express");
const router = new express.Router();
const mysql = require('mysql');
const server = require('../../server');
const pool = server.pool;

// Returns all markets
router.get("/get_markets", async (req, res) => {

  try {
    returnArray = [];
    // Return array that needs to be filled with the objects being called from the DB
    const selectMarkets = 'SELECT FarmersMarkets.marketID, FarmersMarkets.name, FarmersMarkets.sunday, Addresses.addressID,' +
      ' Addresses.street, Addresses.city, Addresses.state, Addresses.zip, FarmersMarkets.startTime, FarmersMarkets.endTime, FarmersMarkets.monday,' +
      ' FarmersMarkets.tuesday, FarmersMarkets.wednesday, FarmersMarkets.thursday, FarmersMarkets.friday, FarmersMarkets.saturday' +
      ' FROM `FarmersMarkets` INNER JOIN Addresses ON FarmersMarkets.addressID = Addresses.addressID'

    // DB Query returning the markets for that location
    pool.query(selectMarkets, async function(err, rows, fields) {
      for (var i = 0; i < rows.length; i++) {
        var marketObject = new Object();
        marketObject = {
          "market": rows[i]
        }
        // Push to the array
        returnArray.push(marketObject);
      }
      res.send(returnArray);
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deletes a market
router.delete("/delete_market", async (req, res, next) => {

  try {
    const deleteMarket = 'DELETE FROM `FarmersMarkets` WHERE FarmersMarkets.marketID = "' + req.body.market.marketID + '"'

    // DB Query returning the markets for that location
    pool.query(deleteMarket, async function(err, rows, fields) {
      if (err){
        console.log(err);
        res.send('Failure');
      } else {
        res.send('Market Deleted');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Updates a market and address
router.put("/update_market", async (req, res, next) => {

  try {
    const updateAddress = 'UPDATE Addresses SET street = ?, city = ?, state = ?, zip = ?, lat = ?, lng = ? ' +
    'WHERE Addresses.addressID = ?'

    const updateMarket = 'UPDATE FarmersMarkets SET name = ?, startTime = ?, endTime = ?, ' +
    'monday = ?, tuesday = ?, wednesday = ?, thursday = ?, friday = ?, ' +
    'saturday = ?, sunday = ? WHERE FarmersMarkets.marketID = ?'

    // DB Query that updates markets
    pool.query(updateAddress, [req.body.street, req.body.city, req.body.state, 
      req.body.zip, req.body.lat, req.body.lng, req.body.addressID], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        pool.query(updateMarket, [req.body.name, req.body.startTime, req.body.endTime,
        req.body.monday, req.body.tuesday, req.body.wednesday, req.body.thursday, req.body.friday, 
        req.body.saturday, req.body.sunday, req.body.marketID], async function(err, rows, fields) {
          if (err){
            console.log(err)
            res.send('Failure');
          } else {
            res.send('Market Updated');
          };
        });
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Adds a market
router.post("/add_market", async (req, res, next) => {

  try {
    const addAddress = 'INSERT INTO `Addresses` (`street`, `city`, `state`, `zip`, `lat`, `lng`) ' +
    'VALUES (?, ?, ?, ?, ?, ?)'

    const addMarket = 'INSERT INTO `FarmersMarkets` (`addressID`, `name`, `startTime`, `endTime`, ' +
    '`monday`, `tuesday`, `wednesday`, `thursday`, `friday`, ' +
    '`saturday`, `sunday`) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    // DB Query that adds markets
    pool.query(addAddress, [req.body.street, req.body.city, req.body.state, 
      req.body.zip, req.body.lat, req.body.lng], async function(err, rows, fields) {
      if (err){
        res.send(err);
      } else {
        pool.query(addMarket, [rows.insertId, req.body.name, req.body.startTime, req.body.endTime,
        req.body.monday, req.body.tuesday, req.body.wednesday, req.body.thursday, req.body.friday, 
        req.body.saturday, req.body.sunday], async function(err, rows, fields) {
          if (err){
            console.log(err)
            res.send(err);
          } else {
            res.send('Market Updated');
          };
        });
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;