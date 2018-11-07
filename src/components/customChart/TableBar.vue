<template>
  <div class="tableBar" :style="style">
    <div class="flex-row rangking-row">
      <div class="rangking">排名</div>
      <div class="name">{{data.fields[0]}}</div>
      <div class="percent">{{data.fields[1]}}</div>
      <div class="value">{{data.fields[2]}}</div>
    </div>
    <div v-for="(item,index) in data.data" class="flex-row rangking-row">
      <div class="rangking">{{index + 1}}</div>
      <div class="name">{{item.name}}</div>
      <div class="percent flex-row">
        <div class="progress flex-row">
          <transition v-on:before-enter="beforeEnter" v-on:enter="enter(arguments, {width:Math.round(item.value / data.data[0].value * 100) + '%'})" v-bind:css="false">
            <div v-if="show" class="progress-bar"></div>
          </transition>
        </div>
        <div class="percentText">{{Math.round(item.value/total * 100) + "%"}}</div>
      </div>
      <div class="value">{{item.value.toLocaleString()}}</div>
    </div>
  </div>
</template>
<script>
import Velocity from "velocity-animate";
export default {
  name: "ZcmorefunTableBar",
  data() {
    return {
      show: false
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          fields: {
            type: Array,
            default: () => {
              return ["场馆名称", "关注人群占比", "人群规模"];
            }
          },
          data: {
            type: Array,
            default: () => {
              return [];
            }
          }
        };
      }
    },
    width: {
      type: Number,
      default: 933
    },
    height: {
      type: Number,
      default: 362
    }
  },
  computed: {
    style() {
      return {
        width: this.width + "px",
        height: this.height + "px"
      };
    },
    total() {
      let total = 0;
      this.data.data.forEach(element => {
        total += element.value;
      });
      return total;
    }
  },
  methods: {
    beforeEnter: function(el) {
      el.style.width = "0%";
    },
    enter(args, styles) {
      Velocity(args[0], styles, { duration: 300 });
      // Velocity(args[0], {}, { complete: args[1] });
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 100);
  }
};
</script>
<style scoped>
.tableBar {
  font-size: 14px;
}
.rangking {
  width: 13%;
  padding-left: 25px;
}
.rangking-row {
  height: 9%;
}
.name {
  width: 19%;
}
.percent {
  width: 55%;
}
.progress {
  width: calc(100% - 60px);
  background: transparent;
  height: 20px;
}
.progress-bar {
  height: 14px;
  background-color: #3fbeff;
  border-radius: 3px;
}
.percentText {
  width: 60px;
  display: inline-block;
  margin-left: 5px;
}
/* .value{
    width: 
} */
</style>

