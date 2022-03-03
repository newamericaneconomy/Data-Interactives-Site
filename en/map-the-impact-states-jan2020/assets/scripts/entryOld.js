'use strict';

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

var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };

var formatComma = d3.format(",")
var formatPercent = d3.format(",.2%")
var formatMoney = function(d) { return "$" + formatComma(d); }


var scroller1 = scrollama()
var container1 = d3.select('#container-scroll1');
var graphic1 = container1.select('.scroll__figure1');
var chart1 = graphic1.select('.figure__chart1');
var text1 = container1.select('.scroll__text1');
var step1 = text1.selectAll('.step1');

var scroller2= scrollama()
var container2 = d3.select('#container-scroll2');
var graphic2 = container2.select('.scroll__figure2');
var chart2 = graphic2.select('.figure__chart2');
var text2 = container2.select('.scroll__text2');
var step2 = text2.selectAll('.step2');


var scroller3= scrollama()
var container3 = d3.select('#container-scroll3');
var graphic3 = container3.select('.scroll__figure3');
var chart3 = graphic3.select('.figure__chart3');
var text3 = container3.select('.scroll__text3');
var step3 = text3.selectAll('.step3');

var scroller4= scrollama()
var container4 = d3.select('#container-scroll4');
var graphic4 = container4.select('.scroll__figure4');
var chart4 = graphic4.select('.figure__chart4');
var text4 = container4.select('.scroll__text4');
var step4 = text4.selectAll('.step4');



var svg= d3.select("svg")
  .attr("width", window.innerWidth)
  .attr('height', window.innerHeight*1.4),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// else {
// var svg= d3.select("svg")
//   .attr("width", window.innerWidth*.5)
//   .attr('height', window.innerHeight),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
//   }

    var svg2 = d3.select(".svg2")
      .append("svg")
      .attr("width", window.innerWidth)
      .attr('height', window.innerHeight),
        width2 = +svg2.attr("width"),
        height2 = +svg2.attr("height");

        var svgVote = d3.select(".svgVote")
          .append("svg")
          .attr("width", window.innerWidth)
          .attr('height', window.innerHeight),
            widthV = +svgVote.attr("width"),
            heightV = +svgVote.attr("height");


            var svgEd = d3.select(".svgEd")
              .append("svg")
              .attr("width", window.innerWidth)
              .attr('height', window.innerHeight),
                widthEd = +svgEd.attr("width"),
                heightEd = +svgEd.attr("height");





var resChange = d3.map();
var resTaxes = d3.map();
var resVote = d3.map();
var resEd = d3.map();

var path = d3.geoPath();
var path2 = d3.geoPath();
var pathV = d3.geoPath();
var pathEd = d3.geoPath();



var divTool = d3.select(".scroll__figure1").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")

    .style("z-index", 999);

    var divTool2 = d3.select(".scroll__figure2").append("div")
        .attr("class", "tooltip")
        // .style("opacity", 0)
        .style("background", "#fff")
        .style("position", "absolute")
        .style("z-index", 999);

        var divTool3 = d3.select(".scroll__figure3").append("div")
            .attr("class", "tooltip")
            // .style("opacity", 0)
            .style("background", "#fff")
            .style("position", "absolute")
            .style("z-index", 999);

            var divTool4 = d3.select(".scroll__figure4").append("div")
                .attr("class", "tooltip")
                // .style("opacity", 0)
                .style("background", "#fff")
                .style("position", "absolute")
                .style("z-index", 999);


var x = d3.scaleLinear()
    .domain([-60000,14000])
    .rangeRound([width*.125, width*.225]);

var xTax = d3.scaleLinear()
        .domain([0,100000000000])
        .rangeRound([width*.125, width*.4]);

var xV = d3.scaleLinear()
    .domain([0,1000000])
    .rangeRound([width*.125, width*.4]);

var xEd = d3.scaleLinear()
    .domain([.1,.28])
    .rangeRound([width*.125, width*.4]);


var color = d3.scaleThreshold()
    .domain([-60000, -50000, -40000, -30000, -20000, -10000,0,10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000])
    .range(["#F7594C", "#F87065", "#F9887F", "#FAA098", "#FBB7B2", "#FCCFCB", "#FDE7E5", "#F5F1F9", "#ECE3F3", "#E2D5ED", "#D9C7E7", "#CFB9E1", "#C6ABDB", "#BD9DD5", "#B38FCF", "#AA81C9", "#A073C3", "#9765BD", "#8D57B7", "#8449B1", "#7B3CAB"])


