"use strict";
// https://tc39.github.io/ecma262/#sec-array.prototype.find
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


$("#knivesMovie").hover(function(){
  $("#knivesMovie").css('cursor','pointer')

  $("#knivesTitle").css("color","#21D279");

});
$("#knivesMovie").mouseout(function(){

  $("#knivesTitle").css("color","#000000");

});
$("#knivesTitle").hover(function(){

  $("#knivesTitle").css("color","#21D279");

});
$("#knivesImage").hover(function(){

  $("#knivesTitle").css("color","#21D279");

});


$("#farewellMovie").hover(function(){
  $("#farewellMovie").css('cursor','pointer')

  $("#farewellTitle").css("color","#21D279");

});
$("#farewellMovie").mouseout(function(){

  $("#farewellTitle").css("color","#000000");

});
$("#farewellTitle").hover(function(){

  $("#farewellTitle").css("color","#21D279");

});
$("#farewellImage").hover(function(){

  $("#farewellTitle").css("color","#21D279");

});

$("#fordMovie").hover(function(){
  $("#fordMovie").css('cursor','pointer')

  $("#fordTitle").css("color","#21D279");

});
$("#fordMovie").mouseout(function(){

  $("#fordTitle").css("color","#000000");

});
$("#fordTitle").hover(function(){

  $("#fordTitle").css("color","#21D279");

});
$("#fordImage").hover(function(){

  $("#fordTitle").css("color","#21D279");

});

//New
$("#irishmanMovie").hover(function(){
  $("#irishmanMovie").css('cursor','pointer')

  $("#irishmanTitle").css("color","#21D279");
});

$("#irishmanMovie").mouseout(function(){
  $("#irishmanTitle").css("color","#000000");
});

$("#irishmanTitle").hover(function(){
  $("#irishmanTitle").css("color","#21D279");
});

$("#irishmanImage").hover(function(){
  $("#irishmanTitle").css("color","#21D279");
});

//New
$("#lateMovie").hover(function(){
  $("#lateMovie").css('cursor','pointer')

  $("#lateTitle").css("color","#21D279");
});

$("#lateMovie").mouseout(function(){
  $("#lateTitle").css("color","#000000");
});

$("#lateTitle").hover(function(){
  $("#lateTitle").css("color","#21D279");
});

$("#lateImage").hover(function(){
  $("#lateTitle").css("color","#21D279");
});

//New
$("#sickMovie").hover(function(){
  $("#sickMovie").css('cursor','pointer')

  $("#sickTitle").css("color","#21D279");
});

$("#sickMovie").mouseout(function(){
  $("#sickTitle").css("color","#000000");
});

$("#sickTitle").hover(function(){
  $("#sickTitle").css("color","#21D279");
});

$("#sickImage").hover(function(){
  $("#sickTitle").css("color","#21D279");
});

//New
$("#loganMovie").hover(function(){
  $("#loganMovie").css('cursor','pointer')

  $("#loganTitle").css("color","#21D279");
});

$("#loganMovie").mouseout(function(){
  $("#loganTitle").css("color","#000000");
});

$("#loganTitle").hover(function(){
  $("#loganTitle").css("color","#21D279");
});

$("#loganImage").hover(function(){
  $("#loganTitle").css("color","#21D279");
});

//New
$("#brooklynMovie").hover(function(){
  $("#brooklynMovie").css('cursor','pointer')

  $("#brooklynTitle").css("color","#21D279");
});

$("#brooklynMovie").mouseout(function(){
  $("#brooklynTitle").css("color","#000000");
});

$("#brooklynTitle").hover(function(){
  $("#brooklynTitle").css("color","#21D279");
});

$("#brooklynImage").hover(function(){
  $("#brooklynTitle").css("color","#21D279");
});

//Stroke of dma




// Start New JQuery

