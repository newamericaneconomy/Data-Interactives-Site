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

var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };

function myFunction() {
  if (window.innerWidth < 575) {
    var x = document.getElementById("hideNav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }

  }
  else {return }

}


// var div = d3.select("#svgDiv").append("div")
//     .attr("class", "tooltip")
//     .style("background", "#fff")
//     .style("position", "absolute")
//     .style("z-index", 999);

    var container1 = d3.select('#container-scroll1');
    var graphic1 = container1.select('.scroll__figure1');
    var chart1 = graphic1.select('.figure__chart1');
    var text1 = container1.select('.scroll__text1');
    var step1 = text1.selectAll('.step1');

    var container2 = d3.select('#container-scroll2');
    var graphic2 = container2.select('.scroll__figure2');
    var chart2 = graphic2.select('.figure__chart2');
    var text2 = container2.select('.scroll__text2');
    var step2 = text2.selectAll('.step2');

    var container3 = d3.select('#container-scroll3');
    var graphic3 = container3.select('.scroll__figure3');
    var chart3 = graphic3.select('.figure__chart3');
    var text3 = container3.select('.scroll__text3');
    var step3 = text3.selectAll('.step3');


    var container4 = d3.select('#container-scroll4');
    var graphic4 = container4.select('.scroll__figure4');
    var chart4 = graphic4.select('.figure__chart4');
    var text4 = container4.select('.scroll__text4');
    var step4 = text4.selectAll('.step4');

    var container5 = d3.select('#container-scroll5');
    var graphic5 = container5.select('.scroll__figure5');
    var chart5 = graphic5.select('.figure__chart5');
    var text5 = container5.select('.scroll__text5');
    var step5 = text5.selectAll('.step5');

    var container6 = d3.select('#container-scroll6');
    var graphic6 = container6.select('.scroll__figure6');
    var chart6 = graphic6.select('.figure__chart6');
    var text6 = container6.select('.scroll__text6');
    var step6 = text6.selectAll('.step6');

    var container7 = d3.select('#container-scroll7');
    var graphic7 = container7.select('.scroll__figure7');
    var chart7 = graphic7.select('.figure__chart7');
    var text7 = container7.select('.scroll__text7');
    var step7 = text7.selectAll('.step7');

    var container8 = d3.select('#container-scroll8');
    var graphic8 = container8.select('.scroll__figure8');
    var chart8 = graphic8.select('.figure__chart8');
    var text8 = container8.select('.scroll__text8');
    var step8 = text8.selectAll('.step8');


    var mapToggle1 = 0
    var mapToggle2 = 0
    var mapToggle3 = 0
    var lineToggle = 0





    var scroller1 = scrollama();
    var scroller2 = scrollama();
    var scroller3 = scrollama();
    var scroller4 = scrollama();
    var scroller5 = scrollama();
    var scroller6 = scrollama();
    var scroller7 = scrollama();
    var scroller8 = scrollama();


    var selectState = 'United States';

var popStack = d3.csv("assets/PopStackedChart00_18Final.csv")
var lineGraph = d3.csv("assets/USgrowthRate.csv")
var mapData = d3.json("https://unpkg.com/us-atlas@1/us/10m.json")

var formatPercent = d3.format(",.1%")
var formatComma = d3.format(",");
var mapGlobal = 0
var map2Global = 0
var map3Global = 0
var geoGlobal = 0
var njerGlobal = 0
var michGlobal = 0


Promise.all([popStack, lineGraph, mapData]).then(start);


function start(data) {

  var csv=data[0]
  var line=data[1]

  var dataTime = [...new Set(csv.map(d => +d.year))]

  var year   = [...new Set(csv.map(d => +d.year))]
	var states = [...new Set(csv.map(d => d.statefip))]
	var ageCohort = [...new Set(csv.map(d => d.age_cohorts))]
	var foreignborn2 = [...new Set(csv.map(d => +d.foreignBorn))]
	var nativeborn2 = [...new Set(csv.map(d => +d.nativeBorn))]
	var forWorkPer = [...new Set(csv.map(d => +d.foreignWorkPer))]
  var workNat = [...new Set(csv.map(d => +d.workNat))]
  var workFor = [...new Set(csv.map(d => +d.workFor))]
  var TotalWork = [...new Set(csv.map(d => +d.TotalWork))]






	var svgBar = d3.select("#svgDiv"),
		margin = {top: 60, left: 10, bottom: 100, right: 10},
    width = +svgBar.attr("viewBox").split(" ")[2]-margin.left-margin.right,
    height = +svgBar.attr("viewBox").split(" ")[3],



		// width = +svgBar.attr("width") - margin.left - margin.right,
		// height = +svgBar.attr("height") - margin.top - margin.bottom,
		halfAxis = width/2,
		gutter = width*.03;

	var bands = svgBar.append("rect")
	.attr("x", -10)
	.attr("y", height*.305)
	.attr("width", width*1.3)
	.attr("height", height*.327)
	.attr("fill", "#FECEBA")
	.attr('class',"bands")
	.attr('z-index',-5)

	var perText

  var x = d3.scaleLinear()
		.range([0, halfAxis-margin.right-gutter])

	var xL = d3.scaleLinear()
		.range([0, halfAxis-margin.left-gutter])

	var y = d3.scaleBand()
		.rangeRound([height - margin.bottom, margin.top])
		.padding(0.3)

	var yL = d3.scaleBand()
		.rangeRound([height - margin.bottom, margin.top])
		.padding(0.3)


	var yAxis = svgBar.append("g")
		.attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
		.attr("class", "y-axis")

	var xAxis = svgBar.append("g")
		.attr("transform", `translate(${halfAxis+gutter+margin.left},${height - margin.bottom})`)
		.attr("class", "x-axis")

	var yAxisL = svgBar.append("g")
		.attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
		.attr("class", "y-axisL")

	var xAxisL = svgBar.append("g")
		.attr("transform", `translate(${margin.left},${height - margin.bottom})`)
		.attr("class", "x-axisL")


	svgBar.selectAll(".y-axis")
			.call(d3.axisLeft(y)
			.tickPadding(10)
			.tickSize(0))
			.style('stroke','white')
			.style('fill', 'none')
			.style('stroke-width', '0px');

	// Time
  //var dataTime = d3.range(0, 18).map(function(d) {
  //  return new Date(2000 + d, 10, 3);
  //});

var geoBar = d3.select("#geoBar")
var michBar = d3.select("#michBar")
var njerBar = d3.select("#njerBar")
var svg = d3.select("#chart");

  chart(csv)







	function update(input, speed) {

    d3.selectAll("svg").remove


    		svgBar.selectAll(".percentText")
    		.remove()

        svgBar.selectAll(".workUSText")
        .remove()

        svgBar.selectAll(".workForText")
        .remove()

        svgBar.selectAll(".workTotText")
        .remove()

        svgBar.selectAll(".yearText")
        .remove()



        svgBar.selectAll(".chartTitle")
        .remove()

    // bands.append("rect")
    // 	.attr("x", 0)
    // 	.attr("y", height*.25)
    // 	.attr("width", width)
    // 	.attr("height", height*.75)
    // 	.attr("fill", "green")
    // 	.attr('class',"bands")


    		var yearSelect = input


    		var dataFilter = csv.filter(function(d) { return d.year == yearSelect;})
    			   .filter(function(d) { return d.statefip == "United States";});

        //IMPORTANT - this will make the slider adjust.  For the main tool, do this!!!  for cases don't
    		// var max = d3.max(dataFilter, function(d) { return +d.nativeBorn; });
        var max = 24000000
    		// x2.domain(1000000,0)

    		x.domain([0, max]).nice();
    		xL.domain([max,0]).nice();



    			svgBar.selectAll(".y-axis")
    			.call(d3.axisLeft(y)
    			.tickPadding(10)
    			.tickSize(0))
    			.style('stroke','white')
    			.style('fill', 'none')
    			.style('stroke-width', '0px');

    		y.domain(dataFilter.map(d => d.age_cohorts));
    		yL.domain(dataFilter.map(d => d.age_cohorts));

    		svgBar.selectAll(".x-axis")
    			.call(d3.axisBottom(x).tickSizeOuter(0).ticks(8, "s"))

    		svgBar.selectAll(".x-axisL")
    			.call(d3.axisBottom(xL).tickSizeOuter(0).ticks(8, "s"))



           	var bars = svgBar.selectAll( '.bars' ).data(dataFilter)
        	var bars2 = svgBar.selectAll( '.bars2' ).data(dataFilter)

        	bars.transition().duration(500)
                .attr("x", x(0)+halfAxis+gutter+margin.left)
                .attr("width", function(d) { return x(+d.foreignBorn); })

            bars2.transition().duration(500)
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })



        	bars.exit().remove();
        	bars2.exit().remove();



        	bars.enter().append( 'rect' )
              .attr("class", "bars")
              .attr("y",function(d) { return y(d.age_cohorts); })
                // .call(log, function(d) { return x(+d.nativeBorn)+halfAxis+margin; })
              .attr("height", y.bandwidth())
              .attr("x", x(0)+halfAxis+gutter+margin.left)
              .attr("width", function(d) { return x(+d.foreignBorn); })
              .attr('fill', "#6263F1");

    		bars2.enter().append('rect')
    			.attr("class", "bars2")
                .attr("y",function(d) { return yL(d.age_cohorts); })
                // .call(log, function(d) { return xL(+d.foreignBorn)+halfAxis; })
                .attr("height", yL.bandwidth())
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })
                .attr('fill', "#FF7150");


    	var percentStart = svgBar.append('text')
    		.data(dataFilter)
    		.attr('x',width*.82)
    		.attr('y',height*.51)
    		.attr('class',"percentText")
    		.attr('z-index',10)
    		.attr('fill', "white")
    		.text(function(d) {return formatPercent(d.foreignWorkPer)});

        var perTextStart = svgBar.append('text')
      		.data(dataFilter)
      		.attr('x',width*.82)
      		.attr('y',height*.585)
      		.attr('class',"titleOrange")
      		.attr('z-index',10)
      		.attr('fill', "white")
      		.text("Foreign Born");

          var workingAgeStart = svgBar.append('text')
        		.attr('x',width*-.32)
        		.attr('y',height*.05)
        		.attr('class',"sideAge")
        		.attr('z-index',10)
        		.attr('fill', "white")
            .style("text-anchor", "end")
            .attr("transform", "translate(0," + height + ")")
            .attr("transform", "rotate(-90)")
        		.text("Working Age");

        var yearTextStart = svgBar.append('text')
          .data(dataFilter)
          .attr('x',width*.82)
          .attr('y',height*.39)
          .attr('class',"yearText")
          .attr('z-index',10)
          .attr('fill', "white")
          .text(function(d) {return (d.year)});
    		// .text(dataFilter.map(d => d.foreignWorkPer[0]));

      var workUSText = svgBar.append('text')
        .data(dataFilter)
        .attr('x',width*.245)
        .attr('y',height*.915)
        .attr('class',"workUSText")
        .attr('z-index',10)
        .attr('fill', "#FF7150")
        .text(function(d) {return "U.S.-Born Working Age: "+formatComma(d.workNat)});

      var workForText = svgBar.append('text')
        .data(dataFilter)
        .attr('x',width*.78)
        .attr('y',height*.915)
        .attr('class',"workForText")
        .attr('z-index',10)
        .attr('fill', "#6263F1")
        .text(function(d) {return "Foreign-Born Working Age: "+formatComma(d.workFor)});

      var workTotal = svgBar.append('text')
        .data(dataFilter)
        .attr('x',width*.5)
        .attr('y',height*.97)
        .attr('class',"workTotText")
        .attr('z-index',10)
        .attr('fill', "#393745")
        .text(function(d) {return "National Total Working Age: "+formatComma(d.TotalWork)});

        var chartTitle = svgBar.append('text')
          .data(dataFilter)
          .attr('x',width*.5)
          .attr('y',height*.05)
          .attr('class',"chartTitle")
          .attr('fill', "#393745")
          .text("U.S. Population by Age and Nativity");


}

update(2000,100)


//Starting the DATA VIZ for the LINE GRAPH



