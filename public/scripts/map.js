// Test button for pulling table
document.getElementById("test_in").addEventListener("click", getTest);

// Server location address
var serverUrl = 'http://localhost:3000';

function getTest(){

  	// Creates the response
	var req = new XMLHttpRequest();

    req.open('GET', serverUrl+'/api/locations/get_markets', true);
	req.withCredentials = false;
	req.onload = function (e) {
	  	if (req.readyState === 4) {
	    	if (req.status === 200) {

	    	// SQL Data returned from server; markets w/o addresses
			var markets = JSON.parse(req.responseText);
			console.log(markets);

			// Second req object to get the addresses
			var req2 = new XMLHttpRequest();

		    req2.open('POST', serverUrl+'/api/locations/get_addresses', true);
		    req2.setRequestHeader('Content-Type', 'application/json');
		    req2.addEventListener('load',function(){
		      if(req2.status >= 200 && req2.status < 400){
		    	
		    	console.log(req2.responseText);

		      } else {
		        console.log("Error in network request: " + req2.statusText);
		      }});

		    req2.send(JSON.stringify(markets));



	    	// // Clear the data currently there
	    	// document.getElementById('test_out').innerHTML = ""

	    	// // Get the elements
	    	// var test_out = document.getElementById('test_out');

	    	// // Create text nodes from SQL data
	    	// var data_response = document.createTextNode(data);

	    	// // Appending the variables to the cells
	    	// test_out.appendChild(data_response);

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

$(function(){
    var $select = $("#ages");
    for (i=18;i<=100;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

function createSearchableMap(locations = allLocations) {
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {mapTypeId: 'roadmap'};
  var markers = [];
  var infoWindowContent = [];
  var map = new google.maps.Map(document.getElementById('locations-near-you-map'), mapOptions);
  console.log(map);
  console.log(locations);
  
  map.setTilt(45);
  
  locations.forEach(function(location) {
    markers.push([location.name, location.lat, location.lng]);
    
    infoWindowContent.push(['<div class="infoWindow"><h3>' + location.district + 
                            '</h3><p>Stake Center: ' + location.name + ' Age Range: ' 
                            + location.age + '</p><a href="http://www.lds-sa.org">Register Here</a></div>']);
  });	    

  var infoWindow = new google.maps.InfoWindow(), marker, i;
  console.log(infoWindow);

  // Place the markers on the map
  for (i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    });

    console.log(position);
    
    // Add an infoWindow to each marker, and create a closure so that the current
    // marker is always associated with the correct click event listener
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, marker);
      }
    })(marker, i));

    // Only use the bounds to zoom the map if there is more than 1 location shown
    if (locations.length > 1) {
      map.fitBounds(bounds);
    } else {
      var center = new google.maps.LatLng(locations[0].lat, locations[0].lng);
      map.setCenter(center);
      map.setZoom(15);
    }
  }
}

function filterLocations() {
  var userLatLng;
  var geocoder = new google.maps.Geocoder();
  var userAddress = document.getElementById('userAddress').value.replace(/[^a-z0-9\s]/gi, '');
  var maxRadius = parseInt(document.getElementById('maxRadius').value, 10);
  var age_options = document.getElementById('ages');
  var age_selection = age_options.options[age_options.selectedIndex].value;
  
  if (userAddress && maxRadius) {
    userLatLng = getLatLngViaHttpRequest(userAddress, age_selection);
  } 

  function getLatLngViaHttpRequest(address, age_range) {
    // Set up a request to the Geocoding API
    // Supported address format is City, City + State, just a street address, or any combo
    var addressStripped = address.split(' ').join('+');
    var key = 'AIzaSyABJG8Ux-ssKWNjmDie2_5E9d3Xi6-73RE';
    var request = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressStripped + '&key=' + key;

    // Age range if-then statements to set the upper and lower bounds
    // var lower_age = 0;
    // var upper_age = 0;

    // if (age_range === '6589-8050') {
    //   lower_age = 6589
    //   upper_age = 8050
    // } else if (age_range === '8051-9363') {
    //   lower_age = 8051
    //   upper_age = 9363
    // } else {
    //   lower_age = 9364
    //   upper_age = 10596
    // };
    
    // Call the Geocoding API using jQuery GET, passing in the request and a callback function 
    // which takes one argument "data" containing the response
    $.get( request, function( data ) {
      var searchResultsAlert = document.getElementById('location-search-alert');

      // Abort if there is no response for the address data
      if (data.status === "ZERO_RESULTS") {
        searchResultsAlert.innerHTML = "Sorry, '" + address + "' seems to be an invalid address. Maybe try a zip code.";
        return;
      }

      var userLatLng = new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
      var filteredRadius = allLocations.filter(isWithinRadius);
      var filteredLocations = [];

      // Filtered for age range selected
      for (i = 0; i < filteredRadius.length; i++) {
        if (age_selection >= filteredRadius[i].lower && age_selection <= filteredRadius[i].upper) {
          filteredLocations.push(filteredRadius[i]);
        };
      }
      
      if (filteredLocations.length > 0) {
        createSearchableMap(filteredLocations);
        createListOfLocations(filteredLocations);
        searchResultsAlert.innerHTML = 'SA Conference Locations within ' + maxRadius + ' miles of ' + userAddress + ' for '
        + age_selection + ' year-olds:';
      } else {
        console.log("nothing found!");
        document.getElementById('locations-near-you').innerHTML = '';
        searchResultsAlert.innerHTML = 'Sorry, no conference locations were found within '+ maxRadius + ' miles of ' + userAddress + '.';
      }

      function isWithinRadius(location) {
        var locationLatLng = new google.maps.LatLng(location.lat, location.lng);
        var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(locationLatLng, userLatLng);

        return convertMetersToMiles(distanceBetween) <= maxRadius;
      }
    });  
  }
}

function convertMetersToMiles(meters) {
  return (meters * 0.000621371);
}

function createListOfLocations(locations) {
  var locationsList = document.getElementById('locations-near-you');
  
  // Clear any existing locations from the previous search first
  locationsList.innerHTML = '';
  
  locations.forEach( function(location) {
    var specificLocation = document.createElement('div');
    var locationInfo = '<h4>' + location.district + '</h4>' +
                       '<p>'  + location.age + '</p><a href="http://www.lds-sa.org">Register Here</a>';
    specificLocation.setAttribute("class", 'location-near-you-box');
    specificLocation.innerHTML = locationInfo;
    locationsList.appendChild(specificLocation);
  });
}

$('#submitLocationSearch').on('click', function(e) {
  e.preventDefault();
  filterLocations();
});