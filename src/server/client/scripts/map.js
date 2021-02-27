// Google maps tutorial
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-typescript
// Initialize and add the map
let map, infoWindow, geocoder;
let markers = [];

// Submit button for changing the map location and the fields associated
var searchButton = document.getElementById('searchSubmit');

// Server location address
var serverUrl = 'http://localhost:1359';

function deleteVendors(vendor){

	var req = new XMLHttpRequest();

    req.open('DELETE', 'http://localhost:1359/api/vendors/delete_vendor', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(vendor));
	
}

function updateVendors(vendor){

	var req = new XMLHttpRequest();

    req.open('PUT', 'http://localhost:1359/api/vendors/update_vendor', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(vendor));
	
}

function loadVendors(markets){

	var req = new XMLHttpRequest();

    req.open('POST', 'http://localhost:1359/api/vendors/get_vendor_lists', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = JSON.parse(req.responseText);
	    	var vendorBody = document.getElementById("vendorBody");

	    	// Reset table
	    	vendorBody.innerHTML = ""
	    	// This loop goes through each of the challengers and displays them
			for (var i = 0; i < data.length; i++) {

				// Creates the rows and cells
			  	var row = document.createElement("tr");
		    	var cell1 = document.createElement("td");
		    	var cell2 = document.createElement("td");
		    	var cell3 = document.createElement("td");
		    	var cell4 = document.createElement("td");
		    	var cell5 = document.createElement("td");
		    	var cell6 = document.createElement("td");
		    	var cell7 = document.createElement("td");

		    	// These are the variables created from the DB
		    	var cell1name = document.createTextNode(data[i].vendor.businessName);
		    	var cell2name = document.createTextNode(data[i].vendor.ownerName);
		    	var cell3name = document.createTextNode(data[i].vendor.phone);
		    	var cell4name = document.createTextNode(data[i].vendor.email);
		    	var cell5name = document.createTextNode(data[i].vendor.description);
		    	var cell6name = document.createElement('button');
		    	cell6name.innerHTML = "Update";
		    	var cell7name = document.createElement('button');
		    	cell7name.innerHTML = "Delete";

		    	var vendorVar = data[i];

	    		cell6name.onclick = (function(vendorVar){
     				return function(){
     					var vendorBody = document.getElementById("vendorBody");
     					var rowUp = document.createElement("tr");
				    	var cell1Up = document.createElement("td");
				    	var cell2Up = document.createElement("td");
				    	var cell3Up = document.createElement("td");
				    	var cell4Up = document.createElement("td");
				    	var cell5Up = document.createElement("td");
				    	var cell6Up = document.createElement("td");
				    	var cell7Up = document.createElement("td");

				        cell1Up.innerHTML = '<input type="text" id="update1" value="'+vendorVar.vendor.businessName+'">'
				        cell2Up.innerHTML = '<input type="text" id="update2" value="'+vendorVar.vendor.ownerName+'">'
				        cell3Up.innerHTML = '<input type="text" id="update3" value="'+vendorVar.vendor.phone+'">'
				        cell4Up.innerHTML = '<input type="text" id="update4" value="'+vendorVar.vendor.email+'">'
				        cell5Up.innerHTML = '<input type="text" id="update5" value="'+vendorVar.vendor.description+'">'
				        var cell6UpName = document.createElement('button');
		    			cell6UpName.innerHTML = "Submit";
		    			var cell7UpName = document.createElement('button');
		    			cell7UpName.innerHTML = "Cancel";

		    			cell6UpName.onclick = (function(vendorVar){
     						return function(){
     							var updateCell1 = document.getElementById("update1").value;
     							var updateCell2 = document.getElementById("update2").value;
     							var updateCell3 = document.getElementById("update3").value;
     							var updateCell4 = document.getElementById("update4").value;
     							var updateCell5 = document.getElementById("update5").value;
     							var updateObject = new Object();
     							updateObject = {
     								"vendorID": vendorVar.vendor.vendorID,
     								"businessName": updateCell1,
     								"ownerName": updateCell2,
     								"phone": updateCell3,
     								"email": updateCell4,
     								"description": updateCell5
     							}
     							updateVendors(updateObject);
				        		$('#vendorModal').modal('hide');
				    		}
						})(vendorVar);

						cell7UpName.onclick = (function(){
     						return function(){
     							$('#vendorModal').modal('hide');
     							alert('Update Cancelled');
				    		}
						})();
						cell6Up.appendChild(cell6UpName);
			    		cell7Up.appendChild(cell7UpName);

			    		rowUp.appendChild(cell1Up);
				    	rowUp.appendChild(cell2Up);
				    	rowUp.appendChild(cell3Up);
				    	rowUp.appendChild(cell4Up);
				    	rowUp.appendChild(cell5Up);
				    	rowUp.appendChild(cell6Up);
				    	rowUp.appendChild(cell7Up);
		    	
			    		// Appends row to the table
			  			vendorBody.appendChild(rowUp);
				    }
				})(vendorVar);

				cell7name.onclick = (function(vendorVar){
     				return function(){
				        deleteVendors(vendorVar);
				        $('#vendorModal').modal('hide');
				    }
				})(vendorVar); 
		    	
			    // Appending the variables to the cells
			    cell1.appendChild(cell1name);
			    cell2.appendChild(cell2name);
			    cell3.appendChild(cell3name);
			    cell4.appendChild(cell4name);
			    cell5.appendChild(cell5name);
			    cell6.appendChild(cell6name);
			    cell7.appendChild(cell7name);

		    	row.appendChild(cell1);
		    	row.appendChild(cell2);
		    	row.appendChild(cell3);
		    	row.appendChild(cell4);
		    	row.appendChild(cell5);
		    	row.appendChild(cell6);
		    	row.appendChild(cell7);
		    	
			    // Appends row to the table
			  	vendorBody.appendChild(row);
			}
			// Show the populated modal
			$('#vendorModal').modal('show');

      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(markets));
	
}