function lineChart(data) {

  d3.selectAll(".mobileTitle").remove()






  // var parseDate = d3.time.format("%Y-%m-%d").parse;

  var svgline = d3.select("#svgLineContain")


      var marginLine = {top: 60, right:20, bottom: 10, left:20};



      var widthLine  = +svgline.attr("viewBox").split(" ")[2] - marginLine.left - marginLine.right
      var heightLine = +svgline.attr("viewBox").split(" ")[3] - marginLine.top - marginLine.bottom



      // if (window.innerWidth<=650) {marginLine = {top: winHeight*.05, right: winWidth*.05, bottom: winHeight*.33, left: winWidth*.05}};

      // var = winWidth - marginLine.left - marginLine.right,// Use the window's width
      //      = winHeight - marginLine.top - marginLine.bottom; // Use the window's height

  svgline.attr("width", widthLine)
  .attr("height", heightLine)
  .append("g")

  .attr("class","lineSVG");




  var lineData = data.sort(function(d){
     return d3.ascending(d.Year);
  })







  var xLine = d3.scaleLinear()
      .domain([1960, 2019])
      .range([0, widthLine]);

  var yLine = d3.scaleLinear()
      .domain([0, .02])
      .range([heightLine, 0]);


  var xScale = d3.scaleLinear()
      .domain([1960, 2019]) // input
      .range([0, widthLine]); // output  + marginLine.left + marginLine.right

  var yScale = d3.scaleLinear()
      .domain([0, .02]) // input
      .range([heightLine, 0]); // output

  var formatYear = d3.timeFormat("%y")

  svgline
    .append("text")
    .attr('x',widthLine*.5)
    .attr('y',0)
    .attr('class',"mobileTitle")
    .attr('fill', "#393745")
    .style("text-anchor", "middle")
    .text("U.S. Population Growth Rate");


    svgline
      .append("text")
      .attr('x',widthLine*.5)
      .attr('y', function(d) {if (window.innerWidth < 575) {return marginLine.top*.6 } else {return marginLine.top*.5}})
      .attr('class',"mobileTitle")
      .attr('fill', "#393745")
      .style("text-anchor", "middle")
      .text("from 1960-2019");




  var line = d3.line()
        .x(function(d) {return xLine(d.Year);})
        .y(function(d) {return yLine(d.NumRate);})
        .curve(d3.curveMonotoneX)


          var heightTransform = heightLine + marginLine.top









      // 3. Call the x axis in a group tag
      svgline
          .append("g")
          .attr("class", "xLine")
          .attr("transform", "translate("+marginLine.left+"," + heightTransform + ")")
          .call(d3.axisBottom(xScale)
          .tickFormat(d3.format("d")));// Create an axis component with d3.axisBottom


      // 4. Call the y axis in a group tag
      svgline
          .append("g")
          .attr("class", "yLine")
          .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
          .call(d3.axisLeft(yScale)
          .tickFormat(d3.format(",.1%"))); // Create an axis component with d3.axisLeft

          // data is created inside the function so it is always unique


            // Uncomment following line to clear the previously drawn line
            //svg.selectAll("path").remove();

            // Set a light grey class on old paths

            var pathLine = svgline.selectAll('.line')
              .data(lineData)
              .enter()
              .append("path")
              .attr("d", line(lineData))
              .attr("class", "line")
              .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
              .attr("fill", "none");



            // var totalLength = pathLine.node().getTotalLength();
            //
            // pathLine
            //   .attr("stroke-dasharray", totalLength + " " + totalLength)
            //   .attr("stroke-dashoffset", totalLength)
            //   .transition()
            //     .duration(4000)
            //     .ease(d3.easeLinear)
            //     .attr("stroke-dashoffset", 0)

      var i = 0;



      svgline.selectAll(".dot")
          .data(lineData)
          .enter()
          .append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("cx", function(d) { return xScale(d.Year) ;})
          .attr("cy", function(d) { return yScale(d.NumRate) ;})
          .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
          .attr("r", 6)
          .attr("id",function(d) { return "id" +d.Year ;})

          var growthRateY = svgline.append('text')
        		.attr('x',widthLine*-.225)
        		.attr('y',-30)
        		.attr('class',"sideGrowth")
        		.attr('z-index',10)
        		.attr('fill', "#393745")
            .style("text-anchor", "end")
            .attr("transform", "translate(0," + height + ")")
            .attr("transform", "rotate(-90)")
        		.text("U.S. Population Growth Rate");


            var yearRate = svgline.append('text')
          		.attr('x',widthLine*.5)
          		.attr('y',heightLine+110)
          		.attr('class',"bottomYear")
          		.attr('z-index',10)
          		.attr('fill', "#393745")
              .style("text-anchor", "middle")
          		.text("Year");

              // var rateTitle = svgline.append('text')
            	// 	.attr('x',width*.5)
            	// 	.attr('y',height*-.01)
              //   .attr("class", "titleRate")
            	// 	.attr('z-index',10)
            	// 	.attr('fill', "#393745")
              //   .style("text-anchor", "middle")
            	// 	.text("U.S. Growth Rate from 1960-2019");





          function firstBox () {

            svgline.append('text')
            .attr("x", xScale(1961)+10)
            .attr("y", yScale(0.0167)-40)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"firstRate")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .transition()
            .duration(500)
            .text("1.7%");

            svgline.append('text')
            .attr("x", xScale(1961)+10)
            .attr("y", yScale(0.0167)-20)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"firstRateYear")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .transition()
            .duration(500)
            .text("1961");


            svgline.append('text')
            .attr("x", xScale(1971))
            .attr("y", yScale(0.0127)-40)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('id',"secondRate")
            .attr('visibility',"hidden")
            .transition()
            .duration(500)
            .text("1.3%");

            svgline.append('text')
            .attr("x", xScale(1971))
            .attr("y", yScale(0.0127)-20)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"secondRateYear")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .transition()
            .duration(500)
            .text("1971");



           //  svgline.select("#id1971")
           //  .append('div')
           //  .style("top",yScale(0.0127)-20+"px")
           // .style("left",xScale(1971)+"px")
           // .style("width",20 + "px")
           // .style("height",20 + "px")
           //  .attr('class',"tooltip2")
           //  // .attr("text-anchor","middle")
           //  .attr('z-index',100)
           //  .text("1.3%");



            svgline.append('text')
            .attr("x", xScale(1979))
            .attr("y", yScale(0.0111)-40)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('z-index',10)
            .attr('id',"thirdRate")
            .attr("text-anchor","middle")
            .attr('visibility',"hidden")
            .text("1.1%");

            svgline.append('text')
            .attr("x", xScale(1979))
            .attr("y", yScale(0.0111)-20)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"thirdRateYear")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .text("1979");


            svgline.append('text')
            .attr("x", xScale(1992))
            .attr("y", yScale(0.0140)-40)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('id',"fourthRate")
            .attr('visibility',"hidden")
            .text("1.4%");

            svgline.append('text')
            .attr("x", xScale(1992))
            .attr("y", yScale(0.0140)-20)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"fourthRateYear")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .text("1992");


            svgline.append('text')
            .attr("x", xScale(2003))
            .attr("y", yScale(0.0086)+30)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('id',"fifthRate")
            .attr('visibility',"hidden")
            .text(".9%");

            svgline.append('text')
            .attr("x", xScale(2003))
            .attr("y", yScale(0.0086)+50)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"fifthRateYear")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .text("2003");


            svgline.append('text')
            .attr("x", xScale(2013))
            .attr("y", yScale(0.0070)+30)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('id',"sixthRate")
            .attr('visibility',"hidden")
            .text(".7%");

            svgline.append('text')
            .attr("x", xScale(2013))
            .attr("y", yScale(0.0070)+50)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"sixthRateYear")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .text("2013");


            svgline.append('text')
            .attr("x", xScale(2019))
            .attr("y", yScale(0.0061)+30)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('id',"seventhRate")
            .attr('visibility',"hidden")
            .text(".6%");

            svgline.append('text')
            .attr("x", xScale(2019))
            .attr("y", yScale(0.0061)+50)
            .attr('transform','translate('+ [marginLine.left, marginLine.top] +")")
            .attr('class',"tooltip2")
            .attr('id',"seventhRateYear")
            .attr("text-anchor","middle")
            .attr('z-index',10)
            .attr('visibility',"hidden")
            .text("2019");



          }




          firstBox()






          // .on("mouseover",handleMouseOverLine)
          // .on("mouseout", handleMouseOutLine);


      // var i = 1960
      //
      // var dot = d3.interval(function(elapsed) {
      //     svgline.select("#id"+i)
      //        .transition()
      //        .duration(8000)
      //        .style("visibility", "visible")
      //     i = i+1
      //     if (i ==2020) dot.stop();
      //   }, 65);

      }


      function makeVisible() {

        d3.select("#firstRate")
                .transition()
                .duration(500)
                .attr('visibility',"visible")

                d3.select("#secondRate")
                        .transition()
                        .duration(4000)
                        .attr('visibility',"visible")

                        d3.select("#firstRateYear")
                                .transition()
                                .duration(500)
                                .attr('visibility',"visible")

                                d3.select("#secondRateYear")
                                        .transition()
                                        .duration(4000)
                                        .attr('visibility',"visible")

      }

      function makeVisible2() {

        d3.select("#thirdRate")
                .transition()
                .duration(500)
                .attr('visibility',"visible")

                d3.select("#fourthRate")
                        .transition()
                        .duration(4000)
                        .attr('visibility',"visible")

                        d3.select("#fifthRate")
                                .transition()
                                .duration(8000)
                                .attr('visibility',"visible")

                                d3.select("#thirdRateYear")
                                        .transition()
                                        .duration(500)
                                        .attr('visibility',"visible")

                                        d3.select("#fourthRateYear")
                                                .transition()
                                                .duration(4000)
                                                .attr('visibility',"visible")

                                                d3.select("#fifthRateYear")
                                                        .transition()
                                                        .duration(8000)
                                                        .attr('visibility',"visible")

      }


      function makeVisible3() {

        d3.select("#sixthRate")
                .transition()
                .duration(500)
                .attr('visibility',"visible");

        d3.select("#seventhRate")
              .transition()
              .duration(4000)
              .attr('visibility',"visible");

        d3.select("#sixthRateYear")
              .transition()
              .duration(500)
              .attr('visibility',"visible")

        d3.select("#seventhRateYear")
              .transition()
              .duration(4000)
              .attr('visibility',"visible")

      }


//IMPORTANT   Start map






      function greenMap (data) {
        d3.selectAll(".feature").remove()
        d3.selectAll(".upFrontState").remove()
        d3.selectAll(".georgia").remove()
        d3.selectAll('.caseTitle').remove()

        var mapUS = d3.select("#svgMap"),
            svgWidth = +mapUS.attr("viewBox").split(" ")[2],
            svgHeight = +mapUS.attr("viewBox").split(" ")[3];




            mapUS.append("circle")
            .attr("cx", svgWidth*.5)
            .attr("cy", svgHeight*.5)
            .attr("r", 20)
            .style("fill", "black")
            .attr("class", "bogus");










// lookup svg width and height from DOM instead of hard-coding values


// get reference to the <rect> node, which is invisible and in the background
// wire up a click listener so that the brought up feature can be "reset" later
        // var rect = mapUS.select("rect.background").on("click", reset);

// get reference to the <g> node
// geojson features will be drawn here
        var g = mapUS.select("g");


// the D3 geographic path generator is used for drawing the svg paths of geojson
// and during bounding box calculations
        var geoPathGenerator = d3.geoPath();

// transition-related vars
        var activeFeature = d3.select(null),
                transitionDuration = 1000,
                featureStrokeWidth = 0.75,
                featureStroke = "#fff",
                featureFill = "#21d279",
                broughtUpFeatureStrokeWidth = 1.75,
                broughtUpFeatureStroke = "#21d279",
                broughtUpFeatureFill = "#fff";


// var promises = [
//   d3.json("https://unpkg.com/us-atlas@1/us/10m.json"),
// ]
  var allStatesGeoJsonData = topojson.feature(
    data,
    data.objects.states
  );

  mapUS.append("text")
  .attr('x',svgWidth*.37)
  .attr('y',svgHeight*.9)
  .attr('class',"hiddenMapTitle")
  .attr('z-index',100)
  .attr('fill', "white")
  .style("opacity", 0)
  .text("Map of U.S.");



    mapUS.selectAll("path")
      .data(allStatesGeoJsonData.features)
      .enter()
      .append("path")
      .attr("d", geoPathGenerator)
      .attr("id", function (d) {return "id"+d.id;})
      .attr("class", "feature")
      // .style("fill", function (d) {if (d.id=="06" || d.id=="46" || d.id=="53" || d.id=="41" || d.id=="04" || d.id=="16" || d.id=="32" || d.id=="49" || d.id=="08" || d.id=="38" || d.id=="47"|| d.id=="08"|| d.id=="51"|| d.id=="37"|| d.id=="13"|| d.id=="10"|| d.id=="11"|| d.id=="12"|| d.id=="45" || d.id=="48"){return "#21d279"} else {return "#E2EAEA"}})
      .style("fill", "#E2EAEA")
      // // .on("click", bringUpFeature);

      mapUS.selectAll("path")
           .data(allStatesGeoJsonData.features)
           .enter()
           .attr("d", geoPathGenerator)
           .attr("id", "greenMap")




      d3.selectAll(".bogus")
        .remove()


        var fastTitle = mapUS.append('text')
          .attr('x',svgWidth*.5)
          .attr('y',svgHeight*.05)
          .attr('class',"chartTitleMap")
          .attr('fill', "#393745")
          .text("Fast-Growing States");





// function reset() {
//
//   g.selectAll("path")
//     .transition()
//     .duration(transitionDuration)
//     .style("stroke-width", "0.75px")
//     .style("stroke", featureStroke)
//     .style("fill", featureFill)
//     .attr("transform", "");
//
//   var otherFeatures = g.selectAll("path.feature:not(.active-feature)");
//
//   // reset display of other features before transitioning back into view
//   otherFeatures.style("display", "");
//
//   otherFeatures
//     .transition()
//     .duration(transitionDuration)
//     .style("opacity", "1")
//     .on("end", function(d, idx, nodeList) {
//       // reestablish the original click listener after transition is over
//       if (idx === nodeList.length - 1) {
//         otherFeatures.on("click", bringUpFeature);
//       }
//     });
//
//   activeFeature.classed("active-feature", false);
//   activeFeature = d3.select(null);
// }


      }

function slowGreen () {

  var mapUS = d3.select("#svgMap")

    mapUS.selectAll("#id06").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id46").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id53").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id41").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id04").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id16").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id32").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id49").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id08").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id38").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id47").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id51").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id37").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id13").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id10").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id11").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id12").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id45").transition().duration(750).style("fill", "#21d279")
    mapUS.selectAll("#id48").transition().duration(750).style("fill", "#21d279")



}


