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

var widthScreen = window.innerWidth

var heightScreen = window.innerHeight



var svg2 = d3.select(".scroll__figure1")
			  .append("svg")
		  	.attr("id", "svgPlot")

var svg3 = d3.select(".scroll__figure2")
        		.append("svg")
        		.attr("id", "svgPlot2")

var margin = {top: .08*heightScreen, right: .1*widthScreen, bottom: .15*heightScreen, left: .1*widthScreen}




var width = +svg2.attr("width", window.innerWidth),
    height = +svg2.attr("height",  window.innerHeight),
    domainwidth = widthScreen - margin.left - margin.right,
    domainheight = heightScreen - margin.top - margin.bottom;


var percent = d3.format(",.1%")
var number = d3.format(",.1f")
var regNum = d3.format(",")
var numberColor = d3.format(",.2f")


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

function padExtent(e, p) {
    if (p === undefined) p = 0;
    return ([e[0] - p, e[1] + p]);
}

var scroller1 = scrollama();

var defs = svg2.append("defs")

var x = d3.scaleLinear()
    .domain(padExtent([0,100]))
    .range(padExtent([0, domainwidth]));

    var xColor = d3.scaleLinear()
        .domain(padExtent([.03,.68]))
        .range(padExtent([15, domainwidth*.33]));

var y = d3.scaleLinear()
    .domain(padExtent([0,100]))
    .range(padExtent([domainheight, 0]));


var radius = 3;

var div = d3.select(".scroll__figure2").append("div")
    .attr("class", "tooltip")
    // .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", 999);

var gradient = ["#6263F1", "#6264F1", "#6366F1", "#6368F1", "#646AF1", "#656CF1", "#656EF2", "#666FF2", "#6671F2", "#6773F2", "#6875F2", "#6877F2", "#6979F3", "#697AF3", "#6A7CF3", "#6B7EF3", "#6B80F3", "#6C82F3", "#6C84F4", "#6D85F4", "#6E87F4", "#6E89F4", "#6F8BF4", "#6F8DF4", "#708FF5", "#7190F5", "#7192F5", "#7294F5", "#7296F5", "#7398F5", "#749AF6", "#749BF6", "#759DF6", "#769FF6", "#76A1F6", "#77A3F6", "#77A5F7", "#78A6F7", "#79A8F7", "#79AAF7", "#7AACF7", "#7AAEF7", "#7BB0F8", "#7CB1F8", "#7CB3F8", "#7DB5F8", "#7DB7F8", "#7EB9F8", "#7FBBF9", "#7FBCF9", "#80BEF9", "#80C0F9", "#81C2F9", "#82C4F9", "#82C6FA", "#83C7FA", "#83C9FA", "#84CBFA", "#85CDFA", "#85CFFA", "#86D1FB", "#86D2FB", "#87D4FB", "#88D6FB", "#88D8FB", "#89DAFB", "#8ADCFC"]

