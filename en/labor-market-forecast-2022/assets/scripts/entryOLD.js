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



var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// parse the date / time;

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var xLineup = d3.scaleLinear().range([100, width]);
var yLineup = d3.scaleLinear().range([height, 100]);
var xfb = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var formatPercent = d3.format(",.1%");

// define the line

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#table-location").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var color = d3.scaleLinear()
  .domain([.06,.3])
  .range(["#ffffff","#05ce7c"]);

  var colorInner = d3.scaleLinear()
    .domain([.06,.3])
    .range(["#ffffff","#9B9EA0"]);









//
// var g = circleSVG_1.append("g") //Set the filter on the container svg
//     // .style("filter", "url(#gooey)")
// 		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");








// var topData =
var familyData = d3.csv("assets/scripts/visualOccupations_updated.csv")
var skillsData = d3.json("assets/scripts/skils_New.json")

Promise.all([familyData, skillsData]).then(startChange);


// d3.csv("assets/scripts/visualOccupations_updated.csv").then(startChange);


 function startChange(data) {

familyData = data[0]
var skillData = data[1]





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
   });





 // var minValue = d3.min(data, function(d) { return d.longGrowth5; })
 // var maxValue = d3.max(data, function(d) { return d.longGrowth5; })

 var minValue = d3.min(familyData, function(d) { return +d.project2Code; })-.04
 var maxValue = d3.max(familyData, function(d) { return +d.project2Code; })+.04
 var radiusScale = d3.scaleSqrt()
   .domain([1000, d3.max(familyData, function(d) { return d.allJobPosts2021; })])
   .range([3, 40])

   var radiusFocus = d3.scaleSqrt()
     // .domain([3800000, 14000000])
     // .range([15, 50])
     .domain([0, 14000000])
     .range([0, 50])

 xLineup.domain([1,22]);
 yLineup.domain([22,1]);
 x.domain([0, d3.max([0,1.3])]);

 y.domain([+minValue, +maxValue])

 ;
 // radiusScale = d3.scaleSqrt()
 //   .domain([0, d3.max(familyData, function(d) { return d.jp2021_5cd; })])
 //   .range([3, 20])




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

     svg.selectAll(".circleTitle")
        .data(familyData)
        .enter()
        .append("text")
        .filter(function(d) {return +d.Round1== 1})
        .attr("class","circleTitle")
        .attr("x",function(d) { return d.x_allJobs })
        .attr('y',function(d) { return (d.y_allJobs+20)})
        .attr('text-anchor',"middle")
        .text(function(d) { return d.name2code })
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

   function innerGrowth() {

     svg.selectAll(".innerDots")
         .data(familyData)
       .enter().append("circle")
        .filter(function(d) { return +d.Round1 == 1 ||  d.Round1== "1"})
         .attr("class","innerDots")
         .attr("stroke", "#9B9EA0")
         .attr("stroke-width", ".5px")
         .attr("r", function(d){return radiusScale(d.allJobPosts2019);})
         .attr("cx", function(d) { return d.x_allJobs})
         // .attr("fill", function(d){return colorInner(d.fbShare_2codeAll);})
         .attr("fill", "#ffffff")
         .attr("cy", function(d) { return (d.y_allJobs-(radiusScale(d.allJobPosts2021)))})


   }

function growth() {


     svg.selectAll(".dots")
        .transition()
        .duration(500)
        .attr("cx", function(d) { return d.x_allGrowth; })
        .attr("cy", function(d) { return d.y_allGrowth-(radiusScale(d.allJobPosts2021));});

        svg.selectAll(".innerDots")
           .transition()
           .duration(500)
           .attr("visibility", "visible")
           .attr("cx", function(d) { return d.x_allGrowth; })
           .attr("cy", function(d) { return d.y_allGrowth-(radiusScale(d.allJobPosts2021));});


    svg.selectAll(".circleTitle")
    .transition()
    .duration(500)
    .attr("x",function(d) { return d.x_allGrowth })
    .attr('y',function(d) { return (d.y_allGrowth+20)})
}

