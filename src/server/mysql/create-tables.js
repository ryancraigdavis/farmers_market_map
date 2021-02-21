const mysql = require('mysql');
const server = require('../../server');
const pool = server.pool;

var createAddress = "CREATE TABLE workouts(" +
"id INT PRIMARY KEY AUTO_INCREMENT," +
"name VARCHAR(255) NOT NULL," +
"reps INT," +
"weight INT," +
"date DATE," +
"unit VARCHAR(255))";

pool.query('DROP TABLE IF EXISTS workouts', function(err){
  pool.query(createTable, function(err){
  console.log('Table Reset')
  })
});