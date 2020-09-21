<template>
  <div class="manager-contain">
    <div class="table-contain4">
      <div class="table_left">
        <el-table
          :data="tableData"
          border
          stripe
          highlight-current-row
          row-key="orgId"
        >
          <el-table-column prop="fullCname" label="合作伙伴" align="center" />
        </el-table>
      </div>
      <div class="table_right">
        <div class="head2">
          <el-form :inline="true">
            <el-date-picker
              v-model="startValue"
              type="date"
              value-format="yyyy/MM/dd"
              class="dateClass"
              placeholder="选择日期"
            />
            <span>至</span>
            <el-date-picker
              type="date"
              v-model="endValue"
              value-format="yyyy/MM/dd"
              class="dateClass"
              placeholder="选择日期"
            />
            <el-button type="primary" @click="queryData" icon="el-icon-search"
              >查询</el-button
            >
          </el-form>
        </div>
        <el-table :data="tableData" border stripe highlight-current-row>
          <el-table-column label="项目" align="center">
            <template>
              <span>统计</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="contractAmount"
            label="总贷款金额(元)"
            align="center"
          />
          <el-table-column prop="rate" label="收费比例(%)" align="center" />
          <el-table-column prop="billRate" label="分润(元)" align="center" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startValue: null,
      endValue: null,
      tableData: [],
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.queryData();
  },
  methods: {
    queryData() {
      console.log(this.startValue);
      console.log(this.endValue);
      this.API.reconcileServerApi
        .selectReconcileServer({
          appId: "A965188362",
          startTime: this.startValue,
          endTime: this.endValue,
        })
        .then((res) => {
          console.log(JSON.parse(res.data));
          this.tableData.push(JSON.parse(res.data));
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
