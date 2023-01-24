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





var formatComma = d3.format(",.0f")
var formatNoComma = d3.format(".00f")
var formatTenth = d3.format(".1f")
var formatMoney = function(d) { return "$" + formatComma(d); }
var formatMill = function(d){return formatTenth(d/1000000)+ " M"}


var scroller1 = scrollama()
var container1 = d3.select('#container-scroll1');
var graphic1 = container1.select('.scroll__figure1');
var chart1 = graphic1.select('.figure__chart1');
var text1 = container1.selectAll('.scroll__text1');
var step1 = text1.selectAll('.step1');

var scroller2 = scrollama()
var container2 = d3.select('#container-scroll2');
var graphic2 = container2.select('.scroll__figure2');
var chart2 = graphic2.select('.figure__chart2');
var text2 = container2.selectAll('.scroll__text2');
var step2 = text2.selectAll('.step2');


var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };


var margin = {top: 20, right: 20, bottom: 50, left: 20},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// parse the date / time;

// set the ranges
var x = d3.scaleLinear().range([35, width]);
var xLineup = d3.scaleLinear().range([100, width]);
var yLineup = d3.scaleLinear().range([height, 100]);
var xfb = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 20]);
var formatPercent = d3.format(",.1%");
var formatPercentLeg = d3.format(",.0%");

var xDiag = d3.scaleLinear().range([50, width]);
var yDiag = d3.scaleLinear().range([height-100, 50]);

var selectFam
var gainLoss = "Increase"

// define the line

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#table-location").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var svgLine = d3.select("#stateLine").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("id","lineChart")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

svg.attr("id","bubbleChart")

var color = d3.scaleLinear()
  .domain([.06,.3])
  .range(["#ffffff","#407cca"]);

  var colorInner = d3.scaleLinear()
    .domain([.06,.3])
    .range(["#ffffff","#407cca"]);




var units = "Widgets";

// set the dimensions and margins of the graph
var marginSank = {top: 20, right:0, bottom: 20, left:20},
    widthSank =900 - marginSank.left - marginSank.right,
    heightSank = 600 - marginSank.top - marginSank.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    colorSank = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
var svgSank = d3.select("#sankeyHERE").append("svg")
    .attr("width", widthSank)
    .attr("height", heightSank + marginSank.top + marginSank.bottom)
    // .attr("transform",
    //       "translate(" + 0 + "," + marginSank.top + ")")
    .attr("id","svgSank")

// Set the sankey diagram properties


var backwards=0




// var topData =
var familyData = d3.csv("assets/scripts/newSkillsData.csv")


var timeData = d3.csv("assets/scripts/JobOpeningRatebyState.csv");
var sankData = d3.json("assets/scripts/sankeyTwo.json");

Promise.all([familyData, timeData, sankData]).then(startChange);

const arrowPoints = [[0, 0], [0, 20], [20, 10]];
const lineStart = [240, 330];
  const lineEnd = [440,330];

  const lineStart2 = [240, 490];
    const lineEnd2 = [440,490];

      svg.append('defs')
   .append('marker')
   .attr('id', 'arrow')
   .attr('viewBox', [0, 0, 20, 20])
   .attr('refX', 10)
   .attr('refY', 10)
   .attr('markerWidth', 10)
   .attr('markerHeight', 10)
   .attr('orient', 'auto-start-reverse')
   .append('path')
   .attr('d', d3.line()(arrowPoints))
   .attr('stroke', 'black');

   svg.append('defs')
.append('marker')
.attr('id', 'arrow2')
.attr('viewBox', [0, 0, 20, 20])
.attr('refX', 10)
.attr('refY', 10)
.attr('markerWidth', 10)
.attr('markerHeight', 10)
.attr('orient', 'auto-start-reverse')
.append('path')
.attr('d', d3.line()(arrowPoints))
.attr('stroke', 'black');

function startChange(data) {

familyData = data[0]
timeData = data[1]
var sankeyData = data[2].national


var parseDate = d3.timeFormat("%b,%Y");
var divTwo
var showP=0

 //returns 4 digit year ex: 2000



   familyData.forEach(function(d) {
       // d.shortGrowth5 = +d.PercentGrowth2019_2021;
       // d.shortGrowth3 = +d.GrowthRate_2019_20_3Code;
       // d.shortGrowth2 = +d.GrowthRate_2019_20_2Code;
       // d.longGrowth5 = +d.Projection2020_30_5Code;
       // d.longGrowth3 = +d.Projection2020_30_3Code;
       // d.longGrowth2 = +d.Projection2020_30_2Code;
       // d.foreignB5 = +d.share_fb_5digit;
       // d.foreignB3 = +d.share_fb_3digit;
       d.foreignB2 = +d.share_fb_2digit;
       d.jp2021_2cd = +d.JobPostings_2021_2Code;
       // d.jp2021_3cd = +d.JobPostings_2021_3Code;
       // d.jp2021_5cd = +d.JobPostings_2021;
       // d.titleFam = d.occFamilyTitle;
       d.title_2Code = d.Title_2Code;
       d.examples = d.Examples;
       d.fbShare_2codeAll = d.FB_Share_ALL_2Code;
       d.growth_all2Code = +d.PercentGrowth_2019_21_2code;
       d.allJobPosts2021 = +d.JobPostings_2021_2codeSum;
       d.allJobPosts2019 = +d.JobPostings_2019_2codeSum;
       // d.rankBegin = +d.rank_allJobs;
       d.rankNext = +d.rank_allGrowth;
       d.rankProject = +d.rank_allProjection;
       d.project2Code = +d.Projection2020_30_2Code;
       d.x_allJobs = +d.x_allJobs;
       d.y_allJobs = +d.y_allJobs;
       // d.x_allGrowth = +d.x_allGrowth;
       // d.y_allGrowth = +d.y_allGrowth;
       d.name2code = d.Name_2code;
       // d.x_focus = +d.x_focus;
       // d.y_focus = +d.y_focus;
       // d.employment_2020 = +d.employment_2020;
       // d.employment_2030 = +d.employment_2030;
       // d.perEmplChange = +d.percent_employmentChange
       d.round = +d.Round1
       d.Title =d.Title
   });

   function stateLineChart (timeData) {

     var xState = d3.scaleTime().range([20, width]);
     var yState = d3.scaleLinear().range([height-20, 80]);

// Define the line
var stateline = d3.line()
    .x(function(d) { return xState(d.date); })
    .y(function(d) { return yState(d.rate); });


var selectState="UnitedStates"



var parseTime = d3.timeParse("%Y%m%d"),
 		formatDate = d3.timeFormat("%Y-%m-%d"),
 		bisectDate = d3.bisector(d => d.Date).left,
 		formatValue = d3.format(",.0f");

    timeData.forEach(function(d) {
    		d.date = parseTime(d.Date);
    		d.rate = +d.Rate;
        });


        var stateline = d3.line()
            .x(function(d) {return xState(d.date); })
            .y(function(d) {return yState(d.rate); });

        // Scale the range of the data
            xState.domain(d3.extent(timeData, function(d) {return d.date; }));
            // yState.domain([0, d3.max(timeData, function(d) { return d.rate; })]);
            yState.domain([0,10.5]);

            // Group the entries by state
            var dataNest = Array.from(
        	    d3.group(timeData, d => d.State), ([key, value]) => ({key, value})
        	  );



var usLine

var div = d3.select("body").append("div")
    .attr("class", "tooltipDiv")
    .style("opacity", 0)
    .style("visibility","hidden");




    svgLine.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,510)")
        .call(d3.axisBottom(xState));

    // Add the Y Axis
    svgLine.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(20, 0)")
        .call(d3.axisLeft(yState));




            dataNest.forEach(function(d,i) {
              var state=d.key

              usLine = d.key== "United States" ? "1" : ".1"

                svgLine.append("path")
                    .attr("class", "lineState")
                    .attr("id",d.key.split(" ").join(""))
                    .style("stroke", "#407cca")
                    .style("stroke-width", "1.75px")
                    .style("opacity",usLine)
                    // .style("opacity", if (d.key=="United States"){return "1"} else {return ".05"})
                    .attr("d", stateline(d.value))
                    .on("mouseover", handleMouseOver)
                    .on("mouseout", handleMouseOut);

          function handleMouseOver(d, i) {


            //




              // console.log(parseDate(xState.invert(d.offsetX+80)))
              // console.log(yState.invert(d.offsetY))




       // Add interactivity

      // Use D3 to select element, change color and size
      d3.select(this).style("opacity",1);
      toolTip(d, state)
      d3.select("#UnitedStates").style("opacity",1)


      // Specify w
    }

    function toolTip(d, state) {


                div.transition()
                    .duration(300)
                    .style("opacity", .9);
                div.html(state + "<br/>" )
                .style("left", (event.pageX+20) + "px")
                .style("top", (event.pageY-30) + "px")
                .style("visibility","visible");
                    // .style("left", (d3.event.pageX) + "px")
                    // .style("top", (d3.event.pageY - 28) + "px");
                  }

function handleMouseOut(d, i) {

  div.transition()
     .duration(400)
     .style("opacity", "0");




  var idState = d.id

    d3.select(this).style('opacity',function(d) {if (idState=="United States"||idState==selectState){return "1"} else {return ".1"}});




    }

                // Add the Legend

            });



          if (backwards==1) {
            backHome()
          }

               svgLine.append("text")
                .attr("class","y-axisTitle text")
                .attr("x",10)
                .attr('y',height/2)
                .attr('text-anchor',"middle")
                .attr("transform", "translate(" + -275 + "," + height*.6 + ") rotate(270)")
                .text("Job Opening Rate")

                // svgLine.append("text")
                //    .attr("class","x-axisTitle text")
                //    .attr("x",width/2)
                //    .attr('y',height+40)
                //    .attr('text-anchor',"middle")
                //    .text("January 2019 - July 2021")

                   svgLine.append("text")
                      .attr("class","text")
                      .attr("x",400)
                      .attr('y',350)
                      .attr('text-anchor',"middle")
                      .text("U.S. Rate")

          svgLine.append("text")
                 .attr("class","tableTitle")
                 .attr("id","tableTitle1")
                 .attr("x",width/2)
                 .attr("y",10)
                 .attr('text-anchor',"middle")
                 .text("Rate of Job Openings in the U.S. & by State")

                 svgLine.append("text")
                        .attr("class","tableTitle")
                        .attr("id","tableTitle1")
                        .attr("x",width/2)
                        .attr("y",40)
                        .attr('text-anchor',"middle")
                        .text("2019 - 2021")

                svgLine.append("text")
                       .attr("class","sourceLine")
                       .attr("x",20)
                       .attr("y",560)
                       .attr("text-anchor","start")
                       .text("Source: Bureau of Labor Statistics Job Openings and Labor Turnover Survey (JOLTS)")


        document.getElementById("stateNames").addEventListener("change", function() {
                          d3.select("#"+selectState).style("opacity",0);

                          selectState=this.value.split(" ").join("")
                          // stateTransition(selectState)

                          d3.select("#UnitedStates").style("opacity",1)

                          d3.select("#"+selectState).style("opacity",1);
                          // toolTip(d, state)
                        });




  }

