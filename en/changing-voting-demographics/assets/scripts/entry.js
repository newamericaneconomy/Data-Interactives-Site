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

//2
var container2 = d3.select('#scatter-scroll');
var graphic2 = container2.select('.scroll__figure2');
var chart2 = graphic2.select('.figure__chart2');
var text2 = container2.select('.scroll__text2');
var step2 = text2.selectAll('.step2');

// initialize the scrollama
var scroller2 = scrollama();

var simulation;

var svg2 = d3.select(".scroll__figure2")
		  .append("svg")
		  .attr("id", "svg2");

var defs = svg2.append("defs")

// Republican Hash
var pattern = defs.append("pattern")
          .attr("id", "hashRep")
          .attr("width", "0.1")
          .attr("height", "8")
          .attr("patternUnits", "userSpaceOnUse")
          .attr("patternTransform", "rotate(135)");
    pattern.append("rect")
          .attr("width", "10")
          .attr("height", "10")
          .attr("fill", "#ed2828");
    pattern.append("path")
      .attr("d", "M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5")
      .attr("stroke-width", "4")
      .attr("stroke", "rgba(255,255,255,0.8)")
      .attr("stroke-linecap", "square");

//Democrat Hash
var pattern = defs.append("pattern")
          .attr("id", "hashDem")
          .attr("width", "0.1")
          .attr("height", "8")
          .attr("patternUnits", "userSpaceOnUse")
          .attr("patternTransform", "rotate(135)");
    pattern.append("rect")
          .attr("width", "10")
          .attr("height", "10")
          .attr("fill", "#2873ed");
    pattern.append("path")
      .attr("d", "M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5")
      .attr("stroke-width", "4")
      .attr("stroke", "rgba(255,255,255,0.8)")
      .attr("stroke-linecap", "square");

var tooltip = d3.select(".scroll__figure2").append("div").attr("class", "tooltip").style("background", "#fff").style("position", "absolute").style("z-index", "999").style("visibility", "hidden");

