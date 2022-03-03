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

var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };

var formatComma = d3.format(",")
var formatPercent = d3.format(",.1%")
var formatMoney = function(d) { return "$" + formatComma(d); }


var scroller1 = scrollama()
var container1 = d3.select('#container-scroll1');
var graphic1 = container1.select('.scroll__figure1');
var chart1 = graphic1.select('.figure__chart1');
var text1 = container1.select('.scroll__text1');
var step1 = text1.selectAll('.step1');

var scroller2= scrollama()
var container2 = d3.select('#container-scroll2');
var graphic2 = container2.select('.scroll__figure2');
var chart2 = graphic2.select('.figure__chart2');
var text2 = container2.select('.scroll__text2');
var step2 = text2.selectAll('.step2');


var scroller3= scrollama()
var container3 = d3.select('#container-scroll3');
var graphic3 = container3.select('.scroll__figure3');
var chart3 = graphic3.select('.figure__chart3');
var text3 = container3.select('.scroll__text3');
var step3 = text3.selectAll('.step3');

var scroller4= scrollama()
var container4 = d3.select('#container-scroll4');
var graphic4 = container4.select('.scroll__figure4');
var chart4 = graphic4.select('.figure__chart4');
var text4 = container4.select('.scroll__text4');
var step4 = text4.selectAll('.step4');


var scroller5= scrollama()
var container5 = d3.select('#container-scroll5');
var graphic5 = container5.select('.scroll__figure5');
var chart5 = graphic5.select('.figure__chart5');
var text5 = container5.select('.scroll__text5');
var step5 = text5.selectAll('.step5');



var svgPop= d3.selectAll(".scroll__figure1")
  .append("svg")
  .attr("id", "svgPop")
  .attr("width", window.innerWidth)
  .attr('height', window.innerHeight*1.5),
    width = +svgPop.attr("width"),
    height = +svgPop.attr("height");

// else {
// var svg= d3.select("svg")
//   .attr("width", window.innerWidth*.5)
//   .attr('height', window.innerHeight),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
//   }

    var svgTax = d3.select(".scroll__figure2")
      .append("svg")
      .attr("id", "svgTax")
      .attr("width", window.innerWidth)
      .attr('height', window.innerHeight),
        width2 = +svgTax.attr("width"),
        height2 = +svgTax.attr("height");

    var svgEd = d3.select(".scroll__figure3")
      .append("svg")
      .attr("id", "svgEd")
      .attr("width", window.innerWidth*.6)
      .attr('height', window.innerHeight),
        widthEd = +svgEd.attr("width"),
        heightEd = +svgEd.attr("height");

      var svgEnt = d3.select(".scroll__figure4")
        .append("svg")
        .attr("id", "svgEnt")
        .attr("width", window.innerWidth)
        .attr('height', window.innerHeight),
          widthEnt = +svgEnt.attr("width"),
          heightEnt = +svgEnt.attr("height");



            var svgVote = d3.select(".scroll__figure5")
              .append("svg")
              .attr("id", "svgVote")
              .attr("width", window.innerWidth*.6)
              .attr('height', window.innerHeight),
                widthV = +svgVote.attr("width"),
                heightV = +svgVote.attr("height");





var resChange = d3.map();
var resTaxes = d3.map();
var resVote = d3.map();
var resEd = d3.map();
var resEnt = d3.map();
var resVoteVictory = d3.map();
var resTaxFed = d3.map();
var resTaxLocal = d3.map();
var stateName = d3.map();
var resLink = d3.map();
var resTaxesText = d3.map()
var resTaxFedText = d3.map()
var resTaxLocalText = d3.map()
var path = d3.geoPath();
// var path2 = d3.geoPath();
// var pathV = d3.geoPath();
// var pathEd = d3.geoPath();



var divTool = d3.select(".scroll__figure1").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")

    .style("z-index", 999);

var divTool2 = d3.select(".scroll__figure2").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

var divTool3 = d3.select(".scroll__figure2").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

var divTool4 = d3.select(".scroll__figure3").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

var divTool5 = d3.select(".scroll__figure4").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

    var divTool6 = d3.select(".scroll__figure5").append("div")
        .attr("class", "tooltip")
        // .style("opacity", 0)
        .style("background", "#fff")
        .style("position", "absolute")
        .style("z-index", 999);

var x, xTax, xV, xEnt, xEd

if (width2<500) {

    x = d3.scaleLinear()
        .domain([-.12,.15])
        .rangeRound([width*.125, width*.875]);

    xTax = d3.scaleLinear()
        .domain([0,20000])
        .rangeRound([width*.125, width*.875]);

    xV = d3.scaleLinear()
        .domain([-8000,116000])
        .rangeRound([width*.125, width*.875]);

    xEnt = d3.scaleLinear()
        .domain([.05, .2])
        .rangeRound([width*.125, width*.875]);

    xEd = d3.scaleLinear()
        .domain([-.2,.32])
        .rangeRound([width*.125, width*.875]);

  }


else {x = d3.scaleLinear()
    .domain([-.12,.15])
    .rangeRound([width*.125, width*.4]);


   xTax = d3.scaleLinear()
        .domain([0,20000])
        .rangeRound([width*.125, width*.4]);

   xV = d3.scaleLinear()
    .domain([-8000,116000])
    .rangeRound([width*.125, width*.4]);

   xEnt = d3.scaleLinear()
    .domain([.05, .2])
    .rangeRound([width*.125, width*.4]);

   xEd = d3.scaleLinear()
    .domain([-.2,.32])
    .rangeRound([width*.125, width*.4]);
  }


