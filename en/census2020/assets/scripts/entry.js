mapboxgl.accessToken = 'pk.eyJ1IjoibmFlIiwiYSI6ImNpemV0cDY4YTAwMXoyd3FraWhkcXRnMTIifQ.IZeLcFQVdkGbEwQYnOb5qQ'



var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/nae/ckssyzc6r3pib17n0a4ysgohp',
  center: [1,-2],
  zoom: 4.4,
})

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



if (window.innerWidth <= 575) {
  map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
      style:'mapbox://styles/nae/ckssyzc6r3pib17n0a4ysgohp',
      zoom: Math.log10(window.innerWidth),
      center: [0,0],
      maxZoom: 11

})}

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());
map.resize()



var diversityColor = ["#ffffff","#e6e4ee","#cdc9de","#b5aece","#9c95bd","#847cad","#6c649d","#534d8e","#39377e"]

var colorIndex = d3.scaleThreshold()
      .domain([-.2,-.15,-.1,-.05,0,.05,.1,.15,.2])
      .range(["#fb594d","#ff8777","#ffb0a2","#ffd8d0","#ffebe7","#cdc9de","#9c95bd","#6c649d","#39377e"])

var color2020 = d3.scaleThreshold()
      .domain([0,.1,.2,.3,.4,.5,.6,.7,.8])
      .range(["#ffffff","#e6e4ee","#cdc9de","#b5aece","#9c95bd","#847cad","#6c649d","#534d8e","#39377e"])

var tablinks
  var trigger = 0



var container = map.getCanvasContainer()


var formatComma = d3.format(",.0f")
var formatNoComma = d3.format(".00f")
var formatTenth = d3.format(".1f")
var formatPercent = d3.format(",.1%")
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

var container = map.getCanvasContainer()

var svg = d3.select(container)
            .append("svg")
            .attr("class", "legendSVG")
            .attr("id","legendOne")
            .attr("width", "225")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "visible")
            .style('background-color', "#fff")
            .style("z-index", 2)

var g = svg.append("g")


var svg2 = d3.select(container)
            .append("svg")
            .attr("class", "legendSVG2")
            .attr("id","legendTwo")
            .attr("width", "225")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "#fff")
            .style("z-index", 2)

var g2 = svg2.append("g")

          ;


var mapMode= ["Year2010", "Year2020", "Difference"]
var selectMode = 0

// var circleSVG_1 = d3.select("#circleSVG"),
//     margin = {top: 10, left: 20, bottom: 10, right: 20},
//     width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
//     height = +circleSVG_1.attr("viewBox").split(" ")[3]


var screenHeight = window.screen.height
var screenWidth = window.screen.width
var toolOffWidth = screenWidth*.1
var toolOffHeight = screenHeight*.1

var colorIndex = d3.scaleThreshold()
      .domain([-.2,-.15,-.1,-.05,0,.05,.1,.15,.2])
      // .range(["#fb594d","#ff8777","#ffb0a2","#ffd8d0","#ffebe7","#cdc9de","#9c95bd","#6c649d","#39377e"])
      .range(["#fb594d","#ff8777","#ffb0a2","#ffd8d0","#ffebe7","#dbf6e4","#b6edc9","#8ee3af","#61d996","#05ce7c"])


var color2020 = d3.scaleThreshold()
      .domain([0,.1,.2,.3,.4,.5,.6,.7,.8])
      .range([ "#ffffff","#e9faee","#d2f4dd","#bbeecd","#a3e8bc","#89e2ac","#6ddc9c","#4bd58c","#05ce7c"])
      // .range(["#ffffff","#e6e4ee","#cdc9de","#b5aece","#9c95bd","#847cad","#6c649d","#534d8e","#39377e"])

var x = d3.scaleLinear()
    .domain([0,.8])
    .rangeRound([20, 210]);

var x2 = d3.scaleLinear()
    .domain([-.2,.2])
    .rangeRound([20, 210]);



//
// var g = circleSVG_1.append("g") //Set the filter on the container svg
//     // .style("filter", "url(#gooey)")
// 		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

var table = d3.select("#table-location")
	.append("table")
	.attr("class", "table table-condensed table-striped"),
thead = table.append("thead"),
tbody = table.append("tbody");

var table2 = d3.select("#table-location2")
	.append("table")
	.attr("class", "table table-condensed table-striped"),
  thead2 = table2.append("thead"),
  tbody2= table2.append("tbody");






