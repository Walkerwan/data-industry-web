<template>
  <div>
    <Chart :width="width" :height="height" :data="dv" />
  </div>
</template>
<script>
import createG2 from "g2-vue";
import { DataSet } from "@antv/data-set";

const Chart = createG2(chart => {
  chart.tooltip({
    crosshairs: {
      type: "line"
    }
  });
  chart.scale("value", {
    tickCount: 10,
    formatter: num => {
      return num.toLocaleString();
    }
  });
  chart.legend(true);
  chart
    .line()
    .position("name*value")
    .color("key")
    .shape("smooth");
  chart
    .point()
    .position("name*value")
    .color("key")
    .size(4)
    .shape("circle")
    .style({
      stroke: "#fff",
      lineWidth: 1
    });
  chart.render();
});

export default {
  name: "ZcmorefunMultiLine",
  components: {
    Chart
  },
  props: {
    width: {
      type: Number,
      default: 431
    },
    height: {
      type: Number,
      default: 360
    },
    data: {
      type: Array,
      default: () => {
        return [
          {
            name: "Jan",
            Tokyo: 7.0
            // London: 3.9
          },
          {
            name: "Feb",
            Tokyo: 6.9
            // London: 4.2
          },
          {
            name: "Mar",
            Tokyo: 9.5
            // London: 5.7
          },
          {
            name: "Apr",
            Tokyo: 14.5
            // London: 8.5
          },
          {
            name: "May",
            Tokyo: 18.4
            // London: 11.9
          },
          {
            name: "Jun",
            Tokyo: 21.5
            // London: 15.2
          },
          {
            name: "Jul",
            Tokyo: 25.2
            // London: 17.0
          },
          {
            name: "Aug",
            Tokyo: 26.5
            // London: 16.6
          },
          {
            name: "Sep",
            Tokyo: 23.3
            // London: 14.2
          },
          {
            name: "Oct",
            Tokyo: 18.3
            // London: 10.3
          },
          {
            name: "Nov",
            Tokyo: 13.9
            // London: 6.6
          },
          {
            name: "Dec",
            Tokyo: 9.6
            // London: 4.8
          }
        ];
      }
    },
    fields: {
      type: Array,
      default: () => {
        return ["倒蹬机", "地雷架", "龙门架"]; //["Tokyo", "London"]
      }
    }
  },
  computed: {
    // 在一行中保存多个城市的数据，需要将数据转换成
    // {name: 'Jan', key: 'Tokyo', value: 3.9}
    dv() {
      var ds = new DataSet();
      var dv = ds.createView().source(this.data);
      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
      dv.transform({
        type: "fold",
        fields: this.fields, // 展开字段集
        key: "key", // key字段
        value: "value" // value字段
      });
      console.log("dv", dv);
      return dv;
    }
  }
};
</script>
