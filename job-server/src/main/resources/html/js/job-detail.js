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
  var json = getData();
  $("#jobDetail").html("<pre>"+JSON.stringify(json, null, 2)+"</pre>");
  console.log(json);

  var data = sunburstCharDataTransform(json.result);
  //var data = sunburstCharDataTransform(getData());
  nv.addGraph(function() {
    var chart = nv.models.sunburstChart();
    chart.color(d3.scale.category20c());
    d3.select("#chart svg")
        .datum(data)
        .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
  });
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
        "size": v.toFixed(2)
      })
    }
  });
  return result;
}

function capitalize(string) {
  if(string.length <= 2){
    return string
  }
  else{
    var res = '';
    var words = string.split(' ');
    words.forEach(function (entry) {
      res += (entry.charAt(0) + entry.slice(1).toLowerCase() + ' ')
    });
    return res
  }
}

//FOR DEBUG USAGE
function getData() {
  return {
    "status": "OK",
    "result": {
      "KY": {
        "PADUCAH": {
          "SIVA NIRANJAN": 0.4438908240574056,
          "WOELTZ VAN": 0.5603837322119726,
          "HOGANCAMP WILLIAM": 0.5065968879728031,
          "GRUBBS JOHN": 0.46244540118586575,
          "METCALF JAMES": 0.5444127650743638
        },
        "HENDERSON": {
          "MAYRON MICHAEL": 0.4924471710778456
        },
        "HOPKINSVILLE": {
          "SHETH PARESH": 0.46431787056591756,
          "COLBY JOHN": 0.3993249753639798,
          "NAIMOLI WAYNE": 0.33458287478298393
        },
        "LONDON": {
          "KHAN ALAM": 0.5261272673008657,
          "BUKHARI AMJAD": 0.40012418517678905
        },
        "LEITCHFIELD": {
          "ANGELES VICTOR": 0.41569411414365653
        },
        "OWENSBORO": {
          "CHITTURI SURESH": 0.30684786602906694,
          "SHAH SATISH": 0.5317980257030261,
          "COX RANDY": 0.36665847431600834,
          "MCCORMACK JEANIE": 0.41106961274001597
        },
        "SHEPHERDSVILLE": {
          "OROPILLA JOSEPH": 0.45555552402731364
        },
        "WINCHESTER": {
          "MOGILEVSKI ALEKSANDR": 0.387997349856431
        },
        "MADISONVILLE": {
          "MUFTI NAGHMA": 0.5061194442769976
        },
        "RICHMOND": {
          "LEE DANIEL": 0.491747059044855
        },
        "CRESTVIEW HILLS": {
          "WEBB JOHN": 0.336142728574047,
          "LI MAUREEN": 0.5245893336586269,
          "BROWN TY": 0.4225815695247466,
          "FARRELL JAMES": 0.3671330905419657,
          "RACKLEY ANGELA": 0.3797378621082184,
          "BECKER P. SCOTT": 0.5635608796039907,
          "KRISHNAN VINOD": 0.35788566275271655,
          "PERKINS JOHN": 0.5124281842534466
        },
        "LEXINGTON": {
          "ANDERSON GREGORY": 0.6066166188161944,
          "THOMPSON JAMES": 0.36502894046011425,
          "LANDFIELD ALEXANDER": 0.4009760462737843,
          "SHEFFIELD STEPHANIE": 0.531756757103248,
          "LEUNG PATRICK": 0.4783859169186431,
          "TWYMAN CARY": 0.5516424289465625,
          "SCHNEIDER ANDREW": 0.5304937470440649,
          "WINKLEY JAMES": 0.4925703124081358,
          "JICHA GREGORY": 0.343941232389016,
          "EICHHORN GERALD": 0.41526873947044557,
          "CHUMLEY WARREN": 0.4984013343796254,
          "PARKS GREGORY": 0.40189222357534604,
          "EVERMAN NICOLE": 0.4772223237087599,
          "ROBERTSON ELIZA": 0.45923460172558006,
          "SLEVIN JOHN": 0.43783133084464787,
          "KNOX CRAIG": 0.5375241759023103,
          "BLAKE DAVID": 0.6090119536673235,
          "COOPER GREGORY": 0.5241304166075744,
          "O'CONNELL JOHN": 0.4708631218213437
        },
        "ASHLAND": {
          "BAJOREK JOSEPH": 0.5432441714659689,
          "CASTRO WILMA": 0.32364279421349534,
          "BHASIN PRAMIT": 0.4955572060441801,
          "SMITH MELISSA": 0.5523504120676127,
          "DEITCH STEVEN": 0.38097369673041087
        },
        "DANVILLE": {
          "NIDHIRY DEEPA": 0.35777252920959945
        },
        "BOWLING GREEN": {
          "ZHU JIANHUA": 0.5548155230596552,
          "ZIA AMIR": 0.4791176747923596,
          "O'KEEFE DENNIS": 0.42520469251966087,
          "CHOU WESLEY": 0.4007770889805808,
          "IGBOKWE EME": 0.4221287655437888
        },
        "HAZARD": {
          "KRISHNASWAMY CHANDRASHEKAR": 0.4894052386202006
        },
        "PRESTONSBURG": {
          "OWENS JOSEPH": 0.40064183882889065
        },
        "ELIZABETHTOWN": {
          "GARCIA LOVEGILDO": 0.43181787326982646,
          "RELOJ NOEL": 0.4682219487242829,
          "SHOAIB MUHAMMAD": 0.42911061641053316
        },
        "MOREHEAD": {
          "MEHARI ENAWGAW": 0.49413507749085217
        },
        "MURRAY": {
          "COUCH JIMMY": 0.4615476694955157,
          "KING CHRISTOPHER": 0.5045115334776703
        },
        "PIKEVILLE": {
          "AHMED NAVEED": 0.5083707863425162,
          "GUTTI SUJATA": 0.4741013271158951
        },
        "MT STERLING": {
          "POLISETTY USHA": 0.37238322827424986
        },
        "CORBIN": {
          "ACOB ARDEN": 0.44162154078271465
        },
        "LOUISVILLE": {
          "TILLETT ROBERT": 0.5332158562658982,
          "HEINICKE HEDVIKA": 0.32429623290824866,
          "SHAH DISHA": 0.3201589869239359,
          "HARDWICK ANGELA": 0.4441996536001758,
          "ARAR GHIAS": 0.48006384755173553,
          "JOHNSON THOMAS": 0.3019830603845389,
          "MECKLER JASON": 0.4839642672676113,
          "VALLABHUNI MADHURI": 0.43380656803001455,
          "ALT MICHAEL": 0.5710053016542713,
          "FRANK JEFFREY": 0.45019887171255596,
          "LUO CAMERON": 0.4701059121255724,
          "BHUPALAM RUKMAIAH": 0.5436601263762952,
          "TALPUR NADEEM": 0.3890045247776347,
          "MECKLER ROY": 0.5702922890543365,
          "CORWIN HAL": 0.4963082777825131,
          "ALSOROGI MOHAMMAD": 0.5787929997392938,
          "WOODS REBEKAH": 0.4096331635444758,
          "SCOTT GEORGE": 0.4676921814776773,
          "FOX GARY": 0.5071081214410407,
          "PITTMAN GREGORY": 0.4165858274919726,
          "MCKIERNAN JAMES": 0.38783323669614694,
          "SEIFER FRED": 0.3791520453712431
        },
        "SOMERSET": {
          "PAVEZ MARIA": 0.5206915381780178,
          "SHOJAEI-MOGHAMMAD JALIL": 0.4956875672834014,
          "PATEL PIYUSH": 0.4055705044531201
        }
      }
    }
  }
}