function loadServices(markets){
	// $('#servicesModal').modal('show');
}

// Initial get when the page is loaded
function placeMarkets(){

	 // Creates the response
	var req = new XMLHttpRequest();

	req.open('GET', serverUrl+'/api/locations/get_markets', true);
	req.withCredentials = false;
	req.onload = function (e) {
		if (req.readyState === 4) {
		if (req.status === 200) {

			// SQL Data returned from server which is added to the map
			var markets = JSON.parse(req.responseText);
		  	for (let i = 0; i < markets.length; i++) {
		    	const latLng = new google.maps.LatLng(parseFloat(markets[i].address.lat),parseFloat(markets[i].address.lng));
		    	
		    	// Infowindow content
                var content = document.createElement('div'),vendors,services,inner;
                inner = content.appendChild(document.createElement('div'));
                inner.innerHTML = '<div class="infoWindow"><h3>' + markets[i].name + 
                    '</h3><p>Location: ' + markets[i].address.street + ' ' + markets[i].address.city + 
                    ', '+ markets[i].address.state + '</p><p>Times: ' + markets[i].start + ' to ' + 
                    markets[i].end + '</p></div>'

		    	vendors = content.appendChild(document.createElement('input'));
				vendors.type = 'button';
                vendors.value = 'See Vendors'
				google.maps.event.addDomListener(vendors, 'click', function () {
                    loadVendors(markets[i]);
                 })

				services = content.appendChild(document.createElement('input'));
				services.type = 'button';
                services.value = 'See Services'
				google.maps.event.addDomListener(services, 'click', function () {
                    loadServices(markets[i]);
                 })

		    	const infowindow = new google.maps.InfoWindow({
					content: content,
				});

		    	const marker = new google.maps.Marker({
		      		position: latLng,
		      		map: map,
		      		title: markets[i].name,
		    	});
				marker.addListener("click", () => {
					infowindow.open(map, marker);
				});

				markers.push(marker);
			}

		 } else {
			 console.error(req.statusText);
		 }
	 }
 };
 req.onerror = function (e) {
   console.error(req.statusText);
 };
 req.send(null);
};

// Called when new filters are applied
function updateMarkets(){
	event.preventDefault();

	var filterObject = new Object();
	var servicesObject = new Object();
	var daysObject = new Object();
	var hoursObject = new Object();


	// Sends the filters to the server for a new set of pins
	var wifi = document.getElementById('wifi');
	var bathrooms = document.getElementById('bathrooms');
	var water = document.getElementById('water');

	servicesObject = {
        "wifi": wifi.checked,
        "bathrooms": bathrooms.checked,
        "water": water.checked
    };

	var monday = document.getElementById('monday');
	var tuesday = document.getElementById('tuesday');
	var wednesday = document.getElementById('wednesday');
	var thursday = document.getElementById('thursday');
	var friday = document.getElementById('friday');
	var saturday = document.getElementById('saturday');
	var sunday = document.getElementById('sunday');

	daysObject = {
        "monday": monday.checked,
        "tuesday": tuesday.checked,
        "wednesday": wednesday.checked,
        "thursday": thursday.checked,
        "friday": friday.checked,
        "saturday": saturday.checked,
        "sunday": sunday.checked
    };

	var filterObject = new Object();
    filterObject = {
        "services": servicesObject,
        "days": daysObject
    };

    // We need to reset the pins on the map
    for (let i = 0; i < markers.length; i++) {
    	markers[i].setMap(null);
  	}
  	markers = [];

  	// Now we create the post request to put down new pins based on the filters
    var req = new XMLHttpRequest();

    req.open('POST', serverUrl+'/api/updateFilters/update_filters', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        
			// SQL Data returned from server which is added to the map
			var markets = JSON.parse(req.responseText);
		  	for (let i = 0; i < markets.length; i++) {
		    	const latLng = new google.maps.LatLng(parseFloat(markets[i].address.lat),parseFloat(markets[i].address.lng));
		    	const contentHtml = '<div class="infoWindow"><h3>' + markets[i].name + 
                            '</h3><p>Location: ' + markets[i].address.street + ' ' + markets[i].address.city + 
                            ', '+ markets[i].address.state + '</p><p>Times: ' + markets[i].start + ' to ' + 
                            markets[i].end + '</p></div>'
		    	const infowindow = new google.maps.InfoWindow({
					content: contentHtml,
				});
		    	const marker = new google.maps.Marker({
		      		position: latLng,
		      		map: map,
		      		title: markets[i].name,
		    	});
				marker.addListener("click", () => {
					infowindow.open(map, marker);
				});
				markers.push(marker);
			}

      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(filterObject));

};

function initMap() {
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 34.052235, lng: -118.243683 },
		zoom: 10,
	});
	infoWindow = new google.maps.InfoWindow();

	searchButton.addEventListener("click", () => {
		var address = document.getElementById('addressID').value.toString();
		geocoder.geocode( { 'address': address}, function(results, status) {
			console.log(results);
			if (status == 'OK') {
				console.log(address)
				map.setCenter(results[0].geometry.location);
				map.setZoom(13);
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	});
	placeMarkets();
};


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
			? "Error: The Geolocation service failed."
			: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}

// DISPLAY TESTING ONLY
document.getElementById("applySubmit").addEventListener("click", updateMarkets);
