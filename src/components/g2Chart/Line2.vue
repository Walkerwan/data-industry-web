<template>
  <div :id="id"></div>
</template>
<script>
import G2 from "@antv/g2";
import uuid from "../../utils/uuid.js";

export default {
  name: "ZcmorefunLine",
  props: {
    width: {
      type: Number,
      default: 431
    },
    height: {
      type: Number,
      default: 360
    },
    data: {
      type: Array,
      default: () => {
        return [
          {
            name: "Jan",
            Tokyo: 7.0
            // London: 3.9
          },
          {
            name: "Feb",
            Tokyo: 6.9
            // London: 4.2
          },
          {
            name: "Mar",
            Tokyo: 9.5
            // London: 5.7
          },
          {
            name: "Apr",
            Tokyo: 14.5
            // London: 8.5
          },
          {
            name: "May",
            Tokyo: 18.4
            // London: 11.9
          },
          {
            name: "Jun",
            Tokyo: 21.5
            // London: 15.2
          },
          {
            name: "Jul",
            Tokyo: 25.2
            // London: 17.0
          },
          {
            name: "Aug",
            Tokyo: 26.5
            // London: 16.6
          },
          {
            name: "Sep",
            Tokyo: 23.3
            // London: 14.2
          },
          {
            name: "Oct",
            Tokyo: 18.3
            // London: 10.3
          },
          {
            name: "Nov",
            Tokyo: 13.9
            // London: 6.6
          },
          {
            name: "Dec",
            Tokyo: 9.6
            // London: 4.8
          }
        ];
      }
    },
    field: {
      type: String,
      default: "value"
    },
    id: {
      type: String,
      default: "lineId" + uuid()
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.drawChart(this.data);
  },
  watch: {
    data(val, oldVal) {
      this.drawChart(val);
    }
  },
  methods: {
    drawChart(data) {
      const { height, id } = this;
      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height,
        padding: [40, 80]
      });
      this.chart.source(data);

      this.chart.tooltip({
        crosshairs: {
          type: "line",
          style: {
            stroke: "lightblue",
            lineWidth: 1
          }
        },
        shared: false,
        showTitle: false,
        itemTpl: `<li data-index={index}>
        <span style="background-color:lightblue;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
        人数: {value}
        </li>`
      });
      this.chart.legend(false);
      this.chart
        .line()
        .position("name*value")
        .color("key")
        .shape("smooth")
        .style({
          stroke: "lightblue",
          lineWidth: 1
        });
      this.chart
        .point()
        .position("name*value")
        .color("key")
        .size(6)
        .shape("circle")
        .style({
          fill: "lightblue",
          stroke: "lightblue",
          lineWidth: 1
        })
        .active([true], {
          highlight: true // true 是否开启 highlight 效果，开启时没有激活的变灰
          // style: {
          //   fill: "lightblue",
          //   stroke: "lightblue",
          //   lineWidth: 1
          // }
        });
      this.chart.render();
    }
  }
};
</script>