function bringUpFeature(data) {

  var mapUS = d3.select("#svgMap");

// lookup svg width and height from DOM instead of hard-coding values
  var svgWidth = +mapUS.attr("viewBox").split(" ")[2],
      svgHeight = +mapUS.attr("viewBox").split(" ")[3];

// get reference to the <rect> node, which is invisible and in the background
// wire up a click listener so that the brought up feature can be "reset" later


// get reference to the <g> node
// geojson features will be drawn here
  var g = mapUS.select("g");


// the D3 geographic path generator is used for drawing the svg paths of geojson
// and during bounding box calculations
  var geoPathGenerator = d3.geoPath();

// transition-related vars
  var activeFeature = d3.select(null),
          transitionDuration = 1000,
          featureStrokeWidth = 0.75,
          featureStroke = "#fff",
          featureFill = "#21d279",
          broughtUpFeatureStrokeWidth = 1.75,
          broughtUpFeatureStroke = "#21d279",
          broughtUpFeatureFill = "#fff";

// var promises = [
//   d3.json("https://unpkg.com/us-atlas@1/us/10m.json"),
// ]
var allStatesGeoJsonData = topojson.feature(
data,
data.objects.states
);



mapUS.selectAll(".feature")
.data(allStatesGeoJsonData.features)
.enter()
.append("path")
.attr("d", geoPathGenerator)
.attr("class", "feature")
.attr("id", function (d) {return "id"+d.id;})
.on("click", bringUpFeature);

  mapUS.selectAll("path")
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", "0.75px")
    .style("stroke", featureStroke)
    .style("fill", featureFill)
    .attr("transform", "");



    var scale
    var translate
    function getGeoBoundsTransformCali(width, height) {
        scale = .55
        translate = [width*.06, height*.32];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformWash(width, height) {
        scale = 0.82,
        translate = [width*.025, height*.1];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformOrg(width, height) {
        scale = 0.75,
        translate = [width*.025, height*.2];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformArz(width, height) {
        scale = 0.75,
        translate = [width*-.04, height*.4];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformIda(width, height) {
        scale = 0.65,
        translate = [width*.175, height*.05];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformNev(width, height) {
        scale = 0.6,
        translate = [width*.2, height*.15];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformUth(width, height) {
        scale = 0.72,
        translate = [width*.125, height*.325];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformCol(width, height) {
        scale = 0.72,
        translate = [width*.05, height*.55];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformNDak(width, height) {
        scale = 0.75,
        translate = [width*.15, height*.075];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformSDak(width, height) {
        scale = 0.75,
        translate = [width*.15, height*.2];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformTen(width, height) {
        scale = 0.8,
        translate = [width*-.06, height*.175];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformTex(width, height) {
        scale = 0.55,
        translate = [width*.25, height*.45];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformVir(width, height) {
        scale = 0.8,
        translate = [width*.03, height*-.16];

      return {
        translate: translate,
        scale: scale
      };
    }

    function getGeoBoundsTransformNCar(width, height) {
        scale = 0.78,
        translate = [width*.05, height*.01];

      return {
        translate: translate,
        scale: scale
      };
    }
    function getGeoBoundsTransformGeo(width, height) {
        scale = 0.72,
        translate = [width*.17, height*.165];

      return {
        translate: translate,
        scale: scale
      };
    }
    function getGeoBoundsTransformFlor(width, height) {
        scale = 0.68,
        translate = [width*.175, height*.3];

      return {
        translate: translate,
        scale: scale
      };
    }
    function getGeoBoundsTransformDel(width, height) {
        scale = 2.7,
        translate = [width*-1.48, height*-.92];

      return {
        translate: translate,
        scale: scale
      };
    }
    function getGeoBoundsTransformDC(width, height) {
        scale = 15.3,
        translate = [width*-12.1, height*-6.25];

      return {
        translate: translate,
        scale: scale
      };
    }
    function getGeoBoundsTransformSCar(width, height) {
        scale = 0.8,
        translate = [width*.25, height*.15];

      return {
        translate: translate,
        scale: scale
      };
    }

  var activeFeature = d3.select(null),
          transitionDuration = 1000,
          featureStrokeWidth = 0.75,
          featureStroke = "#fff",
          featureFill = "#21d279",
          broughtUpFeatureStrokeWidth = 1.75,
          broughtUpFeatureStroke = "#21d279",
          broughtUpFeatureFill = "#fff";



        activeFeature.classed("active-feature", false);

        var activeFeatureCali = d3
          .select("#id06")
          .classed("active-feature", true)
          .raise();

        var activeFeatureWash = d3
          .select("#id53")
          .classed("active-feature", true)
          .raise();

        var activeFeatureOrg = d3
          .select("#id41")
          .classed("active-feature", true)
          .raise();

        var activeFeatureArz = d3
          .select("#id04")
          .classed("active-feature", true)
          .raise();

        var activeFeatureIda = d3
          .select("#id16")
          .classed("active-feature", true)
          .raise();

      var activeFeatureNev = d3
          .select("#id32")
          .classed("active-feature", true)
          .raise();

      var activeFeatureUth = d3
          .select("#id49")
          .classed("active-feature", true)
          .raise();

      var activeFeatureCol = d3
          .select("#id08")
          .classed("active-feature", true)
          .raise();

      var activeFeatureNDak = d3
          .select("#id38")
          .classed("active-feature", true)
          .raise();

      var activeFeatureSDak = d3
          .select("#id46")
          .classed("active-feature", true)
          .raise();

        var  activeFeatureTen = d3
          .select("#id47")
          .classed("active-feature", true)
          .raise();

        var activeFeatureTex = d3
          .select("#id48")
          .classed("active-feature", true)
          .raise();

        var activeFeatureVir = d3
          .select("#id51")
          .classed("active-feature", true)
          .raise();

        var activeFeatureNCar = d3
          .select("#id37")
          .classed("active-feature", true)
          .raise();

       var activeFeatureGeo = d3
          .select("#id13")
          .classed("active-feature", true)
          .raise();

       var activeFeatureFlor = d3
          .select("#id12")
          .classed("active-feature", true)
          .raise();

       var activeFeatureDel = d3
          .select("#id10")
          .classed("active-feature", true)
          .raise();

       var activeFeatureDC = d3
          .select("#id11")
          .classed("active-feature", true)
          .raise();

        var activeFeatureSCar = d3
          .select("#id45")
          .classed("active-feature", true)
          .raise();


        var tCali = getGeoBoundsTransformCali(
          svgWidth,
          svgHeight
        );

        var tWash = getGeoBoundsTransformWash(
          svgWidth,
          svgHeight
        );

        var tOrg = getGeoBoundsTransformOrg(
          svgWidth,
          svgHeight
        );

         var tArz = getGeoBoundsTransformArz(
          svgWidth,
          svgHeight
        );

        var tIda = getGeoBoundsTransformIda(
          svgWidth,
          svgHeight
        );

        var tNev = getGeoBoundsTransformNev(
          svgWidth,
          svgHeight
        );

        var tUth = getGeoBoundsTransformUth(
          svgWidth,
          svgHeight
        );

        var tCol = getGeoBoundsTransformCol(
          svgWidth,
          svgHeight
        );

        var tNDak = getGeoBoundsTransformNDak(
          svgWidth,
          svgHeight
        );

          var tSDak = getGeoBoundsTransformSDak(
          svgWidth,
          svgHeight
        );

      var tTen = getGeoBoundsTransformTen(
          svgWidth,
          svgHeight
        );

        var tTex = getGeoBoundsTransformTex(
          svgWidth,
          svgHeight
        );

        var tVir = getGeoBoundsTransformVir(
          svgWidth,
          svgHeight
        );

         var tNCar = getGeoBoundsTransformNCar(
          svgWidth,
          svgHeight
        );

         var tGeo = getGeoBoundsTransformGeo(
          svgWidth,
          svgHeight
        );

         var tFlor = getGeoBoundsTransformFlor(
          svgWidth,
          svgHeight
        );

        var tDel = getGeoBoundsTransformDel(
          svgWidth,
          svgHeight
        );

         var tDC = getGeoBoundsTransformDC(
          svgWidth,
          svgHeight
        );

         var tSCar = getGeoBoundsTransformSCar(
          svgWidth,
          svgHeight
        );


        activeFeatureCali
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tCali.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tCali.translate + ") scale(" + tCali.scale + ")")
          .attr("class","upFrontState");

        activeFeatureWash
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tWash.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tWash.translate + ") scale(" + tWash.scale + ")")
          .attr("class","upFrontState");

         activeFeatureOrg
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tOrg.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tOrg.translate + ") scale(" + tOrg.scale + ")")
          .attr("class","upFrontState");

          activeFeatureArz
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tArz.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tArz.translate + ") scale(" + tArz.scale + ")")
          .attr("class","upFrontState");

          activeFeatureIda
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tIda.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tIda.translate + ") scale(" + tIda.scale + ")")
          .attr("class","upFrontState");

          activeFeatureNev
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tNev.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tNev.translate + ") scale(" + tNev.scale + ")")
          .attr("class","upFrontState");

           activeFeatureUth
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tUth.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tUth.translate + ") scale(" + tUth.scale + ")")
          .attr("class","upFrontState");


      activeFeatureCol
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tCol.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tCol.translate + ") scale(" + tCol.scale + ")")
          .attr("class","upFrontState");

      activeFeatureNDak
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tNDak.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tNDak.translate + ") scale(" + tNDak.scale + ")")
          .attr("class","upFrontState");

      activeFeatureSDak
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tSDak.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tSDak.translate + ") scale(" + tSDak.scale + ")")
            .attr("class","upFrontState");

      activeFeatureTen
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tTen.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tTen.translate + ") scale(" + tTen.scale + ")")
            .attr("class","upFrontState");

      activeFeatureTex
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tTex.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tTex.translate + ") scale(" + tTex.scale + ")")
            .attr("class","upFrontState");

      activeFeatureVir
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tVir.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tVir.translate + ") scale(" + tVir.scale + ")")
            .attr("class","upFrontState");

      activeFeatureNCar
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tNCar.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tNCar.translate + ") scale(" + tNCar.scale + ")")
            .attr("class","upFrontState");

      activeFeatureGeo
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tGeo.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tGeo.translate + ") scale(" + tGeo.scale + ")")
            .attr("class","georgia");

      activeFeatureFlor
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tFlor.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tFlor.translate + ") scale(" + tFlor.scale + ")")
            .attr("class","upFrontState");

      activeFeatureDel
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tDel.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tDel.translate + ") scale(" + tDel.scale + ")")
            .attr("class","upFrontState");

      activeFeatureDC
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tDC.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tDC.translate + ") scale(" + tDC.scale + ")")
            .attr("class","upFrontState");

      activeFeatureSCar
          .transition()
          .duration(transitionDuration)
          .style("stroke-width", broughtUpFeatureStrokeWidth / tSCar.scale + "px")
          .style("stroke", broughtUpFeatureStroke)
          .style("fill", broughtUpFeatureFill)
          .attr("transform", "translate(" + tSCar.translate + ") scale(" + tSCar.scale + ")")
            .attr("class","upFrontState");





        var otherFeatures = mapUS.selectAll("path.feature:not(.active-feature)");

        // remove the original click listener before transitioning the other features out of view
        otherFeatures.on("click", null);

        otherFeatures
          .transition()
          .duration(transitionDuration)
          .style("opacity", "0")
          .on("end", function(d, idx, nodeList) {
            // completely remove the display of the other features after transition is over
            if (idx === nodeList.length - 1) {
              otherFeatures.style("display", "none");
            }
          });

          mapGlobal = 1
      }


      function GeorgiaCase () {

        d3.selectAll(".caseTitle").remove()

        var mapGeo = d3.select("#svgMap");

      // lookup svg width and height from DOM instead of hard-coding values
        var geoWidth = +mapGeo.attr("viewBox").split(" ")[2],
            geoHeight = +mapGeo.attr("viewBox").split(" ")[3];







        var notGeorgia = d3.selectAll(".upFrontState")
                          .transition()
                          .duration(500)
                          .style("opacity", "0")

        var georgia = d3.select("#id13")
                        .transition()
                        .duration(500)
                        .style("stroke-width", ".75px")
                        .style("fill", "white")
                        .attr("transform", "translate(" + geoWidth*-1.7+","+ geoHeight*-1.7+ ") scale(" + 3.2 + ")")
                        // .attr("transform", "scale(" + 1.25 + ")")
                        .attr("class","upFrontState")
                        .call(function(){setTimeout(callTitle,500)});


        function callTitle () {

        var caseTitle = mapGeo.append('text')
        .attr('x',geoWidth*.25)
        .attr('y',geoHeight*.32)
        .attr('class',"caseTitle")
        .attr('z-index',1)
        .attr('fill', "#393745")
        .style("opacity", 1)
        .text("Case:");

        var caseGeorgia = mapGeo.append('text')
        .attr('x',geoWidth*.25)
        .attr('y',geoHeight*.4)
        .attr('class',"caseTitle")
        .attr('z-index',1)
        .attr('fill', "#393745")
        .style("opacity", 1)
        .text("GEORGIA");
      }


      }

//Starting GeorgiaBar

function georgiaBar (input, speed) {


    		geoBar.selectAll(".percentTextGeo")
    		.remove()

        geoBar.selectAll(".titleOrangeGeo")
    		.remove()

        geoBar.selectAll(".workUSTextGeo")
        .remove()

        geoBar.selectAll(".workForTextGeo")
        .remove()

        geoBar.selectAll(".workTotTextGeo")
        .remove()

        geoBar.selectAll(".yearTextGeo")
        .remove()

        geoBar.selectAll(".y-axis")
        .remove()

        geoBar.selectAll(".y-axisL")
        .remove()

        geoBar.selectAll(".x-axis")
        .remove()

        geoBar.selectAll(".x-axisL")
        .remove()

        geoBar.selectAll(".chartTitle")
        .remove()

    // bands.append("rect")
    // 	.attr("x", 0)
    // 	.attr("y", height*.25)
    // 	.attr("width", width)
    // 	.attr("height", height*.75)
    // 	.attr("fill", "green")
    // 	.attr('class',"bands")






    var yAxisGeo = geoBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axis")

    var xAxisGeo = geoBar.append("g")
      .attr("transform", `translate(${halfAxis+gutter+margin.left},${height - margin.bottom})`)
      .attr("class", "x-axis")

    var yAxisLGeo = geoBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axisL")

    var xAxisLGeo = geoBar.append("g")
      .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
      .attr("class", "x-axisL")



    		var yearSelect = input


    		var dataGeoFilter = csv.filter(function(d) { return d.year == yearSelect;})
    			   .filter(function(d) { return d.statefip == "Georgia";});

        //IMPORTANT - this will make the slider adjust.  For the main tool, do this!!!  for cases don't
    		// var max = d3.max(dataFilter, function(d) { return +d.nativeBorn; });
        var maxGeo = 800000
    		// x2.domain(1000000,0)

    		x.domain([0, maxGeo]).nice();
    		xL.domain([maxGeo,0]).nice();



    			geoBar.selectAll(".y-axis")
    			.call(d3.axisLeft(y)
    			.tickPadding(10)
    			.tickSize(0))
    			.style('stroke','white')
    			.style('fill', 'none')
    			.style('stroke-width', '0px');

    		y.domain(dataGeoFilter.map(d => d.age_cohorts));
    		yL.domain(dataGeoFilter.map(d => d.age_cohorts));

    		geoBar.selectAll(".x-axis")
    			.call(d3.axisBottom(x).tickSizeOuter(0).ticks(8, "s"))

    		geoBar.selectAll(".x-axisL")
    			.call(d3.axisBottom(xL).tickSizeOuter(0).ticks(8, "s"))



           	var barsGeo = geoBar.selectAll( '.barsGeo' ).data(dataGeoFilter)
        	var bars2Geo = geoBar.selectAll( '.bars2Geo' ).data(dataGeoFilter)

        	barsGeo.transition().duration(500)
                .attr("x", x(0)+halfAxis+gutter+margin.left)
                .attr("width", function(d) { return x(+d.foreignBorn); })

            bars2Geo.transition().duration(500)
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })



        	barsGeo.exit().remove();
        	bars2Geo.exit().remove();



        	barsGeo.enter().append( 'rect' )
              .attr("class", "barsGeo")
              .attr("y",function(d) { return y(d.age_cohorts); })
                // .call(log, function(d) { return x(+d.nativeBorn)+halfAxis+margin; })
              .attr("height", y.bandwidth())
              .attr("x", x(0)+halfAxis+gutter+margin.left)
              .attr("width", function(d) { return x(+d.foreignBorn); })
              .attr('z-index',1)
              .attr('fill', "#6263F1");

    		bars2Geo.enter().append('rect')
    			     .attr("class", "bars2Geo")
                .attr("y",function(d) { return yL(d.age_cohorts); })
                // .call(log, function(d) { return xL(+d.foreignBorn)+halfAxis; })
                .attr("height", yL.bandwidth())
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })
                .attr('z-index',1)
                .attr('fill', "#FF7150");


    	var perTextGeo = geoBar.append('text')
    		.data(dataGeoFilter)
    		.attr('x',width*.8)
    		.attr('y',height*.51)
    		.attr('class',"percentTextGeo")
    		.attr('z-index',10)
    		.attr('fill', "white")
    		.text(function(d) {return formatPercent(d.foreignWorkPer)});

        var descTextGeo = geoBar.append('text')
      		.data(dataGeoFilter)
      		.attr('x',width*.8)
      		.attr('y',height*.585)
      		.attr('class',"titleOrangeGeo")
      		.attr('z-index',10)
      		.attr('fill', "white")
      		.text("Foreign Born");


            var workingAge = geoBar.append('text')
              .attr('x',width*-.32)
              .attr('y',height*.05)
              .attr('class',"sideAge")
              .attr('z-index',10)
              .attr('fill', "white")
              .style("text-anchor", "end")
              .attr("transform", "translate(0," + height + ")")
              .attr("transform", "rotate(-90)")
              .text("Working Age");





        var yearTextGeo = geoBar.append('text')
          .data(dataGeoFilter)
          .attr('x',width*.8)
          .attr('y',height*.39)
          .attr('class',"yearTextGeo")
          .attr('z-index',10)
          .attr('fill', "white")
          .text(function(d) {return (d.year)});
    		// .text(dataFilter.map(d => d.foreignWorkPer[0]));

      var workUSTextGeo = geoBar.append('text')
        .data(dataGeoFilter)
        .attr('x',width*.245)
        .attr('y',height*.915)
        .attr('class',"workUSTextGeo")
        .attr('z-index',10)
        .attr('fill', "#FF7150")
        .text(function(d) {return "U.S.-Born Working Age: "+formatComma(d.workNat)});

      var workForTextGeo = geoBar.append('text')
        .data(dataGeoFilter)
        .attr('x',width*.78)
        .attr('y',height*.915)
        .attr('class',"workForTextGeo")
        .attr('z-index',10)
        .attr('fill', "#6263F1")
        .text(function(d) {return "Foreign-Born Working Age: "+formatComma(d.workFor)});

      var workTotalGeo = geoBar.append('text')
        .data(dataGeoFilter)
        .attr('x',width*.5)
        .attr('y',height*.97)
        .attr('class',"workTotTextGeo")
        .attr('z-index',10)
        .attr('fill', "#393745")
        .text(function(d) {return "Georgia Total Working Age: "+formatComma(d.TotalWork)});


        var chartTitle = geoBar.append('text')
          .attr('x',width*.5)
          .attr('y',height*.05)
          .attr('class',"chartTitle")
          .attr('fill', "#393745")
          .text("Georgia Population by Age and Nativity");



}

