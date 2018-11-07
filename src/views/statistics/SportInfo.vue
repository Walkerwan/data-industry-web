<template>
  <div class="base-info charts-page">
    <div class="flex-row charts">
      <div class="filter-wrapper">
        <div class="chart-title">按照条件过滤</div>
        <div class="chart">
          <div class="filter-label" style="margin-top:18px;margin-bottom:12px;">运动类型名称过滤</div>
          <div class="filter-widget">
            <Input style="width:200px;margin-bottom:24px;">
            <Icon type="ios-search" slot="suffix" />
            </Input>
          </div>
          <div class="period-filter filter-label">时段过滤</div>
          <div class="filter-widget">
            <div class="period-filter-buttons flex-row">
              <Button v-for="periodButton in periodButtons" size="small" :type="periodPrimary===periodButton.id?'primary':'default'" @click="periodButtonClick(periodButton)">{{periodButton.name}}</Button>
            </div>
            <DatePicker type="date" placeholder="请选择开始日期" style="width: 200px;margin-bottom:24px;"></DatePicker>
            <DatePicker type="date" placeholder="请选择结束日期" style="width: 200px;margin-bottom:24px;"></DatePicker>
          </div>
          <div class="filter-widget">
            <Button type="primary">清除条件</Button>
          </div>
        </div>
      </div>
      <div class="age statistics-five-twelfth chart-wrapper">
        <div class="chart-title">各类运动参与人数变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="sportParticipationData" :fields="sportParticipationFields" :height=327></g2-multi-line>
        </div>
      </div>
      <div class="index-rank-list statistics-half chart-wrapper">
        <div class="chart-title">各类运动运动时长变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="sportTimeVariationTrend" :fields="sportParticipationFields" :height=327></g2-multi-line>
        </div>
      </div>
    </div>
    <div class="flex-row charts">
      <div class="county statistics-half chart-wrapper statistics-map-wrapper">
        <div class="chart-title">运动人群分布地图</div>
        <div class="map">
          <county-map :option="heatMapOption" :style="{width:'874px', height:'705px'}"></county-map>
        </div>
      </div>
      <div class="statistics-half">
        <div class="variation-trend statistics-half chart-wrapper">
          <div class="chart-title">各类运动人均运动时长变化趋势</div>
          <div class="chart">
            <g2-multi-line :data="avgSportTimeVariationTrend" :fields="avgSportTimeVariationTrendFields" :height=327></g2-multi-line>
          </div>
        </div>
        <div class="weight statistics-half chart-wrapper">
          <div class="chart-title">人均步行步数变化趋势</div>
          <div class="chart">
            <g2-line field="步数" :data="avgWalkStepCountTrend" style="margin-left:-15px;margin-top: 25px;" :height=327></g2-line>
          </div>
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
import CountyMap from "../../components/chart/map/CountyMap";
import RankList from "../../components/customChart/RankList";
import G2Area from "../../components/g2Chart/Area";
import G2MultiLine from "../../components/g2Chart/MultiLine";
import G2Line from "../../components/g2Chart/Line";
import G2Radar from "../../components/g2Chart/Radar";
export default {
  data() {
    return {
      avgWalkStepCountTrend: [
        {
          month: "1",
          步数: 3980
        },
        {
          month: "2",
          步数: 3146
        },
        {
          month: "3",
          步数: 4607
        },
        {
          month: "4",
          步数: 3820
        },
        {
          month: "5",
          步数: 2986
        },
        {
          month: "6",
          步数: 4199
        },
        {
          month: "7",
          步数: 6351
        },
        {
          month: "8",
          步数: 4323
        },
        {
          month: "9",
          步数: 6450
        },
        {
          month: "10",
          步数: 3170
        },
        {
          month: "11",
          步数: 4352
        },
        {
          month: "12",
          步数: 5132
        },
        {
          month: "13",
          步数: 7450
        },
        {
          month: "14",
          步数: 2563
        },
        {
          month: "15",
          步数: 8456
        },
        {
          month: "16",
          步数: 9298
        },
        {
          month: "17",
          步数: 6265
        },
        {
          month: "18",
          步数: 6458
        },
        {
          month: "19",
          步数: 7512
        },
        {
          month: "20",
          步数: 8910
        },
        {
          month: "21",
          步数: 2604
        },
        {
          month: "22",
          步数: 4198
        },
        {
          month: "23",
          步数: 6549
        },
        {
          month: "24",
          步数: 4115
        },
        {
          month: "25",
          步数: 4609
        },
        {
          month: "26",
          步数: 7368
        },
        {
          month: "27",
          步数: 3915
        },
        {
          month: "28",
          步数: 9656
        },
        {
          month: "29",
          步数: 4023
        },
        {
          month: "30",
          步数: 3584
        }
      ],
      avgSportTimeVariationTrendFields: ["步行", "网球", "羽毛球"],
      avgSportTimeVariationTrend: [
        {
          month: "1",
          步行: 0.7,
          网球: 0.5,
          羽毛球: 0.2
        },
        {
          month: "2",
          步行: 0.3,
          网球: 0.4,
          羽毛球: 0.7
        },
        {
          month: "3",
          步行: 0.5,
          网球: 0.2,
          羽毛球: 0.8
        },
        {
          month: "4",
          步行: 0.6,
          网球: 0.3,
          羽毛球: 0.3
        },
        {
          month: "5",
          步行: 0.8,
          网球: 0.7,
          羽毛球: 0.2
        },
        {
          month: "6",
          步行: 0.7,
          网球: 0.9,
          羽毛球: 0.4
        },
        {
          month: "7",
          步行: 0.5,
          网球: 1,
          羽毛球: 1
        },
        {
          month: "8",
          步行: 0.4,
          网球: 0.3,
          羽毛球: 0.5
        },
        {
          month: "9",
          步行: 0.7,
          网球: 0.3,
          羽毛球: 0.8
        },
        {
          month: "10",
          步行: 0.2,
          网球: 0.7,
          羽毛球: 0.9
        },
        {
          month: "11",
          步行: 0.4,
          网球: 0.4,
          羽毛球: 1
        },
        {
          month: "12",
          步行: 0.7,
          网球: 0.5,
          羽毛球: 0.2
        },
        {
          month: "13",
          步行: 0.1,
          网球: 0.6,
          羽毛球: 0
        },
        {
          month: "14",
          步行: 1,
          网球: 0.1,
          羽毛球: 0.4
        },
        {
          month: "15",
          步行: 0.7,
          网球: 0.4,
          羽毛球: 0.3
        },
        {
          month: "16",
          步行: 1,
          网球: 0.7,
          羽毛球: 0.3
        },
        {
          month: "17",
          步行: 0.9,
          网球: 0.3,
          羽毛球: 0.6
        },
        {
          month: "18",
          步行: 0,
          网球: 0.5,
          羽毛球: 0
        },
        {
          month: "19",
          步行: 0.7,
          网球: 0.7,
          羽毛球: 0.8
        },
        {
          month: "20",
          步行: 0.1,
          网球: 0.3,
          羽毛球: 0.4
        },
        {
          month: "21",
          步行: 0.8,
          网球: 0,
          羽毛球: 0.3
        },
        {
          month: "22",
          步行: 0.1,
          网球: 0.9,
          羽毛球: 0.4
        },
        {
          month: "23",
          步行: 0.4,
          网球: 0.2,
          羽毛球: 0.3
        },
        {
          month: "24",
          步行: 0,
          网球: 0.2,
          羽毛球: 0.8
        },
        {
          month: "25",
          步行: 0,
          网球: 0.9,
          羽毛球: 0.5
        },
        {
          month: "26",
          步行: 0,
          网球: 0.4,
          羽毛球: 0.8
        },
        {
          month: "27",
          步行: 0.1,
          网球: 0.3,
          羽毛球: 0.9
        },
        {
          month: "28",
          步行: 0.6,
          网球: 0.9,
          羽毛球: 0.5
        },
        {
          month: "29",
          步行: 0.8,
          网球: 0.8,
          羽毛球: 0.9
        },
        {
          month: "30",
          步行: 0.3,
          网球: 0.2,
          羽毛球: 0.5
        }
      ],
      sportTimeVariationTrendFields: ["步行", "网球", "羽毛球"],
      sportTimeVariationTrend: [
        {
          month: "1",
          步行: 3126,
          网球: 8866,
          羽毛球: 11130
        },
        {
          month: "2",
          步行: 6065,
          网球: 19492,
          羽毛球: 15462
        },
        {
          month: "3",
          步行: 4626,
          网球: 8246,
          羽毛球: 11753
        },
        {
          month: "4",
          步行: 18541,
          网球: 19173,
          羽毛球: 16523
        },
        {
          month: "5",
          步行: 9426,
          网球: 6743,
          羽毛球: 10207
        },
        {
          month: "6",
          步行: 12776,
          网球: 13834,
          羽毛球: 17659
        },
        {
          month: "7",
          步行: 19370,
          网球: 8107,
          羽毛球: 15781
        },
        {
          month: "8",
          步行: 6387,
          网球: 3212,
          羽毛球: 18347
        },
        {
          month: "9",
          步行: 5105,
          网球: 13306,
          羽毛球: 14384
        },
        {
          month: "10",
          步行: 5792,
          网球: 13750,
          羽毛球: 7715
        },
        {
          month: "11",
          步行: 18011,
          网球: 7259,
          羽毛球: 4576
        },
        {
          month: "12",
          步行: 18011,
          网球: 12455,
          羽毛球: 4525
        },
        {
          month: "13",
          步行: 10582,
          网球: 8135,
          羽毛球: 7411
        },
        {
          month: "14",
          步行: 18348,
          网球: 18951,
          羽毛球: 15932
        },
        {
          month: "15",
          步行: 13462,
          网球: 17477,
          羽毛球: 12495
        },
        {
          month: "16",
          步行: 16374,
          网球: 8671,
          羽毛球: 6150
        },
        {
          month: "17",
          步行: 7107,
          网球: 9809,
          羽毛球: 19776
        },
        {
          month: "18",
          步行: 2429,
          网球: 3117,
          羽毛球: 16305
        },
        {
          month: "19",
          步行: 2450,
          网球: 16904,
          羽毛球: 11215
        },
        {
          month: "20",
          步行: 13896,
          网球: 16667,
          羽毛球: 10830
        },
        {
          month: "21",
          步行: 13418,
          网球: 19727,
          羽毛球: 10721
        },
        {
          month: "22",
          步行: 15949,
          网球: 11844,
          羽毛球: 10778
        },
        {
          month: "23",
          步行: 6211,
          网球: 11303,
          羽毛球: 18325
        },
        {
          month: "24",
          步行: 17465,
          网球: 3956,
          羽毛球: 18482
        },
        {
          month: "25",
          步行: 7739,
          网球: 12919,
          羽毛球: 10765
        },
        {
          month: "26",
          步行: 15337,
          网球: 6897,
          羽毛球: 11986
        },
        {
          month: "27",
          步行: 5465,
          网球: 6946,
          羽毛球: 17007
        },
        {
          month: "28",
          步行: 5198,
          网球: 18306,
          羽毛球: 15146
        },
        {
          month: "29",
          步行: 12213,
          网球: 13752,
          羽毛球: 10467
        },
        {
          month: "30",
          步行: 9151,
          网球: 15616,
          羽毛球: 10630
        }
      ],
      sportParticipationFields: ["步行", "网球", "羽毛球"],
      sportParticipationData: [
        {
          month: "1",
          步行: 15286,
          网球: 19581,
          羽毛球: 15073
        },
        {
          month: "2",
          步行: 3628,
          网球: 18362,
          羽毛球: 14536
        },
        {
          month: "3",
          步行: 12617,
          网球: 6449,
          羽毛球: 11792
        },
        {
          month: "4",
          步行: 8582,
          网球: 2202,
          羽毛球: 17395
        },
        {
          month: "5",
          步行: 4111,
          网球: 17930,
          羽毛球: 4642
        },
        {
          month: "6",
          步行: 15208,
          网球: 3505,
          羽毛球: 17667
        },
        {
          month: "7",
          步行: 17837,
          网球: 5079,
          羽毛球: 13441
        },
        {
          month: "8",
          步行: 5033,
          网球: 14273,
          羽毛球: 2071
        },
        {
          month: "9",
          步行: 4693,
          网球: 14882,
          羽毛球: 8664
        },
        {
          month: "10",
          步行: 14090,
          网球: 19098,
          羽毛球: 9509
        },
        {
          month: "11",
          步行: 12416,
          网球: 18249,
          羽毛球: 3937
        },
        {
          month: "12",
          步行: 4704,
          网球: 2538,
          羽毛球: 13940
        },
        {
          month: "13",
          步行: 12624,
          网球: 19393,
          羽毛球: 18137
        },
        {
          month: "14",
          步行: 16016,
          网球: 12146,
          羽毛球: 9137
        },
        {
          month: "15",
          步行: 17023,
          网球: 12466,
          羽毛球: 8848
        },
        {
          month: "16",
          步行: 3085,
          网球: 11743,
          羽毛球: 4472
        },
        {
          month: "17",
          步行: 3502,
          网球: 19324,
          羽毛球: 10995
        },
        {
          month: "18",
          步行: 19731,
          网球: 8076,
          羽毛球: 16241
        },
        {
          month: "19",
          步行: 14185,
          网球: 10551,
          羽毛球: 11766
        },
        {
          month: "20",
          步行: 3599,
          网球: 11685,
          羽毛球: 2066
        },
        {
          month: "21",
          步行: 6502,
          网球: 15991,
          羽毛球: 3443
        },
        {
          month: "22",
          步行: 5161,
          网球: 3084,
          羽毛球: 15111
        },
        {
          month: "23",
          步行: 12618,
          网球: 2220,
          羽毛球: 6147
        },
        {
          month: "24",
          步行: 12922,
          网球: 2564,
          羽毛球: 16895
        },
        {
          month: "25",
          步行: 19193,
          网球: 2237,
          羽毛球: 2522
        },
        {
          month: "26",
          步行: 17855,
          网球: 4239,
          羽毛球: 14801
        },
        {
          month: "27",
          步行: 6386,
          网球: 11138,
          羽毛球: 7282
        },
        {
          month: "28",
          步行: 19579,
          网球: 7164,
          羽毛球: 4238
        },
        {
          month: "29",
          步行: 5581,
          网球: 16037,
          羽毛球: 19428
        },
        {
          month: "30",
          步行: 9091,
          网球: 5014,
          羽毛球: 4267
        }
      ],
      variationTrendData: [
        {
          name: "1991",
          value: 15468
        },
        {
          name: "1992",
          value: 16100
        },
        {
          name: "1993",
          value: 15900
        },
        {
          name: "1994",
          value: 17409
        },
        {
          name: "1995",
          value: 17000
        },
        {
          name: "1996",
          value: 31056
        },
        {
          name: "1997",
          value: 31982
        },
        {
          name: "1998",
          value: 32040
        },
        {
          name: "1999",
          value: 33233
        }
      ],
      indexRankList: [
        {
          rank: 1,
          name: "2018年保险业联赛",
          score: 4.9
        },
        {
          rank: 2,
          name: "2018年保险业联赛",
          score: 4.8
        },
        {
          rank: 3,
          name: "2018年保险业联赛",
          score: 4.7
        },
        {
          rank: 4,
          name: "2018年保险业联赛",
          score: 4.6
        },
        {
          rank: 5,
          name: "2018年保险业联赛",
          score: 4.5
        },
        {
          rank: 6,
          name: "2018年保险业联赛",
          score: 4.3
        },
        {
          rank: 7,
          name: "2018年保险业联赛",
          score: 4.2
        },
        {
          rank: 8,
          name: "2018年保险业联赛",
          score: 4.1
        },
        {
          rank: 9,
          name: "2018年保险业联赛",
          score: 4.0
        },
        {
          rank: 10,
          name: "2018年保险业联赛",
          score: 3.9
        },
        {
          rank: 11,
          name: "2018年保险业联赛",
          score: 4.9
        },
        {
          rank: 12,
          name: "2018年保险业联赛",
          score: 4.8
        },
        {
          rank: 13,
          name: "2018年保险业联赛",
          score: 4.7
        },
        {
          rank: 14,
          name: "2018年保险业联赛",
          score: 4.6
        },
        {
          rank: 15,
          name: "2018年保险业联赛",
          score: 4.5
        },
        {
          rank: 16,
          name: "2018年保险业联赛",
          score: 4.3
        },
        {
          rank: 17,
          name: "2018年保险业联赛",
          score: 4.2
        },
        {
          rank: 18,
          name: "2018年保险业联赛",
          score: 4.1
        },
        {
          rank: 19,
          name: "2018年保险业联赛",
          score: 4.0
        },
        {
          rank: 20,
          name: "2018年保险业联赛",
          score: 3.9
        }
      ],
      heatMapOption: null,
      periodButtons: [
        {
          name: "近30天",
          id: "month"
        },
        {
          name: "近90天",
          id: "quarter"
        },
        {
          name: "近半年",
          id: "halfYear"
        },
        {
          name: "近1年",
          id: "year"
        }
      ],
      periodPrimary: "month",
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
  methods: {
    periodButtonClick(periodButton) {
      this.periodPrimary = periodButton.id;
    }
  },
  components: {
    G2Chart,
    G2Circle,
    G2Bar,
    G2RosePie,
    CountyMap,
    RankList,
    G2Area,
    G2MultiLine,
    G2Line,
    G2Radar
  },
  mounted() {
    this.heatMapOption = {
      tooltip: {
        trigger: "item"
      },
      series: [
        {
          name: "运动人群分布地图",
          type: "heatmap",
          coordinateSystem: "geo",
          data: [
            [113.899425, 22.568929, 4928],
            [113.812576, 22.679392, 1770],
            [114.065237, 22.713653, 207],
            [113.904048, 22.761307, 3064],
            [114.036064, 22.642824, 4074],
            [114.047235, 22.757864, 336],
            [114.043551, 22.627753, 885],
            [114.043551, 22.627753, 2192],
            [113.830973, 22.736069, 2180],
            [113.942452, 22.67849, 4689],
            [113.836159, 22.777967, 377],
            [113.869117, 22.581735, 1888],
            [113.907994, 22.570224, 533],
            [114.062762, 22.514223, 1034],
            [113.928507, 22.639107, 3825],
            [114.068998, 22.566427, 414],
            [114.033246, 22.542356, 2180],
            [114.090351, 22.537705, 4257],
            [114.091933, 22.536933, 309],
            [114.074878, 22.528348, 4006],
            [114.074582, 22.540606, 365],
            [114.093342, 22.543237, 2889],
            [114.076782, 22.541517, 1043],
            [114.09363, 22.561766, 1621],
            [114.050218, 22.559168, 2108],
            [114.109029, 22.551853, 3596],
            [114.07724, 22.555938, 2967],
            [114.049088, 22.526598, 1764],
            [114.048461, 22.524527, 2466],
            [114.102575, 22.542791, 464],
            [114.066329, 22.575161, 3165],
            [114.042497, 22.530294, 4572],
            [114.060176, 22.529065, 4328],
            [114.048023, 22.571368, 942],
            [114.029978, 22.533968, 4329],
            [114.045221, 22.544666, 4681],
            [114.053413, 22.532678, 2989],
            [114.057317, 22.519753, 2149],
            [114.110895, 22.562236, 3379],
            [114.110895, 22.562236, 4811],
            [114.020418, 22.539593, 2339],
            [114.077406, 22.633264, 361],
            [114.128025, 22.608011, 1657],
            [114.154575, 22.62573, 4662],
            [114.14756, 22.622742, 3807],
            [114.215408, 22.654411, 3091],
            [114.150462, 22.630884, 2078],
            [114.142056, 22.610515, 3516],
            [114.380551, 22.752814, 2309],
            [114.428954, 22.638405, 3722],
            [114.430681, 22.631344, 2273],
            [114.24854, 22.732774, 3164],
            [114.497807, 22.540254, 2762],
            [114.134135, 22.691778, 4922],
            [114.31589, 22.776402, 3573],
            [114.076475, 22.650907, 4546],
            [114.144521, 22.587239, 2074],
            [114.114511, 22.546322, 612],
            [114.122821, 22.590902, 2865],
            [114.13658, 22.562715, 4912],
            [114.143258, 22.566907, 3923],
            [114.12543, 22.551889, 4487],
            [114.142869, 22.582645, 4011],
            [114.12619, 22.584682, 2220],
            [114.125156, 22.546055, 840],
            [114.129336, 22.572092, 1789],
            [114.143367, 22.552416, 1300],
            [114.123611, 22.537961, 2497],
            [114.130703, 22.593294, 972],
            [114.17909, 22.565555, 1348],
            [114.104372, 22.573718, 3987],
            [114.112049, 22.583693, 3845],
            [114.124462, 22.541853, 1367],
            [114.131395, 22.580491, 1840],
            [114.123308, 22.569228, 2377],
            [114.117667, 22.569697, 3558],
            [114.136542, 22.573667, 1381],
            [114.11924, 22.574066, 3603],
            [114.130782, 22.566883, 651],
            [114.136284, 22.543874, 522],
            [114.096324, 22.574342, 4510],
            [113.973369, 22.545597, 1277],
            [113.960726, 22.549595, 4501],
            [113.947799, 22.523707, 2873],
            [113.990586, 22.540615, 3159],
            [113.925291, 22.542096, 647],
            [113.931613, 22.518733, 4588],
            [113.913241, 22.522323, 1878],
            [113.92194, 22.489142, 566],
            [114.001185, 22.527274, 3661],
            [113.960285, 22.586456, 216],
            [114.316948, 22.604784, 730],
            [114.334053, 22.608836, 789]
          ]
        }
      ],
      visualMap: {
        min: 0,
        max: 5000,
        splitNumber: 5,
        inRange: {
          color: ["#db6666", "#ebe288", "#c1db66"].reverse()
        },
        textStyle: {
          color: "#737373"
        }
      },
      geo: {
        map: "深圳市",
        label: {
          show: true,
          color: "#fff",
          emphasis: {
            color: "#fff"
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: "#3ca7df",
            borderColor: "#fff"
          },
          emphasis: {
            areaColor: "#3ca7df",
            borderColor: "#fff"
          }
        }
      }
    };
  }
};
</script>
<style>
.period-filter-buttons {
  margin-bottom: 12px;
}
.period-filter {
  margin-top: 0px;
  margin-bottom: 12px;
}
.filter-wrapper {
  width: 217px;
  height: 369px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid lightgray;
}
.filter-label {
  font-size: 14px;
  padding-left: 14px;
  height: 14px;
  line-height: 14px;
}
.filter-widget {
  padding-left: 6px;
}
.top-quarter {
  width: 423px;
  background: transparent;
}
.top-small-half {
  width: 671px;
  background: transparent;
}
.statistics-half {
  width: 875px;
  background: transparent;
}
.statistics-five-twelfth {
  width: 650px;
  background: transparent;
}
.statistics-map-wrapper {
  margin-bottom: 10px;
  height: 750px;
  border-radius: 6px;
  border: 1px solid lightgray;
}
</style>