var color2 = d3.scaleThreshold()
        .domain([0, 5000000000, 10000000000, 15000000000, 20000000000, 25000000000,30000000000, 35000000000, 40000000000, 45000000000, 50000000000, 55000000000, 60000000000, 65000000000, 70000000000, 75000000000, 80000000000, 85000000000, 90000000000, 95000000000, 100000000000])
        .range(["#FFFFFF", "#F2FCF8", "#E6FAF1", "#D9F7EB", "#CDF5E4", "#C0F2DE", "#B4F0D7", "#A7EDD1", "#9BEBCA", "#8EE8C4", "#82E6BD", "#75E4B6", "#69E1B0", "#5CDFA9", "#50DCA3", "#43DA9C", "#36D796", "#2AD58F", "#1DD289", "#11D082", "#05CE7C"])

var colorV = d3.scaleThreshold()
        .domain([0, 50000, 100000, 150000, 200000,250000, 300000, 350000, 400000, 450000, 500000,550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000])
        .range([ "#F7F7FE", "#EFEFFD", "#E7E7FC", "#DFDFFC", "#D7D8FB", "#CFD0FA", "#C8C8FA", "#C0C0F9", "#B8B8F8", "#B0B1F8", "#A8A9F7", "#A0A1F6", "#9899F5", "#9191F5", "#898AF4", "#8182F3", "#797AF3", "#7172F2", "#696AF1", "#6263F1"])

var colorEd = d3.scaleThreshold()
        .domain([.1, .11, .12, .13, .14, .15, .16, .17, .18, .19, .20, .21, .22, .23, .24, .25, .26, .27, .28])
        .range(["ffffff","#FFF9FC", "#FFF4F9", "#FFEEF6", "#FFE9F4", "#FFE3F1", "#FFDEEE", "#FFD8EB", "#FFD3E9", "#FFCEE6", "#FFC8E3", "#FFC3E1", "#FFBDDE", "#FFB8DB", "#FFB2D8", "#FFADD6", "#FFA7D3", "#FFA2D0", "#FF9DCE"])


var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,"+height*.5+")");

    var g2 = svg2.append("g")
            .attr("class", "key2")
            .attr("transform", "translate(0,"+height2*.7+")");

  var gV = svgVote.append("g")
      .attr("class", "keyV")
      .attr("transform", "translate(0,"+heightV*.7+")");

      var gEd = svgEd.append("g")
          .attr("class", "keyEd")
          .attr("transform", "translate(0,"+heightEd*.7+")");




g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 12)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -7)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Change in # of Resident Immigrants");



g.call(d3.axisBottom(x)
    .tickSize(15)
    .tickFormat(function(x, i) { if (x==-60000) {return "-60K"} else if(x==0) {return "0"} else if(x==140000) {return "140K"};})
    .tickValues(color.domain()))
    .select(".domain")
    .attr('class',"ticks")
    .remove();



    g2.selectAll("rect")
            .data(color2.range().map(function(d) {
                d = color2.invertExtent(d);
                if (d[0] == null) d[0] = xTax.domain()[0];
                if (d[1] == null) d[1] = xTax.domain()[1];
                return d;
              }))
            .enter().append("rect")
              .attr("height", 12)
              .attr("x", function(d) { return xTax(d[0]); })
              .attr("width", function(d) { return xTax(d[1]) - xTax(d[0]); })
              .attr("fill", function(d) { return color2(d[0]); });

    g2.append("text")
              .attr("class", "caption2")
              .attr("x", xTax.range()[0])
              .attr("y", -6)
              .attr("fill", "#000")
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text("Immigrant Taxes Paid");

    g2.call(d3.axisBottom(xTax)
          .tickSize(15)
          // .tickFormat(function(x, i) { if (x==0|x==50000000000|x==100000000000) return (i ? x : x);})
          .tickFormat(function(x, i) { if (x==0) {return "$0"} else if(x==50000000000) {return "$50 billion"} else if(x==100000000000) {return "$100 billion"};})
          .tickValues(color2.domain()))
          .select(".domain")
          .attr('class',"ticks")
          .remove();


          gV.selectAll("rect")
            .data(colorV.range().map(function(d) {
                d = colorV.invertExtent(d);
                if (d[0] == null) d[0] = xV.domain()[0];
                if (d[1] == null) d[1] = xV.domain()[1];
                return d;
              }))
            .enter().append("rect")
              .attr("height", 12)
              .attr("x", function(d) { return xV(d[0]); })
              .attr("width", function(d) { return xV(d[1]) - xV(d[0]); })
              .attr("fill", function(d) { return colorV(d[0]); });

          gV.append("text")
              .attr("class", "caption")
              .attr("x", xV.range()[0])
              .attr("y", -6)
              .attr("fill", "#000")
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text("Immigrant Eligible Voters");



          gV.call(d3.axisBottom(xV)
              .tickSize(15)
              .tickFormat(function(x, i) { if (x==0) {return "0"} else if(x==1000000) {return "over one million"};})
              .tickValues(colorV.domain()))
              .select(".domain")
              .attr('class',"ticks")
              .remove();


              gEd.selectAll("rect")
                .data(colorEd.range().map(function(d) {
                    d = colorEd.invertExtent(d);
                    if (d[0] == null) d[0] = xEd.domain()[0];
                    if (d[1] == null) d[1] = xEd.domain()[1];
                    return d;
                  }))
                .enter().append("rect")
                  .attr("height", 12)
                  .attr("x", function(d) { return xEd(d[0]); })
                  .attr("width", function(d) { return xEd(d[1]) - xEd(d[0]); })
                  .attr("fill", function(d) { return colorEd(d[0]); });

              gEd.append("text")
                  .attr("class", "caption")
                  .attr("x", xEd.range()[0])
                  .attr("y", -6)
                  .attr("fill", "#000")
                  .attr("text-anchor", "start")
                  .attr("font-weight", "bold")
                  .text("Share of Immigrants with College Degree");



              gEd.call(d3.axisBottom(xEd)
                  .tickSize(15)
                  .tickFormat(function(x, i) { if (x==.1) {return "10%"} else if(x==.28) {return "28%"};})
                  .tickValues(colorEd.domain()))
                  .select(".domain")
                  .attr('class',"ticks")
                  .remove();