var color = d3.scaleThreshold()
    .domain([-.12, -.11, -.10, -.09, -.08, -.07, -.06, -.05, -.04, -.03, -.02, -.01, 0, .01, .02, .03, .04, .05, .06, .07, .08, .09, .10, .11, .12, .13, .14, .15])
    .range( ["#FF7150", "#FF7C5E", "#FF886D", "#FF947B", "#FFA08A", "#FFAC98", "#FFB8A7", "#FFC3B6", "#FFCFC4", "#FFDBD3", "#FFE7E1", "#FFF3F0", "#FFFFFF",  "#F7FCFE", "#EFFAFE", "#E7F8FE", "#DFF5FE", "#D8F3FE", "#D0F1FD", "#C8EEFD", "#C0ECFD", "#B8EAFD", "#B1E7FD", "#A9E5FC", "#A1E3FC", "#99E0FC", "#91DEFC", "#8ADCFC"])


var color2 = d3.scaleThreshold()
        .domain([0, 400, 800, 1200, 1600, 2000, 2400, 2800, 3200, 3600, 4000, 4400, 4800, 5200, 5600, 6000, 6400, 6800, 7200, 7600, 8000, 8400, 8800, 9200, 9600, 10000, 10400, 10800, 11200, 11600, 12000, 12400, 12800, 13200, 13600, 14000, 14400, 14800, 15200, 15600, 16000, 16400, 16800, 17200, 17600, 18000, 18400, 18800, 19200, 19600, 20000])
        .range(["#FFFFFF", "#F9FEFC", "#F4FDF9", "#EFFCF6", "#EAFBF4", "#E5FAF1", "#E0F9EE", "#DBF8EC", "#D6F7E9", "#D1F6E6", "#CBF5E4", "#C6F4E1", "#C1F3DE", "#BCF2DC", "#B7F1D9", "#B2F0D6", "#ADEFD4", "#A8EED1", "#A3EDCE", "#9EECCC", "#98EBC9", "#93EAC6", "#8EE9C4", "#89E8C1", "#84E7BE", "#7FE6BC", "#7AE5B9", "#75E4B6", "#70E3B4", "#6BE2B1", "#65E1AE", "#60E0AC", "#5BDFA9", "#56DEA6", "#51DDA4", "#4CDCA1", "#47DB9E", "#42DA9C", "#3DD999", "#38D896", "#32D794", "#2DD691", "#28D58E", "#23D48C", "#1ED389", "#19D286", "#14D184", "#0FD081", "#0ACF7E", "#05CE7C"])

// var colorV = d3.scaleThreshold()
//         .domain([0, 20000, 40000, 60000, 80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000, 260000, 280000, 300000,320000, 340000, 360000, 380000, 400000, 420000,440000, 460000,480000,500000, 520000, 540000, 560000, 580000, 600000, 620000, 640000, 660000, 680000, 700000, 720000, 740000, 760000, 780000, 800000, 820000, 840000, 860000, 880000, 900000, 920000, 940000, 960000, 980000, 1000000])
//         .range(["#FFFFFF", "#FAFAFC", "#F6F6F9", "#F2F2F7", "#EEEEF4", "#EAEAF1", "#E6E6EF", "#E2E2EC", "#DEDEE9", "#DADAE7", "#D6D6E4", "#D2D2E2", "#CECEDF", "#CAC9DC", "#C6C5DA", "#C2C1D7", "#BEBDD4", "#BAB9D2", "#B6B5CF", "#B2B1CC", "#AEADCA", "#AAA9C7", "#A6A5C5", "#A2A1C2", "#9E9DBF", "#9998BD", "#9594BA", "#9190B7", "#8D8CB5", "#8988B2", "#8584B0", "#8180AD", "#7D7CAA", "#7978A8", "#7574A5", "#7170A2", "#6D6CA0", "#69679D", "#65639A", "#615F98", "#5D5B95", "#595793", "#555390", "#514F8D", "#4D4B8B", "#494788", "#454385", "#413F83", "#3D3B80", "#39377E"])

var colorV = d3.scaleThreshold()
        .domain([-8000, -6000, -4000, -2000, 0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 44000, 46000, 48000, 50000, 52000, 54000, 56000, 58000,60000, 62000, 64000, 66000, 68000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 88000, 90000, 92000, 94000, 96000, 98000, 100000, 102000, 104000, 106000, 108000, 110000, 112000, 114000, 116000])
        .range(["#FB594D", "#FC8279", "#FDACA6", "#FED5D2", "#FFFFFF", "#FDFCFE", "#FCFAFD", "#FAF8FC", "#F9F6FB", "#F7F4FA", "#F6F2FA", "#F4F0F9", "#F3EDF8", "#F1EBF7", "#F0E9F6", "#EEE7F5", "#EDE5F5", "#EBE3F4", "#EAE1F3", "#E9DEF2", "#E7DCF1", "#E6DAF1", "#E4D8F0", "#E3D6EF", "#E1D4EE", "#E0D2ED", "#DECFEC", "#DDCDEC", "#DBCBEB", "#DAC9EA", "#D8C7E9", "#D7C5E8", "#D6C3E8", "#D4C0E7", "#D3BEE6", "#D1BCE5", "#D0BAE4", "#CEB8E3", "#CDB6E3", "#CBB4E2", "#CAB1E1", "#C8AFE0", "#C7ADDF", "#C5ABDE", "#C4A9DE", "#C2A7DD", "#C1A5DC", "#C0A2DB", "#BEA0DA", "#BD9EDA", "#BB9CD9", "#BA9AD8", "#B898D7", "#B796D6", "#B593D5", "#B491D5", "#B28FD4", "#B18DD3", "#AF8BD2", "#AE89D1", "#AD87D1"])


