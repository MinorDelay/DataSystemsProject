function makeScatter(data, dataX, dataY){

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = (576*1.1) - margin.left - margin.right,
    height = (300*1.1) - margin.top - margin.bottom;


// Every time function is called remove scatter svg
d3.select(".scatterSvg")
  .remove();

//
var xValue = []
var yValue = []
var cValue = []
var strictness = []

// For all datapoints get x, y, and c value
for (var i = 0; i < data.length; i++) {

    xValue[i] = parseFloat(data[i][0][dataX]);
    yValue[i] = parseFloat(data[i][0][dataY]);
    cValue[i] = data[i][0]["state"];
    strictness[i] = data[i][0]["strictness"]
      };

// Map x value to visual encoding (px)
var xScale = d3.scaleLinear().domain([0,d3.max(xValue)]).range([0, width]),
    xAxis = d3.axisBottom(xScale);

// Map y value to visual encoding (px)
var yScale = d3.scaleLinear().domain([d3.max(yValue),0]).range([0, height]),
    yAxis = d3.axisLeft(yScale);

// Setup fill color
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Add the graph canvas to the body of the webpage
var svg = d3.select("#Grafiek").append("svg")
    .attr('class', 'scatterSvg')
    .attr("id", "scatterSvgID")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('fill', 'lightBlue')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// Add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Add x- and y-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(dataX);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -10)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(dataY)

// Draw dots
  svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 2.5)
      .attr("cx", function(d){return xScale(d[0][dataX])})
      .attr("cy", function(d,i){return yScale(d[0][dataY])})
      .style("fill", 'lightBlue')
      .attr('stroke', 'black')
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
               tooltip.html(d[0]["state"] + "<br/> (X = " + d[0][dataX]
               + ", Y = " + d[0][dataY] + ")")
                    .style("left",(d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

      svg.selectAll("g")
          .data(data)
          .enter()
          .append("text")

  // Draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // Draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
};
