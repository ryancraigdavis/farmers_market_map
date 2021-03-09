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

// Updates a market list
router.put("/update_market", async (req, res, next) => {

  try {
    const updateMarket = 'UPDATE FarmersMarkets SET name = ?, name = ?, name = ?, name = ?, name = ?, WHERE Markets.marketID = ?'

    // DB Query returning the markets for that location
    pool.query(updateMarket, [req.body.marketName, req.body.marketQuality, req.body.marketID], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Market Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Adds a market
router.post("/add_market", async (req, res, next) => {

  try {
    const addMarket = 'INSERT INTO `Markets` (`marketName`, `marketQuality`) ' +
    'VALUES (?, ?)'

    // DB Query returning the markets for that location
    pool.query(addMarket, [req.body.marketName, req.body.marketQuality], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Market Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;