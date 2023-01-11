mapboxgl.accessToken = 'pk.eyJ1IjoibmFlIiwiYSI6ImNpemV0cDY4YTAwMXoyd3FraWhkcXRnMTIifQ.IZeLcFQVdkGbEwQYnOb5qQ';

var cdGeoData
var stateGeoData
var nationGeoData
var countyGeoData
var msaGeoData
var cityPoints
var countyList
var districtList
var searchPadding = 100

var bounds = [
    [-25.555103, -25.078226], // Southwest coordinates
    [45.304546, 25.353245]  // Northeast coordinates
];

var mobileBounds = [
    [-25.555103, -25.078226], // Southwest coordinates
    [25.304546, 25.353245]  // Northeast coordinates
];


map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
    style:'mapbox://styles/nae/cki7v0ak72ka118pdzkv5921z',
    zoom: 2.65*Math.log10(window.innerWidth/50),
    center: [9.5, 0],
    maxZoom: 9,
    attributionControl: true,
    maxBounds: bounds
});

var diamondDis = 124
var diamondMSA = 99
var diamondCount = 74
var diamondState = 49
var diamondUSA = 24

var navigation = new mapboxgl.NavigationControl();

if (window.innerWidth >= 575) {
map.addControl(navigation);
diamondDis = 105
diamondMSA = 85
diamondCount = 65
diamondState = 45
diamondUSA = 25

}

var navigation = new mapboxgl.NavigationControl();

if (window.innerWidth >= 575) {
map.addControl(navigation);
}

var countyCensusData
var sidebarSummary = document.getElementById('summary');
var cssChange = document.getElementById('js-css-change');
var usaRadioClick = document.getElementById('ck7qjivpv195r1io3178901h5');
var stateRadioClick = document.getElementById('ck7qh0mxy0hpa1jo70wpzw08p');
var districtRadioClick = document.getElementById('ck7qm5peo019v1imsllunq6gy');
var countyRadioClick = document.getElementById('ck7xpp57900dg1ipj4r3kgadf');
var msaRadioClick = document.getElementById('ck17um4hj085y1cmmd90ooink');
var countyData;
var foundStateId = null;


var svg = d3.select('#menuSVG')
			.append('svg')

var diamond = d3.symbol().type(d3.symbolDiamond)

var clicked = "nation"




var customData = {
'features': [
{
'type': 'Feature',
'properties': {
'title': 'Arizona Congressional District 6',
'id':
"0406"
},
'geometry': {
'coordinates': [-3.97823043,-12.60764491],
'type': 'Point'
}
},
{
'type': 'Feature',
'properties': {
'title': 'California Congressional District 7',
'id': "0647"
},
'geometry': {
'coordinates': [-3.62629466,-18.13918555],
'type': 'Point'
}
}
],
'type': 'FeatureCollection'
};



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