stateLineChart(timeData)


divTwo = d3.select("body").append("div")
    .attr("class", "tooltipDiv")
    .style("opacity", 0);

    var divSank = d3.select("body").append("div")
        .attr("class", "tooltipDiv")
        .style("opacity", 0);



 var minValue = d3.min(familyData, function(d) { return +d.project2Code; })-.04
 var maxValue = d3.max(familyData, function(d) { return +d.project2Code; })+.04
 var radiusScale = d3.scaleSqrt()
   .domain([0, d3.max(familyData, function(d) { return d.allJobPosts2021; })])
   .range([0, 33])

   var radiusFocus = d3.scaleSqrt()
     // .domain([3800000, 14000000])
     // .range([15, 50])
     .domain([0, 14000000])
     .range([0, 50])




 xLineup.domain([1,22]);
 yLineup.domain([22,1]);
 x.domain([-.1, 1]);
 y.domain([-.05, .25]);

 xDiag.domain([21,1]);
 yDiag.domain([21,1]);
 // radiusScale = d3.scaleSqrt()
 //   .domain([0, d3.max(familyData, function(d) { return d.jp2021_5cd; })])
 //   .range([3, 20])
 function make_y_gridlines() {
   return d3.axisLeft(yDiag)
       .tickValues([18.5,9.5,1])
       .tickFormat(function (d) {
        return yData[d];
      });
}

svg.append("g")
    .attr("class", "grid")
    .call(make_y_gridlines()
        .tickSize(-(width)-30)
        .tickFormat("")
    )
    .attr("stroke","#000000")
    .style("opacity",.3)
    .style("visibility","hidden")

