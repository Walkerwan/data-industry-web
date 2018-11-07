<template>
  <div>
    <Chart :plotCfg="plotCfg" :width="width" :height="height" :data="data" />
  </div>
</template>
<script>
import createG2 from "g2-vue";

const Chart = createG2(chart => {
  chart.scale({
    value: {
      formatter: num => {
        return num.toLocaleString();
      }
    },
    name: {
      range: [0, 1]
    }
  });
  chart.tooltip({
    crosshairs: {
      type: "line"
    },
    itemTpl: `<li data-index={index}>
      <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
      人数: {value}
      </li>`
  });
  chart
    .area()
    .position("name*" + chart._attrs.plotCfg.field)
    .shape("smooth");
  chart
    .line()
    .position("name*" + chart._attrs.plotCfg.field)
    .size(2)
    .shape("smooth");
  chart.render();
});

export default {
  name: "ZcmorefunArea",
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
      default: 360
    },
    field: {
      type: String,
      default: "value"
    }
  },
  computed: {
    plotCfg() {
      return { field: this.field };
    }
  }
};
</script>