var colorWork = d3.scaleThreshold()
        .domain([0.00,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.1,0.11,0.12,0.13,0.14,0.15,0.16,0.17,0.18,0.19,0.2,0.21,0.22,0.23,0.24,0.25,0.26,0.27,0.28,0.29,0.3,0.31,0.32,0.33,0.34,0.35,0.36,0.37,0.38,0.39,0.40,0.41,0.42,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.50,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.60,0.61,0.62,0.63,0.64,0.65,0.66,0.67,0.68])
          // .range(["#555555","#8ADCFC", "#89DAFB", "#88D8FB", "#88D6FB", "#87D4FB", "#86D2FB", "#86D1FB", "#85CFFA", "#85CDFA", "#84CBFA", "#83C9FA", "#83C7FA", "#82C6FA", "#82C4F9", "#81C2F9", "#80C0F9", "#80BEF9", "#7FBCF9", "#7FBBF9", "#7EB9F8", "#7DB7F8", "#7DB5F8", "#7CB3F8", "#7CB1F8", "#7BB0F8", "#7AAEF7", "#7AACF7", "#79AAF7", "#79A8F7", "#78A6F7", "#77A5F7", "#77A3F6", "#76A1F6", "#769FF6", "#759DF6", "#749BF6", "#749AF6", "#7398F5", "#7296F5", "#7294F5", "#7192F5", "#7190F5", "#708FF5", "#6F8DF4", "#6F8BF4", "#6E89F4", "#6E87F4", "#6D85F4", "#6C84F4", "#6C82F3", "#6B80F3", "#6B7EF3", "#6A7CF3", "#697AF3", "#6979F3", "#6877F2", "#6875F2", "#6773F2", "#6671F2", "#666FF2", "#656EF2", "#656CF1", "#646AF1", "#6368F1", "#6366F1", "#6264F1", "#6263F1"])
          // .range(["#555555","#ECF2F2", "#E9F1F1", "#E6F1F1", "#E4F0F1", "#E1F0F1", "#DFEFF1", "#DCEFF1", "#D9EEF1", "#D7EEF1", "#D4EDF1", "#D2EDF1", "#CFECF1", "#CCECF1", "#CAEBF1", "#C7EBF1", "#C5EAF1", "#C2EAF1", "#C0EAF1", "#BCE9F1", "#B9E8F2", "#B6E7F2", "#B3E6F3", "#B0E5F4", "#ACE5F4", "#A9E4F5", "#A6E3F6", "#A3E2F6", "#A0E1F7", "#9DE0F8", "#99E0F8", "#96DFF9", "#93DEFA", "#90DDFA", "#8DDCFB", "#8ADCFC", "#86D5F7", "#82CEF2", "#7EC8ED", "#7BC1E8", "#77BBE3", "#73B4DE", "#6FAED9", "#6CA7D4", "#68A0CF", "#649ACA", "#6093C5", "#5D8DC0", "#5986BB", "#5580B6", "#5179B1", "#4E73AD", "#4C6FAA", "#4B6BA7", "#4A67A4", "#4864A1", "#47609E", "#465C9B", "#445898", "#435595", "#425192", "#404D8F", "#3F498C", "#3E4689", "#3C4286", "#3B3E83", "#3A3A80", "#39377E"])
          .range(["#555555","#ECF2F2", "#E8F1F1", "#E5F0F1", "#E1F0F1", "#DEEFF1", "#DBEEF1", "#D7EEF1", "#D4EDF1", "#D0EDF1", "#CDECF1", "#CAEBF1", "#C6EBF1", "#C3EAF1", "#C0EAF1", "#BBE8F1", "#B7E7F2", "#B2E6F3", "#AEE5F4", "#A9E4F5", "#A5E3F6", "#A0E1F7", "#9CE0F8", "#97DFF9", "#93DEFA", "#8EDDFB", "#8ADCFC", "#85D3F5", "#80CAEE", "#7BC1E8", "#76B9E1", "#71B0DB", "#6CA7D4", "#679ECD", "#6296C7", "#5D8DC0", "#5884BA", "#537BB3", "#4E73AD", "#4C6EA9", "#4A69A5", "#4864A1", "#475F9D", "#455A99", "#435595", "#415091", "#404B8D", "#3E4689", "#3C4185", "#3A3C81", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E", "#39377E"])

var g = svg2.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

    var g2 = svg3.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top+ ")");






// END AUTO COMPLETE

svg2.append("text")
.attr("x", widthScreen*.5)
.attr("y", 40)
.attr('text-anchor',"middle")
.attr("class","titleSVG")
.text("TITLE");


var sqrtScale = d3.scaleSqrt()
                  .domain([1000, 3772790])
                  .range([1, 25]);

var scaleOpacityH = d3.scaleLinear()
                      .domain([0, .28])
                      .range([0, 1]);

var scaleOpacity = d3.scaleLinear()
                      .domain([0, .68])
                      .range([.25, 1]);

    function reset() {
              console.log("hit")
              d3.selectAll("circle")
                         // .attr("r", 3)
                .transition()
                .duration(1000)
                .style("opacity", .8)
                .attr('stroke-width', .5);
                      }




d3.csv("assets/coronaworkers_final_3.csv")
    .then(function(data) {
    // Coerce the strings to numbers.
    data.forEach(function(d) {
        d.proximity= +d.det_phys_prox;
        d.exposure = +d.det_exp_to_dis_or_inf;
        d.job = d.nyt_name;
        d.empNumberNYT= +d.nyt_emp;
        d.fbShare = +d.fbshare
        d.empNumberOES = +d.oes_totpop;
        d.above = +d.aboveAVG;
        d.health = +d.healthProfessions;
        d.idOES = d.oes;
        d.fbShareColor = +d.fbshareColor;
    });




 function startChange() {



   g.selectAll('.xaxis').remove()

   g.selectAll('.yaxis').remove()
   g.selectAll('.axisTextyA').remove()
   g.selectAll('.axisTextxA').remove()
   g.selectAll('.dot').remove()


   g.append("text")
   .attr("x", function(d) { return x(0)+20; })
   .attr("y", function(d) { return y(25)-2; })
   .attr('class',"axisTitleY")
   .style("text-anchor", "left")
   .style("fill", "#26cd65")
   .text("Once a Year")

   g.append("text")
   .attr("x", function(d) { return x(0)+20; })
   .attr("y", function(d) { return y(50)-2; })
   .attr('class',"axisTitleY")
   .style("text-anchor", "left")
   .style("fill", "#26cd65")
   .text("Once a Month")

   g.append("text")
   .attr("x", function(d) { return x(0)+20; })
   .attr("y", function(d) { return y(75)-2; })
   .attr('class',"axisTitleY")
   .style("text-anchor", "left")
   .style("fill", "#26cd65")
   .text("Once a Week")

   g.append("text")
   .attr("x", function(d) { return x(0)+20; })
   .attr("y", function(d) { return y(100)-2; })
   .attr('class',"axisTitleY")
   .style("text-anchor", "left")
   .style("fill", "#26cd65")
   .text("Every Day")

   g.append("text")
   .attr("x", function(d) { return x(0)+20; })
   .attr("y", function(d) { return y(0)-2; })
   .attr('class',"axisTitleY")
   .style("text-anchor", "left")
   .style("fill", "#26cd65")
   .text("Never")

   g.append("text")
   .attr("x", function(d) { return x(0); })
   .attr("y", function(d) { return y(100)+20; })
   .attr('class',"axisTitleX")
   .style("background", "#fff")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Work")

   g.append("text")
   .attr("x", function(d) { return x(0); })
   .attr("y", function(d) { return y(100)+40; })
   .attr('class',"axisTitleX")
   .style("background", "#fff")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Alone")

   g.append("text")
   .attr("x", function(d) { return x(25); })
   .attr("y", function(d) { return y(100)+20; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Not")

   g.append("text")
   .attr("x", function(d) { return x(25); })
   .attr("y", function(d) { return y(100)+40; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Close")

   g.append("text")
   .attr("x", function(d) { return x(50); })
   .attr("y", function(d) { return y(100)+20; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Slightly")

   g.append("text")
   .attr("x", function(d) { return x(50); })
   .attr("y", function(d) { return y(100)+40; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Close")

   g.append("text")
   .attr("x", function(d) { return x(75); })
   .attr("y", function(d) { return y(100)+20; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Moderately")

   g.append("text")
   .attr("x", function(d) { return x(75); })
   .attr("y", function(d) { return y(100)+40; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Close")

   g.append("text")
   .attr("x", function(d) { return x(100); })
   .attr("y", function(d) { return y(100)+20; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Very")

   g.append("text")
   .attr("x", function(d) { return x(100); })
   .attr("y", function(d) { return y(100)+40; })
   .attr('class',"axisTitleX")
   .style("text-anchor", "middle")
   .style("fill", "#26cd65")
   .text("Close")






      g.append("g")
           .attr("class", "xaxis")
           .attr("transform", "translate("+x.range()[0]+"," + y.range()[0] + ")")
           .style("stroke","#3A3745")
           .style("opacity", .45)
           .call(d3.axisBottom(x).tickSize(-heightScreen+margin.top+margin.bottom).tickValues([0,25,50,75,100]));



       g.append("g")
           .attr("class", "yaxis")
           .attr("transform", "translate(" + x.range()[0] + ","+y.range()[1]+")")
           .style("stroke","#3A3745")
           .style("opacity", .45)
           .call(d3.axisLeft(y).tickSize(-widthScreen+margin.left+margin.right).tickValues([0,25,50,75,100]));




         g.append("text")
           .attr("class", "axisTextxA")
           .attr("transform",
                 "translate(" + (domainwidth/2) + " ," +
                                (domainheight + 40) + ")")
           .style("text-anchor", "middle")
           .style("fill", "#3A3745")
           .text("Proximity");

         g.append("text")
           .attr("transform", "rotate(-90)")
           .attr("class", "axisTextyA")
           .attr("y", function(d){ if (widthScreen<550) {return -40} else {return -50}} )
           .attr("x", 0-domainheight*.5)
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .style("fill", "#3A3745")
           .text("Exposure");

           var legend = svg2.append("g")
           		.attr("transform", "translate(" + margin.left + "," + 720+ ")")
              .attr("class", "legendTicks");


           legend.selectAll("rect")
          .data(colorWork.range().map(function(d) {
              d = colorWork.invertExtent(d);
              if (d[0] == null) d[0] = xColor.domain()[0];
              if (d[1] == null) d[1] = xColor.domain()[1];
              return d;
            }))
          .enter().append("rect")
            .attr("height", 20)
            .attr("x", function(d) { return xColor(d[0]); })
            .attr("y", 0)
            // .attr("width", function(d) { return (x(d[1]) - x(d[0]))*5; })
            .attr("width", function(d) { return (xColor(d[1]) - xColor(d[0])); })
            .attr("fill", function(d) { return colorWork(d[0]); });

            legend.call(d3.axisBottom(xColor)
                .tickSize(25)
                .tickFormat(function(x, i) { if (x==0) {return "3%"} else if (x==.5) {return "50%+"}})
                .tickValues(colorWork.domain()))
                .select(".domain")
                .remove();

            legend.append('text')
                  .attr("x", 65)
                  .attr("y", -5)
                  .attr("class","legendTitle")
                  .style("text-anchor", "left")
                  .style("fill", "#3A3745")
                  .text("Foreign-Born Share")


    function createDots() {

           g.selectAll(".dot")
               .data(data)
               // .transition()
               // .duration(1000)
               .enter()
               .append("circle")
               .attr("class", "dot")
               // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
               .attr("r", function(d) { return sqrtScale(d.empNumberOES)})
               .attr("cx", function(d) { return x(d.proximity); })
               .attr("cy", function(d) { return y(d.exposure); })
               .attr("stroke", "#393745")
               .attr("stroke-width", .5)
               // .style("fill", "#6263f1")
               .style("fill",function(d) {return colorWork(d.fbShareColor) })
               .style('opacity', .8)
               .on("mouseover", handleMouseOver)
               .on("mouseout", handleMouseOut);
             }





             createDots();

           }



      function occupationSelect(occu) {



                   g2.selectAll("circle")
                   	  // .attr("r", 3)
                   	  .transition()
                   	  .duration(1000)
                   	  .attr('class', function(d) {
                         if (occu == d.job) {return "zDot"}
                         else 	{ return "noZDot" }
                     } )
                       .style("opacity", function(d) {
                         if (occu == d.job) {return 1}
                         else 	{ return .1 }
                     })
                       .attr('r', function(d) {
                         return sqrtScale(d.empNumberOES)})
                       .attr('stroke', "#39377E")
                       .style("z-index", function(d) {
                         if (occu == d.job) {return "999"}
                         else 	{ return "0" }
                     })
                     //   .attr('stroke-width', function(d) {
                     //     if (occu == d.job) {return 1.5}
                     //     else 	{ return 0 }
                     // })
                       .attr("id", function(d) {return "id"+d.idOES});


                }








      function startChange2() {


                  var occupations = ["Chief Executives", "General and Operations Managers","Advertising and Promotions Managers", "Marketing Managers", "Sales Managers", "Public Relations and Fundraising Managers", "Administrative Services Managers", "Computer and Information Systems Managers", "Financial Managers", "Industrial Production Managers", "Purchasing Managers", "Transportation, Storage, and Distribution Managers", "Compensation and Benefits Managers", "Human Resources Managers", "Training and Development Managers", "Farmers, Ranchers, and Other Agricultural Managers", "Construction Managers", "Education Administrators", "Architectural and Engineering Managers", "Food Service Managers", "Gaming Managers", "Lodging Managers", "Medical and Health Services Managers", "Natural Sciences Managers", "Property, Real Estate, and Community Association Managers", "Social and Community Service Managers", "Emergency Management Directors", "Managers, All Other", "Agents and Business Managers of Artists, Performers, and Athletes", "Claims Adjusters, Appraisers, Examiners, and Investigators", "Compliance Officers", "Cost Estimators", "Human Resources Workers", "Logisticians", "Management Analysts", "Meeting, Convention, and Event Planners", "Fundraisers", "Compensation, Benefits, and Job Analysis Specialists", "Training and Development Specialists", "Market Research Analysts and Marketing Specialists", "Business Operations Specialists, All Other", "Accountants and Auditors", "Appraisers and Assessors of Real Estate", "Budget Analysts", "Credit Analysts", "Financial Analysts", "Personal Financial Advisors", "Insurance Underwriters", "Financial Examiners", "Credit Counselors and Loan Officers", "Tax Examiners and Collectors, and Revenue Agents", "Tax Preparers", "Computer and Information Research Scientists", "Computer Systems Analysts", "Information Security Analysts", "Computer Programmers", "Software Developers, Applications", "Software Developers, Systems Software", "Web Developers", "Database Administrators", "Network and Computer Systems Administrators", "Computer Network Architects", "Computer Support Specialists", "Computer Occupations, All Other", "Actuaries", "Operations Research Analysts", "other mathematical science occupations, including mathematicians and statisticians", "Architects, Except Landscape and Naval", "Landscape Architects", "Surveyors, Cartographers, and Photogrammetrists", "Aerospace Engineers", "Biomedical and Agricultural Engineers", "Chemical Engineers", "Civil Engineers", "Computer Hardware Engineers", "Electrical and Electronics Engineers", "Environmental Engineers", "Industrial Engineers, Including Health and Safety", "Marine Engineers and Naval Architects", "Materials Engineers", "Mechanical Engineers", "Petroleum, mining and geological engineers, including mining safety engineers", "Engineers, All Other", "Other Drafters", "Architectural and Civil Drafters", "Electrical and Electronics Engineering Technicians", "Other Engineering Technicians, Except Drafters", "Surveying and Mapping Technicians", "Agricultural and Food Scientists", "Biological Scientists", "Conservation Scientists and Foresters", "Other Life Scientists", "Astronomers and Physicists", "Atmospheric and Space Scientists", "Chemists and Materials Scientists", "Geoscientists and Hydrologists, Except Geographers", "Environmental Scientists and Specialists, Including Health", "Physical Scientists, All Other", "Economists", "Clinical, Counseling, and School Psychologists", "Other Psychologists", "Urban and Regional Planners", "Other Social Scientists", "Agricultural and Food Science Technicians", "Biological Technicians", "Chemical Technicians", "Environmental science and geoscience technicians, and nuclear technicians", "Other Life, Physical, and Social Science Technicians", "Educational, Guidance, School, and Vocational Counselors", "Marriage and Family Therapists", "Rehabilitation Counselors", "Child, Family, and School Social Workers", "Healthcare Social Workers", "Mental Health and Substance Abuse Social Workers", "Probation Officers and Correctional Treatment Specialists", "Social and Human Service Assistants", "Other community and social service specialists", "Clergy", "Directors, Religious Activities and Education", "Lawyers, and Judges, Magistrates and Other Judicial Workers", "Judicial Law Clerks", "Paralegals and Legal Assistants", "Court Reporters", "Title Examiners, Abstractors, and Searchers", "Postsecondary Teachers", "Preschool and Kindergarten Teachers", "Elementary and Middle School Teachers", "Secondary School Teachers", "Special Education Teachers", "Other Teachers and Instructors", "Archivists, Curators, and Museum Technicians", "Librarians and Media Collections Specialists", "Library Technicians", "Other Education, Training, and Library Workers", "Teaching Assistants", "Artists and Related Workers", "Commercial and Industrial Designers", "Fashion Designers", "Floral Designers", "Graphic Designers", "Interior Designers", "Merchandise Displayers and Window Trimmers", "Set and Exhibit Designers", "Actors", "Producers and Directors", "Athletes and Sports Competitors", "Coaches and Scouts", "Umpires, Referees, and Other Sports Officials", "Dancers and Choreographers", "Music Directors and Composers", "Musicians and Singers", "Announcers", "News Analysts, Reporters and Journalists", "Public Relations Specialists", "Editors", "Technical Writers", "Writers and Authors", "Interpreters and Translators", "Other media and communication equipment workers", "Photographers", "Television, Video, and Motion Picture Camera Operators and Editors", "Chiropractors", "Dentists", "Dietitians and Nutritionists", "Optometrists", "Pharmacists", "Physicians", "Surgeons", "Physician Assistants", "Podiatrists", "Occupational Therapists", "Physical Therapists", "Radiation Therapists", "Recreational Therapists", "Respiratory Therapists", "Speech-Language Pathologists", "Exercise Physiologists", "Veterinarians", "Registered Nurses", "Nurse Anesthetists", "Nurse Practitioners and Nurse Midwives", "Audiologists", "Health Diagnosing and Treating Practitioners, All Other", "Dental Hygienists", "Cardiovascular Technologists and Technicians", "Diagnostic Medical Sonographers", "Nuclear Medicine Technologists", "Radiologic Technologists", "Magnetic Resonance Imaging Technologists", "Emergency Medical Technicians and Paramedics", "Dietetic Technicians and Ophthalmic Medical Technicians", "Pharmacy Technicians", "Psychiatric Technicians", "Surgical Technologists", "Veterinary Technologists and Technicians", "Licensed Practical and Licensed Vocational Nurses", "Medical Records and Health Information Technicians", "Opticians, Dispensing", "Miscellaneous Health Technologists and Technicians", "Other Healthcare Practitioners and Technical Occupations", "Home Health Aides", "Nursing Assistants", "Orderlies and Psychiatric Aides", "Occupational Therapy Assistants and Aides", "Physical Therapist Assistants and Aides", "Massage Therapists", "Dental Assistants", "Medical Assistants", "Medical Transcriptionists", "Pharmacy Aides", "Veterinary Assistants and Laboratory Animal Caretakers", "Phlebotomists", "Healthcare Support Workers, All Other", "First-Line Supervisors of Correctional Officers", "First-Line Supervisors of Police and Detectives", "First-Line Supervisors of Fire Fighting and Prevention Workers", "Firefighters", "Fire Inspectors", "Bailiffs", "Correctional Officers and Jailers", "Detectives and Criminal Investigators", "Fish and Game Wardens, and Parking Enforcement Officers", "Police and Sheriff's Patrol Officers", "Animal Control Workers", "Private Detectives and Investigators", "Security Guards and Gaming Surveillance Officers", "Crossing Guards", "Transportation Security Screeners", "Lifeguards and Other Protective Service Workers", "Chefs and Head Cooks", "First-Line Supervisors of Food Preparation and Serving Workers", "Cooks", "Food Preparation Workers", "Bartenders", "Fast Food and Counter Workers", "Waiters and Waitresses", "Food Servers, Nonrestaurant", "Dining Room and Cafeteria Attendants and Bartender Helpers", "Dishwashers", "Hosts and Hostesses, Restaurant, Lounge, and Coffee Shop", "First-Line Supervisors of Housekeeping and Janitorial Workers", "First-Line Supervisors of Landscaping, Lawn Service, and Groundskeeping Workers", "Janitors and Cleaners, Except Maids and Housekeeping Cleaners", "Maids and Housekeeping Cleaners", "Pest Control Workers", "Landscaping and Groundskeeping Workers", "Tree Trimmers and Pruners", "First-Line Supervisors of Personal Service Workers", "Animal Trainers", "Nonfarm Animal Caretakers", "Gambling Services Workers", "Ushers, Lobby Attendants, and Ticket Takers", "Other Entertainment Attendants and Related Workers", "Embalmers, Crematory Operators and Funeral Attendants", "Morticians, Undertakers, and Funeral Directors", "Barbers", "Hairdressers, Hairstylists, and Cosmetologists", "Manicurists and Pedicurists", "Skincare Specialists", "Other Personal Appearance Workers", "Baggage Porters, Bellhops, and Concierges", "Childcare Workers", "Fitness Trainers and Aerobics Instructors", "Recreation Workers", "Residential Advisors", "First-Line Supervisors of Retail Sales Workers", "First-Line Supervisors of Non-Retail Sales Workers", "Cashiers", "Counter and Rental Clerks", "Parts Salespersons", "Retail Salespersons", "Advertising Sales Agents", "Insurance Sales Agents", "Securities, Commodities, and Financial Services Sales Agents", "Travel Agents", "Sales Representatives, Services, All Other", "Sales Representatives, Wholesale and Manufacturing", "Models, Demonstrators, and Product Promoters", "Real Estate Brokers and Sales Agents", "Sales Engineers", "Telemarketers", "Door-to-Door Sales Workers, News and Street Vendors, and Related Workers", "First-Line Supervisors of Office and Administrative Support Workers", "Switchboard Operators, Including Answering Service", "Telephone Operators", "Bill and Account Collectors", "Billing and Posting Clerks", "Bookkeeping, Accounting, and Auditing Clerks", "Payroll and Timekeeping Clerks", "Procurement Clerks", "Tellers", "Court, Municipal, and License Clerks", "Credit Authorizers, Checkers, and Clerks", "Customer Service Representatives", "Eligibility Interviewers, Government Programs", "File Clerks", "Hotel, Motel, and Resort Desk Clerks", "Interviewers, Except Eligibility and Loan", "Library Assistants, Clerical", "Loan Interviewers and Clerks", "New Accounts Clerks", "Order Clerks", "Human Resources Assistants, Except Payroll and Timekeeping", "Receptionists and Information Clerks", "Reservation and Transportation Ticket Agents and Travel Clerks", "Cargo and Freight Agents", "Couriers and Messengers", "Police, Fire, and Ambulance Dispatchers", "Dispatchers, Except Police, Fire, and Ambulance", "Meter Readers, Utilities", "Postal Service Clerks", "Postal Service Mail Carriers", "Postal Service Mail Sorters, Processors, and Processing Machine Operators", "Production, Planning, and Expediting Clerks", "Shipping, Receiving, and Traffic Clerks", "Weighers, Measurers, Checkers, and Samplers, Recordkeeping", "Executive Secretaries and Executive Administrative Assistants", "Legal Secretaries", "Medical Secretaries", "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", "Data Entry Keyers", "Word Processors and Typists", "Insurance Claims and Policy Processing Clerks", "Mail Clerks and Mail Machine Operators, Except Postal Service", "Office Clerks, General", "Office Machine Operators, Except Computer", "Proofreaders and Copy Markers", "Statistical Assistants", "First-Line Supervisors of Farming, Fishing, and Forestry Workers", "Agricultural Inspectors", "Graders and Sorters, Agricultural Products", "Other Agricultural Workers", "Forest and Conservation Workers", "Logging Workers", "First-Line Supervisors of Construction Trades and Extraction Workers", "Boilermakers", "Brickmasons, Blockmasons, and Stonemasons", "Carpenters", "Carpet, Floor, and Tile Installers and Finishers", "Cement Masons, Concrete Finishers, and Terrazzo Workers", "Construction Laborers", "Construction Equipment Operators", "Drywall Installers, Ceiling Tile Installers, and Tapers", "Electricians", "Glaziers", "Insulation Workers", "Painters and Paperhangers", "Pipelayers", "Plumbers, Pipefitters, and Steamfitters", "Plasterers and Stucco Masons", "Roofers", "Sheet Metal Workers", "Structural Iron and Steel Workers", "Solar Photovoltaic Installers", "Helpers, Construction Trades", "Construction and Building Inspectors", "Elevator Installers and Repairers", "Fence Erectors", "Hazardous Materials Removal Workers", "Highway Maintenance Workers", "Rail-Track Laying and Maintenance Equipment Operators", "Septic Tank Servicers and Sewer Pipe Cleaners", "Derrick, rotary drill, and service unit operators, and roustabouts, oil, gas, and mining", "Earth Drillers, Except Oil and Gas", "Explosives Workers, Ordnance Handling Experts, and Blasters", "Underground Mining Machine Operators", "Other extraction workers", "First-Line Supervisors of Mechanics, Installers, and Repairers", "Computer, Automated Teller, and Office Machine Repairers", "Radio and Telecommunications Equipment Installers and Repairers", "Avionics Technicians", "Electric Motor, Power Tool, and Related Repairers", "Electronic Home Entertainment Equipment Installers and Repairers", "Security and Fire Alarm Systems Installers", "Other Electrical and Electronic Equipment Mechanics, Installers, and Repairers", "Aircraft Mechanics and Service Technicians", "Automotive Body and Related Repairers", "Automotive Glass Installers and Repairers", "Automotive Service Technicians and Mechanics", "Bus and Truck Mechanics and Diesel Engine Specialists", "Heavy Vehicle and Mobile Equipment Service Technicians and Mechanics", "Small Engine Mechanics", "Miscellaneous Vehicle and Mobile Equipment Mechanics, Installers, and Repairers", "Control and Valve Installers and Repairers", "Heating, Air Conditioning, and Refrigeration Mechanics and Installers", "Home Appliance Repairers", "Industrial Machinery Mechanics", "Maintenance Workers, Machinery", "Millwrights", "Electrical Power-Line Installers and Repairers", "Telecommunications Line Installers and Repairers", "Precision Instrument and Equipment Repairers", "Maintenance and Repair Workers, General", "Coin, Vending, and Amusement Machine Servicers and Repairers", "Locksmiths and Safe Repairers", "Riggers", "Helpers--Installation, Maintenance, and Repair Workers", "Installation, Maintenance, and Repair Workers, All Other", "First-Line Supervisors of Production and Operating Workers", "Coil Winders, Tapers, and Finishers", "Engine and Other Machine Assemblers", "Structural Metal Fabricators and Fitters", "Miscellaneous Assemblers and Fabricators", "Bakers", "Butchers and Other Meat, Poultry, and Fish Processing Workers", "Food and Tobacco Roasting, Baking, and Drying Machine Operators and Tenders", "Food Batchmakers", "Food Cooking Machine Operators and Tenders", "Computer Numerically Controlled Tool Operators and Programmers", "Forging Machine Setters, Operators, and Tenders, Metal and Plastic", "Cutting, Punching, and Press Machine Setters, Operators, and Tenders, Metal and Plastic", "Grinding/Lapping/Polishing/Buffing Machine Tool Setters, Operators, and Tenders, Metal and Plastic", "Other Machine Tool Setters, Operators, and Tenders, Metal and Plastic", "Machinists", "Metal Furnace Operators, Tenders, Pourers, and Casters", "Model Makers, Patternmakers, and Molding Machine Setters, Metal and Plastic", "Tool and Die Makers", "Welding, Soldering, and Brazing Workers", "Other Metal Workers and Plastic Workers", "Prepress Technicians and Workers", "Printing Press Operators", "Print Binding and Finishing Workers", "Laundry and Dry-Cleaning Workers", "Pressers, Textile, Garment, and Related Materials", "Sewing Machine Operators", "Shoe and Leather Workers and Repairers", "Tailors, Dressmakers, and Sewers", "Textile Machine Setters, Operators, and Tenders", "Upholsterers", "Other Textile, Apparel, and Furnishings Workers", "Cabinetmakers and Bench Carpenters", "Furniture Finishers", "Sawing Machine Setters, Operators, and Tenders, Wood", "Woodworking Machine Setters, Operators, and Tenders, Except Sawing", "Other Woodworkers", "Power Plant Operators, Distributors, and Dispatchers", "Stationary Engineers and Boiler Operators", "Water and Wastewater Treatment Plant and System Operators", "Miscellaneous Plant and System Operators", "Chemical Processing Machine Setters, Operators, and Tenders", "Crushing, Grinding, Polishing, Mixing, and Blending Workers", "Cutting Workers", "Extruding, Forming, Pressing, and Compacting Machine Setters, Operators, and Tenders", "Furnace, Kiln, Oven, Drier, and Kettle Operators and Tenders", "Inspectors, Testers, Sorters, Samplers, and Weighers", "Jewelers and Precious Stone and Metal Workers", "Medical, Dental, and Ophthalmic Laboratory Technicians", "Packaging and Filling Machine Operators and Tenders", "Painting Workers", "Photographic Process Workers and Processing Machine Operators", "Adhesive Bonding Machine Operators and Tenders", "Etchers and Engravers", "Molders, Shapers, and Casters, Except Metal and Plastic", "Paper Goods Machine Setters, Operators, and Tenders", "Tire Builders", "Helpers--Production Workers", "Other production workers including semiconductor processors and cooling and freezing equipment operators", "Aircraft Cargo Handling Supervisors", "Aircraft Pilots and Flight Engineers", "Air Traffic Controllers and Airfield Operations Specialists", "Flight Attendants", "Ambulance Drivers and Attendants, Except Emergency Medical Technicians", "Bus Drivers, Transit and Intercity", "Bus Drivers, School or Special Client", "Driver/Sales Workers and Truck Drivers", "Taxi Drivers and Chauffeurs", "Locomotive Engineers and Operators", "Railroad Conductors and Yardmasters", "Subway and Streetcar Operators", "Sailors and Marine Oilers", "Ship and Boat Captains and Operators", "Parking Lot Attendants", "Automotive and Watercraft Service Attendants", "Transportation Inspectors", "Transportation Attendants, Except Flight Attendants", "Other Transportation Workers", "Crane and Tower Operators", "Conveyor, Dredge, and Hoist and Winch Operators", "Industrial Truck and Tractor Operators", "Cleaners of Vehicles and Equipment", "Laborers and Freight, Stock, and Material Movers, Hand", "Machine Feeders and Offbearers", "Packers and Packagers, Hand", "Pumping Station Operators", "Refuse and Recyclable Material Collectors"];


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
                          // if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                           if ((arr[i].toUpperCase()).includes(val.toUpperCase())) {
                            /*create a DIV element for each matching element:*/
                            b = document.createElement("DIV");
                            /*make the matching letters bold:*/
                            b.innerHTML = "<span>" + arr[i].substr(0, val.length) + "</span>";
                            b.innerHTML += arr[i].substr(val.length);
                            /*insert a input field that will hold the current array item's value:*/
                            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                            /*execute a function when someone clicks on the item value (DIV element):*/
                            b.addEventListener("click", function(e) {
                                /*insert the value for the autocomplete text field:*/
                                inp.value = this.getElementsByTagName("input")[0].value;

                                /*close the list of autocompleted values,
                                (or any other open lists of autocompleted values:*/
                                occupationSelect(inp.value)
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
                  autocomplete(document.getElementById("myInput"), occupations);




                     g2.append("g")
                          .attr("class", "xaxis")
                          .attr("transform", "translate("+x.range()[0]+"," + y.range()[0] + ")")
                          .style("stroke","#3A3745")
                          .style("opacity", .45)
                          .call(d3.axisBottom(x).tickSize(-heightScreen+margin.top+margin.bottom).tickValues([0,25,50,75,100]));



                      g2.append("g")
                          .attr("class", "yaxis")
                          .attr("transform", "translate(" + x.range()[0] + ","+y.range()[1]+")")
                          .style("stroke","#3A3745")
                          .style("opacity", .45)
                          .call(d3.axisLeft(y).tickSize(-widthScreen+margin.left+margin.right).tickValues([25,50,75,100]));




                        g2.append("text")
                          .attr("class", "axisTextxA")
                          .attr("transform",
                                "translate(" + (domainwidth/2) + " ," +
                                               (domainheight + 40) + ")")
                          .style("text-anchor", "middle")
                          .style("fill", "#3A3745")
                          .text("Proximity");

                        g2.append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("class", "axisTextyA")
                          .attr("y", function(d){ if (widthScreen<550) {return -40} else {return -50}} )
                          .attr("x", 0-domainheight*.5)
                          .attr("dy", "1em")
                          .style("text-anchor", "middle")
                          .style("fill", "#3A3745")
                          .text("Exposure");


                   function createDots2() {

                          g2.selectAll(".dot")
                              .data(data)
                              // .transition()
                              // .duration(1000)
                              .enter()
                              .append("circle")
                              .attr("class", "dot")
                              // .attr("r", function(d) { return (d.empNumberOES/3772790)*20})
                              .attr("r", function(d) { return sqrtScale(d.empNumberOES)})
                              // .attr("r", 5)
                              .attr("cx", function(d) { return x(d.proximity); })
                              .attr("cy", function(d) { return y(d.exposure); })
                              // .style("fill", "#6263f1")
                              .style("fill",function(d) {return colorWork(d.fbShareColor) })
                              // .style('opacity', function(d) {return scaleOpacity(d.fbshare)})
                              .style('opacity', 1)
                              .attr("stroke", "#393745")
                              .attr("stroke-width", .5)
                              .on("mouseover", handleMouseOver)
                              .on("mouseout", handleMouseOut);
                            }



                            createDots2();





             // function reset() {
             // 	 g2.selectAll("circle")
             //       	  // .attr("r", 3)
             //       	  .transition()
             //       	  .duration(1000)
             //           .style("opacity", 1)
             //           .attr('r', 3)
             //           .attr('stroke-width', .5);
             // }




    }




    startChange2()



  function handleMouseOver(d) {


            // Add interactivity

            // Use D3 to select element, change color and size

            // div.transition()
            //     .style("opacity", 1);
            var xMouse = d3.mouse(this)[0]+15
            var yMouse = d3.mouse(this)[1]-50


             div.html(function() {return "<p><b>"+d.job + "</b></br>Employment:  "  + regNum(d.empNumberOES) + "</br>Exposure:  " + number(d.exposure)+ "</br>Proximity:  " + number(d.proximity)+ "</br>Share Foreign-Born:  " + percent(d.fbshare) + "</p>"})
            	// .style("left", .65*widthScreen + "px")
                 .style("left", xMouse + "px")
            	// .style('top', .05*heightScreen + "px")
            	.style("top", yMouse + "px")
            	.style("visibility", 'visible')
            	.attr("class", "tooltip2")
            	.attr("id", function() {return "Occupation" + d.job});

          }

  function handleMouseOut(d) {


            d3.select(".tooltip2").style("visibility", 'hidden');


          }






function handleResize2() {

	// 1. update height of step elements
	var stepHeight2 = Math.floor(window.innerHeight * 0.75);
	step1.style('height', stepHeight1 + 'px');

	// 2. update width/height of graphic element
	var bodyWidth1 = d3.select('body').node().offsetWidth;

	graphic1.style('width', bodyWidth1 + 'px').style('height', window.innerHeight + 'px');

	var chartMargin1 = 32;
	var textWidth1 = text1.node().offsetWidth;
	var chartWidth1 = graphic1.node().offsetWidth - textWidth1 - chartMargin1;

	chart1.style('width', chartWidth1 + 'px').style('height', Math.floor(window.innerHeight / 2) + 'px');

	// 3. tell scrollama to update new element dimensions
	scroller1.resize();
}
// scrollama event handlers
function handleStepEnter2(response) {

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
      d3.selectAll(".axisTitle").remove()
    d3.selectAll(".dotTitle").remove()
		startChange()
    d3.selectAll(".axisTitleX").transition().duration(1000).style("visibility","hidden")
    d3.selectAll(".axisTitleY").transition().duration(1000).style("visibility","hidden")

	}

  if (step1._groups[0][1].className === 'step1 is-active') {
      d3.selectAll(".axisTitle").remove()

      d3.selectAll(".xaxis .tick line")
        .transition()
        .duration(1000)
        .attr("stroke-width", 2)

      d3.selectAll(".yaxis .tick line")
        .transition()
        .duration(1000)
        .attr("stroke-width", .25)

    g.selectAll(".dot")
    .transition()
    .duration(1000)
    .style("opacity", .15)

    d3.selectAll(".axisTitleX").transition().duration(1000).style("visibility","visible")
    d3.selectAll(".axisTitleY").transition().duration(1000).style("visibility","hidden")




	}

  if (step1._groups[0][2].className === 'step1 is-active') {

    d3.selectAll(".axisTitle").remove()
    d3.selectAll(".axisTitleX").transition().duration(1000).style("visibility","hidden")
    d3.selectAll(".axisTitleY").transition().duration(1000).style("visibility","visible")




    d3.selectAll(".yaxis .tick line").attr("stroke-width", 2)
    d3.selectAll(".xaxis .tick line").attr("stroke-width", .25)





	}

  if (step1._groups[0][3].className === 'step1 is-active') {
      d3.selectAll(".axisTitle").remove()
      d3.selectAll(".yaxis .tick line").attr("stroke-width", 1)
      d3.selectAll(".xaxis .tick line").attr("stroke-width", 1)
      d3.selectAll(".axisTitleY").transition().duration(1000).style("visibility","hidden")
      d3.selectAll(".axisTitleX").transition().duration(1000).style("visibility","hidden")



    d3.selectAll(".dotTitle").remove()



		avgShow()
	}

  if (step1._groups[0][5].className === 'step1 is-active') {
    d3.selectAll(".dotTitle").remove()


    function healthShow() {

        g.selectAll(".dot")
              // .attr("r", 3)
              .transition()
              .duration(1000)
              .style("opacity", function(d) {
                if (d.health == 1) {return scaleOpacityH(d.fbshare)}
                else 	{ return .01 }
            })
              .style("z-index", function(d) {
                if (d.health == 1) {return "999"}
                else 	{ return "0" }
            })
              .attr('stroke-width', function(d) {
                if (d.health == 1) {return 1}
                else 	{ return 0 }
            });

       }

		healthShow()




     g.append("text")
     // .attr("x", function(d) { return x(d.proximity)-10; })
     // .attr("y", function(d) { return y(d.exposure); })
     .attr("x", function(d) { return x(55)+20; })
     .attr("y", function(d) { return y(74)-8; })
     .attr('class',"dotTitle")
     .style("text-anchor", "left")
     .style("fill", "#3A3745")
     .text("Physician")

     g.append("text")
     // .attr("x", function(d) { return x(d.proximity)-10; })
     // .attr("y", function(d) { return y(d.exposure); })
     .attr("x", function(d) { return x(55)+20; })
     .attr("y", function(d) { return y(74)+8; })
     .attr('class',"dotTitle")
     .style("text-anchor", "Left")
     .style("fill", "#3A3745")
     .text("27.9%")


     g.append("text")
     // .attr("x", function(d) { return x(d.proximity)-10; })
     // .attr("y", function(d) { return y(d.exposure); })
     .attr("x", function(d) { return x(77)+30; })
     .attr("y", function(d) { return y(80)-8; })
     .attr('class',"dotTitle")
     .style("text-anchor", "left")
     .style("fill", "#3A3745")
     .text("Registered Nurse")

     g.append("text")
     // .attr("x", function(d) { return x(d.proximity)-10; })
     // .attr("y", function(d) { return y(d.exposure); })
     .attr("x", function(d) { return x(77)+30; })
     .attr("y", function(d) { return y(80)+8; })
     .attr('class',"dotTitle")
     .style("text-anchor", "Left")
     .style("fill", "#3A3745")
     .text("15.4%")

     g.append("text")
     // .attr("x", function(d) { return x(d.proximity)-10; })
     // .attr("y", function(d) { return y(d.exposure); })
     .attr("x", function(d) { return x(99)+10; })
     .attr("y", function(d) { return y(94)-8; })
     .attr('class',"dotTitle")
     .style("text-anchor", "left")
     .style("fill", "#3A3745")
     .text("Dentist")

     g.append("text")
     // .attr("x", function(d) { return x(d.proximity)-10; })
     // .attr("y", function(d) { return y(d.exposure); })
     .attr("x", function(d) { return x(99)+10; })
     .attr("y", function(d) { return y(94)+8; })
     .attr('class',"dotTitle")
     .style("text-anchor", "Left")
     .style("fill", "#3A3745")
     .text("23.4%")



	}








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
}


startChange()


init();

function avgShow() {



    g.selectAll(".dot")
          .transition()
          .duration(1000)
          .style("opacity", .8)
        //   .style("fill", function(d) { return
        //   colorWork(d.fbShare);
        // })
          .style("fill",function(d) {return colorWork(d.fbShareColor) })
          .attr('stroke-width', .75);

   }



});





// kick things off