function backHome() {




  svg.selectAll(".growthTitleX").style("visibility", "hidden")

  svg.selectAll(".circleFBShare")
     .style("visibility", "visible")

     svg.selectAll(".circleFBShareNumber")
        .style("visibility", "visible")

  svg.selectAll(".dots")
      .transition()
      .duration(500)
      .attr("cx", function(d) { return d.x_allJobs})
      .attr("cy", function(d) { return (d.y_allJobs-(radiusScale(d.allJobPosts2021))) })

      svg.selectAll(".circleTitle")
      .transition()
      .duration(500)
         .attr("x",function(d) { return d.x_allJobs })
         .attr('y',function(d) { return (d.y_allJobs+20)})
         .attr('text-anchor',"middle")
         .attr("transform", "rotate(0,0,0)")
         // .attr("transform", function (d) {
         //  return "rotate(0,"+(d.x_allJobs-20)+","+d.y_allJobs+")" ;});

         svg.selectAll(".circleFBShare")
         .transition()
         .duration(500)
            .attr("x",function(d) { return d.x_allJobs })
            .attr('y',function(d) { return (d.y_allJobs+32)})
            .style("visibility","visible")

            svg.selectAll(".firstTitle")
               .transition()
               .duration(250)
               .text("Online Job Postings in 2021")
  svg.selectAll(".growthTitleX").style("visibility", 'hidden')
}







 svg.selectAll(".dots")
     .data(familyData)
   .enter().append("circle")
    .filter(function(d) { return +d.Round1 == 1 ||  d.Round1== "1"})
     .attr("class","dots")
     .attr("stroke", "#9B9EA0")
     .attr("stroke-width", ".25px")
     .attr("r", function(d){return radiusScale(d.allJobPosts2021);})

     .attr("cx", function(d) { return d.x_allJobs})
     .attr("fill", function(d){return color(d.fbShare_2codeAll);})
     .attr("cy", function(d) { return (d.y_allJobs-(radiusScale(d.allJobPosts2021))) })
     .on("mouseover", dotMouseOver)
          .on("mouseout", dotMouseOut);


          svg.append("text")
                 .attr("class","sourceLine")
                 .attr("x",20)
                 .attr("y",580)
                 .attr("text-anchor","start")
                 .text("        Bureau of Labor Statistics Job Openings and Labor Turnover Survey (JOLTS). 2022")

                 svg.append("text")
                        .attr("class","sourceLine")
                        .attr("x",20)
                        .attr("y",570)
                        .attr("text-anchor","start")
                        .text("Source:  Burning Glass Technologies: Labor Insight. 2022.")


  function dotMouseOver(d, i) {
   // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr("stroke-width","1.5px")
                           .attr("stroke", "#407cca");

                      divTwo.transition()
                               .duration(200)
                               .style("opacity",.9);

                          divTwo
                                .html("<div class='titleHover'>"+i.Title +"</div>"+"<table><tr  class='greyRow rankSpace'><td>Foreign-Born Share: "+ formatPercent(i.fbShare_2codeAll)+"</td></tr><tr class='rankSpace'><td>2021 Postings: "+ formatComma(i.allJobPosts2021)+"</td></tr><tr class='greyRow rankSpace'><td>Increase from 2019-21: "+ formatPercent(i.growth_all2Code)+"</td></tr><tr class='rankSpace'><td>Occupation Examples: "+ i.examples+"</td></tr><tr class='greyRow rankSpace' id='hiddenRow'><td>Projected Increase from 2020-30: "+ formatPercent(i.Projection2020_30_2Code)+"</td></tr></table>")
                                 .style("left", (d.pageX-30) + "px")
                                 .style("top", (d.pageY + 30) + "px")
                                 .style("visibility", "visible");


                                 if (showP==0) {
                                   divTwo.select("#hiddenRow").style("visibility","hidden")
                                 }
                                 else {
                                   divTwo.select("#hiddenRow").style("visibility","visible")
                                 }







          }

  function dotMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr("stroke-width",".25px")
                           .attr("stroke", "#9B9EA0");

                           divTwo.style("opacity",0)
                                  .style("visibility", "hidden");

            // Select text by id and then remove
             // Remove text location
          }


     svg.selectAll(".circleTitle")
        .data(familyData)
        .enter()
        .append("text")
        .filter(function(d) {return +d.Round1== 1 || d.Round1== "1"})
        .attr("class","circleTitle")
        .attr("x",function(d) { return d.x_allJobs })
        .attr('y',function(d) { return (d.y_allJobs+20)})
        .attr('text-anchor',"middle")
        .text(function(d) { return d.name2code })

        svg.selectAll(".circleFBShare")
           .data(familyData)
           .enter()
           .append("text")
           .filter(function(d) {return +d.Round1== 1 || d.Round1== "1"})
           .attr("class","circleFBShare")
           .attr("x",function(d) { return d.x_allJobs })
           .attr('y',function(d) { return (d.y_allJobs+32)})
           .attr('text-anchor',"middle")
           .text(function(d) { return "Foreign Born Share:" })

           svg.selectAll(".circleFBShareNumber")
              .data(familyData)
              .enter()
              .append("text")
              .filter(function(d) {return +d.Round1== 1 || d.Round1== "1"})
              .attr("class","circleFBShareNumber")
              .attr("x",function(d) { return d.x_allJobs })
              .attr('y',function(d) { return (d.y_allJobs+48)})
              .attr('text-anchor',"middle")
              .text(function(d) {return formatPercent(d.fbShare_2codeAll) })

                  svg.append("text")
                     .attr("class","firstTitle")
                     .attr("id","tableTitleSVG2")
                     .attr("x",width/2)
                     .attr('y',2)
                     .attr('text-anchor',"middle")
                     .text("Online Job Postings in 2021")


          var legData = [{"color":"#ffffff","value":0.05},{"color":"#dde3f5","value":0.1},{"color":"#bac8ea","value":0.15},{"color":"#97aee0","value":0.2},{"color":"#7094d5","value":0.25},{"color":"#407cca","value":0.3}]

          var extent = d3.extent(legData, d => d.value);
          var defs = svg.append("defs");
          var barHeight = 8;
          var legScale = d3.scaleLinear()
                        .range([0, 150])
                        .domain(extent);

         var xTicks = legData.filter(f => f.value).map(d => d.value);



          var xLegend = d3.axisBottom(legScale)
                        .tickSize(barHeight * 2.5)
                        .tickValues(xTicks)
                        .tickFormat(formatPercentLeg);

          var linearGradient = defs.append("linearGradient").attr("id", "myGradient");
            linearGradient.selectAll("stop")
                .data(legData)
              .enter().append("stop")
                .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
                .attr("stop-color", function(d){return d.color});

            svg.append("rect")
                .attr("width", 150)
                .attr("height", 16)
                .attr("x", 500)
                .attr("y", 540)
                .attr("class","legend")
                .style("fill", "url(#myGradient)");

            svg.append("g")
                .attr("class","legAxis")
                .classed("legend","True")
                .attr("transform","translate(500, 540)")
                .call(xLegend)
                .select(".domain").remove()

                svg.append("text")
                    .attr("class","colorLegTitle")
                    .classed("legend","True")
                    .attr("transform","translate(495, 530)")
                    .text("Legend: Foreign Born Share")



   function plotGrowth() {

     showP=0
       svg.selectAll(".growthTitleX").remove()
       svg.selectAll('.grid').style("visibility","hidden")



     svg.selectAll(".domain").attr("stroke","none")



     svg.selectAll(".circleFBShare")
        .style("visibility", "hidden")

        svg.selectAll(".circleFBShareNumber")
           .style("visibility", "hidden")

        // svg.selectAll(".circleTitle")
        //   .style("visibility", "hidden")


        svg.selectAll(".dots")
           .transition()
           .duration(600)
            .attr("r", function(d){return radiusScale(d.allJobPosts2021);})
           .attr("cx", function(d) {return xDiag(d.rankNext)-5 })
           // .attr("cy", function(d) { return yDiag(d.rankNext)});
            .attr("cy", 250);


            svg.selectAll(".circleTitle")
            .transition()
            .duration(600)
            .attr("x",function(d) {return xDiag(d.rankNext)})
            .attr("y","200")
            .attr('text-anchor',"start")
            .style("opacity",1)
            .attr("transform", function (d) {
             return "rotate(-65,"+xDiag(d.rankNext)+",200)" ;});

    if (backwards == 1){

      svg.selectAll(".y-axisTitle").style("visibility", 'hidden')
      svg.selectAll(".x-axisTitle").style("visibility", 'hidden')
      svg.selectAll(".xAxis").style("visibility", 'hidden')
      svg.selectAll(".yAxis").style("visibility", 'hidden')
      svg.selectAll(".growthTitleX").style("visibility", 'visible')

      // svg.selectAll(".circleTitle")
      //    .data(familyData)
      //    .filter(function(d) {return +d.round == 1 || d.round=='1'})
      //    .enter()



       svg.selectAll("growthTitleX").style("visibility","visible")

       svg
         .append('path')
         .attr('d', d3.line()([lineStart, lineEnd]))
         .attr('stroke', 'black')
         .attr('marker-end', 'url(#arrow)')
         .attr('marker-start', 'url(#arrow2)')
         .attr("class","growthTitleX arrow&line")
         .attr("id","arrowLine")
         .attr('fill', 'none');





                svg.selectAll(".circleTitle")
                .transition()
                .duration(600)
                .attr("x",function(d) { return xDiag(d.rankNext)})
                // .attr("class","circleTitle")
                // .attr("dy",function(d) { return xDiag(d.rankNext)-radiusScale(d.allJobPosts2021)})
                .attr("y","200")
                .attr('text-anchor',"start")
                .attr("transform", function (d) {
                 return "rotate(-65,"+xDiag(d.rankNext)+",200)" ;});


                 svg.append("text")
                 .attr("class","growthTitleX mainX")
                 .attr("id","growthRateTitle")
                 .attr("x",340)
                 .attr('y',350)
                 .attr('text-anchor',"middle")
                 .text("Growth Rate 2019 & 2021 by Rank")

                 svg.append("text")
                 .attr("class","growthTitleX lowX")
                 .attr("id","lowGrowth")
                 .attr("x",width/7)
                 .attr('y',320)
                 .attr('text-anchor',"middle")
                 .text("Low Growth (0-25%)")


                 svg
                 .append("text")
                 .attr("class","growthTitleX highX")
                 .attr("id", "highGrowth")
                 .attr("x",(width*6)/7)
                 .attr('y',320)
                 .attr('text-anchor',"middle")
                 .text("High Growth (40-85%)")


                 return svg.node();

       backwards=1
    }

    else {

      backwards=1





   svg
     .append('path')
     .attr('d', d3.line()([lineStart, lineEnd]))
     .attr('stroke', 'black')
     .attr('marker-end', 'url(#arrow)')
     .attr('marker-start', 'url(#arrow2)')
     .attr("class","growthTitleX arrow&line")
     .attr("id","arrowLine")
     .attr('fill', 'none');





            svg.selectAll(".circleTitle")
            .transition()
            .duration(600)
            .attr("x",function(d) { return xDiag(d.rankNext)})
            // .attr("class","circleTitle")
            // .attr("dy",function(d) { return xDiag(d.rankNext)-radiusScale(d.allJobPosts2021)})
            .attr("y","200")
            .attr('text-anchor',"start")
            .attr("transform", function (d) {
             return "rotate(-65,"+xDiag(d.rankNext)+",200)" ;});


             svg.append("text")
             .attr("class","growthTitleX mainX")
             .attr("id","growthRateTitle")
             .attr("x",340)
             .attr('y',350)
             .attr('text-anchor',"middle")
             .text("Growth Rate 2019 & 2021 by Rank")

             svg.append("text")
             .attr("class","growthTitleX lowX")
             .attr("id","lowGrowth")
             .attr("x",width/7)
             .attr('y',320)
             .attr('text-anchor',"middle")
             .text("Low Growth (0-25%)")


             svg
             .append("text")
             .attr("class","growthTitleX highX")
             .attr("id", "highGrowth")
             .attr("x",(width*6)/7)
             .attr('y',320)
             .attr('text-anchor',"middle")
             .text("High Growth (40-85%)")


             return svg.node();
              // .attr("transform", function (d) {
    }          //  return "translate("+(xDiag(d.rankNext))+")rotate(-35)";})



      svg.selectAll(".firstTitle")
         .transition()
         .duration(400)
         .text("Online Job Posting Growth from 2019-2021")




   }

function projectLine() {

  svg.selectAll(".dots")
     .transition()
     .duration(600)
      .attr("cx", function(d) { return xDiag(d.rankProject); })
      .style("visibility", "visible")
       .style("opacity",1)

       svg.selectAll(".circleTitle")
         .transition()
         .duration(800)
         // .attr("class","circleTitle")
         .attr("x",function(d) { return xDiag(d.rankProject)})
         // .attr("class","circleTitle")
         // .attr("dy",function(d) { return xDiag(d.rankNext)-radiusScale(d.allJobPosts2021)})
         .attr("y","200")
         .attr('text-anchor',"start")
         .attr("transform", function (d) {
          return "rotate(-65,"+xDiag(d.rankProject)+",200)" ;});

}



