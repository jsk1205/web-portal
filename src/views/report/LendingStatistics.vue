
<template>
  <div class="notarizationApplication">
    <div class="head">
      <el-form :inline="true">
        <span class="query-name">机构：</span>
        <el-select v-model="mechanismVal" placeholder="光大银行" class="headSelect">
          <el-option label="光大银行" value="GDYH000001"></el-option>
        </el-select>
        <span class="query-name">地址：</span>
        <el-select v-model="citySearchVal" placeholder="请选择" class="headSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.val"
          ></el-option>
        </el-select>
        <span class="query-name">时间：</span>
        <el-date-picker
          v-model="yearValue"
          type="year"
          placeholder="选择年"
          class="headSelect"
          value-format="yyyy"
        ></el-date-picker>
        <el-date-picker
          v-model="monthValue"
          type="month"
          placeholder="选择月"
          class="headSelect"
          format="MM"
          value-format="MM"
          @change="eliminateQuarter"
        ></el-date-picker>
        <el-select
          v-model="quarterVal"
          placeholder="请选择"
          class="headSelect"
          @change="eliminateMonth"
        >
          <el-option label="第一季度" value="1"></el-option>
          <el-option label="第二季度" value="2"></el-option>
          <el-option label="第三季度" value="3"></el-option>
          <el-option label="第四季度" value="4"></el-option>
          <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.val"></el-option> -->
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentTable">
      <div class="theme">不同地区不同时间段银行贷款统计</div>
      <el-table
        :data="loanLimitData"
        border
        style="width: 100% "
        :header-cell-style="{background:'rgb(205,179,128)',color:'#333','text-align':'center'}"
        :cell-style="{background:'rgb(232,221,203)','text-align':'center'}"
      >
        <el-table-column prop="personNum" label="累计公证申请人数"></el-table-column>
        <el-table-column prop="loanNum" label="累计贷款人数"></el-table-column>
        <el-table-column prop="contractAmount" label="总贷款金额（元）"></el-table-column>
        <el-table-column prop="repaymentAmount" label="累计回收金额（元）"></el-table-column>
        <el-table-column prop="recovery" label="回收率"></el-table-column>
        <el-table-column prop="defaultAmount" label="累计逾期金额（元）"></el-table-column>
        <el-table-column prop="overdue" label="逾期率"></el-table-column>
      </el-table>
      <div class="theme">不同地区不同时间段逾期额度统计</div>
      <el-table
        :data="overdueAmountData"
        border
        style="width: 100% "
        :header-cell-style="{background:'rgb(205,179,128)',color:'#333','text-align':'center'}"
        :cell-style="{background:'rgb(232,221,203)','text-align':'center'}"
      >
        <el-table-column prop="exeNum" label="累计执行申请人数"></el-table-column>
        <el-table-column prop="overdueNum" label="累计逾期人数"></el-table-column>
        <el-table-column prop="borrowAmount" label="累计借款本金（元）"></el-table-column>
        <el-table-column prop="executedAmount" label="累计执行本金（元）"></el-table-column>
        <el-table-column prop="interest" label="累计执行利息（元）"></el-table-column>
        <el-table-column prop="repaymentAmount" label="累计本金还款金额"></el-table-column>
        <el-table-column prop="defaultAmount" label="累计拖欠本金金额"></el-table-column>
        <el-table-column prop="defaultInterest" label="累计拖欠利息"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getLendingStatistics } from "@/api/reportApi";
export default {
  data() {
    return {
      yearValue: "",
      monthValue: "",
      mechanismVal: "GDYH000001",
      citySearchVal: "",
      quarterVal: "",
      loanLimitData: [],
      overdueAmountData: [],
      options: [
        {
          val: "北京市",
          label: "北京市"
        },
        {
          val: "上海市",
          label: "上海市"
        },
        {
          val: "郑州市",
          label: "郑州市"
        },
        {
          val: "南阳市",
          label: "南阳市"
        }
      ]
    };
  },
  created() {
    // console.log(options.value);
    this.getLendingStatistics();
  },
  methods: {
    getLendingStatistics() {
      getLendingStatistics({
        appId: this.mechanismVal,
        city: this.citySearchVal,
        year: this.yearValue,
        quarter: this.quarterVal,
        month: this.monthValue
      }).then(res => {
        // console.log(res.data, 222);
        this.loanLimitData.push(JSON.parse(res.data).nzLoan);
        this.overdueAmountData.push(JSON.parse(res.data).exeLoan);
        // console.log(this.loanLimitData,111)
      });
    },
    eliminateQuarter() {
      if (this.monthValue) {
        this.quarterVal = "";
      }
    },
    eliminateMonth() {
      if (this.quarterVal) {
        this.monthValue = "";
      }
    },
    onSubmit() {
      this.loanLimitData = [];
      this.overdueAmountData = [];
      this.getLendingStatistics();
    }
  }
};
</script>

<style lang="less" scoped>
.notarizationApplication {
  width: 100%;
  height: 100%;
  text-align: center;
  background: #ffffff;
  .head {
    width: 80%;
    margin: 10px auto;
    border-bottom: none;
    text-align: left;
    // height: 40px;
    .headSelect {
      width: 10%;
      margin-right: 20px;
    }
  }
  .contentTable {
    width: 80%;
    margin: 0 auto;
    .theme {
      width: 100%;
      background: rgb(92, 167, 186);
      height: 40px;
      line-height: 40px;
      text-align: left;
      padding-left: 5px;
      border-right: 2px solid #ebebeb;
      border-left: 1px solid #ebebeb;
      margin-top: 30px;
    }
  }
}
</style>
