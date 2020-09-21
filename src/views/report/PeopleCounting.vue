<!--公证申请人数统计-->
<template>
  <!-- <span>公证申请人数统计</span> -->
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
      <div class="theme">公证申请各阶段人数统计</div>
      <el-table
        :data="notarizationStageData"
        :border="true"
        style="width: 100% "
        :header-cell-style="{background:'rgb(205,179,128)',color:'#333','text-align':'center'}"
        :cell-style="{background:'rgb(232,221,203)' , 'text-align':'center'}"
      >
        <el-table-column prop="totalNum" label="累计公证申请总人数"></el-table-column>
        <el-table-column prop="-1" label="签署超时人数"></el-table-column>
        <el-table-column prop="0" label="未开始签署人数"></el-table-column>
        <el-table-column prop="1" label="正在签署人数"></el-table-column>
        <el-table-column prop="2" label="签署完成人数"></el-table-column>
      </el-table>
      <div class="theme">执行申请各阶段人数统计</div>
      <el-table
        :data="implementPhaseData"
        :border="true"
        style="width: 100% "
        :header-cell-style="{background:'rgb(205,179,128)',color:'#333','text-align':'center'}"
        :cell-style="{background:'rgb(232,221,203)','text-align':'center'}"
      >
        <el-table-column prop="totalNum" label="累计执行申请总人数"></el-table-column>
        <el-table-column prop="0" label="待审查人数"></el-table-column>
        <el-table-column prop="1" label="审查文通过人数"></el-table-column>
        <el-table-column prop="2" label="审查通过，核实中人数"></el-table-column>
        <el-table-column prop="3" label="需要补充对抗数据人数"></el-table-column>
        <el-table-column prop="4" label="已出具执行证书人数"></el-table-column>
        <el-table-column prop="5" label="已出执具决定书人数"></el-table-column>
      </el-table>
      <div class="theme">法院各阶段执行状态人数</div>
      <el-table
        :data="courtData"
        :border="true"
        style="width: 100% "
        :header-cell-style="{background:'rgb(205,179,128)',color:'#333','text-align':'center'}"
        :cell-style="{background:'rgb(232,221,203)','text-align':'center'}"
      >
        <el-table-column prop="totalNum" label="累计执行申请总人数"></el-table-column>
        <el-table-column prop="1" label="立案申请"></el-table-column>
        <el-table-column prop="2" label="立案撤销"></el-table-column>
        <el-table-column prop="3" label="已立案"></el-table-column>
        <el-table-column prop="4" label="已退回"></el-table-column>
        <el-table-column prop="5" label="执行成功"></el-table-column>
        <el-table-column prop="6" label="已自主还款"></el-table-column>
      </el-table>
    </div>
    <ciyt></ciyt>
  </div>
</template>

<script>
import ciyt from "../../components/CitySearch";
import { getPeopleCounting } from "@/api/reportApi";
export default {
  components: {
    ciyt
  },
  data() {
    return {
      yearValue: "",
      monthValue: "",
      mechanismVal: "GDYH000001",
      citySearchVal: "",
      quarterVal: "",
      notarizationStageData: [],
      implementPhaseData: [],
      courtData: [],
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
    this.getPeopleCounting();
  },
  methods: {
    getPeopleCounting() {
      getPeopleCounting({
        appId: this.mechanismVal,
        city: this.citySearchVal,
        year: this.yearValue,
        quarter: this.quarterVal,
        month: this.monthValue
      }).then(res => {
        // console.log(res.data, 111);
        this.notarizationStageData.push(JSON.parse(res.data).nz_stages_nums);
        this.implementPhaseData.push(JSON.parse(res.data).exe_stages_nums);
        this.courtData.push(JSON.parse(res.data).fy_stages_nums);
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
      this.courtData=[];
      this.notarizationStageData = [];
      this.implementPhaseData= [];
      this.getPeopleCounting();
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