function twoCodeScatter() {

  svg.selectAll(".rapidText").style("visibility","hidden")

  svg.selectAll(".growthTitleX").style("visibility", "hidden")

  svg.selectAll(".xAxis").style("visibility", 'visible')
  svg.selectAll(".yAxis").style("visibility", 'visible')




     svg.selectAll(".circleTitle")
       .style("visibility", "visible")


  svg.selectAll(".dots")
     .transition()
     .duration(600)
      .attr("cx", function(d) { return x(d.growth_all2Code); })
      .attr("cy", function(d) { return y(d.project2Code); })
      .style("visibility", "visible")
       .style("opacity",1)

      // svg.selectAll(".circleTitle")
      //    .data(familyData)
      //    .enter()

      if (backwards==1) {

        // svg.selectAll(".circleTitle")
        //    .data(familyData)
        //    // .filter(function(d) {return +d.Round1== 1 || d.Round1== "1"})
        //    .enter()

        svg.select("#tableTitleSVG2")
           .transition()
           .duration(600)
           .attr("x",width/2)
           .attr('y',2)
           .text("2020-2030 Projected Growth by Rank")

           svg.selectAll(".circleTitle")
             .transition()
             .duration(800)
             // .attr("class","circleTitle")
             .attr("x", function(d) {if (d.name2code == "Computer & Mathematical" || d.name2code =="Healthcare Practitioners") {return x(d.growth_all2Code)+80} else {return x(d.growth_all2Code)} })
             .attr("y", function(d) { if (d.name2code == "Education") {return 1000} else if (d.name2code == "Computer & Mathematical") {return y(d.project2Code)-.9*(radiusScale(d.allJobPosts2021))} else if (d.name2code == "Maintenance & Repair" || d.name2code == "Management" || d.name2code=="Office Support") {return y(d.project2Code)+1.35*(radiusScale(d.allJobPosts2021))} else if (d.name2code == "Healthcare Practitioners") {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021)-10)} else {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))}})
             .attr('text-anchor',"middle")
             .attr("transform", function (d) {
              return "rotate(0,0,0)" ;})
              .style("opacity",function(d) {if (d.name2code == "Healthcare Support"||d.name2code == "Food Preparation"||d.name2code == "Personal Care"||d.name2code == "Computer & Mathematical"||d.name2code == "Transportation"||d.name2code == "Building & Grounds"||d.name2code == "Construction"){return 1} else{return 0} });


           backwards=1

           svg.selectAll(".y-axisTitle").style("visibility", 'visible')
           svg.selectAll(".x-axisTitle").style("visibility", 'visible')
           svg.selectAll(".xAxis").style("visibility", 'visible')
           svg.selectAll(".yAxis").style("visibility", 'visible')



      }




      else {

    svg.selectAll(".circleTitle")
      .transition()
      .duration(600)
      // .attr("class","circleTitle")
      .attr("x", function(d) {if (d.name2code == "Computer & Mathematical") {return x(d.growth_all2Code)*2} else {return x(d.growth_all2Code)} })
      .attr("y", function(d) { if (d.name2code == "Education") {return 1000} else if (d.name2code == "Maintenance & Repair" || d.name2code == "Management") {return y(d.project2Code)+1.35*(radiusScale(d.allJobPosts2021))}  else if (d.name2code == "Healthcare Practitioners") {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021)-10)} else {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))}})
      .attr('text-anchor',"middle")
      .attr("transform", function (d) {
       return "rotate(0,0,0)" ;})
         .style("opacity",function(d) {if (d.name2code == "Healthcare Support"||d.name2code == "Food Preparation"||d.name2code == "Personal Care"||d.name2code == "Computer & Mathematical"||d.name2code == "Transportation"||d.name2code == "Building & Grounds"||d.name2code == "Construction"){return 1} else{return 0} });

svg.selectAll(".innerDots")
   .style("visibility", "hidden")

   svg.selectAll(".circleGrowthPercent")
    .style("visibility", "hidden")

    svg.selectAll(".circleFBShare")
     .style("visibility", "hidden")



         svg.select("#tableTitleSVG2")
            .transition()
            .duration(400)
            .attr("x",width/2)
            .attr('y',0)
            .text("2020-2030 Projected Growth by Rank")


   }


    //   .on('mouseover', d => {
    //
    // });

  // Add the X Axis
  svg.append("g")
  .attr("transform", "translate(0," + height*.8395 + ")")
  .attr("class","xAxis")
    .call(d3.axisBottom(x).tickFormat(formatPercent))

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y).ticks(8, formatPercent))
      .attr("transform", "translate(92,0)")
      // .attr("fill","#E8EDED")
      .attr("class","yAxis");

  svg.append("text")
     .attr("class","x-axisTitle text")
     .attr("x",width/2+30)
     .attr('y',height)
     .attr('text-anchor',"middle")
     .text("Growth Rate 2019-2021")

  svg.append("text")
   .attr("class","y-axisTitle text")
   .attr("x",-15)
   .attr('y',height/2)
   .attr('text-anchor',"middle")
   .attr("transform", "translate(" + -250 + "," + height*.5 + ") rotate(270)")
   .text("Projected Growth Rate 2020-2030 (BLS) ")

   svg.selectAll(".circleTitle").style("opacity",1)



}


function twoRankScatter() {
  showP=1

    divTwo.select("#hiddenRow").style("visibility","visible")

   svg.selectAll('.grid').style("visibility","visible")
   d3.selectAll('.grid').style("visibility","visible")

var yData=["0% Growth","Average Growth(9.1%)","Highest Growth(23.1%)"];

  svg.selectAll(".growthTitleX").remove()



  // svg.selectAll(".rapidText").style("visibility","hidden")

  // svg.selectAll(".growthTitleX").style("visibility", "hidden")

  // svg.selectAll(".xAxis").style("visibility", 'visible')
  // svg.selectAll(".yAxis").style("visibility", 'visible')


  svg.append("text")
   .attr("class","grid specialTick")
   .attr("x",20)
   .attr('y',47)
   .attr('text-anchor',"end")
   .style("opacity",.7)
   .text("Top 2030")

   svg.append("text")
    .attr("class","grid specialTick")
    .attr("x",20)
    .attr('y',63)
    .attr('text-anchor',"end")
    .style("opacity",.7)
    .text("Growth (23.1%)")

   svg.append("text")
    .attr("class","grid specialTick")
    .attr("x",20)
    .attr('y',211.5-3)
    .attr('text-anchor',"end")
    .style("opacity",.7)
    .text("Average 2030")

    svg.append("text")
     .attr("class","grid specialTick")
     .attr("x",20)
     .attr('y',211.5+13)
     .attr('text-anchor',"end")
     .style("opacity",.7)
     .text("Growth (9.1%)")

    svg.append("text")
     .attr("class","grid specialTick")
     .attr("x",20)
     .attr('y',382.5+5)
     .attr('text-anchor',"end")
     .style("opacity",.7)
     .text("0% 2030 Growth")





     svg.selectAll(".circleTitle")
       .style("visibility", "visible")


  svg.selectAll(".dots")
     .transition()
     .duration(600)
     .style("visibility","hidden")
      .attr("cx", function(d) { return xDiag(d.rankNext)-5;})
      .attr("cy", function(d) { return yDiag(d.rankProject); })
      .style("visibility", "visible")
       .style("opacity",1)







        svg.append("text")
          .attr("x",340)
          .attr("y",510)
          .attr("class","growthTitleX mainX")
          .attr("id","growthRateTitle")
          .attr('text-anchor',"middle")
          .text("Growth Rate 2019 & 2021 by Rank")


          svg.append("text")
             .attr("class","growthTitleX lowX")
             .attr("id","lowGrowth")
             .attr("x",width/7)
             .attr("y",490)
             .attr('text-anchor',"middle")
             .text("Low Growth")

             svg.append("text")
                .attr("x",(width*6)/7)
                .attr("y",490)
                .attr("class","growthTitleX highX")
                .attr("id", "highGrowth")
                .attr('text-anchor',"middle")
                .text("High Growth")


                svg
                  .append('path')
                  .attr('d', d3.line()([lineStart2, lineEnd2]))
                  .attr('stroke', 'black')
                  .attr('marker-end', 'url(#arrow)')
                  .attr('marker-start', 'url(#arrow2)')
                  .attr("class","growthTitleX arrow&line")
                  .attr("id","arrowLine")
                  .attr('fill', 'none');



      // svg.selectAll(".circleTitle")
      //    .data(familyData)
      //    .enter()

      if (backwards==1) {

         svg.selectAll('.grid').style("visibility","visible")

        // svg.selectAll(".circleTitle")
        //    .data(familyData)
        //    // .filter(function(d) {return +d.Round1== 1 || d.Round1== "1"})
        //    .enter()

        svg.select("#tableTitleSVG2")
           .transition()
           .duration(600)
           .attr("x",width/2)
           .attr('y',2)
           .text("2020-2030 Projected Growth by Rank")

           svg.selectAll(".circleTitle")
             .transition()
             .duration(600)
             // .attr("class","circleTitle")
             .attr("x",function(d) { return xDiag(d.rankNext)-5;} )
             .attr("y",  function(d) { if (d.name2code == "Social Services"||d.name2code == "Computer & Mathematical") {return yDiag(d.rankProject)+1.6*radiusScale(d.allJobPosts2021);} else {return yDiag(d.rankProject)-1.2*radiusScale(d.allJobPosts2021);}})
             .attr('text-anchor',"middle")
             .attr("transform", function (d) {
              return "rotate(0,0,0)" ;});

           backwards=1

           svg.selectAll(".y-axisTitle").style("visibility", 'visible')
           svg.selectAll(".x-axisTitle").style("visibility", 'visible')
           svg.selectAll(".xAxis").style("visibility", 'visible')
           svg.selectAll(".yAxis").style("visibility", 'visible')

           // svg.append("g")
           // .attr("transform", "translate(0," + height*.8395 + ")")
           // .attr("class","xAxis")
           //   .call(d3.axisBottom(xDiag))
           //
           // // Add the Y Axis
           // svg.append("g")
           //     .call(d3.axisLeft(yDiag))
           //     // .attr("transform", "translate(0,0)")
           //     // .attr("fill","#E8EDED")
           //     .attr("class","yAxis");


      }




      else {

    // svg.selectAll(".circleTitle")
    //   .transition()
    //   .duration(600)
    //   // .attr("class","circleTitle")
    //   .attr("x", function(d) {if (d.name2code == "Computer & Mathematical") {return x(d.growth_all2Code)*2} else {return x(d.growth_all2Code)} })
    //   .attr("y", function(d) { if (d.name2code == "Education") {return 1000} else if (d.name2code == "Maintenance & Repair" || d.name2code == "Management") {return y(d.project2Code)+1.35*(radiusScale(d.allJobPosts2021))}  else if (d.name2code == "Healthcare Practitioners") {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021)-10)} else {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))}})
    //   .attr('text-anchor',"middle")
    //   .attr("transform", function (d) {
    //    return "rotate(0,0,0)" ;});

svg.selectAll(".innerDots")
   .style("visibility", "hidden")

   svg.selectAll(".circleGrowthPercent")
    .style("visibility", "hidden")

    svg.selectAll(".circleFBShare")
     .style("visibility", "hidden")

     svg.selectAll('.grid').style("visibility","visible")



         svg.select("#tableTitleSVG2")
            .transition()
            .duration(400)
            .attr("x",width/2)
            .attr('y',0)
            .text("2020-2030 Projected Growth by Rank")


   }



}
















