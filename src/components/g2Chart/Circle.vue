<template>
  <div>
    <CircleChart :plotCfg="plotCfg" :width="width" :height="height" :data="computedData" />
  </div>
</template>
<script>
import createG2 from "g2-vue";
import { setTimeout } from "timers";

let biggestIndex = 0;

const CircleChart = createG2(chart => {
  chart.coord("theta", {
    radius: 0.75,
    innerRadius: 0.6
  });
  // chart.legend("name", {
  //   position: "left"
  // });
  chart.legend("name", false);
  chart.tooltip({
    showTitle: false,
    itemTpl:
      '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
  });
  // 辅助文本
  chart.guide().html({
    position: ["50%", "50%"],
    html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 50px;"></div>`,
    alignX: "middle",
    alignY: "middle"
  });
  const colors = [
    "#b4de92",
    "#9bd8cc",
    "#f1c96a",
    "#9dabfc",
    "#e485ba",
    "#dd7875",
    "#82b4ee",
    "#56679c"
  ];
  var interval = chart
    .intervalStack()
    .position("percent")
    .color("name", colors)
    .label("percent", {
      formatter: function formatter(val, item) {
        return (
          item.point.name +
          "  " +
          item.point.value.toLocaleString() +
          "  " +
          Math.round(val * 100) +
          "%"
        );
      }
    })
    .tooltip("name*percent", function(name, percent) {
      return {
        name: name,
        value: Math.round(percent * 100) + "%"
      };
    })
    .style({
      lineWidth: 1,
      stroke: "#fff"
    });
  chart.render();
  setTimeout(() => {
    interval.setSelected(chart._attrs.data[chart._attrs.plotCfg.biggestIndex]);
  }, 500);
});

export default {
  name: "ZcmorefunCircle",
  components: {
    CircleChart
  },
  props: {
    data: Array,
    width: {
      type: Number,
      default: 461
    },
    height: {
      type: Number,
      default: 325
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
    },
    biggestIndex() {
      let biggestIndex = 0;
      let biggestValue = 0;
      let data = this.data;
      let item = null;
      for (let index in data) {
        item = data[index];
        if (item.value > biggestValue) {
          biggestValue = item.value;
          biggestIndex = index;
        }
      }
      return biggestIndex;
    },
    plotCfg() {
      return { biggestIndex: this.biggestIndex };
    }
  },
  created() {
    biggestIndex = this.biggestIndex;
  }
};
</script>
