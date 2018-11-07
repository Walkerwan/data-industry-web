<template>
  <div class="vdr zcmorefun-vdr" :style="style" :class="{
      draggable: draggable,
      resizable: resizable,
      active: enabled,
      dragging: dragging,
      resizing: resizing
    }" @mousedown.stop="elmDown" @touchstart.stop="elmDown" @dblclick="fillParent">
    <div v-for="handle in handles" v-if="resizable" class="handle" :key="handle" :class="'handle-' + handle" :style="{ display: enabled ? 'block' : 'none'}" @mousedown.stop.prevent="handleDown(handle, $event)" @touchstart.stop.prevent="handleDown(handle, $event)">
      <Icon v-if="handle==='br'" size=16 custom="dubhe-iconfont dubhe-icon-zoom"></Icon>
    </div>
    <div class="title flex-row">
      <p v-if="!nameEditting" class="chart-name">{{name}}<Icon @click="editName()" class="edit-name" size=14 type="md-create"></Icon>
      </p>
      <Input v-if="nameEditting" @on-blur="nameEditted" :value="name" class="chart-name-input"></Input>
      <div class="flex-empty dragHandle"></div>
      <Dropdown placement="bottom-end">
        <a href="javascript:void(0)">
          <Icon size=16 style="margin-right: 6px;" class="icon" custom="dubhe-iconfont dubhe-icon-more-operation"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="exportCsv">导出csv</DropdownItem>
          <DropdownItem @click.native="shareChart">分享图表</DropdownItem>
          <DropdownItem @click.native="fullscreen">全屏显示</DropdownItem>
          <DropdownItem @click.native="removeChart">移除图表</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div ref="fullscreenChart" class="chart" :class="isChartFullscreen===true?'fullscreenChart':''">
      <div v-if="isChartFullscreen===true">{{title}}</div>
      <slot></slot>
    </div>
    <!-- <slot></slot> -->
  </div>
</template>

<script>
import { matchesSelectorToParentElements } from "../../utils/dom";
import uuid from "../../utils/uuid.js";
import screenfull from "screenfull";
import { ExportToCsv } from "export-to-csv";

