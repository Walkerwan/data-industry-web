<template>
  <div ref="chartContainer">
    <div ref="myChart">
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import "./mapData/shenzhen.js";
export default {
  name: "ZcmorefunCountyMap",
  data() {
    return {
      myChart: null,
      resizeListener: null
    };
  },
  props: {
    data: Object
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
    if (this.data) {
      this.myChart.setOption(this.data);
    }
    const that = this;
    that.resizeListener = () => {
      that.resizeDiv(that);
      that.myChart.resize();
    };
    window.addEventListener("resize", that.resizeListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeListener);
  },
  watch: {
    data: {
      handler(val, oldVal) {
        this.myChart.setOption(val);
      },
      deep: true
    }
  }
};
</script>