$("#knivesMovie").click(function(){
      toggle="knivesFunction"
      $("#movieTitle").text("Knives Out").css("visibility","visible");
      $("#movieInsight").html('<p>The star-studded whodunit, “Knives Out” (2019), appealed broadly to mystery lovers all over the country. Garnering interest from less populous states like Oregon and Idaho (with a particularly ardent subset around Traverse City, MI), “Knives Out” follows immigrant heroine Marta Cabrera (Ana de Armas) who works for an ultra-rich family as a nurse and caregiver. While the film jokingly digs at her employers who never bother to learn where she’s from—Brazil, Ecuador, Paraguay, and Uruguay are all offhandedly referenced by different members of the family—Marta, her sister Alicia (Shyrley Rodriguez), and their undocumented mother (Marlene Forte) are all played by actors of Cuban descent.</p><p>Learn more about this demographic in our report, <a herf="http://research.newamericaneconomy.org/wp-content/uploads/sites/2/2017/12/Hispanic_V5.pdf">“Power of the Purse: How Hispanics Contribute to the U.S. Economy."</a></p>');
      ready()
});
 $("#farewellMovie").click(function(){
      toggle="farewellFunction"
      $("#movieTitle").text("The Farewell").css("visibility","visible");
      $("#movieInsight").html('<p>Given that it centers on the Chinese immigrant experience, it may not come as a surprise that “The Farewell” (2019) found footholds in metro areas with significant numbers of Asian residents. The Bay Area repped hard, as did Los Angeles, Austin, Texas, and New York City. The area around Boston, where the Beijing-born Wang attended college, also registered notable interest.</p><p>Learn more about this demographic in our research brief, <a href ="https://research.newamericaneconomy.org/report/nae-chinese-americans/">“The Transcontinental Railroad at 150: The Contributions of Chinese Immigrants and Chinese Americans.”</a></p>');
      ready()
});
$("#lateMovie").click(function(){
      toggle="lateFunction"
      $("#movieTitle").text("Late Night").css("visibility","visible");;
      $("#movieInsight").html('<p>Director Nisha Ganatra’s “Late Night” (2019) stars Mindy Kaling as Molly Patel, a child of Indian immigrants who tries to make it as a comedy writer in late night television. At first blush, searches for the film might seem oddly concentrated around Burlington, VT. But local pride comes out swinging, as Kaling’s alma mater of Dartmouth College lands squarely within the area.</p><p>Learn more about this demographic in our report, <a herf="http://research.newamericaneconomy.org/wp-content/uploads/2017/10/NAE-AAPI-v14.pdf">“Power of the Purse: Asian-Americans and Pacific Islanders in America.”</a></p>');
      ready()
});

$("#irishmanMovie").click(function(){
      toggle="irishmanFunction"
      $("#movieTitle").text("The Irishman").css("visibility","visible");;
      $("#movieInsight").html('<p>Martin Scorsese’s “The Irishman” (2019) stacks its gangster drama with historical figures such as Russell Bufalino (Joe Pesci), the Sicilian-born leader of the Northeastern Pennsylvania crime family. Accordingly, interest clusters around where the story takes place—in New York and Pennsylvania. The number one area searching for trailers of “The Irishman”? Scranton, PA, where Bufalino was arrested by the FBI in 1973.</p><p>Learn more about today’s immigrants in the Scranton metro area with our interactive tool, <a href="https://www.newamericaneconomy.org/city/scranton/">Map the Impact.</a></p>');
      ready()
});

$("#brooklynMovie").click(function(){
      toggle="brooklynFunction"
      $("#movieTitle").text("Brooklyn").css("visibility","visible");;
      $("#movieInsight").html('<p>Saoirse Ronan’s breakout role in “Brooklyn” (2015) cast the Irish American actor as Eilis Lace, a young immigrant who navigates New York City in the 1950s. The classic “coming to America” tale resonated in urban areas, many with rich histories of immigration themselves. Traditional gateways such as Boston, New York City, the San Francisco Bay Area, or San Diego all fall within the Top 10 metro areas searching for the film trailer in 2015-16.</p><p>Learn more about today’s immigrants in New York City with our interactive tool, <a href="https://www.newamericaneconomy.org/city/new-york/"> Map the Impact.</a></p>');
      ready()
});

