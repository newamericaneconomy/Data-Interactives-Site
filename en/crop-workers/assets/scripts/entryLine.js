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

// $(function () {
//   $(document).scroll(function () {
//     var $nav = $(".firstNav");
//     $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
//   });
// });

var scroller1 = scrollama()
var container1 = d3.select('#container-scroll1');
var graphic1 = container1.select('.scroll__figure1');
var chart1 = graphic1.select('.figure__chart1');
var text1 = container1.select('.scroll__text1');
var step1 = text1.selectAll('.step1');

var scroller2 = scrollama()
var container2 = d3.select('#container-scroll2');
var graphic2 = container2.select('.scroll__figure2');
var chart2 = graphic2.select('.figure__chart2');
var text2 = container2.select('.scroll__text2');
var step2 = text2.selectAll('.step2');

var formatComma = d3.format(",.0f")
var formatNoComma = d3.format(".00f")
var formatTenth = d3.format(".1f")
var formatPercent = d3.format(",.1%")


var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };

var margin = {top: 20, right: 20, bottom:50, left: 50}
var svg = d3.select("#mapSVG"),
    width = 1200 - margin.left - margin.right,
    height = 800 ;

var svgChart = d3.select("#chartSVG"),
        chartWidth = 1200 - margin.left - margin.right,
        chartHeight = 650 - margin.top - margin.bottom;

var svgWaffle = d3.select("#waffleSVG"),
        waffleWidth = 1200 - margin.left - margin.right,
        waffleHeight = 800 - margin.top - margin.bottom;

var regionMap = d3.select("#regionMap"),
        regionWidth = 600,
        regionHeight = 400;


var workerChart = d3.select("#acresChart"),
        workerWidth = 390,
        workerHeight = 600;

        var acresChart = d3.select("#acresChart"),
                acresWidth = 600,
                acresHeight = 400;


var wageChart = d3.select("#wageChart"),
        wageWidth = 600,
        wageHeight = 400;

var h2aBox = d3.select("#textBox"),
        h2aWidth= 390,
        h2aHeight = 600;

        var ageBox = d3.select("#ageChart"),
                ageBoxWidth= 390,
                ageBoxHeight = 600;

var seriesAcres

var oneSVG=null
var twoSVG=null



var path = d3.geoPath();


// var x = d3.scaleLinear()
//     .domain([0, 8])
//     .rangeRound([600, 860]);

    var xScale = d3.scaleLinear()
        .domain([1980, 2019])
        .rangeRound([100, chartWidth]);

    var yScale = d3.scaleLinear()
                  .domain([0, 74000])
                  .range([chartHeight, 70]);

    var xAcres = d3.scaleLinear()
        .domain([2007, 2017])
        .range([80, acresWidth-50]);

    var yAcres = d3.scaleLinear()
                  .domain([0, 8500000])
                  .range([acresHeight-100, 60]);

    var yAcresRegion = d3.scaleLinear()
                  .domain([0, 500000])
                  .range([acresHeight-100, 50]);

    var yAcresRegionMil = d3.scaleLinear()
                  .domain([0, 1000000])
                  .range([acresHeight-100, 50]);

    var xWage=d3.scaleLinear()
                .domain([0,.85])
                .range([100, acresWidth]);

    // var yWage = d3.scaleOrdinal()
    //               .domain(["CropWage","HSWage","collegeWage"])
    //               .range([acresHeight-100, 50]);








var g = svg.append("g")
    .attr("class", "key")

    var dot = svg.append("g")
        .attr("class", "key")


var div = d3.select("scroll__figure1").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


var promises = [
  d3.json("https://d3js.org/us-10m.v1.json"),
  d3.csv("assets/FruitVegStack.csv"),
  d3.csv("assets/waffleData.csv"),
  d3.json("assets/h2a_2020.json"),
  d3.json("assets/h2a_2010.json")
]


var xLine = d3.scaleLinear()
    .domain([1998, 2018])
    .rangeRound([100, chartWidth-50]);

var yLine = d3.scaleLinear()
    .domain([0, .48])
    .rangeRound([chartHeight, 70]);

    var bar_xAxis = d3.scaleLinear()
                      .domain([0,.75])
                      .range([260,1010])


var xAge = d3.scaleLinear()
    .domain([2007,2019])
    .rangeRound([70, chartWidth]);

var yAge = d3.scaleLinear()
        .domain([20, 48])
        .rangeRound([chartHeight, 0]);


Promise.all(promises).then(ready)



function ready(us) {



  if   (oneSVG=="vegImports"){ fruitChange()}

  else {oneSVG="fruitImports"}




  oneSVG="fruitImports"


  var dataState = us[0]



  var imports = us[1]

  var waffle = us[2]

  var h2aData_2020 = us[3]
  var h2aData_2010 = us[4]



//creating Stacked Data

  var keyMaker = imports.columns.slice(1)



  var keys = [keyMaker[0],keyMaker[1]]

  var vegKeys = [keyMaker[5],keyMaker[6]]

  var color = d3.scaleOrdinal()
                .domain(keys)
                .range(["#3A3745","#21D177"])

  var colorVeg = d3.scaleOrdinal()
                .domain(vegKeys)
                .range(["#3A3745","#21D177"])

  var colorStates = d3.scaleLinear()
                .domain([0,32000])
                // .range(["#ffffff","#f1fcf5","#e3f8ea","#d5f5e0","#c7f1d6","#b9eecc","#aaeac1","#9be6b7","#8be3ad","#7bdfa3","#68db99","#54d690","#3ad286","#05ce7c"])
                .range(["#d5f5e0","#05ce7c"])




  var stack = d3.stack().keys(keys);

  var stackVeg = d3.stack().keys(vegKeys);

  var stackedValues = stack(imports);

  var stackedValuesVeg = stackVeg(imports);

  var stackedData = [];
  // Copy the stack offsets back into the data.
  stackedValues.forEach((layer, index) => {
    var currentStack = [];
    layer.forEach((d, i) => {
      currentStack.push({
        values: d,
        Year: imports[i].Year
      });
    });
    stackedData.push(currentStack);
  });

  var stackedDataVeg = [];
  // Copy the stack offsets back into the data.
  stackedValuesVeg.forEach((layer, index) => {
    var currentStackVeg = [];
    layer.forEach((d, i) => {
      currentStackVeg.push({
        values: d,
        Year: imports[i].Year
      });
    });

    stackedDataVeg.push(currentStackVeg);
  });





  var series = svgChart
                .selectAll(".series")
                .data(stackedData)
                .enter()
                .append("g")
                .attr("class", "series");

  var area = d3.area()
               .x(dataPoint => xScale(dataPoint.Year) )
               .y0(dataPoint => yScale(dataPoint.values[0]))
               // .attr("fill","#21D177")
               .y1(dataPoint => yScale(dataPoint.values[1]));



      series
        .append("path")
        .attr("d", data => area(data))

        // .attr("fill", keys => color(keys[0],keys[1]))
        .attr("fill", function(d, i) {if (d[i].values[0]==0){return "#3A3745"} else {return "#21D177"}})

        .attr("class","areaCrop")
        // .attr('class',function(d, i) {if (d[i].values[0]==0){return "areaCrop1"} else {return "areaCrop2"}});

          svgChart.append("g")
                  .attr("transform", `translate(0,${chartHeight})`)
                  .call(d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0).tickFormat(function(d){return formatNoComma(d)}))


          svgChart.append("g")
                  .attr("transform", `translate(100,0)`)
                  .call(d3.axisLeft(yScale))
                  .call(g => g.select(".domain").remove())
                  .call(g => g.select(".tick:last-of-type text").clone()
                  .attr("x", 3)
                  .attr("text-anchor", "start")
                  .attr("font-weight", "bold"))
                  // .text(data.y))
                  .attr("class", "yAxisImport")

                  d3.select('.yAxisImport .tick:first-child').remove()


                  svgChart.append("text")
                          .attr("y", 30)//magic number here
                          .attr("x", 600)
                          .attr('text-anchor', 'middle')
                          .attr("class","FruitTitle")
                          .text("U.S. Supply of Fresh Fruits, 1980-2019")

                          svgChart.append("rect")
                                  .attr("y", 20)//magic number here
                                  .attr("x", 1125)
                                  .attr("width", 20)
                                  .attr("height", 20)
                                  .attr("fill","#05CE7C")
                                  .attr("class","ImportSquare")

                          svgChart.append("rect")
                                  .attr("y", 60)//magic number here
                                  .attr("x", 1125)
                                  .attr("width", 20)
                                  .attr("height", 20)
                                  .attr("fill","#3A3745")
                                  .attr("class","ImportSquare")

                      svgChart.append("text")
                              .attr("y", 35)//magic number here
                              .attr("x", 1150)
                              .attr("class","squareTitle")
                              .text("Import")

                        svgChart.append("text")
                                .attr("y", 75)//magic number here
                                .attr("x", 1150)
                                .attr("class","squareTitle")
                                .text("U.S.")

                svgChart.append("text")
                        .attr("y", 630)//magic number here
                        .attr("x", 600)
                        .attr("class","axisTitle")
                        .text("Year")

                        svgChart.append("text")
                                .attr("y", 300)//magic number here
                                .attr("x", 40)
                                .attr("class","axisTitle")
                                .attr("transform", 'translate(-280,360) rotate(270)')
                                .text("Million Lbs")

                                svgChart.append("text")
                                        .attr("y", 235)//magic number here
                                        .attr("x", 1100)
                                        .attr("class","TextChart importPercent FruitText")
                                        .attr('text-anchor', 'middle')
                                        .attr("fill","#05CE7C")
                                        .text("42.7%")

                              svgChart.append("text")
                                      .attr("y", 260)//magic number here
                                      .attr("x", 1100)
                                      .attr("class","TextChart importDescript FruitText")
                                      .attr('text-anchor', 'middle')
                                      .text("US Fresh Fruit")

                                      svgChart.append("text")
                                              .attr("y", 280)//magic number here
                                              .attr("x", 1100)
                                              .attr("class","TextChart importDescript FruitText")
                                              .attr('text-anchor', 'middle')
                                              .text("Imported in 2019")


                                              svgChart.append("text")
                                                      .attr("y", 285)//magic number here
                                                      .attr("x", 650)
                                                      .attr("class","TextChart importPercent FruitText")
                                                      .attr('text-anchor', 'middle')
                                                      .attr("fill","#05CE7C")
                                                      .text("20.1%")

                                            svgChart.append("text")
                                                    .attr("y", 310)//magic number here
                                                    .attr("x", 650)
                                                    .attr("class","TextChart importDescript FruitText")
                                                    .attr('text-anchor', 'middle')
                                                    .text("US Fresh Fruit")

                                                    svgChart.append("text")
                                                            .attr("y", 330)//magic number here
                                                            .attr("x", 650)
                                                            .attr("class","TextChart importDescript FruitText")
                                                            .attr('text-anchor', 'middle')
                                                            .text("Imported in 2000")
            svgChart.append("text")
                    .attr("y", 650)//magic number here
                    .attr("x", 100)
                    .attr("class","TextChart sourceText")
                    .attr('text-anchor', 'start')
                    .text("Source: USDA's 'Fruit and Tree Nuts Yearbook' & 'Vegetable and Pulses Yearbook'")

function fruitChange() {

  svgChart.selectAll(".VegText").attr("visibility", "hidden")


  series= svgChart
                .selectAll(".areaCrop")
                .data(stackedData)
                      .transition()
                      .duration(1000)
                      .attr("d", data => area(data))
                      .attr("fill", function(d, i) {if (d[i].values[0]==0){return "#3A3745"} else {return "#21D177"}})

                        svgChart.selectAll(".FruitText").attr("visibility", "visible")
                        oneSVG="fruitImports"

                        svgChart.selectAll(".FruitTitle")
                                .transition()
                                .attr("class","FruitTitle")
                                .text("U.S. Supply of Fresh Fruits, 1980-2019")

                    }



function vegImports () {


    if   (oneSVG=="vegImports"){ fruitChange()}

    else {

      svgChart.selectAll(".VegText").attr("visibility", "visible")

  d3.selectAll(".title2002").remove()
  d3.selectAll(".title2017").remove()

  twoSVG=null

    oneSVG="vegImports"

      svgChart.selectAll(".FruitText").attr("visibility", "hidden")
      svgWaffle.selectAll(".newTitle2017").remove()
      svgWaffle.selectAll(".waffs").attr("visibility", "hidden")
      // svgWaffle.selectAll(".newWaffs").attr("visibility", "hidden")


        series= svgChart
                      .selectAll(".areaCrop")
                      .data(stackedDataVeg)


          series.transition()
                .duration(1000)
                .attr("d", data =>  area(data))
                .attr("fill", function(d, i) {if (d[i].values[0]==0){return "#3A3745"} else {return "#21D177"}})
                .attr("class", "areaCrop")



                svgChart.selectAll(".FruitTitle")
                        .transition()
                        .attr("class","FruitTitle")
                        .text("U.S. Supply of Fresh Vegetables, 1980-2019")




                svgChart.append("text")
                        .attr("y", 140)//magic number here
                        .attr("x", 1075)
                        .attr("class","TextChart importPercent VegText")
                        .attr('text-anchor', 'middle')
                        .attr("fill","#05CE7C")
                        .text("31.9%")

                svgChart.append("text")
                      .attr("y", 165)//magic number here
                      .attr("x", 1075)
                      .attr("class","TextChart importDescript VegText")
                      .attr('text-anchor', 'middle')
                      .attr("fill","#000000")
                      .text("US Fresh Vegetables")

                      svgChart.append("text")
                              .attr("y", 185)//magic number here
                              .attr("x", 1075)
                              .attr("class","TextChart importDescript VegText")
                              .attr('text-anchor', 'middle')
                              .attr("fill","#000000")
                              .text("Imported in 2019")


                              svgChart.append("text")
                                      .attr("y", 180)//magic number here
                                      .attr("x", 640)
                                      .attr("class","TextChart importPercent VegText")
                                      .attr('text-anchor', 'middle')
                                      .attr("fill","#05CE7C")
                                      .text("18.1%")

                            svgChart.append("text")
                                    .attr("y", 205)//magic number here
                                    .attr("x", 640)
                                    .attr("class","TextChart importDescript VegText")
                                    .attr('text-anchor', 'middle')
                                    .attr("fill","#000000")
                                    .text("US Fresh Veg")

                                    svgChart.append("text")
                                            .attr("y", 225)//magic number here
                                            .attr("x", 640)
                                            .attr("class","TextChart importDescript VegText")
                                            .attr('text-anchor', 'middle')
                                            .attr("fill","#000000")
                                            .text("Imported in 2000")

}

}

