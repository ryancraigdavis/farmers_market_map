
// Google maps tutorial
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-typescript
// Initialize and add the map
let map, infoWindow, geocoder;

// Server location address
var serverUrl = 'http://localhost:3000';

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
			console.log(markets);
		  	for (let i = 0; i < markets.length; i++) {
		    	const latLng = new google.maps.LatLng(parseFloat(markets[i].address.Lat),parseFloat(markets[i].address.Lng));
		    	const contentHtml = '<div class="infoWindow"><h3>' + markets[i].name + 
                            '</h3><p>Location: ' + markets[i].address.Street + ' ' + markets[i].address.City + 
                            ', '+ markets[i].address.State + '</p><p>Times: ' + markets[i].start + ' to ' + 
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

function initMap() {
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 34.052235, lng: -118.243683 },
		zoom: 10,
	});
	infoWindow = new google.maps.InfoWindow();

	// Go to specified zip code
	// https://developers.google.com/maps/documentation/javascript/geocoding
	const zipcodeInput = document.createElement("input");
	zipcodeInput.setAttribute("id", "addressInput");
	zipcodeInput.setAttribute("placeholder", "Address, City, or Zip");
	const zipcodeButton = document.createElement("button");
	zipcodeButton.textContent = "Submit";
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(zipcodeInput);
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(zipcodeButton);
	zipcodeButton.addEventListener("click", () => {
		var address = document.getElementById('addressInput').value;
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == 'OK') {
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