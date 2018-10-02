// Can also put this file in /public
// Initializes map
var mapVar = L.map('map');//.setView([39.75621, -104.99404], 13);
// mapVar.locate({setView: true, maxZoom: 16});
/* See config/initializers/leaflet.rb for adding the tile layers
// Adds base layer - only one of these can be visible at a time
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap,</a> <a href="https://www.thunderforest.com">Thunderforest</a> | contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXJhdG9zdGhlbmVleiIsImEiOiJjam1nbGI4cDcwMGI2M3Fyem96MjFtMzBkIn0.Hoz2fR0h8ty9dDXbKGk8jQ'
}).addTo(mapVar);
*/
id: 'mapbox.streets',
// Adds transport layer, can skip some of the params specified by more than one layer
L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c4376cecf08a434d999c0bb08bc4c1fd').addTo(mapVar);
//alternately, var x = L.tileLayer(params); mapVar.addLayer(x);
function onLocationFound(e) {
    var radius = e.accuracy / 12;
    //L.marker(e.latlng).addTo(map)
    //    .bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(mapVar);
}
mapVar.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}
mapVar.on('locationerror', onLocationError);

var coordPopup = L.popup();
function onMapClick(e) {
  coordPopup
    .setLatLng(e.latlng)
    .setContent("You clicked the map  " + e.latlng.toString())
    .openOn(mapVar);
}
mapVar.on('click', onMapClick);

//Set the boundaries of the displayed map
mapVar.fitBounds([
    [40.893715, -73.733368],
    [40.546018, -74.056091]
]); //set the zoom integer multiple by less than 1 for ideal bounding around NYC
//Alternately, mapVar.fitBounds(array-of-coordinates.getBounds());

//Custom Icon
var metroIcon = L.icon({
    iconUrl: 'leaflet/images/expos-icon.png', //need absolute path
    iconSize: [20, 20],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
});
L.marker([40.66, -73.97], {icon: metroIcon}).addTo(mapVar);

var stationData = '';
function getStationData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      stationData = JSON.parse(this.responseText);
      console.log(stationData['result'][0]);
      document.getElementById("displayStationData").innerHTML =
      "ID: " + stationData['result'][0]['id'] +
      "<br>Name: "+ stationData['result'][0]['name'];
    }
  };
  xhttp.open("GET", "stations.json", true);
  xhttp.send();
}
//Function to gather stations by line from the json file
var stationData2 = '';
var stationArray2 = [];
function getStationData2(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      stationData2 = JSON.parse(this.responseText);
      for(var i = 0; i < stationData2.features.length; i++){
        if (stationData2.features[i]['properties']['line'].includes(7)){
          //Per ML may need to rewrite the entire expression here to include conditional operators (an or statement) rather than put the || within the .includes()
          //May have to delve into regular expressions here
          console.log(stationData2.features[i]['properties']['name']
          + " " + stationData2.features[i]['properties']['line']
          + " " + stationData2.features[i]['geometry']['coordinates'][0]);
          //for no good reason, Leaflet uses LATitude and LONGitude, while the MTA uses LONGitude and LATitude.
          var long = stationData2.features[i]['geometry']['coordinates'][0];
          var lat = stationData2.features[i]['geometry']['coordinates'][1];
          //need to play around with leaflet's #geojson-coordstolatlng
          stationArray2.push([lat,long]);
          var stationMarker = L.marker([lat, long], {icon: metroIcon}).addTo(mapVar);
          stationMarker.bindTooltip(stationData2.features[i]['properties']['name']).openTooltip();
          // L.marker([lat, long]).addTo(mapVar);
          console.log(stationArray2);
          // stationArray2.push(stationData2.features[i]['geometry']['coordinates'][0]);
        //Would probably be best to use Ruby to make subway line arrays in their own vars/files
        //Note: This is to re-format the data for my own use to actually then set to coordinates and plot on the map.
        }
      }

      var sevenTrainRoute2 = L.polyline(stationArray2, {color: 'purple'}).addTo(mapVar);
      //2018.9.26 23:44 for right now, let's .addTo(mapVar) the lines and make them clickable for the current timetable
    } // Definitely want live API calls for the train times since those change in real time
  };
  xhttp.open("GET", "Subway_Stations-2.geojson.json", true);
  xhttp.send();
}

var allTrains = [0,1,2,3,4,5,6,7,'A','B','C','D','E','F','G','J','L','M','N','Q','R','W','Z'];
//switching to rails, but if one really wanted to, one could spoof array like behavior from a hash because key values can be numbers
var trainData = '';
var trainArray = [];
function getTrains(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      trainData = JSON.parse(this.responseText);
      for(var i = 1; i < trainData.features.length; i++){
        var match = allTrains[i];
        if (trainData.features[i]['properties']['line'].includes(match)){
          var long = trainData.features[i]['geometry']['coordinates'][0];
          var lat = trainData.features[i]['geometry']['coordinates'][1];
          trainArray.push([lat,long]);
          var stationMarker = L.marker([lat, long], {icon: metroIcon}).addTo(mapVar);
          stationMarker.bindTooltip(trainData.features[i]['properties']['name']).openTooltip();
        }
      }
      var trainRoute = L.polyline(trainArray, {color: 'green'}).addTo(mapVar);
    }
  };
  xhttp.open("GET", "Subway_Stations-2.geojson.json", true);
  xhttp.send();
}
//Note: Converting a string to a native object is called parsing, while converting a native object to a string so it can be transmitted across the network is called stringification.
//Function to put stations in line arrays... need Ruby to persist this data
/*var oneTrainStations = [];
var j = 1;
function numberedLines(){ //put this whole thing up in the AJAX call for now
  for(j = 1; j < 8; j++){
    //"TypeError: stationData2.features is undefined" - need to set the values to properties of the object, can't call on the properties of the json object
    if (stationData2.features[j]['properties']['line'].includes(1)){
      oneTrainStations.push(stationData2.features[j]['properties']['name']);
      console.log("List of one train stations: " + oneTrainStations.map);
    }
  }
}
numberedLines();
*/

/*
var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', 'file.json', true);
xobj.onreadystatechange = function () {
if (xobj.readyState == 4 && xobj.status == "200") {

// .open will NOT return a value but simply returns undefined in async mode so use a callback
callback(xobj.responseText);

http://www.askyb.com/javascript/load-json-file-locally-by-js-without-jquery/
*/
