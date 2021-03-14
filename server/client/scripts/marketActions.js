function insertMarketToDB(market){
	console.log(market);

	var req = new XMLHttpRequest();

    req.open('POST', 'http://localhost:1359/api/markets/add_market', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
	    	$('#marketModal').modal('hide');
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(market));
	
}

function deleteMarket(market){

	var req = new XMLHttpRequest();

    req.open('DELETE', 'http://localhost:1359/api/markets/delete_market', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(market));
	
}

function updateMarket(market){

	var req = new XMLHttpRequest();

    req.open('PUT', 'http://localhost:1359/api/markets/update_market', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(market));
	
}

function addMarket(){

	var marketBody = document.getElementById("marketBody");
	var rowAdd = document.createElement("tr");
	var cell1Add = document.createElement("td");
	var cell2Add = document.createElement("td");
	var cell3Add = document.createElement("td");
	var cell4Add = document.createElement("td");
  var cell5Add = document.createElement("td");
  var cell6Add = document.createElement("td");
  var cell7Add = document.createElement("td");
  var cell8Add = document.createElement("td");
  var cell9Add = document.createElement("td");
  var cell10Add = document.createElement("td");
  var cell11Add = document.createElement("td");
  var cell12Add = document.createElement("td");
  var cell13Add = document.createElement("td");
  var cell14Add = document.createElement("td");
  var cell15Add = document.createElement("td");
  var cell16Add = document.createElement("td");

	cell1Add.innerHTML = '<input type="text" id="add1">'
	cell2Add.innerHTML = '<input type="text" id="add2">'
  cell3Add.innerHTML = '<input type="text" id="add3">'
  cell4Add.innerHTML = '<input type="text" id="add4">'
  cell5Add.innerHTML = '<input type="text" id="add5">'
  cell6Add.innerHTML = '<input type="text" id="add6">'
  cell7Add.innerHTML = '<input type="text" id="add7">'
  cell8Add.innerHTML = '<input type="text" id="add8">'
  cell9Add.innerHTML = '<input type="text" id="add9">'
  cell10Add.innerHTML = '<input type="text" id="add10">'
  cell11Add.innerHTML = '<input type="text" id="add11">'
  cell12Add.innerHTML = '<input type="text" id="add12">'
  cell13Add.innerHTML = '<input type="text" id="add13">'
  cell14Add.innerHTML = '<input type="text" id="add14">'
  var cell15AddName = document.createElement('button');
	cell15AddName.innerHTML = "Submit";
  cell15AddName.classList.add('submitRow')
  var cell16AddName = document.createElement('button');
	cell16AddName.innerHTML = "Delete";
  cell16AddName.classList.add('deleteRow')

	cell15AddName.onclick = (function(){
        return function(){
        	var addCell1 = document.getElementById("add1").value;
		      var addCell2 = document.getElementById("add2").value;
          var addCell3 = document.getElementById("add3").value;
          var addCell4 = document.getElementById("add4").value;
          var addCell5 = document.getElementById("add5").value;
          var addCell6 = document.getElementById("add6").value;
          var addCell7 = document.getElementById("add7").value;
          var addCell8 = document.getElementById("add8").value;
          var addCell9 = document.getElementById("add9").value;
          var addCell10 = document.getElementById("add10").value;
          var addCell11 = document.getElementById("add11").value;
          var addCell12 = document.getElementById("add12").value;
          var addCell13 = document.getElementById("add13").value;
          var addCell14 = document.getElementById("add14").value;


      var latCell = ""
      var lngCell = ""
      var geoAddress = addCell2 + ', ' + addCell3 + ', ' + addCell4 + ', ' + addCell5
      // Lat and Lng
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': geoAddress}, function(results, status) {
      if (status == 'OK') {
        latCell = results[0].geometry.bounds.Ra.g
        lngCell = results[0].geometry.bounds.La.g

        var marketObject = new Object();
            marketObject = {
                "name": addCell1,
                "street": addCell2,
                "city": addCell3,
                "state": addCell4,
                "zip": addCell5,
                "lat": latCell,
                "lng": lngCell,
                "startTime": addCell6,
                "endTime": addCell7,
                "monday": addCell8,
                "tuesday": addCell9,
                "wednesday": addCell10,
                "thursday": addCell11,
                "friday": addCell12,
                "saturday": addCell13,
                "sunday": addCell14
            }
            console.log(marketObject)
            insertMarketToDB(marketObject);
            $('#marketModal').modal('hide');

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

        }
    })();

	cell16AddName.onclick = (function(){
        return function(){
            $('#marketModal').modal('hide');
            alert('Insert Cancelled');
        }
    })();

    cell15Add.appendChild(cell15AddName);
	  cell16Add.appendChild(cell16AddName);

	  rowAdd.appendChild(cell1Add);
	  rowAdd.appendChild(cell2Add);
	  rowAdd.appendChild(cell3Add);
	  rowAdd.appendChild(cell4Add);
    rowAdd.appendChild(cell5Add);
    rowAdd.appendChild(cell6Add);
    rowAdd.appendChild(cell7Add);
    rowAdd.appendChild(cell8Add);
    rowAdd.appendChild(cell9Add);
    rowAdd.appendChild(cell10Add);
    rowAdd.appendChild(cell11Add);
    rowAdd.appendChild(cell12Add);
    rowAdd.appendChild(cell13Add);
    rowAdd.appendChild(cell14Add);
    rowAdd.appendChild(cell15Add);
    rowAdd.appendChild(cell16Add);

	  // Appends row to the table
	  marketBody.appendChild(rowAdd);
}

function getMarkets(){
    var req = new XMLHttpRequest();

    req.open('GET', 'http://localhost:1359/api/markets/get_markets', true);
    
    req.withCredentials = false;
	req.onload = function (e) {
	  	if (req.readyState === 4) {
	    	if (req.status === 200) {

	    		data = JSON.parse(req.responseText);
        		var marketBody = document.getElementById("marketBody");

		        // Reset table
		        marketBody.innerHTML = ""
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
          var cell8 = document.createElement("td");
          var cell9 = document.createElement("td");
          var cell10 = document.createElement("td");
          var cell11 = document.createElement("td");
          var cell12 = document.createElement("td");
          var cell13 = document.createElement("td");
          var cell14 = document.createElement("td");
          var cell15 = document.createElement("td");
          var cell16 = document.createElement("td");

          // These are the variables created from the DB
          var cell1name = document.createTextNode(data[i].market.name);
          var cell2name = document.createTextNode(data[i].market.street);
          var cell3name = document.createTextNode(data[i].market.city);
          var cell4name = document.createTextNode(data[i].market.state);
          var cell5name = document.createTextNode(data[i].market.zip);
          var cell6name = document.createTextNode(data[i].market.startTime);
          var cell7name = document.createTextNode(data[i].market.endTime);
          var cell8name = document.createTextNode(data[i].market.monday);
          var cell9name = document.createTextNode(data[i].market.tuesday);
          var cell10name = document.createTextNode(data[i].market.wednesday);
          var cell11name = document.createTextNode(data[i].market.thursday);
          var cell12name = document.createTextNode(data[i].market.friday);
          var cell13name = document.createTextNode(data[i].market.saturday);
          var cell14name = document.createTextNode(data[i].market.sunday);
          var cell15name = document.createElement('button');
          cell15name.innerHTML = "Update";
          var cell16name = document.createElement('button');
          cell16name.innerHTML = "Delete";

          var marketVar = data[i];

          cell15name.onclick = (function(marketVar){
            return function(){
              var marketListBody = document.getElementById("marketBody");
              var rowUp = document.createElement("tr");
              var cell1Up = document.createElement("td");
              var cell2Up = document.createElement("td");
              var cell3Up = document.createElement("td");
              var cell4Up = document.createElement("td");
              var cell5Up = document.createElement("td");
              var cell6Up = document.createElement("td");
              var cell7Up = document.createElement("td");
              var cell8Up = document.createElement("td");
              var cell9Up = document.createElement("td");
              var cell10Up = document.createElement("td");
              var cell11Up = document.createElement("td");
              var cell12Up = document.createElement("td");
              var cell13Up = document.createElement("td");
              var cell14Up = document.createElement("td");
              var cell15Up = document.createElement("td");
              var cell16Up = document.createElement("td");

                cell1Up.innerHTML = '<input type="text" id="update1" value="'+marketVar.market.name+'">'
                cell2Up.innerHTML = '<input type="text" id="update2" value="'+marketVar.market.street+'">'
                cell3Up.innerHTML = '<input type="text" id="update3" value="'+marketVar.market.city+'">'
                cell4Up.innerHTML = '<input type="text" id="update4" value="'+marketVar.market.state+'">'
                cell5Up.innerHTML = '<input type="text" id="update5" value="'+marketVar.market.zip+'">'
                cell6Up.innerHTML = '<input type="text" id="update6" value="'+marketVar.market.startTime+'">'
                cell7Up.innerHTML = '<input type="text" id="update7" value="'+marketVar.market.endTime+'">'
                cell8Up.innerHTML = '<input type="text" id="update8" value="'+marketVar.market.monday+'">'
                cell9Up.innerHTML = '<input type="text" id="update9" value="'+marketVar.market.tuesday+'">'
                cell10Up.innerHTML = '<input type="text" id="update10" value="'+marketVar.market.wednesday+'">'
                cell11Up.innerHTML = '<input type="text" id="update11" value="'+marketVar.market.thursday+'">'
                cell12Up.innerHTML = '<input type="text" id="update12" value="'+marketVar.market.friday+'">'
                cell13Up.innerHTML = '<input type="text" id="update13" value="'+marketVar.market.saturday+'">'
                cell14Up.innerHTML = '<input type="text" id="update14" value="'+marketVar.market.sunday+'">'
                var cell15UpName = document.createElement('button');
              cell15UpName.innerHTML = "Submit";
              var cell16UpName = document.createElement('button');
              cell16UpName.innerHTML = "Cancel";

              cell15UpName.onclick = (function(marketVar){
                return function(){
                  var updateCell1 = document.getElementById("update1").value;
                  var updateCell2 = document.getElementById("update2").value;
                  var updateCell3 = document.getElementById("update3").value;
                  var updateCell4 = document.getElementById("update4").value;
                  var updateCell5 = document.getElementById("update5").value;
                  var updateCell6 = document.getElementById("update6").value;
                  var updateCell7 = document.getElementById("update7").value;
                  var updateCell8 = document.getElementById("update8").value;
                  var updateCell9 = document.getElementById("update9").value;
                  var updateCell10 = document.getElementById("update10").value;
                  var updateCell11 = document.getElementById("update11").value;
                  var updateCell12 = document.getElementById("update12").value;
                  var updateCell13 = document.getElementById("update13").value;
                  var updateCell14 = document.getElementById("update14").value;
                  var updateObject = new Object();
                  updateObject = {
                    "marketID": marketVar.market.marketID,
                    "addressID": marketVar.market.addressID,
                    "name": updateCell1,
                    "street": updateCell2,
                    "city": updateCell3,
                    "state": updateCell4,
                    "zip": updateCell5,
                    "startTime": updateCell6,
                    "endTime": updateCell7,
                    "monday": updateCell8,
                    "tuesday": updateCell9,
                    "wednesday": updateCell10,
                    "thursday": updateCell11,
                    "friday": updateCell12,
                    "saturday": updateCell13,
                    "sunday": updateCell14
                  }
                  updateMarket(updateObject);
                    $('#marketModal').modal('hide');
                }
            })(marketVar);

            cell16UpName.onclick = (function(){
                return function(){
                  $('#marketModal').modal('hide');
                  alert('Update Cancelled');
                }
            })();
            cell15Up.appendChild(cell15UpName);
              cell16Up.appendChild(cell16UpName);

              rowUp.appendChild(cell1Up);
              rowUp.appendChild(cell2Up);
              rowUp.appendChild(cell3Up);
              rowUp.appendChild(cell4Up);
              rowUp.appendChild(cell5Up);
              rowUp.appendChild(cell6Up);
              rowUp.appendChild(cell7Up);
              rowUp.appendChild(cell8Up);
              rowUp.appendChild(cell9Up);
              rowUp.appendChild(cell10Up);
              rowUp.appendChild(cell11Up);
              rowUp.appendChild(cell12Up);
              rowUp.appendChild(cell13Up);
              rowUp.appendChild(cell14Up);
              rowUp.appendChild(cell15Up);
              rowUp.appendChild(cell16Up);
          
              // Appends row to the table
              marketListBody.appendChild(rowUp);
            }
        })(marketVar);

        cell16name.onclick = (function(marketVar){
            return function(){
                deleteMarket(marketVar);
                $('#marketModal').modal('hide');
            }
        })(marketVar); 
          
          // Appending the variables to the cells
          cell1.appendChild(cell1name);
          cell2.appendChild(cell2name);
          cell3.appendChild(cell3name);
          cell4.appendChild(cell4name);
          cell5.appendChild(cell5name);
          cell6.appendChild(cell6name);
          cell7.appendChild(cell7name);
          cell8.appendChild(cell8name);
          cell9.appendChild(cell9name);
          cell10.appendChild(cell10name);
          cell11.appendChild(cell11name);
          cell12.appendChild(cell12name);
          cell13.appendChild(cell13name);
          cell14.appendChild(cell14name);
          cell15.appendChild(cell15name);
          cell16.appendChild(cell16name);

          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          row.appendChild(cell5);
          row.appendChild(cell6);
          row.appendChild(cell7);
          row.appendChild(cell8);
          row.appendChild(cell9);
          row.appendChild(cell10);
          row.appendChild(cell11);
          row.appendChild(cell12);
          row.appendChild(cell13);
          row.appendChild(cell14);
          row.appendChild(cell15);
          row.appendChild(cell16);
          
          // Appends row to the table
          marketBody.appendChild(row);
      }
      // Show the populated modal
      $('#marketModal').modal('show');

      } else {
        console.log("Error in network request: " + req.statusText);
      }}};
	req.onerror = function (e) {
	  console.error(req.statusText);
	};
	req.send(null);
};