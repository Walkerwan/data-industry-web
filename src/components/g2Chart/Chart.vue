<template>
  <div>
    <LineChart :data="lineData" />
  </div>
</template>
<script>
import createG2 from "g2-vue";

let lineData = [{ name: "3-21", value: 10 }, { name: "3-22", value: 40 }];

const LineChart = createG2(chart => {
  chart
    .line()
    .position("name*value")
    .shape("spline")
    .size(2);
  chart.render();
});

export default {
  name: "ZcmorefunChart",
  components: {
    LineChart
  },
  data() {
    return {
      lineData: lineData
    };
  }
};
</script>