function waffleChart() {


  if (twoSVG=="acresChart2017") {

    waffle2002Change ()
  }



    svgWaffle.append("text")
             .attr("y", 50)//magic number here
             .attr("x", 600)
             .attr('text-anchor', 'middle')
             .attr("class","FruitTitle title2002")
             .attr("id","AcreTitle")
             .text("Acres of Vegetables and Fruits Harvested in 2002")

             svgWaffle.selectAll(".waffs")
                      .data(waffle)
                      .enter()
                      .append("rect")
                      .attr("x", function(d) { return d.x_waffle})
                      .attr("y", function(d) { return d.y_waffle})
                      .attr('width', 50)
                      .attr('height', 50)
                      .attr('class', "waffs")
                      .attr("visibility", "visible")
                      .attr('transform', "translate(50,-40)")
                      .attr("fill", function(d) { return d.color_waffle_2002})





  twoSVG="acresChart2002"

svgWaffle.selectAll(".waffs").attr("visibility", "visible")



                svgWaffle.append("rect")
                        .attr("y", 740)//magic number here
                        .attr("x", 300)
                        .attr("width", 50)
                        .attr("height", 50)
                        .attr("fill","#FFDB21")
                        .attr("class","WaffleLegend LegendSquare")


               svgWaffle.append("text")
                     .attr("y", 770)//magic number here
                     .attr("x", 355)
                     .attr("class","WaffleLegend squareTitle")
                     .text("75,000 Acres Citrus")

              svgWaffle.append("rect")
                      .attr("y", 740)//magic number here
                      .attr("x", 500)
                      .attr("width", 50)
                      .attr("height", 50)
                      .attr("class","WaffleLegend LegendSquare")
                      .attr("fill","#6B7CF2")


                svgWaffle.append("text")
                      .attr("y", 770)//magic number here
                      .attr("x", 555)
                      .attr("class","WaffleLegend squareTitle")
                      .text("75,000 Acres Non Citrus")

              svgWaffle.append("rect")
                      .attr("y", 740)//magic number here
                      .attr("x", 720)
                      .attr("width", 50)
                      .attr("height", 50)
                      .attr("fill","#05CE7C")
                      .attr("class","WaffleLegend LegendSquare")

              svgWaffle.append("text")
                    .attr("y", 770)//magic number here
                    .attr("x", 775)
                    .attr("class","WaffleLegend squareTitle")
                    .text("75,000 Acres Vegetables")



}

function waffle2002Change () {


   svgWaffle.selectAll(".FruitTitle")
           .transition()
           .attr('class', "newTitle2002 title2002")
           .text("Acres of Vegetables and Fruits Harvested in 2002")

           svgWaffle.selectAll(".waffs")
                    .transition()
                    .duration(1000)
                    .attr('class', "waffs")
                    .attr('transform', "translate(50,-40)")
                    .attr("visibility", "visible")
                    .attr("fill", function(d) { return d.color_waffle_2002})



 }

function waffleChart2017() {


  if (  twoSVG=="laborChart") {

    d3.selectAll(".newTitle2017").remove()

    d3.selectAll(".laborChart").remove()

    svgWaffle.selectAll(".waffs")
             .transition()
             .duration(1000)
             .attr("x", function(d) { return d.x_waffle})
             .attr("y", function(d) { return d.y_waffle})
             .attr('width', 50)
             .attr('height', 50)
             .attr("stroke-width", 0)
             .attr("class", "waffs")
             .attr('transform', "translate(50,-40)")
             .attr("fill", function(d) { return d.color_waffle_2017})

             svgWaffle.append("text")
                      .attr("y", 50)//magic number here
                      .attr("x", 600)
                      .attr('text-anchor', 'middle')
                      .attr("class","FruitTitle acresChart2002 title2017")
                      .attr("id","AcreTitle")
                      .text("Acres of Vegetables and Fruits Harvested in 2017")

}





  else {
    svgWaffle.selectAll(".waffs")
             .transition()
             .duration(1000)
             .attr("fill", function(d) { return d.color_waffle_2017})


  }


  twoSVG="acresChart2017"

                 d3.selectAll(".title2002")
                         .transition()
                         .text("Acres of Vegetables and Fruits Harvested in 2017")





}

function laborCost() {


  if (  twoSVG=="wageChart") {

    svgWaffle.selectAll(".BarChart").remove()

    svgWaffle.selectAll(".BarChartTitle").transition()
    .attr("class","laborChart FruitTitle")
    .text("Share of Labor Costs of Farm Income from 1998-2018")

    d3.selectAll(".newTitle2017").remove()

    svgWaffle.selectAll(".waffs").transition()
                                    .duration(1000)
                                    .attr('transform', "translate(0,0)")
                                    // .attr("x", function(d) { if (d.Crop_Labor!="Back Stage") {return xLine(+d.yearLabor)}})
                                    .attr("x", function(d) { if (d.Crop_Labor!="Back Stage") {return (xLine(+d.yearLabor)-7.5)}})
                                    .attr("y", function(d) { if (d.Crop_Labor!="Back Stage") {return (yLine(+d.Percent_LaborCost)-7.5)}})
                                    .attr('width', 15)
                                    .attr('height', 15)
                                    .attr("class", "newLaborWaffs waffs ")
                                    .attr("fill", function(d) { return d.Color_LaborCost})
                                    .style("visbility", function(d) { if (d.Crop_Labor=="Back Stage") {return "hidden"}})


                                    d3.select("#AcreTitle")
                                            .transition()
                                            .attr("class","laborChart")
                                            .text("Share of Labor Costs of Farm Income from 1998-2018")



  }

  else {

    svgWaffle.selectAll(".waffs")
             .transition()
             .duration(1000)
             .attr('transform', "translate(0,0)")
             // .attr("x", function(d) { if (d.Crop_Labor!="Back Stage") {return xLine(+d.yearLabor)}})
             .attr("x", function(d) { if (d.Crop_Labor!="Back Stage") {return (xLine(+d.yearLabor)-7.5)}})
             .attr("y", function(d) { if (d.Crop_Labor!="Back Stage") {return (yLine(+d.Percent_LaborCost)-7.5)}})
             .attr('width', 15)
             .attr('height', 15)
             .attr("class", "waffs")
             .attr("fill", function(d) { return d.Color_LaborCost})
             .style("visbility", function(d) { if (d.Crop_Labor=="Back Stage") {return "hidden"}})

  }

  twoSVG="laborChart"

  d3.selectAll(".acresChart2002").remove()

  svgWaffle.selectAll(".WaffleLegend").remove()

  d3.selectAll(".title2002")
          .transition()
          .attr("class","laborChart")
          .text("Share of Labor Costs of Farm Income from 1998-2018")


  var lineDataAll = waffle.sort(function(d){return d3.ascending(d.yearLabor);})
                          .filter(function(d) { return d.Crop_Labor == 'AllFarms' })

  var lineDataVeg = waffle.sort(function(d){return d3.ascending(d.yearLabor);})
                          .filter(function(d) { return d.Crop_Labor == 'VegFarm' })

  var lineDataFruit = waffle.sort(function(d){return d3.ascending(d.yearLabor);})
                          .filter(function(d) { return d.Crop_Labor == 'FruitFarm' })

  var line = d3.line()
        .x(function(d) {return xLine(+d.yearLabor)})
        .y(function(d) {return yLine(+d.Percent_LaborCost)})
        .curve(d3.curveMonotoneX)





    var pathLine = svgWaffle.selectAll('.lineAll')
                   .data(lineDataAll)
                   .enter()
                   .append("path")
                   .attr("d", line(lineDataAll))
                   .attr("class", "lineAll laborChart")
                   .attr("fill", "none")
                   .attr("stroke", "#3A3745")
                   .attr("stroke-width", 3)
                   .transition()
                   .duration(1000);

    var pathLineVeg = svgWaffle.selectAll('.lineVeg')
                 .data(lineDataVeg)
                 .enter()
                 .append("path")
                 .attr("d", line(lineDataVeg))
                 .attr("class", "lineVeg laborChart")
                 .attr("fill", "none")
                 .attr("stroke", "#05CE7C")
                 .attr("stroke-width", 3)
                 .transition()
                 .duration(1000);


    var pathLineFruit = svgWaffle.selectAll('.lineFruit')
                 .data(lineDataFruit)
                 .enter()
                 .append("path")
                 .attr("d", line(lineDataFruit))
                 .attr("class", "lineFruit laborChart")
                 .attr("fill", "none")
                 .attr("stroke","#6B7CF2")
                 .attr("stroke-width", 3)
                 .transition()
                 .duration(1000);


                 svgWaffle.append("g")
                         .attr("transform", `translate(0,${chartHeight})`)
                         .attr("class","xAxisLabor laborChart")
                         .call(d3.axisBottom(xLine).ticks(width / 80).tickSizeOuter(0).tickFormat(function(d){return formatNoComma(d)}))
                         ;


                 svgWaffle.append("g")
                         .attr("transform", `translate(95,0)`)
                         .call(d3.axisLeft(yLine).tickFormat(function(d){return formatPercent(d)}))
                         .call(g => g.select(".domain").remove())
                         .call(g => g.select(".tick:last-of-type text").clone()
                         .attr("x", 3)
                         .attr("text-anchor", "start")
                         .attr("font-weight", "bold"))
                         .attr("class","yAxisLabor laborChart")


                      d3.selectAll(".yAxisLabor .tick:first-child").remove()


                      svgWaffle.append("text")
                              .attr("y", 640)//magic number here
                              .attr("x", 600)
                              .attr("class","laborChart axisTitle")
                              .text("Year")

                              svgWaffle.append("text")
                                      .attr("y", 300)//magic number here
                                      .attr("x", 40)
                                      .attr("class","laborChart axisTitle")
                                      .attr("transform", 'translate(-280,460) rotate(270)')
                                      .text("Share of Farm Income")


                                      svgWaffle.append("text")
                                              .attr("y", 455)//magic number here
                                              .attr("x", chartWidth-50)
                                              .attr("class","laborChart lineTitle")
                                              .attr("fill","#3A3745")
                                              .text("All Farms")

                                              svgWaffle.append("text")
                                                      .attr("y", 322)//magic number here
                                                      .attr("x", chartWidth-50)
                                                      .attr("class","laborChart lineTitle")
                                                      .attr("fill","#05CE7C")
                                                      .text("Vegetable Farms")

                                                      svgWaffle.append("text")
                                                              .attr("y", 265)//magic number here
                                                              .attr("x", chartWidth-50)
                                                              .attr("class","laborChart lineTitle")
                                                              .attr("fill","#6B7CF2")
                                                              .text("Fruit Farms")
                         // .text(formatPercent(lineDataAll.Percent_LaborCost)))




}

function wageCompare() {



  if (twoSVG=="fbworkerChart") {
    svgWaffle.selectAll(".BarChartTitle").attr("visibility","visible")
    svgWaffle.selectAll(".WaffleLegendUndoc").attr("visibility", "hidden")

svgWaffle.selectAll('.fbWaffle').remove();

svgWaffle.selectAll(".waffs")
         .transition()
         .duration(1000)
         .attr("x", function(d) { return d.x_bar})
         .attr("y", function(d) { return d.y_bar})
         .attr("transform", `translate(0,0)`)
         .attr("class", "waffs")
         .attr("stroke", function(d) { if (d.BarName=="CropWorker"){return"#FFA538"} else if (d.BarName=="HighSchool"){return"#cbf3d9"} else if (d.BarName=="CollegeGrad"){return"#94e5b3"} else if (d.BarName=="College90"){return"#51d68e"} else {return "#ffffff"} })
         .attr("stroke-width", 1)
         .attr("fill", function(d) { if (d.BarName=="CropWorker"){return"#FFA538"} else if (d.BarName=="HighSchool"){return"#cbf3d9"} else if (d.BarName=="CollegeGrad"){return"#94e5b3"} else if (d.BarName=="College90"){return"#51d68e"} else {return "#ffffff"} })
         .style("visbility", function(d) { if (d.BarName=="GoAway") {return "hidden"}})

  }


else {

  svgWaffle.selectAll(".waffs")
           .transition()
           .duration(1000)
           .attr("x", function(d) { return d.x_bar})
           .attr("y", function(d) { return d.y_bar})
           .attr('width', 50)
           .attr('height', 50)
           .attr("stroke", function(d) { if (d.BarName=="CropWorker"){return"#FFA538"} else if (d.BarName=="HighSchool"){return"#cbf3d9"} else if (d.BarName=="CollegeGrad"){return"#94e5b3"} else if (d.BarName=="College90"){return"#51d68e"} else {return "#ffffff"} })
           .attr("stroke-width", 1)
           .attr("fill", function(d) { if (d.BarName=="CropWorker"){return"#FFA538"} else if (d.BarName=="HighSchool"){return"#cbf3d9"} else if (d.BarName=="CollegeGrad"){return"#94e5b3"} else if (d.BarName=="College90"){return"#51d68e"} else {return "#ffffff"} })
           .style("visbility", function(d) { if (d.BarName=="GoAway") {return "hidden"}})
}
    svgWaffle.selectAll(".laborChart").remove()


             svgWaffle.append("g")
                     .attr("transform", `translate(0,640)`)
                     .attr("class", "BarChart")
                     .call(d3.axisBottom(bar_xAxis))




             svgWaffle.selectAll(".yAxisLabor").remove()
             svgWaffle.selectAll(".xAxisLabor").remove()
             svgWaffle.selectAll(".lineFruit").remove()
             svgWaffle.selectAll(".lineVeg").remove()
             svgWaffle.selectAll(".lineAll").remove()


             svgWaffle.append("text")
                      .attr("y", 50)//magic number here
                      .attr("x", 600)
                      .attr('text-anchor', 'middle')
                      .attr("class","BarChartTitle FruitTitle")
                      .attr("id","BarChartTitle")
                      .text("Wage Growth for Workers of Selected Profession & Educational Levels, 2005-2019")


                      svgWaffle.append("text")
                            .attr("y", 200)//magic number here
                            .attr("x", 245)
                            .attr("class","BarChart yAxisBar")
                            .attr('text-anchor', 'end')
                            .text("Crop Workers")

                            svgWaffle.append("text")
                                  .attr("y", 315)//magic number here
                                  .attr("x", 245)
                                  .attr("class","BarChart yAxisBar")
                                  .attr('text-anchor', 'end')
                                  .text("High School Graduates")

                      svgWaffle.append("text")
                            .attr("y", 445)//magic number here
                            .attr("x", 245)
                            .attr("class","BarChart yAxisBar")
                            .attr('text-anchor', 'end')
                            .text("College Graduates")

                            svgWaffle.append("text")
                                  .attr("y", 565)//magic number here
                                  .attr("x", 245)
                                  .attr("class","BarChart yAxisBar")
                                  .attr('text-anchor', 'end')
                                  .text("College Graduates,")


                                  svgWaffle.append("text")
                                        .attr("y", 585)//magic number here
                                        .attr("x", 245)
                                        .attr("class","BarChart yAxisBar")
                                        .attr('text-anchor', 'end')
                                        .text("90th Percentile")

                                        svgWaffle.append("text")
                                              .attr("y", 200)//magic number here
                                              .attr("x", 980)
                                              .attr("class","BarChart BarResult")
                                              .attr('text-anchor', 'start')
                                              .text("0.66")

                                              svgWaffle.append("text")
                                                    .attr("y", 315)//magic number here
                                                    .attr("x", 580)
                                                    .attr("class","BarChart BarResult")
                                                    .attr('text-anchor', 'start')
                                                    .text("0.33")

                                              svgWaffle.append("text")
                                                      .attr("y", 455)//magic number here
                                                    .attr("x", 680)
                                                    .attr("class","BarChart BarResult")
                                                    .attr('text-anchor', 'start')
                                                    .text("0.4")

                                                    svgWaffle.append("text")
                                                            .attr("y", 575)//magic number here
                                                          .attr("x", 780)
                                                          .attr("class","BarChart BarResult")
                                                          .attr('text-anchor', 'start')
                                                          .text("0.5")

                                                          svgWaffle.append("text")
                                                                  .attr("y", 680)//magic number here
                                                                .attr("x", 580)
                                                                .attr("class","BarChart BarXtitle")
                                                                .attr('text-anchor', 'start')
                                                                .text("Wage Rate Increase")


  twoSVG="wageChart"

}


