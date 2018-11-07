// import axios from "axios";
import Vue from "vue";
import axios from "../utils/axios";
import _ from "lodash";
import { CROWDTYPE } from "../constants";
const longTimeFormat = time => {
  const date = new Date();
  date.setTime(time);
  const formated = date.format("yyyy/MM/dd hh:mm:ss");
  return formated;
};
const vue = new Vue();
const formatValidPeriod = (start, end) => {
  const startDateStr = new Date(start).format("yyyy-MM-dd");
  const endDateStr = end ? new Date(end).format("yyyy-MM-dd") : "— ";
  return startDateStr + " ~ " + endDateStr;
};
export default {
  state: {
    crowds: [],
    crowdRule: {}
  },
  mutations: {
    setCrowds(state, crowds) {
      state.crowds = crowds;
    },
    setCrowdRule(state, crowdRule) {
      state.crowdRule = crowdRule;
    }
  },
  actions: {
    spreadCrowdEdit(context, params) {
      return axios.post("/dubhe/dubhe/peopleRule/editSpreadPeopleRule", params);
    },
    loadCrowd({ commit }, params) {
      return new Promise(resolve => {
        axios.get("/dubhe/dubhe/crowd/loadCrowd", params).then(res => {
          const rows = res.data.rows || [];
          const crowds = [];
          for (let row of rows) {
            crowds.push({
              crowdId: row.crowdId,
              valid: row.isValid === 1,
              name: row.crowdName,
              type: row.crowdType,
              industry: row.indName,
              scale: row.peoNewestScaleNum
                ? row.peoNewestScaleNum.toLocaleString()
                : "--",
              createdBy: "郑帆凯",
              createdTime: longTimeFormat(row.createTime),
              computeStatus: row.countState,
              profileStatus: row.portrayalState,
              beLongsIndCode: row.beLongsIndCode,
              sourceCrowdName: row.sourceCrowdName,
              peoCreateRuleCount: row.peoCreateRuleCount,
              validityPeriod: String(row.ruleValidType)
            });
          }
          commit("setCrowds", crowds);
          resolve(res.data.total);
        });
      });
    },
    batchDeleteCrowd({ commit }, params) {
      return axios.post("/dubhe/dubhe/crowd/batchDelete", params);
    },
    computeCrowd(context, params) {
      return axios.post("/dubhe/dubhe/crowd/countCrowd", params);
    },
    genProfile(context, params) {
      return axios.post("/dubhe/dubhe/crowd/createPortrayal", params);
    },
    spreadCrowd(context, params) {
      return axios.post(
        "/dubhe/dubhe/peopleRule/createSpreadPeopleRule",
        params
      );
    },
    updateCrowdName(context, params) {
      return axios.post("/dubhe/dubhe/crowd/updateCrowdNameById", params);
    },
    lookRule({ commit }, crowd) {
      commit("setCrowdRule", {});
      const crowdRule = { crowdType: crowd.type };
      return new Promise(resolve => {
        axios
          .get("/dubhe/dubhe/crowd/lookRule", {
            id: crowd.crowdId
          })
          .then(res => {
            const rule = res.data || [];
            crowdRule.groupRelations = rule.showRule || [];
            if (crowdRule.crowdType === CROWDTYPE.spreadCrowd) {
              crowdRule.sourceCrowdName = rule.spreadShowRule.name;
              crowdRule.sourceRuleValidPeriod = formatValidPeriod(
                rule.ruleValidStartTime,
                rule.ruleValidEndTime
              );
              crowdRule.isSourceEndTimeNull = rule.ruleValidEndTime === null;
              crowdRule.similarity =
                Math.round(rule.spreadShowRule.similarity * 100) + "%相似度";
              crowdRule.ruleValidPeriod = formatValidPeriod(
                rule.spreadRuleValidStartTime,
                rule.spreadRuleValidEndTime
              );
              crowdRule.isEndTimeNull = rule.spreadRuleValidEndTime === null;
            } else {
              crowdRule.ruleValidPeriod = formatValidPeriod(
                rule.ruleValidStartTime,
                rule.ruleValidEndTime
              );
              crowdRule.isEndTimeNull = rule.ruleValidEndTime === null;
            }
            commit("setCrowdRule", crowdRule);
            resolve();
          });
      });
    }
  },
  getters: {
    getCrowds: state => {
      return state.crowds;
    },
    getCrowdRule: state => {
      return state.crowdRule;
    }
  }
};
