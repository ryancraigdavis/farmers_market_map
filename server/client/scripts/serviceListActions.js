let insertServiceID;

function getServicesToAdd(){
    var req = new XMLHttpRequest();

    req.open('GET', 'http://144.202.80.206:1359/api/services/get_services', true);
    
    req.withCredentials = false;
    req.onload = function (e) {
        if (req.readyState === 4) {
            if (req.status === 200) {

                data = JSON.parse(req.responseText);
                // Insert services drop-down
                document.getElementById('serviceListInsert').innerHTML = ""
                for (var i = 0; i < data.length; i++) {
                    document.getElementById('serviceListInsert').innerHTML += '<option class="dropdown-item" ' +
                    'id="service-select" value="'+ data[i].service.serviceID+'">'+data[i].service.serviceName+' '+data[i].service.serviceQuality+'</option>'
                };


      } else {
        console.log("Error in network request: " + req.statusText);
      }}};
    req.onerror = function (e) {
      console.error(req.statusText);
    };
    req.send(null);
};

function addServiceList(){

    var serviceLocation = document.getElementById("serviceLocation");

    var addObject = new Object();
    addObject = {
        "serviceID": insertServiceID,
        "marketID": marketID,
        "location": serviceLocation.value
    }

    var req = new XMLHttpRequest();

    req.open('POST', 'http://144.202.80.206:1359/api/services/add_service_list', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            data = req.responseText;
            alert(data);
            $('#serviceModal').modal('hide');
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(addObject));

}

function setService(serviceInfo){
    insertServiceID = serviceInfo.value;
}

function deleteServicesList(service){

	var req = new XMLHttpRequest();

    req.open('DELETE', 'http://144.202.80.206:1359/api/services/delete_service_list', true);
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

function updateServicesList(service){
  console.log(service);
	var req = new XMLHttpRequest();

    req.open('PUT', 'http://144.202.80.206:1359/api/services/update_service_list', true);
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

function loadServiceList(markets){

  var req = new XMLHttpRequest();

    req.open('POST', 'http://144.202.80.206:1359/api/services/get_service_lists', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
        data = JSON.parse(req.responseText);

        // Loads data for the insert list
        getServicesToAdd();

        var serviceListBody = document.getElementById("serviceListBody");

        // Reset table
        serviceListBody.innerHTML = ""
        // This loop goes through each of the challengers and displays them
      for (var i = 0; i < data.length; i++) {

        // Creates the rows and cells
          var row = document.createElement("tr");
          var cell1 = document.createElement("td");
          var cell2 = document.createElement("td");
          var cell3 = document.createElement("td");
          var cell4 = document.createElement("td");
          var cell5 = document.createElement("td");

          // These are the variables created from the DB
          var cell1name = document.createTextNode(data[i].service.serviceName);
          var cell2name = document.createTextNode(data[i].service.serviceQuality);
          var cell3name = document.createTextNode(data[i].service.location);
          var cell4name = document.createElement('button');
          cell4name.innerHTML = "Update";
          var cell5name = document.createElement('button');
          cell5name.innerHTML = "Delete";

          var serviceVar = data[i];

          cell4name.onclick = (function(serviceVar){
            return function(){
              var serviceListBody = document.getElementById("serviceListBody");
              var rowUp = document.createElement("tr");
              var cell1Up = document.createElement("td");
              var cell2Up = document.createElement("td");
              var cell3Up = document.createElement("td");
              var cell4Up = document.createElement("td");
              var cell5Up = document.createElement("td");

                cell1Up.innerHTML = '<input type="text" id="update1" value="'+serviceVar.service.serviceName+'">'
                cell2Up.innerHTML = '<input type="text" id="update2" value="'+serviceVar.service.serviceQuality+'">'
                cell3Up.innerHTML = '<input type="text" id="update3" value="'+serviceVar.service.location+'">'
                var cell4UpName = document.createElement('button');
              cell4UpName.innerHTML = "Submit";
              var cell5UpName = document.createElement('button');
              cell5UpName.innerHTML = "Cancel";

              cell4UpName.onclick = (function(serviceVar){
                return function(){
                  var updateCell1 = document.getElementById("update1").value;
                  var updateCell2 = document.getElementById("update2").value;
                  var updateCell3 = document.getElementById("update3").value;
                  var updateObject = new Object();
                  updateObject = {
                    "serviceID": serviceVar.service.serviceID,
                    "serviceName": updateCell1,
                    "serviceQuality": updateCell2,
                    "location": updateCell3
                  }
                  updateServicesList(updateObject);
                    $('#serviceListModal').modal('hide');
                }
            })(serviceVar);

            cell5UpName.onclick = (function(){
                return function(){
                  $('#serviceListModal').modal('hide');
                  alert('Update Cancelled');
                }
            })();
            cell4Up.appendChild(cell4UpName);
              cell5Up.appendChild(cell5UpName);

              rowUp.appendChild(cell1Up);
              rowUp.appendChild(cell2Up);
              rowUp.appendChild(cell3Up);
              rowUp.appendChild(cell4Up);
              rowUp.appendChild(cell5Up);
          
              // Appends row to the table
              serviceListBody.appendChild(rowUp);
            }
        })(serviceVar);

        cell5name.onclick = (function(serviceVar){
            return function(){
                deleteServicesList(serviceVar);
                $('#serviceListModal').modal('hide');
            }
        })(serviceVar); 
          
          // Appending the variables to the cells
          cell1.appendChild(cell1name);
          cell2.appendChild(cell2name);
          cell3.appendChild(cell3name);
          cell4.appendChild(cell4name);
          cell5.appendChild(cell5name);

          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          row.appendChild(cell5);
          
          // Appends row to the table
          serviceListBody.appendChild(row);
      }
      // Show the populated modal and load the global market variable
      $('#serviceListModal').modal('show');

      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    marketID = markets.marketID
    req.send(JSON.stringify(markets));
  
}