var topOrigin = d3.csv("assets/Census2020CountyData.csv")
var tableOne = d3.csv("assets/DiversityTable1.csv")
var tableTwo = d3.csv("assets/DiversityTable2.csv")


  Promise.all([topOrigin, tableOne, tableTwo]).then(startChange);


 function startChange(data) {





var columns = data[1]["columns"]
var columns2 = data[2]["columns"]

var censusDiversity = data[0]

var tableOneData = data[1]
var tableTwoData = data[2]


map.on('load', () => {
  map.addSource('county', {
      type: 'vector',
      url: "mapbox://nae.cjhundy5",
      // nae.6iud5eqf
      promoteId: 'GEO_ID'
  });

  map.addSource('state', {
      type: 'vector',
      url: "mapbox://nae.2dulngls",
      // nae.6iud5eqf
      promoteId: 'GEO_ID'
  });


  censusDiversity.forEach((row) => {
          map.setFeatureState({
            "source": 'county',
            'sourceLayer': 'countyAlbers-317z4o',
            "id": row["GEO_ID"]  },  {
  diversity2010 : +row["DiversityIndex2010"],
  diversity2020 : +row["DiversityIndex2020"],
  diversityChange : +row["ChangeDiversityIndex"],
  diversityChangePer : +row["ChangeDiversityIndex"],
  countyName : row["CountyNAME"],
  ChangeDiversityIndexPercent : +row["May2020_Noncitizen"]
}
)
});


  map.addLayer({
    'id': 'county-fill',
    'type': 'fill',
    'source': 'county',
    "source-layer": "countyAlbers-317z4o",
    'layout': {
      'visibility': 'visible'
    },
    // 'minzoom': 5,
    // 'maxzoom': 8,
    'paint': {
      'fill-color': [
        'interpolate',
          ['linear'],
          ['to-number', ['feature-state', "diversity2010"]],
          // 0, "#ffffff",
          // .1,"#e6e4ee",
          // .2,"#cdc9de",
          // .3,"#b5aece",
          // .4,"#9c95bd",
          // .5,"#847cad",
          // .6,"#6c649d",
          // .7,"#534d8e",
          // .8,"#39377e"
          0,"#ffffff",
          .1,"#e9faee",
          .2,"#d2f4dd",
          .3,"#bbeecd",
          .4,"#a3e8bc",
          .5,"#89e2ac",
          .6,"#6ddc9c",
          .7,"#4bd58c",
          .8,"#05ce7c"
        ],
    'fill-outline-color': '#ffffff',
    'fill-opacity': 1
    }
  });


  map.addLayer({
    'id': 'state-line',
    'type': 'line',
    'source': 'state',
    "source-layer": "stateAlbers-b4vtbu",
    'layout': {
      'visibility': 'visible'
    },
    // 'minzoom': 5,
    // 'maxzoom': 8,
    'paint': {
    'line-color': 'white',
    'line-width': 1.5
  }
  });



map.on("mousemove", function (e) {


  var features = map.queryRenderedFeatures(e.point, {layers: ['county-fill']})



  if (features.length>0){

    map.getCanvas().style.cursor = 'pointer';
    var countyName = features[0].state.countyName;
    var diversity2010 = formatPercent(features[0].state.diversity2010);
    var diversity2020 = formatPercent(features[0].state.diversity2020);
    var diversityIndex100 = formatTenth(features[0].state.diversityChange*100)
    var popUpText = "<div class='popUpDiv'><b>"+countyName +"</b></br>2010 Diversity Index:  "+diversity2010 + "</br>2020 Diversity Index:  "+diversity2020 + "</br>Change in Percentage Points:  "+(diversityIndex100)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);
  }

  else if (features.length==0){

    map.getCanvas().style.cursor = '';
    popup.remove();
  }

    else{

      map.getCanvas().style.cursor = 'pointer';
      var countyName = features[0].state.countyName;
      var diversity2010 = features[0].state.diversity2010;


      var popUpText = countyName +"</br>2010 Diversity Index:  "+diversity2010
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);
  }

  });

map.on('mouseleave', 'county-fill',function () {

  map.getCanvas().style.cursor = '';
  popup.remove();

  });


});











   var header = thead.append("tr")
   		.selectAll("th")
   		.data(columns)
   		.enter()
   		.append("th")
   			.text(function(d){ return d;})
        .attr("class","thead-css")



   	var rows = tbody.selectAll("tr")
   		.data(tableOneData)
   		.enter()
   		.append("tr")
   		.on("mouseover", function(d){
   			d3.select(this)
   				.style("background-color", "#ecf2f2");
   		})
   		.on("mouseout", function(d){
   			d3.select(this)
   				// .style("background-color",function(d) {if (d==0){return "#f9f9f9" } else {return "#ffffff"}});
          .style("background-color","");
   		});

   	var cells = rows.selectAll("td")
   		.data(function(row){
   			return columns.map(function(d, i){
   				return {i: d, value: row[d]};
   			});
   		})
   		.enter()
   		.append("td")
   		.html(function(d){ if (d.i =="Diversity Score, 2010" || d.i=="Diversity Score, 2020") {return d.value} else {return d.value};})
      .attr("class", "cells")
      .attr("class", function(d) { if (d.i == "County" || d.i == "Increase in Percentage Points, 2010-2020") {return 'col-md-3'} else {return "col-md-2"}});


      var header2 = thead2.append("tr")
         .selectAll("th")
         .data(columns2)
         .enter()
         .append("th")
           .text(function(d){ return d;})
           .attr("class","thead-css")



       var rows2 = tbody2.selectAll("tr")
         .data(tableTwoData)
         .enter()
         .append("tr")
         .on("mouseover", function(d){
           d3.select(this)
             .style("background-color", "#ecf2f2");
         })
         .on("mouseout", function(d){
           d3.select(this)
             // .style("background-color",function(d) {if (d==0){return "#f9f9f9" } else {return "#ffffff"}});
             .style("background-color","");
         });

       var cells2 = rows2.selectAll("td")
         .data(function(row){
           return columns2.map(function(d, i){
             return {i: d, value: row[d]};
           });
         })
         .enter()
         .append("td")
         .html(function(d){ return d.value;})
         .attr("class", "cells")
         .attr("class", function(d) { if (d.i == "County" || d.i =="Share Pop, Non-White or Hispanic" ||  d.i =="Change in Total Population, 2010-2020" || d.i =="Total Population in 2020") {return 'col-md-4'} else {return "col-md-2"}});





    var legRect = g.selectAll("rect")
      .data(color2020.range().map(function(d) {
          d = color2020.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        }))
        .enter()
        .append("rect")
        .attr("height", 12)
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("fill", function(d) { return color2020(d[0]); });

