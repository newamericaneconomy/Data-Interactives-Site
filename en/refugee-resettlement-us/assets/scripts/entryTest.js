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

//5
var container5 = d3.select('#economic-scroll');
var graphic5 = container5.select('.scroll__figure5');
var chart5 = graphic5.select('.figure__chart5');
var text5 = container5.select('.scroll__text5');
var step5 = text5.selectAll('.step5');

//6
var container6 = d3.select('#top20-scroll');
var graphic6 = container6.select('.scroll__figure6');
var chart6 = graphic6.select('.figure__chart6');
var text6 = container6.select('.scroll__text6');
var step6 = text6.selectAll('.step6');

//7
var container7 = d3.select('#topStates-scroll');
var graphic7 = container7.select('.scroll__figure7');
var chart7 = graphic7.select('.figure__chart7');
var text7 = container7.select('.scroll__text7');
var step7 = text7.selectAll('.step7');

// initialize the scrollama
var scroller1 = scrollama();
var scroller2 = scrollama();
var scroller3 = scrollama();
var scroller4 = scrollama();
var scroller5 = scrollama();
var scroller6 = scrollama();
var scroller7 = scrollama();

var svg1 = d3.select(".scroll__figure1")
		  .append("svg")
		  .attr("id", "svg1");

var svg2 = d3.select(".exploratory_viz")
		  .append("svg")
		  .attr("id", "svg2");

var svg3 = d3.select(".exploratory_viz")
		  .append("svg")
		  .attr("id", "svg3");

var svg4 = d3.select(".scroll__figure2")
		  .append("svg")
		  .attr("id", "svg4");

var tooltip_map = d3.select("body").append("div").attr("class", "tooltip_map").style("background", "#fff").style("position", "absolute").style("z-index", "999").style("visibility", "hidden");

var tooltip_radial = d3.select("body").append("div").attr("class", "tooltip_radial").style("background", "#fff").style("position", "absolute").style("z-index", "999").style("visibility", "hidden");

var tooltip_ban = d3.select("body").append("div").attr("class", "tooltip_ban").style("background", "#fff").style("position", "absolute").style("z-index", "999").style("visibility", "hidden");

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

var cityOrigin = d3.csv("assets/refugee0613b.csv");

