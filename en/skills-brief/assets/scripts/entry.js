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


var w = (window.innerWidth), h = (window.innerHeight)

if (window.innerWidth>550) {
  w = (window.innerWidth*.5),
  h = (window.innerHeight*.86)
} else {w = (window.innerWidth),
 h = (window.innerHeight)};



var radius

if (w > 600) {
      radius = 5;
    } 
    else if (w >= 450 && w<=600) {
      radius = 3.5
    }

    else {
      radius = 2.5;
    }

var color2 = d3.interpolate('#a983cd', '#a983cd')
var color3 = d3.scaleOrdinal()
         .domain(['0', '1', '2', '3', '4'])
         .range(['#909090','#86d8f8' ,'#cebbee','#a983cd', '#6a7ef1']);
var color4 = d3.scaleOrdinal()
         .domain(['1', '2', '0'])
         .range(["#ff7150", "#a983cd", '#E8EDED']);
var color5 = d3.scaleOrdinal()
         .domain(['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
         .range(['#E8EDED', "#6a7ef1", "#ff7150", '#cebbee', '#facab6','#a983cd','#dfb182','#86d8f8', '#bd874b',"#d2eaee",'#a0a1a5',, '#F4F721' ]);


var color6 = d3.scaleOrdinal()
         .domain(['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
         .range(['#E8EDED', "#38387C", "#ff7150",'#a983cd','#facab6','#a0a1a5','#bd874b','#cebbee','#dfb182','#86d8f8' ,'#05ce7c', "#d9eeef","#6a7ef1",'#05ce7c' ]);
var color7 = d3.scaleOrdinal()
         .domain(['0', '1', '2'])
         .range(["#21D177", "#F7594C", "#F2BC02"]);
var centerScale = d3.scalePoint().padding(1).range([w*.01, w*.99]);
var centerScale2 = d3.scalePoint().padding(1).range([w*.15, w*.85]);
var forceStrength = .2;
var forceStrength2 = .09;
var forceStrength3 = .04;

// var svg = d3.select("body").append("svg")
//         .attr("width", w)
//         .attr("height", h)

var svg2 = d3.select('.scroll__figure1')
      .append("svg")
      .attr("id", "svg2");
  
    
var circleID = "all";


// var container1 = d3.select('#scatter-scroll');
var container1 = d3.select('#container-scroll1');
var graphic1 = container1.select('.scroll__figure1');
var chart1 = graphic1.select('.figure__chart1');
var text1 = container1.select('.scroll__text1');
var step1 = text1.selectAll('.step1');

// initialize the scrollama
var scroller1 = scrollama();
            

        
var skillData = d3.csv('assets/dataDB2.csv');  

var div = d3.select(".scroll__figure1").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0)
    .style("background", "#fff")
    .style("position", "absolute")
    .style("z-index", "999")
    .style("visibility", "hidden");


Promise.all([skillData]).then(change);


function change(data){
     
  data = data['0']


  var simulation = d3.forceSimulation()
            .force("collide",d3.forceCollide( function(d){
                return d.r }).iterations(16) 
            )
            .force("charge", d3.forceManyBody().strength( function (d){
              if (w>600) { return -9;}
              else if (w >= 450 && w<=600) {
               return -7;}
              else {return -2;}
            }))
            .force("x", d3.forceX().x(w*.5))
            .force("y", d3.forceY().y(h*.5));



            
  var circles = svg2.selectAll("circle")
             .data(data, function(d){ return d.ID ;})
             .enter()
             .append("circle")

            

  data.forEach(function(d){
        d.r = radius
        d.x = w
        d.y = h
      });

      function ticked(data) {

        var mouseX, mouseY 
                        
        
        function all(){

          d3.selectAll("text").remove();
          
      
            svg2.selectAll('circle')
              .attr("r", function(d){ return d.r; })
              .attr("cx", function(d) { return d.x ;})
              .attr("cy", function(d){ return d.y - h*.1;})
              .style("fill", function(d){ return color2(d.ID);})
              .style("stroke", "white")
              .style("opacity", 1);

              
              
        svg2.append("text")
        .attr("x", w*.5)             
        .attr("y", h*.07)
        .attr("text-anchor", "center")  
        .attr('class', "domTitle")
        .attr('fill', '#282828')
        .text('Recent Immigrants');
        
        
        
        svg2.append('rect')
        .attr("rx", 6)
        .attr("ry", 6)
        .attr('x',w*.2)
        .attr('y', h*.68)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", "#a983cd" )
        
         svg2.append('text')
         .attr('x',w*.23)
         .attr('y', h*.69)
         .attr('class', "domQuote")
         .attr('fill', '#282828')
         .text(" equals approx. 1,000 new immigrants" )
         

        }
        
        
            
          function Education() {


          circleID = "Education"
          
        
          d3.selectAll("rect").remove();
          d3.selectAll("text").remove();

                
          svg2.selectAll('circle')
              .transition()
              .duration(100)
              .attr("cx", function(d){ return d.x+w*.025 ;})
              // .attr("cy", function(d){ return d.y; })
              .attr("cy", function(d){ return d.y-h*.1;})
              .attr('class', "edDot")
              .style("fill", function(d){ return color3(d.Education);})
              .style("stroke",  "white")
              .style("opacity", 1);


        svg2.selectAll('.edDot')    
              .on("mouseover", function(d) {
            div.transition() 
                .duration(200)    
                .style("opacity", .9);

             div.html(d.educationText + "<br/>"  + d.degreeTotal)
                .style("left", d.x+w*.6 +"px")   
                .style("top",  d.y +"px")
                .style("visibility", "visible")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0); 
        });
          

        
        svg2.append("text")
        .attr("x", w*.15)             
        .attr("y", h*.65)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill','#6a7ef1')
        .text('Advanced');

        svg2.append("text")
        .attr("x", w*.15)             
        .attr("y", h*.68)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill','#6a7ef1')
        .text('Degree');
        
        svg2.append("text")
        .attr("x", w*.35)             
        .attr("y", h*.65)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill','#a983cd')
        .text('Bachelors');
        
        svg2.append("text")
        .attr("x", w*.55)             
        .attr("y", h*.65)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill','#cebbee')
        .text('Some');

        svg2.append("text")
        .attr("x", w*.55)             
        .attr("y", h*.68)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill','#cebbee')
        .text('College');
        
        svg2.append("text")
        .attr("x", w*.7)             
        .attr("y", h*.65)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill','#86d8f8')
        .text('High');

        svg2.append("text")
        .attr("x", w*.7)             
        .attr("y", h*.68)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill','#86d8f8')
        .text('School');
        
        svg2.append("text")
        .attr("x", w*.9)             
        .attr("y", h*.65)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill', '#909090')
        .text('Less than');
        svg2.append("text")
        .attr("x", w*.9)             
        .attr("y", h*.68)
        .attr("text-anchor", "middle")  
        .attr('class', "degree")
        .attr('fill', '#909090')
        .text('High School');
          
        //   svg2.on('click', function() {
    
               
        //         splitBubbles("STEM");
        
        // })
        }
        
        function STEM() {
        	d3.selectAll("rect").remove();
           d3.selectAll("text").remove();
           // d3.selectAll('div').remove();
           circleID = "STEM"
           svg2.selectAll('circle')
              .transition()
              .duration(100)
              // .attr("cx", function(d){ if (d.STEM != "0") {return d.x+w/4;} else {return 0;} })
              // .attr("cy", function(d){ if (d.STEM != "0") {return d.y;} else {return 0;} })
              .attr("cx", function(d){ if (d.STEM =="1" | d.STEM =="2") {return d.x +w*.2;}
              else {return d.x -w*.3;}})
              .attr("cy", function(d){ if (d.STEM =="1" | d.STEM =="2") {return d.y -h*.25;}
              else {return d.y + h*.13;}})
              .attr('opacity', function(d){ if (d.STEM == "0") {return .4;} })
              .attr("class", "STEMdot")
              .style("fill", function(d){ return color4(d.STEM);})
              .style("stroke", function(d){ return "white"; });



        svg2.selectAll('.STEMdot')    
              .on("mouseover", function(d) {
                mouseX = (d3.mouse(this)[0])
                mouseY = (d3.mouse(this)[1])
            div.transition() 
                .duration(200)    
                .style("opacity", .9);

             div.html(d.stemText + "<br/>Total:  "  + d.stemNumber)
                .style("left", mouseX +w*.4 +"px")
                .style("top",  mouseY +h*.15 +"px")
                .style("visibility", "visible")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0)
                 .style("visibility", "hidden"); ; 
        });
        
        svg2.append("text")
        .attr("x", w*.35)             
        .attr("y", h*.45)
        .attr("text-anchor", "center")  
        .attr('class', "degree")
        .attr('fill', "#a983cd")
        .text('STEM Degree');
        
        svg2.append("text")
        .attr("x", w*.65)             
        .attr("y", h*.45)
        .attr("text-anchor", "center")  
        .attr('class', "degree")
        .attr('fill', "#ff7150")
        .text('Non STEM Degree');
        
        svg2.append("text")
        .attr("x", w*.45)             
        .attr("y", h*.7)
        .attr("text-anchor", "center")  
        .attr('class', "degree")
        .attr('fill', '#282828')
        .text('No College Degree');
        
        
        
        }
        
        function FieldNew() {

          d3.selectAll("rect").remove();
          d3.selectAll("text").remove();

          circleID == "FieldNew"

          svg2.selectAll('circle')
              .transition()
              .duration(100)
              .style('opacity', '1')
              .attr("class", "fieldDot")
              .attr("cx", function(d){ 
                  if (d.FieldNew == "0") {return d.x-w*.05;}
                  else if (d.FieldNew == '2'||d.FieldNew == '4'||d.FieldNew == '6'||d.FieldNew == '8'){return d.x +w*.03 }
                  else {return (d.x)+w*.07;}
              })
              .attr("cy", function(d){ 
                  if (d.FieldNew == "0") {return d.y + h*.18;}
                  else if (d.FieldNew == '2'||d.FieldNew == '4'||d.FieldNew == '6'||d.FieldNew == '8'){return (d.y+h*.12) }
                  else {return (d.y-h*.25);}
                  
              })
              .style("fill", function(d){ return color5(d.FieldNew);})
              .style("stroke", "white");


            svg2.selectAll('.fieldDot')    
              .on("mouseover", function(d) {
                mouseX = (d3.mouse(this)[0])
                mouseY = (d3.mouse(this)[1])
            div.transition() 
                .duration(200)    
                .style("opacity", .9);

             div.html(d.fieldTextNew + "<br/>"  + d.fieldTotal)
                .style("left", mouseX + w*.5 + "px")   
                .style("top",  mouseY - h*.1 + "px")
                .style("visibility", "visible")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0);
                 // .style("visibility", "hidden"); ; 
        });
      
      
      

              
      svg2.append("text")
        .attr("x", w*.1)             
        .attr("y", h*.05)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill',  "#6a7ef1")
        .text('Engineering');
        


         svg2.append("text")
        .attr("x", w*.3)             
        .attr("y", h*.08)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#cebbee')
        .text('Computer Sciences');
          
        
        
        svg2.append("text")
        .attr("x", w*.47)             
        .attr("y", h*.05)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#a983cd')
        .text('Medical & Health');
        
        

        svg2.append("text")
        .attr("x", w*.62)             
        .attr("y", h*.08)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#86d8f8')
        .text('Biology & Life Sciences');
        
        
        svg2.append("text")
        .attr("x", w*.8)             
        .attr("y", h*.05)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', "#d2eaee")
        .text('Physical Sciences');
        
  

        svg2.append("text")
        .attr("x", w*.87)             
        .attr("y", h*.08)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill','#a0a1a5')
        .text('Other STEM');
        
        
        svg2.append("text")
        .attr("x", w*.18)             
        .attr("y", h*.45)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', "#ff7150")
        .text('Business');
        
        svg2.append("text")
        .attr("x", w*.36)            
        .attr("y", h*.48)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill','#facab6')
        .text('Social Sciences');
        
       
          
        
        svg2.append("text")
        .attr("x", w*.52)             
        .attr("y", h*.45)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill','#dfb182')
        .text('Education');
        
        
        
        svg2.append("text")
        .attr("x", w*.68)             
        .attr("y", h*.48)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill','#bd874b')
        .text('Other Non-STEM');
        
        
        
        svg2.append("text")
        .attr("x", w*.85)             
        .attr("y", h*.75)
        .attr("text-anchor", "center")  
        .attr('class', "professions")
        .attr('fill', '#282828')
        .text('No Degree');
        
                
                

        }
        

              
        function profession(){
           d3.selectAll("rect").remove();
           d3.selectAll("text").remove();
          circleID == "profession"
            svg2.selectAll('circle')
              .style("opacity",function(d){ if (d.profession == "0") {return '0';} else {return '1';}})
              .attr("r", function(d){ return d.r; })
              .transition()
              .duration(75)
              .attr("class", "professionDot")
              .attr("cx", function(d){ if (d.profession == "11") {return d.x + w*.1}
                                        else if (d.profession == "2" || d.profession == "4" || d.profession == "6" || d.profession == "8" || d.profession == "10" ) {return d.x*1.1-w*.05}
                                        else {return d.x*1.1 + w*.14}
              })
              .attr("cy", function(d){ if (d.profession == "1" || d.profession == "3" || d.profession == "5" || d.profession == "7" || d.profession == "9"|| d.profession=='12') {return d.y*1.1-h*.3} 
                                       else if (d.profession == "2" || d.profession == "4" || d.profession == "6" || d.profession == "8" || d.profession == "10") {return d.y*1.2}
                                       else if (d.profession == "11") {return d.y + h*.2} 
                                        else {return d.y*0}
              })
              .style("fill", function(d){ return color6(d.profession);})
              .style("stroke", "white");
  
       
        
        svg2.selectAll('.professionDot')    
              .on("mouseover", function(d) {
            div.transition() 
                .duration(200)    
                .style("opacity", .9);

             div.html(d.proftext + "<br/>"  + d.profTotal)
                .style("left", d.x + w*.6 + "px")   
                .style("top",  d.y + "px")
                .style("visibility", "visible")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0); 
        });
        
        svg2.append("text")
        .attr("x", w*.15)             
        .attr("y", h*.1)
        .attr("text-anchor", "center")  
        .attr('class', "professions")
        // .attr('fill', "#6a7ef1")
        .attr('fill','#38387C')
        .text('Software Developers');
        
      
        
        svg2.append("text")
        .attr("x", w*.35)             
        .attr("y", h*.12)
        .attr("text-anchor", "center")  
        .attr('class', "professions")
        .attr('fill', "#6a7ef1")
        // .attr('fill', '#a983cd')
        .text('Engineers');
          
        
        
        svg2.append("text")
        .attr("x", w*.5)             
        .attr("y", h*.1)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#a0a1a5')
        .text('Computer Scientists');
  
        
        
        svg2.append("text")
        .attr("x", w*.63)             
        .attr("y", h*.12)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        // .attr('fill', '#cebbee')
        .attr('fill', '#86d8f8')
        .text('Nurses');
        
        svg2.append("text")
        .attr("x", w*.75)             
        .attr("y", h*.1)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#cebbee')
        .text('Physicians');


        svg2.append("text")
        .attr("x", w*.87)             
        .attr("y", h*.12)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        // .attr('fill', '#cebbee')
        .attr('fill', '#a983cd')
        .text('Physical Scientists');
        
        
        
        svg2.append("text")
        .attr("x", w*.1)             
        .attr("y", h*.78)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#05ce7c')
        .text('Postsecondary Educators');
        
        svg2.append("text")
        .attr("x", w*.25)             
        .attr("y", h*.76)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill','#facab6')
        .text('Managers');
        
        
          
        
        svg2.append("text")
        .attr("x", w*.4)             
        .attr("y", h*.78)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#bd874b')
        .text('Accountants');
        
        
        svg2.append("text")
        .attr("x", w*.55)             
        .attr("y", h*.76)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#dfb182')
        .text('CEOs');
        
        svg2.append("text")
        .attr("x", w*.7)             
        .attr("y", h*.78)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', "#ff7150")
        .text('Cashiers');
        
        
        // svg2.append("text")
        // .attr("x", w*1.1)             
        // .attr("y", h*.73)
        // .attr("text-anchor", "middle")  
        // .attr('class', "professions")
        // .attr('fill', '#05ce7c')
        // .text('Educators');
        
        svg2.append("text")
        .attr("x", w*.5)             
        .attr("y", h*.05)
        .attr("text-anchor", "middle")  
        .attr('class', "shortage")
        .attr('fill', 'black')
        .text('Top Occupations with Shortages');

        svg2.append("text")
        .attr("x", w*.5)             
        .attr("y", h*.45)
        .attr("text-anchor", "middle")  
        .attr('class', "shortage")
        .attr('fill', 'black')
        .text('Other Top Occupations');

        // svg2.append("text")
        // .attr("x", w)             
        // .attr("y", h*.07)
        // .attr("text-anchor", "middle")  
        // .attr('class', "shortage")
        // .attr('fill', '#606060')
        // .text('with shortages');

        svg2.append("text")
        .attr("x", w*.87)             
        .attr("y", h*.7)
        .attr("text-anchor", "middle")  
        .attr('class', "professions")
        .attr('fill', '#999999')
        .text('Other');
        
        //  svg2.append("text")
        // .attr("x", w)             
        // .attr("y", h)
        // .attr("text-anchor", "center")  
        // .attr('class', "professions")
        // .attr('fill', '#999999')
        // .text('Occupations');
        
        // svg2.on('click', function() {
        //     d3.event.stopPropagation();
        //     splitBubbles("professionExtra");
        // })
        
        
        }
        

          function professionExtra(){
          	 d3.selectAll("rect").remove();
             d3.selectAll("text").remove();
            circleID == "professionExtra";
            svg2.selectAll('circle')
              .style("opacity",function(d){ if (d.professionExtra == "0") {return 0;} else {return 1;}})
              .transition()
              .duration(125)
              .attr('class', "profession")
              .attr("r", function(d){ return d.r; })
              .attr("cx", function(d){return d.x + w/4;})
              .attr("cy", function(d) {return d.y;})
              .style("fill", function(d){ return color6(d.profession);})
              .style("stroke", "white");

              d3.selectAll("text").remove();


               svg2.selectAll('.profession')    
              .on("mouseover", function(d) {
            div.transition() 
                .duration(200)    
                .style("opacity", 0);

             div.style("visibility", "hidden")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0); 
        });
              
              // svg2.on('click', function() {
              //   circleID == "professionExtra2";
              //    splitBubbles("professionExtra2");
              // });
        }
        
        function professionExtra2() {
          d3.selectAll("text").remove();
          circleID == "professionExtra2";
          svg2.selectAll('circle')
              .style("opacity",function(d){ if (d.professionExtra == "0") {return 0;} else {return 1;}})
              .transition()
              .duration(100)
              .attr('class', function(d){
                if (d.professionExtra2 == '1' && d.profession =='10') {return "postSecond2";}})
              .attr("r", function(d){ if (d.postsecondary == "0" && d.professionExtra2 != "0") {return d.r-.25;} else if (d.postsecondary == "1") {return d.r+5;} else {return 1}})
              .attr("cx", function(d){
                if (d.professionExtra2 == '1' && d.profession =='10') {return (d.x+w*.1);} 
                else if (d.professionExtra2 == "0" && d.postsecondary =='0') {return 0;} 
                else if (d.professionExtra2 == "1" && d.postsecondary =='0'){return d.x + w*.3;}
                else 
                {return d.x + w*.45;}
              })
              .attr("cy", function(d){
              { if (d.postsecondary == "0" && d.professionExtra2 == "1") {return d.y+h*.15;} else if (d.postsecondary == "1") {return d.y+h*.15;} else {return 0}}
              })
              .style("fill", function(d){ return color6(d.profession);})
              .style("stroke", "white");


              svg2.selectAll('.postSecond2')    
              .on("mouseover", function(d) {
                mouseX = (d3.mouse(this)[0])
                mouseY = (d3.mouse(this)[1])
            div.transition() 
                .duration(200)    
                .style("opacity", .9);

             div.html(d.proftext + "<br/>"  + d.profTotal)
                .style("left", mouseX + w*.5 + "px")   
                .style("top",  mouseY - h*.1 + "px")
                .style("visibility", "visible")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0);
        });
        
        svg2.append("text")
        .attr("x", w*.55)             
        .attr("y", h*.2)
        .attr("text-anchor", "center")  
        .attr('class', "postsecond")
        .attr('fill', '#282828')
        .text('Postsecondary'); 
        
        svg2.append("text")
        .attr("x", w*.55)             
        .attr("y", h*.25)
        .attr("text-anchor", "center")  
        .attr('class', "postsecond")
        .attr('fill', '#282828')
        .text('Educators'); 
        
        // svg2.on('click', function() {
        //         circleID == "professionExtra3";
        //          splitBubbles("professionExtra3");
        //       });
           
           
      } 
      
      function professionExtra3(){
      	     d3.selectAll("rect").remove();
             d3.selectAll("text").remove();
            circleID == "professionExtra3";
            svg2.selectAll('circle')
              .style("opacity",function(d){ if (d.professionExtra == "0") {return 0;} else {return 1;}})
              .transition()
              .duration(100)
              .attr('class', "profession")
              .attr("r", function(d){ return d.r; },)
              .attr("cx", function(d){return d.x+w*.1;})
              .attr("cy", function(d) {return d.y-h*.1;})
              .style("fill", function(d){ return color6(d.profession);})
              .style("stroke", "white");
              
              svg2.selectAll('.profession')    
              .on("mouseover", function(d) {
            div.transition() 
                .duration(200)    
                .style("opacity", 0);

             div.style("visibility", "hidden")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0); 
        });

               svg2.append("text")
        .attr("x", w*.5)             
        .attr("y", h*.05)
        .attr("text-anchor", "center")  
        .attr('class', "endTitle")
        .attr('fill', '#282828')
        .text('Recent Immigrants');

        svg2.append("text")
        .attr("x", w*.5)             
        .attr("y", h*.09)
        .attr("text-anchor", "center")  
        .attr('class', "endTitle")
        .attr('fill', '#282828')
        .text('in the Workforce');

        }
        
        
         function engineering() {
           d3.selectAll("text").remove();
          circleID == "engineering";
          svg2.selectAll('circle')
              .style("opacity",function(d){ if (d.professionExtra == "0") {return 0;} else {return 1;}})
              .transition()
              .duration(50)
              .attr('class', function(d){
                if (d.professionExtra2 == '1' && d.engineering =='1') {return "engineering2";}})
              .attr("r", function(d){ if (d.engineering == "0" && d.professionExtra3 != "0") {return d.r-.25;} else if (d.engineering == "1") {return d.r+5;} else {return 1}})
              .attr("cx", function(d){
                if (d.professionExtra2 == '1' && d.engineering =='1') {return (d.x + w*.1);} 
                else if (d.professionExtra2 == "0" && d.engineering =='0') {return 0;} 
                else if (d.professionExtra2 == "1" && d.engineering =='0'){return d.x - w*.1;}
                else 
                {return 0;}
              })
              .attr("cy", function(d){
              { if (d.engineering == "0" && d.professionExtra2 == "1") {return d.y+h*.35;} else if (d.engineering == "1") {return d.y;} else {return 0}}
              })
              .style("fill", function(d){ return color6(d.profession);})
              .style("stroke", "white");

           svg2.selectAll('.engineering2')    
              .on("mouseover", function(d) {
                mouseX = (d3.mouse(this)[0])
                mouseY = (d3.mouse(this)[1])
            div.transition() 
                .duration(200)    
                .style("opacity", .9);

             div.html(d.engineeringName + "<br/>"  + d.engineeringTotal)
                .style("left", mouseX + w*.5 + "px")   
                .style("top",  mouseY - h*.1 + "px")
                .style("visibility", "visible")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0);
        });
        
        svg2.append("text")
        .attr("x", w*.7)             
        .attr("y", h*.25)
        .attr("text-anchor", "center")  
        .attr('class', "postsecond")
        .attr('fill', '#282828')
        .text('Engineers'); 
        
        
  
           
           
      } 

      function professionExtra4(){
              d3.selectAll("rect").remove();
             d3.selectAll("text").remove();
            circleID == "professionExtra3";
            svg2.selectAll('circle')
              .style("opacity",function(d){ if (d.professionExtra == "0") {return 0;} else {return 1;}})
              .transition()
              .duration(100)
              .attr('class', "profession")
              .attr("r", function(d){ return d.r; },)
              .attr("cx", function(d){return d.x+w*.1;})
              .attr("cy", function(d) {return d.y-h*.1;})
              .style("fill", function(d){ return color6(d.profession);})
              .style("stroke", "white");
              
              svg2.selectAll('.profession')    
              .on("mouseover", function(d) {
            div.transition() 
                .duration(200)    
                .style("opacity", 0);

             div.style("visibility", "hidden")
                .style("color", "black");  
            })          
              .on("mouseout", function(d) {   
                 div.transition()    
                 .duration(500)    
                 .style("opacity", 0); 
        });

       



        }
        
      
        
        
        
        if (circleID == "Education") {Education();}
        else if (circleID == "STEM") {STEM();}
        else if (circleID == "FieldNew") {FieldNew();}
        else if (circleID == "profession") {profession();}
        else if (circleID == "professionExtra") {professionExtra();}
        else if (circleID == "professionExtra2") {professionExtra2();}
         else if (circleID == "professionExtra3") {professionExtra3();}
         else if (circleID == "professionExtra4") {professionExtra4();}
         else if (circleID == "engineering") {engineering();}
          else {all();}
      
      }  //ticked
      
      

        simulation
            .nodes(data)
            .on("tick", ticked);
            
                       
      
      
      function groupBubbles() {
        
        if (circleID == "professionExtra2") {
          simulation.force('x', d3.forceX().strength(function(d){
               { if (d.postsecondary == "1") {return forceStrength2;} else {return forceStrength}}
              }).force("charge", d3.forceManyBody().strength(10)).x(w))
          simulation.force('y', d3.forceY().strength(function(d){
               { if (d.postsecondary == "1") {return forceStrength2;} else {return forceStrength}}
              }).force("charge", d3.forceManyBody().strength(10)).y(h));
          simulation.alpha(1).restart();
        }
        
        else if (circleID == "engineering") {
          simulation.force('x', d3.forceX().strength(function(d){
               { if (d.engineering == "1") {return forceStrength3;} else {return .15}}
              }).force("charge", d3.forceManyBody().strength(10)).x(w))
          simulation.force('y', d3.forceY().strength(function(d){
               { if (d.engineering == "1") {return forceStrength3;} else {return .15}}
              }).force("charge", d3.forceManyBody().strength(10)).y(h));
          simulation.alpha(1).restart();
        }

        // else if (circleID == "professionExtra4") {
        // 	simulation.alpha(1).restart();
        //   simulation.force('x', d3.forceX().strength(2).x(w))
        //   simulation.force('y', d3.forceY().strength(2).y(h))
      
        // // @v4 We can reset the alpha value and restart the simulation
        
        // }

        // @v4 Reset the 'x' force to draw the bubbles to the center.
        else {
        simulation.force('x', d3.forceX().strength(forceStrength).x(w))
        simulation.force('y', d3.forceY().strength(forceStrength).y(h))
      
        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
        }
        
      }
      
      
      
      function splitBubbles(byVar) {
        
        circleID = byVar
        
        if (byVar == "professionExtra2"){
          
          centerScale2.domain(data.map(function(d){ return d[byVar]; }));
        
          simulation.force('x', d3.forceX().strength(function(d){
               { if (d.postsecondary == "1" ) {return forceStrength2;} else {return forceStrength}}
              }).x(function(d){{return centerScale2(d[byVar]);}}));
          
          
          simulation.force('y', d3.forceY().strength(function(d){
               { if (d.postsecondary == "1") {return forceStrength2;} else {return forceStrength}}
              }).y(function(d){ 
          
          if (circleID == "postsecondary"){
           { return h*.3;}
          }
           
           
          else{
             return h*.3;
        }
      
        }));
        
        simulation.alpha(1).restart();
        }
        
        
        else if (byVar == "engineering") {
          
                    centerScale2.domain(data.map(function(d){ return d[byVar]; }));
        
          simulation.force('x', d3.forceX().strength(function(d){
               { if (d.engineering == "1") {return forceStrength3;} else {return forceStrength}}
              }).x(function(d){{return centerScale2(d[byVar]);}}));
          
          
          simulation.force('y', d3.forceY().strength(function(d){
               { if (d.engineering == "1") {return forceStrength3;} else {return forceStrength}}
              }));
        
        simulation.alpha(1).restart();
        
        }


        // else if (byVar == "professionExtra4") {

        // 	simulation.alpha(1).restart();
          
        //     centerScale2.domain(data.map(function(d){ return d[byVar]; }));
        
        //   simulation.force('x', d3.forceX().strength(.38).x(w*.5));
          
         
        //   simulation.force('y', d3.forceY().strength(.38).y(h*.5));
        
        
        
        // }


        
        
        
        
        else{
          
        centerScale.domain(data.map(function(d){ return d[byVar]; }));
        
         simulation.force('x', d3.forceX().strength(forceStrength).x(function(d){ 
          if (circleID=="profession") {return centerScale(d[byVar]);}
          else {return centerScale(d[byVar]);}}
        ));
        
        
        
        // @v4 Reset the 'x' force to draw the bubbles to their year centers
       
        
        simulation.force('y', d3.forceY().strength(forceStrength).y(function(d){ 
          
        
            
             return h*.5;
      
      
          
    
        }));
        
        
        simulation.alpha(1).restart();
        }
       

        // @v4 We can reset the alpha value and restart the simulation
        
        
      }

