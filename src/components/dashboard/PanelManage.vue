<template>
  <div class="panel-manage">
    <div v-if="showDeleteConfirm" class="panel-manage-info flex-row">
      <div>
        <Icon class="panel-manage-info-warn" size=12 custom="dubhe-iconfont dubhe-icon-warn"></Icon>
        <span v-if="haveChart">当前仪表盘下存在图表，请确认是否删除？</span>
        <span v-if="!haveChart">请确认是否删除？</span>
      </div>
      <div class="flex-empty"></div>
      <div>
        <Button class="ghost-button" @click="confirm">确认</Button>
        <Button @click="cancel" type="primary" class="panel-manage-info-cancel ghost-button">取消</Button>
      </div>
    </div>
    <div class="panel-manage-search-wrapper">
      <Input @on-change="searchDashboard" class="panel-manage-search" placeholder="请输入仪表盘名称搜索">
      <Icon size=12 custom="dubhe-iconfont dubhe-icon-search" slot="append"></Icon>
      </Input>
    </div>
    <div class="panel-manage-dashboards">
      <div @click="addEmptyDashboard" class="panel-manage-dashboard panel-manage-dashboard-create">
        <Icon size=30 custom="panel-manage-dashboard-add dubhe-iconfont dubhe-icon-add-dashboard"></Icon>
        <div class="panel-manage-dashboard-create-text">
          <span>创建仪表板</span>
        </div>
      </div>
      <div v-for="dashboard in dashboards" class="panel-manage-dashboard">
        <a>
          <Icon @click="deleteDashboard(dashboard)" size=16 custom="panel-manage-dashboard-delete dubhe-iconfont dubhe-icon-delete"></Icon>
        </a>
        <div class="panel-manage-dashboard-center">
          <div style="panel-manage-dashboard-center-inner">
            <Icon size=16 custom="dubhe-iconfont dubhe-icon-chart"></Icon>
            <div class="panel-manage-dashboard-center-num">
              {{dashboard.haveChartNum}}
            </div>
          </div>
        </div>
        <a v-if="nameEdittingId !== dashboard.dashBoardCode">
          <Icon @click="nameEdit(dashboard.dashBoardCode)" size=16 custom="panel-manage-dashboard-edit dubhe-iconfont dubhe-icon-edit"></Icon>
        </a>
        <div v-if="nameEdittingId !== dashboard.dashBoardCode" class="panel-manage-dashboard-name">
          {{dashboard.dashBoardName}}
        </div>
        <Input v-if="nameEdittingId === dashboard.dashBoardCode" class="panel-manage-dashboard-name-input" :maxlength="20" @on-blur="changeName(dashboard.dashBoardId, $event)" :value="dashboard.dashBoardName"></Input>
      </div>
    </div>
  </div>
</template>
<script>
import uuid from "../../utils/uuid.js";

export default {
  data() {
    return {
      edittingNewDashboardName: false,
      nameEdittingId: null,
      showDeleteConfirm: false,
      toDeleteDashboardId: null
    };
  },
  computed: {
    dashboards() {
      return this.$store.getters.getDashboards;
    }
  },
  methods: {
    searchDashboard(e) {
      this.$store.dispatch("loadDashBoard", { dashBoardName: e.target.value });
    },
    addEmptyDashboard() {
      const newId = uuid();
      this.$store.commit("addEmptyDashboard", {
        dashBoardCode: newId,
        dashBoardName: "",
        belongsUserCode: "张三",
        haveChartNum: 0
      });
      this.nameEdittingId = newId;
      this.edittingNewDashboardName = true;
    },
    deleteDashboard(dashboard) {
      this.toDeleteDashboardId = dashboard.dashBoardId;
      this.showDeleteConfirm = true;
      if (dashboard.haveChartNum && dashboard.haveChartNum > 0) {
        this.haveChart = true;
      } else {
        this.haveChart = false;
      }
    },
    changeName(dashBoardId, event) {
      if (!event.target.value) {
        this.nameEdittingId = dashBoardId;
        return;
      }
      if (this.edittingNewDashboardName) {
        this.$store
          .dispatch("createDashboard", {
            dashBoardName: event.target.value
          })
          .then(() => {
            this.nameEdittingId = null;
            this.$store.dispatch("loadDashBoard");
          });
        return;
      }
      this.$store
        .dispatch("updateDashBoardInfo", {
          dashBoardId: dashBoardId,
          dashBoardName: event.target.value
        })
        .then(() => {
          this.nameEdittingId = null;
          this.$store.dispatch("loadDashBoard");
        });
    },
    nameEdit(dashBoardCode) {
      this.nameEdittingId = dashBoardCode;
    },
    confirm() {
      this.$store
        .dispatch("updateDashBoardInfo", {
          dashBoardId: this.toDeleteDashboardId
        })
        .then(() => {
          this.showDeleteConfirm = false;
          this.$store.dispatch("loadDashBoard");
        });
    },
    cancel() {
      this.toDeleteDashboardId = null;
      this.showDeleteConfirm = false;
    }
  }
};
</script>
<style scoped>
.panel-manage-dashboard-add {
  position: absolute;
  right: 34px;
  top: 25px;
}

