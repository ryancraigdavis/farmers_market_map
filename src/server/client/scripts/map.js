// Google maps tutorial
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-typescript
// Initialize and add the map
let map, infoWindow, geocoder;
let markers = [];

// Submit button for changing the map location and the fields associated
var searchButton = document.getElementById('searchSubmit');

// Server location address
var serverUrl = 'http://66.42.74.237:1359';

function loadServicesList(markets){
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
                    loadVendorList(markets[i]);
                 })

				services = content.appendChild(document.createElement('input'));
				services.type = 'button';
                services.value = 'See Services'
				google.maps.event.addDomListener(services, 'click', function () {
                    loadServiceList(markets[i]);
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
	var daysObject = new Object();
	var hoursObject = new Object();

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
                    loadVendorList(markets[i]);
                 })

				services = content.appendChild(document.createElement('input'));
				services.type = 'button';
                services.value = 'See Services'
				google.maps.event.addDomListener(services, 'click', function () {
                    loadServiceList(markets[i]);
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
