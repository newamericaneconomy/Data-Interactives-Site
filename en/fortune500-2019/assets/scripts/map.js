"use strict";
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var width = window.innerWidth,
    height = window.innerHeight;

var centered;

var inputValue = 2018;
var time = ["2018", "2020", "2022", "2024"];

var color = d3.scaleThreshold().range(["#21d279"]).domain([0]);

var colorFB = d3.scaleThreshold().range(["#80ff00"]).domain([0]);

var colorDem = d3.scaleThreshold().range(["#2873ed"]).domain([0]);

var colorRep = d3.scaleThreshold().range(["#ed2828"]).domain([0]);

var svg = d3.select(".scroll__figure").append("svg");

var tooltip = d3.select(".scroll__figure").append("div").attr("class", "tooltip").style("background", "#f8f8f8").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");

var projection = d3.geoAlbersUsa();
var albersPath = d3.geoPath().projection(projection);

svg.append("rect")
  .attr("class", "background")
  .attr("width", "100%")
  .attr("height", "100%")
  .on("click", clicked);

var defs = svg.append("defs")

// Republican Hash
var pattern = defs.append("pattern")
          .attr("id", "hashRep")
          .attr("width", "0.1")
          .attr("height", "8")
          .attr("patternUnits", "userSpaceOnUse")
          .attr("patternTransform", "rotate(135)");
    pattern.append("rect")
          .attr("width", "10")
          .attr("height", "10")
          .attr("fill", "#ed2828");
    pattern.append("path")
      .attr("d", "M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5")
      .attr("stroke-width", "4")
      .attr("stroke", "rgba(255,255,255,0.8)")
      .attr("stroke-linecap", "square");

//Democrat Hash
var pattern = defs.append("pattern")
          .attr("id", "hashDem")
          .attr("width", "0.1")
          .attr("height", "8")
          .attr("patternUnits", "userSpaceOnUse")
          .attr("patternTransform", "rotate(135)");
    pattern.append("rect")
          .attr("width", "10")
          .attr("height", "10")
          .attr("fill", "#2873ed");
    pattern.append("path")
      .attr("d", "M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5")
      .attr("stroke-width", "4")
      .attr("stroke", "rgba(255,255,255,0.8)")
      .attr("stroke-linecap", "square");

var g2;

if (width > 800) {
  g2 = svg.append('g').attr('id', 'map').attr('transform', "translate(0, 0) scale(" + width / 1638 + ") ");
} else {
  g2 = svg.append('g').attr('id', 'map').attr('transform', "translate(0, 0) scale(" + width / 1000 + ") ");
}

var g;

if (width > 800) {
  g = svg.append('g').attr('id', 'map').attr('transform', "translate(0, 0) scale(" + width / 1638 + ") ");
} else {
  g = svg.append('g').attr('id', 'map').attr('transform', "translate(0, 0) scale(" + width / 1000 + ") ");
}


function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = albersPath.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;

    if (k === 4) {
      var rangeSlider = document.getElementsByClassName("range");
      for (var i = 0; i < rangeSlider.length; i++) {
        rangeSlider[i].style.zIndex = -1;
      }

      var rangeLabels = document.getElementsByClassName("range-labels");
      for (var i = 0; i < rangeLabels.length; i++) {
        rangeLabels[i].style.zIndex = -2;
      }
    }
  } else {
    x = 0;
    y = 0;
    k = width / 1638;
    centered = null;

    if (k === width / 1638) {
      var rangeSlider = document.getElementsByClassName("range");
      for (var i = 0; i < rangeSlider.length; i++) {
        rangeSlider[i].style.zIndex = 2;
      }

      var rangeLabels = document.getElementsByClassName("range-labels");
      for (var i = 0; i < rangeLabels.length; i++) {
        rangeLabels[i].style.zIndex = 1;
      }
    }
  }

  g.selectAll("path").classed("active", centered && function (d) {
    return d === centered;
  });

  g.transition().duration(750).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");

  g2.transition().duration(750).attr("transform", "translate(" + x + "," + y + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");
}