.panel-manage-dashboard-create-text {
  position: absolute;
  top: 67px;
  font-size: 14px;
  text-align: center;
  width: 100%;
}

.panel-manage-dashboard.panel-manage-dashboard-create {
  border: 1px dashed var(--default-border-color);
  cursor: pointer;
}

.panel-manage-dashboard.panel-manage-dashboard-create:hover {
  color: var(--highlight-color);
  background: transparent;
}

.panel-manage-dashboard-name-input {
  height: 20px;
  padding: 0px;
  margin: 0px;
  position: absolute;
  left: 12px;
  bottom: 8px;
}

.panel-manage-dashboard-name {
  position: absolute;
  left: 28px;
  bottom: 8px;
  width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel-manage-dashboard-edit {
  cursor: pointer;
  position: absolute;
  left: 10px;
  bottom: 8px;
  opacity: 0;
}

.panel-manage-dashboard-center-num {
  position: absolute;
  top: 19px;
  width: 100%;
  text-align: center;
  font-size: 16px;
}

.panel-manage .ivu-icon {
  padding: 2px;
}

.panel-manage-dashboard-center-inner {
  position: relative;
  width: 100%;
}

.panel-manage-dashboard-center {
  position: absolute;
  right: 28px;
  top: 16px;
  width: 54px;
  height: 54px;
  border-radius: 6px;
  background: var(--panel-manage-dashboard-center-bg-color);
}

.panel-manage-dashboard-delete {
  position: absolute;
  right: 0px;
  top: 0px;
  opacity: 0;
}

.panel-manage-info-warn {
  color: var(--status-to-process-color);
  margin: 0px 10px 0px 20px;
}

.panel-manage-info .ivu-btn.panel-manage-info-cancel {
  margin-right: 20px;
}

.panel-manage-info {
  height: 20px;
  line-height: 20px;
  width: 100%;
  position: absolute;
  top: 42px;
  left: 0px;
  background: rgba(231, 152, 35, 0.4);
  font-size: 12px;
}

.panel-manage-info .ivu-btn {
  font-size: 12px;
  margin: 0px 5px;
  padding: 0px;
}

.panel-manage-info .ivu-btn-primary {
  color: var(--highlight-color);
}

.panel-manage-search-wrapper {
  width: 100%;
  height: 32px;
  margin: 5px 0px 10px 0px;
  position: relative;
}

.panel-manage-search {
  width: 240px;
}

.panel-manage-dashboards {
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: space-between;
  flex-wrap: wrap;
  overflow-y: hidden;
  padding-right: 10px;
}

.panel-manage-dashboards:hover {
  overflow-y: overlay;
}

.panel-manage-dashboard {
  width: 110px;
  height: 110px;
  background: transparent;
  margin: 10px;
  position: relative;
}

.panel-manage-dashboard:hover {
  background: var(--panel-manage-dashboard-hover-bg-color);
}

.panel-manage-dashboard:hover .panel-manage-dashboard-delete,
.panel-manage-dashboard:hover .panel-manage-dashboard-edit {
  opacity: 1;
}

.panel-manage-dashboard:nth-child(4n + 1) {
  margin-left: 0px;
}

.panel-manage-dashboard:nth-child(4n) {
  margin-right: 0px;
}
</style>
<style>
.panel-manage-dashboard .ivu-input {
  height: 20px;
  padding: 0px;
  margin: 0px;
  width: 86px;
}
</style>