$("#sickMovie").click(function(){
      toggle="sickFunction"
      $("#movieTitle").text("The Big Sick").css("visibility","visible");;
      $("#movieInsight").html('<p>“The Big Sick” (2017) follows Kumail Nanjiani, a Pakistani immigrant who plays himself in a romantic comedy based loosely on reality. Co-written with his wife, Emily V. Gordon (Zoe Kazan), the movie attracted widespread curiosity, with Top 5 metro areas hailing coast to coast, from Burlington, VT to Palm Springs, CA, plus three Midwest regions in between (Missoula, MT; Green Bay, WI; and Champaign, IL).</p><p>See how this region has been excelling at immigrant integration in our blog post, <a href="https://research.newamericaneconomy.org/report/nae-cities-index-2019/">“Midwestern Cities Take the Lead in Welcoming Immigrants.”</a></p>');
      ready()
});

$("#fordMovie").click(function(){
      toggle="fordFunction"
      $("#movieInsight").html('<p>“Ford v Ferrari” (2019) recounts the true story of Ford Motor Company’s push to win Le Mans in 1966. It celebrates auto designer Carroll Shelby (Matt Damon) and race car driver Ken Miles (Christian Bale), the latter of whom immigrated to Los Angeles from England in 1952. Austin, TX topped the list for the film, possibly reflecting  Shelby’s legacy as a lifelong Texan. And in Utah, the original cars that Miles actually drove at Daytona and LeMans—both races that feature prominently in “Ford v Ferrari”—were displayed at the Megaplex 20 near Salt Lake City during the film’s theater run.</p><p>Learn more about immigrant Angelenos in our report, <a href="http://www.newamericaneconomy.org/wp-content/uploads/2017/03/LA.pdf">“New Americans in Los Angeles."</a></p>');
      $("#movieTitle").text("Ford v Ferrari").css("visibility","visible");;
      ready()

});

$("#loganMovie").click(function(){
      toggle="loganFunction"
      $("#movieInsight").html('<p>In a reversal from urban crowd-pleasers like “Brooklyn” (2015) or “The Farewell” (2019), audiences searching for Marvel’s "Logan" (2017) hailed from less populous regions. The Top 5 metro areas landed in states like Wyoming, Montana, and West Virginia, all showing interest in an action romp that follows Wolverine (Hugh Jackman) on his journey to protect a young Mexican hero-in-the-making as she and her peers flee to America for safety and asylum.</p><p>Learn more about the contributions of refugees in our report, <a href="http://www.newamericaneconomy.org/wp-content/uploads/2017/06/NAE_Refugees_V5.pdf">“From Struggle to Resilience: The Economic Impact of Refugees in America.”</a></p>');
      $("#movieTitle").text("Logan").css("visibility","visible");;
      ready()

});

if (window.innerWidth > 900) {

  var svgMap = d3.select(".moviesvgmap").append("svg")
  .attr("width", window.innerWidth*.6)
  .attr('height', window.innerHeight),
      width = +svgMap.attr("width"),
      height = +svgMap.attr("height");
    // width = window.innerWidth*.6,
    // height = window.innerHeight*.7;
    var projection = d3.geoIdentity().translate([width*.6, height*.5]).reflectY(true).scale(12)
} else if (window.innerWidth < 480) {

  var svgMap = d3.select(".moviesvgmap").append("svg")
  .attr("width", window.innerWidth)
  .attr('height', window.innerHeight),
      width = +svgMap.attr("width"),
      height = +svgMap.attr("height");
    // width = window.innerWidth*.6,
    // height = window.innerHeight*.7;
    var projection = d3.geoIdentity().translate([width*.52, height*.26]).reflectY(true).scale(width/68.5*(height/700))
} 
else {
  var svgMap = d3.select(".moviesvgmap").append("svg")
  .attr("width", window.innerWidth*.91)
  .attr('height', window.innerHeight*.8),
      width = +svgMap.attr("width"),
      height = +svgMap.attr("height");
    // width = window.innerWidth*.6,
    // height = window.innerHeight*.7;
    var projection = d3.geoIdentity().translate([width*.4, height*.35]).reflectY(true).scale(6)
}

var brooklynData = d3.map();
var farewellData = d3.map();
var irishmanData = d3.map();
var knivesData = d3.map();
var lateData = d3.map();
var fordData = d3.map();
var sickData = d3.map();
// var nightData = d3.map();
var loganData = d3.map();

// console.log(brooklynData);
// console.log(farewellData);
// console.log(irishmanData);
// console.log(knivesData);
// console.log(lateData);
// console.log(fordData);
// console.log(sickData);
// console.log(nightData);
// console.log(loganData);