function numberWithCommas(x) {
    if (x=="N/A") {return "N/A"}
    else if (x=="") {return "N/A"}
    else {
    x=x.split(".")[0]
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
}

function dollars(x) {
  if (x>=1000) {
    var b = (x/1000).toFixed(1);
    return "$"+b+"B"
  }

  else if (x<1000 && x>0){
    var b = (x*1).toFixed(1);
    return "$"+b+"M"
  }

  else {
    return ("N/A")
  }

}

function dollarsCD(x) {
  if (x>=1000000000) {
    var b = (x/1000000000).toFixed(1);
    return "$"+b+"B"
  }

  else if (x<1000000000 && x>0) {
    var b = (x/1000000).toFixed(1);
    return "$"+b+"M"
  }

  else {
    return ("N/A")
  }

}



function fixNA(x) {
    if (x=="NA") {return "N/A"}
    else if (x=="") {return "N/A"}
    else {return x}
}

function flipY () {
  return d3.geoTransform({
    point: function (x, y) {
      this.stream.point(x, -y)
    }
  }).stream
}

var projectionMerc = d3.geoMercator()
// var R = 6378137.0 // radius of Earth in meters
// var scaleEq= 2.65*Math.log10(window.innerWidth/50)
var projection = d3.geoAlbersUsa().translate([0, 0]).scale(57)
var stateData = d3.csv("acs_data/stateData_2019.csv")
var countyData = d3.csv('acs_data/County_Data_2018.csv')
var districtData = d3.csv("acs_data/districtData_2017.csv")
var msaData = d3.csv("acs_data/msaData_2019.csv")
var centers = d3.csv("acs_data/Congressional_Centers.csv")
var nationDataLoad
var stateDataLoad
var countyDataLoad
var districtDataLoad
var msaDataLoad

var bboxPro = document.body.getBoundingClientRect();
var center = map.getCenter();
var zoom = map.getZoom();
var scale = (256) * 0.5 / Math.PI * Math.pow(2, zoom);
var activeMap = null


var d3projection = d3.geoAlbersUsa().translate([bboxPro.width/2, bboxPro.height/2]).scale(scale);
var projectionAl = d3.geoAlbersUsa().translate([bboxPro.width/2, bboxPro.height/2]).scale(scale);
var projectionMercartor = d3.geoMercator().translate([bboxPro.width/2, bboxPro.height/2]).scale(scale);

var displayProperties = [
  'type',
  'properties',
  'id',
  'layer',
  'source',
  'sourceLayer',
  'state'
];




Promise.all([stateData, countyData, districtData, msaData, centers]).then(initNation);





  layerShape = svg.append("g")


  layerShape.append("path")
            .attr("d", diamond
            .size(1500))
            // .attr("transform", )
            .attr("transform", "translate(60,"+diamondDis+") rotate(90)")
            .style("fill", "#000")
            .style('stroke', '#fff')
            .style('stroke-width', 3)
            .attr("class","districtDiamond")
            .attr("z-index", 0)
            .on("mouseover",  function(d) {
              layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

              layerShape.select('#districtText').style("text-transform", "uppercase").style("font-weight", "800")
            })
            .on("mouseout", function(d) {
              if (clicked != "district"){
              layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond
              .size(1500)).style('stroke-width', 3)

              layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
            }
            })
            .on("click", function(d){
              clicked="district";
              districtStart(districtDataLoad);
              layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
              layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.select('#districtText').style("text-transform", "uppercase").style("font-weight", "800")
              layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
            });

  layerShape.append("path")
            .attr("d", diamond
            .size(1500))
            // .attr("transform", )
            .attr("transform", "translate(60, "+diamondMSA+") rotate(90)")
            .style("fill", "#fb5846")
            .style('stroke', '#fff')
            .style('stroke-width', 3)
            .attr("class","msaDiamond")
            .attr("z-index", 5)
            .on("mouseover",  function(d) {
              layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

              layerShape.select('#msaText').style("text-transform", "uppercase").style("font-weight", "800")
            })
            .on("mouseout", function(d) {
              if (clicked != "msa"){
              layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond
              .size(1500)).style('stroke-width', 3)

              layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
            }
            })
            .on("click", function(d){
              clicked="msa";
              msaStart();
              layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
              layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.select('#msaText').style("text-transform", "uppercase").style("font-weight", "800")
              layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
            });

    layerShape.append("path")
                  .attr("d", diamond
                  .size(1500))
                  // .attr("transform", )
                  .attr("transform", "translate(60,"+diamondCount+") rotate(90)")
                  .style("fill", "#f1bd03")
                  .style('stroke', '#fff')
                  .style('stroke-width', 3)
                  .attr("class","countyDiamond")
                  .attr("z-index", 10)
                  .on("mouseover",  function(d) {
                    layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond
                    .size(2250)).style('stroke-width', 3)

                    layerShape.select('#countyText')
                              .style("text-transform", "uppercase")
                              .style("font-weight", "800")
                  })
                  .on("mouseout", function(d) {
                    if (clicked != "county"){
                    layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond
                    .size(1500)).style('stroke-width', 3)

                    layerShape.select('#countyText')
                              .style("text-transform", "none")
                              .style("font-weight", "400")
                            }

                  })
                  .on("click", function(d){
                    clicked="county";
                    countyStart(countyDataLoad);
                    layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
                    layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
                    layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
                    layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
                    layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
                    layerShape.select('#countyText').style("text-transform", "uppercase").style("font-weight", "800")
                    layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
                    layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
                    layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
                    layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
                  });

    layerShape.append("path")
            .attr("d", diamond
            .size(1500))
            // .attr("transform", )
            .attr("transform", "translate(60,"+diamondState+") rotate(90)")
            .style("fill", "#393745")
            .style('stroke', '#fff')
            .style('stroke-width', 3)
            .attr("class","stateDiamond")
            .attr("z-index", 15)
            .on("mouseover",  function(d) {
              layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond
              .size(2250)).style('stroke-width', 3)

              layerShape.select('#stateText')
                        .style("text-transform", "uppercase")
                        .style("font-weight", "800")
            })
            .on("mouseout", function(d) {
              if (clicked != "state"){
              layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond
              .size(1500)).style('stroke-width', 3)

              layerShape.select('#stateText')
                        .style("text-transform", "none")
                        .style("font-weight", "400")
                      }
            })
            .on("click", function(d){
              clicked="state";
              stateStart(stateDataLoad);
              layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
              layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
              layerShape.select('#stateText').style("text-transform", "uppercase").style("font-weight", "800")
              layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
              layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
            });

  layerShape.append("path")
          .attr("d", diamond
          .size(2250))
          // .attr("transform", )
          .attr("transform", "translate(60,"+diamondUSA+") rotate(90)")
          .style("fill", "#05CE7C")
          .style('stroke', '#fff')
          .style('stroke-width', 3)
          .attr("class","nationDiamond")
          .attr("z-index", 20)
          .on("mouseover",  function(d) {
            layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

            layerShape.select('#nationText').style("text-transform", "uppercase").style("font-weight", "800")
          })
          .on("mouseout", function(d) {

            if (clicked !="nation"){
            layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond
            .size(1500)).style('stroke-width', 3)

            layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
          }
          })
          .on("click", function(d){
            clicked="nation";
            nationStart(nationDataLoad);
            layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
            layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.select('#nationText').style("text-transform", "uppercase").style("font-weight", "800")
            layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
            layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
            layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
            layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")

          });


  layerShape.append("text")
           .attr("class", "layerText")
           .attr("id", "nationText")
           .attr("x",110)
           .attr("y",diamondUSA+3)
           .attr("fill", "#000")
           .attr('text-anchor','left')
           .text("United States")
           .on("mouseover",  function(d) {
             layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

             layerShape.select('#nationText').style("text-transform", "uppercase").style("font-weight", "800")
           })
           .on("mouseout", function(d) {

             if (clicked !="nation"){
             layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond
             .size(1500)).style('stroke-width', 3)

             layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
           }
           })
           .on("click", function(d){
             clicked="nation";
             nationStart(nationDataLoad);
             layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
             layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.select('#nationText').style("text-transform", "uppercase").style("font-weight", "800")
             layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
             layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
             layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
             layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")

           });


    layerShape.append("text")
           .attr("class", "layerText")
           .attr("id", "stateText")
           .attr("x",110)
           .attr("y",diamondState+3)
           .attr("fill", "#000")
           .attr('text-anchor','left')
           .text("State")
           .on("mouseover",  function(d) {
             layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

             layerShape.select('#stateText').style("text-transform", "uppercase").style("font-weight", "800")
           })
           .on("mouseout", function(d) {

             if (clicked !="state"){
             layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond
             .size(1500)).style('stroke-width', 3)

             layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
           }
           })
           .on("click", function(d){
             clicked="state";
             stateStart(stateDataLoad);
             layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
             layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
             layerShape.select('#stateText').style("text-transform", "uppercase").style("font-weight", "800")
             layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
             layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
             layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
             layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
           });

   layerShape.append("text")
          .attr("class", "layerText")
          .attr("id", "countyText")
          .attr("x",110)
          .attr("y",diamondCount+3)
          .attr("fill", "#000")
          .attr('text-anchor','left')
          .text("County")
          .on("mouseover",  function(d) {
            layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

            layerShape.select('#countyText').style("text-transform", "uppercase").style("font-weight", "800")
          })
          .on("mouseout", function(d) {

            if (clicked !="county"){
            layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond
            .size(1500)).style('stroke-width', 3)

            layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
          }
          })
          .on("click", function(d){
            clicked="county";
            countyStart(countyDataLoad);
            layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
            layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
            layerShape.select('#countyText').style("text-transform", "uppercase").style("font-weight", "800")
            layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
            layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
            layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
            layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
          });

  layerShape.append("text")
         .attr("class", "layerText")
         .attr("id", "msaText")
         .attr("x",110)
         .attr("y",diamondMSA+3)
         .attr("fill", "#000")
         .attr('text-anchor','left')
         .text("Metro Area")
         .on("mouseover",  function(d) {
           layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

           layerShape.select('#msaText').style("text-transform", "uppercase").style("font-weight", "800")
         })
         .on("mouseout", function(d) {

           if (clicked !="msa"){
           layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond
           .size(1500)).style('stroke-width', 3)

           layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
         }
         })
         .on("click", function(d){
           clicked="msa";
           msaStart(msaDataLoad);
           layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
           layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.select('#msaText').style("text-transform", "uppercase").style("font-weight", "800")
           layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
           layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
           layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
           layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
         });

    layerShape.append("text")
         .attr("class", "layerText")
         .attr("id", "districtText")
         .attr("x",110)
         .attr("y",diamondDis+3)
         .attr("fill", "#000")
         .attr('text-anchor','left')
         .text("District")
         .on("mouseover",  function(d) {
           layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)

           layerShape.select('#districtText').style("text-transform", "uppercase").style("font-weight", "800")
         })
         .on("mouseout", function(d) {

           if (clicked !="district"){
           layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond
           .size(1500)).style('stroke-width', 3)

           layerShape.select('#districtText').style("text-transform", "none").style("font-weight", "400")
         }
         })
         .on("click", function(d){
           clicked="district";
           districtStart(districtDataLoad);
           layerShape.selectAll(".districtDiamond").transition().duration(100).attr("d", diamond.size(2000)).style('stroke-width', 3)
           layerShape.selectAll(".nationDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.selectAll(".countyDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.selectAll(".msaDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.selectAll(".stateDiamond").transition().duration(100).attr("d", diamond.size(1250)).style('stroke-width', 3)
           layerShape.select('#districtText').style("text-transform", "uppercase").style("font-weight", "800")
           layerShape.select('#nationText').style("text-transform", "none").style("font-weight", "400")
           layerShape.select('#msaText').style("text-transform", "none").style("font-weight", "400")
           layerShape.select('#countyText').style("text-transform", "none").style("font-weight", "400")
           layerShape.select('#stateText').style("text-transform", "none").style("font-weight", "400")
         });

         function nationStart()  {
                 Promise.all([stateData, countyData, districtData, msaData]).then(nationMap);

                 cssChange.innerHTML = "<style> .sidebar-content { background-color: #f7f7f7;} " +
                 ".sidebar-share {background: #407cca}" +
                 ".intro-text {color: #000;} " +
                 ".mti_tooltip_text_cont {background-color: #000;} " +
                 ".grid_stat_descr.stat1 {background-color: #4c4c4c;}" +
                 ".grid_stat.stat1 {background-color: #4c4c4c;} " +
                 ".mti_tooltip_hed {color: #fff;} " +
                 ".grid_stat_descr {color: #fff;} " +
                 ".grid_stat {color: #fff;} " +
                 ".see_more_button {color: #21d279;}" +
                 ".source-line {color: #fff;}" +
                 "#home {background-color: #f7f7f7;}"+
                 "#nationSource {color: #fff;}"+
                 "a.nationLink {color: #21d279 !important;}"+
                 "a.titleLink {color: #21d279 !important;}"+
                  ".mapboxgl-ctrl {visibility: hidden}"+
                   "</style>"};

         function stateStart() {
             stateMap(stateDataLoad);

             cssChange.innerHTML = "<style> .sidebar-content { background-color: #393745;} " +
             ".sidebar-share {background: #393745}" +
             ".intro-text {color: #fff;} " +
               ".mti_tooltip_text_cont {background-color: #393745;} " +
               ".grid_stat_descr.stat1 {background-color: #4b4956;}" +
               ".grid_stat.stat1 {background-color: #4b4956;} " +
               ".mti_tooltip_hed {color: #fff;} " +
               ".grid_stat_descr {color: #fff;} " +
               ".grid_stat {color: #fff;} " +
               ".see_more_button {color: #21d279;}" +
               ".source-line {color: #fff;}" +
               "#home {background-color: #393745;}"+
               "#nationSource {color: #fff;}"+
               "a.nationLink {color: #21d279 !important;}"+
               "a.titleLink {color: #21d279 !important;}"+
               ".mapboxgl-ctrl {visibility: visible}"+
               "</style>"};

         function districtStart() {
             districtMap(districtDataLoad);

             cssChange.innerHTML = "<style> .sidebar-content { background-color: #000;} " +
             ".sidebar-share {background: #000}" +
             ".intro-text {color: #fff;} " +
               ".mti_tooltip_text_cont {background-color: #000;} " +
               ".grid_stat_descr.stat1 {background-color: #4c4c4c;}" +
               ".grid_stat.stat1 {background-color: #4c4c4c;} " +
               ".mti_tooltip_hed {color: #fff;} " +
               ".grid_stat_descr {color: #fff;} " +
               ".grid_stat {color: #fff;} " +
               ".see_more_button {color: #fff;}" +
               ".source-line {color: #fff;}" +
               "#home {background-color: #000;}"+
               "#nationSource {color: #fff;}"+
               "a.nationLink {color: #fff !important;}"+
               "a.titleLink {color: #fff !important;}"+
               ".mapboxgl-ctrl {visibility: visible}"+
               "</style>"};

         function countyStart() {
             countyMap(countyDataLoad);
             cssChange.innerHTML = "<style> .sidebar-content { background-color: #ffdb20;} " +
             ".sidebar-share {background: #ffdb20}" +
             ".intro-text {color: #000;} " +
             ".share-text {color: #000}" +
             ".share-icon--twitter {background-image: url('https://www.newamericaneconomy.org/wp-content/themes/nae-wp-theme/static/img/share-icon--twitter-hover.svg');}" +
             ".share-icon--facebook {background-image: url('https://www.newamericaneconomy.org/wp-content/themes/nae-wp-theme/static/img/share-icon--facebook-hover.svg');}" +
             ".share-icon--email {background-image: url('https://www.newamericaneconomy.org/wp-content/themes/nae-wp-theme/static/img/share-icon--email-hover.svg');}" +
               ".mti_tooltip_text_cont {background-color: #ffdb20;} " +
               ".grid_stat_descr.stat1 {background-color: #ffe456;}" +
               ".grid_stat.stat1 {background-color: #ffe456;} " +
               ".mti_tooltip_hed {color: #000;} " +
               ".grid_stat_descr {color: #000;} " +
               ".grid_stat {color: #000;} " +
                "a {color: #000 !important;}" +
               ".see_more_button {color: #000; !important}" +
               "#home {background-color: #ffdb20;}"+
               "#nationSource {color: #000;}"+
               "a.nationLink {color: #000 !important;}"+
               "a.titleLink {color: #000 !important;}"+
               ".mapboxgl-ctrl {visibility: visible}"+
               "</style>"};

         function msaStart() {
             msaMap(msaDataLoad);
             cssChange.innerHTML = "<style> .sidebar-content { background-color: #f7594d;} " +
             ".intro-text {color: #fff;} " +
             ".sidebar-share {background: #f7594d}" +
               ".mti_tooltip_text_cont {background-color: #f7594d;} " +
               ".grid_stat_descr.stat1 {background-color: #fb7a70;}" +
               ".grid_stat.stat1 {background-color: #fb7a70;} " +
               ".mti_tooltip_hed {color: #fff;} " +
               ".grid_stat_descr {color: #fff;} " +
               ".grid_stat {color: #fff;} " +
               ".see_more_button {color: #fff !important;}" +
               ".source-line {color: #fff;}" +
               "#home {background-color: #f7594d;}"+
               "#nationSource {color: #fff;}"+
               "a.nationLink {color: #fff !important;}"+
               "a.titleLink {color: #fff !important;}"+
               ".methodology {color: #000 !important;}"+
               ".mapboxgl-ctrl {visibility: visible}"+
               "</style>"};




function initNation(data) {

  activeMap = "NationView"

stateDataLoad = data[0]
countyDataLoad = data[1]
districtDataLoad = data[2]
msaDataLoad = data[3]
centerDataLoad = data[4]




  map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
      style:'mapbox://styles/nae/cki7v0ak72ka118pdzkv5921z',
      zoom: 2.65*Math.log10(window.innerWidth/50),
      center: [9.5, 0],
      maxZoom: 9,
      attributionControl: true,
      maxBounds: bounds
  });

  if (window.innerWidth<550) {

    map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
        style:'mapbox://styles/nae/cki7v0ak72ka118pdzkv5921z',
        zoom: Math.log10(window.innerWidth/50),
        center: [9.5,0],
        maxZoom: 11,
        attributionControl: false,
        maxBounds: mobileBounds  // Northeast coordinates

    });

  }

  if (window.innerWidth >= 575) {
  map.addControl(navigation);
  }


  map.on('load', function () {

  map.addSource('nation', {
      'type': 'geojson',
      'data': nationGeoData,
      "generateId": true
  });

  // map.addSource('centers', {
  //     'type': 'geojson',
  //     'data': customData,
  //     "promoteId": 'id'
  // });


  map.addLayer({
      'id': 'nation-fill',
      'type': 'fill',
      'source': 'nation',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
          'fill-color': '#4b4956',
          'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0
          ]
      }
  });




  map.on('mousemove', 'nation-fill', function(e) {


      if (e.features.length > 0) {
          if (hoveredStateId) {
              map.setFeatureState(
                  { source: 'nation', id: hoveredStateId },
                  { hover: false }
              );
          }
          hoveredStateId =  e.features[0].id;


          map.setFeatureState(
              { source: 'nation', id: hoveredStateId },
              { hover: true }
          );
      }

  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'nation-fill', function(e) {

      map.getCanvas().style.cursor = 'pointer';



  });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
  map.on('mouseleave', 'nation-fill', function() {
      if (hoveredStateId==0) {
          map.setFeatureState(
              { source: 'nation', id: hoveredStateId },
              { hover: false }
          );
      }
      hoveredStateId = null;

      // Change back from pointer when outside map
      map.getCanvas().style.cursor = '';
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
//   map.on('click', 'nation-fills-click', function(e) {
//
//       if (!map.getLayer('nation-fills-click')) {
//
//           map.addLayer({
//               'id': 'nation-fills-click',
//               'type': 'fill',
//               'source': 'counties',
//               'layout': {
//                 'visibility': 'visible'
//               },
//               'paint': {
//                   'fill-color': '#6263F1',
//                   'fill-opacity': [
//                       'case',
//                       ['boolean', ['feature-state', 'click'], false],
//                       1,
//                       0
//                   ]
//               }
//           });
//       }
//
// });

sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
        "<h1 class='mti_tooltip_hed'><a class='nationLink' href='https://www.newamericaneconomy.org/locations/national/'>" + "United States" + " Data</a></h1>" +
        "<div class='w-layout-grid grid_data'>" +
        "<div class='grid_stat_descr stat1 first_stat'>Number of Immigrants:</div>" +
        "<div class='grid_stat stat1'>" + "44,788,044" + "<br>‍</div>" +
        "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
        "<div class='grid_stat'>" + "13.6%" + "</div>" +
        "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
        "<div class='grid_stat stat1'>" + "$492.4B" + "</div>" +
        "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
        "<div class='grid_stat'>" + "$1.3T" + "</div>" +
        "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
        "<div class='grid_stat stat1' class='vertalign'>" + "3,242,085" + "</div>" +
        "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
        "<div class='grid_stat'>" + "22,070,327" + "<br>‍</div></div>" +
        "<div class='source-line' id='nationSource'>Source: 1-year 2019 American Community Survey</div>"+
        "<a href='https://www.newamericaneconomy.org/locations/national/'>" +
        "<div class='see_more_button'>More " +
        "United States"+ " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";


});
}

