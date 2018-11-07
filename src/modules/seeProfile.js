import _ from "lodash";
import axios from "../utils/axios";
export default {
  state: {
    profileCrowd: {
      crowdId: "kjdi88",
      crowdName: "人群名称1"
    },
    currentCategory: null,
    categories: []
  },
  getters: {
    getCurrentCategory: state => {
      return state.currentCategory;
    },
    getCurrentCategoryChildren: state => {
      const currentCategory = state.currentCategory;
      return currentCategory ? currentCategory.children : [];
    },
    getProfileCrowd: state => {
      return state.profileCrowd;
    },
    getCategories: state => {
      return state.categories;
    }
  },
  mutations: {
    setCurrentCategory(state, currentCategory) {
      state.currentCategory = currentCategory;
    },
    setProfileCrowd(state, profileCrowd) {
      state.profileCrowd = profileCrowd;
    },
    setCategories(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    loadCategories({ commit }, params) {
      return new Promise(resolve => {
        const categories = [
          {
            id: "1",
            name: "基本信息",
            children: [
              {
                id: "2",
                name: "人口属性",
                children: [
                  {
                    id: "3",
                    name: "性别",
                    chartType: "circle",
                    data: [
                      { value: 596941, name: "未知" },
                      { value: 551827, name: "女" },
                      { value: 520404, name: "男" }
                    ]
                  },
                  {
                    id: "4",
                    name: "年龄",
                    chartType: "bar",
                    data: [
                      { value: 34854, name: "0-17" },
                      { value: 112691, name: "18-24" },
                      { value: 218747, name: "25-29" },
                      { value: 254927, name: "30-34" },
                      { value: 178365, name: "35-39" },
                      { value: 74925, name: "40-49" },
                      { value: 18896, name: "50-59" },
                      { value: 2861, name: "60+" }
                    ]
                  },
                  {
                    id: "5",
                    name: "职业",
                    chartType: "rosePie",
                    data: [
                      { value: 4256, name: "其他" },
                      { value: 338131, name: "在职人员" },
                      { value: 51854, name: "学生" },
                      { value: 289218, name: "自由职业" },
                      { value: 82862, name: "退休人员" }
                    ]
                  },
                  {
                    id: "6",
                    name: "感情状态",
                    chartType: "circle",
                    data: [
                      { value: 179429, name: "已婚人士", percent: 0.9 },
                      { value: 27516, name: "不婚主义", percent: 0.1 },
                      { value: 2259, name: "单身好青年", percent: 0.0 }
                    ]
                  },
                  {
                    id: "7",
                    name: "身高（cm）",
                    chartType: "bar",
                    data: [
                      { value: 41057, name: "150以下" },
                      { value: 153609, name: "150-159" },
                      { value: 286980, name: "160-164" },
                      { value: 267727, name: "165-169" },
                      { value: 124721, name: "170-174" },
                      { value: 29013, name: "175-179" },
                      { value: 3370, name: "180+" }
                    ]
                  },
                  {
                    id: "8",
                    name: "体重（kg）",
                    chartType: "circle",
                    data: [
                      { value: 39820, name: "40以下", percent: 0.04 },
                      { value: 128744, name: "40-49", percent: 0.13 },
                      { value: 249908, name: "50-59", percent: 0.24 },
                      { value: 291242, name: "60-69", percent: 0.28 },
                      { value: 203774, name: "70-79", percent: 0.2 },
                      { value: 85598, name: "80-89", percent: 0.08 },
                      { value: 21588, name: "90-99", percent: 0.02 },
                      { value: 3269, name: "100+", percent: 0 }
                    ]
                  }
                ]
              },
              {
                id: "9",
                name: "地域属性",
                children: [
                  {
                    id: "10",
                    name: "区（中国-广东省-深圳市）",
                    chartType: "distributionAreaMap",
                    data: {
                      area: "深圳市",
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
                  },
                  {
                    id: "11",
                    name: "商圈（中国-广东省-深圳市）",
                    chartType: "distributionPointMap",
                    data: {
                      area: "深圳市",
                      data: [
                        {
                          name: "翻身路(广东省-深圳市-宝安区)",
                          value: [113.899425, 22.568929, 48372]
                        },
                        {
                          name: "福永(广东省-深圳市-宝安区)",
                          value: [113.812576, 22.679392, 53847]
                        },
                        {
                          name: "观澜(广东省-深圳市-宝安区)",
                          value: [114.065237, 22.713653, 59764]
                        },
                        {
                          name: "光明(广东省-深圳市-宝安区)",
                          value: [113.904048, 22.761307, 66136]
                        },
                        {
                          name: "锦绣江南(广东省-深圳市-宝安区)",
                          value: [114.036064, 22.642824, 72972]
                        },
                        {
                          name: "龙华(广东省-深圳市-宝安区)",
                          value: [114.047235, 22.757864, 80277]
                        },
                        {
                          name: "民治(广东省-深圳市-宝安区)",
                          value: [114.043551, 22.627753, 88052]
                        },
                        {
                          name: "民治村(广东省-深圳市-宝安区)",
                          value: [114.043551, 22.627753, 96296]
                        },
                        {
                          name: "沙井(广东省-深圳市-宝安区)",
                          value: [113.830973, 22.736069, 105001]
                        },
                        {
                          name: "石岩(广东省-深圳市-宝安区)",
                          value: [113.942452, 22.67849, 114155]
                        },
                        {
                          name: "松岗(广东省-深圳市-宝安区)",
                          value: [113.836159, 22.777967, 123741]
                        },
                        {
                          name: "西乡(广东省-深圳市-宝安区)",
                          value: [113.869117, 22.581735, 133737]
                        },
                        {
                          name: "新安(广东省-深圳市-宝安区)",
                          value: [113.907994, 22.570224, 144114]
                        },
                        {
                          name: "保税区(广东省-深圳市-福田区)",
                          value: [114.062762, 22.514223, 154838]
                        },
                        {
                          name: "笔架山(广东省-深圳市-福田区)",
                          value: [113.928507, 22.639107, 165869]
                        },
                        {
                          name: "彩田村(广东省-深圳市-福田区)",
                          value: [114.068998, 22.566427, 177162]
                        },
                        {
                          name: "车公庙(广东省-深圳市-福田区)",
                          value: [114.033246, 22.542356, 188666]
                        },
                        {
                          name: "赤尾(广东省-深圳市-福田区)",
                          value: [114.090351, 22.537705, 200325]
                        },
                        {
                          name: "赤尾村(广东省-深圳市-福田区)",
                          value: [114.091933, 22.536933, 212076]
                        },
                        {
                          name: "福民新村(广东省-深圳市-福田区)",
                          value: [114.074878, 22.528348, 223855]
                        },
                        {
                          name: "岗厦(广东省-深圳市-福田区)",
                          value: [114.074582, 22.540606, 235591]
                        },
                        {
                          name: "华强南(广东省-深圳市-福田区)",
                          value: [114.093342, 22.543237, 247211]
                        },
                        {
                          name: "皇岗(广东省-深圳市-福田区)",
                          value: [114.076782, 22.541517, 258639]
                        },
                        {
                          name: "黄木岗(广东省-深圳市-福田区)",
                          value: [114.09363, 22.561766, 269797]
                        },
                        {
                          name: "景田(广东省-深圳市-福田区)",
                          value: [114.050218, 22.559168, 280607]
                        },
                        {
                          name: "荔枝公园(广东省-深圳市-福田区)",
                          value: [114.109029, 22.551853, 290989]
                        },
                        {
                          name: "莲花二村(广东省-深圳市-福田区)",
                          value: [114.07724, 22.555938, 300865]
                        },
                        {
                          name: "沙尾(广东省-深圳市-福田区)",
                          value: [114.049088, 22.526598, 310159]
                        },
                        {
                          name: "沙尾村(广东省-深圳市-福田区)",
                          value: [114.048461, 22.524527, 318797]
                        },
                        {
                          name: "上步(广东省-深圳市-福田区)",
                          value: [114.102575, 22.542791, 326709]
                        },
                        {
                          name: "上梅林(广东省-深圳市-福田区)",
                          value: [114.066329, 22.575161, 333830]
                        },
                        {
                          name: "上沙(广东省-深圳市-福田区)",
                          value: [114.042497, 22.530294, 340100]
                        },
                        {
                          name: "石厦(广东省-深圳市-福田区)",
                          value: [114.060176, 22.529065, 345466]
                        },
                        {
                          name: "下梅林(广东省-深圳市-福田区)",
                          value: [114.048023, 22.571368, 349882]
                        },
                        {
                          name: "下沙(广东省-深圳市-福田区)",
                          value: [114.029978, 22.533968, 353309]
                        },
                        {
                          name: "香蜜湖(广东省-深圳市-福田区)",
                          value: [114.045221, 22.544666, 355717]
                        },
                        {
                          name: "新洲(广东省-深圳市-福田区)",
                          value: [114.053413, 22.532678, 357085]
                        },
                        {
                          name: "益田村(广东省-深圳市-福田区)",
                          value: [114.057317, 22.519753, 357402]
                        },
                        {
                          name: "园岭(广东省-深圳市-福田区)",
                          value: [114.110895, 22.562236, 356664]
                        },
                        {
                          name: "中心区(广东省-深圳市-福田区)",
                          value: [114.110895, 22.562236, 354877]
                        },
                        {
                          name: "竹子林(广东省-深圳市-福田区)",
                          value: [114.020418, 22.539593, 352059]
                        },
                        {
                          name: "坂田(广东省-深圳市-龙岗区)",
                          value: [114.077406, 22.633264, 348232]
                        },
                        {
                          name: "布吉(广东省-深圳市-龙岗区)",
                          value: [114.128025, 22.608011, 343431]
                        },
                        {
                          name: "丹竹头(广东省-深圳市-龙岗区)",
                          value: [114.154575, 22.62573, 337698]
                        },
                        {
                          name: "桂芳园(广东省-深圳市-龙岗区)",
                          value: [114.14756, 22.622742, 331080]
                        },
                        {
                          name: "横岗(广东省-深圳市-龙岗区)",
                          value: [114.215408, 22.654411, 323635]
                        },
                        {
                          name: "康桥(广东省-深圳市-龙岗区)",
                          value: [114.150462, 22.630884, 315425]
                        },
                        {
                          name: "可园(广东省-深圳市-龙岗区)",
                          value: [114.142056, 22.610515, 306516]
                        },
                        {
                          name: "坑梓(广东省-深圳市-龙岗区)",
                          value: [114.380551, 22.752814, 296980]
                        },
                        {
                          name: "葵涌(广东省-深圳市-龙岗区)",
                          value: [114.428954, 22.638405, 286892]
                        },
                        {
                          name: "葵涌村(广东省-深圳市-龙岗区)",
                          value: [114.430681, 22.631344, 276330]
                        },
                        {
                          name: "龙岗中心城(广东省-深圳市-龙岗区)",
                          value: [114.24854, 22.732774, 265371]
                        },
                        {
                          name: "南澳(广东省-深圳市-龙岗区)",
                          value: [114.497807, 22.540254, 254096]
                        },
                        {
                          name: "平湖(广东省-深圳市-龙岗区)",
                          value: [114.134135, 22.691778, 242581]
                        },
                        {
                          name: "坪地(广东省-深圳市-龙岗区)",
                          value: [114.31589, 22.776402, 230906]
                        },
                        {
                          name: "万科城(广东省-深圳市-龙岗区)",
                          value: [114.076475, 22.650907, 219144]
                        },
                        {
                          name: "布心(广东省-深圳市-罗湖区)",
                          value: [114.144521, 22.587239, 207368]
                        },
                        {
                          name: "蔡屋围(广东省-深圳市-罗湖区)",
                          value: [114.114511, 22.546322, 195646]
                        },
                        {
                          name: "草埔(广东省-深圳市-罗湖区)",
                          value: [114.122821, 22.590902, 184043]
                        },
                        {
                          name: "翠竹(广东省-深圳市-罗湖区)",
                          value: [114.13658, 22.562715, 172617]
                        },
                        {
                          name: "东湖(广东省-深圳市-罗湖区)",
                          value: [114.143258, 22.566907, 161422]
                        },
                        {
                          name: "东门(广东省-深圳市-罗湖区)",
                          value: [114.12543, 22.551889, 150509]
                        },
                        {
                          name: "东晓(广东省-深圳市-罗湖区)",
                          value: [114.142869, 22.582645, 139919]
                        },
                        {
                          name: "独树村(广东省-深圳市-罗湖区)",
                          value: [114.12619, 22.584682, 129691]
                        },
                        {
                          name: "国贸(广东省-深圳市-罗湖区)",
                          value: [114.125156, 22.546055, 119856]
                        },
                        {
                          name: "洪湖(广东省-深圳市-罗湖区)",
                          value: [114.129336, 22.572092, 110440]
                        },
                        {
                          name: "黄贝岭(广东省-深圳市-罗湖区)",
                          value: [114.143367, 22.552416, 101464]
                        },
                        {
                          name: "火车站(广东省-深圳市-罗湖区)",
                          value: [114.123611, 22.537961, 92942]
                        },
                        {
                          name: "金稻田(广东省-深圳市-罗湖区)",
                          value: [114.130703, 22.593294, 84885]
                        },
                        {
                          name: "莲塘(广东省-深圳市-罗湖区)",
                          value: [114.17909, 22.565555, 77298]
                        },
                        {
                          name: "泥岗(广东省-深圳市-罗湖区)",
                          value: [114.104372, 22.573718, 70182]
                        },
                        {
                          name: "清水河(广东省-深圳市-罗湖区)",
                          value: [114.112049, 22.583693, 63532]
                        },
                        {
                          name: "人民南(广东省-深圳市-罗湖区)",
                          value: [114.124462, 22.541853, 57343]
                        },
                        {
                          name: "水贝(广东省-深圳市-罗湖区)",
                          value: [114.131395, 22.580491, 51604]
                        },
                        {
                          name: "水库(广东省-深圳市-罗湖区)",
                          value: [114.123308, 22.569228, 46303]
                        },
                        {
                          name: "笋岗(广东省-深圳市-罗湖区)",
                          value: [114.117667, 22.569697, 41424]
                        },
                        {
                          name: "田贝(广东省-深圳市-罗湖区)",
                          value: [114.136542, 22.573667, 36949]
                        },
                        {
                          name: "田心村(广东省-深圳市-罗湖区)",
                          value: [114.11924, 22.574066, 32861]
                        },
                        {
                          name: "文锦(广东省-深圳市-罗湖区)",
                          value: [114.130782, 22.566883, 29139]
                        },
                        {
                          name: "文锦渡(广东省-深圳市-罗湖区)",
                          value: [114.136284, 22.543874, 25762]
                        },
                        {
                          name: "银湖(广东省-深圳市-罗湖区)",
                          value: [114.096324, 22.574342, 22709]
                        },
                        {
                          name: "白石洲(广东省-深圳市-南山区)",
                          value: [113.973369, 22.545597, 19959]
                        },
                        {
                          name: "大冲(广东省-深圳市-南山区)",
                          value: [113.960726, 22.549595, 17491]
                        },
                        {
                          name: "后海(广东省-深圳市-南山区)",
                          value: [113.927799, 22.523707, 15282]
                        },
                        {
                          name: "华侨城(广东省-深圳市-南山区)",
                          value: [113.990586, 22.540615, 13313]
                        },
                        {
                          name: "南头(广东省-深圳市-南山区)",
                          value: [113.925291, 22.542096, 11564]
                        },
                        {
                          name: "南油(广东省-深圳市-南山区)",
                          value: [113.931613, 22.518733, 10014]
                        },
                        {
                          name: "前海(广东省-深圳市-南山区)",
                          value: [113.913241, 22.522323, 8647]
                        },
                        {
                          name: "蛇口(广东省-深圳市-南山区)",
                          value: [113.92194, 22.489142, 7444]
                        },
                        {
                          name: "深圳湾(广东省-深圳市-南山区)",
                          value: [114.001185, 22.527274, 6390]
                        },
                        {
                          name: "西丽(广东省-深圳市-南山区)",
                          value: [113.960285, 22.586456, 5469]
                        },
                        {
                          name: "大梅沙(广东省-深圳市-盐田区)",
                          value: [114.316948, 22.604784, 4667]
                        },
                        {
                          name: "小梅沙(广东省-深圳市-盐田区)",
                          value: [114.334053, 22.608836, 3971]
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "12",
            name: "场馆偏好",
            children: [
              {
                id: "13",
                name: "用户关注/预定的场馆基本属性",
                children: [
                  {
                    id: "14",
                    name: "场馆名称（深圳市TOP10）",
                    chartType: "tableBar",
                    data: []
                  },
                  {
                    id: "15",
                    name: "场馆场地类型（深圳市）",
                    chartType: "bubble",
                    data: []
                  },
                  {
                    id: "16",
                    name: "场馆标签（深圳市TOP100）",
                    chartType: "wordCloud",
                    data: []
                  },
                  {
                    id: "17",
                    name: "场馆平均消费水平（深圳市）",
                    chartType: "bar",
                    data: []
                  }
                ]
              },
              {
                id: "18",
                name: "用户关注/预定的场馆地域属性",
                children: [
                  {
                    id: "19",
                    name: "场馆所在区/县（深圳市）",
                    chartType: "distributionAreaMap",
                    data: []
                  },
                  {
                    id: "20",
                    name: "场馆所在商圈（深圳市）",
                    chartType: "distributionPointMap",
                    data: []
                  }
                ]
              }
            ]
          },
          {
            id: "12",
            name: "赛事偏好",
            children: []
          },
          {
            id: "12",
            name: "运动状况",
            children: []
          },
          {
            id: "12",
            name: "健康状况",
            children: []
          },
          {
            id: "12",
            name: "设备偏向",
            children: []
          }
        ];
        console.log("category", categories);
        commit("setCategories", categories);
        resolve();
        //   axios.get("/dubhe/dubhe/loadCategory", params).then(res => {
        //     const category = res.data || [];
        //     commit("setCurrentCategory", category);
        //     resolve();
        //   });
      });
    },
    loadCategory({ state, commit }, params) {
      console.log("loadCategory loadCategory", params);
      return axios.get("/dubhe/dubhe/crowd/lookPortrayal", params).then(res => {
        const data = res.data;
        commit("setCategories", data.category);
        commit("setCurrentCategory", data);
      });
    }
  }
};
