<template>
  <div class="manager-contain">
    <div :class="{ show: show }" class="content-header-search">
      <svg-icon icon-class="search" @click.stop="click" />

      <el-input
        ref="headerSearchSelect"
        v-model="searchText"
        placeholder="请输入内容"
        class="header-search-select"
        @keyup.enter.native="getUserListByKeyWords"
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
        height="756"
        highlight-current-row
        style="width:100%"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseOut"
      >
        <el-table-column
          property="username"
          label="用户账号"
          align="center"
        />
        <el-table-column
          property="type"
          label="用户类别"
          align="center"
        >
          <template slot-scope="scope">{{
            typeFilters(scope.row.type)
          }}</template>
        </el-table-column>
        <el-table-column label="领域范围"  align="center">
          <template slot-scope="scope">{{
            domainFilters(scope.row.domain)
          }}</template>
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">{{
            statusFilters(scope.row.status)
          }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
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
        :visible.sync="dialogFormVisible"
        direction="rtl"
        :modal="false"
        :show-close="false"
        size="100%"
        class="form-container"
      >
        <div
          class="form-content"
          style="padding-top:10%"
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
                <el-form-item label="用户编号">
                  <el-input v-model="temp.userId" :disabled="true" />
                </el-form-item>
                <el-form-item prop="username" label="用户账号">
                  <el-input
                    v-model="temp.username"
                    placeholder="请输入用户账号"
                  />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                  <el-input
                    v-model="temp.password"
                    placeholder="请输入密码"
                    type="password"
                  />
                </el-form-item>
                <el-form-item label="用户类别">
                  <div class="module-border">
                    <el-switch
                      v-model="usertype"
                      active-text="企业"
                      inactive-text="个人"
                    />
                  </div>
                </el-form-item>
              </div>
              <div class="content-right">
                <el-form-item label="绑定编号">
                  <el-input v-model="temp.bindId" :disabled="true" />
                </el-form-item>
                <el-form-item prop="access" label="存取级别">
                  <div class="module-border">
                    <el-radio-group v-model="temp.access">
                      <el-radio
                        v-for="item in accessFilterData"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                        @change="setAccessValue(item.value)"
                        >{{ item.text }}</el-radio
                      >
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item label="领域范围">
                  <div class="module-border">
                    <el-radio-group v-model="temp.domain">
                      <el-radio
                        v-for="item in domainFilterData"
                        :key="item.value"
                        :disabled="true"
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
  addDomainUser,
  addPlatformUser,
  selectDomainUser,
  selectPlatformUser,
  deleteUserById,
  updateUserById,
  selectUserByKeyWords,
} from "@/api/userApi.js";
import {
  getDomain,
  getUserStatus,
  getUserType,
  getUserAccess,
} from "@/api/fliterApi.js";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";
export default {
  data() {
    return {
      usertype: true,
      searchText: "",
      add_icon_name: "add_no",
      active: "",
      show: false,
      tableData: [],
      statusFilterData: [],
      domainFilterData: [],
      typeFilterData: [],
      accessFilterData: [],
      // 需要给分页组件传的信息
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 15, // 1页显示多少条
        pageSizes: [15, 20], // 每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
      },
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {
        username: null,
        userId: null,
        platformId: null,
        access: null,
        bindId: null,
        domain: null,
        password: null,
        status: null,
        type: null,
      },
      rules: {
        access: [
          { required: true, message: "请选择存取级别", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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
      this.domainFilterData.splice(2, 1);
    });
    getUserStatus().then((res) => {
      this.statusFilterData = res.data;
    });
    getUserType().then((res) => {
      this.typeFilterData = res.data;
    });
    getUserAccess().then((res) => {
      this.accessFilterData = res.data;
    });
    this.getUserList();
  },
  methods: {
    setAccessValue(event) {
      this.temp.access = event;
    },
    setDomainValue(event) {
      this.temp.domain = event;
    },
    handleMouseEnter: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#64d9d6";
      cell.children[0].children[0].children[1].style.color = "#f56c6c";
    },
    handleMouseOut: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#bfcbd9";
      cell.children[0].children[0].children[1].style.color = "#bfcbd9";
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
    typeFilters(value) {
      let data = "";
      this.typeFilterData.map(function(item) {
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
    getUserListByKeyWords() {
      if (this.searchText !== null && this.searchText !== "") {
        selectUserByKeyWords(
          this.paginations.pageIndex,
          this.paginations.pageSize,
          this.searchText
        ).then((res) => {
          this.paginations.total = res.data.total;
          this.tableData = res.data.list;
        });
      }
    },
    getUserList() {
      if (getToken("Access") === "DA") {
        selectDomainUser(
          this.paginations.pageIndex,
          this.paginations.pageSize
        ).then((res) => {
          this.paginations.total = res.data.total;
          this.tableData = res.data.list;
        });
      } else {
        selectPlatformUser(
          this.paginations.pageIndex,
          this.paginations.pageSize
        ).then((res) => {
          this.paginations.total = res.data.total;
          this.tableData = res.data.list;
        });
      }
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getUserList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getUserList();
    },
    handleDelete(row) {
      this.$confirm("是否确定删除此用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteUserById(row.userId).then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
          });
        });
    },
    handleEdit(row) {
      this.temp = row;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      if (row.type) {
        this.usertype = row.type === "C" ? false : row.type === "B";
      }
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetTemp() {
      this.temp = {
        username: null,
        userId: null,
        platformId: null,
        access: null,
        bindId: null,
        domain: null,
        password: null,
        status: null,
        type: null,
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
          if (this.usertype) {
            this.temp.type = "B";
          } else {
            this.temp.type = "C";
          }
          if (this.temp.status) {
            if (getToken("Access") === "DA") {
              addDomainUser(this.temp).then(() => {
                this.dialogFormVisible = false;
                this.getUserList();
              });
            } else {
              addPlatformUser(this.temp).then(() => {
                this.dialogFormVisible = false;
                this.getUserList();
              });
            }
          } else {
            Message({
              message: "请选择状态",
              type: "error",
              duration: 3 * 1000,
            });
          }
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.usertype) {
            this.temp.type = "B";
          } else {
            this.temp.type = "C";
          }
          updateUserById(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.getUserList();
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
  },
};
</script>

<style lang="scss" scoped></style>
