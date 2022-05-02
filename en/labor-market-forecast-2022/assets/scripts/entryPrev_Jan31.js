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
var formatMill = function(d){return formatTenth(d/1000000)+ " Million"}


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
var y = d3.scaleLinear().range([height, 0]);
var formatPercent = d3.format(",.1%");
var formatPercentLeg = d3.format(",.0%");

var xDiag = d3.scaleLinear().range([20, width-20]);
var yDiag = d3.scaleLinear().range([height-50, 50]);

var selectFam

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
    .           attr("transform","translate(" + margin.left + "," + margin.top + ")");

var color = d3.scaleLinear()
  .domain([.06,.3])
  .range(["#ffffff","#407cca"]);

  var colorInner = d3.scaleLinear()
    .domain([.06,.3])
    .range(["#ffffff","#407cca"]);




//
// var g = circleSVG_1.append("g") //Set the filter on the container svg
//     // .style("filter", "url(#gooey)")
// 		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

var units = "Widgets";

// set the dimensions and margins of the graph
var marginSank = {top: 10, right:100, bottom: 10, left: 100},
    widthSank = 1200 - marginSank.left - marginSank.right,
    heightSank = 700 - marginSank.top - marginSank.bottom;

// format variables
var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    colorSank = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
var svgSank = d3.select("#sankeyHERE").append("svg")
    .attr("width", widthSank + marginSank.left + (marginSank.right))
    .attr("height", heightSank + marginSank.top + marginSank.bottom)
    .attr("transform",
          "translate(" + marginSank.left + "," + marginSank.top + ")")
    .attr("id","svgSank")

// Set the sankey diagram properties


var backwards=0




// var topData =
var familyData = d3.csv("assets/scripts/occupationFamiliesData.csv")


var timeData = d3.csv("assets/scripts/JobOpeningRatebyState.csv");
var sankData = d3.json("assets/scripts/sankey.json");

Promise.all([familyData, timeData, sankData]).then(startChange);


// d3.csv("assets/scripts/visualOccupations_updated.csv").then(startChange);
// var legend = d3.legendColor()
//     .scale(color)
//     .labelFormat(d3.format(".0f"))
//     .title("Legend");

function startChange(data) {

familyData = data[0]
timeData = data[1]
var sankeyData = data[2].national







// var stateFBData = timeData.filter(function(row) {
//         return row['Date'] == 'FBPercent' || row['Date'] == 'USB' || row['Date'] == 'FB'|| row['Date'] == 'total' ;
//     })
//
// timeData = timeData.filter(function(row) {
//         return +row['Date'] > 0;
//     })



   familyData.forEach(function(d) {
       d.shortGrowth5 = +d.PercentGrowth2019_2021;
       d.shortGrowth3 = +d.GrowthRate_2019_20_3Code;
       d.shortGrowth2 = +d.GrowthRate_2019_20_2Code;
       d.longGrowth5 = +d.Projection2020_30_5Code;
       d.longGrowth3 = +d.Projection2020_30_3Code;
       d.longGrowth2 = +d.Projection2020_30_2Code;
       d.foreignB5 = +d.share_fb_5digit;
       d.foreignB3 = +d.share_fb_3digit;
       d.foreignB2 = +d.share_fb_2digit;
       d.jp2021_2cd = +d.JobPostings_2021_2Code;
       d.jp2021_3cd = +d.JobPostings_2021_3Code;
       d.jp2021_5cd = +d.JobPostings_2021;
       d.titleOcc = d.Occupation_x;
       d.titleFam = d.occFamilyTitle;
       d.title_2Code = d.Title_2Code;
       d.fbShare_2codeAll = d.FB_Share_ALL_2Code;
       d.growth_all2Code = +d.PercentGrowth_2019_21_2code;
       d.allJobPosts2021 = +d.JobPostings_2021_2codeSum;
       d.allJobPosts2019 = +d.JobPostings_2019_2codeSum;
       d.rankBegin = +d.rank_allJobs;
       d.rankNext = +d.rank_allGrowth;
       d.project2Code = +d.Projection2020_30_2Code;
       d.x_allJobs = +d.x_allJobs;
       d.y_allJobs = +d.y_allJobs;
       d.x_allGrowth = +d.x_allGrowth;
       d.y_allGrowth = +d.y_allGrowth;
       d.name2code = d.Name_2code;
       d.x_focus = +d.x_focus;
       d.y_focus = +d.y_focus;
       d.employment_2020 = +d.employment_2020;
       d.employment_2030 = +d.employment_2030;
       d.perEmplChange = +d.percent_employmentChange
       d.round = +d.Round1
       d.Title =d.Title
   });

   function stateLineChart (timeData) {

     var xState = d3.scaleTime().range([20, width]);
     var yState = d3.scaleLinear().range([height-50, 20]);

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



        // Scale the range of the data
            xState.domain(d3.extent(timeData, function(d) { return d.date; }));
            yState.domain([0, d3.max(timeData, function(d) { return d.rate; })]);

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
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xState));

    // Add the Y Axis
    svgLine.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(20, 50)")
        .call(d3.axisLeft(yState));



            // set the colour scale
            // var color = d3.scaleOrdinal(d3.schemeCategory10);

            // var legendSpace = width/dataNest.length; // spacing for the legend

            // Loop through each state / key
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
       // Add interactivity

      // Use D3 to select element, change color and size
      d3.select(this).style("opacity",1);
      toolTip(d, state)
      d3.select("#UnitedStates").style("opacity",1)


      // Specify w
    }

    function toolTip(d, state) {


                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html(state + "<br/>" )
                .style("left", (event.pageX+20) + "px")
                .style("top", (event.pageY-30) + "px")
                .style("visibility","visible");
                    // .style("left", (d3.event.pageX) + "px")
                    // .style("top", (d3.event.pageY - 28) + "px");
                  }

