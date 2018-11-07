<template>
  <div>
    <Chart :width="width" :height="height" :data="data" ref="chart" />
  </div>
</template>
<script>
import createG2 from "g2-vue";
let chart = null;
let scaleField = null;
let position = null;
const Chart = createG2(chart => {
  chart.scale(scaleField, {
    tickCount: 10,
    alias: "人数",
    formatter: num => {
      return num.toLocaleString();
    }
  });
  chart.interval().position(position);
  chart.render();
});

export default {
  name: "ZcmorefunBar",
  components: {
    Chart
  },
  props: {
    data: Array,
    width: {
      type: Number,
      default: 431
    },
    height: {
      type: Number,
      default: 380
    },
    scaleField: {
      type: String,
      default: "value"
    },
    position: {
      type: String,
      default: "name*value"
    }
  },
  created() {
    scaleField = this.scaleField;
    position = this.position;
  }
};
</script>