function nationMap(data) {

  activeMap = "NationView"

  map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
      style:'mapbox://styles/nae/cki7v0ak72ka118pdzkv5921z',
      zoom: 2.65*Math.log10(window.innerWidth/50),
      center: [9.5, 0],
      maxZoom: 9,
      attributionControl: true,
      maxBounds: bounds
  });

  if (window.innerWidth<550) {

    map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
        style:'mapbox://styles/nae/cki7v0ak72ka118pdzkv5921z',
        zoom: Math.log10(window.innerWidth/50),
        center: [9.5,0],
        maxZoom: 11,
        attributionControl: false,
        maxBounds: mobileBounds  // Northeast coordinates

    });

  }

  if (window.innerWidth >= 575) {
  map.addControl(navigation);
  }


  map.on('load', function () {

  map.addSource('nation', {
      'type': 'geojson',
      'data': nationGeoData,
      "generateId": true
  });

  map.addLayer({
      'id': 'nation-fill-2',
      'type': 'fill',
      'source': 'nation',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
          'fill-color': '#4b4956',
          'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0
          ]
      }
  });




  map.on('mousemove', 'nation-fill-2', function(e) {

      if (e.features.length > 0) {
          if (hoveredStateId) {
              map.setFeatureState(
                  { source: 'nation', id: hoveredStateId },
                  { hover: false }
              );
          }
          hoveredStateId =  e.features[0].id;


          map.setFeatureState(
              { source: 'nation', id: hoveredStateId },
              { hover: true }
          );
      }

  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'nation-fill-2', function(e) {

      map.getCanvas().style.cursor = 'pointer';



  });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
  map.on('mouseleave', 'nation-fill-2', function() {
      if (hoveredStateId==0) {
          map.setFeatureState(
              { source: 'nation', id: hoveredStateId },
              { hover: false }
          );
      }
      hoveredStateId = null;

      // Change back from pointer when outside map
      map.getCanvas().style.cursor = '';
  });

sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
            "<h1 class='mti_tooltip_hed'><a class='nationLink' href='https://www.newamericaneconomy.org/locations/national/'>" + "United States" + " Data</a></h1>" +
            "<div class='w-layout-grid grid_data'>" +
            "<div class='grid_stat_descr stat1 first_stat'>Number of Immigrants:</div>" +
            "<div class='grid_stat stat1'>" + "44,788,044" + "<br>‍</div>" +
            "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
            "<div class='grid_stat'>" + "13.6%" + "</div>" +
            "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
            "<div class='grid_stat stat1'>" + "$492.4B" + "</div>" +
            "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
            "<div class='grid_stat'>" + "$1.3T" + "</div>" +
            "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
            "<div class='grid_stat stat1' class='vertalign'>" + "3,242,085" + "</div>" +
            "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
            "<div class='grid_stat'>" + "22,070,327" + "<br></div></div>" +
            "<div class='source-line'>Source: 1-year 2019 American Community Survey</div>"+
            "<a href='https://www.newamericaneconomy.org/locations/national/'>" +
            "<div class='see_more_button'>More " +
            "United States"+ " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";


});
}


