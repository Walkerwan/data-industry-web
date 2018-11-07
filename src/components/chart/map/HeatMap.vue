<template>
  <div>
    <county-map :data="mapOption" :style="{width:'616px', height:'480px'}"></county-map>
  </div>
</template>
<script>
import CountyMap from "./CountyMap";
export default {
  name: "ZcmorefunHeatMap",
  components: {
    CountyMap
  },
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    mapOption() {
      const mapOption = {
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            name: this.data.name || "热力图",
            type: "heatmap",
            coordinateSystem: "geo",
            data: this.data.data
          }
        ],
        visualMap: {
          min: 0,
          max: 5000,
          splitNumber: 5,
          inRange: {
            color: ["#db6666", "#ebe288", "#c1db66"].reverse()
          },
          textStyle: {
            color: "#737373"
          }
        },
        geo: {
          map: this.data.area,
          label: {
            show: true,
            color: "#fff",
            emphasis: {
              color: "#fff"
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#3ca7df",
              borderColor: "#fff"
            },
            emphasis: {
              areaColor: "#3ca7df",
              borderColor: "#fff"
            }
          }
        }
      };
      return mapOption;
    }
  }
};
</script>
