<template>
  <div ref="chartContainer">
    <div ref="myChart">
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      myChart: null,
      resizeListener: null
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
    that.resizeListener = () => {
      that.resizeDiv(that);
      that.myChart.resize();
    };
    window.addEventListener("resize", that.resizeListener);
  },
  watch: {
    option: {
      handler(val, oldVal) {
        this.myChart.setOption(val);
      },
      deep: true
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeListener);
  }
};
</script>
