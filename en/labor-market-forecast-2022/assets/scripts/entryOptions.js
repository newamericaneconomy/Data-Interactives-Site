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




var units = "Widgets";

// set the dimensions and margins of the graph
var marginSank = {top: 10, right:100, bottom: 10, left: 100},
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
var sankData = d3.json("assets/scripts/sankey.json");

Promise.all([familyData, timeData, sankData]).then(startChange);



function startChange(data) {

familyData = data[0]
timeData = data[1]
var sankeyData = data[2].national



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
            .x(function(d) { return xState(d.date); })
            .y(function(d) {return yState(d.rate); });

        // Scale the range of the data
            xState.domain(d3.extent(timeData, function(d) { return d.date; }));
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
       // Add interactivity

      // Use D3 to select element, change color and size
      d3.select(this).style("opacity",1);
      toolTip(d, state)
      d3.select("#UnitedStates").style("opacity",1)


      // Specify w
    }

    function toolTip(d, state) {


                div.transition()
                    .duration(400)
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
     .duration(400)
     .style("opacity", 0);


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
               .text("Online Job Postings in 2021")
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
                                 // .html("<b>"+i.Title + "</b>"+'<br/>' + formatPercent(i.fbShare_2codeAll)+ ' Foreign Born' +'<br/>'+ formatComma(i.allJobPosts2021)+
                                 //      ' Postings'+'<br/>'+formatPercent(i.growth_all2Code)+" Increase from 2019-21"+'<br/>'+formatPercent(i.project2Code)+" Projected Change from 2020 to 2030"+'<br/>'+i.examples)
                                .html("<span 'class'='titleHover'>"+i.Title +"</span>"+"<table><tr  class='greyRow rankSpace'><td>Foreign-Born Share: "+ formatPercent(i.fbShare_2codeAll)+"</td></tr><tr class='rankSpace'><td>2021 Postings: "+ formatComma(i.allJobPosts2021)+"</td></tr><tr class='greyRow rankSpace'><td>Increase from 2019-21: "+ formatPercent(i.growth_all2Code)+"</td></tr><tr class='rankSpace'><td>Occupation Examples: "+ i.examples+"</td></tr></table>")
                                 .style("left", (d.pageX-30) + "px")
                                 .style("top", (d.pageY + 30) + "px")
                                 .style("visibility", "visible");





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
             .attr("x",width/2)
             .attr('y',340)
             .attr('text-anchor',"middle")
             .text("Growth Rate 2019 & 2021 by Rank")

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
         .duration(400)
         .text("Online Job Posting Growth from 2019-2021")




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
           .text("2019-21 Growth vs 2030 Projected Growth")

           svg.selectAll(".circleTitle")
             .transition()
             .duration(600)
             // .attr("class","circleTitle")
             .attr("x", function(d) {if (d.name2code == "Computer & Mathematical" || d.name2code =="Healthcare Practitioners") {return x(d.growth_all2Code)+80} else {return x(d.growth_all2Code)} })
             .attr("y", function(d) { if (d.name2code == "Education") {return 1000} else if (d.name2code == "Computer & Mathematical") {return y(d.project2Code)-.9*(radiusScale(d.allJobPosts2021))} else if (d.name2code == "Maintenance & Repair" || d.name2code == "Management" || d.name2code=="Office Support") {return y(d.project2Code)+1.35*(radiusScale(d.allJobPosts2021))} else if (d.name2code == "Healthcare Practitioners") {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021)-10)} else {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))}})
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
      .duration(600)
      // .attr("class","circleTitle")
      .attr("x", function(d) {if (d.name2code == "Computer & Mathematical") {return x(d.growth_all2Code)*2} else {return x(d.growth_all2Code)} })
      .attr("y", function(d) { if (d.name2code == "Education") {return 1000} else if (d.name2code == "Maintenance & Repair" || d.name2code == "Management") {return y(d.project2Code)+1.35*(radiusScale(d.allJobPosts2021))}  else if (d.name2code == "Healthcare Practitioners") {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021)-10)} else {return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))}})
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
            .duration(400)
            .attr("x",width/2)
            .attr('y',0)
            .text("2019-21 Growth vs 2030 Projected Growth")


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

  svg.selectAll(".rapidText").style("visibility","hidden")

  svg.selectAll(".growthTitleX").style("visibility", "hidden")

  svg.selectAll(".xAxis").style("visibility", 'visible')
  svg.selectAll(".yAxis").style("visibility", 'visible')



     svg.selectAll(".circleTitle")
       .style("visibility", "visible")


  svg.selectAll(".dots")
     .transition()
     .duration(600)
      .attr("cx", function(d) { return xDiag(d.rankNext)-5;})
      .attr("cy", function(d) { return yDiag(d.rankProject); })
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
           .text("2019-21 Growth vs 2030 Projected Growth")

           svg.selectAll(".circleTitle")
             .transition()
             .duration(600)
             // .attr("class","circleTitle")
             .attr("x",function(d) { return xDiag(d.rankNext)-5;} )
             .attr("y",  function(d) { if (d.name2code == "Social Services") {return yDiag(d.rankProject)+1.5*radiusScale(d.allJobPosts2021);} else {return yDiag(d.rankProject)-1.2*radiusScale(d.allJobPosts2021);}})
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



         svg.select("#tableTitleSVG2")
            .transition()
            .duration(400)
            .attr("x",width/2)
            .attr('y',0)
            .text("2019-21 Growth vs 2030 Projected Growth")


   }



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






  svg.selectAll(".circleTitle")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Computer & Mathematical" || d.name2code == "Personal Care"|| d.name2code == "Food Preparation"|| d.name2code == "Healthcare Support" || d.name2code == "Transportation"|| d.name2code == "Construction" || d.name2code == "Building & Grounds" ) {return 1} else {return .15}})

  svg.selectAll(".dots")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Computer & Mathematical" || d.name2code == "Personal Care"|| d.name2code == "Food Preparation"|| d.name2code == "Healthcare Support" || d.name2code == "Transportation"|| d.name2code == "Construction" || d.name2code == "Building & Grounds" ) {return 1} else {return .15}})

  svg.append("text")
   .classed("rapidText", "True")
   .attr("id","risingGrowth")
   // .classed("circleTitle", "True")
   .attr("x",118)
   .attr('y',145)
   .attr('text-anchor',"middle")
   .style("fill","#407cca")
   .style("opacity", 1)
   .text("Rising Growth")

   svg.append("text")
    .classed("rapidText", "True")
    .attr("id","rapidGrowth")
    // .classed("circleTitle", "True")
    .attr("x",460)
    .attr('y',25)
    .attr('text-anchor',"middle")
    .style("fill","#407cca")
    .style("opacity", 1)
    .text("Rapid Growth")

    svg.append("text")
     .classed("rapidText", "True")
     .attr("id","reliableGrowth")
     // .classed("circleTitle", "True")
     .attr("x",585)
     .attr('y',233)
     .attr('text-anchor',"middle")
     .style("fill","#407cca")
     .style("opacity", 1)
     .text("Reliable Growth")

     backwards=1



}





function rapidGrowth() {
  svg.selectAll(".circleTitle")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Personal Care"|| d.name2code == "Food Preparation"|| d.name2code == "Healthcare Support" ) {return 1} else {return .15}})

  svg.selectAll(".dots")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Personal Care"|| d.name2code == "Food Preparation"|| d.name2code == "Healthcare Support" ) {return 1} else {return .15}})

  d3.select("#rapidGrowth")
  .attr("id","rapidGrowth")
     .transition()
     .duration(600)
     .style("opacity", 1)

     d3.select("#risingGrowth")
     .attr("id","risingGrowth")
        .transition()
        .duration(600)
        .style("opacity", .1)

        d3.select("#reliableGrowth")
        .attr("id","reliableGrowth")
           .transition()
           .duration(600)
           .style("opacity", .1)

}

function risingGrowth() {
  svg.selectAll(".circleTitle")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Computer & Mathematical") {return 1} else {return .15}})

  svg.selectAll(".dots")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Computer & Mathematical") {return 1} else {return .15}})

  d3.select("#rapidGrowth")
  .attr("id","rapidGrowth")
     .transition()
     .duration(600)
     .style("opacity", .1)

     d3.select("#risingGrowth")
     .attr("id","risingGrowth")
        .transition()
        .duration(600)
        .style("opacity", 1)

        d3.select("#reliableGrowth")
        .attr("id","reliableGrowth")
           .transition()
           .duration(600)
           .style("opacity", .1)

}

function reliableGrowth() {
  svg.selectAll(".circleTitle")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Transportation"|| d.name2code == "Construction" || d.name2code == "Building & Grounds" ) {return 1} else {return .15}})

  svg.selectAll(".dots")
  .transition()
  .duration(600)
  // .attr("class","circleTitle")
  .style("opacity",function(d) {if (d.name2code == "Transportation"|| d.name2code == "Construction" || d.name2code == "Building & Grounds" ) {return 1} else {return .15}})

d3.select("#rapidGrowth")
.attr("id","rapidGrowth")
     .transition()
     .duration(600)
     .style("opacity", .1)

     d3.select("#risingGrowth")
     .attr("id","risingGrowth")
        .transition()
        .duration(600)
        .style("opacity", .1)

        d3.select("#reliableGrowth")
        .attr("id","reliableGrowth")
           .transition()
           .duration(600)
           .style("opacity", 1)

}






