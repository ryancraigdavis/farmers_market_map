function insertServiceToDB(service){
	console.log(service);

	var req = new XMLHttpRequest();

    req.open('POST', 'http://66.42.74.237:1359/api/services/add_service', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
	    	$('#serviceModal').modal('hide');
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(service));
	
}

function deleteService(service){

	var req = new XMLHttpRequest();

    req.open('DELETE', 'http://66.42.74.237:1359/api/services/delete_service', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(service));
	
}

function updateService(service){

	var req = new XMLHttpRequest();

    req.open('PUT', 'http://66.42.74.237:1359/api/services/update_service', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(service));
	
}

function addService(){

	var serviceBody = document.getElementById("serviceBody");
	var rowAdd = document.createElement("tr");
	var cell1Add = document.createElement("td");
	var cell2Add = document.createElement("td");
	var cell3Add = document.createElement("td");
	var cell4Add = document.createElement("td");

	cell1Add.innerHTML = '<input type="text" id="add1">'
	cell2Add.innerHTML = '<input type="text" id="add2">'
  var cell3AddName = document.createElement('button');
	cell3AddName.innerHTML = "Submit";
  cell3AddName.classList.add('submitRow')
  var cell4AddName = document.createElement('button');
	cell4AddName.innerHTML = "Delete";
  cell4AddName.classList.add('deleteRow')

	cell3AddName.onclick = (function(){
        return function(){
        	var addCell1 = document.getElementById("add1").value;
		    var addCell2 = document.getElementById("add2").value;

			var serviceObject = new Object();
		        serviceObject = {
		            "serviceName": addCell1,
		            "serviceQuality": addCell2
		        }
            insertServiceToDB(serviceObject);
            $('#serviceListModal').modal('hide');
        }
    })();

	cell4AddName.onclick = (function(){
        return function(){
            $('#serviceModal').modal('hide');
            alert('Insert Cancelled');
        }
    })();

    cell3Add.appendChild(cell3AddName);
	  cell3Add.appendChild(cell4AddName);

	  rowAdd.appendChild(cell1Add);
	  rowAdd.appendChild(cell2Add);
	  rowAdd.appendChild(cell3Add);
	  rowAdd.appendChild(cell4Add);

	  // Appends row to the table
	  serviceBody.appendChild(rowAdd);

}

function getServices(){
    var req = new XMLHttpRequest();

    req.open('GET', 'http://66.42.74.237:1359/api/services/get_services', true);
    
    req.withCredentials = false;
	req.onload = function (e) {
	  	if (req.readyState === 4) {
	    	if (req.status === 200) {

	    		data = JSON.parse(req.responseText);
        		var serviceBody = document.getElementById("serviceBody");

		        // Reset table
		        serviceBody.innerHTML = ""
		        // This loop goes through each of the challengers and displays them
      for (var i = 0; i < data.length; i++) {

        // Creates the rows and cells
          var row = document.createElement("tr");
          var cell1 = document.createElement("td");
          var cell2 = document.createElement("td");
          var cell3 = document.createElement("td");
          var cell4 = document.createElement("td");

          // These are the variables created from the DB
          var cell1name = document.createTextNode(data[i].service.serviceName);
          var cell2name = document.createTextNode(data[i].service.serviceQuality);
          var cell3name = document.createElement('button');
          cell3name.innerHTML = "Update";
          var cell4name = document.createElement('button');
          cell4name.innerHTML = "Delete";

          var serviceVar = data[i];

          cell3name.onclick = (function(serviceVar){
            return function(){
              var serviceListBody = document.getElementById("serviceBody");
              var rowUp = document.createElement("tr");
              var cell1Up = document.createElement("td");
              var cell2Up = document.createElement("td");
              var cell3Up = document.createElement("td");
              var cell4Up = document.createElement("td");

                cell1Up.innerHTML = '<input type="text" id="update1" value="'+serviceVar.service.serviceName+'">'
                cell2Up.innerHTML = '<input type="text" id="update2" value="'+serviceVar.service.serviceQuality+'">'
                var cell3UpName = document.createElement('button');
              cell3UpName.innerHTML = "Submit";
              var cell4UpName = document.createElement('button');
              cell4UpName.innerHTML = "Cancel";

              cell3UpName.onclick = (function(serviceVar){
                return function(){
                  var updateCell1 = document.getElementById("update1").value;
                  var updateCell2 = document.getElementById("update2").value;
                  var updateObject = new Object();
                  updateObject = {
                    "serviceID": serviceVar.service.serviceID,
                    "serviceName": updateCell1,
                    "serviceQuality": updateCell2
                  }
                  updateService(updateObject);
                    $('#serviceModal').modal('hide');
                }
            })(serviceVar);

            cell4UpName.onclick = (function(){
                return function(){
                  $('#serviceModal').modal('hide');
                  alert('Update Cancelled');
                }
            })();
            cell3Up.appendChild(cell3UpName);
              cell4Up.appendChild(cell4UpName);

              rowUp.appendChild(cell1Up);
              rowUp.appendChild(cell2Up);
              rowUp.appendChild(cell3Up);
              rowUp.appendChild(cell4Up);
          
              // Appends row to the table
              serviceListBody.appendChild(rowUp);
            }
        })(serviceVar);

        cell4name.onclick = (function(serviceVar){
            return function(){
                deleteService(serviceVar);
                $('#serviceModal').modal('hide');
            }
        })(serviceVar); 
          
          // Appending the variables to the cells
          cell1.appendChild(cell1name);
          cell2.appendChild(cell2name);
          cell3.appendChild(cell3name);
          cell4.appendChild(cell4name);

          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          
          // Appends row to the table
          serviceBody.appendChild(row);
      }
      // Show the populated modal
      $('#serviceModal').modal('show');

      } else {
        console.log("Error in network request: " + req.statusText);
      }}};
	req.onerror = function (e) {
	  console.error(req.statusText);
	};
	req.send(null);
};