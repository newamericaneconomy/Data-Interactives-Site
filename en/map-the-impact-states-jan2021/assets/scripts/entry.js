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


var t_2014 = 2014
var t_2019 = 2019

var tableTrig1 = 0
var tableTrig2 = 0

var formatComma = d3.format(",.0f")
var formatNoComma = d3.format(".0f")
var formatPercent = d3.format(",.1%")
var formatMoney = function(d) { return "$" + formatComma(d); }


var scroller1 = scrollama()
var container1 = d3.select('#container-scroll1');
var graphic1 = container1.select('.scroll__figure1');
var chart1 = graphic1.select('.figure__chart1');
var text1 = container1.select('.scroll__text1');
var step1 = text1.selectAll('.step1');

var scroller2 = scrollama()
var container2 = d3.select('#container-scroll2');
var graphic2 = container2.select('.scroll__figure1');
var chart2 = graphic2.select('.figure__chart1');
var text2 = container2.select('.scroll__text1');
var step2 = text2.selectAll('.step2');

var scroller3 = scrollama()
var container3 = d3.select('#container-scroll3');
var graphic3 = container3.select('.scroll__figure3');
var chart3 = graphic3.select('.figure__chart1');
var text3 = container3.select('.scroll__text1');
var step3 = text3.selectAll('.step3');

var scroller4 = scrollama()
var container4 = d3.select('#container-scroll4');
var graphic4 = container4.select('.scroll__figure1');
var chart4 = graphic4.select('.figure__chart1');
var text4 = container4.select('.scroll__text1');
var step4 = text4.selectAll('.step4');

var scroller5 = scrollama()
var container5 = d3.select('#container-scroll5');
var graphic5 = container5.select('.scroll__figure1');
var chart5 = graphic5.select('.figure__chart1');
var text5 = container5.select('.scroll__text1');
var step5 = text5.selectAll('.step5');

var scroller6 = scrollama()
var container6 = d3.select('#container-scroll6');
var graphic6 = container6.select('.scroll__figure1');
var chart6 = graphic6.select('.figure__chart1');
var text6 = container6.select('.scroll__text1');
var step6 = text6.selectAll('.step6');

var scroller7 = scrollama()
var container7 = d3.select('#container-scroll7');
var graphic7 = container7.select('.scroll__figure1');
var chart7 = graphic7.select('.figure__chart1');
var text7 = container7.select('.scroll__text1');
var step7 = text7.selectAll('.step7');

var scroller8 = scrollama()
var container8 = d3.select('#container-scroll8');
var graphic8 = container8.select('.scroll__figure1');
var chart8 = graphic8.select('.figure__chart1');
var text8 = container8.select('.scroll__text1');
var step8 = text8.selectAll('.step8');

var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };

var svg = d3.select("svg");
var defShad = svg.append("defs");


var dropShadowFilter = defShad.append('svg:filter')
  .attr('id', 'drop-shadow')
  .attr('filterUnits', "userSpaceOnUse")
  .attr('width', '250%')
  .attr('height', '250%');
dropShadowFilter.append('svg:feGaussianBlur')
  .attr('in', 'SourceGraphic')
  .attr('stdDeviation', 6)
  .attr('result', 'blur-out');
dropShadowFilter.append('svg:feColorMatrix')
  .attr('in', 'blur-out')
  .attr('type', 'hueRotate')
  .attr('values', 180)
  .attr('result', 'color-out');
dropShadowFilter.append('svg:feOffset')
  .attr('in', 'color-out')
  .attr('dx', -3)
  .attr('dy', -3)
  .attr('result', 'the-shadow');
dropShadowFilter.append('svg:feBlend')
  .attr('in', 'SourceGraphic')
  .attr('in2', 'the-shadow')
  .attr('mode', 'normal');



  var feMerge = dropShadowFilter.append( 'feMerge' );

  // first layer result of blur and offset
  feMerge.append( 'feMergeNode' )
         .attr( 'in", "offsetBlur' )

  // original image on top
  feMerge.append( 'feMergeNode' )
         .attr( 'in', 'SourceGraphic' );
  // end filter stuff

// var feTransfer = dropShadowFilter.append("feComponentTransfer");
//
// feTransfer.append("feFuncA")
// 	.attr("type", "linear")
// 	.attr("slope", 0.9)
//
// // overlay original SourceGraphic over translated blurred opacity by using
// // feMerge filter. Order of specifying inputs is important!
// var feMerge = dropShadowFilter.append("feMerge");
//
// feMerge.append("feMergeNode")
// feMerge.append("feMergeNode")
//     .attr("in", "SourceGraphic");
//

var circleSVG_1 = d3.select("#circleSVG"),
    margin = {top: 10, left: 20, bottom: 10, right: 20},
    width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
    height = +circleSVG_1.attr("viewBox").split(" ")[3]

    var mapSVG_1 = d3.select("#mapSVG"),
        margin = {top: 10, left: 20, bottom: 10, right: 20},
        width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
        height = +circleSVG_1.attr("viewBox").split(" ")[3]

    var tabRecSVG_1 = d3.select("#recentTabSVG"),
        margin = {top: 10, left: 20, bottom: 10, right: 20},
        width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
        height = +circleSVG_1.attr("viewBox").split(" ")[3]

    var mapRecSVG_1 = d3.select("#recentMapSVG"),
        margin = {top: 10, left: 20, bottom: 10, right: 20},
        width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
        height = +circleSVG_1.attr("viewBox").split(" ")[3]

    var mapLangSVG_1 = d3.select("#languageMapSVG"),
            margin = {top: 10, left: 20, bottom: 10, right: 20},
            width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
            height = +circleSVG_1.attr("viewBox").split(" ")[3]

    var mapEngSVG_1 = d3.select("#engMapSVG"),
            margin = {top: 10, left: 20, bottom: 10, right: 20},
            width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
            height = +circleSVG_1.attr("viewBox").split(" ")[3]

    var mapHsSVG_1 = d3.select("#hsMapSVG"),
            margin = {top: 10, left: 20, bottom: 10, right: 20},
            width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
            height = +circleSVG_1.attr("viewBox").split(" ")[3]

    var mapLsSVG_1 = d3.select("#lsMapSVG"),
            margin = {top: 10, left: 20, bottom: 10, right: 20},
            width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
            height = +circleSVG_1.attr("viewBox").split(" ")[3]

var screenHeight = window.screen.height
var screenWidth = window.screen.width
var toolOffWidth = screenWidth*.1
var toolOffHeight = screenHeight*.1



var diameter = 600;
var color = d3.scaleOrdinal(d3.schemeCategory20);

function padExtent(e, p) {
    if (p === undefined) p = 0;
    return ([e[0] - p, e[1] + p]);
}

var x = d3.scaleLinear()
    .domain(padExtent([1,7]))
    .range(padExtent([2*margin.left, width-(2*margin.right)]));

    var y = d3.scaleLinear()
        .domain(padExtent([.36,-0.05]))
        .range(padExtent([0, height]));

        var yNew = d3.scaleLinear()
            .domain(padExtent([.6,-.05]))
            .range(padExtent([0, height]));

    var xmap = d3.scaleLinear()
        .domain(padExtent([0,800]))
        .range(padExtent([0, width]));

    var ymap = d3.scaleLinear()
        .domain(padExtent([0,700]))
        .range(padExtent([0, width]));


    var sqrtScale = d3.scaleSqrt()
                      .domain([0, 25151378])
                      .range([1, 60]);


var g = circleSVG_1.append("g") //Set the filter on the container svg
    // .style("filter", "url(#gooey)")
		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");





    var gMap = mapSVG_1.append("g") //Set the filter on the container svg
            // .style("filter", "url(#gooey)")
        		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

    var gRecTab = tabRecSVG_1.append("g") //Set the filter on the container svg
                // .style("filter", "url(#gooey)")
                .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

    var gRecMap = mapRecSVG_1.append("g") //Set the filter on the container svg
                            // .style("filter", "url(#gooey)")
                .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

    var gLangMap =  mapLangSVG_1.append("g") //Set the filter on the container svg
                        // .style("filter", "url(#gooey)")
                .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

    var gEngMap =  mapEngSVG_1.append("g") //Set the filter on the container svg
                                    // .style("filter", "url(#gooey)")
                .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

    var gHsMap =  mapHsSVG_1.append("g") //Set the filter on the container svg
                                                // .style("filter", "url(#gooey)")
                .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

    var gLsMap =  mapLsSVG_1.append("g") //Set the filter on the container svg
                                                            // .style("filter", "url(#gooey)")
              .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");




    var div = d3.selectAll(".scroll__figure1").append("div")
              .attr("class", "tooltipDiv");

    var div2 = d3.selectAll(".scroll__figure1").append("div")
              .attr("class", "tooltipDiv");

    var div3 = d3.selectAll(".scroll__figure3").append("div")
              .attr("class", "tooltipDiv");

    var div4 = d3.select("#recentMap").append("div")
                .attr("class", "tooltipDiv");

    var div5 = d3.select("#languageMap").append("div")
                .attr("class", "tooltipDiv");

    var div6 = d3.select("#engMap").append("div")
                .attr("class","tooltipDiv")

    var div7 = d3.select("#hsMap").append("div")
                .attr("class","tooltipDiv")

    var div8 = d3.select("#lsMap").append("div")
                .attr("class","tooltipDiv")


  var topPos

var topOrigin = d3.csv("assets/countryCircle.csv")

var recentOrigin = d3.csv("assets/recentCount.csv")

var stateDot = d3.csv("assets/stateComplete2019.csv")

var languageDot = d3.csv("assets/langaugeData.csv")




      // function(d) {
      //   d.total2014 = +d.total2014;
      //   d.percent2014 = +d.percent2014;
			// 	d.total2018 = +d.total2018;
  		// 	d.percent2018 = +d.percent2018;
    	// 	d.country = d.Country;
      //   d.yLeftPlace = +d.countYL;
      //   d.yRightPlace = +d.countYR;
      //   }



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

  Promise.all([topOrigin, stateDot, recentOrigin, languageDot]).then(startChange);


