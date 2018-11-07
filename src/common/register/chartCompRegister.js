import Vue from "vue";
const G2Circle = Vue.component("G2Circle", function(resolve) {
  require(["../../components/g2Chart/Circle.vue"], resolve);
});
const G2Bar = Vue.component("G2Bar", function(resolve) {
  require(["../../components/g2Chart/Bar"], resolve);
});
const G2Line = Vue.component("G2Line", function(resolve) {
  require(["../../components/g2Chart/Line"], resolve);
});
const G2MultiLine = Vue.component("G2MultiLine", function(resolve) {
  require(["../../components/g2Chart/MultiLine"], resolve);
});
const G2Area = Vue.component("G2Area", function(resolve) {
  require(["../../components/g2Chart/Area"], resolve);
});
const G2Radar = Vue.component("G2Radar", function(resolve) {
  require(["../../components/g2Chart/Radar"], resolve);
});
const G2RosePie = Vue.component("G2RosePie", function(resolve) {
  require(["../../components/g2Chart/RosePie"], resolve);
});
const D3Bubble = Vue.component("D3Bubble", function(resolve) {
  require(["../../components/d3Chart/BubbleSmall"], resolve);
});
const RankList = Vue.component("RankList", function(resolve) {
  require(["../../components/customChart/RankList"], resolve);
});
const TableBar = Vue.component("TableBar", function(resolve) {
  require(["../../components/customChart/TableBar"], resolve);
});
const WordCloud = Vue.component("WordCloud", function(resolve) {
  require(["../../components/customChart/WordCloud"], resolve);
});
const DistributionAreaMap = Vue.component("DistributionAreaMap", function(
  resolve
) {
  require(["../../components/chart/map/DistributionAreaMap"], resolve);
});
const DistributionPointMap = Vue.component("DistributionPointMap", function(
  resolve
) {
  require(["../../components/chart/map/DistributionPointMap"], resolve);
});
const HeatMap = Vue.component("HeatMap", function(resolve) {
  require(["../../components/chart/map/HeatMap"], resolve);
});

export default {
  ZcmorefunCircle: G2Circle,
  ZcmorefunBar: G2Bar,
  ZcmorefunLine: G2Line,
  ZcmorefunMultiLine: G2MultiLine,
  ZcmorefunArea: G2Area,
  ZcmorefunRadar: G2Radar,
  ZcmorefunRosePie: G2RosePie,
  ZcmorefunBubble: D3Bubble,
  ZcmorefunRankList: RankList,
  ZcmorefunTableBar: TableBar,
  ZcmorefunWordCloud: WordCloud,
  ZcmorefunDistributionAreaMap: DistributionAreaMap,
  ZcmorefunDistributionPointMap: DistributionPointMap,
  ZcmorefunHeatMap: HeatMap
};
