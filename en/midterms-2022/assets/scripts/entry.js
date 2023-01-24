mapboxgl.accessToken = 'pk.eyJ1IjoibmFlIiwiYSI6ImNpemV0cDY4YTAwMXoyd3FraWhkcXRnMTIifQ.IZeLcFQVdkGbEwQYnOb5qQ'



var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/nae/cl88s5a6b002d15lp6qbejpqb',
  center: [1,-2],
  zoom: 4.0,
})



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
map.addControl(new mapboxgl.NavigationControl({showCompass: false}));
map.resize()


var popup = new mapboxgl.Popup({offset: [0, 20]})

var colorIndex = d3.scaleThreshold()

                   .domain([-.03,-.025,-.02,-.015,-.01,-.005,0,.005,.01,.015,.02,.025,.03])
                   // .range(["#ff704f","#fe8a5e","#fca172","#fab689","#f9c9a4","#f7dcc2","#f7ede2","#96d3e7","#70c0e4","#4babe2","#2b96de","#207fd7","#3366cc"])
                   .range(["#ff704f","#fd8f62","#fba97b","#f9c299","#f8d8bc","#f7ede2","#E8EDED","#bde5ed","#8ecfe6","#61b8e3","#379fe0","#1f84d9","#3366cc"])





                  // -.03,"#ff704f",
                  // -.025,"#ff8461",
                  // -.02,"#ff9674",
                  // -.015,"#fea889",
                  // -.01,"#fcb99e",
                  // -.005,"#f9c9b5",
                  // 0,"",
                  // .005,"#bde5ed",
                  // .01,"#8ecfe6",
                  // .015,"#61b8e3",
                  // .02,"#379fe0",
                  // .025,"#1f84d9",
                  // .03,"#3366cc"
//
      // "#ff704f","#ff8461","#ff9674","#fea889","#fcb99e","#f9c9b5","#bde5ed","#96d3e7","#70c0e4","#4babe2","#2b96de","#207fd7","#3366cc"
// "#ff704f","#F9C9B5","#bde5ed","#96d3e7","#70c0e4","#4babe2","#2b96de","#207fd7","#3366cc"
      // "#fb594d","#ff8777","#ffb0a2","#ffd8d0","#ffebe7","#cdc9de","#9c95bd","#6c649d","#39377e"

var color2022 = d3.scaleThreshold()
      .domain([0,2,4,6,8,10,12,14,16,18,20])
      .range(["#bde5ed","#a5dae9","#8ecfe6","#77c4e5","#61b8e3","#4babe2","#379fe0","#2791dd","#1f84d9","#2675d3","#3366cc"])

var color2022aa = d3.scaleThreshold()
            .domain([0,4,8,12,16,20,24,28,32,36,40])
            .range(["#bde5ed","#a5dae9","#8ecfe6","#77c4e5","#61b8e3","#4babe2","#379fe0","#2791dd","#1f84d9","#2675d3","#3366cc"])

var color2022na = d3.scaleThreshold()
            .domain([0,2,4,6,8,10,12,14,16,18])
            .range(["#bde5ed","#a3d9e9","#89cde6","#70c0e4","#57b2e2","#40a4e1","#2b96de","#2087da","#2477d4","#3366cc"])


  var color2022wi = d3.scaleThreshold()
              .domain([0,10,20,30,40,50,60,70,80,90,100])
              .range(["#bde5ed","#a5dae9","#8ecfe6","#77c4e5","#61b8e3","#4babe2","#379fe0","#2791dd","#1f84d9","#2675d3","#3366cc"])

    var color2022mi = d3.scaleThreshold()
                .domain([0,1,2,3,4,5,6,7,8,9,10])
                .range(["#bde5ed","#a5dae9","#8ecfe6","#77c4e5","#61b8e3","#4babe2","#379fe0","#2791dd","#1f84d9","#2675d3","#3366cc"])

  var colorElder=d3.scaleThreshold()
                .domain([16,18,20,22,24,26,28,30])
                .range(["#bde5ed","#9bd6e8","#7bc5e5","#5bb4e3","#3da2e0","#258fdc","#227bd6","#3366cc"])

  var colorElderCH=d3.scaleThreshold()
                .domain([-.06,-.05,-.04,-.03,-.02,-.01,0,.01,.02,.03,.04,.05,.06])
                .range([])

// Good option: "#f2bc02","#f4c601","#f5cf03","#f5d908","#f5e310","#f5ed18","#f4f721","#bde5ed","#8ecfe6","#61b8e3","#379fe0","#1f84d9","#3366cc"
// "#f2bc02","#d0d046","#b5de78","#a7e7a6","#aceccc","#c5eee5","#e8eded","#8ecfe6","#61b8e3","#379fe0","#1f84d9","#3366cc"
//["#bde5ed","#a3d9e9","#89cde6","#70c0e4","#57b2e2","#40a4e1","#2b96de","#2087da","#2477d4","#3366cc"]
// ["#ffffff","#ecedfa","#d8dbf4","#c5c9ef","#b0b7e9","#9ca6e4","#8695de","#6f85d8","#5575d2","#3366cc"]

// "#bde5ed","#addeea","#9ed7e8","#8ecfe6","#7fc8e5","#70c0e4","#61b8e3","#52b0e2","#44a7e1","#379fe0","#2b96de","#238ddc","#1f84d9","#227ad5","#2a70d1","#3366cc"


var tablinks
  var trigger = 0



var container = map.getCanvasContainer()


var formatComma = d3.format(",.0f")
var estimate = function(d) {return formatComma(Math.round(d/1000)*1000);}
var formatNoComma = d3.format(".00f")
var formatTenth = d3.format(".1f")
var formatPercent = d3.format(",.1%")
var formatMoney = function(d) { return "$" + formatComma(d); }


// var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };

var container = map.getCanvasContainer()

var svg = d3.select(container)
            .append("svg")
            .attr("class", "legendSVG")
            .attr("id","legendOne")
            .attr("width", "300")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "visible")
            .style("z-index", 2)

var g = svg.append("g")


var svg2 = d3.select(container)
            .append("svg")
            .attr("class", "legendSVG2")
            .attr("id","legendTwo")
            .attr("width", "380")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)

var g2 = svg2.append("g").attr("transform", "translate(" + 10 + ", 0)");

 var defs = svg2.append('defs');


var svgAAPI = d3.select(container)
            .append("svg")
            .attr("class", "legendSVGaapi")
            .attr("id","legendAAPI")
            .attr("width", "340")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)
var gAAPI = svgAAPI.append("g")

var svgAA= d3.select(container)
            .append("svg")
            .attr("class", "legendSVGaa")
            .attr("id","legendAA")
            .attr("width", "300")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)

var gAA = svgAA.append("g")

var svgNA = d3.select(container)
            .append("svg")
            .attr("class", "legendSVGna")
            .attr("id","legendNA")
            .attr("width", "300")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)
var gNA = svgNA.append("g")



var svgHI = d3.select(container)
            .append("svg")
            .attr("class", "legendSVGhi")
            .attr("id","legendHI")
            .attr("width", "300")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)
var gHI = svgHI.append("g")

var svgWI = d3.select(container)
            .append("svg")
            .attr("class", "legendSVGwi")
            .attr("id","legendWI")
            .attr("width", "300")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)
var gWI = svgWI.append("g")

var svgMI = d3.select(container)
            .append("svg")
            .attr("class", "legendSVGmi")
            .attr("id","legendMI")
            .attr("width", "300")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)
var gMI = svgMI.append("g")

var svgELD = d3.select(container)
            .append("svg")
            .attr("class", "legendSVGeld")
            .attr("id","legendELDER")
            .attr("width", "300")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)
var gELD = svgELD.append("g")

var svgELDch = d3.select(container)
            .append("svg")
            .attr("class", "legendSVGeldCH")
            .attr("id","legendELDERch")
            .attr("width", "380")
            .attr("height", "65")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style('background-color', "none")
            .style("z-index", 2)
var gELDch = svgELDch.append("g").attr("transform", "translate(" + 10 + ", 0)");

 var defsE = svgELDch.append('defs');





var mapMode= ["Year2010", "Year2020", "Difference"]
var selectMode = 0