var colorEnt = d3.scaleThreshold()
        .domain([.05, .06, .07, .08, .09,.1,.11, .12, .13, .14, .15, .16, .17, .18, .19, .2])
        // .range(["#FFFFFF", "#F9F7FB", "#F4EFF8", "#EEE7F5", "#E9DFF2", "#E3D7EF", "#DECFEC", "#D8C7E9", "#D3BFE6", "#CDB7E3", "#C8AFE0", "#C2A7DD", "#BD9FDA", "#B797D7", "#B28FD4", "#AD87D1"])
        //.range(["#FFFFFF", "#F6F3F5", "#EEE7EC", "#E6DBE2", "#DED0D9", "#D6C4CF", "#CDB8C6", "#C5ACBC", "#BDA1B3", "#B595A9", "#AD89A0", "#A47D96", "#9C728D", "#946683", "#8C5A7A", "#844F71"])
        //.range( ["#FFFFFF", "#FCF9F6", "#FAF4EE", "#F8EFE6", "#F6EADD", "#F4E5D5", "#F2DFCD", "#F0DAC4", "#EDD5BC", "#EBD0B4", "#E9CBAB", "#E7C5A3", "#E5C09B", "#E3BB92", "#E1B68A", "#DFB182"])
        //.range(["#FFFFFF", "#FAF7F3", "#F6EFE7", "#F1E7DB", "#EDDFCF", "#E9D7C3", "#E4CFB7", "#E0C7AB", "#DBBF9F", "#D7B793", "#D3AF87", "#CEA77B", "#CA9F6F", "#C59763", "#C18F57", "#BD874B"])
        //.range(["#FFFFFF", "#F1F1F6", "#E4E4ED", "#D7D7E4", "#C9C9DC", "#BCBCD3", "#AFAFCA", "#A2A2C1", "#9494B9", "#8787B0", "#7A7AA7", "#6D6D9E", "#5F5F96", "#52528D", "#454584", "#38387C"])
        //Colbalt
        .range(["#FFFFFF", "#F1F1F6", "#E4E4ED", "#D7D7E5", "#CAC9DC", "#BDBCD4", "#AFAFCB", "#A2A1C2", "#9594BA", "#8887B1", "#7B79A9", "#6D6CA0", "#605F97", "#53518F", "#464486", "#39377E"])

var colorEd = d3.scaleThreshold()
        .domain([-.2, -.18, -.16, -.14, -.12, -.1, -.08, -.06, -.04, -.02, 0, .02, .04,.06,.08,.10, .12, .14, .16, .18, .2, .22, .24, .26, .28, .3, .32])
        .range(["#F1BD03", "#F2C31C", "#F3CA35", "#F5D04E", "#F6D767", "#F8DE81", "#F9E49A", "#FAEBB3", "#FCF1CC", "#FDF8E5", "#FFFFFF", "#F4F4FE", "#EAEAFD", "#DFDFFC", "#D5D5FB", "#CACBFA", "#C0C0F9", "#B5B6F8", "#ABABF7", "#A0A1F6", "#9697F5", "#8B8CF4", "#8182F3", "#7677F2", "#6C6DF1", "#6263F1"])
        // .range(["#FF9DCE", "#FFA6D2", "#FFB0D7", "#FFBADC", "#FFC4E1", "#FFCEE6", "#FFD7EB", "#FFE1F0", "#FFEBF5", "#FFF5FA","#FFFFFF", "#F9F7FC", "#F4F0F9", "#EFE8F6", "#EAE1F3", "#E5D9F0", "#E0D2ED", "#DBCAEA", "#D6C3E8", "#D0BBE5", "#CBB4E2", "#C6ACDF", "#C1A5DC", "#BC9DD9", "#B796D6", "#B28ED3", "#AD87D1"])
// F1BD03   	6263F1

  var g = svgPop.append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,"+height*.5+")");

  var g2 = svgTax.append("g")
      .attr("class", "key2")
      .attr("transform", "translate(0,"+height2*.7+")");

  var gV = svgVote.append("g")
      .attr("class", "keyV")
      .attr("transform", "translate(0,"+heightV*.7+")");

  var gEd = svgEd.append("g")
      .attr("class", "keyEd")
      .attr("transform", "translate(0,"+heightEd*.7+")");

  var gEnt = svgEnt.append("g")
      .attr("class", "keyEnt")
      .attr("transform", "translate(0,"+heightEnt*.7+")");

// statefip,id,PercentChange,ImmTaxTotal,ImmTaxFed,ImmTaxLocal,PercentBachelor,ImmEntRate,Voters,VoteVictory

var promises = [
  d3.json("https://d3js.org/us-10m.v1.json"),
  d3.csv("assets/map2018_state2.csv", function(d) {
    stateName.set(d.id, d.statefip)
    resChange.set(d.id, +d.PercentChange);
    resTaxes.set(d.id, +d.ImmTaxTotal)
    resTaxFed.set(d.id, +d.ImmTaxFed)
    resTaxLocal.set(d.id, +d.ImmTaxLocal)
    resVote.set(d.id, +d.VoteChange)
    resVoteVictory.set(d.id, +d.VoteVictory)
    resEd.set(d.id, +d.PercentBachelor)
    resEnt.set(d.id, +d.ImmEntRate)
    resLink.set(d.id, d.MapSite)
    resTaxesText.set(d.id, d.TaxTotalText)
    resTaxFedText.set(d.id, d.TaxFedText)
    resTaxLocalText.set(d.id, d.TaxLocalText)

    })
]


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

Promise.all(promises).then(ready)