function sankeyTwo (upload) {

  var allPercent=formatPercent(upload.demo[0].value);
  var hoverPercent=upload.demo[0].value;
  var Number2019=formatMill(upload.demo[3].value);
  var Number2030 =formatMill(upload.demo[4].value);
  var NewJobNumber =formatMill(upload.demo[5].value);
  var NewJobNumberL =formatComma(upload.demo[5].value);
  var ExistingNumber =formatMill(upload.demo[6].value);
  var ExistingNumberL =formatComma(upload.demo[6].value);
  var bigTitle =upload.demo[7].value;
  var Number2020=formatMill(upload.demo[8].value);
  var Number2020L=formatComma(upload.demo[8].value);
  var pandemicL = formatComma(upload.demo[9].value);
  var pandemicR = formatComma(upload.demo[10].value);
  var newJobEst = formatComma(upload.demo[11].value);
  var exitNumber = formatComma(upload.demo[12].value);
  var paragraphONE = upload.demo[13].value;
  var paragraphTWO = upload.demo[14].value;
  var percentChange = formatPercent(upload.demo[15].value);
  var percentIndicator = upload.demo[15].value;




  var colorSankey=["#407cca","#ffffff","#ffffff","#ffffff","#8db1df","#f48060","#8db1df"]


  var sankey = d3.sankey()
      .nodeWidth(80)
      .nodePadding(40)
      .size([widthSank-100, heightSank-200])
      .nodeAlign(d3.sankeyRight);

    var  graph = sankey(upload)


    var path = sankey.links();



defs = svgSank.append("defs");

var gradient = defs.append("linearGradient")
.attr("id", "svgGradient")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "0%");

gradient.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "#407CCA")
.attr("stop-opacity", 1);

gradient.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "#EFBEAA")
.attr("stop-opacity", 1);


var gradient2 = defs.append("linearGradient")
.attr("id", "svgGradient2")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "0%");

gradient2.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "#407CCA")
.attr("stop-opacity", 1);

gradient2.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "#8db1df")
.attr("stop-opacity", 1);

var gradient3 = defs.append("linearGradient")
.attr("id", "svgGradient3")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "0%");

gradient3.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "#f1af96")
.attr("stop-opacity", 1);

gradient3.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "#f48060")
.attr("stop-opacity", 1);


var gradient4 = defs.append("linearGradient")
.attr("id", "svgGradient4")
.attr("x1", "0%")
.attr("x2", "100%")
.attr("y1", "0%")
.attr("y2", "0%");

gradient4.append("stop")
.attr('class', 'start')
.attr("offset", "0%")
.attr("stop-color", "#EFBEAA")
.attr("stop-opacity", 1);

gradient4.append("stop")
.attr('class', 'end')
.attr("offset", "100%")
.attr("stop-color", "#f1af96")
.attr("stop-opacity", 1);






// add in the links
var link = svgSank.append("g").selectAll(".linkSank")
    .data(graph.links)
  .enter().append("path")
    .attr("class", "linkSank")
    .attr("id",function(d){return d.source.name+"_"+d.target.name})
    // .attr("d", path)
    .attr("d",d3.sankeyLinkHorizontal())
    .attr("i",upload)
    .attr("fill", "none")
    // .attr("stroke", function(d){return "#9c9dal"})
    .style("stroke", "#ffffff")
    .attr("stroke-width", function(d) {return d.width})
    // .attr("stoke-opacity", 1)
    .style("opacity", 1)
    .attr("transform","translate(40,50)")
    .on("mouseover", sankMouseOver)
    .on("mouseout",sankMouseOut);



              let node = svgSank
                  .append("g")
                  .classed("nodes", true)
                  .selectAll("rect")
                  .data(graph.nodes)
                  .enter()
                  .append("rect")
                  .attr("id",function(d){ return d.name})
                  .classed("node", true)
                  .attr("x", d => d.x0)
                  .attr("y", d => d.y0)
                  // .attr("y", function(d) {if (d.name=="Job Creation"){return d.y0-30} else {return d.y0} })
                  .attr("width", d => d.x1 - d.x0)
                  // .attr("width",function(d){if (d.node==5) {return d.x1-d.x1} else {return d.x1-d.x0}})
                  .attr("height", d => d.y1 - d.y0)
                  .style("fill", d => colorSankey[d.node])
                  .style("stroke", "url(#svgGradient3)")
                  .style("stroke-width", .05)
                  .attr("opacity", 1)
                  .attr("transform","translate(40,50)")
                  .on("mouseover", sankMouseOverNode)
                  .on("mouseout",sankMouseOut)


                  svgSank.select("#WF2020_PassOne").style("stroke","url(#svgGradient)")//soft blue: #bbd0ec
                  svgSank.select("#WF2020_PassTwo").style("stroke","url(#svgGradient2)")
                  svgSank.select("#PassOne_NewWorkforce").style("stroke","url(#svgGradient3)")

                  svgSank.select("#PassOne").style("fill","url(#svgGradient4)")
                  svgSank.select("#Recovery").style("fill","url(#svgGradient4)")
                  svgSank.select("#JobCreation").style("fill","url(#svgGradient4)")
                  svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#8db1df")
                  svgSank.select("#Recovery_NewWorkforce").style("stroke","url(#svgGradient3)")
                  svgSank.select("#JobCreation_NewWorkforce").style("stroke","url(#svgGradient3)")

                  // svgSank.select("#PassOne").style("opacity",.5)
                  // svgSank.select("#PassTwo").style("opacity",.5)

var svgCoor = node.filter(function(d) {return d.name==="WF2020" || d.name==="PassOne"|| d.name==="PassTwo" || d.name==="Recovery" || d.name==="JobCreation"})
var svg1X0 = +svgCoor._groups[0][0].x.animVal.value
var svg1Y0 = +svgCoor._groups[0][0].y.animVal.value
var svg1Height = +svgCoor._groups[0][0].height.animVal.value
var svg2X0 = +svgCoor._groups[0][1].x.animVal.value
var svg2Y0 = +svgCoor._groups[0][1].y.animVal.value
var svg3X0 = +svgCoor._groups[0][2].x.animVal.value
var svg3Y0 = +svgCoor._groups[0][2].y.animVal.value