function stateMap(data) {

  activeMap = "StateView";

  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/nae/cki8zf1kj3ngg18pd8rv5jenj',
      zoom: 2.65*Math.log10(window.innerWidth/50),
      center: [9.5, 0],
      maxZoom: 9,
      attributionControl: true,
      maxBounds: bounds
      // maxBounds: bounds
  });
  if (window.innerWidth >= 575) {
  map.addControl(navigation);
  }

  if (window.innerWidth<550) {

    map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
        style:'mapbox://styles/nae/cki8zf1kj3ngg18pd8rv5jenj',
        zoom: Math.log10(window.innerWidth/50),
        center: [9.5,0],
        maxZoom: 11,
        attributionControl: false,
        maxBounds: mobileBounds  // Northeast coordinates

    });

  }



    map.on('load', function () {

    map.addSource('state', {
        'type': 'geojson',
        'data': stateGeoData,
        "promoteId": 'STATE'
      });

    data.forEach((row) => {
        map.setFeatureState({
          "source": 'state',
          // 'sourceLayer': 'counties',
          "id": row.id  }, {
            StateName: row["statefip"],
            fbpop: row["fbpop"],
            voter: row["voter"],
            fbshare: row["fbshare"],
            fbage1664: row["fbage1664"],
            entrp: row["entrp"],
            tottax: row["tottax"],
            sppower: row["sppower"]
          }
        )
      })



       map.addLayer({
           'id': 'state-fills',
           'type': 'fill',
           'source': 'state',
           'layout': {
             'visibility': 'visible'
           },
           'paint': {
               'fill-color': '#4b4956',
               'fill-opacity': [
                   'case',
                   ['boolean', ['feature-state', 'hover'], false],
                   1,
                   0
               ]
           }
       });


            map.addLayer({
                'id': 'state-fills-click',
                'type': 'fill',
                'source': 'state',
                'layout': {},
                'paint': {
                    'fill-color': '#000000',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'click'], false],
                        1,
                        0
                    ]
                }
            });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
            map.on('mousemove', 'state-fills', function(e) {

                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                            { source: 'state', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].properties.STATE;

                    map.setFeatureState(
                        { source: 'state', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'state-fills', function() {
                map.getCanvas().style.cursor = 'pointer';

            });

                // When the mouse leaves the state-fill layer, update the feature state of the
                // previously hovered feature.
            map.on('mouseleave', 'state-fills', function() {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: 'state', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;

                // Change back from pointer when outside map
                map.getCanvas().style.cursor = '';
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
            map.on('click', 'state-fills-click', function(e) {

                if (e.features.length > 0) {
                    if (clickedStateId) {
                        map.setFeatureState(
                            { source: 'state', id: clickedStateId },
                            { click: false }
                        );
                    }
                    clickedStateId = e.features[0].properties.STATE;
                    map.setFeatureState(
                        { source: 'state', id: clickedStateId},
                        { click: true }
                    );
                }

                var bbox = turf.extent(e.features[0]);

                bbox[0] = bbox[0]-1;
                bbox[2] = bbox[2]+2.7;

                map.fitBounds(bbox, {
                    padding: 200
                });

                if (window.innerWidth<550) {

                  bbox[0] = bbox[0];
                  bbox[2] = bbox[2];

                  map.fitBounds(bbox, {
                      padding: 50
                  });

                }
            });



map.on('MapTouchEvent', 'state-fills-click', function(e) {

    if (e.features.length > 0) {
        if (clickedStateId) {
            map.setFeatureState(
                { source: 'state', id: clickedStateId },
                { click: false }
            );
        }
        clickedStateId = e.features[0].properties.STATE;
        map.setFeatureState(
            { source: 'state', id: clickedStateId},
            { click: true }
        );
    }

    var bbox = turf.extent(e.features[0]);


    bbox[0] = bbox[0]-1;
    bbox[2] = bbox[2]+2.7;

    map.fitBounds(bbox, {
        padding: 200
    });



});
            var longLat = null;

            map.on('click', 'state-fills', function(e) {
                state_feat = e.features[0].state;

                // state_prop = state_feat.properties;
                sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                        "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/locations/" + state_feat.StateName.toLowerCase().replace(/\s+/g, '-') + "/'>" + state_feat.StateName + "</a></h1>" +
                        "<div class='w-layout-grid grid_data'>" +
                        "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
                        "<div class='grid_stat stat1'>" + numberWithCommas(state_feat.fbpop) + "<br>‍</div>" +
                        "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
                        "<div class='grid_stat'>" + state_feat.fbshare + "</div>" +
                        "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
                        "<div class='grid_stat stat1'>" + dollars(state_feat.tottax) + "</div>" +
                        "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
                        "<div class='grid_stat'>" + dollars(state_feat.sppower) + "</div>" +
                        "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
                        "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(state_feat.entrp) + "</div>" +
                        "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
                        "<div class='grid_stat'>" + numberWithCommas(state_feat.voter) + "<br>‍</div></div>" +
                        "<div class='source-line'>Source: 1-year 2019 American Community Survey</div>"+
                        "<a href='https://www.newamericaneconomy.org/locations/" + state_feat.StateName.toLowerCase().replace(/\s+/g, '-') + "/'>" +
                        "<div class='see_more_button'>More " +
                        state_feat.StateName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";

            });

            //
            // map.on('MapTouchEvent', 'state-fills', function(e) {
            //     state_feat = e.features[0].state;
            //     // state_prop = state_feat.properties;
            //     sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
            //             "<h1 class='mti_tooltip_hed'>" + state_feat.StateName + "</h1>" +
            //             "<div class='w-layout-grid grid_data'>" +
            //             "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
            //             "<div class='grid_stat stat1'>" + numberWithCommas(state_feat.fbpop) + "<br>‍</div>" +
            //             "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
            //             "<div class='grid_stat'>" + state_feat.fbshare + "</div>" +
            //             "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid($Billion):</div>" +
            //             "<div class='grid_stat stat1'>" + state_feat.tottax + "</div>" +
            //             "<div class='grid_stat_descr'>Immigrant Spending Power($Billion):</div>" +
            //             "<div class='grid_stat'>" + state_feat.sppower + "</div>" +
            //             "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
            //             "<div class='grid_stat stat1'>" + numberWithCommas(state_feat.entrp) + "</div>" +
            //             "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
            //             "<div class='grid_stat'>" + numberWithCommas(state_feat.voter) + "<br>‍</div></div>" +
            //             "<a href='https://www.newamericaneconomy.org/locations/" + state_feat.StateName.toLowerCase().replace(/\s+/g, '-') + "/'>" +
            //             "<div class='see_more_button'>More " +
            //             state_feat.StateName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";
            //
            // });

})

        };





function countyMap(data) {

    activeMap = "CountyView"


  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
      zoom: 2.65*Math.log10(window.innerWidth/50),
      center: [9.5, 0],
      maxZoom: 9,
      attributionControl: true,
      maxBounds: bounds
      // maxBounds: bounds
  });
  if (window.innerWidth >= 575) {
  map.addControl(navigation);
  }

  if (window.innerWidth<550) {

    map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
        style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
        zoom: Math.log10(window.innerWidth/50),
        center: [9.5,0],
        maxZoom: 11,
        attributionControl: false,
        maxBounds: mobileBounds  // Northeast coordinates

    });

  }

  // d3.csv('https://raw.githubusercontent.com/newamericaneconomy/MTI_Two/master/src/assets/mapImpactData.csv?token=AE5MI5O45ATJAZOPNYYIOYK73TIOO').then((data)=>
  //
  //     {
  //       initFeatureState(data)
  //     })


  map.on('load', function () {

    //Add Sources
  map.addSource('counties', {
        'type': 'geojson',
        'data': countyGeoData,
        "promoteId": 'GEO_ID'
    });





    data.forEach((row) => {
        map.setFeatureState({
          "source": 'counties',
          // 'sourceLayer': 'counties',
          "id": row.countyID
        }, {
          immigrantPop: row["Number of Immigrants"],
          countyName: row["county_name_census"],
          stateName: row.county_name_census.split(", ")[1],
          fbShare: row["Immigrant Share of Population"],
          immTaxes: row["Immigrant Taxes Paid (in M$)"],
          immSpend: row["Immigrant Spending Power (in M$)"],
          immEntre: row["Number of Immigrant Entrepreneurs"],
          immVote: row["Number of Eligible Immigrant Voters"],
          source: row["Source"],
          noData: row["no_data"]
        })
      })

      countyList = data



    map.addLayer({
        'id': 'county-fills',
        'type': 'fill',
        'source': 'counties',
        'layout': {
          'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#ffe456',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
            ]
        }
    });

    map.addLayer({
        'id': 'county-fills-click',
        'type': 'fill',
        'source': 'counties',
        'layout': {},
        'paint': {
            'fill-color': '#000000',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'click'], false],
                1,
                0
            ]
        }
    });


    //Adding source for the geocoder search to select the single county searched
    map.addSource('single-county', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
    });

    //Allows the single county that has been searched to turn black
    map.addLayer({
        'id': 'county-search-fill',
        'type': 'fill',
        'source': 'single-county',
        'paint': {
            'fill-color': '#000'
        }
    });

    // map.addSource('mapbox-streets-v8', {
    //     type: 'vector',
    //     url: 'mapbox://mapbox.mapbox-streets-v8'
    // });

// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
    map.on('mousemove', 'county-fills', function(e) {


        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState(
                    { source: 'counties', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId =  e.features[0].properties.GEO_ID;

            map.setFeatureState(
                { source: 'counties', id: hoveredStateId },
                { hover: true }
            );
        }

    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'county-fills', function() {
        map.getCanvas().style.cursor = 'pointer';


    });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
    map.on('mouseleave', 'county-fills', function() {
        if (hoveredStateId) {
            map.setFeatureState(
                { source: 'counties', id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = null;

        // Change back from pointer when outside map
        map.getCanvas().style.cursor = '';
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
    map.on('click', 'county-fills-click', function(e) {
    //     //If you have searched for a county and it is highlighted, this will remove the
    //     //highlight and highlight the clicked one instead
        if (map.getLayer('county-search-fill')) map.removeLayer('county-search-fill');
    //
        if (!map.getLayer('county-fills-click')) {

            map.addLayer({
                'id': 'county-fills-click',
                'type': 'fill',
                'source': 'counties',
                'layout': {},
                'paint': {
                    'fill-color': '#000000',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'click'], false],
                        1,
                        0
                    ]
                }
            });
        }


        if (e.features.length > 0) {
            if (clickedCountyId) {
                map.setFeatureState(
                    { source: 'counties', id: clickedCountyId },
                    { click: false }
                );
            }
            clickedCountyId = e.features[0].properties.GEO_ID;
            map.setFeatureState(
                { source: 'counties', id: clickedCountyId},
                { click: true }
            );
        };

        var bbox = turf.extent(e.features[0]);

        bbox[0] = bbox[0]-1;
        bbox[2] = bbox[2]+2.7;

        map.fitBounds(bbox, {
            padding: 200
        });

        if (window.innerWidth<550) {

          bbox[0] = bbox[0];
          bbox[2] = bbox[2];

          map.fitBounds(bbox, {
              padding: 50
          });

        }


        return clickedCountyId;
    });

    countyData = map




    var longLat = null;

    map.on('click', 'county-fills', function(e) {
        county_feat = e.features[0].state;


        // county_prop = state;
        // if (county_prop["Flag: No Data"] == "0") {
        if (county_feat.noData != 1.0) {
            sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                    // "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
                    "<h1 class='mti_tooltip_hed'>" + county_feat.countyName + "</h1>" +
                    "<div class='w-layout-grid grid_data'>" +
                    "<div class='grid_stat_descr stat1'>Number of Immigrants</div>" +
                    "<div class='grid_stat stat1'>" + numberWithCommas(county_feat.immigrantPop) + "<br>‍</div>" +
                    "<div class='grid_stat_descr'>Immigrant Share of Population</div>" +
                    "<div class='grid_stat'>" + county_feat.fbShare +  "</div>" +
                    "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid</div>" +
                    "<div class='grid_stat stat1'>"  + dollars(county_feat.immTaxes) + "</div>" +
                    "<div class='grid_stat_descr'>Immigrant Spending Power</div>" +
                    "<div class='grid_stat'>"+ dollars(county_feat.immSpend) +  "</div>" +
                    "<div class='grid_stat_descr stat1' >Number of Immigrant Entrepreneurs</div>" +
                    "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(county_feat.immEntre) +  "</div>" +
                    "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters</div>" +
                    "<div class='grid_stat'>" + numberWithCommas(county_feat.immVote) + "</div></div>" +
                    "<div class='source-line'>" + "Source: " + county_feat.source + "</div>" +
                    "<br>‍</div>";
        } else {

          sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                  "<h1 class='mti_tooltip_hed'>" + county_feat.countyName + "</h1>" +
                  "<div class='no-data'>" + "The data is not available due to a small sample size for the immigrant population in this county. For more information, see link below." + "</div>" +
                  "<div class='see_more_button'>"+
                  "<a href='https://www.newamericaneconomy.org/locations/" + county_feat.stateName.toLowerCase().replace(/\s+/g, '-') + "/'>" +"More " +
                  county_feat.stateName + " Data"+"<i class='fa fa-long-arrow-right fa-adjust'></i></a></div></div>"
        }

    });

});

map.on('load', function(){

  map.addSource('cityCenters', {
              "type": 'geojson',
              "data": cityPoints,
              "generateId": true
            });


  map.addLayer({
              'id': 'cityCircle',
              'type': 'circle',
              'source': 'cityCenters',
              'paint': {
                // make circles larger as the user zooms from z12 to z22
                'circle-radius': {
                  stops: [
                    [0, 3],
                    [15, 12]
                  ]
                },
                // color circles by ethnicity, using a match expression
                // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                'circle-color': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    "#05CE7C",
                    "#fff"
                ]
              }
            });

            map.on('mousemove', 'cityCircle', function(e) {
              msa_feat = e.features[0].state;


                if (e.features.length > 0 ) {
                    if (hoveredCenterId) {
                        map.setFeatureState(
                            { source: 'cityCenters', id: hoveredCenterId },
                            { hover: false }
                        );
                        map.setFeatureState(
                            { source: 'cityCenters', id: hoveredCenterId },
                            { hoverName: false }
                        );
                    }


                    hoveredCenterId = e.features[0].id;


                    if (hoveredCenterId) {



                    map.setFeatureState(
                        { source: 'cityCenters', id: hoveredCenterId },
                        { hover: true }
                    );
                    map.setFeatureState(
                        { source: 'cityCenters', id: hoveredCenterId },
                        { hoverName: true }
                    );

                  }
                }
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'cityCircle', function(e) {
              msa_feat = e.features[0].state;

              if (hoveredCenterId) {
                map.getCanvas().style.cursor = 'pointer';
              }

            });

                // When the mouse leaves the state-fill layer, update the feature state of the
                // previously hovered feature.
            map.on('mouseleave', 'cityCircle', function() {

                if (hoveredCenterId) {
                    map.setFeatureState(
                        { source: 'cityCenters', id: hoveredCenterId },
                        { hover: false }
                    );
                    map.setFeatureState(
                        { source: 'cityCenters', id: hoveredCenterId },
                        { hoverName: false }
                    );
                }
                hoveredCenterId = null;

                // Change back from pointer when outside map

                // map.getCanvas().style.cursor = '';

            });

    map.addLayer({
        "id": "circle-outline",
        "type": "circle",
        "source": {
            "type": "geojson",
            "data": cityPoints
        },
        "paint": {
                "circle-radius": {
                  stops: [
                    [0, 3],
                    [15, 12]
                  ]
                },
                "circle-opacity": 0,
                "circle-stroke-width": .5,
                "circle-stroke-color":  '#393745',
                "circle-stroke-opacity": .75,
},
    });


    map.addLayer({
                    "id": "cityName",
                    "type": "symbol",
                    "source": 'cityCenters',
                    // "minzoom": 5, // Set zoom level to whatever suits your needs
                    "layout": {
                      "text-field": "{Name}",
                      "text-anchor": "bottom",
                      "text-offset": [0,-.5],
                      "text-font": ['Founders Grotesk Text Medium','Founders Grotesk Text Regular','Fira Sans Regular'],
                      "text-size": 20,
                      "text-ignore-placement": true,
                      "text-allow-overlap": true
                    },
                    "paint": {
                        "text-color": "#ffffff",
                        "text-halo-color": "#000",
                        "text-halo-width": .5,
                        'text-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hoverName'], false],
                            1,
                            0
                        ]
                      }
                  });


})

}