function ready([us]) {



  function readyVoteTrans() {



    svgVote.selectAll(".statesVote")
        .transition()
        .duration(200)
        .selectAll("path")
        .style("stroke","#A0A1A6")
        .attr("fill", function(d) { if (d.id === "12" ||  d.id === "26"||  d.id === "33") {return ("#F1BD03")} else {return ("#FFFFFF")}})
        // .attr("d", path)

        // svgVote.exit()
        //     .transition()
        //     .duration(200)
        //       .remove();

        gV.selectAll("text").attr("opacity",0)
        gV.selectAll("rect").attr("opacity",0)
        gV.selectAll(".tick").attr("opacity",0)

        gV.append("text")
            .attr("class", "caption")
            .attr("x", xV.range()[0])
            .attr("y", 60)
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .attr("font-weight", "semibold")
            .attr("class", "victory")
            .attr("opacity",1)
            .text("Change in immigrant voters (2017-18) > 2016 presidential election margin of victory.");



  }

  function Conclusion() {



    svgVote.selectAll(".statesVote")
        .transition()
        .ease(d3.easeLinear)
        .duration(3000)
        .selectAll("path")
        .attr("class","conclusion")
        .style("stroke","#ffffff")
        .attr("fill", "#05CE7C")
        // .attr("d", path)

        // svgVote.exit()
        //     .transition()
        //     .duration(200)
        //       .remove();

        gV.selectAll("text").attr("opacity",0)
        // gV.selectAll("rect").attr("opacity",0)
        // gV.selectAll(".tick").attr("opacity",0)
        //
        // gV.append("text")
        //     .attr("class", "caption")
        //     .attr("x", xV.range()[0])
        //     .attr("y", 60)
        //     .attr("fill", "#000")
        //     .attr("text-anchor", "start")
        //     .attr("font-weight", "semibold")
        //     .attr("class", "victory")
        //     .attr("opacity",1)
        //     .text("Change in immigrant voters (2017-18) > 2016 presidential election margin of victory.");



  }


  var projection = d3.geoIdentity()
          .fitSize([width,height],[us]);


          var projection2 = d3.geoIdentity()
                  .fitSize([width2,height2],[us]);


  function scale (scaleFactor,width,height) {
            return d3.geoTransform({
                point: function(x, y) {
                    this.stream.point( (x - width/4) * scaleFactor + width/4 , (y - height/3) * scaleFactor + height/3);
                }
            });
            }

// function scale2 (scaleFactor,width2,height2) {
//                       return d3.geoTransform({
//                           point: function(x, y) {
//                               this.stream.point( (x - width/4) * scaleFactor + width/10 , (y - height/3) * scaleFactor + height/3);
//                           }
//                       });
//                       }
//
//   function scale2 (scaleFactor,width2,height2) {
//               return d3.geoTransform({
//               point: function(x, y) {
//               this.stream.point( (x - width/4) * scaleFactor + width/10 , (y - height/3) * scaleFactor + height/3);
//                       }
//                             });
//                             }


//IMPORTANT I CAN ADJUST SCALE BELOW!!!!

if (window.innerWidth>450 & window.innerWidth<1000) {
  path = d3.geoPath().projection(scale(.42,width,height))
}
//remove if there are issues
else if (window.innerWidth>=1000) {
  path = d3.geoPath().projection(scale(.52,width,height))
}

else  {
  path = d3.geoPath().projection(scale(.3,width,height))
}

  function readyPopChange(){



    svgPop.append("text")
        .attr("class", "hiddenText")
        .attr("fill", "#fff")
        .attr("x", 0)
        .attr("y", 0)
        .attr("opacity", 0)
        .text(".");


        g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", 5)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "Semibold")
        .text("Percent Change in Number of Resident Immigrants")


      g.selectAll("rect")
        .data(color.range().map(function(d) {
            d = color.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
          }))
        .enter().append("rect")
          .attr("height", 12)
          .attr("x", function(d) { return x(d[0]); })
          .attr("y", 15)
          .attr("width", function(d) { return x(d[1]) - x(d[0]); })
          .attr("fill", function(d) { return color(d[0]); });


      g.call(d3.axisBottom(x)
          .tickSize(28)
          .tickFormat(function(x, i) { if (x==-.12) {return "-12%"} else if(x==0) {return "0"} else if(x==.15) {return "15%"};})
          .tickValues(color.domain()))
          .select(".domain")
          .attr('class',"ticks")
          .remove();





      // .text(function(d) { return formatComma(d.rChange); })


      //IDEA

  //
  // svgPop.append("path")
  //     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
  //     .attr("class", "states")
  //     .attr("d", path);

      svgPop.append("svg")
          .attr("class", "statesPop")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("fill", function(d) {
            return color(d.rChange = (resChange.get(d.id)));
            })
          .attr("d", path)
          .attr("xlink:href", function(d) {
            return d.rLink = resLink.get(d.id)})
        .on("mouseover", handleMouseOverTool)
        .on("mouseout", handleMouseOutTool)
        .on("click", function(d) {
          var url= resLink.get(d.id);
          window.open(
              url,
              '_blank' // <- This is what makes it open in a new window.
            );
          });



}


function readyTaxes() {

  svgTax.append("text")
      .attr("class", "hiddenText")
      .attr("fill", "#fff")
      .attr("x", 0)
      .attr("y", 0)
      .attr("opacity", 0)
      .text(".");

if (window.innerWidth>=1000) {

  g2.append("text")
            .attr("class", "caption2")
            .attr("x", xTax.range()[0])
            .attr("y", 5)
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .attr("font-weight", "Semibold")
            .text("Taxes Paid by Immigrants");

  g2.selectAll("rect")
          .data(color2.range().map(function(d) {
              d = color2.invertExtent(d);
              if (d[0] == null) d[0] = xTax.domain()[0];
              if (d[1] == null) d[1] = xTax.domain()[1];
              return d;
            }))
          .enter().append("rect")
            .attr("height", 12)
            .attr("x", function(d) { return xTax(d[0]); })
            .attr("y", 15)
            .attr("width", function(d) { return xTax(d[1]) - xTax(d[0]); })
            .attr("fill", function(d) { return color2(d[0]); });



  g2.call(d3.axisBottom(xTax)
        .tickSize(30)
        // .tickFormat(function(x, i) { if (x==0|x==50000000000|x==100000000000) return (i ? x : x);})
        .tickFormat(function(x, i) { if (x==0) {return "$0"} else if(x==10000) {return "$10B"} else if(x==20000) {return "over $20B"};})
        .tickValues(color2.domain()))
        .select(".domain")
        .attr('class',"ticks")
        .remove();
}

else  {

  g2.append("text")
            .attr("class", "caption2")
            .attr("x", xTax.range()[0])
            .attr("y", 20)
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .attr("font-weight", "Semibold")
            .text("Taxes Paid by Immigrants");

  g2.selectAll("rect")
          .data(color2.range().map(function(d) {
              d = color2.invertExtent(d);
              if (d[0] == null) d[0] = xTax.domain()[0];
              if (d[1] == null) d[1] = xTax.domain()[1];
              return d;
            }))
          .enter().append("rect")
            .attr("height", 12)
            .attr("x", function(d) { return xTax(d[0]); })
            .attr("y", 30)
            .attr("width", function(d) { return xTax(d[1]) - xTax(d[0]); })
            .attr("fill", function(d) { return color2(d[0]); });



  g2.call(d3.axisBottom(xTax)
        .tickSize(45)
        // .tickFormat(function(x, i) { if (x==0|x==50000000000|x==100000000000) return (i ? x : x);})
        .tickFormat(function(x, i) { if (x==0) {return "$0"} else if(x==10000) {return "$10B"} else if(x==20000) {return "over $20B"};})
        .tickValues(color2.domain()))
        .select(".domain")
        .attr('class',"ticks")
        .remove();
}


  // function scale2 (scaleFactor,width2,height2) {
  //           return d3.geoTransform({
  //               point: function(xTax, y) {
  //                   this.stream.point( (xTax - width/4) * scaleFactor + width/4 , (y - height/3) * scaleFactor + height/3);
  //               }
  //           });
  //           }


//IMPORTANT I CAN ADJUST SCALE BELOW!!!!

    // var path2 = d3.geoPath().projection(scale2(.6,width2,height2))


  svgTax.append("svg")
      .attr("class", "statesTax")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
        return color2(d.rTax = (resTaxes.get(d.id)));
        })
      .attr("d", path)
      .attr('z-index', 1)
      .on("mouseover", handleMouseOverTool2)
      .on("mouseout", handleMouseOutTool)
      .on("click", function(d) {
        var url= resLink.get(d.id);
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
          );
        });

  // svg2.append("path")
  //     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
  //     .attr("class", "states")
  //     .attr("d", path);


}


