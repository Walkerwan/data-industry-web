<template>
  <div class="profile">
    <div class="top-info">
      <span>用户规模：</span>
      <span>{{userAmount.toLocaleString()}}</span>
      <span>个</span>
      <span class="refresh-date">更新时间：</span>
      <span>{{refreshDate}}</span>
    </div>
    <div class="flex-row nav-buttons">
      <Button v-for="navButton in navButtons" class="nav-button" :type="currentRoute[currentRoute.length-1]===navButton.route?'primary':'default'" @click="navButtonClick(navButton.route)">{{navButton.name}}</Button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAmount: 4764465,
      refreshDate: "2018年8月27日",
      primary: "baseInfo",
      navButtons: [
        {
          route: "baseInfo",
          name: "基本信息"
        },
        {
          route: "venuePreference",
          name: "场馆偏好"
        },
        {
          route: "eventPreference",
          name: "赛事偏好"
        },
        {
          route: "sportStatus",
          name: "运动状况"
        },
        {
          route: "healthStatus",
          name: "健康状况"
        },
        {
          route: "devicePreference",
          name: "设备偏向"
        }
      ]
    };
  },
  computed: {
    currentRoute() {
      return this.$store.getters.getCurrentRoute;
    }
  },
  methods: {
    navButtonClick(primary) {
      this.primary = primary;
      this.$router.push({ path: "/profile/" + primary });
    }
  }
};
</script>

<style>
.profile {
  font-size: 16px;
}
.profile .top-info {
  padding: 10px 20px 20px 20px;
}
.profile .top-info .refresh-date {
  margin-left: 32px;
}
.profile .nav-buttons {
  padding: 0px;
}
.profile .nav-buttons .nav-button {
  margin-right: 22px;
}
</style>


