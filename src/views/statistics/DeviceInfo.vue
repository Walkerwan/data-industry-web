<template>
  <div class="base-info charts-page">
    <div class="flex-row charts">
      <div class="filter-wrapper">
        <div class="chart-title">按照条件过滤</div>
        <div class="chart">
          <div class="filter-label" style="margin-top:18px;margin-bottom:12px;">器材种类名称过滤</div>
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
        <div class="chart-title">器材品牌种类占比</div>
        <div class="chart">
          <g2-bar :height=370 :width=640 :data="brandTypeData"></g2-bar>
        </div>
      </div>
      <div class="index-rank-list statistics-half chart-wrapper">
        <div class="chart-title">器材投放种类占比</div>
        <div class="chart">
          <g2-bar :height=370 :width=850 :data="deviceTypeData"></g2-bar>
        </div>
      </div>
    </div>
    <div class="flex-row charts">
      <div class="county statistics-half chart-wrapper statistics-map-wrapper">
        <div class="chart-title">器材投放分布地图</div>
        <div class="map">
          <county-map :option="distributedMapOption" :style="{width:'873px', height:'708px'}"></county-map>
        </div>
      </div>
      <div class="statistics-half">
        <div class="variation-trend statistics-half chart-wrapper">
          <div class="chart-title">器材已使用年限分布</div>
          <div class="chart">
            <g2-bar :data="usedYearsData"></g2-bar>
          </div>
        </div>
        <div class="weight statistics-half chart-wrapper">
          <div class="chart-title">器材使用率变化趋势</div>
          <div class="chart">
            <g2-multi-line :data="deviceUseRateTrend" :fields="deviceUseRateTrendFields" :width=875 :height=327></g2-multi-line>
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
      deviceUseRateTrendFields: ["倒蹬机", "地雷架", "龙门架"],
      deviceUseRateTrend: [
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
      usedYearsData: [
        {
          name: "1年以下",
          value: 26140
        },
        {
          name: "1-2年",
          value: 42062
        },
        {
          name: "2-3年",
          value: 30781
        },
        {
          name: "3-5年",
          value: 24975
        },
        {
          name: "5年以上",
          value: 42780
        }
      ],
      deviceTypeData: [
        {
          name: "龙门架",
          value: 15011
        },
        {
          name: "腿弯举机",
          value: 26741
        },
        {
          name: "腿屈伸机",
          value: 17316
        },
        {
          name: "提踵机",
          value: 14621
        },
        {
          name: "单杠",
          value: 22909
        },
        {
          name: "双杠",
          value: 25117
        },
        {
          name: "仰卧板",
          value: 17789
        },
        {
          name: "罗马椅",
          value: 23101
        },
        {
          name: "牧师凳",
          value: 25444
        },
        {
          name: "哈克机",
          value: 11402
        },
        {
          name: "倒蹬机",
          value: 16394
        },
        {
          name: "史密斯机",
          value: 5814
        },
        {
          name: "推胸机",
          value: 8228
        },
        {
          name: "悍马机",
          value: 29825
        },
        {
          name: "夹胸器",
          value: 28006
        },
        {
          name: "划船机",
          value: 12894
        },
        {
          name: "下拉机",
          value: 12622
        },
        {
          name: "地雷架",
          value: 15606
        },
        {
          name: "推肩器",
          value: 11720
        },
        {
          name: "有氧器械",
          value: 25367
        }
      ],
      brandTypeData: [
        {
          name: "铁人IRONMAN",
          value: 43252
        },
        {
          name: "康乐佳",
          value: 46341
        },
        {
          name: "乔山JOHNSON",
          value: 38866
        },
        {
          name: "英派斯Impulse",
          value: 37043
        },
        {
          name: "澳瑞特ORIENT",
          value: 44553
        },
        {
          name: "舒华",
          value: 13568
        },
        {
          name: "万年青WNQ",
          value: 15682
        },
        {
          name: "好家庭GoodFamily",
          value: 18489
        },
        {
          name: "汇祥HUIXIANG",
          value: 14197
        },
        {
          name: "军霞JX",
          value: 40907
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
          return params.name + " : " + params.value[2].toLocaleString();
        }
      },
      series: [
        {
          name: "器材投放分布",
          type: "scatter",
          coordinateSystem: "geo",
          data: [
            {
              name: "翻身路(广东省-深圳市-宝安区)",
              value: [113.944805, 22.548782, 2246]
            },
            {
              name: "福永(广东省-深圳市-宝安区)",
              value: [113.949404, 22.556793, 2975]
            },
            {
              name: "观澜(广东省-深圳市-宝安区)",
              value: [114.147175, 22.597372, 1936]
            },
            {
              name: "光明(广东省-深圳市-宝安区)",
              value: [114.083934, 22.538635, 911]
            },
            {
              name: "锦绣江南(广东省-深圳市-宝安区)",
              value: [113.950554, 22.561065, 2498]
            },
            {
              name: "龙华(广东省-深圳市-宝安区)",
              value: [113.991373, 22.546112, 4567]
            },
            {
              name: "民治(广东省-深圳市-宝安区)",
              value: [113.914334, 22.565871, 1004]
            },
            {
              name: "民治村(广东省-深圳市-宝安区)",
              value: [113.918934, 22.567473, 3547]
            },
            {
              name: "沙井(广东省-深圳市-宝安区)",
              value: [114.117854, 22.565337, 2573]
            },
            {
              name: "石岩(广东省-深圳市-宝安区)",
              value: [114.022418, 22.550918, 503]
            },
            {
              name: "松岗(广东省-深圳市-宝安区)",
              value: [114.074161, 22.538635, 2104]
            },
            {
              name: "西乡(广东省-深圳市-宝安区)",
              value: [113.928707, 22.524213, 3098]
            },
            {
              name: "新安(广东省-深圳市-宝安区)",
              value: [114.051739, 22.550384, 1382]
            },
            {
              name: "保税区(广东省-深圳市-福田区)",
              value: [113.94538, 22.554122, 3286]
            },
            {
              name: "笔架山(广东省-深圳市-福田区)",
              value: [114.117279, 22.564803, 618]
            },
            {
              name: "彩田村(广东省-深圳市-福田区)",
              value: [114.04829, 22.524213, 1426]
            },
            {
              name: "车公庙(广东省-深圳市-福田区)",
              value: [113.886163, 22.578686, 2410]
            },
            {
              name: "赤尾(广东省-深圳市-福田区)",
              value: [114.116705, 22.560531, 4814]
            },
            {
              name: "赤尾村(广东省-深圳市-福田区)",
              value: [114.055189, 22.521543, 3633]
            },
            {
              name: "福民新村(广东省-深圳市-福田区)",
              value: [114.231688, 22.611252, 2599]
            },
            {
              name: "岗厦(广东省-深圳市-福田区)",
              value: [114.067262, 22.639007, 1543]
            },
            {
              name: "华强南(广东省-深圳市-福田区)",
              value: [113.843045, 22.644344, 4911]
            },
            {
              name: "皇岗(广东省-深圳市-福田区)",
              value: [113.84362, 22.610718, 716]
            }
          ]
        }
      ],
      visualMap: {
        min: 0,
        max: 5000,
        splitNumber: 5,
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