function readyEd() {





  svgEd.append("text")
      .attr("class", "hiddenText")
      .attr("fill", "#fff")
      .attr("x", 0)
      .attr("y", 0)
      .attr("opacity", 0)
      .text(".");

  gEd.append("text")
      .attr("class", "captionEd")
      .attr("x", xEd.range()[0])
      .attr("y", 40)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "semibold")
      .text("Percent Change in College-Educated Immigrants (2017-2018) ");


        gEd.selectAll("rect")
          .data(colorEd.range().map(function(d) {
              d = colorEd.invertExtent(d);
              if (d[0] == null) d[0] = xEd.domain()[0];
              if (d[1] == null) d[1] = xEd.domain()[1];
              return d;
            }))
          .enter().append("rect")
            .attr("height", 12)
            .attr("x", function(d) { return xEd(d[0]); })
            .attr("y", 50)
            .attr("width", function(d) { return xEd(d[1]) - xEd(d[0]); })
            .attr("fill", function(d) { return colorEd(d[0]); });


          //   gEd.append("text")
          //       .attr("class", "caption")
          //       .attr("x", xEd.range()[0])
          //       .attr("y", 70)
          //       .attr("fill", "#000")
          //       .attr("text-anchor", "start")
          //       .attr("font-weight", "semibold")
          //       .text("Not enough data available");
          //
          //
          // gEd.append("rect")
          // .attr("height", 15)
          // .attr("x", xEd.range()[0])
          // .attr("y", 80)
          // .attr("width", 15)
          // .attr("fill", function(d) { return "#ECF2F2"; });

            gEd.call(d3.axisBottom(xEd)
                .tickSize(65)
                .tickFormat(function(x, i) { if (x==-.2) {return "-20%"} else if(x==0) {return "0%"} else if(x==.32) {return "32%"};})
                .tickValues(colorEd.domain()))
                .select(".domain")
                .attr('class',"ticks")
                .remove();


  svgEd.append("svg")
      .attr("class", "statesEd")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) { if (d.id==="46" || d.id==="56") {return "#ECF2F2"} else
        {return colorEd(d.rEd = (resEd.get(d.id)))};
        })
      .attr("d", path)
      .on("mouseover", handleMouseOverTool3)
      .on("mouseout", handleMouseOutTool)
      .on("click", function(d) {
        var url= resLink.get(d.id);
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
          );
        });


  // svgEd.append("path")
  //     .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
  //     .attr("class", "states")
  //     .attr("d", path);


}




