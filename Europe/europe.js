function createMap(error, json, data){
	// Width and height of map
	var width = 525;
	var height = 500;

	// D3 Projection
	var projection = d3.geoAlbers()
					   .scale([700])
						 .rotate([0])
						 .translate([150,400])

	// Define path generator
	var path = d3.geoPath()
			  	 .projection(projection);

	// Create SVG element and append map to the SVG
	var svg = d3.select("#europeMap")
				.append("svg")
				.attr("id", "svgMap")
				.attr("width", width)
				.attr("height", height);

// Give dataVis correct data
dataVis(error, json, data, projection, path, svg)

}

function dataVis(error, json, data, projection, path, svg){

var attackData = []
	// Loop through each data value in the .csv file
	for (var i = 0; i < data.length; i++) {

		// Grab State Name
		attackData[i] = [{"Instance": i,
											"Date": data[i].imonth + "/" + data[i].iday + "/" + data[i].iyear,
											"Day": data[i].iday,
											"Month": data[i].imonth,
											"Year": data[i].iyear,
										 "Country": data[i].country_txt,
										 "City": data[i].city,
									   "Latitude": data[i].latitude,
									 	 "Longitude": data[i].longitude}]
}

// Bind the data to the SVG and create one path per GeoJSON feature
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "0.1")
  .style("fill", "darkgreen")

// Append all data  with opacity 0 once button "Start spatial" is clicked
d3.select("#startSpatial").on("click", function(d){
	 svg.selectAll("circle")
			.data(attackData)
			.enter()
			.append("circle")
			.attr("class", "locationMap")
			.attr("cx", function(d){
				 return projection([d[0].Longitude, d[0].Latitude])[0]
			 })
			.attr("cy", function(d){
				return projection([d[0].Longitude, d[0].Latitude])[1]})
			.attr("r", 3)
			.attr("stroke", "black")
			.style("fill", function (d){
	      if(d[0].Longitude < 21){
	      return "red"}
	      else{
	        return "blue"}
	    })
			.style("opacity", 0)

			// Call function startAttacks with correct data
			startAttacks(error, svg);
})}

function startAttacks(error, svg){

	// Colour all datapoints with correct colour, size, opacity
	d3.selectAll("circle.locationMap")
		.style("opacity",0)
		 .transition()
		 .style("opacity",1)
		 .duration(400)
		 .delay(function (d,i){
			 return i*97.52;})
		 .attr("r", 8)
		 .transition()
		 .attr("r", 3)
		 .style("opacity", 0.3);

};