function handleMouseOut(d, i) {
  var idState = d.path[0].id

  d3.select("#UnitedStates").style("opacity",1)

  if (idState!=selectState) {
    d3.select(this).style('opacity',function(d) {if (idState=="United States"){return 1} else {return .1}});


  }
  div.transition()
     .duration(200)
     .style("opacity", 0);
  // d3.select("#"+selectState).style("opacity",1)


      // Use D3 to select element, change color back to normalif (d.key=="United States"){return 1} else {return .1}}

      // Select text by id and then remove

    }

                // Add the Legend

            });

            // svgLine.selectAll("#Iowa")
            //        .style("opacity",100)


          // Add the X Axis

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

                svgLine.append("text")
                   .attr("class","x-axisTitle text")
                   .attr("x",width/2)
                   .attr('y',height+40)
                   .attr('text-anchor',"middle")
                   .text("January 2019 - July 2021")

                   svgLine.append("text")
                      .attr("class","text")
                      .attr("x",400)
                      .attr('y',300)
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
                        .text("Jan, 2019 - July, 2021")



        document.getElementById("stateNames").addEventListener("change", function() {
                          d3.select("#"+selectState).style("opacity",0);
                          console.log(selectState)
                          selectState=this.value.split(" ").join("")
                          // stateTransition(selectState)

                          d3.select("#UnitedStates").style("opacity",1)

                          d3.select("#"+selectState).style("opacity",1);
                          // toolTip(d, state)
                        });




  }

stateLineChart(timeData)


var divTwo = d3.select("body").append("div")
    .attr("class", "tooltipDiv")
    .style("opacity", 0);

    //
    // svg.selectAll(".greenLegend")
    //     .append("g")
    //    .attr("class","greenLegend")
    //    .attr("transform", "translate(100,100)")
    //    .call(legend);


 // var minValue = d3.min(data, function(d) { return d.longGrowth5; })
 // var maxValue = d3.max(data, function(d) { return d.longGrowth5; })

 var minValue = d3.min(familyData, function(d) { return +d.project2Code; })-.04
 var maxValue = d3.max(familyData, function(d) { return +d.project2Code; })+.04
 var radiusScale = d3.scaleSqrt()
   .domain([0, d3.max(familyData, function(d) { return d.allJobPosts2021; })])
   .range([0, 35])

   var radiusFocus = d3.scaleSqrt()
     // .domain([3800000, 14000000])
     // .range([15, 50])
     .domain([0, 14000000])
     .range([0, 50])




 xLineup.domain([1,22]);
 yLineup.domain([22,1]);
 x.domain([0, d3.max([0,1.3])]);
 y.domain([+minValue, +maxValue]);

 xDiag.domain([21,1]);
 yDiag.domain([21,1]);
 // radiusScale = d3.scaleSqrt()
 //   .domain([0, d3.max(familyData, function(d) { return d.jp2021_5cd; })])
 //   .range([3, 20])


function backHome() {

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
               .text("Online Job Postings from May, 2021 - July, 2021")
  svg.selectAll(".growthTitleX").style("visibility", 'hidden')
}




 svg.selectAll(".dots")
     .data(familyData)
   .enter().append("circle")
    .filter(function(d) { return +d.Round1 == 1 ||  d.Round1== "1"})
     .attr("class","dots")
     .attr("stroke", "#9B9EA0")
     .attr("stroke-width", ".5px")
     .attr("r", function(d){return radiusScale(d.allJobPosts2021);})

     .attr("cx", function(d) { return d.x_allJobs})
     .attr("fill", function(d){return color(d.fbShare_2codeAll);})
     .attr("cy", function(d) { return (d.y_allJobs-(radiusScale(d.allJobPosts2021))) })
     .on("mouseover", dotMouseOver)
          .on("mouseout", dotMouseOut);


  function dotMouseOver(d, i) {
   // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr("stroke-width","1.5px")
                           .attr("stroke", "black");

                      divTwo.transition()
                               .duration(200)
                               .style("opacity",.9);

                          divTwo
                                 .html("<b>"+i.Title + "</b>"+'<br/>' + formatPercent(i.fbShare_2codeAll)+ ' Foreign Born' +'<br/>'+ formatComma(i.allJobPosts2021)+
                                      ' Postings'+'<br/>'+formatPercent(i.growth_all2Code)+" Increase from 2019-21"+'<br/>'+formatPercent(i.project2Code)+" Projected Change from 2020 to 2030")
                                 .style("left", (d.pageX-30) + "px")
                                 .style("top", (d.pageY + 30) + "px")
                                 .style("visibility", "visible");



            // Specify where to put label of text
            // svg.append("text").attr({
            //    id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
            //     x: function() { return xScale(d.x) - 30; },
            //     y: function() { return yScale(d.y) - 15; }
            // })
            // .text(function() {
            //   return [d.x, d.y];  // Value of the text
            // });
          }

  function dotMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr("stroke-width","1.5px")
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
                     .text("Online Job Postings from May, 2021 - July, 2021")


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

              // svg.append("g")
              // .attr("transform", "translate(0," + height*.8 + ")")
              // .attr("class","xAxis")
              //   .call(d3.axisBottom(x))


   //   .on('mouseover', function(event,d) {
   //   div
   //     .transition()
   //     .duration(200)
   //     .style('opacity', 0.9);
   //   div
   //     .html(d.titleOcc + '<br/>' + formatPercent(d.foreignB5)+ ' Foreign Born')
   //     .style("left", (event.pageX - 50) + "px")
   //     .style("top", (event.pageY - 68) + "px");
   // })
   // .on('mouseout', () => {
   //   div
   //     .transition()
   //     .duration(500)
   //     .style('opacity', 0);
   // });

   // function innerGrowth() {
   //
   //   svg.selectAll(".innerDots")
   //       .data(familyData)
   //     .enter().append("circle")
   //      .filter(function(d) { return +d.Round1 == 1 ||  d.Round1== "1"})
   //       .attr("class","innerDots")
   //       .attr("stroke", "#9B9EA0")
   //       .attr("stroke-width", ".5px")
   //       .attr("r", function(d){return radiusScale(d.allJobPosts2019);})
   //       .attr("cx", function(d) { return d.x_allJobs})
   //       // .attr("fill", function(d){return colorInner(d.fbShare_2codeAll);})
   //       .attr("fill", "#ffffff")
   //       .attr("cy", function(d) { return (d.y_allJobs-(radiusScale(d.allJobPosts2021)))})
   //
   //
   //
   // }

   function plotGrowth() {

     svg.selectAll(".circleFBShare")
        .style("visibility", "hidden")

        svg.selectAll(".circleFBShareNumber")
           .style("visibility", "hidden")

        // svg.selectAll(".circleTitle")
        //   .style("visibility", "hidden")


        svg.selectAll(".dots")
           .transition()
           .duration(400)
            .attr("r", function(d){return radiusScale(d.allJobPosts2021);})
           .attr("cx", function(d) {return xDiag(d.rankNext)-5 })
           // .attr("cy", function(d) { return yDiag(d.rankNext)});
            .attr("cy", 250);


            svg.selectAll(".circleTitle")
            .transition()
            .duration(400)
            .attr("x",function(d) {return xDiag(d.rankNext)})
            .attr("y","200")
            .attr('text-anchor',"start")
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

       backwards=1
    }

    else {

      backwards=1


            svg.selectAll(".circleTitle")
            .transition()
            .duration(400)
            .attr("x",function(d) { return xDiag(d.rankNext)})
            // .attr("class","circleTitle")
            // .attr("dy",function(d) { return xDiag(d.rankNext)-radiusScale(d.allJobPosts2021)})
            .attr("y","200")
            .attr('text-anchor',"start")
            .attr("transform", function (d) {
             return "rotate(-65,"+xDiag(d.rankNext)+",200)" ;});


             svg.append("text")
             .attr("class","growthTitleX mainX")
             .attr("x",width/2)
             .attr('y',340)
             .attr('text-anchor',"middle")
             .text("Growth Rate from 2019-2021 by Rank")

             svg.append("text")
             .attr("class","growthTitleX")
             .attr("x",width/7)
             .attr('y',320)
             .attr('text-anchor',"middle")
             .text("Low Growth (15-45%)")


             svg
             .append("text")
             .attr("class","growthTitleX")
             .attr("x",(width*6)/7)
             .attr('y',320)
             .attr('text-anchor',"middle")
             .text("High Growth (85-115%)")
              // .attr("transform", function (d) {
    }          //  return "translate("+(xDiag(d.rankNext))+")rotate(-35)";})



      svg.selectAll(".firstTitle")
         .transition()
         .duration(250)
         .text("Online Job Posting Growth from 2019-2021")


           // svg.selectAll(".circleGrowthPercent")
           //    .data(familyData)
           //    .enter()
           //    .append("text")
           //    .filter(function(d) {return +d.Round1== 1})
           //    .attr("class","circleGrowthPercent")
           //    .attr("x",function(d) { return xDiag(d.rankNext)-100 })
           //    .attr('y',function(d) { return yDiag(d.rankNext+20)})
           //    .attr('text-anchor',"middle")
           //    .text(function(d) { return "Growth: "+formatPercent(d.growth_all2Code)})


       // svg.selectAll(".circleTitleDiag")
       // .data(familyData)
       // .enter()
       // .append("text")
       // .filter(function(d) {return +d.Round1== 1})
       // .attr("class","circleTitleDiag")
       // .attr("dx",function(d) { return xDiag(d.rankNext)})
       // // .attr("dy",function(d) { return xDiag(d.rankNext)-radiusScale(d.allJobPosts2021)})
       // .attr("dy","200")
       // .attr('text-anchor',"start")
       // .attr("transform", function (d) {
       //  return "rotate(-65,"+xDiag(d.rankNext)+",200)" ;})
       //   // .attr("transform", function (d) {
       //   //  return "translate("+(xDiag(d.rankNext))+")rotate(-35)";})
       //
       //    .text(function(d) { return d.name2code });
       // .attr("transform", function (d) {
       //  return "rotate(-50)";});
       // .attr("transform", function(d) { return "translate(" + return xDiag(d.rankNext) + "200) rotate(-65)"})
        // .attr("transform", "translate(10,0) rotate(-65)")
       // .attr("transform", "rotate(-65)");


         // svg.selectAll(".circleFBShare")
         // .transition()
         // .duration(500)
         // .attr("x",function(d) { return xDiag(d.rankNext)-100 })
         // .attr('y',function(d) { return yDiag(d.rankNext+10)})


   }

