window.onload = function () {

  d3.queue()
    .defer(d3.json, "custom.json")
    .defer(d3.csv, "full_db_vehicles.csv")
    .awaitAll(callFunctions);

  // after all data is loaded give each function the correct response
  function callFunctions(error, response) {
      if (error) throw error;

      createMap(error, response[0], response[1])
      slider()
  }
};
