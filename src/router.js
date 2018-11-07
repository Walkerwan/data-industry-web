import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Profile from "./views/Profile.vue";
import crowdManage from "./views/crowdManage.vue";
import Statistics from "./views/Statistics.vue";
import Customization from "./views/Customization.vue";
import Combination from "./views/Combination.vue";
import SeeProfile from "./views/SeeProfile.vue";
import BaseInfo from "./views/profile/BaseInfo.vue";
import DevicePreference from "./views/profile/DevicePreference.vue";
import EventPreference from "./views/profile/EventPreference.vue";
import HealthStatus from "./views/profile/HealthStatus.vue";
import SportStatus from "./views/profile/SportStatus.vue";
import VenuePreference from "./views/profile/VenuePreference.vue";
import VenueInfo from "./views/statistics/VenueInfo.vue";
import EventInfo from "./views/statistics/EventInfo.vue";
import SportInfo from "./views/statistics/SportInfo.vue";
import DeviceInfo from "./views/statistics/DeviceInfo.vue";
import HealthInfo from "./views/statistics/HealthInfo.vue";
import SharedChart from "./views/SharedChart.vue";
import IndLabelManage from "./views/data-manage/Ind-label-manage/Ind-label-manage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/dashboard",
      component: Dashboard
    },
    {
      path: "/profile",
      component: Profile,
      redirect: "/profile/baseInfo",
      children: [
        {
          path: "/profile/baseInfo",
          component: BaseInfo
        },
        {
          path: "/profile/devicePreference",
          component: DevicePreference
        },
        {
          path: "/profile/eventPreference",
          component: EventPreference
        },
        {
          path: "/profile/healthStatus",
          component: HealthStatus
        },
        {
          path: "/profile/sportStatus",
          component: SportStatus
        },
        {
          path: "/profile/venuePreference",
          component: VenuePreference
        }
      ]
    },
    {
      path: "/statistics",
      component: Statistics,
      redirect: "/statistics/venueInfo",
      children: [
        {
          path: "/statistics/deviceInfo",
          component: DeviceInfo
        },
        {
          path: "/statistics/eventInfo",
          component: EventInfo
        },
        {
          path: "/statistics/healthInfo",
          component: HealthInfo
        },
        {
          path: "/statistics/sportInfo",
          component: SportInfo
        },
        {
          path: "/statistics/venueInfo",
          component: VenueInfo
        }
      ]
    },
    {
      path: "/customization",
      component: Customization
    },
    {
      path: "/combination",
      component: Combination
    },
    {
      path: "/crowdManage",
      component: crowdManage,
      children: [
        {
          path: "/crowdManage/customization",
          component: Customization
        },
        {
          path: "/crowdManage/combination",
          component: Combination
        },
        {
          path: "/crowdManage/seeProfile",
          component: SeeProfile
        }
      ]
    },
    {
      path: "/sharedChart",
      component: SharedChart
    },
    {
      path: "/datamanage/indlabelmanage",
      component: IndLabelManage
    }
  ]
});
