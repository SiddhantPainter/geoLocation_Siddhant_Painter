   'use strict';
 
   function updateLocationDetails(data) {
       var now = new Date();
       $('#location').html(window.locationTemplate(data));
       $('#location').delegate('.help', 'click', function(e) {
           var fieldName = $(e.currentTarget).closest('tr').find('td:nth-child(1)').text();
           alert('This is your ' + fieldName + ' from ISP ' + data.isp + ' at ' + now);
           return false;
       });
       $('#locationTable').removeClass('empty');
   }

   function resetLocation() {
       $('#location').html(window.locationTemplate({
           query: '0.0.0.0'
       }));
       $('#googleMap').empty().css('background-color', 'inherit');
       window.map = null;
   }

   function displayMyLocation(address, websiteURL) {
       address = address || '';
       $.getJSON('http://ip-api.com/json/' + address)
           .success(function(locationData) {
               updateLocationDetails(locationData);
               markOnMap(locationData.lat, locationData.lon);
               var urlObj = {
                   url: websiteURL,
                   ip: address,
                   country: locationData.country,
                   latitude: locationData.lat,
                   longitude: locationData.lon,
				   date: new Date().toLocaleDateString()
               };
               if (address)
                   storeInLocalStorage(urlObj);
           })
           .error(function() {
               displayError('Location unavailable!');
           });
   }

   function markOnMap(lat, lon) {
       if (!window.map) {
           window.map = new GMaps({
               el: '#googleMap',
               lat: lat,
               lng: lon
           });
       }
       window.map.addMarker({
           lat: lat,
           lng: lon
       });
       window.map.fitZoom();
   }

   function displayWebsiteLocation(e) {
       $(".fade-out").remove();
       e.preventDefault();
       var data = $(e.currentTarget).serializeArray();
       getSiteLocationbyURL(data[0].value.replace('http://', ''));
   }

   function getSiteLocationbyURL(websiteURL) {
       try {
           $.getJSON('http://freegeoip.net/json/' + websiteURL)
               .success(function(hostData) {
                   //get the IP address of the website
                   displayMyLocation(hostData.ip, websiteURL);
               })
               .error(function(xhr, ajaxOptions, thrownError) {
                   displayError('Site unavailable!');
               })
       } catch (e) {
           displayError('Location unavailable!');
       }
   }

   function displayError(_message) {
       $('#messageCenter').append(window.messageTemplate({
           message: (_message != undefined) ? _message : ''
       }));
   }

   function storeInLocalStorage(urlObj) {
       //retrieve
       var locations = (localStorage.getItem("locations")) ? JSON.parse(localStorage.getItem("locations")) : [];
       //save (IP should always be unique)
       for (var i in locations) {
           if (locations[i].ip == urlObj.ip) {
               return;
           }
       }
       locations.push(urlObj);
       localStorage.setItem("locations", JSON.stringify(locations));
       var eleStyle = document.getElementById("historyCenter").style.display;
       if (eleStyle == 'inline-block')
           displayHistory();
   }

   function displayHistory() {
       $('#historyCenter').html(window.historyTemplate());
       var locations = (localStorage.getItem("locations")) ? JSON.parse(localStorage.getItem("locations")) : [];
       //save (IP should always be unique)
	   for (var i in locations) {
           var row = '<tr><td>' + locations[i].ip + '</td><td> <a class="history" onclick="openThisLocation(\'' + locations[i].ip + '\');"> ' + locations[i].url + '</a></td><td>' + locations[i].country + "</td><td>" + locations[i].latitude + '</td><td>' + locations[i].longitude + '</td><td>' + locations[i].date + '</td></tr>';
           $('#historyTbody').append(row);
       }
	   if(locations.length==0){
		   var row = '<tr><td colspan="6" style="color:red">No Records to display.</td></tr>';
           $('#historyTbody').append(row);
	   }
       $("#historyCenter").css("display", "inline-block");
   }

   function openThisLocation(_ip, _url) {
       resetLocation();
       $('#txtWebsite').val("");
       displayMyLocation(_ip);
   }

   function closeHistoryTab() {
       $("#historyCenter").hide();
   }
	
	function clearHistory(){
		localStorage.setItem("locations", []);
		var eleStyle = document.getElementById("historyCenter").style.display;
       if (eleStyle == 'inline-block')
           displayHistory();
	}
	
   function initialize() {
       window.locationTemplate = Handlebars.compile($('#locationTemplate').html());
       window.messageTemplate = Handlebars.compile($('#messageTemplate').html());
       window.historyTemplate = Handlebars.compile($('#historyTemplate').html());
       resetLocation();
       $('#btnGetMyLocation').click(function() {
           displayMyLocation();
       });
       $('#txtWebsite').click(function() {
           $(".fade-out").remove();
       });
       $('#formGeoLocation').submit(displayWebsiteLocation);
       $('#btnResetLocation').click(resetLocation);

       $('#historyBtn').click(function() {
           displayHistory();
       });
   }
 
   $(document).ready(initialize);
  console.log("%cSTOP!", "color: red; font-size: x-large");
  console.log("%cThis is a browser feature intended for developers. If someone told you to copy-paste something here beware it is might be a scam and will give them access to your private information.", "color: black; font-size: small");