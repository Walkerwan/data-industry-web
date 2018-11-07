export default {
  state: {
    themeColors: {
      backcolor: "#00a83f",
      "menu-selected-item-background-color": "#019a3a",
      fcolor: "white",
      primaryColor: "#00a83f",
      btnColor: "#00a83f",
      primaryShallowColor: "#33b965"
    },
    currentRoute: ["", ""],
    breadcrumMapper: {
      dashboard: "看板",
      profile: "用户画像",
      whole: "整体画像",
      crowdManage: "人群管理",
      statistics: "统计分析",
      customization: "人群定制",
      combination: "人群组合",
      seeProfile: "查看画像",
      baseInfo: "基本信息",
      devicePreference: "设备偏向",
      eventPreference: "赛事偏好",
      healthStatus: "健康状况",
      sportStatus: "运动状况",
      venuePreference: "场馆偏好"
    }
  },
  getters: {
    getThemeColors: state => {
      return state.themeColors;
    },
    getCurrentRoute: state => {
      return state.currentRoute;
    },
    getBreadcrumMapper: state => {
      return state.breadcrumMapper;
    }
  },
  mutations: {
    setThemeColors(state, themeColors) {
      state.themeColors = themeColors;
    },
    setCurrentRoute(state, currentRoute) {
      state.currentRoute = currentRoute;
    }
  }
};
