<template>
  <div id="dashboard">
    <div class="flex-row" style="height:32px;align-items: flex-start;padding:0px 20px;">
      <Select @on-change="dashboardChanged" style="width:240px;" v-model="dashBoardCode" filterable placeholder="请先创建仪表盘">
        <Option v-for="dashboard in dashboards" :value="dashboard.dashBoardCode" :key="dashboard.dashBoardCode">{{ dashboard.dashBoardName }}</Option>
      </Select>
      <Button class="ghost-button" @click="showPanelManage">
        <Icon size=12 class="icon" custom="dubhe-iconfont dubhe-icon-setting"></Icon>仪表盘管理
      </Button>
      <div class="flex-empty"></div>
      <Button @click="addPanel" class="ghost-button">
        <Icon size=12 class="icon" custom="dubhe-iconfont dubhe-icon-add"></Icon>添加图表
      </Button>
      <Button @click="saveDashboard" class="ghost-button">
        <Icon size=12 class="icon" custom="dubhe-iconfont dubhe-icon-save"></Icon>保存修改
        <Icon v-show="isModified" size=12 custom="dubhe-iconfont dubhe-icon-warn"></Icon>
      </Button>
      <Button class="ghost-button" style="padding-right: 0px;" @click="fullscreen">
        <Icon size=12 class="icon" custom="dubhe-iconfont dubhe-icon-fullscreen"></Icon>全屏显示
      </Button>
    </div>
    <div ref="dashboardWrapper" id="dashboardWrapper" :class="isFullscreen===true&&isDashboardFullscreen===true?'dashboard-fullscreen':''">
      <div style="min-height: 100%;height:auto; width:100%; position: relative;" ref="dashboard">
        <ChartWrapper :isDashboardFullscreen="isDashboardFullscreen" v-for="(panel,index) in _panels" :chartId="panel.chartId" :chart="getChart(panel.chartId)" :title="getChartName(panel.chartId)" @removeChart="removeChart" @resize="resize" @resizestop="resizestop" @dragStarted="dragStarted" @dragStop="dragStop" :id="panel.id" :x="panel.x" :y="panel.y" :w="panel.w" :h="panel.h" :parent="true" :grid="[5, 5]" :dragHandle="'.dragHandle'">
          <component v-bind:is="getChartType(panel.chartId)" :width="panel.w" :height="panel.h - 30" :data="getData(panel.chartId)"></component>
        </ChartWrapper>
        <shadow-div v-show="dragging || resizing" :shadowProps="shadowProps"></shadow-div>
      </div>
    </div>
    <Modal v-model="addPanelModal" title="添加图表" class-name="vertical-center-modal">
      <div slot="footer">
        <Button type="text" size="large" @click="addPanelModalCancel">取消</Button>
        <Button type="primary" size="large" @click="addPanelModalOk">确定</Button>
      </div>
      <Form ref="addPanelFormValidate" :model="addPanelForm" style="padding-right:20px;" :rules="addPanelFormRuleValidate" :label-width="120">
        <FormItem style="margin-bottom: 12px;" label="图表来源:">
          <RadioGroup v-model="addPanelForm.chartSource">
            <Radio label="userProfile">用户画像</Radio>
            <Radio label="dataAnalysis">数据分析</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="人群名称:" prop="crowdName">
          <Select v-model="addPanelForm.crowdName" @on-change="crowdNameChanged" filterable placeholder="请选择人群名称">
            <Option v-for="(crowd, index) in panelManageCrowds" :value="crowd.crowdCode" :key="crowd.crowdCode">{{crowd.crowdName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="图表名称:" prop="chartName">
          <Select v-model="addPanelForm.chartName" filterable placeholder="请选择图表名称">
            <Option v-for="(chart, index) in panelManageCharts" :value="chart.chartName" :key="index">{{chart.chartName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="图表别名:" prop="chartAlias">
          <Input :maxlength='20' v-model="addPanelForm.chartAlias" placeholder="可以为图表取一个别名，非必填" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="panelManage" width=542 :footer-hide=true title="仪表盘管理" class-name="vertical-center-modal">
      <panel-manage></panel-manage>
    </Modal>
  </div>
</template>

<script>
import ChartWrapper from "../components/dashboard/DRChartWrapper.vue";
import ShadowDiv from "../components/dashboard/ShadowDiv";
import _ from "lodash";
import getStyle from "../utils/getStyle.js";
import { BOARDMINHEIGHT, BOARDMAXWIDTH, CHARTTYPE } from "../constants.js";
import screenfull from "screenfull";
import uuid from "../utils/uuid.js";
import Vue from "vue";
import chartCompRegister from "../common/register/chartCompRegister.js";
import PanelManage from "../components/dashboard/PanelManage";

export default {
  name: "dashboard",
  components: {
    ChartWrapper,
    ShadowDiv,
    PanelManage,
    ...chartCompRegister
  },
  computed: {
    chartsData() {
      return this.$store.getters.getChartsData;
    },
    panelManageCharts() {
      return this.$store.getters.getPanelManageCharts;
    },
    panelManageCrowds() {
      return this.$store.getters.getPanelManageCrowds;
    },
    dashboards() {
      return this.$store.getters.getDashboards;
    },
    panels() {
      return this.$store.getters.getPanels;
    },
    scale() {
      return this.boardWrapperWidth / BOARDMAXWIDTH;
    },
    _panels() {
      const _panels = this.scalePanels(this.panels, this.scale);
      return _panels;
    }
  },
  data() {
    return {
      isModified: false,
      panelManage: false,
      components: [
        "circle",
        "bar",
        "line",
        "multiLine",
        "area",
        "radar",
        "rosePie",
        "bubble",
        "rankList",
        "tableBar",
        "wordCloud",
        "distributionAreaMap",
        "distributionPointMap",
        "heatMap"
      ],
      addPanelModal: false,
      addPanelFormRuleValidate: {
        crowdName: [
          {
            required: true,
            message: "请选择人群名称",
            trigger: "change"
          }
        ],
        chartName: [
          {
            required: true,
            message: "请选择图表名称",
            trigger: "change"
          }
        ],
        chartAlias: [
          {
            max: 20,
            message: "限制最大字数20"
          }
        ]
      },
      addPanelForm: {
        chartSource: "userProfile",
        crowdName: "",
        chartName: "",
        chartAlias: ""
      },
      dragging: false,
      resizing: false,
      shadowProps: {},
      dashBoardId: null,
      dashBoardCode: null,
      isFullscreen: false,
      isDashboardFullscreen: false,
      isChartFullscreen: false,
      boardWrapperHeight: 0,
      boardWrapperWidth: BOARDMAXWIDTH
    };
  },
  methods: {
    loadDashboard() {
      this.$store.dispatch("loadDashBoard", {}).then(() => {
        if (this.dashboards && this.dashboards.length > 0) {
          this.dashBoardCode = this.dashboards[0].dashBoardCode;
          this.dashBoardId = this.dashboards[0].dashBoardId;
        } else {
          this.dashBoardCode = null;
          this.dashBoardId = null;
        }
      });
    },
    removeChart() {
      this.isModified = true;
    },
    crowdNameChanged() {
      this.$store.commit("setPanelManageCharts", {
        crowdCode: this.addPanelForm.crowdName
      });
    },
    saveDashboard() {
      this.$store
        .dispatch("saveDashboard", {
          dashBoardCode: this.dashBoardCode,
          dashBoardChartLayout: this.panels
        })
        .then(res => {
          this.isModified = false;
        });
    },
    dashboardChanged() {
      const dashboard = _.find(this.dashboards, {
        dashBoardCode: this.dashBoardCode
      });
      this.dashBoardId = dashboard.dashBoardId;
    },
    getLayoutJson(dashBoardCode) {
      const dashboard = _.find(this.dashboards, {
        dashBoardCode: dashBoardCode
      });
      this.dashBoardId = dashboard.dashBoardId;
      const layoutJson = dashboard.dashBoardLayoutJson;
      if (
        !dashboard.dashBoardLayoutJson ||
        dashboard.dashBoardLayoutJson === ""
      ) {
        return [];
      }
      return JSON.parse(layoutJson);
    },
    showPanelManage() {
      this.$store.dispatch("loadDashBoard", {});
      this.panelManage = true;
    },
    getChart(chartId) {
      const chart = _.find(this.chartsData, { chartId: chartId });
      if (!chart) {
        return {};
      }
      return chart;
    },
    getChartName(chartId) {
      const chart = _.find(this.chartsData, { chartId: chartId });
      if (!chart) {
        return null;
      }
      return chart.chartAlias || chart.chartName;
    },
    getChartType(chartId) {
      const chart = _.find(this.chartsData, { chartId: chartId });
      if (!chart) {
        return null;
      }
      return this.transformChartType(chart.chartType);
    },
    transformChartType(chartType) {
      return "Zcmorefun" + this.toFirstUpperCase(CHARTTYPE[chartType]);
    },
    toFirstUpperCase(str) {
      return str.substring(0, 1).toUpperCase() + str.substring(1);
    },
    crowdNameValidator(rule, val, callback) {
      callback(true);
    },
    getData(chartId) {
      const chart = _.find(this.chartsData, { chartId: chartId });
      if (!chart) {
        return null;
      }
      return chart.chartResult;
    },
    addPanel() {
      this.addPanelModal = true;
      this.$store.dispatch("loadCrowdChartInfo", {});
    },
    addPanelModalCancel() {
      this.addPanelModal = false;
    },
    addPanelModalOk() {
      this.$refs.addPanelFormValidate.validate(valid => {
        if (!valid) {
          this.addPanelModal = true;
          return;
        }
        this.$store
          .dispatch("addChartToDashBoard", {
            crowdCode: this.addPanelForm.crowdName,
            dashBoardCode: this.dashBoardCode,
            chartName: this.addPanelForm.chartName,
            chartAlias: this.addPanelForm.chartAlias
          })
          .then(res => {
            const panels = _.cloneDeep(this.panels);
            const margin = this.getMargin();
            const chart = res.data;
            panels.push(
              this.scalePanel(
                {
                  id: uuid(),
                  x: 0,
                  y: this.getMaxHeight() + margin,
                  w: (this.boardWrapperWidth - margin - 6) / 2,
                  h: (this.boardWrapperHeight - margin) / 2,
                  chartId: chart.chartId
                },
                1 / this.scale
              )
            );
            this.$store.commit("setPanels", panels);
            this.addChartData(chart);
            this.addPanelModal = false;
          });
      });
    },
    addChartData(chart) {
      const chartsData = _.cloneDeep(this.chartsData);
      chartsData.push(chart);
      this.$store.commit("setChartsData", chartsData);
    },
    scalePanel(panel, scale) {
      const _panel = _.cloneDeep(panel);
      _panel.x = Math.round(panel.x * scale);
      _panel.y = Math.round(panel.y * scale);
      _panel.w = Math.round(panel.w * scale);
      _panel.h = Math.round(panel.h * scale);
      return _panel;
    },
    scalePanels(panels, scale) {
      const _panels = [];
      if (!panels || panels.length === 0) {
        return [];
      }
      for (let panel of panels) {
        _panels.push(this.scalePanel(panel, scale));
      }
      return _panels;
    },
    fullscreen() {
      const element = this.$refs.dashboardWrapper;
      if (screenfull.enabled) {
        this.isDashboardFullscreen = true;
        screenfull.request(element);
      }
    },
    resize(resizedPanel, diff) {
      this.resizing = true;
      this.shadowProps = this.computeSize(resizedPanel, diff);
    },
    dragStarted(movedPanel, diff) {
      this.dragging = true;
      this.shadowProps = this.computePosition(movedPanel, diff);
    },
    refreshDashboardHeight() {
      const maxHeight = this.getMaxHeight();
      const height =
        maxHeight > this.boardWrapperHeight
          ? maxHeight
          : this.boardWrapperHeight;
      this.$refs.dashboard.style.height = height + "px";
    },
    resizestop(resizedPanel) {
      this.resizing = false;
      if (
        resizedPanel.rawW !== this.shadowProps.w ||
        resizedPanel.rawH !== this.shadowProps.h
      ) {
        this.isModified = true;
      }
      this.$store.commit(
        "setPanel",
        this.scalePanel(this.shadowProps, 1 / this.scale)
      );
      this.refreshDashboardHeight();
    },
    getMargin() {
      return Math.floor(this.boardWrapperWidth / 200);
    },
    dragStop(movedPanel) {
      this.dragging = false;
      if (
        movedPanel.rawX !== this.shadowProps.x ||
        movedPanel.rawY !== this.shadowProps.y
      ) {
        this.isModified = true;
      }
      this.$store.commit(
        "setPanel",
        this.scalePanel(this.shadowProps, 1 / this.scale)
      );
      this.refreshDashboardHeight();
    },
    getPositions(panel) {
      return [[panel.x, panel.x + panel.w], [panel.y, panel.y + panel.h]];
    },
    getPos2(panel) {
      const margin = this.getMargin();
      return [
        [panel.x - margin, panel.x + panel.w + margin],
        [panel.y - margin, panel.y + panel.h + margin]
      ];
    },
    comparePositions(p1, p2) {
      var x1 = p1[0] < p2[0] ? p1 : p2;
      var x2 = p1[0] < p2[0] ? p2 : p1;
      return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
    },
    getOffset(p1, p2) {
      if (p1[0] < p2[0]) {
        return p1[1] - p2[0];
      } else {
        return -(p2[1] - p1[0]);
      }
    },
    checkCollisions(panel1, panel2) {
      const pos1 = this.getPositions(panel1);
      const pos2 = this.getPos2(panel2);
      const horizontalMatch = this.comparePositions(pos1[0], pos2[0]);
      const verticalMatch = this.comparePositions(pos1[1], pos2[1]);
      const match = horizontalMatch && verticalMatch;
      return match;
    },
    hasCollidedPanel(currentPanel) {
      for (let panel of this._panels) {
        if (
          panel.id !== currentPanel.id &&
          this.checkCollisions(currentPanel, panel)
        ) {
          return true;
        }
      }
    },
    isPositionValid(panel) {
      if (
        panel.x < 0 ||
        panel.y < 0 ||
        panel.x + panel.w > this.boardWrapperWidth
      ) {
        return false;
      }
      return true;
    },
    getMaxHeight() {
      let maxHeight = 0;
      for (let panel of this._panels) {
        const bottomY = panel.y + panel.h;
        if (bottomY > maxHeight) {
          maxHeight = bottomY;
        }
      }
      return maxHeight;
    },
    getRelativePosition(resizedPanel, collidedPanel) {
      const offsetX = collidedPanel.x - (resizedPanel.x + resizedPanel.w);
      const offsetY = collidedPanel.y - (resizedPanel.y + resizedPanel.h);
      return { offsetX: offsetX, offsetY: offsetY };
    },
    round(num) {
      return Math.round(
        (Math.round((num / this.boardWrapperWidth) * 200) *
          this.boardWrapperWidth) /
          200
      );
    },
    computeSize(resizedPanel, diff) {
      const currentW = this.round(resizedPanel.w + diff.diffX);
      const currentH = this.round(resizedPanel.h + diff.diffY);
      const w =
        currentW + resizedPanel.x >= this.boardWrapperWidth
          ? this.boardWrapperWidth - resizedPanel.x
          : currentW;
      const currentPanel = {
        id: resizedPanel.id,
        x: resizedPanel.x,
        y: resizedPanel.y,
        w: w,
        h: currentH
      };
      this.$store.commit(
        "setPanel",
        this.scalePanel(currentPanel, 1 / this.scale)
      );
      let collidedPanels = this.getCollidedPanels(currentPanel);
      for (let collidedPanel of collidedPanels) {
        const pos1 = this.getPositions(currentPanel);
        const pos2 = this.getPos2(collidedPanel);
        const horizontalOffset = this.getOffset(pos1[0], pos2[0]);
        const verticalOffset = this.getOffset(pos1[1], pos2[1]);
        const relativePos = this.getRelativePosition(
          resizedPanel,
          collidedPanel
        );
        if (relativePos.offsetX > 0 && relativePos.offsetY > 0) {
          currentPanel.w = currentPanel.w - horizontalOffset;
          currentPanel.h = currentPanel.h - verticalOffset;
        }
        if (relativePos.offsetX <= 0 && relativePos.offsetY > 0) {
          currentPanel.h = currentPanel.h - verticalOffset;
        }
        if (relativePos.offsetX > 0 && relativePos.offsetY <= 0) {
          currentPanel.w = currentPanel.w - horizontalOffset;
        }
        if (
          !this.isPositionValid(currentPanel) ||
          this.hasCollidedPanel(currentPanel)
        ) {
          continue;
        } else {
          break;
        }
      }
      return currentPanel;
    },
    getCollidedPanels(currentPanel) {
      let collidedPanels = [];
      for (let panel of this._panels) {
        if (
          panel.id !== currentPanel.id &&
          this.checkCollisions(currentPanel, panel)
        ) {
          collidedPanels.push(panel);
        }
      }
      return collidedPanels;
    },
    computePosition(movedPanel, diff) {
      const currentX = movedPanel.x + this.round(diff.diffX);
      const currentY = movedPanel.y + this.round(diff.diffY);
      const currentPanel = {
        id: movedPanel.id,
        x: currentX,
        y: currentY,
        w: movedPanel.w,
        h: movedPanel.h
      };
      this.$store.commit(
        "setPanel",
        this.scalePanel(currentPanel, 1 / this.scale)
      );
      let collidedPanels = this.getCollidedPanels(currentPanel);
      for (let collidedPanel of collidedPanels) {
        const pos1 = this.getPositions(currentPanel);
        const pos2 = this.getPos2(collidedPanel);
        const horizontalOffset = this.getOffset(pos1[0], pos2[0]);
        const verticalOffset = this.getOffset(pos1[1], pos2[1]);
        if (Math.abs(horizontalOffset) < 50) {
          currentPanel.x = currentPanel.x - horizontalOffset;
          if (
            Math.abs(Math.abs(verticalOffset) - collidedPanel.h) <
            collidedPanel.h - 50
          ) {
            currentPanel.y = collidedPanel.y;
          }
        }
        if (verticalOffset < 0 && verticalOffset > -50) {
          currentPanel.y = pos2[1][1];
        }
        if (verticalOffset > 0 && verticalOffset < 50) {
          currentPanel.y = pos2[1][0] - currentPanel.h;
        }
        if (Math.abs(horizontalOffset) >= 50) {
          currentPanel.x = collidedPanel.x;
          if (
            Math.abs(Math.abs(verticalOffset) - collidedPanel.h) <
            collidedPanel.h - 50
          ) {
            currentPanel.y = pos2[1][1];
          }
        }
        if (
          !this.isPositionValid(currentPanel) ||
          this.hasCollidedPanel(currentPanel)
        ) {
          continue;
        } else {
          break;
        }
      }
      if (
        !this.isPositionValid(currentPanel) ||
        this.hasCollidedPanel(currentPanel)
      ) {
        currentPanel.x = movedPanel.x;
        currentPanel.y = movedPanel.y;
      }
      return currentPanel;
    },
    initBoardWrapperWH() {
      let wrapper = document.getElementById("dashboardWrapper");
      this.boardWrapperHeight = parseInt(getStyle(wrapper, "height")) - 40;
      this.boardWrapperWidth = parseInt(getStyle(wrapper, "width")) - 40;
    },
    loadDashBoardChart() {
      console.log("loadDashBoardChart");
      this.$store.dispatch("loadDashBoardChart", {
        dashBoardId: this.dashBoardId
      });
    },
    fullscreenChange() {
      this.isFullscreen = screenfull.isFullscreen;
      if (!isFullscreen) {
        this.isDashboardFullscreen = false;
      }
      setTimeout(() => {
        this.initBoardWrapperWH();
      }, 50);
    }
  },
  created() {
    this.loadDashboard();
  },
  mounted() {
    if (screenfull.enabled) {
      screenfull.on("change", this.fullscreenChange);
      this.initBoardWrapperWH();
      window.addEventListener("resize", this.initBoardWrapperWH);
    }
  },
  beforeDestroy() {
    screenfull.off("change", this.fullscreenChange);
    window.removeEventListener("resize", this.initBoardWrapperWH, false);
  },
  watch: {
    dashboards() {
      if (this.dashboards && this.dashboards.length > 0) {
        this.dashBoardCode = this.dashboards[0].dashBoardCode;
        this.dashBoardId = this.dashboards[0].dashBoardId;
      } else {
        this.dashBoardCode = null;
        this.dashBoardId = null;
      }
    },
    dashBoardId() {
      if (this.dashBoardId) {
        this.loadDashBoardChart();
      }
    },
    currentRoute() {
      if (
        this.currentRoute.length === 1 &&
        this.currentRoute[0] === "dashboard"
      ) {
        this.loadDashboard();
      }
    }
  }
};
</script>

<style>
#dashboardWrapper {
  padding: 0px 20px;
  height: calc(100vh - 150px);
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  border: 0px solid red;
  margin: 20px 0px;
  margin-left: calc(100vw - 100%);
}
#dashboardWrapper:hover {
  overflow-y: overlay;
}
#dashboardWrapper.dashboard-fullscreen {
  height: 100%;
  width: 100%;
  padding: 20px;
  background: var(--layout-content-bg-color);
}
#dashboard button .icon {
  padding-right: 6px;
}
#dashboard button .dubhe-icon-warn {
  padding-left: 2px;
  color: red;
}
#dashboardWrapper .vdr.active {
  /* border: 1px dashed black; */
  /* outline: 1px dashed black; */
  border: 1px dashed var(--chart-wrapper-border-color);
}
#dashboardWrapper h2 {
  opacity: 0.3;
  padding: 0 0 0 20px;
  z-index: -1;
}
#dashboardWrapper .vdr {
  border-radius: 6px;
  background: var(--chart-wrapper-bg-color);
  border: 1px solid var(--chart-wrapper-border-color);
}
#dashboardWrapper .vdr.active {
  z-index: 100;
}
#dashboardWrapper .title {
  width: 100%;
  height: 36px;
  background-color: var(--chart-wrapper-title-bg-color);
  font-size: 14px;
}
#dashboardWrapper .chart {
  width: 100%;
  height: calc(100% - 36px);
  background-color: transparent;
  color: var(--gray-font-color);
}
</style>
