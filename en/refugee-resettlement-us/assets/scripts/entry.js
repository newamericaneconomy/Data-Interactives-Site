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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var width = window.innerWidth,
    height = window.innerHeight;

//1
var container1 = d3.select('#line-scroll');
var graphic1 = container1.select('.scroll__figure1');
var chart1 = graphic1.select('.figure__chart1');
var text1 = container1.select('.scroll__text1');
var step1 = text1.selectAll('.step1');

//2
var container2 = d3.select('#refugee-scroll');
var graphic2 = container2.select('.scroll__figure2');
var chart2 = graphic2.select('.figure__chart2');
var text2 = container2.select('.scroll__text2');
var step2 = text2.selectAll('.step2');

//3
var container3 = d3.select('#buffalo-scroll');
var graphic3 = container3.select('.scroll__figure3');
var chart3 = graphic3.select('.figure__chart3');
var text3 = container3.select('.scroll__text3');
var step3 = text3.selectAll('.step3');

//4
var container4 = d3.select('#video-scroll');
var graphic4 = container4.select('.scroll__figure4');
var chart4 = graphic4.select('.figure__chart4');
var text4 = container4.select('.scroll__text4');
var step4 = text4.selectAll('.step4');

// initialize the scrollama
var scroller1 = scrollama();
var scroller2 = scrollama();
var scroller3 = scrollama();
var scroller4 = scrollama();

var svg1 = d3.select(".scroll__figure1")
		  .append("svg")
		  .attr("id", "svg1");

var svg2 = d3.select(".exploratory_viz")
		  .append("svg")
		  .attr("id", "svg2");

var svg3 = d3.select(".exploratory_viz")
		  .append("svg")
		  .attr("id", "svg3");

var tooltip = d3.select(".scroll__figure1").append("div").attr("class", "tooltip").style("background", "#fff").style("position", "absolute").style("z-index", "999").style("visibility", "hidden");

const parseDate = d3.timeParse("%Y");

var refugeeData = d3.csv("assets/refugee_growth_2002_2018.csv", ({Year,Num_Year, National_Total}) => ({x: new Date(Year), x1: +Year, y: +National_Total}));

var travelBanData = d3.csv("assets/travel_ban_data.csv");

var travelBanLines = d3.csv("assets/travel_ban_data_lines.csv");

var us = d3.json("assets/states.json");

var refugeeCities = d3.csv("assets/refugees_top_513_geocode.csv", d => ({
	type: "Feature",
	properties: {state: d.State, city: d.City, total: +d.Total, lat: +d.Latitude, long: +d.Longitude},
	geometry: {
		type: "Point",
		coordinates: [+d.Longitude, +d.Latitude]
	}
}));

