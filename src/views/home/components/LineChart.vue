<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getTran } from "@/api/homeApi.js";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      nzNumsDatas: [],
      exeNumsDatas: [],
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    getTran("GDYH000001", "3", "").then((res) => {
      var nzNums = JSON.parse(res.data).weekData.nzNums;
      var exeNums = JSON.parse(res.data).weekData.exeNums;
      this.nzNumsDatas[0] = { value: nzNums.monday, name: "公证数" };
      this.nzNumsDatas[1] = { value: nzNums.tuesday, name: "公证数" };
      this.nzNumsDatas[2] = { value: nzNums.wednesday, name: "公证数" };
      this.nzNumsDatas[3] = { value: nzNums.thursday, name: "公证数" };
      this.nzNumsDatas[4] = { value: nzNums.friday, name: "公证数" };
      this.nzNumsDatas[5] = { value: nzNums.satruday, name: "公证数" };
      this.nzNumsDatas[6] = { value: nzNums.sunday, name: "公证数" };
      this.exeNumsDatas[0] = { value: exeNums.monday, name: "执行数" };
      this.exeNumsDatas[1] = { value: exeNums.tuesday, name: "执行数" };
      this.exeNumsDatas[2] = { value: exeNums.wednesday, name: "执行数" };
      this.exeNumsDatas[3] = { value: exeNums.thursday, name: "执行数" };
      this.exeNumsDatas[4] = { value: exeNums.friday, name: "执行数" };
      this.exeNumsDatas[5] = { value: exeNums.satruday, name: "执行数" };
      this.exeNumsDatas[6] = { value: exeNums.sunday, name: "执行数" };
      this.$nextTick(() => {
        this.initChart();
      });
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: [
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日",
          ],
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 20,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        legend: {
          data: ["公证数", "执行数"],
        },
        series: [
          {
            name: "公证数",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: this.nzNumsDatas,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "执行数",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.exeNumsDatas,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
  },
};
</script>
