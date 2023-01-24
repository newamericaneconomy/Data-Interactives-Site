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
var formatPercent = d3.format(",.1%");
var formatPercentLeg = d3.format(",.0%");

var formatMoney = function(d) { return "$" + formatComma(d); }
var formatMill = function(d){return formatTenth(d/1000000)+ " M"}


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

var scroller1 = scrollama();
var scroller2 = scrollama();
var scroller3 = scrollama();
var scroller4 = scrollama();


var color = d3.scaleOrdinal().domain([0, 1]).range(['#87d9f7' ,'#407cca']);

var color2 = d3.scaleOrdinal().domain([0, 1]).range(['#e8eeee' ,'#7da6db']);

var _extends = Object.assign || function (target2) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target2[key] = source[key]; } } } return target2; };


var margin = {top: 0, right: 20, bottom: 50, left: 20},
    width = 1200,
    height = 600;


    var treemap = d3.treemap()
        .tile(d3.treemapDice)
        .size([width, height])
        .round(false)
        .paddingInner(1);

    var treemap2 = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([width, height])
        .round(false)
        .paddingInner(1);

    var treemap3 = d3.treemap()
        .tile(d3.treemapSquarify)
        .size([width, height])
        .round(false)
        .paddingInner(1);

        //
        // var div = d3.select("#svg4").append("div")
        //     .attr("class", "tooltip")
        //     .attr("id", "tooltipID")
        //     .style("opacity", 0)
        //     .style("background", "#fff")
        //     .style("position", "absolute")
        //     .style("z-index", "999")
        //     .style("visibility", "hidden");


        var svg4 = d3.select('#svg4')
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g");


              var dropdownButton = d3.select(".stateSelect")
                .append('select')
                var stateSelect = ["All States","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","IA","ID","IL","IN","KS","KY","LA","MA","MD","MI","MN","MO","NC","NE","NJ","NV","NY","OH","OK","OR","PA","RI","TN","TX","VA","WA","WI"]


                var state = "All States"

              // add the options to the button
              dropdownButton // Add a button
                .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
                .data(stateSelect)
                .enter()
                .append('option')
                .text(function (d) { return d; }) // text showed in the menu
                .attr("value", function (d) { return d; })
                // corresponding value returned by the button



// define the line

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin



var method = "sumByConstant"
var fader = function(color) { return d3.interpolateRgb(color, "#fff")(.5); },
    format = d3.format(",d");


// var topData =

d3.json("assets/fortune500_2022nae.json").then(function(data) {


  var immVar

   var root = d3.hierarchy(data)
        .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.Name + "." : "") + d.data.index; })
        // .sum(function(d){if (d.State==state){sumByConstant} else {return 0}})
        .sum(sumByConstant)
        // .sort(function(a, b) { return b.height - a.height || b.value - a.value; });
        // .sort(function(d){d.data.rank;})