var cityOrigin = d3.csv("assets/refugee_origin_totals.csv");

	Promise.all([refugeeData, travelBanData, travelBanLines, us, refugeeCities, cityOrigin]).then(change);

	function change(data) {
	    
	    refugeeData = data[0];
	    // refugeeData.x = "Year";
	    // refugeeData.x1 = "Alternate Year";
	    // refugeeData.y = "National Total";

	    travelBanData = data[1];

	    travelBanData.forEach(d => {
			d.Year = parseDate(d.Year);
		});

		travelBanLines = data[2];

	    travelBanLines.forEach(d => {
			d.Year = parseDate(d.Year);
		});

		us = data[3];

		var us_states = topojson.feature(us, us.objects.states);

		refugeeCities = data[4];

		cityOrigin = data[5];

		cityOrigin.forEach(d => {
			d["2002"] = +d["2002"];
			d["2003"] = +d["2003"];
			d["2004"] = +d["2004"];
			d["2005"] = +d["2005"];
			d["2006"] = +d["2006"];
			d["2007"] = +d["2007"];
			d["2008"] = +d["2008"];
			d["2009"] = +d["2009"];
			d["2010"] = +d["2010"];
			d["2011"] = +d["2011"];
			d["2012"] = +d["2012"];
			d["2013"] = +d["2013"];
			d["2014"] = +d["2014"];
			d["2015"] = +d["2015"];
			d["2016"] = +d["2016"];
			d["2017"] = +d["2017"];
			d["2018"] = +d["2018"];
			d.total = +d.total;
		})

	    var margin = ({top: 45, right: 45, bottom: 145, left: 45});

	    //Stacked Chart Variables
	    var keys = travelBanData.columns.slice(1,7);

	    // console.log(travelBanData);
	    // console.log(keys);

	    var stackedColor = d3.scaleOrdinal()
	    	.domain(keys)
	    	.range(["url(#area-gradient-iran)", "rgba(232, 237, 237, 0.5)", "url(#area-gradient-somalia)", "url(#area-gradient-syria", "rgba(155, 158, 160, 0.5)", "rgba(193, 198, 198, 0.5)"]);

	    var xStack = d3.scaleTime()
	    	.domain(d3.extent(travelBanData, d => d.Year))
		    .range([margin.left*1.3, width - 0.5*width]);

		var xStackAxis = g => g
		    .attr("transform", `translate(0,${height - margin.bottom})`)
		    .call(d3.axisBottom(xStack).ticks(width / 80).tickSizeOuter(0));

		var yStack = d3.scaleLinear()
			.domain([0, 31000]).nice()
			.range([height - margin.bottom, margin.top]);

		var yStackAxis = g => g
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")
		.call(d3.axisLeft(yStack));

		// Add X axis label:
		  // svg.append("text")
		  //     .attr("text-anchor", "end")
		  //     .attr("x", width)
		  //     .attr("y", height+40 )
		  //     .text("Time (year)");

		  // // Add Y axis label:
		  // svg.append("text")
		  //     .attr("text-anchor", "end")
		  //     .attr("x", 0)
		  //     .attr("y", -20 )
		  //     .text("# of baby born")
		  //     .attr("text-anchor", "start")

		// var dateFormatter = d3.timeFormat("%Y");

		//Area Chart Variables

		var x = d3.scaleTime()
		.domain(d3.extent(refugeeData, d => d.x))
		.range([margin.left*1.3, width - 0.5*width]);

		var y = d3.scaleLinear()
		.domain([0, d3.max(refugeeData, d => d.y)]).nice()
		.range([height - margin.bottom, margin.top]);

		var xAxis = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")
		.call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

		var yAxis = g => g
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")
		.call(d3.axisLeft(y))
		.call(g => g.select(".domain").remove())
		.call(g => g.select(".tick:last-of-type text").clone()
		    .attr("x", 0)
		    .attr("text-anchor", "start")
		    .attr("font-weight", "bold")
		    .text(refugeeData.y));

		function make_y_gridlines() {		
		    return d3.axisLeft(y)
		        .ticks(9)
		}

		// gridlines in y axis function
		// function make_y_gridlines() {		
		//     return d3.axisLeft(y)
		//         .ticks(5)
		// }

		//Add Y grid lines
		svg1.append("g")			
	      .attr("class", "grid")
	      .attr("transform", "translate(45," + 0 + ")")
	      .call(make_y_gridlines()
	          .tickSize(-width/2)
	          .tickFormat("")
	      );

		var subsetGrowth = refugeeData.filter(function(d) {
			return d.x1 <= 2016;
		});

		var subsetReduce = refugeeData.filter(function(d) {
			return d.x1 >= 2016;
		});

		svg1.append("clipPath")
	      .attr("id", "clip")
	    .append("rect")
	      .attr("width", width)
	      .attr("height", height);

		var line = d3.line()
		  .defined(d => !isNaN(d.y))
		  .x(d => x(d.x))
		  .y(d => y(d.y));

		var	area = d3.area()
	    .x(d => x(d.x))
	    .y0(height)
		.y1(d => y(d.y));

		svg1.append("g")
		  .call(xAxis);

		svg1.append("g")
		  .call(yAxis);


		//Colors for Line / Area chart
		var colorsGreen = d3.scaleOrdinal(["rgba(33, 210, 121, 0.1)","rgba(33, 210, 121, 0.5)"]);

		var colorsRed = d3.scaleOrdinal(["rgba(209, 32, 32, 0.1)","rgba(209, 32, 32, 0.5)"]);

		//Colors for Stacked Area chart
		var colorsIran = d3.scaleOrdinal(["rgba(23, 102, 155, 0.6)", "rgba(23, 102, 155, 0.1)"]);

		var colorsSomalia = d3.scaleOrdinal(["rgba(255, 219, 33, 0.6)", "rgba(255, 219, 33, 0.1)"]);

		var colorsSyria = d3.scaleOrdinal(["rgba(168, 130, 204, 0.6)", "rgba(168, 130, 204, 0.1)"])


		// Defs for line and area chart
		var defsGreen = svg1.append('defs');

		defsGreen.append("linearGradient")
		.attr("id", "area-gradient-green")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("spreadMethod", "pad")
		.style("mix-blend-mode","color-dodge")
		.attr("x1", 0).attr("y1", y(0))
		.attr("x2", 0).attr("y2", y(100000))
		.selectAll("stop")
		.data([{offset: "5%", color: "rgba(33, 210, 121, 0)"},
			{offset: "100%", color: "rgba(33, 210, 121, 0.5)"}])
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset; })
		.attr("stop-color", function(d) { return d.color; });

		var defsRed = svg1.append('defs');

		defsRed.append("linearGradient")
		.attr("id", "area-gradient-red")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("spreadMethod", "pad")
		.style("mix-blend-mode","color-dodge")
		.attr("x1", 0).attr("y1", y(0))
		.attr("x2", 0).attr("y2", y(100000))
		.selectAll("stop")
		.data([{offset: "5%", color: "rgba(209, 32, 32, 0)"},
			{offset: "100%", color: "rgba(209, 32, 32, 0.5)"}])
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset; })
		.attr("stop-color", function(d) { return d.color; });

		//Defs for Stacked Area chart
		var defsIran = svg1.append('defs');

		defsIran.append("linearGradient")
		.attr("id", "area-gradient-iran")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("spreadMethod", "pad")
		.style("mix-blend-mode","color-dodge")
		.attr("x1", 0).attr("y1", y(0))
		.attr("x2", 0).attr("y2", y(15000))
		.selectAll("stop")
		.data([{offset: "-20%", color: "rgba(23, 102, 155, 0.4)"},
			{offset: "90%", color: "rgba(23, 102, 155, 0.8)"}])
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset; })
		.attr("stop-color", function(d) { return d.color; });

		var defsSomalia = svg1.append('defs');

		defsSomalia.append("linearGradient")
		.attr("id", "area-gradient-somalia")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("spreadMethod", "pad")
		.style("mix-blend-mode","color-dodge")
		.attr("x1", 0).attr("y1", y(0))
		.attr("x2", 0).attr("y2", y(30000))
		.selectAll("stop")
		.data([{offset: "0%", color: "rgba(255, 219, 33, 0.2)"},
			{offset: "90%", color: "rgba(255, 219, 33, 0.9)"}])
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset; })
		.attr("stop-color", function(d) { return d.color; });

		var defsSyria = svg1.append('defs');

		defsSyria.append("linearGradient")
		.attr("id", "area-gradient-syria")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("spreadMethod", "pad")
		.style("mix-blend-mode","color-dodge")
		.attr("x1", 0).attr("y1", y(0))
		.attr("x2", 0).attr("y2", y(90000))
		.selectAll("stop")
		.data([{offset: "0%", color: "rgba(168, 130, 204, 0.2)"},
			{offset: "90%", color: "rgba(168, 130, 204, 0.9)"}])
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset; })
		.attr("stop-color", function(d) { return d.color; });

		//Graph labels
		svg1.append("text")
		.style("fill", "#fff")
		.style("font-weight", "bold")
		.attr("x", width)
		.attr("y", 600)
		.text("Number of Investigations by Department of Education");

		svg1.append("text")
		.attr("text-anchor", "end")
		.attr("font-size", "15px")
		.attr("font-weight", "bold")
		.attr("y", height - margin.bottom + 15)
		.attr("x", width)
		.style("fill", "#fff")
		.text("Year");

		//map
		var projection = d3.geoAlbersUsa()
    		// .scale(width/1.4);
    		.translate([401, 250]);

		svg2.append("path")
	        .datum(topojson.merge(us, us.objects.states.geometries))
	        .attr("fill", "rgba(0,0,0,0.02)")
	        .attr("stroke", "#c9c9c9")
	        .attr("stroke-width", 0.75)
	        .attr("d", d3.geoPath())
	        .attr("transform", function(d) {
	          return "scale(" + width/1807.05 + ")"
	        });

	    svg2.append("path")
	        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
	        .attr("fill", "rgba(0,0,0,0)")
	        .attr("stroke", "#b7b7b7")
	        .attr("stroke-linejoin", "round")
	        .attr("d", d3.geoPath())
	        .attr("transform", function(d) {
	          return "scale(" + width/1807.05 + ")"
	        });

	    for (let d of refugeeCities) {
	    	// console.log(d);
	    	var path = d3.geoPath(projection);
	    	var centroidX = path.centroid(d)[0];
	    	var centroidY = path.centroid(d)[1];
	    	var node = svg2.append("path")
	    	  .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", path.pointRadius(width/1807.05*(Math.log(d.properties.total)*Math.sqrt(Math.log(d.properties.total)))))
              .attr("transform", `translate(${centroidX, centroidY})`)
              .attr("transform", function(d) {
		          return "scale(" + width/1508.05 + ")"
		        })
              .attr("stroke", "#fff")
              .attr("stroke-width", 0.5)
              .attr("fill", "rgba(33, 210, 121, 0.2)")
              // .style('stroke', 'black').style('stroke-width', 0.5)
              .attr("opacity", 1)
              .attr("class", "map-path")
              .on("mouseover", function (radial) {
              	svg3.selectAll("g").remove();
              	var selectCity = d.properties.city;
              	var selectState = d.properties.state;

              	// console.log(cityOrigin);

              	var radialDataCity = cityOrigin.filter(function(c) {
	    			return c.City === selectCity;
	    		});

	    		// console.log(radialDataCity[0]["Origin"]);
	    		// console.log(radialDataCity.length);

              	radialDataCity.columns = cityOrigin.columns;
	    		// console.log(radialDataCity);

	    		var radialDataCityState = radialDataCity.filter(function(s) {
		    		// console.log(selectState);
		    		return s.State === selectState;
		    	});

		    	var origins =[];

		    	// origins.push(radialDataCityState[0]["Origin"]);
		    	// origins.push(radialDataCityState[1]["Origin"]);
		    	// console.log(origins);

	    		for (var i = 0; i < radialDataCityState.length; ++i) {
	    			origins.push(radialDataCityState[i]["Origin"]);
	    		}

	    		// console.log(origins);

	    		var radialDataSort = radialDataCityState.sort(function(a, b) {
	    			return b.origin - a.origin;
	    		});

	    		radialDataSort = radialDataSort.filter(function(d, i) {
					return i < 10;
				});

				// console.log(radialDataSort);

		    	radialDataSort.columns = radialDataCity.columns;
		    	// console.log(radialDataCityState);
		    	//Stacked Chart Variables
			    var keysExp = origins;
			    console.log(keysExp);

			    var originCityState = radialDataSort.map(obj => ({
			    	origin: obj.Origin,
			    	2002: obj["2002"],
			    	2003: obj["2003"],
			    	2004: obj["2004"],
			    	2005: obj["2005"],
			    	2006: obj["2006"],
			    	2007: obj["2007"],
			    	2008: obj["2008"],
			    	2009: obj["2009"],
			    	2010: obj["2010"],
			    	2011: obj["2011"],
			    	2012: obj["2012"],
			    	2013: obj["2013"],
			    	2014: obj["2014"],
			    	2015: obj["2015"],
			    	2016: obj["2016"],
			    	2017: obj["2017"],
			    	2018: obj["2018"],
			    	total: obj.total
			    }));

			    originCityState.columns = ["origin", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
			    console.log(originCityState);

			 //    var result = Object.assign(...Object.keys(originCityState[0]).map( key =>
				//     ({ [key]: originCityState.map( o => o[key] ) })
				// ));

				// console.log(result);

			 //    var stackedColorExp = d3.scaleOrdinal()
			 //    	.domain(keysExp)
			 //    	.range(d3.interpolateViridis);

			 //    var xStackExp = d3.scaleTime()
			 //    	.domain([])
				//     .range([margin.left*1.3, width - 0.5*width]);

				// var xStackAxis = g => g
				//     .attr("transform", `translate(0,${height - margin.bottom})`)
				//     .call(d3.axisBottom(xStack).ticks(width / 80).tickSizeOuter(0));

				// var yStack = d3.scaleLinear()
				// 	.domain([0, 31000]).nice()
				// 	.range([height - margin.bottom, margin.top]);

				// var yStackAxis = g => g
				// .attr("transform", `translate(${margin.left},0)`)
				// .attr("class", "y-axis")
				// .call(d3.axisLeft(yStack));

		    	// console.log(radialDataCityState);
		    	// var origins = radialDataCityState.keys("Origin");
		    	// console.log(origins);
// 		    	var radialKeys = radialDataCityState.columns.slice(3);

// 	    		console.log(radialKeys);
// 		    	// var slices = radialDataCityState.columns.slice(2);
// 		    	// // .slice[18];
// 		    	// console.log(slices);

// 	    		// console.log(radialDataCityState);
	    		var innerRadius = 90;
	    		var outerRadius = 220;

	    		var xRadial = d3.scaleBand()
				    .domain(originCityState.map(d => d.origin))
				    .range([0, 2 * Math.PI])
				    .align(0);

				//maintain area proportionality of radial bars
				var yRadial = d3.scaleLinear()
					.domain([0, d3.max(originCityState, d => d.total)])
					.range([innerRadius, outerRadius]);

				// console.log(originCityState.columns.slice(1));

				var z = d3.scaleOrdinal()
				    .domain(originCityState.columns.slice(1))
				    .range(["#000086", "#19009a", "#3f00a8", "#5e00ae", "#7d00ac", "#9a00a0",  "#b0008d", "#c7177f", "#d92d66", "#ec4656", "#fb664d", "#ff8447", "#ffa145", "#ffb93f", "#ffd83f", "#fff049", "#feff86"]);

		    	var arc = d3.arc()
		    		.innerRadius(d => yRadial(d[0]))
		    		.outerRadius(d => yRadial(d[1]))
		    		.startAngle(d => xRadial(d.data.origin))
		    		.endAngle(d => xRadial(d.data.origin) + xRadial.bandwidth())
		    		.padAngle(0.01)
		    		.padRadius(innerRadius);

		    	// var origins = d3.map(radialDataCityState, function(d) { return (d.Origin)}).keys(radialKeys);

		    	// console.log(d3.stack().keys(originCityState.columns.slice(1))(originCityState));

		    	svg3.append("g")
		    		.selectAll("g")
		    		.data(d3.stack().keys(originCityState.columns.slice(1))(originCityState))
		    		.enter().append("g")
		    			.attr("fill", d => z(d.key))
		    		.selectAll("path")
		    		.data(d => d)
		    		.enter().append("path")
		    			.attr("d", arc)
		    			.attr("class", "radialBar");

				var xRadialAxis = g => g
					.attr("text-anchor", "middle")
					.call(g => g.selectAll("g")
						.data(originCityState)
						.enter().append("g")
							.attr("transform", d => `rotate(${((xRadial(d.origin) + xRadial.bandwidth() / 2) * 180 / Math.PI - 90)})
								translate(${innerRadius}, 0)`
								)
							.call(g => g.append("line")
								.attr("x2", -5)
								.attr("stroke", "#ccc"))
							.call(g => g.append("text")
								.attr("transform", d => (xRadial(d.origin) + xRadial.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)")
								.text(d => d.origin)));

				var yRadialAxis = g => g
					.attr("text-anchor", "middle")
				    .call(g => g.append("text")
				        .attr("y", d => -y(yRadial.ticks(5).pop()))
				        .attr("dy", "-1em")
				        .text("Refugees Resettled"))
				    .call(g => g.selectAll("g")
				      .data(yRadial.ticks(5).slice(1))
				      .enter().append("g")
				        .attr("fill", "none")
				        .call(g => g.append("circle")
				            .attr("stroke", "#ccc")
				            .attr("stroke-opacity", 0.5)
				            .attr("r", yRadial))
				        .call(g => g.append("text")
				            .attr("y", d => -y(d))
				            .attr("dy", "0.35em")
				            .attr("stroke", "#fff")
				            .attr("stroke-width", 5)
				            .text(yRadial.tickFormat(5, "s"))
				         .clone(true)
				            .attr("fill", "#ccc")
				            .attr("stroke", "none")));

				var radialLegend = g => g.append("g")
					.selectAll("g")
					.data(originCityState.columns.slice(1).reverse())
					.enter().append("g")
						.attr("transform", (d, i) => `translate(230,${(i - (originCityState.columns.length - 1) / 2) * 20})`)
					    .call(g => g.append("rect")
					        .attr("width", 18)
					        .attr("height", 18)
					        .attr("fill", z))
					    .call(g => g.append("text")
					        .attr("x", 24)
					        .attr("y", 9)
					        .attr("dy", "0.35em")
					        .text(d => d));
// console.log(radialDataCityState.columns.slice(2));

		    	svg3.append("g")
		    		.call(xRadialAxis);

		    	svg3.append("g")
		    		.call(yRadialAxis);

		    	svg3.append("g")
		    		.call(radialLegend);
              });
	    }

	    // svg2.append("g")
	    // 	.attr("fill", "rgba(33, 210, 121, 0.4)")
	    // 	.attr("stroke", "#fff")
	    // 	.attr("stroke-width", 0.5)
	    //   .selectAll("circle")
	    //   .data(refugeeCities
	    //   	.map(d => (d.Total = Total.get(d.City), d))
	    //   	.sort((a, b) => b.Total - a.Total))
	    //   .join("circle")

	    // var city = svg2.append('g')
	    // 	.attr("class", "cities")
	    // 	.selectAll("g")
	    // 		.data(refugeeCities)
	    // 	.enter().append("g")
	    // 		.attr("class", "city");

	    // city.append("circle")
	    // 	.attr("r", function(d, i) { return Math.sqrt(d.Total); })

//1
function handleResize1() {

	// 1. update height of step elements
	var stepHeight1 = Math.floor(window.innerHeight * 0.75);
	step1.style('height', stepHeight1 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight1 / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
}
// scrollama event handlers
function handleStepEnter1(response) {
	
	step1.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart1.select('p').text(response.index + 1);
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// // update graphic1 based on step 1
	if (step1._groups[0][0].className === 'step1 is-active') {
		svg1.selectAll("rect").remove();
		svg1.selectAll("path").remove();
	 //Red Decline Section

	 	svg1.append("path")
	      .data([subsetReduce])
	      .attr("class", "area")
	      .attr('d', area)
	      .attr('fill', 'url(#area-gradient-red)');

		svg1.append("path")
		    .datum(subsetReduce)
		    .attr("fill", "none")
		    .attr("stroke", "#d12020")
		    .attr("stroke-width", 4)
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("d", line);

		// //Green Increase Section

	 	svg1.append("path")
	      .data([subsetGrowth])
	      .attr("class", "area")
	      .attr('d', area)
	      .attr('fill', 'url(#area-gradient-green)');

		svg1.append("path")
		    .datum(subsetGrowth)
		    .attr("fill", "none")
		    .attr("stroke", "#21d279")
		    .attr("stroke-width", 4)
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("d", line);

		// var circles = svg1.selectAll("circle")
		//   .data(refugeeData);

		//   circles.enter()
		//   .append("circle")
		//   .attr("cx", function(d) { return x(d.x); })
		//   .attr("cy", function(d) { return y(d.y); })
		//   .attr("r", 6)
		//   .style("fill", "rgba(0,0,0,0)")
		//   .style("stroke", function(d) {
		//   	if (d.x1 <= 2016) {
		//   		return "#7de0c7";
		//   	} else {
		//   		return "#e24e28";
		//   	}
		//   })
		//   .style("stroke-width", "2.75px")
		  // .on("mouseover", function(d) {
		  //   d3.selectAll("path").style("opacity", 0.5);
		  //   d3.selectAll("circle").style("opacity", 0.5);
		  //   d3.select(this)
		  //     .attr("r", 15)
		  //     .style("opacity", 1)
		  //     .style("stroke", function(d) {
			 //  	if (d.x1 <= 2016) {
			 //  		return "#7de0c7";
			 //  	} else {
			 //  		return "#e24e28";
			 //  	}
			 //  })
		  //     .style("opacity", 1)
		  //     .raise();
		  //   })
		  //   .on("mouseout", function(d) {
		  //     d3.selectAll("path").style("opacity", 1);
		  //     d3.selectAll("circle").style("opacity", 1);
		  //     d3.selectAll("circle")
		  //     	.attr("r", 6)
		  //     	.style("stroke", "#7de0c7")
		  //     	.style("opacity", 1);
		  //   });

		var curtain = svg1.append('rect')
		    .attr('x', -1 * width - margin.left/5)
		    .attr('y', -1 * height + margin.bottom)
		    .attr('height', height - margin.top*4.32)
		    .attr('width', width - 0.02*width)
		    .attr('class', 'curtain')
		    .attr('transform', 'rotate(180)')
		    .style('fill', '#fff');

		var t = svg1.transition()
			.ease(d3.easeLinear)
		    .delay(750)
		    .duration(2000)
		    .on('end', function() {
		      d3.select('line.guide')
		        .transition()
		        .style('opacity', 0)
		        .remove()
		    });

		t.select('rect.curtain')
		.attr('width', width/1.775);

	}

	// // update graphic1 based on step 2
	if (step1._groups[0][1].className === 'step1 is-active') {

		var t1 = svg1.transition()
			.ease(d3.easeLinear)
		    .delay(0)
		    .duration(5000)
		    .on('end', function() {
		      d3.select('line.guide')
		        .transition()
		        .style('opacity', 0)
		        .remove()
		    });

		t1.select('rect.curtain')
		.attr('width', 0);
	}

	// // update graphic1 based on step 2
	if (step1._groups[0][2].className === 'step1 is-active') {

		svg1.selectAll("path").remove();
		// svg1.selectAll("circle").remove();

		var areaChart = svg1.append('g');

		// var areaIranCircles = svg1.append('g');
		// var areaSyriaCircles = svg1.append('g');
		// var areaSomaliaCircles = svg1.append('g');

		var lineChartIran = svg1.append('g');
		var lineChartSomalia = svg1.append('g');
		var lineChartSyria = svg1.append('g');

		// Area generator
		var stackedArea = d3.area()
		.x(d => xStack(d.data.Year))
		.y0(d => yStack(d[0]))
		.y1(d => yStack(d[1]));

		var stackedData = d3.stack();
	    	stackedData.keys(keys);
	    	stackedData.order(d3.stackOrderNone);
	    	stackedData.offset(d3.stackOffsetNone);

		// Show the areas
		areaChart
		.selectAll("path")
		.data(stackedData(travelBanData))
		.enter()
		.append("path")
		  .attr("fill", d=>stackedColor(d.key))
          .attr("d", d=>stackedArea(d));

        //Generate path data for multiple line charts
		//Iran
		//Line
		var lineIran = d3.line()
			.x(function(d) { return xStack(d.Year); })
			.y(function(d) { return yStack(d.Iran)})

		svg1.append("path")
		    .datum(travelBanLines)
		    .attr("fill", "none")
		    .attr("stroke", "rgb(23, 102, 155)")
		    .attr("stroke-width", 3)
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("d", lineIran);

		//Circles
		// var circlesIran = areaIranCircles.selectAll("circle")
		//   .data(travelBanLines);

		//   circlesIran.enter()
		//   .append("circle")
		//   .attr("cx", function(d) { return xStack(d.Year); })
		//   .attr("cy", function(d) { return yStack(d.Iran); })
		//   .attr("r", 5)
		//   .style("fill", "rgba(0,0,0,0)")
		//   .style("stroke", "rgb(23, 102, 155)")
		//   .style("stroke-width", "2px");

		//Syria
		//Line
		var lineSyria = d3.line()
			.x(function(d) { return xStack(d.Year); })
			.y(function(d) { return yStack(d.Syria)})

		svg1.append("path")
		    .datum(travelBanLines)
		    .attr("fill", "none")
		    .attr("stroke", "rgb(168, 130, 204)")
		    .attr("stroke-width", 3)
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("d", lineSyria);

		//Circles
		// var circlesSyria = areaSyriaCircles.selectAll("circle")
		//   .data(travelBanLines);

		//   circlesSyria.enter()
		//   .append("circle")
		//   .attr("cx", function(d) { return xStack(d.Year); })
		//   .attr("cy", function(d) { return yStack(d.Syria); })
		//   .attr("r", 5)
		//   .style("fill", "rgba(0,0,0,0)")
		//   .style("stroke", "rgb(168, 130, 204)")
		//   .style("stroke-width", "2px");

		//Somalia
		//Line
		var lineSomalia = d3.line()
			.x(function(d) { return xStack(d.Year); })
			.y(function(d) { return yStack(d.Somalia)})

		svg1.append("path")
		    .datum(travelBanLines)
		    .attr("fill", "none")
		    .attr("stroke", "rgb(255, 219, 33)")
		    .attr("stroke-width", 3)
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("d", lineSomalia);

		//Circles
		// var circlesSomalia = areaSomaliaCircles.selectAll("circle")
		//   .data(travelBanLines);

		//   circlesSomalia.enter()
		//   .append("circle")
		//   .attr("cx", function(d) { return xStack(d.Year); })
		//   .attr("cy", function(d) { return yStack(d.Somalia); })
		//   .attr("r", 5)
		//   .style("fill", "rgba(0,0,0,0)")
		//   .style("stroke", "rgb(255, 219, 33)")
		//   .style("stroke-width", "2px");
		
	}
}

function handleContainerEnter1(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit1(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}


//2
function handleResize2() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step2.style('height', stepHeight1 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight1 / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
}
// scrollama event handlers
function handleStepEnter2(response) {
	
	step2.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart2.select('p').text(response.index + 1);
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// // update graphic1 based on step 1
	// if (step1._groups[0][0].className === 'step1 is-active') {

	// }

	// // update graphic1 based on step 2
	// if (step1._groups[0][1].className === 'step1 is-active') {

	// }

	// // update graphic1 based on step 2
	// if (step1._groups[0][2].className === 'step1 is-active') {
		
	// }
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


//3
function handleResize3() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step2.style('height', stepHeight1 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight1 / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
}
// scrollama event handlers
function handleStepEnter3(response) {
	
	step3.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart3.select('p').text(response.index + 1);
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// // update graphic1 based on step 1
	// if (step1._groups[0][0].className === 'step1 is-active') {

	// }

	// // update graphic1 based on step 2
	// if (step1._groups[0][1].className === 'step1 is-active') {

	// }

	// // update graphic1 based on step 2
	// if (step1._groups[0][2].className === 'step1 is-active') {
		
	// }
}

function handleContainerEnter3(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit3(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}


//4
function handleResize4() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step2.style('height', stepHeight1 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight1 / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
}
// scrollama event handlers
function handleStepEnter4(response) {
	
	step4.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart4.select('p').text(response.index + 1);
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// // update graphic1 based on step 1
	// if (step1._groups[0][0].className === 'step1 is-active') {

	// }

	// // update graphic1 based on step 2
	// if (step1._groups[0][1].className === 'step1 is-active') {

	// }

	// // update graphic1 based on step 2
	// if (step1._groups[0][2].className === 'step1 is-active') {
		
	// }
}

function handleContainerEnter4(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit4(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama

	scroller1.setup({
		// container: '#line-scroll',
		// graphic: '.scroll__figure1',
		// text: '.scroll_text1',
		step: '.scroll__text1 .step1',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter1)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter1).onContainerExit(handleContainerExit1);

	scroller2.setup({
		// container: '#line-scroll',
		// graphic: '.scroll__figure1',
		// text: '.scroll_text1',
		step: '.scroll__text2 .step2',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

	scroller3.setup({
		// container: '#line-scroll',
		// graphic: '.scroll__figure1',
		// text: '.scroll_text1',
		step: '.scroll__text3 .step3',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter3)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter3).onContainerExit(handleContainerExit3);

	scroller4.setup({
		// container: '#line-scroll',
		// graphic: '.scroll__figure1',
		// text: '.scroll_text1',
		step: '.scroll__text4 .step4',
		offset: 0.35,
		debug: false
	}).onStepEnter(handleStepEnter4)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter4).onContainerExit(handleContainerExit4);
}

// kick things off
init();
}