function districtMap(data) {

  activeMap = "DistrictView"


          map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/nae/ckienwrzj3cfz1ep7gnc9fzt3',
              zoom: 2.65*Math.log10(window.innerWidth/50),
              center: [9.5, 0],
              maxZoom: 9,
              attributionControl: true,
              maxBounds: bounds
              // maxBounds: bounds
            });

            if (window.innerWidth >= 575) {
            map.addControl(navigation);
            }

            if (window.innerWidth<550) {

              map = new mapboxgl.Map({
                  container: 'map',
                  // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
                  style: 'mapbox://styles/nae/ckienwrzj3cfz1ep7gnc9fzt3',
                  zoom: Math.log10(window.innerWidth/50),
                  center: [9.5,0],
                  maxZoom: 11,
                  attributionControl: false,
                  maxBounds: mobileBounds  // Northeast coordinates

              });

            }




    map.on('load', function () {



    map.addSource('district', {
        'type': 'geojson',
        'data': cdGeoData,
        "promoteId": "GEOID"
      });

    data.forEach((row) => {
        map.setFeatureState({
          "source": 'district',
          // 'sourceLayer': 'counties',
          "id": row.GEOID},{
            immigrantPop: row["Immigrant Residents"],
            immigrantShare: row["Immigrant Share of Population"],
            districtName: row.DistrictName,
            immCDTaxes: row["Immigrant Taxes Paid"],
            immCDSpend: row["Immigrant Spending Power"],
            immCDEntr: row["Immigrant Entrepreneurs"],
            immCDVote: row["Eligible Immigrant Voters"],
            immCDWork: row["Foreign-Born, 25-64"]
        })
      })

            districtList = data


       map.addLayer({
           'id': 'district-fills',
           'type': 'fill',
           'source': 'district',
           'layout': {
             'visibility': 'visible'
           },
           'paint': {
               'fill-color': '#393745',
               'fill-opacity': [
                   'case',
                   ['boolean', ['feature-state', 'hover'], false],
                   1,
                   0
               ],
            'fill-outline-color': "#ffffff"
           }
       });


            map.addLayer({
                'id': 'district-fills-click',
                'type': 'fill',
                'source': 'district',
                'layout': {},
                'paint': {
                    'fill-color': '#05ce7c',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'click'], false],
                        1,
                        0
                    ],
                 'fill-outline-color': "#ffffff"
                }
            });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
            map.on('mousemove', 'district-fills', function(e) {

                if (e.features.length > 0) {
                    if (hoveredStateId) {
                        map.setFeatureState(
                            { source: 'district', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].properties.GEOID;

                    map.setFeatureState(
                        { source: 'district', id: hoveredStateId },
                        { hover: true }
                    );
                }
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'district-fills', function() {
                map.getCanvas().style.cursor = 'pointer';
            });

                // When the mouse leaves the state-fill layer, update the feature state of the
                // previously hovered feature.
            map.on('mouseleave', 'district-fills', function() {
                if (hoveredStateId) {
                    map.setFeatureState(
                        { source: 'district', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;

                // Change back from pointer when outside map
                map.getCanvas().style.cursor = '';
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
            map.on('click', 'district-fills-click', function(e) {
                if (e.features.length > 0) {
                    if (clickedStateId) {
                        map.setFeatureState(
                            { source: 'district', id: clickedStateId },
                            { click: false }
                        );
                    }
                    clickedStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: 'district', id: clickedStateId},
                        { click: true }
                    );
                }

                var bbox = turf.extent(e.features[0]);

                bbox[0] = bbox[0]-1;
                bbox[2] = bbox[2]+2.7;


                map.fitBounds(bbox, {
                    padding: 100
                });


                if (window.innerWidth<550) {

                  bbox[0] = bbox[0];
                  bbox[2] = bbox[2];

                  map.fitBounds(bbox, {
                      padding: 50
                  });

                }





            });

            var longLat = null;

            map.on('click', 'district-fills', function(e) {
                district_feat = e.features[0].state;
                // state_prop = state_feat.properties;


                sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                        "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/locations/" + district_feat.districtName.toLowerCase().replace(/\s+/g, '-') +"/'>" + district_feat.districtName + "</a></h1>" +
                        "<div class='w-layout-grid grid_data'>" +
                        "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
                        "<div class='grid_stat stat1'>" + numberWithCommas(district_feat.immigrantPop) + "<br>‍</div>" +
                        "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
                        "<div class='grid_stat'>" + district_feat.immigrantShare + "</div>" +
                        "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
                        "<div class='grid_stat stat1'>" + dollarsCD(district_feat.immCDTaxes) + "</div>" +
                        "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
                        "<div class='grid_stat'>" + dollarsCD(district_feat.immCDSpend) + "</div>" +
                        "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
                        "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(district_feat.immCDEntr) + "</div>" +
                        "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
                        "<div class='grid_stat'>" + numberWithCommas(district_feat.immCDVote) + "</div>" +
                        "</div>"+
                        "<div class='source-line'>Source: 5-year 2017 American Community Survey</div>"+

                        // "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
                        // "<div class='grid_stat stat1'>" + district_feat.immCDWork.replace("*","") + "<br>‍</div></div>" +
                        "<a href='https://www.newamericaneconomy.org/locations/" + district_feat.districtName.toLowerCase().replace(/\s+/g, '-') + "/'>" +
                        "<div class='see_more_button'>More " +
                        district_feat.districtName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";

            });
          });

          map.on('load', function(){

            map.addSource('cityCenters', {
                        "type": 'geojson',
                        "data": cityPoints,
                        "generateId": true
                      });


            map.addLayer({
                        'id': 'cityCircle',
                        'type': 'circle',
                        'source': 'cityCenters',
                        'paint': {
                          // make circles larger as the user zooms from z12 to z22
                          'circle-radius': {
                            stops: [
                              [0, 3],
                              [15, 12]
                            ]
                          },
                          // color circles by ethnicity, using a match expression
                          // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                          'circle-color': [
                              'case',
                              ['boolean', ['feature-state', 'hover'], false],
                              "#6263f1",
                              "#fff"
                          ]
                        }
                      });

                      map.on('mousemove', 'cityCircle', function(e) {
                        msa_feat = e.features[0].state;


                          if (e.features.length > 0 ) {
                              if (hoveredCenterId) {
                                  map.setFeatureState(
                                      { source: 'cityCenters', id: hoveredCenterId },
                                      { hover: false }
                                  );
                                  map.setFeatureState(
                                      { source: 'cityCenters', id: hoveredCenterId },
                                      { hoverName: false }
                                  );
                              }


                              hoveredCenterId = e.features[0].id;


                              if (hoveredCenterId) {



                              map.setFeatureState(
                                  { source: 'cityCenters', id: hoveredCenterId },
                                  { hover: true }
                              );
                              map.setFeatureState(
                                  { source: 'cityCenters', id: hoveredCenterId },
                                  { hoverName: true }
                              );

                            }
                          }
                      });

                      // Change the cursor to a pointer when the mouse is over the places layer.
                      map.on('mouseenter', 'cityCircle', function(e) {
                        msa_feat = e.features[0].state;

                        if (hoveredCenterId) {
                          map.getCanvas().style.cursor = 'pointer';
                        }

                      });

                          // When the mouse leaves the state-fill layer, update the feature state of the
                          // previously hovered feature.
                      map.on('mouseleave', 'cityCircle', function() {

                          if (hoveredCenterId) {
                              map.setFeatureState(
                                  { source: 'cityCenters', id: hoveredCenterId },
                                  { hover: false }
                              );
                              map.setFeatureState(
                                  { source: 'cityCenters', id: hoveredCenterId },
                                  { hoverName: false }
                              );
                          }
                          hoveredCenterId = null;

                          // Change back from pointer when outside map

                          // map.getCanvas().style.cursor = '';

                      });

              map.addLayer({
                  "id": "circle-outline",
                  "type": "circle",
                  "source": {
                      "type": "geojson",
                      "data": cityPoints
                  },
                  "paint": {
                          "circle-radius": {
                            stops: [
                              [0, 3],
                              [15, 12]
                            ]
                          },
                          "circle-opacity": 0,
                          "circle-stroke-width": .5,
                          "circle-stroke-color":  '#393745',
                          "circle-stroke-opacity": .75,
          },
              });


              map.addLayer({
                              "id": "cityName",
                              "type": "symbol",
                              "source": 'cityCenters',
                              // "minzoom": 5, // Set zoom level to whatever suits your needs
                              "layout": {
                                "text-field": "{Name}",
                                "text-anchor": "bottom",
                                "text-offset": [0,-.5],
                                "text-font": ['Founders Grotesk Text Medium','Founders Grotesk Text Regular','Fira Sans Regular'],
                                "text-size": 20,
                                "text-ignore-placement": true,
                                "text-allow-overlap": true
                              },
                              "paint": {
                                  "text-color": "#ffffff",
                                  "text-halo-color": "#000",
                                  "text-halo-width": .5,
                                  'text-opacity': [
                                      'case',
                                      ['boolean', ['feature-state', 'hoverName'], false],
                                      1,
                                      0
                                  ]
                                }
                            });


          })

        };


function msaMap(data) {

      activeMap = "MSAView"


            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/nae/ckiarhns001ci1aqwcxjpy708',
                zoom: 2.65*Math.log10(window.innerWidth/50),
                center: [9.5, 0],
                maxZoom: 9,
                attributionControl: true,
                maxBounds: bounds
                // maxBounds: bounds
              });

              if (window.innerWidth >= 575) {
              map.addControl(navigation);
              }

              if (window.innerWidth<550) {

                map = new mapboxgl.Map({
                    container: 'map',
                    // style: 'mapbox://styles/nae/ckhp1k5yb2dpy1an6txgji3oh',
                    style: 'mapbox://styles/nae/ckiarhns001ci1aqwcxjpy708',
                    zoom: Math.log10(window.innerWidth/50),
                    center: [9.5,0],
                    maxZoom: 11,
                    attributionControl: false,
                    maxBounds: mobileBounds  // Northeast coordinates

                });

              }



      map.on('load', function () {

            map.addSource('msa', {
                'type': 'geojson',
                'data': msaGeoData,
                "promoteId": "CBSAFP"
              });

      data.forEach((row) => {
                map.setFeatureState({
                  "source": 'msa',
                  // 'sourceLayer': 'counties',
                  "id": row.CBSAFP},{
                    immigrantMSAPop: row["Immigrant Residents"]	,
                    immigrantMSAShare: row["Immigrant Share of Population"],
                    msaName: row['Account Name'],
                    immiMSATaxes: row['tottaxMSA'],
                    immiMSASpend: row['sppowerMSA'],
                    immiMSAVote: row['Immigrants eligible to vote'],
                    immiMSAWork: row['Foreign-Born, Ages 16-64'],
                    immiMSAEntre: row['Immigrant Entrepreneurs'],
                    immiSource: row['Source']
                })
              })




               map.addLayer({
                   'id': 'msa-fills',
                   'type': 'fill',
                   'source': 'msa',
                   'layout': {
                     'visibility': 'visible'
                   },
                   'paint': {
                       'fill-color': '#fb7a70',
                       'fill-opacity': [
                           'case',
                           ['boolean', ['feature-state', 'hover'], false],
                           1,
                           0
                       ]
                   }
               });


                    map.addLayer({
                        'id': 'msa-fills-click',
                        'type': 'fill',
                        'source': 'msa',
                        'layout': {},
                        'paint': {
                            'fill-color': '#000000',
                            'fill-opacity': [
                                'case',
                                ['boolean', ['feature-state', 'click'], false],
                                1,
                                0
                            ]
                        }
                    });

                // When the user moves their mouse over the state-fill layer, we'll update the
                // feature state for the feature under the mouse.
                    map.on('mousemove', 'msa-fills', function(e) {
                      msa_feat = e.features[0].state;


                        if (e.features.length > 0 ) {
                            if (hoveredStateId) {
                                map.setFeatureState(
                                    { source: 'msa', id: hoveredStateId },
                                    { hover: false }
                                );
                            }


                            hoveredStateId = e.features[0].properties.CBSAFP;


                            if (msa_feat.immigrantMSAPop!=undefined) {

                            map.setFeatureState(
                                { source: 'msa', id: hoveredStateId },
                                { hover: true }
                            );
                          }
                        }
                    });

                    // Change the cursor to a pointer when the mouse is over the places layer.
                    map.on('mouseenter', 'msa-fills', function(e) {
                      msa_feat = e.features[0].state;

                      if (msa_feat.immigrantMSAPop!=undefined) {
                        map.getCanvas().style.cursor = 'pointer';
                      }
                    });

                        // When the mouse leaves the state-fill layer, update the feature state of the
                        // previously hovered feature.
                    map.on('mouseleave', 'msa-fills', function() {

                        if (hoveredStateId) {
                            map.setFeatureState(
                                { source: 'msa', id: hoveredStateId },
                                { hover: false }
                            );
                        }
                        hoveredStateId = null;

                        // Change back from pointer when outside map

                        map.getCanvas().style.cursor = '';

                    });

                    // When a click event occurs on a feature in the places layer, open a popup at the
                // location of the feature, with description HTML from its properties.
                    map.on('click', 'msa-fills-click', function(e) {
                      msa_feat = e.features[0].state;

                        if (e.features.length > 0) {
                            if (clickedStateId) {
                                map.setFeatureState(
                                    { source: 'msa', id: clickedStateId },
                                    { click: false }
                                );
                            }
                            clickedStateId = e.features[0].id;
                            if (msa_feat.immigrantMSAPop!=undefined) {
                            map.setFeatureState(
                                { source: 'msa', id: clickedStateId},
                                { click: true }
                            );
                          }
                        }

                        var bbox = turf.extent(e.features[0]);

                        bbox[0] = bbox[0]-1;
                        bbox[2] = bbox[2]+2.7;


                        map.fitBounds(bbox, {
                            padding: 200
                        });

                        if (window.innerWidth<550) {

                          bbox[0] = bbox[0];
                          bbox[2] = bbox[2];

                          map.fitBounds(bbox, {
                              padding: 50
                          });

                        }
                    });

                    var longLat = null;

                    map.on('click', 'msa-fills', function(e) {

                        msa_feat = e.features[0].state;

                        if (msa_feat.immigrantMSAPop!=undefined) {

                        sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                                "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/city/"+ msa_feat.msaName.toLowerCase().replace(/\s+/g, '-').replace("-metro-area","") + "/'>" + msa_feat.msaName + "</a></h1>" +
                                "<div class='w-layout-grid grid_data'>" +
                                "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
                                "<div class='grid_stat stat1'>" + numberWithCommas(msa_feat.immigrantMSAPop) + "<br>‍</div>" +
                                "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
                                "<div class='grid_stat'>" + msa_feat.immigrantMSAShare + "</div>" +
                                "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
                                "<div class='grid_stat stat1'>" + dollars(msa_feat.immiMSATaxes) + "</div>" +
                                "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
                                "<div class='grid_stat'>" + dollars(msa_feat.immiMSASpend) + "</div>" +
                                "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
                                "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(msa_feat.immiMSAEntre) + "</div>" +
                                "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
                                "<div class='grid_stat'>" + numberWithCommas(msa_feat.immiMSAVote) + "<br>‍</div></div>" +
                                "<div class='source-line' class='stateSource'>Source: "+ msa_feat.immiSource + "</div>"+
                                "<a href='https://www.newamericaneconomy.org/city/" + msa_feat.msaName.toLowerCase().replace(/\s+/g, '-').replace("-metro-area","") + "/'>" +
                                "<div class='see_more_button'>More " +
                                msa_feat.msaName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";


                              }

                    });



        });

        map.on('load', function(){

          map.addSource('cityCenters', {
                      "type": 'geojson',
                      "data": cityPoints,
                      "generateId": true
                    });


          map.addLayer({
                      'id': 'cityCircle',
                      'type': 'circle',
                      'source': 'cityCenters',
                      'paint': {
                        // make circles larger as the user zooms from z12 to z22
                        'circle-radius': {
                          stops: [
                            [0, 3],
                            [15, 12]
                          ]
                        },
                        // color circles by ethnicity, using a match expression
                        // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                        'circle-color': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            "#6263f1",
                            "#fff"
                        ]
                      }
                    });

                    map.on('mousemove', 'cityCircle', function(e) {
                      msa_feat = e.features[0].state;


                        if (e.features.length > 0 ) {
                            if (hoveredCenterId) {
                                map.setFeatureState(
                                    { source: 'cityCenters', id: hoveredCenterId },
                                    { hover: false }
                                );
                                map.setFeatureState(
                                    { source: 'cityCenters', id: hoveredCenterId },
                                    { hoverName: false }
                                );
                            }


                            hoveredCenterId = e.features[0].id;


                            if (hoveredCenterId) {



                            map.setFeatureState(
                                { source: 'cityCenters', id: hoveredCenterId },
                                { hover: true }
                            );
                            map.setFeatureState(
                                { source: 'cityCenters', id: hoveredCenterId },
                                { hoverName: true }
                            );

                          }
                        }
                    });

                    // Change the cursor to a pointer when the mouse is over the places layer.
                    map.on('mouseenter', 'cityCircle', function(e) {
                      msa_feat = e.features[0].state;

                      if (hoveredCenterId) {
                        map.getCanvas().style.cursor = 'pointer';
                      }

                    });

                        // When the mouse leaves the state-fill layer, update the feature state of the
                        // previously hovered feature.
                    map.on('mouseleave', 'cityCircle', function() {

                        if (hoveredCenterId) {
                            map.setFeatureState(
                                { source: 'cityCenters', id: hoveredCenterId },
                                { hover: false }
                            );
                            map.setFeatureState(
                                { source: 'cityCenters', id: hoveredCenterId },
                                { hoverName: false }
                            );
                        }
                        hoveredCenterId = null;

                        // Change back from pointer when outside map

                    });

            map.addLayer({
                "id": "circle-outline",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": cityPoints
                },
                "paint": {
                        "circle-radius": {
                          stops: [
                            [0, 3],
                            [15, 12]
                          ]
                        },
                        "circle-opacity": 0,
                        "circle-stroke-width": .5,
                        "circle-stroke-color": "#000000",
                        "circle-stroke-opacity": .75,
        },
            });


            map.addLayer({
                            "id": "cityName",
                            "type": "symbol",
                            "source": 'cityCenters',
                            // "minzoom": 5, // Set zoom level to whatever suits your needs
                            "layout": {
                              "text-field": "{Name}",
                              "text-anchor": "bottom",
                              "text-offset": [0,-.5],
                              "text-font": ['Founders Grotesk Text Medium','Founders Grotesk Text Regular','Fira Sans Regular'],
                              "text-size": 20,
                              "text-ignore-placement": true,
                              "text-allow-overlap": true
                            },
                            "paint": {
                                "text-color": "#ffffff",
                                "text-halo-color": "#000",
                                "text-halo-width": .5,
                                'text-opacity': [
                                    'case',
                                    ['boolean', ['feature-state', 'hoverName'], false],
                                    1,
                                    0
                                ]
                              }
                          });


        })


    };




