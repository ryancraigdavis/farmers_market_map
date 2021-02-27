function insertVendorToDB(vendor){
	console.log(vendor);

	var req = new XMLHttpRequest();

    req.open('POST', 'http://localhost:1359/api/vendors/add_vendor', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      	if(req.status >= 200 && req.status < 400){
	    	data = req.responseText;
	    	alert(data);
	    	$('#vendorModal').modal('hide');
      } else {
        console.log("Error in network request: " + req.statusText);
      }});

    req.send(JSON.stringify(vendor));
	
}

function deleteVendor(vendor){

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

function updateVendor(vendor){

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

function addVendor(){

	var vendorBody = document.getElementById("vendorBody");
	var rowAdd = document.createElement("tr");
	var cell1Add = document.createElement("td");
	var cell2Add = document.createElement("td");
	var cell3Add = document.createElement("td");
	var cell4Add = document.createElement("td");
	var cell5Add = document.createElement("td");
	var cell6Add = document.createElement("td");
	var cell7Add = document.createElement("td");

	cell1Add.innerHTML = '<input type="text" id="add1">'
	cell2Add.innerHTML = '<input type="text" id="add2">'
	cell3Add.innerHTML = '<input type="text" id="add3">'
	cell4Add.innerHTML = '<input type="text" id="add4">'
	cell5Add.innerHTML = '<input type="text" id="add5">'
	var cell6AddName = document.createElement('button');
	cell6AddName.innerHTML = "Submit";
	var cell7AddName = document.createElement('button');
	cell7AddName.innerHTML = "Cancel";

	cell6AddName.onclick = (function(){
        return function(){
        	var addCell1 = document.getElementById("add1").value;
		    var addCell2 = document.getElementById("add2").value;
		    var addCell3 = document.getElementById("add3").value;
		    var addCell4 = document.getElementById("add4").value;
		    var addCell5 = document.getElementById("add5").value;

			var vendorObject = new Object();
		        vendorObject = {
		            "businessName": addCell1,
		            "ownerName": addCell2,
		            "phone": addCell3,
		            "email": addCell4,
		            "description": addCell5
		        }
            insertVendorToDB(vendorObject);
            $('#vendorListModal').modal('hide');
        }
    })();

	cell7AddName.onclick = (function(){
        return function(){
            $('#vendorModal').modal('hide');
            alert('Insert Cancelled');
        }
    })();

    cell6Add.appendChild(cell6AddName);
	  cell7Add.appendChild(cell7AddName);

	  rowAdd.appendChild(cell1Add);
	  rowAdd.appendChild(cell2Add);
	  rowAdd.appendChild(cell3Add);
	  rowAdd.appendChild(cell4Add);
	  rowAdd.appendChild(cell5Add);
	  rowAdd.appendChild(cell6Add);
	  rowAdd.appendChild(cell7Add);

	  // Appends row to the table
	  vendorBody.appendChild(rowAdd);

}

function getVendors(){
    var req = new XMLHttpRequest();

    req.open('GET', 'http://localhost:1359/api/vendors/get_vendors', true);
    
    req.withCredentials = false;
	req.onload = function (e) {
	  	if (req.readyState === 4) {
	    	if (req.status === 200) {

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
              var vendorListBody = document.getElementById("vendorBody");
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
                  updateVendor(updateObject);
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
              vendorListBody.appendChild(rowUp);
            }
        })(vendorVar);

        cell7name.onclick = (function(vendorVar){
            return function(){
                deleteVendor(vendorVar);
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
      }}};
	req.onerror = function (e) {
	  console.error(req.statusText);
	};
	req.send(null);
};