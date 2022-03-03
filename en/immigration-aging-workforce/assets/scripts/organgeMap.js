function newjerseyBar (input, speed) {

    d3.selectAll("svg").remove

    		njerBar.selectAll(".percentTextNJer")
    		.remove()

        njerBar.selectAll(".titleOrangeNJer")
    		.remove()

        njerBar.selectAll(".workUSTextNJer")
        .remove()

        njerBar.selectAll(".workForTextNJer")
        .remove()

        njerBar.selectAll(".workTotTextNJer")
        .remove()

        njerBar.selectAll(".yearTextNJer")
        .remove()

    var yAxisNJer = njerBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axis")

    var xAxisNJer = njerBar.append("g")
      .attr("transform", `translate(${halfAxis+gutter+margin.left},${height - margin.bottom})`)
      .attr("class", "x-axis")

    var yAxisLNJer = njerBar.append("g")
      .attr("transform", `translate(${halfAxis+margin.left+gutter},0)`)
      .attr("class", "y-axisL")

    var xAxisLNJer = njerBar.append("g")
      .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
      .attr("class", "x-axisL")



    		var yearSelect = input


    		var dataNJerFilter = csv.filter(function(d) { return d.year == yearSelect;})
    			   .filter(function(d) { return d.statefip == "New Jersey";});

        //IMPORTANT - this will make the slider adjust.  For the main tool, do this!!!  for cases don't
    		// var max = d3.max(dataFilter, function(d) { return +d.nativeBorn; });
        var maxNJer = 600000
    		// x2.domain(1000000,0)

    		x.domain([0, maxNJer]).nice();
    		xL.domain([maxNJer,0]).nice();



    			njerBar.selectAll(".y-axis")
    			.call(d3.axisLeft(y)
    			.tickPadding(10)
    			.tickSize(0))
    			.style('stroke','white')
    			.style('fill', 'none')
    			.style('stroke-width', '0px');

    		y.domain(dataNJerFilter.map(d => d.age_cohorts));
    		yL.domain(dataNJerFilter.map(d => d.age_cohorts));

    		njerBar.selectAll(".x-axis").transition().duration(speed)
    			.call(d3.axisBottom(x).tickSizeOuter(0).ticks(8, "s"))

    		njerBar.selectAll(".x-axisL").transition().duration(speed)
    			.call(d3.axisBottom(xL).tickSizeOuter(0).ticks(8, "s"))



           	var barsNJer = njerBar.selectAll( '.barsNJer' ).data(dataNJerFilter)
        	var bars2NJer = njerBar.selectAll( '.bars2NJer' ).data(dataNJerFilter)

        	barsNJer.transition().duration(750)
                .attr("x", x(0)+halfAxis+gutter+margin.left)
                .attr("width", function(d) { return x(+d.foreignBorn); })

            bars2NJer.transition().duration(750)
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })



        	barsNJer.exit().remove();
        	bars2NJer.exit().remove();



        	barsNJer.enter().append( 'rect' )
              .attr("class", "barsNJer")
              .attr("y",function(d) { return y(d.age_cohorts); })
                // .call(log, function(d) { return x(+d.nativeBorn)+halfAxis+margin; })
              .attr("height", y.bandwidth())
              .attr("x", x(0)+halfAxis+gutter+margin.left)
              .attr("width", function(d) { return x(+d.foreignBorn); })
              .attr('z-index',1)
              .attr('fill', "#6263F1");

    		bars2NJer.enter().append('rect')
    			     .attr("class", "bars2NJer")
                .attr("y",function(d) { return yL(d.age_cohorts); })
                // .call(log, function(d) { return xL(+d.foreignBorn)+halfAxis; })
                .attr("height", yL.bandwidth())
                .attr("x", function(d) { return xL(+d.nativeBorn)+margin.left;})
                .attr("width", function(d) { return x(+d.nativeBorn); })
                .attr('z-index',1)
                .attr('fill', "#FF7150");


    	var perTextNJer = njerBar.append('text')
    		.data(dataNJerFilter)
    		.attr('x',width*.8)
    		.attr('y',height*.5)
    		.attr('class',"percentTextNJer")
    		.attr('z-index',10)
    		.attr('fill', "white")
    		.text(function(d) {return formatPercent(d.foreignWorkPer)});

        var descTextNJer = njerBar.append('text')
      		.data(dataNJerFilter)
      		.attr('x',width*.8)
      		.attr('y',height*.575)
      		.attr('class',"titleOrangeNJer")
      		.attr('z-index',10)
      		.attr('fill', "white")
      		.text("Percent Foreign Born Working Age");

        var yearTextNJer = njerBar.append('text')
          .data(dataNJerFilter)
          .attr('x',width*.8)
          .attr('y',height*.375)
          .attr('class',"yearTextNJer")
          .attr('z-index',10)
          .attr('fill', "white")
          .text(function(d) {return (d.year)});
    		// .text(dataFilter.map(d => d.foreignWorkPer[0]));

      var workUSTextNJer = njerBar.append('text')
        .data(dataNJerFilter)
        .attr('x',width*.125)
        .attr('y',height*.915)
        .attr('class',"workUSTextNJer")
        .attr('z-index',10)
        .attr('fill', "#FF7150")
        .text(function(d) {return "U.S. Born Working Age: "+formatComma(d.workNat)});

      var workForTextNJer = njerBar.append('text')
        .data(dataNJerFilter)
        .attr('x',width*.625)
        .attr('y',height*.915)
        .attr('class',"workForTextNJer")
        .attr('z-index',10)
        .attr('fill', "#6263F1")
        .text(function(d) {return "Foreign Born Working Age: "+formatComma(d.workFor)});

      var workTotalNJer = njerBar.append('text')
        .data(dataNJerFilter)
        .attr('x',width*.37)
        .attr('y',height*.95)
        .attr('class',"workTotTextNJer")
        .attr('z-index',10)
        .attr('fill', "#393745")
        .text(function(d) {return "Total Working Age: "+formatComma(d.TotalWork)});
}

function njerBarPlacement (){
  var njerBands = d3.select("#njerBar").append("rect")
  .attr("x", 0)
  .attr("y", height*.265)
  .attr("width", width)
  .attr("height", height*.355)
  .attr("fill", "#FECEBA")
  .attr('class',"bandsMich")
  .attr('z-index',-5)

  njerGlobal = 1
}
