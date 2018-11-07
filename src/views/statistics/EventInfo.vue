<template>
  <div class="base-info charts-page">
    <div class="flex-row charts">
      <div class="filter-wrapper">
        <div class="chart-title">按照条件过滤</div>
        <div class="chart">
          <div class="filter-label" style="margin-top:18px;margin-bottom:12px;">赛事名称过滤</div>
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
        <div class="chart-title">各类赛事举办次数占比</div>
        <div class="chart">
          <g2-circle :height=370 :width=481 :data="eventCountData"></g2-circle>
        </div>
      </div>
      <div class="index-rank-list top-quarter chart-wrapper">
        <div class="chart-title">赛事关注热度排名</div>
        <div class="chart">
          <rank-list :data="concernDegreeData"></rank-list>
        </div>
      </div>
      <div class="emotional-state top-small-half chart-wrapper">
        <div class="chart-title">各类赛事关注量变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="eventConcernCountData" :fields="eventConcernCountDataFields" :height=327></g2-multi-line>
        </div>
      </div>
      <div class="index-rank-list statistics-third chart-wrapper">
        <div class="chart-title">足球队场均进球数量排名</div>
        <div class="chart">
          <rank-list :data="teamGoalData"></rank-list>
        </div>
      </div>
      <div class="index-rank-list statistics-third chart-wrapper">
        <div class="chart-title">足球队价值排名</div>
        <div class="chart">
          <rank-list :data="teamValueData"></rank-list>
        </div>
      </div>
      <div class="index-rank-list statistics-third chart-wrapper">
        <div class="chart-title">足球队获胜场数排名</div>
        <div class="chart">
          <rank-list :data="teamWinCountData"></rank-list>
        </div>
      </div>
      <!-- <div class="index-rank-list statistics-quarter chart-wrapper">
        <div class="chart-title">场馆综合指数</div>
        <div class="chart">
          <rank-list :data="comprehensiveIndexRankList"></rank-list>
        </div>
      </div> -->
    </div>
    <div class="flex-row charts">
      <div class="county statistics-half chart-wrapper statistics-map-wrapper">
        <div class="chart-title">赛事分布地图</div>
        <div class="map">
          <county-map :option="distributedMapOption" :style="{width:'873px', height:'708px'}"></county-map>
        </div>
      </div>
      <div class="statistics-half flex-row charts">
        <div class="index-rank-list statistics-quarter chart-wrapper">
          <div class="chart-title">足球队关注量排名</div>
          <div class="chart">
            <rank-list :data="teamConcernData"></rank-list>
          </div>
        </div>
        <div class="index-rank-list statistics-quarter chart-wrapper">
          <div class="chart-title">足球运动员场均助攻数量排名</div>
          <div class="chart">
            <rank-list :data="playerAssistData"></rank-list>
          </div>
        </div>
        <div class="index-rank-list statistics-quarter chart-wrapper">
          <div class="chart-title">足球运动员场均进球数量排名</div>
          <div class="chart">
            <rank-list :data="playerGoalData"></rank-list>
          </div>
        </div>
        <div class="index-rank-list statistics-quarter chart-wrapper">
          <div class="chart-title">足球运动员价值排名</div>
          <div class="chart">
            <rank-list :data="playerValueData"></rank-list>
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
      eventConcernCountDataFields: ["篮球", "羽毛球", "足球"],
      eventConcernCountData: [
        {
          month: "1",
          篮球: 7741,
          羽毛球: 11860,
          足球: 10872
        },
        {
          month: "2",
          篮球: 18902,
          羽毛球: 13201,
          足球: 4277
        },
        {
          month: "3",
          篮球: 18702,
          羽毛球: 13257,
          足球: 6604
        },
        {
          month: "4",
          篮球: 7114,
          羽毛球: 7383,
          足球: 14180
        },
        {
          month: "5",
          篮球: 7188,
          羽毛球: 2906,
          足球: 7194
        },
        {
          month: "6",
          篮球: 6126,
          羽毛球: 10670,
          足球: 5480
        },
        {
          month: "7",
          篮球: 15550,
          羽毛球: 10178,
          足球: 16315
        },
        {
          month: "8",
          篮球: 14382,
          羽毛球: 12650,
          足球: 5700
        },
        {
          month: "9",
          篮球: 5829,
          羽毛球: 11901,
          足球: 2558
        },
        {
          month: "10",
          篮球: 6565,
          羽毛球: 15713,
          足球: 8896
        },
        {
          month: "11",
          篮球: 2137,
          羽毛球: 19119,
          足球: 4005
        },
        {
          month: "12",
          篮球: 17554,
          羽毛球: 4781,
          足球: 16236
        },
        {
          month: "13",
          篮球: 6956,
          羽毛球: 9880,
          足球: 5504
        },
        {
          month: "14",
          篮球: 17862,
          羽毛球: 17262,
          足球: 11654
        },
        {
          month: "15",
          篮球: 8125,
          羽毛球: 6819,
          足球: 19198
        },
        {
          month: "16",
          篮球: 8744,
          羽毛球: 19092,
          足球: 2122
        },
        {
          month: "17",
          篮球: 8145,
          羽毛球: 19623,
          足球: 12988
        },
        {
          month: "18",
          篮球: 15184,
          羽毛球: 11314,
          足球: 13309
        },
        {
          month: "19",
          篮球: 18151,
          羽毛球: 7619,
          足球: 15071
        },
        {
          month: "20",
          篮球: 8271,
          羽毛球: 5694,
          足球: 5177
        },
        {
          month: "21",
          篮球: 17763,
          羽毛球: 15564,
          足球: 5266
        },
        {
          month: "22",
          篮球: 2812,
          羽毛球: 14695,
          足球: 4478
        },
        {
          month: "23",
          篮球: 12458,
          羽毛球: 9777,
          足球: 19025
        },
        {
          month: "24",
          篮球: 6435,
          羽毛球: 16893,
          足球: 10902
        },
        {
          month: "25",
          篮球: 19611,
          羽毛球: 10278,
          足球: 10257
        },
        {
          month: "26",
          篮球: 2414,
          羽毛球: 14270,
          足球: 13134
        },
        {
          month: "27",
          篮球: 8288,
          羽毛球: 6859,
          足球: 9144
        },
        {
          month: "28",
          篮球: 3668,
          羽毛球: 17326,
          足球: 6976
        },
        {
          month: "29",
          篮球: 11722,
          羽毛球: 9957,
          足球: 11806
        },
        {
          month: "30",
          篮球: 18800,
          羽毛球: 11496,
          足球: 11787
        }
      ],
      playerValueData: [
        {
          name: "凌思浩",
          rank: 1,
          score: 4.6
        },
        {
          name: "谭宾凉",
          rank: 2,
          score: 3.8
        },
        {
          name: "周亚君",
          rank: 3,
          score: 3.2
        },
        {
          name: "刘建江",
          rank: 4,
          score: 2.4
        },
        {
          name: "路建人",
          rank: 5,
          score: 2.3
        },
        {
          name: "肖笃寅",
          rank: 6,
          score: 1.6
        },
        {
          name: "王伟龙",
          rank: 7,
          score: 1.5
        },
        {
          name: "曾雪麟",
          rank: 8,
          score: 1.4
        },
        {
          name: "车范根",
          rank: 9,
          score: 4.4
        },
        {
          name: "塔瓦雷斯",
          rank: 10,
          score: 1.3
        },
        {
          name: "朱广沪",
          rank: 11,
          score: 1.2
        },
        {
          name: "迟尚斌",
          rank: 12,
          score: 1.2
        },
        {
          name: "郭瑞龙",
          rank: 13,
          score: 1.2
        },
        {
          name: "徐亮",
          rank: 14,
          score: 1.2
        },
        {
          name: "蔡镜源",
          rank: 15,
          score: 1.2
        },
        {
          name: "杨久天",
          rank: 16,
          score: 0.8
        },
        {
          name: "于帅",
          rank: 17,
          score: 0.6
        },
        {
          name: "黎斐",
          rank: 18,
          score: 0.5
        },
        {
          name: "张宏楠",
          rank: 19,
          score: 0.4
        },
        {
          name: "凌思浩",
          rank: 20,
          score: 0.4
        },
        {
          name: "谭宾凉",
          rank: 21,
          score: 0.1
        }
      ],
      playerGoalData: [
        {
          name: "周亚君",
          rank: 1,
          score: 1.9
        },
        {
          name: "胡之刚",
          rank: 2,
          score: 1.9
        },
        {
          name: "周穗安",
          rank: 3,
          score: 1.6
        },
        {
          name: "刘建江",
          rank: 4,
          score: 1.6
        },
        {
          name: "路建人",
          rank: 5,
          score: 1.5
        },
        {
          name: "肖笃寅",
          rank: 6,
          score: 1.5
        },
        {
          name: "王伟龙",
          rank: 7,
          score: 1.5
        },
        {
          name: "曾雪麟",
          rank: 8,
          score: 1.4
        },
        {
          name: "车范根",
          rank: 9,
          score: 4.4
        },
        {
          name: "塔瓦雷斯",
          rank: 10,
          score: 1.3
        },
        {
          name: "朱广沪",
          rank: 11,
          score: 1.2
        },
        {
          name: "迟尚斌",
          rank: 12,
          score: 1.2
        },
        {
          name: "郭瑞龙",
          rank: 13,
          score: 1.2
        },
        {
          name: "徐亮",
          rank: 14,
          score: 1.2
        },
        {
          name: "蔡镜源",
          rank: 15,
          score: 1.2
        },
        {
          name: "杨久天",
          rank: 16,
          score: 0.8
        },
        {
          name: "于帅",
          rank: 17,
          score: 0.6
        },
        {
          name: "黎斐",
          rank: 18,
          score: 0.5
        },
        {
          name: "张宏楠",
          rank: 19,
          score: 0.4
        },
        {
          name: "凌思浩",
          rank: 20,
          score: 0.4
        },
        {
          name: "谭宾凉",
          rank: 21,
          score: 0.1
        }
      ],
      playerAssistData: [
        {
          name: "吕海东",
          rank: 1,
          score: 2.6
        },
        {
          name: "乔巍",
          rank: 2,
          score: 2.3
        },
        {
          name: "张晨",
          rank: 3,
          score: 2.2
        },
        {
          name: "杜龙泉",
          rank: 4,
          score: 2.2
        },
        {
          name: "张远",
          rank: 5,
          score: 2.1
        },
        {
          name: "吕政",
          rank: 6,
          score: 2
        },
        {
          name: "王伟龙",
          rank: 7,
          score: 1.9
        },
        {
          name: "王大龙",
          rank: 8,
          score: 1.8
        },
        {
          name: "崔民",
          rank: 9,
          score: 1.8
        },
        {
          name: "张佳祺",
          rank: 10,
          score: 1.8
        },
        {
          name: "王成快",
          rank: 11,
          score: 1.6
        },
        {
          name: "费煜",
          rank: 12,
          score: 1.5
        },
        {
          name: "李晓明",
          rank: 13,
          score: 1.3
        },
        {
          name: "徐亮",
          rank: 14,
          score: 1.2
        },
        {
          name: "蔡镜源",
          rank: 15,
          score: 1.2
        },
        {
          name: "杨久天",
          rank: 16,
          score: 1.8
        },
        {
          name: "于帅",
          rank: 17,
          score: 0.6
        },
        {
          name: "黎斐",
          rank: 18,
          score: 0.5
        },
        {
          name: "张宏楠",
          rank: 19,
          score: 0.4
        },
        {
          name: "凌思浩",
          rank: 20,
          score: 0.4
        },
        {
          name: "谭宾凉",
          rank: 21,
          score: 0.1
        }
      ],
      teamConcernData: [
        {
          name: "深圳金威啤酒队",
          rank: 1,
          score: 852
        },
        {
          name: "深圳上清饮队",
          rank: 2,
          score: 537
        },
        {
          name: "深圳红钻队",
          rank: 3,
          score: 454
        },
        {
          name: "深圳队",
          rank: 4,
          score: 361
        },
        {
          name: "深圳宇恒队",
          rank: 5,
          score: 304
        },
        {
          name: "深圳平安队",
          rank: 6,
          score: 273
        },
        {
          name: "深圳健力宝队",
          rank: 7,
          score: 272
        },
        {
          name: "深圳小牛资本红钻队",
          rank: 8,
          score: 259
        },
        {
          name: "深圳佳兆业队",
          rank: 9,
          score: 66
        },
        {
          name: "水原三星蓝翼",
          rank: 10,
          score: 21
        }
      ],
      comprehensiveIndexRankList: [
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
      teamWinCountData: [
        {
          name: "深圳队",
          rank: 1,
          score: 979
        },
        {
          name: "深圳宇恒队",
          rank: 2,
          score: 975
        },
        {
          name: "深圳平安队",
          rank: 3,
          score: 834
        },
        {
          name: "深圳健力宝队",
          rank: 4,
          score: 789
        },
        {
          name: "深圳金威啤酒队",
          rank: 5,
          score: 651
        },
        {
          name: "深圳上清饮队",
          rank: 6,
          score: 633
        },
        {
          name: "深圳红钻队",
          rank: 7,
          score: 511
        },
        {
          name: "深圳茅台红钻队",
          rank: 8,
          score: 445
        },
        {
          name: "深圳飞亚达队",
          rank: 9,
          score: 341
        },
        {
          name: "深圳红钻队",
          rank: 10,
          score: 326
        },
        {
          name: "深圳小牛资本红钻队",
          rank: 11,
          score: 287
        },
        {
          name: "深圳佳兆业队",
          rank: 12,
          score: 177
        }
      ],
      teamValueData: [
        {
          name: "深圳队",
          rank: 1,
          score: 832
        },
        {
          name: "深圳宇恒队",
          rank: 2,
          score: 682
        },
        {
          name: "深圳平安队",
          rank: 3,
          score: 537
        },
        {
          name: "深圳健力宝队",
          rank: 4,
          score: 439
        },
        {
          name: "深圳金威啤酒队",
          rank: 5,
          score: 328
        },
        {
          name: "深圳上清饮队",
          rank: 6,
          score: 223
        },
        {
          name: "深圳红钻队",
          rank: 7,
          score: 193
        },
        {
          name: "深圳茅台红钻队",
          rank: 8,
          score: 179
        },
        {
          name: "深圳飞亚达队",
          rank: 9,
          score: 97
        },
        {
          name: "深圳红钻队",
          rank: 10,
          score: 59
        },
        {
          name: "深圳小牛资本红钻队",
          rank: 11,
          score: 6
        }
      ],
      teamGoalData: [
        {
          name: "深圳平安队",
          rank: 1,
          score: 4.8
        },
        {
          name: "深圳健力宝队",
          rank: 2,
          score: 4.8
        },
        {
          name: "深圳金威啤酒队",
          rank: 3,
          score: 3.4
        },
        {
          name: "深圳上清饮队",
          rank: 4,
          score: 3.4
        },
        {
          name: "深圳红钻队",
          rank: 5,
          score: 3.3
        },
        {
          name: "深圳茅台红钻队",
          rank: 6,
          score: 2.9
        },
        {
          name: "深圳红钻队",
          rank: 7,
          score: 2.1
        },
        {
          name: "深圳小牛资本红钻队",
          rank: 8,
          score: 1.9
        },
        {
          name: "深圳宇恒队",
          rank: 9,
          score: 1.7
        },
        {
          name: "深圳佳兆业队",
          rank: 10,
          score: 1.4
        },
        {
          name: "深圳健力宝",
          rank: 11,
          score: 1.4
        },
        {
          name: "水原三星蓝翼",
          rank: 12,
          score: 1.4
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
      eventCountData: [
        {
          item: "足球赛事",
          count: 818,
          percent: 0.4
        },
        {
          item: "篮球赛事",
          count: 263,
          percent: 0.12
        },
        {
          item: "羽毛球赛事",
          count: 984,
          percent: 0.48
        }
      ],
      healthPropotionData: [
        { count: 51410, item: "MACOS", percent: 0.1 },
        { count: 2641, item: "其他", percent: 0.0 },
        { count: 179440, item: "iOS", percent: 0.4 },
        { count: 209786, item: "windows", percent: 0.4 },
        { count: 32172, item: "Android", percent: 0.1 }
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
          return params.name;
        }
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: [
            {
              name: "深圳市第1届篮球少年杯",
              value: [114.068998, 22.566427, 1]
            },
            {
              name: "龙岗区第3届足球联谊赛",
              value: [114.033246, 22.542356, 1]
            },
            {
              name: "福田区事业单位羽毛球联赛",
              value: [114.090351, 22.537705, 1]
            },
            {
              name: "深圳市互联网企业足球联赛",
              value: [114.091933, 22.536933, 1]
            },
            {
              name: "深圳市第五届羽毛球对抗赛",
              value: [114.096324, 22.574342, 1]
            },
            {
              name: "南山区第2届少年足球赛",
              value: [113.973369, 22.545597, 1]
            },
            {
              name: "福田区第3届足球联谊赛",
              value: [113.960726, 22.549595, 1]
            },
            {
              name: "宝安区事业单位羽毛球联赛",
              value: [113.847799, 22.623707, 1]
            },
            {
              name: "深圳市制造业企业足球联赛",
              value: [114.123308, 22.569228, 1]
            },
            {
              name: "深圳市第2届篮球对抗赛",
              value: [114.117667, 22.569697, 1]
            },
            {
              name: "南山区第1届少年篮球赛",
              value: [114.022418, 22.550918, 1]
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
.statistics-quarter {
  width: 433px;
  background: transparent;
}
.statistics-half {
  width: 875px;
  background: transparent;
}
.statistics-third {
  width: 580px;
  background: transparent;
}
.statistics-map-wrapper {
  margin-bottom: 10px;
  height: 750px;
  border-radius: 6px;
  border: 1px solid lightgray;
}
</style>