var promises = [
  d3.json("https://d3js.org/us-10m.v1.json"),
  d3.csv("assets/mapNAE_Data_2017.csv", function(d) {
    resChange.set(d.Code, +d.residentChange);
    resTaxes.set(d.Code, +d.ImmTaxPaid)
    resVote.set(d.Code, +d.ImmigrantVote)
    resEd.set(d.Code, +d.BachelorDegreeNum)
    })
]



// var promises = [
//   d3.json("https://d3js.org/us-10m.v1.json"),
//   d3.tsv("us-state-names.tsv", function(d) {
//     stateNames.set(d.id, d.name)
//   }),
//   d3.tsv("map.tsv", function(d) {
//     console.log("d in map", d);
//     unemployment.set(d.name, +d.value);
//   })
// ]

Promise.all(promises).then(ready)

function ready([us]) {

  var projection = d3.geoIdentity()
          .fitSize([width,height],[us]);


          var projection2 = d3.geoIdentity()
                  .fitSize([width2,height2],[us]);


  function scale (scaleFactor,width,height) {
            return d3.geoTransform({
                point: function(x, y) {
                    this.stream.point( (x - width/4) * scaleFactor + width/4 , (y - height/3) * scaleFactor + height/3);
                }
            });
            }

function scale2 (scaleFactor,width2,height2) {
                      return d3.geoTransform({
                          point: function(x, y) {
                              this.stream.point( (x - width/4) * scaleFactor + width/10 , (y - height/3) * scaleFactor + height/3);
                          }
                      });
                      }

  function scale2 (scaleFactor,width2,height2) {
              return d3.geoTransform({
              point: function(x, y) {
              this.stream.point( (x - width/4) * scaleFactor + width/10 , (y - height/3) * scaleFactor + height/3);
                      }
                            });
                            }


//IMPORTANT I CAN ADJUST SCALE BELOW!!!!

if (window.innerWidth>450) {
  path = d3.geoPath().projection(scale(.6,width,height))
}

else  {
  path = d3.geoPath().projection(scale(.3,width,height))
}

  function readyPopChange(){


  svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
        return color(d.rChange = (resChange.get(d.id)));
        })
      .attr("d", path)
    .on("mouseover", handleMouseOverTool)
    .on("mouseout", handleMouseOutTool);
    ;


      // .text(function(d) { return formatComma(d.rChange); })


      //IDEA


  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);


}

readyPopChange()