var saltLake = d3.csv("assets/salt_lake_arrivals.csv", ({year,Num_Year, arrivals}) => ({x2: new Date(year), x3: +year, y1: +arrivals}));

	Promise.all([refugeeData, travelBanData, travelBanLines, us, refugeeCities, cityOrigin, saltLake]).then(change);

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

		saltLake = data[6];

	    var margin = ({top: 45, right: 45, bottom: 145, left: 45});

	    //Stacked Chart Variables
	    var keys = travelBanData.columns.slice(1,7);

	    var stackedColor = d3.scaleOrdinal()
	    	.domain(keys)
	    	.range(["url(#area-gradient-iran)", "rgba(232, 237, 237, 0.5)", "url(#area-gradient-somalia)", "url(#area-gradient-syria", "rgba(155, 158, 160, 0.5)", "rgba(193, 198, 198, 0.5)"]);

	    var xStack = d3.scaleTime()
	    	.domain(d3.extent(travelBanData, d => d.Year))
		    .range([margin.left*1.3, width - 0.5*width]);

		var xStackAxis = g => g
		    .attr("transform", `translate(0,${height - margin.bottom})`)
		    .attr("class", "x-axis")
		    .call(d3.axisBottom(xStack).ticks(width / 80).tickSizeOuter(0));

		var yStack = d3.scaleLinear()
			.domain([0, 31000]).nice()
			.range([height - margin.bottom, margin.top]);

		var yStackAxis = g => g
			.attr("transform", `translate(${margin.left},0)`)
			.attr("class", "y-axis")
			.call(d3.axisLeft(yStack))
			.call(g => g.select(".domain").remove())
			.call(g => g.select(".tick:last-of-type text").clone()
			    .attr("x", 0)
			    .attr("text-anchor", "start")
			    .text(travelBanData.y));

		function make_yStack_gridlines() {		
		    return d3.axisLeft(yStack)
		        .ticks(7)
		}

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

		//Area Chart Variables - First

		var x = d3.scaleTime()
		.domain([parseDate(2002), parseDate(2018)])
		.range([margin.left*1.3, width - 0.5*width]);

		var y = d3.scaleLinear()
		.domain([0, d3.max(refugeeData, d => d.y)]).nice()
		.range([height - margin.bottom, margin.top]);

		var xAxis = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")
		.call(d3.axisBottom(x).ticks(17).tickSizeOuter(0));

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


		//Area Chart Variables - Salt Lake

		var x2 = d3.scaleTime()
		.domain([parseDate(2010), parseDate(2018)])
		.range([margin.left*1.3, width - 0.5*width]);

		var y1 = d3.scaleLinear()
		.domain([0, d3.max(saltLake, d => d.y1)]).nice()
		.range([height - margin.bottom, margin.top]);

		var xAxisSL = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.attr("class", "x-axis")
		.call(d3.axisBottom(x2).ticks(15).tickSizeOuter(0));

		var yAxisSL = g => g
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")
		.call(d3.axisLeft(y1))
		.call(g => g.select(".domain").remove())
		.call(g => g.select(".tick:last-of-type text").clone()
		    .attr("x", 0)
		    .attr("text-anchor", "start")
		    .attr("font-weight", "bold")
		    .text(saltLake.y1));

		function make_y1_gridlines() {		
		    return d3.axisLeft(y1)
		        .ticks(9)
		}

		// gridlines in y axis function
		// function make_y_gridlines() {		
		//     return d3.axisLeft(y)
		//         .ticks(5)
		// }

		//Add Y grid lines
		svg4.append("g")			
	      .attr("class", "grid")
	      .attr("transform", "translate(45," + 0 + ")")
	      .call(make_y1_gridlines()
	          .tickSize(-width/2)
	          .tickFormat("")
	      );

		var lineSL = d3.line()
		  .defined(d => !isNaN(d.y1))
		  .x(d => x2(d.x2))
		  .y(d => y1(d.y1));

		var	areaSL = d3.area()
	    .x(d => x2(d.x2))
	    .y0(height)
		.y1(d => y1(d.y1));

		svg4.append("g")
		  .call(xAxisSL);

		svg4.append("g")
		  .call(yAxisSL);


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
	        .attr("class", "base-map")
	        .attr("transform", function(d) {
	          return "scale(" + width/1807.05 + ")"
	        });

	    svg2.append("path")
	        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
	        .attr("fill", "rgba(0,0,0,0)")
	        .attr("stroke", "#b7b7b7")
	        .attr("stroke-linejoin", "round")
	        .attr("d", d3.geoPath())
	        .attr("class", "base-map")
	        .attr("transform", function(d) {
	          return "scale(" + width/1807.05 + ")"
	        });

	    for (let d of refugeeCities) {
	    	var path = d3.geoPath(projection);
	    	var centroidX = path.centroid(d)[0];
	    	var centroidY = path.centroid(d)[1];
	    	var node = svg2.append("path")
	    	  .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", path.pointRadius((width/1807.05*(Math.log(d.properties.total)*Math.sqrt(Math.log(d.properties.total))))))
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
              .on("mouseover", function() {
              	var city = d.properties.city;
              	var state = d.properties.state;

              	tooltip_map.html("");
		        tooltip_map.style("visibility", "visible").zIndex = 999;

		        tooltip_map.append("div").style("color", "black").text(city + ", " + state).zIndex = 999;
              })
              .on("mousemove", function () {

              		tooltip_map.style("top", (d3.event.pageY - 60) + "px").style("left", (d3.event.pageX-34) + "px");
			    })
              .on("mouseout", function () {
			      tooltip_map.style("visibility", "hidden");
			    })
              .on("mousedown", function () {
              	svg3.selectAll("g").remove();

              	var cityName = svg3.append("g");
              	var areaChartExp = svg3.append("g");

              	var selectCity = d.properties.city;
              	var selectState = d.properties.state;

              	var radialDataCity = cityOrigin.filter(function(c) {
	    			return c.City === selectCity;
	    		});

	    		var radialDataCityState = radialDataCity.filter(function(s) {
		    		return s.State === selectState;
		    	});

		    	var years =[];

	    		for (var i = 0; i < radialDataCityState.length; ++i) {
	    			years.push(radialDataCityState[i]["year"]);
	    		}

		    	radialDataCityState.columns = cityOrigin.columns;
		    	
			    var keysExp = years;

			    var radialDataCityState = radialDataCityState.map(obj => ({
			    	year: obj.year,
					total: +obj.total,
			    	Afghanistan: obj.Afghanistan,
			    	Albania: obj.Albania,
					Algeria: obj.Algeria,
					Angola: obj.Angola,
					Armenia: obj.Armenia,
					Azerbaijan: obj.Azerbaijan,
					Bangladesh: obj.Bangladesh,
					Belarus: obj.Belarus,
			    	Belgium: obj.Belgium,
					Benin: obj.Benin,
					Bhutan: obj.Bhutan,
					["Bosnia and Herzegovina"]: obj["Bosnia and Herzegovina"],
					Botswana: obj.Botswana,
					Bulgaria: obj.Bulgaria,
					["Burkina Faso (UVolta)"]: obj["Burkina Faso (UVolta)"],
					Burma: obj.Burma,
					Burundi: obj.Burundi,
					Cambodia: obj.Cambodia,
					Cameroon: obj.Cameroon,
					Canada: obj.Canada,
					["Central African Republic"]: obj["Central African Republic"],
					Chad: obj.Chad,
					China: obj.China,
					Colombia: obj.Colombia,
					Congo: obj.Congo,
					["Costa Rica"]: obj["Costa Rica"],
					Croatia: obj.Croatia,
					Cuba: obj.Cuba,
					["Dem. Rep. Congo"]: obj["Dem. Rep. Congo"],
					Djibouti: obj.Djibouti,
					Ecuador: obj.Ecuador,
					Egypt: obj.Egypt,
					["El Salvador"]: obj["El Salvador"],
					["Equatorial Guinea"]: obj["Equatorial Guinea"],
					Eritrea: obj.Eritrea,
					Estonia: obj.Estonia,
					Ethiopia: obj.Ethiopia,
					France: obj.France,
					Gabon: obj.Gabon,
					Gambia: obj.Gambia,
					["Gaza Strip"]: obj["Gaza Strip"],
					Georgia: obj.Georgia,
					Germany: obj.Germany,
					Ghana: obj.Ghana,
					Guatemala: obj.Guatemala,
					Guinea: obj.Guinea,
					["Guinea - Bissau"]: obj["Guinea - Bissau"],
					Haiti: obj.Haiti,
					Honduras: obj.Honduras,
					India: obj.India,
					Indonesia: obj.Indonesia,
					Iran: obj.Iran,
					Iraq: obj.Iraq,
					Israel: obj.Israel,
					["Ivory Coast"]: obj["Ivory Coast"],
					Jamaica: obj.Jamaica,
					Jordan: obj.Jordan,
					Kazakhstan: obj.Kazakhstan,
					Kenya: obj.Kenya,
					["Korea, North"]: obj["Korea, North"],
					Kuwait: obj.Kuwait,
					Kyrgyzstan: obj.Kyrgyzstan,
					Laos: obj.Laos,
					Latvia: obj.Latvia,
					Lebanon: obj.Lebanon,
					Liberia: obj.Liberia,
					Libya: obj.Libya,
					Lithuania: obj.Lithuania,
					Macedonia: obj.Macedonia,
					["Madagascar (Malagasy Republic)"]: obj["Madagascar (Malagasy Republic)"],
					Malaysia: obj.Malaysia,
					Mali: obj.Mali,
					Mauritania: obj.Mauritania,
					Moldova: obj.Moldova,
					Mongolia: obj.Mongolia,
					Montenegro: obj.Montenegro,
					Morocco: obj.Morocco,
					Namibia: obj.Namibia,
					Nepal: obj.Nepal,
					Netherlands: obj.Netherlands,
					["New Zealand"]: obj["New Zealand"],
					Niger: obj.Niger,
					Nigeria: obj.Nigeria,
					Norway: obj.Norway,
					Oman: obj.Oman,
					Pakistan: obj.Pakistan,
					Palestine: obj.Palestine,
					Philippines: obj.Philippines,
					["Republic of South Sudan"]: obj["Republic of South Sudan"],
					Russia: obj.Russia,
					Rwanda: obj.Rwanda,
					["Saudi Arabia"]: obj["Saudi Arabia"],
					Senegal: obj.Senegal,
					Serbia: obj.Serbia,
					["Sierra Leone"]: obj["Sierra Leone"],
					Slovakia: obj.Slovakia,
					Somalia: obj.Somalia,
					["South Africa"]: obj["South Africa"],
					["Sri Lanka (Ceylon)"]: obj["Sri Lanka (Ceylon)"],
					Sudan: obj.Sudan,
					Sweden: obj.Sweden,
					Syria: obj.Syria,
					Tajikistan: obj.Tajikistan,
					Tanzania: obj.Tanzania,
					Thailand: obj.Thailand,
					Tibet: obj.Tibet,
					Togo: obj.Togo,
					Tunisia: obj.Tunisia,
					Turkey: obj.Turkey,
					Turkmenistan: obj.Turkmenistan,
					Uganda: obj.Uganda,
					Ukraine: obj.Ukraine,
					["United Arab Emirates"]: obj["United Arab Emirates"],
					["United Kingdom"]: obj["United Kingdom"],
					Uzbekistan: obj.Uzbekistan,
					Venezuela: obj.Venezuela,
					Vietnam: obj.Vietnam,
					Yemen: obj.Yemen,
					["Yemen (Sanaa)"]: obj["Yemen (Sanaa)"],
					Yugoslavia: obj.Yugoslavia,
					Zambia: obj.Zambia,
					Zimbabwe: obj.Zimbabwe
			    }));

			    radialDataCityState.columns = ["year", "total", "Afghanistan", "Albania","Algeria", "Angola","Armenia", "Azerbaijan","Bangladesh",	"Belarus","Belgium", "Benin",	"Bhutan",	"Bosnia and Herzegovina",	"Botswana",	"Bulgaria",	"Burkina Faso (UVolta)",	"Burma",	"Burundi Cambodia",	"Cameroon",	"Canada",
					"Central African Republic",
					"Chad",
					"China",
					"Colombia",
					"Congo",
					"Costa Rica",
					"Croatia",
					"Cuba",
					"Dem. Rep. Congo",
					"Djibouti",
					"Ecuador",
					"Egypt",
					"El Salvador",
					"Equatorial Guinea",
					"Eritrea",
					"Estonia",
					"Ethiopia",
					"France",
					"Gabon",
					"Gambia",
					"Gaza Strip",
					"Georgia",
					"Germany",
					"Ghana",
					"Guatemala",
					"Guinea",
					"Guinea - Bissau",
					"Haiti",
					"Honduras",
					"India",
					"Indonesia",
					"Iran",
					"Iraq",
					"Israel",
					"Ivory Coast",
					"Jamaica",
					"Jordan",
					"Kazakhstan",
					"Kenya",
					"Korea, North",
					"Kuwait",
					"Kyrgyzstan",
					"Laos",
					"Latvia",
					"Lebanon",
					"Liberia",
					"Libya",
					"Lithuania",
					"Macedonia",
					"Madagascar (Malagasy Republic)",
					"Malaysia",
					"Mali",
					"Mauritania",
					"Moldova",
					"Mongolia",
					"Montenegro",
					"Morocco",
					"Namibia",
					"Nepal",
					"Netherlands",
					"New Zealand",
					"Niger",
					"Nigeria",
					"Norway",
					"Oman",
					"Pakistan",
					"Palestine",
					"Philippines",
					"Republic of South Sudan",
					"Russia",
					"Rwanda",
					"Saudi Arabia",
					"Senegal",
					"Serbia",
					"Sierra Leone",
					"Slovakia",
					"Somalia",
					"South Africa",
					"Sri Lanka (Ceylon)",
					"Sudan",
					"Sweden",
					"Syria",
					"Tajikistan",
					"Tanzania",
					"Thailand",
					"Tibet",
					"Togo",
					"Tunisia",
					"Turkey",
					"Turkmenistan",
					"Uganda",
					"Ukraine",
					"United Arab Emirates",
					"United Kingdom",
					"Uzbekistan",
					"Venezuela",
					"Vietnam",
					"Yemen",
					"Yemen (Sanaa)",
					"Yugoslavia",
					"Zambia",
					"Zimbabwe"];

			 //    var result = Object.assign(...Object.keys(originCityState[0]).map( key =>
				//     ({ [key]: originCityState.map( o => o[key] ) })
				// ));

				// console.log(result); 

			 //    var stackedColorExp = d3.scaleOrdinal()
			 //    	.domain(keysExp)
			 //    	.range(d3.schemeSet3);

			 //    var xStackExp = d3.scaleTime()
			 //    	.domain(d3.extent(radialDataCityState, d => d.year))
				//     .range([margin.left*1.3, width - 0.5*width]);

				// var xStackAxisExp = g => g
				//     .attr("transform", `translate(0,${height - margin.bottom})`)
				//     .call(d3.axisBottom(xStackExp).ticks(width / 80).tickSizeOuter(0));

				// var yStackExp = d3.scaleLinear()
				// 	.domain([0, 3000]).nice()
				// 	.range([height/2 - margin.bottom, margin.top]);

				// var yStackAxisExp = g => g
				// 	.attr("transform", `translate(${margin.left},0)`)
				// 	.attr("class", "y-axis")
				// 	.call(d3.axisLeft(yStackExp));

				// // Area generator
				// var stackedAreaExp = d3.area()
				// 	.x(d => xStackExp(d.data.year))
				// 	.y0(d => yStackExp(d[0]))
				// 	.y1(d => yStackExp(d[1]));

				// var stackedDataExp = d3.stack();
			 //    	stackedDataExp.keys(keysExp);
			 //    	stackedDataExp.order(d3.stackOrderNone);
			 //    	stackedDataExp.offset(d3.stackOffsetNone);

			 //    console.log(travelBanData);
			 //    console.log(radialDataCityState);

			 //    // Show the areas
				// areaChartExp
				// 	.selectAll("path")
				// 	.data(stackedDataExp(radialDataCityState))
				// 	.enter()
				// 	.append("path")
				// 	  .attr("fill", d => stackedColorExp(d.key))
			 //          .attr("d", d => stackedAreaExp(d));

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
	    		var outerRadius = 190;

	    		var xRadial = d3.scaleBand()
				    .domain(radialDataCityState.map(d => d.year))
				    .range([0, 2 * Math.PI])
				    .align(0);

// 				//maintain area proportionality of radial bars
				var yRadial = d3.scaleLinear()
					.domain([0, d3.max(radialDataCityState, d => d.total)])
					.range([innerRadius, outerRadius]);

// 				// console.log(originCityState.columns.slice(1));

				var z = d3.scaleOrdinal()
				    .domain(radialDataCityState.columns.slice(2))
				    .range(["#423c89", "#516ea3", "#382D99", "#6abccb", "#73c6cd", "#a4bca8", "#ccb48a", "#f9aa67", "#f9b266", "#f9c465", "#f9d563", "#f9e862", "#f4ef65", "#eaf46c", "#e1f973", "#d6ff7b"]);

		    	var arc = d3.arc()
		    		.innerRadius(d => yRadial(d[0]))
		    		.outerRadius(d => yRadial(d[1]))
		    		.startAngle(d => xRadial(d.data.year))
		    		.endAngle(d => xRadial(d.data.year) + xRadial.bandwidth())
		    		.padAngle(0.02)
		    		.padRadius(innerRadius*2);

// 		    	// var origins = d3.map(radialDataCityState, function(d) { return (d.Origin)}).keys(radialKeys);

		    	// console.log(radialDataCityState.columns);

		    	svg3.append("g")
		    		.selectAll("g")
		    		.data(d3.stack().keys(radialDataCityState.columns.slice(2))(radialDataCityState))
		    		.enter().append("g")
		    			.attr("fill", d => z(d.key))
		    			.on("mouseover", function(d, i) {
		    				
		    				var commas = d3.format(",");
			              	var origin = d.key;

			              	tooltip_radial.html("");
					        tooltip_radial.style("visibility", "visible").zIndex = 999;

					        tooltip_radial.append("h3").style("color", "black").text(origin).zIndex = 999;
					        tooltip_radial.append("div").attr("class", "radialTip").style("color", "#21d279").text(d3.event["path"]["0"]["__data__"]["data"]["year"] + ": ");

						        tooltip_radial.append("div").attr("class", "radialTip").style("color", "black").text(commas(d3.event["path"]["0"]["__data__"]["data"][origin]));
					        // tooltip_radial.append("div").style("color", "black").text("2002: " + commas(d["0"][1] - d["0"][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2003: " + commas(d[1][1] - d[1][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2004: " + commas(d[2][1] - d[2][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2005: " + commas(d[3][1] - d[3][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2006: " + commas(d[4][1] - d[4][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2007: " + commas(d[5][1] - d[5][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2008: " + commas(d[6][1] - d[6][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2009: " + commas(d[7][1] - d[7][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2010: " + commas(d[8][1] - d[8][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2011: " + commas(d[9][1] - d[9][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2012: " + commas(d[10][1] - d[10][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2013: " + commas(d[11][1] - d[11][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2014: " + commas(d[12][1] - d[12][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2015: " + commas(d[13][1] - d[13][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2016: " + commas(d[14][1] - d[14][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2017: " + commas(d[15][1] - d[15][0]));
					        // tooltip_radial.append("div").style("color", "black").text("2018: " + commas(d[16][1] - d[16][0]));
			              })
			              .on("mousemove", function () {
							    	tooltip_radial.style("top", (d3.event.pageY - 120) + "px").style("left", (d3.event.pageX-64) + "px");
							})
			              .on("mouseout", function () {
						      tooltip_radial.style("visibility", "hidden");
						    })
		    		.selectAll("path")
		    		.data(d => d)
		    		.enter().append("path")
		    			.attr("d", arc)
		    			.attr("class", "radialBar");

				var xRadialAxis = g => g
					.attr("text-anchor", "middle")
					.call(g => g.selectAll("g")
						.data(radialDataCityState)
						.enter().append("g")
							.attr("transform", d => `rotate(${((xRadial(d.year) + xRadial.bandwidth() / 2) * 180 / Math.PI - 90)})
								translate(${innerRadius}, 0)`
								)
							.call(g => g.append("line")
								.attr("x2", -5)
								.attr("stroke", "#ccc")
								.attr("stroke-opacity", 0.5)
								.style("stroke-dasharray", "10 10"))
							.call(g => g.append("text")
								.attr("transform", d => (xRadial(d.year) + xRadial.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,-110)" : "rotate(-90)translate(0,110)")
								.text(d => d.year)));

				var yRadialAxis = g => g
					.attr("text-anchor", "middle")
				    .call(g => g.append("text")
				        .attr("y", d => -y(yRadial.ticks(5).pop()))
				        .attr("dy", "25em")
				        .text("Refugee Arrivals"))
				    .call(g => g.selectAll("g")
				      .data(yRadial.ticks(5).slice(1))
				      .enter().append("g")
				        .attr("fill", "none")
				        .call(g => g.append("circle")
				            .attr("stroke", "#ccc")
				            .attr("stroke-opacity", 0.5)
				            .attr("r", yRadial)
				            .style("stroke-dasharray", "10 10")));
				        // .call(g => g.append("text")
				        //     .attr("y", d => Math.log(5000*y(d)))
				        //     .attr("dy", "10em")
				        //     .attr("stroke", "#000")
				        //     .attr("stroke-width", 0.15)
				        //     .text(yRadial.tickFormat(5, "s"))
				        //  .clone(true)
				        //     .attr("fill", "#000")
				        //     .attr("stroke", "none")));

				    cityName.append("text")
				    	.style("fill", "#8e8e8e")
				    	.attr("text-anchor", "middle")
				    	.attr("class", "nameLegend")
				    	.attr("y", "-10px")
				    	.text(selectCity + ", ");

				    cityName.append("text")
				    	.style("fill", "#8e8e8e")
				    	.attr("text-anchor", "middle")
				    	.attr("class", "nameLegend")
				    	.attr("y", "17px")
				    	.text(selectState);


// 				var radialLegend = g => g.append("g")
// 					.selectAll("g")
// 					.data(originCityState.columns.slice(1).reverse())
// 					.enter().append("g")
// 						.attr("transform", (d, i) => `translate(230,${(i - (originCityState.columns.length - 1) / 2) * 20})`)
// 					    .call(g => g.append("rect")
// 					        .attr("width", 18)
// 					        .attr("height", 18)
// 					        .attr("fill", z))
// 					    .call(g => g.append("text")
// 					        .attr("x", 24)
// 					        .attr("y", 9)
// 					        .attr("dy", "0.35em")
// 					        .text(d => d));
// // console.log(radialDataCityState.columns.slice(2));

		    	svg3.append("g")
		    		.call(xRadialAxis);

		    	svg3.append("g")
		    		.call(yRadialAxis);

		    	
              });
	    }

	    function drawPoints() {
	    	svg2.selectAll("path.map-path").remove();
	    	for (let d of refugeeCities) {
		    	// console.log(d);
		    	var path = d3.geoPath(projection);
		    	var centroidX = path.centroid(d)[0];
		    	var centroidY = path.centroid(d)[1];
		    	var node = svg2.append("path")
		    	  .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
	              .attr("d", path.pointRadius((width/1807.05*(Math.log(d.properties.total)*Math.sqrt(Math.log(d.properties.total))))/(d3.event.transform["k"])))
	              .attr("stroke", "#fff")
	              .attr("stroke-width", 0.5/(d3.event.transform["k"]))
	              .attr("fill", "rgba(33, 210, 121, 0.2)")
	              // .style('stroke', 'black').style('stroke-width', 0.5)
	              .attr("opacity", 1)
	              .attr("class", "map-path")
	              .on("mouseover", function() {
	              	var city = d.properties.city;
	              	var state = d.properties.state;

	              	tooltip_map.html("");
			        tooltip_map.style("visibility", "visible").zIndex = 999;

			        tooltip_map.append("div").style("color", "black").text(city + ", " + state).zIndex = 999;
	              })
	              .on("mousemove", function () {
	              		tooltip_map.style("top", (d3.event.pageY - 60) + "px").style("left", (d3.event.pageX-34) + "px");
				    })
	              .on("mouseout", function () {
				      tooltip_map.style("visibility", "hidden");
				    })
	              .on("mousedown", function () {
	              	svg3.selectAll("g").remove();

	              	var cityName = svg3.append("g");
	              	var areaChartExp = svg3.append("g");

	              	var selectCity = d.properties.city;
	              	var selectState = d.properties.state;

	              	// console.log(selectCity);

	              	var radialDataCity = cityOrigin.filter(function(c) {
		    			return c.City === selectCity;
		    		});

		    		// console.log(radialDataCity[0]["Origin"]);
		    		// console.log(radialDataCity);

	              	// radialDataCity.columns = cityOrigin.columns;
		    		// console.log(radialDataCity);

		    		var radialDataCityState = radialDataCity.filter(function(s) {
			    		// console.log(selectState);
			    		return s.State === selectState;
			    	});

					// console.log(radialDataCityState);

			    	var years =[];

			    	// origins.push(radialDataCityState[0]["Origin"]);
			    	// origins.push(radialDataCityState[1]["Origin"]);
			    	// console.log(radialDataCityState);

		    		for (var i = 0; i < radialDataCityState.length; ++i) {
		    			years.push(radialDataCityState[i]["year"]);
		    		}

		    		// console.log(origins);

		   //  		var radialDataSort = radialDataCityState.sort(function(a, b) {
		   //  			return b.origin - a.origin;
		   //  		});

		   //  		radialDataSort = radialDataSort.filter(function(d, i) {
					// 	return i < 10;
					// });

					// console.log(radialDataSort);

			    	radialDataCityState.columns = cityOrigin.columns;
			    	
			  //   	let total = 0;
					// for (let i = 1; i < radialDataCityState.columns.length; ++i) {
					// 	total += radialDataCityState.columns[i] = +radialDataCityState.columns[i];
					// 	radialDataCityState.total = total;
					// }

			  //   	console.log(radialDataCityState);
			    	//Stacked Chart Variables
				    // var keysExp = radialDataCityState.columns.slice(3);
				    var keysExp = years;
				    // console.log(keysExp);

				    var radialDataCityState = radialDataCityState.map(obj => ({
				    	year: obj.year,
						total: +obj.total,
				    	Afghanistan: obj.Afghanistan,
				    	Albania: obj.Albania,
						Algeria: obj.Algeria,
						Angola: obj.Angola,
						Armenia: obj.Armenia,
						Azerbaijan: obj.Azerbaijan,
						Bangladesh: obj.Bangladesh,
						Belarus: obj.Belarus,
				    	Belgium: obj.Belgium,
						Benin: obj.Benin,
						Bhutan: obj.Bhutan,
						["Bosnia and Herzegovina"]: obj["Bosnia and Herzegovina"],
						Botswana: obj.Botswana,
						Bulgaria: obj.Bulgaria,
						["Burkina Faso (UVolta)"]: obj["Burkina Faso (UVolta)"],
						Burma: obj.Burma,
						Burundi: obj.Burundi,
						Cambodia: obj.Cambodia,
						Cameroon: obj.Cameroon,
						Canada: obj.Canada,
						["Central African Republic"]: obj["Central African Republic"],
						Chad: obj.Chad,
						China: obj.China,
						Colombia: obj.Colombia,
						Congo: obj.Congo,
						["Costa Rica"]: obj["Costa Rica"],
						Croatia: obj.Croatia,
						Cuba: obj.Cuba,
						["Dem. Rep. Congo"]: obj["Dem. Rep. Congo"],
						Djibouti: obj.Djibouti,
						Ecuador: obj.Ecuador,
						Egypt: obj.Egypt,
						["El Salvador"]: obj["El Salvador"],
						["Equatorial Guinea"]: obj["Equatorial Guinea"],
						Eritrea: obj.Eritrea,
						Estonia: obj.Estonia,
						Ethiopia: obj.Ethiopia,
						France: obj.France,
						Gabon: obj.Gabon,
						Gambia: obj.Gambia,
						["Gaza Strip"]: obj["Gaza Strip"],
						Georgia: obj.Georgia,
						Germany: obj.Germany,
						Ghana: obj.Ghana,
						Guatemala: obj.Guatemala,
						Guinea: obj.Guinea,
						["Guinea - Bissau"]: obj["Guinea - Bissau"],
						Haiti: obj.Haiti,
						Honduras: obj.Honduras,
						India: obj.India,
						Indonesia: obj.Indonesia,
						Iran: obj.Iran,
						Iraq: obj.Iraq,
						Israel: obj.Israel,
						["Ivory Coast"]: obj["Ivory Coast"],
						Jamaica: obj.Jamaica,
						Jordan: obj.Jordan,
						Kazakhstan: obj.Kazakhstan,
						Kenya: obj.Kenya,
						["Korea, North"]: obj["Korea, North"],
						Kuwait: obj.Kuwait,
						Kyrgyzstan: obj.Kyrgyzstan,
						Laos: obj.Laos,
						Latvia: obj.Latvia,
						Lebanon: obj.Lebanon,
						Liberia: obj.Liberia,
						Libya: obj.Libya,
						Lithuania: obj.Lithuania,
						Macedonia: obj.Macedonia,
						["Madagascar (Malagasy Republic)"]: obj["Madagascar (Malagasy Republic)"],
						Malaysia: obj.Malaysia,
						Mali: obj.Mali,
						Mauritania: obj.Mauritania,
						Moldova: obj.Moldova,
						Mongolia: obj.Mongolia,
						Montenegro: obj.Montenegro,
						Morocco: obj.Morocco,
						Namibia: obj.Namibia,
						Nepal: obj.Nepal,
						Netherlands: obj.Netherlands,
						["New Zealand"]: obj["New Zealand"],
						Niger: obj.Niger,
						Nigeria: obj.Nigeria,
						Norway: obj.Norway,
						Oman: obj.Oman,
						Pakistan: obj.Pakistan,
						Palestine: obj.Palestine,
						Philippines: obj.Philippines,
						["Republic of South Sudan"]: obj["Republic of South Sudan"],
						Russia: obj.Russia,
						Rwanda: obj.Rwanda,
						["Saudi Arabia"]: obj["Saudi Arabia"],
						Senegal: obj.Senegal,
						Serbia: obj.Serbia,
						["Sierra Leone"]: obj["Sierra Leone"],
						Slovakia: obj.Slovakia,
						Somalia: obj.Somalia,
						["South Africa"]: obj["South Africa"],
						["Sri Lanka (Ceylon)"]: obj["Sri Lanka (Ceylon)"],
						Sudan: obj.Sudan,
						Sweden: obj.Sweden,
						Syria: obj.Syria,
						Tajikistan: obj.Tajikistan,
						Tanzania: obj.Tanzania,
						Thailand: obj.Thailand,
						Tibet: obj.Tibet,
						Togo: obj.Togo,
						Tunisia: obj.Tunisia,
						Turkey: obj.Turkey,
						Turkmenistan: obj.Turkmenistan,
						Uganda: obj.Uganda,
						Ukraine: obj.Ukraine,
						["United Arab Emirates"]: obj["United Arab Emirates"],
						["United Kingdom"]: obj["United Kingdom"],
						Uzbekistan: obj.Uzbekistan,
						Venezuela: obj.Venezuela,
						Vietnam: obj.Vietnam,
						Yemen: obj.Yemen,
						["Yemen (Sanaa)"]: obj["Yemen (Sanaa)"],
						Yugoslavia: obj.Yugoslavia,
						Zambia: obj.Zambia,
						Zimbabwe: obj.Zimbabwe
				    }));

				    radialDataCityState.columns = ["year", "total", "Afghanistan", "Albania","Algeria", "Angola","Armenia", "Azerbaijan","Bangladesh",	"Belarus","Belgium", "Benin",	"Bhutan",	"Bosnia and Herzegovina",	"Botswana",	"Bulgaria",	"Burkina Faso (UVolta)",	"Burma",	"Burundi Cambodia",	"Cameroon",	"Canada",
						"Central African Republic",
						"Chad",
						"China",
						"Colombia",
						"Congo",
						"Costa Rica",
						"Croatia",
						"Cuba",
						"Dem. Rep. Congo",
						"Djibouti",
						"Ecuador",
						"Egypt",
						"El Salvador",
						"Equatorial Guinea",
						"Eritrea",
						"Estonia",
						"Ethiopia",
						"France",
						"Gabon",
						"Gambia",
						"Gaza Strip",
						"Georgia",
						"Germany",
						"Ghana",
						"Guatemala",
						"Guinea",
						"Guinea - Bissau",
						"Haiti",
						"Honduras",
						"India",
						"Indonesia",
						"Iran",
						"Iraq",
						"Israel",
						"Ivory Coast",
						"Jamaica",
						"Jordan",
						"Kazakhstan",
						"Kenya",
						"Korea, North",
						"Kuwait",
						"Kyrgyzstan",
						"Laos",
						"Latvia",
						"Lebanon",
						"Liberia",
						"Libya",
						"Lithuania",
						"Macedonia",
						"Madagascar (Malagasy Republic)",
						"Malaysia",
						"Mali",
						"Mauritania",
						"Moldova",
						"Mongolia",
						"Montenegro",
						"Morocco",
						"Namibia",
						"Nepal",
						"Netherlands",
						"New Zealand",
						"Niger",
						"Nigeria",
						"Norway",
						"Oman",
						"Pakistan",
						"Palestine",
						"Philippines",
						"Republic of South Sudan",
						"Russia",
						"Rwanda",
						"Saudi Arabia",
						"Senegal",
						"Serbia",
						"Sierra Leone",
						"Slovakia",
						"Somalia",
						"South Africa",
						"Sri Lanka (Ceylon)",
						"Sudan",
						"Sweden",
						"Syria",
						"Tajikistan",
						"Tanzania",
						"Thailand",
						"Tibet",
						"Togo",
						"Tunisia",
						"Turkey",
						"Turkmenistan",
						"Uganda",
						"Ukraine",
						"United Arab Emirates",
						"United Kingdom",
						"Uzbekistan",
						"Venezuela",
						"Vietnam",
						"Yemen",
						"Yemen (Sanaa)",
						"Yugoslavia",
						"Zambia",
						"Zimbabwe"];
				    // console.log(originCityState);

				 //    var result = Object.assign(...Object.keys(originCityState[0]).map( key =>
					//     ({ [key]: originCityState.map( o => o[key] ) })
					// ));

					// console.log(result); 

				 //    var stackedColorExp = d3.scaleOrdinal()
				 //    	.domain(keysExp)
				 //    	.range(d3.schemeSet3);

				 //    var xStackExp = d3.scaleTime()
				 //    	.domain(d3.extent(radialDataCityState, d => d.year))
					//     .range([margin.left*1.3, width - 0.5*width]);

					// var xStackAxisExp = g => g
					//     .attr("transform", `translate(0,${height - margin.bottom})`)
					//     .call(d3.axisBottom(xStackExp).ticks(width / 80).tickSizeOuter(0));

					// var yStackExp = d3.scaleLinear()
					// 	.domain([0, 3000]).nice()
					// 	.range([height/2 - margin.bottom, margin.top]);

					// var yStackAxisExp = g => g
					// 	.attr("transform", `translate(${margin.left},0)`)
					// 	.attr("class", "y-axis")
					// 	.call(d3.axisLeft(yStackExp));

					// // Area generator
					// var stackedAreaExp = d3.area()
					// 	.x(d => xStackExp(d.data.year))
					// 	.y0(d => yStackExp(d[0]))
					// 	.y1(d => yStackExp(d[1]));

					// var stackedDataExp = d3.stack();
				 //    	stackedDataExp.keys(keysExp);
				 //    	stackedDataExp.order(d3.stackOrderNone);
				 //    	stackedDataExp.offset(d3.stackOffsetNone);

				 //    console.log(travelBanData);
				 //    console.log(radialDataCityState);

				 //    // Show the areas
					// areaChartExp
					// 	.selectAll("path")
					// 	.data(stackedDataExp(radialDataCityState))
					// 	.enter()
					// 	.append("path")
					// 	  .attr("fill", d => stackedColorExp(d.key))
				 //          .attr("d", d => stackedAreaExp(d));

			    	
		    		var innerRadius = 90;
		    		var outerRadius = 190;

		    		var xRadial = d3.scaleBand()
					    .domain(radialDataCityState.map(d => d.year))
					    .range([0, 2 * Math.PI])
					    .align(0);

	// 				//maintain area proportionality of radial bars
					var yRadial = d3.scaleLinear()
						.domain([0, d3.max(radialDataCityState, d => d.total)])
						.range([innerRadius, outerRadius]);

					var z = d3.scaleOrdinal()
					    .domain(radialDataCityState.columns.slice(2))
					    .range(["#423c89", "#516ea3", "#382D99", "#6abccb", "#73c6cd", "#a4bca8", "#ccb48a", "#f9aa67", "#f9b266", "#f9c465", "#f9d563", "#f9e862", "#f4ef65", "#eaf46c", "#e1f973", "#d6ff7b"]);

			    	var arc = d3.arc()
			    		.innerRadius(d => yRadial(d[0]))
			    		.outerRadius(d => yRadial(d[1]))
			    		.startAngle(d => xRadial(d.data.year))
			    		.endAngle(d => xRadial(d.data.year) + xRadial.bandwidth())
			    		.padAngle(0.02)
			    		.padRadius(innerRadius*2);

			    	svg3.append("g")
			    		.selectAll("g")
			    		.data(d3.stack().keys(radialDataCityState.columns.slice(2))(radialDataCityState))
			    		.enter().append("g")
			    			.attr("fill", d => z(d.key))
			    			.on("mouseover", function(d) {
			    				var commas = d3.format(",");
				              	var origin = d.key;

				              	tooltip_radial.html("");
						        tooltip_radial.style("visibility", "visible").zIndex = 999;

						        tooltip_radial.append("h3").style("color", "black").text(origin).zIndex = 999;

						        tooltip_radial.append("div").attr("class", "radialTip").style("color", "#21d279").text(d3.event["path"]["0"]["__data__"]["data"]["year"] + ": ");

						        tooltip_radial.append("div").attr("class", "radialTip").style("color", "black").text(commas(d3.event["path"]["0"]["__data__"]["data"][origin]));
						        // tooltip_radial.append("div").style("color", "black").text("2002: " + commas(d["0"][1] - d["0"][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2003: " + commas(d[1][1] - d[1][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2004: " + commas(d[2][1] - d[2][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2005: " + commas(d[3][1] - d[3][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2006: " + commas(d[4][1] - d[4][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2007: " + commas(d[5][1] - d[5][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2008: " + commas(d[6][1] - d[6][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2009: " + commas(d[7][1] - d[7][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2010: " + commas(d[8][1] - d[8][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2011: " + commas(d[9][1] - d[9][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2012: " + commas(d[10][1] - d[10][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2013: " + commas(d[11][1] - d[11][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2014: " + commas(d[12][1] - d[12][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2015: " + commas(d[13][1] - d[13][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2016: " + commas(d[14][1] - d[14][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2017: " + commas(d[15][1] - d[15][0]));
						        // tooltip_radial.append("div").style("color", "black").text("2018: " + commas(d[16][1] - d[16][0]));
				              })
				              .on("mousemove", function () {
							    	tooltip_radial.style("top", (d3.event.pageY - 120) + "px").style("left", (d3.event.pageX-64) + "px");
							    })
				              .on("mouseout", function () {
							      tooltip_radial.style("visibility", "hidden");
							    })
			    		.selectAll("path")
			    		.data(d => d)
			    		.enter().append("path")
			    			.attr("d", arc)
			    			.attr("class", "radialBar");

					var xRadialAxis = g => g
					.attr("text-anchor", "middle")
					.call(g => g.selectAll("g")
						.data(radialDataCityState)
						.enter().append("g")
							.attr("transform", d => `rotate(${((xRadial(d.year) + xRadial.bandwidth() / 2) * 180 / Math.PI - 90)})
								translate(${innerRadius}, 0)`
								)
							.call(g => g.append("line")
								.attr("x2", -5)
								.attr("stroke", "#ccc")
								.attr("stroke-opacity", 0.5)
								.style("stroke-dasharray", "5 5"))
							.call(g => g.append("text")
								.attr("transform", d => (xRadial(d.year) + xRadial.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,-110)" : "rotate(-90)translate(0,110)")
								.text(d => d.year)));

					var yRadialAxis = g => g
						.attr("text-anchor", "middle")
					    .call(g => g.append("text")
					        .attr("y", d => -y(yRadial.ticks(5).pop()))
					        .attr("dy", "25em")
					        .text("Refugee Arrivals"))
					    .call(g => g.selectAll("g")
					      .data(yRadial.ticks(5).slice(1))
					      .enter().append("g")
					        .attr("fill", "none")
					        .call(g => g.append("circle")
					            .attr("stroke", "#ccc")
					            .attr("stroke-opacity", 0.5)
					            .attr("r", yRadial)
					            .style("stroke-dasharray", "10 10")));
					        // .call(g => g.append("text")
					        //     .attr("y", d => Math.log(50*y(d)))
					        //     .attr("dy", "17em")
					        //     .attr("stroke", "#000")
					        //     .attr("stroke-width", 0.15)
					        //     .text(yRadial.tickFormat(5, "s"))
					        //  .clone(true)
					        //     .attr("fill", "#ccc")
					        //     .attr("stroke", "none")));

					cityName.append("text")
				    	.style("fill", "#8e8e8e")
				    	.attr("text-anchor", "middle")
				    	.attr("class", "nameLegend")
				    	.attr("y", "-10px")
				    	.text(selectCity + ", ");

				    cityName.append("text")
				    	.style("fill", "#8e8e8e")
				    	.attr("text-anchor", "middle")
				    	.attr("class", "nameLegend")
				    	.attr("y", "17px")
				    	.text(selectState);

			    	svg3.append("g")
			    		.call(xRadialAxis);

			    	svg3.append("g")
			    		.call(yRadialAxis);

			    	
	              });
		    }
	    }

	    function zoomed() {
	    	drawPoints();

	    	svg2
    			.selectAll("path.base-map")
    			.attr("transform", "scale(" + d3.event.transform["k"]*(width/1807.05) + ")translate(" + d3.event.transform["x"] + "," + d3.event.transform["y"] + ")");

    		svg2
    			.selectAll("path.map-path")
    			.attr("transform", "scale(" + d3.event.transform["k"]*(width/1508.05) + ")translate(" + d3.event.transform["x"]/(1807.05/1508.05) + "," + d3.event.transform["y"]/(1807.05/1508.05) + ")");
    	}

    	var zoom = d3.zoom()
    		.scaleExtent([1, 12])
    		.on("zoom", zoomed);
    		
	    svg2.call(zoom);

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
		svg1.selectAll("g.x-axis").remove();
		svg1.selectAll("g.y-axis").remove();
		svg1.selectAll("g.grid").remove();

		svg1.append("g")
		  .call(xAxis);

		svg1.append("g")
		  .call(yAxis);

		//Add Y grid lines
		svg1.append("g")			
	      .attr("class", "grid")
	      .attr("transform", "translate(45," + 0 + ")")
	      .call(make_y_gridlines()
	          .tickSize(-width/2)
	          .tickFormat("")
	      );
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
		svg1.selectAll("g.x-axis").remove();
		svg1.selectAll("g.y-axis").remove();
		svg1.selectAll("g.grid").remove();
		// svg1.selectAll("circle").remove();

		svg1.append("g")
		  .call(xStackAxis);

		svg1.append("g")
		  .call(yStackAxis);

		svg1.append("g")			
	      .attr("class", "grid")
	      .attr("transform", "translate(45," + 0 + ")")
	      .call(make_yStack_gridlines()
	          .tickSize(-width/2)
	          .tickFormat("")
	      );

		// svg1.append("g")			
	 //      .attr("class", "grid")
	 //      .attr("transform", "translate(45," + 0 + ")")
	 //      .call(make_y_gridlines()
	 //          .tickSize(-width/2)
	 //          .tickFormat("")
	 //      );

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
          .attr("d", d=>stackedArea(d))
          	  .on("mouseover", function (d) {
          	  	var originStack = d.key;
	          tooltip_ban.html("");
			        tooltip_ban.style("visibility", "visible").zIndex = 999;

			        tooltip_ban.append("div").style("color", "black").text(originStack).zIndex = 999;
	              })
              .on("mousemove", function () {

              		tooltip_ban.style("top", (d3.event.pageY - 60) + "px").style("left", (d3.event.pageX-34) + "px");
			    })
              .on("mouseout", function () {
			      tooltip_ban.style("visibility", "hidden");
			    });

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
	if (step2._groups[0][0].className === 'step2 is-active') {
		svg4.selectAll("path").remove();
		svg4.append("path")
	      .data([saltLake])
	      .attr("class", "area")
	      .attr('d', areaSL)
	      .attr('fill', 'url(#area-gradient-green)');

		svg4.append("path")
		    .datum(saltLake)
		    .attr("fill", "none")
		    .attr("stroke", "#21d279")
		    .attr("stroke-width", 4)
		    .attr("stroke-linejoin", "round")
		    .attr("stroke-linecap", "round")
		    .attr("d", lineSL);
	}

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


//5
function handleResize5() {

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
function handleStepEnter5(response) {
	
	step5.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart5.select('p').text(response.index + 1);
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

function handleContainerEnter5(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit5(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}


//6
function handleResize6() {

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
function handleStepEnter6(response) {
	
	step6.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart6.select('p').text(response.index + 1);
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

function handleContainerEnter6(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit6(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');
}


//7
function handleResize7() {

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
function handleStepEnter7(response) {
	
	step7.classed('is-active', function (d, j) {
		return j === response.index;
	});

	// update graphic based on step
	chart7.select('p').text(response.index + 1);
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

function handleContainerEnter7(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);
}

function handleContainerExit7(response) {
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

	scroller5.setup({
		// container: '#line-scroll',
		// graphic: '.scroll__figure1',
		// text: '.scroll_text1',
		step: '.scroll__text5 .step5',
		offset: 0.5,
		debug: false
	}).onStepEnter(handleStepEnter5)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter5).onContainerExit(handleContainerExit5);

	scroller6.setup({
		// container: '#line-scroll',
		// graphic: '.scroll__figure1',
		// text: '.scroll_text1',
		step: '.scroll__text6 .step6',
		offset: 0.5,
		debug: false
	}).onStepEnter(handleStepEnter6)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter6).onContainerExit(handleContainerExit6);

	scroller7.setup({
		// container: '#line-scroll',
		// graphic: '.scroll__figure1',
		// text: '.scroll_text1',
		step: '.scroll__text7 .step7',
		offset: 0.5,
		debug: false
	}).onStepEnter(handleStepEnter7)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter7).onContainerExit(handleContainerExit7);
}

// kick things off
init();
}