var toggle = "free"

var divTool = d3.select(".moviesvgmap").append("div")
    .attr("class", "tooltip2")
    .style("background", "white")
    .style("position", "absolute")
    .style("z-index", 999);


// var projection = d3.geoIdentity().translate([width*.6, height*.57]).reflectY(true).scale(14)


var path = d3.geoPath(projection)


var x = d3.scaleLinear()
    .domain([0,100])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
    .domain(d3.range(100))
    .range(["#FFFFFF", "#FDFDFE", "#FBFBFE", "#FAFAFE", "#F8F8FE", "#F7F7FE", "#F5F5FE", "#F3F3FE", "#F2F2FD", "#F0F0FD", "#EFEFFD", "#EDEDFD", "#EBECFD", "#EAEAFD", "#E8E8FD", "#E7E7FC", "#E5E5FC", "#E4E4FC", "#E2E2FC", "#E0E1FC", "#DFDFFC", "#DDDDFC", "#DCDCFB", "#DADAFB", "#D8D9FB", "#D7D7FB", "#D5D6FB", "#D4D4FB", "#D2D2FB", "#D1D1FA", "#CFCFFA", "#CDCEFA", "#CCCCFA", "#CACBFA", "#C9C9FA", "#C7C7FA", "#C5C6F9", "#C4C4F9", "#C2C3F9", "#C1C1F9", "#BFBFF9", "#BDBEF9", "#BCBCF9", "#BABBF8", "#B9B9F8", "#B7B8F8", "#B6B6F8", "#B4B4F8", "#B2B3F8", "#B1B1F8", "#AFB0F7", "#AEAEF7", "#ACADF7", "#AAABF7", "#A9A9F7", "#A7A8F7", "#A6A6F7", "#A4A5F6", "#A3A3F6", "#A1A2F6", "#9FA0F6", "#9E9EF6", "#9C9DF6", "#9B9BF6", "#999AF5", "#9798F5", "#9697F5", "#9495F5", "#9393F5", "#9192F5", "#8F90F5", "#8E8FF4", "#8C8DF4", "#8B8BF4", "#898AF4", "#8888F4", "#8687F4", "#8485F4", "#8384F3", "#8182F3", "#8080F3", "#7E7FF3", "#7C7DF3", "#7B7CF3", "#797AF3", "#7879F2", "#7677F2", "#7575F2", "#7374F2", "#7172F2", "#7071F2", "#6E6FF2", "#6D6EF1", "#6B6CF1", "#696AF1", "#6869F1", "#6667F1", "#6566F1", "#6364F1", "#6263F1"])


var promises = [
  // d3.json("nielsentopo.json"),
  d3.json("assets/nielsen-mkt-mapNEW.json"),
  d3.csv("assets/searchDataGTrendsFeb3.csv", function(d) {
    brooklynData.set(d.DMA, +d.brooklyn);
    farewellData.set(d.DMA, +d.farewell);
    irishmanData.set(d.DMA, +d.irishman);
    knivesData.set(d.DMA, +d.knives);
    lateData.set(d.DMA, +d.late);
    fordData.set(d.DMA, +d.ford);
    sickData.set(d.DMA, +d.sick);
    loganData.set(d.DMA, +d.logan);
    })
]





Promise.all(promises).then(ready)

function ready(dma) {


  if (toggle=="fordFunction") {
  fordFunction();
}
else if (toggle=="knivesFunction") {
  knivesFunction();
}
else if (toggle=="farewellFunction") {
  farewellFunction();
}
else if (toggle=="lateFunction") {
  lateFunction();
}
else if (toggle=="irishmanFunction") {
  irishmanFunction();
}
else if (toggle=="brooklynFunction") {
  brooklynFunction();
}
else if (toggle=="sickFunction") {
  sickFunction();
}
else if (toggle=="loganFunction") {
  loganFunction();
}

var d = dma

  svgMap.append("g")
    .attr("class", "DMA")
    .selectAll("path")
    .data(function(d) { if (toggle=="free") {return (dma[0].features)} else {return promises}})
    .attr("class","dma")
    .enter().append("path")
    .attr("d", path)
    // .attr("fill","#D2BFF2") grey/blue
    // .attr("fill","#C0EAF1") light blue
    	.attr("fill","#CCCCFA")
    .on("mouseover", handleMouseOverTool)
    .on("mouseout", handleMouseOutTool);
    // .on("mouseover", handleMouseOverTool)
    // .on("mouseout", handleMouseOutTool);
    //
    // .attr("fill", function(d) {
    //     return color(shareImm.get(d.properties.dma_name));
    //     })





function fordFunction (){
  d3.select('.DMA')
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(fordData.get(d.properties.dma_name));
         })

}