// function growth() {
//
//
//      svg.selectAll(".dots")
//         .transition()
//         .duration(500)
//         .attr("cx", function(d) { return d.x_allGrowth; })
//         .attr("cy", function(d) { return d.y_allGrowth-(radiusScale(d.allJobPosts2021));});
//
//         svg.selectAll(".innerDots")
//            .transition()
//            .duration(500)
//            .style("visibility", "visible")
//            .attr("cx", function(d) { return d.x_allGrowth; })
//            .attr("cy", function(d) { return d.y_allGrowth-(radiusScale(d.allJobPosts2021));});
//
//
//     svg.selectAll(".circleTitle")
//     .transition()
//     .duration(500)
//     // .attr("class","circleTitle")
//     .attr("x",function(d) { return d.x_allGrowth })
//     .attr('y',function(d) { return (d.y_allGrowth+20)})
//
//       svg.selectAll(".circleFBShare")
//       .transition()
//       .duration(500)
//       .attr("x",function(d) { return d.x_allGrowth })
//       .attr('y',function(d) { return (d.y_allGrowth+32)})
//
//     svg.selectAll(".circleGrowthPercent")
//     .transition()
//     .duration(500)
//     .attr("x",function(d) { return d.x_allGrowth })
//     .attr('y',function(d) { return (d.y_allGrowth+45)})
// }

function twoCodeScatter() {

  svg.selectAll(".rapidText").style("visibility","hidden")

  svg.selectAll(".growthTitleX").style("visibility", "hidden")

  svg.selectAll(".xAxis").style("visibility", 'visible')
  svg.selectAll(".yAxis").style("visibility", 'visible')



     svg.selectAll(".circleTitle")
       .style("visibility", "visible")


  svg.selectAll(".dots")
     .transition()
     .duration(400)
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
           .duration(200)
           .attr("x",width/2)
           .attr('y',0)
           .text("2019-21 Growth vs 2030 Projected Growth")

           svg.selectAll(".circleTitle")
             .transition()
             .duration(400)
             // .attr("class","circleTitle")
             .attr("x", function(d) {return x(d.growth_all2Code) })
             .attr("y", function(d) { if (d.name2code == "Education") {return 1000} else if (d.name2code == "Maintenance & Repair" || d.name2code == "Management") {return y(d.project2Code)+1.35*(radiusScale(d.allJobPosts2021))} else if (d.name2code == "Healthcare Practitioners") {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021)-10)} else {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))}})
             .attr('text-anchor',"middle")
             .attr("transform", function (d) {
              return "rotate(0,0,0)" ;});

           backwards=1

           svg.selectAll(".y-axisTitle").style("visibility", 'visible')
           svg.selectAll(".x-axisTitle").style("visibility", 'visible')
           svg.selectAll(".xAxis").style("visibility", 'visible')
           svg.selectAll(".yAxis").style("visibility", 'visible')


      }




      else {

    svg.selectAll(".circleTitle")
      .transition()
      .duration(400)
      // .attr("class","circleTitle")
      .attr("x", function(d) {return x(d.growth_all2Code) })
      .attr("y", function(d) { if (d.name2code == "Education") {return 1000} else if (d.name2code == "Maintenance & Repair" || d.name2code == "Management") {return y(d.project2Code)+1.35*(radiusScale(d.allJobPosts2021))} else if (d.name2code == "Healthcare Practitioners") {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021)-10)} else {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))}})
      .attr('text-anchor',"middle")
      .attr("transform", function (d) {
       return "rotate(0,0,0)" ;});

