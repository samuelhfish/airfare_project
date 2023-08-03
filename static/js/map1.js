// function init() {

//   d3.json(apiAirfare).then(function(data) {
//       let dropdownMenu = d3.select("#selDataset");
      
//       // let departures = data.city1; 
  
//       Object.keys(data).forEach((departure) => {
//           dropdownMenu.append("option")
//           .text(departure)
//           .property("value", departure);
//       })
  
//       // sample940 = data[0];
  
//       // console.log(sample940);
      
//       buildChart('Austin, TX  - Q1');
//       // buildMetadata(sample940);
//       // buildBubbles('Austin, TX');
//       // buildGauge(sample940);
//   });
  
//   // static_init();
  
//   }

function optionChanged(subject) {

  console.log(subject);
  
  createMap(subject);
//    buildMetadata(subject);
//    buildBubbles(subject);
//    buildGauge(subject);

};
function createMap(city_map){
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
    for (let i = 0; i < data[city_map].ToCities.length; i++) {
      let value = data[city_map]
      L.circle([value.DestLat[i],value.DestLng[i]], {radius: 200}).addTo(myMap);}

    // Object.entries(data).forEach(entry => {
    //   const [key, value] = entry;
    //   console.log(key, value.DestLat, value.DestLng);
    
    
    // L.circle([value.DestLat[0],value.DestLng[0]], {radius: 200}).addTo(myMap);
       
    // });
  
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


  // function popupContent(feature) {
  //   let date = new Date(feature.properties.time * 1000);
  //   let prop = feature.properties;
  //   let content = `Rate Change: ${city.Rates}<br>
  //                   Location: ${city}<br>
  //                   Time: ${date}<br>
  //                   Depth(km): ${feature.geometry.coordinates[2]}`
  //   return content;
  // }
});


createMap('Austin, TX  - Q1')
};