function cropWorkFB() {

  if (twoSVG=="undocworkerChart") {
      svgWaffle.selectAll(".WaffleLegendUndoc").attr("visibility", "visible")
    svgWaffle.selectAll('.fbWaffle')
              .transition()
              .text('57% of Crop Workers are Foreign Born')

    svgWaffle.selectAll(".waffs")
             .transition()
             .duration(1000)
             .attr("class", "waffs")
             .attr("fill", function(d) { return d.color_fb_cropWorker2019})

             twoSVG="fbworkerChart"
  }

  else {

  svgWaffle.selectAll(".BarChartTitle").attr("visibility","hidden")
  svgWaffle.selectAll(".BarChart").remove()

  svgWaffle.selectAll(".waffs")
           .transition()
           .duration(1000)
           .attr("x", function(d) { return d.x_waffle})
           .attr("y", function(d) { return d.y_waffle})
           .attr("stroke-width", 0)
           .style("visbility", "visible")
           .attr('transform', "translate(50,-40)")
           .attr("fill", function(d) { return d.color_fb_cropWorker2019})


           svgWaffle.append("text")
                    .attr("y", 50)//magic number here
                    .attr("x", 600)
                    .attr('text-anchor', 'middle')
                    .attr("class","fbWaffle FruitTitle")
                    .attr("id","ForeignBorn Waffle")
                    .text("57% of Crop Workers are Foreign Born")


                    svgWaffle.append("rect")
                            .attr("y", 740)//magic number here
                            .attr("x", 500)
                            .attr("width", 50)
                            .attr("height", 50)
                            .attr("fill","#05CE7C")
                            .attr("visbility", "visible")
                            .attr("class","WaffleLegendUndoc LegendSquare")


                    svgWaffle.append("text")
                         .attr("y", 770)//magic number here
                         .attr("x", 555)
                         .attr("class","WaffleLegendUndoc squareTitle")
                         .attr("visbility", "visible")
                         .text("Foreign-Born")

                    svgWaffle.append("rect")
                          .attr("y", 740)//magic number here
                          .attr("x", 700)
                          .attr("width", 50)
                          .attr("height", 50)
                          .attr("class","WaffleLegendUndoc LegendSquare")
                          .attr("visbility", "visible")
                          .attr("fill","#3A3745")


                    svgWaffle.append("text")
                          .attr("y", 770)//magic number here
                          .attr("x", 755)
                          .attr("class","WaffleLegendUndoc squareTitle")
                          .attr("visbility", "visible")
                          .text("U.S. Born")
}

twoSVG="fbworkerChart"

}

function cropWorkUndoc() {


  if (twoSVG=="ageChart") {

    svgWaffle.selectAll(".ageChart").remove()
    svgWaffle.selectAll(".WaffleLegendUndoc").attr("visibility", "visible")

    svgWaffle.selectAll('.waffs')
             .data(waffle)
             .enter()
             // .transition()
             // .duration(1000)
             .append("rect")
             .attr("x", function(d) {return +d.x_waffle})
             .attr("y", function(d) { return +d.y_waffle})
             .attr('width', 50)
             .attr('height', 50)
             .attr('class', "waffs")
             .style("visbility", "visible")
             .attr('transform', "translate(50,-40)")
             .attr("fill", function(d) { return d.color_undoc_cropWorker2019})

             svgWaffle.append("text")
                      .attr("y", 50)//magic number here
                      .attr("x", 600)
                      .attr('text-anchor', 'middle')
                      .attr("class","fbWaffle FruitTitle")
                      .attr("id","ForeignBorn Waffle")
                      .text("31% of Crop Workers are Undocumented")



  }




  else {

  svgWaffle.selectAll('.fbWaffle')
            .transition()
            .text('31% of Crop Workers are Undocumented')

  svgWaffle.selectAll(".waffs")
           .transition()
           .duration(1000)
           .style("visbility", "visible")
           .attr("fill", function(d) { return d.color_undoc_cropWorker2019})



           // svgWaffle.append("rect")
           //       .attr("y", 740)//magic number here
           //       .attr("x", 720)
           //       .attr("width", 50)
           //       .attr("height", 50)
           //       .attr("fill","#05CE7C")
           //       .attr("visbility", "visible")
           //       .attr("class","WaffleLegend LegendSquare")
           //
           // svgWaffle.append("text")
           //     .attr("y", 770)//magic number here
           //     .attr("x", 775)
           //     .attr("class","WaffleLegend squareTitle")
           //     .attr("visbility", "visible")
           //     .text("75,000 Acres Vegetables")

         }

twoSVG="undocworkerChart"

// svgWaffle.selectAll(".newWaffs").attr("visbility", "visible")
svgWaffle.selectAll(".waffs").attr("visbility", "visible")




}

function averageCropAge() {


  if (twoSVG=="h2aChart") {





    d3.selectAll(".squareCellTitle").remove()
    d3.selectAll(".squareCellNumber").attr("visibility","hidden")
    d3.selectAll('.tree2020').style("visibility","hidden")
    d3.selectAll('.tree2010').remove()
    d3.select('#H2AChartTitle').remove()
    svgWaffle.selectAll(".ageChartWaffs").attr("visibility","visible")

    svgWaffle.selectAll(".waffs")
             .transition()
             .duration(1000)
             // .attr("x", function(d) { if (d.Crop_Labor!="Back Stage") {return xLine(+d.yearLabor)}})
             .attr("x", function(d) { if (d.AgeLabel!="Disappear") {return (xAge(+d.YearAge)-7.5)}})
             .attr("y", function(d) { if (d.AgeLabel!="Disappear") {return (yAge(+d.AVG_Age)-7.5)}})
             .attr("transform", 'translate(0,100)')
             .attr("class", function(d) {return "waffs ageChart "+ d.AgeLabel})
             .attr('width', 15)
             .attr('height', 15)
             // .attr("fill", function(d) {if (d.AgeLavel=="ForeignBornAge") {return "#05CE7C"} if (d.AgeLavel=="ForeignBornAge") {return "#05CE7C"}})
             .style("visibility", function(d) { if (d.AgeLabel=="Disappear") {return "hidden"}})



  }

svgWaffle.selectAll(".WaffleLegendUndoc").attr("visibility", "hidden")


   twoSVG="ageChart"

  d3.selectAll('.fbWaffle').remove()

  var ageDataAll = waffle.sort(function(d){return d3.ascending(d.YearAge);})
                          .filter(function(d) { return d.AgeLabel == 'AllAge' })

  var ageDataFB = waffle.sort(function(d){return d3.ascending(d.YearAge);})
                          .filter(function(d) { return d.AgeLabel == 'ForeignBornAge' })

  var ageDataUSB = waffle.sort(function(d){return d3.ascending(d.YearAge);})
                          .filter(function(d) { return d.AgeLabel == 'USBornAge' })

  var lineAge = d3.line()
        .x(function(d) {return xAge(+d.YearAge)})
        .y(function(d) {return yAge(+d.AVG_Age)})



        // svgWaffle.selectAll(".Disappear")
        //          .style("visibility", "hidden")



    var pathLine = svgWaffle.selectAll('.lineAgeAll')
                   .data(ageDataAll)
                   .enter()
                   .append("path")
                   .attr("d", lineAge(ageDataAll))
                   .attr("transform", 'translate(0,100)')
                   .attr("class", "ageChart lineAgeAll")
                   .attr("fill", "none")
                   .attr("stroke", "#b1ecc6")
                   .attr("stroke-width", 3)
                   .transition()
                   .duration(1000);

    var pathLineVeg = svgWaffle.selectAll('.lineAgeFB')
                 .data(ageDataFB)
                 .enter()
                 .append("path")
                 .attr("d", lineAge(ageDataFB))
                 .attr("transform", 'translate(0,100)')
                 .attr("class", "ageChart lineAgeFB")
                 .attr("fill", "none")
                 .attr("stroke", "#05CE7C")
                 .attr("stroke-width", 3)
                 .transition()
                 .duration(1000);


    var pathLineFruit = svgWaffle.selectAll('.lineAgeUSB')
                 .data(ageDataUSB)
                 .enter()
                 .append("path")
                 .attr("d", lineAge(ageDataUSB))
                 .attr("transform", 'translate(0,100)')
                 .attr("class", "ageChart lineAgeUSB")
                 .attr("fill", "none")
                 .attr("stroke","#3A3745")
                 .attr("stroke-width", 3)
                 .transition()
                 .duration(1000);


                 svgWaffle.append("g")
                         .attr("transform", `translate(0,${chartHeight+100})`)
                         .attr("class","xAxisAge ageChart")
                         .call(d3.axisBottom(xAge).ticks(width / 80).tickSizeOuter(0).tickFormat(function(d){return formatNoComma(d)}))
                         ;


                 svgWaffle.append("g")
                         .attr("transform", 'translate(70,100)')
                         // .call(d3.axisLeft(yAge).tickFormat(function(d){return formatPercent(d)}))
                         .call(d3.axisLeft(yAge))
                         .call(g => g.select(".domain").remove())
                         .call(g => g.select(".tick:last-of-type text").clone()
                         .attr("x", 3)
                         .attr("text-anchor", "start")
                         .attr("font-weight", "bold"))
                         .attr("class","yAxisAge ageChart")


                      d3.selectAll(".yAxisAge .tick:first-child").remove()

                      svgWaffle.selectAll(".waffs")
                               .transition()
                               .duration(1000)
                               // .attr("x", function(d) { if (d.Crop_Labor!="Back Stage") {return xLine(+d.yearLabor)}})
                               .attr("x", function(d) { if (d.AgeLabel!="Disappear") {return (xAge(+d.YearAge)-7.5)}})
                               .attr("y", function(d) { if (d.AgeLabel!="Disappear") {return (yAge(+d.AVG_Age)-7.5)}})
                               .attr("transform", 'translate(0,100)')
                               .attr("class", function(d) {return "waffs ageChart "+ d.AgeLabel})
                               .attr('width', 15)
                               .attr('height', 15)
                               // .attr("fill", function(d) {if (d.AgeLavel=="ForeignBornAge") {return "#05CE7C"} if (d.AgeLavel=="ForeignBornAge") {return "#05CE7C"}})
                               .style("visibility", function(d) { if (d.AgeLabel=="Disappear") {return "hidden"}})

                      svgWaffle.append("rect")
                               .attr("x",(xAge(2007)-7.5))
                               .attr("y",(yAge(36)-7.5))
                               .attr("transform", 'translate(0,100)')
                               .attr('width', 15)
                               .attr('height', 15)
                               .attr('fill',"#3A3745")
                               .attr("class","cover ageChart")

                      svgWaffle.append("rect")
                             .attr("x",(xAge(2010)-7.5))
                             .attr("y",(yAge(36.6)-7.5))
                             .attr("transform", 'translate(0,100)')
                             .attr('width', 15)
                             .attr('height', 15)
                             .attr('fill',"#3A3745")
                             .attr("class","cover ageChart")


                   svgWaffle.append("text")
                            .attr("y", 50)//magic number here
                            .attr("x", 600)
                            .attr('text-anchor', 'middle')
                            .attr("class","ageChart FruitTitle")
                            .attr("id","AgeChartTitle")
                            .text("Average Age of Crop Workers, 2007-2019")

                 svgWaffle.append("text")
                      .attr("y", 730)//magic number here
                      .attr("x", 600)
                      .attr("class","ageChart axisTitle")
                      .text("Year")

                  svgWaffle.append("text")
                     .attr("y", 300)//magic number here
                     .attr("x", 40)
                     .attr("class","ageChart axisTitle")
                     .attr("transform", 'translate(-280,460) rotate(270)')
                     .text("Average Age")


                     svgWaffle.append("rect")
                             .attr("y", 740)//magic number here
                             .attr("x", 300)
                             .attr("width", 30)
                             .attr("height", 30)
                             .attr("fill","#05CE7C")
                             .attr("class","ageLegend ageChart")


                    svgWaffle.append("text")
                          .attr("y", 760)//magic number here
                          .attr("x", 345)
                          .attr("class","ageLegend ageChart")
                          .text("Foreign Born")

                   svgWaffle.append("rect")
                           .attr("y", 740)//magic number here
                           .attr("x", 520)
                           .attr("width", 30)
                           .attr("height", 30)
                           .attr("fill","#3A3745")
                           .attr("class","ageLegend ageChart")

                     svgWaffle.append("text")
                           .attr("y", 760)//magic number here
                           .attr("x", 565)
                           .attr("class","ageLegend ageChart")
                           .text("All Workers")

                   svgWaffle.append("rect")
                           .attr("y", 740)//magic number here
                           .attr("x", 720)
                           .attr("width", 30)
                           .attr("height", 30)
                           .attr("fill","#b1ecc6")
                           .attr("class","ageLegend ageChart")

                   svgWaffle.append("text")
                         .attr("y", 760)//magic number here
                         .attr("x", 765)
                         .attr("class","ageLegend ageChart")
                         .text("U.S. Born")

                         svgWaffle.append("text")
                                 .attr("y", 790)//magic number here
                                 .attr("x", 70)
                                 .attr("class","ageChart sourceText")
                                 .attr('text-anchor', 'start')
                                 .text("Source: USDA's Farm Labor Report: www.ers.usda.gov/topics/farm-economy/farm-labor/")




}





function stateVisa() {


  d3.selectAll('.cropAge').remove()
  d3.selectAll(".lineAgeUSB").remove()
  d3.selectAll(".lineAgeFB").remove()
  d3.selectAll(".lineAgeAll").remove()
  d3.selectAll(".xAxisAge").remove()
  d3.selectAll(".yAxisAge").remove()
  d3.selectAll(".cover").remove()
  d3.selectAll(".ageChart").remove()
  d3.selectAll(".ageChartWaffs").attr("visibility","hidden")
  d3.selectAll(".squareCellNumber").attr("visibility","hidden")

    d3.selectAll('.tree2020').style("visibility","visible")

  twoSVG="h2aChart"

  function sumByCount(d) {
  return d.WorkersH2A_2020 ? 0 : 1;
}

function sumBySize(d) {
  return d.WorkersH2A_2020;
}

function sumBySize2010(d) {
  return d.WorkersH2A_2010;
}

function changed(sum) {
  timeout.stop();

  treemap(root.sum(sum));

  cell.transition()
      .duration(750)
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
    .select("rect")
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; });
}

function changed2010(sum) {
  timeout.stop();

  treemap2010(root2010.sum(sum));

  cell2010.transition()
      .duration(750)
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
    .select("rect")
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; });
}

svgWaffle.append("text")
         .attr("x", 847)
         .attr("y", 173)
         .attr("class","squareCellTitle")
         .attr("text-anchor", "middle")
         .attr("fill", '#3A3745')
         .attr("text-anchor", "middle")
         .text("Certified H2-A Workers in 2020");


  svgWaffle.append("text")
         .attr("x", 277)
         .attr("y", 380)
         .attr("class","squareCellTitle")
         .attr("text-anchor", "middle")
         .attr("fill", '#3A3745')
         .attr("text-anchor", "middle")
         .text("Certified H2-A Workers in 2010");


         svgWaffle.append("text")
                .attr("x", 277)
                .attr("y", 350)
                .attr("class","squareCellNumber")
                .attr("id","smallerNum")
                .attr("text-anchor", "middle")
                .attr("font-weight", "bold")
                .attr("fill", "#FFA538")
                .attr("visibility","visible")
                .text("93,912");

                svgWaffle.append("text")
                       .attr("x", 857)
                       .attr("y", 143)
                       .attr("class","squareCellNumber")
                       .attr("id","largerNum")
                       .attr("text-anchor", "middle")
                       .attr("font-weight", "bold")
                       .attr("fill", "#05ce7c")
                       .attr("visibility","visible")
                       .text("281,736");






  // svgWaffle.selectAll(".ageChartWaffs").remove()


  var widthTree = 500,
     heightTree= 500,
     widthTree2010 = 292,
     heightTree2010 = 292;

var fader = function(color) { return d3.interpolateRgb(color, "#05ce7c")(0.2); },
color = d3.scaleOrdinal(["#05ce7c","#b1ecc6"]),
format = d3.format(",d");

var treemap = d3.treemap()
.tile(d3.treemapSquarify)
.size([widthTree, heightTree])
.round(true)
.paddingInner(3);

