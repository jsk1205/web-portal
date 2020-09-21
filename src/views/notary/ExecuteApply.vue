<template>
  <div class="manager-contain">
    <div class="head">
      <el-form :inline="true" :model="reqTemp">
        <span class="query-name">机构：</span>
        <el-select placeholder="光大银行" class="headSelect">
          <el-option label="光大银行" value="GDYH000001"></el-option>
        </el-select>
        <el-input v-model="reqTemp.contractName" placeholder="合同名称" class="headSelect"></el-input>
        <el-date-picker
          v-model="reqTemp.executionDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          class="headSelect"
          placeholder="选择日期"
        ></el-date-picker>
        <el-input v-model="reqTemp.contractAmount" placeholder="贷款金额" class="headSelect"></el-input>
        <el-select v-model="reqTemp.courtStatus" placeholder="执行状态" class="headSelect">
          <el-option
            v-for="item in executeStatusDatas"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="reqTemp.notarizationStatus" placeholder="检查状态" class="headSelect">
          <el-option
            v-for="item in checkStatusDatas"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-button type="primary" @click="getExecuteList" icon="el-icon-search">查询</el-button>

        <el-button
          :loading="downloadLoading"
          type="primary"
          icon="el-icon-download"
          @click="handleDownload"
        >导出</el-button>
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
        <el-table-column property="tarTxId" width="220" label="合同编号" align="center" />
        <el-table-column property="contractName" label="借款人" align="center" />
        <el-table-column property="borrowAmount" label="借款本金" align="center" />
        <el-table-column property="executedAmount" label="执行本金" align="center" />
        <el-table-column label="法院执行状态" align="center">
          <template slot-scope="scope">{{ courtStatusFilters(scope.row.courtStatus) }}</template>
        </el-table-column>
        <el-table-column property="executionDate" label="执行日期" width="160" align="center" />
        <el-table-column label="核查状态" align="center">
          <template slot-scope="scope">{{ checkStatusFilters(scope.row.notarizationStatus) }}</template>
        </el-table-column>
        <el-table-column property="contractSignDt" label="签署日期" align="center"></el-table-column>
        <el-table-column property="remark" label="备注" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <svg-icon
                style="color:#bfcbd9"
                icon-class="detail"
                @click="handleDetails(scope.row)"
              />
              <svg-icon style="color:#bfcbd9" icon-class="delete" @click="handleDelete(scope.row)" />
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
        <div class="form-content" :style="active" @mouseover="mouseOver" @mouseleave="mouseLeave">
          <el-form ref="dataForm" :model="temp" label-position="right" label-width="170px">
            <div class="content">
              <div class="content-left">
                <el-form-item label="项目编号">
                  <el-input v-model="temp.tarTxId" :disabled="true" />
                </el-form-item>
                <el-form-item label="借款人">
                  <el-input v-model="temp.contractName" :disabled="true" />
                </el-form-item>
                <el-form-item label="借款本金">
                  <el-input v-model="temp.borrowAmount" :disabled="true" />
                </el-form-item>
                <el-form-item label="执行本金">
                  <el-input v-model="temp.executedAmount" :disabled="true" />
                </el-form-item>
                <el-form-item label="是否有附属SFTP文件">
                  <el-input :value="temp.isHavefile=='0'?'有':'无'" :disabled="true" />
                </el-form-item>
                <el-form-item label="公证处反馈消息">
                  <el-input v-model="temp.msg" :disabled="true" />
                </el-form-item>
                <el-form-item label="邮寄状态">
                  <el-input :value="temp.mailingStatus=='0'?'已寄出':'未寄出'" :disabled="true" />
                </el-form-item>
                <el-form-item label="是否有附属SFTP文件">
                  <el-input :value="temp.isHavefileBk=='0'?'有':'无'" :disabled="true" />
                </el-form-item>
                <el-form-item label="银行反馈消息">
                  <el-input v-model="temp.msgBk" :disabled="true" />
                </el-form-item>
                <el-form-item label="反馈消息类型">
                  <el-input :value="feedBackTypeFilters(temp.msgType)" :disabled="true" />
                </el-form-item>
                <el-form-item label="公证书号">
                  <el-input v-model="temp.notaryCode" :disabled="true" />
                </el-form-item>
                <el-form-item label="出证日期">
                  <el-input v-model="temp.notaryDate" :disabled="true" />
                </el-form-item>
                <el-form-item label="证书类型">
                  <el-input :value="temp.certificateType=='0'?'执行证书 ':'决定书'" :disabled="true" />
                </el-form-item>
              </div>
              <div class="content-right">
                <el-form-item label="法院执行状态">
                  <el-input :value="courtStatusFilters(temp.courtStatus)" :disabled="true" />
                </el-form-item>
                <el-form-item label="执行日期">
                  <el-input v-model="temp.executionDate" :disabled="true" />
                </el-form-item>
                <el-form-item label="核查状态">
                  <el-input :value="checkStatusFilters(temp.notarizationStatus)" :disabled="true" />
                </el-form-item>
                <el-form-item label="签署日期">
                  <el-input v-model="temp.contractSignDt" :disabled="true" />
                </el-form-item>
                <el-form-item label="证书文件路径">
                  <el-input v-model="temp.certificatePath" :disabled="true" />
                </el-form-item>
                <el-form-item label="申请执行日">
                  <el-input v-model="temp.executionDate" :disabled="true" />
                </el-form-item>
                <el-form-item label="执行申请日次日">
                  <el-input v-model="temp.executionNextDate" :disabled="true" />
                </el-form-item>
                <el-form-item label="贷款方联系人">
                  <el-input v-model="temp.personName" :disabled="true" />
                </el-form-item>
                <el-form-item label="贷款方联系人电话">
                  <el-input v-model="temp.telephone" :disabled="true" />
                </el-form-item>
                <el-form-item label="借款人姓名">
                  <el-input v-model="temp.personNameJ" :disabled="true" />
                </el-form-item>
                <el-form-item label="借款人电话">
                  <el-input v-model="temp.telephoneJ" :disabled="true" />
                </el-form-item>
                <el-form-item label="借款人实际地址">
                  <el-input v-model="temp.addrJ" :disabled="true" />
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div slot="footer" class="form-footer">
            <el-button class="cancle-btn" @click="detailFormVisible = false">返回</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  selectExecuteDatas,
  getExecuteStatus,
  getCheckStatus,
  deleteExecute,
  getExecuteDatas
} from "@/api/executeApplyApi.js";
import { getFeedbackType } from "@/api/fliterApi.js";
import moment from "moment";
export default {
  filters: {
    formatDate: function(value) {
      return moment(parseInt(value)).format("YYYY-MM-DD h:mm:ss");
    }
  },
  data() {
    return {
      active: "",
      tableData: [],
      exportData: [],
      paginations: {
        total: 0,
        pageIndex: 1,
        pageSize: 15,
        pageSizes: [15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      detailFormVisible: false,
      temp: {},
      executeStatusDatas: [],
      checkStatusDatas: [],
      reqTemp: {
        contractName: null,
        contractAmount: null,
        executionDate: null,
        courtStatus: null,
        notarizationStatus: null
      },
      feedbackTypeDatas: [],
      downloadLoading: false
    };
  },
  watch: {},
  created() {},
  mounted() {
    getFeedbackType().then(res => {
      this.feedbackTypeDatas = res.data;
    });
    getExecuteStatus().then(res => {
      this.executeStatusDatas = res.data;
    });
    getCheckStatus().then(res => {
      this.checkStatusDatas = res.data;
    });
    this.getExecuteList();
  },
  methods: {
    getExecuteList() {
      selectExecuteDatas(
        this.paginations.pageIndex,
        this.paginations.pageSize,
        this.reqTemp
      ).then(res => {
        this.paginations.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    handleDelete(row) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteExecute(row.transId).then(res => {
            this.getExecuteList();
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除"
          });
        });
    },

    handleDetails(row) {
      this.temp = row;
      this.detailFormVisible = true;
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
    courtStatusFilters(value) {
      let data = "";
      this.executeStatusDatas.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },

    checkStatusFilters(value) {
      let data = "";
      this.checkStatusDatas.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    feedBackTypeFilters(value) {
      let data = "";
      this.feedbackTypeDatas.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    handleDownload() {
      getExecuteDatas(this.reqTemp).then(res => {
        this.exportData = res.data;
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "合同编号",
            "合同名称",
            "是否出纸质证书",
            "借款本金（元）",
            "执行本金（元）",
            "执行利息（元）",
            "借款起始日",
            "借款终止日",
            "本金还款金额",
            "拖欠本金金额",
            "拖欠利息",
            "拖欠本金罚息金额",
            "合同到期日",
            "借款期限",
            "贷款发放日",
            "借款人账户",
            "申请执行日",
            "申请执行日次日",
            "是否有附属SFTP文件同步传输",
            "向银行反馈实时消息",
            "公证处核查状态",
            "法院执行的状态",
            "邮寄状态",
            "是否有附属SFTP文件同步传输",
            "向公证处反馈实时消息",
            "反馈消息类型",
            "公证书号",
            "出证日期",
            "证书类型",
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
            "借款方其他联系方式"
          ];
          const filterVal = [
            "contractNo",
            "contractName",
            "isPaper",
            "borrowAmount",
            "executedAmount",
            "interest",
            "borrowStDt",
            "borrowEdDt",
            "repaymentAmount",
            "defaultAmount",
            "defaultInterest",
            "defaultInterestAmount",
            "contractExpirationDate",
            "loanTerm",
            "loanIssuingDate",
            "borrowAccount",
            "executionDate",
            "executionNextDate",
            "isHavefile",
            "msg",
            "notarizationStatus",
            "courtStatus",
            "mailingStatus",
            "isHaveFileBK",
            "msgBK",
            "msgType",
            "notaryCode",
            "notaryDate",
            "certificateType",
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
            "loanTelephone"
          ];

          const data = this.formatJson(filterVal);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "执行申请"
          });
          this.downloadLoading = false;
        });
      });
    },
    formatJson(filterVal) {
      return this.exportData.map(v =>
        filterVal.map(j => {
          return v[j];
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
      this.getExecuteList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getExecuteList();
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
        S: $this.getMilliseconds()
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