var layerList = document.getElementById('map-switch-menu');
var inputs = layerList.getElementsByTagName('input');


var featuresTEST
var displayFeatures
var testCoor


// var clickedMsaId = null;
var clickedCountyId = null;
// var clickedDistrictId = null;
var clickedStateId = null;
// var clickedUsId = null;
var hoveredStateId = null;
var hoveredCenterId = null;

var bbox_search;
var searchedCountyId = null;


function forwardGeocoder(query) {

  var matchingFeatures = [];


  if (activeMap == "CountyView") {

  for (var i = 0; i < countyList.length; i++) {
      featureRegion = countyList[i];
      if (
          featureRegion.county_name_census.toLowerCase()
              .search(query.toLowerCase()) !== -1
      ) {
          featureRegion['place_name'] = featureRegion.county_name_census;
          featureRegion['center'] = [featureRegion.Longitude,featureRegion.Latitude];
          featureRegion['place_type'] = ['county'];
          // featureCounty['id'] =

          matchingFeatures.push(featureRegion);

      };

  }

  return matchingFeatures;
}

if (activeMap == "DistrictView") {

for (var i = 0; i < districtList.length; i++) {
    featureRegion = districtList[i];
    if (
        featureRegion.DistrictName.toLowerCase()
            .search(query.toLowerCase()) !== -1
    ) {
        featureRegion['place_name'] = featureRegion.DistrictName;
        featureRegion['center'] = [featureRegion.INTPTLON,featureRegion.INTPTLAT];
        featureRegion['place_type'] = ['congressional district'];

        matchingFeatures.push(featureRegion);



    };

}

return matchingFeatures;
}



}




