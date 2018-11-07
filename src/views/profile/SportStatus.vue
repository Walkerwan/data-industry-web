<template>
  <div class="vunue-preference charts-page">
    <div class="population dashed-border charts-wrapper">步行运动</div>
    <div class="flex-row charts">
      <div class="age quarter chart-wrapper">
        <div class="chart-title">步行步数（步数）</div>
        <div class="chart">
          <g2-bar :height=370 :data="stepAmountData"></g2-bar>
        </div>
      </div>
      <div class="age quarter chart-wrapper">
        <div class="chart-title">日均步行距离（km）</div>
        <div class="chart">
          <g2-bar :data="distanceData"></g2-bar>
        </div>
      </div>
      <div class="age quarter">
      </div>
      <div class="quarter">
      </div>
    </div>
    <div class="area dashed-border charts-wrapper">羽毛球运动</div>
    <div class="flex-row charts">
      <div class="age quarter chart-wrapper">
        <div class="chart-title">羽毛球运动时长（分钟）</div>
        <div class="chart">
          <g2-circle :height=400 :width=470 :data="badmintonTimeData"></g2-circle>
        </div>
      </div>
      <div class="age quarter chart-wrapper">
        <div class="chart-title">羽毛球击球类型（平抽）</div>
        <div class="chart">
          <g2-bar :data="badmintonHitType1Data"></g2-bar>
        </div>
      </div>
      <div class="age quarter chart-wrapper">
        <div class="chart-title">羽毛球击球类型（小球）</div>
        <div class="chart">
          <g2-bar :data="badmintonHitType2Data"></g2-bar>
        </div>
      </div>
      <div class="age quarter chart-wrapper">
        <div class="chart-title">羽毛球击球类型（杀球）</div>
        <div class="chart">
          <g2-bar :data="badmintonHitType3Data"></g2-bar>
        </div>
      </div>
      <div class="age quarter chart-wrapper">
        <div class="chart-title">羽毛球击球类型（挑球）</div>
        <div class="chart">
          <g2-bar :data="badmintonHitType4Data"></g2-bar>
        </div>
      </div>
      <div class="age quarter chart-wrapper">
        <div class="chart-title">羽毛球每局平均拍速（km/h）</div>
        <div class="chart">
          <g2-bar :data="badmintonHitSpeedData"></g2-bar>
        </div>
      </div>
      <div class="age quarter">
      </div>
      <div class="quarter">
      </div>
    </div>
    <div class="population dashed-border charts-wrapper"></div>
    <div class="flex-row charts">
      <div class="age half chart-wrapper">
        <div class="chart-title">篮球运动时长（分钟）</div>
        <div class="chart">
          <g2-circle :height=400 :width=924 :data="basketballTimeData"></g2-circle>
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
      badmintonHitSpeedData: [
        {
          name: "50以下",
          value: 28366
        },
        {
          name: "50-99",
          value: 127129
        },
        {
          name: "100-149",
          value: 209600
        },
        {
          name: "150-199",
          value: 127129
        },
        {
          name: "200-249",
          value: 28366
        },
        {
          name: "250+",
          value: 2328
        }
      ],
      badmintonHitType1Data: [
        {
          name: "10%以下",
          value: 47902
        },
        {
          name: "10%-19%",
          value: 214681
        },
        {
          name: "20%-29%",
          value: 353949
        },
        {
          name: "30%-39%",
          value: 214681
        },
        {
          name: "40%-49%",
          value: 47902
        },
        {
          name: "50%以上",
          value: 3932
        }
      ],
      badmintonHitType2Data: [
        {
          name: "10%以下",
          value: 42707
        },
        {
          name: "10%-19%",
          value: 191402
        },
        {
          name: "20%-29%",
          value: 315568
        },
        {
          name: "30%-39%",
          value: 191402
        },
        {
          name: "40%-49%",
          value: 42707
        },
        {
          name: "50%以上",
          value: 3506
        }
      ],
      badmintonHitType3Data: [
        {
          name: "10%以下",
          value: 53120
        },
        {
          name: "10%-19%",
          value: 238069
        },
        {
          name: "20%-29%",
          value: 396148
        },
        {
          name: "30%-39%",
          value: 240276
        },
        {
          name: "40%-49%",
          value: 53613
        },
        {
          name: "50%以上",
          value: 4360
        }
      ],
      badmintonHitType4Data: [
        {
          name: "10%以下",
          value: 53613
        },
        {
          name: "10%-19%",
          value: 240276
        },
        {
          name: "20%-29%",
          value: 392509
        },
        {
          name: "30%-39%",
          value: 238069
        },
        {
          name: "40%-49%",
          value: 53120
        },
        {
          name: "50%以上",
          value: 4401
        }
      ],
      basketballTimeData: [
        { count: 30468, item: "5以下", percent: 0.1 },
        { count: 136548, item: "5-9", percent: 0.0 },
        { count: 225130, item: "10-14", percent: 0.4 },
        { count: 136548, item: "15-19", percent: 0.4 },
        { count: 30468, item: "20-29", percent: 0.1 },
        { count: 2501, item: "30+", percent: 0.1 }
      ],
      badmintonTimeData: [
        { count: 30468, item: "5以下", percent: 0.1 },
        { count: 136548, item: "5-9", percent: 0.0 },
        { count: 225130, item: "10-14", percent: 0.4 },
        { count: 136548, item: "15-19", percent: 0.4 },
        { count: 30468, item: "20-29", percent: 0.1 },
        { count: 2501, item: "30+", percent: 0.1 }
      ],
      distanceData: [
        {
          name: "1.0以下",
          value: 40014
        },
        {
          name: "1.0-1.9",
          value: 179329
        },
        {
          name: "2.0-2.9",
          value: 295663
        },
        {
          name: "3.0-3.9",
          value: 179329
        },
        {
          name: "4.0-4.9",
          value: 40014
        },
        {
          name: "5+",
          value: 3285
        }
      ],
      stepAmountData: [
        {
          name: "3000以下",
          value: 30782
        },
        {
          name: "3000-4999",
          value: 115165
        },
        {
          name: "5000-6999",
          value: 215156
        },
        {
          name: "7000-9999",
          value: 200722
        },
        {
          name: "10000-14999",
          value: 93506
        },
        {
          name: "15000-19999",
          value: 21752
        },
        {
          name: "20000+",
          value: 2527
        }
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