// function sankeyFunc (upload) {
//
//   var allPercent=formatPercent(upload.demo[0].value);
//   var Number2019=formatMill(upload.demo[1].value);
//   var Number2030 =formatMill(upload.demo[2].value);
//   var NewJobNumber =formatMill(upload.demo[3].value);
//   var ExistingNumber =formatMill(upload.demo[4].value);
//   var bigTitle =upload.demo[5].value;
//   var Number2020=formatComma(upload.demo[6].value);
//   var pandemicL = formatComma(upload.demo[7].value);
//   var pandemicR = formatComma(upload.demo[8].value);
//   var newJobEst = formatComma(upload.demo[9].value);
//   var exitNumber = formatComma(upload.demo[10].value);
//   var paragraphONE = upload.demo[11].value;
//   var paragraphTWO = upload.demo[12].value;
//
//
//
//
//   var colorSankey=["#407cca","#2fa0a8","#4b5367","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]
//   var colorSankey_Nored=["#407cca","#2fa0a8","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]
//   var colorSankey_Nopurp=["#407cca","#4b5367","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]
//
//
//   var sankey = d3.sankey()
//       .nodeWidth(60)
//       .nodePadding(20)
//       .size([widthSank-100, heightSank-150])
//       .nodeAlign(d3.sankeyRight);;
//
//     var  graph = sankey(upload)
//
//
//     var path = sankey.links();
//
//
//
// // add in the links
// var link = svgSank.append("g").selectAll(".linkSank")
//     .data(graph.links)
//   .enter().append("path")
//     .attr("class", "linkSank")
//     .attr("id",function(d){return d.source.name+"_"+d.target.name})
//     // .attr("d", path)
//     .attr("d",d3.sankeyLinkHorizontal())
//     .attr("i",upload)
//     .attr("fill", "#9c9da1")
//     // .attr("stroke", function(d){return "#9c9dal"})
//     .attr("stroke", "#9c9da1")
//     .attr("stroke-width", function(d) {return d.width})
//     // .attr("stoke-opacity", 1)
//     .style("opacity", .5)
//     .attr("transform","translate(150,100)");
//
//     svgSank.select("#JobCreation_NewWorkforce").attr("stroke","#2fa0a8")//soft blue: #bbd0ec
//     svgSank.select("#Exit_NewWorkforce").attr("stroke","#2fa0a8")
//     svgSank.select("#Pandemic_NewWorkforce").attr("stroke","#2fa0a8")
//     svgSank.select("#WF2019_Pandemic").attr("stroke","#ca4940") //previous color: #F7594C
//     svgSank.select("#WF2020_Exit").attr("stroke","#ca4940")
//
// // add the link titles
// link.append("title")
//       .text(function(d) {
//         if (d.source.name=="WF2019" && d.target.name=="WF2020") {return "Workers in 2020: " +Number2020}
//         else if (d.source.name=="WF2019" && d.target.name=="Pandemic") {return "Panddemic Loss: " +pandemicL}
//         else if (d.source.name=="WF2020" && d.target.name=="Current") {return "Exiting workforce: " + ExistingNumber}
//         else if (d.source.name=="WF2020" && d.target.name=="Exit") {return "Sustaining workforce: " + exitNumber}
//         else if (d.source.name=="Current" && d.target.name=="ExistingWorkforce") {return "Sustaining workforce: " + ExistingNumber}
//         else if (d.source.name=="Pandemic" && d.target.name=="NewWorkforce") {return "Panddemic Recovery: " +pandemicR}
//         else if (d.source.name=="JobCreation" && d.target.name=="NewWorkforce") {return "Job Increase: " +newJobEst}
//         else if (d.source.name=="Exit" && d.target.name=="NewWorkforce") {return "Workers Entering: " + NewJobNumber}
//         else {return "nan"}
//
//       })
//
//
//               let node = svgSank
//                   .append("g")
//                   .classed("nodes", true)
//                   .selectAll("rect")
//                   .data(graph.nodes)
//                   .enter()
//                   .append("rect")
//                   .classed("node", true)
//                   .attr("x", d => d.x0)
//                   .attr("y", d => d.y0)
//                   // .attr("y", function(d) {if (d.name=="Job Creation"){return d.y0-30} else {return d.y0} })
//                   .attr("width", d => d.x1 - d.x0)
//                   // .attr("width",function(d){if (d.node==5) {return d.x1-d.x1} else {return d.x1-d.x0}})
//                   .attr("height", d => d.y1 - d.y0)
//                   .style("fill", d => colorSankey[d.node])
//                   .style("stroke", "#bfbfbf")
//                   .style("stroke-width", .05)
//                   .attr("opacity", 1)
//                   .attr("transform","translate(150,100)");
//
//                   svgSank.append("text")
//                    .attr("class","sankeyRecTitle")
//                    .attr("id","Workforce2019")
//                    .attr("x",100)
//                    .attr('y',350)
//                    .attr('text-anchor',"middle")
//                    .style('fill', '#ffffff')
//                    .attr("transform", "translate(" + -165 + "," + 545 + ") rotate(270)")
//                    .text("2019 Workforce")
//
//                    svgSank.append("text")
//                     .attr("class","sankeyRecTitle")
//                     .attr("id","Workforce2020")
//                     .attr("x",100)
//                     .attr('y',350)
//                     .attr('text-anchor',"middle")
//                     .style('fill', '#ffffff')
//                     .attr("transform", "translate(" + 118 + "," + 545 + ") rotate(270)")
//                     .text("2020 Workforce")
//
//                     svgSank.append("text")
//                      .attr("class","sankeyRecTitle")
//                      .attr("id","SustainingWorkforce2030")
//                      .attr("x",100)
//                      .attr('y',350)
//                      .style('fill', '#ffffff')
//                      .attr('text-anchor',"middle")
//                      .attr("transform", "translate(" + 680 + "," + 680 + ") rotate(270)")
//                      .text("2030 Sustaining Workforce")
//
//                      svgSank.append("text")
//                       .attr("class","sankeyRecTitle")
//                       .attr("id","NewWorkforce2030")
//                       .attr("x",100)
//                       .attr('y',350)
//                       .style('fill', '#ffffff')
//                       .attr('text-anchor',"middle")
//                       .attr("transform", "translate(" + 680 + "," + 370 + ") rotate(270)")
//                       .text("2030 New Workforce")
//
//                       // svgSank.append("text")
//                       //  .attr("class","sankeyRecTitle")
//                       //  .attr("id","WorkforceExit")
//                       //  .attr("x",100)
//                       //  .attr('y',350)
//                       //  .attr('text-anchor',"middle")
//                       //  .style('fill', '#ffffff')
//                       //  .attr("transform", "translate(" + 392 + "," + 390 + ") rotate(270)")
//                       //  .text("Exit & Entrance")
//
//                        svgSank.append("text")
//                         .attr("class","sankeyPathTitle")
//                         .attr("id","PandemicLoss")
//                         .attr("x",700)
//                         .attr('y',147)
//                         .attr('text-anchor',"end")
//                         .text("Pandemic Loss")
//
//                         svgSank.append("text")
//                          .attr("class","sankeyPathTitle")
//                          .attr("id","PandemicRecovery")
//                          .attr("x",780)
//                          .attr('y',147)
//                          .attr('text-anchor',"start")
//                          .text("Recovery")
//
//
//                         svgSank.append("text")
//                          .attr("class","sankeyPathTitle")
//                          .attr("id","WF_Exit")
//                          .attr("x",700)
//                          .attr('y',300)
//                          .attr('text-anchor',"end")
//                          .text("Exit")
//
//                          svgSank.append("text")
//                           .attr("class","sankeyPathTitle")
//                           .attr("id","WF_Entrance")
//                           .attr("x",780)
//                           .attr('y',300)
//                           .attr('text-anchor',"Start")
//                           .text("Entrance")
//
//                          svgSank.append("text")
//                           .attr("class","sankeyPathTitle")
//                           .attr("id","NewJobs")
//                           .attr("x",700)
//                           .attr('y',105)
//                           .attr('text-anchor',"end")
//                           .text("Job Increase")
//
//                           svgSank.append("text")
//                            .attr("class","JobNumbers")
//                            .attr("id","JobNumbers")
//                            .style("fill","#407CCA")
//                            .attr("x",80)
//                            .attr('y',50)
//                            .attr('text-anchor',"middle")
//                            .text(Number2019)
//
//                            svgSank.append("text")
//                             .attr("class","JobText")
//                             .attr("id","Workersin2019")
//                             .attr("x",80)
//                             .attr('y',65)
//                             .attr('text-anchor',"middle")
//                             .style("fill","#407CCA")
//                             .text("Workers in 2019")
//
//                        svgSank.append("text")
//                         .attr("class","percentNB_FB")
//                         .attr("id","Percent_2019")
//                         .attr("x",80)
//                         .attr('y',110)
//                         .attr('text-anchor',"middle")
//                         .style("fill","#407CCA")
//                         .text(allPercent)
//
//                         svgSank.append("text")
//                          .attr("class","JobText")
//                          .attr("id","ForeignBornWorkers")
//                          .attr("x",80)
//                          .attr('y',125)
//                          .attr('text-anchor',"middle")
//                          .style("fill","#407CCA")
//                          .text("Foreign Born Workers")
//
//
//                            svgSank.append("text")
//                             .attr("class","JobNumbers")
//                             .attr("id","JobNumbers_2030")
//                             .attr("x",1120)
//                             .attr('y',50)
//                             .attr('text-anchor',"middle")
//                             .text(Number2030)
//
//                             svgSank.append("text")
//                              .attr("class","JobText")
//                              .attr("id","Workersin2030")
//                              .attr("x",1120)
//                              .attr('y',65)
//                              .attr('text-anchor',"middle")
//                              .text("Workers in 2030")
//
//                           svgSank.append("text")
//                            .attr("class","JobNumbers")
//                            .attr("id","NewJobNumbers")
//                            .attr("x",1120)
//                            .attr('y',250)
//                            .attr('text-anchor',"middle")
//                            .style("fill","#2fa0a8")
//                            .text(NewJobNumber)
//
//                            svgSank.append("text")
//                             .attr("class","JobText")
//                             .attr("id","New&OpenJobs")
//                             .attr("x",1120)
//                             .attr('y',265)
//                             .attr('text-anchor',"middle")
//                             .style("fill","#2fa0a8")
//                             .text("New & Open Jobs")
//
//
//                             svgSank.append("text")
//                              .attr("class","JobNumbers")
//                              .attr("id","ExistingJobNumbers")
//                              .attr("x",1120)
//                              .attr('y',550)
//                              .attr('text-anchor',"middle")
//                              .style("fill","#407CCA")
//                              .text(ExistingNumber)
//
//                              svgSank.append("text")
//                               .attr("class","JobText")
//                               .attr("id","RemainingJobs")
//                               .attr("x",1120)
//                               .attr('y',565)
//                               .attr('text-anchor',"middle")
//                               .style("fill","#407CCA")
//                               .text("Remaining Jobs");
//
//                               document.getElementById("paraNum1").innerHTML = paragraphONE
//                               document.getElementById("paraNum2").innerHTML = paragraphTWO
//
//                     // svgSank.append("text")
//                     //  .attr("class","totalTitle")
//                     //  .attr("id","totalTitleID")
//                     //  .attr("x",600)
//                     //  .attr('y',30)
//                     //  .attr('text-anchor',"middle")
//                     //  .text(bigTitle)
//
//
//   function sankTransition() {
//
//     svgSank.selectAll(".linkSank").remove();
//     svgSank.selectAll(".nodes").remove();
//     svgSank.select("#Workforce2019").remove();
//     svgSank.select("#Workforce2020").remove();
//     // svgSank.select("#WorkforceExit").remove()
//     svgSank.select("#NewWorkforce2030").remove();
//     svgSank.select("#SustainingWorkforce2030").remove();
//     svgSank.select("#PandemicLoss").remove();
//     svgSank.select("#PandemicRecovery").remove();
//     svgSank.select("#NewJobs").remove();
//     svgSank.select("#WF_Exit").remove();
//     svgSank.select("#WF_Entrance").remove();
//     svgSank.select("#ExistingJobNumbers").remove();
//     svgSank.select("#RemainingJobs").remove();
//
//     upload=data[2][selectFam]
//
//     allPercent=formatPercent(upload.demo[0].value);
//     Number2019=formatMill(upload.demo[1].value);
//     Number2030 =formatMill(upload.demo[2].value);
//     NewJobNumber =formatMill(upload.demo[3].value);
//     ExistingNumber =formatMill(upload.demo[4].value);
//     bigTitle =upload.demo[5].value;
//     var Number2020=formatComma(upload.demo[6].value);
//     var pandemicL = formatComma(upload.demo[7].value);
//     var pandemicR = formatComma(upload.demo[8].value);
//     var newJobEst = formatComma(upload.demo[9].value);
//     var exitNumber = formatComma(upload.demo[10].value);
//     paragraphONE = upload.demo[11].value;
//     paragraphTWO = upload.demo[12].value;
//
//
//
//
//     graph=sankey(upload)
//     path = sankey.links();
//
//     link = svgSank.append("g").selectAll(".linkSank")
//         .data(graph.links)
//       .enter().append("path")
//         .attr("class", "linkSank")
//         .attr("id",function(d){return d.source.name+"_"+d.target.name})
//         // .attr("d", path)
//         .attr("d",d3.sankeyLinkHorizontal())
//         .attr("fill", "#9B9EA0")
//         .attr("stroke",  "#9B9EA0")
//         .attr("stroke-width", function(d) {return d.width})
//         // .attr("stoke-opacity", 1)
//         .style("opacity", .5)
//         .attr("transform","translate(150,100)");
//
//     // add the link titles
//     link.append("title")
//           .text(function(d) {
//             if (d.source.name=="WF2019" && d.target.name=="WF2020") {return "Workers in 2020: " +Number2020}
//             else if (d.source.name=="WF2019" && d.target.name=="Pandemic") {return "Panddemic Loss: " +pandemicL}
//             else if (d.source.name=="WF2020" && d.target.name=="Current") {return "Sustaining workforce: " + ExistingNumber}
//             else if (d.source.name=="WF2020" && d.target.name=="Exit") {return "Exiting workforce: " + exitNumber}
//             else if (d.source.name=="Current" && d.target.name=="ExistingWorkforce") {return "Sustaining workforce: " + ExistingNumber}
//             else if (d.source.name=="Pandemic" && d.target.name=="NewWorkforce") {return "Panddemic Recovery: " +pandemicR}
//             else if (d.source.name=="JobCreation" && d.target.name=="NewWorkforce") {return "Job Increase: " +newJobEst}
//             else if (d.source.name=="Exit" && d.target.name=="NewWorkforce") {return "Workers Entering: " + NewJobNumber}
//             else {return "nan"}
//
//           })
//
//       svgSank.select("#Pandemic_NewWorkforce")
//               .style("visibility",function(d) {if (selectFam=="office" || selectFam=="sales"|| selectFam=="production"){return "hidden"} else {return "visible"}})
//
//
//
//           node = svgSank
//                       .append("g")
//                       .classed("nodes", true)
//                       .selectAll("rect")
//                       .data(graph.nodes)
//                       .enter()
//                       .append("rect")
//                       .classed("node", true)
//                       .attr("x", d => d.x0)
//                       .attr("y", d => d.y0)
//                       // .attr("y", function(d) {if (d.name=="Job Creation"){return d.y0-30} else {return d.y0} })
//                       .attr("width", d => d.x1 - d.x0)
//                       // .attr("width",function(d){if (d.node==5) {return d.x1-d.x1} else {return d.x1-d.x0}})
//                       .attr("height", d => d.y1 - d.y0)
//                       // .style("fill", d => colorSankey[d.node])
//                       .style("fill", function(d){if (selectFam=="building" || selectFam=="farming"|| selectFam=="management" || selectFam=="office"|| selectFam=="personal"||selectFam=="sales"||selectFam=="production"){return colorSankey_Nopurp[d.node]} else if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return colorSankey_Nored[d.node]} else {return colorSankey[d.node]}})
//                       .style("stroke", "#bfbfbf")
//                       .style("stroke-width", .05)
//                       .attr("opacity", 1)
//                       .attr("transform","translate(150,100)");
//
//
//           svgSank.select("#JobNumbers").transition().duration(500).text(Number2019);
//           svgSank.select("#Percent_2019").transition().duration(500).text(allPercent);
//           svgSank.select("#JobNumbers_2030").transition().duration(500).text(Number2030);
//           svgSank.select("#NewJobNumbers").transition().duration(500).text(NewJobNumber);
//           svgSank.select("#ExistingJobNumbers").transition().duration(500).text(ExistingNumber);
//
//           svgSank.select("#JobCreation_NewWorkforce").attr("stroke","#2fa0a8")
//           svgSank.select("#Exit_NewWorkforce").attr("stroke","#2fa0a8")
//           svgSank.select("#Pandemic_NewWorkforce").attr("stroke","#2fa0a8")
//           svgSank.select("#WF2019_Pandemic").attr("stroke","#ca4940")
//           svgSank.select("#WF2020_Exit").attr("stroke","#ca4940")
//
//                  svgSank.append("text")
//                   .attr("class","sankeyRecTitle")
//                   .attr("id","Workforce2019")
//                   .attr("x",100)
//                   .attr('y',350)
//                   .attr('text-anchor',"middle")
//                   .style('fill', '#ffffff')
//                   .attr("transform", "translate(" + -165 + "," + 545 + ") rotate(270)")
//                   .text("2019 Workforce")
//
//                   svgSank.append("text")
//                    .attr("class","sankeyRecTitle")
//                    .attr("id","Workforce2020")
//                    .attr("x",100)
//                    .attr('y',350)
//                    .style('fill', '#ffffff')
//                    .attr('text-anchor',"middle")
//                    .attr("transform", "translate(" + 118 + "," + 545 + ") rotate(270)")
//                    .text("2020 Workforce")
//
//                    svgSank.append("text")
//                     .attr("class","sankeyRecTitle")
//                     .attr("id","SustainingWorkforce2030")
//                     .attr("x",100)
//                     .attr('y',350)
//                     .attr('text-anchor',"middle")
//                     .style('fill', '#ffffff')
//                     .attr("transform",function(d){ if (selectFam=='protective' || selectFam=='sales'||selectFam=="transportation"){return "translate(" + 680 + "," + 695 + ") rotate(270)"} else {return "translate(" + 680 + "," + 680 + ") rotate(270)"}})
//                     .text(function(d) {if (selectFam=='foodprep' || selectFam=='healthcareSupp'||selectFam=="personal"||selectFam=="building") {return "" }
//                                                        else {return "2030 Sustaining Workforce"}})
//
//                     svgSank.append("text")
//                      .attr("class","sankeyRecTitle")
//                      .attr("id","NewWorkforce2030")
//                      .attr("x",100)
//                      .attr('y',350)
//                      .style('fill', '#ffffff')
//                      .attr('text-anchor',"middle")
//                      .attr("transform", function(d) {if (selectFam=='building'||selectFam=="office"||selectFam=='sales') {return "translate(" + 680 + "," + 390 + ") rotate(270)"}
//                                                       else if (selectFam=='science' || selectFam=='management'||selectFam=="healthcarePrac" || selectFam=='computer'||selectFam=='business') {return "translate(" + 680 + "," + 315 + ") rotate(270)"}
//                                                       else if (selectFam=="installation"|| selectFam=='legal'||selectFam=='construction') {return "translate(" + 680 + "," + 333 + ") rotate(270)"}
//                                                         else if (selectFam=='foodprep'||selectFam=="healthcareSupp"||selectFam=="personal") {return "translate(" + 680 + "," + 455 + ") rotate(270)"}
//                                                         else if (selectFam=='production'||selectFam=='protective'||selectFam=='transportation') {return "translate(" + 680 + "," + 361 + ") rotate(270)"}
//                                                       else {return "translate(" + 680 + "," + 350 + ") rotate(270)"}})
//                      .text(function(d) {if (selectFam=='science' || selectFam=='management' ||selectFam=="healthcarePrac"||selectFam=='computer'||selectFam=='business'||selectFam=='construction') {return "New Workforce" }
//                                                         else {return "2030 New Workforce"}})
//
//                      // {return "translate(" + 680 + "," + 350 + ") rotate(270)"}
//
//                      // svgSank.append("text")
//                      //  .attr("class","sankeyRecTitle")
//                      //  .attr("id","WorkforceExit")
//                      //  .attr("x",100)
//                      //  .attr('y',function(d){if (selectFam=="construction" || selectFam=="farming"|| selectFam=="healthcarePrac" || selectFam=="installation"){return 340} else if (selectFam=="science"|| selectFam=="management"|| selectFam=="production") {return 330} else if (selectFam=="business") {return 320} else if (selectFam=="foodprep" || selectFam=="healthcareSupp" ) {return 395} else {return 390}})
//                      //  .attr('text-anchor',"middle")
//                      //  .style('fill', '#ffffff')
//                      //  .attr("transform", function(d) {if (selectFam=="healthcareSupp" || selectFam=="foodprep") {return "translate(" + 350 + "," + 450 + ") rotate(270)"} else if (selectFam=="production" || selectFam=="management"|| selectFam=="science"|| selectFam=="healthcarePrac"|| selectFam=="business"|| selectFam=="construction"|| selectFam=="farming"|| selectFam=="installation") {return "translate(" + 405 + "," + 340 + ") rotate(270)"} else {return "translate(" + 390 + "," + 380 + ") rotate(270)"}})
//                      //  .text("Exit & Entrance")
//
//                      svgSank.append("text")
//                       .attr("class","JobNumbers")
//                       .attr("id","ExistingJobNumbers")
//                       .attr("x",1120)
//                       .attr('y',function(d){if(selectFam=='foodprep'){return 680} else if (selectFam=='personal' ||selectFam=="healthcareSupp"){return 640} else {return 550}})
//                       .attr('text-anchor',"middle")
//                       .style("fill","#407CCA")
//                       .text(ExistingNumber)
//
//                       svgSank.append("text")
//                        .attr("class","JobText")
//                        .attr("id","RemainingJobs")
//                        .attr("x",1120)
//                        // .attr('y',function(d){if(){} else{return 565}})
//                        .attr('y',function(d){if(selectFam=='foodprep'){return 695} else if (selectFam=='personal' ||selectFam=="healthcareSupp"){return 655} else {return 565}})
//                        .attr('text-anchor',"middle")
//                        .style("fill","#407CCA")
//                        .text("Remaining Jobs");
//
//
//                       svgSank.append("text")
//                        .attr("class","sankeyPathTitle")
//                        .attr("id","PandemicLoss")
//                        .attr("x",700)
//                        .attr("y",function(d){if (selectFam=="arts" || selectFam=="foodprep"|| selectFam=="healthcarePrac" || selectFam=="legal" || selectFam=="education"){return 165} else if (selectFam=="building") {return 130} else if (selectFam=="transportation" || selectFam=="personal") {return 160} else if (selectFam=="healthcareSupp") {return 223} else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales") {return 120} else {return 147}})
//                        .attr('text-anchor',"end")
//                        .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
//                        .text("Pandemic Loss")
//
//
//                        svgSank.append("text")
//                         .attr("class","sankeyPathTitle")
//                         .attr("id","PandemicRecovery")
//                         .attr("x",780)
//                         .attr("y",function(d){if (selectFam=="arts" || selectFam=="foodprep"|| selectFam=="healthcarePrac" || selectFam=="legal" || selectFam=="education"){return 165} else if (selectFam=="building") {return 130} else if (selectFam=="transportation" || selectFam=="personal") {return 160} else if (selectFam=="healthcareSupp") {return 223} else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales") {return 120} else {return 147}})
//                         .attr('text-anchor',"start")
//                         .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"|| selectFam=="office" || selectFam=="production" || selectFam=="sales"){return "hidden"} else {return "visible"}})
//                         .text("Recovery")
//
//
//                        svgSank.append("text")
//                         .attr("class","sankeyPathTitle")
//                         .attr("id","WF_Exit")
//                         .attr("x",700)
//                         .attr("y",function(d){if (selectFam=="arts"){return 315} else if (selectFam=="building"|| selectFam=="construction"|| selectFam=="legal" || selectFam=="installation" || selectFam=="computer") {return 275} else if (selectFam=="healthcareSupp" || selectFam=="personal" || selectFam=="foodprep") {return 375}  else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales" || selectFam=="healthcarePrac" ) {return 270}
//                          else if ( selectFam=="business" || selectFam=="science") {return 250} else {return 300}})
//                         .attr('text-anchor',"end")
//                         // .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
//                         .text("Exit")
//
//
//                         svgSank.append("text")
//                          .attr("class","sankeyPathTitle")
//                          .attr("id","WF_Entrance")
//                          .attr("x",780)
//                          .attr("y",function(d){if (selectFam=="arts"){return 315} else if (selectFam=="building"|| selectFam=="construction"|| selectFam=="legal" || selectFam=="installation" || selectFam=="computer") {return 275} else if (selectFam=="healthcareSupp" || selectFam=="personal" || selectFam=="foodprep") {return 375}  else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales" || selectFam=="healthcarePrac" ) {return 270}
//                           else if ( selectFam=="business" || selectFam=="science") {return 250} else {return 300}})
//                          .attr('text-anchor',"start")
//                          // .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
//                          .text("Entrance")
//
//                         // selectFam=="foodprep" at 415
//
//
//
//                         svgSank.append("text")
//                          .attr("class","sankeyPathTitle")
//                          .attr("id","NewJobs")
//                          .attr("x",700)
//                          .attr("y",function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return 125} else if (selectFam=="healthcarePrac" || selectFam=="healthcareSupp" || selectFam=="legal") {return 115} else {return 105}})
//                          .attr('text-anchor',"end")
//                          .style("visibility", function(d){if (selectFam=="building" || selectFam=="farming"|| selectFam=="management" || selectFam=="office" || selectFam=="personal" || selectFam=="production" || selectFam=="sales"){return "hidden"} else {return "visible"}})
//                          .text("Job Increase")
//
//
//                          document.getElementById("paraNum1").innerHTML = paragraphONE
//                          document.getElementById("paraNum2").innerHTML = paragraphTWO
//
//                          // svgSank.append("text")
//                          //  .attr("class","totalTitle")
//                          //  .attr("id","totalTitleID")
//                          //  .attr("x",650)
//                          //  .attr('y',30)
//                          //  .attr('text-anchor',"middle")
//                          //  .text(bigTitle)
//
//
//
//   }
//
//   document.getElementById("occ-families").addEventListener("change", function() {
//     selectFam=this.value
//     sankTransition(selectFam)
//     document.getElementById("selectTitle").textContent=bigTitle;
//   });
//
//
// };