var treemap2010 = d3.treemap()
.tile(d3.treemapSquarify)
.size([widthTree2010, heightTree2010])
.round(true)
.paddingInner(3);


  var root = d3.hierarchy(h2aData_2020)
    // .eachBefore(function(d) {d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.Title })
    .eachBefore(function(d) {d.data.id = d.data.State_Abv })
    .sum(sumBySize)
    .sort(function(a, b) { return b.WorkersH2A - a.WorkersH2A; });

treemap(root);

var cell = svgWaffle.selectAll("g")
  .data(root.leaves())
  .enter().append("g")
    .attr("transform", function(d) {return "translate(" + d.x0 + "," + d.y0 + ")"; });

cell.append("rect")
    .attr("id", function(d) {return d.data.id +"2020"; })
    .attr("width", function(d) { return d.x1 - d.x0; })
    .attr("height", function(d) { return d.y1 - d.y0; })
    .attr("class","tree2020")
    .attr("visibility","visible")
    .attr("fill", "#05CE7C" );

    d3.selectAll(".tree2020")
      .attr("visibility","visibile")



    var label = cell.append("text")
                    .attr("x", 4)
                    .attr("y", 13)
                    .attr("class","tree2020")
                    .text(function(d) { if (d.value>10000) {return d.data.Title} else {return d.data.State_Abv}});


    label.append("tspan")


    label.append("tspan")
        .attr("x", 4)
        .attr("y", 25)
        .text(function(d) { return format(d.value); });

    cell.append("title")
        .attr("class","treeText")
        .text(function(d) { return d.data.Title + "\n" + format(d.value); });


var root2010 = d3.hierarchy(h2aData_2010)
  // .eachBefore(function(d) {  d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.Title })
  .eachBefore(function(d) {d.data.id = d.data.State_Abv+"2010" })
  .sum(sumBySize2010);


treemap2010(root2010);

var cell2010 = svgWaffle.selectAll(".h2aRect")
.data(root2010.leaves())
.enter().append("g")
.attr("class","h2aRect tree2010")
  .attr("transform", function(d) {return "translate(" + d.x0 + "," + d.y0 + ")"; });

cell2010.append("rect")
  .attr("id", function(d) {return d.data.id; })
  .attr("width", function(d) { return d.x1 - d.x0; })
  .attr("height", function(d) { return d.y1 - d.y0; })
  .attr("class","tree2010")
  .attr("fill", "#FFA538" );

// cell2010.append("clipPath")
//   .attr("id", function(d) { return "clip-" + d.data.id; })
// .append("use")
// .attr("class","tree2010")
//   .attr("xlink:href", function(d) { return "#" + d.data.id; });

  var label2010 = cell2010.append("text")
                  .attr("x", 4)
                  .attr("y", 13)
                  .attr("class","tree2010")
                  .text(function(d) { if (d.value>4800) {return d.data.Title} else {return d.data.State_Abv}});


  label2010.append("tspan")


  label2010.append("tspan")
      .attr("x", 4)
      .attr("y", 25)
      .text(function(d) { return format(d.value); });

  cell2010.append("title")
      .text(function(d) {return d.data.Title + "\n" + format(d.value); });

// d3.selectAll("input")
//     .data([sumBySize, sumByCount], function(d) { return d ? d.name : this.value; })
//     .on("change", changed);

cell.selectAll(".tree2020")
    .attr("transform", "translate(600,200)");

    cell2010.selectAll(".tree2010")
        .attr("transform", "translate(130,408)");


//total 275403 in 2020
//total 93912



           svgWaffle.append("text")
                    .attr("y", 50)//magic number here
                    .attr("x", 600)
                    .attr('text-anchor', 'middle')
                    .attr("class","cropAge FruitTitle")
                    .attr("id","H2AChartTitle")
                    .text("H2-A Temporary Agricultural Workers, 2010 & 2020")




}