export default {
  replace: true,
  name: "VueDraggableResizable",
  props: {
    chart: {
      type: Object,
      default: {}
    },
    isDashboardFullscreen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    chartId: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: uuid()
    },
    active: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    w: {
      type: Number,
      default: 200,
      validator: function(val) {
        return val > 0;
      }
    },
    h: {
      type: Number,
      default: 200,
      validator: function(val) {
        return val > 0;
      }
    },
    minw: {
      type: Number,
      default: 50,
      validator: function(val) {
        return val >= 0;
      }
    },
    minh: {
      type: Number,
      default: 50,
      validator: function(val) {
        return val >= 0;
      }
    },
    x: {
      type: Number,
      default: 0,
      validator: function(val) {
        return typeof val === "number";
      }
    },
    y: {
      type: Number,
      default: 0,
      validator: function(val) {
        return typeof val === "number";
      }
    },
    z: {
      type: [String, Number],
      default: "auto",
      validator: function(val) {
        let valid = typeof val === "string" ? val === "auto" : val >= 0;
        return valid;
      }
    },
    handles: {
      type: Array,
      default: function() {
        return ["mr", "br", "bm"]; //["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"]
      },
      validator: function(val) {
        var s = new Set(["mr", "br", "bm"]);

        return new Set(val.filter(h => s.has(h))).size === val.length;
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String,
      default: "both",
      validator: function(val) {
        return ["x", "y", "both"].indexOf(val) !== -1;
      }
    },
    grid: {
      type: Array,
      default: function() {
        return [1, 1];
      }
    },
    parent: {
      type: Boolean,
      default: false
    },
    maximize: {
      type: Boolean,
      default: false
    }
  },

  created: function() {
    this.parentX = 0;
    this.parentW = 9999;
    this.parentY = 0;
    this.parentH = 9999;

    this.mouseX = 0;
    this.mouseY = 0;

    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.mouseOffX = 0;
    this.mouseOffY = 0;

    this.elmX = 0;
    this.elmY = 0;

    this.elmW = 0;
    this.elmH = 0;
  },
  mounted: function() {
    if (screenfull.enabled) {
      screenfull.on("change", this.fullscreenChange);
    }
    document.documentElement.addEventListener(
      "mousemove",
      this.handleMove,
      true
    );
    document.documentElement.addEventListener("mousedown", this.deselect, true);
    document.documentElement.addEventListener("mouseup", this.handleUp, true);

    // touch events bindings
    document.documentElement.addEventListener(
      "touchmove",
      this.handleMove,
      true
    );
    document.documentElement.addEventListener(
      "touchend touchcancel",
      this.deselect,
      true
    );
    document.documentElement.addEventListener(
      "touchstart",
      this.handleUp,
      true
    );

    this.elmX = parseInt(this.$el.style.left);
    this.elmY = parseInt(this.$el.style.top);
    this.elmW = this.$el.offsetWidth || this.$el.clientWidth;
    this.elmH = this.$el.offsetHeight || this.$el.clientHeight;

    this.reviewDimensions();
  },
  beforeDestroy: function() {
    screenfull.off("change", this.fullscreenChange);
    document.documentElement.removeEventListener(
      "mousemove",
      this.handleMove,
      true
    );
    document.documentElement.removeEventListener(
      "mousedown",
      this.deselect,
      true
    );
    document.documentElement.removeEventListener(
      "mouseup",
      this.handleUp,
      true
    );

    // touch events bindings removed
    document.documentElement.addEventListener(
      "touchmove",
      this.handleMove,
      true
    );
    document.documentElement.addEventListener(
      "touchend touchcancel",
      this.deselect,
      true
    );
    document.documentElement.addEventListener(
      "touchstart",
      this.handleUp,
      true
    );
  },

  data: function() {
    return {
      name: this.chart.chartAlias || this.chart.chartName,
      nameEditting: false,
      isFullscreen: false,
      isChartFullscreen: false,
      top: this.y,
      left: this.x,
      width: this.w,
      height: this.h,
      resizing: false,
      dragging: false,
      enabled: this.active,
      handle: null,
      zIndex: this.z,
      totalDiffX: 0,
      totalDiffY: 0,
      rawX: this.x,
      rawY: this.y,
      rawW: this.w,
      rawH: this.h
    };
  },

  methods: {
    nameEditted(e) {
      const newName = e.target.value;
      this.$store.dispatch("updateChartNameByChartId", {
        chartId: this.chartId,
        chartAlias: newName
      }).then(() => {
        this.name = newName;
        this.nameEditting = false;
      });
    },
    editName() {
      this.nameEditting = true;
    },
    fullscreenChange() {
      this.isFullscreen = screenfull.isFullscreen;
      if (!this.isFullscreen) {
        this.isChartFullscreen = false;
      }
    },
    removeChart() {
      console.log("removeChart");
      this.$store.dispatch("removePanel", this.id);
      this.$emit("removeChart");
    },
    fullscreen() {
      // const element = this.$slots.default[0].elm;
      const element = this.$refs.fullscreenChart;
      if (screenfull.enabled) {
        this.isChartFullscreen = true;
        screenfull.request(element);
      }
    },
    exportCsv() {
      const options = {
        fieldSeparator: ",",
        filename: this.title,
        quoteStrings: '"',
        decimalseparator: ".",
        showLabels: true,
        showTitle: true,
        title: this.title,
        useBom: true,
        useKeysAsHeaders: true
      };

      const csvExporter = new ExportToCsv(options);
      const propData = this.$slots.default[0].componentInstance.data;
      const data = Array.isArray(propData) ? propData : propData.data;
      csvExporter.generateCsv(data);
    },
    shareChart() {
      const compName = this.$slots.default[0].componentInstance.$options.name;
      const propData = this.$slots.default[0].componentInstance.data;
      const params = {
        chartType: this.toShortName(compName),
        chartName: this.title,
        data: propData
      };
      console.log("shareChart params", JSON.stringify(params, null, 4));
      // code here, send post to get url
    },
    toShortName(name) {
      return this.toFirstLowerCase(name.replace("Zcmorefun", ""));
    },
    toFirstLowerCase(str) {
      return str.substring(0, 1).toLowerCase() + str.substring(1);
    },
    reviewDimensions: function() {
      if (this.minw > this.w) this.width = this.minw;

      if (this.minh > this.h) this.height = this.minh;

      if (this.parent) {
        const parentW = parseInt(this.$el.parentNode.clientWidth, 10);
        const parentH = parseInt(this.$el.parentNode.clientHeight, 10);

        this.parentW = parentW;
        this.parentH = parentH;

        if (this.w > this.parentW) this.width = parentW;

        // if (this.h > this.parentH) this.height = parentH;

        if (this.x + this.w > this.parentW) this.width = parentW - this.x;

        // if (this.y + this.h > this.parentH) this.height = parentH - this.y;
      }

      this.elmW = this.width;
      this.elmH = this.height;

      this.$emit("resizing", this.left, this.top, this.width, this.height);
    },
    elmDown: function(e) {
      const target = e.target || e.srcElement;

      if (this.$el.contains(target)) {
        if (
          (this.dragHandle &&
            !matchesSelectorToParentElements(
              target,
              this.dragHandle,
              this.$el
            )) ||
          (this.dragCancel &&
            matchesSelectorToParentElements(target, this.dragCancel, this.$el))
        ) {
          return;
        }

        e.preventDefault();

        this.reviewDimensions();

        if (!this.enabled) {
          this.enabled = true;

          this.$emit("activated");
          this.$emit("update:active", true);
        }

        if (this.draggable) {
          this.dragging = true;
          this.totalDiffX = 0;
          this.totalDiffY = 0;
          this.rawX = this.left;
          this.rawY = this.top;
        }
      }
    },
    deselect: function(e) {
      if (e.type.indexOf("touch") !== -1) {
        this.mouseX = e.changedTouches[0].clientX;
        this.mouseY = e.changedTouches[0].clientY;
      } else {
        this.mouseX =
          e.pageX || e.clientX + document.documentElement.scrollLeft;
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;
      }

      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;

      const target = e.target || e.srcElement;
      const regex = new RegExp("handle-([trmbl]{2})", "");

      if (!this.$el.contains(target) && !regex.test(target.className)) {
        if (this.enabled) {
          this.enabled = false;

          this.$emit("deactivated");
          this.$emit("update:active", false);
        }
      }
    },
    handleDown: function(handle, e) {
      this.handle = handle;

      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();

      this.resizing = true;
      this.rawW = this.w;
      this.rawH = this.h;
      this.totalDiffX = 0;
      this.totalDiffY = 0;
    },
    fillParent: function(e) {
      if (!this.parent || !this.resizable || !this.maximize) return;

      let done = false;

      const animate = () => {
        if (!done) {
          window.requestAnimationFrame(animate);
        }

        if (this.axis === "x") {
          if (this.width === this.parentW && this.left === this.parentX)
            done = true;
        } else if (this.axis === "y") {
          if (this.height === this.parentH && this.top === this.parentY)
            done = true;
        } else if (this.axis === "both") {
          if (
            this.width === this.parentW &&
            this.height === this.parentH &&
            this.top === this.parentY &&
            this.left === this.parentX
          )
            done = true;
        }

        if (this.axis === "x" || this.axis === "both") {
          if (this.width < this.parentW) {
            this.width++;
            this.elmW++;
          }

          if (this.left > this.parentX) {
            this.left--;
            this.elmX--;
          }
        }

        if (this.axis === "y" || this.axis === "both") {
          if (this.height < this.parentH) {
            this.height++;
            this.elmH++;
          }

          if (this.top > this.parentY) {
            this.top--;
            this.elmY--;
          }
        }

        this.$emit("resizing", this.left, this.top, this.width, this.height);
      };

      window.requestAnimationFrame(animate);
    },
    handleMove: function(e) {
      const isTouchMove = e.type.indexOf("touchmove") !== -1;
      this.mouseX = isTouchMove
        ? e.touches[0].clientX
        : e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouseY = isTouchMove
        ? e.touches[0].clientY
        : e.pageY || e.clientY + document.documentElement.scrollTop;

      let diffX = this.mouseX - this.lastMouseX + this.mouseOffX;
      let diffY = this.mouseY - this.lastMouseY + this.mouseOffY;

      this.mouseOffX = this.mouseOffY = 0;

      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;

      let dX = diffX;
      let dY = diffY;
      this.elmX = this.x;
      this.elmY = this.y;
      this.elmW = this.w;
      this.elmH = this.h;

      if (this.resizing) {
        if (this.handle.indexOf("t") >= 0) {
          if (this.elmH - dY < this.minh)
            this.mouseOffY = dY - (diffY = this.elmH - this.minh);
          else if (this.parent && this.elmY + dY < this.parentY)
            this.mouseOffY = dY - (diffY = this.parentY - this.elmY);
          this.elmY += diffY;
          this.elmH -= diffY;
        }

        if (this.handle.indexOf("b") >= 0) {
          if (this.elmH + dY < this.minh)
            this.mouseOffY = dY - (diffY = this.minh - this.elmH);
          this.elmH += diffY;
        }

        if (this.handle.indexOf("l") >= 0) {
          if (this.elmW - dX < this.minw)
            this.mouseOffX = dX - (diffX = this.elmW - this.minw);
          else if (this.parent && this.elmX + dX < this.parentX)
            this.mouseOffX = dX - (diffX = this.parentX - this.elmX);
          this.elmX += diffX;
          this.elmW -= diffX;
        }

        if (this.handle.indexOf("r") >= 0) {
          if (this.elmW + dX < this.minw)
            this.mouseOffX = dX - (diffX = this.minw - this.elmW);
          else if (this.parent && this.elmX + this.elmW + dX > this.parentW)
            this.mouseOffX =
              dX - (diffX = this.parentW - this.elmX - this.elmW);
          this.elmW += diffX;
        }

        this.totalDiffX += diffX;
        this.totalDiffY += diffY;

        this.left = Math.round(this.elmX / this.grid[0]) * this.grid[0];
        this.top = Math.round(this.elmY / this.grid[1]) * this.grid[1];

        this.width = Math.round(this.elmW / this.grid[0]) * this.grid[0];
        this.height = Math.round(this.elmH / this.grid[1]) * this.grid[1];

        this.$emit(
          "resize",
          {
            id: this.id,
            x: this.left,
            y: this.top,
            w: this.rawW,
            h: this.rawH
          },
          { diffX: this.totalDiffX, diffY: this.totalDiffY }
        );
      } else if (this.dragging) {
        if (this.parent) {
          if (this.elmX + dX < this.parentX)
            this.mouseOffX = dX - (diffX = this.parentX - this.elmX);
          else if (this.elmX + this.elmW + dX > this.parentW)
            this.mouseOffX =
              dX - (diffX = this.parentW - this.elmX - this.elmW);

          if (this.elmY + dY < this.parentY)
            this.mouseOffY = dY - (diffY = this.parentY - this.elmY);
          else if (this.elmY + this.elmH + dY > this.parentH) {
            this.parentH = this.elmY + this.elmH + dY;
            this.$el.parentNode.style.height =
              this.elmY + this.elmH + dY + "px";
          }
        }

        this.elmX += diffX;
        this.elmY += diffY;

        this.totalDiffX += diffX;
        this.totalDiffY += diffY;

        if (this.axis === "x" || this.axis === "both") {
          this.left = Math.round(this.elmX / this.grid[0]) * this.grid[0];
        }
        if (this.axis === "y" || this.axis === "both") {
          this.top = Math.round(this.elmY / this.grid[1]) * this.grid[1];
        }
        this.$emit(
          "dragStarted",
          {
            id: this.id,
            x: this.rawX,
            y: this.rawY,
            w: this.width,
            h: this.height
          },
          { diffX: this.totalDiffX, diffY: this.totalDiffY }
        );
      }
    },
    handleUp: function(e) {
      if (e.type.indexOf("touch") !== -1) {
        this.lastMouseX = e.changedTouches[0].clientX;
        this.lastMouseY = e.changedTouches[0].clientY;
      }
      this.handle = null;
      if (this.resizing) {
        this.resizing = false;
        this.$emit("resizestop", {
          id: this.id,
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
          rawX: this.rawX,
          rawY: this.rawY,
          rawW: this.rawW,
          rawH: this.rawH
        });
      }
      if (this.dragging) {
        this.dragging = false;
        // this.totalDiffX = 0;
        // this.totalDiffY = 0;
        this.$emit("dragStop", {
          id: this.id,
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
          rawX: this.rawX,
          rawY: this.rawY,
          rawW: this.rawW,
          rawH: this.rawH
        });
      }

      this.elmX = this.left;
      this.elmY = this.top;
    }
  },

  computed: {
    style: function() {
      return {
        top: this.y + "px",
        left: this.x + "px",
        width: this.w + "px",
        height: this.h + "px"
        // zIndex: this.zIndex
      };
    }
  },

  watch: {
    active: function(val) {
      this.enabled = val;
    },
    z: function(val) {
      if (val >= 0 || val === "auto") {
        this.zIndex = val;
      }
    },
    x: function(val) {
      this.left = val;
    },
    y: function(val) {
      this.top = val;
    },
    w: function(val) {
      this.width = val;
    },
    h: function(val) {
      this.height = val;
    }
  }
};
</script>

