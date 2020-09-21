<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getTran } from "@/api/homeApi.js";
const animationDuration = 6000;

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
      yearValue: "",
      monthDatas: [],
    };
  },
  mounted() {
    getTran("GDYH000001", "3", "").then((res) => {
      this.monthDatas[0] = JSON.parse(res.data).monthData.january;
      this.monthDatas[1] = JSON.parse(res.data).monthData.february;
      this.monthDatas[2] = JSON.parse(res.data).monthData.march;
      this.monthDatas[3] = JSON.parse(res.data).monthData.april;
      this.monthDatas[4] = JSON.parse(res.data).monthData.may;
      this.monthDatas[5] = JSON.parse(res.data).monthData.jun;
      this.monthDatas[6] = JSON.parse(res.data).monthData.july;
      this.monthDatas[7] = JSON.parse(res.data).monthData.august;
      this.monthDatas[8] = JSON.parse(res.data).monthData.september;
      this.monthDatas[9] = JSON.parse(res.data).monthData.october;
      this.monthDatas[10] = JSON.parse(res.data).monthData.november;
      this.monthDatas[11] = JSON.parse(res.data).monthData.december;
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
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "pageA",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.monthDatas,
            animationDuration,
          },
        ],
      });
    },
  },
};
</script>
