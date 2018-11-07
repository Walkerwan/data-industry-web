<template>
  <div>
    <div>{{title}}</div>
    <component class="chart" v-bind:is="type" :width="width" :height="height" :data="data"></component>
  </div>
</template>
<script>
import chartCompRegister from "../common/register/chartCompRegister.js";
export default {
  components: {
    ...chartCompRegister
  },
  props: {
    data: {
      type: Array || Object,
      default: () => {
        return [
          { value: 247724, name: "青少年U9" },
          { value: 37990, name: "成人" },
          { value: 3118, name: "青少年U11" }
        ];
      }
    },
    title: {
      type: String,
      default: "***表标题"
    },
    type: {
      type: String,
      default: "component0"
    }
  },
  computed: {
    width() {
      return 1800;
    },
    height() {
      return 800;
    }
  }
};
</script>
<style scoped>
</style>


