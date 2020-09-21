<template>
  <div class="manager-contain">
    <div :class="{ show: show }" class="content-header-search">
      <svg-icon icon-class="search" @click.stop="click" />
      <el-input
        ref="headerSearchSelect"
        v-model="searchText"
        placeholder="请输入内容"
        class="header-search-select"
      />
      <svg-icon
        :icon-class="add_icon_name"
        @mouseover="handleAddMouseOver"
        @mouseleave="handleAddMouseLeave"
        @click="handleCreate"
      />
    </div>
    <div class="table-contain">
      <el-table
        :data="tableData"
        border
        stripe
        height="800"
        highlight-current-row
        style="width:100%"
        row-key="orgId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseOut"
      >
        <el-table-column
          prop="fullCname"
          label="名称"
          align="left"
        />
        <el-table-column prop="orgId" label="编号"  align="center" />
        <el-table-column
          prop="shortCname"
          label="简称"
          align="center"
        />
        <el-table-column
          prop="contactName"
          label="联系人姓名"
          align="center"
        />
        <el-table-column
          prop="contactPhone"
          label="联系人电话"
          align="center"
        />
        <el-table-column
          prop="contactEmail"
          label="联系人邮箱"
          align="center"
        />
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">
            {{ statusFilters(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="领域范围" align="center">
          <template slot-scope="scope">
            {{ domainFilters(scope.row.domain) }}
          </template>
        </el-table-column>
        <el-table-column prop="seqno" label="序号" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <svg-icon
                style="color:#bfcbd9"
                icon-class="add"
                @click="handleAdd(scope.row)"
              />
              <svg-icon
                style="color:#bfcbd9"
                icon-class="edit"
                @click="handleEdit(scope.row)"
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

      <el-drawer
        ref="drawer"
        :visible.sync="dialogFormVisible"
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
            :rules="rules"
            :model="temp"
            label-position="right"
            label-width="100px"
          >
            <div class="content">
              <div class="content-left">
                <el-form-item label="父级编号">
                  <el-input v-model="temp.parentOrgId" :disabled="true" />
                </el-form-item>
                <el-form-item prop="fullCname" label="中文名称">
                  <el-input
                    v-model="temp.fullCname"
                    placeholder="请输入中文名称"
                  />
                </el-form-item>
                <el-form-item label="中文简称">
                  <el-input
                    v-model="temp.shortCname"
                    placeholder="请输入中文简称"
                  />
                </el-form-item>
                <el-form-item label="英文名称">
                  <el-input
                    v-model="temp.fullEname"
                    placeholder="请输入英文名称"
                  />
                </el-form-item>
                <el-form-item label="英文简称">
                  <el-input
                    v-model="temp.shortEname"
                    placeholder="请输入英文简称"
                  />
                </el-form-item>
                <el-form-item label="联系人姓名">
                  <el-input
                    v-model="temp.contactName"
                    placeholder="请输入联系人姓名"
                  />
                </el-form-item>
                <el-form-item label="联系人电话">
                  <el-input
                    v-model="temp.contactPhone"
                    placeholder="请输入联系人电话"
                  />
                </el-form-item>
                <el-form-item label="联系人邮箱">
                  <el-input
                    v-model="temp.contactEmail"
                    placeholder="请输入联系人邮箱"
                  />
                </el-form-item>
              </div>
              <div class="content-right">
                <el-form-item label="排列序号">
                  <el-input v-model="temp.seqno" placeholder="请输入排列序号" />
                </el-form-item>
                <el-form-item label="电话号码">
                  <el-input v-model="temp.phone" placeholder="请输入电话号码" />
                </el-form-item>
                <el-form-item label="传真号码">
                  <el-input v-model="temp.fax" placeholder="请输入传真号码" />
                </el-form-item>
                <el-form-item label="单位邮箱">
                  <el-input v-model="temp.email" placeholder="请输入单位邮箱" />
                </el-form-item>
                <el-form-item label="主页地址">
                  <el-input
                    v-model="temp.homePage"
                    placeholder="请输入主页地址"
                  />
                </el-form-item>
                <el-form-item label="通讯地址">
                  <el-input
                    v-model="temp.address"
                    placeholder="请输入通讯地址"
                  />
                </el-form-item>
                <el-form-item prop="domain" label="领域范围">
                  <div class="module-border">
                    <el-radio-group v-model="temp.domain">
                      <el-radio
                        v-for="item in domainFilterData"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                        @change="setDomainValue(item.value)"
                        >{{ item.text }}</el-radio
                      >
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item prop="status" label="状态">
                  <el-select
                    v-model="temp.status"
                    style="width:100%"
                    placeholder="请选择状态"
                    @change="setStatusValue"
                  >
                    <el-option
                      v-for="item in statusFilterData"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div slot="footer" class="form-footer">
            <el-button class="cancle-btn" @click="dialogFormVisible = false"
              >取消</el-button
            >

            <el-button
              type="primary"
              class="affirm-btn"
              @click="dialogStatus === 'create' ? createData() : updateData()"
              >确认</el-button
            >
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  addDomainOrg,
  addPlatformOrg,
  deleteOrg,
  deleteAffirmOrg,
  updateOrg,
  selectDomainOrg,
  selectPlatformOrg,
} from "@/api/organApi.js";
import { getDomain, getUserStatus, getUserAccess } from "@/api/fliterApi.js";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      searchText: "",
      add_icon_name: "add_no",
      active: "",
      show: false,
      tableData: [],
      statusFilterData: [],
      domainFilterData: [],
      accessFilterData: [],
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {
        orgId: "",
        fullCname: "",
        fullEname: "",
        address: "",
        platformId: "",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        domain: "",
        email: "",
        fax: "",
        homePage: "",
        parentOrgId: "",
        phone: "",
        seqno: 0,
        shortCname: "",
        shortEname: "",
        status: "",
      },
      rules: {
        fullCname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        domain: [
          { required: true, message: "请选择领域范围", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  watch: {
    show(value) {
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    },
  },
  created() {},
  mounted() {
    getDomain().then((res) => {
      this.domainFilterData = res.data;
    });
    getUserStatus().then((res) => {
      this.statusFilterData = res.data;
    });
    getUserAccess().then((res) => {
      this.accessFilterData = res.data;
    });
    this.getOrgList();
  },
  methods: {
    setStatusValue(event) {
      this.temp.status = event;
    },
    setDomainValue(event) {
      this.temp.domain = event;
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
    accessFilters(value) {
      let data = "";
      this.accessFilterData.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    statusFilters(value) {
      let data = "";
      this.statusFilterData.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    domainFilters(value) {
      let data = "";
      this.domainFilterData.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
    handleAddMouseOver() {
      this.add_icon_name = "add_yes";
    },
    handleAddMouseLeave() {
      this.add_icon_name = "add_no";
    },
    mouseOver() {
      this.active =
        "box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);";
    },
    mouseLeave() {
      this.active = "";
    },
    getOrgList() {
      if (getToken("Access") === "DA") {
        selectDomainOrg().then((res) => {
          this.loading = false;
          this.tableData = res.data;
        });
      } else {
        selectPlatformOrg().then((res) => {
          this.loading = false;
          this.tableData = res.data;
        });
      }
    },
    handleDelete(row) {
      this.$confirm("是否确定删除此机构?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteOrg(row.orgId).then((res) => {
            if (res.code === 1402) {
              this.$confirm(res.message + ", 是否继续删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
              })
                .then(() => {
                  deleteAffirmOrg(row.orgId).then(() => {
                    this.deleteSuccessMsg();
                    this.getOrgList();
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消删除",
                  });
                });
            } else if (res.code === 1200) {
              this.deleteSuccessMsg();
              this.getOrgList();
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
          });
        });
    },

    handleAdd(row) {
      this.resetTemp();
      this.temp.parentOrgId = row.orgId;
      this.temp.platformId = row.orgId;
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },

    handleEdit(row) {
      this.temp = row;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    resetTemp() {
      this.temp = {
        orgId: "",
        fullCname: "",
        fullEname: "",
        address: "",
        contactEmail: "",
        contactName: "",
        contactPhone: "",
        domain: "",
        email: "",
        platformId: "",
        fax: "",
        homePage: "",
        parentOrgId: "",
        phone: "",
        seqno: 0,
        shortCname: "",
        shortEname: "",
        status: "",
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (getToken("Access") === "DA") {
            addDomainOrg(this.temp).then(() => {
              this.dialogFormVisible = false;
              this.getOrgList();
            });
          } else {
            addPlatformOrg(this.temp).then(() => {
              this.dialogFormVisible = false;
              this.getOrgList();
            });
          }
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updateOrg(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.getOrgList();
          });
        }
      });
    },
    click() {
      this.show = !this.show;
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus();
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
      this.options = [];
      this.show = false;
    },
    deleteSuccessMsg() {
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
