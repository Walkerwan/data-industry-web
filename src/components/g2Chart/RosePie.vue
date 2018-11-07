<template>
  <div>
    <Chart :width="width" :height="height" :data="data" />
  </div>
</template>
<script>
import createG2 from "g2-vue";

const Chart = createG2(chart => {
  chart.coord("polar", {
    innerRadius: 0.3
  });
  chart.legend(false);
  chart.axis(false);
  const colors = ["#9ec4fc", "#85a5fb", "#718cd2", "#5d73b4", "#989898"];
  chart
    .interval()
    .position("name*value")
    .color("name", colors)
    .label("name", {
      formatter: function formatter(val, item) {
        return val;
      }
    })
    .style({
      lineWidth: 1,
      stroke: "#fff"
    });
  chart.render();
});

export default {
  name: "ZcmorefunRosePie",
  components: {
    Chart
  },
  props: {
    data: Array,
    width: {
      type: Number,
      default: 461
    },
    height: {
      type: Number,
      default: 380
    }
  }
};
</script>