svg.append("text")
        .attr("class", "caption")
        .attr("x", 15)
        .attr("y", 45)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .style('z-index', 99)
        .text("Diversity Index");

    g.call(d3.axisBottom(x)
        .tickSize(16)
        .tickFormat(d => d*100 + "%")
        // .tickFormat(function(x, i) { return i ? x : x + "%"; })
        .tickValues((color2020.domain())))
        .select(".domain")
        .remove();


        var legRect2 = g2.selectAll("rect")
          .data(colorIndex.range().map(function(d) {
              d = colorIndex.invertExtent(d);
              if (d[0] == null) d[0] = x2.domain()[0];
              if (d[1] == null) d[1] = x2.domain()[1];
              return d;
            }))
            .enter()
            .append("rect")
            .attr("height", 12)
            .attr("x", function(d) { return x2(d[0]); })
            .attr("width", function(d) { return x2(d[1]) - x2(d[0]); })
            .attr("fill", function(d) { return colorIndex(d[0]); });

    svg2.append("text")
            .attr("class", "caption")
            .attr("x", 15)
            .attr("y", 45)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .style('z-index', 99)
            .text("Change in Diversity Index 2010-20");

        g2.call(d3.axisBottom(x2)
            .tickSize(16)
            .tickFormat(d => d*100)
            // .tickFormat(function(x, i) { return i ? x : x + "%"; })
            .tickValues((colorIndex.domain())))
            .select(".domain")
            .remove();

    var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
          });




  function Williams () {



tbody.selectAll("tr")
   		// .data(tableOneData)
   		// .enter()
   		.style("background-color", function(d){
        if (d["County"] =="Williams County, ND") {
   				return "#a3e8bc"}
        else {return ""};})
      .on("mouseover", function(d){
        if (d["County"] !="Williams County, ND") {
            d3.select(this).style("background-color", "#ecf2f2");
          }})
      .on("mouseout", function(d){
        if (d["County"] !="Williams County, ND") {
            d3.select(this).style("background-color", "");
          }});
allClear ()

  }


  function Forsyth () {

tbody.selectAll("tr")
   		// .data(tableOneData)
   		// .enter()
   		.style("background-color", function(d){
        if (d["County"] =="Forsyth County, GA") {
   				return "#a3e8bc"}
        else {return ""};})
      .on("mouseover", function(d){
        if (d["County"] !="Forsyth County, GA") {
            d3.select(this).style("background-color", "#ecf2f2");
          }})
      .on("mouseout", function(d){
        if (d["County"] !="Forsyth County, GA") {
            d3.select(this).style("background-color", "");
          }});

          allClear ()

  }


  function mountainMama () {

  tbody2.selectAll("tr")
      // .data(tableOneData)
      // .enter()
      .style("background-color", function(d){
        if (d["County"] =="Preston County, WV" || d["County"] =="Wetzel County, WV" || d["County"] =="Lincoln County, WV" || d["County"] == "Boone County, WV"||d["County"] =="Roane County, WV") {
          return "#a3e8bc"}
        else {return ""};})
      .on("mouseover", function(d){
        if (d["County"] =="Preston County, WV" || d["County"] =="Wetzel County, WV" || d["County"] =="Lincoln County, WV" || d["County"] == "Boone County, WV" || d["County"] == "Roane County, WV")
        { d3.select(this).style("background-color", "#a3e8bc")}
        else  {return"#ecf2f2"}
      })
      .on("mouseout", function(d){
        if (d["County"] =="Preston County, WV" || d["County"] =="Wetzel County, WV" || d["County"] =="Lincoln County, WV" || d["County"] == "Boone County, WV" || d["County"] =="Roane County, WV")
          { d3.select(this).style("background-color","#a3e8bc")}
          else  {return"#ecf2f2"}
          });

  }

  function allClear () {

  tbody2.selectAll("tr")
      // .data(tableOneData)
      // .enter()
      .style("background-color", function(d){
         {return ""};})

      .on("mouseover", function(d){
         {
            d3.select(this).style("background-color", "#ecf2f2");
          }})
      .on("mouseout", function(d){
         {
            d3.select(this).style("background-color", "");
          }});

  }


  function Preston () {

tbody2.selectAll("tr")
   		// .data(tableOneData)
   		// .enter()
   		.style("background-color", function(d){
        if (d["County"] =="Preston County, WV") {
   				return "#a3e8bc"}
        else {return ""};})
      .on("mouseover", function(d){
        if (d["County"] !="Preston County, WV") {
            d3.select(this).style("background-color", "#ecf2f2");
          }})
      .on("mouseout", function(d){
        if (d["County"] !="Preston County, WV") {
            d3.select(this).style("background-color", "");
          }});

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




	  chart1.select('p').text(response.index + 1);



  if (step1._groups[0][0].className === 'step1 is-active' ) {

    Williams ()
    allClear ()


  }

  if (step1._groups[0][1].className === 'step1 is-active' ) {

  Forsyth ()

	}




}


