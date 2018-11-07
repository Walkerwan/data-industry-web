import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "./components/iview";
// import iView from "iview";
import "./css/iview/iview.css";
import "./css/common/index.less";
import "./css/iconfont/iconfont.css";
import "./common/date/dateFormat";
import axios from "axios";
import VueAxios from "vue-axios";

const Bus = new Vue();

// 全局控件注册
import "@/views/global-component-registry.js";
Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

/* 登录跳转逻辑 */
// router.beforeEach(({ meta, path }, from, next) => {
//   var { auth = true } = meta;
//   var isLogin = Boolean(store.state.user.id); //true用户已登录， false用户未登录

//   if (auth && !isLogin && path !== "/login") {
//     return next({ path: "/login" });
//   }
//   next();
// });

router.afterEach(to => {
  const currentRoute = to.path.split("/");
  currentRoute.splice(0, 1);
  store.commit("setCurrentRoute", currentRoute);
});

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    Bus
  }
}).$mount("#app");