function readyVote() {


  svgVote.append("text")
      .attr("class", "hiddenText")
      .attr("fill", "#fff")
      .attr("x", 0)
      .attr("y", 0)
      .attr("opacity", 0)
      .text(".");


  gV.append("text")
      .attr("class", "captionV")
      .attr("x", xV.range()[0])
      .attr("y", 40)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "semibold")
      .text("Change in the Number of Immigrant Voters from 2017-2018");

  gV.selectAll("rect")
    .attr("opacity",1)
    .data(colorV.range().map(function(d) {
        d = colorV.invertExtent(d);
        if (d[0] == null) d[0] = xV.domain()[0];
        if (d[1] == null) d[1] = xV.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 12)
      .attr("x", function(d) { return xV(d[0]); })
      .attr("y", 50)
      .attr("width", function(d) { return xV(d[1]) - xV(d[0]); })
      .attr("fill", function(d) { return colorV(d[0]); });


  gV.call(d3.axisBottom(xV)
      .tickSize(65)
      .tickFormat(function(x, i) { if (x==-8000){return "-8,000"} else if(x==116000) {return "116,000"};})
      .tickValues(colorV.domain()))
      .select(".domain")
      .attr('class',"ticksV")
      .remove();

  gV.selectAll(".victory").attr("opacity",0)





  svgVote.append("svg")
      .attr("class", "statesVote")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
        return colorV(d.rVote = (resVote.get(d.id)));
        })
      .attr("d", path)
    .on("mouseover", handleMouseOverTool5)
    .on("mouseout", handleMouseOutTool)
    .on("click", function(d) {
      var url= resLink.get(d.id);
      window.open(
          url,
          '_blank' // <- This is what makes it open in a new window.
        );
      });

    // svgVote.exit()
    //     .transition()
    //     .duration(200)
    //       .remove();


}