function readyTaxes() {



  // function scale2 (scaleFactor,width2,height2) {
  //           return d3.geoTransform({
  //               point: function(xTax, y) {
  //                   this.stream.point( (xTax - width/4) * scaleFactor + width/4 , (y - height/3) * scaleFactor + height/3);
  //               }
  //           });
  //           }


//IMPORTANT I CAN ADJUST SCALE BELOW!!!!

    // var path2 = d3.geoPath().projection(scale2(.6,width2,height2))


  svg2.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
        return color2(d.rTax = (resTaxes.get(d.id)));
        })
      .attr("d", path)
      .attr('z-index', 1)
      .on("mouseover", handleMouseOverTool2)
      .on("mouseout", handleMouseOutTool);


  svg2.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);


}


function readyVote() {


  svgVote.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
        return colorV(d.rVote = (resVote.get(d.id)));
        })
      .attr("d", path)
      .on("mouseover", handleMouseOverTool3)
      .on("mouseout", handleMouseOutTool);;


  svgVote.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);


}

function readyEd() {


  svgEd.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
        return colorEd(d.rEd = (resEd.get(d.id)));
        })
      .attr("d", path)
      .on("mouseover", handleMouseOverTool4)
      .on("mouseout", handleMouseOutTool);;


  svgEd.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);


}


function handleMouseOverTool(d) {

            var xMouse2 = d3.mouse(this)[0]+ width*.2
            var yMouse2 = d3.mouse(this)[1]- height*.1

             divTool.html(function() {return "<p>Population change: <b>"+formatComma(d.rChange)+"</b></p>"})

            	// .style("left", .67*widthScreen2 + "px")
              .style("left", xMouse2 + "px")
            	// .style('top', .05*heightScreen + "px")
            	.style("top", yMouse2 + "px")
            	.style("visibility", 'visible')
              .attr("class", "tooltip2")

            	.attr("id", function() {return "county" + d.id});
          }

          function handleMouseOverTool2(d) {
                      var xMouse3 = d3.mouse(this)[0]
                      var yMouse3 = d3.mouse(this)[1]- height*.05

                       divTool2.html(function() {return "<p>Immigrant taxes paid: <b>"+formatMoney(d.rTax)+"</b></p>"})
                      	// .style("left", .67*widthScreen2 + "px")
                        .style("left", xMouse3 + "px")
                      	// .style('top', .05*heightScreen + "px")
                      	.style("top", yMouse3 + "px")
                      	.style("visibility", 'visible')
                      	.attr("class", "tooltip3")
                      	.attr("id", function() {return "county" + d.id});
                    }


                    function handleMouseOverTool3(d) {
                                var xMouse4 = d3.mouse(this)[0]+ width*.2
                                var yMouse4 = d3.mouse(this)[1]- height*.1

                                 divTool3.html(function() {return "<p>Immigrant voters: <b>"+formatComma(d.rVote)+"</b></p>"})
                                	// .style("left", .67*widthScreen2 + "px")
                                  .style("left", xMouse4 + "px")
                                	// .style('top', .05*heightScreen + "px")
                                	.style("top", yMouse4 + "px")
                                	.style("visibility", 'visible')
                                	.attr("class", "tooltip4")
                                	.attr("id", function() {return "county" + d.id});
                              }

                              function handleMouseOverTool4(d) {
                                          var xMouse5 = d3.mouse(this)[0]
                                          var yMouse5 = d3.mouse(this)[1] - height*.05

                                           divTool4.html(function() {return "<p>Immigrants with Bachelors or higher: <b>"+formatPercent(d.rEd)+"</b></p>"})
                                          	// .style("left", .67*widthScreen2 + "px")
                                            .style("left", xMouse5 + "px")
                                          	// .style('top', .05*heightScreen + "px")
                                          	.style("top", yMouse5 + "px")
                                          	.style("visibility", 'visible')
                                          	.attr("class", "tooltip5")
                                          	.attr("id", function() {return "county" + d.id});
                                        }

  function handleMouseOutTool(d) {

            d3.select(".tooltip2").style("visibility", 'hidden');
            d3.select(".tooltip3").style("visibility", 'hidden');
              d3.select(".tooltip4").style("visibility", 'hidden');
                d3.select(".tooltip5").style("visibility", 'hidden');


          }



