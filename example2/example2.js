// domain : 입력값의 범위, range : 매핑한 결괏값의 범위를 지정
var yScale = d3.scaleLinear().domain([0, 24500]).range([0, 100]);

d3.select("svg")
  .selectAll("rect")
  .data([15, 500, 220, 800, 100, 10, 24500, 5555, 1000])
  .enter()
  .append("rect")
  .attr("width", 10)
  .attr("height", function(d) {return yScale(d);})
  .style("fill", "blue")
  .style("stroke", "red")
  .style("stroke-width", "1px")
  .style("opacity", .25)
  .attr("x", function(d, i) {return i*10})
  .attr("y", function(d) {return 100-yScale(d)});