svg.selectAll(".innerDots")
   .style("visibility", "hidden")

   svg.selectAll(".circleGrowthPercent")
    .style("visibility", "hidden")

    svg.selectAll(".circleFBShare")
     .style("visibility", "hidden")



         svg.select("#tableTitleSVG2")
            .transition()
            .duration(200)
            .attr("x",width/2)
            .attr('y',0)
            .text("2019-21 Growth vs 2030 Projected Growth")


   }


    //   .on('mouseover', d => {
    //
    // });

  // Add the X Axis
  svg.append("g")
  .attr("transform", "translate(0," + height*.8 + ")")
  .attr("class","xAxis")
    .call(d3.axisBottom(x).tickFormat(formatPercent))

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y).ticks(8, formatPercent))
      .attr("transform", "translate(35,0)")
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
   .attr("x",5)
   .attr('y',height/2)
   .attr('text-anchor',"middle")
   .attr("transform", "translate(" + -275 + "," + height*.5 + ") rotate(270)")
   .text("Projected Growth Rate 2020-2030 (BLS) ")

   svg.selectAll(".circleTitle").style("opacity",1)

}

function highlightRapid() {

  svg.selectAll(".x-axisTitle").style("visibility","visible")
  svg.selectAll(".y-axisTitle").style("visibility","visible")
  svg.selectAll(".dots").style("visibility","visible")
  svg.selectAll(".circleTitle").style("visibility","visible")
  svg.selectAll(".xAxis").style("visibility","visible")
  svg.selectAll(".yAxis").style("visibility","visible")
  svg.select("#tableTitleSVG2").style("visibility","visible")
  svg.selectAll(".legend").style("visibility","visible")
  svg.selectAll(".rapidText").style("visibility","visible")
    svg.selectAll(".firstTitle").style("visibility","visible")
  svg.selectAll(".focusDots").style("visibility","hidden")
  svg.selectAll(".focusTitle").style("visibility","hidden")
  svg.selectAll(".focusFBShare").style("visibility","hidden")
  svg.selectAll(".focusTitle").style("visibility","hidden")
  svg.selectAll(".growthTitle").style("visibility","hidden")


  // svg.selectAll(".dots")
  // .transition()
  // .duration(500)
  // .style("opacity",1)


  // svg.selectAll(".circleTitle")
  //    .data(familyData)
  //    // .filter(function(d) {return +d.Round1== 1})
  //    .enter()
     //
     // svg.selectAll(".circleTitle")
     // .transition()
     // .duration(500)
     // // .attr("class","circleTitle")
     // .style("opacity",1)
     //
     // backwards=1



  svg.selectAll(".circleTitle")
  .transition()
  .duration(500)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Computer & Mathematical" || d.name2code == "Personal Care"|| d.name2code == "Food Preparation"|| d.name2code == "Healthcare Support" || d.name2code == "Transportation"|| d.name2code == "Construction" || d.name2code == "Building & Grounds" ) {return 1} else {return .15}})

  svg.selectAll(".dots")
  .transition()
  .duration(500)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Computer & Mathematical" || d.name2code == "Personal Care"|| d.name2code == "Food Preparation"|| d.name2code == "Healthcare Support" || d.name2code == "Transportation"|| d.name2code == "Construction" || d.name2code == "Building & Grounds" ) {return 1} else {return .15}})

  svg.append("text")
   .classed("rapidText", "True")
   // .classed("circleTitle", "True")
   .attr("x",118)
   .attr('y',145)
   .attr('text-anchor',"middle")
   .text("Rising Occupational Growth")

   svg.append("text")
    .classed("rapidText", "True")
    // .classed("circleTitle", "True")
    .attr("x",460)
    .attr('y',25)
    .attr('text-anchor',"middle")
    .text("Rapid Occupational Growth")

    svg.append("text")
     .classed("rapidText", "True")
     // .classed("circleTitle", "True")
     .attr("x",585)
     .attr('y',233)
     .attr('text-anchor',"middle")
     .text("Reliable Occupational Growth")

     backwards=1






}

