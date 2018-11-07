<template>
  <div class="base-info charts-page">
    <div class="flex-row charts">
      <div class="filter-wrapper">
        <div class="chart-title">按照条件过滤</div>
        <div class="chart">
          <div class="filter-label" style="margin-top:18px;margin-bottom:12px;">场馆名称过滤</div>
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
      <div class="age top-quarter chart-wrapper">
        <div class="chart-title">场馆综合指数</div>
        <div class="chart">
          <g2-radar style="margin-left: -40px;margin-top: 35px;" :width=421 :height=327></g2-radar>
        </div>
      </div>
      <div class="index-rank-list top-quarter chart-wrapper">
        <div class="chart-title">场馆综合指数排名</div>
        <div class="chart">
          <rank-list :data="indexRankList"></rank-list>
        </div>
      </div>
      <div class="emotional-state top-small-half chart-wrapper">
        <div class="chart-title">场馆场地类型占比</div>
        <div class="chart">
          <g2-bar :data="venueTypeData"></g2-bar>
        </div>
      </div>
    </div>
    <div class="flex-row charts">
      <div class="county statistics-half chart-wrapper statistics-map-wrapper">
        <div class="chart-title">场馆分布地图</div>
        <div class="map">
          <county-map :option="distributedMapOption" :style="{width:'873px', height:'708px'}"></county-map>
        </div>
      </div>
      <div class="statistics-half">
        <div class="variation-trend statistics-half chart-wrapper">
          <div class="chart-title">场馆关注量变化趋势</div>
          <div class="chart">
            <g2-line :data="concernData" style="margin-left:-15px;margin-top: 25px;" :width=875 :height=327></g2-line>
          </div>
        </div>
        <div class="weight statistics-half chart-wrapper">
          <div class="chart-title">场馆器材使用率变化趋势（%）</div>
          <div class="chart">
            <g2-multi-line :data="useRateData" :fields="useRateFields" :height=327></g2-multi-line>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row charts">
      <div class="stature statistics-half chart-wrapper">
        <div class="chart-title">场馆场地使用率变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="venueUseRateData" :fields="venueUseRateFields" :height=327></g2-multi-line>
        </div>
      </div>
      <div class="weight statistics-half chart-wrapper">
        <div class="chart-title">场馆会员数量累计增长趋势</div>
        <div class="chart">
          <g2-area field="人数" :data="variationTrendData"></g2-area>
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
      venueUseRateFields: ["篮球场", "网球场", "羽毛球场"],
      venueUseRateData: [
        {
          month: "1",
          篮球场: 15931,
          网球场: 13593,
          羽毛球场: 17091
        },
        {
          month: "2",
          篮球场: 7493,
          网球场: 17687,
          羽毛球场: 17588
        },
        {
          month: "3",
          篮球场: 16283,
          网球场: 18640,
          羽毛球场: 11923
        },
        {
          month: "4",
          篮球场: 3429,
          网球场: 8629,
          羽毛球场: 13839
        },
        {
          month: "5",
          篮球场: 6182,
          网球场: 3160,
          羽毛球场: 12482
        },
        {
          month: "6",
          篮球场: 6800,
          网球场: 6765,
          羽毛球场: 9355
        },
        {
          month: "7",
          篮球场: 2985,
          网球场: 12386,
          羽毛球场: 3647
        },
        {
          month: "8",
          篮球场: 6035,
          网球场: 8710,
          羽毛球场: 2208
        },
        {
          month: "9",
          篮球场: 19207,
          网球场: 16991,
          羽毛球场: 16211
        },
        {
          month: "10",
          篮球场: 9995,
          网球场: 12496,
          羽毛球场: 13538
        },
        {
          month: "11",
          篮球场: 18116,
          网球场: 2648,
          羽毛球场: 16666
        },
        {
          month: "12",
          篮球场: 12651,
          网球场: 19920,
          羽毛球场: 7927
        },
        {
          month: "13",
          篮球场: 8848,
          网球场: 5217,
          羽毛球场: 15200
        },
        {
          month: "14",
          篮球场: 14750,
          网球场: 11852,
          羽毛球场: 8420
        },
        {
          month: "15",
          篮球场: 15090,
          网球场: 6588,
          羽毛球场: 5409
        },
        {
          month: "16",
          篮球场: 10406,
          网球场: 3870,
          羽毛球场: 2702
        },
        {
          month: "17",
          篮球场: 8081,
          网球场: 18083,
          羽毛球场: 15615
        },
        {
          month: "18",
          篮球场: 3102,
          网球场: 3776,
          羽毛球场: 15065
        },
        {
          month: "19",
          篮球场: 6461,
          网球场: 10936,
          羽毛球场: 14944
        },
        {
          month: "20",
          篮球场: 16145,
          网球场: 7702,
          羽毛球场: 6475
        },
        {
          month: "21",
          篮球场: 13096,
          网球场: 13046,
          羽毛球场: 2104
        },
        {
          month: "22",
          篮球场: 9056,
          网球场: 8919,
          羽毛球场: 8902
        },
        {
          month: "23",
          篮球场: 15469,
          网球场: 8881,
          羽毛球场: 5232
        },
        {
          month: "24",
          篮球场: 8357,
          网球场: 15835,
          羽毛球场: 16296
        },
        {
          month: "25",
          篮球场: 9674,
          网球场: 2679,
          羽毛球场: 11242
        },
        {
          month: "26",
          篮球场: 16596,
          网球场: 18815,
          羽毛球场: 7010
        },
        {
          month: "27",
          篮球场: 9491,
          网球场: 9674,
          羽毛球场: 6722
        },
        {
          month: "28",
          篮球场: 8895,
          网球场: 2880,
          羽毛球场: 2302
        },
        {
          month: "29",
          篮球场: 4168,
          网球场: 9021,
          羽毛球场: 18042
        },
        {
          month: "30",
          篮球场: 18817,
          网球场: 17318,
          羽毛球场: 14896
        }
      ],
      useRateFields: ["倒蹬机", "地雷架", "龙门架"],
      useRateData: [
        {
          month: "1",
          倒蹬机: 2.9,
          地雷架: 5.1,
          龙门架: 4.7
        },
        {
          month: "2",
          倒蹬机: 2.6,
          地雷架: 1.7,
          龙门架: 4.3
        },
        {
          month: "3",
          倒蹬机: 4.2,
          地雷架: 0.3,
          龙门架: 0.9
        },
        {
          month: "4",
          倒蹬机: 6.3,
          地雷架: 1.8,
          龙门架: 0.4
        },
        {
          month: "5",
          倒蹬机: 0.5,
          地雷架: 0.9,
          龙门架: 1.1
        },
        {
          month: "6",
          倒蹬机: 6.4,
          地雷架: 5.7,
          龙门架: 4
        },
        {
          month: "7",
          倒蹬机: 1.9,
          地雷架: 5.3,
          龙门架: 3.2
        },
        {
          month: "8",
          倒蹬机: 0.2,
          地雷架: 2.6,
          龙门架: 4.9
        },
        {
          month: "9",
          倒蹬机: 2.9,
          地雷架: 6.4,
          龙门架: 3.5
        },
        {
          month: "10",
          倒蹬机: 0.3,
          地雷架: 6.5,
          龙门架: 5.6
        },
        {
          month: "11",
          倒蹬机: 5.2,
          地雷架: 2.3,
          龙门架: 2.2
        },
        {
          month: "12",
          倒蹬机: 0.1,
          地雷架: 5.5,
          龙门架: 7.4
        },
        {
          month: "13",
          倒蹬机: 7.3,
          地雷架: 6.5,
          龙门架: 4.5
        },
        {
          month: "14",
          倒蹬机: 0.4,
          地雷架: 5.9,
          龙门架: 7.5
        },
        {
          month: "15",
          倒蹬机: 2.9,
          地雷架: 1.1,
          龙门架: 7.3
        },
        {
          month: "16",
          倒蹬机: 3.3,
          地雷架: 3.7,
          龙门架: 4.5
        },
        {
          month: "17",
          倒蹬机: 5,
          地雷架: 5.2,
          龙门架: 2.1
        },
        {
          month: "18",
          倒蹬机: 3,
          地雷架: 2.8,
          龙门架: 6
        },
        {
          month: "19",
          倒蹬机: 5,
          地雷架: 0.4,
          龙门架: 3.9
        },
        {
          month: "20",
          倒蹬机: 7.2,
          地雷架: 6.8,
          龙门架: 6.9
        },
        {
          month: "21",
          倒蹬机: 0.9,
          地雷架: 1.7,
          龙门架: 2.3
        },
        {
          month: "22",
          倒蹬机: 0.5,
          地雷架: 5.4,
          龙门架: 0.6
        },
        {
          month: "23",
          倒蹬机: 5.8,
          地雷架: 2,
          龙门架: 2.1
        },
        {
          month: "24",
          倒蹬机: 6,
          地雷架: 6.5,
          龙门架: 4.6
        },
        {
          month: "25",
          倒蹬机: 5.1,
          地雷架: 5.8,
          龙门架: 1.5
        },
        {
          month: "26",
          倒蹬机: 7.5,
          地雷架: 3.5,
          龙门架: 3.8
        },
        {
          month: "27",
          倒蹬机: 1.5,
          地雷架: 5.3,
          龙门架: 4.4
        },
        {
          month: "28",
          倒蹬机: 0.8,
          地雷架: 4.8,
          龙门架: 1.2
        },
        {
          month: "29",
          倒蹬机: 4.6,
          地雷架: 1.4,
          龙门架: 0.4
        },
        {
          month: "30",
          倒蹬机: 2.6,
          地雷架: 7.8,
          龙门架: 4.7
        }
      ],
      concernData: [
        {
          month: "1",
          人数: 10997
          // London: 3.9
        },
        {
          month: "2",
          人数: 14972
          // London: 4.2
        },
        {
          month: "3",
          人数: 13911
          // London: 5.7
        },
        {
          month: "4",
          人数: 15926
          // London: 8.5
        },
        {
          month: "5",
          人数: 6028
          // London: 11.9
        },
        {
          month: "6",
          人数: 17380
          // London: 15.2
        },
        {
          month: "7",
          人数: 18466
          // London: 17.0
        },
        {
          month: "8",
          人数: 6780
          // London: 16.6
        },
        {
          month: "9",
          人数: 4903
          // London: 14.2
        },
        {
          month: "10",
          人数: 18265
          // London: 10.3
        },
        {
          month: "11",
          人数: 8702
          // London: 6.6
        },
        {
          month: "12",
          人数: 13712
          // London: 4.8
        },
        {
          month: "13",
          人数: 13497
          // London: 4.8
        },
        {
          month: "14",
          人数: 16933
          // London: 4.8
        },
        {
          month: "15",
          人数: 19465
          // London: 4.8
        },
        {
          month: "16",
          人数: 15535
          // London: 4.8
        },
        {
          month: "17",
          人数: 2286
          // London: 4.8
        },
        {
          month: "18",
          人数: 7620
          // London: 4.8
        },
        {
          month: "19",
          人数: 9792
          // London: 4.8
        },
        {
          month: "20",
          人数: 6882
          // London: 4.8
        },
        {
          month: "21",
          人数: 8052
          // London: 4.8
        },
        {
          month: "22",
          人数: 2009
          // London: 4.8
        },
        {
          month: "23",
          人数: 5318
          // London: 4.8
        },
        {
          month: "24",
          人数: 2656
          // London: 4.8
        },
        {
          month: "25",
          人数: 2068
          // London: 4.8
        },
        {
          month: "26",
          人数: 6675
          // London: 4.8
        },
        {
          month: "27",
          人数: 19731
          // London: 4.8
        },
        {
          month: "28",
          人数: 6069
          // London: 4.8
        },
        {
          month: "29",
          人数: 12626
          // London: 4.8
        },
        {
          month: "30",
          人数: 8105
          // London: 4.8
        }
      ],
      venueTypeData: [
        {
          name: "足球场",
          value: "26"
        },
        {
          name: "篮球场",
          value: "72"
        },
        {
          name: "羽毛球场",
          value: "55"
        },
        {
          name: "网球场",
          value: "14"
        },
        {
          name: "排球场",
          value: "22"
        },
        {
          name: "乒乓球场",
          value: "53"
        },
        {
          name: "旱冰场",
          value: "43"
        },
        {
          name: "冰壶场",
          value: "1"
        },
        {
          name: "保龄球场",
          value: "3"
        }
      ],
      variationTrendData: [
        {
          name: "1",
          人数: 80343
        },
        {
          name: "2",
          人数: 80762
        },
        {
          name: "3",
          人数: 81357
        },
        {
          name: "4",
          人数: 81449
        },
        {
          name: "5",
          人数: 81998
        },
        {
          name: "6",
          人数: 82017
        },
        {
          name: "7",
          人数: 82256
        },
        {
          name: "8",
          人数: 83540
        },
        {
          name: "9",
          人数: 83733
        },
        {
          name: "10",
          人数: 84469
        },

        {
          name: "11",
          人数: 85023
        },
        {
          name: "12",
          人数: 86618
        },
        {
          name: "13",
          人数: 88538
        },
        {
          name: "14",
          人数: 89704
        },
        {
          name: "15",
          人数: 90581
        },
        {
          name: "16",
          人数: 91773
        },
        {
          name: "17",
          人数: 92268
        },
        {
          name: "18",
          人数: 92350
        },
        {
          name: "19",
          人数: 92388
        },
        {
          name: "20",
          人数: 93263
        },
        {
          name: "21",
          人数: 94903
        },
        {
          name: "22",
          人数: 95402
        },
        {
          name: "23",
          人数: 96568
        },
        {
          name: "24",
          人数: 96596
        },
        {
          name: "25",
          人数: 96602
        },
        {
          name: "26",
          人数: 98515
        },
        {
          name: "27",
          人数: 98968
        },
        {
          name: "28",
          人数: 99509
        },
        {
          name: "29",
          人数: 99901
        },
        {
          name: "30",
          人数: 99903
        }
      ],
      indexRankList: [
        {
          rank: 1,
          name: "金羽羽毛球馆",
          score: 5
        },
        {
          rank: 2,
          name: "西丽天健足球场",
          score: 4.6
        },
        {
          rank: 3,
          name: "浩N足球公园",
          score: 4.3
        },
        {
          rank: 4,
          name: "华侨城体育文化中心",
          score: 4
        },
        {
          rank: 5,
          name: "跨界空间运动综合体",
          score: 3.9
        },
        {
          rank: 6,
          name: "元平体育馆",
          score: 3.7
        },
        {
          rank: 7,
          name: "春茧体育馆",
          score: 3
        },
        {
          rank: 8,
          name: "深圳市体育场",
          score: 2.8
        },
        {
          rank: 9,
          name: "深圳游泳跳水馆",
          score: 2.6
        },
        {
          rank: 10,
          name: "星际羽毛球馆",
          score: 2.6
        },
        {
          rank: 11,
          name: "悦动篮球馆",
          score: 2.6
        },
        {
          rank: 12,
          name: "金泰羽毛球馆",
          score: 2.5
        },
        {
          rank: 13,
          name: "五扬球馆",
          score: 2.4
        },
        {
          rank: 14,
          name: "东方羽毛球",
          score: 2.2
        },
        {
          rank: 15,
          name: "碧海蓝天羽毛球",
          score: 1.2
        },
        {
          rank: 16,
          name: "岗头阳光羽毛球馆",
          score: 1
        },
        {
          rank: 17,
          name: "布吉大芬羽毛球馆",
          score: 0.8
        },
        {
          rank: 18,
          name: "龙兴翔羽毛球馆",
          score: 0.7
        },
        {
          rank: 19,
          name: "宝田羽毛球馆",
          score: 0.5
        },
        {
          rank: 20,
          name: "万科第五园羽毛球馆",
          score: 0.5
        },
        {
          rank: 20,
          name: "谁羽争锋羽毛球馆",
          score: 0.3
        },
        {
          rank: 20,
          name: "恒泰羽毛球会所",
          score: 0.2
        },
        {
          rank: 20,
          name: "翔乐篮球馆",
          score: 0.1
        }
      ],
      distributedMapOption: null,
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
    this.distributedMapOption = {
      tooltip: {
        trigger: "item",
        formatter: function(params) {
          return params.name;
        }
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: [
            {
              name: "金羽羽毛球馆",
              value: [114.065237, 22.713653, 1]
            },
            {
              name: "西丽天健足球场",
              value: [113.904048, 22.761307, 1]
            },
            {
              name: "浩N足球公园",
              value: [114.036064, 22.642824, 1]
            },
            {
              name: "华侨城体育文化中心",
              value: [114.047235, 22.757864, 1]
            },
            {
              name: "跨界空间运动综合体",
              value: [113.928507, 22.639107, 1]
            },
            {
              name: "元平体育馆",
              value: [114.068998, 22.566427, 1]
            },
            {
              name: "春茧体育馆",
              value: [114.033246, 22.542356, 1]
            },
            {
              name: "深圳市体育场",
              value: [114.090351, 22.537705, 1]
            },
            {
              name: "深圳游泳跳水馆",
              value: [114.091933, 22.536933, 1]
            },
            {
              name: "星际羽毛球馆",
              value: [114.074878, 22.528348, 1]
            },
            {
              name: "悦动篮球馆",
              value: [114.497807, 22.540254, 1]
            },
            {
              name: "金泰羽毛球馆",
              value: [114.134135, 22.691778, 1]
            },
            {
              name: "五扬球馆",
              value: [114.31589, 22.776402, 1]
            },
            {
              name: "东方羽毛球",
              value: [114.076475, 22.650907, 1]
            },
            {
              name: "碧海蓝天羽毛球",
              value: [114.144521, 22.587239, 1]
            },
            {
              name: "岗头阳光羽毛球馆",
              value: [114.114511, 22.546322, 1]
            },
            {
              name: "布吉大芬羽毛球馆",
              value: [114.122821, 22.590902, 1]
            },
            {
              name: "龙兴翔羽毛球馆",
              value: [114.13658, 22.562715, 1]
            },
            {
              name: "宝田羽毛球馆",
              value: [114.123308, 22.569228, 1]
            },
            {
              name: "万科第五园羽毛球馆",
              value: [114.117667, 22.569697, 1]
            },
            {
              name: "谁羽争锋羽毛球馆",
              value: [114.136542, 22.573667, 1]
            },
            {
              name: "恒泰羽毛球会所",
              value: [114.11924, 22.574066, 1]
            },
            {
              name: "翔乐篮球馆",
              value: [114.130782, 22.566883, 1]
            },
            {
              name: "坪山体育中心",
              value: [114.136284, 22.543874, 1]
            },
            {
              name: "深圳市体育中心",
              value: [114.096324, 22.574342, 1]
            },
            {
              name: "光明新区红花山体育中心",
              value: [113.973369, 22.545597, 1]
            },
            {
              name: "罗湖体育休闲公园",
              value: [113.960726, 22.549595, 1]
            },
            // {
            //   name: "景田网球中心",
            //   value: [113.947799, 22.523707, 3]
            // },
            {
              name: "黄木岗网球中心",
              value: [113.990586, 22.540615, 1]
            },
            {
              name: "香蜜体育中心",
              value: [113.925291, 22.542096, 1]
            },
            // {
            //   name: "福田体育公园",
            //   value: [113.931613, 22.518733, 4]
            // },
            {
              name: "福田体育场",
              value: [113.913241, 22.522323, 1]
            },
            {
              name: "南山文体中心",
              value: [113.92194, 22.489142, 1]
            },
            // {
            //   name: "深圳市宝安区体育中心",
            //   value: [114.001185, 22.527274,1]
            // },
            {
              name: "盐田区游泳馆",
              value: [113.960285, 22.586456, 1]
            },
            {
              name: "沙头角体育馆",
              value: [114.316948, 22.604784, 1]
            },
            {
              name: "盐田体育中心",
              value: [114.334053, 22.608836, 1]
            }
          ]
        }
      ],
      visualMap: {
        show: false,
        min: 1,
        max: 1,
        splitNumber: 1,
        realtime: false,
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
          color: "#19b05d",
          emphasis: {
            color: "#19b05d"
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: "#9fdeff",
            borderColor: "#fff"
          },
          emphasis: {
            areaColor: "#9fdeff",
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
.statistics-map-wrapper {
  margin-bottom: 10px;
  height: 750px;
  border-radius: 6px;
  border: 1px solid lightgray;
}
</style>