// var mousemove= function() {
//
//
//                 // d3.select("#tooltip #heading")
//                 //   .text(d["demographics"]["Group"] + " - " + d["demographics"]["Group description"]);
//                 // d3.select("#tooltip #percentage")
//                 //   .text(d["demographics"]["Type description"] + "\n" + d["percentage"] + "%");
//                 // d3.select("#tooltip #revenue")
//                 //   .text("£" + d["revenue"].toFixed(0));
//               }




    treemap(root);

    var cell = svg4.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + 0 + ")"; });

    cell.append("rect")
        .attr("id", function(d) { return d.data.id; })
        .attr("width", function(d) {return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("fill", function(d) {return color(d.data.immigrant); })
        .on("mouseover", mouseOver)
        .on("mouseout", handleMouseOut);

    cell.append("clipPath")
        .attr("id", function(d) { return "clip-" + d.data.id; })
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.data.id; });

    cell.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
        .selectAll("tspan")
        .data(function(d) {
          return d.data.displayName.split(/(?=[A-Z][^A-Z][^A-Z])/g);
          })
        .enter()
        .append("tspan")
        .attr("x", 2)
        .attr("y", function(d, i) { return 13 + i * 10; })
        .text(function(d) { return d;})
        .style("fill", "#000")
        .style('font-size', ".7em")
        .attr('class', "boxText")
        .on("mouseover", mouseOver)
        .on("mouseout", handleMouseOut());


    d3.selectAll("input")
        .data([sumBySize, sumByCount, sumByConstant], function(d) { return d ? d.name : this.value; })
        .on("change", changed);




        function mouseOver (d,i) {

            var imm =d.data.immigrant;


            d3.select(this).attr(
              "fill", function(e) {return color2(imm)}
            );
              var xPosition = d3.event.pageX-100;
              var yPosition = d3.event.pageY-150;

              d3.select("#tooltip").classed("hidden", false);

              d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px");

              d3.select("#tooltip #tpTitle")
                .text(d.data.companyName)
                .attr('text-anchor', "start");

              d3.select("#tooltip #tpRev")
                .text("Revenue (Million): $" + format(d.data.Revenue2022))

              d3.select("#tooltip #tpEmpl")
                .text("Employees: " + format(d.data.Employees))

              d3.select("#tooltip #tpRank")
                .text('Rank: ' + d.data.rank)
              }


     function handleMouseOut() {

           d3.select("#tooltip").classed("hidden", true)

             d3.select(this).attr(
                 "fill", function(d) {return color(d.data.immigrant)}
               );

     }


    function updateState(myState) {
       state = myState

       return(state)
       // d3.select("#buttonDivs").node()
       //   .attr("visibility", "visible");

     }

     dropdownButton.on("change", function(d) {

       var selectedOption = d3.select(this).property("value")

       updateState(selectedOption)

       document.getElementById("radio-one").checked = true;
       document.getElementById("radio-two").checked = false;

       d3.select("input[value=\"sumBySize\"]")
             .property("checked", true)
             .dispatch("change");




   })

     // d3.selectAll("option")
     //     .data([sumBySize, sumByCount, sumByConstant], function(d) { return d ? d.name : this.value; })
     //     .on("change", changed2);

     if (method == "sumByConstant") {
       svg4.append('text')
           .text('43.8%')
           .attr("x", width*.22)
           .attr("y", height*.58)
           .attr('fill', "white")
           .attr('class', "percentText")
           .attr("text-anchor", "middle")
           // .style('font-size', "14em");

     }

     else {
     d3.selectAll(".percentText").remove()
   }


     function changed(sum) {
       // timeout.stop();
       d3.selectAll(".percentText").remove()

       if (typeof this.value == 'undefined') {

       method = "sumBySize"


       treemap3(root.sum(sum));
   }

         else if (this.value == "sumByCount" ) {

         method = "sumByCount"


         treemap3(root.sum(sum));

         cell.append("text")
         .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
         .selectAll("tspan")
         .data(function(d) {
           if (state == "All States")
             {return d.data.displayName.split(/(?=[A-Z][^A-Z][^A-Z])/g);}
           else
             {return d.data.companyName.split(/(?=[A-Z][^A-Z][^A-Z])/g);}
           })
         // .data(function(d) {
         //   return d.data.displayName.split(/(?=[A-Z][^A-Z][^A-Z])/g);
         //   })
         .enter()
         .append("tspan")
         .attr("x", 2)
         .attr("y", function(d, i) { return 13 + i * 10; })
         // .text(function(d) { if (d.immigrant==1) {return d;}});
         .text(function(d) { return d;})
         .style("fill", "#000")
         .style('font-size', ".7em")
         .attr('class', "boxText");
       }

       else {

         method = "sumBySize"

       treemap3(root.sum(sum));

       cell.append("text")
         .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
         .selectAll("tspan")
         .data(function(d) {
           if (state == "All States")
             {return d.data.displayName.split(/(?=[A-Z][^A-Z][^A-Z])/g);}
           else
             {return d.data.companyName.split(/(?=[A-Z][^A-Z][^A-Z])/g);}
           })
         // .data(function(d) {
         //   return d.data.displayName.split(/(?=[A-Z][^A-Z][^A-Z])/g);
         //   })
         .enter()
         .append("tspan")
         .attr("x", 2)
         .attr("y", function(d, i) { return 13 + i * 10; })
         // .text(function(d) { if (d.immigrant==1) {return d;}});
         .text(function(d) { return d;})
         .style("fill", '#000')
         .style('font-size', ".7em")
         .attr('class', "boxText");
       }

       cell.transition()
           .duration(500)
           .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
           .select("rect")
           .attr("width", function(d) {return d.x1 - d.x0;})
           .attr("height", function(d) {return d.y1 - d.y0; });


     }


   //This establishes when the user will select by number of employees or revenue.



   function sumByCount(d) {
     //   if (immigrant==1) {
     // return d.employees;
     //   }
     if (state == "All States") {
     return d.Employees;
   }
     else if (d.State == state){
     return d.Employees
     }

     else {
       return 0.00001}
   }

   function sumBySize(d) {
     // if (d.immigrant==1) {
     // return d.revenue2019;
     //   }
     if (state ==  "All States") {
     return d.Revenue2022;
   }
     else if (d.State == state){
     return d.Revenue2022
     }

     else {
       return 0.00001}
   }

   function sumByConstant(d) {

     if (d.State == state) {
     return d.Constant;
   }
     else {return 0.00001}
   }




///STOP



function handleResize2() {

	// 1. update height of step elements
	var stepHeight1 = Math.floor(window.innerHeight * 0.75);
  var stepHeight2 = Math.floor(window.innerHeight * 0.75);
  var stepHeight3 = Math.floor(window.innerHeight * 0.75);



	step1.style('height', stepHeight1 + 'px');
  step2.style('height', stepHeight2 + 'px');
  step3.style('height', stepHeight2 + 'px');


	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
  	graphic2.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
    graphic3.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');


	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

  var chartMargin2 = 32;
	var textWidth2 = text2.node().offsetWidth;
	var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

  var chartMargin3 = 32;
  var textWidth3 = text3.node().offsetWidth;
  var chartWidth3 = graphic3.node().offsetWidth - textWidth2 - chartMargin2;


  // var chartWidth2 = graphic2.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');
  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

  chart3.style('width', chartWidth3 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
  scroller2.resize();
  scroller3.resize();


}
// scrollama event handlers
function handleStepEnter2(response) {

	step1.classed('is-active', function (d, j) {
		return j === response.index;
	});



  if (step1._groups[0][0].className === 'step1 is-active' ) {

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

}


function handleStepEnter4(response) {


  step3.classed('is-active', function (d, j) {
    return j === response.index;
  });


    chart3.select('p').text(response.index + 1);


 if (step2._groups[0][0].className === 'step2 is-active' ){



  }


 if (step3._groups[0][1].className === 'step2 is-active'){



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

  scroller3.setup({
    // container: '#flipped-scroll',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.scroll__text3 .step3',
    offset: .95,
    debug: false
  }).onStepEnter(handleStepEnter4)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);




}




init();




})







// kick things off
