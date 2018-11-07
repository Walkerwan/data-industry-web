<style lang='less' scoped>
.layout {
  background: transparent;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 19%;
  height: 76px;
  line-height: 76px;
  background: transparent;
  border-radius: 3px;
  float: left;
  position: relative;
  left: 0px;
  line-height: 76px;
  color: var(--highlight-color);
  font-size: 22px;
}
.layout-logo .ivu-icon {
  margin-right: 10px;
}

.layout-nav {
  width: auto;
  margin: 0 auto 0 auto;
  margin-right: 20px;
}

.layout-footer-center {
  text-align: center;
}

.ivu-menu-horizontal .ivu-menu-item {
  padding-right: 0px;
  padding-left: 0px;
}

.top-menu-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120px;
  height: 76px;
  margin-right: 5px;
}

.menu-item-icon-wrapper {
  width: 100%;
  height: 40px;
  line-height: 1;
  text-align: center;
}

.menu-item-text {
  width: 100%;
  height: 16px;
  text-align: center;
  line-height: 1;
}

.layout-user {
  position: absolute;
  right: 0px;
}
</style>

<style>
.menu-item-text .ivu-select-dropdown {
  margin-top: 13px;
}
</style>


<template>
  <div id="layout-root" class="layout theme-1">
    <Layout>
      <Header v-if="currentRoute[0]!=='sharedChart'">
        <Menu height="80" mode="horizontal" theme="dark" :active-name="activeName">
          <div class="layout-logo">
            <Icon size=32 custom="dubhe-iconfont dubhe-icon-logo"></Icon>
            <span>可视化分析系统</span>
          </div>
          <div class="layout-nav">
            <router-link to="/">
              <MenuItem class="top-menu-item" name="dashboard">
              <div class="menu-item-icon-wrapper">
                <Icon size=30 custom="dubhe-iconfont dubhe-icon-dashboard"></Icon>
              </div>
              <div class="menu-item-text">看板</div>
              </MenuItem>
            </router-link>
            <router-link to="/customization">
              <MenuItem class="top-menu-item" name="customization">
              <div class="menu-item-icon-wrapper">
                <Icon size=30 custom="dubhe-iconfont dubhe-icon-customization"></Icon>
              </div>
              <div class="menu-item-text">人群定制</div>
              </MenuItem>
            </router-link>
            <router-link to="/crowdManage">
              <MenuItem class="top-menu-item" name="crowdManage">
              <div class="menu-item-icon-wrapper">
                <Icon size=30 custom="dubhe-iconfont dubhe-icon-crowd-manage"></Icon>
              </div>
              <div class="menu-item-text">人群管理</div>
              </MenuItem>
            </router-link>
            <router-link to="/combination">
              <MenuItem class="top-menu-item" name="combination">
              <div class="menu-item-icon-wrapper">
                <Icon size=30 custom="dubhe-iconfont dubhe-icon-combination"></Icon>
              </div>
              <div class="menu-item-text">人群组合</div>
              </MenuItem>
            </router-link>
            <router-link to="/datamanage/indlabelmanage">
              <MenuItem class="top-menu-item" name="datamanage">
              <div class="menu-item-icon-wrapper">
                <Icon size=30 custom="dubhe-iconfont dubhe-icon-label-manage"></Icon>
              </div>
              <Dropdown class="menu-item-text" trigger="hover">
                <span>
                  数据管理
                  <Icon type="ios-arrow-down"></Icon>
                </span>
                <DropdownMenu slot="list">
                  <DropdownItem @click.native="toggle">行业标签管理</DropdownItem>
                  <DropdownItem>数据接入管理</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              </MenuItem>
            </router-link>
          </div>
          <div class="layout-user">
            <Dropdown style="margin-right: 10px;">
              <a href="javascript:void(0)">
                <Icon size=16 style="margin-right:5px;margin-top:-2px;" custom="dubhe-iconfont dubhe-icon-user"></Icon>
                切换主题
                <Icon size=16 style="margin-left:5px;" type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="changeTheme('dark')">深色主题</DropdownItem>
                <DropdownItem @click.native="changeTheme('light')">浅色主题</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <a href="javascript:void(0)">
                <Icon size=16 style="margin-right:5px;margin-top:-2px;" custom="dubhe-iconfont dubhe-icon-user"></Icon>
                张三
                <Icon size=16 style="margin-left:5px;" type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem>自定义设置</DropdownItem>
                <DropdownItem>切换用户</DropdownItem>
                <DropdownItem>注销登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0px'}">
        <Breadcrumb v-if="currentRoute[0]==='crowdManage' && currentRoute.length > 1" :style="{margin: '10px 20px -14px 20px'}">
          <!-- <router-link v-for="(item,index) in currentRoute" :key="index" @click="breadcrumClick(index)" :to="genPath(index)">
            <BreadcrumbItem>{{breadcrumMapper[item]}}</BreadcrumbItem>
          </router-link> -->
          <router-link @click="breadcrumClick(0)" :to="genPath(0)">
            <BreadcrumbItem>{{breadcrumMapper[currentRoute[0]]}}</BreadcrumbItem>
          </router-link>
          <BreadcrumbItem>{{$route.query.crowdName}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="app-content" :class="currentRoute[0]==='sharedChart'?'sharedChartWrapper':''">
          <router-view></router-view>
        </div>
      </Content>
      <!-- <Footer class="layout-footer-center">2018-2023 &copy; 中琛源科技股份</Footer> -->
    </Layout>
  </div>
</template>

<script>
import dark from "./css/themes/dark/constants.json";
import light from "./css/themes/light/constants.json";
export default {
  data() {
    return {
      dark: dark,
      light: light
    };
  },
  computed: {
    activeName() {
      return this.currentRoute[0];
    },
    currentRoute() {
      return this.$store.getters.getCurrentRoute;
    },
    breadcrumMapper() {
      return this.$store.getters.getBreadcrumMapper;
    }
  },
  methods: {
    toggle() {
      this.$router.push({
        path: "/datamanage/indlabelmanage"
      });
    },
    changeTheme(theme) {
      localStorage.setItem("theme", theme);
      const themeJson = this[theme];
      this.changeVars(themeJson);
      this.commitThemeColors(themeJson);
    },
    changeVars(themeJson) {
      const body = document.querySelector("body");
      for (let key in themeJson) {
        body.style.setProperty(key, themeJson[key]);
      }
    },
    commitThemeColors(themeJson) {
      this.$store.commit("setThemeColors", themeJson);
    },
    setTheme() {
      let theme = localStorage.getItem("theme");
      theme = theme ? theme : "dark";
      const themeJson = this[theme];
      this.changeVars(themeJson);
      this.commitThemeColors(themeJson);
    },
    breadcrumClick(index) {
      const currentRoute = this.currentRoute.slice(0);
      currentRoute.splice(index + 1, currentRoute.length - index - 1);
      this.$store.commit("setCurrentRoute", currentRoute);
    },
    genPath(index) {
      return "/" + this.currentRoute.slice(0, index + 1).join("/");
    }
  },
  created() {
    this.setTheme();
  },
  mounted() {},
  watch: {
    currentRoute() {
      console.log("this.currentRoute changed", this.currentRoute);
    }
  }
};
</script>
