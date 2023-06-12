// Grab data
let apiAirfare = "airfare_2017.db";

// function init() {
//   d3.json(apiAirfare).then(function(data) {
//       let filter = "Survived"
//       data = data['Survived']
//       let dataPlot = [{
//         x: Object.keys(data),
//         y: Object.values(data),
//         type: 'bar'
//       }]
//       Plotly.newPlot("plot", dataPlot);
//     });
//   }

// // Function called by DOM changes
// function refreshPlot() {
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a letiable
//   let filter = dropdownMenu.property("value");
//   // Call function to update the chart
//   d3.json(apiTitanic).then(function(data) {
//     data = data[filter]
//     let dataPlot = [{
//       x: Object.keys(data),
//       y: Object.values(data),
//       type: 'bar'
//     }]
//     Plotly.newPlot("plot", dataPlot);
//   });
// }

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", refreshPlot);

// init();

// Fetch the JSON data and console log it
function init() {

d3.json(apiAirfare).then(function(data) {
  console.log(data);
    let dropdownMenu = d3.select("#selDataset");
    
    let departures = data.city1; 

    departures.forEach((departure) => {
        dropdownMenu.append("option")
        .text(departure)
        .property("value", departure);
    })

    sample940 = departures[0];

    console.log(sample940);
    
    buildChart(sample940);
    // buildMetadata(sample940);
    // buildBubbles(sample940);
    // buildGauge(sample940);
});
}

init()

function buildChart(pricechange) {
    
    d3.json(apiAirfare).then(function(data) {
        
        console.log(data);
        let sampleInfo = data.amounnt_changes;
        
        console.log(sampleInfo);
        
        subjectinfo = sampleInfo.filter(function(result) {
            return result.city1 == pricechange
        });
        
        console.log(subjectinfo)
        
        subjectData = subjectinfo[0];
        console.log(data)


        let destination = subjectData.city2;
        // let otu_labels = subjectData.otu_labels;
        let amount_change = subjectData.amount_change;

        console.log(destination,amount_change);


        let trace = {
            x: amount_change.slice(0,10).reverse(),
            y: destination.slice(0,10).map(name => `${name}`).reverse(),
            // text: otu_labels.slice(0,10).reverse(),
            // name: "Bacteria",
            type: "bar",
            orientation: "h"
        };

        // Data array
        // `data` has already been defined, so we must choose a new name here:
        let traceData = [trace];

        // Apply a title to the layout
        let layout = {
            title: "top 10 price change",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        Plotly.newPlot("bar", traceData, layout);
    });   
}

// function buildMetadata(sample) {
    
//     d3.json(url).then(function(data) {
        
//         console.log(data);
//         let metadata = data.metadata;
        
//         console.log(metadata);
        
//         let info = metadata.filter(function(result) {
//             return result.id == sample
//         });
        
//         console.log(info)
        
//         subjectMetadata = info[0];
        
//         console.log(subjectMetadata)

//         d3.select("#sample-metadata").html("");

//         Object.entries(subjectMetadata).forEach(([key,value]) => {

//             console.log(key,value);

//             d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//         });
//     });
// }

// function buildGauge(sample) {
    
//     d3.json(url).then(function(data) {
        
//         console.log(data);

//         let  sampleInfo = data.metadata;

//         let value = sampleInfo.filter(result => result.id == sample);

//         let valueData = value[0];

//         let washFreq = valueData.wfreq

//         let gaugeData = [
//             {
//             domain: { x: [0, 1], y: [0, 1]},
//             value: washFreq,
//             title: { text: "Washes Per Week"},
//             type: "indicator",
//             mode: "gauge+number",
//             gauge: {
//                 axis: {range: [null, 10], tickwidth: 1, tickcolor: "darkblue"},
//                 bar: { color: "black" },
//                 bgcolor: "white",
//                 borderwidth: 2,
//                 bordercolor: "gray",
//                 steps: [
//                   { range: [0, 2], color: "rgb(166,206,227)" },
//                   { range: [2, 4], color: "rgb(31,120,180)" },
//                   { range: [4, 6], color: "rgb(178,223,138)" },
//                   { range: [6, 8], color: "rgb(51,160,44" },
//                   { range: [8, 10], color: "rgb(251,154,153)" },
//                 ]
//             }
//             }
//         ];

//         let layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

//         Plotly.newPlot("gauge", gaugeData, layout)
//     });
// };

// function buildBubbles(sample) {
//     d3.json(url).then(function(data) {
        
//         console.log(data);
//         let  sampleInfo = data.samples;

//         let value = sampleInfo.filter(result => result.id == sample);

//         let valueData = value[0];

//         let otu_ids = valueData.otu_ids;
//         let otu_labels = valueData.otu_labels;
//         let sample_values = valueData.sample_values;

//         console.log(otu_ids,otu_labels,sample_values);

//         let tracebubble = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "YlGnBu"
//             }
//         };

//         let traceData = [tracebubble]

//         let layout = {
//             title: "Bacteria Per Sample",
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"},
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

init();