var svg4X0 = +svgCoor._groups[0][3].x.animVal.value
var svg4Y0 = +svgCoor._groups[0][3].y.animVal.value
var svg4Height = +svgCoor._groups[0][3].height.animVal.value
var svg5X0 = +svgCoor._groups[0][4].x.animVal.value
var svg5Y0 = +svgCoor._groups[0][4].y.animVal.value
var svg5Height = +svgCoor._groups[0][4].height.animVal.value





                  svgSank.append("text")
                   .attr("class","sankeyRecTitle")
                   .attr("id","Workforce2020")
                   // .attr("x", d => d.x0)
                   // .attr("y", d => d.y0)
                   .attr("x",svg1X0+40)
                   .attr('y',svg1Y0+(svg1Height/2)-7)
                   .attr('text-anchor',"middle")
                   .style('fill', '#ffffff')
                   .attr("transform","translate(40,50)")
                   .text(Number2020)

                   svgSank.append("text")
                    .attr("class","sankeyRecTitle")
                    .attr("id","NewWF2030")
                    .attr("x",svg4X0+253)
                    .attr('y',svg4Y0+(svg4Height/2)+7)
                    .attr('text-anchor',"start")
                    .style('fill', '#ffffff')
                    .attr("transform","translate(40,50)")
                    .text(NewJobNumber)


                    svgSank.append("text")
                     .attr("class","sankeyRecTitle")
                     .attr("id","ExistingWF2030")
                     .attr("x",svg5X0+310)
                     .attr('y',svg5Y0+(svg5Height/2)+7)
                     .attr('text-anchor',"start")
                     .style('fill', '#ffffff')
                     .attr("transform","translate(40,50)")
                     .text(ExistingNumber)

                     svgSank.append("text")
                      .attr("class","sankeyMidText")
                      .attr("id","NewWF2030_text")
                      .attr("x",svg4X0+80)
                      .attr('y',svg4Y0+(svg4Height/2)+7)
                      .attr('text-anchor',"start")
                      .style('fill', '#ffffff')
                      .attr("transform","translate(40,50)")
                      .text("Jobs needing workers: ")


                      svgSank.append("text")
                       .attr("class","sankeyMidText")
                       .attr("id","ExistingWF2030_text")
                       .attr("x",svg5X0+80)
                       .attr('y',svg5Y0+(svg5Height/2)+7)
                       .attr('text-anchor',"start")
                       .style('fill', '#ffffff')
                       .attr("transform","translate(40,50)")
                       .text("Jobs held by existing workers: ")

                     svgSank.append("text")
                             .attr("class","sankeyPathTitle")
                             .attr("id","NewJobs")
                            .attr("x",svg2X0-10)
                            .attr('y',svg2Y0+10)
                      .attr('text-anchor',"end")
                      .style('fill', '#000000')
                      .style('visibility', function(d){ if (bigTitle=="Building & Grounds Cleaning & Maintenance"||bigTitle=="Farming"||bigTitle=="Management"||bigTitle=="Office & Administrative Support"||bigTitle=="Personal"||bigTitle=="Production"||bigTitle=="Sales"){return 'hidden'} else{return "visible"}})
                      .attr("transform","translate(40,50)")
                      .text("New Jobs Created")


                     svgSank.append("text")
                            .attr("class","sankeyPathTitle")
                            .attr("id","PandemicRecovery")
                            .attr("x",svg3X0-10)
                            .attr('y',svg3Y0+10)
                      .attr('text-anchor',"end")
                      .style('fill', '#000000')
                      .attr("transform","translate(40,50)")
                      .text("Pandemic Job Recovery")

                      svgSank.append("text")
                             .attr("class","sankeyYear")
                             .attr("x",50)
                             .attr('y',450)
                       .attr('text-anchor',"midddle")
                       .style('fill', '#000000')
                       .text("2020")

                       svgSank.append("text")
                              .attr("class","sankeyYear")
                              .attr("x",750)
                              .attr('y',450)
                        .attr('text-anchor',"midddle")
                        .style('fill', '#000000')
                        .text("2030")








                              document.getElementById("paraNum1").innerHTML = paragraphONE
                              document.getElementById("paraNum2").innerHTML = paragraphTWO