var flippedData = d3.csv('assets/mov_2018_dat.csv');

	Promise.all([flippedData]).then(change);

	function change(data) {
	  var flipDat = data['0'];
	  var col = [...new Set(flipDat.map(d => d.col))];
	  var party = [...new Set(flipDat.map(d => d.party))];
	  var row = [...new Set(flipDat.map(d => d.row))];
	  var cluster2 = [...new Set(flipDat.map(d => d.cluster2))];
	  var widthDiv;
	  var rad;
	  var widthSplit;

	  var commas = d3.format(",");

	  var margin = 50;
	  var marginTop = 100;

	  if (width > 800) {
	    widthDiv = 2;
	    rad = width*0.01145;
	    widthSplit = width/2;
	  } else {
	    widthDiv = 1.2;
	    rad = width*0.02145;
	    widthSplit = width/1.15;
	  }

	var colScale = d3.scalePoint()
		.range([margin*1.25, width/widthDiv])
		.domain(col)
		.padding(0.5);

	var rowScale = d3.scalePoint()
		.range([marginTop, height/1.5])
		.domain(row)
		.padding(0.5);

	var splitScale = d3.scalePoint()
		.range([margin, widthSplit])
		.domain(cluster2)
		.padding(0.5);

	var xColForce = d3.forceX(d => colScale(d.col));
	var yRowForce = d3.forceY(d => rowScale(d.row)); 

	var chargeForce = d3.forceManyBody().strength(-10);
	var centerXForce = d3.forceX(d => splitScale(d.cluster2));
	var centerYForce = d3.forceY(height/3);
	var forceCollide = d3.forceCollide()
	  .strength(1)
	  .radius(rad+3);

	simulation = d3.forceSimulation()
	.force('charge', chargeForce)
	.force('collide', forceCollide)
	.force('x', centerXForce)
    .force('y', centerYForce);

	simulation.force('x', xColForce);
	  simulation.alpha(5);
	  
	simulation.force('y', yRowForce);
	  simulation.alpha(7);

	var node = svg2.selectAll('circle')
    .data(flipDat)
    .enter().append('circle')
    .attr('r', rad)
    .attr('fill', function(d) {
      //Start with all R and D colors before they flipped
      if (d.party == "R") {
        return "#2873ed";
      } else {
        return "#ed2828";
      }
    })
    .on("mouseover", function (d) {
        var val = d.id;
        var mov18 = d.mov_2018;
        var fb18 = d.growth_fb;
        var fb24 = d.growth_24;

        tooltip.html("");
        tooltip.style("visibility", "visible").zIndex = 999;

        tooltip.append("h3").style("color", "black").text(val);

        tooltip.append("div").style("color", "black").text("Margin of Victory 2018: " + commas(mov18)).zIndex = 999;
        tooltip.append("div").style("color", "black").text("New Immigrant Voters by 2018: " + commas(fb18)).zindex = 999;
        tooltip.append("div").attr("class", "tooltip_pad_bot").style("color", "black").text("New Immigrant Voters by 2024: " + commas(fb24));
      })
    .on("mousemove", function () {
    	if (width > 1200) {
	      return tooltip.style("top", d3.event.pageY - pageYOffset + "px").style("left", d3.event.pageX - 600 + "px");
	    } else {
	    	return tooltip.style("top", d3.event.pageY - pageYOffset + "px").style("left", d3.event.pageX - 400 + "px");
	    }
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
    });

    simulation.nodes(flipDat)
    .on('tick', () => {
        node.attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });

    //Add legend
    var yearLegend = svg2.append('g')
    	.attr('transform', 'translate(' + 20 + ',' + margin/2 +')')
    	.attr('class', 'yearLegend');

    yearLegend.append('text')
    	.text("2018")
    	.attr('y', "16px");

    var demLegend = svg2.append('g')
    	.attr('transform', 'translate(' + margin*2.25 + ',' + margin/2 +')')
    	.attr('id', 'demLegend');

    demLegend.append('text')
    	.text("DEMOCRAT")
    	.attr('x', 8)
    	.attr('y', "-5px");
    demLegend.append('rect')
    	.attr('fill', "#2873ed")
    	.attr('width', 100)
    	.attr('height', 15);

    var repLegend = svg2.append('g')
    	.attr('transform', 'translate(' + margin*4.3 + ',' + margin/2 +')')
    	.attr('id', 'demLegend');

    repLegend.append('text')
    	.text("REPUBLICAN")
    	.attr('x', 4)
    	.attr('y', "-5px");
    repLegend.append('rect')
    	.attr('fill', "#ed2828")
    	.attr('width', 100)
    	.attr('height', 15);

    //Add branding and notes about data
    var naeMini = svg2.append('g')
    	.attr('transform', 'translate(' + margin + ',' + height/1.4 +')')
    	.attr('id', 'naeMini');

    if (width > 1200) {
    	naeMini.append('text')
	    	.text("*Hash marks denote where the growth of the foreign born electorate exceeded")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 12 +')scale(' + width / 1870 + ')')
	    	.attr('class', "smallNote")
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append('text')
	    	.text("the 2018 margin of victory.")
	    	.attr('transform', 'translate(' + margin*1.5 + ',' + 32 +')scale(' + width / 1870 + ')')
	    	.attr('class', "smallNote")
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append('text')
	    	.text("SOURCE: American Fact Finder. All research and predictions were done by New American Economy.")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 56 +')scale(' + width / 1838 + ')')
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append("svg:image")
	    	.attr('xlink:href', "assets/condensed_lockup_grey.png")
	    	.attr('transform', 'translate(' + 0 + ',' + -3 +')')
	    	.attr('width', 60);

	} else if (width < 1200 && width > 800) {
		naeMini.append('text')
	    	.text("*Hash marks denote where the growth of the foreign")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 12 +')scale(' + width / 1250 + ')')
	    	.attr('class', "smallNote")
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append('text')
	    	.text("born electorate exceeded the 2018 margin of victory.")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 32 +')scale(' + width / 1250 + ')')
	    	.attr('class', "smallNote")
	    	.style('fill', 'rgb(118, 118, 118');

		naeMini.append('text')
	    	.text("SOURCE: American Fact Finder. All research and predictions")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 52 +')scale(' + width / 1138 + ')')
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append('text')
	    	.text("were done by New American Economy.")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 72 +')scale(' + width / 1138 + ')')
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append("svg:image")
	    	.attr('xlink:href', "assets/condensed_lockup_grey.png")
	    	.attr('transform', 'translate(' + 13 + ',' + 3 +')')
	    	.attr('width', 40);
	} else {
	    naeMini.append('text')
	    	.text("*Hash marks denote where the growth of the foreign")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 12 +')scale(' + width / 840 + ')')
	    	.attr('class', "smallNote")
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append('text')
	    	.text("born electorate exceeded the 2018 margin of victory.")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 32 +')scale(' + width / 840 + ')')
	    	.attr('class', "smallNote")
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append('text')
	    	.text("SOURCE: American Fact Finder. All research and")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 52 +')scale(' + width / 638 + ')')
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append('text')
	    	.text("predictions were done by New American Economy.")
	    	.attr('transform', 'translate(' + margin*1.35 + ',' + 72 +')scale(' + width / 638 + ')')
	    	.style('fill', 'rgb(118, 118, 118');

	    naeMini.append("svg:image")
	    	.attr('xlink:href', "assets/condensed_lockup_grey.png")
	    	.attr('transform', 'translate(' + 13 + ',' + 3 +')')
	    	.attr('width', 40);
	}

