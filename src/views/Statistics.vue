<template>
  <div class="statistics flex-row">
    <div class="nav-menu">
      <button v-for="navButton in navButtons" :class="currentRoute[currentRoute.length-1]===navButton.route?'primary':''" @click="navButtonClick(navButton.route)">
        {{navButton.name}}
      </button>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      primary: "venueInfo",
      navButtons: [
        {
          route: "venueInfo",
          name: "场馆信息"
        },
        {
          route: "eventInfo",
          name: "赛事信息"
        },
        {
          route: "sportInfo",
          name: "运动信息"
        },
        {
          route: "deviceInfo",
          name: "器材信息"
        },
        {
          route: "healthInfo",
          name: "健康信息"
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
      this.$router.push({ path: "/statistics/" + primary });
    }
  }
};
</script>
<style scoped>
.nav-menu button {
  width: 107px;
  height: 38px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.nav-menu button:focus {
  outline: none;
}
.nav-menu button.primary {
  background-color: #f3f3f3;
}
.statistics {
  flex-wrap: nowrap;
  align-items: flex-start;
}
.nav-menu {
  width: 107px;
  margin-right: 10px;
  background-color: #fcfcfd;
}
.content {
  width: calc(100% - 117px);
}
</style>