function geoBarPlacement (){


  var geoBands = d3.select("#geoBar")
  // var geoBands = d3.selectAll(".bandsGeo")
  .append("rect")
  .attr("x", -10)
	.attr("y", height*.305)
	.attr("width", width*1.3)
	.attr("height", height*.327)
  .attr("fill", "#FECEBA")
  .attr('class',"bandsGeo")
  .attr('z-index',-5)

  geoGlobal = 1


}


//NEW MAP - orangeMap
function orangeMap (data) {

  d3.selectAll(".feature2").remove()
  d3.selectAll(".upFrontState2").remove()
  d3.selectAll(".upFrontState").remove()
  d3.selectAll('.caseTitle').remove()

  var mapUS2 = d3.select("#svgMap2"),
      svgWidth2 = +mapUS2.attr("viewBox").split(" ")[2],
      svgHeight2 = +mapUS2.attr("viewBox").split(" ")[3];


      mapUS2.append("circle")
      .attr("cx", svgWidth2*.5)
      .attr("cy", svgHeight2*.5)
      .attr("r", 20)
      .style("fill", "black")
      .attr("class", "bogus");

      mapUS2.append("text")
      .attr("x", svgWidth2*.5)
      .attr("y", svgHeight2*.99)
      .style("fill", "#fff")
      .attr("class", "bogus")
      .text("U.S. Map")

  var g2 = mapUS2.select("g");

  var geoPathGenerator2 = d3.geoPath();

// transition-related vars
  var activeFeature2 = d3.select(null),
          transitionDuration = 1000,
          featureStrokeWidth = 0.75,
          featureStroke = "#fff",
          featureFill = "#FF7150",
          broughtUpFeatureStrokeWidth = 1.75,
          broughtUpFeatureStroke = "#FF7150",
          broughtUpFeatureFill = "#fff";


var allStatesGeoJsonData2 = topojson.feature(
data,
data.objects.states
);

var shrinkTitle = mapUS2.append('text')
  .attr('x',svgWidth2*.5)
  .attr('y',svgHeight2*.05)
  .attr('class',"chartTitleMap")
  .attr('fill', "#393745")
  .text("Shrinking Workforce States");


mapUS2.selectAll("path")
.data(allStatesGeoJsonData2.features)
.enter()
.append("path")
.attr("d", geoPathGenerator2)
.attr("class", "feature2")
.attr("id", function (d) {return "id2"+d.id;})
.style("fill", "#E2EAEA")

d3.selectAll(".bogus")
  .remove()



}

function slowOrange () {

  var mapUS2 = d3.select("#svgMap2")

    mapUS2.select("#id224").transition().duration(750).style("fill", "#FF7150")
    mapUS2.select("#id226").transition().duration(750).style("fill", "#FF7150")
    mapUS2.select("#id239").transition().duration(750).style("fill", "#FF7150")
    mapUS2.select("#id250").transition().duration(750).style("fill", "#FF7150")
    mapUS2.select("#id254").transition().duration(750).style("fill", "#FF7150")
    mapUS2.select("#id223").transition().duration(750).style("fill", "#FF7150")

}


function bringUpFeature2(data) {


var mapUS2 = d3.select("#svgMap2");

// lookup svg width and height from DOM instead of hard-coding values
var svgWidth2 = +mapUS2.attr("viewBox").split(" ")[2],
svgHeight2 = +mapUS2.attr("viewBox").split(" ")[3];

// get reference to the <rect> node, which is invisible and in the background
// wire up a click listener so that the brought up feature can be "reset" later


// get reference to the <g> node
// geojson features will be drawn here
var g = mapUS2.select("g");


// the D3 geographic path generator is used for drawing the svg paths of geojson
// and during bounding box calculations
var geoPathGenerator2 = d3.geoPath();

// transition-related vars
var activeFeature2 = d3.select(null),
    transitionDuration = 1000,
    featureStrokeWidth = 0.75,
    featureStroke = "#fff",
    featureFill = "#FF7150",
    broughtUpFeatureStrokeWidth = 1.75,
    broughtUpFeatureStroke = "#FF7150",
    broughtUpFeatureFill = "#fff";

// var promises = [
//   d3.json("https://unpkg.com/us-atlas@1/us/10m.json"),
// ]
var allStatesGeoJsonData2 = topojson.feature(
data,
data.objects.states
);



mapUS2.selectAll(".feature2")
.data(allStatesGeoJsonData2.features)
.enter()
.append("path")
.attr("d", geoPathGenerator2)
.attr("class", "feature2")
.attr("id", function (d) {return "id"+d.id;});

mapUS2.selectAll("path")
.transition()
.duration(transitionDuration)
.style("stroke-width", "0.75px")
.style("stroke", featureStroke)
.style("fill", featureFill)
.attr("transform", "");



var scale
var translate
function getGeoBoundsTransformOhi(width, height) {
  scale = 1.75
  translate = [width*-1.11, height*-.33];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformWes(width, height) {
  scale = 1.82,
  translate = [width*-1.23, height*-.01];

return {
  translate: translate,
  scale: scale
};
}



function getGeoBoundsTransformMich(width, height) {
  scale = 1.3,
  translate = [width*-.4, height*.45];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformVerm(width, height) {
  scale = 2.7,
  translate = [width*-1.92, height*-.25];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformMary(width, height) {
  scale = 2.25,
  translate = [width*-1.13, height*-.15];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformMain(width, height) {
  scale = 1.75,
  translate = [width*-.88, height*.11];

return {
  translate: translate,
  scale: scale
};
}




  activeFeature2.classed("active-feature", false);

  var activeFeatureOhi = d3
    .select("#id239")
    .classed("active-feature", true)
    .raise();

  var activeFeatureWes = d3
    .select("#id254")
    .classed("active-feature", true)
    .raise();

  var activeFeatureMich = d3
    .select("#id226")
    .classed("active-feature", true)
    .raise();

  var activeFeatureVerm = d3
    .select("#id250")
    .classed("active-feature", true)
    .raise();

  var activeFeatureMary = d3
    .select("#id224")
    .classed("active-feature", true)
    .raise();

    var activeFeatureMain = d3
      .select("#id223")
      .classed("active-feature", true)
      .raise();


  var tOhi = getGeoBoundsTransformOhi(
    svgWidth2,
    svgHeight2
  );

  var tWes = getGeoBoundsTransformWes(
    svgWidth2,
    svgHeight2
  );

  var tMich = getGeoBoundsTransformMich(
    svgWidth2,
    svgHeight2
  );

   var tVerm = getGeoBoundsTransformVerm(
    svgWidth2,
    svgHeight2
  );

  var tMary = getGeoBoundsTransformMary(
    svgWidth2,
    svgHeight2
  );

  var tMain = getGeoBoundsTransformMain(
    svgWidth2,
    svgHeight2
  );


  activeFeatureOhi
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tOhi.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tOhi.translate + ") scale(" + tOhi.scale + ")")
    .attr("class","upFrontState2");

  activeFeatureWes
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tWes.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tWes.translate + ") scale(" + tWes.scale + ")")
    .attr("class","upFrontState2");

   activeFeatureMich
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tMich.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tMich.translate + ") scale(" + tMich.scale + ")")
    .attr("class","upFrontState2");

    activeFeatureVerm
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tVerm.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tVerm.translate + ") scale(" + tVerm.scale + ")")
    .attr("class","upFrontState2");

    activeFeatureMary
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tMary.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tMary.translate + ") scale(" + tMary.scale + ")")
    .attr("class","upFrontState2");

    activeFeatureMain
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tMain.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tMain.translate + ") scale(" + tMain.scale + ")")
    .attr("class","upFrontState2");





  var otherFeatures2 = mapUS2.selectAll("path.feature2:not(.active-feature)");

  // remove the original click listener before transitioning the other features out of view

  otherFeatures2
    .transition()
    .duration(transitionDuration)
    .style("opacity", "0")
    .on("end", function(d, idx, nodeList) {
      // completely remove the display of the other features after transition is over
      if (idx === nodeList.length - 1) {
        otherFeatures2.style("display", "none");
      }
    });

    map2Global = 1
}


function MichCase () {

  d3.selectAll(".caseTitle").remove()

  var mapMich = d3.select("#svgMap2");

// lookup svg width and height from DOM instead of hard-coding values
  var michWidth = +mapMich.attr("viewBox").split(" ")[2],
      michHeight = +mapMich.attr("viewBox").split(" ")[3];


  var notMich = d3.selectAll(".upFrontState2")
                    .transition()
                    .duration(500)
                    .style("opacity", "0")

  var michigan = d3.select("#id226")
                  .transition()
                  .duration(500)
                  .style("stroke-width", ".75px")
                  .style("fill", "white")
                  .attr("transform", "translate(" + michWidth*-1.15+","+ michHeight*-.15+ ") scale(" + 2.8 + ")")
                  // .attr("transform", "scale(" + 1.25 + ")")
                  .attr("class","upFrontState2")
                  .call(function(){setTimeout(callTitleMich,500)});


  function callTitleMich () {

  var caseTitle = mapMich.append('text')
  .attr('x',michWidth*.25)
  .attr('y',michHeight*.47)
  .attr('class',"caseTitle")
  .attr('z-index',1)
  .attr('fill', "#393745")
  .style("opacity", 1)
  .text("Case:");

  var caseMichigan = mapMich.append('text')
  .attr('x',michWidth*.25)
  .attr('y',michHeight*.55)
  .attr('class',"caseTitle")
  .attr('z-index',1)
  .attr('fill', "#393745")
  .style("opacity", 1)
  .text("MICHIGAN");
}


}




//  MICHIGAN CASE STUDY

