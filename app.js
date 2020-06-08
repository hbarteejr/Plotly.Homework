function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
  
    // Use `d3.json` to fetch the metadata for a sample
      // Use d3 to select the panel with id of `#sample-metadata`
      d3.json(`/metadata/${sample}`).then((data) => {
        var sample_data = d3.select("#sample-metadata");
  
  
  
        // Use `.html("") to clear any existing metadata
        sample_data.html("");
  
  
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
        Object.entries(data).forEach(function([key, value]) {
          sample_data.append("h6").text('${key}:${value}')
        });
  
  
      });
  
  
  function buildCharts(sample) {
  
  
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then((data) => {
  
      // @TODO: Build a Bubble Chart using the sample data
      let otu_ids  = data.otu_ids;
      let otu_labels = data.otu_labels;
      let sample_values = data.sample_values;
  
  
  
      let bubble_chart = {
  
        mode: "markers",
        x: otu_ids,
        y: sample_values,
        text: otu_labels, 
        marker: {color:otu_ids, colorscale:"Rainbow", size:sample_values}
  
      };
  
  
  
      let bubble_data = [bubble_chart];
  
  
  
      let bubble_layout = {
  
        title : "Bacteria Type and Counts",
        showlegend: false,
        height: 600,
        width: 1000
  
      };
  
  
  
      Plotly.newPlot("bubble", bubble_data, bubble_layout);
  
  
  
  
  
      // @TODO: Build a Bar Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
   
          let bar_chart = {
  
        labels: otu_ids.slice(0, 10), 
        values: sample_values.slice(0, 10),
        hovertext: otu_labels.slice(0, 10),
        type: "bar"
  
      };
  
      let bar_layout = {
  
        height: 500,
        width: 600
  
      };
  
      // console.log(data);
  
  
      Plotly.newPlot("bar", bar_chart, bar_layout);
  
  
    });
  };
  
  
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();