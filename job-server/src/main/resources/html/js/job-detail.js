/**
 * Created by hwang on 5/27/15.
 */

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function showJobDetail(jobId) {
  $.getJSON(
    '/jobs/'+ jobId,
    '',
    function (json) {
      if(json) {
        $("#jobDetail").html("<pre>"+JSON.stringify(json, null, 2)+"</pre>");

        var data1 = pieChartDataTransform(json.result);

        nv.addGraph(function() {
          var chart = nv.models.pieChart()
                  .x(function(d) { return d.label })
                  .y(function(d) { return d.value })
                  .showLabels(true)     //Display pie labels
                  .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                  .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                  .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                  .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
              ;

          d3.select("#chart1 svg")
              .datum(data1)
              .transition().duration(350)
              .call(chart);

          return chart;
        });

        var data2 = barChartDataTransform(json.result);
        nv.addGraph(function() {
          var chart = nv.models.discreteBarChart()
                  .x(function(d) { return d.label })    //Specify the data accessors.
                  .y(function(d) { return d.value })
                  .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
                  .tooltips(false)        //Don't show tooltips
                  .showValues(true)       //...instead, show the bar value right on top of each bar.
              ;

          d3.select('#chart2 svg')
              .datum(data2)
              .transition().duration(350)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
      }
    }
  );
}

function pieChartDataTransform(json) {
  var result = [];
  $.each(json, function (k, v) {
    result.push({
      "label": k,
      "value": v
    })
  });
  return result;
}

function barChartDataTransform(json) {
  var result = [{
    key: "Job Results",
    values: []
  }];
  $.each(json, function (k, v) {
    result[0].values.push({
      "label": k,
      "value": v
    })
  });
  return result;
}