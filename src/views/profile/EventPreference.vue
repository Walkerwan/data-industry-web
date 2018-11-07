<template>
  <div class="vunue-preference charts-page">
    <div class="population dashed-border charts-wrapper">用户关注的足球赛事基本属性</div>
    <div class="flex-row charts">
      <div class="venueName half chart-wrapper">
        <div class="chart-title">赛事名称（深圳市TOP10）</div>
        <div class="chart">
          <table-bar :fields="eventTableFields" :data="eventTable"></table-bar>
        </div>
      </div>
      <div class="sex quarter chart-wrapper">
        <div class="chart-title">赛事参赛人类型</div>
        <div class="chart">
          <g2-circle :height=400 :width=470 :data="playerTypeData"></g2-circle>
        </div>
      </div>
      <div class="age quarter chart-wrapper">
        <div class="chart-title">赛事赛制</div>
        <div class="chart">
          <g2-bar :data="formatData"></g2-bar>
        </div>
      </div>
    </div>
    <div class="area dashed-border charts-wrapper">用户关注的足球赛事地域属性</div>
    <div class="flex-row charts">
      <div class="county half map-wrapper">
        <div class="chart-title">赛事所在区/县（深圳市）</div>
        <div class="map">
          <county-map :option="mapOption" :style="{width:'926px', height:'564px'}"></county-map>
        </div>
      </div>
      <div class="business-circle half map-wrapper">
        <div class="chart-title">赛事所在商圈（深圳市）</div>
        <div class="map">
          <county-map :option="distributedMapOption" :style="{width:'926px', height:'564px'}"></county-map>
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
      formatData: [
        { value: 33012, name: "5" },
        { value: 123511, name: "6" },
        { value: 230748, name: "7" },
        { value: 215268, name: "8" },
        { value: 100283, name: "9" },
        { value: 23328, name: "10" },
        { value: 2710, name: "11" }
      ],
      eventTableFields: ["赛事名称", "关注人群占比", "人群规模"],
      eventTable: [
        {
          name: "深圳市第1届篮球少年杯",
          ratio: 0.14,
          crowdAmount: 8928
        },
        {
          name: "龙岗区第3届足球联谊赛",
          ratio: 0.13,
          crowdAmount: 8129
        },
        {
          name: "福田区事业单位羽毛球联赛",
          ratio: 0.13,
          crowdAmount: 7869
        },
        {
          name: "深圳市互联网企业足球联赛",
          ratio: 0.11,
          crowdAmount: 6889
        },
        {
          name: "深圳市第五届羽毛球对抗赛",
          ratio: 0.11,
          crowdAmount: 6332
        },
        {
          name: "南山区第2届少年足球赛",
          ratio: 0.08,
          crowdAmount: 5772
        },
        {
          name: "福田区第3届足球联谊赛",
          ratio: 0.06,
          crowdAmount: 4881
        },
        {
          name: "宝安区事业单位羽毛球联赛",
          ratio: 0.03,
          crowdAmount: 3991
        },
        {
          name: "深圳市制造业企业足球联赛",
          ratio: 0.02,
          crowdAmount: 3682
        },
        {
          name: "深圳市第2届篮球对抗赛",
          ratio: 0.01,
          crowdAmount: 2763
        }
      ],
      playerTypeData: [
        { count: 247724, item: "青少年U9", percent: 0.86 },
        { count: 37990, item: "成人", percent: 0.13 },
        { count: 3118, item: "青少年U11", percent: 0.01 }
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
            { name: "南山区", value: 49891 },
            { name: "福田区", value: 129883 },
            { name: "罗湖区", value: 248335 },
            { name: "宝安区", value: 348726 },
            { name: "龙岗区", value: 359656 },
            { name: "盐田区", value: 272427 },
            { name: "光明区", value: 151555 },
            { name: "龙华区", value: 61923 },
            { name: "坪山区", value: 18582 },
            { name: "大鹏区", value: 4095 }
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
              value: [113.899425, 22.568929, 34114]
            },
            {
              name: "福永(广东省-深圳市-宝安区)",
              value: [113.812576, 22.679392, 37975]
            },
            {
              name: "观澜(广东省-深圳市-宝安区)",
              value: [114.065237, 22.713653, 42149]
            },
            {
              name: "光明(广东省-深圳市-宝安区)",
              value: [113.904048, 22.761307, 46643]
            },
            {
              name: "锦绣江南(广东省-深圳市-宝安区)",
              value: [114.036064, 22.642824, 51464]
            },
            {
              name: "龙华(广东省-深圳市-宝安区)",
              value: [114.047235, 22.757864, 56615]
            },
            {
              name: "民治(广东省-深圳市-宝安区)",
              value: [114.043551, 22.627753, 62099]
            },
            {
              name: "民治村(广东省-深圳市-宝安区)",
              value: [114.043551, 22.627753, 67913]
            },
            {
              name: "沙井(广东省-深圳市-宝安区)",
              value: [113.830973, 22.736069, 74052]
            },
            {
              name: "石岩(广东省-深圳市-宝安区)",
              value: [113.942452, 22.67849, 80508]
            },
            {
              name: "松岗(广东省-深圳市-宝安区)",
              value: [113.836159, 22.777967, 87269]
            },
            {
              name: "西乡(广东省-深圳市-宝安区)",
              value: [113.869117, 22.581735, 94318]
            },
            {
              name: "新安(广东省-深圳市-宝安区)",
              value: [113.907994, 22.570224, 101636]
            },
            {
              name: "保税区(广东省-深圳市-福田区)",
              value: [114.062762, 22.514223, 109200]
            },
            {
              name: "笔架山(广东省-深圳市-福田区)",
              value: [113.928507, 22.639107, 116979]
            },
            {
              name: "彩田村(广东省-深圳市-福田区)",
              value: [114.068998, 22.566427, 124944]
            },
            {
              name: "车公庙(广东省-深圳市-福田区)",
              value: [114.033246, 22.542356, 133057]
            },
            {
              name: "赤尾(广东省-深圳市-福田区)",
              value: [114.090351, 22.537705, 141279]
            },
            {
              name: "赤尾村(广东省-深圳市-福田区)",
              value: [114.091933, 22.536933, 149567]
            },
            {
              name: "福民新村(广东省-深圳市-福田区)",
              value: [114.074878, 22.528348, 157874]
            },
            {
              name: "岗厦(广东省-深圳市-福田区)",
              value: [114.074582, 22.540606, 166151]
            },
            {
              name: "华强南(广东省-深圳市-福田区)",
              value: [114.093342, 22.543237, 174346]
            },
            {
              name: "皇岗(广东省-深圳市-福田区)",
              value: [114.076782, 22.541517, 182405]
            },
            {
              name: "黄木岗(广东省-深圳市-福田区)",
              value: [114.09363, 22.561766, 190275]
            },
            {
              name: "景田(广东省-深圳市-福田区)",
              value: [114.050218, 22.559168, 197898]
            },
            {
              name: "荔枝公园(广东省-深圳市-福田区)",
              value: [114.109029, 22.551853, 205220]
            },
            {
              name: "莲花二村(广东省-深圳市-福田区)",
              value: [114.07724, 22.555938, 212185]
            },
            {
              name: "沙尾(广东省-深圳市-福田区)",
              value: [114.049088, 22.526598, 218740]
            },
            {
              name: "沙尾村(广东省-深圳市-福田区)",
              value: [114.048461, 22.524527, 224832]
            },
            {
              name: "上步(广东省-深圳市-福田区)",
              value: [114.102575, 22.542791, 230412]
            },
            {
              name: "上梅林(广东省-深圳市-福田区)",
              value: [114.066329, 22.575161, 235434]
            },
            {
              name: "上沙(广东省-深圳市-福田区)",
              value: [114.042497, 22.530294, 239856]
            },
            {
              name: "石厦(广东省-深圳市-福田区)",
              value: [114.060176, 22.529065, 243640]
            },
            {
              name: "下梅林(广东省-深圳市-福田区)",
              value: [114.048023, 22.571368, 246755]
            },
            {
              name: "下沙(广东省-深圳市-福田区)",
              value: [114.029978, 22.533968, 249171]
            },
            {
              name: "香蜜湖(广东省-深圳市-福田区)",
              value: [114.045221, 22.544666, 250870]
            },
            {
              name: "新洲(广东省-深圳市-福田区)",
              value: [114.053413, 22.532678, 251835]
            },
            {
              name: "益田村(广东省-深圳市-福田区)",
              value: [114.057317, 22.519753, 252058]
            },
            {
              name: "园岭(广东省-深圳市-福田区)",
              value: [114.110895, 22.562236, 251538]
            },
            {
              name: "中心区(广东省-深圳市-福田区)",
              value: [114.110895, 22.562236, 250278]
            },
            {
              name: "竹子林(广东省-深圳市-福田区)",
              value: [114.020418, 22.539593, 248290]
            },
            {
              name: "坂田(广东省-深圳市-龙岗区)",
              value: [114.077406, 22.633264, 245591]
            },
            {
              name: "布吉(广东省-深圳市-龙岗区)",
              value: [114.128025, 22.608011, 242205]
            },
            {
              name: "丹竹头(广东省-深圳市-龙岗区)",
              value: [114.154575, 22.62573, 238162]
            },
            {
              name: "桂芳园(广东省-深圳市-龙岗区)",
              value: [114.14756, 22.622742, 233495]
            },
            {
              name: "横岗(广东省-深圳市-龙岗区)",
              value: [114.215408, 22.654411, 228244]
            },
            {
              name: "康桥(广东省-深圳市-龙岗区)",
              value: [114.150462, 22.630884, 222454]
            },
            {
              name: "可园(广东省-深圳市-龙岗区)",
              value: [114.142056, 22.610515, 216171]
            },
            {
              name: "坑梓(广东省-深圳市-龙岗区)",
              value: [114.380551, 22.752814, 209446]
            },
            {
              name: "葵涌(广东省-深圳市-龙岗区)",
              value: [114.428954, 22.638405, 202331]
            },
            {
              name: "葵涌村(广东省-深圳市-龙岗区)",
              value: [114.430681, 22.631344, 194882]
            },
            {
              name: "龙岗中心城(广东省-深圳市-龙岗区)",
              value: [114.24854, 22.732774, 187154]
            },
            {
              name: "南澳(广东省-深圳市-龙岗区)",
              value: [114.497807, 22.540254, 179201]
            },
            {
              name: "平湖(广东省-深圳市-龙岗区)",
              value: [114.134135, 22.691778, 171081]
            },
            {
              name: "坪地(广东省-深圳市-龙岗区)",
              value: [114.31589, 22.776402, 162847]
            },
            {
              name: "万科城(广东省-深圳市-龙岗区)",
              value: [114.076475, 22.650907, 154552]
            },
            {
              name: "布心(广东省-深圳市-罗湖区)",
              value: [114.144521, 22.587239, 146247]
            },
            {
              name: "蔡屋围(广东省-深圳市-罗湖区)",
              value: [114.114511, 22.546322, 137980]
            },
            {
              name: "草埔(广东省-深圳市-罗湖区)",
              value: [114.122821, 22.590902, 129796]
            },
            {
              name: "翠竹(广东省-深圳市-罗湖区)",
              value: [114.13658, 22.562715, 121738]
            },
            {
              name: "东湖(广东省-深圳市-罗湖区)",
              value: [114.143258, 22.566907, 113843]
            },
            {
              name: "东门(广东省-深圳市-罗湖区)",
              value: [114.12543, 22.551889, 106147]
            },
            {
              name: "东晓(广东省-深圳市-罗湖区)",
              value: [114.142869, 22.582645, 98678]
            },
            {
              name: "独树村(广东省-深圳市-罗湖区)",
              value: [114.12619, 22.584682, 91465]
            },
            {
              name: "国贸(广东省-深圳市-罗湖区)",
              value: [114.125156, 22.546055, 84529]
            },
            {
              name: "洪湖(广东省-深圳市-罗湖区)",
              value: [114.129336, 22.572092, 77888]
            },
            {
              name: "黄贝岭(广东省-深圳市-罗湖区)",
              value: [114.143367, 22.552416, 71558]
            },
            {
              name: "火车站(广东省-深圳市-罗湖区)",
              value: [114.123611, 22.537961, 65548]
            },
            {
              name: "金稻田(广东省-深圳市-罗湖区)",
              value: [114.130703, 22.593294, 59866]
            },
            {
              name: "莲塘(广东省-深圳市-罗湖区)",
              value: [114.17909, 22.565555, 54515]
            },
            {
              name: "泥岗(广东省-深圳市-罗湖区)",
              value: [114.104372, 22.573718, 49496]
            },
            {
              name: "清水河(广东省-深圳市-罗湖区)",
              value: [114.112049, 22.583693, 44806]
            },
            {
              name: "人民南(广东省-深圳市-罗湖区)",
              value: [114.124462, 22.541853, 40441]
            },
            {
              name: "水贝(广东省-深圳市-罗湖区)",
              value: [114.131395, 22.580491, 36394]
            },
            {
              name: "水库(广东省-深圳市-罗湖区)",
              value: [114.123308, 22.569228, 32655]
            },
            {
              name: "笋岗(广东省-深圳市-罗湖区)",
              value: [114.117667, 22.569697, 29214]
            },
            {
              name: "田贝(广东省-深圳市-罗湖区)",
              value: [114.136542, 22.573667, 26058]
            },
            {
              name: "田心村(广东省-深圳市-罗湖区)",
              value: [114.11924, 22.574066, 23175]
            },
            {
              name: "文锦(广东省-深圳市-罗湖区)",
              value: [114.130782, 22.566883, 20550]
            },
            {
              name: "文锦渡(广东省-深圳市-罗湖区)",
              value: [114.136284, 22.543874, 18169]
            },
            {
              name: "银湖(广东省-深圳市-罗湖区)",
              value: [114.096324, 22.574342, 16016]
            },
            {
              name: "白石洲(广东省-深圳市-南山区)",
              value: [113.973369, 22.545597, 14076]
            },
            {
              name: "大冲(广东省-深圳市-南山区)",
              value: [113.960726, 22.549595, 12335]
            },
            {
              name: "后海(广东省-深圳市-南山区)",
              value: [113.927799, 22.528707, 10778]
            },
            {
              name: "华侨城(广东省-深圳市-南山区)",
              value: [113.990586, 22.540615, 9389]
            },
            {
              name: "南头(广东省-深圳市-南山区)",
              value: [113.925291, 22.542096, 8155]
            },
            {
              name: "南油(广东省-深圳市-南山区)",
              value: [113.931613, 22.518733, 7063]
            },
            {
              name: "前海(广东省-深圳市-南山区)",
              value: [113.913241, 22.522323, 6098]
            },
            {
              name: "蛇口(广东省-深圳市-南山区)",
              value: [113.92194, 22.489142, 5250]
            },
            {
              name: "深圳湾(广东省-深圳市-南山区)",
              value: [114.001185, 22.527274, 4507]
            },
            {
              name: "西丽(广东省-深圳市-南山区)",
              value: [113.960285, 22.586456, 3857]
            },
            {
              name: "大梅沙(广东省-深圳市-盐田区)",
              value: [114.316948, 22.604784, 3291]
            },
            {
              name: "小梅沙(广东省-深圳市-盐田区)",
              value: [114.334053, 22.608836, 2800]
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

