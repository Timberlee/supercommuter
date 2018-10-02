# https://github.com/axyjo/leaflet-rails
=begin
Leaflet.tile_layer = "http://{s}.tile.cloudmade.com/YOUR-CLOUDMADE-API-KEY/997/256/{z}/{x}/{y}.png"
# You can also use any other tile layer here if you don't want to use Cloudmade - see http://leafletjs.com/reference.html#tilelayer for more
Leaflet.attribution = "Your attribution statement"
Leaflet.max_zoom = 18


// Adds base layer - only one of these can be visible at a time
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap,</a> <a href="https://www.thunderforest.com">Thunderforest</a> | contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXJhdG9zdGhlbmVleiIsImEiOiJjam1nbGI4cDcwMGI2M3Fyem96MjFtMzBkIn0.Hoz2fR0h8ty9dDXbKGk8jQ'
}).addTo(mapVar);

// Adds base layer - only one of these can be visible at a time
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap,</a> <a href="https://www.thunderforest.com">Thunderforest</a> | contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXJhdG9zdGhlbmVleiIsImEiOiJjam1nbGI4cDcwMGI2M3Fyem96MjFtMzBkIn0.Hoz2fR0h8ty9dDXbKGk8jQ'
}).addTo(mapVar);
=end