function michiganBar (input, speed) {



    		michBar.selectAll(".percentTextMich")
    		.remove()

        michBar.selectAll(".titleOrangeMich")
    		.remove()

        michBar.selectAll(".workUSTextMich")
        .remove()

        michBar.selectAll(".workForTextMich")
        .remove()

        michBar.selectAll(".workTotTextMich")
        .remove()

        michBar.selectAll(".yearTextMich")
        .remove()

        michBar.selectAll(".y-axis")
        .remove()

        michBar.selectAll(".y-axisL")
        .remove()

        michBar.selectAll(".x-axis")
        .remove()

        michBar.selectAll(".x-axisL")
        .remove()
        michBar.selectAll(".chartTitle")
        .remove()

    var yAxisMich = michBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axis")

    var xAxisMich = michBar.append("g")
      .attr("transform", `translate(${halfAxis+gutter+margin.left},${height - margin.bottom})`)
      .attr("class", "x-axis")

    var yAxisLMich = michBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axisL")

    var xAxisLMich = michBar.append("g")
      .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
      .attr("class", "x-axisL")



    		var yearSelect = input


    		var dataMichFilter = csv.filter(function(d) { return d.year == yearSelect;})
    			   .filter(function(d) { return d.statefip == "Michigan";});

        //IMPORTANT - this will make the slider adjust.  For the main tool, do this!!!  for cases don't
    		// var max = d3.max(dataFilter, function(d) { return +d.nativeBorn; });
        var maxMich = 900000
    		// x2.domain(1000000,0)

    		x.domain([0, maxMich]).nice();
    		xL.domain([maxMich,0]).nice();



    			michBar.selectAll(".y-axis")
    			.call(d3.axisLeft(y)
    			.tickPadding(10)
    			.tickSize(0))
    			.style('stroke','white')
    			.style('fill', 'none')
    			.style('stroke-width', '0px');

    		y.domain(dataMichFilter.map(d => d.age_cohorts));
    		yL.domain(dataMichFilter.map(d => d.age_cohorts));

    		michBar.selectAll(".x-axis")
    			.call(d3.axisBottom(x).tickSizeOuter(0).ticks(8, "s"))

    		michBar.selectAll(".x-axisL")
    			.call(d3.axisBottom(xL).tickSizeOuter(0).ticks(8, "s"))



           	var barsMich = michBar.selectAll( '.barsMich' ).data(dataMichFilter)
        	var bars2Mich = michBar.selectAll( '.bars2Mich' ).data(dataMichFilter)

        	barsMich.transition().duration(500)
                .attr("x", x(0)+halfAxis+gutter+margin.left)
                .attr("width", function(d) { return x(+d.foreignBorn); })

            bars2Mich.transition().duration(500)
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })



        	barsMich.exit().remove();
        	bars2Mich.exit().remove();



        	barsMich.enter().append( 'rect' )
              .attr("class", "barsMich")
              .attr("y",function(d) { return y(d.age_cohorts); })
                // .call(log, function(d) { return x(+d.nativeBorn)+halfAxis+margin; })
              .attr("height", y.bandwidth())
              .attr("x", x(0)+halfAxis+gutter+margin.left)
              .attr("width", function(d) { return x(+d.foreignBorn); })
              .attr('z-index',1)
              .attr('fill', "#6263F1");

    		bars2Mich.enter().append('rect')
    			     .attr("class", "bars2Mich")
                .attr("y",function(d) { return yL(d.age_cohorts); })
                // .call(log, function(d) { return xL(+d.foreignBorn)+halfAxis; })
                .attr("height", yL.bandwidth())
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })
                .attr('z-index',1)
                .attr('fill', "#FF7150");


    	var perTextMich = michBar.append('text')
    		.data(dataMichFilter)
    		.attr('x',width*.8)
    		.attr('y',height*.51)
    		.attr('class',"percentTextMich")
    		.attr('z-index',10)
    		.attr('fill', "white")
    		.text(function(d) {return formatPercent(d.foreignWorkPer)});

        var descTextMich = michBar.append('text')
      		.data(dataMichFilter)
      		.attr('x',width*.8)
      		.attr('y',height*.585)
      		.attr('class',"titleOrangeMich")
      		.attr('z-index',10)
      		.attr('fill', "white")
      		.text("Foreign Born");

          var workingAgeMich = michBar.append('text')
            .attr('x',width*-.32)
            .attr('y',height*.05)
            .attr('class',"sideAge")
            .attr('z-index',10)
            .attr('fill', "white")
            .style("text-anchor", "end")
            .attr("transform", "translate(0," + height + ")")
            .attr("transform", "rotate(-90)")
            .text("Working Age");


        var yearTextMich = michBar.append('text')
          .data(dataMichFilter)
          .attr('x',width*.8)
          .attr('y',height*.39)
          .attr('class',"yearTextMich")
          .attr('z-index',10)
          .attr('fill', "white")
          .text(function(d) {return (d.year)});
    		// .text(dataFilter.map(d => d.foreignWorkPer[0]));

      var workUSTextMich = michBar.append('text')
        .data(dataMichFilter)
        .attr('x',width*.245)
        .attr('y',height*.915)
        .attr('class',"workUSTextMich")
        .attr('z-index',10)
        .attr('fill', "#FF7150")
        .text(function(d) {return "U.S.-Born Working Age: "+formatComma(d.workNat)});

      var workForTextMich = michBar.append('text')
        .data(dataMichFilter)
        .attr('x',width*.78)
        .attr('y',height*.915)
        .attr('class',"workForTextMich")
        .attr('z-index',10)
        .attr('fill', "#6263F1")
        .text(function(d) {return "Foreign-Born Working Age: "+formatComma(d.workFor)});

      var workTotalMich = michBar.append('text')
        .data(dataMichFilter)
        .attr('x',width*.5)
        .attr('y',height*.97)
        .attr('class',"workTotTextMich")
        .attr('z-index',10)
        .attr('fill', "#393745")
        .text(function(d) {return "Michigan Total Working Age: "+formatComma(d.TotalWork)});

        var chartTitleMich = michBar.append('text')
          .attr('x',width*.5)
          .attr('y',height*.05)
          .attr('class',"chartTitle")
          .attr('fill', "#393745")
          .text("Michigan Population by Age and Nativity");
}

function michBarPlacement (){
  var michBands = d3.select("#michBar").append("rect")
  .attr("x", -10)
  .attr("y", height*.305)
  .attr("width", width*1.3)
  .attr("height", height*.327)
  .attr("fill", "#FECEBA")
  .attr('class',"bandsMich")
  .attr('z-index',-5)

  michGlobal = 1
}


function purpleMap (data) {

  d3.selectAll(".feature3").remove()
  d3.selectAll(".upFrontState3").remove()
  d3.selectAll(".newjersey").remove()
  d3.selectAll('.caseTitle').remove()

  var mapUS3 = d3.select("#svgMap3"),
      svgWidth3 = +mapUS3.attr("viewBox").split(" ")[2],
      svgHeight3 = +mapUS3.attr("viewBox").split(" ")[3];


      mapUS3.append("circle")
      .attr("cx", svgWidth3*.5)
      .attr("cy", svgHeight3*.5)
      .attr("r", 20)
      .style("fill", "black")
      .attr("class", "bogus");

      mapUS3.append("text")
      .attr("x", svgWidth3*.5)
      .attr("y", svgWidth3*.99)
      .style("fill", "#fff")
      .attr("class", "bogus")
      .text("U.S. Map")


  var g3 = mapUS3.select("g");

  var geoPathGenerator3 = d3.geoPath();

// transition-related vars
  var activeFeature3 = d3.select(null),
          transitionDuration = 1000,
          featureStrokeWidth = 0.75,
          featureStroke = "#fff",
          featureFill = "#6A7EF5",
          broughtUpFeatureStrokeWidth = 1.75,
          broughtUpFeatureStroke = "#6A7EF5",
          broughtUpFeatureFill = "#fff";


var allStatesGeoJsonData3 = topojson.feature(
data,
data.objects.states
);


var dependTitle = mapUS3.append('text')
  .attr('x',svgWidth3*.5)
  .attr('y',svgHeight3*.05)
  .attr('class',"chartTitleMap")
  .attr('fill', "#393745")
  .text("Immigrant-Dependent States");



mapUS3.selectAll("path")
.data(allStatesGeoJsonData3.features)
.enter()
.append("path")
.attr("d", geoPathGenerator3)
.attr("class", "feature3")
.attr("id", function (d) {return "id3"+d.id;})
.style("fill", "#E2EAEA")

d3.selectAll(".bogus")
  .remove()



}

function slowPurple () {

  var mapUS3 = d3.select("#svgMap3")

    mapUS3.select("#id344").transition().duration(750).style("fill", "#6A7EF5")
    mapUS3.select("#id336").transition().duration(750).style("fill", "#6A7EF5")
    mapUS3.select("#id334").transition().duration(750).style("fill", "#6A7EF5")
    mapUS3.select("#id325").transition().duration(750).style("fill", "#6A7EF5")
    mapUS3.select("#id317").transition().duration(750).style("fill", "#6A7EF5")
    mapUS3.select("#id309").transition().duration(750).style("fill", "#6A7EF5")

}


function bringUpFeature3(data) {

var mapUS3 = d3.select("#svgMap3");

// lookup svg width and height from DOM instead of hard-coding values
var svgWidth3 = +mapUS3.attr("viewBox").split(" ")[2],
svgHeight3 = +mapUS3.attr("viewBox").split(" ")[3];

// get reference to the <rect> node, which is invisible and in the background
// wire up a click listener so that the brought up feature can be "reset" later


// get reference to the <g> node
// geojson features will be drawn here
var g = mapUS3.select("g");


// the D3 geographic path generator is used for drawing the svg paths of geojson
// and during bounding box calculations
var geoPathGenerator3 = d3.geoPath();

// transition-related vars
var activeFeature3 = d3.select(null),
    transitionDuration = 1000,
    featureStrokeWidth = 0.75,
    featureStroke = "#fff",
    featureFill = "#6A7EF5",
    broughtUpFeatureStrokeWidth = 1.75,
    broughtUpFeatureStroke = "#6A7EF5",
    broughtUpFeatureFill = "#fff";

// var promises = [
//   d3.json("https://unpkg.com/us-atlas@1/us/10m.json"),
// ]
var allStatesGeoJsonData3 = topojson.feature(
data,
data.objects.states
);



mapUS3.selectAll(".feature3")
.data(allStatesGeoJsonData3.features)
.enter()
.append("path")
.attr("d", geoPathGenerator3)
.attr("class", "feature3")
.attr("id", function (d) {return "id"+d.id;});

mapUS3.selectAll("path")
.transition()
.duration(transitionDuration)
.style("stroke-width", "0.75px")
.style("stroke", featureStroke)
.style("fill", featureFill)
.attr("transform", "");



var scale
var translate
function getGeoBoundsTransformCon(width, height) {
  scale = 3.5
  translate = [width*-2.9, height*-.8];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformIll(width, height) {
  scale = 1.22,
  translate = [width*-.5, height*.1];

return {
  translate: translate,
  scale: scale
};
}



function getGeoBoundsTransformMass(width, height) {
  scale = 3.1,
  translate = [width*-2.3, height*-.6];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformNJer(width, height) {
  scale = 2.65,
  translate = [width*-1.79, height*-.35];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformRho(width, height) {
  scale = 5.5,
  translate = [width*-4.25, height*-1.35];

return {
  translate: translate,
  scale: scale
};
}

function getGeoBoundsTransformNYor(width, height) {
  scale = 1.2,
  translate = [width*-.17, height*.29];

return {
  translate: translate,
  scale: scale
};
}




  activeFeature3.classed("active-feature", false);

  var activeFeatureCon = d3
    .select("#id309")
    .classed("active-feature", true)
    .raise();

  var activeFeatureIll = d3
    .select("#id317")
    .classed("active-feature", true)
    .raise();

  var activeFeatureMass = d3
    .select("#id325")
    .classed("active-feature", true)
    .raise();

  var activeFeatureNJer = d3
    .select("#id334")
    .classed("active-feature", true)
    .raise();

  var activeFeatureRho = d3
    .select("#id344")
    .classed("active-feature", true)
    .raise();

    var activeFeatureNYor = d3
      .select("#id336")
      .classed("active-feature", true)
      .raise();


  var tCon = getGeoBoundsTransformCon(
    svgWidth3,
    svgHeight3
  );

  var tIll = getGeoBoundsTransformIll(
    svgWidth3,
    svgHeight3
  );

  var tMass = getGeoBoundsTransformMass(
    svgWidth3,
    svgHeight3
  );

   var tNJer = getGeoBoundsTransformNJer(
    svgWidth3,
    svgHeight3
  );

  var tRho = getGeoBoundsTransformRho(
    svgWidth3,
    svgHeight3
  );
  var tNYor = getGeoBoundsTransformNYor(
    svgWidth3,
    svgHeight3
  );


  activeFeatureCon
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tCon.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tCon.translate + ") scale(" + tCon.scale + ")")
    .attr("class","upFrontState3");

  activeFeatureIll
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tIll.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tIll.translate + ") scale(" + tIll.scale + ")")
    .attr("class","upFrontState3");

   activeFeatureMass
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tMass.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tMass.translate + ") scale(" + tMass.scale + ")")
    .attr("class","upFrontState3");

    activeFeatureNJer
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tNJer.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tNJer.translate + ") scale(" + tNJer.scale + ")")
    .attr("class","upFrontState3");

    activeFeatureRho
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tRho.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tRho.translate + ") scale(" + tRho.scale + ")")
    .attr("class","upFrontState3");

    activeFeatureNYor
    .transition()
    .duration(transitionDuration)
    .style("stroke-width", broughtUpFeatureStrokeWidth / tNYor.scale + "px")
    .style("stroke", broughtUpFeatureStroke)
    .style("fill", broughtUpFeatureFill)
    .attr("transform", "translate(" + tNYor.translate + ") scale(" + tNYor.scale + ")")
    .attr("class","upFrontState3");





  var otherFeatures3 = mapUS3.selectAll("path.feature3:not(.active-feature)");

  // remove the original click listener before transitioning the other features out of view

  otherFeatures3
    .transition()
    .duration(transitionDuration)
    .style("opacity", "0")
    .on("end", function(d, idx, nodeList) {
      // completely remove the display of the other features after transition is over
      if (idx === nodeList.length - 1) {
        otherFeatures3.style("display", "none");
      }
    });

    map3Global = 1
}


function NJerCase () {

  d3.selectAll(".caseTitle").remove()

  var mapNJer = d3.select("#svgMap3");

// lookup svg width and height from DOM instead of hard-coding values
  var njerWidth = +mapNJer.attr("viewBox").split(" ")[2],
      njerHeight = +mapNJer.attr("viewBox").split(" ")[3];


  var notNJer = d3.selectAll(".upFrontState3")
                    .transition()
                    .duration(500)
                    .style("opacity", "0")

  var newjersey = d3.select("#id334")
                  .transition()
                  .duration(500)
                  .style("stroke-width", ".5px")
                  .style("fill", "white")
                  .attr("transform", "translate(" + njerWidth*-4.55+","+ njerHeight*-1.7+ ") scale(" + 6 + ")")
                  // .attr("transform", "scale(" + 1.25 + ")")
                  .attr("class","newjersey")
                  .call(function(){setTimeout(callTitleNJer,500)});


  function callTitleNJer () {

  var caseTitle = mapNJer.append('text')
  .attr('x',njerWidth*.25)
  .attr('y',njerHeight*.32)
  .attr('class',"caseTitle")
  .attr('z-index',1)
  .attr('fill', "#393745")
  .style("opacity", 1)
  .text("Case:");

  var caseNewJersey = mapNJer.append('text')
  .attr('x',njerWidth*.25)
  .attr('y',njerHeight*.4)
  .attr('class',"caseTitle")
  .attr('z-index',1)
  .attr('fill', "#393745")
  .style("opacity", 1)
  .text("NEW JERSEY");
}


}