// var circleSVG_1 = d3.select("#circleSVG"),
//     margin = {top: 10, left: 20, bottom: 10, right: 20},
//     width = +circleSVG_1.attr("viewBox").split(" ")[2]-margin.left-margin.right,
//     height = +circleSVG_1.attr("viewBox").split(" ")[3]


var screenHeight = window.screen.height
var screenWidth = window.screen.width
var toolOffWidth = screenWidth*.1
var toolOffHeight = screenHeight*.3

    // .range(["#ffffff","#e6e4ee","#cdc9de","#b5aece","#9c95bd","#847cad","#6c649d","#534d8e","#39377e"])

var x = d3.scaleLinear()
    .domain([0,20])
    .rangeRound([20, 280]);

var x2 = d3.scaleLinear()
    .domain([-.03,.03])
    .rangeRound([20, 280]);

    var x3 = d3.scaleLinear()
        .domain([0,40])
        .rangeRound([20, 280]);

        var x4 = d3.scaleLinear()
            .domain([0,18])
            .rangeRound([20, 280]);

            var x5 = d3.scaleLinear()
                .domain([0,100])
                .rangeRound([20, 280]);

                var x6 = d3.scaleLinear()
                    .domain([0,10])
                    .rangeRound([20, 280]);

                    var x7 = d3.scaleLinear()
                        .domain([16,30])
                        .rangeRound([20,280]);

                        var x8 = d3.scaleLinear()
                            .domain([-.06,.06])
                            .rangeRound([20, 280]);



//
// var g = circleSVG_1.append("g") //Set the filter on the container svg
//     // .style("filter", "url(#gooey)")
// 		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");