//2
function handleResize2() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight*.75);
	step1.style('height', stepHeight2 + 'px');
  step2.style('height', stepHeight2 + 'px');
  step3.style('height', stepHeight2 + 'px');
  step4.style('height', stepHeight2 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;
  var bodyWidth2 = d3.select('body').node().offsetWidth;
  var bodyWidth3 = d3.select('body').node().offsetWidth;
  var bodyWidth4 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
  graphic2.style('width', bodyWidth2 + 'px').style('height', window.innerHeight + 'px');
  graphic3.style('width', bodyWidth3 + 'px').style('height', window.innerHeight + 'px');
  graphic4.style('width', bodyWidth4 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 12;
  var chartMargin2 = 12;
  var chartMargin3 = 12;
  var chartMargin4 = 12;

	var textWidth1 = text1.node().offsetWidth;
  var textWidth2 = text2.node().offsetWidth;
  var textWidth3 = text2.node().offsetWidth;
  var textWidth4 = text4.node().offsetWidth;

	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;
  var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;
  var chartWidth3 = graphic3.node().offsetWidth - textWidth3 - chartMargin3;
  var chartWidth4 = graphic4.node().offsetWidth - textWidth4 - chartMargin4;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();

  //CHANGE HERE
  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller2.resize();

  chart3.style('width', chartWidth3 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller3.resize();

  chart4.style('width', chartWidth4 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller4.resize();


}
// scrollama event handlers





function handleStepEnter2(response) {

	step1.classed('is-active', function (d, j) {
		return j === response.index;
	});

  step2.classed('is-active', function (d, j) {
		return j === response.index;
	});

  step3.classed('is-active', function (d, j) {
		return j === response.index;
	});

  step4.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart1.select('p').text(response.index + 1);
  chart2.select('p').text(response.index + 1);
  chart3.select('p').text(response.index + 1);
  chart4.select('p').text(response.index + 1);
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// // update graphic1 based on step 1
	if (step1._groups[0][0].className === 'step1 is-active') {
		readyPopChange();

	}

	// // update graphic1 based on step 2
	if (step2._groups[0][0].className === 'step2 is-active') {
		readyTaxes()


	}

  if (step3._groups[0][0].className === 'step3 is-active') {
		readyVote()


	}

  if (step4._groups[0][0].className === 'step4 is-active') {
		readyEd()


	}

	// // update graphic1 based on step 3
	// if (step1._groups[0][2].className === 'step1 is-active') {
	// 	changeAgain()
  //
	// }
  //
	// // Step 4
	// if (step1._groups[0][3].className === 'step1 is-active') {
	// 	changeAgainAgain()
  //
	// }
  //
	// //Step5
  //
	// if (step1._groups[0][4].className === 'step1 is-active') {
	// 	// changeAgainAgain()
  //   nonMetroFuncSmall()
  //   changeEnd()
	// }

  // if (step1._groups[0][5].className === 'step1 is-active') {
  //   changeEnd()
  // }

}

function handleContainerEnter2(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);

  graphic2.classed('is-fixed', true);
	graphic2.classed('is-bottom', false);

  graphic3.classed('is-fixed', true);
	graphic3.classed('is-bottom', false);

  graphic4.classed('is-fixed', true);
	graphic4.classed('is-bottom', false);
}

function handleContainerExit2(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');

  graphic2.classed('is-fixed', false);
	graphic2.classed('is-bottom', response.direction === 'down');

  graphic3.classed('is-fixed', false);
	graphic3.classed('is-bottom', response.direction === 'down');

  graphic4.classed('is-fixed', false);
	graphic4.classed('is-bottom', response.direction === 'down');
}

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama

	scroller1.setup({
		// container: '#flipped-scroll',
		// graphic: '.scroll__figure2',
		// text: '.scroll__text2',
		step: '.scroll__text1 .step1',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller2.setup({
		// container: '#flipped-scroll',
		// graphic2: '.scroll__figure2',
		// text: '.scroll__text2',
		step: '.scroll__text2 .step2',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);


scroller3.setup({
  // container: '#flipped-scroll',
  // graphic2: '.scroll__figure2',
  // text: '.scroll__text2',
  step: '.scroll__text3 .step3',
  offset: 0.75,
  debug: false
}).onStepEnter(handleStepEnter2)
// .OnStepExit(handleStepExit2)
.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

scroller4.setup({
  // container: '#flipped-scroll',
  // graphic2: '.scroll__figure2',
  // text: '.scroll__text2',
  step: '.scroll__text4 .step4',
  offset: 0.75,
  debug: false
}).onStepEnter(handleStepEnter2)
// .OnStepExit(handleStepExit2)
.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);


}

init();

}
// 	// // update graphic1 based on step 3
// 	if (step2._groups[0][2].className === 'step2 is-active') {
// 		svg2.selectAll('circle')
// 			.attr("fill", function(d) {
// 				if ((d.make_hash === "1" || d.make_hash === "2") && d.party === "D") {
// 			        return "url(#hashDem)";
// 			      } else if ((d.make_hash === "1" || d.make_hash === "2") && d.party === "R") {
// 			        return "url(#hashRep";
// 			      } else if ((d.make_hash !== "1" || d.make_hash !== "2") && d.party === "D") {
// 			      	return "#2873ed";
// 			      } else if ((d.make_hash !== "1" || d.make_hash !== "2") && d.party === "R") {
// 			      	return "#ed2828";
// 			      }
// 		});
//
// 		svg2.selectAll("g.yearLegend").remove();
//
// 		yearLegend = svg2.append('g')
// 	    	.attr('transform', 'translate(' + 20 + ',' + margin/2 +')')
// 	    	.attr('class', 'yearLegend');
//
// 	    yearLegend.append('text')
// 	    	.text("2024")
// 	    	.attr('y', "16px");
//
// 	}
//
// 	// Step 4
// 	if (step2._groups[0][3].className === 'step2 is-active') {
//
// 		simulation
//             .force('x', centerXForce)
//             .force('y', centerYForce);
//
//             simulation.alpha(1).restart();
//
//         svg2.selectAll("g.clustLabels").remove();
//
//         if (width > 800) {
// 	        var clustLabels = svg2.append('g')
// 		    	.attr('transform', 'translate(' + width/11.5 + ',' + height/10 +')')
// 		    	.attr('class', 'clustLabels');
//
// 		    clustLabels.append('text')
// 		    	.text("Foreign Born Electorate Grew")
// 		    	.attr('y', "16px")
// 		    	.style('fill', 'rgb(118, 118, 118');
//
// 		    clustLabels.append('text')
// 		    	.text("Foreign Born Electorate")
// 		    	.attr('transform', 'translate(' + width/4 + ',' + margin*0.8 +')')
// 		    	.attr('y', "16px")
// 		    	.style('fill', 'rgb(118, 118, 118');
//
// 		    clustLabels.append('text')
// 		    	.text("Did Not Grow")
// 		    	.attr('transform', 'translate(' + width/3.75 + ',' + margin*1.2 +')')
// 		    	.attr('y', "16px")
// 		    	.style('fill', 'rgb(118, 118, 118');
// 		} else {
// 			var clustLabels = svg2.append('g')
// 		    	.attr('transform', 'translate(' + width/8 + ',' + height/10 +')')
// 		    	.attr('class', 'clustLabels')
// 		    	.style('fill', 'rgb(118, 118, 118');
//
// 		    clustLabels.append('text')
// 		    	.text("Foreign Born Electorate Grew")
// 		    	.attr('y', "16px")
// 		    	.style('fill', 'rgb(118, 118, 118');
//
// 		    clustLabels.append('text')
// 		    	.text("Foreign Born Electorate")
// 		    	.attr('transform', 'translate(' + width/2.5 + ',' + margin*0.8 +')')
// 		    	.attr('y', "16px")
// 		    	.style('fill', 'rgb(118, 118, 118');
//
// 		    clustLabels.append('text')
// 		    	.text("Did Not Grow")
// 		    	.attr('transform', 'translate(' + width/2.5 + ',' + margin*1.1 +')')
// 		    	.attr('y', "16px")
// 		    	.style('fill', 'rgb(118, 118, 118');
// 		}
//
// 	}
//
// 		// clustStart("simulation.alpha(1).restart();");
// 		// simulation
//   //           .force('x', centerXForce)
//   //           .force('y', centerYForce);
//
// }
//
// function handleContainerEnter2(response) {
// 	// response = { direction }
//
// 	// sticky the graphic (old school)
// 	graphic.classed('is-fixed', true);
// 	graphic.classed('is-bottom', false);
// }
//
// function handleContainerExit2(response) {
// 	// response = { direction }
//
// 	// un-sticky the graphic, and pin to top/bottom of container
// 	graphic.classed('is-fixed', false);
// 	graphic.classed('is-bottom', response.direction === 'down');
// }
//
// function init() {
// 	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
//
// 	scroller2.setup({
// 		// container: '#flipped-scroll',
// 		// graphic: '.scroll__figure2',
// 		// text: '.scroll__text2',
// 		step: '.scroll__text2 .step2',
// 		offset: 0.75,
// 		debug: false
// 	}).onStepEnter(handleStepEnter2)
// 	// .OnStepExit(handleStepExit2)
// 	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);
// }
//
// // kick things off
// init();
// }
