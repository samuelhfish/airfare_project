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
        let departureCity = data[city];

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

// function buildBubbles(city) {
//     d3.json(apiAirfare).then(function(data) {
        
//         let departureCity = data[city]

//         let tracebubble = {
//             x: departureCity.ToCities,
//             y: departureCity.PassengerChange,
//             // text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: departureCity.PassengerChange,
//                 color: departureCity.ToCities,
//                 colorscale: "YlGnBu"
//             }
//         };

//         let traceData = [tracebubble]

//         let layout = {
//             title: "Passenger Change",
//             hovermode: "closest",
//             xaxis: {title: "Destination City"},
//         };

//         Plotly.newPlot("bubble", traceData, layout)
//     });
// };



function optionChanged(subject) {

   console.log(subject);
   
   buildChart(subject);
//    buildMetadata(subject);
//    buildBubbles(subject);
//    buildGauge(subject);

};



// function static_init() {
//     d3.json(apiOriginal).then(function(data) {
//       const departures = data;
//       const arrivals = data['ToCities'];
//       const priceChanges = data['Price Changed'];
//       // Sort the price changes in descending order
//       const sortedIndices = priceChanges.map((_, index) => index)
//         .sort((a, b) => priceChanges[b] - priceChanges[a]);
//       // Get the top five indices
//       const topFiveIndices = sortedIndices.slice(0, 5);
//       // Get the top five departure and arrival cities and price changes
//       const topDepartures = topFiveIndices.map(index => departures[index]);
//       const topArrivals = topFiveIndices.map(index => arrivals[index]);
//       const topPriceChanges = topFiveIndices.map(index => priceChanges[index]);
//       let trace1 = {
//         x: topDepartures.map((departure, index) => departure + ' & ' + topArrivals[index]),
//         y: topPriceChanges,
//         type: 'bar',
//         marker: {
//           color: [
//             'rgba(255, 100, 102, 0.7)',
//             'rgba(254, 39, 60, 0.7)',
//             'rgba(252, 185, 88, 0.7)',
//             'rgba(40, 51, 223, 0.7)',
//             'rgba(0, 155, 0, 0.7)'
//           ],
//         },
//       };
//       let layout1 = {
//         title: 'Top Five Price Changes',
//         font: { size: 18 },
//         xaxis: {
//           title: 'Departure & Arrival Cities'
//         },
//         yaxis: {
//           title: 'Price Change'
//         }
//       };
//       let config = { responsive: true }
//       Plotly.newPlot("plot1", [trace1], layout1, config);
//     });
//   }

// // Fetch data from the API route
// d3.json(apiOriginal).then(function(data) {
//     // Sort the data by "Price Changed" in ascending order
//     data.sort((a, b) => a["Price Changed"] - b["Price Changed"]);
  
//     // Get the lowest 10 data objects
//     const lowest10 = data.slice(0, 10);
  
//     // Render the bar graph
//     const chartElement = document.getElementById("chart");
  
//     lowest10.forEach(item => {
//       const barElement = document.createElement("div");
//       barElement.classList.add("bar");
//       barElement.style.height = `${Math.abs(item["Price Changed"])}px`;
//       chartElement.appendChild(barElement);
//     });
//   }).catch(function(error) {
//     console.log("Error fetching data from the API:", error);
//   });

init();