function newjerseyBar (input, speed) {



    		njerBar.selectAll(".percentTextNJer")
    		.remove()

        njerBar.selectAll(".titleOrangeNJer")
    		.remove()

        njerBar.selectAll(".workUSTextNJer")
        .remove()

        njerBar.selectAll(".workForTextNJer")
        .remove()

        njerBar.selectAll(".workTotTextNJer")
        .remove()

        njerBar.selectAll(".yearTextNJer")
        .remove()

        njerBar.selectAll(".chartTitle")
    		.remove()

        njerBar.selectAll(".y-axisL")
    		.remove()
        njerBar.selectAll(".y-axis")
    		.remove()

        njerBar.selectAll(".x-axisL")
    		.remove()
        njerBar.selectAll(".x-axis")
    		.remove()

        // njerBar.selectAll(".x-axisL")
    		// .remove()
        // njerBar.selectAll(".x-axis")
    		// .remove()


    var yAxisNJer = njerBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axis")

    var xAxisNJer = njerBar.append("g")
      .attr("transform", `translate(${halfAxis+gutter+margin.left},${height - margin.bottom})`)
      .attr("class", "x-axis")

    var yAxisLNJer = njerBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axisL")

    var xAxisLNJer = njerBar.append("g")
      .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
      .attr("class", "x-axisL")



    		var yearSelect = input


    		var dataNJerFilter = csv.filter(function(d) { return d.year == yearSelect;})
    			   .filter(function(d) { return d.statefip == "New Jersey";});

        //IMPORTANT - this will make the slider adjust.  For the main tool, do this!!!  for cases don't
    		// var max = d3.max(dataFilter, function(d) { return +d.nativeBorn; });
        var maxNJer = 600000
    		// x2.domain(1000000,0)

    		x.domain([0, maxNJer]).nice();
    		xL.domain([maxNJer,0]).nice();



    			njerBar.selectAll(".y-axis")
    			.call(d3.axisLeft(y)
    			.tickPadding(10)
    			.tickSize(0))
    			.style('stroke','white')
    			.style('fill', 'none')
    			.style('stroke-width', '0px');

    		y.domain(dataNJerFilter.map(d => d.age_cohorts));
    		yL.domain(dataNJerFilter.map(d => d.age_cohorts));

    		njerBar.selectAll(".x-axis")
    			.call(d3.axisBottom(x).tickSizeOuter(0).ticks(8, "s"))

    		njerBar.selectAll(".x-axisL")
    			.call(d3.axisBottom(xL).tickSizeOuter(0).ticks(8, "s"))



           	var barsNJer = njerBar.selectAll( '.barsNJer' ).data(dataNJerFilter)
        	var bars2NJer = njerBar.selectAll( '.bars2NJer' ).data(dataNJerFilter)

        	barsNJer.transition().duration(500)
                .attr("x", x(0)+halfAxis+gutter+margin.left)
                .attr("width", function(d) { return x(+d.foreignBorn); })

            bars2NJer.transition().duration(500)
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })



        	barsNJer.exit().remove();
        	bars2NJer.exit().remove();



        	barsNJer.enter().append( 'rect' )
              .attr("class", "barsNJer")
              .attr("y",function(d) { return y(d.age_cohorts); })
                // .call(log, function(d) { return x(+d.nativeBorn)+halfAxis+margin; })
              .attr("height", y.bandwidth())
              .attr("x", x(0)+halfAxis+gutter+margin.left)
              .attr("width", function(d) { return x(+d.foreignBorn); })
              .attr('z-index',1)
              .attr('fill', "#6263F1");

    		bars2NJer.enter().append('rect')
    			     .attr("class", "bars2NJer")
                .attr("y",function(d) { return yL(d.age_cohorts); })
                // .call(log, function(d) { return xL(+d.foreignBorn)+halfAxis; })
                .attr("height", yL.bandwidth())
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })
                .attr('z-index',1)
                .attr('fill', "#FF7150");


    	var perTextNJer = njerBar.append('text')
    		.data(dataNJerFilter)
    		.attr('x',width*.84)
    		.attr('y',height*.51)
    		.attr('class',"percentTextNJer")
    		.attr('z-index',10)
    		.attr('fill', "white")
    		.text(function(d) {return formatPercent(d.foreignWorkPer)});

        var descTextNJer = njerBar.append('text')
      		.data(dataNJerFilter)
      		.attr('x',width*.84)
      		.attr('y',height*.585)
      		.attr('class',"titleOrangeNJer")
      		.attr('z-index',10)
      		.attr('fill', "white")
      		.text("Foreign Born");

          var workingAgeNJer = njerBar.append('text')
            .attr('x',width*-.32)
            .attr('y',height*.05)
            .attr('class',"sideAge")
            .attr('z-index',10)
            .attr('fill', "white")
            .style("text-anchor", "end")
            .attr("transform", "translate(0," + height + ")")
            .attr("transform", "rotate(-90)")
            .text("Working Age");


        var yearTextNJer = njerBar.append('text')
          .data(dataNJerFilter)
          .attr('x',width*.84)
          .attr('y',height*.39)
          .attr('class',"yearTextNJer")
          .attr('z-index',10)
          .attr('fill', "white")
          .text(function(d) {return (d.year)});
    		// .text(dataFilter.map(d => d.foreignWorkPer[0]));

      var workUSTextNJer = njerBar.append('text')
        .data(dataNJerFilter)
        .attr('x',width*.245)
        .attr('y',height*.915)
        .attr('class',"workUSTextNJer")
        .attr('z-index',10)
        .attr('fill', "#FF7150")
        .text(function(d) {return "U.S.-Born Working Age: "+formatComma(d.workNat)});

      var workForTextNJer = njerBar.append('text')
        .data(dataNJerFilter)
        .attr('x',width*.78)
        .attr('y',height*.915)
        .attr('class',"workForTextNJer")
        .attr('z-index',10)
        .attr('fill', "#6263F1")
        .text(function(d) {return "Foreign-Born Working Age: "+formatComma(d.workFor)});

      var workTotalNJer = njerBar.append('text')
        .data(dataNJerFilter)
        .attr('x',width*.5)
        .attr('y',height*.97)
        .attr('class',"workTotTextNJer")
        .attr('z-index',10)
        .attr('fill', "#393745")
        .text(function(d) {return "New Jersey Total Working Age: "+formatComma(d.TotalWork)});

        var chartTitleNJer = njerBar.append('text')
          .attr('x',width*.5)
          .attr('y',height*.05)
          .attr('class',"chartTitle")
          .attr('fill', "#393745")
          .text("New Jersey Population by Age and Nativity");
}

function njerBarPlacement (){
  var njerBands = d3.select("#njerBar").append("rect")
  .attr("x", -10)
  .attr("y", height*.305)
  .attr("width", width*1.3)
  .attr("height", height*.327)
  .attr("fill", "#FECEBA")
  .attr('class',"bandsMich")
  .attr('z-index',-5)

  njerGlobal = 1
}