// function occFocus() {
//
//   svg.selectAll(".x-axisTitle").style("visibility","hidden")
//   svg.selectAll(".y-axisTitle").style("visibility","hidden")
//   svg.selectAll(".dots").style("visibility","hidden")
//   svg.selectAll(".circleTitle").style("visibility","hidden")
//   svg.selectAll(".xAxis").style("visibility","hidden")
//   svg.selectAll(".yAxis").style("visibility","hidden")
//   svg.select("#tableTitleSVG2").style("visibility","hidden")
//   svg.selectAll(".legend").style("visibility","hidden")
//   svg.selectAll(".firstTitle").style("visibility","hidden")
//   svg.selectAll(".rapidText").style("visibility","hidden")
//
//   svg.selectAll(".focusDots").style("visibility","visible")
//   svg.selectAll(".focusTitle").style("visibility","visible")
//   svg.selectAll(".focusFBShare").style("visibility","visible")
//   svg.selectAll(".focusTitle").style("visibility","visible")
//   svg.selectAll(".growthTitle").style("visibility","visible")
//   // svg.select(".l").style("visibility","hidden")
//
//   svg.selectAll(".focusDots")
//   .data(familyData)
//   .enter()
//       .append("circle")
//      .filter(function(d) { return +d.Round1 == 1 ||  d.Round1== "1"})
//       .attr("class","focusDots")
//       .attr("stroke", "#9B9EA0")
//       .attr("stroke-width", ".5px")
//       .attr("r", function(d){return radiusFocus(d.employment_2020);})
//       .attr("cx", function(d) { return d.x_focus})
//       .attr("fill", function(d){return color(d.fbShare_2codeAll);})
//       .attr("cy", function(d) { return (d.y_focus-(radiusFocus(d.employment_2020))) })
//
//       svg.selectAll(".focusTitle")
//       .data(familyData)
//       .enter()
//          .append("text")
//          .filter(function(d) {return +d.Round1== 1})
//          .attr("class","focusTitle")
//          .attr("x",function(d) { return d.x_focus })
//          .attr('y',function(d) { return (d.y_focus+23)})
//          .attr('text-anchor',"middle")
//          .text(function(d) { return d.name2code })
//
//          svg.selectAll(".focusFBShare")
//          .data(familyData)
//          .enter()
//             .append("text")
//             .filter(function(d) {return +d.Round1== 1})
//             .attr("class","focusFBShare")
//             .attr("x",function(d) { return d.x_focus })
//             .attr('y',function(d) { return (d.y_focus+35)})
//             .attr('text-anchor',"middle")
//             .text(function(d) { return "Foreign Born Share: " +formatPercent(d.fbShare_2codeAll) })
//
//          svg.append("text")
//             .attr("class","growthTitle")
//             .attr("x",width/2)
//             .attr('y',10)
//             .attr('text-anchor',"middle")
//             .text("Rapid Growth")
//
//             svg.append("text")
//                .attr("class","growthTitle")
//                .attr("x",width/2)
//                .attr('y',220)
//                .attr('text-anchor',"middle")
//                .text("Rising Growth")
//
//                svg.append("text")
//                   .attr("class","growthTitle")
//                   .attr("x",width/2)
//                   .attr('y',410)
//                   .attr('text-anchor',"middle")
//                   .text("Reliable Growth")
//
//
//
// backwards=1
//
// }

// function occ2020() {
//   svg.selectAll(".innerDot_2020")
//       .data(familyData)
//     .enter().append("circle")
//      .filter(function(d) { return +d.Round1 == 1 ||  d.Round1== "1"})
//       .attr("class","innerDots_2020")
//       .attr("stroke", "#9B9EA0")
//       .attr("stroke-width", ".5px")
//       .attr("r", function(d){return radiusFocus(d.employment_2020);})
//       .attr("cx", function(d) { return d.x_focus})
//       // .attr("fill", function(d){return colorInner(d.fbShare_2codeAll);})
//       .attr("fill", "#ffffff")
//       .attr("cy", function(d) { return (d.y_focus-(radiusFocus(d.employment_2020)))})
//
// }


 // function scatter() {
 //
 //   // Scale the range of the data
 //   // x.domain([d3.min(data, .5, d3.max(data, function(d) { return d.shortGrowth; }))]);
 //
 //   // xfb.domain([0, d3.max(data, function(d) { return d.ratio_FB; })]);
 //
 //
 //   // radiusScale = d3.scaleSqrt()
 //   //   .domain([0, d3.max(data, function(d) { return d.jp2021_5cd; })])
 //   //   .range([3, 20])
 //
 //     var div = d3.select("body").append("div")
 //         .attr("class", "tooltip")
 //         .style("opacity", 0);
 //
 //   // Add the valueline path.
 //   // svg.append("path")
 //   //     .data([data])
 //   //     .attr("class", "line")
 //   //     .attr("d", valueline);
 //
 //   svg.selectAll(".dots").style("visibility", "hidden")
 //   svg.selectAll(".circleTitle").style("visibility", "hidden")
 //   svg.selectAll(".y-axisTitle").style("visibility", 'visible')
 //   svg.selectAll(".x-axisTitle").style("visibility", 'visible')
 //
 //
 //
 //   // Add the scatterplot
 //   svg.selectAll(".dotSmall")
 //      .data(familyData)
 //      .enter()
 //      .append("circle")
 //      .filter(function(d) {return +d.Round1 == 1})
 //      .attr("class","dotSmall")
 //      .attr("r", function(d){return radiusScale(d.jp2021_5cd);})
 //      .attr("cx", function(d) { return x(d.shortGrowth5); })
 //      .attr("fill", function(d){return color(d.foreignB5);})
 //      .attr("cy", function(d) { return y(d.longGrowth5); });
 //
 //    }




