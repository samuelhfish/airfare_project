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
    
    buildChart('Austin, TX  - Q1');
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
//    buildMetadata(subject);
//    buildBubbles(subject);
//    buildGauge(subject);

};

init();