// d3.csv("assets/countryCircle.csv")
//     .then(function(data) {
//     // Coerce the strings to numbers.
//     data.forEach(function(d) {
//         d.total2014 = +d.total2014;
//         d.percent2014 = +d.percent2014;
// 				d.total2018 = +d.total2018;
// 				d.percent2018 = +d.percent2018;
// 				d.country = d.Country;
//         d.yLeftPlace = +d.countYL;
//         d.yRightPlace = +d.countYR;
//     });


 function startChange(data) {


   var csvOrigin=data[0]
   var csvProjection=data[1]
   var csvRecent=data[2]
   var csvLanguage = data[3]
   var k = 0


   function make_y_gridlines() {
       return d3.axisLeft(y)
           .ticks(4)
   }

   function make_0_gridlines() {
       return d3.axisLeft(y)
           .ticks(1)
   }



function tableCircle() {


           g.append("g")
                 .attr("class", "grid")
                 .call(make_y_gridlines()
                     .tickSize(-width)
                     .tickFormat(""))
                     .attr("class","greyTicks")
                     .style("stroke","#738a75")

          g.append("g")
                 .attr("class", "grid")
                 .call(make_0_gridlines()
                 .tickSize(-width)
                 .tickFormat(""))
                 .attr("class","blackTick")
                 .style("stroke","#000")



          g.selectAll(".domain").remove()




  g.selectAll(".dotFaint")
      .data(csvOrigin)
      .enter()
      .append("circle")
      .attr("class", "dotFaint")
      .attr("r", 50)
      .attr("cx", function(d) { if (d.Country == "Mexico") {return x(2)} else if (d.Country == "India") {return x(3)}  else if (d.Country == "Philippines") {return x(4)} else if (d.Country == "China") {return x(5)} else if (d.Country == "El Salvador") {return x(6)} else {return x(1)}})
      .attr("cy", function(d) { return y(+d.percent2014); })
      // .style("fill",function(d) {if (d.Country == "Mexico") {return "#6B7CF2"} else if (d.Country == "India") {return "#87D8F7"}  else if (d.Country == "Philippines") {return "#BCE5ED"} else if (d.Country == "China") {return "#A882CC"} else if (d.Country == "El Salvador") {return "#D172D3"} else {return "#CFBAED"}})
      .style("fill",function(d) {if (d.Country == "Mexico") {return "#6063ED"} else if (d.Country == "India") {return "#87D8F7"}  else if (d.Country == "Philippines") {return "#BCE5ED"} else if (d.Country == "China") {return "#F9C9B5"} else if (d.Country == "El Salvador") {return "#FF704F"} else {return "#CFBAED"}})
      .style("opacity", .3)



   g.selectAll(".dotTable")

       .data(csvOrigin)
       .enter()
       .append("circle")
       .attr("class", "dotTable")
       .attr("r", 50)
       .attr("cx", function(d) { if (d.Country == "Mexico") {return x(2)} else if (d.Country == "India") {return x(3)}  else if (d.Country == "Philippines") {return x(4)} else if (d.Country == "China") {return x(5)} else if (d.Country == "El Salvador") {return x(6)} else {return x(1)}})
       .attr("cy", function(d) { return y(+d.percent2014); })
       .style("fill",function(d) {if (d.Country == "Mexico") {return "#6063ED"} else if (d.Country == "India") {return "#87D8F7"}  else if (d.Country == "Philippines") {return "#BCE5ED"} else if (d.Country == "China") {return "#F9C9B5"} else if (d.Country == "El Salvador") {return "#FF704F"} else {return "#CFBAED"}})
       .on("mouseover", function(d) {
         div.selectAll(".tooltipDiv").style("visibility", 'hidden')
         topPos = window.pageYOffset;
               div.transition()
                   .style("visibility", 'visible')
                   .style("display", "inline")
                    .style("class","tooltipDiv")
                   .attr("z-index", 100);
               div.html("<span 'class'='title'>"+"Share of All Immigrants  "+"</span>"+"<br>" +"<span 'class'='title'>"+"2014:  "+"</span>" +formatPercent(+d.percent2014) + "<br/>"+"<span 'class'='title'>"+"2019:  "+"</span>"+formatPercent(+d.percent2019))
                   .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                   .style("top", ((d3.event.pageY)-topPos-toolOffHeight)+"px" );
                 })
      .on("mouseout", function(d) {
        div.selectAll(".tooltipDiv").style("visibility", 'hidden')
             div.style("visibility","hidden")
             g.selectAll(".tooltipDiv")
              .style("visibility","hidden")
              // d3.select(".tooltipDiv").remove();
              div.style("visibility","hidden")
             });


    g.append("text")
     .attr("class", "titleTable")
     .attr("id", "title2014")
     .attr("x", x(4))
     .attr("y", y(.34))
     .attr('text-anchor','middle')
     .attr("fill", "black")
     .attr('z-index', 100)
     // .text(formatNoComma(t_2014)+" Origins of Immigrants");
     .text("Top Five Countries of Birth for U.S. Immigrants in "+formatNoComma(t_2014));


      g.selectAll(".countryName")
       .data(csvOrigin)
       .enter()
       .append("text")
       .attr("class", "countryName")
       .attr("x",function(d) { if (d.Country == "Mexico") {return x(2)} else if (d.Country == "India") {return x(3)}  else if (d.Country == "Philippines") {return x(4)} else if (d.Country == "China") {return x(5)} else if (d.Country == "El Salvador") {return x(6)} else {return x(1)}})
       .attr("y",function(d) { return y(+d.percent2014)-70; })
       .attr("fill", "black")
       .attr('text-anchor','middle')
       .attr('z-index', 100)
       .text(function(d) {return d.Country})





        g.selectAll(".countryPercent")
         .remove()
         .data(csvOrigin)
         .enter()
         .append("text")
         .attr("class", "countryPercent")
         .attr("x",function(d) { if (d.Country == "Mexico") {return x(2)} else if (d.Country == "India") {return x(3)}  else if (d.Country == "Philippines") {return x(4)} else if (d.Country == "China") {return x(5)} else if (d.Country == "El Salvador") {return x(6)} else {return x(1)}})
         .attr("y",function(d) { return y(+d.percent2014)+10; })
         .attr("fill", "white")
         .attr('text-anchor','middle')
         .attr('z-index', 100)
         .text(function(d) {return formatPercent(+d.percent2014)})
        //  .on("mouseover", function(d) {
        //    div.selectAll(".tooltipDiv").style("visibility", 'hidden')
        //    topPos = window.pageYOffset;
        //          div.transition()
        //              .style("visibility", 'visible')
        //              .style("display", "inline")
        //               .style("class","tooltipDiv")
        //              .attr("z-index", 100);
        //          div.html("<span 'class'='title'>"+"Share of All Immigrants  "+"</span>"+"<br>" +"<span 'class'='title'>"+"2014:  "+"</span>" +formatPercent(+d.percent2014) + "<br/>"+"<span 'class'='title'>"+"2019:  "+"</span>"+formatPercent(+d.percent2019))
        //              .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
        //              .style("top", ((d3.event.pageY)-topPos-toolOffHeight)+"px" );
        //            })
        // .on("mouseout", function(d) {
        //   div.selectAll(".tooltipDiv").style("visibility", 'hidden')
        //        div.style("visibility","hidden")
        //        g.selectAll(".tooltipDiv")
        //         .style("visibility","hidden")
        //         // d3.select(".tooltipDiv").remove();
        //         div.style("visibility","hidden")
        //        });

         g.append("text")
          .attr("class", "percentYLabel")
          .attr("id", "percent0_All")
          .attr("x", x(.75))
          .attr("y", y(0))
          .attr('text-anchor','middle')
          .attr("fill", "black")
          .attr('z-index', 100)
          .text("0%");

          g.append("text")
           .attr("class", "percentYLabel")
           .attr("id", "percent10_All")
           .attr("x", x(.75))
           .attr("y", y(.1))
           .attr('text-anchor','middle')
           .attr("fill", "black")
           .attr('z-index', 100)
           .text("10%");


           g.append("text")
            .attr("class", "percentYLabel")
            .attr("id", "percent20_All")
            .attr("x", x(.75))
            .attr("y", y(.2))
            .attr('text-anchor','middle')
            .attr("fill", "black")
            .attr('z-index', 100)
            .text("20%");

            g.append("text")
             .attr("class", "percentYLabel")
             .attr("id", "percent30_All")
             .attr("x", x(.75))
             .attr("y", y(.3))
             .attr('text-anchor','middle')
             .attr("fill", "black")
             .attr('z-index', 100)
             .text("30%");
  }

tableCircle()

  function transitionOrigin() {






       g.selectAll(".dotTable")
       // .data(csvOrigin)
       // .enter()
        .transition()
        .duration(2000)
        .attr("cy", function(d) { return y(+d.percent2019); })


        g.selectAll(".countryName")
         // .data(csvOrigin)
         // .enter()
         .transition()
         .duration(2000)
         .attr("y",function(d) { return y(+d.percent2019)-70; });



    g.selectAll("#title2014")
     // .data(csvOrigin)
     // .enter()
     .transition()
     .duration(2000)
     // .text(formatNoComma(t_2018)+" Origins of Immigrants");
     .text("Top Five Countries of Birth for U.S. Immigrants in "+formatNoComma(t_2019));



    g.selectAll(".countryPercent")
     // .data(csvOrigin)
     // .enter()
     .transition()
     .duration(2000)
     .delay(0)
     .attr("y",function(d) { return y(+d.percent2019)+10; })
     .tween("text", function(d) {
       var node = this;
var i = d3.interpolate(+d.percent2014, +d.percent2019);
return function(t) {

  d3.select(node).text(formatPercent(i(t)));
};
});


tableTrig1 = 1
//     g.selectAll(".countryDifference")
//     .transition()
//     .duration(2000)
//     .style("opacity", 1)
//     .attr("y",function(d) { return y(+d.percent2018)+120; })
//     .tween("text", function(d) {
//       var node = this;
//       var difValue = +d.total2018 - +d.total2014
// var i = d3.interpolate(0, difValue);
// return function(t) {
//
//  d3.select(node).text("("+formatComma(i(t))+")");
// };
// })
//     .attr("fill", function(d){if (+d.total2018 - +d.total2014<0){return "#F7594C"} else {return "black"}} )

//      .tween("text", function(d) {
//        var node = this;
//        var difValue = (+d.total2014 - +d.total2018);
//        console.log(difValue);
// var i = d3.interpolate(0, difValue);
// return function(t) {
//   d3.select(node).text(formatComma(i(t)));
// };
// });

  }

  function tableOriginBack() {

    g.selectAll(".dotTable")
     .transition()
     .duration(2000)
     .attr("cy", function(d) { return y(+d.percent2014); })


     g.selectAll(".countryName")
      // .data(csvOrigin)
      // .enter()
      .transition()
      .duration(2000)
      .attr("y",function(d) { return y(+d.percent2014)-70; });



 g.selectAll("#title2014")
  // .data(csvOrigin)
  // .enter()
  .transition()
  .duration(2000)
  .text("Top Five Countries of Birth for U.S. Immigrants in "+formatNoComma(t_2014));



 g.selectAll(".countryPercent")
  // .data(csvOrigin)
  // .enter()
  .transition()
  .duration(2000)
  .delay(0)
  .attr("y",function(d) { return y(+d.percent2014)+10; })
  .tween("text", function(d) {
    var node = this;
var i = d3.interpolate(+d.percent2019, +d.percent2014);
return function(t) {

d3.select(node).text(formatPercent(i(t)));
};
});

tableTrig1 = 0

  }

  function tableRecent() {

  gRecTab.append("text")
     .attr("class", "percentYLabel")
     .attr("id", "percent0_All")
     .attr("x", x(.75))
     .attr("y", y(0))
     .attr('text-anchor','middle')
     .attr("fill", "black")
     .attr('z-index', 100)
     .text("0%");

  gRecTab.append("text")
      .attr("class", "percentYLabel")
      .attr("id", "percent10_All")
      .attr("x", x(.75))
      .attr("y", y(.1))
      .attr('text-anchor','middle')
      .attr("fill", "black")
      .attr('z-index', 100)
      .text("10%");


    gRecTab.append("text")
       .attr("class", "percentYLabel")
       .attr("id", "percent20_All")
       .attr("x", x(.75))
       .attr("y", y(.2))
       .attr('text-anchor','middle')
       .attr("fill", "black")
       .attr('z-index', 100)
       .text("20%");

      gRecTab.append("text")
        .attr("class", "percentYLabel")
        .attr("id", "percent30_All")
        .attr("x", x(.75))
        .attr("y", y(.3))
        .attr('text-anchor','middle')
        .attr("fill", "black")
        .attr('z-index', 100)
        .text("30%");


    gRecTab.append("g")
          .attr("class", "grid")
          .call(make_y_gridlines()
              .tickSize(-width)
              .tickFormat(""))
              .attr("class","greyTick2")
              .style("stroke","#738a75")
              .attr("z-index", 0)

           gRecTab.append("g")
                  .attr("class", "grid")
                  .call(make_0_gridlines()
                  .tickSize(-width)
                  .tickFormat(""))
                  .attr("class","blackTick2")
                  .style("stroke","#000")



            gRecTab.selectAll(".domain").remove()



    gRecTab.selectAll(".dotFaint")
        .data(csvRecent)
        .enter()
        .append("circle")
        .attr("class", "dotFaint")
        // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
        .attr("r", 50)
        .attr("cx", function(d) {return x(+d.Place+1) })
        .attr("cy", function(d) { return y(+d.recentPercent_2014); })
        // .style("fill",function(d) { if (d.Name == "Mexico") {return "#6B7CF2"} else if (d.Name == "India") {return "#87D8F7"}  else if (d.Name == "Philippines") {return "#38387C"} else if (d.Name == "China") {return "#A882CC"} else if (d.Name == "Cuba") {return "#FFA538"} else {return "#CFBAED"}})
        .style("fill",function(d) {if (d.Name == "Mexico") {return "#6063ED"} else if (d.Name == "India") {return "#87D8F7"}  else if (d.Name == "Philippines") {return "#BCE5ED"} else if (d.Name == "China") {return "#F9C9B5"} else if (d.Name == "El Salvador") {return "#FF704F"} else if (d.Name == "Cuba") {return "#FFA538"} else {return "#CFBAED"}})
        .attr("class", "dotFaint")
        .style("opacity", .3);

        gRecTab.selectAll(".recentName")
               .data(csvRecent)
               .enter()
               .append("text")
               .attr("class", "recentName")
               .attr("x", function(d) {return x(+d.Place+1) })
               .attr("y",function(d) { return y(+d.recentPercent_2014)-70; })
               .attr("fill", "black")
               .attr('text-anchor','middle')
               .attr('z-index', 1)
               .text(function(d) {return d.Name});





     gRecTab.selectAll(".recentTableDot")
         .data(csvRecent)
         .enter()
         .append("circle")
         .attr("class", "recentTableDot")
         // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
         .attr("r", 50)
         .attr("cx", function(d) {return x(+d.Place+1) })
         .attr("cy", function(d) { return y(+d.recentPercent_2014); })
         .attr("z-index", 50)
         .style("fill",function(d) {if (d.Name == "Mexico") {return "#6063ED"} else if (d.Name == "India") {return "#87D8F7"}  else if (d.Name == "Philippines") {return "#BCE5ED"} else if (d.Name == "China") {return "#F9C9B5"} else if (d.Name == "El Salvador") {return "#FF704F"} else if (d.Name == "Cuba") {return "#FFA538"} else {return "#CFBAED"}})
         .on("mouseover", function(d) {

           topPos = window.pageYOffset;

                 div2.transition()
                     .style("visibility", 'visible')
                     .style("class","tooltipDiv")
                     .style("display", "inline")
                     .attr("z-index", 500);

                 div2.html("<span 'class'='title'>"+"Share of All Immigrants  "+"</span>"+"<br>" +"<span 'class'='title'>"+"2014:  "+"</span>" +formatPercent(+d.recentPercent_2014) + "<br/>"+"<span 'class'='title'>"+"2019:  "+"</span>"+formatPercent(+d.recentPercent_2019))
                     .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                     .style("top", ((d3.event.pageY)-topPos-toolOffHeight)+"px" );


                   })
        .on("mouseout", function(d) {

               div2.selectAll(".tooltipDiv")
                .style("visibility","hidden")
                div2.style("visibility","hidden")

               });




      gRecTab
       .append("text")
       .attr("class", "titleTable")
       .attr("id", "titleRecTable")
       .attr("x", x(4))
       .attr("y", y(.33))
       .attr('text-anchor','middle')
       .attr("fill", "black")
       .attr('z-index', 100)
       // .text(formatNoComma(t_2014)+" Origins of Recent Immigrants")
       .text("Top Five Countries of Birth for Recent U.S. Immigrants in "+formatNoComma(t_2014))



          gRecTab.selectAll(".recentPercent")
           .data(csvRecent)
           .enter()
           .append("text")
           .attr("class", "recentPercent")
           .attr("x", function(d) {return x(+d.Place+1) })
           .attr("y",function(d) { return y(+d.recentPercent_2014)+10; })
           .attr("fill", "white")
           .attr('text-anchor','middle')
           .attr('z-index', 1)
           .text(function(d) {return formatPercent(+d.recentPercent_2014)});


    }

  function transitionRecent() {

    d3.selectAll(".greyTick2").remove()

    gRecTab.append("g")
          .call(make_y_gridlines()
              .tickSize(-width)
              .tickFormat(""))
              .attr("class","greyTick2")
              .style("stroke","#738a75")
              .attr("z-index", 0)







         gRecTab.selectAll(".recentTableDot")
         // .data(csvOrigin)
         // .enter()
          .transition()
          .duration(2000)
          .attr("cy", function(d) { return y(+d.recentPercent_2019); })


          gRecTab.selectAll(".recentName")
           // .data(csvOrigin)
           // .enter()
           .transition()
           .duration(2000)
           .attr("y",function(d) { return y(+d.recentPercent_2019)-70; });

           gRecTab.selectAll(".recentPercent")
            // .data(csvOrigin)
            // .enter()
            .transition()
            .duration(2000)
            .delay(0)
            .attr("y",function(d) { return y(+d.recentPercent_2019)+10; })
            .tween("text", function(d) {
              var node = this;
       var i = d3.interpolate(+d.recentPercent_2014, +d.recentPercent_2019);
       return function(t) {

         d3.select(node).text(formatPercent(i(t)));
       };
     });;







    gRecTab.selectAll("#titleRecTable")
       .transition()
       .duration(2000)
       .text("Top Five Countries of Birth for Recent U.S. Immigrants in "+formatNoComma(t_2019))

         tableTrig2 = 1


    }

    function tableRecentBack() {



               gRecTab.selectAll(".recentTableDot")
               // .data(csvOrigin)
               // .enter()
                .transition()
                .duration(2000)
                .attr("cy", function(d) { return y(+d.recentPercent_2014); })


                gRecTab.selectAll(".recentName")
                 // .data(csvOrigin)
                 // .enter()
                 .transition()
                 .duration(2000)
                 .attr("y",function(d) { return y(+d.recentPercent_2014)-70; });

                 gRecTab.selectAll(".recentPercent")
                  // .data(csvOrigin)
                  // .enter()
                  .transition()
                  .duration(2000)
                  .delay(0)
                  .attr("y",function(d) { return y(+d.recentPercent_2014)+10; })
                  .tween("text", function(d) {
                    var node = this;
             var i = d3.interpolate(+d.recentPercent_2019, +d.recentPercent_2014);
             return function(t) {

               d3.select(node).text(formatPercent(i(t)));
             };
           });;



          gRecTab.selectAll("#titleRecTable")
             .transition()
             .duration(2000)
             .text("Top Five Countries of Birth for Recent U.S. Immigrants in "+formatNoComma(t_2014))

  tableTrig2 = 0

    }




function dotMap() {

  g.selectAll('.tooltipDiv')
      .remove()

  d3.select(".scroll__figure1")
  .append('text')
  .attr("class", "xFake")
  .style("opacity", 0)
  .attr("x", "500px")
  .attr("y","500px")
  .text("X")
  //    d3.selectAll(".recentTableDot").remove()
  //
  // d3.selectAll("text").remove()
  // d3.selectAll(".dotFaint").remove()
  //
  //
  // d3.selectAll(".dotTable").remove()
  // d3.selectAll(".dots").remove()


   gMap.selectAll(".usDots")
  .data(csvProjection)
  .enter()
  .append("circle")
  .attr("class", "usDots")
  // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
  .attr("r", 29.25)
  .attr("cx", function(d) { return xmap(d.axis_x); })
  .attr("cy", function(d) { return ymap(d.axis_y); })
  .style("fill", function(d) {if (d.bpld_1 == "Mexico") {return "#6063ED"} else if (d.bpld_1 == "India") {return "#87D8F7"}  else if (d.bpld_1 == "Philippines") {return "#BCE5ED"} else if (d.bpld_1 == "China") {return "#F9C9B5"} else if (d.bpld_1 == "El Salvador") {return "#FF704F"} else if (d.bpld_1 =="Canada") {return "#FFDB21"} else if (d.bpld_1 =="Cuba") {return "#FFA538"} else if (d.bpld_1 =="Dominican Republic") {return "#38387C"} else if (d.bpld_1 =="Honduras") {return "#804f70"} else {return "#9B9EA0"}})
  .on("mouseover", function(d) {
    d3.select(this).attr("r",35);
  div3.style("visibility","hidden")

    if(d.bpld_share1 != "" && d.bpld_share2 != "" && d.bpld_share3 != "") {

    topPos = window.pageYOffset;

          div3.transition()
              .style("visibility", 'visible')
              .style("display", "inline")
              .style("class", "tooltipDiv")
              .attr("z-index", 999);


          div3.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr  class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.bpld_1+" ("+ formatPercent(d.bpld_share1)+")"+"</td></tr><tr><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.bpld_2 +" ("+formatPercent(d.bpld_share2)+")"+"</td></tr><tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.bpld_3+" ("+formatPercent(d.bpld_share3)+")"+"</td></tr></table>")
              .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
              .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.75)+"px" );
          }

        else if(d.bpld_share1 != "" && d.bpld_share2 == "") {

          topPos = window.pageYOffset;

                div3.transition()
                    .style("visibility", 'visible')
                    .style("display", "inline")
                    .style("class", "tooltipDiv")
                    .attr("z-index", 999);


                div3.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.bpld_1+" ("+ formatPercent(d.bpld_share1)+")"+"</td></tr></table>")
                    .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                    .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.5)+"px" );
                }

                else if(d.bpld_share1 != "" && d.bpld_share2 != "" && d.bpld_share3 == "") {

                  topPos = window.pageYOffset;

                        div3.transition()
                            .style("visibility", 'visible')
                            .style("display", "inline")
                            .style("class", "tooltipDiv")
                            .attr("z-index", 999);


                        div3.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.bpld_1+" ("+ formatPercent(d.bpld_share1)+")"+"</td></tr><tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.bpld_2 +" ("+formatPercent(d.bpld_share2)+")"+"</td></tr></table>")
                            .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                            .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.2)+"px" );
                        }

                  else if (d.bpld_share1 == "" && d.bpld_share2 == "" && d.bpld_share3 == "") {return}

        })
        .on("mouseout", function(d) {

          gMap.selectAll(".usDots").attr("r",29.25);

          // gMap.selectAll(".tooltipDiv").style("visibility","hidden")
          div3.style("visibility","hidden")


        });

  // .style("fill",function(d) {return colorWork(d.fbShareColor) })
  // .style("fill",function(d) { if (d.country == "Mexico") {return "#39377e"} else if (d.country == "India") {return "#6a7ef5"}  else if (d.country == "Philippines") {return "#8adcfc"} else if (d.country == "China") {return "#c0eaf1"} else if (d.country == "El Salvador") {return "#ecf2f2"} else {return "#05CE7C"}})

  gMap.selectAll(".stateName")
  // .remove()
   .data(csvProjection)
   .enter()
   .raise()
   .append("text")
   .attr("class", "stateName")
   .attr("x",function(d) { return xmap(d.axis_x); })
   .attr("y",function(d) { return ymap(d.axis_y)+4; })
   .attr("fill", "white")
   .attr('text-anchor','middle')
   .text(function(d) {return d.state_abv})
   // .on("mouseover", function(d) {
   //   d3.select(this).attr("r",35);
   // div3.style("visibility","hidden")
   //
   //   if(d.bpld_share1 != "" && d.bpld_share2 != "" && d.bpld_share3 != "") {
   //
   //   topPos = window.pageYOffset;
   //
   //         div3.transition()
   //             .style("visibility", 'visible')
   //             .style("display", "inline")
   //             .style("class", "tooltipDiv")
   //             .attr("z-index", 999);
   //
   //
   //         div3.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr  class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.bpld_1+" ("+ formatPercent(d.bpld_share1)+")"+"</td></tr><tr><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.bpld_2 +" ("+formatPercent(d.bpld_share2)+")"+"</td></tr><tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.bpld_3+" ("+formatPercent(d.bpld_share3)+")"+"</td></tr></table>")
   //             .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
   //             .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.75)+"px" );
   //         }
   //
   //       else if(d.bpld_share1 != "" && d.bpld_share2 == "") {
   //
   //         topPos = window.pageYOffset;
   //
   //               div3.transition()
   //                   .style("visibility", 'visible')
   //                   .style("display", "inline")
   //                   .style("class", "tooltipDiv")
   //                   .attr("z-index", 999);
   //
   //
   //               div3.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.bpld_1+" ("+ formatPercent(d.bpld_share1)+")"+"</td></tr></table>")
   //                   .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
   //                   .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.5)+"px" );
   //               }
   //
   //               else if(d.bpld_share1 != "" && d.bpld_share2 != "" && d.bpld_share3 == "") {
   //
   //                 topPos = window.pageYOffset;
   //
   //                       div3.transition()
   //                           .style("visibility", 'visible')
   //                           .style("display", "inline")
   //                           .style("class", "tooltipDiv")
   //                           .attr("z-index", 999);
   //
   //
   //                       div3.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.bpld_1+" ("+ formatPercent(d.bpld_share1)+")"+"</td></tr><tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.bpld_2 +" ("+formatPercent(d.bpld_share2)+")"+"</td></tr></table>")
   //                           .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
   //                           .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.2)+"px" );
   //                       }
   //
   //                 else if (d.bpld_share1 == "" && d.bpld_share2 == "" && d.bpld_share3 == "") {return}
   //
   //       })
   //       .on("mouseout", function(d) {
   //
   //         gMap.selectAll(".usDots").attr("r",29.25);
   //
   //         // gMap.selectAll(".tooltipDiv").style("visibility","hidden")
   //         div3.style("visibility","hidden")
   //
   //
   //       });

   gMap.append("text")
    .attr("class", "titleMap")
    .attr("id", "title2014")
    .attr("x", x(4))
    .attr("y", y(.33))
    .attr('text-anchor','middle')
    .attr("fill", "black")
    .attr('z-index', 100)
    .text("Top Three Countries of Birth for U.S. Immigrants in 2019");

