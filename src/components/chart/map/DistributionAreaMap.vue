<template>
  <div>
    <county-map :data="mapOption" :style="style"></county-map>
  </div>
</template>
<script>
import CountyMap from "./CountyMap";
export default {
  name: "ZcmorefunDistributionAreaMap",
  components: {
    CountyMap
  },
  props: {
    data: {
      type: Object
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
    maxValue() {
      let maxValue = 0;
      for (let item of this.data.data) {
        if (item.value > maxValue) {
          maxValue = item.value;
        }
      }
      maxValue = Math.ceil(maxValue / 5);
      const numLen = String(maxValue).length;
      const denominator = Math.pow(10, numLen - 1);
      maxValue = Math.ceil(maxValue / denominator);
      maxValue = maxValue * denominator * 5;
      return maxValue;
    },
    mapOption() {
      const mapOption = {
        tooltip: {
          trigger: "item"
        },
        visualMap: {
          min: 0,
          max: this.maxValue,
          splitNumber: 5,
          inRange: {
            color: ["#db6666", "#ebe288", "#c1db66"].reverse()
          },
          textStyle: {
            color: "#737373"
          }
        },
        series: [
          {
            name: this.data.name || "分布区域地图",
            type: "map",
            map: this.data.area,
            layoutCenter: ["50%", "50%"],
            layoutSize: 480,
            itemStyle: {
              normal: {
                borderWidth: 1, //区域边框宽度
                borderColor: "#737373", //区域边框颜色
                label: {
                  show: true,
                  color: "#737373"
                },
                areaColor: ["#2c74d3"]
              },
              emphasis: {
                label: {
                  show: true,
                  color: "#fff"
                },
                areaColor: "#e7c28b"
              }
            },
            data: this.data.data
          }
        ]
      };
      return mapOption;
    }
  },
  mounted() {
    console.log("AreaMap mounted");
    // console.log("mapOption", JSON.stringify(this.mapOption));
  }
};
</script>
