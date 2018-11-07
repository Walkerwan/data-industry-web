export const VALIDITYPERIOD = {
  once: 1,
  oneMonth: 2,
  twoMonth: 3,
  threeMonth: 4
};
export const ALL = 0;
export const CROWDTYPE = {
  attrCrowd: 1,
  keywordCrowd: 2,
  spreadCrowd: 3,
  combinationCrowd: 4
};
export const COMPUTESTATUS = {
  toCompute: 1,
  computing: 2,
  computeException: 3,
  computeSuccess: 4
};
export const PROFILESTATUS = {
  isNull: -1,
  toProfile: 1,
  profiling: 2,
  profileException: 3,
  profileSuccess: 4
};
export const BOARDMINHEIGHT = 818;
export const BOARDMAXWIDTH = 1878;
export const crowdTypeArr = [
  {
    value: ALL,
    text: "全部类型"
  },
  {
    value: CROWDTYPE.attrCrowd,
    text: "属性人群"
  },
  {
    value: CROWDTYPE.combinationCrowd,
    text: "组合人群"
  },
  {
    value: CROWDTYPE.spreadCrowd,
    text: "扩散人群"
  },
  {
    value: CROWDTYPE.keywordCrowd,
    text: "关键词人群"
  }
];

export const computeStatusArr = [
  {
    value: ALL,
    text: "全部计算状态"
  },
  {
    value: COMPUTESTATUS.toCompute,
    text: "未计算"
  },
  {
    value: COMPUTESTATUS.computing,
    text: "计算中"
  },
  {
    value: COMPUTESTATUS.computeException,
    text: "计算异常"
  },
  {
    value: COMPUTESTATUS.computeSuccess,
    text: "计算成功"
  }
];

export const profileStatusArr = [
  {
    value: ALL,
    text: "全部画像状态"
  },
  {
    value: PROFILESTATUS.isNull,
    text: "--"
  },
  {
    value: PROFILESTATUS.toProfile,
    text: "未画像"
  },
  {
    value: PROFILESTATUS.profiling,
    text: "画像中"
  },
  {
    value: PROFILESTATUS.profileException,
    text: "画像异常"
  },
  {
    value: PROFILESTATUS.profileSuccess,
    text: "画像成功"
  }
];

export const isPhotoList = [
  {
    value: "全部",
    label: "全部"
  },
  {
    value: "是",
    label: 0
  },
  {
    value: "否",
    label: 1
  }
];

export const iconTypeList = [
  {
    value: "全部图标类型",
    label: "全部图表类型"
  },
  {
    value: "环状饼图",
    label: "1"
  },
  {
    value: "柱状图",
    label: "2"
  },
  {
    value: "色块地图",
    label: "3"
  },
  {
    value: "散点地图",
    label: "4"
  },
  {
    value: "列表+柱状图",
    label: "5"
  },
  {
    value: "词云图",
    label: "6"
  },
  {
    value: "气泡图",
    label: "7"
  }
];

export const stateList = [
  {
    value: "全部",
    label: "全部"
  },
  {
    value: "启用",
    label: 0
  },
  {
    value: "禁用",
    label: 1
  }
];

export const RELATIONTYPE = {
  union: 1,
  difference: 2,
  intersaction: 3
};
/*人群定制api*/
const BASE = "/dubhe/dubhe";
export const PEOPLERULE_API = {
  CREATE: `${BASE}/peopleRule/createPeopleRule`,
  GET_INDUSTRIES: `${BASE}/industry/getIndustries`,
  GET_INDUSTRIES_GROUPS: `${BASE}/industryGroup/getIndustryGroups`,
  CHECK_NAME: `${BASE}/peopleRule/checkPeopleName`
};
/*人群组合api*/
export const CROWDCOMBINATION_API = {
  GET_PEOPLERULES: `${BASE}/peopleRule/getPeopleRules`
};
/*规则编辑*/
export const EDITECROWDRULE_API = {
  GET_CROWDRULE: `${BASE}/peopleRule/getPeopleRule`,
  EDITE_CROWDRULE: `${BASE}/peopleRule/editPeopleRule`
};
export const CHARTWIDTH = {
  circle: "quarter",
  bar: "quarter",
  line: "half",
  multiLine: "half",
  area: "half",
  radar: "quarter",
  rosePie: "quarter",
  bubble: "half",
  rankList: "quarter",
  tableBar: "half",
  wordCloud: "half",
  distributionAreaMap: "half",
  distributionPointMap: "half",
  heatMap: "half"
};

export const CHARTTYPE = {
  "1": "circle",
  "2": "bar",
  "3": "distributionAreaMap",
  "4": "distributionPointMap",
  "5": "tableBar",
  "6": "wordCloud",
  "7": "bubble"
};