function twoCodeScatter() {

  svg.selectAll(".dots")
     .transition()
     .duration(500)
      .attr("cx", function(d) { return x(d.growth_all2Code); })
      .attr("cy", function(d) { return y(d.project2Code); })

      svg.selectAll(".circleTitle")
      .transition()
      .duration(500)
      .attr("x", function(d) { return x(d.growth_all2Code); })
      .attr("y", function(d) { return y(d.project2Code)-1.2*(radiusScale(d.allJobPosts2021))});

svg.selectAll(".innerDots")
   .attr("visibility", "hidden")
    //   .on('mouseover', d => {
    //
    // });

  // Add the X Axis
  svg.append("g")
  .attr("transform", "translate(0," + height*.8 + ")")
  .attr("class","xAxis")
    .call(d3.axisBottom(x))

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y))
      .attr("class","yAxis");

  svg.append("text")
     .attr("class","x-axisTitle text")
     .attr("x",width/2)
     .attr('y',height*.8+30)
     .attr('text-anchor',"middle")
     .text("Growth Rate 2019-2021")

  svg.append("text")
   .attr("class","y-axisTitle text")
   .attr("x",0)
   .attr('y',height/2)
   .attr('text-anchor',"middle")
   .attr("transform", "translate(" + -500 + "," + height*.74 + ") rotate(270)")
   .text("Projected Growth Rate 2020-2030 (BLS) ")

}

function occFocus() {

  svg.selectAll(".x-axisTitle").attr("visibility","hidden")
  svg.selectAll(".y-axisTitle").attr("visibility","hidden")
  svg.selectAll(".dots").attr("visibility","hidden")
  svg.selectAll(".circleTitle").attr("visibility","hidden")
  svg.selectAll(".xAxis").attr("visibility","hidden")
  svg.selectAll(".yAxis").attr("visibility","hidden")

  svg.selectAll(".focusDots")
      .data(familyData)
    .enter().append("circle")
     .filter(function(d) { return +d.Round4 == 1 ||  d.Round4== "1"})
      .attr("class","focusDots")
      .attr("stroke", "#9B9EA0")
      .attr("stroke-width", ".5px")
      .attr("r", function(d){return radiusFocus(d.employment_2030);})
      .attr("cx", function(d) { return d.x_focus})
      .attr("fill", function(d){return color(d.fbShare_2codeAll);})
      .attr("cy", function(d) { return (d.y_focus-(radiusFocus(d.employment_2030))) })

      svg.selectAll(".focusTitle")
         .data(familyData)
         .enter()
         .append("text")
         .filter(function(d) {return +d.Round4== 1})
         .attr("class","focusTitle")
         .attr("x",function(d) { return d.x_focus })
         .attr('y',function(d) { return (d.y_focus+23)})
         .attr('text-anchor',"middle")
         .text(function(d) { return d.name2code })





}

function occ2020() {
  svg.selectAll(".innerDot_2020")
      .data(familyData)
    .enter().append("circle")
     .filter(function(d) { return +d.Round4 == 1 ||  d.Round4== "1"})
      .attr("class","innerDots_2020")
      .attr("stroke", "#9B9EA0")
      .attr("stroke-width", ".5px")
      .attr("r", function(d){return radiusFocus(d.employment_2020);})
      .attr("cx", function(d) { return d.x_focus})
      // .attr("fill", function(d){return colorInner(d.fbShare_2codeAll);})
      .attr("fill", "#ffffff")
      .attr("cy", function(d) { return (d.y_focus-(radiusFocus(d.employment_2030)))})

}


 function scatter() {

   // Scale the range of the data
   // x.domain([d3.min(data, .5, d3.max(data, function(d) { return d.shortGrowth; }))]);

   // xfb.domain([0, d3.max(data, function(d) { return d.ratio_FB; })]);


   // radiusScale = d3.scaleSqrt()
   //   .domain([0, d3.max(data, function(d) { return d.jp2021_5cd; })])
   //   .range([3, 20])

     var div = d3.select("body").append("div")
         .attr("class", "tooltip")
         .style("opacity", 0);

   // Add the valueline path.
   // svg.append("path")
   //     .data([data])
   //     .attr("class", "line")
   //     .attr("d", valueline);

   svg.selectAll(".dots").attr("visibility", "hidden")
   svg.selectAll(".circleTitle").attr("visibility", "hidden")



   // Add the scatterplot
   svg.selectAll(".dotSmall")
      .data(familyData)
      .enter()
      .append("circle")
      .filter(function(d) {return +d.Round3 == 1})
      .attr("class","dotSmall")
      .attr("r", function(d){return radiusScale(d.jp2021_5cd);})
      .attr("cx", function(d) { return x(d.shortGrowth5); })
      .attr("fill", function(d){return color(d.foreignB5);})
      .attr("cy", function(d) { return y(d.longGrowth5); });
     //   .on('mouseover', d => {
     //
     // });

   // Add the X Axis
   // svg.append("g")
   //     .attr("transform", "translate(0," + height*.739 + ")")
   //     .call(d3.axisBottom(x));
   //
   // // Add the Y Axis
   // svg.append("g")
   //     .call(d3.axisLeft(y));
   //
   // svg.append("text")
   //    .attr("class","x-axisTitle text")
   //    .attr("x",width/2)
   //    .attr('y',height*.739+30)
   //    .attr('text-anchor',"middle")
   //    .text("Growth Rate 2019-2021")
   //
   // svg.append("text")
   //  .attr("class","y-axisTitle text")
   //  .attr("x",5)
   //  .attr('y',width/2)
   //  .attr('text-anchor',"middle")
   //  .attr("transform", "translate(" + -500 + "," + height*.74 + ") rotate(270)")
   //  .text("Projected Growth Rate 2020-2030 (BLS) ")
   //
   //  svg.append("text")
   //   .attr("class","titleText")
   //   .attr("id","percent")
   //   .attr("x",width*.75)
   //   .attr('y',100)
   //   .attr('text-anchor',"middle")
   //   .text("18.0%")
   //
   //   svg.append("text")
   //    .attr("class","text")
   //    .attr("id","fb")
   //    .attr("x",width*.75)
   //    .attr('y',120)
   //    .attr('text-anchor',"middle")
   //    .text("Foreign Born")

    }


      // Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/disjoint-force-directed-graph
