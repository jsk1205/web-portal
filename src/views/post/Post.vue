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
        highlight-current-row
        class="table_left"
        row-key="orgId"
        height="770"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @cell-click="clickOrg"
      >
        <el-table-column prop="fullCname" label="名称" align="left" />
      </el-table>

      <el-table
        :data="tablePositionData"
        border
        stripe
        height="770"
        highlight-current-row
        class="table_right"
        row-key="orgId"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseOut"
      >
        <el-table-column
          prop="nameCn"
          label="中文名称"
          align="center"
        />
        <el-table-column
          prop="nameEn"
          label="英文名称"
          align="center"
        />
        <el-table-column
          prop="posId"
          label="岗位编号"
          align="center"
        />

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{ statusFilters(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="领域范围" align="center">
          <template slot-scope="scope">
            {{ domainFilters(scope.row.domain) }}
          </template>
        </el-table-column>
        <el-table-column prop="seqno" label="序号" align="center" />
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
          :style="active"
          @mouseover="mouseOver"
          @mouseleave="mouseLeave"
        >
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="positionTemp"
            label-position="right"
            label-width="100px"
          >
            <div class="content">
              <div style="margin:auto">
                <el-form-item label="排列序号">
                  <el-input
                    v-model="positionTemp.seqno"
                    placeholder="请输入排列序号"
                  />
                </el-form-item>
                <el-form-item prop="nameCn" label="中文名称">
                  <el-input
                    v-model="positionTemp.nameCn"
                    placeholder="请输入中文名称"
                  />
                </el-form-item>
                <el-form-item label="英文名称">
                  <el-input
                    v-model="positionTemp.nameEn"
                    placeholder="请输入英文名称"
                  />
                </el-form-item>
                <el-form-item prop="domain" label="领域范围">
                  <div class="module-border">
                    <el-radio-group v-model="positionTemp.domain">
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
                    v-model="positionTemp.status"
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
import { selectDomainOrg, selectPlatformOrg } from "@/api/organApi.js";
import {
  addPosition,
  deletePositionSoft,
  updatePosition,
  selectPosition,
} from "@/api/postApi.js";
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
      tablePositionData: [],
      statusFilterData: [],
      domainFilterData: [],
      accessFilterData: [],
      orgId: "",
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
        orgId: "",
        fullCname: "",
      },
      positionTemp: {
        address: null,
        domain: null,
        nameCn: null,
        nameEn: null,
        orgId: null,
        seqno: null,
        status: null,
        posId: null,
      },
      rules: {
        nameCn: [
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
      this.positionTemp.status = event;
    },
    setDomainValue(event) {
      this.positionTemp.domain = event;
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
    statusFilters2(value) {
      let data = "";
      this.statusFilterData.map(function(item) {
        if (value === item.text) {
          data = item.value;
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
          this.tableData = res.data;
          this.orgId = res.data[0].orgId;
          this.getPostList(this.orgId);
        });
      } else {
        selectPlatformOrg().then((res) => {
          this.tableData = res.data;
          this.orgId = res.data[0].orgId;
          this.getPostList(this.orgId);
        });
      }
    },
    clickOrg(row) {
      this.orgId = row.orgId;
      this.getPostList(row.orgId);
    },
    getPostList(orgId) {
      selectPosition(this.paginations.pageIndex, this.paginations.pageSize, {
        orgId: orgId,
      }).then((res) => {
        this.paginations.total = res.data.total;
        this.tablePositionData = res.data.list;
      });
    },
    handleDelete(row) {
      this.$confirm("是否确定删除此岗位?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deletePositionSoft(row.posId).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPostList(this.orgId);
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
          });
        });
    },
    handleEdit(row) {
      this.positionTemp = row;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    resetTemp() {
      this.positionTemp = {
        address: null,
        domain: null,
        nameCn: null,
        nameEn: null,
        orgId: null,
        seqno: null,
        status: null,
        posId: null,
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
          this.positionTemp.orgId = this.orgId;
          addPosition(this.positionTemp).then(() => {
            this.getPostList(this.orgId);
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "保存成功!",
            });
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.positionTemp.orgId = this.orgId;
          updatePosition(this.positionTemp).then(() => {
            this.dialogFormVisible = false;
            this.getPostList(this.orgId);
            this.$message({
              type: "success",
              message: "修改成功!",
            });
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
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getPostList(this.orgId);
    },
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getPostList(this.orgId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