var hoverTitle
var hoverNumber
var hoverSubTitle

              function sankMouseOverNode(d, i) {

                                hoverTitle = d.toElement.id

                                if (hoverTitle == "NewWorkforce"){hoverNumber=NewJobNumberL; hoverSubTitle="Jobs needing workers: "
                                svgSank.select("#NewWorkforce").style("fill","#FD825F")
                              }
                                else if (hoverTitle == "Recovery"){hoverNumber=pandemicR; hoverSubTitle="Pandemic job recovery: "
                                svgSank.select("#Recovery_NewWorkforce").style("stroke","#f48060")
                                svgSank.select("#Recovery").style("fill","#f48060")
                              }
                                else if (hoverTitle == "JobCreation"){hoverNumber=newJobEst;hoverSubTitle="New jobs created: "
                                svgSank.select("#JobCreation_NewWorkforce").style("stroke","#f48060")
                                svgSank.select("#JobCreation").style("fill","#f48060")
                              }
                                else if (hoverTitle == "PassOne"){hoverNumber=exitNumber; hoverSubTitle="Jobs held by workers exiting: "
                                svgSank.select("#PassOne_NewWorkforce").style("stroke","#f48060")
                                svgSank.select("#PassOne").style("fill","#f48060")
                                svgSank.select("#WF2020_PassOne").style("stroke","#f48060")
                              }
                                else if (hoverTitle == "PassTwo"){hoverNumber=ExistingNumberL; hoverSubTitle="Jobs held by existing workers: "
                                svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#407cca")
                                svgSank.select("#PassTwo").style("fill","#407cca")
                                svgSank.select("#WF2020_PassTwo").style("stroke","#407cca")

                                svgSank.select("#ExistingWorkforce").style("fill","#407cca")
                              }
                                else if (hoverTitle == "ExistingWorkforce"){hoverNumber=ExistingNumberL; hoverSubTitle="Jobs held by existing workers: "
                                svgSank.select("#ExistingWorkforce").style("fill","#407cca")
                                svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#407cca")
                                svgSank.select("#PassTwo").style("fill","#407cca")
                                svgSank.select("#WF2020_PassTwo").style("stroke","#407cca")

                              }
                                else {hoverNumber = Number2020L; hoverSubTitle="Jobs total 2020: "
                                svgSank.select("#WF2020").style("fill","#8db1df")
                              }

                                  divSank.transition()
                                           .duration(200)
                                           .style("opacity",.9);


                                      divSank.html("<div class='hoverContain'><div class='titleHover'>"+bigTitle +"</div>"+"<div class='rankSpace'>"+hoverSubTitle+hoverNumber +"</div></div>")
                                             .style("left", (d.pageX+50) + "px")
                                             .style("top", (d.pageY - 30) + "px")
                                             .style("visibility", "visible");


                          }

                          function sankMouseOver(d, i) {

                                            hoverTitle = d.toElement.id

                                            if (hoverTitle == "NewWorkforce"){hoverNumber=NewJobNumberL; hoverSubTitle="Jobs needing workers: "
                                            svgSank.select("#NewWorkforce").style("fill","#FD825F")
                                          }
                                            else if (hoverTitle == "Recovery_NewWorkforce"){hoverNumber=pandemicR; hoverSubTitle="Pandemic job recovery: "
                                            svgSank.select("#Recovery_NewWorkforce").style("stroke","#f48060")
                                            svgSank.select("#Recovery").style("fill","#f48060")

                                          }
                                            else if (hoverTitle == "JobCreation_NewWorkforce"){hoverNumber=newJobEst;hoverSubTitle="New jobs created: "
                                            svgSank.select("#JobCreation_NewWorkforce").style("stroke","#f48060")
                                            svgSank.select("#JobCreation").style("fill","#f48060")
                                          }
                                            else if (hoverTitle == "PassOne_NewWorkforce"){hoverNumber=exitNumber; hoverSubTitle="Jobs held by workers exiting: "
                                            svgSank.select("#PassOne_NewWorkforce").style("stroke","#f48060")
                                            svgSank.select("#PassOne").style("fill","#f48060")
                                            svgSank.select("#WF2020_PassOne").style("stroke","#f48060")

                                          }
                                            else if (hoverTitle == "WF2020_PassOne"){hoverNumber=exitNumber; hoverSubTitle="Jobs held by exiting workers: "
                                            svgSank.select("#PassOne_NewWorkforce").style("stroke","#f48060")
                                            svgSank.select("#PassOne").style("fill","#f48060")
                                            svgSank.select("#WF2020_PassOne").style("stroke","#f48060")}

                                            else if (hoverTitle == "PassTwo_ExistingWorkforce"){hoverNumber=ExistingNumberL; hoverSubTitle="Jobs held by existing workers: "
                                            svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#407cca")
                                            svgSank.select("#PassTwo").style("fill","#407cca")
                                            svgSank.select("#WF2020_PassTwo").style("stroke","#407cca")
                                            svgSank.select("#ExistingWorkforce").style("fill","#407cca")

                                          }

                                            else if (hoverTitle == "WF2020_PassTwo"){hoverNumber=ExistingNumberL; hoverSubTitle="Jobs held by existing workers: "
                                            svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#407cca")
                                            svgSank.select("#PassTwo").style("fill","#407cca")
                                            svgSank.select("#WF2020_PassTwo").style("stroke","#407cca")
                                          svgSank.select("#ExistingWorkforce").style("fill","#407cca")
                                        }
                                            else {hoverNumber = Number2020L; hoverSubTitle="Jobs total 2020: "}

                                              divSank.transition()
                                                       .duration(200)
                                                       .style("opacity",.9);


                                                  divSank.html("<div class='hoverContain'><div class='titleHover'>"+bigTitle +"</div>"+"<div class='rankSpace'>"+hoverSubTitle+hoverNumber +"</div></div>")
                                                         .style("left", (d.pageX+50) + "px")
                                                         .style("top", (d.pageY - 30) + "px")
                                                         .style("visibility", "visible");


                                      }




                              function sankMouseOut(d, i) {
                                        // Use D3 to select element, change color back to normal
                                        // d3.select(this).attr("stroke-width","1.5px")
                                        //                .attr("stroke", "#9B9EA0");
                                        if (hoverTitle == "NewWorkforce"){
                                        svgSank.select("#NewWorkforce").style("fill","#f48060")
                                      }
                                      else if (hoverTitle == "Recovery_NewWorkforce"){

                                      svgSank.select("#Recovery").style("fill","url(#svgGradient4)")
                                      svgSank.select("#Recovery_NewWorkforce").style("stroke","url(#svgGradient3)")
                                    }
                                    else if (hoverTitle == "Recovery"){

                                    svgSank.select("#Recovery").style("fill","url(#svgGradient4)")
                                    svgSank.select("#Recovery_NewWorkforce").style("stroke","url(#svgGradient3)")
                                  }
                                  else if (hoverTitle == "JobCreation_NewWorkforce"){
                                  svgSank.select("#JobCreation_NewWorkforce").style("stroke","url(#svgGradient3)")
                                  svgSank.select("#JobCreation").style("fill","url(#svgGradient4)")
                                }
                                else if (hoverTitle == "JobCreation"){
                                svgSank.select("#JobCreation_NewWorkforce").style("stroke","url(#svgGradient3)")
                                svgSank.select("#JobCreation").style("fill","url(#svgGradient4)")
                              }
                              else if (hoverTitle == "PassOne_NewWorkforce"){
                              svgSank.select("#PassOne_NewWorkforce").style("stroke","url(#svgGradient3)")
                              svgSank.select("#PassOne").style("fill","url(#svgGradient4)")
                              svgSank.select("#WF2020_PassOne").style("stroke","url(#svgGradient)")
                            }
                              else if (hoverTitle == "PassOne"){
                              svgSank.select("#PassOne_NewWorkforce").style("stroke","url(#svgGradient3)")
                              svgSank.select("#PassOne").style("fill","url(#svgGradient4)")
                              svgSank.select("#WF2020_PassOne").style("stroke","url(#svgGradient)")

                            }
                            else if (hoverTitle == "WF2020_PassOne"){
                            svgSank.select("#PassOne_NewWorkforce").style("stroke","url(#svgGradient3)")
                            svgSank.select("#PassOne").style("fill","url(#svgGradient4)")
                            svgSank.select("#WF2020_PassOne").style("stroke","url(#svgGradient)")

                          }
                          else if (hoverTitle == "PassTwo"){
                          svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#8db1df")
                          svgSank.select("#PassTwo").style("fill","#8db1df")
                          svgSank.select("#WF2020_PassTwo").style("stroke","url(#svgGradient2)")
                          svgSank.select("#ExistingWorkforce").style("fill","#8db1df")
                        }
                        else if (hoverTitle == "WF2020_PassTwo"){
                        svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#8db1df")
                        svgSank.select("#PassTwo").style("fill","#8db1df")
                        svgSank.select("#WF2020_PassTwo").style("stroke","url(#svgGradient2)")
                        svgSank.select("#ExistingWorkforce").style("fill","#8db1df")
                      }
                      else if (hoverTitle == "PassTwo_ExistingWorkforce"){
                      svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#8db1df")
                      svgSank.select("#PassTwo").style("fill","#8db1df")
                      svgSank.select("#WF2020_PassTwo").style("stroke","url(#svgGradient2)")
                      svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#8db1df")
                    svgSank.select("#ExistingWorkforce").style("fill","#8db1df")
                    }

                          else if (hoverTitle == "ExistingWorkforce"){
                          svgSank.select("#ExistingWorkforce").style("fill","#8db1df")
                          svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#8db1df")
                          svgSank.select("#PassTwo").style("fill","#8db1df")
                          svgSank.select("#WF2020_PassTwo").style("stroke","url(#svgGradient2)")
                        }
                        else {
                          svgSank.select("#WF2020").style("fill","#407cca")
                        }

                                                       divSank.style("opacity",0)
                                                              .style("visibility", "hidden");

                                        // Select text by id and then remove
                                         // Remove text location
                                      }





  function sankTransition() {

    svgSank.selectAll(".linkSank").remove();
    svgSank.selectAll(".nodes").remove();
    svgSank.select("#Workforce2019").remove();
    svgSank.select("#Workforce2020").remove();
    // svgSank.select("#WorkforceExit").remove()
    svgSank.select("#NewWorkforce2030").remove();
    svgSank.select("#SustainingWorkforce2030").remove();
    svgSank.select("#PandemicLoss").remove();
    svgSank.select("#PandemicRecovery").remove();
    svgSank.select("#NewJobs").remove();
    svgSank.select("#WF_Exit").remove();
    svgSank.select("#WF_Entrance").remove();
    svgSank.select("#ExistingJobNumbers").remove();
    svgSank.select("#RemainingJobs").remove();

    upload=data[2][selectFam]

    allPercent=formatPercent(upload.demo[0].value);
    hoverPercent=upload.demo[0].value;
    Number2019=formatMill(upload.demo[3].value);
    Number2030 =formatMill(upload.demo[4].value);
    NewJobNumber =formatMill(upload.demo[5].value);
    NewJobNumberL =formatComma(upload.demo[5].value);
    ExistingNumber =formatMill(upload.demo[6].value);
    ExistingNumberL =formatComma(upload.demo[6].value);
    bigTitle =upload.demo[7].value;
    Number2020=formatMill(upload.demo[8].value);
    Number2020L=formatComma(upload.demo[8].value);
    pandemicL = formatComma(upload.demo[9].value);
    pandemicR = formatComma(upload.demo[10].value);
    newJobEst = formatComma(upload.demo[11].value);
    exitNumber = formatComma(upload.demo[12].value);
    paragraphONE = upload.demo[13].value;
    paragraphTWO = upload.demo[14].value;
    percentChange = formatPercent(upload.demo[15].value);
    percentIndicator = upload.demo[15].value;





    graph=sankey(upload)
    path = sankey.links();

    var link = svgSank.append("g").selectAll(".linkSank")
        .data(graph.links)
      .enter().append("path")
        .attr("class", "linkSank")
        .attr("id",function(d){return d.source.name+"_"+d.target.name})
        // .attr("d", path)
        .attr("d",d3.sankeyLinkHorizontal())
        .attr("i",upload)
        .attr("fill", "none")
        // .attr("stroke", function(d){return "#9c9dal"})
        .style("stroke", "linear-gradient(to right, #f1af96, #f48060)")
        .attr("stroke-width", function(d) {return d.width})
        // .attr("stoke-opacity", 1)
        .style("opacity", 1)
        .attr("transform","translate(40,50)")
        .on("mouseover", sankMouseOver)
        .on("mouseout",sankMouseOut);




      let node = svgSank
          .append("g")
          .classed("nodes", true)
          .selectAll("rect")
          .data(graph.nodes)
          .enter()
          .append("rect")
          .attr("id",function(d){ return d.name})
          .classed("node", true)
          .attr("x", d => d.x0)
          .attr("y", d => d.y0)
          // .attr("y", function(d) {if (d.name=="Job Creation"){return d.y0-30} else {return d.y0} })
          .attr("width", d => d.x1 - d.x0)
          // .attr("width",function(d){if (d.node==5) {return d.x1-d.x1} else {return d.x1-d.x0}})
          .attr("height", d => d.y1 - d.y0)
          .style("fill", d => colorSankey[d.node])
          .style("stroke", "#bfbfbf")
          .style("stroke-width", .05)
          .attr("opacity", 1)
          .attr("transform","translate(40,50)")
          .on("mouseover", sankMouseOverNode)
          .on("mouseout",sankMouseOut);

          // svgSank.select("#PassOne").style("opacity",.5)
          // svgSank.select("#PassTwo").style("opacity",.5)


svgCoor = node.filter(function(d) {return d.name==="WF2020" || d.name==="PassOne"|| d.name==="PassTwo" || d.name==="Recovery" || d.name==="JobCreation"})
svg1X0 = +svgCoor._groups[0][0].x.animVal.value
svg1Y0 = +svgCoor._groups[0][0].y.animVal.value
svg1Height = +svgCoor._groups[0][0].height.animVal.value
svg2X0 = +svgCoor._groups[0][1].x.animVal.value
svg2Y0 = +svgCoor._groups[0][1].y.animVal.value
svg3X0 = +svgCoor._groups[0][2].x.animVal.value
svg3Y0 = +svgCoor._groups[0][2].y.animVal.value
svg4X0 = +svgCoor._groups[0][3].x.animVal.value
svg4Y0 = +svgCoor._groups[0][3].y.animVal.value
svg4Height = +svgCoor._groups[0][3].height.animVal.value
svg5X0 = +svgCoor._groups[0][4].x.animVal.value
svg5Y0 = +svgCoor._groups[0][4].y.animVal.value
svg5Height = +svgCoor._groups[0][4].height.animVal.value


svgSank.select("#WF2020_PassOne").style("stroke","url(#svgGradient)")//soft blue: #bbd0ec
svgSank.select("#WF2020_PassTwo").style("stroke","url(#svgGradient2)")
svgSank.select("#PassOne").style("fill","url(#svgGradient4)")
svgSank.select("#Recovery").style("fill","url(#svgGradient4)")
svgSank.select("#JobCreation").style("fill","url(#svgGradient4)")
svgSank.select("#PassTwo_ExistingWorkforce").style("stroke","#8db1df")
svgSank.select("#Recovery_NewWorkforce").style("stroke","url(#svgGradient3)")
svgSank.select("#JobCreation_NewWorkforce").style("stroke","url(#svgGradient3)")
svgSank.select("#PassOne_NewWorkforce").style("stroke","url(#svgGradient3)")

// svgSank.select("#PassOne_NewWorkforce").attr("fill","url(#svgGradient3)")
//



svgSank.append("text")
 .attr("class","sankeyRecTitle")
 .attr("id","Workforce2020")
 // .attr("x", d => d.x0)
 // .attr("y", d => d.y0)
 .attr("x",svg1X0+40)
 .attr('y',svg1Y0+(svg1Height/2)-7)
 .attr('text-anchor',"middle")
 .style('fill', '#ffffff')
 .attr("transform","translate(40,50)")
 .text(Number2020)

 svgSank.append("text")
  .attr("class","sankeyRecTitle")
  .attr("id","NewWF2030")
  .attr("x",svg4X0+253)
  .attr('y',function(d) {if (bigTitle=="Computer & Mathematical") {return svg4Y0+(svg4Height/2)-7} else {return svg4Y0+(svg4Height/2)+7}})
  .attr('text-anchor',"start")
  .style('fill', '#ffffff')
  .attr("transform","translate(40,50)")
  .text(NewJobNumber)




  svgSank.append("text")
   .attr("class","sankeyRecTitle")
   .attr("id","ExistingWF2030")
   .attr("x",svg5X0+310)
   .attr('y',svg5Y0+(svg5Height/2)+7)
   .attr('text-anchor',"start")
   .style('fill', '#ffffff')
   .attr("transform","translate(40,50)")
   .text(ExistingNumber)

   svgSank.append("text")
    .attr("class","sankeyMidText")
    .attr("id","NewWF2030_text")
    .attr("x",svg4X0+80)

  .attr('y',function(d) {if (bigTitle=="Computer & Mathematical") {return svg4Y0+(svg4Height/2)-7} else {return svg4Y0+(svg4Height/2)+7}})
    .attr('text-anchor',"start")
    .style('fill', '#ffffff')
    .attr("transform","translate(40,50)")
    .text("Jobs needing workers: ")

    svgSank.append("text")
     .attr("class","sankeyMidText")
     .attr("id","ExistingWF2030_text")
     .attr("x",svg5X0+80)
     .attr('y',svg5Y0+(svg5Height/2)+7)
     .attr('text-anchor',"start")
     .style('fill', '#ffffff')
     .attr("transform","translate(40,50)")
     .text("Jobs held by existing workers: ")




             svgSank.append("text")
                     .attr("class","sankeyPathTitle")
                     .attr("id","NewJobs")
                    .attr("x",svg2X0-10)
                    .attr('y',svg2Y0+10)
              .attr('text-anchor',"end")
              .style('fill', '#000000')
              .style('visibility', function(d){ if (bigTitle=="Building & Grounds Cleaning & Maintenance"||bigTitle=="Farming, Fishing, & Forestry"||bigTitle=="Management"||bigTitle=="Office & Administrative Support"||bigTitle=="Personal Care & Service"||bigTitle=="Production"||bigTitle=="Sales & Related"){return 'hidden'} else{return "visible"}})
              .attr("transform","translate(40,50)")
              .text("Job Increase")


             svgSank.append("text")
                    .attr("class","sankeyPathTitle")
                    .attr("id","PandemicRecovery")
                    .attr("x",svg3X0-10)
                    .attr('y',svg3Y0+10)
              .attr('text-anchor',"end")
              .style('fill', '#000000')
              .style('visibility', function(d){ if (bigTitle=="Business & Financial Operations"||bigTitle=="Community & Social Service"||bigTitle=="Computer & Mathematical"||bigTitle=="Office & Administrative Support"||bigTitle=="Life, Physical, & Social Science"||bigTitle=="Production"||bigTitle=="Sales & Related"){return 'hidden'} else{return "visible"}})
              .attr("transform","translate(40,50)")
              .text("Pandemic Recovery")

              svgSank.append("text")
                     .attr("class","sankeyYear")
                     .attr("x",50)
                     .attr('y',450)
               .attr('text-anchor',"midddle")
               .style('fill', '#000000')
               .text("2020")

               svgSank.append("text")
                      .attr("class","sankeyYear")
                      .attr("x",750)
                      .attr('y',450)
                .attr('text-anchor',"midddle")
                .style('fill', '#000000')
                .text("2030")




                         document.getElementById("paraNum1").innerHTML = paragraphONE
                         document.getElementById("paraNum2").innerHTML = paragraphTWO

                         // svgSank.append("text")
                         //  .attr("class","totalTitle")
                         //  .attr("id","totalTitleID")
                         //  .attr("x",650)
                         //  .attr('y',30)
                         //  .attr('text-anchor',"middle")
                         //  .text(bigTitle)



  }

  document.getElementById("occ-families").addEventListener("change", function() {
    selectFam=this.value
    sankTransition(selectFam)
    document.getElementById("selectTitle").textContent=bigTitle;
  });


};



