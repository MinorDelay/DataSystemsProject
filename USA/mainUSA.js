window.onload = function () {

  d3.queue()
    .defer(d3.json, "us-states.json")
    .defer(d3.csv, "data_states.csv")

    .awaitAll(callFunctions);

    function callFunctions(error, response) {
     if (error) throw error;

     loadUSMap(error, response[0], response[1])

 }
};
