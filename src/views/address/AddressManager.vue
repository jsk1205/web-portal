<!--地址管理-->
<template>
  <div class="manager-contain">
    <div class="head">
      <el-form :inline="true">
        <span class="query-name">机构：</span>
        <el-select
          v-model="mechanismVal"
          placeholder="光大银行"
          class="headSelect"
        >
          <el-option label="光大银行" value="GDYH000001"></el-option>
        </el-select>
        <span class="query-name">解析状态：</span>
        <el-select
          v-model="statusValue"
          placeholder="请选择"
          class="headSelect"
        >
          <el-option
            v-for="item in statusDatas"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-contain3">
      <el-table
        :data="addressData"
        border
        stripe
        height="746"
        style="width: 100% "
        :header-cell-style="{
          'text-align': 'center',
        }"
        :cell-style="{ 'text-align': 'center' }"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseOut"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="district" label="客户原始地址"></el-table-column>
        <el-table-column prop="province" label="解析后的省"></el-table-column>
        <el-table-column prop="city" label="解析后的市"></el-table-column>
        <el-table-column prop="county" label="解析后的县"></el-table-column>
        <el-table-column prop="parseStatus" label="是否无法解析">
          <template slot-scope="scope">
            {{ scope.row.parseStatus == "1" ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="parseStatus" label="是否进行修正">
          <template slot-scope="scope">
            {{ scope.row.parseStatus == "4" ? "已修正" : "未修正" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <svg-icon
                style="color:#bfcbd9"
                icon-class="edit"
                @click="handleEdit(scope.row)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="elrow-class">
        <el-col :span="24">
          <div>
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
      <div v-if="isShowForm">
        <el-dialog
          title="地址校正"
          :visible.sync="isShowForm"
          width="30%"
          :close-on-click-modal="false"
          :before-close="closeDialog"
        >
          <el-form
            ref="addressForm"
            :model="addressForm"
            :rules="addressRules"
            label-position="right"
            label-width="100px"
            style="margin:19px;"
          >
            <el-form-item prop="district" label="客户原始地址">
              <el-input v-model="addressForm.district" />
            </el-form-item>
            <el-form-item prop="province" label="解析后的省">
              <el-input v-model="addressForm.province" />
            </el-form-item>
            <el-form-item prop="city" label="解析后的市">
              <el-input v-model="addressForm.city" />
            </el-form-item>
            <el-form-item prop="county" label="解析后的县">
              <el-input v-model="addressForm.county" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAddressStatus,
  selectAddress,
  updateAdress,
} from "@/api/addressApi";
export default {
  components: {},
  data() {
    return {
      mechanismVal: "GDYH000001",
      statusValue: "0",
      statusDatas: [],
      isShowForm: false,
      paginations: {
        total: 0,
        pageIndex: 1,
        pageSize: 15,
        pageSizes: [15, 20],
        layout: "total, sizes, prev, pager, next, jumper",
      },
      addressData: [],
      addressRules: {
        name: [{ required: true, message: "请输入原始地址", trigger: "blur" }],
      },
      addressForm: {
        city: null,
        county: null,
        district: null,
        id: 0,
        appId: null,
        parseStatus: null,
        province: null,
      },
    };
  },
  created() {
    this.getAddress();
  },
  mounted() {
    getAddressStatus().then((res) => {
      this.statusDatas = res.data;
    });
  },
  methods: {
    getAddress() {
      selectAddress(this.paginations.pageIndex, this.paginations.pageSize, {
        appId: this.mechanismVal,
        parseStatus: this.statusValue,
      }).then((res) => {
        this.paginations.total = res.data.total;
        this.addressData = res.data.list;
      });
    },
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getAddress();
    },
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getAddress();
    },
    onSubmit() {
      this.addressForm.appId = this.mechanismVal;
      updateAdress(this.addressForm).then((res) => {
        this.getAddress();
        this.closeDialog();
      });
    },
    handleEdit(row) {
      this.addressForm = row;
      this.isShowForm = true;
    },
    handleMouseEnter: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#42b983";
    },
    handleMouseOut: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#bfcbd9";
    },
    resetAddressForm() {
      this.addressForm = {
        city: null,
        county: null,
        district: null,
        id: 0,
        appId: null,
        parseStatus: null,
        province: null,
      };
    },
    closeDialog() {
      this.resetAddressForm();
      this.isShowForm = false;
      this.$refs["addressForm"].clearValidate();
    },
  },
};
</script>

<style lang="less" scoped>
.notarizationApplication {
  width: 100%;
  height: 100%;
  text-align: center;
  background: #ffffff;
  .contentTable {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
