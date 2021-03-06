function slider(){
d3.csv("full_db_vehicles.csv", function(attackData){
  var formatDateIntoYear = d3.timeFormat("%Y");
  var formatDate = d3.timeFormat("%b %Y");
  var parseDate = d3.timeParse("%m/%d/%y");
  var data = []
  // Loop through each state data value in the .csv file
  for (var i = 0; i < attackData.length; i++) {

    // Grab relevant data
    data[i] = [{"Instance": i,
                      "Date": attackData[i].imonth + "/" + attackData[i].iday + "/" + attackData[i].iyear,
                      "Day": attackData[i].iday,
                      "Month": attackData[i].imonth,
                      "Year": attackData[i].iyear,
                     "Country": attackData[i].country_txt,
                     "City": attackData[i].city,
                     "Latitude": attackData[i].latitude,
                     "Longitude": attackData[i].longitude}]
}

// Grab begin and end date from data
var startDate = new Date(data[0][0].Date),
    endDate = new Date(data[data.length-1][0].Date);

var margin = {top:50, right:50, bottom:0, left:50},
    width = 760 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// Append svg for slider
var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

////////// slider //////////

var moving = false;
var currentValue = 0;
var targetValue = width;

var playButton = d3.select("#startTemporal");

// Grab x value in relation to point on screen
var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height/3 + ")");

// Append horizontal bar for slider
slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
          currentValue = d3.event.x;
          update(x.invert(currentValue));
        })
    );

// Append styling and text for slider
slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateIntoYear(d); });

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")


////////// plot //////////

var dataset;

// Create g-element for plotting datapoints
var plot = svg.append("g")
    .attr("class", "plot")
    .attr("transform", "translate(" + margin.left + "," + margin.top * 2 + ")");

  dataset = data;
  drawPlot(dataset);

  // start moving function when user selects "Start temporal" button
  d3.select("#startTemporal").on("click", function() {

    if (playButton._groups[0][0].innerHTML == "Stop Temporal") {
      moving = false;
      timer = 0;
      playButton._groups[0][0].innerHTML = "Start Temporal";
    } else {
      moving = true;
      timer = setInterval(step, 100);
      playButton._groups[0][0].innerHTML = "Stop Temporal";
    }
  })

// determine stepsize and next value for datapoints
function step() {
  update(x.invert(currentValue));
  currentValue = currentValue + (targetValue/151);
  if (currentValue > targetValue) {
    moving = false;
    currentValue = 0;
    clearInterval(timer);
    timer = 0;
    playButton._groups[0][0].innerHTML = "Start Temporal";
  }
}

// draw data
function drawPlot(data) {
  var locations = plot.selectAll(".locationSlider")
    .data(data);

  // if filtered dataset has more circles than already existing, transition new ones in
  locations.enter()
    .append("circle")
    .attr("class", "locationSlider")
    .attr("cx", function(d) { return x(parseDate(d[0].Month + "/" + d[0].Day + "/" + d[0].Year[2] + d[0].Year[3])); })
    .attr("cy", height/2)
    .style("fill", function (d){
      if(d[0].Longitude < 21){
      return "red"}
      else{
        return "blue"}
    })
    .style("opacity", 0.5)
    .attr("r", 8)
      .transition()
      .duration(400)
      .attr("r", 25)
        .transition()
        .attr("r", 8);

  // if filtered dataset has less circles than already existing, remove excess
  locations.exit()
    .remove();
}

function update(h) {
  // update position and text of label according to slider scale
  handle.attr("cx", x(h));
  label
    .attr("x", x(h))
    .text(formatDate(h));

  // filter data set and redraw plot
  var newData = dataset.filter(function(d) {
    return parseDate(d[0].Month + "/" + d[0].Day + "/" + d[0].Year[2] + d[0].Year[3]) < h;
  })
  drawPlot(newData);
}
})
}
