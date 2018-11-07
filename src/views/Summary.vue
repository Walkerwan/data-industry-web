<template>
  <div class="summary charts-page">
    <div class="flex-row charts">
      <div class="county third summary-map-wrapper">
        <div class="chart-title">场馆分布地图</div>
        <div class="map">
          <county-map :option="mapOption" :style="{width:'616px', height:'480px'}"></county-map>
        </div>
      </div>
      <div class="business-circle third summary-map-wrapper">
        <div class="chart-title">运动人群分布地图</div>
        <div class="map">
          <county-map :option="heatMapOption" :style="{width:'616px', height:'480px'}"></county-map>
        </div>
      </div>
      <div class="flex-row third summary-map-wrapper">
        <div class="chart-title">器材投放分布地图</div>
        <div class="map">
          <county-map :option="distributedMapOption" :style="{width:'616px', height:'480px'}"></county-map>
        </div>
      </div>
    </div>
    <div class="flex-row charts">
      <div class="sex half chart-wrapper-bottom">
        <div class="chart-title">场馆场地预定量变化趋势</div>
        <div class="chart">
          <g2-line :data="orderData" style="margin-left:-15px;margin-top: 25px;" :width=875 :height=327></g2-line>
        </div>
      </div>
      <div class="heat-rank quarter chart-wrapper-bottom">
        <div class="chart-title">赛事关注热度排名</div>
        <div class="chart">
          <rank-list :data="concernDegreeData"></rank-list>
        </div>
      </div>
      <div class="emotional-state quarter chart-wrapper-bottom">
        <div class="chart-title">人群健康度占比</div>
        <div class="chart">
          <g2-circle :width=470 :height=370 :data="healthPropotionData"></g2-circle>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import G2Chart from "../components/g2Chart/Chart";
import G2Circle from "../components/g2Chart/Circle";
import G2Bar from "../components/g2Chart/Bar";
import G2RosePie from "../components/g2Chart/RosePie";
import CountyMap from "../components/chart/map/CountyMap";
import G2Line from "../components/g2Chart/Line";
import RankList from "../components/customChart/RankList";
export default {
  data() {
    return {
      healthPropotionData: [
        { count: 401763, item: "健康", percent: 0.1 },
        { count: 134387, item: "亚健康", percent: 0.0 },
        { count: 478626, item: "不健康", percent: 0.4 }
      ],
      orderData: [
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
      concernDegreeData: [
        {
          name: "深圳市第1届篮球少年杯",
          rank: 1,
          score: 4.8
        },
        {
          name: "龙岗区第3届足球联谊赛",
          rank: 2,
          score: 4.8
        },
        {
          name: "福田区事业单位羽毛球联赛",
          rank: 3,
          score: 3.4
        },
        {
          name: "深圳市互联网企业足球联赛",
          rank: 4,
          score: 3.4
        },
        {
          name: "深圳市第五届羽毛球对抗赛",
          rank: 5,
          score: 3.3
        },
        {
          name: "南山区第2届少年足球赛",
          rank: 6,
          score: 2.9
        },
        {
          name: "福田区第3届足球联谊赛",
          rank: 7,
          score: 2.1
        },
        {
          name: "宝安区事业单位羽毛球联赛",
          rank: 8,
          score: 1.9
        },
        {
          name: "深圳市制造业企业足球联赛",
          rank: 9,
          score: 1.7
        },
        {
          name: "深圳市第2届篮球对抗赛",
          rank: 10,
          score: 1.4
        },
        {
          name: "南山区第1届少年篮球赛",
          rank: 11,
          score: 1.1
        }
      ],
      heatRankList: [
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
      ],
      mapOption: null,
      heatMapOption: null,
      distributedMapOption: null
    };
  },
  components: {
    G2Chart,
    G2Circle,
    G2Bar,
    G2RosePie,
    CountyMap,
    G2Line,
    RankList
  },
  mounted() {
    this.mapOption = {
      tooltip: {
        trigger: "item"
      },
      // dataRange: {
      //   left: "left",
      //   min: 1000,
      //   max: 50000,
      //   text: ["高", "低"],
      //   realtime: false,
      //   calculable: true,
      //   color: ["#db6666", "#ebe288", "#c1db66"],
      //   show: true
      // },
      visualMap: {
        min: 0,
        max: 500,
        splitNumber: 5,
        inRange: {
          color: ["#db6666", "#ebe288", "#c1db66"].reverse()
        },
        textStyle: {
          color: "#737373"
        }
      },
      series: [
        {
          name: "场馆数量",
          type: "map",
          map: "深圳市",
          layoutCenter: ["50%", "50%"],
          layoutSize: 480,
          itemStyle: {
            normal: {
              borderWidth: 1, //区域边框宽度
              borderColor: "#737373", //区域边框颜色
              label: {
                show: true,
                color: "#737373"
              },
              areaColor: ["#2c74d3"]
            },
            emphasis: {
              label: {
                show: true,
                color: "#fff"
              },
              areaColor: "#e7c28b"
            }
          },
          data: [
            { name: "南山区", value: 480 },
            { name: "福田区", value: 400 },
            { name: "罗湖区", value: 300 },
            { name: "宝安区", value: 100 },
            { name: "龙岗区", value: 200 },
            { name: "盐田区", value: 40 },
            { name: "光明区", value: 40 },
            { name: "龙华区", value: 40 },
            { name: "坪山区", value: 30 },
            { name: "大鹏区", value: 10 }
          ]
        }
      ]
    };
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
            [113.943101, 22.547922, 4000],
            [113.984495, 22.545786, 4000],
            [114.043711, 22.555398, 4000],
            [113.908606, 22.504657, 4000],
            [113.966098, 22.580495, 4000],
            [113.966098, 22.580495, 4000],
            [114.127649, 22.57035, 4000],
            [114.036237, 22.623203, 4000],
            [113.835592, 22.634411, 3000],
            [114.047161, 22.70031, 3000],
            [114.250681, 22.730446, 3000],
            [114.344967, 22.717645, 3000],
            [114.215036, 22.568214, 3000],
            [114.477198, 22.619466, 3000]
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
    this.distributedMapOption = {
      tooltip: {
        trigger: "item",
        formatter: function(params) {
          return params.name + " : " + params.value[2];
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
.wrapper-bottom {
  border: 1px solid lightgray;
  margin-bottom: 10px;
  height: 375px;
  border-radius: 6px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
.summary-map-wrapper {
  border: 1px solid lightgray;
  height: 522px;
  margin-bottom: 10px;
  border-radius: 6px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
.chart-wrapper-bottom {
  height: 341px;
  border-radius: 6px;
  border: 1px solid lightgray;
  /* width: 460px; */
}
.map-wrapper-bottom {
  border: 1px solid lightgray;
}
</style>