function sankeyTwo (upload) {

  var allPercent=formatPercent(upload.demo[0].value);
  var Number2019=formatMill(upload.demo[1].value);
  var Number2030 =formatMill(upload.demo[2].value);
  var NewJobNumber =formatMill(upload.demo[3].value);
  var ExistingNumber =formatMill(upload.demo[4].value);
  var bigTitle =upload.demo[5].value;
  var Number2020=formatComma(upload.demo[6].value);
  var pandemicL = formatComma(upload.demo[7].value);
  var pandemicR = formatComma(upload.demo[8].value);
  var newJobEst = formatComma(upload.demo[9].value);
  var exitNumber = formatComma(upload.demo[10].value);
  var paragraphONE = upload.demo[11].value;
  var paragraphTWO = upload.demo[12].value;



  var colorSankey=["#407cca","#FD825F","#edaa96","#b4c8e6","#FD825F","#FD825F","#407cca","#407cca"]
  // var colorSankey=["#407cca","#2fa0a8","#4b5367","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]
  var colorSankey_Nored=["#407cca","#2fa0a8","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]
  var colorSankey_Nopurp=["#407cca","#4b5367","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]


  var sankey = d3.sankey()
      .nodeWidth(60)
      .nodePadding(40)
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
    .attr("i",upload)
    .attr("fill", "#9c9da1")
    // .attr("stroke", function(d){return "#9c9dal"})
    .attr("stroke", "#9c9da1")
    .attr("stroke-width", function(d) {return d.width})
    // .attr("stoke-opacity", 1)
    .style("opacity", .7)
    .attr("transform","translate(150,100)");

    svgSank.select("#WF2019_Pandemic").attr("stroke","#f48060")//soft blue: #bbd0ec
    svgSank.select("#Pandemic_Exit").attr("stroke","#f48060")
    svgSank.select("#WF2019_WF2020").attr("stroke","#8cb0df")
    svgSank.select("#WF2020_NewWorkforce").attr("stroke","#8cb0df") //previous color: #F7594C
    svgSank.select("#JobCreation_Exit").attr("stroke","#f48060")

// add the link titles
link.append("title")
      .text(function(d) {
        if (d.source.name=="WF2019" && d.target.name=="WF2020") {return "Workers in 2020: " +Number2020}
        else if (d.source.name=="WF2019" && d.target.name=="Pandemic") {return "Panddemic Loss: " +pandemicL}
        else if (d.source.name=="WF2020" && d.target.name=="Current") {return "Exiting workforce: " + ExistingNumber}
        else if (d.source.name=="WF2020" && d.target.name=="Exit") {return "Sustaining workforce: " + exitNumber}
        else if (d.source.name=="Current" && d.target.name=="ExistingWorkforce") {return "Sustaining workforce: " + ExistingNumber}
        else if (d.source.name=="Pandemic" && d.target.name=="NewWorkforce") {return "Panddemic Recovery: " +pandemicR}
        else if (d.source.name=="JobCreation" && d.target.name=="NewWorkforce") {return "Job Increase: " +newJobEst}
        else if (d.source.name=="Exit" && d.target.name=="NewWorkforce") {return "Workers Entering: " + NewJobNumber}
        else {return "nan"}

      })


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

                  // svgSank.append("text")
                  //  .attr("class","sankeyRecTitle")
                  //  .attr("id","Workforce2019")
                  //  .attr("x",100)
                  //  .attr('y',350)
                  //  .attr('text-anchor',"middle")
                  //  .style('fill', '#ffffff')
                  //  .attr("transform", "translate(" + -165 + "," + 545 + ") rotate(270)")
                  //  .text("2019 Workforce")
                  //
                  //  svgSank.append("text")
                  //   .attr("class","sankeyRecTitle")
                  //   .attr("id","Workforce2020")
                  //   .attr("x",100)
                  //   .attr('y',350)
                  //   .attr('text-anchor',"middle")
                  //   .style('fill', '#ffffff')
                  //   .attr("transform", "translate(" + 118 + "," + 545 + ") rotate(270)")
                  //   .text("2020 Workforce")
                  //
                  //   svgSank.append("text")
                  //    .attr("class","sankeyRecTitle")
                  //    .attr("id","SustainingWorkforce2030")
                  //    .attr("x",100)
                  //    .attr('y',350)
                  //    .style('fill', '#ffffff')
                  //    .attr('text-anchor',"middle")
                  //    .attr("transform", "translate(" + 680 + "," + 680 + ") rotate(270)")
                  //    .text("2030 Sustaining Workforce")
                  //
                  //    svgSank.append("text")
                  //     .attr("class","sankeyRecTitle")
                  //     .attr("id","NewWorkforce2030")
                  //     .attr("x",100)
                  //     .attr('y',350)
                  //     .style('fill', '#ffffff')
                  //     .attr('text-anchor',"middle")
                  //     .attr("transform", "translate(" + 680 + "," + 370 + ") rotate(270)")
                  //     .text("2030 New Workforce")
                  //
                  //     // svgSank.append("text")
                  //     //  .attr("class","sankeyRecTitle")
                  //     //  .attr("id","WorkforceExit")
                  //     //  .attr("x",100)
                  //     //  .attr('y',350)
                  //     //  .attr('text-anchor',"middle")
                  //     //  .style('fill', '#ffffff')
                  //     //  .attr("transform", "translate(" + 392 + "," + 390 + ") rotate(270)")
                  //     //  .text("Exit & Entrance")
                  //
                  //      svgSank.append("text")
                  //       .attr("class","sankeyPathTitle")
                  //       .attr("id","PandemicLoss")
                  //       .attr("x",700)
                  //       .attr('y',147)
                  //       .attr('text-anchor',"end")
                  //       .text("Pandemic Loss")
                  //
                  //       svgSank.append("text")
                  //        .attr("class","sankeyPathTitle")
                  //        .attr("id","PandemicRecovery")
                  //        .attr("x",780)
                  //        .attr('y',147)
                  //        .attr('text-anchor',"start")
                  //        .text("Recovery")
                  //
                  //
                  //       svgSank.append("text")
                  //        .attr("class","sankeyPathTitle")
                  //        .attr("id","WF_Exit")
                  //        .attr("x",700)
                  //        .attr('y',300)
                  //        .attr('text-anchor',"end")
                  //        .text("Exit")
                  //
                  //        svgSank.append("text")
                  //         .attr("class","sankeyPathTitle")
                  //         .attr("id","WF_Entrance")
                  //         .attr("x",780)
                  //         .attr('y',300)
                  //         .attr('text-anchor',"Start")
                  //         .text("Entrance")
                  //
                  //        svgSank.append("text")
                  //         .attr("class","sankeyPathTitle")
                  //         .attr("id","NewJobs")
                  //         .attr("x",700)
                  //         .attr('y',105)
                  //         .attr('text-anchor',"end")
                  //         .text("Job Increase")
                  //
                  //         svgSank.append("text")
                  //          .attr("class","JobNumbers")
                  //          .attr("id","JobNumbers")
                  //          .style("fill","#407CCA")
                  //          .attr("x",80)
                  //          .attr('y',50)
                  //          .attr('text-anchor',"middle")
                  //          .text(Number2019)
                  //
                  //          svgSank.append("text")
                  //           .attr("class","JobText")
                  //           .attr("id","Workersin2019")
                  //           .attr("x",80)
                  //           .attr('y',65)
                  //           .attr('text-anchor',"middle")
                  //           .style("fill","#407CCA")
                  //           .text("Workers in 2019")
                  //
                  //      svgSank.append("text")
                  //       .attr("class","percentNB_FB")
                  //       .attr("id","Percent_2019")
                  //       .attr("x",80)
                  //       .attr('y',110)
                  //       .attr('text-anchor',"middle")
                  //       .style("fill","#407CCA")
                  //       .text(allPercent)
                  //
                  //       svgSank.append("text")
                  //        .attr("class","JobText")
                  //        .attr("id","ForeignBornWorkers")
                  //        .attr("x",80)
                  //        .attr('y',125)
                  //        .attr('text-anchor',"middle")
                  //        .style("fill","#407CCA")
                  //        .text("Foreign Born Workers")
                  //
                  //
                  //          svgSank.append("text")
                  //           .attr("class","JobNumbers")
                  //           .attr("id","JobNumbers_2030")
                  //           .attr("x",1120)
                  //           .attr('y',50)
                  //           .attr('text-anchor',"middle")
                  //           .text(Number2030)
                  //
                  //           svgSank.append("text")
                  //            .attr("class","JobText")
                  //            .attr("id","Workersin2030")
                  //            .attr("x",1120)
                  //            .attr('y',65)
                  //            .attr('text-anchor',"middle")
                  //            .text("Workers in 2030")
                  //
                  //         svgSank.append("text")
                  //          .attr("class","JobNumbers")
                  //          .attr("id","NewJobNumbers")
                  //          .attr("x",1120)
                  //          .attr('y',250)
                  //          .attr('text-anchor',"middle")
                  //          .style("fill","#2fa0a8")
                  //          .text(NewJobNumber)
                  //
                  //          svgSank.append("text")
                  //           .attr("class","JobText")
                  //           .attr("id","New&OpenJobs")
                  //           .attr("x",1120)
                  //           .attr('y',265)
                  //           .attr('text-anchor',"middle")
                  //           .style("fill","#2fa0a8")
                  //           .text("New & Open Jobs")
                  //
                  //
                  //           svgSank.append("text")
                  //            .attr("class","JobNumbers")
                  //            .attr("id","ExistingJobNumbers")
                  //            .attr("x",1120)
                  //            .attr('y',550)
                  //            .attr('text-anchor',"middle")
                  //            .style("fill","#407CCA")
                  //            .text(ExistingNumber)
                  //
                  //            svgSank.append("text")
                  //             .attr("class","JobText")
                  //             .attr("id","RemainingJobs")
                  //             .attr("x",1120)
                  //             .attr('y',565)
                  //             .attr('text-anchor',"middle")
                  //             .style("fill","#407CCA")
                  //             .text("Remaining Jobs");

                              document.getElementById("paraNum1").innerHTML = paragraphONE
                              document.getElementById("paraNum2").innerHTML = paragraphTWO

                    // svgSank.append("text")
                    //  .attr("class","totalTitle")
                    //  .attr("id","totalTitleID")
                    //  .attr("x",600)
                    //  .attr('y',30)
                    //  .attr('text-anchor',"middle")
                    //  .text(bigTitle)


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
    Number2019=formatMill(upload.demo[1].value);
    Number2030 =formatMill(upload.demo[2].value);
    NewJobNumber =formatMill(upload.demo[3].value);
    ExistingNumber =formatMill(upload.demo[4].value);
    bigTitle =upload.demo[5].value;
    var Number2020=formatComma(upload.demo[6].value);
    var pandemicL = formatComma(upload.demo[7].value);
    var pandemicR = formatComma(upload.demo[8].value);
    var newJobEst = formatComma(upload.demo[9].value);
    var exitNumber = formatComma(upload.demo[10].value);
    paragraphONE = upload.demo[11].value;
    paragraphTWO = upload.demo[12].value;




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
            if (d.source.name=="WF2019" && d.target.name=="WF2020") {return "Workers in 2020: " +Number2020}
            else if (d.source.name=="WF2019" && d.target.name=="Pandemic") {return "Panddemic Loss: " +pandemicL}
            else if (d.source.name=="WF2020" && d.target.name=="Current") {return "Sustaining workforce: " + ExistingNumber}
            else if (d.source.name=="WF2020" && d.target.name=="Exit") {return "Exiting workforce: " + exitNumber}
            else if (d.source.name=="Current" && d.target.name=="ExistingWorkforce") {return "Sustaining workforce: " + ExistingNumber}
            else if (d.source.name=="Pandemic" && d.target.name=="NewWorkforce") {return "Panddemic Recovery: " +pandemicR}
            else if (d.source.name=="JobCreation" && d.target.name=="NewWorkforce") {return "Job Increase: " +newJobEst}
            else if (d.source.name=="Exit" && d.target.name=="NewWorkforce") {return "Workers Entering: " + NewJobNumber}
            else {return "nan"}

          })

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

          svgSank.select("#JobCreation_NewWorkforce").attr("stroke","#2fa0a8")
          svgSank.select("#Exit_NewWorkforce").attr("stroke","#2fa0a8")
          svgSank.select("#Pandemic_NewWorkforce").attr("stroke","#2fa0a8")
          svgSank.select("#WF2019_Pandemic").attr("stroke","#ca4940")
          svgSank.select("#WF2020_Exit").attr("stroke","#ca4940")

                 svgSank.append("text")
                  .attr("class","sankeyRecTitle")
                  .attr("id","Workforce2019")
                  .attr("x",100)
                  .attr('y',350)
                  .attr('text-anchor',"middle")
                  .style('fill', '#ffffff')
                  .attr("transform", "translate(" + -165 + "," + 545 + ") rotate(270)")
                  .text("2019 Workforce")

                  svgSank.append("text")
                   .attr("class","sankeyRecTitle")
                   .attr("id","Workforce2020")
                   .attr("x",100)
                   .attr('y',350)
                   .style('fill', '#ffffff')
                   .attr('text-anchor',"middle")
                   .attr("transform", "translate(" + 118 + "," + 545 + ") rotate(270)")
                   .text("2020 Workforce")

                   svgSank.append("text")
                    .attr("class","sankeyRecTitle")
                    .attr("id","SustainingWorkforce2030")
                    .attr("x",100)
                    .attr('y',350)
                    .attr('text-anchor',"middle")
                    .style('fill', '#ffffff')
                    .attr("transform",function(d){ if (selectFam=='protective' || selectFam=='sales'||selectFam=="transportation"){return "translate(" + 680 + "," + 695 + ") rotate(270)"} else {return "translate(" + 680 + "," + 680 + ") rotate(270)"}})
                    .text(function(d) {if (selectFam=='foodprep' || selectFam=='healthcareSupp'||selectFam=="personal"||selectFam=="building") {return "" }
                                                       else {return "2030 Sustaining Workforce"}})

                    svgSank.append("text")
                     .attr("class","sankeyRecTitle")
                     .attr("id","NewWorkforce2030")
                     .attr("x",100)
                     .attr('y',350)
                     .style('fill', '#ffffff')
                     .attr('text-anchor',"middle")
                     .attr("transform", function(d) {if (selectFam=='building'||selectFam=="office"||selectFam=='sales') {return "translate(" + 680 + "," + 390 + ") rotate(270)"}
                                                      else if (selectFam=='science' || selectFam=='management'||selectFam=="healthcarePrac" || selectFam=='computer'||selectFam=='business') {return "translate(" + 680 + "," + 315 + ") rotate(270)"}
                                                      else if (selectFam=="installation"|| selectFam=='legal'||selectFam=='construction') {return "translate(" + 680 + "," + 333 + ") rotate(270)"}
                                                        else if (selectFam=='foodprep'||selectFam=="healthcareSupp"||selectFam=="personal") {return "translate(" + 680 + "," + 455 + ") rotate(270)"}
                                                        else if (selectFam=='production'||selectFam=='protective'||selectFam=='transportation') {return "translate(" + 680 + "," + 361 + ") rotate(270)"}
                                                      else {return "translate(" + 680 + "," + 350 + ") rotate(270)"}})
                     .text(function(d) {if (selectFam=='science' || selectFam=='management' ||selectFam=="healthcarePrac"||selectFam=='computer'||selectFam=='business'||selectFam=='construction') {return "New Workforce" }
                                                        else {return "2030 New Workforce"}})

                     // {return "translate(" + 680 + "," + 350 + ") rotate(270)"}

                     // svgSank.append("text")
                     //  .attr("class","sankeyRecTitle")
                     //  .attr("id","WorkforceExit")
                     //  .attr("x",100)
                     //  .attr('y',function(d){if (selectFam=="construction" || selectFam=="farming"|| selectFam=="healthcarePrac" || selectFam=="installation"){return 340} else if (selectFam=="science"|| selectFam=="management"|| selectFam=="production") {return 330} else if (selectFam=="business") {return 320} else if (selectFam=="foodprep" || selectFam=="healthcareSupp" ) {return 395} else {return 390}})
                     //  .attr('text-anchor',"middle")
                     //  .style('fill', '#ffffff')
                     //  .attr("transform", function(d) {if (selectFam=="healthcareSupp" || selectFam=="foodprep") {return "translate(" + 350 + "," + 450 + ") rotate(270)"} else if (selectFam=="production" || selectFam=="management"|| selectFam=="science"|| selectFam=="healthcarePrac"|| selectFam=="business"|| selectFam=="construction"|| selectFam=="farming"|| selectFam=="installation") {return "translate(" + 405 + "," + 340 + ") rotate(270)"} else {return "translate(" + 390 + "," + 380 + ") rotate(270)"}})
                     //  .text("Exit & Entrance")

                     svgSank.append("text")
                      .attr("class","JobNumbers")
                      .attr("id","ExistingJobNumbers")
                      .attr("x",1120)
                      .attr('y',function(d){if(selectFam=='foodprep'){return 680} else if (selectFam=='personal' ||selectFam=="healthcareSupp"){return 640} else {return 550}})
                      .attr('text-anchor',"middle")
                      .style("fill","#407CCA")
                      .text(ExistingNumber)

                      svgSank.append("text")
                       .attr("class","JobText")
                       .attr("id","RemainingJobs")
                       .attr("x",1120)
                       // .attr('y',function(d){if(){} else{return 565}})
                       .attr('y',function(d){if(selectFam=='foodprep'){return 695} else if (selectFam=='personal' ||selectFam=="healthcareSupp"){return 655} else {return 565}})
                       .attr('text-anchor',"middle")
                       .style("fill","#407CCA")
                       .text("Remaining Jobs");


                      svgSank.append("text")
                       .attr("class","sankeyPathTitle")
                       .attr("id","PandemicLoss")
                       .attr("x",700)
                       .attr("y",function(d){if (selectFam=="arts" || selectFam=="foodprep"|| selectFam=="healthcarePrac" || selectFam=="legal" || selectFam=="education"){return 165} else if (selectFam=="building") {return 130} else if (selectFam=="transportation" || selectFam=="personal") {return 160} else if (selectFam=="healthcareSupp") {return 223} else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales") {return 120} else {return 147}})
                       .attr('text-anchor',"end")
                       .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
                       .text("Pandemic Loss")


                       svgSank.append("text")
                        .attr("class","sankeyPathTitle")
                        .attr("id","PandemicRecovery")
                        .attr("x",780)
                        .attr("y",function(d){if (selectFam=="arts" || selectFam=="foodprep"|| selectFam=="healthcarePrac" || selectFam=="legal" || selectFam=="education"){return 165} else if (selectFam=="building") {return 130} else if (selectFam=="transportation" || selectFam=="personal") {return 160} else if (selectFam=="healthcareSupp") {return 223} else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales") {return 120} else {return 147}})
                        .attr('text-anchor',"start")
                        .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"|| selectFam=="office" || selectFam=="production" || selectFam=="sales"){return "hidden"} else {return "visible"}})
                        .text("Recovery")


                       svgSank.append("text")
                        .attr("class","sankeyPathTitle")
                        .attr("id","WF_Exit")
                        .attr("x",700)
                        .attr("y",function(d){if (selectFam=="arts"){return 315} else if (selectFam=="building"|| selectFam=="construction"|| selectFam=="legal" || selectFam=="installation" || selectFam=="computer") {return 275} else if (selectFam=="healthcareSupp" || selectFam=="personal" || selectFam=="foodprep") {return 375}  else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales" || selectFam=="healthcarePrac" ) {return 270}
                         else if ( selectFam=="business" || selectFam=="science") {return 250} else {return 300}})
                        .attr('text-anchor',"end")
                        // .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
                        .text("Exit")


                        svgSank.append("text")
                         .attr("class","sankeyPathTitle")
                         .attr("id","WF_Entrance")
                         .attr("x",780)
                         .attr("y",function(d){if (selectFam=="arts"){return 315} else if (selectFam=="building"|| selectFam=="construction"|| selectFam=="legal" || selectFam=="installation" || selectFam=="computer") {return 275} else if (selectFam=="healthcareSupp" || selectFam=="personal" || selectFam=="foodprep") {return 375}  else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales" || selectFam=="healthcarePrac" ) {return 270}
                          else if ( selectFam=="business" || selectFam=="science") {return 250} else {return 300}})
                         .attr('text-anchor',"start")
                         // .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
                         .text("Entrance")

                        // selectFam=="foodprep" at 415



                        svgSank.append("text")
                         .attr("class","sankeyPathTitle")
                         .attr("id","NewJobs")
                         .attr("x",700)
                         .attr("y",function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return 125} else if (selectFam=="healthcarePrac" || selectFam=="healthcareSupp" || selectFam=="legal") {return 115} else {return 105}})
                         .attr('text-anchor',"end")
                         .style("visibility", function(d){if (selectFam=="building" || selectFam=="farming"|| selectFam=="management" || selectFam=="office" || selectFam=="personal" || selectFam=="production" || selectFam=="sales"){return "hidden"} else {return "visible"}})
                         .text("Job Increase")


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

function sankeyThree (upload) {

  var allPercent=formatPercent(upload.demo[0].value);
  var Number2019=formatMill(upload.demo[1].value);
  var Number2030 =formatMill(upload.demo[2].value);
  var NewJobNumber =formatMill(upload.demo[3].value);
  var ExistingNumber =formatMill(upload.demo[4].value);
  var bigTitle =upload.demo[5].value;
  var Number2020=formatComma(upload.demo[6].value);
  var pandemicL = formatComma(upload.demo[7].value);
  var pandemicR = formatComma(upload.demo[8].value);
  var newJobEst = formatComma(upload.demo[9].value);
  var exitNumber = formatComma(upload.demo[10].value);
  var paragraphONE = upload.demo[11].value;
  var paragraphTWO = upload.demo[12].value;




  var colorSankey=["#407cca","#abc837","#3AD0D6","#407cca","#f48060","#407cca","#f48060","#407cca"]
  var colorSankey_Nored=["#407cca","#2fa0a8","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]
  var colorSankey_Nopurp=["#407cca","#4b5367","#407cca","#4b5367","#ceced0","#2fa0a8","#407cca"]


  var sankey = d3.sankey()
      .nodeWidth(100)
      .nodePadding(50)
      .size([widthSank, heightSank-150])
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
    .attr("i",upload)
    .attr("fill", "#FFFFFF")
    // .attr("stroke", function(d){return "#9c9dal"})
    .attr("stroke", "#407cca")
    .attr("stroke-width", function(d) {return d.width})
    // .attr("stoke-opacity", 1)
    .style("opacity", .5)
    // .attr("transform","translate(50,0)");

    svgSank.select("#JobCreation_NewWorkforce").attr("stroke","#abc837")//soft blue: #bbd0ec
    svgSank.select("#Exit_NewWorkforce").attr("stroke","#f48060")
    svgSank.select("#Pandemic_NewWorkforce").attr("stroke","#3AD0D6")
    svgSank.select("#WF2019_Pandemic").attr("stroke","#3AD0D6") //previous color: #F7594C
    svgSank.select("#WF2020_Exit").attr("stroke","#f48060")

// add the link titles
// link.append("title")
//       .text(function(d) {
//         if (d.source.name=="WF2019" && d.target.name=="WF2020") {return "Workers in 2020: " +Number2020}
//         else if (d.source.name=="WF2019" && d.target.name=="Pandemic") {return "Panddemic Loss: " +pandemicL}
//         else if (d.source.name=="WF2020" && d.target.name=="Current") {return "Exiting workforce: " + ExistingNumber}
//         else if (d.source.name=="WF2020" && d.target.name=="Exit") {return "Sustaining workforce: " + exitNumber}
//         else if (d.source.name=="Current" && d.target.name=="ExistingWorkforce") {return "Sustaining workforce: " + ExistingNumber}
//         else if (d.source.name=="Pandemic" && d.target.name=="NewWorkforce") {return "Panddemic Recovery: " +pandemicR}
//         else if (d.source.name=="JobCreation" && d.target.name=="NewWorkforce") {return "Job Increase: " +newJobEst}
//         else if (d.source.name=="Exit" && d.target.name=="NewWorkforce") {return "Workers Entering: " + NewJobNumber}
//         else {return "nan"}
//
//       })


              let node = svgSank
                  .append("g")
                  .classed("nodes", true)
                  .selectAll("rect")
                  .data(graph.nodes)
                  .enter()
                  .append("rect")
                  .classed("node", true)
                  .attr("id",function(d){console.log(d.name); return d.name})
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
                  // .attr("transform","translate(50,0)");


                  svgSank.select("#Pandemic").style("opacity",".5")
                  svgSank.select("#Exit").style("opacity",".5")
                  svgSank.select("#Current").style("opacity",".5")
                  // svgSank.append("text")
                  //  .attr("class","sankeyRecTitle")
                  //  .attr("id","Workforce2019")
                  //  .attr("x",100)
                  //  .attr('y',350)
                  //  .attr('text-anchor',"middle")
                  //  .style('fill', '#ffffff')
                  //  .attr("transform", "translate(" + -165 + "," + 545 + ") rotate(270)")
                  //  .text("2019 Workforce")
                  //
                  //  svgSank.append("text")
                  //   .attr("class","sankeyRecTitle")
                  //   .attr("id","Workforce2020")
                  //   .attr("x",100)
                  //   .attr('y',350)
                  //   .attr('text-anchor',"middle")
                  //   .style('fill', '#ffffff')
                  //   .attr("transform", "translate(" + 118 + "," + 545 + ") rotate(270)")
                  //   .text("2020 Workforce")
                  //
                  //   svgSank.append("text")
                  //    .attr("class","sankeyRecTitle")
                  //    .attr("id","SustainingWorkforce2030")
                  //    .attr("x",100)
                  //    .attr('y',350)
                  //    .style('fill', '#ffffff')
                  //    .attr('text-anchor',"middle")
                  //    .attr("transform", "translate(" + 680 + "," + 680 + ") rotate(270)")
                  //    .text("2030 Sustaining Workforce")
                  //
                  //    svgSank.append("text")
                  //     .attr("class","sankeyRecTitle")
                  //     .attr("id","NewWorkforce2030")
                  //     .attr("x",100)
                  //     .attr('y',350)
                  //     .style('fill', '#ffffff')
                  //     .attr('text-anchor',"middle")
                  //     .attr("transform", "translate(" + 680 + "," + 370 + ") rotate(270)")
                  //     .text("2030 New Workforce")

                      // svgSank.append("text")
                      //  .attr("class","sankeyRecTitle")
                      //  .attr("id","WorkforceExit")
                      //  .attr("x",100)
                      //  .attr('y',350)
                      //  .attr('text-anchor',"middle")
                      //  .style('fill', '#ffffff')
                      //  .attr("transform", "translate(" + 392 + "," + 390 + ") rotate(270)")
                      //  .text("Exit & Entrance")

                       // svgSank.append("text")
                       //  .attr("class","sankeyPathTitle")
                       //  .attr("id","PandemicLoss")
                       //  .attr("x",700)
                       //  .attr('y',147)
                       //  .attr('text-anchor',"end")
                       //  .text("Pandemic Loss")
                       //
                       //  svgSank.append("text")
                       //   .attr("class","sankeyPathTitle")
                       //   .attr("id","PandemicRecovery")
                       //   .attr("x",780)
                       //   .attr('y',147)
                       //   .attr('text-anchor',"start")
                       //   .text("Recovery")
                       //
                       //
                       //  svgSank.append("text")
                       //   .attr("class","sankeyPathTitle")
                       //   .attr("id","WF_Exit")
                       //   .attr("x",700)
                       //   .attr('y',300)
                       //   .attr('text-anchor',"end")
                       //   .text("Exit")
                       //
                       //   svgSank.append("text")
                       //    .attr("class","sankeyPathTitle")
                       //    .attr("id","WF_Entrance")
                       //    .attr("x",780)
                       //    .attr('y',300)
                       //    .attr('text-anchor',"Start")
                       //    .text("Entrance")
                       //
                       //   svgSank.append("text")
                       //    .attr("class","sankeyPathTitle")
                       //    .attr("id","NewJobs")
                       //    .attr("x",700)
                       //    .attr('y',105)
                       //    .attr('text-anchor',"end")
                       //    .text("Job Increase")
                       //
                       //    svgSank.append("text")
                       //     .attr("class","JobNumbers")
                       //     .attr("id","JobNumbers")
                       //     .style("fill","#407CCA")
                       //     .attr("x",80)
                       //     .attr('y',50)
                       //     .attr('text-anchor',"middle")
                       //     .text(Number2019)
                       //
                       //     svgSank.append("text")
                       //      .attr("class","JobText")
                       //      .attr("id","Workersin2019")
                       //      .attr("x",80)
                       //      .attr('y',65)
                       //      .attr('text-anchor',"middle")
                       //      .style("fill","#407CCA")
                       //      .text("Workers in 2019")
                       //
                       // svgSank.append("text")
                       //  .attr("class","percentNB_FB")
                       //  .attr("id","Percent_2019")
                       //  .attr("x",80)
                       //  .attr('y',110)
                       //  .attr('text-anchor',"middle")
                       //  .style("fill","#407CCA")
                       //  .text(allPercent)
                       //
                       //  svgSank.append("text")
                       //   .attr("class","JobText")
                       //   .attr("id","ForeignBornWorkers")
                       //   .attr("x",80)
                       //   .attr('y',125)
                       //   .attr('text-anchor',"middle")
                       //   .style("fill","#407CCA")
                       //   .text("Foreign Born Workers")
                       //
                       //
                       //     svgSank.append("text")
                       //      .attr("class","JobNumbers")
                       //      .attr("id","JobNumbers_2030")
                       //      .attr("x",1120)
                       //      .attr('y',50)
                       //      .attr('text-anchor',"middle")
                       //      .text(Number2030)
                       //
                       //      svgSank.append("text")
                       //       .attr("class","JobText")
                       //       .attr("id","Workersin2030")
                       //       .attr("x",1120)
                       //       .attr('y',65)
                       //       .attr('text-anchor',"middle")
                       //       .text("Workers in 2030")
                       //
                       //    svgSank.append("text")
                       //     .attr("class","JobNumbers")
                       //     .attr("id","NewJobNumbers")
                       //     .attr("x",1120)
                       //     .attr('y',250)
                       //     .attr('text-anchor',"middle")
                       //     .style("fill","#2fa0a8")
                       //     .text(NewJobNumber)
                       //
                       //     svgSank.append("text")
                       //      .attr("class","JobText")
                       //      .attr("id","New&OpenJobs")
                       //      .attr("x",1120)
                       //      .attr('y',265)
                       //      .attr('text-anchor',"middle")
                       //      .style("fill","#2fa0a8")
                       //      .text("New & Open Jobs")
                       //
                       //
                       //      svgSank.append("text")
                       //       .attr("class","JobNumbers")
                       //       .attr("id","ExistingJobNumbers")
                       //       .attr("x",1120)
                       //       .attr('y',550)
                       //       .attr('text-anchor',"middle")
                       //       .style("fill","#407CCA")
                       //       .text(ExistingNumber)
                       //
                       //       svgSank.append("text")
                       //        .attr("class","JobText")
                       //        .attr("id","RemainingJobs")
                       //        .attr("x",1120)
                       //        .attr('y',565)
                       //        .attr('text-anchor',"middle")
                       //        .style("fill","#407CCA")
                       //        .text("Remaining Jobs");
                       //
                              document.getElementById("paraNum1").innerHTML = paragraphONE
                              document.getElementById("paraNum2").innerHTML = paragraphTWO

                    // svgSank.append("text")
                    //  .attr("class","totalTitle")
                    //  .attr("id","totalTitleID")
                    //  .attr("x",600)
                    //  .attr('y',30)
                    //  .attr('text-anchor',"middle")
                    //  .text(bigTitle)


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
    Number2019=formatMill(upload.demo[1].value);
    Number2030 =formatMill(upload.demo[2].value);
    NewJobNumber =formatMill(upload.demo[3].value);
    ExistingNumber =formatMill(upload.demo[4].value);
    bigTitle =upload.demo[5].value;
    var Number2020=formatComma(upload.demo[6].value);
    var pandemicL = formatComma(upload.demo[7].value);
    var pandemicR = formatComma(upload.demo[8].value);
    var newJobEst = formatComma(upload.demo[9].value);
    var exitNumber = formatComma(upload.demo[10].value);
    paragraphONE = upload.demo[11].value;
    paragraphTWO = upload.demo[12].value;




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
            if (d.source.name=="WF2019" && d.target.name=="WF2020") {return "Workers in 2020: " +Number2020}
            else if (d.source.name=="WF2019" && d.target.name=="Pandemic") {return "Panddemic Loss: " +pandemicL}
            else if (d.source.name=="WF2020" && d.target.name=="Current") {return "Sustaining workforce: " + ExistingNumber}
            else if (d.source.name=="WF2020" && d.target.name=="Exit") {return "Exiting workforce: " + exitNumber}
            else if (d.source.name=="Current" && d.target.name=="ExistingWorkforce") {return "Sustaining workforce: " + ExistingNumber}
            else if (d.source.name=="Pandemic" && d.target.name=="NewWorkforce") {return "Panddemic Recovery: " +pandemicR}
            else if (d.source.name=="JobCreation" && d.target.name=="NewWorkforce") {return "Job Increase: " +newJobEst}
            else if (d.source.name=="Exit" && d.target.name=="NewWorkforce") {return "Workers Entering: " + NewJobNumber}
            else {return "nan"}

          })

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

          svgSank.select("#JobCreation_NewWorkforce").attr("stroke","#2fa0a8")
          svgSank.select("#Exit_NewWorkforce").attr("stroke","#2fa0a8")
          svgSank.select("#Pandemic_NewWorkforce").attr("stroke","#2fa0a8")
          svgSank.select("#WF2019_Pandemic").attr("stroke","#ca4940")
          svgSank.select("#WF2020_Exit").attr("stroke","#ca4940")

                 svgSank.append("text")
                  .attr("class","sankeyRecTitle")
                  .attr("id","Workforce2019")
                  .attr("x",100)
                  .attr('y',350)
                  .attr('text-anchor',"middle")
                  .style('fill', '#ffffff')
                  .attr("transform", "translate(" + -165 + "," + 545 + ") rotate(270)")
                  .text("2019 Workforce")

                  svgSank.append("text")
                   .attr("class","sankeyRecTitle")
                   .attr("id","Workforce2020")
                   .attr("x",100)
                   .attr('y',350)
                   .style('fill', '#ffffff')
                   .attr('text-anchor',"middle")
                   .attr("transform", "translate(" + 118 + "," + 545 + ") rotate(270)")
                   .text("2020 Workforce")

                   svgSank.append("text")
                    .attr("class","sankeyRecTitle")
                    .attr("id","SustainingWorkforce2030")
                    .attr("x",100)
                    .attr('y',350)
                    .attr('text-anchor',"middle")
                    .style('fill', '#ffffff')
                    .attr("transform",function(d){ if (selectFam=='protective' || selectFam=='sales'||selectFam=="transportation"){return "translate(" + 680 + "," + 695 + ") rotate(270)"} else {return "translate(" + 680 + "," + 680 + ") rotate(270)"}})
                    .text(function(d) {if (selectFam=='foodprep' || selectFam=='healthcareSupp'||selectFam=="personal"||selectFam=="building") {return "" }
                                                       else {return "2030 Sustaining Workforce"}})

                    svgSank.append("text")
                     .attr("class","sankeyRecTitle")
                     .attr("id","NewWorkforce2030")
                     .attr("x",100)
                     .attr('y',350)
                     .style('fill', '#ffffff')
                     .attr('text-anchor',"middle")
                     .attr("transform", function(d) {if (selectFam=='building'||selectFam=="office"||selectFam=='sales') {return "translate(" + 680 + "," + 390 + ") rotate(270)"}
                                                      else if (selectFam=='science' || selectFam=='management'||selectFam=="healthcarePrac" || selectFam=='computer'||selectFam=='business') {return "translate(" + 680 + "," + 315 + ") rotate(270)"}
                                                      else if (selectFam=="installation"|| selectFam=='legal'||selectFam=='construction') {return "translate(" + 680 + "," + 333 + ") rotate(270)"}
                                                        else if (selectFam=='foodprep'||selectFam=="healthcareSupp"||selectFam=="personal") {return "translate(" + 680 + "," + 455 + ") rotate(270)"}
                                                        else if (selectFam=='production'||selectFam=='protective'||selectFam=='transportation') {return "translate(" + 680 + "," + 361 + ") rotate(270)"}
                                                      else {return "translate(" + 680 + "," + 350 + ") rotate(270)"}})
                     .text(function(d) {if (selectFam=='science' || selectFam=='management' ||selectFam=="healthcarePrac"||selectFam=='computer'||selectFam=='business'||selectFam=='construction') {return "New Workforce" }
                                                        else {return "2030 New Workforce"}})

                     // {return "translate(" + 680 + "," + 350 + ") rotate(270)"}

                     // svgSank.append("text")
                     //  .attr("class","sankeyRecTitle")
                     //  .attr("id","WorkforceExit")
                     //  .attr("x",100)
                     //  .attr('y',function(d){if (selectFam=="construction" || selectFam=="farming"|| selectFam=="healthcarePrac" || selectFam=="installation"){return 340} else if (selectFam=="science"|| selectFam=="management"|| selectFam=="production") {return 330} else if (selectFam=="business") {return 320} else if (selectFam=="foodprep" || selectFam=="healthcareSupp" ) {return 395} else {return 390}})
                     //  .attr('text-anchor',"middle")
                     //  .style('fill', '#ffffff')
                     //  .attr("transform", function(d) {if (selectFam=="healthcareSupp" || selectFam=="foodprep") {return "translate(" + 350 + "," + 450 + ") rotate(270)"} else if (selectFam=="production" || selectFam=="management"|| selectFam=="science"|| selectFam=="healthcarePrac"|| selectFam=="business"|| selectFam=="construction"|| selectFam=="farming"|| selectFam=="installation") {return "translate(" + 405 + "," + 340 + ") rotate(270)"} else {return "translate(" + 390 + "," + 380 + ") rotate(270)"}})
                     //  .text("Exit & Entrance")

                     svgSank.append("text")
                      .attr("class","JobNumbers")
                      .attr("id","ExistingJobNumbers")
                      .attr("x",1120)
                      .attr('y',function(d){if(selectFam=='foodprep'){return 680} else if (selectFam=='personal' ||selectFam=="healthcareSupp"){return 640} else {return 550}})
                      .attr('text-anchor',"middle")
                      .style("fill","#407CCA")
                      .text(ExistingNumber)

                      svgSank.append("text")
                       .attr("class","JobText")
                       .attr("id","RemainingJobs")
                       .attr("x",1120)
                       // .attr('y',function(d){if(){} else{return 565}})
                       .attr('y',function(d){if(selectFam=='foodprep'){return 695} else if (selectFam=='personal' ||selectFam=="healthcareSupp"){return 655} else {return 565}})
                       .attr('text-anchor',"middle")
                       .style("fill","#407CCA")
                       .text("Remaining Jobs");


                      svgSank.append("text")
                       .attr("class","sankeyPathTitle")
                       .attr("id","PandemicLoss")
                       .attr("x",700)
                       .attr("y",function(d){if (selectFam=="arts" || selectFam=="foodprep"|| selectFam=="healthcarePrac" || selectFam=="legal" || selectFam=="education"){return 165} else if (selectFam=="building") {return 130} else if (selectFam=="transportation" || selectFam=="personal") {return 160} else if (selectFam=="healthcareSupp") {return 223} else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales") {return 120} else {return 147}})
                       .attr('text-anchor',"end")
                       .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
                       .text("Pandemic Loss")


                       svgSank.append("text")
                        .attr("class","sankeyPathTitle")
                        .attr("id","PandemicRecovery")
                        .attr("x",780)
                        .attr("y",function(d){if (selectFam=="arts" || selectFam=="foodprep"|| selectFam=="healthcarePrac" || selectFam=="legal" || selectFam=="education"){return 165} else if (selectFam=="building") {return 130} else if (selectFam=="transportation" || selectFam=="personal") {return 160} else if (selectFam=="healthcareSupp") {return 223} else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales") {return 120} else {return 147}})
                        .attr('text-anchor',"start")
                        .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"|| selectFam=="office" || selectFam=="production" || selectFam=="sales"){return "hidden"} else {return "visible"}})
                        .text("Recovery")


                       svgSank.append("text")
                        .attr("class","sankeyPathTitle")
                        .attr("id","WF_Exit")
                        .attr("x",700)
                        .attr("y",function(d){if (selectFam=="arts"){return 315} else if (selectFam=="building"|| selectFam=="construction"|| selectFam=="legal" || selectFam=="installation" || selectFam=="computer") {return 275} else if (selectFam=="healthcareSupp" || selectFam=="personal" || selectFam=="foodprep") {return 375}  else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales" || selectFam=="healthcarePrac" ) {return 270}
                         else if ( selectFam=="business" || selectFam=="science") {return 250} else {return 300}})
                        .attr('text-anchor',"end")
                        // .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
                        .text("Exit")


                        svgSank.append("text")
                         .attr("class","sankeyPathTitle")
                         .attr("id","WF_Entrance")
                         .attr("x",780)
                         .attr("y",function(d){if (selectFam=="arts"){return 315} else if (selectFam=="building"|| selectFam=="construction"|| selectFam=="legal" || selectFam=="installation" || selectFam=="computer") {return 275} else if (selectFam=="healthcareSupp" || selectFam=="personal" || selectFam=="foodprep") {return 375}  else if (selectFam=="farming" || selectFam=="management" || selectFam=="office" || selectFam=="production"|| selectFam=="sales" || selectFam=="healthcarePrac" ) {return 270}
                          else if ( selectFam=="business" || selectFam=="science") {return 250} else {return 300}})
                         .attr('text-anchor',"start")
                         // .style("visibility", function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return "hidden"} else {return "visible"}})
                         .text("Entrance")

                        // selectFam=="foodprep" at 415



                        svgSank.append("text")
                         .attr("class","sankeyPathTitle")
                         .attr("id","NewJobs")
                         .attr("x",700)
                         .attr("y",function(d){if (selectFam=="business" || selectFam=="community"|| selectFam=="computer"){return 125} else if (selectFam=="healthcarePrac" || selectFam=="healthcareSupp" || selectFam=="legal") {return 115} else {return 105}})
                         .attr('text-anchor',"end")
                         .style("visibility", function(d){if (selectFam=="building" || selectFam=="farming"|| selectFam=="management" || selectFam=="office" || selectFam=="personal" || selectFam=="production" || selectFam=="sales"){return "hidden"} else {return "visible"}})
                         .text("Job Increase")


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

sankeyThree(sankeyData)






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

    // twoCodeScatter()
    twoRankScatter()

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
