// 선 그래프

var tweetdata = [
  {day: 1, tweets: 1, retweets: 2, favorites: 5},
  {day: 2, tweets: 6, retweets: 11, favorites: 3},
  {day: 3, tweets: 3, retweets: 0, favorites: 1},
  {day: 4, tweets: 5, retweets: 2, favorites: 6},
  {day: 5, tweets: 10, retweets: 29, favorites: 16},
  {day: 6, tweets: 4, retweets: 22, favorites: 10},
  {day: 7, tweets: 3, retweets: 14, favorites: 1},
  {day: 8, tweets: 5, retweets: 7, favorites: 7},
  {day: 9, tweets: 1, retweets: 35, favorites: 22},
  {day: 10, tweets: 4, retweets: 16, favorites: 15}
]

lineChart(tweetdata);

function lineChart(data) {


  // extent : 최대와 최소를 array로 반환
  var xExtent = d3.extent(tweetdata, function(d) {
    return d.day;
  });

  // 최소, 최댓값 찾아서 범위 지정하기
  var yExtent = d3.extent(
    [].concat(tweetdata.map(function (d) {
      return (d.tweets);
    }), tweetdata.map(function (d) {
      return (d.retweets);
    }), tweetdata.map(function (d) {
      return (d.favorites);
    }))
  )

  // 여백을 넣어 스케일을 만든다.
  // domain에는 실제 데이터들의 범위를 나타낸다
  // range에는 화면에 뿌려지는 구간의 범위를(px단위로) 넣어주면 해당하는 값으로 변환해주는 함수가 생성된다
  xScale = d3.scaleLinear().domain(xExtent).range([20,470]);
  yScale = d3.scaleLinear().domain(yExtent).range([480,20]);

  // x축 눈금 설정
  // tickSize() 메서드로 눈금선을 변경
  xAxis = d3.axisBottom(xScale)
            .tickSize(480)
            .tickValues([1,2,3,4,5,6,7,8,9,10]);

  d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

  // y축 눈금 설정
  // ticks() 메서드로 눈금의 개수를 설정
  yAxis = d3.axisRight(yScale)
            .ticks(10)
            .tickSize(480);

  d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

  // 다음에 나오는 세 줄의 코드는 같은 데이터셋을 사용하지만,
  // y 위치가 각기 트윗(tweets), 리트윗(retweets), 관심글 담기(favorites) 횟수를 나타낸다.
  d3.select("svg").selectAll("circle.tweets")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.day)})
    .attr("cy", function(d) {return yScale(d.tweets)})
    .style("fill", "red");

  d3.select("svg").selectAll("circle.retweets")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "retweets")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.day)})
    .attr("cy", function(d) {return yScale(d.retweets)})
    .style("fill", "blue");

  d3.select("svg").selectAll("circle.favorites")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "favorites")
    .attr("r", 5)
    .attr("cx", function(d) {return xScale(d.day)})
    .attr("cy", function(d) {return yScale(d.favorites)})
    .style("fill", "green");

  // tweets
  var tweetLine = d3.line()
    // 데이터에 대한 접근자를 정의한다.
    // 여기에서는 날짜 속성을 가져와 xScale()에 전달한다.
    .x(function(d) {
      return xScale(d.day);
    })
    // 이와 동일하게 트윗 횟수를 처리한다.
    .y(function(d) {
      return yScale(d.tweets);
    });
  
  d3.select("svg")
    .append("path")
    .attr("d", tweetLine(data))
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 2);

  // retweets
  var retweetLine = d3.line()
    // 데이터에 대한 접근자를 정의한다.
    // 여기에서는 날짜 속성을 가져와 xScale()에 전달한다.
    .x(function(d) {
      return xScale(d.day);
    })
    // 이와 동일하게 트윗 횟수를 처리한다.
    .y(function(d) {
      return yScale(d.retweets);
    });
    
  d3.select("svg")
    .append("path")
    .attr("d", retweetLine(data))
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  // favorites
  var favLine = d3.line()
    // 데이터에 대한 접근자를 정의한다.
    // 여기에서는 날짜 속성을 가져와 xScale()에 전달한다.
    .x(function(d) {
      return xScale(d.day);
    })
    // 이와 동일하게 트윗 횟수를 처리한다.
    .y(function(d) {
      return yScale(d.favorites);
    });
  
  d3.select("svg")
    .append("path")
    .attr("d", favLine(data))
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2);
}
