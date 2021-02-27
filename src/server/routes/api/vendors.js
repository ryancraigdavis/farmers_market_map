const express = require("express");
const router = new express.Router();
const mysql = require('mysql');
const server = require('../../server');
const pool = server.pool;

// Returns the vendors for a market
router.post("/get_vendor_lists", async (req, res, next) => {

  try {
    returnArray = [];
  	// Return array that needs to be filled with the objects being called from the DB
    const selectVendors = 'SELECT Vendors.vendorID, Vendors.businessName, Vendors.ownerName, Vendors.phone, Vendors.email,' +
      'Vendors.description, VendorLists.location FROM `VendorLists` INNER JOIN Vendors ON VendorLists.vendorID = Vendors.vendorID' +
      ' INNER JOIN FarmersMarkets ON VendorLists.marketID = FarmersMarkets.marketID' +
      ' WHERE FarmersMarkets.marketID = "' + req.body.marketID + '"'

  	// DB Query returning the vendors for that location
  	pool.query(selectVendors, async function(err, rows, fields) {
      for (var i = 0; i < rows.length; i++) {
	  	  var vendorObject = new Object();
        vendorObject = {
          "marketID": req.body.marketID,
          "vendor": rows[i]
        }
        // Push to the array
        returnArray.push(vendorObject);
      }
      res.send(returnArray);
	  });
  	
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deletes a vendor list
router.delete("/delete_vendor_list", async (req, res, next) => {

  try {
    const deleteVendorList = 'DELETE FROM `VendorLists` WHERE VendorLists.vendorID = "' + req.body.vendor.vendorID + '" ' +
    'AND VendorLists.marketID = "' + req.body.marketID + '"'

    // DB Query returning the vendors for that location
    pool.query(deleteVendorList, async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Vendor List Deleted');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Updates a vendor list
router.put("/update_vendor_list", async (req, res, next) => {

  try {
    const updateVendor = 'UPDATE Vendors SET businessName = ?, ownerName = ?, phone = ?, ' +
    'email = ?, description = ? WHERE Vendors.vendorID = ?'

    // DB Query returning the vendors for that location
    pool.query(updateVendor, [req.body.businessName, req.body.ownerName, req.body.phone, req.body.email, 
      req.body.description, req.body.vendorID], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Vendor Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Adds a vendor list
router.post("/add_vendor_list", async (req, res, next) => {

  try {
    const addVendorList = 'INSERT INTO `VendorLists` (`vendorID`, `marketID`, `location`) ' +
    'VALUES (?, ?, ?)'

    // DB Query returning the vendors for that location
    pool.query(addVendorList, [req.body.vendorID, req.body.marketID, req.body.location], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Vendor List Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Returns all vendors
router.get("/get_vendors", async (req, res) => {

  try {
    returnArray = [];
    // Return array that needs to be filled with the objects being called from the DB
    const selectVendors = 'SELECT Vendors.vendorID, Vendors.businessName, Vendors.ownerName, Vendors.phone, Vendors.email,' +
      'Vendors.description FROM `Vendors`'

    // DB Query returning the vendors for that location
    pool.query(selectVendors, async function(err, rows, fields) {
      for (var i = 0; i < rows.length; i++) {
        var vendorObject = new Object();
        vendorObject = {
          "vendor": rows[i]
        }
        // Push to the array
        returnArray.push(vendorObject);
      }
      res.send(returnArray);
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deletes a vendor
router.delete("/delete_vendor", async (req, res, next) => {

  try {
    const deleteVendor = 'DELETE FROM `Vendors` WHERE Vendors.vendorID = "' + req.body.vendor.vendorID + '"'

    // DB Query returning the vendors for that location
    pool.query(deleteVendor, async function(err, rows, fields) {
      if (err){
        console.log(err);
        res.send('Failure');
      } else {
        res.send('Vendor Deleted');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Updates a vendor list
router.put("/update_vendor", async (req, res, next) => {

  try {
    const updateVendor = 'UPDATE Vendors SET businessName = ?, ownerName = ?, phone = ?, ' +
    'email = ?, description = ? WHERE Vendors.vendorID = ?'

    // DB Query returning the vendors for that location
    pool.query(updateVendor, [req.body.businessName, req.body.ownerName, req.body.phone, req.body.email, 
      req.body.description, req.body.vendorID], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Vendor Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Adds a vendor
router.post("/add_vendor", async (req, res, next) => {

  try {
    const addVendor = 'INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) ' +
    'VALUES (?, ?, ?, ?, ?)'

    // DB Query returning the vendors for that location
    pool.query(addVendor, [req.body.businessName, req.body.ownerName, req.body.phone, req.body.email, 
      req.body.description], async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        res.send('Vendor Updated');
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;