<style>
.title .chart-name-input .ivu-input {
  height: 24px;
}
</style>

<style scoped>
#dashboardWrapper .chart.fullscreenChart {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: var(--layout-content-bg-color);
}
#dashboardWrapper .dragHandle {
  height: 100%;
  cursor: move;
}
.title {
  width: 100%;
  height: 36px;
  background-color: var(--chart-wrapper-title-bg-color);
  padding: 5px 5px 5px 10px;
}
.title .chart-name {
  cursor: text;
}
.title .chart-name-input {
  width: 150px;
}

.title .chart-name:hover .edit-name {
  opacity: 1;
}
.title .chart-name .edit-name {
  margin-left: 6px;
  cursor: pointer;
  opacity: 0;
}
.title .edit-name:hover {
  color: var(--highlight-color);
}
.vdr {
  position: absolute;
  box-sizing: border-box;
  background: gray;
}
.handle {
  box-sizing: border-box;
  display: none;
  position: absolute;
  width: 10px;
  height: 10px;
  font-size: 1px;
  background: transparent;
  border: none;
  z-index: 100;
}
.handle-tl {
  top: -10px;
  left: -10px;
  cursor: nw-resize;
}
.handle-tm {
  top: -10px;
  cursor: n-resize;
  width: 100%;
}
.handle-tr {
  top: -10px;
  right: -10px;
  cursor: ne-resize;
}
.handle-ml {
  height: 100%;
  left: -10px;
  cursor: w-resize;
}
.handle-mr {
  height: calc(100% - 16px);
  right: 0px;
  cursor: e-resize;
}
.handle-bl {
  bottom: -10px;
  left: -10px;
  cursor: sw-resize;
}
.handle-bm {
  width: calc(100% - 16px);
  bottom: 0px;
  cursor: s-resize;
}
.handle-br {
  width: 16px;
  height: 16px;
  bottom: 0px;
  right: 0px;
  cursor: se-resize;
}
@media only screen and (max-width: 1080px) {
  /* For mobile phones: */
  [class*="handle-"]:before {
    content: "";
    left: -10px;
    right: -10px;
    bottom: -10px;
    top: -10px;
    position: absolute;
  }
  .vdr {
    width: 100% !important;
    top: 0px !important;
    left: 0px !important;
    position: relative;
    height: calc(50vh - 5px) !important;
  }
  .vdr + .vdr {
    margin-top: 10px !important;
  }
}
@media (resolution: 360dpi) {
  /* For mobile phones: */
  [class*="handle-"]:before {
    content: "";
    left: -10px;
    right: -10px;
    bottom: -10px;
    top: -10px;
    position: absolute;
  }
  .vdr {
    width: 100% !important;
    top: 0px !important;
    left: 0px !important;
    position: relative;
    height: calc(50vh - 5px) !important;
  }
  .vdr + .vdr {
    margin-top: 10px !important;
  }
}
</style>
