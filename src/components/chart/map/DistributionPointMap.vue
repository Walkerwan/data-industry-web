<template>
  <div>
    <county-map :data="mapOption" :style="style"></county-map>
  </div>
</template>
<script>
import CountyMap from "./CountyMap";
export default {
  name: "ZcmorefunDistributionPointMap",
  components: {
    CountyMap
  },
  props: {
    data: Object,
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
    mapOption() {
      const mapOption = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name + " : " + params.value[2];
          }
        },
        series: [
          {
            name: this.data.name || "分布点图",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.data.data
          }
        ],
        visualMap: {
          min: 0,
          max: 5000,
          splitNumber: 5,
          realtime: false,
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
            color: "#19b05d",
            emphasis: {
              color: "#19b05d"
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#9fdeff",
              borderColor: "#fff"
            },
            emphasis: {
              areaColor: "#9fdeff",
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
