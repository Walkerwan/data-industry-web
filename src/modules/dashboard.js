import axios from "../utils/axios";
import uuid from "../utils/uuid";
import _ from "lodash";
const longTimeFormat = time => {
  const date = new Date();
  date.setTime(time);
  const formated = date.format("yyyy/MM/dd hh:mm:ss");
  return formated;
};
export default {
  state: {
    newChart: null,
    scheme: [],
    panelManageCharts: [],
    panelManageCrowds: [],
    dashboards: [],
    chartsData: [],
    panels: []
  },
  mutations: {
    setPanelManageCharts(state, params) {
      const crowd = _.find(state.panelManageCrowds, params);
      console.log("setPanelManageCharts crowd", crowd);
      const industry = _.find(state.scheme, {
        industryCode: crowd.beLongsIndCode
      });
      
      console.log("setPanelManageCharts industry", industry);

      state.panelManageCharts = industry?industry.charts:[];
    },
    setNewChart(state, newChart) {
      state.newChart = newChart;
    },
    setScheme(state, scheme) {
      state.scheme = scheme;
    },
    setPanelManageCrowds(state, panelManageCrowds) {
      state.panelManageCrowds = panelManageCrowds;
    },
    addEmptyDashboard(state, dashboard) {
      const dashboards = _.cloneDeep(state.dashboards);
      dashboards.unshift(dashboard);
      state.dashboards = dashboards;
    },
    setDashboards(state, dashboards) {
      state.dashboards = dashboards;
    },
    setChartsData(state, chartsData) {
      state.chartsData = chartsData;
    },
    setPanels(state, panels) {
      state.panels = panels;
    },
    setPanel(state, panel) {
      const panels = _.cloneDeep(state.panels);
      for (let rawPanel of panels) {
        if (rawPanel.id === panel.id) {
          rawPanel = Object.assign(rawPanel, panel);
        }
      }
      state.panels = panels;
    }
  },
  actions: {
    updateChartNameByChartId(context, params){
      return axios.post("/dubhe/dubhe/dashBoard/updateChartNameByChartId", params);
    },
    saveDashboard({ state, commit }, params) {
      return axios.post("/dubhe/dubhe/dashBoard/saveDashboard", params);
    },
    loadDashBoardChart({ state, commit }, params) {
      console.log("loadDashBoardChart params", params);
      return new Promise(resolve => {
        axios
          .get("/dubhe/dubhe/dashBoard/loadDashBoardChart", params)
          .then(res => {
            console.log("loadDashBoardChart res", res);
            commit("setPanels", res.data.layoutData);
            commit("setChartsData", res.data.chartsData);
            console.log(
              "loadDashBoardChart state.chartsData",
              state.chartsData
            );
            resolve(res);
          });
      });
    },
    addChartToDashBoard({ commit }, params) {
      return new Promise(resolve => {
        axios
          .post("/dubhe/dubhe/dashBoard/addChartToDashBoard", params)
          .then(res => {
            commit("setNewChart", res.data);
            resolve(res);
          });
      });
    },
    loadCrowdChartInfo({ commit }, params) {
      return new Promise(resolve => {
        axios
          .get("/dubhe/dubhe/dashBoard/loadCrowdChartInfo", params)
          .then(res => {
            console.log("loadCrowdChartInfo res", res);
            commit("setPanelManageCrowds", res.data.crowds);
            commit("setScheme", res.data.scheme);
            resolve();
          });
      });
    },
    addChartToDashBoard(context, params) {
      return axios.post("/dubhe/dubhe/dashBoard/addChartToDashBoard", params);
    },
    createDashboard(context, params) {
      return axios.post("/dubhe/dubhe/dashBoard/createDashBoard", params);
    },
    updateDashBoardInfo(context, params) {
      return axios.post("/dubhe/dubhe/dashBoard/updateDashBoardInfo", params);
    },
    loadDashBoard({ commit }, params) {
      return new Promise(resolve => {
        axios
          .get("/dubhe/dubhe/dashBoard/loadDashBoard", { params: params })
          .then(res => {
            commit("setDashboards", res.data);
            resolve();
          });
      });
    },
    removePanel({ commit, state }, id) {
      const panels = _.cloneDeep(state.panels);
      let index = 0;
      for (let panel of panels) {
        if (panel.id === id) {
          panels.splice(index, 1);
          break;
        }
        index++;
      }
      commit("setPanels", panels);
    },
    loadPanel({ commit }, params) {
      return new Promise(resolve => {
        axios
          .get("/dubhe/dubhe/crowd/loadPanel", { params: params })
          .then(res => {
            if (!res || !res.data) {
              return;
            }
            const rows = res.data.rows || [];
            const panels = [];
            for (let row of rows) {
              panels.push({
                crowdId: row.crowdId,
                valid: true,
                name: row.crowdName,
                type: row.crowdType,
                scale: row.peoNewestScaleNum,
                createdBy: "郑帆凯",
                createdTime: longTimeFormat(row.createTime),
                computeStatus: row.countState,
                profileStatus: row.portrayalState
              });
            }
            commit("setPanels", panels);
            resolve(res.data.total);
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    batchDeletePanel(context, params) {
      return new Promise(resolve => {
        axios
          .post("/dubhe/dubhe/crowd/batchDelete", params)
          .then(res => {
            if (res && res.data === 1) resolve();
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
  },
  getters: {
    getChartsData: state => {
      return state.chartsData;
    },
    getPanelManageCharts: state => {
      return state.panelManageCharts;
    },
    getPanelManageCrowds: state => {
      return state.panelManageCrowds;
    },
    getDashboards: state => {
      return state.dashboards;
    },
    getPanels: state => {
      return state.panels;
    }
  }
};