//   (d.bpld_2018 =="Dominican Republic") {return "#F9C9B5"} else {return "#9B9EA0"}}

    gMap.append("text")
    .attr("id", "legMexico")
    .attr("class", "legTitle")
    .attr("x", x(1.2))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#6063ED")
    .attr('z-index', 100)
    .text("Mexico")


    gMap.selectAll('#legIndia')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legIndia")
    .attr("class", "legTitle")
    .attr("x", x(3))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#87D8F7")
    .attr('z-index', 100)
    .text("India")

    gMap.selectAll('#legPhilippines')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legPhilippines")
    .attr("class", "legTitle")
    .attr("x", x(4.8))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#BCE5ED")
    .attr('z-index', 100)
    .text("Philippines")

    gMap.selectAll('#legChina')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legChina")
    .attr("class", "legTitle")
    .attr("x", x(6.6))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#F9C9B5")
    .attr('z-index', 100)
    .text("China")

    gMap.selectAll('#legElSalvador')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legElSalvador")
    .attr("class", "legTitle")
    .attr("x", x(1.2))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#FF7047")
    .attr('z-index', 100)
    .text("El Salvador")

    gMap.selectAll('#legCanada')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legCanada")
    .attr("class", "legTitle")
    .attr("x", x(3))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#FFDB21")
    .attr('z-index', 100)
    .text("Canada")

    gMap.selectAll('#legDR')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legDR")
    .attr("class", "legTitle")
    .attr("x", x(4.8))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#38387C")
    .attr('z-index', 100)
    .text("Dominican Republic")

    gMap.selectAll('#legDR2')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legDR2")
    .attr("class", "legTitle")
    .attr("x", x(1.2))
    .attr("y", y(-.044))
    .attr('text-anchor','middle')
    .attr("fill", "#804f70")
    .attr('z-index', 100)
    .text("Honduras")

    gMap.append("text")
    .attr("id", "legDR2")
    .attr("class", "legTitle")
    .attr("x", x(3))
    .attr("y", y(-.044))
    .attr('text-anchor','middle')
    .attr("fill", "#9B9EA0")
    .attr('z-index', 100)
    .text("N.A.")


    gMap.selectAll('#legCuba')
    .data(csvOrigin)
    .enter()
    .append("text")
    .attr("id", "legCuba")
    .attr("class", "legTitle")
    .attr("x", x(6.6))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#FFA538")
    .attr('z-index', 100)
    .text("Cuba")