var stateData = d3.json("https://immcouncil-data.s3.us-east-2.amazonaws.com/Midterm_Election_Map.json")
var hoveredStateId = null
var identity = "foreignBorn"

  Promise.all([stateData]).then(startChange);


 function startChange(data) {

var stateData = data[0]


map.on('load', () => {

  map.addSource('state', {
      type: 'vector',
      url: "mapbox://nae.2dulngls",
      // nae.6iud5eqf
      promoteId: 'STATE'
  });

stateData.forEach((row) => {




  map.setFeatureState({
    "source": 'state',
    'sourceLayer': 'stateAlbers-b4vtbu',
    "id": row["statefip"]  },  {



margin2016 : +row["Margin2016"],
margin2020 : +row["Margin2020"],

fbNumbers22 : +row["state_values"][2]["Total_2022"],
fbShare22 : +row["state_values"][2]["Share_2022"],
fbNumbers16 : +row["state_values"][2]["Total_2016"],
fbShare16 : +row["state_values"][2]["Share_2016"],
fbChange : +row["state_values"][2]["ChangeShare_2016_2022"],
//aapi
aapiNumbers22 : +row["state_values"][0]["Total_2022"],
aapiShare22 : +row["state_values"][0]["Share_2022"],
aapiNumbers16 : +row["state_values"][0]["Total_2016"],
aapiShare16 : +row["state_values"][0]["Share_2016"],
aapiChange : +row["state_values"][0]["ChangeShare_2016_2022"],
//Black
blackNumbers22 : +row["state_values"][1]["Total_2022"],
blackShare22 : +row["state_values"][1]["Share_2022"],
blackNumbers16 : +row["state_values"][1]["Total_2016"],
blackShare16 : +row["state_values"][1]["Share_2016"],
blackChange : +row["state_values"][1]["ChangeShare_2016_2022"],
//Hispanic
hispanicNumbers22 : +row["state_values"][3]["Total_2022"],
hispanicShare22 : +row["state_values"][3]["Share_2022"],
hispanicNumbers16 : +row["state_values"][3]["Total_2016"],
hispanicShare16 : +row["state_values"][3]["Share_2016"],
hispanicChange : +row["state_values"][3]["ChangeShare_2016_2022"],
//mixed
mixedNumbers22 : +row["state_values"][4]["Total_2022"],
mixedShare22 : +row["state_values"][4]["Share_2022"],
mixedNumbers16 : +row["state_values"][4]["Total_2016"],
mixedShare16 : +row["state_values"][4]["Share_2016"],
mixedChange : +row["state_values"][4]["ChangeShare_2016_2022"],
//nativeAm
nativeAmNumbers22 : +row["state_values"][5]["Total_2022"],
nativeAmShare22 : +row["state_values"][5]["Share_2022"],
nativeAmNumbers16 : +row["state_values"][5]["Total_2016"],
nativeAmShare16 : +row["state_values"][5]["Share_2016"],
nativeAmChange : +row["state_values"][5]["ChangeShare_2016_2022"],

// seniorNumbers22 : +row["state_values"][8]["Total_2022"],
seniorShare22 : +row["state_values"][6]["Share_2022"],
// seniorNumbers16 : +row["state_values"][8]["Total_2016"],
seniorShare16 : +row["state_values"][6]["Share_2016"],
seniorChange : +row["state_values"][6]["ChangeShare_2016_2022"],
//usBorn
usBornNumbers22 : +row["state_values"][7]["Total_2022"],
usBornShare22 : +row["state_values"][7]["Share_2022"],
usBornNumbers16 : +row["state_values"][7]["Total_2016"],
usBornShare16 : +row["state_values"][7]["Share_2016"],
usBornChange : +row["state_values"][7]["ChangeShare_2016_2022"],
//white
whiteNumbers22 : +row["state_values"][8]["Total_2022"],
whiteShare22 : +row["state_values"][8]["Share_2022"],
whiteNumbers16 : +row["state_values"][8]["Total_2016"],
whiteShare16 : +row["state_values"][8]["Share_2016"],
whiteChange : +row["state_values"][8]["ChangeShare_2016_2022"]



})
// var fbNumbers=+row["state_values"][0]["Total_2022"]

})



//   censusDiversity.forEach((row) => {
//           map.setFeatureState({
//             "source": 'county',
//             'sourceLayer': 'countyAlbers-317z4o',
//             "id": row["GEO_ID"]  },  {
//   diversity2010 : +row["DiversityIndex2010"],
//   diversity2020 : +row["DiversityIndex2020"],
//   diversityChange : +row["ChangeDiversityIndex"],
//   diversityChangePer : +row["ChangeDiversityIndex"],
//   countyName : row["CountyNAME"],
//   ChangeDiversityIndexPercent : +row["May2020_Noncitizen"]
// }
// )
// });


  map.addLayer({
    'id': 'state-fill',
    'type': 'fill',
    'source': 'state',
    "source-layer": "stateAlbers-b4vtbu",
    'layout': {
      'visibility': 'visible'
    },
    // 'minzoom': 5,
    // 'maxzoom': 8,
    'paint': {
      'fill-color': [
        'interpolate',
          ['linear'],
          ['to-number', ['feature-state', "fbShare22"]],
          0,"#bde5ed",
          .02,"#a5dae9",
          .04,"#8ecfe6",
          .06,"#77c4e5",
          .08,"#61b8e3",
          .1,"#4babe2",
          .12,"#379fe0",
          .14,"#2791dd",
          .16,"#1f84d9",
          .18,"#2675d3",
          .2,"#3366cc"],
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
    'line-color': "#FFFFFF",
    'line-width': ['case',
                  ['boolean',['feature-state','hover'], false],
                  5,
                  1.5
                ]
  }
  });




map.on("mousemove", function (e) {

  var features = map.queryRenderedFeatures(e.point, {layers: ['state-fill']})

  if (features.length>0){

    map.getCanvas().style.cursor = 'pointer';

    var stateName = features[0].properties.NAME;

    if (identity=="foreignBorn") {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Immigrants:  "+formatPercent(features[0].state.fbShare22) + "</br>Estimated Number of Eligible Immigrant Voters:  "+estimate(features[0].state.fbNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Immigrant Share of Eligible Voters:  "+formatPercent(features[0].state.fbChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else if (identity=="aapi") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Asian:  "+formatPercent(features[0].state.aapiShare22) + "</br>Estimated Number of Eligible Asian Voters  "+estimate(features[0].state.aapiNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Asian Share of Eligible Voters:  "+formatPercent(features[0].state.aapiChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else if (identity=="black") {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are African American:  "+formatPercent(features[0].state.blackShare22) + "</br>Estimated Number of Eligible Black Voters  "+estimate(features[0].state.blackNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Immigrant Share of Black Voters:  "+formatPercent(features[0].state.blackChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else if (identity=="navAm") {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Native American:  "+formatPercent(features[0].state.nativeAmShare22) + "</br>Estimated Number of Eligible Native American Voters:  "+estimate(features[0].state.nativeAmNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Native American Share of Eligible Voters:  "+formatPercent(features[0].state.nativeAmChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else if (identity=="hispanic") {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Hispanic:  "+formatPercent(features[0].state.hispanicShare22) + "</br>Estimated Number of Eligible Hispanic Voters:  "+estimate(features[0].state.hispanicNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Hispanic Share of Eligible Voters:  "+formatPercent(features[0].state.hispanicChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else if (identity=="mixed") {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Multiracial:  "+formatPercent(features[0].state.mixedShare22) + "</br>Estimated Number of Eligible Multiracial Voters:  "+estimate(features[0].state.mixedNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>CChange in Percentage Points in Multiracial Share of Eligible Voters:  "+formatPercent(features[0].state.mixedChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else if (identity=="white") {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are White:  "+formatPercent(features[0].state.whiteShare22) + "</br>Estimated Number of Eligible White Voters:  "+estimate(features[0].state.whiteNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in White Share of Eligible Voters: "+formatPercent(features[0].state.whiteChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else if (identity=="elder") {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Age 65+:  "+formatPercent(features[0].state.seniorShare22)  + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Senior Share of Eligible Voters: "+formatPercent(features[0].state.seniorChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

    else {
    var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Immigrants:  "+formatPercent(features[0].state.fbShare22) + "</br>Estimated Number of Eligible Immigrant Voters:  "+estimate(features[0].state.fbNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Immigrant Share of Eligible Voters:   "+formatPercent(features[0].state.fbChange)+"</div>"
    popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}
  }

  else if (features.length==0){

    map.getCanvas().style.cursor = '';
    popup.remove();
    map.setFeatureState(
    { source: 'state',
    sourceLayer: "stateAlbers-b4vtbu",
    id: hoveredStateId },
    { hover: false }
    );
  }

    else{
popup.remove();
      map.getCanvas().style.cursor = 'pointer';
      var stateName = features[0].properties.NAME;

      map.getCanvas().style.cursor = 'pointer';

      var stateName = features[0].properties.NAME;

      if (identity=="foreignBorn") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Immigrants:  "+formatPercent(features[0].state.fbShare22) + "</br>Estimated Number of Eligible Immigrant Voters:  "+estimate(features[0].state.fbNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Immigrant Share of Eligible Voters:  "+formatPercent(features[0].state.fbChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else if (identity=="aapi") {
        var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Asian:  "+formatPercent(features[0].state.aapiShare22) + "</br>Estimated Number of Eligible Asian Voters:  "+estimate(features[0].state.aapiNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Asian Share of Eligible Voters:    "+formatPercent(features[0].state.aapiChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else if (identity=="black") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are African American:  "+formatPercent(features[0].state.blackShare22) + "</br>Estimated Number of Eligible Black Voters:  "+estimate(features[0].state.blackNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Black Share of Eligible Voters:  "+formatPercent(features[0].state.blackChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else if (identity=="navAm") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Native American:  "+formatPercent(features[0].state.nativeAmShare22) + "</br>Estimated Number of Eligible Native American Voters:  "+estimate(features[0].state.nativeAmNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Native American Share of Eligible Voters:  "+formatPercent(features[0].state.nativeAmChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else if (identity=="hispanic") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Hispanic:  "+formatPercent(features[0].state.hispanicShare22) + "</br>Estimated Number of Eligible Hispanic Voters:  "+estimate(features[0].state.hispanicNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Hispanic Share of Eligible Voters: "+formatPercent(features[0].state.hispanicChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else if (identity=="mixed") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Multiracial:  "+formatPercent(features[0].state.mixedShare22) + "</br>Estimated Number of Eligible Multiracial Voters:  "+estimate(features[0].state.mixedNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</brChange in Percentage Points in Multiracial Share of Eligible Voters:  "+formatPercent(features[0].state.mixedChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else if (identity=="white") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are White:  "+formatPercent(features[0].state.whiteShare22) + "</br>Estimated Number of Eligible White Voters:  "+estimate(features[0].state.whiteNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in White Share of Eligible Voters:  "+formatPercent(features[0].state.whiteChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else if (identity=="elder") {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of eligible voters who are age 65+:  "+formatPercent(features[0].state.seniorShare22)  + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in the Share of Voters Aged 65 and Older:  "+formatPercent(features[0].state.seniorChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}

      else {
      var popUpText = "<div class='popUpDiv'><b>"+stateName +"</b></br>Share of Eligible Voters who are Immigrants:  "+formatPercent(features[0].state.fbShare22) + "</br>Estimated Number of Eligible Immigrant Voters:  "+estimate(features[0].state.fbNumbers22) + "</br>Margin of Victory 2016:  "+formatPercent(features[0].state.margin2016)+ "</br>Margin of Victory 2020:  "+formatPercent(features[0].state.margin2020)+ "</br>Change in Percentage Points in Immigrant Share of Eligible Voters:  "+formatPercent(features[0].state.fbChange)+"</div>"
      popup.setLngLat(e.lngLat).setHTML(popUpText).addTo(map);}
  }


  if (features.length > 0) {
if (hoveredStateId !== null) {
map.setFeatureState(
{ source: 'state',
sourceLayer: "stateAlbers-b4vtbu",
id: hoveredStateId },
{ hover: false }
);
}
hoveredStateId = features[0].id;

  map.setFeatureState(
{ source: 'state',
sourceLayer: "stateAlbers-b4vtbu",
id: hoveredStateId },
{ hover: true }
)

  };

  });

map.on('mouseleave', 'state-line',function () {

  map.getCanvas().style.cursor = '';
  popup.remove();
  if (hoveredStateId !== null) {
    popup.remove();
map.setFeatureState(
{ source: 'state',
sourceLayer: "stateAlbers-b4vtbu",
id: hoveredStateId },
{ hover: false }
);
}

else {
  map.setFeatureState(
  { source: 'state',
  sourceLayer: "stateAlbers-b4vtbu",
  id: hoveredStateId },
  { hover: false }
  );

}

  });


});


    var legRect = g.selectAll("rect")
      .data(color2022.range().map(function(d) {
          d = color2022.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        }))
        .enter()
        .append("rect")
        .attr("height", 12)
        .attr("x", function(d) { return x(d[0]); })
        .attr("width", function(d) { return x(d[1]) - x(d[0]); })
        .attr("fill", function(d) { return color2022(d[0]); });

svg.append("text")
        .attr("class", "caption")
        .attr("x", 15)
        .attr("y", 45)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .style('z-index', 99)
        .text("Share of eligible voters who are immigrants.");

    g.call(d3.axisBottom(x)
        .tickSize(16)
        .tickFormat(d => d + "%")
        // .tickFormat(function(x, i) { return i ? x : x + "%"; })
        .tickValues((color2022.domain())))
        .select(".domain")
        .remove();


        var dataColor = [
            {value: -3,color:"#ff704f"},
            {value: -2.5,color:"#fd8f62"},
            {value: -2,color:"#fba97b"},
            {value: -1.5,color:"#f9c299"},
            {value: -1,color:"#f8d8bc"},
            {value: -.5,color:"#f7ede2"},
            {value: 0,color:"#E8EDED"},
            {value: .5,color:"#bde5ed"},
            {value: 1,color:"#8ecfe6"},
            {value: 1.5,color:"#61b8e3"},
            {value: 2,color:"#379fe0"},
            {value: 2.5,color:"#1f84d9"},
            {value: 3,color:"#3366cc"}
          ]

        var extent = d3.extent(dataColor, d => d.value);
        var xScale = d3.scaleLinear()
        .range([0, 300])
        .domain(extent);
        var xTicks = dataColor.map(d => d.value);
        var xAxis = d3.axisBottom(xScale)
        .tickSize(15)
        .tickValues(xTicks);



        var linearGradient = defs.append("linearGradient").attr("id", "myGradient");
    linearGradient.selectAll("stop")
        .data(dataColor)
      .enter().append("stop")
        .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
        .attr("stop-color", d => d.color);

    g2.append("rect")
        .attr("width", 300)
        .attr("height", 15)
        .style("fill", "url(#myGradient)");

    g2.append("g")
        .call(xAxis)
      .select(".domain").remove()
      .attr("class","ticksLeg2");


      svg2.append("text")
              .attr("class", "caption")
              .attr("x", 10)
              .attr("y", 45)
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .style('z-index', 99)
              .text("Change in % points in the share of eligible voters from 2016-22");

              var dataEldCh = [
                  {value: -6,color:"#ff704f"},
                  {value: -5,color:"#fd8f62"},
                  {value: -4,color:"#fba97b"},
                  {value: -3,color:"#f9c299"},
                  {value: -2,color:"#f8d8bc"},
                  {value: -1,color:"#f7ede2"},
                  {value: 0,color:"#E8EDED"},
                  {value: 1,color:"#bde5ed"},
                  {value: 2,color:"#8ecfe6"},
                  {value: 3,color:"#61b8e3"},
                  {value: 4,color:"#379fe0"},
                  {value: 5,color:"#1f84d9"},
                  {value: 6,color:"#3366cc"}
                ]

              var extentE = d3.extent(dataEldCh, d => d.value);
              var xScaleE = d3.scaleLinear()
              .range([0, 280])
              .domain(extentE);
              var xTicksE = dataEldCh.map(d => d.value);
              var xAxisE = d3.axisBottom(xScaleE)
              .tickSize(15)
              .tickValues(xTicksE);



              var linearGradientE = defsE.append("linearGradient").attr("id", "myGradientE");
            linearGradientE.selectAll("stop")
              .data(dataEldCh)
            .enter().append("stop")
              .attr("offset", d => ((d.value - extentE[0]) / (extentE[1] - extentE[0]) * 100) + "%")
              .attr("stop-color", d => d.color);

            gELDch.append("rect")
              .attr("width", 280)
              .attr("height", 15)
              .style("fill", "url(#myGradientE)");

            gELDch.append("g")
              .call(xAxisE)
            .select(".domain").remove()
            .attr("class","ticksLeg2");


            svgELDch.append("text")
                    .attr("class", "caption")
                    .attr("x", 10)
                    .attr("y", 45)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .style('z-index', 99)
                    .text("Change in % points in the share of eligible voters from 2016-22");




// var linearGradient = defs.selectAll('linearGradient')
//                  .attr('id', 'linear-gradient');
//
//       linearGradient.attr("x1", "0%")
//               .attr("y1", "0%")
//               .attr("x2", "100%")
//               .attr("y2", "0%");
//
//     linearGradient.selectAll("stop")
//             .data([
//     {offset: "-0.03",color:"#ff704f"},
//     {offset: "-.025",color:"#fd8f62"},
//     {offset: "-.02",color:"#fba97b"},
//     {offset: "-.015",color:"#f9c299"},
//     {offset: "-.01",color:"#f8d8bc"},
//     {offset: "-.0005",color:"#f7ede2"},
//     {offset: "0",color:"#E8EDED"},
//     {offset: ".0005",color:"#bde5ed"},
//     {offset: ".01",color:"#8ecfe6"},
//     {offset: ".015",color:"#61b8e3"},
//     {offset: ".02",color:"#379fe0"},
//     {offset: ".025",color:"#1f84d9"},
//     {offset: ".03",color:"#3366cc"}
//   ])
//   .enter().append("stop")
//   .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0])) + "%")
//         .attr("stop-color", d => d.color);

        // var legRect2 = g2.selectAll("rect")
        //   .data(colorIndex.range().map(function(d) {
        //       d = colorIndex.invertExtent(d);
        //       if (d[0] == null) d[0] = x2.domain()[0];
        //       if (d[1] == null) d[1] = x2.domain()[1];
        //       return d;
        //     }))
        //     .enter()
        //     .append("rect")
        //     .attr("height", 12)
        //     .attr("x", function(d) { return x2(d[0]); })
        //     .attr("width", function(d) { return x2(d[1]) - x2(d[0]); })
        //     .attr("fill", function(d) { return colorIndex(d[0]); });


    //
    //   g2.append("rect")
    //     .attr("x",10)
    //     .attr("y",15)
    //     .attr('width', 400)
    //     .attr("height", 25)
    //     .style("fill", "url(#linear-gradient)");
    //
    //     var xLeg = d3.scaleLinear()
    //                  .domain([0, 100])
    //                  .range([10, 400]);
    //
    //     var axisLeg = d3.axisBottom(xLeg)
    //                     .tickValues(colorIndex.domain())
    //
    //     g2.attr("class", "axis")
    //         .append("g")
    //         // .attr("transform", "translate(0, 40)")
    //         .call(axisLeg);
    //     g2.call(d3.axisBottom(x2)
    //         .tickSize(0)
    //         .tickFormat(d => d*100)
    //         // .tickFormat(function(x, i) { return i ? x : x + "%"; })
    //         .tickValues((colorIndex.domain())))
    //         .select(".domain")
    //         .remove();

        //     var legRect2eld = gELDch.selectAll("rect")
        //       .data(colorElderCH.range().map(function(d) {
        //           d = colorElderCH.invertExtent(d);
        //           if (d[0] == null) d[0] = x8.domain()[0];
        //           if (d[1] == null) d[1] = x8.domain()[1];
        //           return d;
        //         }))
        //         .enter()
        //         .append("rect")
        //         .attr("height", 12)
        //         .attr("x", function(d) { return x8(d[0]); })
        //         .attr("width", function(d) { return x8(d[1]) - x8(d[0]); })
        //         .attr("fill", function(d) { return colorElderCH(d[0]); });
        //
        // svgELDch.append("text")
        //         .attr("class", "caption")
        //         .attr("x", 15)
        //         .attr("y", 45)
        //         .attr("text-anchor", "start")
        //         .attr("font-weight", "bold")
        //         .style('z-index', 99)
        //         .text("Change in % points in the share of 65+ voters from 2016-22");
        //
        //     gELDch.call(d3.axisBottom(x8)
        //         .tickSize(16)
        //         .tickFormat(d => d*100)
        //         // .tickFormat(function(x, i) { return i ? x : x + "%"; })
        //         .tickValues((colorElderCH.domain())))
        //         .select(".domain")
        //         .remove();


            var legRectAAPI = gAAPI.selectAll("rect")
              .data(color2022.range().map(function(d) {
                  d = color2022.invertExtent(d);
                  if (d[0] == null) d[0] = x.domain()[0];
                  if (d[1] == null) d[1] = x.domain()[1];
                  return d;
                }))
                .enter()
                .append("rect")
                .attr("height", 12)
                .attr("x", function(d) { return x(d[0]); })
                .attr("width", function(d) { return x(d[1]) - x(d[0]); })
                .attr("fill", function(d) { return color2022(d[0]); });

          svgAAPI.append("text")
                .attr("class", "caption")
                .attr("x", 15)
                .attr("y", 45)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .style('z-index', 99)
                .text("Share of eligible voters who are Asian or Pacific Islander");

            gAAPI.call(d3.axisBottom(x)
                .tickSize(16)
                .tickFormat(d => d + "%")
                // .tickFormat(function(x, i) { return i ? x : x + "%"; })
                .tickValues((color2022.domain())))
                .select(".domain")
                .remove();


            var legRectAA = gAA.selectAll("rect")
              .data(color2022aa.range().map(function(d) {
                  d = color2022aa.invertExtent(d);
                  if (d[0] == null) d[0] = x3.domain()[0];
                  if (d[1] == null) d[1] = x3.domain()[1];
                  return d;
                }))
                .enter()
                .append("rect")
                .attr("height", 12)
                .attr("x", function(d) { return x3(d[0]); })
                .attr("width", function(d) { return x3(d[1]) - x3(d[0]); })
                .attr("fill", function(d) { return color2022aa(d[0]); });

        svgAA.append("text")
                .attr("class", "caption")
                .attr("x", 15)
                .attr("y", 45)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .style('z-index', 99)
                .text("Share of eligible voters who are African American");

            gAA.call(d3.axisBottom(x3)
                .tickSize(16)
                .tickFormat(d => d + "%")
                // .tickFormat(function(x, i) { return i ? x : x + "%"; })
                .tickValues((color2022aa.domain())))
                .select(".domain")
                .remove();


                var legRectNA = gNA.selectAll("rect")
                  .data(color2022na.range().map(function(d) {
                      d = color2022na.invertExtent(d);
                      if (d[0] == null) d[0] = x4.domain()[0];
                      if (d[1] == null) d[1] = x4.domain()[1];
                      return d;
                    }))
                    .enter()
                    .append("rect")
                    .attr("height", 12)
                    .attr("x", function(d) { return x4(d[0]); })
                    .attr("width", function(d) { return x4(d[1]) - x4(d[0]); })
                    .attr("fill", function(d) { return color2022na(d[0]); });

            svgNA.append("text")
                    .attr("class", "caption")
                    .attr("x", 15)
                    .attr("y", 45)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .style('z-index', 99)
                    .text("Share of eligible voters who are Native American");

                gNA.call(d3.axisBottom(x4)
                    .tickSize(16)
                    .tickFormat(d => d + "%")
                    // .tickFormat(function(x, i) { return i ? x : x + "%"; })
                    .tickValues((color2022na.domain())))
                    .select(".domain")
                    .remove();



                                var legRectHI = gHI.selectAll("rect")
                                  .data(color2022aa.range().map(function(d) {
                                      d = color2022aa.invertExtent(d);
                                      if (d[0] == null) d[0] = x3.domain()[0];
                                      if (d[1] == null) d[1] = x3.domain()[1];
                                      return d;
                                    }))
                                    .enter()
                                    .append("rect")
                                    .attr("height", 12)
                                    .attr("x", function(d) { return x3(d[0]); })
                                    .attr("width", function(d) { return x3(d[1]) - x3(d[0]); })
                                    .attr("fill", function(d) { return color2022aa(d[0]); });

                            svgHI.append("text")
                                    .attr("class", "caption")
                                    .attr("x", 15)
                                    .attr("y", 45)
                                    .attr("text-anchor", "start")
                                    .attr("font-weight", "bold")
                                    .style('z-index', 99)
                                    .text("Share of eligible voters who are Hispanic");

                                gHI.call(d3.axisBottom(x3)
                                    .tickSize(16)
                                    .tickFormat(d => d + "%")
                                    // .tickFormat(function(x, i) { return i ? x : x + "%"; })
                                    .tickValues((color2022aa.domain())))
                                    .select(".domain")
                                    .remove();


                var legRectWI = gWI.selectAll("rect")
                  .data(color2022wi.range().map(function(d) {
                      d = color2022wi.invertExtent(d);
                      if (d[0] == null) d[0] = x5.domain()[0];
                      if (d[1] == null) d[1] = x5.domain()[1];
                      return d;
                    }))
                    .enter()
                    .append("rect")
                    .attr("height", 12)
                    .attr("x", function(d) { return x5(d[0]); })
                    .attr("width", function(d) { return x5(d[1]) - x5(d[0]); })
                    .attr("fill", function(d) { return color2022wi(d[0]); });

            svgWI.append("text")
                    .attr("class", "caption")
                    .attr("x", 15)
                    .attr("y", 45)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .style('z-index', 99)
                    .text("Share of eligible voters who are white");

                gWI.call(d3.axisBottom(x5)
                    .tickSize(16)
                    .tickFormat(d => d + "%")
                    // .tickFormat(function(x, i) { return i ? x : x + "%"; })
                    .tickValues((color2022wi.domain())))
                    .select(".domain")
                    .remove();


                    var legRectMI = gMI.selectAll("rect")
                      .data(color2022mi.range().map(function(d) {
                          d = color2022mi.invertExtent(d);
                          if (d[0] == null) d[0] = x6.domain()[0];
                          if (d[1] == null) d[1] = x6.domain()[1];
                          return d;
                        }))
                        .enter()
                        .append("rect")
                        .attr("height", 12)
                        .attr("x", function(d) { return x6(d[0]); })
                        .attr("width", function(d) { return x6(d[1]) - x6(d[0]); })
                        .attr("fill", function(d) { return color2022mi(d[0]); });

                svgMI.append("text")
                        .attr("class", "caption")
                        .attr("x", 15)
                        .attr("y", 45)
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .style('z-index', 99)
                        .text("Share of eligible voters who are multiracial");

                    gMI.call(d3.axisBottom(x6)
                        .tickSize(16)
                        .tickFormat(d => d + "%")
                        // .tickFormat(function(x, i) { return i ? x : x + "%"; })
                        .tickValues((color2022mi.domain())))
                        .select(".domain")
                        .remove();


                        var legRectELD = gELD.selectAll("rect")
                          .data(colorElder.range().map(function(d) {
                              d = colorElder.invertExtent(d);
                              if (d[0] == null) d[0] = x7.domain()[0];
                              if (d[1] == null) d[1] = x7.domain()[1];
                              return d;
                            }))
                            .enter()
                            .append("rect")
                            .attr("height", 12)
                            .attr("x", function(d) { return x7(d[0]); })
                            .attr("width", function(d) { return x7(d[1]) - x7(d[0]); })
                            .attr("fill", function(d) { return colorElder(d[0]); });

                      svgELD.append("text")
                            .attr("class", "caption")
                            .attr("x", 15)
                            .attr("y", 45)
                            .attr("text-anchor", "start")
                            .attr("font-weight", "bold")
                            .style('z-index', 99)
                            .text("Share of eligible voters who are 65 and older");

                        gELD.call(d3.axisBottom(x7)
                            .tickSize(16)
                            .tickFormat(d => d + "%")
                            // .tickFormat(function(x, i) { return i ? x : x + "%"; })
                            .tickValues((colorElder.domain())))
                            .select(".domain")
                            .remove();

    var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
          });

}


var shareVchange = "share"

function sharePop () {
    shareVchange = "share"

      if (document.getElementById("foreignBorn").className == "tablinks active") {

        fbToggle()


      }

      else if (document.getElementById("AAPI").className == "tablinks active") {

        aapiToggle()


      }

      else if (document.getElementById("Black").className == "tablinks active") {

        blackToggle()


      }
      else if (document.getElementById("NavAm").className == "tablinks active") {
        NavAmToggle()
        identity = "navAm"
      }
      else if (document.getElementById("Hispanic").className == "tablinks active") {
        hispanicToggle()
        identity = "hispanic"
      }
      else if (document.getElementById("Mixed").className == "tablinks active") {
        mixedToggle()
        identity = "mixed"
      }
      else if (document.getElementById("White").className == "tablinks active") {
        whiteToggle()
        identity = "white"
      }
      else if (document.getElementById("Senior").className == "tablinks active") {
        elderToggle()
        identity = "elder"
      }

      else{
        fbToggle()
      }

    // if (document.getElementById("foreignBorn").className == "tablinks active") {
    //   fbToggle()
    // }

  }


  function shareChange () {
        shareVchange = "change"

        if (document.getElementById("foreignBorn").className == "tablinks active") {
          fbToggle()

        }

        else if (document.getElementById("AAPI").className == "tablinks active") {
          aapiToggle()

        }

        else if (document.getElementById("Black").className == "tablinks active") {
          blackToggle()

        }

        else if (document.getElementById("NavAm").className == "tablinks active") {
          NavAmToggle()

        }

        else if (document.getElementById("Hispanic").className == "tablinks active") {
          hispanicToggle()

        }

        else if (document.getElementById("Mixed").className == "tablinks active") {
          mixedToggle()

        }

        else if (document.getElementById("White").className == "tablinks active") {
          whiteToggle()

        }

        else if (document.getElementById("Senior").className == "tablinks active") {
          elderToggle()

        }

        else{
          fbToggle()
          identity="foreignBorn"
        }

      // if (document.getElementById("foreignBorn").className == "tablinks active") {
      //   fbToggle()
      // }

    }

    function fbToggle() {
      identity="foreignBorn"
      if (shareVchange=="share") {
      map.setPaintProperty('state-fill', 'fill-color', [
        'interpolate',
          ['linear'],
          ['to-number', ['feature-state', "fbShare22"]],
          0,"#bde5ed",
          .02,"#a5dae9",
          .04,"#8ecfe6",
          .06,"#77c4e5",
          .08,"#61b8e3",
          .1,"#4babe2",
          .12,"#379fe0",
          .14,"#2791dd",
          .16,"#1f84d9",
          .18,"#2675d3",
          .2,"#3366cc"
      ]);
      var i
      tablinks = document.getElementsByClassName("tablinks");

        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById("legendTwo").style.visibility='hidden'
        document.getElementById("legendOne").style.visibility='visible'
        document.getElementById("legendAAPI").style.visibility='hidden'
        document.getElementById("legendAA").style.visibility='hidden'
        document.getElementById("legendNA").style.visibility='hidden'
        document.getElementById("legendWI").style.visibility='hidden'
        document.getElementById("legendMI").style.visibility='hidden'
        document.getElementById("legendELDER").style.visibility='hidden'
        document.getElementById("legendELDERch").style.visibility='hidden'

    document.getElementById("share2022").className += " active";
    document.getElementById("foreignBorn").className += " active";
    }

    else {
    map.setPaintProperty('state-fill', 'fill-color', [
      'interpolate',
        ['linear'],
        ['to-number', ['feature-state', "fbChange"]],

        // -.03,"#f2bc02",
        // -.025,"#f9c342",
        // -.02,"#fdca66",
        // -.015,"#ffd286",
        // -.01,"#ffdaa5",
        // -.005,"#fde3c4",
        // -.0025,"#f7ede2",
        // 0,"#E8EDED",
        // .0025,"#bde5ed",
        // .005,"#96d3e7",
        // .01,"#70c0e4",
        // .015,"#4babe2",
        // .02,"#2b96de",
        // .025,"#207fd7",
        // .03,"#3366cc"
        //
        // -.03,"#f2bc02",
        // -.025,"#d0d046",
        // -.02,"#b5de78",
        // -.015,"#a7e7a6",
        // -.01,"#aceccc",
        // -.005, "#c5eee5",
        // 0,"#E8EDED",
        // .0025,"#bde5ed",
        // .005,"#96d3e7",
        // .01,"#70c0e4",
        // .015,"#4babe2",
        // .02,"#2b96de",
        // .025,"#207fd7",
        // .03,"#3366cc"

        //
        // -.03,"#f2bc02",
        // -.025,"#f4c802",
        // -.02,"#f5d305",
        // -.015,"#f6df0d",
        // -.01,"#f5eb17",
        // -.005,"#f4f721",
        // 0,"#E8EDED",
        // .0025,"#bde5ed",
        // .005,"#96d3e7",
        // .01,"#70c0e4",
        // .015,"#4babe2",
        // .02,"#2b96de",
        // .025,"#207fd7",
        // .03,"#3366cc"







            -.03,"#ff704f",
            -.025,"#fd8f62",
            -.02,"#fba97b",
            -.015,"#f9c299",
            -.01,"#f8d8bc",
            -.0025,"#f7ede2",
            0,"#E8EDED",
            .0025,"#bde5ed",
            .01,"#8ecfe6",
            .015,"#61b8e3",
            .02,"#379fe0",
            .025,"#1f84d9",
            .03,"#3366cc"


    ]);










  // -.01,"#ff704f",
  // -.005,"#F9C9B5",
  // 0,"#bde5ed",
  // .005,"#96d3e7",
  // .01,"#70c0e4",
  // .015,"#4babe2",
  // .02,"#2b96de",
  // .025,"#207fd7",
  // .03,"#3366cc"

    var i
    tablinks = document.getElementsByClassName("tablinks");

      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      document.getElementById("legendTwo").style.visibility='visible'
      document.getElementById("legendOne").style.visibility='hidden'
      document.getElementById("legendAAPI").style.visibility='hidden'
      document.getElementById("legendAA").style.visibility='hidden'
      document.getElementById("legendNA").style.visibility='hidden'
      document.getElementById("legendHI").style.visibility='hidden'
      document.getElementById("legendWI").style.visibility='hidden'
      document.getElementById("legendMI").style.visibility='hidden'
      document.getElementById("legendELDER").style.visibility='hidden'
      document.getElementById("legendELDERch").style.visibility='hidden'

    document.getElementById("change2016_22").className += " active";
    document.getElementById("foreignBorn").className += " active";
    }

    }


  function aapiToggle () {
      identity="aapi"
    if (shareVchange=="share") {
    map.setPaintProperty('state-fill', 'fill-color', [
      'interpolate',
        ['linear'],
        ['to-number', ['feature-state', "aapiShare22"]],
        0,"#bde5ed",
        .02,"#a5dae9",
        .04,"#8ecfe6",
        .06,"#77c4e5",
        .08,"#61b8e3",
        .1,"#4babe2",
        .12,"#379fe0",
        .14,"#2791dd",
        .16,"#1f84d9",
        .18,"#2675d3",
        .2,"#3366cc"
    ]);
    var i
    tablinks = document.getElementsByClassName("tablinks");

      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      document.getElementById("legendTwo").style.visibility='hidden'
      document.getElementById("legendOne").style.visibility='hidden'
      document.getElementById("legendAAPI").style.visibility='visible'
      document.getElementById("legendAA").style.visibility='hidden'
      document.getElementById("legendNA").style.visibility='hidden'
      document.getElementById("legendHI").style.visibility='hidden'
      document.getElementById("legendWI").style.visibility='hidden'
      document.getElementById("legendMI").style.visibility='hidden'
      document.getElementById("legendELDER").style.visibility='hidden'
      document.getElementById("legendELDERch").style.visibility='hidden'

  document.getElementById("share2022").className += " active";
  document.getElementById("AAPI").className += " active";
  }

  else {
  map.setPaintProperty('state-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', "aapiChange"]],

      -.03,"#f2bc02",
      -.025,"#f9c342",
      -.02,"#fdca66",
      -.015,"#ffd286",
      -.01,"#ffdaa5",
      -.005,"#fde3c4",
      -.0025,"#f7ede2",
      0,"#E8EDED",
      .0025,"#bde5ed",
      .005,"#96d3e7",
      .01,"#70c0e4",
      .015,"#4babe2",
      .02,"#2b96de",
      .025,"#207fd7",
      .03,"#3366cc"

      // -.03,"#f2bc02",
      // -.025,"#f4c802",
      // -.02,"#f5d305",
      // -.015,"#f6df0d",
      // -.01,"#f5eb17",
      // -.005,"#f4f721",
      // 0,"#E8EDED",
      // .0025,"#bde5ed",
      // .005,"#96d3e7",
      // .01,"#70c0e4",
      // .015,"#4babe2",
      // .02,"#2b96de",
      // .025,"#207fd7",
      // .03,"#3366cc"
  ]);
  var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='visible'
    document.getElementById("legendOne").style.visibility='hidden'
    document.getElementById("legendAAPI").style.visibility='hidden'
    document.getElementById("legendAA").style.visibility='hidden'
    document.getElementById("legendNA").style.visibility='hidden'
    document.getElementById("legendHI").style.visibility='hidden'
    document.getElementById("legendWI").style.visibility='hidden'
    document.getElementById("legendMI").style.visibility='hidden'
    document.getElementById("legendELDER").style.visibility='hidden'
    document.getElementById("legendELDERch").style.visibility='hidden'

  document.getElementById("change2016_22").className += " active";
  document.getElementById("AAPI").className += " active";
  }


  }



function blackToggle () {
    identity = "black"

  if (shareVchange=="share") {
  map.setPaintProperty('state-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', "blackShare22"]],
      0,"#bde5ed",
      .04,"#a5dae9",
      .08,"#8ecfe6",
      .12,"#77c4e5",
      .16,"#61b8e3",
      .2,"#4babe2",
      .24,"#379fe0",
      .28,"#2791dd",
      .32,"#1f84d9",
      .36,"#2675d3",
      .4,"#3366cc"

  ]);
  var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='hidden'
    document.getElementById("legendOne").style.visibility='hidden'
    document.getElementById("legendAAPI").style.visibility='hidden'
    document.getElementById("legendAA").style.visibility='visible'
    document.getElementById("legendNA").style.visibility='hidden'
    document.getElementById("legendHI").style.visibility='hidden'
    document.getElementById("legendWI").style.visibility='hidden'
          document.getElementById("legendMI").style.visibility='hidden'
          document.getElementById("legendELDER").style.visibility='hidden'
          document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("share2022").className += " active";
document.getElementById("Black").className += " active";
}

else {
map.setPaintProperty('state-fill', 'fill-color', [
  'interpolate',
    ['linear'],
    ['to-number', ['feature-state', "blackChange"]],
    -.03,"#f2bc02",
    -.025,"#f9c342",
    -.02,"#fdca66",
    -.015,"#ffd286",
    -.01,"#ffdaa5",
    -.005,"#fde3c4",
    -.0025,"#f7ede2",
    0,"#E8EDED",
    .0025,"#bde5ed",
    .005,"#96d3e7",
    .01,"#70c0e4",
    .015,"#4babe2",
    .02,"#2b96de",
    .025,"#207fd7",
    .03,"#3366cc"
    // -.03,"#f2bc02",
    // -.025,"#f4c802",
    // -.02,"#f5d305",
    // -.015,"#f6df0d",
    // -.01,"#f5eb17",
    // -.005,"#f4f721",
    // 0,"#E8EDED",
    // .0025,"#bde5ed",
    // .005,"#96d3e7",
    // .01,"#70c0e4",
    // .015,"#4babe2",
    // .02,"#2b96de",
    // .025,"#207fd7",
    // .03,"#3366cc"
]);
var i
tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("legendTwo").style.visibility='visible'
  document.getElementById("legendOne").style.visibility='hidden'
  document.getElementById("legendAAPI").style.visibility='hidden'
  document.getElementById("legendAA").style.visibility='hidden'
  document.getElementById("legendNA").style.visibility='hidden'
  document.getElementById("legendHI").style.visibility='hidden'
  document.getElementById("legendWI").style.visibility='hidden'
        document.getElementById("legendMI").style.visibility='hidden'
        document.getElementById("legendELDER").style.visibility='hidden'
        document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("change2016_22").className += " active";
document.getElementById("Black").className += " active";
}



}

function NavAmToggle() {
  identity="navAm"

  if (shareVchange=="share") {
  map.setPaintProperty('state-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', "nativeAmShare22"]],
      0,"#bde5ed",
      .02,"#a3d9e9",
      .04,"#89cde6",
      .06,"#70c0e4",
      .08,"#57b2e2",
      .1,"#40a4e1",
      .12,"#2b96de",
      .14,"#2087da",
      .16,"#2477d4",
      .18,"#3366cc"
  ]);


  var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='hidden'
    document.getElementById("legendOne").style.visibility='hidden'
    document.getElementById("legendAAPI").style.visibility='hidden'
    document.getElementById("legendAA").style.visibility='hidden'
    document.getElementById("legendNA").style.visibility='visible'
    document.getElementById("legendHI").style.visibility='hidden'
    document.getElementById("legendWI").style.visibility='hidden'
    document.getElementById("legendMI").style.visibility='hidden'
    document.getElementById("legendELDER").style.visibility='hidden'
    document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("share2022").className += " active";
document.getElementById("NavAm").className += " active";
}

else {
map.setPaintProperty('state-fill', 'fill-color', [
  'interpolate',
    ['linear'],
    ['to-number', ['feature-state', "nativeAmChange"]],
    // -.03,"#f2bc02",
    // -.025,"#f9c342",
    // -.02,"#fdca66",
    // -.015,"#ffd286",
    // -.01,"#ffdaa5",
    // -.005,"#fde3c4",
    // -.0025,"#f7ede2",
    // 0,"#E8EDED",
    // .0025,"#bde5ed",
    // .005,"#96d3e7",
    // .01,"#70c0e4",
    // .015,"#4babe2",
    // .02,"#2b96de",
    // .025,"#207fd7",
    // .03,"#3366cc"


                -.03,"#ff704f",
                -.025,"#ff8461",
                -.02,"#ff9674",
                -.015,"#fea889",
                -.01,"#fcb99e",
                -.005,"#f9c9b5",
                0,"#E8EDED",
                .005,"#bde5ed",
                .01,"#8ecfe6",
                .015,"#61b8e3",
                .02,"#379fe0",
                .025,"#1f84d9",
                .03,"#3366cc"

]);
var i
tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("legendTwo").style.visibility='visible'
  document.getElementById("legendOne").style.visibility='hidden'
  document.getElementById("legendAAPI").style.visibility='hidden'
  document.getElementById("legendAA").style.visibility='hidden'
  document.getElementById("legendNA").style.visibility='hidden'
  document.getElementById("legendHI").style.visibility='hidden'
  document.getElementById("legendWI").style.visibility='hidden'
  document.getElementById("legendMI").style.visibility='hidden'
  document.getElementById("legendELDER").style.visibility='hidden'
  document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("change2016_22").className += " active";
document.getElementById("NavAm").className += " active";
}

}

function hispanicToggle() {
  identity="hispanic"

  if (shareVchange=="share") {
  map.setPaintProperty('state-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', "hispanicShare22"]],
      0,"#bde5ed",
      .04,"#a5dae9",
      .08,"#8ecfe6",
      .12,"#77c4e5",
      .16,"#61b8e3",
      .2,"#4babe2",
      .24,"#379fe0",
      .28,"#2791dd",
      .32,"#1f84d9",
      .36,"#2675d3",
      .4,"#3366cc"
  ]);
  var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='hidden'
    document.getElementById("legendOne").style.visibility='hidden'
    document.getElementById("legendAAPI").style.visibility='hidden'
    document.getElementById("legendAA").style.visibility='hidden'
    document.getElementById("legendNA").style.visibility='hidden'
    document.getElementById("legendHI").style.visibility='visible'
    document.getElementById("legendWI").style.visibility='hidden'
          document.getElementById("legendMI").style.visibility='hidden'
          document.getElementById("legendELDER").style.visibility='hidden'
          document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("share2022").className += " active";
document.getElementById("Hispanic").className += " active";
}

else {
map.setPaintProperty('state-fill', 'fill-color', [
  'interpolate',
    ['linear'],
    ['to-number', ['feature-state', "hispanicChange"]],
    -.03,"#f2bc02",
    -.025,"#f9c342",
    -.02,"#fdca66",
    -.015,"#ffd286",
    -.01,"#ffdaa5",
    -.005,"#fde3c4",
    -.0025,"#f7ede2",
    0,"#E8EDED",
    .0025,"#bde5ed",
    .005,"#96d3e7",
    .01,"#70c0e4",
    .015,"#4babe2",
    .02,"#2b96de",
    .025,"#207fd7",
    .03,"#3366cc"

    // -.03,"#f2bc02",
    // -.025,"#f4c802",
    // -.02,"#f5d305",
    // -.015,"#f6df0d",
    // -.01,"#f5eb17",
    // -.005,"#f4f721",
    // 0,"#E8EDED",
    // .0025,"#bde5ed",
    // .005,"#96d3e7",
    // .01,"#70c0e4",
    // .015,"#4babe2",
    // .02,"#2b96de",
    // .025,"#207fd7",
    // .03,"#3366cc"
]);
var i
tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("legendTwo").style.visibility='visible'
  document.getElementById("legendOne").style.visibility='hidden'
  document.getElementById("legendAAPI").style.visibility='hidden'
  document.getElementById("legendAA").style.visibility='hidden'
  document.getElementById("legendNA").style.visibility='hidden'
  document.getElementById("legendHI").style.visibility='hidden'
  document.getElementById("legendWI").style.visibility='hidden'
        document.getElementById("legendMI").style.visibility='hidden'
        document.getElementById("legendELDER").style.visibility='hidden'
        document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("change2016_22").className += " active";
document.getElementById("Hispanic").className += " active";
}

}

function mixedToggle() {
  identity="mixed"

  if (shareVchange=="share") {
  map.setPaintProperty('state-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', "mixedShare22"]],
      0,"#bde5ed",
      .01,"#a5dae9",
      .02,"#8ecfe6",
      .03,"#77c4e5",
      .04,"#61b8e3",
      .05,"#4babe2",
      .06,"#379fe0",
      .07,"#2791dd",
      .08,"#1f84d9",
      .09,"#2675d3",
      .1,"#3366cc"
  ]);


  var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='hidden'
    document.getElementById("legendOne").style.visibility='hidden'
    document.getElementById("legendAAPI").style.visibility='hidden'
    document.getElementById("legendAA").style.visibility='hidden'
    document.getElementById("legendNA").style.visibility='hidden'
      document.getElementById("legendHI").style.visibility='hidden'
      document.getElementById("legendWI").style.visibility='hidden'
            document.getElementById("legendMI").style.visibility='visible'
            document.getElementById("legendELDER").style.visibility='hidden'
            document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("share2022").className += " active";
document.getElementById("Mixed").className += " active";
}

else {
map.setPaintProperty('state-fill', 'fill-color', [
  'interpolate',
    ['linear'],
    ['to-number', ['feature-state', "mixedChange"]],
    -.03,"#f2bc02",
    -.025,"#f9c342",
    -.02,"#fdca66",
    -.015,"#ffd286",
    -.01,"#ffdaa5",
    -.005,"#fde3c4",
    -.0025,"#f7ede2",
    0,"#E8EDED",
    .0025,"#bde5ed",
    .005,"#96d3e7",
    .01,"#70c0e4",
    .015,"#4babe2",
    .02,"#2b96de",
    .025,"#207fd7",
    .03,"#3366cc"
    // -.03,"#f2bc02",
    // -.025,"#f4c802",
    // -.02,"#f5d305",
    // -.015,"#f6df0d",
    // -.01,"#f5eb17",
    // -.005,"#f4f721",
    // 0,"#E8EDED",
    // .0025,"#bde5ed",
    // .005,"#96d3e7",
    // .01,"#70c0e4",
    // .015,"#4babe2",
    // .02,"#2b96de",
    // .025,"#207fd7",
    // .03,"#3366cc"
]);
var i
tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("legendTwo").style.visibility='visible'
  document.getElementById("legendOne").style.visibility='hidden'
  document.getElementById("legendAAPI").style.visibility='hidden'
  document.getElementById("legendAA").style.visibility='hidden'
  document.getElementById("legendNA").style.visibility='hidden'
    document.getElementById("legendHI").style.visibility='hidden'
    document.getElementById("legendWI").style.visibility='hidden'
          document.getElementById("legendMI").style.visibility='hidden'
          document.getElementById("legendELDER").style.visibility='hidden'
          document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("change2016_22").className += " active";
document.getElementById("Mixed").className += " active";
}

}

function whiteToggle() {
  identity="white"

  if (shareVchange=="share") {
  map.setPaintProperty('state-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', "whiteShare22"]],
      0,"#bde5ed",
      .1,"#a5dae9",
      .2,"#8ecfe6",
      .3,"#77c4e5",
      .4,"#61b8e3",
      .5,"#4babe2",
      .6,"#379fe0",
      .7,"#2791dd",
      .8,"#1f84d9",
      .9,"#2675d3",
      1,"#3366cc"
  ]);
  var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='hidden'
    document.getElementById("legendOne").style.visibility='hidden'
    document.getElementById("legendAA").style.visibility='hidden'
    document.getElementById("legendNA").style.visibility='hidden'
      document.getElementById("legendHI").style.visibility='hidden'
      document.getElementById("legendWI").style.visibility='visible'
            document.getElementById("legendMI").style.visibility='hidden'
            document.getElementById("legendAAPI").style.visibility='hidden'
            document.getElementById("legendELDER").style.visibility='hidden'
            document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("share2022").className += " active";
document.getElementById("White").className += " active";
}

else {
map.setPaintProperty('state-fill', 'fill-color', [
  'interpolate',
    ['linear'],
    ['to-number', ['feature-state', "whiteChange"]],


    //
    // -.03,"#f2bc02",
    // -.025,"#f9c342",
    // -.02,"#fdca66",
    // -.015,"#ffd286",
    // -.01,"#ffdaa5",
    // -.005,"#fde3c4",
    // -.0025,"#f7ede2",
    // 0,"#E8EDED",
    // .0025,"#bde5ed",
    // .005,"#96d3e7",
    // .01,"#70c0e4",
    // .015,"#4babe2",
    // .02,"#2b96de",
    // .025,"#207fd7",
    // .03,"#3366cc"


                -.03,"#ff704f",
                -.025,"#ff8461",
                -.02,"#ff9674",
                -.015,"#fea889",
                -.01,"#fcb99e",
                -.005,"#f9c9b5",
                0,"#E8EDED",
                .005,"#bde5ed",
                .01,"#8ecfe6",
                .015,"#61b8e3",
                .02,"#379fe0",
                .025,"#1f84d9",
                .03,"#3366cc"


    // -.03,"#f2bc02",
    // -.025,"#f4c802",
    // -.02,"#f5d305",
    // -.015,"#f6df0d",
    // -.01,"#f5eb17",
    // -.005,"#f4f721",
    // 0,"#E8EDED",
    // .0025,"#bde5ed",
    // .005,"#96d3e7",
    // .01,"#70c0e4",
    // .015,"#4babe2",
    // .02,"#2b96de",
    // .025,"#207fd7",
    // .03,"#3366cc"
]);
var i
tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("legendTwo").style.visibility='visible'
  document.getElementById("legendOne").style.visibility='hidden'
  document.getElementById("legendAA").style.visibility='hidden'
  document.getElementById("legendAAPI").style.visibility='hidden'
  document.getElementById("legendNA").style.visibility='hidden'
    document.getElementById("legendHI").style.visibility='hidden'
    document.getElementById("legendWI").style.visibility='hidden'
          document.getElementById("legendMI").style.visibility='hidden'
          document.getElementById("legendELDER").style.visibility='hidden'
          document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("change2016_22").className += " active";
document.getElementById("White").className += " active";
}

}

function elderToggle () {
    identity="elder"
  if (shareVchange=="share") {
  map.setPaintProperty('state-fill', 'fill-color', [
    'interpolate',
      ['linear'],
      ['to-number', ['feature-state', "seniorShare22"]],
      .16,"#bde5ed",
      .18,"#9bd6e8",
      .20,"#7bc5e5",
      .22,"#5bb4e3",
      .24,"#3da2e0",
      .26,"#258fdc",
      .28,"#227bd6",
      .30,"#3366cc"

  ]);
  var i
  tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById("legendTwo").style.visibility='hidden'
    document.getElementById("legendOne").style.visibility='hidden'
    document.getElementById("legendAAPI").style.visibility='hidden'
    document.getElementById("legendAA").style.visibility='hidden'
    document.getElementById("legendNA").style.visibility='hidden'
    document.getElementById("legendHI").style.visibility='hidden'
    document.getElementById("legendWI").style.visibility='hidden'
    document.getElementById("legendMI").style.visibility='hidden'
    document.getElementById("legendELDER").style.visibility='visible'
    document.getElementById("legendELDERch").style.visibility='hidden'

document.getElementById("share2022").className += " active";
document.getElementById("Senior").className += " active";
}

else {
map.setPaintProperty('state-fill', 'fill-color', [
  'interpolate',
    ['linear'],
    ['to-number', ['feature-state', "seniorChange"]],

    -.06,"#f2bc02",
    -.05,"#f9c342",
    -.04,"#fdca66",
    -.03,"#ffd286",
    -.02,"#ffdaa5",
    -.01,"#fde3c4",
    -.005,"#f7ede2",
    0,"#E8EDED",
    .005,"#bde5ed",
    .01,"#96d3e7",
    .02,"#70c0e4",
    .03,"#4babe2",
    .04,"#2b96de",
    .05,"#207fd7",
    .06,"#3366cc"

    // -.06,"#f2bc02",
    // -.05,"#f4c802",
    // -.04,"#f5d305",
    // -.03,"#f6df0d",
    // -.02,"#f5eb17",
    // -.01,"#f4f721",
    // 0,"#E8EDED",
    // .005,"#bde5ed",
    // .01,"#96d3e7",
    // .02,"#70c0e4",
    // .03,"#4babe2",
    // .04,"#2b96de",
    // .05,"#207fd7",
    // .06,"#3366cc"
]);
var i
tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById("legendTwo").style.visibility='hidden'
  document.getElementById("legendOne").style.visibility='hidden'
  document.getElementById("legendAAPI").style.visibility='hidden'
  document.getElementById("legendAA").style.visibility='hidden'
  document.getElementById("legendNA").style.visibility='hidden'
  document.getElementById("legendHI").style.visibility='hidden'
  document.getElementById("legendWI").style.visibility='hidden'
  document.getElementById("legendMI").style.visibility='hidden'
  document.getElementById("legendELDER").style.visibility='hidden'
  document.getElementById("legendELDERch").style.visibility='visible'

document.getElementById("change2016_22").className += " active";
document.getElementById("Senior").className += " active";
}


}


// kick things off
