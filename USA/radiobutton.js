
function swapRadioData(error, path, projection, svg, USMap) {

if (error) throw error;

// Remove current data
 svg.selectAll(".icon")
           .remove();

  var iconWidth = 5;
  var iconHeight = 5;
  var lawWidth = 10;
  var lawHeight = 10;

  //If radiobutton is selected, select corresponding ID
   if(document.getElementById('gunLegislation').checked) {

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
       .attr('transform', 'translate(' + -lawHeight/2 + ',' + -lawWidth/2 + ')');


   }

   else if(document.getElementById('unemploymentRates').checked) {
     svg.selectAll("#chart1 svg")
       .data(USMap.features)
       .enter()
       .append("text")
       .attr('class', 'icon')
       .text(function(d) { return d.properties.unemploymentRates; })
       .attr("width", iconWidth)
       .attr("height", iconHeight)
       .attr("x",  function(d){
         return path.centroid(d)[0]
       })
       .attr("y", function(d){
         return path.centroid(d)[1]
       })
       .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
}
   else if(document.getElementById('medianIncome').checked) {
     svg.selectAll("#chart1 svg")
       .data(USMap.features)
       .enter()
       .append("text")
       .attr('class', 'icon')
       .text(function(d) { var integer = d.properties.medianIncome;
         var subStr = integer.slice(0,2);
         return (subStr + 'K');
       })
       .attr("width", iconWidth)
       .attr("height", iconHeight)
       .attr("x",  function(d){
         return path.centroid(d)[0]
       })
       .attr("y", function(d){
         return path.centroid(d)[1]
       })
       .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
  }

     else if(document.getElementById('povertyRates').checked) {
       svg.selectAll("#chart1 svg")
         .data(USMap.features)
         .enter()
         .append("text")
         .attr('class', 'icon')
         .text(function(d) { return d.properties.povertyRates; })
         .attr("width", iconWidth)
         .attr("height", iconHeight)
         .attr("x",  function(d){
           return path.centroid(d)[0]
         })
         .attr("y", function(d){
           return path.centroid(d)[1]
         })
         .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
}

     else if(document.getElementById('GDP').checked) {
       svg.selectAll("#chart1 svg")
         .data(USMap.features)
         .enter()
         .append("text")
         .attr('class', 'icon')
         .text(function(d) { var integer = d.properties.GDP;
           var subStr = integer.slice(0,2);
           return (subStr + 'K');
         })
         .attr("width", iconWidth)
         .attr("height", iconHeight)
         .attr("x",  function(d){
           return path.centroid(d)[0]
         })
         .attr("y", function(d){
           return path.centroid(d)[1]
         })
         .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
    }

     else if(document.getElementById('votingRates').checked) {
       svg.selectAll("#chart1 svg")
         .data(USMap.features)
         .enter()
         .append("text")
         .attr('class', 'icon')
         .text(function(d) { return Math.round(d.properties.votingRates*100)/100; })
         .attr("width", iconWidth)
         .attr("height", iconHeight)
         .attr("x",  function(d){
           return path.centroid(d)[0]
         })
         .attr("y", function(d){
           return path.centroid(d)[1]
         })
         .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
      }

     else if(document.getElementById('Urbanization').checked) {
       svg.selectAll("#chart1 svg")
         .data(USMap.features)
         .enter()
         .append("text")
         .attr('class', 'icon')
         .text(function(d) { return d.properties.Urbanization; })
         .attr("width", iconWidth)
         .attr("height", iconHeight)
         .attr("x",  function(d){
           return path.centroid(d)[0]
         })
         .attr("y", function(d){
           return path.centroid(d)[1]
         })
         .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
   }

   else if(document.getElementById('PopulationDensity').checked) {
     svg.selectAll("#chart1 svg")
       .data(USMap.features)
       .enter()
       .append("text")
       .attr('class', 'icon')
       .text(function(d) { return Math.round(d.properties.PopulationDensity*100)/100; })
       .attr("width", iconWidth)
       .attr("height", iconHeight)
       .attr("x",  function(d){
         return path.centroid(d)[0]
       })
       .attr("y", function(d){
         return path.centroid(d)[1]
       })
       .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
 }

 else if(document.getElementById('Population').checked) {

   svg.selectAll("#chart1 svg")
     .data(USMap.features)
     .enter()
     .append("text")
     .attr('class', 'icon')
     .text(function(d) { return (Math.round(d.properties.Population/10000)/100 + "M");
     })
     .attr("width", iconWidth)
     .attr("height", iconHeight)
     .attr("x",  function(d){
       return path.centroid(d)[0]
     })
     .attr("y", function(d){
       return path.centroid(d)[1]
     })
     .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
}

else if(document.getElementById('propertyCrimeRate').checked) {
  svg.selectAll("#chart1 svg")
    .data(USMap.features)
    .enter()
    .append("text")
    .attr('class', 'icon')
    .text(function(d) { return Math.round(d.properties.propertyCrimeRate*100)/100; })
    .attr("width", iconWidth)
    .attr("height", iconHeight)
    .attr("x",  function(d){
      return path.centroid(d)[0]
    })
    .attr("y", function(d){
      return path.centroid(d)[1]
    })
    .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
}

else if(document.getElementById('ViolentCrimeRate').checked) {
  svg.selectAll("#chart1 svg")
    .data(USMap.features)
    .enter()
    .append("text")
    .attr('class', 'icon')
    .text(function(d) { return Math.round(d.properties.ViolentCrimeRate*100)/100; })
    .attr("width", iconWidth)
    .attr("height", iconHeight)
    .attr("x",  function(d){
      return path.centroid(d)[0]
    })
    .attr("y", function(d){
      return path.centroid(d)[1]
    })
    .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
}

else if(document.getElementById('armedAssaults').checked) {
  svg.selectAll("#chart1 svg")
    .data(USMap.features)
    .enter()
    .append("text")
    .attr('class', 'icon')
    .text(function(d) { return Math.round(d.properties.armedAssaults*100)/100; })
    .attr("width", iconWidth)
    .attr("height", iconHeight)
    .attr("x",  function(d){
      return path.centroid(d)[0]
    })
    .attr("y", function(d){
      return path.centroid(d)[1]
    })
    .attr('transform', 'translate(' + -iconHeight*2 + ',' + iconWidth/2 + ')')
}
  }