function dashboard() {

  var clicked = ""

  var path = d3.geoPath();

  var mapColor = d3.scaleLinear()
                   .domain([0,.37])
                   .range(["#e5f9ec","#05ce7c"])


  function opacityMeter (text) {

    if (text == "northeastI") {return "0.117"}
    else if (text == "northeastII") {return "0.069"}
    else if (text == "appalachianI") {return "0.062"}
    else if (text == "appalachianII") {return "0.016"}
    else if (text == "southeast") {return "0.067"}
    else if (text == "florida") {return "0.2280"}
    else if (text == "delta") {return "0.021"}
    else if (text == "cornbelt1") {return "0.046"}
    else if (text == "lakestates") {return "0.2370"}
    else if (text == "cornbeltII") {return "0.009"}
    else if (text == "northernplains") {return "0.035"}
    else if (text == "mountainI") {return "0.113"}
    else if (text == "southernplains") {return "0.046"}
    else if (text == "mountainIII") {return "0.058"}
    else if (text == "mountainII") {return "0.032"}
    else if (text == "pacific") {return "0.278"}
    else if (text == "california") {return "0.85"}
    else if (text == 'hawaii') {return "0.009"}
    else {return ".05"}
  }


  regionMap.append("svg")
      .attr("class", "AllUS")
    .selectAll("path")
     .data(topojson.feature(dataState, dataState.objects.states).features)
     // .data(topojson.feature(dataState, dataState.objects.states.geometries.filter( d=> d.id == "36" || d.id=="50"|| d.id=="33"|| d.id=="23"|| d.id=="25"|| d.id=="09"|| d.id=="44")))
     .enter()
     .append("path")
     // .attr("transform", "scale(.55) translate(105,-25)")
     .attr("transform", "scale(.57), translate (10,50)")
     // .attr("d", path)
     .attr("d", path)
     .attr("stroke", "#9B9EA0")
     .attr("fill", "none");

  regionMap.append("svg")
      .attr("class", "northeastI regionPath")
      .attr("c", "northeastI")
    .selectAll("path")
     .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "36" || d.id=="50"|| d.id=="33"|| d.id=="23"|| d.id=="25"|| d.id=="09"|| d.id=="44"))
     // .data(topojson.feature(dataState, dataState.objects.states.geometries.filter( d=> d.id == "36" || d.id=="50"|| d.id=="33"|| d.id=="23"|| d.id=="25"|| d.id=="09"|| d.id=="44")))
     .enter()
     .append("path")
     .attr("fill-opacity",opacityMeter("northeastI"))
     .style("fill", "#05ce7c")
     // .attr("transform", "scale(.55) translate(105,-25)")
    .attr("transform", "scale(.57), translate (10,50)")
     .attr("d", path)
     .attr("d", function(d) {
      var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "36" || d.id=="50"|| d.id=="33"|| d.id=="23"|| d.id=="25"|| d.id=="09"|| d.id=="44"))
       return path(feature);
    })
     .style("stroke", "#9B9EA0")
     .style("stroke-width",3)
     .on('mouseover', function (d) {
          d3.select(this).transition()
               .style("fill", function(d) {if (clicked!="northeastI") {return "#FFA538"} })

          })
          .on('mouseout', function (d) {
               d3.select(this).transition()
                    .style("fill", function(d) {if (clicked!="northeastI") {return "#05ce7c"} })

               });

               regionMap.selectAll(".northeastI")
                      .on("click", function() {

               if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
               // .attr("fill-opacity",opacityMeter(clicked))}

               clicked = "northeastI"


               d3.select("."+clicked).transition()
                              .style("fill", "#FFA538")
                              .attr('fill-opacity', function(d) {if (clicked!="northeastI") {return opacityMeter("northeastI")} });

                                northeastI(waffle)

                              });






     regionMap.append("svg")
         .attr("class", "northeastII regionPath")
       .selectAll("path")
        .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "42" || d.id=="34"|| d.id=="10"|| d.id=="24"))
        .enter()
        .append("path")
        .attr("fill-opacity",opacityMeter("northeastII"))
        .style("fill", "#05ce7c")
        // .attr("transform", "scale(.55) translate(90,-10)")
        .attr("transform", "scale(.57), translate (10,50)")
        .attr("d", function(d) {
         var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "42" || d.id=="34"|| d.id=="10"|| d.id=="24"))
          return path(feature);
       })
        .style("stroke", "#9B9EA0")
        .style("stroke-width",3)
        .on('mouseover', function (d) {
             d3.select(this).transition()
                  .style("fill", function(d) {if (clicked!="northeastII") {return "#FFA538"} })

             })
             .on('mouseout', function (d) {
                  d3.select(this).transition()
                       .style("fill", function(d) {if (clicked!="northeastII") {return "#05ce7c"} })

                  });

                  regionMap.selectAll(".northeastII")
                         .on("click", function() {

                  if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                  // .attr("fill-opacity",opacityMeter(clicked))}

                  clicked = "northeastII"


                  d3.select("."+clicked).transition()
                                 .style("fill", "#FFA538")
                                 .attr('fill-opacity', function(d) {if (clicked!="northeastII") {return opacityMeter("northeastII")} });

                                   northeastII(waffle)

                                 });

        regionMap.append("svg")
            .attr("class", "appalachianI regionPath")
          .selectAll("path")
           .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "51" || d.id=="37"))
           .enter()
           .append("path")
           .attr("fill-opacity",opacityMeter("appalachianI"))
           .style("fill", "#05ce7c")
           // .attr("transform", "scale(.55) translate(100,20)")
           .attr("transform", "scale(.57), translate (10,50)")
           .attr("d", function(d) {
            var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "51" || d.id=="37"))
             return path(feature);
          })
           .style("stroke", "#9B9EA0")
           .style("stroke-width",3)
           .on('mouseover', function (d) {
                d3.select(this).transition()
                     .style("fill", function(d) {if (clicked!="appalachianI") {return "#FFA538"} })

                })
                .on('mouseout', function (d) {
                     d3.select(this).transition()
                          .style("fill", function(d) {if (clicked!="appalachianI") {return "#05ce7c"} })

                     });

                     regionMap.selectAll(".appalachianI")
                            .on("click", function() {

                     if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                     // .attr("fill-opacity",opacityMeter(clicked))}

                     clicked = "appalachianI"


                     d3.select("."+clicked).transition()
                                    .style("fill", "#FFA538")
                                    .attr('fill-opacity', function(d) {if (clicked!="appalachianI") {return opacityMeter("appalachianI")} });

                                      appalachianI(waffle)

                                    });

           regionMap.append("svg")
               .attr("class", "appalachianII regionPath")
             .selectAll("path")
              .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "54" || d.id=="21" || d.id=="47"))
              .enter()
              .append("path")
              .attr("fill-opacity",opacityMeter("appalachianII"))
              .style("fill", "#05ce7c")
              // .attr("transform", "scale(.55) translate(65,10)")
              .attr("transform", "scale(.57), translate (10,50)")
              .attr("d", function(d) {
               var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "54" || d.id=="21" || d.id=="47"))
                return path(feature);
             })
              .style("stroke", "#9B9EA0")
              .style("stroke-width",3)
              .on('mouseover', function (d) {
                   d3.select(this).transition()
                        .style("fill", function(d) {if (clicked!="appalachianII") {return "#FFA538"} })

                   })
                   .on('mouseout', function (d) {
                        d3.select(this).transition()
                             .style("fill", function(d) {if (clicked!="appalachianII") {return "#05ce7c"} })

                        });

                        regionMap.selectAll(".appalachianII")
                               .on("click", function() {

                        if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                        // .attr("fill-opacity",opacityMeter(clicked))}

                        clicked = "appalachianII"


                        d3.select("."+clicked).transition()
                                       .style("fill", "#FFA538")
                                       .attr('fill-opacity', function(d) {if (clicked!="appalachianII") {return opacityMeter("appalachianII")} });

                                         appalachianII(waffle)

                                       });

              regionMap.append("svg")
                  .attr("class", "southeast regionPath")
                .selectAll("path")
                 .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "01" || d.id=="13" || d.id=="45"))
                 .enter()
                 .append("path")
                 .attr("fill-opacity",opacityMeter("southeast"))
                 .style("fill", "#05ce7c")
                 // .attr("transform", "scale(.55) translate(55,40)")
                 .attr("transform", "scale(.57), translate (10,50)")
                 .attr("d", function(d) {
                  var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "01" || d.id=="13" || d.id=="45"))
                   return path(feature);
                })
                 .style("stroke", "#9B9EA0")
                 .style("stroke-width",3)
                 .on('mouseover', function (d) {
                      d3.select(this).transition()
                           .style("fill", function(d) {if (clicked!="southeast") {return "#FFA538"} })

                      })
                      .on('mouseout', function (d) {
                           d3.select(this).transition()
                                .style("fill", function(d) {if (clicked!="southeast") {return "#05ce7c"} })

                           });

                           regionMap.selectAll(".southeast")
                                  .on("click", function() {

                           if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                           // .attr("fill-opacity",opacityMeter(clicked))}

                           clicked = "southeast"


                           d3.select("."+clicked).transition()
                                          .style("fill", "#FFA538")
                                          .attr('fill-opacity', function(d) {if (clicked!="southeast") {return opacityMeter("southeast")} });

                                            southeast(waffle)

                                          });



                 regionMap.append("svg")
                     .attr("class", "florida regionPath")
                   .selectAll("path")
                    .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "12"))
                    .enter()
                    .append("path")
                    .attr("fill-opacity",opacityMeter("florida"))
                    .style("fill", "#05ce7c")
                    // .attr("transform", "scale(.55) translate(70,70)")
                    .attr("transform", "scale(.57), translate (10,50)")
                   //  .attr("d", function(d) {
                   //   var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "12"))
                   //    return path(feature);
                   // })
                   .attr("d", path)
                    .style("stroke", "#9B9EA0")
                    .style("stroke-width",3)
                    .on('mouseover', function (d) {
                         d3.select(this).transition()
                              .style("fill", function(d) {if (clicked!="florida") {return "#FFA538"} })

                         })
                         .on('mouseout', function (d) {
                              d3.select(this).transition()
                                   .style("fill", function(d) {if (clicked!="florida") {return "#05ce7c"} })

                              });

                              regionMap.selectAll(".florida")
                                     .on("click", function() {

                              if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                              // .attr("fill-opacity",opacityMeter(clicked))}

                              clicked = "florida"


                              d3.select("."+clicked).transition()
                                             .style("fill", "#FFA538")
                                             .attr('fill-opacity', function(d) {if (clicked!="florida") {return opacityMeter("florida")} });

                                               florida(waffle)

                                             });

                    regionMap.append("svg")
                        .attr("class", "delta regionPath")
                      .selectAll("path")
                       .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "05" || d.id == "22" || d.id == "28"))
                       .enter()
                       .append("path")
                       .attr("fill-opacity",opacityMeter("delta"))
                       .style("fill", "#05ce7c")
                       // .attr("transform", "scale(.55) translate(70,50)")
                       .attr("transform", "scale(.57), translate (10,50)")
                       .attr("d", function(d) {
                        var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "05" || d.id == "22" || d.id == "28"))
                         return path(feature);
                      })
                       .style("stroke", "#9B9EA0")
                       .style("stroke-width",3)
                       .on('mouseover', function (d) {
                            d3.select(this).transition()
                                 .style("fill", function(d) {if (clicked!="delta") {return "#FFA538"} })

                            })
                            .on('mouseout', function (d) {
                                 d3.select(this).transition()
                                      .style("fill", function(d) {if (clicked!="delta") {return "#05ce7c"} })

                                 });

                                 regionMap.selectAll(".delta")
                                        .on("click", function() {

                                 if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                 // .attr("fill-opacity",opacityMeter(clicked))}

                                 clicked = "delta"


                                 d3.select("."+clicked).transition()
                                                .style("fill", "#FFA538")
                                                .attr('fill-opacity', function(d) {if (clicked!="delta") {return opacityMeter("delta")} });

                                                  delta(waffle)

                                                });

                       regionMap.append("svg")
                           .attr("class", "cornbelt1 regionPath")
                         .selectAll("path")
                          .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "39" || d.id == "18" || d.id == "17"))
                          .enter()
                          .append("path")
                          .attr("fill-opacity",opacityMeter("cornbelt1"))
                          .style("fill", "#05ce7c")
                          // .attr("transform", "scale(.55) translate(70,-30)")
                          .attr("transform", "scale(.57), translate (10,50)")
                          .attr("d", function(d) {
                           var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "39" || d.id == "18" || d.id == "17"))
                            return path(feature);
                         })
                          .style("stroke", "#9B9EA0")
                          .style("stroke-width",3)
                          .on('mouseover', function (d) {
                               d3.select(this).transition()
                                    .style("fill", function(d) {if (clicked!="cornbelt1") {return "#FFA538"} })

                               })
                               .on('mouseout', function (d) {
                                    d3.select(this).transition()
                                         .style("fill", function(d) {if (clicked!="cornbelt1") {return "#05ce7c"} })

                                    });

                                    regionMap.selectAll(".cornbelt1")
                                           .on("click", function() {

                                    if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                    // .attr("fill-opacity",opacityMeter(clicked))}

                                    clicked = "cornbelt1"


                                    d3.select("."+clicked).transition()
                                                   .style("fill", "#FFA538")
                                                   .attr('fill-opacity', function(d) {if (clicked!="cornbelt1") {return opacityMeter("cornbelt1")} });

                                                     cornbelt1(waffle)

                                                   });


                          regionMap.append("svg")
                              .attr("class", "lakestates regionPath")
                            .selectAll("path")
                             .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "26" || d.id == "55" || d.id == "27"))
                             .enter()
                             .append("path")
                             .attr("fill-opacity",opacityMeter("lakestates"))
                             .style("fill", "#05ce7c")
                             // .attr("transform", "scale(.55) translate(70,-40)")
                             .attr("transform", "scale(.57), translate (10,50)")
                             .attr("d", function(d) {
                              var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "26" || d.id == "55" || d.id == "27"))
                               return path(feature);
                            })
                             .style("stroke", "#9B9EA0")
                             .style("stroke-width",3)
                             .on('mouseover', function (d) {
                                  d3.select(this).transition()
                                       .style("fill", function(d) {if (clicked!="lakestates") {return "#FFA538"} })

                                  })
                                  .on('mouseout', function (d) {
                                       d3.select(this).transition()
                                            .style("fill", function(d) {if (clicked!="lakestates") {return "#05ce7c"} })

                                       });

                                       regionMap.selectAll(".lakestates")
                                              .on("click", function() {

                                       if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                       // .attr("fill-opacity",opacityMeter(clicked))}

                                       clicked = "lakestates"


                                       d3.select("."+clicked).transition()
                                                      .style("fill", "#FFA538")
                                                      .attr('fill-opacity', function(d) {if (clicked!="lakestates") {return opacityMeter("lakestates")} });

                                                        lakeStates(waffle)

                                                      });


                      regionMap.append("svg")
                        .attr("class", "cornbeltII regionPath")
                        .selectAll("path")
                       .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "19" || d.id == "29" ))
                       .enter()
                       .append("path")
                       .attr("fill-opacity",opacityMeter("cornbeltII"))
                       .style("fill", "#05ce7c")
                       // .attr("transform", "scale(.55) translate(50,-30)")
                       .attr("transform", "scale(.57), translate (10,50)")
                       .attr("d", function(d) {
                        var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "19" || d.id == "29"))
                         return path(feature);
                      })
                       .style("stroke", "#9B9EA0")
                       .style("stroke-width",3)
                       .on('mouseover', function (d) {
                            d3.select(this).transition()
                                 .style("fill", function(d) {if (clicked!="cornbeltII") {return "#FFA538"} })

                            })
                            .on('mouseout', function (d) {
                                 d3.select(this).transition()
                                      .style("fill", function(d) {if (clicked!="cornbeltII") {return "#05ce7c"} })

                                 });

                                 regionMap.selectAll(".cornbeltII")
                                        .on("click", function() {

                                 if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                 // .attr("fill-opacity",opacityMeter(clicked))}

                                 clicked = "cornbeltII"


                                 d3.select("."+clicked).transition()
                                                .style("fill", "#FFA538")
                                                .attr('fill-opacity', function(d) {if (clicked!="cornbeltII") {return opacityMeter("cornbeltII")} });

                                                  cornbelt2(waffle)

                                                });

                       regionMap.append("svg")
                         .attr("class", "northernplains regionPath")
                         .selectAll("path")
                        .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "38" || d.id == "46" || d.id == "31" || d.id == "20" ))
                        .enter()
                        .append("path")
                        .attr("fill-opacity",opacityMeter("northernplains"))
                        .style("fill", "#05ce7c")
                        // .attr("transform", "scale(.55) translate(40,-20)")
                        .attr("transform", "scale(.57), translate (10,50)")
                        .attr("d", function(d) {
                         var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "38" || d.id == "46" || d.id == "31" || d.id == "20"))
                          return path(feature);
                       })
                        .style("stroke", "#9B9EA0")
                        .style("stroke-width",3)
                        .on('mouseover', function (d) {
                             d3.select(this).transition()
                                  .style("fill", function(d) {if (clicked!="northernplains") {return "#FFA538"} })

                             })
                             .on('mouseout', function (d) {
                                  d3.select(this).transition()
                                       .style("fill", function(d) {if (clicked!="northernplains") {return "#05ce7c"} })

                                  });

                                  regionMap.selectAll(".northernplains")
                                         .on("click", function() {

                                  if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                  // .attr("fill-opacity",opacityMeter(clicked))}

                                  clicked = "northernplains"


                                  d3.select("."+clicked).transition()
                                                 .style("fill", "#FFA538")
                                                 .attr('fill-opacity', function(d) {if (clicked!="northernplains") {return opacityMeter("northernplains")} });

                                                   northernplains(waffle)

                                                 });

                        regionMap.append("svg")
                          .attr("class", "mountainI regionPath")
                          .selectAll("path")
                         .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "30" || d.id == "56" || d.id == "16" ))
                         .enter()
                         .append("path")
                         .attr("fill-opacity",opacityMeter("mountainI"))
                         .style("fill", "#05ce7c")
                         // .attr("transform", "scale(.55) translate(15,-20)")
                         .attr("transform", "scale(.57), translate (10,50)")
                         .attr("d", function(d) {
                          var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "30" || d.id == "56" || d.id == "16"))
                           return path(feature);
                        })
                         .style("stroke", "#9B9EA0")
                         .style("stroke-width",3)
                         .on('mouseover', function (d) {
                              d3.select(this).transition()
                                   .style("fill", function(d) {if (clicked!="mountainI") {return "#FFA538"} })

                              })
                              .on('mouseout', function (d) {
                                   d3.select(this).transition()
                                        .style("fill", function(d) {if (clicked!="mountainI") {return "#05ce7c"} })

                                   });

                                   regionMap.selectAll(".mountainI")
                                          .on("click", function() {

                                   if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                   // .attr("fill-opacity",opacityMeter(clicked))}

                                   clicked = "mountainI"


                                   d3.select("."+clicked).transition()
                                                  .style("fill", "#FFA538")
                                                  .attr('fill-opacity', function(d) {if (clicked!="mountainI") {return opacityMeter("mountainI")} });

                                                    mountainI(waffle)

                                                  });


                         regionMap.append("svg")
                           .attr("class", "southernplains regionPath")
                           .selectAll("path")
                          .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "48" || d.id == "40"))
                          .enter()
                          .append("path")
                          .attr("fill-opacity",opacityMeter("southernplains"))
                          .style("fill", "#05ce7c")
                          // .attr("transform", "scale(.55) translate(50,55)")
                          .attr("transform", "scale(.57), translate (10,50)")
                          .attr("d", function(d) {
                           var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "48" || d.id == "40"))
                            return path(feature);
                         })
                          .style("stroke", "#9B9EA0")
                          .style("stroke-width",3)
                          .on('mouseover', function (d) {
                               d3.select(this).transition()
                                    .style("fill", function(d) {if (clicked!="southernplains") {return "#FFA538"} })

                               })
                               .on('mouseout', function (d) {
                                    d3.select(this).transition()
                                         .style("fill", function(d) {if (clicked!="southernplains") {return "#05ce7c"} })

                                    });

                                    regionMap.selectAll(".southernplains")
                                           .on("click", function() {

                                    if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                    // .attr("fill-opacity",opacityMeter(clicked))}

                                    clicked = "southernplains"


                                    d3.select("."+clicked).transition()
                                                   .style("fill", "#FFA538")
                                                   .attr('fill-opacity', function(d) {if (clicked!="southernplains") {return opacityMeter("southernplains")} });

                                                     southernplains(waffle)

                                                   });

                          regionMap.append("svg")
                            .attr("class", "mountainII regionPath")
                            .selectAll("path")
                           .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "08" || d.id == "49" || d.id == "32"))
                           .enter()
                           .append("path")
                           .attr("fill-opacity",opacityMeter("mountainII"))
                           .style("fill", "#05ce7c")
                           // .attr("transform", "scale(.55) translate(20,20)")
                           .attr("transform", "scale(.57), translate (10,50)")
                           .attr("d", function(d) {
                            var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "08" || d.id == "49" || d.id == "32"))
                             return path(feature);
                          })
                           .style("stroke", "#9B9EA0")
                           .style("stroke-width",3)
                           .on('mouseover', function (d) {
                                d3.select(this).transition()
                                     .style("fill", function(d) {if (clicked!="mountainII") {return "#FFA538"} })

                                })
                                .on('mouseout', function (d) {
                                     d3.select(this).transition()
                                          .style("fill", function(d) {if (clicked!="mountainII") {return "#05ce7c"} })

                                     });

                                     regionMap.selectAll(".mountainII")
                                            .on("click", function() {

                                     if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                     // .attr("fill-opacity",opacityMeter(clicked))}

                                     clicked = "mountainII"


                                     d3.select("."+clicked).transition()
                                                    .style("fill", "#FFA538")
                                                    .attr('fill-opacity', function(d) {if (clicked!="mountainII") {return opacityMeter("mountainII")} });

                                                      mountainII(waffle)

                                                    });


                           regionMap.append("svg")
                             .attr("class", "mountainIII regionPath")
                             .selectAll("path")
                            .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "04" || d.id == "35"))
                            .enter()
                            .append("path")
                            .attr("fill-opacity",opacityMeter("mountainIII"))
                            .style("fill", "#05ce7c")
                            // .attr("transform", "scale(.55) translate(30,40)")
                            .attr("transform", "scale(.57), translate (10,50)")
                            .attr("d", function(d) {
                             var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "04" || d.id == "35"))
                              return path(feature);
                           })
                            .style("stroke", "#9B9EA0")
                            .style("stroke-width",3)
                            .on('mouseover', function (d) {
                                 d3.select(this).transition()
                                      .style("fill", function(d) {if (clicked!="mountainIII") {return "#FFA538"} })

                                 })
                                 .on('mouseout', function (d) {
                                      d3.select(this).transition()
                                           .style("fill", function(d) {if (clicked!="mountainIII") {return "#05ce7c"} })

                                      });

                                      regionMap.selectAll(".mountainIII")
                                             .on("click", function() {

                                      if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                      // .attr("fill-opacity",opacityMeter(clicked))}

                                      clicked = "mountainIII"


                                      d3.select("."+clicked).transition()
                                                     .style("fill", "#FFA538")
                                                     .attr('fill-opacity', function(d) {if (clicked!="mountainIII") {return opacityMeter("mountainIII")} });

                                                       mountainIII(waffle)

                                                     });


                             regionMap.append("svg")
                               .attr("class", "pacific regionPath")
                               .selectAll("path")
                              .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "53" || d.id == "41"))
                              .enter()
                              .append("path")
                              .attr("fill-opacity",opacityMeter("pacific"))
                              .style("fill", "#05ce7c")
                              // .attr("transform", "scale(.55) translate(-10,-10)")
                              .attr("transform", "scale(.57), translate (10,50)")
                              .attr("d", function(d) {
                               var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "53" || d.id == "41"))
                                return path(feature);
                             })
                              .style("stroke", "#9B9EA0")
                              .style("stroke-width",3)
                              .on('mouseover', function (d) {
                                   d3.select(this).transition()
                                        .style("fill", function(d) {if (clicked!="pacific") {return "#FFA538"} })

                                   })
                                   .on('mouseout', function (d) {
                                        d3.select(this).transition()
                                             .style("fill", function(d) {if (clicked!="pacific") {return "#05ce7c"} })

                                        });

                                        regionMap.selectAll(".pacific")
                                               .on("click", function() {

                                        if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                        // .attr("fill-opacity",opacityMeter(clicked))}

                                        clicked = "pacific"


                                        d3.select("."+clicked).transition()
                                                       .style("fill", "#FFA538")
                                                       .attr('fill-opacity', function(d) {if (clicked!="pacific") {return opacityMeter("pacific")} });

                                                         pacific(waffle)

                                                       });


                              regionMap.append("svg")
                                .attr("class", "california regionPath")
                                .selectAll("path")
                               .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "06"))
                               .enter()
                               .append("path")
                               .attr("fill-opacity",opacityMeter("california"))
                               .style("fill", "#05ce7c")
                               // .attr("transform", "scale(.55) translate(-10,20)")
                               .attr("transform", "scale(.57), translate (10,50)")
                               .attr("d",path)
                              //  .attr("d", function(d) {
                              //   var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "06"))
                              //    return path(feature);
                              // })
                               .style("stroke", "#9B9EA0")
                               .style("stroke-width",3)
                               .on('mouseover', function (d) {
                                    d3.select(this).transition()
                                         .style("fill", function(d) {if (clicked!="california") {return "#FFA538"} })
                                         // .attr('fill-opacity', function(d) {if (clicked!="california") {return opacityMeter("california")} });
                                    })
                                    .on('mouseout', function (d) {
                                         d3.select(this).transition()
                                              .style("fill", function(d) {if (clicked!="california") {return "#05ce7c"} })
                                              // .attr('fill-opacity', function(d) {if (clicked!="california") {return opacityMeter("california")} });
                                         });

                                         regionMap.selectAll(".california")
                                                .on("click", function() {

                                         if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                         // .attr("fill-opacity",opacityMeter(clicked))}

                                         clicked = "california"

                                         // d3.selectAll(".regionPath").transition()
                                         //                         .style("fill", "#6063ED")
                                         //                         .attr('fill-opacity', opacityMeter("california"));

                                         d3.select("."+clicked).transition()
                                                        .style("fill", "#FFA538")
                                                        .attr('fill-opacity', function(d) {if (clicked!="california") {return opacityMeter("california")} });

                                                          california(waffle)

                                                        });

                               regionMap.append("svg")
                                 .attr("class", "hawaii regionPath")
                                 .selectAll("path")
                                .data(topojson.feature(dataState, dataState.objects.states).features.filter(d=> d.id == "15" || d.id == "02"))
                                .enter()
                                .append("path")
                                .attr("fill-opacity",opacityMeter("hawaii"))
                                .style("fill", "#05ce7c")
                                // .attr("transform", "scale(.55) translate(-10,20)")
                                .attr("transform", "scale(.57), translate (10,50)")
                                .attr("d", function(d) {
                                 var feature = topojson.merge(dataState, dataState.objects.states.geometries.filter(d=> d.id == "15" || d.id == "02"))
                                  return path(feature);
                               })
                                .style("stroke", "#9B9EA0")
                                .style("stroke-width",3)
                                .on('mouseover', function (d) {
                                     d3.select(this).transition()
                                          .style("fill", function(d) {if (clicked!="hawaii") {return "#FFA538"} })

                                     })
                                     .on('mouseout', function (d) {
                                          d3.select(this).transition()
                                               .style("fill", function(d) {if (clicked!="hawaii") {return "#05ce7c"} })

                                          });

                                          regionMap.selectAll(".hawaii")
                                                 .on("click", function() {

                                          if (clicked !="") {d3.select("."+clicked).style("fill","#05ce7c")}
                                          // .attr("fill-opacity",opacityMeter(clicked))}

                                          clicked = "hawaii"


                                          d3.select("."+clicked).transition()
                                                         .style("fill", "#FFA538")
                                                         .attr('fill-opacity', function(d) {if (clicked!="hawaii") {return opacityMeter("hawaii")} });

                                                           hawaii(waffle)

                                                         });






                                // .on('mouseover', function (d) {
                                //      d3.select(this).transition()
                                //           .attr('fill-opacity', function(d) {if (clicked!="hawaii") {return "#FFA538"} });
                                //      })
                                //      .on('mouseout', function (d) {
                                //           d3.select(this).transition()
                                //                .attr('fill-opacity', function(d) {if (clicked!="hawaii") {return opacityMeter("hawaii")} });
                                //           });
                                //
                                //           regionMap.selectAll(".hawaii")
                                //                  .on("click", function() {
                                //
                                //           if (clicked !="") {d3.select("."+clicked).attr("fill-opacity",opacityMeter(clicked))}
                                //
                                //           clicked = "hawaii"
                                //
                                //           d3.selectAll(".regionPath").transition()
                                //                                   .attr('fill-opacity', opacityMeter("hawaii"));
                                //
                                //           d3.select(this).transition()
                                //                          .attr('fill-opacity', '0.7');
                                //
                                //                            hawaii(waffle)
                                //
                                //                          });







            // var acresNation = waffle.filter(function(d) { return d.AcresRegion == 'Nation' })



          //   var keyAcresMaker = waffle.columns.slice(1)
          //
          //   var keyAcres = [keyAcresMaker[27],keyAcresMaker[29],keyAcresMaker[28]]
          //
          //
          //
          //   var colorAcres = d3.scaleOrdinal()
          //                 .domain([keyAcres])
          //                 .range(["#3A3745","#6063ED","#FFDB21"])
          //
          //
          //   var stackAcres = d3.stack().keys(keyAcres);
          //
          //   var stackAcresData = waffle.filter(d=>d.AcresRegion=="Nation")
          //
          //   var stackAcresDataNortheast1 = waffle.filter(d=>d.AcresRegion=="Notheast1")

          //
          //   //
          //   var stackedValuesAcres = stackAcres(stackAcresData);
          //   //
          //   //
          //   //
          //   var stackedAcresData = [];
          //   // Copy the stack offsets back into the data.
          //   stackedValuesAcres.forEach((layer, index) => {
          //     var currentStack = [];
          //     layer.forEach((d, i) => {
          //       currentStack.push({
          //         values: d,
          //         key: index,
          //         Year: waffle[i].AcresYear
          //       });
          //     });
          //     stackedAcresData.push(currentStack);
          //   });
          //
          //
          //
          //   seriesAcres = acresChart
          //                 .selectAll(".seriesAcres")
          //                 .data(stackedAcresData)
          //                 .enter()
          //                 .append("g")
          //                 .attr("class", "seriesAcres");
          //
          //   var areaAcresRegion = d3.area()
          //                .x(dataPoint => xAcres(dataPoint.Year) )
          //                .y0(dataPoint => yAcresRegion(dataPoint.values[0]))
          //                .y1(dataPoint => yAcresRegion(dataPoint.values[1]));
          //
          //                var areaAcres = d3.area()
          //                             .x(dataPoint => xAcres(dataPoint.Year) )
          //                             .y0(dataPoint => yAcres(dataPoint.values[0]))
          //                             .y1(dataPoint => yAcres(dataPoint.values[1]));
          //
          // var areaAcresRegionMil = d3.area()
          //              .x(dataPoint => xAcres(dataPoint.Year) )
          //              .y0(dataPoint => yAcresRegionMil(dataPoint.values[0]))
          //              .y1(dataPoint => yAcresRegionMil(dataPoint.values[1]));
          //
          //
          //
          //       seriesAcres
          //         .append("path")
          //         .attr("transform", `translate(0,50)`)
          //         .attr("d", data => areaAcres(data))

          //         // .attr("fill", keys => color(keys[0],keys[1]))
          //         .attr("fill", function(d, i) {if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
          //         // .attr("fill", d=> function(d) {if (d.key==0){return "#3A3745"} else if (d.key==1){return "#FFDB21"} else {return "#21D177"}})
          //         // .attr("fill", function(d) {return d.key})
          //         .attr("class","areaCrop")
          //         // .attr('class',function(d, i) {if (d[i].values[0]==0){return "areaCrop1"} else {return "areaCrop2"}});
          //
          //           acresChart.append("g")
          //                   .attr("transform", `translate(0,${acresHeight-50})`)
          //                   .call(d3.axisBottom(xAcres)
          //                 .tickFormat(function(d){return formatNoComma(d)}))
          //                   // .ticks(acresWidth).tickSizeOuter(0)
          //
          //
          //           acresChart.append("g")
          //                   .attr("transform", `translate(80,50)`)
          //                   .call(d3.axisLeft(yAcres)
          //                   .tickFormat(function(d){return d/1000000 + " Mil"}))
          //                   .call(g => g.select(".domain").remove())
          //                   .call(g => g.select(".tick:last-of-type text").clone()
          //                   .attr("x", 3)
          //                   .attr("text-anchor", "start")
          //                   .attr("font-weight", "bold"))
          //                   .attr("class", "yAxisAcres")
          //
          //
          //                   d3.select('.yAxisAcres .tick:first-child').remove()
          //
          //
            var h2adataNation = waffle.filter(d=>d.Region_H2A=="Nation")
            var wageNation = waffle.filter(d=>d.WageRegion=="Nation").sort(function(a,b){return d3.descending(a.indexWage,b.indexWage)})

            //
            var yWage =d3.scaleBand()
    .range([ 50, acresHeight])
    .domain(["Crop Workers",'H.S. Graduates','College Graduates'])
    .padding(.1);

            // var yWage =d3.scaleOrdinal()
            // .rangeRoundBands([acresHeight, 0], .2, 0.5);



            var barsWage = wageChart.selectAll(".barWage")
            .data(wageNation, function(d) { return d.NameWage; })
            .enter()
            .append("g")

        //append rects
        barsWage.append("rect")
            .attr("class", "barWage")
            .attr("y", function (d) {
                return yWage(d.NameWage);
            })
            .attr("height", 85)
            .attr("x", xWage(0))
            .attr("width", function (d) {
                return xWage(+d.Wage)-xWage(0)
            })
            .attr("fill", function(d){if(d.orderWage==1){return "#FFA538"} else if(d.orderWage==2){return "#94e5b3"} if(d.orderWage==3){return "#76dda1"} else {return "#51d68e"}});


            barsWage.append("g")
                    .attr("transform", `translate(0,376)`)
                    .attr("class", "BarChart")
                    .call(d3.axisBottom(xWage))


          barsWage.append("text")
                  .attr("x", 95)
                  .attr("y", 110)
                  .attr("text-anchor", "end")
                  .attr("class", "barText")
                  .text("Crop Workers")


       barsWage.append("text")
               .attr("x", 95)
               .attr("y", 217)
               .attr("text-anchor", "end")
               .attr("class", "barText")
               .text("High School")

               barsWage.append("text")
                       .attr("x", 95)
                       .attr("y", 233)
                       .attr("text-anchor", "end")
                       .attr("class", "barText")
                       .text("Graduates")

             barsWage.append("text")
                     .attr("x", 95)
                     .attr("y", 327)
                     .attr("text-anchor", "end")
                     .attr("class", "barText")
                     .text("College")

             barsWage.append("text")
                     .attr("x", 95)
                     .attr("y", 343)
                     .attr("text-anchor", "end")
                     .attr("class", "barText")
                     .text("Graduates")

                     barsWage.append("text")
                             .attr("x", 300)
                             .attr("y", 40)
                             .attr("text-anchor", "middle")
                             .attr("class", "barDBTitle")
                             .text("Wage Growth, 2005-2020")



