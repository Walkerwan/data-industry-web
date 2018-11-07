<template>
  <div class="base-info charts-page">
    <div class="flex-row charts">
      <div class="filter-wrapper">
        <div class="chart-title">按照条件过滤</div>
        <div class="chart">
          <div class="period-filter filter-label" style="margin-top:28px;">时段过滤</div>
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
        <div class="chart-title">人群健康度占比</div>
        <div class="chart">
          <g2-circle :width=730 :height=400 :data="healthPropotionData"></g2-circle>
        </div>
      </div>
      <div class="index-rank-list statistics-half chart-wrapper">
        <div class="chart-title">人群健康度变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="healthTrendData" :fields="healthTrendDataField" :width=875 :height=327></g2-multi-line>
        </div>
      </div>
    </div>
    <div class="flex-row charts">
      <div class="variation-trend statistics-half chart-wrapper">
        <div class="chart-title">人群睡眠时长变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="sleepTimeData" :fields="sleepTimeDataFields" :height=327></g2-multi-line>
        </div>
      </div>
      <div class="weight statistics-half chart-wrapper">
        <div class="chart-title">人群心率状况变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="heartRateData" :fields="heartRateDataFields" :height=327></g2-multi-line>
        </div>
      </div>
      <div class="weight statistics-half chart-wrapper">
        <div class="chart-title">人群血压状况变化趋势</div>
        <div class="chart">
          <g2-multi-line :data="bloodPressureData" :fields="bloodPressureDataFields" :height=327></g2-multi-line>
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
      bloodPressureDataFields: ["日平均收缩压", "日平均舒张压"],
      bloodPressureData: [
        {
          month: "1",
          日平均收缩压: 61,
          日平均舒张压: 91
        },
        {
          month: "2",
          日平均收缩压: 67,
          日平均舒张压: 93
        },
        {
          month: "3",
          日平均收缩压: 60,
          日平均舒张压: 97
        },
        {
          month: "4",
          日平均收缩压: 62,
          日平均舒张压: 93
        },
        {
          month: "5",
          日平均收缩压: 69,
          日平均舒张压: 93
        },
        {
          month: "6",
          日平均收缩压: 64,
          日平均舒张压: 100
        },
        {
          month: "7",
          日平均收缩压: 62,
          日平均舒张压: 95
        },
        {
          month: "8",
          日平均收缩压: 60,
          日平均舒张压: 91
        },
        {
          month: "9",
          日平均收缩压: 64,
          日平均舒张压: 91
        },
        {
          month: "10",
          日平均收缩压: 66,
          日平均舒张压: 98
        },
        {
          month: "11",
          日平均收缩压: 63,
          日平均舒张压: 97
        },
        {
          month: "12",
          日平均收缩压: 69,
          日平均舒张压: 99
        },
        {
          month: "13",
          日平均收缩压: 61,
          日平均舒张压: 92
        },
        {
          month: "14",
          日平均收缩压: 63,
          日平均舒张压: 99
        },
        {
          month: "15",
          日平均收缩压: 66,
          日平均舒张压: 93
        },
        {
          month: "16",
          日平均收缩压: 61,
          日平均舒张压: 93
        },
        {
          month: "17",
          日平均收缩压: 61,
          日平均舒张压: 92
        },
        {
          month: "18",
          日平均收缩压: 67,
          日平均舒张压: 94
        },
        {
          month: "19",
          日平均收缩压: 63,
          日平均舒张压: 99
        },
        {
          month: "20",
          日平均收缩压: 62,
          日平均舒张压: 91
        },
        {
          month: "21",
          日平均收缩压: 65,
          日平均舒张压: 90
        },
        {
          month: "22",
          日平均收缩压: 65,
          日平均舒张压: 95
        },
        {
          month: "23",
          日平均收缩压: 68,
          日平均舒张压: 100
        },
        {
          month: "24",
          日平均收缩压: 61,
          日平均舒张压: 92
        },
        {
          month: "25",
          日平均收缩压: 65,
          日平均舒张压: 97
        },
        {
          month: "26",
          日平均收缩压: 66,
          日平均舒张压: 98
        },
        {
          month: "27",
          日平均收缩压: 61,
          日平均舒张压: 97
        },
        {
          month: "28",
          日平均收缩压: 61,
          日平均舒张压: 100
        },
        {
          month: "29",
          日平均收缩压: 60,
          日平均舒张压: 98
        },
        {
          month: "30",
          日平均收缩压: 65,
          日平均舒张压: 97
        }
      ],
      heartRateDataFields: ["日平均心率", "日最低心率", "日最高心率"],
      heartRateData: [
        {
          month: "1",
          日平均心率: 64,
          日最低心率: 40,
          日最高心率: 78
        },
        {
          month: "2",
          日平均心率: 64,
          日最低心率: 45,
          日最高心率: 76
        },
        {
          month: "3",
          日平均心率: 69,
          日最低心率: 47,
          日最高心率: 70
        },
        {
          month: "4",
          日平均心率: 62,
          日最低心率: 48,
          日最高心率: 74
        },
        {
          month: "5",
          日平均心率: 67,
          日最低心率: 49,
          日最高心率: 71
        },
        {
          month: "6",
          日平均心率: 61,
          日最低心率: 40,
          日最高心率: 74
        },
        {
          month: "7",
          日平均心率: 66,
          日最低心率: 40,
          日最高心率: 74
        },
        {
          month: "8",
          日平均心率: 67,
          日最低心率: 49,
          日最高心率: 73
        },
        {
          month: "9",
          日平均心率: 69,
          日最低心率: 43,
          日最高心率: 70
        },
        {
          month: "10",
          日平均心率: 66,
          日最低心率: 45,
          日最高心率: 77
        },
        {
          month: "11",
          日平均心率: 66,
          日最低心率: 42,
          日最高心率: 73
        },
        {
          month: "12",
          日平均心率: 61,
          日最低心率: 46,
          日最高心率: 79
        },
        {
          month: "13",
          日平均心率: 61,
          日最低心率: 43,
          日最高心率: 71
        },
        {
          month: "14",
          日平均心率: 64,
          日最低心率: 49,
          日最高心率: 75
        },
        {
          month: "15",
          日平均心率: 64,
          日最低心率: 45,
          日最高心率: 77
        },
        {
          month: "16",
          日平均心率: 60,
          日最低心率: 45,
          日最高心率: 70
        },
        {
          month: "17",
          日平均心率: 64,
          日最低心率: 48,
          日最高心率: 78
        },
        {
          month: "18",
          日平均心率: 70,
          日最低心率: 43,
          日最高心率: 80
        },
        {
          month: "19",
          日平均心率: 63,
          日最低心率: 48,
          日最高心率: 71
        },
        {
          month: "20",
          日平均心率: 66,
          日最低心率: 41,
          日最高心率: 71
        },
        {
          month: "21",
          日平均心率: 70,
          日最低心率: 47,
          日最高心率: 78
        },
        {
          month: "22",
          日平均心率: 67,
          日最低心率: 50,
          日最高心率: 75
        },
        {
          month: "23",
          日平均心率: 66,
          日最低心率: 66,
          日最高心率: 74
        },
        {
          month: "24",
          日平均心率: 61,
          日最低心率: 46,
          日最高心率: 75
        },
        {
          month: "25",
          日平均心率: 65,
          日最低心率: 49,
          日最高心率: 72
        },
        {
          month: "26",
          日平均心率: 60,
          日最低心率: 50,
          日最高心率: 76
        },
        {
          month: "27",
          日平均心率: 62,
          日最低心率: 49,
          日最高心率: 79
        },
        {
          month: "28",
          日平均心率: 63,
          日最低心率: 41,
          日最高心率: 70
        },
        {
          month: "29",
          日平均心率: 67,
          日最低心率: 47,
          日最高心率: 77
        },
        {
          month: "30",
          日平均心率: 67,
          日最低心率: 42,
          日最高心率: 72
        }
      ],
      sleepTimeDataFields: ["浅度睡眠", "深度睡眠", "睡眠时未入眠"],
      sleepTimeData: [
        {
          month: "1",
          浅度睡眠: 3.4,
          深度睡眠: 8,
          睡眠时未入眠: 3.1
        },
        {
          month: "2",
          浅度睡眠: 6,
          深度睡眠: 7,
          睡眠时未入眠: 2.8
        },
        {
          month: "3",
          浅度睡眠: 7.5,
          深度睡眠: 10,
          睡眠时未入眠: 2
        },
        {
          month: "4",
          浅度睡眠: 6.6,
          深度睡眠: 6,
          睡眠时未入眠: 3.5
        },
        {
          month: "5",
          浅度睡眠: 7.2,
          深度睡眠: 8,
          睡眠时未入眠: 3.1
        },
        {
          month: "6",
          浅度睡眠: 5.1,
          深度睡眠: 7,
          睡眠时未入眠: 4.8
        },
        {
          month: "7",
          浅度睡眠: 6.8,
          深度睡眠: 6,
          睡眠时未入眠: 5
        },
        {
          month: "8",
          浅度睡眠: 6.9,
          深度睡眠: 7,
          睡眠时未入眠: 3.7
        },
        {
          month: "9",
          浅度睡眠: 6.5,
          深度睡眠: 6,
          睡眠时未入眠: 3.8
        },
        {
          month: "10",
          浅度睡眠: 7.3,
          深度睡眠: 5,
          睡眠时未入眠: 4.7
        },
        {
          month: "11",
          浅度睡眠: 5.1,
          深度睡眠: 8,
          睡眠时未入眠: 2.5
        },
        {
          month: "12",
          浅度睡眠: 5.9,
          深度睡眠: 10,
          睡眠时未入眠: 5
        },
        {
          month: "13",
          浅度睡眠: 4.9,
          深度睡眠: 6,
          睡眠时未入眠: 3.6
        },
        {
          month: "14",
          浅度睡眠: 6.2,
          深度睡眠: 6,
          睡眠时未入眠: 2.8
        },
        {
          month: "15",
          浅度睡眠: 3.9,
          深度睡眠: 8,
          睡眠时未入眠: 2.4
        },
        {
          month: "16",
          浅度睡眠: 3.6,
          深度睡眠: 6,
          睡眠时未入眠: 4.5
        },
        {
          month: "17",
          浅度睡眠: 3.6,
          深度睡眠: 6,
          睡眠时未入眠: 4.3
        },
        {
          month: "18",
          浅度睡眠: 5,
          深度睡眠: 7,
          睡眠时未入眠: 2.5
        },
        {
          month: "19",
          浅度睡眠: 4.9,
          深度睡眠: 9,
          睡眠时未入眠: 5
        },
        {
          month: "20",
          浅度睡眠: 7.2,
          深度睡眠: 8,
          睡眠时未入眠: 2.7
        },
        {
          month: "21",
          浅度睡眠: 3.3,
          深度睡眠: 6,
          睡眠时未入眠: 3.7
        },
        {
          month: "22",
          浅度睡眠: 5.1,
          深度睡眠: 8,
          睡眠时未入眠: 3.2
        },
        {
          month: "23",
          浅度睡眠: 7.2,
          深度睡眠: 9,
          睡眠时未入眠: 2.8
        },
        {
          month: "24",
          浅度睡眠: 4.8,
          深度睡眠: 5,
          睡眠时未入眠: 3.2
        },
        {
          month: "25",
          浅度睡眠: 6.3,
          深度睡眠: 7,
          睡眠时未入眠: 2.5
        },
        {
          month: "26",
          浅度睡眠: 7.4,
          深度睡眠: 7,
          睡眠时未入眠: 2.7
        },
        {
          month: "27",
          浅度睡眠: 7.9,
          深度睡眠: 8,
          睡眠时未入眠: 4.1
        },
        {
          month: "28",
          浅度睡眠: 4.9,
          深度睡眠: 7,
          睡眠时未入眠: 3.7
        },
        {
          month: "29",
          浅度睡眠: 3.3,
          深度睡眠: 6,
          睡眠时未入眠: 3.8
        },
        {
          month: "30",
          浅度睡眠: 4.8,
          深度睡眠: 9,
          睡眠时未入眠: 3.3
        }
      ],
      healthTrendDataField: ["不健康", "亚健康", "健康"],
      healthTrendData: [
        {
          month: "1",
          不健康: 403255,
          亚健康: 329378,
          健康: 402589
        },
        {
          month: "2",
          不健康: 267262,
          亚健康: 448304,
          健康: 372680
        },
        {
          month: "3",
          不健康: 194374,
          亚健康: 434523,
          健康: 130572
        },
        {
          month: "4",
          不健康: 421771,
          亚健康: 401395,
          健康: 182204
        },
        {
          month: "5",
          不健康: 402220,
          亚健康: 378647,
          健康: 403784
        },
        {
          month: "6",
          不健康: 405206,
          亚健康: 144981,
          健康: 484936
        },
        {
          month: "7",
          不健康: 255766,
          亚健康: 404238,
          健康: 247767
        },
        {
          month: "8",
          不健康: 143611,
          亚健康: 489149,
          健康: 438893
        },
        {
          month: "9",
          不健康: 395455,
          亚健康: 365765,
          健康: 131877
        },
        {
          month: "10",
          不健康: 206996,
          亚健康: 418943,
          健康: 105900
        },
        {
          month: "11",
          不健康: 399104,
          亚健康: 448927,
          健康: 209493
        },
        {
          month: "12",
          不健康: 153028,
          亚健康: 455397,
          健康: 288950
        },
        {
          month: "13",
          不健康: 426618,
          亚健康: 327199,
          健康: 429124
        },
        {
          month: "14",
          不健康: 303993,
          亚健康: 294380,
          健康: 498221
        },
        {
          month: "15",
          不健康: 199430,
          亚健康: 337414,
          健康: 395041
        },
        {
          month: "16",
          不健康: 317530,
          亚健康: 402454,
          健康: 183889
        },
        {
          month: "17",
          不健康: 103210,
          亚健康: 276173,
          健康: 353217
        },
        {
          month: "18",
          不健康: 392497,
          亚健康: 427644,
          健康: 186832
        },
        {
          month: "19",
          不健康: 207303,
          亚健康: 293946,
          健康: 269148
        },
        {
          month: "20",
          不健康: 163479,
          亚健康: 433535,
          健康: 290002
        },
        {
          month: "21",
          不健康: 477252,
          亚健康: 410728,
          健康: 179074
        },
        {
          month: "22",
          不健康: 152541,
          亚健康: 367925,
          健康: 471264
        },
        {
          month: "23",
          不健康: 334983,
          亚健康: 437342,
          健康: 253956
        },
        {
          month: "24",
          不健康: 221080,
          亚健康: 169580,
          健康: 178792
        },
        {
          month: "25",
          不健康: 377700,
          亚健康: 113747,
          健康: 141144
        },
        {
          month: "26",
          不健康: 191700,
          亚健康: 230804,
          健康: 308083
        },
        {
          month: "27",
          不健康: 260053,
          亚健康: 262181,
          健康: 339808
        },
        {
          month: "28",
          不健康: 180800,
          亚健康: 367839,
          健康: 129208
        },
        {
          month: "29",
          不健康: 178127,
          亚健康: 145985,
          健康: 482654
        },
        {
          month: "30",
          不健康: 471289,
          亚健康: 437678,
          健康: 238797
        }
      ],
      healthPropotionData: [
        { count: 401763, item: "健康", percent: 0.1 },
        { count: 134387, item: "亚健康", percent: 0.0 },
        { count: 478626, item: "不健康", percent: 0.4 }
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