sankeyTwo(sankeyData)






///STOP



function handleResize2() {

	// 1. update height of step elements
	var stepHeight1 = Math.floor(window.innerHeight * 0.75);
  var stepHeight2 = Math.floor(window.innerHeight * 0.75);



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

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');
  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
  scroller2.resize();


}
// scrollama event handlers
function handleStepEnter2(response) {

	step1.classed('is-active', function (d, j) {
		return j === response.index;
	});



  if (step1._groups[0][0].className === 'step1 is-active' ) {

  }

  if (step1._groups[0][1].className === 'step1 is-active' ) {

	}



}


function handleStepEnter3(response) {


  step2.classed('is-active', function (d, j) {
    return j === response.index;
  });


    chart2.select('p').text(response.index + 1);


 if (step2._groups[0][0].className === 'step2 is-active' ){

   if (backwards==1) {
     backHome()
   }


  }


 if (step2._groups[0][2].className === 'step2 is-active'){



  }

  if (step2._groups[0][3].className === 'step2 is-active'){

plotGrowth()

  }

 if (step2._groups[0][5].className === 'step2 is-active'  ) {
   twoRankScatter()
    // twoRankScatter()
    // twoRankScatter()

  }
  if (step2._groups[0][7].className === 'step2 is-active'  ) {

    // highlightRapid()

   }

   // if (step2._groups[0][8].className === 'step2 is-active'  ) {
   //   //
   //   // rapidGrowth()
   //
   //  }
   //
   //  if (step2._groups[0][9].className === 'step2 is-active'  ) {
   //    //
   //    // risingGrowth()
   //
   //   }
   //
   // if (step2._groups[0][10].className === 'step2 is-active' ) {
   //
   //   // reliableGrowth()
   //
   // }






}

function handleContainerEnter2(response) {


	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', true);


}

function handleContainerExit2(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');


}

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama

	scroller1.setup({
		// container: '#flipped-scroll',
		// graphic: '.scroll__figure2',
		// text: '.scroll__text2',
		step: '.scroll__text1 .step1',
		offset: .95,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller2.setup({
		// container: '#flipped-scroll',
		// graphic: '.scroll__figure2',
		// text: '.scroll__text2',
		step: '.scroll__text2 .step2',
		offset: .95,
		debug: false
	}).onStepEnter(handleStepEnter3)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);




}




init();




}







// kick things off