// var barGroupKey = waffle.columns.slice(1)
//
// barGroupKey=[barGroupKey[38],barGroupKey[39],barGroupKey[40],barGroupKey[41]]


function groupData(data) {
  var dataAgeGroup = [
    { key: "2010", values:
    [
      {grpName:'Foreign-Born', grpValue:+data[0].fb_2010Age},
      {grpName:'U.S. Born', grpValue:+data[0].usb_2010Age}
    ]
  },
  { key: "2019", values:
    [
      {grpName:'Foreign-Born', grpValue:+data[0].fb_2020Age},
      {grpName:'U.S. Born', grpValue:+data[0].usb_2020Age}
    ]
  }
]
return dataAgeGroup
}
var dataGroupTest = groupData(h2adataNation)

function groupDataWork(data) {
  var dataAgeGroup = [
    { key: "2010", values:
    [
      {grpName:'Foreign-Born', grpValue:+data[0].fb_2010Work},
      {grpName:'U.S. Born', grpValue:+data[0].usb_2010Work}
    ]
  },
  { key: "2019", values:
    [
      {grpName:'Foreign-Born', grpValue:+data[0].fb_2019Work},
      {grpName:'U.S. Born', grpValue:+data[0].usb_2019Work}
    ]
  }
]
return dataAgeGroup
}
var dataGroupWork = groupDataWork(h2adataNation)


var xBarDB0  = d3.scaleBand().rangeRound([60,350], .5).padding(0.2);
var xBarDB1  = d3.scaleBand();
var yBarDB   = d3.scaleLinear();
var yBarWork   = d3.scaleLinear().rangeRound([400, 20]);

var xAxisBarDB = d3.axisBottom().scale(xBarDB0)


var yAxisBarDB = d3.axisLeft().scale(yBarDB);

var yAxisBarWork = d3.axisLeft().scale(yBarWork);

const colorBarDB = d3.scaleOrdinal(["#51d68e","#b1ecc6"]);

xBarDB0.domain(["2010","2019"]);
xBarDB1.domain(["Foreign-Born","U.S. Born"]).rangeRound([0, xBarDB0.bandwidth()]);
yBarDB.domain([16, 57]).range([335,0]);
yBarWork.domain([0, 350000]).range([335,0]);


function chartMaker(dataGroupTest) {

ageBox.selectAll(".NA_disclamer").remove();




ageBox.append("g")
  .attr("class", "yAxisBarDB ageDB")
  .style('opacity','0')
  .attr("transform", "translate(40,0)")
  .call(yAxisBarDB)

    ageBox.append("text")
        .attr("transform", "rotate(-90)")
        .attr("class","yAxisBarDB ageDB")
        .attr("y", 10)
        .attr('x',-220)
        .attr("dy", "1.2em")
        .style("text-anchor", "end")
        .text("Age");



// svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

var slice = ageBox.selectAll(".slice")
  .data(dataGroupTest)
  .enter().append("g")
  .attr("class", "g ageDB")
  .attr("transform",function(d) {return "translate(" + xBarDB0(d.key) + ",2)"; });


  slice.selectAll("rect")
  .data(function(d) {return d.values; })
        .enter()
        .append("rect")
        .attr("class", "barDB ageDB")
        .attr("width", 40)
        .attr("x", function(d) {return xBarDB1(d.grpName); })
         .style("fill", function(d) { return colorBarDB(d.grpName) })
         .attr("y", function(d) { return yBarDB(16); })
         .attr("height", function(d) { return 600 - yBarDB(16); })




slice.selectAll("rect")
  .attr("y", function(d) { return yBarDB(d.grpValue); })
  .attr("height", function(d) { return 335 - yBarDB(d.grpValue); });


    slice.selectAll(".avgAgeDB")
        .data(function(d) { return d.values; })
              .enter()
        .append("text")
      .attr("class","avgAgeDB ageDB")
      .attr('x',function(d) {return xBarDB1(d.grpName)+20; })
      .attr("y", function(d) { return yBarDB(d.grpValue)-9; })
      .style("visibility", "visible")
      .style("text-anchor", "middle")
      .text(function(d) { return formatTenth(d.grpValue)});

      ageBox.append("g")
        .attr("class", "xAxisBarDB ageDB")
        .attr("transform", "translate(0,336)")
        .call(xAxisBarDB);

    }


function workerCountMaker(data) {

  workerChart.selectAll(".workerkDB").remove()
  workerChart.selectAll(".countWorkDB").remove()
  workerChart.selectAll(".yAxisBarDB").remove()
  workerChart.selectAll(".NA_disclamer").remove()



  if (clicked == "california" ) {

    yBarWork.domain([0, 220000]);
    yAxisBarWork = d3.axisLeft().scale(yBarWork)

  }

  else if (clicked == "pacific" | clicked == "florida") {

    yBarWork.domain([0, 60000]);
    yAxisBarWork = d3.axisLeft().scale(yBarWork)

  }

  else if ( clicked == "lakestates" | clicked == "cornbelt1" | clicked == "southernplains") {
    yBarWork.domain([0, 30000]);
    yAxisBarWork = d3.axisLeft().scale(yBarWork)

  }

  else if (clicked == "appalachianI" | clicked == "appalachianII" | clicked == "northeastI"| clicked == "northeastII"| clicked == "southeast" | clicked == "delta" | clicked == "mountainI" | clicked == "mountainII" | clicked == "mountainIII" ) {
    yBarWork.domain([0, 15000]);
    yAxisBarWork = d3.axisLeft().scale(yBarWork)

  }

  else {
    yBarWork.domain([0, 500000]);
    yAxisBarWork = d3.axisLeft().scale(yBarWork)

  }

    workerChart.append("g")
      .attr("class", "xAxisBarDB workerkDB")
      .attr("transform", "translate(0,335)")
      .call(xAxisBarDB);


    workerChart.append("g")
      .attr("class", "yAxisBarDB workerDB")
      .style('opacity','0')
      .attr("transform", "translate(40,0)")
      .call(yAxisBarWork)

        workerChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("class","yAxisBarDB workerDB")
            .attr("y", 10)
            .attr('x',-220)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .text("# of Workers");



    // svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var sliceW = workerChart.selectAll(".sliceW")
      .data(data)
      .enter().append("g")
      .attr("class", "g workerDB")
      .attr("transform",function(d) {return "translate(" + xBarDB0(d.key) + ",0)"; });


      sliceW.selectAll("rect")
      .data(function(d) {return d.values; })
            .enter()
            .append("rect")
            .attr("class", "barDB workerkDB")
            .attr("width", 40)
            .attr("x", function(d) {return xBarDB1(d.grpName); })
            .style("fill", function(d) { return colorBarDB(d.grpName) })
            .attr("y", function(d) { return yBarWork(0); })
            .attr("height", function(d) { return 600 - yBarWork(0); })




    sliceW.selectAll("rect")
      .attr("y", function(d) { return yBarWork(d.grpValue); })
      .attr("height", function(d) { return 335 - yBarWork(d.grpValue); });


        sliceW.selectAll(".countWorkDB")
          .data(function(d) { return d.values; })
          .enter()
          .append("text")
          .attr("class","countWorkDB workerDB")
          .attr('x',function(d) {return xBarDB1(d.grpName)+20; })
          .attr("y", function(d) { return yBarWork(d.grpValue)-9; })
          .style("visibility", "visible")
          .style("text-anchor", "middle")
          .text(function(d) { return formatComma(d.grpValue)});

        }


    chartMaker(dataGroupTest)
    workerCountMaker(dataGroupWork)

      ageBox.append("text")
            .attr("class", "titleAgeBoxDB")
            .attr('x', 200)
            .attr("y", 47)
            .style("text-anchor", "middle")
            .text("Crop Worker Average Age");

            ageBox.append("rect")
                    .attr("y", 365)//magic number here
                    .attr("x", 140)
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("fill","#05CE7C")
                    .attr("class","workerCount")
                    .attr("text-anchor","middle")

            ageBox.append("text")
                  .attr("y", 395)//magic number here
                  .attr("x", 150)
                  .attr("class","workerCount")
                  .text("Foreign Born")
                  .attr("text-anchor","middle")


                  ageBox.append("rect")
                          .attr("y", 365)//magic number here
                          .attr("x", 240)
                          .attr("width", 15)
                          .attr("height", 15)
                          .attr("fill","#b1ecc6")
                          .attr("class","workerCount")
                          .attr("text-anchor","middle")

                  ageBox.append("text")
                        .attr("y", 395)//magic number here
                        .attr("x", 250)
                        .attr("class","workerCount")
                        .text("U.S. Born")
                        .attr("text-anchor","middle")

            workerChart.append("text")
                  .attr("class", "titleAgeBoxDB")
                  .attr('x', 200)
                  .attr("y", 47)
                  .style("text-anchor", "middle")
                  .text("Number of Crop Workers");


