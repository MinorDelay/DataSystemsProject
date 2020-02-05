function loadUSMap(error, USMap, data){

if (error) throw error;

//Width and height of map
var width = (960*1.2)+100;
var height = (500*1.4)+100;

//Colors for the linear scale
var lowColor = '#f9f9f9'
var highColor = '#bc2a66'


// D3 Projection
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2.3]) // translate to center of screen
  .scale([1400]); // scale things down so see entire US

// Define path generator
var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

//Create SVG element and append map to the SVG
var svg = d3.select("body")
  .append("svg")
  .attr("id", "usMapSvg")
  .attr("width", width)
  .attr("height", height);


// Load in my states data!
	var frequency = [];
  var strictness = [];
	for (var d = 0; d < data.length; d++) {
		frequency.push(parseFloat(data[d].frequency))
    strictness.push(data[d].strictness)

	}

  //Set interval for the linear scale
	var minVal = 0;
	var maxVal = d3.max(frequency)
	var ramp = d3.scaleLinear().domain([minVal,maxVal+1]).range([lowColor,highColor])


    // Loop through each state data value in the .csv file
    for (var i = 0; i < data.length; i++) {

      // Grab State Name
      var dataState = data[i].state;

      // Grab State Name
      var dataStrict = data[i].strictness;

      // Grab data value
      var dataFrequency = data[i].frequency;

      // Unemployement rate
      var dataunemploymentRates = data[i].unemploymentRates;

      // Grab Median income of states
      var datamedianIncome = data[i].medianIncome;

      // Grab Poverty rate of states
      var datapovertyRates = data[i].povertyRates;

      // Grab GDP of states
      var dataGDP = data[i].GDP;

      // Grab Voting rates of states
      var dataVr = data[i].votingRates;

      // Grab urbanization percentage of states
      var dataUrbanization = data[i].Urbanization;

      // Grab strictness of states
      var dataPopulationDensity = data[i].PopulationDensity;

      // Grab strictness of states
      var dataPopulation = data[i].Population;

      // Grab strictness of states
      var datapropertyCrimeRate = data[i].propertyCrimeRate;

      // Grab strictness of states
      var dataViolentCrimeRate = data[i].ViolentCrimeRate;

      // Grab GDP of states
      var dataarmedAssaults = data[i].armedAssaults;

      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < USMap.features.length; j++) {
        var jsonState = USMap.features[j].properties.name;

        if (dataState == jsonState) {

          // Copy the data value into the JSON
          //For frequency of incidents and Strictness of every state
          USMap.features[j].properties.frequency = parseFloat(dataFrequency);
          USMap.features[j].properties.strictness = dataStrict;
          USMap.features[j].properties.unemploymentRates = dataunemploymentRates;
          USMap.features[j].properties.medianIncome = datamedianIncome;
          USMap.features[j].properties.povertyRates = datapovertyRates;
          USMap.features[j].properties.GDP = dataGDP;
          USMap.features[j].properties.votingRates = dataVr;
          USMap.features[j].properties.Urbanization = dataUrbanization;
          USMap.features[j].properties.PopulationDensity = dataPopulationDensity;
          USMap.features[j].properties.Population = dataPopulation;
          USMap.features[j].properties.propertyCrimeRate = datapropertyCrimeRate;
          USMap.features[j].properties.ViolentCrimeRate = dataViolentCrimeRate;
          USMap.features[j].properties.armedAssaults = dataarmedAssaults;

          // Stop looking through the JSON
          break;
        }
      }
    }

  // Create SVG
  svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'lightBlue')
    // Bind the data to the SVG and create one path per GeoJSON feature
    svg.selectAll("path")
      .data(USMap.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function(d) { return ramp(d.properties.frequency) })

      // add a legend
  		var w = 140, h = 300;

  		var key = d3.select("#usMapSvg")
  			.append("svg")
  			.attr("width", w)
  			.attr("height", h)
  			.attr("class", "legend");

  		var legend = key.append("defs")
  			.append("svg:linearGradient")
  			.attr("id", "gradient")
  			.attr("x1", "100%")
  			.attr("y1", "0%")
  			.attr("x2", "100%")
  			.attr("y2", "100%")
  			.attr("spreadMethod", "pad");

  		legend.append("stop")
  			.attr("offset", "0%")
  			.attr("stop-color", highColor)
  			.attr("stop-opacity", 1);

  		legend.append("stop")
  			.attr("offset", "100%")
  			.attr("stop-color", lowColor)
  			.attr("stop-opacity", 1);

  		key.append("rect")
  			.attr("width", w - 100)
  			.attr("height", h)
  			.style("fill", "url(#gradient)")
  			.attr("transform", "translate(10,10)");

  		var y = d3.scaleLinear()
  			.range([h, 0])
  			.domain([minVal, maxVal]);

  		var yAxis = d3.axisRight(y);

  		key.append("g")
  			.attr("class", "y axis")
  			.attr("transform", "translate(51,10)")
  			.call(yAxis)

      //Define width and height of the law icon
      var lawWidth = 10;
      var lawHeight = lawWidth;

      //Place law icons for all the different strictnesses
      svg.selectAll("#chart1 svg")
        .data(USMap.features)
        .enter()
        .append("svg:image")
        .attr('class', 'icon')
        .attr("xlink:href", function(d) {
          if (d.properties.strictness == 1) {return "Images/law5.png"}
          else if (d.properties.strictness == 2) {return "Images/law4.png"}
          else if (d.properties.strictness == 3) {return "Images/law3.png"}
          else if (d.properties.strictness == 4) {return "Images/law2.png"}
          else if (d.properties.strictness == 5) {return "Images/law.png"}
         })
        .attr("width",  function(d) {
          if (d.properties.strictness == 1) {return lawWidth*5}
          else if (d.properties.strictness == 2) {return lawWidth*4}
          else if (d.properties.strictness == 3) {return lawWidth*3}
          else if (d.properties.strictness == 4) {return lawWidth*2}
          else if (d.properties.strictness == 5) {return lawWidth}
         })
        .attr("height", lawHeight)
        .attr("x",  function(d){
          return path.centroid(d)[0]
        })
        .attr("y", function(d){
          return path.centroid(d)[1]
        })
        .attr('transform', 'translate(' + -lawWidth/2 + ',' + -lawHeight/2 + ')')

        var attackData = []
      	// Loop through each state data value in the .csv file
      	for (var i = 0; i < data.length; i++) {

      		// Grab State Name
      		attackData[i] = [{"Instance": i,
                            "state": data[i].state,
      											"Frequency": data[i].frequency,
      											"strictness": data[i].strictness,
      											"unemploymentRates": data[i].unemploymentRates,
      											"medianIncome": data[i].medianIncome,
       										 "povertyRates": data[i].povertyRates,
      										 "GDP": data[i].GDP,
      									   "votingRates": data[i].votingRates,
                           "Urbanization": data[i].Urbanization,
                           "PopulationDensity": data[i].PopulationDensity,
                           "Population": data[i].Population,
                           "propertyCrimeRate": data[i].propertyCrimeRate,
                            "ViolentCrimeRate": data[i].ViolentCrimeRate,
                            "armedAssaults": data[i].armedAssaults}]
              };

              // Depending on selected radiobutton load corresponding data
              makeScatter(attackData, "strictness", "Frequency");
        $("#gunLegislation").click(function(d) { swapRadioData(error, path, projection, svg, USMap);
          makeScatter(attackData,  "strictness", "Frequency");
         })

        $("#unemploymentRates").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "unemploymentRates", "Frequency"); })

        $("#medianIncome").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "medianIncome", "Frequency"); })

        $("#povertyRates").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "povertyRates", "Frequency"); })

        $("#GDP").click(function() { swapRadioData(error, path, projection, svg, USMap);
        makeScatter(attackData,  "GDP", "Frequency"); })

        $("#votingRates").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "votingRates", "Frequency"); })

        $("#Urbanization").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "Urbanization", "Frequency");})

        $("#PopulationDensity").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "PopulationDensity", "Frequency"); })

          $("#Population").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "Population", "Frequency");})

        $("#propertyCrimeRate").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "propertyCrimeRate", "Frequency"); })

        $("#ViolentCrimeRate").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "ViolentCrimeRate", "Frequency");})

        $("#armedAssaults").click(function() { swapRadioData(error, path, projection, svg, USMap)
        makeScatter(attackData,  "armedAssaults", "Frequency");})


}
