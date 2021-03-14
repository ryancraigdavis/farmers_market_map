// Create the dummy data
exports.createDummyData = async function(){
	const mysql = require('mysql');
	const server = require('../server');
	const pool = server.pool;

	const vendor1 = "INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`)" + 
		"VALUES ('Jibby Nuts', 'James Withers IV', '786-555-4556', 'nutz4@nuts.com', 'Jibby Nuts will do wonders for your colon')";
	const vendor2 = "INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) " +
		"VALUES ('Sue Salads', 'Sue Draper', '632-555-4336', 'ilovegreenz@earthlink.com', 'Nuts are bad for you! Eat kale!')";
	const vendor3 = "INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) " +
		"VALUES ('Cougar Tails', 'Earnie Wilkins', '801-555-1234', 'ears@cougars.edu', 'Rise and Shout')";
	const vendor4 = "INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) " +
		"VALUES ('Bamboo Express', 'Xi Ping', '804-555-1111', 'ccp@bamboo.com', 'Try our sweet pork buns')";
	const vendor5 = "INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) " +
		"VALUES ('Russian Dollface', 'Anna Karin', '619-555-2256', 'moth@er.ru', 'Hand painted Russian Dolls')";

	const service1 = "INSERT INTO `Services` (`serviceName`, `serviceQuality`)" +
		"VALUES ('Water', 'Fresh')";
	const service2 = "INSERT INTO `Services` (`serviceName`, `serviceQuality`)" +
		"VALUES ('Water', 'Poor')";
	const service3 = "INSERT INTO `Services` (`serviceName`, `serviceQuality`)" +
		"VALUES ('Toilets', 'Inside')";
	const service4 = "INSERT INTO `Services` (`serviceName`, `serviceQuality`)" +
		"VALUES ('Toilets', 'Outside')";
	const service5 = "INSERT INTO `Services` (`serviceName`, `serviceQuality`)" +
		"VALUES ('Wifi', 'Strong')";
	const service6 = "INSERT INTO `Services` (`serviceName`, `serviceQuality`)" +
		"VALUES ('Wifi', 'Poor')";

	pool.query(vendor1, function(err, result){
    if (err) {
      console.log(err);
    };
  });

	pool.query(vendor2, function(err, result){
    if (err) {
      console.log(err);
    };
  });
	pool.query(vendor3, function(err, result){
    if (err) {
      console.log(err);
    };
  });
	pool.query(vendor4, function(err, result){
    if (err) {
      console.log(err);
    };
  });
	pool.query(vendor5, function(err, result){
    if (err) {
      console.log(err);
    };
  });

	pool.query(service1, function(err, result){
    if (err) {
      console.log(err);
    };
  });

	pool.query(service2, function(err, result){
    if (err) {
      console.log(err);
    };
  });

	pool.query(service3, function(err, result){
    if (err) {
      console.log(err);
    };
  });

	pool.query(service4, function(err, result){
    if (err) {
      console.log(err);
    };
  });

	pool.query(service5, function(err, result){
    if (err) {
      console.log(err);
    };
  });

	pool.query(service6, function(err, result){
    if (err) {
      console.log(err);
    };
  });


}