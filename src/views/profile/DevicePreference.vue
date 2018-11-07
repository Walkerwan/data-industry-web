<template>
  <div class="vunue-preference charts-page">
    <div class="population dashed-border charts-wrapper">设备使用情况</div>
    <div class="flex-row charts">
      <div class="age third chart-wrapper">
        <div class="chart-title">设备类型</div>
        <div class="chart">
          <g2-circle :height=400 :width=681 :data="deviceData"></g2-circle>
        </div>
      </div>
      <div class="age third chart-wrapper">
        <div class="chart-title">设备品牌</div>
        <div class="chart">
          <!-- <g2-bar :data="brandData"></g2-bar> -->
          <d3-bubble :data="brandData"></d3-bubble>
        </div>
      </div>
      <div class="age third chart-wrapper">
        <div class="chart-title">屏幕分辨率</div>
        <div class="chart">
          <g2-bar :data="resolutionData"></g2-bar>
        </div>
      </div>
    </div>
    <div class="population dashed-border charts-wrapper">应用使用情况</div>
    <div class="flex-row charts">
      <div class="venueName half chart-wrapper">
        <div class="chart-title">应用使用情况</div>
        <div class="chart">
          <table-bar :fields="appTableFields" :data="appTable"></table-bar>
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
import D3Bubble from "../../components/d3Chart/BubbleSmall";
import Wordcloud from "vue-wordcloud";
import TableBar from "../../components/customChart/TableBar";
import CountyMap from "../../components/chart/map/CountyMap";
export default {
  data() {
    return {
      appTableFields: ["类型", "人群占比", "人群规模"],
      appTable: [
        {
          name: "影视",
          ratio: 0.11,
          crowdAmount: 357033
        },
        {
          name: "购物",
          ratio: 0.11,
          crowdAmount: 317551
        },
        {
          name: "音乐",
          ratio: 0.13,
          crowdAmount: 271616
        },
        {
          name: "社交",
          ratio: 0.08,
          crowdAmount: 191106
        },
        {
          name: "理财",
          ratio: 0.13,
          crowdAmount: 139816
        },
        {
          name: "旅游",
          ratio: 0.1,
          crowdAmount: 100000
        },
        {
          name: "生活",
          ratio: 0.06,
          crowdAmount: 77819
        },
        {
          name: "游戏",
          ratio: 0.14,
          crowdAmount: 48698
        },
        {
          name: "工具",
          ratio: 0.03,
          crowdAmount: 21441
        },
        {
          name: "其他",
          ratio: 0.02,
          crowdAmount: 3997
        }
      ],
      brandData: [
        { name: "华为", count: 32412, percent: "2%" },
        { name: "OPPO", count: 93058, percent: "3%" },
        { name: "VIVO", count: 180781, percent: "5%" },
        { name: "小米", count: 237632, percent: "7%" },
        { name: "苹果", count: 311354, percent: "1%" },
        { name: "一加", count: 127195, percent: "12%" },
        { name: "三星", count: 51795, percent: "13%" },
        { name: "魅族", count: 14271, percent: "12%" },
        { name: "其他", count: 2662, percent: "11%" }
      ],
      resolutionData: [
        { value: 38181, name: "720*1280" },
        { value: 171114, name: "1080*1920" },
        { value: 38181, name: "1080*2160" },
        { value: 171114, name: "1280×800" },
        { value: 282119, name: "1440*2560" },
        { value: 3134, name: "其他" }
      ],
      deviceData: [
        { count: 51410, item: "MACOS", percent: 0.1 },
        { count: 179440, item: "iOS", percent: 0.4 },
        { count: 209786, item: "windows", percent: 0.4 },
        { count: 32172, item: "Android", percent: 0.1 },
        { count: 2641, item: "其他", percent: 0.0 }
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
        max: 50000,
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
          type: "map",
          map: "深圳市",
          layoutCenter: ["50%", "50%"],
          layoutSize: 600,
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
            { name: "南山区", value: 48000 },
            { name: "福田区", value: 20000 },
            { name: "罗湖区", value: 30000 },
            { name: "宝安区", value: 10000 },
            { name: "龙岗区", value: 20000 },
            { name: "盐田区", value: 40689 },
            { name: "光明区", value: 40689 },
            { name: "龙华区", value: 40689 },
            { name: "坪山区", value: 40689 },
            { name: "大鹏区", value: 40689 }
          ]
        }
      ]
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
</style>