workerChart.append("rect")
        .attr("y", 365)//magic number here
        .attr("x", 140)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill","#05CE7C")
        .attr("class","workerCount")
        .attr("text-anchor","middle")

workerChart.append("text")
      .attr("y", 395)//magic number here
      .attr("x", 150)
      .attr("class","workerCount")
      .text("Foreign Born")
      .attr("text-anchor","middle")


      workerChart.append("rect")
              .attr("y", 365)//magic number here
              .attr("x", 240)
              .attr("width", 15)
              .attr("height", 15)
              .attr("fill","#b1ecc6")
              .attr("class","workerCount")
              .attr("text-anchor","middle")

      workerChart.append("text")
            .attr("y", 395)//magic number here
            .attr("x", 250)
            .attr("class","workerCount")
            .text("U.S. Born")
            .attr("text-anchor","middle")

h2aBox.append("text").attr("x", h2aWidth/2).attr("y", 365).attr("text-anchor", "middle").attr("class", "h2aDisclamer").text("Includes workers in crop, livestock,")
h2aBox.append("text").attr("x", h2aWidth/2).attr("y", 380).attr("text-anchor", "middle").attr("class", "h2aDisclamer").text("dairy, fisheries, and general farming")


h2aBox.selectAll(".h2aTitle").data(waffle).enter().append("text").attr("x", h2aWidth/2).attr("y", 50).attr("text-anchor", "middle").attr("font-weight", "bold").attr("class", "h2aTitle").text(function(d) { if(d.Region_H2A=="Nation"){return d.Region_H2A_text+ ":"}})

h2aBox.selectAll(".h2aLine2").data(waffle).enter().append("text").attr("x", h2aWidth/2).attr("y", 90).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#FFDB21').attr("class", "h2aLine2 numberText").text(function(d) { if(d.Region_H2A=="Nation"){return formatComma(d.H2A_2010)}})
h2aBox.append("text").attr("x", h2aWidth/2).attr("y", 110).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#3A3745').attr("class", "h2aLine3 h2aYear").text("H2-A farm workers in 2010")

h2aBox.selectAll(".h2aLine4").data(waffle).enter().append("text").attr("x", h2aWidth/2).attr("y", 160).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#FFA538').attr("class", "h2aLine4 numberText").text(function(d) { if(d.Region_H2A=="Nation"){return formatComma(d.H2A_2020)}})
h2aBox.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#3A3745').attr("class", "h2aLine5 h2aYear").text("H2-A farm workers in 2020")

h2aBox.selectAll(".h2aLine6").data(waffle).enter().append("text").attr("x", h2aWidth/2).attr("y", 230).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#05ce7c').attr("class", "h2aLine6 numberText").text(function(d) { if(d.Region_H2A=="Nation"){return "+"+formatPercent(d.H2A_Increase)}})

h2aBox.append("text").attr("x", h2aWidth/2).attr("y", 260).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#3A3745').attr("class", "h2aLine8 topCropTitle").text("Top crops specified on H2-A visa:")
h2aBox.selectAll(".h2aLine9").data(waffle).enter().append("text").attr("x", h2aWidth/2).attr("y", 285).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#ffa538').attr("class", "h2aLine9 h2aProduce").text(function(d) { if(d.Region_H2A=="Nation"){return d.Produce1 +","}})
h2aBox.selectAll(".h2aLine10").data(waffle).enter().append("text").attr("x", h2aWidth/2).attr("y",310).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#FFDB21').attr("class", "h2aLine10 h2aProduce").text(function(d) { if(d.Region_H2A=="Nation"){return  d.Produce2+","}})
h2aBox.selectAll(".h2aLine11").data(waffle).enter().append("text").attr("x", h2aWidth/2).attr("y",335).attr("text-anchor", "middle").attr("font-weight", "bold").attr("fill", '#f9c9b5').attr("class", "h2aLine11 h2aProduce").text(function(d) { if(d.Region_H2A=="Nation"){return "& "+ d.Produce3}})

h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return d.Region_H2A_text+ ":"}})
h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return formatComma(d.H2A_2010)}})
h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return formatComma(d.H2A_2020)}})
h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return "+"+formatPercent(d.H2A_Increase)}})
h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return d.Produce1 +", "}})
h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return d.Produce2+","}})
h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return "& "+ d.Produce3}})





// acresChart.selectAll(".barDB1")
//           .data(waffle).enter()
//           .append("text")
//           .attr("x", 300)
//           .attr("y", 30)
//           .attr("text-anchor", "middle")
//           .attr("font-weight", "bold")
//           .attr("class", "barDB1")
//           .text(function(d) { if(d.Region_H2A=="Nation"){return d.Region_H2A_text+ ":"}})
//
// acresChart.selectAll(".barDB2")
//           .data(waffle).enter()
//           .append("text")
//           .attr('x', 300)
//           .attr("y", 60)
//           .attr("class", "barDB2")
//           .attr("text-anchor", "middle")
//           .attr("font-weight", "bold")
//           .attr("fill", '#3A3745')
//           .text(function (d) {if (d.Region_H2A=="Nation") { return formatComma(d.PercentProduce) + " Acres"}})

regionMap.selectAll(".mapTitleDash")
         .data(waffle).enter()
         .append('text')
         .attr("x", 300)
         .attr("y", 20)
         .attr("class", "mapTitleDash")
         .attr("text-anchor", "middle")
         .attr("font-weight", "bold")
         .attr("fill", '#3A3745')
         .text(function(d) {if (d.Region_H2A=="Nation") {return ''}})

         regionMap.selectAll(".mapTitlePercent")
                  .data(waffle).enter()
                  .append('text')
                  .attr("x", 300)
                  .attr("y", 40)
                  .attr("class", "mapTitlePercent")
                  .attr("text-anchor", "middle")
                  .attr("fill", '#3A3745')
                  .text(function(d) {if (d.Region_H2A=="Nation") {return ''}})


regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return "USDA Labor Regions"}})
      regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Nation"){return ""}})
// acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Nation")  {return d.Region_H2A_text }})
// acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Nation")  {return d.PercentProduce + " Acres of Fruits and Vegetables Harvested"}})





function northeastI (waffle) {

  var dataNE1 = waffle.filter(d=>d.Region_H2A=="NortheastI")

  dataGroupTest = groupData(dataNE1)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataNE1)

  workerCountMaker(dataGroupWork)





regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return d.Region_H2A_text}})
regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
// acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="NortheastI")  {return d.Region_H2A_text }})
// acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="NortheastI")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})


    var wageNE1 = waffle.filter(d=>d.WageRegion=="Northeast I").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})

  // var stackAcresDataNortheast1 = waffle.filter(d=>d.AcresRegion=="Northeast1")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresNE1 = stackAcres(stackAcresDataNortheast1);
  //
  // var stackedAcresDataNE1 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresNE1.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataNE1.push(currentStack);
  // });
  //

    // var seriesNortheast1 = acresChart
    //               .selectAll(".areaCrop")
    //               .data(stackedAcresDataNE1)

      // seriesNortheast1
      //       .transition()
      //       .duration(1000)
      //       .attr("d", data =>  areaAcresRegion(data))
      //       .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
      //
      //
      //       acresChart.selectAll(".yAxisAcres")
      //               .transition()
      //               .duration(1000)
      //               .call(d3.axisLeft(yAcresRegion))

            barsWage.selectAll(".barWage")
                    .data(wageNE1, function(d) { return d.NameWage; })
                    .transition()
                    .duration(1000)
                    .attr("width", function (d) {
                        return xWage(+d.Wage)-xWage(0)
                    })


                    h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return d.Region_H2A_text+ ":"}})
                    h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return formatComma(d.H2A_2010)}})
                    h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return formatComma(d.H2A_2020)}})
                    h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return "+"+formatPercent(d.H2A_Increase)}})
                    h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return d.Produce1 +", "}})
                    h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return d.Produce2+","}})
                    h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastI"){return "& "+ d.Produce3}})



}


function appalachianI (waffle) {

  var dataAP1 = waffle.filter(d=>d.Region_H2A=="AppalachianI")

  dataGroupTest = groupData(dataAP1)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataAP1)
  workerCountMaker(dataGroupWork)



  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return d.Region_H2A_text}})
  regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})


  var wageAP1 = waffle.filter(d=>d.WageRegion=="Appalachian I").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})

  // var stackAcresDataAppalachian1 = waffle.filter(d=>d.AcresRegion=="Appalachian1")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresAP1 = stackAcres(stackAcresDataAppalachian1);
  //
  // var stackedAcresDataAP1 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresAP1.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataAP1.push(currentStack);
  // });
  //
  //
  //   var seriesAppalachian1 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataAP1)
  //
  //     seriesAppalachian1
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageAP1, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })

                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianI"){return "& "+ d.Produce3}})

}


function northeastII (waffle) {

  var dataNE2 = waffle.filter(d=>d.Region_H2A=="NortheastII")

  dataGroupTest = groupData(dataNE2)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataNE2)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return d.Region_H2A_text}})
  regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})

  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="NortheastII")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="NortheastII")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageNE2 = waffle.filter(d=>d.WageRegion=="Northeast II").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})

  // var stackAcresDataNortheast2 = waffle.filter(d=>d.AcresRegion=="Northeast2")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresNE2 = stackAcres(stackAcresDataNortheast2);
  //
  // var stackedAcresDataNE2 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresNE2.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataNE2.push(currentStack);
  // });
  //
  //
  //   var seriesNortheast2 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataNE2)
  //
  //     seriesNortheast2
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageNE2, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })

                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NortheastII"){return "& "+ d.Produce3}})

}

// function appalachianI (waffle) {
//
//   var stackAcresDataAppalachian1 = waffle.filter(d=>d.AcresRegion=="Appalachian1")
//
//   // stackAcres = d3.stack().keys(keyAcres);
//   var stackedValuesAcresAP1 = stackAcres(stackAcresDataAppalachian1);
//
//   var stackedAcresDataAP1 = [];
//   // Copy the stack offsets back into the data.
//   stackedValuesAcresAP1.forEach((layer, index) => {
//     var currentStack = [];
//     layer.forEach((d, i) => {
//       currentStack.push({
//         values: d,
//         key: index,
//         Year: waffle[i].AcresYear
//       });
//     });
//     stackedAcresDataAP1.push(currentStack);
//   });
//
//
//     var seriesAppalachian1 = acresChart
//                   .selectAll(".areaCrop")
//                   .data(stackedAcresDataAP1)
//
//       seriesAppalachian1
//             .transition()
//             .duration(1000)
//             .attr("d", data =>  areaAcresRegion(data))
//             .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
//
//
//             acresChart.selectAll(".yAxisAcres")
//                     .transition()
//                     .call(d3.axisLeft(yAcresRegion))
//
// }

function appalachianII (waffle) {

  var dataAP2 = waffle.filter(d=>d.Region_H2A=="AppalachianII")

  dataGroupTest = groupData(dataAP2)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataAP2)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return d.Region_H2A_text}})
  regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})

  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="AppalachianII")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="AppalachianII")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})


  var wageAP2 = waffle.filter(d=>d.WageRegion=="Appalachian II").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})

  // var stackAcresDataAppalachian2 = waffle.filter(d=>d.AcresRegion=="Appalachian2")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresAP2 = stackAcres(stackAcresDataAppalachian2);
  //
  // var stackedAcresDataAP2 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresAP2.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataAP2.push(currentStack);
  // });
  //
  //
  //   var seriesAppalachian2 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataAP2)
  //
  //     seriesAppalachian2
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageAP2, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="AppalachianII"){return "& "+ d.Produce3}})


}

function southeast (waffle) {

  var dataSE = waffle.filter(d=>d.Region_H2A=="Southeast")

  dataGroupTest = groupData(dataSE)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataSE)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return d.Region_H2A_text}})
    regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Southeast")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Southeast")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})


  var wageSE = waffle.filter(d=>d.WageRegion=="Southeast").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})

  // var stackAcresDataSoutheast = waffle.filter(d=>d.AcresRegion=="Southeast")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresSE = stackAcres(stackAcresDataSoutheast);
  //
  // var stackedAcresDataSE = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresSE.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataSE.push(currentStack);
  // });
  //
  //
  //   var seriesSoutheast = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataSE)
  //
  //     seriesSoutheast
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))
  //

                    barsWage.selectAll(".barWage")
                            .data(wageSE, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Southeast"){return "& "+ d.Produce3}})

}

function florida (waffle) {

  var dataFL = waffle.filter(d=>d.Region_H2A=="Florida")

  dataGroupTest = groupData(dataFL)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataFL)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return d.Region_H2A_text}})
    regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Florida")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Florida")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})

  var wageFL = waffle.filter(d=>d.WageRegion=="Florida").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataFlorida = waffle.filter(d=>d.AcresRegion=="Florida")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresFL = stackAcres(stackAcresDataFlorida);
  //
  // var stackedAcresDataFL = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresFL.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataFL.push(currentStack);
  // });
  //
  //
  //   var seriesFlorida = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataFL)
  //
  //     seriesFlorida
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegionMil(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegionMil))

                    barsWage.selectAll(".barWage")
                            .data(wageFL, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Florida"){return "& "+ d.Produce3}})


}

function delta (waffle) {

  var dataDE = waffle.filter(d=>d.Region_H2A=="Delta")

  dataGroupTest = groupData(dataDE)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataDE)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return d.Region_H2A_text}})
    regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Delta")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Delta")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})




  var wageDL = waffle.filter(d=>d.WageRegion=="Delta").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataDelta = waffle.filter(d=>d.AcresRegion=="Delta")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresDL = stackAcres(stackAcresDataDelta);
  //
  // var stackedAcresDataDL = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresDL.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataDL.push(currentStack);
  // });
  //
  //
  //   var seriesDelta = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataDL)
  //
  //     seriesDelta
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageDL, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })

                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Delta"){return "& "+ d.Produce3}})


}

