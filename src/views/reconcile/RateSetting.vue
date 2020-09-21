<template>
  <div class="manager-contain">
    <span style="font-size:28px;">合作伙伴收费比例设置</span>
    <div class="content-header-search">
      <svg-icon icon-class="sync" @click="clickSyncDataItem()" />
    </div>
    <div class="table-contain2">
      <el-table
        :data="tableData"
        border
        height="780"
        stripe
        highlight-current-row
        style="width:100%"
      >
        <el-table-column property="appId" label="合作伙伴编号" align="center" />
        <el-table-column
          property="appName"
          label="合作伙伴简称"
          align="center"
        />
        <el-table-column label="授信额度-收费比例(%)" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-input
                v-model="row.creditLimitRate"
                class="edit-input"
                size="small"
              />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.creditLimitRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="贷款额度-收费比例(%)" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-input
                v-model="row.contractAmountRate"
                class="edit-input"
                size="small"
              />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.contractAmountRate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本金还款金额-收费比例(%)" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-input
                v-model="row.repaymentAmountRate"
                class="edit-input"
                size="small"
              />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                cancel
              </el-button>
            </template>
            <span v-else>{{ row.repaymentAmountRate }}</span>
          </template>
        </el-table-column>
        <el-table-column property="sequence" label="序号" align="center" />

        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.edit"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              Ok
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit = !row.edit"
            >
              Edit
            </el-button>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      add_icon_name: "add_no",
      tableData: [],
      paginations: {
        total: 0,
        pageIndex: 1,
        pageSize: 15,
        pageSizes: [15, 20],
        layout: "total, sizes, prev, pager, next, jumper",
      },
    };
  },
  mounted() {
    this.queryData();
  },
  methods: {
    queryData() {
      this.API.rateSetApi
        .selectRate(this.paginations.pageIndex, this.paginations.pageSize)
        .then((res) => {
          this.paginations.total = res.data.total;
          this.tableData = res.data.list.map((v) => {
            this.$set(v, "edit", false);
            v.oldCreditLimitRate = v.creditLimitRate;
            v.oldContractAmountRate = v.contractAmountRate;
            v.oldRepaymentAmountRate = v.repaymentAmountRate;
            return v;
          });
        });
    },
    cancelEdit(row) {
      row.creditLimitRate = row.oldCreditLimitRate;
      row.contractAmountRate = row.oldContractAmountRate;
      row.repaymentAmountRate = row.oldRepaymentAmountRate;
      row.edit = false;
    },
    confirmEdit(row) {
      this.API.rateSetApi.updateRate(row).then((res) => {
        row.edit = false;
      });
    },
    clickSyncDataItem() {
      this.API.rateSetApi.syncAppMsg().then((res) => {
        this.queryData();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
