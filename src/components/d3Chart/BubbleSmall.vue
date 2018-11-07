<template>
  <div>
    <svg :width="width" :height="height" font-family="sans-serif" font-size="14" text-anchor="middle"></svg>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "ZcmorefunBubble",
  props: {
    data: Array,
    width: {
      type: Number,
      default: 933
    },
    height: {
      type: Number,
      default: 362
    }
  },
  computed: {
    total() {
      let total = 0;
      for (let item of this.data) {
        total += item.value;
      }
      return total;
    },
    computedData() {
      const data = JSON.parse(JSON.stringify(this.data));
      for (let item of data) {
        item.percent = Math.round((item.value / this.total) * 100) / 100;
      }
      return data;
    }
  },
  methods: {
    initCircle(data) {
      d3.select("svg")
        .selectAll("g")
        .remove(); //清空作图区域
      var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
      var format = d3.format(",d");
      var color = [
        "#8ccb45",
        "#73cb9a",
        "#7acbcb",
        "#edca35",
        "#659ffb",
        "#e79723",
        "#e79797",
        "#7798fc",
        "#e06639",
        "#8ccbfd",
        "lightgray"
      ]; //自定义颜色
      var pack = d3
        .pack()
        .size([width, height])
        .padding(5);
      var num, pid;
      var root = d3
        .hierarchy({ children: data })
        .sum(function(d) {
          return d.value;
        })
        .each(function(d) {
          if (d.parent == null) {
            num = d.value;
          }
          if ((id = d.data.name)) {
            var id;
            d.id = id;
            d.class = id;
            pid = num / d.value;
            d.colorPick =
              pid > 100 ? 5 : pid > 50 ? 4 : pid > 10 ? 3 : pid > 2 ? 2 : 1;
          }
        });
      var node = svg
        .selectAll(".node")
        .data(pack(root).leaves())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      node
        .append("circle")
        .attr("id", function(d) {
          return d.id;
        })
        .attr("r", function(d) {
          return d.r;
        })
        .style("fill", function(d) {
          return color[d.colorPick];
        });

      node
        .append("clipPath")
        .attr("id", function(d) {
          return "clip-" + d.id;
        })
        .append("use")
        .attr("xlink:href", function(d) {
          return "#" + d.id;
        });

      node
        .append("text")
        .attr("clip-path", function(d) {
          return "url(#clip-" + d.id + ")";
        })
        .selectAll("tspan")
        .data(function(d) {
          var arr = new Array();
          arr.push(d.class);
          arr.push(Math.round(d.data.percent * 100) + "%");
          return arr; //圆内显示内容
        })
        .enter()
        .append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i, nodes) {
          return 25 + (i - nodes.length / 2 - 0.5) * 20;
        })
        .text(function(d) {
          return d;
        });

      node.append("title").text(function(d) {
        return d.id + "\n" + d.data.value.toLocaleString();
      });
      node.on("click", function(d) {
        clickBubble(d.id); //自定义点击事件
      });
    }
  },
  mounted() {
    this.initCircle(this.computedData);
  }
};
</script>