//2
function handleResize2() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step2.style('height', stepHeight2 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth2 = d3.select('body').node().offsetWidth;

	graphic2.style('width', bodyWidth2 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin2 = 32;
	var textWidth2 = text2.node().offsetWidth;
	var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

	chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight2 / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller2.resize();
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
		svg2.selectAll('circle')
		.transition()
			.delay(600)
			.duration(750)
			.attr("fill", function(d) {
				if (d.party == "R") {
			        return "#ed2828";
			      } else {
			        return "#2873ed";
			      }
		});
	}

	// // update graphic1 based on step 2
	if (step2._groups[0][1].className === 'step2 is-active') {
		svg2.selectAll("g.yearLegend").remove();

		yearLegend = svg2.append('g')
	    	.attr('transform', 'translate(' + 20 + ',' + margin/2 +')')
	    	.attr('class', 'yearLegend');

	    yearLegend.append('text')
	    	.text("2018")
	    	.attr('y', "16px");

		svg2.selectAll('circle')
			.attr("fill", function(d) {
				if (d.make_hash === "1" && d.party === "D") {
			        return "url(#hashDem)";
			      } else if (d.make_hash === "1" && d.party === "R") {
			        return "url(#hashRep";
			      } else if (d.make_hash !== "1" && d.party === "D") {
			      	return "#2873ed";
			      } else if (d.make_hash !== "1" && d.party === "R") {
			      	return "#ed2828";
			      }
		});
	}

	// // update graphic1 based on step 3
	if (step2._groups[0][2].className === 'step2 is-active') {
		svg2.selectAll('circle')
			.attr("fill", function(d) {
				if ((d.make_hash === "1" || d.make_hash === "2") && d.party === "D") {
			        return "url(#hashDem)";
			      } else if ((d.make_hash === "1" || d.make_hash === "2") && d.party === "R") {
			        return "url(#hashRep";
			      } else if ((d.make_hash !== "1" || d.make_hash !== "2") && d.party === "D") {
			      	return "#2873ed";
			      } else if ((d.make_hash !== "1" || d.make_hash !== "2") && d.party === "R") {
			      	return "#ed2828";
			      }
		});

		svg2.selectAll("g.yearLegend").remove();

		yearLegend = svg2.append('g')
	    	.attr('transform', 'translate(' + 20 + ',' + margin/2 +')')
	    	.attr('class', 'yearLegend');

	    yearLegend.append('text')
	    	.text("2024")
	    	.attr('y', "16px");

	}

	// Step 4
	if (step2._groups[0][3].className === 'step2 is-active') {
		
		simulation
            .force('x', centerXForce)
            .force('y', centerYForce);

            simulation.alpha(1).restart();

        svg2.selectAll("g.clustLabels").remove();

        if (width > 800) {
	        var clustLabels = svg2.append('g')
		    	.attr('transform', 'translate(' + width/11.5 + ',' + height/10 +')')
		    	.attr('class', 'clustLabels');

		    clustLabels.append('text')
		    	.text("Foreign Born Electorate Grew")
		    	.attr('y', "16px")
		    	.style('fill', 'rgb(118, 118, 118');

		    clustLabels.append('text')
		    	.text("Foreign Born Electorate")
		    	.attr('transform', 'translate(' + width/4 + ',' + margin*0.8 +')')
		    	.attr('y', "16px")
		    	.style('fill', 'rgb(118, 118, 118');

		    clustLabels.append('text')
		    	.text("Did Not Grow")
		    	.attr('transform', 'translate(' + width/3.75 + ',' + margin*1.2 +')')
		    	.attr('y', "16px")
		    	.style('fill', 'rgb(118, 118, 118');
		} else {
			var clustLabels = svg2.append('g')
		    	.attr('transform', 'translate(' + width/8 + ',' + height/10 +')')
		    	.attr('class', 'clustLabels')
		    	.style('fill', 'rgb(118, 118, 118');

		    clustLabels.append('text')
		    	.text("Foreign Born Electorate Grew")
		    	.attr('y', "16px")
		    	.style('fill', 'rgb(118, 118, 118');

		    clustLabels.append('text')
		    	.text("Foreign Born Electorate")
		    	.attr('transform', 'translate(' + width/2.5 + ',' + margin*0.8 +')')
		    	.attr('y', "16px")
		    	.style('fill', 'rgb(118, 118, 118');

		    clustLabels.append('text')
		    	.text("Did Not Grow")
		    	.attr('transform', 'translate(' + width/2.5 + ',' + margin*1.1 +')')
		    	.attr('y', "16px")
		    	.style('fill', 'rgb(118, 118, 118');
		}

	}

		// clustStart("simulation.alpha(1).restart();");
		// simulation
  //           .force('x', centerXForce)
  //           .force('y', centerYForce);

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

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama

	scroller2.setup({
		// container: '#flipped-scroll',
		// graphic: '.scroll__figure2',
		// text: '.scroll__text2',
		step: '.scroll__text2 .step2',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter2)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);
}

// kick things off
init();
}