function sankeyFunc (upload) {

  var allPercent=formatPercent(upload.demo[0].value);
  var Number2019=formatMill(upload.demo[1].value);
  var Number2030 =formatMill(upload.demo[2].value);
  var NewJobNumber =formatMill(upload.demo[3].value);
  var ExistingNumber =formatMill(upload.demo[4].value);
  var bigTitle =upload.demo[5].value;

  var colorSankey=["#407cca","#407cca","#4b5367","#407cca","#4b5367","#ceced0","#21D177","#407cca"]
  var colorSankey_Nored=["#407cca","#407cca","#407cca","#4b5367","#ceced0","#21D177","#407cca"]
  var colorSankey_Nopurp=["#407cca","#4b5367","#407cca","#4b5367","#ceced0","#21D177","#407cca"]



  var sankey = d3.sankey()
      .nodeWidth(60)
      .nodePadding(20)
      .size([widthSank-100, heightSank-150])
      .nodeAlign(d3.sankeyRight);;

    var  graph = sankey(upload)


    var path = sankey.links();



// add in the links
var link = svgSank.append("g").selectAll(".linkSank")
    .data(graph.links)
  .enter().append("path")
    .attr("class", "linkSank")
    .attr("id",function(d){return d.source.name+"_"+d.target.name})
    // .attr("d", path)
    .attr("d",d3.sankeyLinkHorizontal())
    .attr("fill", "#9c9da1")
    // .attr("stroke", function(d){return "#9c9dal"})
    .attr("stroke", "#9c9da1")
    .attr("stroke-width", function(d) {return d.width})
    // .attr("stoke-opacity", 1)
    .style("opacity", .5)
    .attr("transform","translate(150,100)");

    svgSank.select("#JobCreation_NewWorkforce").attr("stroke","#21D177")
    svgSank.select("#Exit_NewWorkforce").attr("stroke","#21D177")
    svgSank.select("#Pandemic_NewWorkforce").attr("stroke","#21D177")
    svgSank.select("#WF2019_Pandemic").attr("stroke","#F7594C")
    svgSank.select("#WF2020_Exit").attr("stroke","#F7594C")

// add the link titles
link.append("title")
      .text(function(d) {
      return d.source.name + " → " +
              d.target.name + "\n" + format(d.value); })



              let node = svgSank
                  .append("g")
                  .classed("nodes", true)
                  .selectAll("rect")
                  .data(graph.nodes)
                  .enter()
                  .append("rect")
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
                  .attr("transform","translate(150,100)");

                  svgSank.append("text")
                   .attr("class","sankeyRecTitle")
                   .attr("id","Workforce2019")
                   .attr("x",100)
                   .attr('y',350)
                   .attr('text-anchor',"middle")
                   .style('fill', '#ffffff')
                   .attr("transform", "translate(" + -165 + "," + 515 + ") rotate(270)")
                   .text("2019 Workforce")

                   svgSank.append("text")
                    .attr("class","sankeyRecTitle")
                    .attr("id","Workforce2020")
                    .attr("x",100)
                    .attr('y',350)
                    .attr('text-anchor',"middle")
                    .style('fill', '#ffffff')
                    .attr("transform", "translate(" + 118 + "," + 515 + ") rotate(270)")
                    .text("2020 Workforce")

                    svgSank.append("text")
                     .attr("class","sankeyRecTitle")
                     .attr("id","SustainingWorkforce2030")
                     .attr("x",100)
                     .attr('y',350)
                     .style('fill', '#ffffff')
                     .attr('text-anchor',"middle")
                     .attr("transform", "translate(" + 680 + "," + 620 + ") rotate(270)")
                     .text("2030 Sustaining Workforce")

                     svgSank.append("text")
                      .attr("class","sankeyRecTitle")
                      .attr("id","NewWorkforce2030")
                      .attr("x",100)
                      .attr('y',350)
                      .style('fill', '#ffffff')
                      .attr('text-anchor',"middle")
                      .attr("transform", "translate(" + 680 + "," + 350 + ") rotate(270)")
                      .text("2030 New Workforce")

                      svgSank.append("text")
                       .attr("class","sankeyRecTitle")
                       .attr("id","WorkforceExit")
                       .attr("x",100)
                       .attr('y',350)
                       .attr('text-anchor',"middle")
                       .style('fill', '#ffffff')
                       .attr("transform", "translate(" + 392 + "," + 370 + ") rotate(270)")
                       .text("Exit & Entrance")

                       svgSank.append("text")
                        .attr("class","sankeyPathTitle")
                        .attr("id","PandemicLoss_Recovery")
                        .attr("x",700)
                        .attr('y',145)
                        .attr('text-anchor',"end")
                        .text("Pandemic Loss & Recovery")

                         svgSank.append("text")
                          .attr("class","sankeyPathTitle")
                          .attr("id","NewJobs")
                          .attr("x",700)
                          .attr('y',105)
                          .attr('text-anchor',"end")
                          .text("New Jobs")

                          svgSank.append("text")
                           .attr("class","JobNumbers")
                           .attr("id","JobNumbers")
                           .attr("x",70)
                           .attr('y',60)
                           .attr('text-anchor',"middle")
                           .text(Number2019)

                           svgSank.append("text")
                            .attr("class","JobText")
                            .attr("id","Workersin2019")
                            .attr("x",70)
                            .attr('y',75)
                            .attr('text-anchor',"middle")
                            .text("Workers in 2019")

                       svgSank.append("text")
                        .attr("class","percentNB_FB")
                        .attr("id","Percent_2019")
                        .attr("x",70)
                        .attr('y',370)
                        .attr('text-anchor',"middle")
                        .text(allPercent)

                        svgSank.append("text")
                         .attr("class","JobText")
                         .attr("id","ForeignBornWorkers")
                         .attr("x",70)
                         .attr('y',385)
                         .attr('text-anchor',"middle")
                         .text("Foreign Born Workers")


                           svgSank.append("text")
                            .attr("class","JobNumbers")
                            .attr("id","JobNumbers_2030")
                            .attr("x",1120)
                            .attr('y',60)
                            .attr('text-anchor',"middle")
                            .text(Number2030)

                            svgSank.append("text")
                             .attr("class","JobText")
                             .attr("id","Workersin2030")
                             .attr("x",1120)
                             .attr('y',75)
                             .attr('text-anchor',"middle")
                             .text("Workers in 2030")

                          svgSank.append("text")
                           .attr("class","JobNumbers")
                           .attr("id","NewJobNumbers")
                           .attr("x",1120)
                           .attr('y',250)
                           .attr('text-anchor',"middle")
                           .text(NewJobNumber)

                           svgSank.append("text")
                            .attr("class","JobText")
                            .attr("id","New&OpenJobs")
                            .attr("x",1120)
                            .attr('y',265)
                            .attr('text-anchor',"middle")
                            .text("New & Open Jobs")


                            svgSank.append("text")
                             .attr("class","JobNumbers")
                             .attr("id","ExistingJobNumbers")
                             .attr("x",1120)
                             .attr('y',550)
                             .attr('text-anchor',"middle")
                             .text(ExistingNumber)

                             svgSank.append("text")
                              .attr("class","JobText")
                              .attr("id","RemainingJobs")
                              .attr("x",1120)
                              .attr('y',565)
                              .attr('text-anchor',"middle")
                              .text("Remaining Jobs");

                    svgSank.append("text")
                     .attr("class","totalTitle")
                     .attr("id","totalTitleID")
                     .attr("x",650)
                     .attr('y',30)
                     .attr('text-anchor',"middle")
                     .text(bigTitle)


  function sankTransition() {

    svgSank.selectAll(".linkSank").remove()
    svgSank.selectAll(".nodes").remove()
    svgSank.select("#Workforce2019").remove()
    svgSank.select("#Workforce2020").remove()
    // svgSank.select("#WorkforceExit").remove()
    svgSank.select("#NewWorkforce2030").remove()
    svgSank.select("#SustainingWorkforce2030").remove()
    svgSank.select("#PandemicLoss_Recovery").remove()
    svgSank.select("#NewJobs").remove()
    svgSank.select("#WorkforceExit").remove()
    svgSank.select("#totalTitleID").remove()

    upload=data[2][selectFam]

    allPercent=formatPercent(upload.demo[0].value);
    Number2019=formatMill(upload.demo[1].value);
    Number2030 =formatMill(upload.demo[2].value);
    NewJobNumber =formatMill(upload.demo[3].value);
    ExistingNumber =formatMill(upload.demo[4].value);
    bigTitle =upload.demo[5].value;


    graph=sankey(upload)
    path = sankey.links();

    link = svgSank.append("g").selectAll(".linkSank")
        .data(graph.links)
      .enter().append("path")
        .attr("class", "linkSank")
        .attr("id",function(d){return d.source.name+"_"+d.target.name})
        // .attr("d", path)
        .attr("d",d3.sankeyLinkHorizontal())
        .attr("fill", "#9B9EA0")
        .attr("stroke",  "#9B9EA0")
        .attr("stroke-width", function(d) {return d.width})
        // .attr("stoke-opacity", 1)
        .style("opacity", .5)
        .attr("transform","translate(150,100)");

    // add the link titles
    link.append("title")
          .text(function(d) {
          return d.source.name + " → " +
                  d.target.name + "\n" + format(d.value); })

      svgSank.select("#Pandemic_NewWorkforce")
              .style("visibility",function(d) {if (selectFam=="office" || selectFam=="sales"|| selectFam=="production"){return "hidden"} else {return "visible"}})



          node = svgSank
                      .append("g")
                      .classed("nodes", true)
                      .selectAll("rect")
                      .data(graph.nodes)
                      .enter()
                      .append("rect")
                      .classed("node", true)
                      .attr("x", d => d.x0)
                      .attr("y", d => d.y0)
                      // .attr("y", function(d) {if (d.name=="Job Creation"){return d.y0-30} else {return d.y0} })
                      .attr("width", d => d.x1 - d.x0)
                      // .attr("width",function(d){if (d.node==5) {return d.x1-d.x1} else {return d.x1-d.x0}})
                      .attr("height", d => d.y1 - d.y0)
                      // .style("fill", d => colorSankey[d.node])
                      .style("fill", function(d){if (selectFam=="building" || selectFam=="farming"|| selectFam=="management" || selectFam=="office"|| selectFam=="personal"||selectFam=="sales"||selectFam=="production"){return colorSankey_Nopurp[d.node]} else if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return colorSankey_Nored[d.node]} else {return colorSankey[d.node]}})
                      .style("stroke", "#bfbfbf")
                      .style("stroke-width", .05)
                      .attr("opacity", 1)
                      .attr("transform","translate(150,100)");


          svgSank.select("#JobNumbers").transition().duration(500).text(Number2019);
          svgSank.select("#Percent_2019").transition().duration(500).text(allPercent);
          svgSank.select("#JobNumbers_2030").transition().duration(500).text(Number2030);
          svgSank.select("#NewJobNumbers").transition().duration(500).text(NewJobNumber);
          svgSank.select("#ExistingJobNumbers").transition().duration(500).text(ExistingNumber);

          svgSank.select("#JobCreation_NewWorkforce").attr("stroke","#21D177")
          svgSank.select("#Exit_NewWorkforce").attr("stroke","#21D177")
          svgSank.select("#Pandemic_NewWorkforce").attr("stroke","#21D177")
          svgSank.select("#WF2019_Pandemic").attr("stroke","#F7594C")
          svgSank.select("#WF2020_Exit").attr("stroke","#F7594C")

                 svgSank.append("text")
                  .attr("class","sankeyRecTitle")
                  .attr("id","Workforce2019")
                  .attr("x",100)
                  .attr('y',350)
                  .attr('text-anchor',"middle")
                  .style('fill', '#ffffff')
                  .attr("transform", "translate(" + -165 + "," + 515 + ") rotate(270)")
                  .text("2019 Workforce")

                  svgSank.append("text")
                   .attr("class","sankeyRecTitle")
                   .attr("id","Workforce2020")
                   .attr("x",100)
                   .attr('y',350)
                   .style('fill', '#ffffff')
                   .attr('text-anchor',"middle")
                   .attr("transform", "translate(" + 118 + "," + 515 + ") rotate(270)")
                   .text("2020 Workforce")

                   svgSank.append("text")
                    .attr("class","sankeyRecTitle")
                    .attr("id","SustainingWorkforce2030")
                    .attr("x",100)
                    .attr('y',350)
                    .attr('text-anchor',"middle")
                    .style('fill', '#ffffff')
                    .attr("transform", "translate(" + 680 + "," + 620 + ") rotate(270)")
                    .text("2030 Sustaining Workforce")

                    svgSank.append("text")
                     .attr("class","sankeyRecTitle")
                     .attr("id","NewWorkforce2030")
                     .attr("x",100)
                     .attr('y',350)
                     .style('fill', '#ffffff')
                     .attr('text-anchor',"middle")
                     .attr("transform", "translate(" + 680 + "," + 350 + ") rotate(270)")
                     .text("2030 New Workforce")

                     svgSank.append("text")
                      .attr("class","sankeyRecTitle")
                      .attr("id","WorkforceExit")
                      .attr("x",100)
                      .attr('y',function(d){if (selectFam=="construction" || selectFam=="farming"|| selectFam=="healthcarePrac" || selectFam=="installation"){return 340} else if (selectFam=="science"|| selectFam=="management"|| selectFam=="production") {return 330} else if (selectFam=="business") {return 320} else if (selectFam=="foodprep" || selectFam=="healthcareSupp" ) {return 395} else {return 350}})
                      .attr('text-anchor',"middle")
                      .style('fill', '#ffffff')
                      .attr("transform", function(d) {if (selectFam=="healthcareSupp" || selectFam=="foodprep") {return "translate(" + 350 + "," + 450 + ") rotate(270)"} else if (selectFam=="production" || selectFam=="management"|| selectFam=="science"|| selectFam=="healthcarePrac"|| selectFam=="business"|| selectFam=="construction"|| selectFam=="farming"|| selectFam=="installation") {return "translate(" + 405 + "," + 340 + ") rotate(270)"} else {return "translate(" + 390 + "," + 380 + ") rotate(270)"}})
                      .text("Exit & Entrance")


                      svgSank.append("text")
                       .attr("class","sankeyPathTitle")
                       .attr("id","PandemicLoss_Recovery")
                       .attr("x",700)
                       .attr("y",function(d){if (selectFam=="arts" || selectFam=="foodprep"|| selectFam=="healthcarePrac" || selectFam=="legal"){return 165} else if (selectFam=="building"|| selectFam=="construction") {return 130} else if (selectFam=="healthcareSupp") {return 200} else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="personal"|| selectFam=="production"|| selectFam=="sales") {return 120} else {return 145}})
                       .attr('text-anchor',"end")
                       .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
                       .text("Pandemic Loss & Recovery")

                        svgSank.append("text")
                         .attr("class","sankeyPathTitle")
                         .attr("id","NewJobs")
                         .attr("x",700)
                         .attr("y",function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return 125} else if (selectFam=="healthcarePrac" || selectFam=="healthcareSupp" || selectFam=="legal") {return 115} else {return 105}})
                         .attr('text-anchor',"end")
                         .style("visibility", function(d){if (selectFam=="building" || selectFam=="farming"|| selectFam=="management" || selectFam=="office" || selectFam=="personal" || selectFam=="production" || selectFam=="sales"){return "hidden"} else {return "visible"}})
                         .text("New Jobs")




                         svgSank.append("text")
                          .attr("class","totalTitle")
                          .attr("id","totalTitleID")
                          .attr("x",650)
                          .attr('y',30)
                          .attr('text-anchor',"middle")
                          .text(bigTitle)














  }

  document.getElementById("occ-families").addEventListener("change", function() {
    selectFam=this.value
    sankTransition(selectFam)
  });


};

