const express = require("express");
const router = new express.Router();
const server = require('../../server');
const pool = server.pool;

// Serves up the main index.html page
router.get("/", async (req, res) => {

    try {
        var path = 'index.html';
  		res.sendFile(path, {root: './public'})
  	
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;