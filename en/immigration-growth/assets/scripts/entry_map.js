

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

var widthScreen = window.innerWidth*.5
var smallWidthScreen = window.innerWidth*.95
var heightScreen = window.innerHeight*.65
var widthScreen2 = window.innerWidth*.7
var smallWidthScreen2 = window.innerWidth*.95
var heightScreen2 = window.innerHeight*.94


if (widthScreen>=800) {widthScreen = window.innerWidth*.45}
else {widthScreen=widthScreen}

var projection = d3.geoAlbersUsa();

 var projectionLarge = d3.geoAlbersUsa();
var offset

if (window.innerWidth < 550) {offset = [smallWidthScreen, heightScreen]}
else if (window.innerWidth >= 1500) {offset = [widthScreen*.5, heightScreen/2]}
else {offset = [widthScreen*.6, heightScreen*.6]}

var svg2 = d3.select("#barSVG")
			// .append("svg")
		  // 	.attr("id", "svg2")

var svgP = d3.select("#plotSVG")
        			// .append("svg")
        		  // 	.attr("id", "svgPlot")

var margin

if (window.innerWidth < 550) {margin = {top: .15*heightScreen, right: .2*smallWidthScreen, bottom: .01*heightScreen, left: .05*smallWidthScreen}}
else {margin = {top: 70, right: 20, bottom: 50, left: 10}}


var width = +svg2.attr("width", window.innerWidth),
    height = +svg2.attr("height",  window.innerHeight),
    domainwidth = 700 - margin.left - margin.right,
    domainheight = 700 - margin.top - margin.bottom;

if (window.innerWidth < 550) {domainwidth = smallWidthScreen - margin.left - margin.right}

var svg3 = d3.select(".svgFun")
			.append("svg")
		  	.attr("id", "svg3")

var margin2
if (window.innerWidth < 550) {margin2 = {top: .1*heightScreen2, right: .05*smallWidthScreen2, bottom: .005*heightScreen2, left: .05*smallWidthScreen2}}
else {margin2 = {top: .1*heightScreen2, right: .01*widthScreen2, bottom: .1*heightScreen2, left: .1*widthScreen2}}



var width = +svg3.attr("width", window.innerWidth*.95),
    height = +svg3.attr("height",  window.innerHeight),
    domainwidth2 = widthScreen2 - margin2.left - margin2.right,
    domainheight2 = heightScreen2 - margin2.top - margin2.bottom;

if (window.innerWidth < 550) {domainwidth2 = smallWidthScreen2 - margin2.left - margin2.right}
if (window.innerWidth < 550) {width = +svg3.attr("width", window.innerWidth*.98)}

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

var codeList = ["Large central metro", "Large fringe metro", "Medium metro", "Small metro", "Micropolitan", "Non-core"]

var scroller1 = scrollama();
var scroller2 = scrollama();
var scroller3 = scrollama();

var simulation;

var defs = svg2.append("defs")


var divBar = d3.select(".scroll__figure1").append("div")
    .attr("class", "tooltip3")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

var div = d3.select(".scroll__figure2").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

var divTool = d3.select(".scroll__figure3").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

var g = svg2.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top*1.4 + ")");
var g2 = svg3.append("g")
    		.attr("transform", "translate(" + margin2.left*.3 + "," + margin2.top + ")");

var gP = svgP.append("g")
    		.attr("transform", "translate(" + (margin.left+50) + "," + margin.top + ")");

//D3 Magic.  It creates the x and y plots

var x = d3.scaleLinear()
    .domain([0,6])
    .range([30, 600]);

var y = d3.scaleLinear()
    .domain([0,6])
    .range([550,30]);


var xBar = d3.scaleBand()
  		.range([0, 675]);

var yBar = d3.scaleLinear()
  		.range([830, 535]);

var yBarPer = d3.scaleLinear()
  		.range([650, 135]);


var xNeg = d3.scaleLinear()
    .domain(padExtent([-6,0]))
    .range(padExtent([0, 600]));
var yNeg = d3.scaleLinear()
    .domain(padExtent([0,6]))
    .range(padExtent([550, 30]));


var xNegNeg = d3.scaleLinear()
    .domain(padExtent([-6,6]))
    .range([0, 600]);
var yNegNeg = d3.scaleLinear()
    .domain(padExtent([-4,0]))
    .range([480, 30]);

var xEND = d3.scaleLinear()
    .domain(padExtent([-6,6]))
    .range(padExtent([50, domainwidth2]));

var yEND = d3.scaleLinear()
    .domain(padExtent([-4,6]))
    .range(padExtent([domainheight2, 0]));

var xFULL = d3.scaleLinear()
    .domain(padExtent([-6,6]))
    .range(padExtent([0, 550]));
var yFULL = d3.scaleLinear()
    .domain(padExtent([-6,6]))
    .range(padExtent([550, 0]));

var xQUAD = d3.scaleLinear()
    .domain(padExtent([-6,6]))
    .range(padExtent([0, domainwidth]));
var yQUAD = d3.scaleLinear()
    .domain(padExtent([-7,6]))
    .range(padExtent([domainheight+150, 0]));

var radius = 3;

var color5 = d3.scaleOrdinal()
         .domain(["1.0", "2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"])
         .range(['#38387C', '#6063ED',"#87D8F7",'#f1bd03', "#f7844c",'#ff7150',"#A882CC",'#A882CC', '#696969','#f0ce22', '#F4F721' ]);

var color6 = d3.scaleOrdinal()
                  .domain([0, 1])
                  .range(["#87D8F7",'#38387C']);


function padExtent(e, p) {
  	if (p === undefined) p = 0;
  	return ([e[0] - p, e[1] + p]);
}

var formatValue = d3.format(".1s")


// autoComplete
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;

              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              countySelect(inp.value)
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/

