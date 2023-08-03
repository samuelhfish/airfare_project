// Grab data
let apiAirfare = "/api/v1.0/flights_by_departure";
let apiOriginal = "/api/v1.0/departures";

// Fetch the JSON data and console log it
function init() {

d3.json(apiAirfare).then(function(data) {
    let dropdownMenu = d3.select("#selDataset");
    
    // let departures = data.city1; 

    Object.keys(data).forEach((departure) => {
        dropdownMenu.append("option")
        .text(departure)
        .property("value", departure);
    })

    // sample940 = data[0];

    // console.log(sample940);
    
    if(myMap) {myMap.off(); myMap.remove()};

    buildChart('Albuquerque, NM  - Q1');
    createMap('Albuquerque, NM  - Q1');
    // buildMetadata(sample940);
    // buildBubbles('Austin, TX');
    // buildGauge(sample940);
});

// static_init();

}


// function buildFlightInfo(sample) {
    
//     d3.json(apiAirfare).then(function(data) {
        
//         console.log(data);
//         // let departures = data;
        
//         // console.log(departures);
        
//         // let info = departures.filter(function(result) {
//         //     return result.departures == sample
//         // });
        
//         // console.log(info)
        
//         subjectMetadata = data[0];
        
//         console.log(subjectMetadata)

//         d3.select("#sample-metadata").html("");

//         Object.entries(subjectMetadata).forEach(([key,value]) => {

//             console.log(key,value);

//             d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//         });
//     });
// }

// init();

// function buildChart(city) {
    
//     d3.json(apiAirfare).then(function(data) {
        
//         let departureCity = data[city]

//         let trace = {
//             x: departureCity.ToCities,
//             y: departureCity.Rates,
//             // text: `${departureCity.PercentChangePrice}%`,
//             // textposition: 'auto',
//             // hoverinfo: 'none',
//             // text: otu_labels.slice(0,10).reverse(),
//             // name: "Bacteria",
//             type: "bar",
//             orientation: "v"
//         };


//         // Data array
//         // `data` has already been defined, so we must choose a new name here:
//         let traceData = [trace];

//         // Apply a title to the layout
//         let layout = {
//             title: "price change by departure",
//             margin: {
//                 l: 100,
//                 r: 100,
//                 t: 100,
//                 b: 100
//             }
//         };
//         Plotly.newPlot("bar1", traceData, layout);
//     });   
// };

function buildChart(city) {
    d3.json(apiAirfare).then(function(data) {

        console.log(`city: ${city}`);
        console.log(`data:`);
        console.log(data);

        let departureCity = data[city];

        console.log(`dep city: ${departureCity}`);
        
        let trace1 = {
            x: departureCity.ToCities,
            y: departureCity.Rates,
            // text: `${departureCity.PercentChangePrice}%`,
            // textposition: 'auto',
            // hoverinfo: 'none',
            type: "bar",
            orientation: "v"
        };

        let trace2 = {
            x: departureCity.ToCities,
            y: departureCity.PassengerChange,
            type: "bar",
            orientation: "v"
        };

        let traceData = [trace1];

        let layout = {
            title: "Price Change by Destination",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        Plotly.newPlot("bar1", traceData, layout);

        traceData = [trace2];

        layout = {
            title: "Passenger Change by Destination",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        Plotly.newPlot("bar2", traceData, layout);
    });   
}


function optionChanged(subject) {
   console.log(subject);

   buildChart(subject);

   if(myMap) {myMap.off(); myMap.remove()};
   
   
   createMap(subject);
   
//    buildMetadata(subject);
//    buildBubbles(subject);
//    buildGauge(subject);

};
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });


function createMap(city_map){

    
    
    // Create a map object.
    myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4
      });
      
      // Add a tile layer.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(myMap);
      
      // Define a markerSize() function that will give each city a different radius based on its population.
      function markerSize(population) {
        population = population * -1
        
        console.log(Math.sqrt(population) * 50)
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
    
    
    
    };


init();