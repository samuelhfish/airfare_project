// Store our API endpoint as queryUrl.
// let queryUrl = "/api/v1.0/flights_by_departure";


// Create a map object.
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Define a markerSize() function that will give each city a different radius based on its population.
  function markerSize(population) {
    return Math.sqrt(population) * 50;
  }
  
  // get our data via json
  let apiCity = "/api/v1.0/flights_by_departure"
  
  d3.json(apiCity).then(function(data) {
  
    console.log(data)

    for (let i = 0; i < data.length; i++) {
      let city = data[i];
      L.circle([city.DestLat[0],city.DestLng[0]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its population.
        radius: markerSize(city.Rates)
      }).bindPopup(`<h1>${city}</h1> <hr> <h3>Population: ${city.Rates.toLocaleString()}</h3>`).addTo(myMap);
    }
  })