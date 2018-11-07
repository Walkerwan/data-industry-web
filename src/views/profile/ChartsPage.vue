<template>
  <div class="base-info charts-page">
    <template v-for="(cat, catIndex) in currentCategoryChildren">
      <div class="population dashed-border charts-wrapper">{{cat.indLabelGroupName}}</div>
      <div class="flex-row charts">
        <template v-for="(chart, chartIndex) in cat.children">
          <div class="sex chart-wrapper" :class="CHARTWIDTH[CHARTTYPE[chart.chartType]]">
            <div class="chart-title">{{chart.indLabelGroupName}}</div>
            <div class="chart">
              <component :is="transformChartType(chart.chartType)" :height="362" :width="CHARTWIDTH[CHARTTYPE[chart.chartType]] === 'quarter'?470:926" :data="chart.data"></component>
            </div>
          </div>
          <div v-for="n in allBlankQuarters[catIndex][chartIndex]" class="quarter">
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script>
import chartCompRegister from "../../common/register/chartCompRegister.js";
import { CHARTWIDTH, CHARTTYPE } from "../../constants.js";
export default {
  data() {
    return {
      CHARTWIDTH: CHARTWIDTH,
      CHARTTYPE: CHARTTYPE
    };
  },
  computed: {
    currentCategoryChildren() {
      return this.$store.getters.getCurrentCategoryChildren;
    },
    allBlankQuarters() {
      const allBlankQuarters = [];
      let index = 0;
      if (!this.currentCategoryChildren) {
        return allBlankQuarters;
      }
      for (let cat of this.currentCategoryChildren) {
        allBlankQuarters[index] = this.getBlankQuarters(
          cat.children,
          0,
          cat.children.length,
          []
        );
        index++;
      }
      return allBlankQuarters;
    }
  },
  components: {
    ...chartCompRegister
  },
  methods: {
    getBlankQuarters(charts, startIndex, endIndex, blankQuarterObj) {
      let totalRatio = 0;
      let nextTotalRatio = 0;
      let len = charts.length;
      let newStartIndex = 0;
      for (let i = startIndex; i < endIndex; i++) {
        totalRatio += this.getRatio(CHARTWIDTH[CHARTTYPE[charts[i].chartType]]);
        const nextIndex = i + 1;
        if (nextIndex === len) {
          const blankQuarterNum = Math.floor((1 - totalRatio) / 0.25);
          newStartIndex = 0;
          blankQuarterObj.push(blankQuarterNum);
          return blankQuarterObj;
        }
        if (totalRatio === 1) {
          newStartIndex = nextIndex;
          blankQuarterObj.push(0);
          return this.getBlankQuarters(
            charts,
            newStartIndex,
            endIndex,
            blankQuarterObj
          );
        }
        nextTotalRatio =
          totalRatio +
          this.getRatio(CHARTWIDTH[CHARTTYPE[charts[nextIndex].chartType]]);
        if (totalRatio < 1 && nextTotalRatio > 1) {
          const blankQuarterNum = Math.floor((1 - totalRatio) / 0.25);
          newStartIndex = nextIndex;
          blankQuarterObj.push(blankQuarterNum);
          return this.getBlankQuarters(
            charts,
            newStartIndex,
            endIndex,
            blankQuarterObj
          );
        }
        blankQuarterObj.push(0);
      }
    },
    getRatio(chartType) {
      switch (chartType) {
        case "quarter":
          return 0.25;
        case "half":
          return 0.5;
        default:
          return 0.25;
      }
    },
    transformChartType(chartType) {
      console.log("transformChartType(chartType)", chartType);
      return "Zcmorefun" + this.toFirstUpperCase(CHARTTYPE[chartType]);
    },
    toFirstUpperCase(str) {
      return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
  },
  mounted() {
    console.log("this.allBlankQuarters", this.allBlankQuarters);
  }
};
</script>
<style>
</style>

