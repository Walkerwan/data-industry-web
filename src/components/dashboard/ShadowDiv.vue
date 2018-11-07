<template>
    <div class="shadow-div" :style="style"></div>
</template>
<script>
export default {
  props: {
    shadowProps: {
      type: Object,
      default: {}
    }
  },
  computed: {
    style() {
      return {
        top: (this.shadowProps.y || 0) + "px",
        left: (this.shadowProps.x || 0) + "px",
        width: (this.shadowProps.w || 0) + "px",
        height: (this.shadowProps.h || 0) + "px"
      };
    }
  }
};
</script>
<style scoped>
.shadow-div {
  position: absolute;
  background-color: var(--shadow-bg-color);
}
</style>