function cornbelt1 (waffle) {

  var dataCB1 = waffle.filter(d=>d.Region_H2A=="CornbeltI")

  dataGroupTest = groupData(dataCB1)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataCB1)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return d.Region_H2A_text}})
    regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="CornbeltI")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="CornbeltI")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageCB1 = waffle.filter(d=>d.WageRegion=="Cornbelt I").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataCornbelt1 = waffle.filter(d=>d.AcresRegion=="Cornbelt1")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresCB = stackAcres(stackAcresDataCornbelt1);
  //
  // var stackedAcresDataCB = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresCB.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataCB.push(currentStack);
  // });
  //
  //
  //   var seriesCornbelt1 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataCB)
  //
  //     seriesCornbelt1
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageCB1, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
      h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return d.Region_H2A_text+ ":"}})
      h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return formatComma(d.H2A_2010)}})
      h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return formatComma(d.H2A_2020)}})
      h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return "+"+formatPercent(d.H2A_Increase)}})
      h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return d.Produce1 +", "}})
      h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return d.Produce2+","}})
      h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltI"){return "& "+ d.Produce3}})

}

function cornbelt2 (waffle) {

  var dataCB2 = waffle.filter(d=>d.Region_H2A=="CornbeltII")


  ageBox.selectAll(".ageDB").remove()
  workerChart.selectAll(".workerkDB").remove()
  workerChart.selectAll(".countWorkDB").remove()
  workerChart.selectAll(".yAxisBarDB").remove()

  ageBox.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")
  workerChart.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")


  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return d.Region_H2A_text}})
    regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="CornbeltII")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="CornbeltII")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageCB2 = waffle.filter(d=>d.WageRegion=="Cornbelt II").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})

  //
  // var stackAcresDataCornbelt2 = waffle.filter(d=>d.AcresRegion=="Cornbelt2")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresCB2 = stackAcres(stackAcresDataCornbelt2);
  //
  // var stackedAcresDataCB2 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresCB2.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataCB2.push(currentStack);
  // });
  //
  //
  //   var seriesCornbelt2 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataCB2)
  //
  //     seriesCornbelt2
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageCB2, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })

                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="CornbeltII"){return "& "+ d.Produce3}})
}

function lakeStates (waffle) {

  var dataLA = waffle.filter(d=>d.Region_H2A=="Lake")

  dataGroupTest = groupData(dataLA)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataLA)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return d.Region_H2A_text}})
    regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Lake")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Lake")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageLS = waffle.filter(d=>d.WageRegion=="Lake").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataLakeStates = waffle.filter(d=>d.AcresRegion=="LakeStates")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresLS = stackAcres(stackAcresDataLakeStates);
  //
  // var stackedAcresDataLS = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresLS.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataLS.push(currentStack);
  // });
  //
  //
  //   var seriesLakeStates = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataLS)
  //
  //     seriesLakeStates
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegionMil(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegionMil))

                    barsWage.selectAll(".barWage")
                            .data(wageLS, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Lake"){return "& "+ d.Produce3}})
}

function northernplains (waffle) {

  var dataNP = waffle.filter(d=>d.Region_H2A=="NorthernPlains")

  // dataGroupTest = groupData(dataNP)

  ageBox.selectAll(".ageDB").remove()
  workerChart.selectAll(".workerkDB").remove()
  workerChart.selectAll(".countWorkDB").remove()
  workerChart.selectAll(".yAxisBarDB").remove()

  ageBox.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")
  workerChart.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")


  // chartMaker(dataGroupTest)
  //
  // dataGroupWork = groupDataWork(dataNP)
  // workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return d.Region_H2A_text}})
    regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="NorthernPlains")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="NorthernPlains")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageNP = waffle.filter(d=>d.WageRegion=="Northern Plains").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataNorthernPlains = waffle.filter(d=>d.AcresRegion=="NorthernPlains")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresNP = stackAcres(stackAcresDataNorthernPlains);
  //
  // var stackedAcresDataNP = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresNP.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataNP.push(currentStack);
  // });
  //
  //
  //   var seriesNorthernPlains = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataNP)
  //
  //     seriesNorthernPlains
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageNP, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })

                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="NorthernPlains"){return "& "+ d.Produce3}})
}

function mountainI (waffle) {

  var dataMN1 = waffle.filter(d=>d.Region_H2A=="MountainI")

  dataGroupTest = groupData(dataMN1)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataMN1)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return d.Region_H2A_text}})
      regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="MountainI")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="MountainI")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageMN1 = waffle.filter(d=>d.WageRegion=="Mountain I").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataMountain1 = waffle.filter(d=>d.AcresRegion=="Mountain1")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresMN1 = stackAcres(stackAcresDataMountain1);
  //
  // var stackedAcresDataMN1 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresMN1.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataMN1.push(currentStack);
  // });
  //
  //
  //   var seriesMountain1 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataMN1)
  //
  //     seriesMountain1
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageMN1, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainI"){return "& "+ d.Produce3}})
}

function mountainII (waffle) {

  var dataMN2 = waffle.filter(d=>d.Region_H2A=="MountainII")

  ageBox.selectAll(".ageDB").remove()
  workerChart.selectAll(".workerkDB").remove()
  workerChart.selectAll(".countWorkDB").remove()
  workerChart.selectAll(".yAxisBarDB").remove()

  ageBox.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")
  workerChart.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")



  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return d.Region_H2A_text}})
        regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="MountainII")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="MountainII")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageMN2 = waffle.filter(d=>d.WageRegion=="Mountain II").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataMountain2 = waffle.filter(d=>d.AcresRegion=="Mountain2")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresMN2 = stackAcres(stackAcresDataMountain2);
  //
  // var stackedAcresDataMN2 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresMN2.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataMN2.push(currentStack);
  // });
  //
  //
  //   var seriesMountain2 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataMN2)
  //
  //     seriesMountain2
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageMN2, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainII"){return "& "+ d.Produce3}})
}

function mountainIII (waffle) {

  var dataMN3 = waffle.filter(d=>d.Region_H2A=="MountainIII")

  dataGroupTest = groupData(dataMN3)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataMN3)
  workerCountMaker(dataGroupWork)


  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return d.Region_H2A_text}})
        regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="MountainIII")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="MountainIII")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})


  var wageMN3 = waffle.filter(d=>d.WageRegion=="Mountain III").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataMountain3 = waffle.filter(d=>d.AcresRegion=="Mountain3")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresMN3 = stackAcres(stackAcresDataMountain3);
  //
  // var stackedAcresDataMN3 = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresMN3.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataMN3.push(currentStack);
  // });
  //
  //
  //   var seriesMountain3 = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataMN3)
  //
  //     seriesMountain3
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageMN3, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })

                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="MountainIII"){return "& "+ d.Produce3}})

}

function southernplains (waffle) {

  var dataSP = waffle.filter(d=>d.Region_H2A=="SouthernPlains")

  dataGroupTest = groupData(dataSP)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataSP)
  workerCountMaker(dataGroupWork)


  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return d.Region_H2A_text}})
        regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="SouthernPlains")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="SouthernPlains")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})

  var wageSP = waffle.filter(d=>d.WageRegion=="Southern Plains").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataSouthernPlains = waffle.filter(d=>d.AcresRegion=="SouthernPlains")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresSP = stackAcres(stackAcresDataSouthernPlains);
  //
  // var stackedAcresDataSP = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresSP.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataSP.push(currentStack);
  // });
  //
  //
  //   var seriesSouthernPlains = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataSP)
  //
  //     seriesSouthernPlains
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageSP, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })


                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="SouthernPlains"){return "& "+ d.Produce3}})

}

function pacific (waffle) {

  var dataPA = waffle.filter(d=>d.Region_H2A=="Pacific")

  dataGroupTest = groupData(dataPA)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataPA)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return d.Region_H2A_text}})
        regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Pacific")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Pacific")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})


  var wagePA = waffle.filter(d=>d.WageRegion=="Pacific").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataPacific = waffle.filter(d=>d.AcresRegion=="Pacific")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresPA = stackAcres(stackAcresDataPacific);
  //
  // var stackedAcresDataPA = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresPA.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataPA.push(currentStack);
  // });
  //
  //
  //   var seriesPacific = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataPA)
  //
  //     seriesPacific
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegionMil(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegionMil))

                    barsWage.selectAll(".barWage")
                            .data(wagePA, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })

                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Pacific"){return "& "+ d.Produce3}})
}

function california (waffle) {

  var dataCA = waffle.filter(d=>d.Region_H2A=="California")

  dataGroupTest = groupData(dataCA)

  ageBox.selectAll(".ageDB").remove()

  chartMaker(dataGroupTest)

  dataGroupWork = groupDataWork(dataCA)
  workerCountMaker(dataGroupWork)

  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return d.Region_H2A_text}})
        regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="California")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="California")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageCA = waffle.filter(d=>d.WageRegion=="California").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataCalifornia = waffle.filter(d=>d.AcresRegion=="California")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresCA = stackAcres(stackAcresDataCalifornia);
  //
  // var stackedAcresDataCA = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresCA.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataCA.push(currentStack);
  // });
  //
  //
  //   var seriesCalifornia = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataCA)
  //
  //     seriesCalifornia
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcres(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcres))
  //

                    barsWage.selectAll(".barWage")
                            .data(wageCA, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="California"){return "& "+ d.Produce3}})
}

function hawaii (waffle) {

  var dataHA = waffle.filter(d=>d.Region_H2A=="Hawaii")

  ageBox.selectAll(".ageDB").remove()
  workerChart.selectAll(".workerkDB").remove()
  workerChart.selectAll(".countWorkDB").remove()
  workerChart.selectAll(".yAxisBarDB").remove()

  ageBox.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")
  workerChart.append("text").attr("x", h2aWidth/2).attr("y", 180).attr("text-anchor", "middle").attr("class", "NA_disclamer").text("N/A")


  regionMap.selectAll(".mapTitleDash").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return d.Region_H2A_text}})
        regionMap.selectAll(".mapTitlePercent").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return formatPercent(d.PercentProduce) + " of the Total Fruit and Vegetable Acres in the U.S."}})
  // acresChart.selectAll(".barDB1").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Hawaii")  {return d.Region_H2A_text }})
  // acresChart.selectAll(".barDB2").transition().duration(1000).text(function (d) {if (d.Region_H2A=="Hawaii")  {return formatPercent(d.PercentProduce) + " Share of the U.S. Fruit and Vegetable Acres Harvested"}})



  var wageHI = waffle.filter(d=>d.WageRegion=="Hawaii").sort(function(a,b){return d3.descending(a.orderWage,b.orderWage)})


  // var stackAcresDataHawaii = waffle.filter(d=>d.AcresRegion=="Hawaii")
  //
  // // stackAcres = d3.stack().keys(keyAcres);
  // var stackedValuesAcresHI = stackAcres(stackAcresDataHawaii);
  //
  // var stackedAcresDataHI = [];
  // // Copy the stack offsets back into the data.
  // stackedValuesAcresHI.forEach((layer, index) => {
  //   var currentStack = [];
  //   layer.forEach((d, i) => {
  //     currentStack.push({
  //       values: d,
  //       key: index,
  //       Year: waffle[i].AcresYear
  //     });
  //   });
  //   stackedAcresDataHI.push(currentStack);
  // });
  //
  //
  //   var seriesHawaii = acresChart
  //                 .selectAll(".areaCrop")
  //                 .data(stackedAcresDataHI)
  //
  //     seriesHawaii
  //           .transition()
  //           .duration(1000)
  //           .attr("d", data =>  areaAcresRegion(data))
  //           .attr("fill", function(d, i) { if (d[i].key==0){return "#05CE7C"} else if (d[i].key==1){return "#6B7CF2"} else {return "#FFDB21"}})
  //
  //
  //           acresChart.selectAll(".yAxisAcres")
  //                   .transition()
  //                   .call(d3.axisLeft(yAcresRegion))

                    barsWage.selectAll(".barWage")
                            .data(wageHI, function(d) { return d.NameWage; })
                            .transition()
                            .duration(1000)
                            .attr("width", function (d) {
                                return xWage(+d.Wage)-xWage(0)
                            })
                            h2aBox.selectAll(".h2aTitle").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return d.Region_H2A_text+ ":"}})
                            h2aBox.selectAll(".h2aLine2").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return formatComma(d.H2A_2010)}})
                            h2aBox.selectAll(".h2aLine4").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return formatComma(d.H2A_2020)}})
                            h2aBox.selectAll(".h2aLine6").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return "+"+formatPercent(d.H2A_Increase)}})
                            h2aBox.selectAll(".h2aLine9").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return d.Produce1 +", "}})
                            h2aBox.selectAll(".h2aLine10").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return d.Produce2+","}})
                            h2aBox.selectAll(".h2aLine11").transition().duration(1000).text(function(d) { if(d.Region_H2A=="Hawaii"){return "& "+ d.Produce3}})

}


}

dashboard()




function handleResize1() {
  // 1. update height of step elements
  var stepHeight1 = Math.floor(window.innerHeight * 0.95);
  var stepHeight2 = Math.floor(window.innerHeight * 0.95);

	step1.style('height', stepHeight1 + 'px');
  step2.style('height', stepHeight2 + 'px');


	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
  	graphic2.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');


	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

  var chartMargin2 = 32;
	var textWidth2 = text2.node().offsetWidth;
	var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

  // var chartWidth2 = graphic2.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight *.75) + 'px');
  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight *.75) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
  scroller2.resize();

}







// scrollama event handlers


function handleStepEnter1(response) {


  step1.classed('is-active', function (d, j) {
		return j === response.index;
	});

  step2.classed('is-active', function (d, j) {
    return j === response.index;
  });

	// update graphic based on step
  chart1.select('p').text(response.index + 1);
  chart2.select('p').text(response.index + 1);


  graphic1.classed('is-fixed', true);
  graphic1.classed('is-bottom', false);




	 if (step1._groups[0][0].className === 'step1 is-active') {
	 }

   if (step1._groups[0][3].className === 'step1 is-active') {
     vegImports ()
     waffleChart()

	 }



}

function handleStepEnter2(response) {



  step2.classed('is-active', function (d, j) {
    return j === response.index;
  });

	// update graphic based on step
  chart2.select('p').text(response.index + 1);


  graphic2.classed('is-fixed', true);
  graphic2.classed('is-bottom', false);


if (step2._groups[0][1].className === 'step2 is-active') {


    waffleChart()

}

   if (step2._groups[0][2].className === 'step2 is-active' ) {
    waffleChart2017()
   }

   if (step2._groups[0][3].className === 'step2 is-active' ) {
     laborCost()
   }

   if (step2._groups[0][5].className === 'step2 is-active' ) {
     wageCompare()
   }

if (step2._groups[0][6].className === 'step2 is-active' ) {
    cropWorkFB()
}

if (step2._groups[0][7].className === 'step2 is-active' ) {
    cropWorkUndoc()
}


if (step2._groups[0][8].className === 'step2 is-active' ) {
    averageCropAge()
}

if (step2._groups[0][9].className === 'step2 is-active' ) {
    stateVisa()
}









// if (step2._groups[0][8].className === 'step2 is-active' ) {
//   noNewsies()
//   }


}








function handleContainerEnter1(response) {
  graphic1.classed('is-fixed', true);
  graphic1.classed('is-bottom', false);
}

function handleContainerExit1(response) {
  graphic1.classed('is-fixed', false);
	graphic1.classed('is-bottom', response.direction === 'down');
}

function handleContainerEnter2(response) {
  graphic2.classed('is-fixed', true);
  graphic2.classed('is-bottom', false);
}

function handleContainerExit2(response) {
  graphic2.classed('is-fixed', false);
	graphic2.classed('is-bottom', response.direction === 'down');
}





function init() {

	scroller1.setup({
		step: '.scroll__text1 .step1',
		offset: .75,
		debug: false
	}).onStepEnter(handleStepEnter1)
	.onContainerEnter(handleContainerEnter1).onContainerExit(handleContainerExit1);

  scroller2.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text2 .step2',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

}

init();
}