//  (d.bpld_2018 =="Cuba") {return "#AD87D1"} else if (d.bpld_2018 =="Dominican Republic") {return "#D2BFF2"} else {return "#9B9EA0"}})


}





  function dotMapRecent() {
    g.selectAll('.tooltipDiv')
        .remove()



    gRecMap.selectAll(".usDotsRecent")

    .data(csvProjection)
    // .transition()
    // .duration(1000)
    .enter()
    .append("circle")
    .attr("class", "usDotsRecent")
    // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
    .attr("r", 29.25)
    .attr("cx", function(d) { return xmap(d.axis_x); })
    .attr("cy", function(d) { return ymap(d.axis_y); })
    .style("fill", function(d) { if (d.recent_bpld1 == "Mexico") {return "#6063ED"} else if (d.recent_bpld1 == "India") {return "#87D8F7"}  else if (d.recent_bpld1 == "Philippines") {return "#BCE5ED"} else if (d.recent_bpld1 == "China") {return "#F9C9B5"} else if (d.recent_bpld1 == "El Salvador") {return "#FF704F"} else if (d.recent_bpld1 =="Canada") {return "#FFDB21"} else if (d.recent_bpld1 =="Cuba") {return "#FFA538"} else if (d.recent_bpld1 =="Dominican Republic") {return "#38387C"} else if (d.recent_bpld1 =="Honduras") {return "#804f70"} else if (d.recent_bpld1 =="Venezuela"){return "#FF9DCE"} else if (d.recent_bpld1 =="Brazil") {return "#DFB182"} else if (d.recent_bpld1 =="Guatemala") {return "#05CE7C"} else if (d.recent_bpld1 == "N.A.") {return "#9B9EA0"} else {return "#a0a1a5"}})
    .on("mouseover", function(d) {
      d3.select(this).attr("r",35);

      if(d.recent_bpld_share1 != "" && d.recent_bpld_share2 != ""&& d.recent_bpld_share3 != "") {

      topPos = window.pageYOffset;

            div4.transition()
                .style("visibility", 'visible')
                .style("display", "inline")
                .style("class", "tooltipDiv")
                .attr("z-index", 999);


            div4.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.recent_bpld1+" ("+ formatPercent(d.recent_bpld_share1)+")"+"</td></tr><tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.recent_bpld2 +" ("+formatPercent(d.recent_bpld_share2)+")"+"</td></tr><tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.recent_bpld3+" ("+formatPercent(d.recent_bpld_share3)+")"+"</td></tr></table>")
                .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.75)+"px" );
            }

          else if(d.recent_bpld_share1 != "" && d.recent_bpld_share2 == "") {

            topPos = window.pageYOffset;

                  div4.transition()
                      .style("visibility", 'visible')
                      .style("display", "inline")
                      .style("class", "tooltipDiv")
                      .attr("z-index", 999);


                  div4.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.recent_bpld1+" ("+ formatPercent(d.recent_bpld_share1)+")"+"</td></tr></table>")
                      .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                      .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.5)+"px" );
                  }

                  else if(d.recent_bpld_share1 != "" && d.recent_bpld_share2 != "" && d.recent_bpld_share3 == "") {

                    topPos = window.pageYOffset;

                          div4.transition()
                              .style("visibility", 'visible')
                              .style("display", "inline")
                              .style("class", "tooltipDiv")
                              .attr("z-index", 999);


                          div4.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.recent_bpld1+" ("+ formatPercent(d.recent_bpld_share1)+")"+"</td></tr><tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.recent_bpld2 +" ("+formatPercent(d.recent_bpld_share2)+")"+"</td></tr></table>")
                              .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                              .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.2)+"px" );
                          }

                    else if (d.recent_bpld_share1 == "" && d.recent_bpld_share2 == "" && d.recent_bpld_share3 == "") {return}

          })
          .on("mouseout", function(d) {

            gRecMap.selectAll(".usDotsRecent").attr("r",29.25);

            gRecMap.selectAll(".tooltipDiv")
             .style("visibility","hidden")
             div4.style("visibility","hidden")

          });
//#5A375C
    // .style("fill",function(d) {return colorWork(d.fbShareColor) })
    // .style("fill",function(d) { if (d.country == "Mexico") {return "#39377e"} else if (d.country == "India") {return "#6a7ef5"}  else if (d.country == "Philippines") {return "#8adcfc"} else if (d.country == "China") {return "#c0eaf1"} else if (d.country == "El Salvador") {return "#ecf2f2"} else {return "#05CE7C"}})

    gRecMap.selectAll(".stateName")

     .data(csvProjection)
     .enter()
     .raise()
     .append("text")
     .attr("class", "stateName")
     .attr("x",function(d) { return xmap(d.axis_x); })
     .attr("y",function(d) { return ymap(d.axis_y)+4; })
     .attr("fill", "white")
     .attr('text-anchor','middle')
     .attr('z-index', 100)
     .text(function(d) {return d.state_abv})


     gRecMap.append("text")
      .attr("class", "titleMap")
      .attr("id", "title2014")
      .attr("x", x(4))
      .attr("y", y(.33))
      .attr('text-anchor','middle')
      .attr("fill", "black")
      .attr('z-index', 100)
      .text("Top Three Countries of Birth for Recent U.S. Immigrants in 2019");


      gRecMap.append("text")
      .attr("id", "legMexico2")
      .attr("class", "legTitle")
      .attr("x", x(1.2))
      .attr("y", y(-.016))
      .attr('text-anchor','middle')
      .attr("fill", "#6063ED")
      .attr('z-index', 100)
      .text("Mexico")



      gRecMap.append("text")
      .attr("id", "legIndia2")
      .attr("class", "legTitle")
      .attr("x", x(3))
      .attr("y", y(-.016))
      .attr('text-anchor','middle')
      .attr("fill", "#87D8F7")
      .attr('z-index', 100)
      .text("India")

      gRecMap.append("text")
      .attr("id", "legPhilippines2")
      .attr("class", "legTitle")
      .attr("x", x(4.8))
      .attr("y", y(-.016))
      .attr('text-anchor','middle')
      .attr("fill", "#BCE5ED")
      .attr('z-index', 100)
      .text("Philippines")

      gRecMap.append("text")
      .attr("id", "legChina2")
      .attr("class", "legTitle")
      .attr("x", x(6.6))
      .attr("y", y(-.016))
      .attr('text-anchor','middle')
      .attr("fill", "#F9C9B5")
      .attr('z-index', 100)
      .text("China")

      gRecMap.append("text")
      .attr("id", "legElSalvador2")
      .attr("class", "legTitle")
      .attr("x", x(1.2))
      .attr("y", y(-.03))
      .attr('text-anchor','middle')
      .attr("fill", "#FF7047")
      .attr('z-index', 100)
      .text("El Salvador")

      // else if (d.recent_bpld1 =="Brazil") {return "#DFB182"}

      gRecMap.append("text")
      .attr("id", "legGuatemala'")
      .attr("class", "legTitle")
      .attr("x", x(3))
      .attr("y", y(-.044))
      .attr('text-anchor','middle')
      // .attr("fill", "#BCE5ED")
      .attr("fill", "#05CE7C")
      .attr('z-index', 100)
      .text("Guatemala")

      gRecMap.append("text")
      .attr("id", "legBrazil")
      .attr("class", "legTitle")
      .attr("x", x(1.2))
      .attr("y", y(-.044))
      .attr('text-anchor','middle')
      .attr("fill", "#DFB182")
      .attr('z-index', 100)
      .text("Brazil")

      gRecMap.selectAll('#legHonduras')
      .data(csvOrigin)
      .enter()
      .append("text")
      .attr("id", "legHonduras")
      .attr("class", "legTitle")
      .attr("x", x(3))
      .attr("y", y(-.03))
      .attr('text-anchor','middle')
      // .attr("fill", "#BCE5ED")
      .attr("fill", "#804f70")
      .attr('z-index', 100)
      .text("Honduras")

      gRecMap.append("text")
      .attr("id", "legDR3")
      .attr("class", "legTitle")
      .attr("x", x(4.8))
      .attr("y", y(-.03))
      .attr('text-anchor','middle')
      .attr("fill", "#38387C")
      .attr('z-index', 100)
      .text("Dominican Republic")

      gRecMap.append("text")
      .attr("id", "legVenezuela")
      .attr("class", "legTitle")
      .attr("x", x(4.8))
      .attr("y", y(-.044))
      .attr('text-anchor','middle')
      .attr("fill", "#FF9DCE")
      .attr('z-index', 100)
      .text("Venezuela")

      gRecMap.append("text")
      .attr("id", "legDR4")
      .attr("class", "legTitle")
      .attr("x", x(6.6))
      .attr("y", y(-.044))
      .attr('text-anchor','middle')
      .attr("fill", "#9B9EA0")
      .attr('z-index', 100)
      .text("N.A.")


      gRecMap.append("text")
      .attr("id", "legCuba2")
      .attr("class", "legTitle")
      .attr("x", x(6.6))
      .attr("y", y(-.03))
      .attr('text-anchor','middle')
      .attr("fill", "#FFA538")
      .attr('z-index', 100)
      .text("Cuba")


  }


