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
        console.log(json);

        var data3 = sunburstCharDataTransform(json.result);
        //var data3 = sunburstCharDataTransform(getData());
        nv.addGraph(function() {
          var chart = nv.models.sunburstChart();
          chart.color(d3.scale.category20());
          d3.select("#chart svg")
              .datum(data3)
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

function sunburstCharDataTransform(json) {
  var result = [];
  $.each(json, function (k, v) {
    if (v instanceof Object) {
      result.push({
        "name": capitalize(k),
        "children": sunburstCharDataTransform(v)
      })
    }
    else {
      result.push({
        "name": capitalize(k),
        "size": Math.abs(Number(v.toFixed(2)))
      })
    }
  });
  return result;
}

function capitalize(string) {
  return string.charAt(0) + string.slice(1).toLowerCase()
}