function handleStepEnter3(response) {


  step2.classed('is-active', function (d, j) {
    return j === response.index;
  });


    chart2.select('p').text(response.index + 1);







 if (step2._groups[0][0].className === 'step2 is-active' ){

    allClear ()



  }


 if (step2._groups[0][1].className === 'step2 is-active'){

  mountainMama()

  }

  if (step2._groups[0][2].className === 'step2 is-active'){

    Preston ()

  }

 if (step2._groups[0][3].className === 'step2 is-active'  ) {

  allClear ()

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

function change2020 () {

  map.setPaintProperty('county-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', 'diversity2020']],
      // 0,"#ffffff",
      // .1,"#e6e4ee",
      // .2,"#cdc9de",
      // .3,"#b5aece",
      // .4,"#9c95bd",
      // .5,"#847cad",
      // .6,"#6c649d",
      // .7,"#534d8e",
      // .8,"#39377e"
      0,"#ffffff",
      .1,"#e9faee",
      .2,"#d2f4dd",
      .3,"#bbeecd",
      .4,"#a3e8bc",
      .5,"#89e2ac",
      .6,"#6ddc9c",
      .7,"#4bd58c",
      .8,"#05ce7c"
  ]);
var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='hidden'
    document.getElementById("legendOne").style.visibility='visible'

document.getElementById("2020DI").className += " active";


}

function change2010 () {

  map.setPaintProperty('county-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', 'diversity2010']],
      // 0,"#ffffff",
      // .1,"#e6e4ee",
      // .2,"#cdc9de",
      // .3,"#b5aece",
      // .4,"#9c95bd",
      // .5,"#847cad",
      // .6,"#6c649d",
      // .7,"#534d8e",
      // .8,"#39377e"
      0,"#ffffff",
      .1,"#e9faee",
      .2,"#d2f4dd",
      .3,"#bbeecd",
      .4,"#a3e8bc",
      .5,"#89e2ac",
      .6,"#6ddc9c",
      .7,"#4bd58c",
      .8,"#05ce7c"
  ]);
var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

document.getElementById("2010DI").className += " active";
tablinks = document.getElementsByClassName("tablinks");

document.getElementById("legendTwo").style.visibility='hidden'
document.getElementById("legendOne").style.visibility='visible'

}


function changeDI () {

  map.setPaintProperty('county-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', 'diversityChange']],
      -.2,"#fb594d",
      -.15,"#ff8777",
      -.1,"#ffb0a2",
      -.05,"#ffd8d0",
      // 0,"#ffebe7",
      // .05,"#cdc9de",
      // .1,"#9c95bd",
      // .15,"#6c649d",
      // .2,"#39377e"

      0,"#dbf6e4",
      .05,"#b6edc9",
      .1,"#8ee3af",
      .15,"#61d996",
      .2,"#05ce7c"
  ]);





var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

document.getElementById("changeDI").className += " active";
tablinks = document.getElementsByClassName("tablinks");

document.getElementById("legendTwo").style.visibility='visible'
document.getElementById("legendOne").style.visibility='hidden'

}






// kick things off