function dotMapLanguage() {
  g.selectAll('.tooltipDiv')
      .remove()



  gLangMap.selectAll(".usDotsLanguage")

  .data(csvProjection)
  // .transition()
  // .duration(1000)
  .enter()
  .append("circle")
  .attr("class", "usDotsLanguage")
  // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
  .attr("r", 29.25)
  .attr("cx", function(d) { return xmap(d.axis_x); })
  .attr("cy", function(d) { return ymap(d.axis_y); })
  .attr("fill", function(d) { if (d.language_1 == "Spanish") {return "#39377e"} else if (d.language_1 == "Filipino, Tagalog") {return "#6a7ef5"}  else if (d.language_1 == "English") {return "#8adcfc"} else {return "#D2BFF2"} })
  .on("mouseover", function(d) {
    d3.select(this).attr("r",35);

    if(d.lanShare_1 != "" && d.lanShare_2 != "" && d.lanShare_3 != "") {

    topPos = window.pageYOffset;

          div5.transition()
              .style("visibility", 'visible')
              .style("display", "inline")
              .style("class", "tooltipDiv")
              .attr("z-index", 999);


          div5.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.language_1+" ("+ d.lanShare_1+")"+"</td></tr><tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.language_2 +" ("+ d.lanShare_2+")"+"</td></tr><tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.language_3+" ("+d.lanShare_3+")"+"</td></tr></table>")
              .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
              .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.75)+"px" );
          }

        else if(d.lanShare_1 != "" && d.lanShare_2 == "") {

          topPos = window.pageYOffset;

                div5.transition()
                    .style("visibility", 'visible')
                    .style("display", "inline")
                    .style("class", "tooltipDiv")
                    .attr("z-index", 999);


                div5.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.language_1+" ("+ d.lanShare_1+")"+"</td></tr></table>")
                    .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                    .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.5)+"px" );
                }

                else if(d.lanShare_1 != "" && d.lanShare_2 != "" && d.lanShare_3 == "") {

                  topPos = window.pageYOffset;

                        div5.transition()
                            .style("visibility", 'visible')
                            .style("display", "inline")
                            .style("class", "tooltipDiv")
                            .attr("z-index", 999);


                        div5.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.language_1+" ("+ d.lanShare_1+")"+"</td></tr><tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.language_2 +" ("+d.lanShare_2+")"+"</td></tr></table>")
                            .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                            .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.2)+"px" );
                        }

                  else if (d.lanShare_1 == "" && d.lanShare_2 == "" && d.lanShare_3 == "") {return}

        })
        .on("mouseout", function(d) {


          gLangMap.selectAll(".usDotsLanguage").attr("r",29.25);

        gLangMap.selectAll(".tooltipDiv")
           .style("visibility","hidden")
           div5.style("visibility","hidden")

        });


        d3.select('#Filipino2')
          .remove()


  // .style("fill",function(d) {return colorWork(d.fbShareColor) })
  // .style("fill",function(d) { if (d.country == "Mexico") {return "#39377e"} else if (d.country == "India") {return "#6a7ef5"}  else if (d.country == "Philippines") {return "#8adcfc"} else if (d.country == "China") {return "#c0eaf1"} else if (d.country == "El Salvador") {return "#ecf2f2"} else {return "#05CE7C"}})

  gLangMap.selectAll(".stateName")
   .data(csvProjection)
   .enter()
   .raise()
   .append("text")
   .attr("class", "stateName")
   .attr("x",function(d) { return xmap(d.axis_x); })
   .attr("y",function(d) { return ymap(d.axis_y)+4; })
   .attr("fill", "white")
   .attr('text-anchor','middle')
   .attr('z-index', 100)
   .text(function(d) {return d.state_abv})




   gLangMap.append("text")
    .attr("class", "titleMapLang")
    .attr("id", "titleMapLang2019")
    .attr("x", x(4))
    .attr("y", y(.33))
    .attr('text-anchor','middle')
    .attr("fill", "black")
    .attr('z-index', 100)
    .text("Most Common Languages for U.S. Immigrants in 2019");

//start legend

    gLangMap.append("text")
    .attr("id", "Spanish")
    .attr("class", "legTitle")
    .attr("x", x(2))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#39377e")
    .attr('z-index', 100)
    .text("Spanish")

    gLangMap.append("text")
    .attr("id", "Filipino")
    .attr("class", "legTitle")
    .attr("x", x(4))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#6a7ef5")
    .attr('z-index', 100)
    .text("Filipino")

    gLangMap.append("text")
    .attr("id", "English")
    .attr("class", "legTitle")
    .attr("x", x(6))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#8adcfc")
    .attr('z-index', 100)
    .text("English")

    gLangMap.selectAll(".legTitleLang").remove()


d3.select('#titleMapLang2019_1').remove()
d3.select('#titleMapLang2019_2').remove()



}

function languageTransition() {
  g.selectAll('.tooltipDiv')
      .remove()

  d3.select('#titleMapLang2019').remove()



    gLangMap.selectAll("circle")
          .transition()
          .duration(500)
          .attr("fill", function(d) { if (d.updateLang == "Filipino") {return "#6a7ef5"} else if (d.updateLang == "Amharic & Ethiopian") {return "#844f71"} else if (d.updateLang == "Arabic") {return "#FB594D"} else if (d.updateLang == "Chinese") {return "#FECEBA"} else if (d.updateLang == "Hamitic") {return "#594251"} else if (d.updateLang == "Dravidian") {return "#ff9dce"} else if (d.updateLang == "French") {return "#F1BD03"} else if (d.updateLang == "Hindi") {return "#AD87D1"} else if (d.updateLang == "Portuguese") {return "#FFDB20"} else if (d.updateLang == "Korean") {return "#D2BFF2"} else if (d.updateLang == "Vietnamese") {return "#DB874B"} else {return "#a0a1a5"} })



          gLangMap.selectAll(".titleMapLang2")
                  .remove()
                  .data(csvOrigin)
                  .enter()
                  .append("text")
                  .attr("class", "titleMapLang2")
                  .attr("id", "titleMapLang2019_2")
                  .attr("x", x(4))
                  .attr("y", y(.31))
                  .attr('text-anchor','middle')
                  .attr("fill", "black")
                  .attr('z-index', 100)
                  .text("Excluding English and Spanish")

           gLangMap.append("text")
                   .attr("class", "titleMapLang2")
                   .attr("id", "titleMapLang2019_1")
                   .attr("x", x(4))
                   .attr("y", y(.33))
                   .attr('text-anchor','middle')
                   .attr("fill", "black")
                   .attr('z-index', 100)
                   .text("Most Common Languages for U.S. Immigrants in 2019")

        gLangMap.select('#Spanish')
            .remove()
        gLangMap.select('#Filipino')
            .remove()
        gLangMap.select('#English')
            .remove()

            gLangMap.selectAll('.legTitle')
                .remove()


    gLangMap.append("text")
            .attr("id", "Filipino2")
            .attr("class", "legTitleLang")
            .attr("x", x(6.6))
            .attr("y", y(-.016))
            .attr('text-anchor','middle')
            .attr("fill", "#6a7ef5")
            .attr('z-index', 100)
            .text("Filipino")

    gLangMap.append("text")
            .attr("id", "Amharic")
            .attr("class", "legTitleLang")
            .attr("x", x(6.6))
            .attr("y", y(-.03))
            .attr('text-anchor','middle')
            .attr("fill", "#844f71")
            .attr('z-index', 100)
            .text("Amharic");

    gLangMap.append("text")
            .attr("id", "Arabic")
            .attr("class", "legTitleLang")
            .attr("x", x(4.8))
            .attr("y", y(-.016))
            .attr('text-anchor','middle')
            .attr("fill", "#FB594D")
            .attr('z-index', 100)
            .text("Arabic");

    gLangMap.append("text")
            .attr("id", "Chinese")
            .attr("class", "legTitleLang")
            .attr("x", x(1.2))
            .attr("y", y(-.016))
            .attr('text-anchor','middle')
            .attr("fill", "#FECEBA")
            .attr('z-index', 100)
            .text("Chinese");

    gLangMap.append("text")
            .attr("id", "Hamitic")
            .attr("class", "legTitleLang")
            .attr("x", x(1.2))
            .attr("y", y(-.03))
            .attr('text-anchor','middle')
            .attr("fill", "#594251")
            .attr('z-index', 100)
            .text("Hamitic");

   gLangMap.append("text")
           .attr("id", "Dravidian")
           .attr("class", "legTitleLang")
           .attr("x", x(3))
           .attr("y", y(-.03))
           .attr('text-anchor','middle')
           .attr("fill", "#ff9dce")
           .attr('z-index', 100)
           .text("Dravidian");

   gLangMap.append("text")
           .attr("id", "French")
           .attr("class", "legTitleLang")
           .attr("x", x(4.8))
           .attr("y", y(-.03))
           .attr('text-anchor','middle')
           .attr("fill", "#F1BD03")
           .attr('z-index', 100)
           .text("French");

  gLangMap.append("text")
          .attr("id", "Hindi")
          .attr("class", "legTitleLang")
          .attr("x", x(3))
          .attr("y", y(-.016))
          .attr('text-anchor','middle')
          .attr("fill", "#AD87D1")
          .attr('z-index', 100)
          .text("Hindi");

 gLangMap.append("text")
         .attr("id", "Portuguese")
         .attr("class", "legTitleLang")
         .attr("x", x(1.2))
         .attr("y", y(-.044))
         .attr('text-anchor','middle')
         .attr("fill", "#FFDB20")
         .attr('z-index', 100)
         .text("Portuguese");

         gLangMap.append("text")
                 .attr("id", "Korean")
                 .attr("class", "legTitleLang")
                 .attr("x", x(3))
                 .attr("y", y(-.044))
                 .attr('text-anchor','middle')
                 .attr("fill", "#D2BFF2")
                 .attr('z-index', 100)
                 .text("Korean");

    gLangMap.append("text")
          .attr("id", "Vietnamese")
          .attr("class", "legTitleLang")
          .attr("x", x(4.8))
          .attr("y", y(-.044))
          .attr('text-anchor','middle')
          .attr("fill", "#DB874B")
          .attr('z-index', 100)
          .text("Vietnamese");


}


function dotMapEnglish() {

  var colorWork = d3.scaleThreshold()
        .domain([.65,.7,.75,.8,.85,.9,.95])
        .range(["#e5f9ec","#cbf3d9","#b0ecc6","#93e5b4","#75dea1","#50d68f","#05ce7c"])


  gEngMap.selectAll(".usDotsEnglish")
  .data(csvProjection)
  .enter()
  .append("circle")
  .attr("class", "usDotsEnglish")
  // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
  .attr("r", 29.25)
  .attr("cx", function(d) { return xmap(d.axis_x); })
  .attr("cy", function(d) { return ymap(d.axis_y); })
  .style("fill",function(d) {return colorWork(d.profEng_share) })
  .on("mouseover", function(d) {

    d3.select(this).attr("r",35);


    topPos = window.pageYOffset;

          div6.transition()
              .style("visibility", 'visible')
              .style("display", "inline")
              .attr("z-index", 999);
          div6.html("<span 'class'='title'>"+"Share of immigrants"+"</br>"+"who speak English well  "+"</br>"+"</span>" + formatPercent(d.profEng_share))
              .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
              .style("top", ((d3.event.pageY)-topPos-toolOffHeight)+"px" );
            })
        .on("mouseout", function(d) {

          gEngMap.selectAll(".usDotsEnglish").attr("r",29.25);

          gEngMap.selectAll(".tooltipDiv")
           .style("visibility","hidden")
           div6.style("visibility","hidden")

        });



  gEngMap.selectAll(".stateName")
   .data(csvProjection)
   .enter()
   .raise()
   .append("text")
   .attr("class", "stateName")
   .attr("x",function(d) { return xmap(d.axis_x); })
   .attr("y",function(d) { return ymap(d.axis_y)+4; })
   .attr("fill", "black")
   .attr('text-anchor','middle')
   .attr('z-index', 100)
   .text(function(d) {return d.state_abv})



   gEngMap.append("text")
    .attr("class", "titleMap")
    .attr("id", "title2014")
    .attr("x", x(4))
    .attr("y", y(.33))
    .attr('text-anchor','middle')
    .attr("fill", "black")
    .attr('z-index', 100)
    .text("English Proficiency Among U.S. Immigrants in 2019");


    var legend = gEngMap.append("g")
   .attr("transform", "translate(" + 5*margin.left + "," +  .9*height  + ")")
   .attr("class", "legendTicks");

   var xColor = d3.scaleLinear()
        .domain(padExtent([.65,.95]))
        .range(padExtent([margin.left*.25, .5*width-(2*margin.right)]));


    legend.selectAll("rect")
          .data(colorWork.range().map(function(d) {
              d = colorWork.invertExtent(d);
              if (d[0] == null) d[0] = xColor.domain()[0];
              if (d[1] == null) d[1] = xColor.domain()[1];
              return d;
            }))
          .enter().append("rect")
            .attr("height", 20)
            .attr("x", function(d) { return xColor(d[0]); })
            .attr("y", .1)
            // .attr("width", function(d) { return (x(d[1]) - x(d[0]))*5; })
            .attr("width", function(d) { return (xColor(d[1]) - xColor(d[0])); })
            .attr("fill", function(d) { return colorWork(d[0]); });

            legend.call(d3.axisBottom(xColor)
                .tickSize(25)
                .tickFormat(function(x, i) { if (x==.65) {return "65%"} else if (x==.95) {return "95%"}})
                .tickValues(colorWork.domain()))
                .attr("class","legendTicks")
                .select(".domain")
                .remove();

            // legend.append("text")
            //     .attr("x", function(d) { return xColor(.14); })
            //     .attr("y", 50)
            //     .attr("class","legendAvg")
            //     .style("text-anchor", "middle")
            //     .text("National Average")





            legend.append('text')
                  // .attr("x", function(d) {if (window.innerWidth>750){return margin.left*.25} else {return margin.left*1.25}})
                  .attr("x", function(d) { return xColor(.175); })
                  .attr("y", -10)
                  .attr("class","legendTitle")
                  .style("text-anchor", "left")
                  .style("fill", "#3A3745")
                  .text("English Proficiency")

}


