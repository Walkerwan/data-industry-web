<template>
    <div class="myResize">
        <div class="bottom"></div>
        <div class="right"></div>
        <div class="bottom-right"></div>
        <div class="content"></div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.myResize {
  width: 300px;
  height: 300px;
  position: relative;
  border-top: 3px solid #00f;
  border-left: 3px solid #00f;
}
.myResize .bottom,
.myResize .right,
.myResize .bottom-right {
  position: absolute;
  background: #00f;
}
.myResize .bottom {
  width: calc(100% - 6px);
  height: 3px;
  bottom: 0;
  cursor: s-resize;
}
.myResize .right {
  width: 3px;
  height: calc(100% - 6px);
  right: 0;
  cursor: e-resize;
}
.myResize .bottom-right {
  width: 6px;
  height: 6px;
  right: 0;
  bottom: 0;
  cursor: se-resize;
}
.myResize .content {
  width: calc(100% - 3px);
  height: calc(100% - 3px);
  position: absolute;
  background: #efefef;
}
</style>