function ForceGraph() {




//   const originalLinks = skillData.links.map(d => Object.assign({}, d));
// const originalNodes = skillData.nodes.map(d => Object.assign({}, d));
//
// console.log(originalNodes)
console.log(skillData.nodes.map(d => Object.assign({}, d)))

  var link = svg
      .selectAll(".link")
      .data(skillData.links)
      .join("line")
      .classed("link", true)

  var node = svg
      .selectAll(".node")
      .data(skillData.nodes)
      .join("circle")
      .attr("r", 5)
      .classed("node", true)
      .classed("fixed", d => d.fx !== undefined);






      // yield svg.node();

        const simulation = d3
          .forceSimulation()
          .nodes(skillData.nodes)
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width /4, height/4))
          .force("link", d3.forceLink(skillData.nodes.names))
          // .force("link", d3.forceLink().id(function(d) { return d.name; }))
          .on("tick", tick());

function tick() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  // simulation.node(skillData.nodes)
  //
  //      .start();




  }





///STOP


 function threeCode () {

   svg.select("#percent")
      .attr("visibility", "hidden")

      svg.select("#fb")
         .attr("visibility", "hidden")

     svg.selectAll(".dots")
        // .data(data)
        // .enter()
        .transition()
        .duration(500)
        .attr("visibility", "visibile")
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
      .attr("visibility", "visibible")
      .text("18.0%")

      svg.select("#fb")
         .attr("visibility", "visibible")



     svg.selectAll(".dots")
        // .data(data)
        // .enter()
        .transition()
        .duration(500)
        .attr("visibility", "visibile")
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
      .attr("visibility", "visibible")
      .text("18.9%")

      svg.select("#fb")
         .attr("visibility", "visibible")

     svg.selectAll(".dots")
        .transition()
        .duration(500)
        .attr("r", function(d){ return radiusScale(d.jp2021_5cd);})
        .attr("cx", function(d) { return x(d.shortGrowth5); })
        .attr("fill", function(d){return color(d.foreignB5);})
        .attr("cy", function(d) { return y(d.longGrowth5); })
        .attr("visibility", function(d) {if (d.longGrowth5 <=.095){return "hidden"} else {return "visibile"}})

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
      .attr("visibility", "hidden")

      svg.select("#fb")
         .attr("visibility", "hidden")

     svg.selectAll(".dots")
        .transition()
        .duration(500)
        .attr("r", function(d){ return radiusScale(d.jp2021_3cd);})
        .attr("cx", function(d) { return x(d.shortGrowth3); })
        .attr("fill", function(d){return color(d.foreignB3);})
        .attr("cy", function(d) { return y(d.longGrowth3); })
        .attr("visibility", function(d) {if (d.longGrowth3 <=.095){return "hidden"} else {return "visibile"}})

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
    innerGrowth()
	}

  if (step1._groups[0][2].className === 'step1 is-active' ) {
    growth()
	}

  if (step1._groups[0][3].className === 'step1 is-active' ) {
    twoCodeScatter()
  }

  if (step1._groups[0][4].className === 'step1 is-active' ) {
    occFocus()

  }

  if (step1._groups[0][5].className === 'step1 is-active' ) {
    ForceGraph()


  }
  if (step1._groups[0][6].className === 'step1 is-active' ) {

  }
  if (step1._groups[0][7].className === 'step1 is-active' ) {

  }


}


function handleStepEnter3(response) {


  step2.classed('is-active', function (d, j) {
    return j === response.index;
  });


    chart2.select('p').text(response.index + 1);


 if (step2._groups[0][0].className === 'step2 is-active' ){


  }


 if (step2._groups[0][1].className === 'step2 is-active'){



  }

  if (step2._groups[0][2].className === 'step2 is-active'){



  }

 if (step2._groups[0][3].className === 'step2 is-active'  ) {



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