function chart(csv) {


	var data = csv


	var year   = [...new Set(csv.map(d => +d.year))]
	var states = [...new Set(csv.map(d => d.statefip))]
	var ageCohort = [...new Set(csv.map(d => d.age_cohorts))]
	var foreignborn2 = [...new Set(csv.map(d => d.foreignBorn))]
	var nativeborn2 = [...new Set(csv.map(d => d.nativeBorn))]
	var forWorkPer = [...new Set(csv.map(d => +d.foreignWorkPer))]
  var workNat = [...new Set(csv.map(d => +d.workNat))]
  var workFor = [...new Set(csv.map(d => +d.workFor))]
  var TotalWork = [...new Set(csv.map(d => +d.TotalWork))]

	// var options = d3.select("slider-step").selectAll("option")
	// 	.data(year)
	// 	.enter()
	// 	.append("option")
	// 	.text(d => d)

	var options2 = d3.select("#stateChart").selectAll("option")
		.data(states)
		.enter()
		.append("option")
		.text(d => d)




		var allMargin = {top: 20, left: 20, bottom: 100, right: 20},
        allWidth = +svg.attr("viewBox").split(" ")[2]-allMargin.left,
        allHeight = +svg.attr("viewBox").split(" ")[3],

		// width = +svg.attr("width") - margin.left - margin.right,
		// height = +svg.attr("height") - margin.top - margin.bottom,
		halfAxis = allWidth/2,
		gutter = allWidth*.025;

    var input = 'United States'



    var selectState = d3.select("#stateChart")
  		.on("change", function() {
  			input = "United States" //this.value
  			update2tool(input, 100)
  		})





	var formatPercent = d3.format(",.1%")
  var formatComma = d3.format(",");

	var bands = svg.append("rect")
	.attr("x", 0)
	.attr("y", allHeight*.228)
	.attr("width", allWidth+allMargin.left + 10)
	.attr("height", allHeight*.353)
	.attr("fill", "#FECEBA")
	.attr('class',"bands")
	.attr('z-index',-1)

	var perText

    var x_all = d3.scaleLinear()
		.range([0, halfAxis-allMargin.right-gutter])

    var xL_all = d3.scaleLinear()
		.range([0, halfAxis-allMargin.left-gutter])

	  var y_all = d3.scaleBand()
		.rangeRound([allHeight - allMargin.bottom, 0])
		.padding(0.3)

    var yL_all = d3.scaleBand()
		.rangeRound([allHeight - allMargin.bottom, 0])
		.padding(0.3)


	yAxis = svg.append("g")
		.attr("transform", `translate(${halfAxis+allMargin.left+gutter}, 0)`)
		.attr("class", "y-axis")

	yAxisL = svg.append("g")
		.attr("transform", `translate(${halfAxis+allMargin.left+gutter}, 0)`)
		.attr("class", "y-axisL")

  xAxisL = svg.append("g")
		.attr("transform", `translate(${allMargin.left},${allHeight - allMargin.bottom})`)
		.attr("class", "x-axisL")

  xAxis = svg.append("g")
  		.attr("transform", `translate(${halfAxis+gutter+allMargin.left},${allHeight - allMargin.bottom})`)
  		.attr("class", "x-axis")




	svg.selectAll(".y-axis")
			.call(d3.axisLeft(y_all)
			.tickPadding(10)
			.tickSize(0))
			.style('stroke','white')
			.style('fill', 'none')
			.style('stroke-width', '0px');

	// Time
  //var dataTime = d3.range(0, 18).map(function(d) {
  //  return new Date(2000 + d, 10, 3);
  //});


  ////  OLDSTUFF ABpov#

  dataTime = [...new Set(csv.map(d => +d.year))]



  // Step
  // var sliderStep = d3
  //   .sliderBottom()
  //   .min(2000)
  //   .max(2018)
  //   .width(300)
  //   .tickFormat(d3.format('1'))
  //   .ticks(2)
  //   .step(1)
  //   .default(2000)
  //   .tickValues([2000,2018])
  //   .displayValue(false)
  //   .handle(
  //     d3
  //       .symbol()
  //       .type(d3.symbolCircle)
  //       .size(200)
  //   )
  //   .on('onchange', val => {
  //     d3.select('p#value-step').text(d3.format('1')(val));
  //     yearSelect = sliderStep.value()
  //     updatetool(yearSelect,500)
  //    }
  //
  //    );

  d3.select('#rangeSlider').on('input', function() {
  updatetool(this.value, 750);
});

function change2Play () {

  d3.select('#start').html("<img src='"+"assets/images/noun_play_green.png"+"'/>")
  d3.select('#stop').html("<img src='"+"assets/images/noun_pause.png"+"'/>")
}

function change2Pause () {

  d3.select('#start').html("<img src='"+"assets/images/noun_play.png"+"'/>")
  d3.select('#stop').html("<img src='"+"assets/images/noun_pause_orange.png"+"'/>")
}

var myTimer;
d3.select("#start").on("click", function() {
  change2Play();
 clearInterval (myTimer);
	myTimer = setInterval (function() {
    	var b= d3.select('#rangeSlider');
      var s = (+b.property("value") + 1) % (+b.property("max")+1);  //aria-valuemax & aria-valuemin
      if (s == 0) { s = +b.property("min"); }
      b.property("value", s);
      updatetool(s, 750);
    }, 750)

});



d3.select("#stop").on("click", function() {
	clearInterval (myTimer);
  change2Pause();

});

// var yearSelect= sliderStep.value()

  var yearSelect = d3.select("#rangeSlider").property("value")

  // var gStep = d3
  //   // .select('#slider-step')
  //   select('#rangeSlider')
  //   .attr("class","yearSlider")
  //   .append('svg')
  //   .attr('width', 400)
  //   .attr('height', 100)
  //   .append('g')
  //   .attr('transform', 'translate(30,30)');



  // gStep.call(sliderStep);

  // d3.select('p#value-step').text(d3.format('1')(sliderStep.value()));

	// var yearSelect= document.getElementById('p#value-step')


	yearSelect = d3.select('#rangeSlider').property("value")
	// var yearSelect = d3.select('p#value-step').property("value")
	// var yearSelect = time()

	var stateSelect = d3.select("#stateChart").property("value")
  var dataFilterTool = csv.filter(f => f.year == input)
          .filter(f => f.statefip == stateSelect)


  var perText = svg.append('text')
          .data(dataFilterTool)
        .attr('x',allWidth*.84)
        .attr('y',allHeight*.45)
        .attr('class',"percentTextTool")
        .attr('z-index',10)
        .attr('fill', "white")
        .text(function(d) {return formatPercent(d.foreignWorkPer)});

        var descTextTool = svg.append('text')
          .data(dataFilterTool)
          .attr('x',allWidth*.84)
          .attr('y',allHeight*.53)
          .attr('class',"titleOrangeTool")
          .attr('z-index',10)
          .attr('fill', "white")
          .text("Foreign Born");

      var workingAgeTool = svg.append('text')
        .attr('x',allWidth*-.22)
        .attr('y',allHeight*.05)
        .attr('class',"sideAge")
        .attr('z-index',10)
        .attr('fill', "white")
        .style("text-anchor", "end")
        .attr("transform", "translate(0," + allHeight + ")")
        .attr("transform", "rotate(-90)")
        .text("Working Age");


          var yearTextTool = svg.append('text')
            .data(dataFilterTool)
            .attr('x',allWidth*.84)
            .attr('y',allHeight*.32)
            .attr('class',"yearTextTool")
            .attr('z-index',10)
            .attr('fill', "white")
            .text(function(d) {return (d.year)});

      var workForTextTool = svg.append('text')
          .data(dataFilterTool)
          .attr('x',allWidth*.78)
          .attr('y',allHeight*.885)
          .attr('class',"workForTextTool")
          .attr('z-index',10)
          .attr('fill', "#6263F1")
          .text(function(d) {return "Foreign-Born Working Age: "+formatComma(d.workFor)});


          var workTotalTool = svg.append('text')
            .data(dataFilterTool)
            .attr('x',allWidth*.5)
            .attr('y',function(d) {if (window.innerWidth < 575) {return allHeight*.96 } else {return allHeight*.95}})
            .attr('class',"workTotTextTool")
            .attr('z-index',10)
            .attr('fill', "#393745")
            .text(function(d) {return "Total Working Age: "+formatComma(d.TotalWork)});


            var workUSTextTool = svg.append('text')
              .data(dataFilterTool)
              .attr('x',allWidth*.25)
              .attr('y',allHeight*.885)
              .attr('class',"workUSTextTool")
              .attr('z-index',10)
              .attr('fill', "#FF7150")
              .text(function(d) {return "U.S.-Born Working Age: "+formatComma(d.workNat)});



  var max = d3.max(dataFilterTool, function(d) { return +d.nativeBorn; });




// bands.append("rect")
// 	.attr("x", 0)
// 	.attr("y", height*.25)
// 	.attr("width", width)
// 	.attr("height", height*.75)
// 	.attr("fill", "green")
// 	.attr('class',"bands")




	function updatetool(input, speed) {

    svg.selectAll(".percentTextTool")
		.remove()

    svg.selectAll(".titleOrangeTool")
    .remove()

    svg.selectAll(".sideAge")
    .remove()

    svg.selectAll(".yearTextTool")
    .remove()

    svg.selectAll(".workForTextTool")
    .remove()

    svg.selectAll(".workTotTextTool")
    .remove()

    svg.selectAll(".workUSTextTool")
    .remove()
    //
    // var xAxisL = svg.append("g")
  	// 	.attr("transform", `translate(${allMargin.left+8},${allHeight - allMargin.bottom})`)
  	// 	.attr("class", "x-axisL")
    //
    //   var xAxis = svg.append("g")
    // 		.attr("transform", `translate(${halfAxis+gutter+allMargin.left},${allHeight - allMargin.bottom})`)
    // 		.attr("class", "x-axis")

	// 	bands.append("rect")
	// .attr("x", 0)
	// .attr("y", height*.25)
	// .attr("width", width)
	// .attr("height", height*.75)
	// .attr("fill", "green")
	// .attr('class',"bands")






		stateSelect = d3.select("#stateChart").property("value")

		// yearSelect = sliderStep.value()
    yearSelect = d3.select('#rangeSlider').property("value")

		dataFilterTool = csv.filter(f => f.year == input)
					  .filter(f => f.statefip == stateSelect)

		// x2.domain(1000000,0)

		x_all.domain([0, max + max*.15]).nice();
		xL_all.domain([max + max*.15,0]).nice();


		svg.selectAll(".y-axis")
			.call(d3.axisLeft(y_all)
			.tickPadding(10)
			.tickSize(0))
			.style('stroke','white')
			.style('fill', 'none')
			.style('stroke-width', '0px');

		// svg.selectAll(".y-axisL")
		// 	.call(d3.axisRight(yL)
		// 	.ticks(null, "s")
		// 	.tickFormat(d3.format(".0s")))

		y_all.domain(dataFilterTool.map(d => d.age_cohorts));
		yL_all.domain(dataFilterTool.map(d => d.age_cohorts));

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(d3.axisBottom(x_all).tickSizeOuter(0).ticks(8, "s"));

		svg.selectAll(".x-axisL").transition().duration(speed)
			.call(d3.axisBottom(xL_all).tickSizeOuter(0).ticks(8, "s"));

		var t = d3.transition()
    			.duration(500);

    	var bars = svg.selectAll( '.bars' ).data(dataFilterTool)
    	var bars2 = svg.selectAll( '.bars2' ).data(dataFilterTool)

    	bars.transition().duration(500)
            .attr("x", x_all(0)+halfAxis+gutter+allMargin.left)
            .attr("width", function(d) { return x_all(+d.foreignBorn); })

        bars2.transition().duration(500)
            .attr("x", function(d) { return xL_all(+d.nativeBorn)+allMargin.left;})
            .attr("width", function(d) { return x_all(+d.nativeBorn); })



    	bars.exit().remove();
    	bars2.exit().remove();

    	bars.enter().append( 'rect' )
          .attr("class", "bars")
          .attr("y",function(d) { return y_all(d.age_cohorts); })
            // .call(log, function(d) { return x(+d.nativeBorn)+halfAxis+margin; })
          .attr("height", y_all.bandwidth())
          .attr("x", x_all(0)+halfAxis+gutter+allMargin.left)
          .attr("width", function(d) { return x_all(+d.foreignBorn); })
          .attr('fill', "#6263F1");

		bars2.enter().append('rect')
			.attr("class", "bars2")
            .attr("y",function(d) { return yL_all(d.age_cohorts); })
            // .call(log, function(d) { return xL(+d.foreignBorn)+halfAxis; })
            .attr("height", yL_all.bandwidth())
            .attr("x", function(d) { return xL_all(+d.nativeBorn)+allMargin.left;})
            .attr("width", function(d) { return x_all(+d.nativeBorn); })
            .attr('fill', "#FF7150");


              perText = svg.append('text')
                      .data(dataFilterTool)
                    .attr('x',allWidth*.84)
                    .attr('y',allHeight*.45)
                    .attr('class',"percentTextTool")
                    .attr('z-index',10)
                    .attr('fill', "white")
                    .text(function(d) {return formatPercent(d.foreignWorkPer)});

                    descTextTool = svg.append('text')
                      .data(dataFilterTool)
                      .attr('x',allWidth*.84)
                      .attr('y',allHeight*.53)
                      .attr('class',"titleOrangeTool")
                      .attr('z-index',10)
                      .attr('fill', "white")
                      .text("Foreign Born");

                  workingAgeTool = svg.append('text')
                    .attr('x',allWidth*-.22)
                    .attr('y',allHeight*.05)
                    .attr('class',"sideAge")
                    .attr('z-index',10)
                    .attr('fill', "white")
                    .style("text-anchor", "end")
                    .attr("transform", "translate(0," + allHeight + ")")
                    .attr("transform", "rotate(-90)")
                    .text("Working Age");


                    yearTextTool = svg.append('text')
                        .data(dataFilterTool)
                        .attr('x',allWidth*.84)
                        .attr('y',allHeight*.32)
                        .attr('class',"yearTextTool")
                        .attr('z-index',10)
                        .attr('fill', "white")
                        .text(function(d) {return (d.year)});

               workForTextTool = svg.append('text')
                      .data(dataFilterTool)
                      .attr('x',allWidth*.78)
                      .attr('y',allHeight*.885)
                      .attr('class',"workForTextTool")
                      .attr('z-index',10)
                      .attr('fill', "#6263F1")
                      .text(function(d) {return "Foreign-Born Working Age: "+formatComma(d.workFor)});


                  workTotalTool = svg.append('text')
                        .data(dataFilterTool)
                        .attr('x',allWidth*.5)
                        .attr('y',function(d) {if (window.innerWidth < 575) {return allHeight*.95 } else {return allHeight*.93}})
                        .attr('class',"workTotTextTool")
                        .attr('z-index',10)
                        .attr('fill', "#393745")
                        .text(function(d) {return "Total Working Age: "+formatComma(d.TotalWork)});


                    workUSTextTool = svg.append('text')
                          .data(dataFilterTool)
                          .attr('x',allWidth*.25)
                          .attr('y',allHeight*.885)
                          .attr('class',"workUSTextTool")
                          .attr('z-index',10)
                          .attr('fill', "#FF7150")
                          .text(function(d) {return "U.S.-Born Working Age: "+formatComma(d.workNat)});
}





function update2tool(input, speed) {

		svg.selectAll(".percentTextTool")
		.remove()

    svg.selectAll(".titleOrangeTool")
    .remove()

    svg.selectAll(".sideAge")
    .remove()

    svg.selectAll(".yearTextTool")
    .remove()

    svg.selectAll(".workForTextTool")
    .remove()

    svg.selectAll(".workTotTextTool")
    .remove()

    svg.selectAll(".workUSTextTool")
    .remove()



// bands.append("rect")
// 	.attr("x", 0)
// 	.attr("y", height*.25)
// 	.attr("width", width)
// 	.attr("height", height*.75)
// 	.attr("fill", "green")
// 	.attr('class',"bands")

  //   var xAxisL = svg.append("g")
  // .attr("transform", `translate(${allMargin.left+8},${allHeight - allMargin.bottom})`)
  // .attr("class", "x-axisL")
  //
  //   var xAxis = svg.append("g")
  //   .attr("transform", `translate(${halfAxis+gutter+allMargin.left},${allHeight - allMargin.bottom})`)
  //   .attr("class", "x-axis")


		// yearSelect = sliderStep.value()
    yearSelect = d3.select('#rangeSlider').property("value")


		dataFilterTool = csv.filter(function(d) { return d.year == yearSelect;})
			   .filter(function(d) { return d.statefip == input;});


		max = d3.max(dataFilterTool, function(d) { return +d.nativeBorn; });
		// x2.domain(1000000,0)

		x_all.domain([0, max+max*.15]).nice();
		xL_all.domain([max+max*.15,0]).nice();

			svg.selectAll(".y-axis")
			.call(d3.axisLeft(y_all)
			.tickPadding(10)
			.tickSize(0))
			.style('stroke','white')
			.style('fill', 'none')
			.style('stroke-width', '0px');

		y_all.domain(dataFilterTool.map(d => d.age_cohorts));
		yL_all.domain(dataFilterTool.map(d => d.age_cohorts));

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(d3.axisBottom(x_all).tickSizeOuter(0).ticks(8, "s"))

		svg.selectAll(".x-axisL").transition().duration(speed)
			.call(d3.axisBottom(xL_all).tickSizeOuter(0).ticks(8, "s"))



       	var bars = svg.selectAll( '.bars' ).data(dataFilterTool)
    	var bars2 = svg.selectAll( '.bars2' ).data(dataFilterTool)

    	bars.transition().duration(500)
            .attr("x", x_all(0)+halfAxis+gutter+allMargin.left)
            .attr("width", function(d) { return x_all(+d.foreignBorn); })

        bars2.transition().duration(500)
            .attr("x", function(d) { return xL_all(+d.nativeBorn)+allMargin.left;})
            .attr("width", function(d) { return x_all(+d.nativeBorn); })



    	bars.exit().remove();
    	bars2.exit().remove();



    	bars.enter().append( 'rect' )
          .attr("class", "bars")
          .attr("y",function(d) { return y_all(d.age_cohorts); })
            // .call(log, function(d) { return x(+d.nativeBorn)+halfAxis+margin; })
          .attr("height", y_all.bandwidth())
          .attr("x", x(0)+halfAxis+gutter+allMargin.left)
          .attr("width", function(d) { return x_all(+d.foreignBorn); })
          .attr('fill', "#6263F1");

		bars2.enter().append('rect')
			.attr("class", "bars2")
            .attr("y",function(d) { return yL_all(d.age_cohorts); })
            // .call(log, function(d) { return xL(+d.foreignBorn)+halfAxis; })
            .attr("height", yL_all.bandwidth())
            .attr("x", function(d) { return xL_all(+d.nativeBorn)+allMargin.left;})
            .attr("width", function(d) { return x_all(+d.nativeBorn); })
            .attr('fill', "#FF7150");


            perText = svg.append('text')
                    .data(dataFilterTool)
                  .attr('x',allWidth*.84)
                  .attr('y',allHeight*.45)
                  .attr('class',"percentTextTool")
                  .attr('z-index',10)
                  .attr('fill', "white")
                  .text(function(d) {return formatPercent(d.foreignWorkPer)});

                  descTextTool = svg.append('text')
                    .data(dataFilterTool)
                    .attr('x',allWidth*.84)
                    .attr('y',allHeight*.53)
                    .attr('class',"titleOrangeTool")
                    .attr('z-index',10)
                    .attr('fill', "white")
                    .text("Foreign Born");

                workingAgeTool = svg.append('text')
                  .attr('x',allWidth*-.22)
                  .attr('y',allHeight*.05)
                  .attr('class',"sideAge")
                  .attr('z-index',10)
                  .attr('fill', "white")
                  .style("text-anchor", "end")
                  .attr("transform", "translate(0," + allHeight + ")")
                  .attr("transform", "rotate(-90)")
                  .text("Working Age");


                  yearTextTool = svg.append('text')
                      .data(dataFilterTool)
                      .attr('x',allWidth*.84)
                      .attr('y',allHeight*.32)
                      .attr('class',"yearTextTool")
                      .attr('z-index',10)
                      .attr('fill', "white")
                      .text(function(d) {return (d.year)});

             workForTextTool = svg.append('text')
                    .data(dataFilterTool)
                    .attr('x',allWidth*.78)
                    .attr('y',allHeight*.885)
                    .attr('class',"workForTextTool")
                    .attr('z-index',10)
                    .attr('fill', "#6263F1")
                    .text(function(d) {return "Foreign Born Working Age: "+formatComma(d.workFor)});


                workTotalTool = svg.append('text')
                      .data(dataFilterTool)
                      .attr('x',allWidth*.5)
                      .attr('y',function(d) {if (window.innerWidth < 575) {return allHeight*.95 } else {return allHeight*.93}})
                      .attr('class',"workTotTextTool")
                      .attr('z-index',10)
                      .attr('fill', "#393745")
                      .text(function(d) {return "Total Working Age: "+formatComma(d.TotalWork)});


                  workUSTextTool = svg.append('text')
                        .data(dataFilterTool)
                        .attr('x',allWidth*.25)
                        .attr('y',allHeight*.885)
                        .attr('class',"workUSTextTool")
                        .attr('z-index',10)
                        .attr('fill', "#FF7150")
                        .text(function(d) {return "U.S.-Born Working Age: "+formatComma(d.workNat)});
	}


update2tool(stateSelect,500)

  //var sliderStep = d3
  //  .sliderBottom()
  //  .min(d3.min(year))
  //  .max(d3.max(year))
  //  .width(300)
  //  .tickFormat(d3.format('1'))
  //  .ticks(5)
  //  .step(1)
  //  .default(1)
  //  .on('onchange', val => {
  //    d3.select('p#value-step').text(d3.format('1')(val));
  //  });

  //var gStep = d3
  //  .select('div#slider-step')
  //  .append('svg')
  //  .attr('width', 500)
  //  .attr('height', 100)
  //  .append('g')
  //  .attr('transform', 'translate(30,30)');

  //gStep.call(sliderStep);

  //d3.select('p#value-step').text(d3.format('1')(sliderStep.value()));

	// var select = d3.select("#yearChart")
	// 	.on("change", function() {
	// 		update(this.value, 1000)
	// 	})

	var selectState = d3.select("#stateChart")
		.on("change", function() {
			var input = this.value
			update2tool(input, 100)
		})

  updatetool(2000,500)

}









/// HANDLES START HERE


function handleResize1() {
  // 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step1.style('height', stepHeight2 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();

}


function handleResize2() {
  var stepHeight2 = Math.floor(window.innerHeight * 0.75);

  step2.style('height', stepHeight2 + 'px');

  // 2. update width/height of graphic element

  graphic2.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin2 = 32;
  var textWidth2 = text2.node().offsetWidth;
  var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller2.resize();
}