function knivesFunction (){
  d3.select(".DMA")
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(knivesData.get(d.properties.dma_name));
         })

}

function irishmanFunction (){
  d3.select(".DMA")
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(irishmanData.get(d.properties.dma_name));
         })
}

function loganFunction (){
  d3.select(".DMA")
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(loganData.get(d.properties.dma_name));
         })
}

function farewellFunction (){
  d3.select(".DMA")
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(farewellData.get(d.properties.dma_name));
         })
}

function lateFunction (){
  d3.select(".DMA")
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(lateData.get(d.properties.dma_name));
         })
}

function brooklynFunction (){
  d3.select(".DMA")
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(brooklynData.get(d.properties.dma_name));
         })
}

function sickFunction (){
  d3.select(".DMA")
        .transition()
        .duration(500)
        .selectAll("path")
        .attr("fill", function(d) {
          return color(sickData.get(d.properties.dma_name));
         })
}




function handleMouseOverTool(d) {

            var xMouse2 = d3.mouse(this)[0]-width*.1
            var yMouse2 = d3.mouse(this)[1]-height*.1

            if (window.innerWidth <600) {
              xMouse2 = d3.mouse(this)[0]-width*.3
              yMouse2 = d3.mouse(this)[1]-height*.12
            }

            d3.select(this)
              .attr("fill", "#FFDB20")





             divTool.html(function() {
               if (toggle=="sickFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ sickData.get(d.properties.dma_name)+"</p>"}
               else if (toggle=="loganFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ loganData.get(d.properties.dma_name)+"</p>"}
               else if (toggle=="brooklynFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ brooklynData.get(d.properties.dma_name)+"</p>"}
               else if (toggle=="farewellFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ farewellData.get(d.properties.dma_name)+"</p>"}
               else if (toggle=="irishmanFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ irishmanData.get(d.properties.dma_name)+"</p>"}
               else if (toggle=="knivesFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ knivesData.get(d.properties.dma_name)+"</p>"}
               else if (toggle=="lateFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ lateData.get(d.properties.dma_name)+"</p>"}
               else if (toggle=="fordFunction") {return "<p>Media Market: <b>"+d.properties.dma_name+"</b></br>Google Trend Score:  "+ fordData.get(d.properties.dma_name)+"</p>"}
               else {return "<p><p>Media Market: <b>"+d.properties.dma_name+"</b></br>click on movie title</p>"}

             })
              .style("left", xMouse2 + "px")
            	.style("top", yMouse2 + "px")
            	.style("visibility", 'visible')
              .attr("class", "tooltip2")
            	.attr("id", function() {return "dma" + d.properties.dma_name});

          }

function handleMouseOutTool(d) {

    d3.select(this)
      .attr("fill", function(d) {
        if (toggle=="sickFunction") {return color(sickData.get(d.properties.dma_name))}
        else if (toggle=="loganFunction") {return color(loganData.get(d.properties.dma_name))}
        else if (toggle=="brooklynFunction") {return color(brooklynData.get(d.properties.dma_name))}
        else if (toggle=="farewellFunction") {return color(farewellData.get(d.properties.dma_name))}
        else if (toggle=="irishmanFunction") {return color(irishmanData.get(d.properties.dma_name))}
        else if (toggle=="knivesFunction") {return color(knivesData.get(d.properties.dma_name))}
        else if (toggle=="lateFunction") {return color(lateData.get(d.properties.dma_name))}
        else if (toggle=="fordFunction") {return color(fordData.get(d.properties.dma_name))}
        else {return "#CCCCFA"}

            })



            d3.select(".tooltip2").style("visibility", 'hidden');


          }

}






// kick things off