function handleResize2() {

  // 1. update height of step elements
  var stepHeight2 = Math.floor(window.innerHeight * 0.75);
  step1.style('height', stepHeight2 + 'px');

  // 2. update width/height of graphic element
  var bodyWidth2 = d3.select('body').node().offsetWidth;

  graphic1.style('width', bodyWidth2 + 'px').style('height', window.innerHeight + 'px');

  var chartMargin2 = 32;
  var textWidth2 = text1.node().offsetWidth;
  var chartWidth2 = graphic1.node().offsetWidth - textWidth2 - chartMargin2;

  chart1.style('width', chartWidth2 + 'px').style('height', Math.floor(window.innerHeight2 / 2) + 'px');

  // 3. tell scrollama to update new element dimensions
  scroller1.resize();
}//end of handleResize


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

      function allSplit() {
                circleID = "all"
                splitBubbles("all");
                }

                allSplit();
      
        
    }
      

  // // update graphic1 based on step 2
  if (step1._groups[0][1].className === 'step1 is-active') {

        // circleID = "Education"

        function edSplit() {
                circleID = "Education"
                splitBubbles("Education");
                }

                edSplit();
        
        edSplit()

   

  }

  // // update graphic1 based on step 3
  if (step1._groups[0][2].className === 'step1 is-active') {

    function stemSplit() {
                circleID = "STEM"
                splitBubbles("STEM");
                }

                stemSplit();
        
        stemSplit()
   

  }

  // Step 4
  if (step1._groups[0][3].className === 'step1 is-active') {


    function fieldSplit() {
                circleID = "FieldNew"
                splitBubbles("FieldNew");
                }

                fieldSplit();
  
}


  if (step1._groups[0][4].className === 'step1 is-active') {

       function profSplit() {
                circleID = "profession"
                splitBubbles("profession");
                }

                profSplit();
      
  }

  if (step1._groups[0][5].className === 'step1 is-active') {

    function profXSplit() {
                circleID = "professionExtra"
                splitBubbles("professionExtra");
                }

                profXSplit();


  }

  if (step1._groups[0][6].className === 'step1 is-active') {

     function enginSplit() {
                circleID = "engineering"
                splitBubbles("engineering");
                }

                enginSplit();


  }

  if (step1._groups[0][7].className === 'step1 is-active') {

    function profX3Split() {
                circleID = "professionExtra"
                splitBubbles("professionExtra");
                }

                profX3Split();

  

  }

  if (step1._groups[0][8].className === 'step1 is-active') {

     function profX2Split() {
                circleID = "professionExtra2"
                splitBubbles("professionExtra2");
                }

                profX2Split();

  }

  if (step1._groups[0][9].className === 'step1 is-active') {

     function profX3Split() {
                circleID = "professionExtra3"
                splitBubbles("professionExtra3");
                }

                profX3Split();

  }



  }//end of handleStepEnter2


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



init();





   } //END of CHANGE
