<template>
  <vue-word-cloud :data="data"></vue-word-cloud>
</template>
<script>
import VueWordCloud from "vue-wordcloud";
export default {
  name: "ZcmorefunWordCloud",
  components: {
    VueWordCloud
  },
  props: {
    data: Array,
    width: {
      type: Number,
      default: 461
    },
    height: {
      type: Number,
      default: 325
    }
  }
};
</script>
