CREATE TABLE IF NOT EXISTS Addresses ( 
		addressID INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
		street VARCHAR(255) NOT NULL, 
		city VARCHAR(255) NOT NULL, 
		state varchar(255) NOT NULL, 
		zip varchar(255) NOT NULL, 
		lat varchar(255) NULL, 
		lng varchar(255) NULL);

CREATE TABLE IF NOT EXISTS FarmersMarkets ( 
		marketID int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
		addressID int(11) NULL, 
		startTime TIME (0) NOT NULL, 
		endTime TIME (0) NOT NULL, 
		monday boolean default false, 
		tuesday boolean default false, 
		wednesday boolean default false, 
		thursday boolean default false, 
		friday boolean default false, 
		saturday boolean default false, 
		sunday boolean default false, 
		name varchar(255) NOT NULL, FOREIGN KEY (addressID) REFERENCES Addresses(addressID));

CREATE TABLE IF NOT EXISTS Vendors ( 
		vendorID int(11) NOT NULL AUTO_INCREMENT, 
		businessName varchar(255) NOT NULL, 
		ownerName varchar(255) NULL, 
		phone varchar(255) NULL, 
		email varchar(255) NULL, 
		description TEXT NULL, 
		PRIMARY KEY (vendorID));

CREATE TABLE IF NOT EXISTS Services ( 
		serviceID int(11) NOT NULL AUTO_INCREMENT, 
		serviceName varchar(255) NOT NULL, 
		serviceQuality varchar(255) NULL, 
		PRIMARY KEY (serviceID));

CREATE TABLE IF NOT EXISTS VendorLists ( 
		vendorListID int(11) NOT NULL AUTO_INCREMENT, 
		vendorID int(11) NOT NULL, 
		marketID int(11) NOT NULL, 
		location varchar(255) NOT NULL, 
		PRIMARY KEY (vendorListID), 
		FOREIGN KEY (vendorID) REFERENCES Vendors(vendorID), 
		FOREIGN KEY (marketID) REFERENCES FarmersMarkets(marketID) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS ServiceLists ( 
		serviceListID int(11) NOT NULL AUTO_INCREMENT, 
		serviceID int(11) NOT NULL, 
		marketID int(11) NOT NULL, 
		location varchar(255) NOT NULL, 
		PRIMARY KEY (serviceListID), 
		FOREIGN KEY (serviceID) REFERENCES Services(serviceID), 
		FOREIGN KEY (marketID) REFERENCES FarmersMarkets(marketID) ON DELETE CASCADE);