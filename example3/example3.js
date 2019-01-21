var scatterData = [
  {friends: 5, salary: 22000},
  {friends: 3, salary: 18000},
  {friends: 10, salary: 88000},
  {friends: 0, salary: 180000},
  {friends: 27, salary: 56000},
  {friends: 8, salary: 74000},
];

// d3.select("svg").selectAll("circle")
//   .data(scatterData).enter()
//   .append("circle")
//   .attr("r", 5)
//   .attr("cx", function(d,i) {
//     return i * 10
//   }).attr("cy", function(d) {
//     return d.friends
//   })

// extent : 최대와 최소를 array로 반환
var xExtent = d3.extent(scatterData, function(d) {
  return d.salary;
});

var yExtent = d3.extent(scatterData, function(d) {
  return d.friends;
});

var xScale = d3.scaleLinear().domain(xExtent).range([0,500]);
var yScale = d3.scaleLinear().domain(yExtent).range([0,500]);

d3.select("svg").selectAll("circle")
  .data(scatterData).enter()
  .append("circle")
  .attr("r", 5)
  .attr("cx", function(d) {
    return xScale(d.salary);
  }).attr("cy", function(d) {
    return yScale(d.friends);
  });

// y축 생성
var yAxis = d3.axisRight(yScale);
d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

// x축 생성
var xAxis = d3.axisBottom(xScale);
d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

d3.selectAll("path.domain").style("fill", "none").style("stroke", "black");

// d3.selectAll("#xAxisG").attr("transform", "translate(0,500)")