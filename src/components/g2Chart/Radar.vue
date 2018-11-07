<template>
  <div>
    <Chart :width="width" :height="height" :data="dv" />
  </div>
</template>
<script>
import createG2 from "g2-vue";
import { DataSet } from "@antv/data-set";

const Chart = createG2(chart => {
  const colors = ["#8cc9d1", "#85a5fb", "#718cd2", "#5d73b4", "#989898"];
  const colors_area = ["#8cc9d1", "#85a5fb", "#718cd2", "#5d73b4", "#989898"];
  chart.tooltip({
    itemTpl: `<li data-index={index}>
      <span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
      {value}
      </li>`
  });
  chart.scale("value", {
    min: 0,
    max: 5
  });
  chart.coord("polar", {
    radius: 0.8
  });
  chart.axis("name", {
    line: null,
    tickLine: null,
    grid: {
      lineStyle: {
        lineDash: null
      },
      hideFirstLine: false
    }
  });
  chart.axis("value", {
    line: null,
    tickLine: null,
    grid: {
      type: "polygon",
      lineStyle: {
        lineDash: null
      },
      alternateColor: "rgba(0, 0, 0, 0.04)"
    }
  });
  chart.legend(false);
  chart
    .line()
    .position("name*value")
    .color("key", colors)
    .size(2);
  chart
    .point()
    .position("name*value")
    .color("key", colors)
    .shape("circle")
    .size(4)
    .style({
      stroke: "#fff",
      lineWidth: 1,
      fillOpacity: 1
    });
  chart
    .area()
    .position("name*value")
    .color("key", colors);
  chart.render();
});

export default {
  name: "ZcmorefunRadar",
  components: {
    Chart
  },
  computed: {
    dv() {
      var ds = new DataSet();
      var dv = ds.createView().source(this.data);
      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
      dv.transform({
        type: "fold",
        fields: ["value"], // 展开字段集
        key: "key", // key字段
        value: "value" // value字段
      });
      return dv;
    }
  },
  props: {
    data: Array,
    width: {
      type: Number,
      default: 431
    },
    height: {
      type: Number,
      default: 360
    }
  }
};
</script>
