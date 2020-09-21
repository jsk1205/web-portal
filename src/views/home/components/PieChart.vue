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
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
      loanDatas: [],
    };
  },
  mounted() {
    getTran("GDYH000001", "3", "").then((res) => {
      console.log(JSON.parse(res.data).loanData[0].totalNum);
      this.loanDatas = [
        { value: JSON.parse(res.data).loanData[0].totalNum, name: "0-20岁" },
        { value: JSON.parse(res.data).loanData[1].totalNum, name: "20-30岁" },
        { value: JSON.parse(res.data).loanData[2].totalNum, name: "30-40岁" },
        { value: JSON.parse(res.data).loanData[3].totalNum, name: "40-50岁" },
        { value: JSON.parse(res.data).loanData[4].totalNum, name: "50-60岁" },
        { value: JSON.parse(res.data).loanData[5].totalNum, name: "60以上" },
      ];
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

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          bottom: "10",
          data: [
            "0-20岁",
            "20-30岁",
            "30-40岁",
            "40-50岁",
            "50-60岁",
            "60以上",
          ],
        },
        series: [
          {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: this.loanDatas,
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>
