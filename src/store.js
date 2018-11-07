import Vue from "vue";
import Vuex from "vuex";
import base from "./modules/base";
import crowdManage from "./modules/crowdManage";
import crowdCustomization from "./modules/crowdCustomization";
import dashboard from "./modules/dashboard";
import seeProfile from "./modules/seeProfile";
import labelManage from "./modules/ind-label-manage.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base: base,
    crowdManage: crowdManage,
    crowdEdit: crowdCustomization,
    dashboard: dashboard,
    seeProfile: seeProfile,
    labelManage: labelManage
  }
});