d3.json("https://gist.githubusercontent.com/krwarner/22fcb2851ab45817df95f33ab0619b7e/raw/c7df13bf69e41e9f2a96f387248528a6bd0e8cb6/cb_2017_us_state_20m.json").then(
        function bgMap(stateTopo) {
          g2.selectAll("path")
            .data(topojson.feature(stateTopo, stateTopo.objects.cb_2017_us_state_20m).features)
            .enter()
            .append("path")
            .attr("class", 'cd-path')
            .attr("d", albersPath)
            .style("fill", "#f4f4f4")
            .style("stroke", "#595959")
            .style("stroke-width", "0.25px");
        });

var movData = d3.csv("https://gist.githubusercontent.com/krwarner/b1e1358cfb016cdce5b3b9e2633b8d48/raw/1c1cc21107e8635bb8ba2129756c3b84d8ec9af3/fb_mov_data_years.csv");
var topoData = d3.json("https://gist.githubusercontent.com/krwarner/ba149b4ed187b80cce4b9aad2135ddae/raw/8d564df8079729c819781819a084c9a1587dc434/congress_topo.json");

Promise.all([movData, topoData]).then(ready);

function ready(data) {
  // var dataStep = document.getElementsByClassNames("step");
  // for (var i = 0; i < dataStep.length; i++) {
  //             if (d3.select(dataStep[i]).attr("data-step") == 1) 
  //         }

  // console.log(mov_vs_fb20);
  var mov_vs_fb = data['0'];
  var congressTopo = data['1'];

  // console.log("Still Working...");

  var mov_vs_fbByDist18 = {};
  var mov_vs_fbByDist20 = {};
  var mov_vs_fbByDist22 = {};
  var mov_vs_fbByDist24 = {};

  mov_vs_fb.forEach(function (d) {
    d.mov_vs_FB = +d.mov_vs_FB;
    d.mov_2016 = +d.mov_2016;
    d.party = d.party;
    d.pct_change16_20 = +d.pct_change16_20;
    d.poe_2018 = +d.poe_2018;
    d.year = +d.year;
    if (d.year == 2018) {
      mov_vs_fbByDist18[d.GEOID] = d;
    } else if (d.year == 2020) {
      mov_vs_fbByDist20[d.GEOID] = d;
    } else if (d.year == 2022) {
      mov_vs_fbByDist22[d.GEOID] = d;
    } else if (d.year == 2024) {
      mov_vs_fbByDist24[d.GEOID] = d;
    }
  });

  var format = d3.format(".2%");
  var commas = d3.format(",");

  // console.log("Even now, still working");

  var subset = topojson.feature(congressTopo, congressTopo.objects.congress).features.filter(function(d) {
      return d.id in (mov_vs_fbByDist18);
    });

  g.selectAll("path")
    .data(subset)
    .enter().append("path")
    .attr("class", 'cd-path')
    .attr('d', albersPath)
    .style("fill", initialState)
    .style("stroke", "rgba(0,0,0,0)")
    .on("click", clicked)
    .on("mouseover", function (d) {
      if (d.id in mov_vs_fbByDist18) {
        var val = mov_vs_fbByDist18[d.id];
        var fill_color = color(val["poe_2018"]);
        tooltip.html("");
        tooltip.style("visibility", "visible").style("border", "4px solid " + fill_color).zIndex = 100;

        tooltip.append("h3").style("color", "black").text(val.geolabel);

        tooltip.append("div").style("color", "black").text("Margin of Victory 2016: " + commas(val["mov_2016"]));
        tooltip.append("div").style("color", "black").text("Margin of Victory Compared to Foreign Born Growth: " + commas(val["mov_vs_FB"]));
        tooltip.append("div").style("color", "black").text("Foreign Born Percentage of Electorate 2018: " + format(val["poe_2018"]));
      }
    })
    .on("mousemove", function () {
      return tooltip.style("top", 0 + "px").style("left", 0 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
    });

  // console.log("Yup, working");

  // when the input range changes update the rectangle 

  //  var stepSlide = step._groups[0][1].className;

  //  console.log(stepSlide === "step is-active");

  // if (stepSlide === "step is-active") {
  //        d3.select('#timeslide')._groups[0][0].value = "3";
  //        console.log(d3.select('#timeslide')._groups[0][0].value = "3");
  //        d3.select("#timeslide").on("input", function() {
  //            update(+this.value);
  //        });
  // } else {

  d3.select("#timeslide").on("input", function () {
    update(+this.value);
  });
  // }

  function update(value) {
    document.getElementById("range").innerHTML = time[value];
    inputValue = time[value];

    g.selectAll("path.cd-path")
      .style("fill", function (d) {
        return timeMatch(d);
      });
  }

  // g.append("text")
  //   .style("font-weight", "bold")
  //   .attr("x", width - 430)
  //   .attr("y", height - 250)
  //   .attr("class", "leg")
  //   .text("Margin of Victory vs");
  // g.append("text")
  //   .style("font-weight", "bold")
  //   .attr("x", width - 430)
  //   .attr("y", height - 232)
  //   .attr("class", "leg")
  //   .text("Foreign Born Growth");

  // var legend1 = g.selectAll(".legend")
  //   .data(colorDem.domain().reverse())
  //   .enter().append("g")
  //   .attr("class", "leg")
  //   .attr("transform", function(d,i) {
  //     return "translate(" + (width-410) + "," + (height - 224 + 16 * i) + ")";
  //   });

  // legend1.append("rect")
  //   .attr("class", "leg")
  //   .attr("width", 10)
  //   .attr("height", 10)
  //   .style("fill", function(d) {
  //     return colorDem(d);
  //   });

  // legend1.append("text")
  // .attr("class", "leg")
  //   .attr("x", 16)
  //   .attr("y", 9)
  //   .style("font-size", "10px")
  //   .text(function(d) {
  //     return commas(d);
  //   });

  // var legend2 = g.selectAll(".legend")
  // .data(colorRep.domain().reverse())
  // .enter().append("g")
  // .attr("class", "leg")
  // .attr("transform", function(d,i) {
  //   return "translate(" + (width-425) + "," + (height - 224 + 16 * i) + ")";
  // });

  // legend2.append("rect")
  //   .attr("class", "leg")
  //   .attr("width", 10)
  //   .attr("height", 10)
  //   .style("fill", function(d) {
  //     return colorRep(d);
  //   });

  // var legend3 = g.selectAll(".legend")
  //   .data(colorFB.domain().reverse())
  //   .enter().append("g")
  //   .attr("class", "leg")
  //   .attr("transform", function(d,i) {
  //     return "translate(" + (width-350) + "," + (height - 224 + 16 * i) + ")";
  //   });

  // legend3.append("rect")
  //   .attr("class", "leg")
  //   .attr("width", 10)
  //   .attr("height", 10)
  //   .style("fill", function(d) {
  //     return colorFB(d);
  //   });

  // legend3.append("text")
  //   .attr("class", "leg")
  //   .attr("x", 16)
  //   .attr("y", 9)
  //   .style("font-size", "10px")
  //   .text(function(d) {
  //     return commas(d);
  //   });

  function use_data(d) {
    if (inputValue == "2018") {
      return mov_vs_fbByDist18[d.id];
    } else if (inputValue == "2020") {
      return mov_vs_fbByDist20[d.id];
    } else if (inputValue == "2022") {
      return mov_vs_fbByDist22[d.id];
    } else if (inputValue == "2024") {
      return mov_vs_fbByDist24[d.id];
    }
  }

  function timeMatch(d) {
    if (inputValue == "2018") {
      if (d.id in mov_vs_fbByDist18) {
        var blue_val = mov_vs_fbByDist18[d.id];
        var red_val = mov_vs_fbByDist18[d.id];
        if (mov_vs_fbByDist18[d.id]["party"] == "R" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] > 0) {
          return colorRep(red_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist18[d.id]["party"] == "D" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] > 0) {
          return colorDem(blue_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist18[d.id]["party"] == "R" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashRep)";
        } else if (mov_vs_fbByDist18[d.id]["party"] == "D" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashDem)";
        } 
      } else {
        return "#2873ed";
      }
    } else if (inputValue == "2020") {
      if (d.id in mov_vs_fbByDist20) {
        var blue_val = mov_vs_fbByDist20[d.id];
        var red_val = mov_vs_fbByDist20[d.id];
        if (mov_vs_fbByDist20[d.id]["party"] == "R" && mov_vs_fbByDist20[d.id]["mov_vs_FB"] > 0) {
          return colorRep(red_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist20[d.id]["party"] == "D" && mov_vs_fbByDist20[d.id]["mov_vs_FB"] > 0) {
          return colorDem(blue_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist20[d.id]["party"] == "R" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashRep)";
        } else if (mov_vs_fbByDist20[d.id]["party"] == "D" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashDem)";
        } 
      } else {
        return "#2873ed";
      }
    } else if (inputValue == "2022") {
      if (d.id in mov_vs_fbByDist22) {
        var blue_val = mov_vs_fbByDist22[d.id];
        var red_val = mov_vs_fbByDist22[d.id];
        if (mov_vs_fbByDist22[d.id]["party"] == "R" && mov_vs_fbByDist22[d.id]["mov_vs_FB"] > 0) {
          return colorRep(red_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist22[d.id]["party"] == "D" && mov_vs_fbByDist22[d.id]["mov_vs_FB"] > 0) {
          return colorDem(blue_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist22[d.id]["party"] == "R" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashRep)";
        } else if (mov_vs_fbByDist22[d.id]["party"] == "D" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashDem)";
        } 
      } else {
        return "#2873ed";
      }
    } else {
      if (d.id in mov_vs_fbByDist24) {
        var blue_val = mov_vs_fbByDist24[d.id];
        var red_val = mov_vs_fbByDist24[d.id];
        if (mov_vs_fbByDist24[d.id]["party"] == "R" && mov_vs_fbByDist24[d.id]["mov_vs_FB"] > 0) {
          return colorRep(red_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist24[d.id]["party"] == "D" && mov_vs_fbByDist24[d.id]["mov_vs_FB"] > 0) {
          return colorDem(blue_val["mov_vs_FB"]);
        } else if (mov_vs_fbByDist24[d.id]["party"] == "R" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashRep)";
        } else if (mov_vs_fbByDist24[d.id]["party"] == "D" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashDem)";
        } 
      } else {
        return "#2873ed";
      }
    }
  }

  function initialState(d) {

    if (document.getElementById("range").innerHTML == 2018) {
      g.selectAll("path.cd-path").style("fill", function(d) {
        if (d.id in mov_vs_fbByDist18) {
          var blue_val = mov_vs_fbByDist18[d.id];
          var red_val = mov_vs_fbByDist18[d.id];
          if (mov_vs_fbByDist18[d.id]["party"] == "R" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] > 0) {
            return colorRep(red_val["mov_vs_FB"]);
          } else if (mov_vs_fbByDist18[d.id]["party"] == "D" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] > 0) {
            return colorDem(blue_val["mov_vs_FB"]);
          } else if (mov_vs_fbByDist18[d.id]["party"] == "R" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashRep)";
          } else if (mov_vs_fbByDist18[d.id]["party"] == "D" && mov_vs_fbByDist18[d.id]["mov_vs_FB"] <= 0) {
            return "url(#hashDem)";
          } else {
            return colorDem(blue_val["mov_vs_FB"]);
          }
        } else {
          return colorDem(blue_val["mov_vs_FB"]);
        }
      });
    } else {
      return colorDem(blue_val["mov_vs_FB"]);
    }
  }
}