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
    
    buildChart('Austin, TX');
    // buildMetadata(sample940);
    // buildBubbles(sample940);
    // buildGauge(sample940);
});

static_init();

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

function buildChart(city) {
    
    d3.json(apiAirfare).then(function(data) {
        
        let departureCity = data[city]

        let trace = {
            x: departureCity.ToCities,
            y: departureCity.Rates,
            // text: otu_labels.slice(0,10).reverse(),
            // name: "Bacteria",
            type: "bar",
            orientation: "v"
        };

        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData = [trace];

        // Apply a title to the layout
        let layout = {
            title: "price change by departure",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        Plotly.newPlot("bar", traceData, layout);
    });   
};


function optionChanged(subject) {

   console.log(subject);
   
   buildChart(subject);
//    buildMetadata(subject);
//    buildBubbles(subject);
//    buildGauge(subject);

};

init();

function static_init() {
    d3.json(apiOriginal).then(function(data) {
      const departures = data;
      const arrivals = data['ToCities'];
      const priceChanges = data['Price Changed'];
      // Sort the price changes in descending order
      const sortedIndices = priceChanges.map((_, index) => index)
        .sort((a, b) => priceChanges[b] - priceChanges[a]);
      // Get the top five indices
      const topFiveIndices = sortedIndices.slice(0, 5);
      // Get the top five departure and arrival cities and price changes
      const topDepartures = topFiveIndices.map(index => departures[index]);
      const topArrivals = topFiveIndices.map(index => arrivals[index]);
      const topPriceChanges = topFiveIndices.map(index => priceChanges[index]);
      let trace1 = {
        x: topDepartures.map((departure, index) => departure + ' & ' + topArrivals[index]),
        y: topPriceChanges,
        type: 'bar',
        marker: {
          color: [
            'rgba(255, 100, 102, 0.7)',
            'rgba(254, 39, 60, 0.7)',
            'rgba(252, 185, 88, 0.7)',
            'rgba(40, 51, 223, 0.7)',
            'rgba(0, 155, 0, 0.7)'
          ],
        },
      };
      let layout1 = {
        title: 'Top Five Price Changes',
        font: { size: 18 },
        xaxis: {
          title: 'Departure & Arrival Cities'
        },
        yaxis: {
          title: 'Price Change'
        }
      };
      let config = { responsive: true }
      Plotly.newPlot("plot1", [trace1], layout1, config);
    });
  }