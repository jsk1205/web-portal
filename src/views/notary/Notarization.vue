<template>
  <div class="manager-contain">
    <div class="head">
      <el-form :inline="true" :model="reqTemp">
        <span class="query-name">机构：</span>
        <el-select placeholder="光大银行" class="headSelect">
          <el-option label="光大银行" value="GDYH000001"></el-option>
        </el-select>
        <el-input
          v-model="reqTemp.contractName"
          placeholder="合同名称"
          class="headSelect"
        ></el-input>
        <el-date-picker
          v-model="reqTemp.contractSignDt"
          type="date"
          class="headSelect"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
        <el-input
          v-model="reqTemp.contractAmount"
          placeholder="贷款金额"
          class="headSelect"
        ></el-input>
        <el-select
          v-model="reqTemp.signStatus"
          placeholder="公证状态"
          class="headSelect"
        >
          <el-option
            v-for="item in notaryStatusData"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="getTranList" icon="el-icon-search"
          >查询</el-button
        >
        <el-button
          :loading="downloadLoading"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload"
          >导出</el-button
        >
      </el-form>
    </div>
    <div class="table-contain3">
      <el-table
        :data="tableData"
        border
        stripe
        height="746"
        highlight-current-row
        style="width:100%"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseOut"
      >
        <el-table-column
          property="contractNo"
          width="220"
          label="合同编号"
          align="center"
        />
        <el-table-column
          property="contractName"
          label="借款人"
          align="center"
        />
        <el-table-column
          property="contractSignDt"
          label="签署日期"
          align="center"
        />
        <el-table-column
          property="creditLimit"
          label="授信额度"
          align="center"
        />
        <el-table-column
          property="contractAmount"
          label="合同贷款金额"
          align="center"
        />
        <el-table-column
          property="notaryCode"
          label="公证书号"
          align="center"
        />
        <el-table-column
          property="notaryDate"
          label="出证日期"
          width="160"
          align="center"
        />
        <el-table-column label="公证状态" align="center">
          <template slot-scope="scope">{{
            signStatusFilters(scope.row.signStatus)
          }}</template>
        </el-table-column>
        <el-table-column label="签名时间" align="center">
          <template slot-scope="scope">{{
            scope.row.signEndDt | formatDate
          }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <svg-icon
                style="color:#bfcbd9"
                icon-class="detail"
                @click="handleDetails(scope.row)"
              />
              <svg-icon
                style="color:#bfcbd9"
                icon-class="log"
                @click="handleLog(scope.row)"
              />
              <svg-icon
                style="color:#bfcbd9"
                icon-class="delete"
                @click="handleDelete(scope.row)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="elrow-class">
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              background
              :page-sizes="paginations.pageSizes"
              :page-size="paginations.pageSize"
              :layout="paginations.layout"
              :total="paginations.total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            />
          </div>
        </el-col>
      </el-row>

      <el-drawer
        ref="drawer"
        :visible.sync="detailFormVisible"
        direction="rtl"
        :modal="false"
        :show-close="false"
        size="100%"
        class="form-container"
      >
        <div
          class="form-content"
          :style="active"
          @mouseover="mouseOver"
          @mouseleave="mouseLeave"
        >
          <el-form
            ref="dataForm"
            :model="temp"
            label-position="right"
            label-width="120px"
          >
            <div class="content">
              <div class="content-left">
                <el-form-item label="项目编号">
                  <el-input v-model="temp.tarTxId" :disabled="true" />
                </el-form-item>
                <el-form-item label="合同编号">
                  <el-input v-model="temp.contractNo" :disabled="true" />
                </el-form-item>
                <el-form-item label="签署日期">
                  <el-input v-model="temp.contractSignDt" :disabled="true" />
                </el-form-item>
                <el-form-item label="合同贷款金额">
                  <el-input v-model="temp.contractAmount" :disabled="true" />
                </el-form-item>
                <el-form-item label="出证日期">
                  <el-input v-model="temp.notaryDate" :disabled="true" />
                </el-form-item>
                <el-form-item label="签名时间">
                  <el-input
                    :value="
                      formatter(parseInt(temp.signEndDt), 'yyyy-MM-dd hh:mm:ss')
                    "
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item label="负责人姓名">
                  <el-input v-model="temp.legalName" :disabled="true" />
                </el-form-item>
                <el-form-item label="负责人电话">
                  <el-input v-model="temp.tel" :disabled="true" />
                </el-form-item>
              </div>
              <div class="content-right">
                <el-form-item label="合同名称">
                  <el-input v-model="temp.contractName" :disabled="true" />
                </el-form-item>
                <el-form-item label="授信额度">
                  <el-input v-model="temp.creditLimit" :disabled="true" />
                </el-form-item>
                <el-form-item label="公证书号">
                  <el-input v-model="temp.notaryCode" :disabled="true" />
                </el-form-item>
                <el-form-item label="公证状态">
                  <el-input
                    :value="signStatusFilters(temp.signStatus)"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item label="合同贷款用途">
                  <el-input
                    v-model="temp.contractloansPurpose"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item label="贷款行名称">
                  <el-input v-model="temp.personName" :disabled="true" />
                </el-form-item>
                <el-form-item label="社会信用代码">
                  <el-input v-model="temp.certNo" :disabled="true" />
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div slot="footer" class="form-footer">
            <el-button class="cancle-btn" @click="detailFormVisible = false"
              >返回</el-button
            >
          </div>
        </div>
      </el-drawer>
      <el-drawer
        ref="drawer"
        :visible.sync="logFormVisible"
        direction="rtl"
        :modal="false"
        :show-close="false"
        size="30%"
        class="form-container"
      >
        <div
          class="form-content"
          :style="active"
          @mouseover="mouseOver"
          @mouseleave="mouseLeave"
        >
          <el-timeline :reverse="true" style=" height: 100%;overflow-y: auto;">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="formatter(activity.actionTime, 'yyyy-MM-dd hh:mm:ss')"
              placement="top"
            >
              <el-card>{{ activity.remark }}</el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  deleteTran,
  selectLogById,
  selectTran,
  getNotaryStatus,
  getTran,
} from "@/api/notaryApi.js";
import { getOrgList } from "@/api/reportApi.js";
import moment from "moment";
export default {
  filters: {
    formatDate: function(value) {
      return moment(parseInt(value)).format("YYYY-MM-DD h:mm:ss");
    },
  },
  data() {
    return {
      active: "",
      tableData: [],
      exportData: [],
      orgData: [],
      paginations: {
        total: 0,
        pageIndex: 1,
        pageSize: 15,
        pageSizes: [15, 20],
        layout: "total, sizes, prev, pager, next, jumper",
      },
      detailFormVisible: false,
      logFormVisible: false,
      temp: {},
      activities: [],
      notaryStatusData: [],
      reqTemp: {
        contractName: null,
        contractAmount: null,
        contractSignDt: null,
        signStatus: null,
      },
      downloadLoading: false,
    };
  },
  watch: {},
  created() {},
  mounted() {
    getOrgList().then((res) => {
      console.log(res)
    });
    getNotaryStatus().then((res) => {
      this.notaryStatusData = res.data;
    });
    this.getTranList();
  },
  methods: {
    getTranList() {
      selectTran(
        this.paginations.pageIndex,
        this.paginations.pageSize,
        this.reqTemp
      ).then((res) => {
        this.paginations.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleDelete(row) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteTran(row.transId).then((res) => {
            this.getTranList();
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
          });
        });
    },

    handleDetails(row) {
      this.temp = row;
      this.detailFormVisible = true;
    },
    handleLog(row) {
      selectLogById(row.transId).then((res) => {
        this.activities = res.data;
      });
      this.logFormVisible = true;
    },
    handleMouseEnter: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#42b983";
      cell.children[0].children[0].children[1].style.color = "#64d9d6";
      cell.children[0].children[0].children[2].style.color = "#f56c6c";
    },
    handleMouseOut: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#bfcbd9";
      cell.children[0].children[0].children[1].style.color = "#bfcbd9";
      cell.children[0].children[0].children[2].style.color = "#bfcbd9";
    },
    signStatusFilters(value) {
      let data = "";
      this.notaryStatusData.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    handleDownload() {
      getTran(this.reqTemp).then((res) => {
        this.exportData = res.data;
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then((excel) => {
          const tHeader = [
            "合同编号",
            "公证状态",
            "签名时间戳",
            "公证书号",
            "出证日期",
            "公证书状态",
            "是否需要面签",
            "合同名称",
            "合同签署日期",
            "利率类型",
            "固定报价利率公布日期",
            "固定贷款报价利率年期",
            "固定市场报价利率",
            "固定利率数值增加",
            "固定实际执行年利率",
            "浮动报价利率公布日期",
            "浮动贷款报价利率年期",
            "浮动市场报价利率",
            "浮动利率数值增加",
            "浮动实际执行年利率",
            "授信额度",
            "授信期限截止日",
            "合同贷款金额人民币(大写)",
            "合同贷款金额人民币(小写)",
            "合同贷款用途",
            "本合同贷款日利率",
            "本合同贷款月利率",
            "本合同贷款年利率",
            "合同贷款起始日",
            "合同贷款终止日",
            "合同支付币种",
            "受托支付对象账户名称",
            "受托支付对象账户账号",
            "还款方式种类",
            "按月等额本金还款日",
            "按月等额本金还款总期数",
            "按月等额本息还款日",
            "按月等额本息还款总期数",
            "按月付息到期一次性还款日",
            "借款人在贷款方开立放/还账户名称",
            "借款人在贷款方开立放/还账户账号",
            "借款人在贷款方开立放账户名称",
            "借款人在贷款方开立放账户账号",
            "挪用贷款罚息年利率百分比",
            "贷款行名称",
            "贷款方证件类型",
            "贷款方证件号码",
            "贷款方地址",
            "贷款方邮箱",
            "贷款方联系电话",
            "负责人姓名",
            "负责人职务",
            "联系人",
            "联系方式",
            "授权代理人姓名",
            "借款人姓名",
            "借款方证件类型",
            "借款方证件号码",
            "借款方地址",
            "借款方邮件",
            "借款方联系电话",
            "借款方性别",
            "借款方生日",
            "借款方婚姻状态",
            "借款方证件有效期",
            "借款方电子邮箱",
            "借款方其他联系方式",
          ];
          const filterVal = [
            "contractNo",
            "signStatus",
            "signEndDt",
            "notaryCode",
            "notaryDate",
            "notaryBookStatus",
            "visainterview",
            "contractName",
            "contractSignDt",
            "rateType",
            "fixedRateDt",
            "fixedRatePeriod",
            "fixedRateMarket",
            "fixedRateIncrease",
            "fixedRateActual",
            "floatRateDt",
            "floatRatePeriod",
            "floatRateMarket",
            "floatRateIncrease",
            "floatRateActual",
            "creditLimit",
            "creditLimitIndate",
            "contractAmountFmt",
            "contractAmount",
            "contractloansPurpose",
            "contractLoanDtIntRt",
            "contractLoanMtIntRt",
            "contractLoanYrIntRt",
            "contractStDt",
            "contractEdDt",
            "contractCurrency",
            "paymentObjectAccountName",
            "average",
            "repaymentType",
            "repaymentPrincipalDt",
            "repaymentPrincipalPeriod",
            "repaymentInterestDt",
            "repaymentInterestPeriod",
            "onetimePaymentDueDate",
            "repaymentBankAccount",
            "repaymentElecAccount",
            "receiptBankAccount",
            "overduePenaltyInterest",
            "embezzlePenaltyInterest",
            "personName",
            "certType",
            "certNo",
            "addr",
            "zipcode",
            "tel",
            "legalName",
            "legalPost",
            "contactName",
            "contactTel",
            "agentName",
            "loanPersonName",
            "loanCertType",
            "loanCertNo",
            "loanAddr",
            "loanZipcode",
            "loanTel",
            "loanSex",
            "loanBirthday",
            "loanMarriage",
            "loanCertInDate",
            "loanEmail",
            "loanTelephone",
          ];
          const data = this.formatJson(filterVal);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "公证申请",
          });
          this.downloadLoading = false;
        });
      });
    },
    formatJson(filterVal) {
      return this.exportData.map((v) =>
        filterVal.map((j) => {
          if (j === "signEndDt") {
            return "" + v[j];
          } else {
            return v[j];
          }
        })
      );
    },
    mouseOver() {
      this.active =
        "box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);";
    },
    mouseLeave() {
      this.active = "";
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getTranList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getTranList();
    },
    formatter(thistime, fmt) {
      const $this = new Date(thistime);
      const o = {
        "M+": $this.getMonth() + 1,
        "d+": $this.getDate(),
        "h+": $this.getHours(),
        "m+": $this.getMinutes(),
        "s+": $this.getSeconds(),
        "q+": Math.floor(($this.getMonth() + 3) / 3),
        S: $this.getMilliseconds(),
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          ($this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },
  },
};
</script>

<style lang="scss" scoped></style>
