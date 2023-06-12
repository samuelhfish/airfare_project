// Grab data
let apiAirfare = "/api/v1.0/departures";

// Fetch the JSON data and console log it
function init() {

d3.json(apiAirfare).then(function(data) {
    let dropdownMenu = d3.select("#selDataset");
    
    // let departures = data.city1; 
    console.log("Dep Data:");
    console.log(data);

    data.forEach((departure) => {
        dropdownMenu.append("option")
        .text(departure["Departure City"])
        .property("value", departure["Departure City"]);
    })

    sample940 = data[0];

    console.log(sample940);
    
    buildChart(sample940);
    // buildMetadata(sample940);
    // buildBubbles(sample940);
    // buildGauge(sample940);
});
}

init();

function buildChart(pricechange) {
    
    d3.json(apiAirfare).then(function(data) {
        
        console.log(data);
        let sampleInfo = data.amounnt_changes;
        
        console.log(sampleInfo);
        
        subjectinfo = sampleInfo.filter(function(result) {
            return result.city1 == pricechange
        });
        
        console.log(subjectinfo);
        
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
};


function optionChanged(subject) {

   console.log(subject);
   
   buildChart(subject);
//    buildMetadata(subject);
//    buildBubbles(subject);
//    buildGauge(subject);

};

init();