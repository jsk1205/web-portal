
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="statisticsBox">
      <div class="jacketedLayer">
        <div class="summaryBox">
          <div class="title">客户总人数（人）</div>
          <div>{{customerHeader.total}}</div>
        </div>
        <div class="summaryBox">
          <div class="title">男客户</div>
          <div>{{customerHeader.man}}</div>
        </div>
        <div class="summaryBox">
          <div class="title">女客户</div>
          <div>{{customerHeader.wowen}}</div>
        </div>
        <div class="summaryBox">
          <div class="title">已婚人数</div>
          <div>{{customerHeader.married}}</div>
        </div>
        <div class="summaryBox">
          <div class="title">未婚人数</div>
          <div>{{customerHeader.discoverture}}</div>
        </div>
      </div>
    </div>
    <div class="contentTable">
      <div class="theme">不同地区不同年龄段客户累计贷款统计</div>
      <el-table
        :data="customerBody"
        border
        style="width: 100% "
        :header-cell-style="{background:'rgb(205,179,128)',color:'#333','text-align':'center'}"
        :cell-style="{background:'rgb(232,221,203)','text-align':'center'}"
      >
        <el-table-column prop="level" label="年龄段（岁）"></el-table-column>
        <el-table-column prop="totalNum" label="贷款人数量"></el-table-column>
        <el-table-column prop="nzNum" label="累计公证申请数量"></el-table-column>
        <el-table-column prop="exeNum" label="累计执行申请数量"></el-table-column>
        <el-table-column prop="contractAmount" label="贷款总金额（W）"></el-table-column>
        <el-table-column prop="repaymentAmount" label="总回收金额（W）"></el-table-column>
        <el-table-column prop="recovery" label="回收率"></el-table-column>
        <el-table-column prop="defaultAmount" label="总逾期金额（W）"></el-table-column>
        <el-table-column prop="YuQiLv" label="逾期率"></el-table-column>
      </el-table>
      <div class="theme">不同地区客户累计贷款</div>
      <el-table
        :data="customerFoot"
        border
        style="width: 100% "
        :header-cell-style="{background:'rgb(205,179,128)',color:'#333','text-align':'center'}"
        :cell-style="{background:'rgb(232,221,203)','text-align':'center'}"
      >
        <el-table-column prop="level" label="年龄段（岁）"></el-table-column>
        <el-table-column prop="totalNum" label="贷款人数量"></el-table-column>
        <el-table-column prop="nzNum" label="累计公证申请数量"></el-table-column>
        <el-table-column prop="exeNum" label="累计执行申请数量"></el-table-column>
        <el-table-column prop="contractAmount" label="贷款总金额（W）"></el-table-column>
        <el-table-column prop="repaymentAmount" label="总回收金额（W）"></el-table-column>
        <el-table-column prop="recovery" label="回收率"></el-table-column>
        <el-table-column prop="defaultAmount" label="总逾期金额（W）"></el-table-column>
        <el-table-column prop="YuQiLv" label="逾期率"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCustomerStatistics } from "@/api/reportApi";
export default {
  data() {
    return {
      mechanismVal: "GDYH000001",
      citySearchVal: "",
      customerBody: [],
      customerFoot: [],
      customerHeader: "",
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
    this.getCustomerStatistics();
    // console.log(options.value);
  },
  methods: {
    getCustomerStatistics() {
      getCustomerStatistics({
        appId: this.mechanismVal,
        city: this.citySearchVal
      }).then(res => {
        // console.log(res.data, 333);
        this.customerBody = JSON.parse(res.data).customerBody;
        this.customerFoot.push(JSON.parse(res.data).customerFoot);
        this.customerHeader = JSON.parse(res.data).customerHeader;
        // console.log(this.customerHeader, 111);
      });
    },
    onSubmit() {
      this.customerBody = [];
      this.customerFoot = [];
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
  .statisticsBox {
    width: 80%;
    margin: 10px auto;
    .jacketedLayer {
      width: 100%;
      display: flex;
      .summaryBox {
        width: 13%;
        margin-right: 8%;
        .title {
          // height: 40px;
          // line-height: 40px;
          background: rgb(92, 167, 186);
          // text-align: center;
          margin-bottom: 1px;
        }
        div {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border: 1px solid #d9d9d9;
        }
      }
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