var searchText = 'Enter an address, city, county, state, or place...'

if (screen.width<550) {
  searchText = 'Enter a city, county, state, or place...'
}

var geocoder = new MapboxGeocoder({ // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    localGeocoder: forwardGeocoder,
    placeholder: searchText,
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false,
    limit: 12,
    bbox: [-170, 17, // Southwest coordinates
        -63, 65],  // Northeast coordinates
});






// Add the geocoder to the map
map.addControl(geocoder);

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
  geocoder.on('result', function(e) {


      searchPadding = 250

      var searchCoor = projection(e.result.center)

      var newCoor = [searchCoor[0], -1*searchCoor[1]]


      searchObject = {type: "Point", coordinates: newCoor}


      var bbox = turf.extent(searchObject);
      bbox[0] = bbox[0]+2.5;
      bbox[1] = bbox[1]-1;
      bbox[2] = bbox[2];
      bbox[3] = bbox[3]+1;



      if (window.innerWidth<550) {

        searchPadding = 60
      }



      map.fitBounds(bbox, {

          padding: searchPadding
      });



      // searchPadding = 60;


            if (activeMap=="CountyView") {

              setTimeout(function(){ countyGetLatLon(e); }, 1750)

          }

            if (activeMap == "DistrictView") {

              setTimeout(function(){ districtGetLatLon(e); }, 1750)

          }

          if (activeMap == "StateView") {

            setTimeout(function(){ stateGetLatLon(e);},1750)

          }

          if (activeMap == "MSAView") {

            setTimeout(function(){msaGetLatLon(e);},1750)
          }


  })


  function countyGetLatLon(e) {

    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['county-fills-click'] // replace this with the name of the layer
       })


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      if (clickedCountyId) {
          map.setFeatureState(
              { source: 'counties', id: clickedCountyId },
              { click: false }
          );
      }
      clickedCountyId = displayFeat.properties.GEO_ID;

      map.setFeatureState(
          { source: 'counties', id: clickedCountyId},
          { click: true }
      );


      if (displayFeat.state.noData != 1.0) {
          sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                  // "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
                  "<h1 class='mti_tooltip_hed'>" + displayFeat.state.countyName + "</h1>" +
                  "<div class='w-layout-grid grid_data'>" +
                  "<div class='grid_stat_descr stat1'>Number of Immigrants</div>" +
                  "<div class='grid_stat stat1'>" + numberWithCommas(displayFeat.state.immigrantPop) + "<br>‍</div>" +
                  "<div class='grid_stat_descr'>Immigrant Share of Population</div>" +
                  "<div class='grid_stat'>" + displayFeat.state.fbShare +  "</div>" +
                  "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid</div>" +
                  "<div class='grid_stat stat1'>"  + dollars(displayFeat.state.immTaxes) + "</div>" +
                  "<div class='grid_stat_descr'>Immigrant Spending Power</div>" +
                  "<div class='grid_stat'>"+ dollars(displayFeat.state.immSpend) +  "</div>" +
                  "<div class='grid_stat_descr stat1' >Number of Immigrant Entrepreneurs</div>" +
                  "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(displayFeat.state.immEntre) +  "</div>" +
                  "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters</div>" +
                  "<div class='grid_stat'>" + numberWithCommas(displayFeat.state.immVote) + "</div></div>" +
                  "<div class='source-line'>" + "Source: " + displayFeat.state.source + "</div>" +
                  "<br>‍</div>";
      } else {

        sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                "<h1 class='mti_tooltip_hed'>" + displayFeat.state.countyName + "</h1>" +
                "<div class='no-data'>" + "The data is not available due to a small sample size for the immigrant population in this county. For more information, see link below." + "</div>" +
                "<div class='see_more_button'>"+
                "<a href='https://www.newamericaneconomy.org/locations/" + displayFeat.state.stateName.toLowerCase().replace(/\s+/g, '-') + "/'>" +"More " +
                displayFeat.state.stateName + " Data"+"<i class='fa fa-long-arrow-right fa-adjust'></i></a></div></div>"
      }



  }

  function districtGetLatLon(e) {

    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['district-fills-click'] // replace this with the name of the layer
       })


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      map.setFeatureState(
          { source: 'district', id: clickedStateId },
          { click: false }
      );

  clickedStateId = displayFeat.id;

  map.setFeatureState(
      { source: 'district', id: clickedStateId},
      { click: true }
  );


  district_feat = displayFeat.state;
  // state_prop = state_feat.properties;


  sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
          "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/locations/" + district_feat.districtName.toLowerCase().replace(/\s+/g, '-') +"/'>" + district_feat.districtName + "</a></h1>" +
          "<div class='w-layout-grid grid_data'>" +
          "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
          "<div class='grid_stat stat1'>" + numberWithCommas(district_feat.immigrantPop) + "<br>‍</div>" +
          "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
          "<div class='grid_stat'>" + district_feat.immigrantShare + "</div>" +
          "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
          "<div class='grid_stat stat1'>" + dollarsCD(district_feat.immCDTaxes) + "</div>" +
          "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
          "<div class='grid_stat'>" + dollarsCD(district_feat.immCDSpend) + "</div>" +
          "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
          "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(district_feat.immCDEntr) + "</div>" +
          "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
          "<div class='grid_stat'>" + numberWithCommas(district_feat.immCDVote) + "</div>" +
          "</div>"+
          "<div class='source-line'>Source: 5-year 2017 American Community Survey</div>"+

          // "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
          // "<div class='grid_stat stat1'>" + district_feat.immCDWork.replace("*","") + "<br>‍</div></div>" +
          "<a href='https://www.newamericaneconomy.org/locations/" + district_feat.districtName.toLowerCase().replace(/\s+/g, '-') + "/'>" +
          "<div class='see_more_button'>More " +
          district_feat.districtName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";



  }

  function stateGetLatLon(e) {



    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['state-fills-click'] // replace this with the name of the layer
       })


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      if (clickedStateId) {
          map.setFeatureState(
              { source: 'state', id: clickedStateId },
              { click: false }
          );
      }
      clickedStateId = displayFeat.id;

      map.setFeatureState(
          { source: 'state', id: clickedStateId},
          { click: true }
      );

      state_feat = displayFeat.state





      sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
              "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/locations/" + state_feat.StateName.toLowerCase().replace(/\s+/g, '-') + "/'>" + state_feat.StateName + "</a></h1>" +
              "<div class='w-layout-grid grid_data'>" +
              "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
              "<div class='grid_stat stat1'>" + numberWithCommas(state_feat.fbpop) + "<br>‍</div>" +
              "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
              "<div class='grid_stat'>" + state_feat.fbshare + "</div>" +
              "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
              "<div class='grid_stat stat1'>" + dollars(state_feat.tottax) + "</div>" +
              "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
              "<div class='grid_stat'>" + dollars(state_feat.sppower) + "</div>" +
              "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
              "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(state_feat.entrp) + "</div>" +
              "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
              "<div class='grid_stat'>" + numberWithCommas(state_feat.voter) + "<br>‍</div></div>" +
              "<div class='source-line'>Source: 1-year 2019 American Community Survey</div>"+
              "<a href='https://www.newamericaneconomy.org/locations/" + state_feat.StateName.toLowerCase().replace(/\s+/g, '-') + "/'>" +
              "<div class='see_more_button'>More " +
              state_feat.StateName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";



  }

  function msaGetLatLon(e) {



    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['msa-fills-click'] // replace this with the name of the layer
       })


       if (featuresTEST == '') {return}


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      if (clickedStateId) {
          map.setFeatureState(
              { source: 'msa', id: clickedStateId },
              { click: false }
          );
      }
      clickedStateId = displayFeat.id;

      map.setFeatureState(
          { source: 'msa', id: clickedStateId},
          { click: true }
      );

      msa_feat = displayFeat.state


        sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/city/"+ msa_feat.msaName.toLowerCase().replace(/\s+/g, '-').replace("-metro-area","") + "/'>" + msa_feat.msaName + "</a></h1>" +
                "<div class='w-layout-grid grid_data'>" +
                "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
                "<div class='grid_stat stat1'>" + numberWithCommas(msa_feat.immigrantMSAPop) + "<br>‍</div>" +
                "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
                "<div class='grid_stat'>" + msa_feat.immigrantMSAShare + "</div>" +
                "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
                "<div class='grid_stat stat1'>" + dollars(msa_feat.immiMSATaxes) + "</div>" +
                "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
                "<div class='grid_stat'>" + dollars(msa_feat.immiMSASpend) + "</div>" +
                "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
                "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(msa_feat.immiMSAEntre) + "</div>" +
                "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
                "<div class='grid_stat'>" + numberWithCommas(msa_feat.immiMSAVote) + "<br>‍</div></div>" +
                "<div class='source-line' class='stateSource'>Source: 5-year 2018 American Community Survey</div>"+
                "<a href='https://www.newamericaneconomy.org/city/" + msa_feat.msaName.toLowerCase().replace(/\s+/g, '-').replace("-metro-area","") + "/'>" +
                "<div class='see_more_button'>More " +
                msa_feat.msaName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";


  }
  function countyGetLatLon(e) {

    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['county-fills-click'] // replace this with the name of the layer
       })


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      if (clickedCountyId) {
          map.setFeatureState(
              { source: 'counties', id: clickedCountyId },
              { click: false }
          );
      }
      clickedCountyId = displayFeat.properties.GEO_ID;

      map.setFeatureState(
          { source: 'counties', id: clickedCountyId},
          { click: true }
      );


      if (displayFeat.state.noData != 1.0) {
          sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                  // "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
                  "<h1 class='mti_tooltip_hed'>" + displayFeat.state.countyName + "</h1>" +
                  "<div class='w-layout-grid grid_data'>" +
                  "<div class='grid_stat_descr stat1'>Number of Immigrants</div>" +
                  "<div class='grid_stat stat1'>" + numberWithCommas(displayFeat.state.immigrantPop) + "<br>‍</div>" +
                  "<div class='grid_stat_descr'>Immigrant Share of Population</div>" +
                  "<div class='grid_stat'>" + displayFeat.state.fbShare +  "</div>" +
                  "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid</div>" +
                  "<div class='grid_stat stat1'>"  + dollars(displayFeat.state.immTaxes) + "</div>" +
                  "<div class='grid_stat_descr'>Immigrant Spending Power</div>" +
                  "<div class='grid_stat'>"+ dollars(displayFeat.state.immSpend) +  "</div>" +
                  "<div class='grid_stat_descr stat1' >Number of Immigrant Entrepreneurs</div>" +
                  "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(displayFeat.state.immEntre) +  "</div>" +
                  "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters</div>" +
                  "<div class='grid_stat'>" + numberWithCommas(displayFeat.state.immVote) + "</div></div>" +
                  "<div class='source-line'>" + "Source: " + displayFeat.state.source + "</div>" +
                  "<br>‍</div>";
      } else {

        sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                "<h1 class='mti_tooltip_hed'>" + displayFeat.state.countyName + "</h1>" +
                "<div class='no-data'>" + "The data is not available due to a small sample size for the immigrant population in this county. For more information, see link below." + "</div>" +
                "<div class='see_more_button'>"+
                "<a href='https://www.newamericaneconomy.org/locations/" + displayFeat.state.stateName.toLowerCase().replace(/\s+/g, '-') + "/'>" +"More " +
                displayFeat.state.stateName + " Data"+"<i class='fa fa-long-arrow-right fa-adjust'></i></a></div></div>"
      }



  }

  function districtGetLatLon(e) {

    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['district-fills-click'] // replace this with the name of the layer
       })


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      map.setFeatureState(
          { source: 'district', id: clickedStateId },
          { click: false }
      );

  clickedStateId = displayFeat.id;

  map.setFeatureState(
      { source: 'district', id: clickedStateId},
      { click: true }
  );


  district_feat = displayFeat.state;
  // state_prop = state_feat.properties;


  sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
          "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/locations/" + district_feat.districtName.toLowerCase().replace(/\s+/g, '-') +"/'>" + district_feat.districtName + "</a></h1>" +
          "<div class='w-layout-grid grid_data'>" +
          "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
          "<div class='grid_stat stat1'>" + numberWithCommas(district_feat.immigrantPop) + "<br>‍</div>" +
          "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
          "<div class='grid_stat'>" + district_feat.immigrantShare + "</div>" +
          "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
          "<div class='grid_stat stat1'>" + dollarsCD(district_feat.immCDTaxes) + "</div>" +
          "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
          "<div class='grid_stat'>" + dollarsCD(district_feat.immCDSpend) + "</div>" +
          "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
          "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(district_feat.immCDEntr) + "</div>" +
          "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
          "<div class='grid_stat'>" + numberWithCommas(district_feat.immCDVote) + "</div>" +
          "</div>"+
          "<div class='source-line' class='stateSource'>Source: "+ msa_feat.immiSource + "</div>"+

          // "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
          // "<div class='grid_stat stat1'>" + district_feat.immCDWork.replace("*","") + "<br>‍</div></div>" +
          "<a href='https://www.newamericaneconomy.org/locations/" + district_feat.districtName.toLowerCase().replace(/\s+/g, '-') + "/'>" +
          "<div class='see_more_button'>More " +
          district_feat.districtName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";



  }

  function stateGetLatLon(e) {



    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['state-fills-click'] // replace this with the name of the layer
       })


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      if (clickedStateId) {
          map.setFeatureState(
              { source: 'state', id: clickedStateId },
              { click: false }
          );
      }
      clickedStateId = displayFeat.id;

      map.setFeatureState(
          { source: 'state', id: clickedStateId},
          { click: true }
      );

      state_feat = displayFeat.state





      sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
              "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/locations/" + state_feat.StateName.toLowerCase().replace(/\s+/g, '-') + "/'>" + state_feat.StateName + "</a></h1>" +
              "<div class='w-layout-grid grid_data'>" +
              "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
              "<div class='grid_stat stat1'>" + numberWithCommas(state_feat.fbpop) + "<br>‍</div>" +
              "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
              "<div class='grid_stat'>" + state_feat.fbshare + "</div>" +
              "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
              "<div class='grid_stat stat1'>" + dollars(state_feat.tottax) + "</div>" +
              "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
              "<div class='grid_stat'>" + dollars(state_feat.sppower) + "</div>" +
              "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
              "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(state_feat.entrp) + "</div>" +
              "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
              "<div class='grid_stat'>" + numberWithCommas(state_feat.voter) + "<br>‍</div></div>" +
              "<div class='source-line'>Source: 1-year 2019 American Community Survey</div>"+
              "<a href='https://www.newamericaneconomy.org/locations/" + state_feat.StateName.toLowerCase().replace(/\s+/g, '-') + "/'>" +
              "<div class='see_more_button'>More " +
              state_feat.StateName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";



  }

  function msaGetLatLon(e) {



    bboxPro = document.body.getBoundingClientRect();
    center = e.result.center
    zoom = map.getZoom();
    scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);
    var displayFeat;

    var centerAlbers = projectionMercartor.invert(projectionAl(center))

    var pixel = map.project(centerAlbers)

      featuresTEST = map.queryRenderedFeatures(pixel, {
         layers: ['msa-fills-click'] // replace this with the name of the layer
       })


       if (featuresTEST == '') {return}


      var displayFeatures = featuresTEST.map(function (feat) {
    displayFeat = {};
    displayProperties.forEach(function (prop) {
    displayFeat[prop] = feat[prop];
    });

    return displayFeat;

  })

      if (clickedStateId) {
          map.setFeatureState(
              { source: 'msa', id: clickedStateId },
              { click: false }
          );
      }
      clickedStateId = displayFeat.id;

      map.setFeatureState(
          { source: 'msa', id: clickedStateId},
          { click: true }
      );

      msa_feat = displayFeat.state


        sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                "<h1 class='mti_tooltip_hed'><a class='titleLink' href='https://www.newamericaneconomy.org/city/"+ msa_feat.msaName.toLowerCase().replace(/\s+/g, '-').replace("-metro-area","") + "/'>" + msa_feat.msaName + "</a></h1>" +
                "<div class='w-layout-grid grid_data'>" +
                "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
                "<div class='grid_stat stat1'>" + numberWithCommas(msa_feat.immigrantMSAPop) + "<br>‍</div>" +
                "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
                "<div class='grid_stat'>" + msa_feat.immigrantMSAShare + "</div>" +
                "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
                "<div class='grid_stat stat1'>" + dollars(msa_feat.immiMSATaxes) + "</div>" +
                "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
                "<div class='grid_stat'>" + dollars(msa_feat.immiMSASpend) + "</div>" +
                "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
                "<div class='grid_stat stat1' class='vertalign'>" + numberWithCommas(msa_feat.immiMSAEntre) + "</div>" +
                "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
                "<div class='grid_stat'>" + numberWithCommas(msa_feat.immiMSAVote) + "<br>‍</div></div>" +
                "<div class='source-line' class='stateSource'>Source: 5-year 2018 American Community Survey</div>"+
                "<a href='https://www.newamericaneconomy.org/city/" + msa_feat.msaName.toLowerCase().replace(/\s+/g, '-').replace("-metro-area","") + "/'>" +
                "<div class='see_more_button'>More " +
                msa_feat.msaName + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";


  }
