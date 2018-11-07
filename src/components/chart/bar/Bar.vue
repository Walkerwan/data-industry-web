<template>
    <div ref="chartContainer">
        <div ref="myChart">
        </div>
    </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
export default {
  data() {
    return {
      myChart: null
    };
  },
  props: {
    option: Object
  },
  computed: {},
  methods: {
    resizeDiv(that) {
      const containerComputedStyle = window.getComputedStyle(
        that.$refs.chartContainer
      );
      that.$refs.myChart.style.width = containerComputedStyle.width;
      that.$refs.myChart.style.height = containerComputedStyle.height;
    }
  },
  mounted() {
    this.resizeDiv(this);
    this.myChart = echarts.init(this.$refs.myChart);
    const that = this;
    window.addEventListener("resize", () => {
      that.resizeDiv(that);
      that.myChart.resize();
    });
  },
  watch: {
    option: {
      handler(val, oldVal) {
        this.myChart.setOption(val);
      },
      deep: true
    }
  }
};
</script>
