let marketID, insertVendorID;

function getVendorsToAdd(){
    var req = new XMLHttpRequest();

    req.open('GET', 'http://144.202.80.206/api/vendors/get_vendors', true);
    
    req.withCredentials = false;
    req.onload = function (e) {
        if (req.readyState === 4) {
            if (req.status === 200) {

                data = JSON.parse(req.responseText);
                // Insert vendors drop-down
                document.getElementById('vendorListInsert').innerHTML = ""
                for (var i = 0; i < data.length; i++) {
                    document.getElementById('vendorListInsert').innerHTML += '<option class="dropdown-item" ' +
                    'id="vendor-select" value="'+ data[i].vendor.vendorID+'">'+data[i].vendor.businessName+'</option>'
                };


      } else {
        console.log("Error in network request: " + req.statusText);
      }}};
    req.onerror = function (e) {
      console.error(req.statusText);
    };
    req.send(null);
};

function addVendorList(){

    var vendorLocation = document.getElementById("vendorLocation");

    var addObject = new Object();
    addObject = {
        "vendorID": insertVendorID,
        "marketID": marketID,
        "location": vendorLocation.value
    }

    var req = new XMLHttpRequest();

    req.open('POST', 'http://144.202.80.206/api/vendors/add_vendor_list', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            data = req.responseText;
            alert(data);
            $('#vendorModal').modal('hide');
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(addObject));

}

function setVendor(vendorInfo){
    insertVendorID = vendorInfo.value;
}

function deleteVendorsList(vendor){

	var req = new XMLHttpRequest();

    req.open('DELETE', 'http://144.202.80.206/api/vendors/delete_vendor_list', true);
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

function updateVendorsList(vendor){

	var req = new XMLHttpRequest();

    req.open('PUT', 'http://144.202.80.206/api/vendors/update_vendor_list', true);
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

function loadVendorList(markets){

  var req = new XMLHttpRequest();

    req.open('POST', 'http://144.202.80.206/api/vendors/get_vendor_lists', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
        data = JSON.parse(req.responseText);

        // Loads data for the insert list
        getVendorsToAdd();

        var vendorListBody = document.getElementById("vendorListBody");

        // Reset table
        vendorListBody.innerHTML = ""
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

          // These are the variables created from the DB
          var cell1name = document.createTextNode(data[i].vendor.businessName);
          var cell2name = document.createTextNode(data[i].vendor.ownerName);
          var cell3name = document.createTextNode(data[i].vendor.phone);
          var cell4name = document.createTextNode(data[i].vendor.email);
          var cell5name = document.createTextNode(data[i].vendor.description);
          var cell6name = document.createTextNode(data[i].vendor.location);
          var cell7name = document.createElement('button');
          cell7name.innerHTML = "Update";
          var cell8name = document.createElement('button');
          cell8name.innerHTML = "Delete";

          var vendorVar = data[i];

          cell7name.onclick = (function(vendorVar){
            return function(){
              var vendorListBody = document.getElementById("vendorListBody");
              var rowUp = document.createElement("tr");
              var cell1Up = document.createElement("td");
              var cell2Up = document.createElement("td");
              var cell3Up = document.createElement("td");
              var cell4Up = document.createElement("td");
              var cell5Up = document.createElement("td");
              var cell6Up = document.createElement("td");
              var cell7Up = document.createElement("td");
              var cell8Up = document.createElement("td");

                cell1Up.innerHTML = '<input type="text" id="update1" value="'+vendorVar.vendor.businessName+'">'
                cell2Up.innerHTML = '<input type="text" id="update2" value="'+vendorVar.vendor.ownerName+'">'
                cell3Up.innerHTML = '<input type="text" id="update3" value="'+vendorVar.vendor.phone+'">'
                cell4Up.innerHTML = '<input type="text" id="update4" value="'+vendorVar.vendor.email+'">'
                cell5Up.innerHTML = '<input type="text" id="update5" value="'+vendorVar.vendor.description+'">'
                cell6Up.innerHTML = '<input type="text" id="update6" value="'+vendorVar.vendor.location+'">'
                var cell7UpName = document.createElement('button');
              cell7UpName.innerHTML = "Submit";
              var cell8UpName = document.createElement('button');
              cell8UpName.innerHTML = "Cancel";

              cell7UpName.onclick = (function(vendorVar){
                return function(){
                  var updateCell1 = document.getElementById("update1").value;
                  var updateCell2 = document.getElementById("update2").value;
                  var updateCell3 = document.getElementById("update3").value;
                  var updateCell4 = document.getElementById("update4").value;
                  var updateCell5 = document.getElementById("update5").value;
                  var updateCell6 = document.getElementById("update6").value;
                  var updateObject = new Object();
                  updateObject = {
                    "vendorID": vendorVar.vendor.vendorID,
                    "businessName": updateCell1,
                    "ownerName": updateCell2,
                    "phone": updateCell3,
                    "email": updateCell4,
                    "description": updateCell5,
                    "location": updateCell6
                  }
                  updateVendorsList(updateObject);
                    $('#vendorListModal').modal('hide');
                }
            })(vendorVar);

            cell8UpName.onclick = (function(){
                return function(){
                  $('#vendorListModal').modal('hide');
                  alert('Update Cancelled');
                }
            })();
            cell7Up.appendChild(cell7UpName);
              cell8Up.appendChild(cell8UpName);

              rowUp.appendChild(cell1Up);
              rowUp.appendChild(cell2Up);
              rowUp.appendChild(cell3Up);
              rowUp.appendChild(cell4Up);
              rowUp.appendChild(cell5Up);
              rowUp.appendChild(cell6Up);
              rowUp.appendChild(cell7Up);
              rowUp.appendChild(cell8Up);
          
              // Appends row to the table
              vendorListBody.appendChild(rowUp);
            }
        })(vendorVar);

        cell8name.onclick = (function(vendorVar){
            return function(){
                deleteVendorsList(vendorVar);
                $('#vendorListModal').modal('hide');
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
          cell8.appendChild(cell8name);

          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          row.appendChild(cell5);
          row.appendChild(cell6);
          row.appendChild(cell7);
          row.appendChild(cell8);
          
          // Appends row to the table
          vendorListBody.appendChild(row);
      }
      // Show the populated modal and load the global market variable
      
      $('#vendorListModal').modal('show');

      } else {
        console.log("Error in network request: " + req.statusText);
      }});
    marketID = markets.marketID
    req.send(JSON.stringify(markets));
  
}