function dotMapHighSk() {


   gHsMap.selectAll(".usDotsHighSk")
          .data(csvProjection)
          .enter()
          .append("circle")
          .attr("r", 29.25)
          .attr("cx", function(d) { return xmap(d.axis_x); })
          .attr("cy", function(d) { return ymap(d.axis_y); })
          .attr("class", "usDotsHighSk")
          .attr("fill", function(d) { if (d.stateHSocc_FB1 == "Education Occupations") {return "#A882CC"} else if (d.stateHSocc_FB1 == "Healthcare Occupations") {return "#87D8F7"}  else if (d.stateHSocc_FB1 == "Management Occupations") {return "#FFDB21"} else if (d.stateHSocc_FB1 == "Computer Occupations") {return "#6B7CF2"} else {return "#9B9EA0"}})
          .on("mouseover", function(d) {
            d3.select(this).attr("r",35);

            if(d.stateHSocc_FBshare1 != "" && d.stateHSocc_FBshare2 != "" && d.stateHSocc_FBshare3 != "") {

            topPos = window.pageYOffset;

                  div7.transition()
                      .style("visibility", 'visible')
                      .style("display", "inline")
                      .style("class", "tooltipDiv")
                      .attr("z-index", 999);


                  div7.html("<span 'class'='title'>"+"Immigrant workers in "+d.statefip +"</span>"+"</br>"+
                  "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.stateHSocc_FB1+" ("+ formatPercent(d.stateHSocc_FBshare1)+")"+"</td></tr>"+
                  "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateHSocc_FB2 +" ("+ formatPercent(d.stateHSocc_FBshare2)+")"+"</td></tr>"+
                  "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateHSocc_FB3+" ("+ formatPercent(d.stateHSocc_FBshare3)+")"+"</td></tr></table>" +"</br>"+
                  "<span 'class'='title'>U.S.-born workers in "+d.statefip +
                  "</span>" + "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateHSocc_NB1+" ("+ formatPercent(d.stateHSocc_NBshare1)+")"+"</td></tr>"+
                  "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateHSocc_NB2 +" ("+ formatPercent(d.stateHSocc_NBshare2)+")"+"</td></tr>"+
                  "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateHSocc_NB3 +" ("+ formatPercent(d.stateHSocc_NBshare3)+")"+"</td></tr></table>")
                      .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                      .style("top", ((d3.event.pageY)-topPos-toolOffHeight*2.5)+"px" )

                }

                else if(d.stateHSocc_FBshare1 != "" && d.stateHSocc_FBshare2 != "" && d.stateHSocc_FBshare3 == "") {

                topPos = window.pageYOffset;

                      div7.transition()
                          .style("visibility", 'visible')
                          .style("display", "inline")
                          .style("class", "tooltipDiv")
                          .attr("z-index", 999);


                      div7.html("<span 'class'='title'>"+"Immigrant workers in "+d.statefip + "</span>"+"</br>"+
                      "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.stateHSocc_FB1+" ("+ formatPercent(d.stateHSocc_FBshare1)+")"+"</td></tr>"+
                      "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateHSocc_FB2 +" ("+ formatPercent(d.stateHSocc_FBshare2)+")"+"</td></tr>"+
                      "</table>" +"</br>"+
                      "<span 'class'='title'>U.S.-born workers"+
                      "</span>" + "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateHSocc_NB1+" ("+ formatPercent(d.stateHSocc_NBshare1)+")"+"</td></tr>"+
                      "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateHSocc_NB2 +" ("+ formatPercent(d.stateHSocc_NBshare2)+")"+"</td></tr>"+
                      "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateHSocc_NB3 +" ("+ formatPercent(d.stateHSocc_NBshare3)+")"+"</td></tr></table>")
                          .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                          .style("top", ((d3.event.pageY)-topPos-toolOffHeight*2.5)+"px" )

                    }

                    else if(d.stateHSocc_FBshare1 != "" && d.stateHSocc_FBshare2 == "") {

                    topPos = window.pageYOffset;

                          div7.transition()
                              .style("visibility", 'visible')
                              .style("display", "inline")
                              .style("class", "tooltipDiv")
                              .attr("z-index", 999);


                          div7.html("<span 'class'='title'>"+"Immigrant workers "+d.statefip +"</span>"+"</br>"+
                          "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.stateHSocc_FB1+" ("+ formatPercent(d.stateHSocc_FBshare1)+")"+"</td></tr>"+
                          "</table>" +"</br>"+
                          "<span 'class'='title'>U.S.-born workers "+d.statefip +"</br>"+
                          "</span>" + "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateHSocc_NB1+" ("+ formatPercent(d.stateHSocc_NBshare1)+")"+"</td></tr>"+
                          "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateHSocc_NB2 +" ("+ formatPercent(d.stateHSocc_NBshare2)+")"+"</td></tr>"+
                          "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateHSocc_NB3 +" ("+ formatPercent(d.stateHSocc_NBshare3)+")"+"</td></tr></table>")
                              .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                              .style("top", ((d3.event.pageY)-topPos-toolOffHeight*2)+"px" )

                        }

                        else {

                        topPos = window.pageYOffset;

                              div7.transition()
                                  .style("visibility", 'visible')
                                  .style("display", "inline")
                                  .style("class", "tooltipDiv")
                                  .attr("z-index", 999);


                              div7.html("<span 'class'='title'>"+"Immigrant workers "+d.statefip +"</span>"+"</br>"+
                              "<p>N.A.</p>"+
                              "<span 'class'='title'>U.S.-born workers "+d.statefip +"</span>"+"</br>"+
                              "</span>" + "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateHSocc_NB1+" ("+ formatPercent(d.stateHSocc_NBshare1)+")"+"</td></tr>"+
                              "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateHSocc_NB2 +" ("+ formatPercent(d.stateHSocc_NBshare2)+")"+"</td></tr>"+
                              "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateHSocc_NB3 +" ("+ formatPercent(d.stateHSocc_NBshare3)+")"+"</td></tr></table>")
                                  .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                                  .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.75)+"px" )

                            }
                  })

                // else if(d.lanShare_1 != "" && d.lanShare_2 == "") {
                //
                //   topPos = window.pageYOffset;
                //
                //         div5.transition()
                //             .style("visibility", 'visible')
                //             .style("display", "inline")
                //             .style("class", "tooltipDiv")
                //             .attr("z-index", 999);
                //
                //
                //         div5.html("<span 'class'='title'>"+"Immigrant workers"+"</br>"+"</span>"+"<table><tr><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.language_1+" ("+ d.lanShare_1+")"+"</td></tr></table>")
                //             .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                //             .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.2)+"px" );
                //         }
                //
                //         else if(d.lanShare_1 != "" && d.lanShare_2 != "" && d.lanShare_3 == "") {
                //
                //           topPos = window.pageYOffset;
                //
                //                 div5.transition()
                //                     .style("visibility", 'visible')
                //                     .style("display", "inline")
                //                     .style("class", "tooltipDiv")
                //                     .attr("z-index", 999);
                //
                //
                //                 div5.html("<span 'class'='title'>"+d.statefip +"</br></span>"+"<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.language_1+" ("+ d.lanShare_1+")"+"</td></tr><tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.language_2 +" ("+d.lanShare_2+")"+"</td></tr></table>" +"</br>"+"<span 'class'='title'>U.S.-born workers"+"</br>"+"</span>" + "<span>"+"#1:  "+"</span>"+ d.stateHSocc_NB1+" ("+ formatPercent(d.stateHSocc_NBshare1)+")"+ "<br/>"+"<span>"+"#2:    "+"</span>"+ d.stateHSocc_NB2 +" ("+formatPercent(d.stateHSocc_NBshare2)+")"+"<br/>"+"<span>"+"#3:    "+"</span>"+ d.stateHSocc_NB3+" ("+formatPercent(d.stateHSocc_NBshare3)+")")
                //                     .style("left", ((d3.event.pageX)- toolOffWidth)+"px")
                //                     .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.2)+"px" );
                //                 }
                //
                //           else if (d.lanShare_1 == "" && d.lanShare_2 == "" && d.lanShare_3 == "") {return}


                .on("mouseout", function(d) {

                  gHsMap.selectAll(".usDotsHighSk").attr("r",29.25);

                gHsMap.selectAll(".tooltipDiv")
                   .style("visibility","hidden")
                   div7.style("visibility","hidden")

                });






          // .on("mouseover", function(d) {
          //
          //   d3.select(this).attr("r",35);
          //
          //   topPos = window.pageYOffset;
          //
          //         div7.transition()
          //             .style("visibility", 'visible')
          //             .style("display", "inline")
          //             .attr("z-index", 999);
          //         div7.html("<span 'class'='title'>"+"Immigrant workers"+"</br>"+"</span>" + "<span>"+"#1:  "+"</span>"+ d.stateHSocc_FB1+" ("+ formatPercent(d.stateHSocc_FBshare1)+")"+ "<br/>"+"<span>"+"#2:    "+"</span>"+ d.stateHSocc_FB2 +" ("+formatPercent(d.stateHSocc_FBshare2)+")"+"</br>"+"<span>"+"#3:    "+"</span>"+ d.stateHSocc_FB3+" ("+formatPercent(d.stateHSocc_FBshare3)+")"+"</br>"+"<span 'class'='title'>U.S.-born workers"+"</br>"+"</span>" + "<span>"+"#1:  "+"</span>"+ d.stateHSocc_NB1+" ("+ formatPercent(d.stateHSocc_NBshare1)+")"+ "<br/>"+"<span>"+"#2:    "+"</span>"+ d.stateHSocc_NB2 +" ("+formatPercent(d.stateHSocc_NBshare2)+")"+"<br/>"+"<span>"+"#3:    "+"</span>"+ d.stateHSocc_NB3+" ("+formatPercent(d.stateHSocc_NBshare3)+")")
          //             .style("left", ((d3.event.pageX)- 1.5*toolOffWidth)+"px")
          //             .style("top", ((d3.event.pageY)-topPos-2*toolOffHeight)+"px" );
          //           })
                // .on("mouseout", function(d) {
                //
                //   gHsMap.selectAll(".usDotsHighSk").attr("r",29.25);
                //
                // gHsMap.selectAll(".tooltipDiv")
                //    .style("visibility","hidden")
                //    div7.style("visibility","hidden")

                // });


  gHsMap.selectAll(".stateName")
   .data(csvProjection)
   .enter()
   .raise()
   .append("text")
   .attr("class", "stateName")
   .attr("x",function(d) { return xmap(d.axis_x); })
   .attr("y",function(d) { return ymap(d.axis_y)+4; })
   .attr("fill", "black")
   .attr('text-anchor','middle')
   .attr('z-index', 100)
   .text(function(d) {return d.state_abv});




   gHsMap.append("text")
    .attr("class", "titleMap")
    .attr("id", "titleHS_2019")
    .attr("x", x(4))
    .attr("y", y(.33))
    .attr('text-anchor','middle')
    .attr("fill", "black")
    .attr('z-index', 100)
    .text("Top Occupations for High-Skilled Immigrants in 2019");


    gHsMap.append("text")
    .attr("id", "computer")
    .attr("class", "legTitle")
    .attr("x", x(1))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#6a7ef5")
    .attr('z-index', 100)
    .text("Computer")

    gHsMap.append("text")
    .attr("id", "NA")
    .attr("class", "legTitle")
    .attr("x", x(1))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#9B9EA0")
    .attr('z-index', 100)
    .text("N.A.")

    gHsMap.append("text")
    .attr("id", "managment")
    .attr("class", "legTitle")
    .attr("x", x(3))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#FFDB21")
    .attr('z-index', 100)
    .text("Management")


    gHsMap.append("text")
    .attr("id", "healthcare")
    .attr("class", "legTitle")
    .attr("x", x(5))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#87D8F7")
    .attr('z-index', 100)
    .text("Healthcare")

    gHsMap.append("text")
    .attr("id", "education")
    .attr("class", "legTitle")
    .attr("x", x(7))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#A882cc")
    .attr('z-index', 100)
    .text("Education")

    gHsMap.select('#titleMapHs2019_1').remove()
    gHsMap.select('#titleMapHs2019_2').remove()


}

function dotMapHighSkTransition() {

  gHsMap.selectAll(".titleMap").remove();

  var grad = gHsMap.append("defs").append("linearGradient").attr("id", "grad")
      .attr("x1", "0%").attr("x2", "0%").attr("y1", "100%").attr("y2", "0%");
  grad.append("stop").attr("offset", "50%").style("stop-color", "#393745");
  grad.append("stop").attr("offset", "50%").style("stop-color", "#ecf2f2");

  gHsMap.append("circle")
      .attr("cx", xmap(100))
      .attr("cy", ymap(150))
      .attr("r", 29.25)
      .attr("id", "legendDot")
      // .attr("visibility",'hidden')
      .attr("fill", "url(#grad)");


  gHsMap
  .append("text")
  .attr("id", "legFB")
  .attr("class", "legText")
  .attr("x", x(1.8))
  .attr("y", y(.27))
  .attr('text-anchor','left')
  .attr("fill", "#000")
  .attr('z-index', 500)
  .text("= Immigrant Workers")

  gHsMap
  .append("text")
  .attr("id", "legFB")
  .attr("class", "legText")
  .attr("x", x(1.8))
  .attr("y", y(.255))
  .attr('text-anchor','left')
  .attr("fill", "#000")
  .attr('z-index', 500)
  .text("= U.S.-born Workers")


  var defs = gHsMap.append("defs")
  .selectAll(".usDotsHighSk")
  .data(csvProjection)
  .enter()
  .append("linearGradient")
  .attr("id", function(d) {
    return "grad" + d.stateHSocc_NBpop1
  })
  .attr("x1", "0%")
  .attr("x2", "0%")
  .attr("y1", "100%")
  .attr("y2", "0%");

  // .attr("x1", "100%")
  // .attr("x2", "0%")
  // .attr("y1", "0%")
  // .attr("y2", "0%");



defs.append("stop")
  .attr("offset", "50%")
  .style("stop-color", function(d) { if (d.stateHSocc_NB1 == "Education Occupations") {return "#A882CC"} else if (d.stateHSocc_NB1 == "Healthcare Occupations") {return "#87D8F7"}  else if (d.stateHSocc_NB1 == "Management Occupations") {return "#FFDB21"} else if (d.stateHSocc_NB1 == "Computer Occupations") {return "#6B7CF2"} else {return "#9B9EA0"}});




  defs.append("stop")
    .attr("offset", "50%")
    .style("stop-color", function(d) { if (d.stateHSocc_FB1 == "Education Occupations") {return "#A882CC"} else if (d.stateHSocc_FB1 == "Healthcare Occupations") {return "#87D8F7"}  else if (d.stateHSocc_FB1 == "Management Occupations") {return "#FFDB21"} else if (d.stateHSocc_FB1 == "Computer Occupations") {return "#6B7CF2"} else {return "#9B9EA0"}});




gHsMap.selectAll(".usDotsHighSk")
  // .data(csvProjection)
  // .enter()
  .transition()
  .duration(100)
  .attr("fill", function(d) {
    return "url(#grad" + d.stateHSocc_NBpop1 + ")"
  })



   // gHsMap.selectAll(".titleMap")
   // .transition()
   // .duration(100)
   //  .text("Top Occupations for High-Skilled Workers,");


   gHsMap.append("text")
           .attr("class", "titleMapHs2")
           .attr("id", "titleMapHs2019_1")
           .attr("x", x(4))
           .attr("y", y(.33))
           .attr('text-anchor','middle')
           .attr("fill", "black")
           .attr('z-index', 100)
           .text("Top Occupations for High-Skilled Workers,")



    gHsMap.append("text")
            .attr("class", "titleMapHs2")
            .attr("id", "titleMapHs2019_2")
            .attr("x", x(4))
            .attr("y", y(.31))
            .attr('text-anchor','middle')
            .attr("fill", "black")
            .attr('z-index', 100)
            .text("Foreign-Born and U.S.-Born, in 2019")

    k=0

}


function dotMapLowSk() {









   gLsMap.selectAll(".usDotsLowSk")
          .data(csvProjection)
          .enter()
          .append("circle")
          .attr("r", 29.25)
          .attr("cx", function(d) { return xmap(d.axis_x); })
          .attr("cy", function(d) { return ymap(d.axis_y); })
          .attr("class", "usDotsLowSk")
          .attr("fill", function(d) {if (d.stateLSocc_FB1 == "Office Administrative Occupations") {return "#BCE5ED"} else if (d.stateLSocc_FB1 == "Sales-Related Occupations") {return "#ff704f"}  else if (d.stateLSocc_FB1 == "Construction and Extraction Occupations") {return "#A882CC"} else if (d.stateLSocc_FB1 == "Production Occupations") {return "#6263f1"} else if (d.stateLSocc_FB1 == "Grounds Maintenance Occupations") {return "#21D177"} else if (d.stateLSocc_FB1 == "Food Service Occupations") {return "#bd884b"} else if (d.stateLSocc_FB1 == "Grounds Occupations") {return "#FFDB21"} else if (d.stateLSocc_FB1 == "Transportation and Material Moving Occupations") {return "#FFDB21"} else if (d.stateLSocc_FB1 == "Healthcare Occupations") {return "#87D8F7"} else {return "#9B9EA0"}})
          .on("mouseover", function(d) {

          d3.select(this).attr("r",35);

          if(d.stateLSocc_FBshare1 != "" && d.stateLSocc_FBshare2 != "" && d.stateLSocc_FBshare3 != "") {

          topPos = window.pageYOffset;

                div8.transition()
                    .style("visibility", 'visible')
                    .style("display", "inline")
                    .style("class", "tooltipDiv")
                    .attr("z-index", 1999);


                div8.html("<span 'class'='title'>"+"Immigrant workers in "+d.statefip +"</span>"+"</br>"+
                "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.stateLSocc_FB1+" ("+ formatPercent(d.stateLSocc_FBshare1)+")"+"</td></tr>"+
                "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateLSocc_FB2 +" ("+ formatPercent(d.stateLSocc_FBshare2)+")"+"</td></tr>"+
                "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateLSocc_FB3+" ("+ formatPercent(d.stateLSocc_FBshare3)+")"+"</td></tr></table>" +"</br>"+
                "<span 'class'='title'>U.S.-born workers in "+d.statefip +"</span>"+"</br>"+
                "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateLSocc_NB1+" ("+ formatPercent(d.stateLSocc_NBshare1)+")"+"</td></tr>"+
                "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateLSocc_NB2 +" ("+ formatPercent(d.stateLSocc_NBshare2)+")"+"</td></tr>"+
                "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateLSocc_NB3 +" ("+ formatPercent(d.stateLSocc_NBshare3)+")"+"</td></tr></table>")
                    .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                    .style("top", ((d3.event.pageY)-topPos-toolOffHeight*2.5)+"px" )

              }

              else if(d.stateLSocc_FBshare1 != "" && d.stateHSocc_FBshare2 != "" && d.stateLSocc_FBshare3 == "") {

              topPos = window.pageYOffset;

                    div8.transition()
                        .style("visibility", 'visible')
                        .style("display", "inline")
                        .style("class", "tooltipDiv")
                        .attr("z-index", 1999);


                    div8.html("<span 'class'='title'>"+"Immigrant workers in "+d.statefip +"</span>"+"</br>"+
                    "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.stateLSocc_FB1+" ("+ formatPercent(d.stateLSocc_FBshare1)+")"+"</td></tr>"+
                    "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateLSocc_FB2 +" ("+ formatPercent(d.stateLSocc_FBshare2)+")"+"</td></tr>"+
                    "</table>" +"</br>"+
                    "<span 'class'='title'>U.S.-born workers in "+d.statefip +"</span>"+"</br>"+
                    "</span>" + "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateLSocc_NB1+" ("+ formatPercent(d.stateLSocc_NBshare1)+")"+"</td></tr>"+
                    "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateLSocc_NB2 +" ("+ formatPercent(d.stateLSocc_NBshare2)+")"+"</td></tr>"+
                    "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateLSocc_NB3 +" ("+ formatPercent(d.stateLSocc_NBshare3)+")"+"</td></tr></table>")
                        .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                        .style("top", ((d3.event.pageY)-topPos-toolOffHeight*2.5)+"px" )

                  }

                  else if(d.stateLSocc_FBshare1 != "" && d.stateLSocc_FBshare2 == "") {

                  topPos = window.pageYOffset;

                        div8.transition()
                            .style("visibility", 'visible')
                            .style("display", "inline")
                            .style("class", "tooltipDiv")
                            .attr("z-index", 1999);


                        div8.html("<span 'class'='title'>"+"Immigrant workers in "+d.statefip +"</span>"+"</br>"+
                        "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+"<td>"+ d.stateLSocc_FB1+" ("+ formatPercent(d.stateLSocc_FBshare1)+")"+"</td></tr>"+
                        "</table>" +"</br>"+
                        "<span 'class'='title'>U.S.-born workers"+
                        "</span>" + "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateLSocc_NB1+" ("+ formatPercent(d.stateLSocc_NBshare1)+")"+"</td></tr>"+
                        "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateLSocc_NB2 +" ("+ formatPercent(d.stateLSocc_NBshare2)+")"+"</td></tr>"+
                        "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateLSocc_NB3 +" ("+ formatPercent(d.stateLSocc_NBshare3)+")"+"</td></tr></table>")
                            .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                            .style("top", ((d3.event.pageY)-topPos-toolOffHeight*2)+"px" )

                      }

                      else {

                      topPos = window.pageYOffset;

                            div8.transition()
                                .style("visibility", 'visible')
                                .style("display", "inline")
                                .style("class", "tooltipDiv")
                                .attr("z-index", 1999);


                            div8.html("<span 'class'='title'>"+"Immigrant workers in "+d.statefip +"</span>"+"</br>"+
                            "<p>N.A.</p>"+
                            "<span 'class'='title'>U.S.-born workers"+
                            "</span>" + "<table><tr class='greyRow'><td class='rankSpace'><span>"+"#1</span></td>"+ "<td>"+d.stateLSocc_NB1+" ("+ formatPercent(d.stateLSocc_NBshare1)+")"+"</td></tr>"+
                            "<tr class='secondRow'><td class='rankSpace'><span>"+"#2"+"</span></td><td>"+ d.stateLSocc_NB2 +" ("+ formatPercent(d.stateLSocc_NBshare2)+")"+"</td></tr>"+
                            "<tr class='greyRow'><td class='rankSpace'>"+"<span>"+"#3"+"</span></td><td>"+ d.stateLSocc_NB3 +" ("+ formatPercent(d.stateLSocc_NBshare3)+")"+"</td></tr></table>")
                                .style("left", ((d3.event.pageX)- toolOffWidth*2.25)+"px")
                                .style("top", ((d3.event.pageY)-topPos-toolOffHeight*1.75)+"px" )

                          }




                    })
                .on("mouseout", function(d) {

                    gLsMap.selectAll(".usDotsLowSk").attr("r",29.25);

                gLsMap.selectAll(".tooltipDiv")
                   .style("visibility","hidden")
                   div8.style("visibility","hidden")

                });


  gLsMap.selectAll(".stateName")
   .data(csvProjection)
   .enter()
   .raise()
   .append("text")
   .attr("class", "stateName")
   .attr("x",function(d) { return xmap(d.axis_x); })
   .attr("y",function(d) { return ymap(d.axis_y)+4; })
   .attr("fill", "black")
   .attr('text-anchor','middle')
   .attr('z-index', 100)
   .text(function(d) {return d.state_abv});

   gLsMap.append("text")
    .attr("class", "titleMap")
    .attr("id", "titleLS")
    .attr("x", x(4))
    .attr("y", y(.33))
    .attr('text-anchor','middle')
    .attr("fill", "black")
    .attr('z-index', 100)
    .text("Top Occupations for Low-Skilled Immigrants in 2019");




    gLsMap.append("text")
    .attr("id", "office")
    .attr("class", "legTitle")
    .attr("x", x(1))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#BCE5ED")
    .attr('z-index', 100)
    .text("Office")

    gLsMap.append("text")
    .attr("id", "construction")
    .attr("class", "legTitle")
    .attr("x", x(1))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#A882CC")
    .attr('z-index', 100)
    .text("Construction")


    gLsMap.append("text")
    .attr("id", "production")
    .attr("class", "legTitle")
    .attr("x", x(3))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#6263f1")
    .attr('z-index', 100)
    .text("Production")

    gLsMap.append("text")
    .attr("id", "sales")
    .attr("class", "legTitle")
    .attr("x", x(7))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#ff704f")
    .attr('z-index', 100)
    .text("Sales")

    gLsMap.append("text")
    .attr("id", "grounds")
    .attr("class", "legTitle")
    .attr("x", x(7))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#21D177")
    .attr('z-index', 100)
    .text("Grounds")


    gLsMap.append("text")
    .attr("id", "food")
    .attr("class", "legTitle")
    .attr("x", x(3))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#bd884b")
    .attr('z-index', 100)
    .text("Food Service")

    gLsMap.append("text")
    .attr("id", "transportation")
    .attr("class", "legTitle")
    .attr("x", x(5))
    .attr("y", y(-.016))
    .attr('text-anchor','middle')
    .attr("fill", "#FFDB21")
    .attr('z-index', 100)
    .text("Transportation")

    gLsMap.append("text")
    .attr("id", "grounds")
    .attr("class", "legTitle")
    .attr("x", x(5))
    .attr("y", y(-.03))
    .attr('text-anchor','middle')
    .attr("fill", "#87D8F7")
    .attr('z-index', 100)
    .text("Healthcare Support")

gLsMap.select("#titleMapHs2018_1").remove()
gLsMap.select("#titleMapHs2018_2").remove()



}

function dotMapLowSkTransition() {

  gLsMap.selectAll(".titleMap").remove();

  var grad = gLsMap.append("defs").append("linearGradient").attr("id", "grad")
      .attr("x1", "0%").attr("x2", "0%").attr("y1", "100%").attr("y2", "0%");
  grad.append("stop").attr("offset", "50%").style("stop-color", "#393745");
  grad.append("stop").attr("offset", "50%").style("stop-color", "#ecf2f2");

  gLsMap.append("circle")
      .attr("cx", xmap(100))
      .attr("cy", ymap(150))
      .attr("r", 29.25)
      .attr("id", "legendDot")
      // .attr("visibility",'hidden')
      .attr("fill", "url(#grad)");


  gLsMap
  .append("text")
  .attr("id", "legFB")
  .attr("class", "legText")
  .attr("x", x(1.8))
  .attr("y", y(.27))
  .attr('text-anchor','left')
  .attr("fill", "#000")
  .attr('z-index', 500)
  .text("= Immigrant Workers")

  gLsMap
  .append("text")
  .attr("id", "legFB")
  .attr("class", "legText")
  .attr("x", x(1.8))
  .attr("y", y(.255))
  .attr('text-anchor','left')
  .attr("fill", "#000")
  .attr('z-index', 500)
  .text("= U.S.-born Workers")




  var defState = gLsMap.append("defs")
  .selectAll(".usDotsLowSk")
  .data(csvProjection)
  .enter()
  .append("linearGradient")
  .attr("id", function(d) {
    return "grad" + d.stateLSocc_NBpop1
  })
  .attr("x1", "0%")
  .attr("x2", "0%")
  .attr("y1", "100%")
  .attr("y2", "0%");



  defState.append("stop")
    .attr("offset", "50%")
    .style("stop-color", function(d) {if (d.stateLSocc_NB1 == "Office Administrative Occupations") {return "#BCE5ED"} else if (d.stateLSocc_NB1 == "Sales-Related Occupations") {return "#ff704f"}  else if (d.stateLSocc_NB1 == "Construction and Extraction Occupations") {return "#A882CC"} else if (d.stateLSocc_NB1 == "Production Occupations") {return "#6263f1"} else if (d.stateLSocc_NB1 == "Grounds Maintenance Occupations") {return "#21D177"} else if (d.stateLSocc_NB1 == "Food Service Occupations") {return "#bd884b"} else if (d.stateLSocc_NB1 == "Grounds Occupations") {return "#FFDB21"} else if (d.stateLSocc_NB1 == "Transportation and Material Moving Occupations") {return "#FFDB21"} else if (d.stateLSocc_NB1 == "Healthcare Occupations") {return "#87D8F7"} else {return "#9B9EA0"}});

  defState.append("stop")
    .attr("offset", "50%")
  .style("stop-color", function(d) {if (d.stateLSocc_FB1 == "Office Administrative Occupations") {return "#BCE5ED"} else if (d.stateLSocc_FB1 == "Sales-Related Occupations") {return "#ff704f"}  else if (d.stateLSocc_FB1 == "Construction and Extraction Occupations") {return "#A882CC"} else if (d.stateLSocc_FB1 == "Production Occupations") {return "#6263f1"} else if (d.stateLSocc_FB1 == "Grounds Maintenance Occupations") {return "#21D177"} else if (d.stateLSocc_FB1 == "Food Service Occupations") {return "#bd884b"} else if (d.stateLSocc_FB1 == "Grounds Occupations") {return "#FFDB21"} else if (d.stateLSocc_FB1 == "Transportation and Material Moving Occupations") {return "#FFDB21"} else if (d.stateLSocc_FB1 == "Healthcare Occupations") {return "#87D8F7"} else {return "#9B9EA0"}});




gLsMap.selectAll(".usDotsLowSk")
  .transition()
  .duration(100)
  .attr("fill", function(d) {
    return "url(#grad" + d.stateLSocc_NBpop1 + ")"
  })

  gLsMap.append("text")
          .attr("class", "titleMapLs2")
          .attr("id", "titleMapHs2018_1")
          .attr("x", x(4))
          .attr("y", y(.31))
          .attr('text-anchor','middle')
          .attr("fill", "black")
          .attr('z-index', 100)
          .text("Foreign-Born and U.S.-Born, in 2019")

   gLsMap.append("text")
           .attr("class", "titleMapLs2")
           .attr("id", "titleMapHs2018_2")
           .attr("x", x(4))
           .attr("y", y(.33))
           .attr('text-anchor','middle')
           .attr("fill", "black")
           .attr('z-index', 100)
    .text("Top Occupations for Low-Skilled Workers,");

}













function handleResize2() {

	// 1. update height of step elements
	var stepHeight1 = Math.floor(window.innerHeight * 0.75);
  var stepHeight2 = Math.floor(window.innerHeight * 0.75);
  var stepHeight3 = Math.floor(window.innerHeight * 0.75);
  var stepHeight4 = Math.floor(window.innerHeight * 0.75);
  var stepHeight5 = Math.floor(window.innerHeight * 0.75);
  var stepHeight6 = Math.floor(window.innerHeight * 0.75);
  var stepHeight7 = Math.floor(window.innerHeight * 0.75);
  var stepHeight8 = Math.floor(window.innerHeight * 0.75);

	step1.style('height', stepHeight1 + 'px');
  step2.style('height', stepHeight2 + 'px');
  step3.style('height', stepHeight3 + 'px');
  step4.style('height', stepHeight4 + 'px');
  step5.style('height', stepHeight5 + 'px');
  step6.style('height', stepHeight6 + 'px');
  step7.style('height', stepHeight7 + 'px');
  step8.style('height', stepHeight8 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
  	graphic2.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
    graphic3.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
    graphic4.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
    graphic5.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
    graphic6.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
    graphic7.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
    graphic8.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

  var chartMargin2 = 32;
	var textWidth2 = text2.node().offsetWidth;
	var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

  var chartMargin3 = 32;
	var textWidth3 = text3.node().offsetWidth;
	var chartWidth3 = graphic3.node().offsetWidth - textWidth3 - chartMargin3;

  var chartMargin4 = 32;
	var textWidth4 = text4.node().offsetWidth;
	var chartWidth4 = graphic4.node().offsetWidth - textWidth4 - chartMargin4;

  var chartMargin5 = 32;
  var textWidth5 = text5.node().offsetWidth;
  var chartWidth5 = graphic5.node().offsetWidth - textWidth5 - chartMargin5;

  var chartMargin6 = 32;
  var textWidth6 = text6.node().offsetWidth;
  var chartWidth6 = graphic6.node().offsetWidth - textWidth6 - chartMargin6;

  var chartMargin7 = 32;
  var textWidth7 = text7.node().offsetWidth;
  var chartWidth7 = graphic7.node().offsetWidth - textWidth7 - chartMargin7;

  var chartMargin8 = 32;
  var textWidth8 = text8.node().offsetWidth;
  var chartWidth8 = graphic8.node().offsetWidth - textWidth8 - chartMargin8;
  // var chartWidth2 = graphic2.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');
  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');
  chart3.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px')
  chart4.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px')
  chart5.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px')
  chart6.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px')
  chart7.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px')
  chart8.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px')

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
  scroller2.resize();
  scroller3.resize();
  scroller4.resize();
  scroller5.resize();
  scroller6.resize();
  scroller7.resize();
  scroller8.resize();

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

  step5.classed('is-active', function (d, j) {
    return j === response.index;
  });

  step6.classed('is-active', function (d, j) {
    return j === response.index;
  });

  step7.classed('is-active', function (d, j) {
    return j === response.index;
  });

  step8.classed('is-active', function (d, j) {
    return j === response.index;
  });


	  chart1.select('p').text(response.index + 1);
    chart2.select('p').text(response.index + 1);
    chart3.select('p').text(response.index + 1);
    chart4.select('p').text(response.index + 1);
    chart5.select('p').text(response.index + 1);
    chart6.select('p').text(response.index + 1);
    chart7.select('p').text(response.index + 1);
    chart8.select('p').text(response.index + 1);


  if (step1._groups[0][0].className === 'step1 is-active' && tableTrig1==1) {

      transitionOrigin()
      tableOriginBack()

  }

  if (step1._groups[0][3].className === 'step1 is-active' && tableTrig1==0) {

    transitionOrigin()

	}

  if (step2._groups[0][0].className === 'step2 is-active' && tableTrig2==1) {




  }

  else if (step2._groups[0][3].className === 'step2 is-active' && tableTrig2==0){

    tableRecent()

  }

  if (step2._groups[0][4].className === 'step2 is-active'  && tableTrig2==0) {

    transitionRecent()

  }

  if (step3._groups[0][0].className === 'step3 is-active') {

    dotMap()

  }


  if (step4._groups[0][0].className === 'step4 is-active') {

  dotMapRecent()

  }

  if (step5._groups[0][0].className === 'step5 is-active') {

  dotMapLanguage()

  }

  if (step5._groups[0][5].className === 'step5 is-active') {

  languageTransition()

  }

  if (step6._groups[0][0].className === 'step6 is-active') {

  dotMapEnglish()

  }

  if (step7._groups[0][0].className === 'step7 is-active') {

  dotMapHighSk()

  }


  if (step7._groups[0][6].className === 'step7 is-active') {

  dotMapHighSkTransition()


  }

  if (step8._groups[0][0].className === 'step8 is-active') {

    dotMapLowSk()

  }

  if (step8._groups[0][1].className === 'step8 is-active') {

    trigger()

  }

  if (step8._groups[0][7].className === 'step8 is-active') {

     dotMapLowSkTransition()


  }



}

function handleContainerEnter2(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
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
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller2.setup({
		// container: '#flipped-scroll',
		// graphic: '.scroll__figure2',
		// text: '.scroll__text2',
		step: '.scroll__text1 .step2',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller3.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text1 .step3',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller4.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text1 .step4',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller5.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text1 .step5',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller6.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text1 .step6',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller7.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text1 .step7',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller8.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text1 .step8',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);




}



function trigger () {
  k=1
}







init();




}








// kick things off