function readyEnt() {


  svgEnt.append("text")
      .attr("class", "hiddenText")
      .attr("fill", "#fff")
      .attr("x", 0)
      .attr("y", 0)
      .attr("opacity", 0)
      .text(".");

if (window.innerWidth>=1000) {

  gEnt.append("text")
      .attr("class", "caption")
      .attr("x", xEnt.range()[0])
      .attr("y", 5)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "semibold")
      .text("Immigrant Entrepreneurship Rate");

  gEnt.selectAll("rect")
    .data(colorEnt.range().map(function(d) {
        d = colorEnt.invertExtent(d);
        if (d[0] == null) d[0] = xEnt.domain()[0];
        if (d[1] == null) d[1] = xEnt.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 12)
      .attr("x", function(d) { return xEnt(d[0]); })
      .attr("y", 15)
      .attr("width", function(d) { return xEnt(d[1]) - xEnt(d[0]); })
      .attr("fill", function(d) { return colorEnt(d[0]); });


  gEnt.call(d3.axisBottom(xEnt)
      .tickSize(30)
      .tickFormat(function(x, i) { if (x==.05) {return "5%"} else if (x==.2) {return "20%"};})
      .tickValues(colorEnt.domain()))
      .select(".domain")
      .attr('class',"ticks")
      .remove();
}

else {
  gEnt.append("text")
      .attr("class", "caption")
      .attr("x", xEnt.range()[0])
      .attr("y", 20)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "semibold")
      .text("Immigrant Entrepreneurship Rate");

  gEnt.selectAll("rect")
    .data(colorEnt.range().map(function(d) {
        d = colorEnt.invertExtent(d);
        if (d[0] == null) d[0] = xEnt.domain()[0];
        if (d[1] == null) d[1] = xEnt.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 12)
      .attr("x", function(d) { return xEnt(d[0]); })
      .attr("y", 30)
      .attr("width", function(d) { return xEnt(d[1]) - xEnt(d[0]); })
      .attr("fill", function(d) { return colorEnt(d[0]); });


  gEnt.call(d3.axisBottom(xEnt)
      .tickSize(45)
      .tickFormat(function(x, i) { if (x==.05) {return "5%"} else if (x==.2) {return "20%"};})
      .tickValues(colorEnt.domain()))
      .select(".domain")
      .attr('class',"ticks")
      .remove();
}

      // gEnt.append("text")
      //     .attr("class", "caption")
      //     .attr("x", xEnt.range()[0])
      //     .attr("y", 70)
      //     .attr("fill", "#000")
      //     .attr("text-anchor", "start")
      //     .attr("font-weight", "semibold")
      //     .text("Not enough data available");
      //
      //
      // gEnt.append("rect")
      //     .attr("height", 15)
      //     .attr("x", xEnt.range()[0])
      //     .attr("y", 80)
      //     .attr("width", 15)
      //     .attr("fill", function(d) { return "#ECF2F2" });




  svgEnt.append("svg")
      .attr("class", "statesEnt")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("fill", function(d) { if (d.id==="46" || d.id==="56"|| d.id==="50"|| d.id==="23"|| d.id==="02"|| d.id==="30"|| d.id==="54"|| d.id==="38") {return "#ECF2F2"} else
      {return colorEnt(d.rEnt = (resEnt.get(d.id)))};
      })
      .attr("d", path)
    .on("mouseover", handleMouseOverTool4)
    .on("mouseout", handleMouseOutTool)
    .on("click", function(d) {
      var url= resLink.get(d.id);
      window.open(
          url,
          '_blank' // <- This is what makes it open in a new window.
        );
      });



    d3.selectAll("statesVote")
    .remove()




}


readyPopChange()




function handleMouseOverTool(d) {

            var xMouse2 = d3.mouse(this)[0]+ width*.2
            var yMouse2 = d3.mouse(this)[1]- height*.075

             divTool.html(function() {return "<b>Growth rate of immigrant population in "+stateName.get(d.id)+":   "+formatPercent(d.rChange)+"</b></br><p>Click state for further information from Map the Impact.</p>"})

            	// .style("left", .67*widthScreen2 + "px")
              .style("left", xMouse2 + "px")
            	// .style('top', .05*heightScreen + "px")
            	.style("top", yMouse2 + "px")
            	.style("visibility", 'visible')
              .attr("class", "tooltip2")

            	.attr("id", function() {return "county" + d.id});
          }

    function handleMouseOverTool2(d) {
                var xMouse3 = d3.mouse(this)[0]- width*.1
                var yMouse3 = d3.mouse(this)[1]- height*.15

               divTool3.html(function() {return "<b>Taxes Paid by Immigrants in "+stateName.get(d.id)+":  $"+resTaxesText.get(d.id)+"</b></br>Federal taxes: $" + resTaxFedText.get(d.id)+"</br>Local taxes:  $" + resTaxLocalText.get(d.id)+" </br>Click state for further information from Map the Impact.</p>"})
              	// .style("left", .67*widthScreen2 + "px")
                .style("left", xMouse3 + "px")
              	// .style('top', .05*heightScreen + "px")
              	.style("top", yMouse3 + "px")
              	.style("visibility", 'visible')
              	.attr("class", "tooltip3")
              	.attr("id", function() {return "county" + d.id});
                    }


      function handleMouseOverTool4(d) {
                  var xMouse4 = d3.mouse(this)[0]-width*.1
                  var yMouse4 = d3.mouse(this)[1]- height*.1


                 divTool5.html(function() {if (d.id=="46"||d.id=="56"||d.id=="38"||d.id=="54"||d.id=="30"||d.id=="02"||d.id=="23"||d.id=="50") {return "<b>"+stateName.get(d.id)+"</b></br>Not enough data available"} else {return "<b>Immigrant entrepreneurship rate in "+stateName.get(d.id)+":  "+formatPercent(d.rEnt)+"</b></br>Click state for further information from Map the Impact.</p>"}})
                	// .style("left", .67*widthScreen2 + "px")
                  .style("left", xMouse4 + "px")
                	// .style('top', .05*heightScreen + "px")
                	.style("top", yMouse4 + "px")
                	.style("visibility", 'visible')
                	.attr("class", "tooltip4")
                	.attr("id", function() {return "county" + d.id});
                    }

          function handleMouseOverTool3(d) {
                      var xMouse5 = d3.mouse(this)[0] + width*.05
                      var yMouse5 = d3.mouse(this)[1] - height*.1

                       divTool4.html(function() {if (d.id=="46"||d.id=="56") {return "<b>"+stateName.get(d.id)+"</b></br>Not enough data available"} else {return "<b>Change in college-educated immigrants in "+stateName.get(d.id)+":  "+formatPercent(d.rEd)+"</b></br><p>Click state for further information from Map the Impact.</p>"}})
                      	// .style("left", .67*widthScreen2 + "px")
                        .style("left", xMouse5 + "px")
                      	// .style('top', .05*heightScreen + "px")
                      	.style("top", yMouse5 + "px")
                      	.style("visibility", 'visible')
                      	.attr("class", "tooltip5")
                      	.attr("id", function() {return "county" + d.id});
                      }


          function handleMouseOverTool5(d) {
                      var xMouse6 = d3.mouse(this)[0] + width*.05
                      var yMouse6 = d3.mouse(this)[1] - height*.1

                    divTool6.html(function() {if (d.id=="33"||d.id=="12"||d.id=="26") {return "<b>Change in immigrant voters in "+stateName.get(d.id)+":  "+formatComma(d.rVote)+"</b></br>2016 Presdiential Election Margin of Victory:  " +formatComma(resVoteVictory.get(d.id))} else {return "<b>Change in immigrant voters in "+stateName.get(d.id)+":  "+formatComma(d.rVote)+"</b></br><p>Click state for further information from Map the Impact.</p>"}})
                     // divTool6.html(function() {return "<b>"+stateName.get(d.id)+"</b></br><p>Immigrant eligible voters: <b>"+formatComma(d.rVote)+"</b></br>Margin of victory 2016 Presidential Election: "+formatComma(resVoteVictory.get(d.id))+"</p>"})
                      // .style("left", .67*widthScreen2 + "px")
                      .style("left", xMouse6 + "px")
                      // .style('top', .05*heightScreen + "px")
                      .style("top", yMouse6 + "px")
                      .style("visibility", 'visible')
                      .attr("class", "tooltip6")
                      .attr("id", function() {return "county" + d.id});
                  }





  function handleMouseOutTool(d) {

            d3.select(".tooltip2").style("visibility", 'hidden');
            d3.select(".tooltip3").style("visibility", 'hidden');
              d3.select(".tooltip4").style("visibility", 'hidden');
                d3.select(".tooltip5").style("visibility", 'hidden');
                d3.select(".tooltip6").style("visibility", 'hidden');


          }



//2
function handleResize2() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight*.75);
	step1.style('height', stepHeight2 + 'px');
  step2.style('height', stepHeight2 + 'px');
  step3.style('height', stepHeight2 + 'px');
  step4.style('height', stepHeight2 + 'px');
  step5.style('height', stepHeight2 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;
  var bodyWidth2 = d3.select('body').node().offsetWidth;
  var bodyWidth3 = d3.select('body').node().offsetWidth;
  var bodyWidth4 = d3.select('body').node().offsetWidth;
  var bodyWidth5 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
  graphic2.style('width', bodyWidth2 + 'px').style('height', window.innerHeight + 'px');
  graphic3.style('width', bodyWidth3 + 'px').style('height', window.innerHeight + 'px');
  graphic4.style('width', bodyWidth4 + 'px').style('height', window.innerHeight + 'px');
  graphic5.style('width', bodyWidth4 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 12;
  var chartMargin2 = 12;
  var chartMargin3 = 12;
  var chartMargin4 = 12;
  var chartMargin5 = 12;

	var textWidth1 = text1.node().offsetWidth;
  var textWidth2 = text2.node().offsetWidth;
  var textWidth3 = text2.node().offsetWidth;
  var textWidth4 = text4.node().offsetWidth;
  var textWidth5 = text5.node().offsetWidth;

	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;
  var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;
  var chartWidth3 = graphic3.node().offsetWidth - textWidth3 - chartMargin3;
  var chartWidth4 = graphic4.node().offsetWidth - textWidth4 - chartMargin4;
  var chartWidth5 = graphic5.node().offsetWidth - textWidth5 - chartMargin5;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();

  //CHANGE HERE
  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller2.resize();

  chart3.style('width', chartWidth3 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller3.resize();

  chart4.style('width', chartWidth4 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller4.resize();

  chart5.style('width', chartWidth5 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller5.resize();


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

	// update graphic based on step
	chart1.select('p').text(response.index + 1);
  chart2.select('p').text(response.index + 1);
  chart3.select('p').text(response.index + 1);
  chart4.select('p').text(response.index + 1);
  chart5.select('p').text(response.index + 1);
	// var someData = d3.csv("<LINK TO DATA HERE>");
	// var otherData = d3.json("<LINK TO DATA HERE>");

	// Promise.all([someData, otherData).then(next);

	// // update graphic1 based on step 1
	if (step1._groups[0][0].className === 'step1 is-active') {
		readyPopChange();
	}

	// // update graphic1 based on step 2
	if (step2._groups[0][0].className === 'step2 is-active') {
		readyTaxes()
	}

  if (step3._groups[0][0].className === 'step3 is-active') {
		readyEd()
	}

  if (step4._groups[0][0].className === 'step4 is-active') {
		readyEnt()
	}

  if (step5._groups[0][0].className === 'step5 is-active') {
		readyVote()
	}

  if (step5._groups[0][3].className === 'step5 is-active') {
     readyVoteTrans()
	}

  if (step5._groups[0][4].className === 'step5 is-active') {
     Conclusion()
	}



  //
  // if (step5._groups[0][2].className === 'step5 is-active') {
  //     readyVote()
	// }



	// // update graphic1 based on step 3
	// if (step1._groups[0][2].className === 'step1 is-active') {
	// 	changeAgain()
  //
	// }
  //
	// // Step 4
	// if (step1._groups[0][3].className === 'step1 is-active') {
	// 	changeAgainAgain()
  //
	// }
  //
	// //Step5
  //
	// if (step1._groups[0][4].className === 'step1 is-active') {
	// 	// changeAgainAgain()
  //   nonMetroFuncSmall()
  //   changeEnd()
	// }

  // if (step1._groups[0][5].className === 'step1 is-active') {
  //   changeEnd()
  // }

}

function handleContainerEnter2(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic.classed('is-fixed', true);
	graphic.classed('is-bottom', false);

  graphic2.classed('is-fixed', true);
	graphic2.classed('is-bottom', false);

  graphic3.classed('is-fixed', true);
	graphic3.classed('is-bottom', false);

  graphic4.classed('is-fixed', true);
	graphic4.classed('is-bottom', false);

  graphic5.classed('is-fixed', true);
	graphic5.classed('is-bottom', false);
}

function handleContainerExit2(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic.classed('is-fixed', false);
	graphic.classed('is-bottom', response.direction === 'down');

  graphic2.classed('is-fixed', false);
	graphic2.classed('is-bottom', response.direction === 'down');

  graphic3.classed('is-fixed', false);
	graphic3.classed('is-bottom', response.direction === 'down');

  graphic4.classed('is-fixed', false);
	graphic4.classed('is-bottom', response.direction === 'down');

  graphic5.classed('is-fixed', false);
	graphic5.classed('is-bottom', response.direction === 'down');
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
		// graphic2: '.scroll__figure2',
		// text: '.scroll__text2',
		step: '.scroll__text2 .step2',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);


scroller3.setup({
  // container: '#flipped-scroll',
  // graphic2: '.scroll__figure2',
  // text: '.scroll__text2',
  step: '.scroll__text3 .step3',
  offset: 0.75,
  debug: false
}).onStepEnter(handleStepEnter2)
// .OnStepExit(handleStepExit2)
.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

scroller4.setup({
  // container: '#flipped-scroll',
  // graphic2: '.scroll__figure2',
  // text: '.scroll__text2',
  step: '.scroll__text4 .step4',
  offset: 0.75,
  debug: false
}).onStepEnter(handleStepEnter2)
// .OnStepExit(handleStepExit2)
.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

scroller5.setup({
  // container: '#flipped-scroll',
  // graphic2: '.scroll__figure2',
  // text: '.scroll__text2',
  step: '.scroll__text5 .step5',
  offset: 0.75,
  debug: false
}).onStepEnter(handleStepEnter2)
// .OnStepExit(handleStepExit2)
.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);



}

init();
function readyVoteBlank() {

  svgVote.selectAll(".statesVote")
      .transition()
      .duration(50)
      .selectAll("path")
      .attr("fill", function(d) { return ("#FFFFFF")})
      .attr("d", path)


    // svgVote.exit()
    //     .transition().duration(200)
    //       .remove();

}

}