/*initiate the autocomplete function on the "myInput" element, and pass along the counties array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), counties);

// END AUTO COMPLETE


var countyData
var stateData
var popData = d3.csv("assets/countyPop_2019.csv")
var circleData = d3.csv('assets/statePopData4.csv')

var wrapper = svg2.append('g')

var symTri = d3.symbol().type(d3.symbolTriangle).size(100)


var promise = [popData, circleData]


Promise.all(promise).then(function(data) {

    countyData = data[0]
    countyData.forEach(function(d) {
        d.difIntMig = +d.LogNoImm;
				d.intMig = +d.LogImm;
				// d.difIntMig = +d.DifferenceIntMigrationOverall;
				// d.intMig = +d.PopulationChangeMigrationInt;
				d.difIntMigReal = +d.OveralminusIntMig;
				d.intMigReal = +d.IntMigChange;
				d.color = d.colorGroup;
				d.state = d.State;
				d.countyName = d.Geography;
				d.stateFip = d.Statefip;
				d.id = d.countyID;
				d.lat = +d.Latitude;
				d.long = +d.Longitude;
				// d.test = [d.lat, d.long];
				d.totalPop=d.PopulationChange_y;
				d.countyListName = d.CountyName;
        d.code = d.codeThree;
    });

    stateData = data[1]
    stateData.forEach(function(d) {
				d.stateDom = +d.OveralminusIntMig;
        d.stateBirth = +d.BirthChange;
        d.stateDeath = +d.DeathChange;
        d.stateDomMig = +d.DomMigChange;
				d.stateInt = +d.IntMigChange;
        d.totalPop = +d.PopulationChange;
				d.colorState = d.colorGroup;
				d.st = d.STNAME;
				d.fip = d.STATE;
        d.abv = d.StateAbv;
        d.domPercent = d.domPercent;
        d.intPercent = d.intPercent;
        d.totalPercent = d.totalPercent;
    });


// stateData=stateData.filter(function(d,i){ return i>2 })

var xAxis = svg2.append("g")
		.attr("transform", "translate(0," + (domainheight - margin.bottom) + ")")
		.attr("class","x-axis")




var keys, keysPer, group, groupH, groupP, groupP2, states, states1, states2,series, popTotals, popDom, popInt, stateFIP, barGroups, bars, labels;

function startChange(data) {

  svg2.selectAll(".barPer").remove()
  svg2.selectAll(".stateAB_per").remove()
  svg2.selectAll(".gridLine3").remove()
  svg2.selectAll(".titleTwo").remove()

  var gTicks = wrapper.append('g')
      .attr("transform", "translate(" + margin.left*1.1 + "," + margin.top*1.4 + ")");

  var keyMaker = data.columns.slice(1)

  keys = [keyMaker[16],keyMaker[12]]

  keysPer = [keyMaker[26],keyMaker[27]]



  group = data
  group = group.sort(function(a,b) { return +b.PopulationChange - +a.PopulationChange })

  groupH = data.filter(function(d){ return d.colorState == 1 || d.colorState == 3 || d.colorState == 4 })
  groupH = groupH.sort(function(a,b) { return +b.IntMigChange - +a.IntMigChange })

  groupP = data.filter(function(d){ return d.colorState == 2 })
  groupP = groupP.sort(function(a,b) { return +b.totalPercent - +a.totalPercent })

  groupP2 = data.filter(function(d){ return d.colorState == 1 || d.colorState == 3 || d.colorState == 4 })
  groupP2 = groupP2.sort(function(a,b) { return +b.totalPercent - +a.totalPercent })


  states = d3.map(group).keys()

  series = d3.stack()
			       .keys(keys)
			       .offset(d3.stackOffsetDiverging)(group);

  popTotals = d3.map(group, function(d){return(+d.totalPop)}).keys()
  popDom = d3.map(group, function(d){return(+d.stateDom)}).keys()
  popInt = d3.map(group, function(d){return(+d.stateInt)}).keys()
  stateFIP = d3.map(group, function(d){return(d.fip)}).keys()

  xBar.domain(stateFIP)



    yBar.domain([-2000000,
          (+d3.max(popTotals))
          ]);



  barGroups = svg2.selectAll("g.layer")
			.data(series, d => d.key)




      var yGridLine = d3.axisLeft(yBar)
           .tickSize(-domainwidth+margin.left,0,0)
           .tickFormat(function(d){return formatValue(d).replace('M', ' Million');})
           .tickValues([-10000000,1000000,2000000,3000000,4000000]);

// var axisGroup = svg2.selectAll("g.gridLine").insert("g")

      gTicks.classed("gridLine", true)
                .attr("transform", "translate("+-10+",0)")
                .call(yGridLine)

                svg2.append('rect')
                  .attr("class","legRec")
                  .attr('width',15)
                  .attr("height", 15)
                  .attr('y', 305)
                  .attr('x', 400)
                  .attr("fill","#87D8F7")

                  svg2.append('rect')
                    .attr("class","legRec")
                    .attr('width',15)
                    .attr("height", 15)
                    .attr('y', 280)
                    .attr('x', 400)
                    .attr("fill",'#38387C')

                    svg2.append('text')
                      .attr("class","legText")
                      .attr('y', 292)
                      .attr('x', 425)
                      .attr("fill",'black')
                      .text("Population change, international")

                      svg2.append('text')
                        .attr("class","legText")
                        .attr('y', 318)
                        .attr('x', 425)
                        .attr("fill",'black')
                        .text("Population change, domestic")

                        svg2.append('text')
                          .attr("class","titleOne")
                          .attr('y', 125)
                          .attr('x', 325)
                          .attr("fill",'black')
                          .text("Source of State Population Change from 2010-2019")



	barGroups.enter().insert("g", ".x-axis")
			.attr("fill", (d) => color6(d.key))
			.classed('layer', true);



  bars = svg2.selectAll("g.layer").selectAll(".bars")
             .data(d => d, d => d.data.STATE);


  bars.enter().append('rect')
      .attr("class","bars")
      .attr('width', 10)
      .attr('y', function(d) {return yBar(d[1])})
      .attr('x', (d) => xBar(d.data.fip))
      .merge(bars)
      .attr("height", (d) => (yBar(d[0])) - yBar(d[1]))
      .attr("data-id",(d) => "barID"+xBar(d.data.fip))
      .on("mouseover", mouseOverBar)
      .on("mouseout", mouseOutBar);



  labels = svg2.selectAll("g.layer").selectAll(".stateAB")
               .data(d => d, d => d.data.STATE);

  labels.enter()
        .append('text')
        .attr("class","stateAB")
        .text(function(d) {return d.data.abv})
        .attr("x", (d) => xBar(d.data.fip)+5)
        .attr('y', function(d) {if (d.data.fip==36 || d.data.fip==25 || d.data.fip==34||d.data.fip==42||d.data.fip==26||d.data.fip==39||d.data.fip==15||d.data.fip==44||d.data.fip==28||d.data.fip==17||d.data.fip==9||d.data.fip==50||d.data.fip==54){return yBar(d.data.IntMigChange)-6} else { return yBar(d.data.totalPop)-6}})
        .attr("fill","black")
        .attr("font-size", "9px")
        .style("text-anchor", "middle")
        .attr("dominant-baseline", "central") ;

  xAxis.transition().duration(500)
  	   .attr("transform", "translate(0," + yBar(0) + ")")
  	   .call(d3.axisBottom(xBar).tickValues([]))




}




startChange(stateData)



function barPercentGroup1() {

          var gTicks3 = wrapper.append('g')
                  .attr("transform", "translate(" + margin.left*1.1 + "," + margin.top*1.4 + ")");


  svg2.selectAll(".bars").remove()
  svg2.selectAll(".stateAB").remove()
  svg2.selectAll(".gridLine").remove()
  svg2.selectAll(".gridLine2").remove()
  svg2.selectAll(".barPer2").remove()
  svg2.selectAll(".stateAB_per2").remove()


  states2 = d3.map(groupP).keys()



  series = d3.stack()
			.keys(keysPer)
			.offset(d3.stackOffsetDiverging)(groupP);



  popTotals = d3.map(groupP, function(d){return(+d.totalPercent)}).keys()
  popDom = d3.map(groupP, function(d){return(+d.domPercent)}).keys()
  popInt = d3.map(groupP, function(d){return(+d.intPercent)}).keys()
  stateFIP = d3.map(groupP, function(d){return(d.fip)}).keys()


  xBar.domain(stateFIP)

  yBarPer.range([650, 275])
      .domain([0, 15]);

    var yGridLine3= d3.axisLeft(yBarPer)
         .tickSize(-domainwidth+margin.left,0,0)
         // .tickFormat(function(d){return formatValue(d).replace('M', ' Million');})
         .tickValues([5,10,15])
         .tickFormat(function(d, i){ return d+"%" ; });;

    gTicks3.classed("gridLine3", true)
              .attr("transform", "translate(-10,0)")
              .call(yGridLine3)

    barGroups = svg2.selectAll("g.layerP")
			.data(series, d => d.key);


		barGroups.enter().insert("g", ".x-axis")
			.attr("fill", (d) => color6(d.key))
			.classed('layerP', true);

    bars = svg2.selectAll("g.layerP").selectAll(".barPer")
                  			.data(d => d, d => d.data.STATE);


   bars.enter().append('rect')
       .attr("class","barPer")
       .attr('width', 15)
       .attr('y', function(d) {return yBarPer(d[1])})
       .attr('x', (d) => xBar(d.data.fip))
       .merge(bars)
       .attr("height", (d) => (yBarPer(d[0])) - yBarPer(d[1]))
       .attr("data-id",(d) => "barID"+xBar(d.data.fip))
       .on("mouseover", mouseOverBar)
       .on("mouseout", mouseOutBar);



       labels = svg2.selectAll("g.layerP").selectAll(".stateAB_per")
      	       .data(d => d, d => d.data.STATE);


        labels.enter().append('text')
            .attr("class","stateAB_per")
            .text(function(d) {return d.data.abv})
            .attr("x", (d) => xBar(d.data.fip)+9)
            .attr('y', function(d) {if (d.data.fip==36 || d.data.fip==25 || d.data.fip==34||d.data.fip==42||d.data.fip==26||d.data.fip==39||d.data.fip==15||d.data.fip==44||d.data.fip==28||d.data.fip==17||d.data.fip==9||d.data.fip==50||d.data.fip==54){return yBarPer(d.data.IntMigChange)-6} else { return yBarPer(d.data.totalPercent)-6}})
            .attr("fill","black")
            .attr("font-size", "11px")
            .style("text-anchor", "middle")
            .attr("dominant-baseline", "central") ;;

          xAxis.transition().duration(500)
      			.attr("transform", "translate(0," + yBarPer(0) + ")")
      			.call(d3.axisBottom(xBar).tickValues([]));


            // svg2.append('text')
            //   .attr("class","titleOne")
            //   .attr('y', 125)
            //   .attr('x', 325)
            //   .attr("fill",'black')
            //   .text("Source of State Population Change from 2010-2019")

              svg2.append('text')
                .attr("class","titleTwo")
                .attr('y', 160)
                .attr('x', 325)
                .attr("fill",'black')
                .text("Sorted by Percentage of Population")





}


function groupHighlight(groupH) {

  svg2.selectAll(".barPer").remove()
  svg2.selectAll(".stateAB_per").remove()
  svg2.selectAll(".gridLine3").remove()

  states1 = d3.map(groupH).keys()


  series = d3.stack()
			.keys(keys)
			.offset(d3.stackOffsetDiverging)(groupH);

  popTotals = d3.map(groupH, function(d){return(+d.totalPop)}).keys()
  popDom = d3.map(groupH, function(d){return(+d.stateDom)}).keys()
  popInt = d3.map(groupH, function(d){return(+d.stateInt)}).keys()
  stateFIP = d3.map(groupH, function(d){return(d.fip)}).keys()

  xBar.domain(stateFIP)

  yBar.range([425, 375])
      .domain([d3.min(popDom),
			(d3.max(popTotals))
		]);

    var yGridLine2= d3.axisLeft(yBar)
         .tickSize(-domainwidth+margin.left,0,0)
         // .tickFormat(function(d){return formatValue(d).replace('M', ' Million');})
         .tickValues([-500000,-250000,250000,500000]);

    gTicks2.classed("gridLine2", true)
              .attr("transform", "translate("+-10+",0)")
              .call(yGridLine2)

    barGroups = svg2.selectAll("g.layer")
			.data(series, d => d.key);


		barGroups.enter().insert("g", ".x-axis")
			.attr("fill", (d) => color6(d.key))
			.classed('layer', true);

    bars = svg2.selectAll("g.layer").selectAll(".bars")
                  			.data(d => d, d => d.data.STATE);



        bars.enter().append('rect')
            .attr("class","barH")
                  .attr('width', 18)
                  .attr('y', function(d) {return yBar(d[1])})
                  .attr('x', (d) => xBar(d.data.fip))
                  .merge(bars)
                  // .attr('y', (d) => yBar(d[1]))
                  .attr("height", (d) => (yBar(d[0])) - yBar(d[1]))
                  .attr("data-id",(d) => "barID"+xBar(d.data.fip))
                  .style("opacity",function(d) { if (d.data.colorGroup ==1 ) {return 1} else {return .1}})
                  .attr("data-id",(d) => "barID"+xBar(d.data.fip))
                  .on("mouseover", mouseOverBar)
                  .on("mouseout", mouseOutBar);


       labels = svg2.selectAll("g.layer").selectAll(".stateAB")
      	       .data(d => d, d => d.data.STATE);


        labels.enter().append('text')
            .attr("class","stateAB_per")
            .text(function(d) {return d.data.abv})
            .attr("x", (d) => xBar(d.data.fip)+9)
            .attr('y', function(d) {if (d.data.fip==36 || d.data.fip==25 || d.data.fip==34||d.data.fip==42||d.data.fip==26||d.data.fip==39||d.data.fip==15||d.data.fip==44||d.data.fip==28||d.data.fip==17||d.data.fip==9||d.data.fip==50||d.data.fip==54){return yBar(d.data.IntMigChange)-6} else { return yBar(d.data.totalPop)-6}})
            .attr("fill","black")
            .attr("font-size", "12px")
            .style("text-anchor", "middle")
            .attr("dominant-baseline", "central") ;;

          xAxis.transition().duration(500)
      			.attr("transform", "translate(0," + yBar(0) + ")")
      			.call(d3.axisBottom(xBar).tickValues([]));



}

function groupHighPercent(groupP2) {
  var gTicks2 = wrapper.append('g')
          .attr("transform", "translate(" + margin.left*1.1 + "," + margin.top*1.4 + ")");

  svg2.selectAll(".barPer").remove()
  svg2.selectAll(".stateAB_per").remove()
  svg2.selectAll(".gridLine3").remove()
  svg2.selectAll(".barPer2").remove()
  svg2.selectAll(".stateAB_per2").remove()
  svg2.selectAll(".gridLine2").remove()



  states1 = d3.map(groupP2).keys()


  series = d3.stack()
			.keys(keysPer)
			.offset(d3.stackOffsetDiverging)(groupP2);

  popTotals = d3.map(groupP2, function(d){return(+d.totalPercent)}).keys()
  popDom = d3.map(groupP2, function(d){return(+d.domPercent)}).keys()
  popInt = d3.map(groupP2, function(d){return(+d.intPercent)}).keys()
  stateFIP = d3.map(groupP2, function(d){return(d.fip)}).keys()



  xBar.domain(stateFIP)

  yBarPer.range([525, 375])
      .domain([d3.min(popDom),
			(d3.max(popTotals))
		]);

    var yGridLine2= d3.axisLeft(yBarPer)
         .tickSize(-domainwidth+margin.left,0,0)
         // .tickFormat(function(d){return formatValue(d).replace('M', ' Million');})
         .tickValues([-4,-2,0,2,4,6])
         .tickFormat(function(d, i){ return d+"%" ; });

    gTicks2.classed("gridLine2", true)
              .attr("transform", "translate("+-10+",0)")
              .call(yGridLine2)

    barGroups = svg2.selectAll("g.layerPer2")
			.data(series, d => d.key);


		barGroups.enter().insert("g", ".x-axis")
			.attr("fill", (d) => color6(d.key))
			.classed('layerPer2', true);

    bars = svg2.selectAll("g.layerPer2").selectAll(".barPer2")
                  			.data(d => d, d => d.data.STATE);



        bars.enter().append('rect')
            .attr("class","barPer2")
                  .attr('width', 18)
                  .attr('y', function(d) {return yBarPer(d[1])})
                  .attr('x', (d) => xBar(d.data.fip))
                  .merge(bars)
                  // .attr('y', (d) => yBar(d[1]))
                  .attr("height", (d) => (yBarPer(d[0])) - yBarPer(d[1]))
                    .attr("data-id",(d) => "barID"+xBar(d.data.fip))
                  .style("opacity",function(d) { if (d.data.colorGroup ==1 ) {return 1} else {return .1}})
                  .on("mouseover", mouseOverBar)
                  .on("mouseout", mouseOutBar);


       labels = svg2.selectAll("g.layerPer2").selectAll(".stateAB")
      	       .data(d => d, d => d.data.STATE);


        labels.enter().append('text')
            .attr("class","stateAB_per2")
            .text(function(d) {return d.data.abv})
            .attr("x", (d) => xBar(d.data.fip)+9)
            .attr('y', function(d) {if (d.data.fip==36 || d.data.fip==25 || d.data.fip==34||d.data.fip==42||d.data.fip==26||d.data.fip==39||d.data.fip==15||d.data.fip==44||d.data.fip==28||d.data.fip==17||d.data.fip==9||d.data.fip==50||d.data.fip==54){return yBarPer(d.data.intPercent)-6} else { return yBarPer(d.data.totalPercent)-6}})
            .attr("fill","black")
            .attr("font-size", "11px")
            .style("text-anchor", "middle")
            .attr("dominant-baseline", "central") ;;

          xAxis.transition().duration(500)
      			.attr("transform", "translate(0," + yBarPer(0) + ")")
      			.call(d3.axisBottom(xBar).tickValues([]));



}



function highlight3() {

  svg2.selectAll(".barH")
      .style("opacity",function(d) { if (d.data.colorGroup ==3 ) {return 1} else {return .1}})

}

function highlightPercent3() {

  svg2.selectAll(".barPer2")
      .style("opacity",function(d) { if (d.data.colorGroup ==3 ) {return 1} else {return .1}})

}

function highlight4() {

  svg2.selectAll(".barH")
      .style("opacity",function(d) { if (d.data.colorGroup ==4 ) {return 1} else {return .1}})

}

function highlightPercent4() {

  svg2.selectAll(".barPer2")
      .style("opacity",function(d) { if (d.data.colorGroup ==4 ) {return 1} else {return .1}})

}


function startDot(countyData) {

  gP.selectAll('.triangle1down').remove();
  gP.selectAll('.triangle2left').remove();
  gP.selectAll('.triangle1up').remove();
  gP.selectAll('.triangle2right').remove();
  gP.selectAll('.triangle3').remove();
  d3.select('#plotTitle').remove();

  gP.selectAll('#tempXaxis').style("opacity",0)

  gP.selectAll('#tempYaxis').style("opacity",0)
  gP.selectAll('.xaxisFULL').style("opacity",0)
  gP.selectAll('.yaxisFULL').style("opacity",0)
     gP.selectAll('.xaxis').style("opacity",0)

  gP.selectAll('.yaxis').style("opacity",0)
  gP.selectAll('.axisTextxA').style("opacity",0)
  gP.selectAll('.axisTextyA').style("opacity",0)



  // svg2.selectAll(".barH").remove()
  // svg2.selectAll(".stateAB").remove()
  // svg2.selectAll(".x-axis").remove()

 if (window.innerWidth > 550){

  var svgI = svgP.append('svg:image')
      .attr('xlink:href', 'https://newamericaneconomy.github.io/NAFmap/information_Lyon.png') // can also add svg file here
      .attr("x",695)
      .attr("y",590)
      .attr('width', "2em")
      .attr('height', "2em")
      .attr('class', 'legboxShow')
      .on("mouseover", function(d)
{
    d3.select(".legbox").style("visibility","visible")
})
.on("mouseout", function(d)
{
    d3.select(".legbox").style("visibility","hidden")
});
  svgP.append("text")
      .attr('x', 705)
      .attr('y', 580)
      .attr('class',"increase_decrease")
      .style("text-anchor", "middle")
      .text('Color Detail')

}
    projection
     .scale(1.4*domainwidth)
     .translate(offset)

    if (window.innerWidth < 550){

      projection
      .scale(3*domainwidth)
    }

 gP.selectAll(".dot")
     .data(countyData)
     // .transition()
     // .duration(500)
     .enter()
     .append("circle")
     .attr("class", "dot")
     .attr("r", 3)
     .attr("cx",function(d) { return (projection([d.long,d.lat])[0])-50;})
     .attr("cy",function(d) { return (projection([d.long,d.lat])[1])-50;})
     .attr("stroke", "#ecf2f2")
     .attr("stroke-width", .45)
     .style("fill", function(d){ return color5(d.colorGroup);})
     .on("mouseover", handleMouseOver)
     .on("mouseout", handleMouseOut);

     gP.append('rect')
       .attr("class", "rectangle")
      .attr('x', 50)
      .attr('y',function(d) { if (window.innerWidth < 550) {return 710} else {return 520}})
      .attr('width',30)
      .attr('height',15)
      .attr('fill',"#87D8F7")


      gP.append('rect')
        .attr("class", "rectangle")
       .attr('x', 80)
       .attr('y',function(d) { if (window.innerWidth < 550) {return 710} else {return 520}})
       .attr('width',30)
       .attr('height',15)
       .attr('fill','#6063ED')

       gP.append('rect')
         .attr("class", "rectangle")
        .attr('x', 110)
        .attr('y',function(d) { if (window.innerWidth < 550) {return 710} else {return 520}})
        .attr('width',30)
        .attr('height',15)
        .attr('fill','#38387C')

        gP.append('rect')
          .attr("class", "rectangle")
         .attr('x', 200)
         .attr('y',function(d) { if (window.innerWidth < 550) {return 710} else {return 520}})
         .attr('width',30)
         .attr('height',15)
         .attr('fill','#f1bd03')

         gP.append('rect')
           .attr("class", "rectangle")
          .attr('x', 230)
          .attr('y',function(d) { if (window.innerWidth < 550) {return 710} else {return 520}})
          .attr('width',30)
          .attr('height',15)
          .attr('fill',"#f7844c")

          gP.append('text')
            .attr("class", "increase_decrease")
           .attr('x', 50)
           .attr('y',function(d) { if (window.innerWidth < 550) {return 700} else {return 510}})
           .text("Increase")

           gP.append('text')
             .attr("class", "increase_decrease")
            .attr('x', 200)
            .attr('y',function(d) { if (window.innerWidth < 550) {return 700} else {return 510}})
            .text("Decrease")


   }



function back2Start(countyData) {

  gP.selectAll('.triangle1down').remove();
  gP.selectAll('.triangle2left').remove();
  gP.selectAll('.triangle1up').remove();
  gP.selectAll('.triangle2right').remove();
  gP.selectAll('.triangle3').remove();
  d3.select('#plotTitle').remove();

  gP.selectAll('#tempXaxis').style("opacity",0)

  gP.selectAll('#tempYaxis').style("opacity",0)
  gP.selectAll('.xaxisFULL').style("opacity",0)
  gP.selectAll('.yaxisFULL').style("opacity",0)
     gP.selectAll('.xaxis').style("opacity",0)

  gP.selectAll('.yaxis').style("opacity",0)
  gP.selectAll('.axisTextxA').style("opacity",0)
  gP.selectAll('.axisTextyA').style("opacity",0)
  gP.selectAll('.axisTextyB').style("opacity",0)

  svgP.selectAll('.increase_decrease').style("opacity",1)
      //
      // gP.selectAll('.axisTextyC').remove()
      // gP.selectAll('.axisTextxC').remove()
      // gP.selectAll('.axisTextyB').remove()
      // gP.selectAll('.axisTextxB').remove()

       projection
       .scale(1.1*domainwidth)
       .translate(offset)

       if (window.innerWidth < 550){

         projection
         .scale(3*domainwidth)
       }


    svgP.selectAll(".plot_dot")
     .transition()
     .duration(500)
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx",function(d) { return (projection([d.long,d.lat])[0])-50;})
        .attr("cy",function(d) { return (projection([d.long,d.lat])[1])-50;})
        .attr("stroke", "#ecf2f2")
        .attr("stroke-width", .45)
        .style('opacity',1)
       //  .on("mouseover", handleMouseOver)
       // .on("mouseout", handleMouseOut);


      }



function bigThing() {
  gP.selectAll('#tempXaxis').style("opacity",0)

  gP.selectAll('#tempYaxis').style("opacity",0)
  // gP.selectAll('.xaxisFULL').remove()
  // gP.selectAll('.yaxisFULL').remove()
     gP.selectAll('.xaxis').style("opacity",0)

  gP.selectAll('.yaxis').style("opacity",0)
  gP.selectAll('.axisTextxA').style("opacity",0)
  gP.selectAll('.axisTextyA').style("opacity",0)
svgP.selectAll('.increase_decrease').style("opacity",1)



    gP.append('text')
      .attr("class","titleOne")
      .attr("id","plotTitle")
      .attr('y', -40)
      .attr('x', 275)
      .attr("fill",'black')
      .text("International vs. Domestic Population Change")


    svgP.selectAll("circle")
    	.transition()
    // 	.ease(d3.easeExp)
        .duration(500)
        .attr("cx", function(d) { return xFULL(d.difIntMig); })
        .attr("cy", function(d) { return yFULL(d.intMig); })
        .attr("r", 2)
        // .attr("r", 5)
        .attr('class', 'plot_dot')
        .style("opacity", 1);



        gP.append('g')
        .attr("class", "xaxisFULL")
        .attr("transform", "translate(0," + yFULL.range()[0]*.5 + ")")
        .style("stroke","#000")
        .style("opacity", 1)
        .call(d3.axisBottom(xFULL).ticks(7).tickFormat(function(d) {
        return  d===-2 ? "-100" : d===-4 ? "-10,000" : d===-6 ? "-1,000,000" : d===6 ? "1,000,000" : d=== 4 ? "10,000" :  d=== 2 ? "100" :  d===0 ? "": d }
      ));
        // .attr("transform", "translate(" +xNegNeg.range()[1] + ","+yNegNeg.range()[1]+")")
        //   .call(d3.axisBottom(xNegNeg).ticks(12));

        gP.append('g')
        .attr("class", "yaxisFULL")
        .attr("transform", "translate(" + xFULL.range()[1]*.5 + ", 0)")
        .style("stroke","#000")
        .style("opacity", 1)
        .call(d3.axisLeft(yFULL).ticks(6).tickFormat(function(d) {
        return d===-2 ? "-100" : d===-4 ? "-10,000" : d===-6 ? "-1,000,000" : d===6 ? "1,000,000" : d=== 4 ? "10,000" : d=== 2 ? "100" : d===0 ? "": d }
      ));

      gP.append("path")
        .attr("d", symTri)
        .attr("class","triangle1up")
        .attr("fill","black")
        .attr("transform", "translate(-50,110)");

        gP.append("path")
          .attr("d", symTri)
          .attr("class","triangle1down")
          .attr("fill","black")
          .attr("transform", 'rotate(-180,-25,206)');

          gP.append("path")
            .attr("d", symTri)
            .attr("class","triangle2left")
            .attr("fill","black")
            .attr("transform", 'rotate(-90,358,225)');

            gP.append("path")
              .attr("d", symTri)
              .attr("class","triangle2right")
              .attr("fill","black")
              .attr("transform", 'rotate(-270,-94,490)');


       gP.selectAll('#tempXaxis')
        .style('opacity', 0)

       gP.selectAll('#tempYaxis')
        .style('opacity', 0)

        gP.append("text")
          .attr("class", "axisTextxA")
          .attr("transform",
                "translate(" + 265 + " ," +
                               590 + ")")
          .style("text-anchor", "middle")
          .style("fill", "#000")
          .text("Population change, domestic");




        gP.append("text")
          .attr('transform', 'rotate(-90, ' + 35 + ', ' + 100 + ')')
          .attr("class", "axisTextyA")
          .attr("dy", "1em")
          .style("text-anchor", "end")
          .style("fill", "#000")
          .text("Population change, international");

          gP.selectAll(".increase_decrease").remove()

          gP.selectAll(".rectangle").remove()


        }

function changed() {

  gP.selectAll('.triangle1down').style("opacity", 0)
  gP.selectAll('.triangle2left').style("opacity", 0)
  gP.selectAll('.triangle1up').style("opacity", 1)
  gP.selectAll('.triangle2right').style("opacity", 1)
  gP.selectAll(".triangle3").style("opacity", 0)
svgP.selectAll('.increase_decrease').style("opacity",0)


// gP.selectAll('.axisTextyB').remove()
gP.selectAll('.xaxisFULL').style("opacity", 0) //.style("opacity",0)
gP.selectAll('.yaxisFULL').style("opacity", 0)

// gP.selectAll('.triangle1down').style("opacity", 0)
// gP.selectAll('.triangle2left').style("opacity", 0) //.style("opacity",0)


 gP.append("g")
      .attr("class", "xaxis")
      // .attr("transform", "translate("+x.range()[0]+"," + y.range()[0] + ")")
      .attr("transform", "translate("+(x(0)-35)+"," + (y(0)-20) + ")")
      .style("stroke","#000")
      .style("opacity", 1)
      .call(d3.axisBottom(x).ticks(6).tickFormat(function(d) {
    return d === 1 ? "10": d===2 ? "100" : d===3 ? "1000" : d===4 ? "10,000" : d===5 ? "100,000" : d===6 ? "1,000,000" : d }
  ));

  gP.append("g")
      .attr("class", "yaxis")
      // .attr("transform", "translate(" + x.range()[0] + ","+y.range()[1]+")")
      .attr("transform", "translate(" + (x(0)-5) + ","+(y(6)-50)+")")
      .style("stroke","#000")
      .style("opacity", 1)
      .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { if (window.innerWidth > 250) {
    return d===0 ? "" :d === 1 ? "10": d===2 ? "100" : d===3 ? "1000" : d===4 ? "10,000" : d===5 ? "100,000" : d===6 ? "1,000,000" : d }}
  ));

   gP.selectAll('#tempXaxis')
    .style('opacity', 0)

   gP.selectAll('#tempYaxis')
    .style('opacity', 0)




svgP.selectAll(".plot_dot")
	.transition()
// 	.ease(d3.easeExp)
    .duration(500)
    .attr("cx", function(d) { return x(d.difIntMig)-5; })
    .attr("cy", function(d) { return y(d.intMig)-20; })
    .attr("r", function(d) {
            if (d.colorGroup <3) {return 5}
            else  { return 1 }
        })

    // .attr("r", 5)
    .attr('class', 'plot_dot')
    .style("opacity", function(d) {
            if (d.colorGroup <3) {return 1}
            else 	{ return 0.1 }
        });



    }




   function changeAgain() {

     gP.selectAll(".triangle4").remove()
     gP.selectAll(".triangle5").remove()

     gP.selectAll('.triangle1down').style("opacity", 0)
     gP.selectAll('.triangle2left').style("opacity", 1)
     gP.selectAll('.triangle1up').style("opacity", 0)
     gP.selectAll('.triangle2right').style("opacity", 0)

     gP.selectAll('.triangle1').remove()

    gP.selectAll('.axisTextyC').style("opacity", 0)
    gP.selectAll('.axisTextxC').style("opacity", 0)

    // gP.selectAll('.axisTextxA').style("opacity", 0)
    gP.selectAll('.axisTextyA').style("opacity", 0)
  svgP.selectAll('.increase_decrease').style("opacity",0)

    gP.selectAll('.xaxis')
    .attr("class", "xaxis")
    .attr("id", "tempXaxis")
    .transition()
    .duration(500)
    .attr("transform", "translate(" +(xNeg.range()[0]) + ","+(yNeg.range()[0])+")")
      .call(d3.axisBottom(xNeg).ticks(6).tickFormat(function(d) {
    return d === -1 ? "-10": d===-2 ? "-100" : d===-3 ? "-1000" : d===-4 ? "-10,000" : d===-5 ? "-100,000" : d===-6 ? "-1,000,000" : d }
  ));

    gP.selectAll('.yaxis')
    .attr("class", "yaxis")
    .attr("id", "tempYaxis")
    .transition()
    .duration(500)
    .style("opacity", 1)
    .attr("transform", "translate("+(xNeg.range()[1])+",0)")
      .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) {
    return d===0 ? "" :d === 1 ? "10": d===2 ? "100" : d===3 ? "1000" : d===4 ? "10,000" : d===5 ? "100,000" : d===6 ? "1,000,000" : d }
  ));

      // gP.selectAll(".axisTextyA")
      gP.selectAll(".axisTextyA")
      .attr("class", "axisTextyB")
      .transition()
      .style("text-anchor", "middle")
      .style("opacity", 1)
      .duration(500)
      .attr("y", 690)
      .attr("x", -190)

      gP.selectAll(".axisTextyC")
      .attr("class", "axisTextyB")
      .transition()
      .style("text-anchor", "middle")
      .style("opacity", 1)
      .duration(500)
      .attr("y", 690)
      .attr("x", -190)

      gP.selectAll(".axisTextxC")
      .attr("class", "axisTextxA")
      .transition()
      .style("text-anchor", "middle")
      .style("opacity", 1)
      .duration(500)
      .attr("y", 570)
      .attr("x", 0)





      svgP.selectAll(".plot_dot")
	.transition()
// 	.ease(d3.easeExp)
    .duration(500)
    .attr("cx", function(d) { return xNeg(+d.LogNoImm); })
    .attr("cy", function(d) { return yNeg(+d.LogImm); })
    .attr("r", function(d) {
            if (d.colorGroup >2 && d.colorGroup<5) {return 5}
            else  { return 0 }
        })
    // .attr("r", 5)
    .attr('class', function(d) { return "colorGroup"+d.colorGroup; })
    .attr('class', 'plot_dot')
    .style("opacity", function(d) {
            if (d.colorGroup ==3) {return 1}
            else 	{ return .25 }
        })
    .attr("stroke", function(d) {
                if (d.colorGroup ==3) {return "#38387C"}
            })
    .attr("stroke-width", function(d) {
                        if (d.colorGroup ==3) {return 1.1}
                    })


                    gP.append("path")
                      .attr("d", symTri)
                      .attr("class","triangle3")
                      .attr("fill","black")
                      .attr("transform", "translate(640,180)");





   }

   function opChange() {


     svgP.selectAll(".plot_dot")
     .transition()
     .duration(500)
     .style("opacity", function(d) {
           if (d.colorGroup ==4) {return 1}
           else 	{ return .33 }
       })
       .attr("stroke", function(d) {
                   if (d.colorGroup ==4) {return "#F4F721"}
                   else {return "#fff"}
               })
       .attr("stroke-width", function(d) {
                           if (d.colorGroup ==3) {return .75}
                           else {0}
                       });


       gP.selectAll(".dot").remove()
       svgP.selectAll(".dot").remove()
   }



function changeAgainAgain() {

svgP.selectAll('.increase_decrease').style("opacity",0)

  gP.selectAll(".dot").remove()
  gP.selectAll(".triangle3").remove()
  gP.selectAll(".triangle2").remove()
  svgP.selectAll(".dot").remove()
    gP.selectAll('.triangle2left').style("opacity", 0)

  gP.selectAll('.xaxis')
  .attr("class", "xaxis")
  .transition()
  .duration(500)
  .attr("transform", "translate(-30," + (yNegNeg.range()[1]+30) +")")
  .call(d3.axisBottom(xNegNeg).ticks(7).tickFormat(function(d) {
  return d === -1 ? "-10": d===-2 ? "-100" : d===-3 ? "-1000" : d===-4 ? "-10,000" : d===-5 ? "-100,000" : d===-6 ? "-1,000,000" : d===6 ? "1,000,000" : d===5 ? "-100,000" : d=== 4 ? "10,000" : d=== 3 ? "1,000" : d=== 2 ? "100" : d===1 ? "10" : d===0 ? "": d }
));
  // .attr("transform", "translate(" +xNegNeg.range()[1] + ","+yNegNeg.range()[1]+")")
  //   .call(d3.axisBottom(xNegNeg).ticks(12));

  gP.selectAll('.yaxis')
  .attr("class", "yaxis")
  .transition()
  .duration(500)
  .attr("transform", "translate("+(xNegNeg.range()[1]/2-30)+"," + yNegNeg.range()[1] + ")")
    .call(d3.axisLeft(yNegNeg).ticks(3).tickFormat(function(d) {
  return d === 0 ? "": d === -1 ? "-10": d===-2 ? "-100" : d===-3 ? "-1000" : d===-4 ? "-10,000": d}));

  gP.selectAll(".axisTextyB")
    .attr("class", "axisTextyC")
    .transition()
    .duration(500)
    .attr("y",2)
    .attr("x", -135)

  gP.selectAll(".axisTextxA")
    .attr("class", "axisTextxC")
    .transition()
    .duration(500)
    .attr("transform",
          "translate(" + 270 + " ," +
                         20 + ")")


      svgP.selectAll(".plot_dot")
	.transition()
// 	.ease(d3.easeExp)
    .duration(500)
    .attr("cx", function(d) { return xNegNeg(d.difIntMig)-30; })
    .attr("cy", function(d) { return yNegNeg(d.intMig)+30; })
    // .attr("r", 5)
    .attr("r", function(d) {
            if (d.colorGroup >4) {return 5}
            else  { return 0 }
        })
    .attr('class', 'plot_dot')
    .attr("stroke", "#ecf2f2")
    .attr("stroke-width", .75)
    .style("opacity", function(d) {
            if (d.colorGroup >4)  {return 1}
            else 	{ return 0 }
        });


          gP.append("path")
            .attr("d", symTri)
            .attr("class","triangle4")
            .attr("fill","black")
            .attr("transform", 'rotate(-180,-25,206)');


            gP.append("path")
              .attr("d", symTri)
              .attr("class","triangle5")
              .attr("fill","black")
              .attr("transform", 'rotate(-90,78,-65)');

              gP.append("path")
                .attr("d", symTri)
                .attr("class","triangle5")
                .attr("fill","black")
                .attr("transform", 'rotate(-270,192,206)');


    svgP.selectAll(".plot_dot")
   .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);



   }

   function opChangeRed() {


     svgP.selectAll(".plot_dot")
     .transition()
     .duration(500)
     .style("opacity", function(d) {
           if (d.colorGroup ==5 || d.colorGroup ==6) {return 1}
           else 	{ return .2 }
       })
       .attr("stroke", function(d) {
                   if (d.colorGroup ==5 || d.colorGroup ==6) {return "#F9C9B5"}
                   else {return "#fff"}
               })
       .attr("stroke-width", function(d) {
                           if (d.colorGroup ==3) {return .75}
                           else {0}
                       });

   }




   function changeEnd(countyData) {

         g2.append('g')
         .attr("class", "xaxis2")
         .attr("transform", "translate(0," + yEND.range()[0]*.6 + ")")
         .style("stroke","#000")
         .style("opacity", .7)
         .call(d3.axisBottom(xEND).ticks(7).tickFormat(function(d) {
         return  d===-2 ? "-100" : d===-4 ? "-10,000" : d===-6 ? "-1,000,000" : d===6 ? "1,000,000" : d=== 4 ? "10,000" :  d=== 2 ? "100" :  d===0 ? "": d }
       ));
         // .attr("transform", "translate(" +xNegNeg.range()[1] + ","+yNegNeg.range()[1]+")")
         //   .call(d3.axisBottom(xNegNeg).ticks(12));

         g2.append('g')
         .attr("class", "yaxis2")
         .attr("transform", "translate(" + xEND.range()[1]/2 + ", 0)")
         .style("stroke","#000")
         .style("opacity", .7)
         .call(d3.axisLeft(yEND).ticks(6).tickFormat(function(d) {
         return d===-2 ? "-100" : d===-4 ? "-10,000" : d===6 ? "1,000,000" : d=== 4 ? "10,000" : d=== 2 ? "100" : d===0 ? "": d }
       ));



         g2.append("text")
           .attr("class", "axisTextx")
           .attr("transform",
                 "translate(" + (domainwidth2/2) + " ," +
                                (domainheight2 + margin2.top/2) + ")")
           .style("text-anchor", "middle")
           .style("fill", "#000")
           .text("Population change, domestic");

         g2.append("text")
           .attr("transform", "rotate(-90)")
           .attr("class", "axisTexty")
           .attr("y", 0-(margin2.left*.1))
           .attr("x", function(d) {if (window.innerWidth < 550){return 0-domainheight2*.3} else {return 0-domainheight2*.6}})
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .style("fill", "#000")
           .text("Population change, international");

     // gP.selectAll(".dot").remove()
     // svgP.selectAll(".dot").remove()

      g2.selectAll(".dotTwo")
      	  .data(countyData)
      	  .enter()
      	  .append("circle")
      	  .attr("r", 3)
      	  .attr("cx", function(d) { return xEND(d.difIntMig); })
    	  .attr("cy", function(d) { return yEND(d.intMig); })
          .style("fill", function(d){ return color5(d.colorGroup);})
          .style("opacity", 1)
          .attr('class', 'dotTwo')
          .attr("stroke", "#ecf2f2")
      	  .attr("stroke-width", .75)
      	  .style("z-index", 1)
          .attr("state-id", function(d){ return d.state})
          .on("mouseover", handleMouseOverTool)
          .on("mouseout", handleMouseOutTool);





   }



   function changeEndMap(countyData) {


     projectionLarge
      .scale(1.6*domainwidth)


  g2.selectAll(".dotTwo")
      .data(countyData)
      // .transition()
      // .duration(500)
      .enter()
      .append("circle")
      .attr("class", "dotTwo")
      .attr("r", 3)
      .attr("cx",function(d) {if (window.innerWidth < 550){return (projectionLarge([d.long,d.lat])[0])-320} else {return (projectionLarge([d.long,d.lat])[0]);}})
      .attr("cy",function(d) { return (projectionLarge([d.long,d.lat])[1])+50;})
      .attr("stroke", "#ecf2f2")
      .attr("stroke-width", .45)
      .style("fill", function(d){ return color5(d.colorGroup);})
      .on("mouseover", handleMouseOverTool)
      .on("mouseout", handleMouseOutTool);




   }



var formatComma = d3.format(",")

function formatCommaSign(num) {
  var newNum = formatComma(num)
  if (num>0) {
    newNum = "+"+newNum
  }
  return newNum
}

var formatPercent = d3.format(".1f")











  function handleMouseOver(d) {
            // Add interactivity

            // Use D3 to select element, change color and size

            // div.transition()
            //     .style("opacity", 1);
            var xMouse = d3.mouse(this)[0]
            var yMouse = d3.mouse(this)[1]



            d3.select(this).attr("r",8)
            d3.select(this).attr("stroke","black")
            d3.select(this).attr("stroke-widdth", 1)




              div.html(function() {return "<p><b>"+d.countyName + ', ' + d.state + "</b></br>Population change, domestic:  "  + formatComma(d.difIntMigReal) + "</br>Population change, international:  " + formatComma(d.intMigReal)+ "</br>Total change:  " + formatComma(d.totalPop) + "</p>"})
               // .style("left", .65*widthScreen + "px")
                  .style("left", xMouse + widthScreen*.5+ "px")
                  .style('top',  +(yMouse-10)+ "px")

               .style("visibility", 'visible')
               .attr("class", "tooltip")
               .attr("id", function() {return "county" + d.id});


          }

  function handleMouseOut(d) {


            d3.select(".tooltip").style("visibility", 'hidden');
            this




            if (this.className["baseVal"]=="plot_dot") {


            d3.select(this).attr("r",5).attr("stroke", "#ecf2f2").attr("stroke-width",.45)

          }

          else if (this.className["baseVal"]=="dot") {
              d3.select(this).attr("r",3).attr("stroke", "#ecf2f2").attr("stroke-width",.45)
          }

            // d3.select("div").remove();

            // Remove text location
            // d3.select("#county"+ d.id).remove();

            // d3.select("#county2"+ d.id).remove();
          }




  function handleMouseOverTool(d) {

            var xMouse2 = d3.mouse(this)[0] + widthScreen*.2
            var yMouse2 = d3.mouse(this)[1] - heightScreen*.1

             divTool.html(function() {return "<p><b>"+d.countyName + ', ' + d.state + "</b></br>Population change, domestic:  "  + d.difIntMigReal + "</br>Population change, international:  " + d.intMigReal+ "</br>Total change:  " + d.totalPop + "</p>"})
            	// .style("left", .67*widthScreen2 + "px")
              .style("left", xMouse2 + "px")
            	// .style('top', .05*heightScreen + "px")
            	.style("top", yMouse2 + "px")
            	.style("visibility", 'visible')
            	.attr("class", "tooltip2")
            	.attr("id", function() {return "county" + d.id});

              d3.select(this).attr("r",8)
              d3.select(this).attr("stroke","black")
              d3.select(this).attr("stroke-widdth", 1)

          }

  function handleMouseOutTool(d) {

            d3.select(".tooltip2").style("visibility", 'hidden');

            d3.select(this).attr("r", 3)
            .attr("stroke", "#ecf2f2")
        	  .attr("stroke-width", .75)



          }




          function mouseOverBar(d) {


                    var xMouseB = d3.mouse(this)[0] - widthScreen*.05
                    var yMouseB = d3.mouse(this)[1] - heightScreen*.4

                     divBar.html(function() {return "<p><b>"+d.data.STNAME + "</b></br>Population change, domestic:  "  + formatCommaSign(d.data.OveralminusIntMig) + "</br>Population change, international:  " + formatCommaSign(d.data.stateInt)+ "</br>Total change:  " + formatCommaSign(d.data.totalPop) + "</br>Percent change from 2010:  " + formatPercent(d.data.totalPercent) + "% </p>"})

                    	// .style("left", .67*widthScreen2 + "px")
                      .style("left", xMouseB + "px")
                    	// .style('top', .05*heightScreen + "px")
                    	.style("top", yMouseB + "px")
                    	.style("visibility", 'visible')
                    	.attr("class", "tooltip3")
                    	.attr("id", function() {return "county" + d.id});

                var strokeID =  d3.select(this).attr("data-id")



                svg2.selectAll("svg rect[data-id='" + strokeID + "']").style('stroke', '#38387C');
                svg2.selectAll("svg rect[data-id='" + strokeID + "']").style('stroke-width', 1);

                  }

          function mouseOutBar(d) {

                    d3.select(".tooltip3").style("visibility", 'hidden');

                    var strokeID = d3.select(this).attr("data-id")

                    svg2.selectAll("svg rect[data-id='" + strokeID + "']").style('stroke', 'none');



                  }



function handleResize2() {

	// 1. update height of step elements
	var stepHeight1 = Math.floor(window.innerHeight * 0.75);
	step1.style('height', stepHeight1 + 'px');

  var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step2.style('height', stepHeight2 + 'px');

  var stepHeight3 = Math.floor(window.innerHeight * 0.75);
  step3.style('height', stepHeight3 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;
  var bodyWidth2 = d3.select('body').node().offsetWidth;
  var bodyWidth3 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');
  graphic2.style('width', bodyWidth2 + 'px').style('height', window.innerHeight + 'px');
  graphic3.style('width', bodyWidth3 + 'px').style('height', window.innerHeight + 'px');


	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

  var chartMargin2 = 32;
	var textWidth2 = text2.node().offsetWidth;
	var chartWidth2 = graphic2.node().offsetWidth - textWidth2 - chartMargin2;

  var chartMargin3 = 32;
	var textWidth3 = text3.node().offsetWidth;
	var chartWidth3 = graphic3.node().offsetWidth - textWidth3 - chartMargin3;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');
  chart2.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');
  chart3.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');
	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
  scroller2.resize();
  scroller3.resize();
}
// scrollama event handlers
function handleStepEnter1(response) {

	step1.classed('is-active', function (d, j) {
		return j === response.index;
	});

	chart1.select('p').text(response.index + 1);


	if (step1._groups[0][0].className === 'step1 is-active') {

	startChange(stateData)

	}

	// // update graphic1 based on step 2
	if (step1._groups[0][2].className === 'step1 is-active') {
		// changed()
    barPercentGroup1()


	}

	// // update graphic1 based on step 3
	if (step1._groups[0][3].className === 'step1 is-active') {
    groupHighPercent(groupP2)
		// changeAgain()



	}

	// Step 4
	if (step1._groups[0][4].className === 'step1 is-active') {
      highlightPercent3()
        changeEndMap(countyData)
        startDot(countyData)


	}
  if (step1._groups[0][5].className === 'step1 is-active') {

    highlightPercent4()


  }

}

function handleStepEnter2(response) {

	step2.classed('is-active', function (d, j) {
		return j === response.index;
	});

	chart2.select('p').text(response.index + 1);

	if (step2._groups[0][1].className === 'step2 is-active' ) {

    back2Start()


	}

  if (step2._groups[0][2].className === 'step2 is-active' ) {


    bigThing()

  }

  if (step2._groups[0][3].className === 'step2 is-active') {

    changed()

  }

  if (step2._groups[0][4].className === 'step2 is-active') {

    changeAgain()


  }

  if (step2._groups[0][5].className === 'step2 is-active' ) {

     opChange()


  }

  if (step2._groups[0][6].className === 'step2 is-active' ) {


    changeAgainAgain()
    nonMetroFuncSmall()



  }

  if (step2._groups[0][7].className === 'step2 is-active' ) {

      opChangeRed()

  }


}



  // if (step1._groups[0][5].className === 'step1 is-active') {
  //   changeEnd()
  // }


function handleContainerEnter1(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic1.classed('is-fixed', true);
	graphic1.classed('is-bottom', false);

}

function handleContainerEnter2(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic2.classed('is-fixed', true);
	graphic2.classed('is-bottom', false);

}

function handleContainerEnter3(response) {
	// response = { direction }

	// sticky the graphic (old school)
	graphic3.classed('is-fixed', true);
	graphic3.classed('is-bottom', false);

}

function handleContainerExit1(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic1.classed('is-fixed', false);
	graphic1.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit2(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic2.classed('is-fixed', false);
	graphic2.classed('is-bottom', response.direction === 'down');
}

function handleContainerExit3(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	graphic3.classed('is-fixed', false);
	graphic3.classed('is-bottom', response.direction === 'down');
}

function init() {
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama

	scroller1.setup({
		container: '#container-scroll1',
		// graphic: '.scroll__figure1',
		// text: '.scroll__text1',
		step: '.step1',
		offset: 0.75,
		debug: false
	}).onStepEnter(handleStepEnter1)
	// .OnStepExit(handleStepExit2)
	.onContainerEnter(handleContainerEnter1).onContainerExit(handleContainerExit1);

  scroller2.setup({
    container: '#container-scroll2',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.step2',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

  scroller3.setup({
    container: '#container-scroll3',
    // graphic: '.scroll__figure2',
    // text: '.scroll__text2',
    step: '.step3',
    offset: 0.75,
    debug: false
  }).onStepEnter(handleStepEnter2)
  // .OnStepExit(handleStepExit2)
  .onContainerEnter(handleContainerEnter2).onContainerExit(handleContainerExit2);

}




   function nonMetroFuncSmall(countyCode) {

      g.selectAll(".dotTwo")
          // .attr("r", 3)
          .transition()
          .duration(500)
          .style("opacity", function(d) {
            if (d.code==3 && d.colorGroup >4) {return 1}
            else if (d.code!=3 && d.colorGroup> 4) {return .35}
            else  { return 0 }
        })
          .attr('r', function(d) {
            if (d.code==3 && d.colorGroup >4) {return 6}
            else if (d.code!=3 && d.colorGroup >4) {return 4}
            else  { return 0 }
        })
          .attr('stroke', "#ecf2f2")

          .attr('stroke-width', function(d) {
            if (d.code==3 && d.colorGroup >4) {return .25}
            else  { return 0 }
        });


}







init();

});

function countySelect(county) {

  if (stateList.includes(county)==true) {

    g2.selectAll("circle")
        // .attr("r", 3)
        .transition()
        .duration(500)
        .attr('class', function(d) {
          if (county == d.state) {return "zDot"}
          else 	{ return "noZDot" }
      } )
      .style("opacity", function(d) {
        if (county == d.state) {return 1}
        else 	{ return .4 }
    })
    .attr('r', function(d) {
      if (county == d.state) {return 5}
      else 	{ return 1.25 }
  })
  .attr('stroke-width', function(d) {
    if (county == d.state) {return 1}
    else 	{ return 0 }
});


}

  else {
      g2.selectAll("circle")
      	  // .attr("r", 3)
      	  .transition()
      	  .duration(500)
      	  .attr('class', function(d) {
            if (county == d.countyListName) {return "zDot"}
            else 	{ return "noZDot" }
        } )
          .style("opacity", function(d) {
            if (county == d.countyListName) {return 1}
            else 	{ return .4 }
        })
          .attr('r', function(d) {
            if (county == d.countyListName) {return 5}
            else 	{ return 1.25 }
        })
          .attr('stroke', "grey")
          .style("z-index", function(d) {
            if (county == d.countyListName) {return "999"}
            else 	{ return "0" }
        })
          .attr('stroke-width', function(d) {
            if (county == d.countyListName) {return 1}
            else 	{ return 0 }
        });

      }


   }

function reset() {
	 g2.selectAll(".dotTwo")
      	  // .attr("r", 3)
      	  .transition()
      	  .duration(500)
          .style("opacity", 1)
          .attr('r', 3)
          .attr('stroke-width', .5);
}

function largeMetroFunc(countyCode) {

      g2.selectAll(".dotTwo")
          // .attr("r", 3)
          .transition()
          .duration(500)
          .attr('class', function(d) {
            if (d.code==1)  {return "zDot"}
            else  { return "noZDot" }
        } )
        .attr("class", "dotTwo")
          .style("opacity", function(d) {
            if (d.code==1) {return 1}
            else  { return .4 }
        })
          .attr('r', function(d) {
            if (d.code==1) {return 5}
            else  { return 1.25 }
        })
          .attr('stroke', "#ecf2f2")

          .attr('stroke-width', function(d) {
            if (d.code==1) {return .75}
            else  { return 0 }
        });


}

function msMetroFunc(countyCode) {

      g2.selectAll(".dotTwo")
          // .attr("r", 3)
          .transition()
          .duration(500)
          .attr('class', function(d) {
            if (d.code==2)  {return "zDot"}
            else  { return "noZDot" }
        } )
        .attr("class", "dotTwo")
          .style("opacity", function(d) {
            if (d.code==2) {return 1}
            else  { return .4 }
        })
          .attr('r', function(d) {
            if (d.code==2) {return 5}
            else  { return 1.25 }
        })
          .attr('stroke', "#ecf2f2")

          .attr('stroke-width', function(d) {
            if (d.code==2) {return .75}
            else  { return 0 }
        });


}

function nonMetroFunc(countyCode) {

      g2.selectAll("circle")
          // .attr("r", 3)
          .transition()
          .duration(500)
          .attr('class', function(d) {
            if (d.code==3)  {return "zDot"}
            else  { return "noZDot" }
        } )
          .attr("class", "dotTwo")
          .style("opacity", function(d) {
            if (d.code==3) {return 1}
            else  { return .4 }
        })
          .attr('r', function(d) {
            if (d.code==3) {return 5}
            else  { return 1.25 }
        })
          .attr('stroke', "#ecf2f2")

          .attr('stroke-width', function(d) {
            if (d.code==3) {return .75}
            else  { return 0 }
        });


}

function changeEndSlide(countyData) {


      g2.append('g')
      .attr("class", "xaxis2")
      .attr("transform", "translate(0," + yEND.range()[0]*.6 + ")")
      .style("stroke","#000")
      .style("opacity", .7)
      .call(d3.axisBottom(xEND).ticks(7).tickFormat(function(d) {
      return  d===-2 ? "-100" : d===-4 ? "-10,000" : d===-6 ? "-1,000,000" : d===6 ? "1,000,000" : d=== 4 ? "10,000" :  d=== 2 ? "100" :  d===0 ? "": d }
    ));
      // .attr("transform", "translate(" +xNegNeg.range()[1] + ","+yNegNeg.range()[1]+")")
      //   .call(d3.axisBottom(xNegNeg).ticks(12));

      g2.append('g')
      .attr("class", "yaxis2")
      .attr("transform", "translate(" +((xEND.range()[1]/2)+25) + ", 0)")
      .style("stroke","#000")
      .style("opacity", .7)
      .call(d3.axisLeft(yEND).ticks(6).tickFormat(function(d) {
      return d===-2 ? "-100" : d===-4 ? "-10,000" : d===6 ? "1,000,000" : d=== 4 ? "10,000" : d=== 2 ? "100" : d===0 ? "": d }
    ));



      g2.append("text")
        .attr("class", "axisTextx")
        .attr("transform",
              "translate(" + (domainwidth2/2) + " ," +
                             (domainheight2 + margin2.top/2) + ")")
        .style("text-anchor", "middle")
        .style("fill", "#000")
        .text("Population change, domestic");

      g2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "axisTexty")
        .attr("y", 0-(margin2.left*.1))
        .attr("x", function(d) {if (window.innerWidth < 550){return 0-domainheight2*.3} else {return 0-domainheight2*.6}})
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "#000")
        .text("Population change, international");

  // gP.selectAll(".dot").remove()
  // svgP.selectAll(".dot").remove()

   g2.selectAll(".dotTwo")
   .transition().duration(500)
       .attr("cx", function(d) { return xEND(d.difIntMig); })
     .attr("cy", function(d) { return yEND(d.intMig); })
       .attr("stroke", "#ecf2f2")
       .attr("stroke-width", .75)
       .style("z-index", 1)
       .attr("state-id", function(d){ return d.state})


      if (window.innerWidth > 550) {


       g2.append("path")
         .attr("d", symTri)
         .attr("class","triangleToolUp")
         .attr("fill","black")
         .attr("transform", "translate("+domainwidth2*.0033 +","+domainheight2*.365+")");

         g2.append("path")
           .attr("d", symTri)
           .attr("class","triangleToolDown")
           .attr("fill","black")
           .attr("transform", "translate(" + domainwidth2*.0033 + "," + domainheight2*.84 +") rotate(-180)")


           g2.append("path")
             .attr("d", symTri)
             .attr("class","triangleToolLeft")
             .attr("fill","black")
             .attr("transform", "translate(" + domainwidth2*.365 + "," + domainheight2*1.05 +") rotate(-90)")


             g2.append("path")
               .attr("d", symTri)
               .attr("class","triangleToolRight")
               .attr("fill","black")
               .attr("transform", "translate(" + domainwidth2*.64 + "," + domainheight2*1.05 +") rotate(-270)")


             }






}


function changeEndMapSlide(countyData) {

  d3.selectAll(".xaxis2").remove()
  d3.selectAll(".yaxis2").remove()
  d3.selectAll(".axisTextx").remove()
  d3.selectAll(".axisTexty").remove()
  d3.selectAll(".triangleToolLeft").remove()
  d3.selectAll(".triangleToolRight").remove()
  d3.selectAll(".triangleToolUp").remove()
  d3.selectAll(".triangleToolDown").remove()


  projectionLarge
   .scale(1.6*domainwidth)


g2.selectAll(".dotTwo")
   .transition()
   .duration(500)
   .attr("cx",function(d) {if (window.innerWidth < 550){return (projectionLarge([d.long,d.lat])[0])-320} else {return (projectionLarge([d.long,d.lat])[0]);}})
   .attr("cy",function(d) { return (projectionLarge([d.long,d.lat])[1])+50;})
   .attr("stroke", "#ecf2f2")
   .attr("stroke-width", .45)
   .style("fill", function(d){ return color5(d.colorGroup);})

}


$('#slideSwitch').change(function() {

  if ($(this).is(":checked")){

  changeEndSlide(countyData)
  document.getElementById("viewScatter").style.opacity = 0
  document.getElementById("viewMap").style.opacity = 1

}
    else {
      changeEndMapSlide(countyData)
      document.getElementById("viewScatter").style.opacity = 1
      document.getElementById("viewMap").style.opacity = 0

  }

});








// kick things off
