-- The Original Famers Market
INSERT INTO `Addresses` (`street`, `city`, `state`, `zip`, `lat`, `lng`)
VALUES ("6333 W 3rd St", "Los Angeles", "CA", "90036", "34.071901067018054", "-118.36034078637357");
INSERT INTO `FarmersMarkets` (`addressID`, `startTime`, `endTime`, `monday`, `tuesday`, `wednesday`,
`thursday`, `friday`, `saturday`, `sunday`, `name`)
VALUES (1, "10:00:00", "18:00:00", true, true, true, true, true, true, true, "The Original Farmers Market");

-- Manhattan Beach Certified Farmers' Market
INSERT INTO `Addresses` (`street`, `city`, `state`, `zip`, `lat`, `lng`)
VALUES ("326 13th St", "Manhattan Beach", "CA", "91030", "33.89702896535018", "-118.37978840319612");
INSERT INTO `FarmersMarkets` (`addressID`, `startTime`, `endTime`, `monday`, `tuesday`, `wednesday`,
`thursday`, `friday`, `saturday`, `sunday`, `name`)
VALUES (2, "11:00:00", "15:00:00", false, true, false, false, false, false, false, "Manhattan Beach Certified Farmers' Market");

-- Atwater Village Farmers' Market
INSERT INTO `Addresses` (`street`, `city`, `state`, `zip`, `lat`, `lng`)
VALUES ("3528 Larga Ave", "Los Angeles", "CA", "90039", "34.125873873534694", "-118.24475527034163");
INSERT INTO `FarmersMarkets` (`addressID`, `startTime`, `endTime`, `monday`, `tuesday`, `wednesday`,
`thursday`, `friday`, `saturday`, `sunday`, `name`)
VALUES (3, "09:00:00", "14:00:00", false, false, false, false, false, false, true, "Atwater Village Farmers' Market");

-- Vendor data
INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) 
VALUES ("Jibby's Nuts", "James Withers IV", "786-555-4556", "nutz4@nuts.com", "Jibby's Nuts will do wonders for your colon");
INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) 
VALUES ("Sue's Salads", "Sue Draper", "632-555-4336", "ilovegreenz@earthlink.com", "Nuts are bad for you! Eat kale!");
INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) 
VALUES ("Cougar Tails", "Earnie Wilkins", "801-555-1234", "ears@cougars.edu", "Rise and Shout");
INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) 
VALUES ("Bamboo Express", "Xi Ping", "804-555-1111", "ccp@bamboo.com", "Try our sweet pork buns");
INSERT INTO `Vendors` (`businessName`, `ownerName`, `phone`, `email`, `description`) 
VALUES ("Russian Dollface", "Anna Karin", "619-555-2256", "moth@er.ru", "Hand painted Russian Dolls");

-- Service data
INSERT INTO `Services` (`serviceName`, `serviceQuality`) 
VALUES ("Water", "Fresh");
INSERT INTO `Services` (`serviceName`, `serviceQuality`) 
VALUES ("Water", "Poor");
INSERT INTO `Services` (`serviceName`, `serviceQuality`) 
VALUES ("Toilets", "Inside");
INSERT INTO `Services` (`serviceName`, `serviceQuality`) 
VALUES ("Toilets", "Outside");
INSERT INTO `Services` (`serviceName`, `serviceQuality`) 
VALUES ("Wifi", "Strong");
INSERT INTO `Services` (`serviceName`, `serviceQuality`) 
VALUES ("Wifi", "Poor");

-- Vendor Lists
INSERT INTO `VendorLists` (`vendorID`, `marketID`, `location`) 
VALUES (1, 1, "Southwest Corner");
INSERT INTO `VendorLists` (`vendorID`, `marketID`, `location`) 
VALUES (2, 1, "Southwest Corner");
INSERT INTO `VendorLists` (`vendorID`, `marketID`, `location`) 
VALUES (3, 2, "At the front");
INSERT INTO `VendorLists` (`vendorID`, `marketID`, `location`) 
VALUES (4, 3, "Back north end");
INSERT INTO `VendorLists` (`vendorID`, `marketID`, `location`) 
VALUES (5, 3, "At the front");

-- Service Lists
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (1, 1, "Northwest Corner");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (3, 1, "In Al's Diner");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (5, 1, "All around");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (2, 2, "At the front");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (4, 2, "West side");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (6, 2, "All around");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (1, 3, "Near the front");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (4, 3, "Near the back");
INSERT INTO `ServiceLists` (`serviceID`, `marketID`, `location`) 
VALUES (6, 3, "All around");