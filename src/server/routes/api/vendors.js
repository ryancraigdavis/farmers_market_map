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
      'Vendors.description FROM `VendorLists` INNER JOIN Vendors ON VendorLists.vendorID = Vendors.vendorID' +
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

// Deletes a vendor
router.delete("/delete_vendor", async (req, res, next) => {

  try {
    const deleteVendorList = 'DELETE FROM `VendorLists` WHERE VendorLists.vendorID = "' + req.body.vendor.vendorID + '" ' +
    'AND VendorLists.marketID = "' + req.body.marketID + '"'
    const deleteVendor = 'DELETE FROM `Vendors` WHERE Vendors.vendorID = "' + req.body.vendor.vendorID + '"'

    // DB Query returning the vendors for that location
    pool.query(deleteVendorList, async function(err, rows, fields) {
      if (err){
        res.send('Failure');
      } else {
        pool.query(deleteVendor, async function(err, rows, fields) {
          if (err){
            res.send('Failure');
          } else {
            res.send('Vendor Deleted');
          };
        });
      };
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// Deletes a vendor
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

module.exports = router;