function handleResize3() {
  step3.style('height', stepHeight3 + 'px');

  // 2. update width/height of graphic element

  graphic3.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin3 = 32;
  var textWidth3 = text3.node().offsetWidth;
  var chartWidth3 = graphic3.node().offsetWidth - textWidth3 - chartMargin3;

  chart3.style('width', chartWidth3 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller3.resize();

}

function handleResize4() {
  step4.style('height', stepHeight4 + 'px');

  // 2. update width/height of graphic element

  graphic4.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin4 = 32;
  var textWidth4 = text4.node().offsetWidth;
  var chartWidth4 = graphic4.node().offsetWidth - textWidth4 - chartMargin4;

  chart4.style('width', chartWidth4 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller4.resize();

}

function handleResize5() {
  step5.style('height', stepHeight5 + 'px');

  // 2. update width/height of graphic element

  graphic5.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin5 = 32;
  var textWidth5 = text5.node().offsetWidth;
  var chartWidth5 = graphic5.node().offsetWidth - textWidth5 - chartMargin5;

  chart5.style('width', chartWidth5 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller5.resize();

}

function handleResize6() {
  step6.style('height', stepHeight6 + 'px');

  // 2. update width/height of graphic element

  graphic6.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin6 = 32;
  var textWidth6 = text6.node().offsetWidth;
  var chartWidth6 = graphic6.node().offsetWidth - textWidth6 - chartMargin6;

  chart6.style('width', chartWidth6 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller6.resize();

}

function handleResize7() {
  step7.style('height', stepHeight7 + 'px');

  // 2. update width/height of graphic element

  graphic7.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin7 = 32;
  var textWidth7 = text7.node().offsetWidth;
  var chartWidth7 = graphic7.node().offsetWidth - textWidth7 - chartMargin7;

  chart7.style('width', chartWidth7 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller7.resize();

}

function handleResize8() {
  step8.style('height', stepHeight8 + 'px');

  // 2. update width/height of graphic element

  graphic8.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin8 = 32;
  var textWidth8 = text8.node().offsetWidth;
  var chartWidth8 = graphic8.node().offsetWidth - textWidth8 - chartMargin8;

  chart8.style('width', chartWidth8 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller8.resize();

}


// scrollama event handlers


function handleStepEnter1(response) {

	step1.classed('is-active', function (d, j) {
		return j === response.index;
	});





	// update graphic based on step
	chart1.select('p').text(response.index + 1);


	if (step1._groups[0][0].className === 'step1 is-active') {
		update(2000,500)
    $(".firstNav").css('color', '#21d279');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');
	}


  if (step1._groups[0][1].className === 'step1 is-active') {
		update(2002,500)
    $(".firstNav").css('color', '#21d279');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');
	}

  if (step1._groups[0][2].className === 'step1 is-active') {
		update(2004,500)
	}

  if (step1._groups[0][3].className === 'step1 is-active') {
		update(2006,500)
	}

  if (step1._groups[0][4].className === 'step1 is-active') {
		update(2008,500)
	}

  if (step1._groups[0][5].className === 'step1 is-active') {
    update(2010,100)
    $(".firstNav").css('color', '#21d279');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');
  }

  if (step1._groups[0][6].className === 'step1 is-active') {
    update(2012,500)
  }

  if (step1._groups[0][7].className === 'step1 is-active') {
    update(2014,500)
  }

  if (step1._groups[0][8].className === 'step1 is-active') {
    update(2016,500)
    $(".firstNav").css('color', '#21d279');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');
  }
  if (step1._groups[0][9].className === 'step1 is-active') {
    update(2018,500)
    lineChart(data[1])
  }



}



function handleStepEnter2(response) {


  step2.classed('is-active', function (d, j) {
		return j === response.index;
	});


  chart2.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step2._groups[0][0].className === 'step2 is-active') {


    if (lineToggle==0) {

        lineChart(data[1])

        $(".firstNav").css('color', '#21d279');
        $(".secondNav").css('color', '#393745');
        $(".thirdNav").css('color', '#393745');
        $(".fourthNav").css('color', '#393745');
        $(".fifthNav").css('color', '#393745');

    }

  }







  if (step2._groups[0][1].className === 'step2 is-active') {

    makeVisible()
    makeVisible2()
    makeVisible3()


  }

  if (step2._groups[0][3].className === 'step2 is-active') {



    greenMap(data[2])
    d3.selectAll('.caseTitle').remove()

    if (lineToggle == 1) {

      lineChart(data[1])

    }

    lineToggle=1

    $(".firstNav").css('color', '#21d279');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');


  }


}


function handleStepEnter3(response) {

  step3.classed('is-active', function (d, j) {
		return j === response.index;
	});

  chart3.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step3._groups[0][0].className === 'step3 is-active') {

    d3.selectAll('.caseTitle').remove()

    if (mapToggle1 ==0) {
        greenMap(data[2])
        d3.selectAll('.caseTitle').remove()
  }

    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#21d279');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');

      mapToggle1 = 0

  }


  if (step3._groups[0][1].className === 'step3 is-active') {
    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#21d279');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');

  }

  if (step3._groups[0][2].className === 'step3 is-active') {

    d3.selectAll('.caseTitle').remove()

    if (mapToggle1 ==0) {

    slowGreen(data[2])
  }

  }



  if (step3._groups[0][4].className === 'step3 is-active') {



    d3.selectAll('.caseTitle').remove()


    if (mapToggle1 == 0) {
      bringUpFeature(data[2])

    }
    else {
      slowGreen()
    }

  }

  if (step3._groups[0][5].className === 'step3 is-active') {
    // d3.selectAll(".y-axis")
    // .remove()
    //
    // d3.selectAll(".y-axisL")
    // .remove()
    //
    // d3.selectAll(".x-axis")
    // .remove()
    //
    // d3.selectAll(".x-axisL")
    // .remove()

    d3.selectAll(".barsGeo").remove()
    d3.selectAll(".bars2Geo").remove()

    d3.selectAll(".bandsGeo").remove()
    geoBarPlacement()

    if (mapToggle1==0) {
        GeorgiaCase()
        georgiaBar(2000,100)
        mapToggle1= 1
    }

    else {

        greenMap(data[2])
        mapToggle1=1

    }

}

}

function handleStepEnter4(response) {

  step4.classed('is-active', function (d, j) {
		return j === response.index;
	});

  chart4.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step4._groups[0][0].className === 'step4 is-active') {


    mapToggle1=1

    georgiaBar(2000,500)
    d3.selectAll(".upFrontState").remove()
    d3.selectAll('.caseTitle').remove()


  }
  if (step4._groups[0][1].className === 'step4 is-active') {

    georgiaBar(2002,500)
  }

  if (step4._groups[0][2].className === 'step4 is-active') {
    georgiaBar(2004,500)
  }

  if (step4._groups[0][3].className === 'step4 is-active') {
    georgiaBar(2006,500)
  }

  if (step4._groups[0][4].className === 'step4 is-active') {
    georgiaBar(2008,500)
  }

  if (step4._groups[0][5].className === 'step4 is-active') {
    georgiaBar(2010,500)
  }

  if (step4._groups[0][6].className === 'step4 is-active') {
    georgiaBar(2012,500)
  }

  if (step4._groups[0][7].className === 'step4 is-active') {
    georgiaBar(2014,500)
  }

  if (step4._groups[0][8].className === 'step4 is-active') {
    georgiaBar(2016,500)
  }
  if (step4._groups[0][9].className === 'step4 is-active') {
    georgiaBar(2018,500)

    d3.selectAll('.caseTitle').remove()

    orangeMap(data[2])

    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#21d279');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');
  }



}

function handleStepEnter5(response) {

  step5.classed('is-active', function (d, j) {
		return j === response.index;
	});

  chart5.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step5._groups[0][0].className === 'step5 is-active') {

    d3.selectAll('.caseTitle').remove()

    if (mapToggle2 ==0) {
        orangeMap(data[2])
        d3.selectAll('.caseTitle').remove()
  }


    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#21d279');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');

    mapToggle2 = 0

  }

  if (step5._groups[0][2].className === 'step5 is-active') {

    d3.selectAll('.caseTitle').remove()

    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#21d279');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');

    if (mapToggle2 ==0) {

    slowOrange()
  }

  }



  if (step5._groups[0][4].className === 'step5 is-active') {

    d3.selectAll('.caseTitle').remove()


     if (mapToggle2 == 0) {
       bringUpFeature2(data[2])
     }

     else {
       slowOrange()
     }

  }

  if (step5._groups[0][7].className === 'step5 is-active') {

    d3.selectAll(".barsMich").remove()
    d3.selectAll(".bars2Mich").remove()

    d3.selectAll(".bandsMich").remove()
    michBarPlacement()

    if (mapToggle2==0) {
        MichCase()
        michiganBar(2000,100)
        mapToggle2= 1
    }

    else {
        orangeMap(data[2])
        mapToggle2=1
    }


}

}



function handleStepEnter6(response) {

  step6.classed('is-active', function (d, j) {
		return j === response.index;
	});

  chart6.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step6._groups[0][0].className === 'step6 is-active') {

    if (michGlobal==0) {michBarPlacement ()}
    michiganBar(2000,500)
    d3.selectAll(".upFrontState2").remove()
    d3.selectAll('.caseTitle').remove()


  }
  if (step6._groups[0][1].className === 'step6 is-active') {

    michiganBar(2002,500)
  }

  if (step6._groups[0][2].className === 'step6 is-active') {
    michiganBar(2004,500)
  }

  if (step6._groups[0][3].className === 'step6 is-active') {
    michiganBar(2006,500)
  }

  if (step6._groups[0][4].className === 'step6 is-active') {
    michiganBar(2008,500)
  }

  if (step6._groups[0][5].className === 'step6 is-active') {
    michiganBar(2010,500)
  }

  if (step6._groups[0][6].className === 'step6 is-active') {
    michiganBar(2012,500)
  }

  if (step6._groups[0][7].className === 'step6 is-active') {
    michiganBar(2014,500)
  }

  if (step6._groups[0][8].className === 'step6 is-active') {
    michiganBar(2016,500)
  }
  if (step6._groups[0][9].className === 'step6 is-active') {
    michiganBar(2018,500)
    d3.selectAll('.caseTitle').remove()

    purpleMap(data[2])
    d3.selectAll('.caseTitle').remove()
    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#21d279');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#393745');

  }



}

function handleStepEnter7(response) {

  step7.classed('is-active', function (d, j) {
		return j === response.index;
	});

  chart7.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step7._groups[0][0].className === 'step7 is-active') {

    d3.selectAll('.caseTitle').remove()
    if (mapToggle3 ==0) {
        purpleMap(data[2])
        d3.selectAll('.caseTitle').remove()
  }

    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#21d279');
    $(".fifthNav").css('color', '#393745');

    mapToggle3 =0

  }

  if (step7._groups[0][2].className === 'step7 is-active') {

    d3.selectAll('.caseTitle').remove()

    if (mapToggle3 ==0) {

    slowPurple()
  }

    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#21d279');
    $(".fifthNav").css('color', '#393745');


  }

  if (step7._groups[0][4].className === 'step7 is-active') {
      d3.selectAll('.caseTitle').remove()

      if (mapToggle3 == 0) {
        bringUpFeature3(data[2])
      }

      else {
        slowPurple()
      }

  }

  if (step7._groups[0][6].className === 'step7 is-active') {

    d3.selectAll(".barsNJer").remove()
    d3.selectAll(".bars2NJer").remove()

    d3.selectAll(".bandsNJer").remove()
    njerBarPlacement()


    if (mapToggle3==0) {
        NJerCase()
        newjerseyBar(2000,100)
        mapToggle3= 1
    }

    else {
        purpleMap(data[2])
        mapToggle3=1
    }


}

}


function handleStepEnter8(response) {

  step8.classed('is-active', function (d, j) {
		return j === response.index;
	});

  chart8.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step8._groups[0][0].className === 'step8 is-active') {

    if (njerGlobal==0) {njerBarPlacement ()}
    newjerseyBar(2000,500)


    d3.selectAll(".newjersey").remove()
    d3.selectAll('.caseTitle').remove()



  }
  if (step8._groups[0][1].className === 'step8 is-active') {

    newjerseyBar(2002,500)
  }

  if (step8._groups[0][2].className === 'step8 is-active') {
    newjerseyBar(2004,500)
  }

  if (step8._groups[0][3].className === 'step8 is-active') {
    newjerseyBar(2006,500)
  }

  if (step8._groups[0][4].className === 'step8 is-active') {
    newjerseyBar(2008,500)
  }

  if (step8._groups[0][5].className === 'step8 is-active') {
    newjerseyBar(2010,500)
  }

  if (step8._groups[0][6].className === 'step8 is-active') {
    newjerseyBar(2012,500)
  }

  if (step8._groups[0][7].className === 'step8 is-active') {
    newjerseyBar(2014,500)
  }

  if (step8._groups[0][8].className === 'step8 is-active') {
    newjerseyBar(2016,500)
    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#21d279');
    $(".fifthNav").css('color', '#393745');
  }
  if (step8._groups[0][9].className === 'step8 is-active') {
    newjerseyBar(2018,500)

    $(".firstNav").css('color', '#393745');
    $(".secondNav").css('color', '#393745');
    $(".thirdNav").css('color', '#393745');
    $(".fourthNav").css('color', '#393745');
    $(".fifthNav").css('color', '#21d279');

  }



}

function handleStepEnter9(response) {


  step9.classed('is-active', function (d, j) {
		return j === response.index;
	});


  chart9.select('p').text(response.index + 1);
	// Promise.all([someData, otherData).then(next);


  if (step9._groups[0][0].className === 'step9 is-active') {


  }

}









//handleContainerEnter

function handleContainerEnter1(response) {
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerEnter2(response) {
  graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerEnter3(response) {
  graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerEnter4(response) {
  graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerEnter5(response) {
  graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerEnter6(response) {
  graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerEnter7(response) {
  graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerEnter8(response) {
  graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}


//handleContainterExit

function handleContainerExit1(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit2(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit3(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit4(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit5(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit6(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit7(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit8(response) {
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}



function init() {

	scroller1.setup({
		step: '.scroll__text1 .step1',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter1)
	.onContainerEnter(handleContainerEnter1).onContainerExit(handleContainerExit1);


  scroller2.setup({
    step: '.scroll__text2 .step2',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller3.setup({
    step: '.scroll__text3 .step3',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter3)
  .onContainerEnter(handleContainerEnter3).onContainerExit(handleContainerExit3);

  scroller4.setup({
    step: '.scroll__text4 .step4',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter4)
  .onContainerEnter(handleContainerEnter4).onContainerExit(handleContainerExit4);

  scroller5.setup({
    step: '.scroll__text5 .step5',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter5)
  .onContainerEnter(handleContainerEnter5).onContainerExit(handleContainerExit5);

  scroller6.setup({
    step: '.scroll__text6 .step6',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter6)
  .onContainerEnter(handleContainerEnter6).onContainerExit(handleContainerExit6);

  scroller7.setup({
    step: '.scroll__text7 .step7',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter7)
  .onContainerEnter(handleContainerEnter7).onContainerExit(handleContainerExit7);

  scroller8.setup({
    step: '.scroll__text8 .step8',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter8)
  .onContainerEnter(handleContainerEnter8).onContainerExit(handleContainerExit8);


}





init();

}
