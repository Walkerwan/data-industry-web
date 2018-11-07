<template>
  <div class="vunue-preference charts-page">
    <div class="population dashed-border charts-wrapper">睡眠情况</div>
    <div class="flex-row charts">
      <div class="age third chart-wrapper">
        <div class="chart-title">每日深度睡眠时长（小时）</div>
        <div class="chart">
          <g2-circle :height=420 :width=630 :data="deepSleepTimeData"></g2-circle>
        </div>
      </div>
      <div class="age third chart-wrapper">
        <div class="chart-title">每日浅度睡眠时长（小时）</div>
        <div class="chart">
          <g2-circle :height=420 :width=630 :data="lightSleepTimeData"></g2-circle>
        </div>
      </div>
      <div class="age third chart-wrapper">
        <div class="chart-title">每日睡眠时醒着时长（小时）</div>
        <div class="chart">
          <g2-circle :height=420 :width=630 :data="sleepWakeTimeData"></g2-circle>
        </div>
      </div>
    </div>
    <div class="area dashed-border charts-wrapper">心率情况</div>
    <div class="flex-row charts">
      <div class="age third chart-wrapper">
        <div class="chart-title">每日最高心率</div>
        <div class="chart">
          <g2-bar :data="maxHeartRateData"></g2-bar>
        </div>
      </div>
      <div class="age third chart-wrapper">
        <div class="chart-title">每日最低心率</div>
        <div class="chart">
          <g2-bar :data="minHeartRateData"></g2-bar>
        </div>
      </div>
      <div class="age third chart-wrapper">
        <div class="chart-title">每日平均心率</div>
        <div class="chart">
          <g2-bar :data="avgHeartRateData"></g2-bar>
        </div>
      </div>
    </div>
    <div class="population dashed-border charts-wrapper">血压情况</div>
    <div class="flex-row charts">
      <div class="age half chart-wrapper">
        <div class="chart-title">每日平均舒张压</div>
        <div class="chart">
          <g2-bar :data="avgDiastolicBloodPressure"></g2-bar>
        </div>
      </div>
      <div class="age half chart-wrapper">
        <div class="chart-title">每日平均收缩压</div>
        <div class="chart">
          <g2-bar :data="avgSystolicBloodPressure"></g2-bar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import G2Chart from "../../components/g2Chart/Chart";