sankeyFunc(sankeyData)






///STOP


 function threeCode () {

   svg.select("#percent")
      .style("visibility", "hidden")

      svg.select("#fb")
         .style("visibility", "hidden")

     svg.selectAll(".dots")
        // .data(data)
        // .enter()
        .transition()
        .duration(500)
        .style("visibility", "visible")
        .attr("r", function(d){ return radiusScale(d.jp2021_3cd);})
        .attr("cx", function(d) { return x(d.shortGrowth3); })
        .attr("fill", function(d){return color(d.foreignB3);})
        .attr("cy", function(d) { return y(d.longGrowth3); })

     svg.selectAll(".dots")
        .on('mouseover', function(event,d) {
        div
          .transition()
          .duration(200)
          .style('opacity', 0.9);
        div
          .html(d.titleFam + '<br/>' + formatPercent(d.foreignB3)+ ' Foreign Born')
          .style("left", (event.pageX - 50) + "px")
          .style("top", (event.pageY - 68) + "px");
      })
      .on('mouseout', () => {
        div
          .transition()
          .duration(500)
          .style('opacity', 0);
      });
 }

 function fiveCode () {

   svg.select("#percent")
      .style("visibility", "visibible")
      .text("18.0%")

      svg.select("#fb")
         .style("visibility", "visibible")



     svg.selectAll(".dots")
        // .data(data)
        // .enter()
        .transition()
        .duration(500)
        .style("visibility", "visible")
        .attr("r", function(d){ return radiusScale(d.jp2021_5cd);})
        .attr("cx", function(d) { return x(d.shortGrowth5); })
        .attr("fill", function(d){return color(d.foreignB5);})
        .attr("cy", function(d) { return y(d.longGrowth5); });

        svg.selectAll(".dots")
           .on('mouseover', function(event,d) {
           div
             .transition()
             .duration(200)
             .style('opacity', 0.9);
           div
             .html(d.titleOcc + '<br/>' + formatPercent(d.foreignB5)+ ' Foreign Born')
             .style("left", (event.pageX - 50) + "px")
             .style("top", (event.pageY - 68) + "px");
         })
         .on('mouseout', () => {
           div
             .transition()
             .duration(500)
             .style('opacity', 0);
         });
 }


 function tenPercent () {

   svg.select("#percent")
      .style("visibility", "visibible")
      .text("18.9%")

      svg.select("#fb")
         .style("visibility", "visibible")

     svg.selectAll(".dots")
        .transition()
        .duration(500)
        .attr("r", function(d){ return radiusScale(d.jp2021_5cd);})
        .attr("cx", function(d) { return x(d.shortGrowth5); })
        .attr("fill", function(d){return color(d.foreignB5);})
        .attr("cy", function(d) { return y(d.longGrowth5); })
        .style("visibility", function(d) {if (d.longGrowth5 <=.095){return "hidden"} else {return "visible"}})

        svg.selectAll(".dots")
           .on('mouseover', function(event,d) {
           div
             .transition()
             .duration(200)
             .style('opacity', 0.9);
           div
             .html(d.titleOcc + '<br/>' + formatPercent(d.foreignB5)+ ' Foreign Born')
             .style("left", (event.pageX - 50) + "px")
             .style("top", (event.pageY - 68) + "px");
         })
         .on('mouseout', () => {
           div
             .transition()
             .duration(500)
             .style('opacity', 0);
         });


 }

 function tenPercent3Code () {

   svg.select("#percent")
      .style("visibility", "hidden")

      svg.select("#fb")
         .style("visibility", "hidden")

     svg.selectAll(".dots")
        .transition()
        .duration(500)
        .attr("r", function(d){ return radiusScale(d.jp2021_3cd);})
        .attr("cx", function(d) { return x(d.shortGrowth3); })
        .attr("fill", function(d){return color(d.foreignB3);})
        .attr("cy", function(d) { return y(d.longGrowth3); })
        .style("visibility", function(d) {if (d.longGrowth3 <=.095){return "hidden"} else {return "visible"}})

        svg.selectAll(".dots")
           .on('mouseover', function(event,d) {
           div
             .transition()
             .duration(200)
             .style('opacity', 0.9);
           div
             .html(d.titleFam + '<br/>' + formatPercent(d.foreignB3)+ ' Foreign Born')
             .style("left", (event.pageX - 50) + "px")
             .style("top", (event.pageY - 68) + "px");
         })
         .on('mouseout', () => {
           div
             .transition()
             .duration(500)
             .style('opacity', 0);
         });

 }

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


 if (step2._groups[0][1].className === 'step2 is-active'){
plotGrowth()


  }

  if (step2._groups[0][2].className === 'step2 is-active'){



  }

 if (step2._groups[0][3].className === 'step2 is-active'  ) {

    twoCodeScatter()

  }
  if (step2._groups[0][4].className === 'step2 is-active'  ) {

    highlightRapid()

   }

   if (step2._groups[0][5].className === 'step2 is-active'  ) {
     //
     // occFocus()

    }
   if (step2._groups[0][7].className === 'step2 is-active' ) {

     // cluster()

   }






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
