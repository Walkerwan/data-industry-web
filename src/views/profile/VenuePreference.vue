<template>
  <div class="vunue-preference charts-page">
    <div class="population dashed-border charts-wrapper">用户关注/预定的场馆基本属性</div>
    <div class="flex-row charts">
      <div class="venueName half chart-wrapper">
        <div class="chart-title">场馆名称（深圳市TOP10）</div>
        <div class="chart">
          <table-bar :data="venueTable"></table-bar>
        </div>
      </div>
      <div class="venueType half chart-wrapper">
        <div class="chart-title">场馆场地类型（深圳市）</div>
        <div class="chart">
          <d3-bubble :data="venueTypeData"></d3-bubble>
        </div>
      </div>
      <div class="venueTag half chart-wrapper">
        <div class="chart-title">场馆标签（深圳市TOP100）</div>
        <div class="chart">
          <wordcloud style="width:926px;height:327px" :data="defaultWords" nameKey="name" vaulueKey="value"></wordcloud>
        </div>
      </div>
      <div class="consumptionLevel half chart-wrapper">
        <div class="chart-title">场馆平均消费水平（深圳市）</div>
        <div class="chart">
          <g2-bar :data="consumptionLevelData"></g2-bar>
        </div>
      </div>
    </div>
    <div class="area dashed-border charts-wrapper">用户关注/预定的场馆地域属性</div>
    <div class="flex-row charts">
      <div class="county half map-wrapper">
        <div class="chart-title">场馆所在区/县（深圳市）</div>
        <div class="map">
          <county-map :option="mapOption" :style="{width:'926px', height:'564px'}"></county-map>
        </div>
      </div>
      <div class="business-circle half map-wrapper">
        <div class="chart-title">场馆所在商圈（深圳市）</div>
        <div class="map">
          <county-map :option="distributedMapOption" :style="{width:'926px', height:'564px'}"></county-map>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      consumptionLevelData: [
        { value: 35215, name: "100以下" },
        { value: 157823, name: "100-199" },
        { value: 260205, name: "200-299" },
        { value: 157823, name: "300-399" },
        { value: 35215, name: "400-499" },
        { value: 2891, name: "500+" }
      ],
      venueTable: [
        {
          name: "岗头阳光羽毛球馆",
          ratio: 0.14,
          crowdAmount: 199981
        },
        {
          name: "布吉大芬羽毛球馆",
          ratio: 0.13,
          crowdAmount: 189174
        },
        {
          name: "碧海蓝天羽毛球馆",
          ratio: 0.13,
          crowdAmount: 189174
        },
        {
          name: "东方羽毛球馆",
          ratio: 0.11,
          crowdAmount: 160132
        },
        {
          name: "龙兴翔羽毛球馆",
          ratio: 0.11,
          crowdAmount: 160132
        },
        {
          name: "五扬球馆",
          ratio: 0.08,
          crowdAmount: 121295
        },
        {
          name: "金泰羽毛球馆",
          ratio: 0.06,
          crowdAmount: 82215
        },
        {
          name: "金羽羽毛球馆",
          ratio: 0.01,
          crowdAmount: 50000
        },
        {
          name: "悦动篮球馆",
          ratio: 0.03,
          crowdAmount: 49866
        },
        {
          name: "星际羽毛球馆",
          ratio: 0.02,
          crowdAmount: 27064
        }
      ],
      mapOption: null,
      distributedMapOption: null,
      defaultWords: [
        {
          name: "免费停车",
          value: 49236
        },
        {
          name: "免费wifi",
          value: 118112
        },
        {
          name: "淋浴",
          value: 220662
        },
        {
          name: "提供球拍",
          value: 321061
        },
        {
          name: "提供球衣",
          value: 363810
        },
        {
          name: "全新设备",
          value: 1000000
        },
        {
          name: "有空调",
          value: 220662
        },
        {
          name: "零食",
          value: 118112
        },
        {
          name: "果盘",
          value: 49236
        },
        {
          name: "饮料",
          value: 15985
        }
      ],
      venueTypeData: [
        { name: "羽毛球", count: 0.02, percent: "2%" },
        { name: "游泳", count: 0.03, percent: "3%" },
        { name: "台球", count: 0.05, percent: "5%" },
        { name: "网球", count: 0.07, percent: "7%" },
        { name: "户外", count: 0.1, percent: "1%" },
        { name: "高尔夫", count: 0.12, percent: "12%" },
        { name: "室内篮球", count: 0.13, percent: "13%" },
        { name: "温泉", count: 0.12, percent: "12%" },
        { name: "滑雪", count: 0.11, percent: "11%" },
        { name: "足球", count: 0.09, percent: "9%" },
        { name: "保龄球", count: 0.06, percent: "6%" },
        { name: "街舞", count: 0.05, percent: "5%" },
        { name: "跆拳道", count: 0.03, percent: "3%" },
        { name: "攀岩", count: 0.02, percent: "2%" },
        { name: "有氧健身", count: 0.01, percent: "1%" },
        { name: "瑜伽", count: 0.0, percent: "0%" },
        { name: "拉丁舞", count: 0.0, percent: "0%" }
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
        max: 400000,
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
          name: "人群数量",
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
            { name: "南山区", value: 48933 },
            { name: "福田区", value: 127388 },
            { name: "罗湖区", value: 243565 },
            { name: "宝安区", value: 342028 },
            { name: "龙岗区", value: 352749 },
            { name: "盐田区", value: 267195 },
            { name: "光明区", value: 148645 },
            { name: "龙华区", value: 60734 },
            { name: "坪山区", value: 18225 },
            { name: "大鹏区", value: 4017 }
          ]
        }
      ]
    };
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
              value: [113.899425, 22.568929, 35698]
            },
            {
              name: "福永(广东省-深圳市-宝安区)",
              value: [113.812576, 22.679392, 39738]
            },
            {
              name: "观澜(广东省-深圳市-宝安区)",
              value: [114.065237, 22.713653, 44105]
            },
            {
              name: "光明(广东省-深圳市-宝安区)",
              value: [113.904048, 22.761307, 48808]
            },
            {
              name: "锦绣江南(广东省-深圳市-宝安区)",
              value: [114.036064, 22.642824, 53852]
            },
            {
              name: "龙华(广东省-深圳市-宝安区)",
              value: [114.047235, 22.757864, 59243]
            },
            {
              name: "民治(广东省-深圳市-宝安区)",
              value: [114.043551, 22.627753, 64981]
            },
            {
              name: "民治村(广东省-深圳市-宝安区)",
              value: [114.043551, 22.627753, 71065]
            },
            {
              name: "沙井(广东省-深圳市-宝安区)",
              value: [113.830973, 22.736069, 77489]
            },
            {
              name: "石岩(广东省-深圳市-宝安区)",
              value: [113.942452, 22.67849, 84245]
            },
            {
              name: "松岗(广东省-深圳市-宝安区)",
              value: [113.836159, 22.777967, 91319]
            },
            {
              name: "西乡(广东省-深圳市-宝安区)",
              value: [113.869117, 22.581735, 98696]
            },
            {
              name: "新安(广东省-深圳市-宝安区)",
              value: [113.907994, 22.570224, 106354]
            },
            {
              name: "保税区(广东省-深圳市-福田区)",
              value: [114.062762, 22.514223, 114268]
            },
            {
              name: "笔架山(广东省-深圳市-福田区)",
              value: [113.928507, 22.639107, 122409]
            },
            {
              name: "彩田村(广东省-深圳市-福田区)",
              value: [114.068998, 22.566427, 130743]
            },
            {
              name: "车公庙(广东省-深圳市-福田区)",
              value: [114.033246, 22.542356, 139233]
            },
            {
              name: "赤尾(广东省-深圳市-福田区)",
              value: [114.090351, 22.537705, 147837]
            },
            {
              name: "赤尾村(广东省-深圳市-福田区)",
              value: [114.091933, 22.536933, 156509]
            },
            {
              name: "福民新村(广东省-深圳市-福田区)",
              value: [114.074878, 22.528348, 165202]
            },
            {
              name: "岗厦(广东省-深圳市-福田区)",
              value: [114.074582, 22.540606, 173863]
            },
            {
              name: "华强南(广东省-深圳市-福田区)",
              value: [114.093342, 22.543237, 182438]
            },
            {
              name: "皇岗(广东省-深圳市-福田区)",
              value: [114.076782, 22.541517, 190872]
            },
            {
              name: "黄木岗(广东省-深圳市-福田区)",
              value: [114.09363, 22.561766, 199106]
            },
            {
              name: "景田(广东省-深圳市-福田区)",
              value: [114.050218, 22.559168, 207084]
            },
            {
              name: "荔枝公园(广东省-深圳市-福田区)",
              value: [114.109029, 22.551853, 214745]
            },
            {
              name: "莲花二村(广东省-深圳市-福田区)",
              value: [114.07724, 22.555938, 222034]
            },
            {
              name: "沙尾(广东省-深圳市-福田区)",
              value: [114.049088, 22.526598, 228893]
            },
            {
              name: "沙尾村(广东省-深圳市-福田区)",
              value: [114.048461, 22.524527, 235267]
            },
            {
              name: "上步(广东省-深圳市-福田区)",
              value: [114.102575, 22.542791, 241106]
            },
            {
              name: "上梅林(广东省-深圳市-福田区)",
              value: [114.066329, 22.575161, 246361]
            },
            {
              name: "上沙(广东省-深圳市-福田区)",
              value: [114.042497, 22.530294, 250989]
            },
            {
              name: "石厦(广东省-深圳市-福田区)",
              value: [114.060176, 22.529065, 254949]
            },
            {
              name: "下梅林(广东省-深圳市-福田区)",
              value: [114.048023, 22.571368, 258207]
            },
            {
              name: "下沙(广东省-深圳市-福田区)",
              value: [114.029978, 22.533968, 260737]
            },
            {
              name: "香蜜湖(广东省-深圳市-福田区)",
              value: [114.045221, 22.544666, 262514]
            },
            {
              name: "新洲(广东省-深圳市-福田区)",
              value: [114.053413, 22.532678, 263524]
            },
            {
              name: "益田村(广东省-深圳市-福田区)",
              value: [114.057317, 22.519753, 263757]
            },
            {
              name: "园岭(广东省-深圳市-福田区)",
              value: [114.110895, 22.562236, 263213]
            },
            {
              name: "中心区(广东省-深圳市-福田区)",
              value: [114.110895, 22.562236, 261894]
            },
            {
              name: "竹子林(广东省-深圳市-福田区)",
              value: [114.020418, 22.539593, 259814]
            },
            {
              name: "坂田(广东省-深圳市-龙岗区)",
              value: [114.077406, 22.633264, 256990]
            },
            {
              name: "布吉(广东省-深圳市-龙岗区)",
              value: [114.128025, 22.608011, 253447]
            },
            {
              name: "丹竹头(广东省-深圳市-龙岗区)",
              value: [114.154575, 22.62573, 249216]
            },
            {
              name: "桂芳园(广东省-深圳市-龙岗区)",
              value: [114.14756, 22.622742, 244332]
            },
            {
              name: "横岗(广东省-深圳市-龙岗区)",
              value: [114.215408, 22.654411, 238838]
            },
            {
              name: "康桥(广东省-深圳市-龙岗区)",
              value: [114.150462, 22.630884, 232779]
            },
            {
              name: "可园(广东省-深圳市-龙岗区)",
              value: [114.142056, 22.610515, 226204]
            },
            {
              name: "坑梓(广东省-深圳市-龙岗区)",
              value: [114.380551, 22.752814, 219167]
            },
            {
              name: "葵涌(广东省-深圳市-龙岗区)",
              value: [114.428954, 22.638405, 211722]
            },
            {
              name: "葵涌村(广东省-深圳市-龙岗区)",
              value: [114.430681, 22.631344, 203927]
            },
            {
              name: "龙岗中心城(广东省-深圳市-龙岗区)",
              value: [114.24854, 22.732774, 195840]
            },
            {
              name: "南澳(广东省-深圳市-龙岗区)",
              value: [114.497807, 22.540254, 187519]
            },
            {
              name: "平湖(广东省-深圳市-龙岗区)",
              value: [114.134135, 22.691778, 179022]
            },
            {
              name: "坪地(广东省-深圳市-龙岗区)",
              value: [114.31589, 22.776402, 170405]
            },
            {
              name: "万科城(广东省-深圳市-龙岗区)",
              value: [114.076475, 22.650907, 161725]
            },
            {
              name: "布心(广东省-深圳市-罗湖区)",
              value: [114.144521, 22.587239, 153035]
            },
            {
              name: "蔡屋围(广东省-深圳市-罗湖区)",
              value: [114.114511, 22.546322, 144384]
            },
            {
              name: "草埔(广东省-深圳市-罗湖区)",
              value: [114.122821, 22.590902, 135821]
            },
            {
              name: "翠竹(广东省-深圳市-罗湖区)",
              value: [114.13658, 22.562715, 127389]
            },
            {
              name: "东湖(广东省-深圳市-罗湖区)",
              value: [114.143258, 22.566907, 119127]
            },
            {
              name: "东门(广东省-深圳市-罗湖区)",
              value: [114.12543, 22.551889, 111073]
            },
            {
              name: "东晓(广东省-深圳市-罗湖区)",
              value: [114.142869, 22.582645, 103258]
            },
            {
              name: "独树村(广东省-深圳市-罗湖区)",
              value: [114.12619, 22.584682, 95710]
            },
            {
              name: "国贸(广东省-深圳市-罗湖区)",
              value: [114.125156, 22.546055, 88452]
            },
            {
              name: "洪湖(广东省-深圳市-罗湖区)",
              value: [114.129336, 22.572092, 81503]
            },
            {
              name: "黄贝岭(广东省-深圳市-罗湖区)",
              value: [114.143367, 22.552416, 74879]
            },
            {
              name: "火车站(广东省-深圳市-罗湖区)",
              value: [114.123611, 22.537961, 68590]
            },
            {
              name: "金稻田(广东省-深圳市-罗湖区)",
              value: [114.130703, 22.593294, 62644]
            },
            {
              name: "莲塘(广东省-深圳市-罗湖区)",
              value: [114.17909, 22.565555, 57045]
            },
            {
              name: "泥岗(广东省-深圳市-罗湖区)",
              value: [114.104372, 22.573718, 51793]
            },
            {
              name: "清水河(广东省-深圳市-罗湖区)",
              value: [114.112049, 22.583693, 46886]
            },
            {
              name: "人民南(广东省-深圳市-罗湖区)",
              value: [114.124462, 22.541853, 42318]
            },
            {
              name: "水贝(广东省-深圳市-罗湖区)",
              value: [114.131395, 22.580491, 38083]
            },
            {
              name: "水库(广东省-深圳市-罗湖区)",
              value: [114.123308, 22.569228, 34171]
            },
            {
              name: "笋岗(广东省-深圳市-罗湖区)",
              value: [114.117667, 22.569697, 30570]
            },
            {
              name: "田贝(广东省-深圳市-罗湖区)",
              value: [114.136542, 22.573667, 27268]
            },
            {
              name: "田心村(广东省-深圳市-罗湖区)",
              value: [114.11924, 22.574066, 24251]
            },
            {
              name: "文锦(广东省-深圳市-罗湖区)",
              value: [114.130782, 22.566883, 21504]
            },
            {
              name: "文锦渡(广东省-深圳市-罗湖区)",
              value: [114.136284, 22.543874, 19012]
            },
            {
              name: "银湖(广东省-深圳市-罗湖区)",
              value: [114.096324, 22.574342, 16759]
            },
            {
              name: "白石洲(广东省-深圳市-南山区)",
              value: [113.973369, 22.545597, 14730]
            },
            {
              name: "大冲(广东省-深圳市-南山区)",
              value: [113.960726, 22.549595, 12908]
            },
            {
              name: "后海(广东省-深圳市-南山区)",
              value: [113.927799, 22.528707, 11278]
            },
            {
              name: "华侨城(广东省-深圳市-南山区)",
              value: [113.990586, 22.540615, 9825]
            },
            {
              name: "南头(广东省-深圳市-南山区)",
              value: [113.925291, 22.542096, 8534]
            },
            {
              name: "南油(广东省-深圳市-南山区)",
              value: [113.931613, 22.518733, 7390]
            },
            {
              name: "前海(广东省-深圳市-南山区)",
              value: [113.913241, 22.522323, 6381]
            },
            {
              name: "蛇口(广东省-深圳市-南山区)",
              value: [113.92194, 22.489142, 5494]
            },
            {
              name: "深圳湾(广东省-深圳市-南山区)",
              value: [114.001185, 22.527274, 4716]
            },
            {
              name: "西丽(广东省-深圳市-南山区)",
              value: [113.960285, 22.586456, 4036]
            },
            {
              name: "大梅沙(广东省-深圳市-盐田区)",
              value: [114.316948, 22.604784, 3444]
            },
            {
              name: "小梅沙(广东省-深圳市-盐田区)",
              value: [114.334053, 22.608836, 2930]
            }
          ]
        }
      ],
      visualMap: {
        min: 0,
        max: 300000,
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