import G2Circle from "../../components/g2Chart/Circle";
import G2Bar from "../../components/g2Chart/Bar";
import G2RosePie from "../../components/g2Chart/RosePie";
import D3Bubble from "../../components/d3Chart/Bubble";
import Wordcloud from "vue-wordcloud";
import TableBar from "../../components/customChart/TableBar";
import CountyMap from "../../components/chart/map/CountyMap";
export default {
  data() {
    return {
      avgDiastolicBloodPressure: [
        { value: 31845, name: "90以下" },
        { value: 119142, name: "90-99" },
        { value: 222587, name: "100-109" },
        { value: 207654, name: "110-119" },
        { value: 96736, name: "120-129" },
        { value: 22503, name: "130-139" },
        { value: 2614, name: "140+" }
      ],
      avgSystolicBloodPressure: [
        { value: 30109, name: "60以下" },
        { value: 112648, name: "60-69" },
        { value: 210455, name: "70-79" },
        { value: 196336, name: "80-89" },
        { value: 91463, name: "90-99" },
        { value: 21276, name: "100-109" },
        { value: 2472, name: "110+" }
      ],
      deepSleepTimeData: [
        { count: 32897, item: "2以内", percent: 0.1 },
        { count: 183482, item: "2-3.9", percent: 0.4 },
        { count: 214512, item: "4-5.9", percent: 0.0 },
        { count: 52569, item: "6-7.9", percent: 0.4 },
        { count: 2700, item: "8+", percent: 0.1 }
      ],
      lightSleepTimeData: [
        { count: 44945, item: "2以内", percent: 0.1 },
        { count: 250682, item: "2-3.9", percent: 0.4 },
        { count: 293076, item: "4-5.9", percent: 0.0 },
        { count: 71821, item: "6-7.9", percent: 0.4 },
        { count: 3689, item: "8+", percent: 0.1 }
      ],
      sleepWakeTimeData: [
        { count: 31178, item: "2以内", percent: 0.1 },
        { count: 173897, item: "2-3.9", percent: 0.4 },
        { count: 203306, item: "4-5.9", percent: 0.0 },
        { count: 49822, item: "6-7.9", percent: 0.4 },
        { count: 2559, item: "8+", percent: 0.1 }
      ],
      maxHeartRateData: [
        { value: 27817, name: "70以下" },
        { value: 89939, name: "70-79" },
        { value: 174582, name: "80-89" },
        { value: 203457, name: "90-99" },
        { value: 142353, name: "100-109" },
        { value: 59798, name: "110-119" },
        { value: 15081, name: "120-129" },
        { value: 2283, name: "130+" }
      ],
      minHeartRateData: [
        { value: 40577, name: "40以下" },
        { value: 181854, name: "40-49" },
        { value: 299827, name: "50-59" },
        { value: 181854, name: "60-69" },
        { value: 40577, name: "70-79" },
        { value: 3331, name: "80+" }
      ],
      avgHeartRateData: [
        { value: 28520, name: "60以下" },
        { value: 92209, name: "60-64" },
        { value: 178989, name: "65-69" },
        { value: 208593, name: "70-74" },
        { value: 145947, name: "75-79" },
        { value: 61307, name: "80-84" },
        { value: 15461, name: "85-89" },
        { value: 2341, name: "90+" }
      ],
      mapOption: null,
      distributedMapOption: null,
      defaultWords: [
        {
          name: "Cat",
          value: 100
        },
        {
          name: "fish",
          value: 19
        },
        {
          name: "things",
          value: 18
        },
        {
          name: "look",
          value: 16
        },
        {
          name: "two",
          value: 15
        },
        {
          name: "fun",
          value: 9
        },
        {
          name: "know",
          value: 9
        },
        {
          name: "good",
          value: 9
        },
        {
          name: "play",
          value: 6
        }
      ],
      venueTypeData: [
        { name: "name1", count: 0.2, percent: "15%" },
        { name: "name2", count: 0.1, percent: "10%" },
        { name: "mike", count: 0.001, percent: "0.1%" },
        { name: "joke", count: 0.03, percent: "3%" },
        { name: "jobs", count: 0.01, percent: "1%" }
      ],
      sexData: [
        { count: 51410, item: "MACOS", percent: 0.1 },
        { count: 2641, item: "其他", percent: 0.0 },
        { count: 179440, item: "iOS", percent: 0.4 },
        { count: 209786, item: "windows", percent: 0.4 },
        { count: 32172, item: "Android", percent: 0.1 }
      ],
      ageData: [
        {
          name: "1951 年",
          value: 38
        },
        {
          name: "1952 年",
          value: 52
        },
        {
          name: "1956 年",
          value: 61
        },
        {
          name: "1957 年",
          value: 145
        },
        {
          name: "1958 年",
          value: 48
        },
        {
          name: "1959 年",
          value: 38
        },
        {
          name: "1960 年",
          value: 38
        },
        {
          name: "1962 年",
          value: 38
        }
      ],
      professionData: [
        {
          name: "2001",
          value: 41.8
        },
        {
          name: "2002",
          value: 38
        },
        {
          name: "2003",
          value: 33.7
        },
        {
          name: "2004",
          value: 30.7
        },
        {
          name: "2005",
          value: 25.8
        },
        {
          name: "2006",
          value: 31.7
        },
        {
          name: "2007",
          value: 33
        },
        {
          name: "2008",
          value: 46
        },
        {
          name: "2009",
          value: 38.3
        },
        {
          name: "2010",
          value: 28
        },
        {
          name: "2011",
          value: 42.5
        },
        {
          name: "2012",
          value: 30.3
        }
      ],
      emotionalStateData: [
        { count: 51410, item: "MACOS", percent: 0.1 },
        { count: 2641, item: "其他", percent: 0.5 },
        { count: 179440, item: "iOS", percent: 0.4 }
      ]
    };
  },
  components: {
    G2Chart,
    G2Circle,
    G2Bar,
    G2RosePie,
    D3Bubble,
    Wordcloud,
    TableBar,
    CountyMap
  }
};
</script>
<style>
</style>

