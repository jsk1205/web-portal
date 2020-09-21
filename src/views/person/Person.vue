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
        height="756"
        highlight-current-row
        row-key="orgId"
        class="table_left"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @cell-click="clickOrg"
      >
        <el-table-column prop="fullCname" label="名称" align="left" />
      </el-table>

      <el-table
        :data="tablePersonData"
        border
        stripe
        height="756"
        highlight-current-row
        class="table_right"
        row-key="orgId"
        @cell-mouse-enter="handleMouseEnter"
        @cell-mouse-leave="handleMouseOut"
      >
        <el-table-column
          prop="nameCn"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="email"
          label="联系人邮箱"
          align="center"
        />
        <el-table-column
          prop="isDefault"
          label="默认身份"
          align="center"
        >
          <template slot-scope="scope">
            {{ isDefaultFileters(scope.row.isDefault) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
        />
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{ statusFilters(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="范围" align="center">
          <template slot-scope="scope">
            {{ domainFilters(scope.row.domain) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="personId"
          label="人员编号"
       
          align="center"
        />
        <el-table-column
          prop="employeeNo"
          label="员工编号"
          width="140"
          align="center"
        />
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
            :model="personTemp"
            label-position="right"
            label-width="100px"
          >
            <div class="content">
              <div class="content-left">
                <el-form-item prop="nameCn" label="中文姓名">
                  <el-input
                    v-model="personTemp.nameCn"
                    placeholder="请输入中文姓名"
                  />
                </el-form-item>
                <el-form-item label="英文姓名">
                  <el-input
                    v-model="personTemp.nameEn"
                    placeholder="请输入英文姓名"
                  />
                </el-form-item>
                <el-form-item label="电话号码">
                  <el-input
                    v-model="personTemp.phone"
                    placeholder="请输入电话号码"
                  />
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input
                    v-model="personTemp.mobile"
                    placeholder="请输入手机号"
                  />
                </el-form-item>
                <el-form-item label="通讯地址">
                  <el-input
                    v-model="personTemp.address"
                    placeholder="请输入通讯地址"
                  />
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input
                    v-model="personTemp.email"
                    placeholder="请输入电子邮箱"
                  />
                </el-form-item>
              </div>
              <div class="content-right">
                <el-form-item label="排列序号">
                  <el-input
                    v-model="personTemp.seqno"
                    placeholder="请输入排列序号"
                  />
                </el-form-item>
                <el-form-item label="员工编号">
                  <el-input
                    v-model="personTemp.employeeNo"
                    placeholder="请输入员工编号"
                  />
                </el-form-item>
                <el-form-item label="默认身份">
                  <div class="module-border">
                    <el-switch
                      v-model="personTemp.isDefault"
                      :active-value="yesNoFilterData[0].value"
                      :inactive-value="yesNoFilterData[1].value"
                      :active-text="yesNoFilterData[0].text"
                      :inactive-text="yesNoFilterData[1].text"
                    />
                  </div>
                </el-form-item>
                <el-form-item label="办公室">
                  <el-input
                    v-model="personTemp.office"
                    placeholder="请输入办公室"
                  />
                </el-form-item>
                <el-form-item prop="domain" label="领域范围">
                  <div class="module-border">
                    <el-radio-group v-model="personTemp.domain">
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
                    v-model="personTemp.status"
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
  addPerson,
  deletePersonSoft,
  updatePerson,
  selectPerson,
} from "@/api/personApi.js";
import {
  getDomain,
  getUserStatus,
  getUserAccess,
  getYesno,
} from "@/api/fliterApi.js";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      searchText: "",
      add_icon_name: "add_no",
      active: "",
      show: false,
      tableData: [],
      tablePersonData: [],
      statusFilterData: [],
      domainFilterData: [],
      accessFilterData: [],
      yesNoFilterData: [],
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
      personTemp: {
        address: null,
        creOperId: null,
        domain: null,
        email: null,
        employeeNo: null,
        isDefault: "Y",
        mobile: null,
        nameCn: null,
        nameEn: null,
        office: null,
        orgId: null,
        personId: null,
        phone: null,
        seqno: null,
        status: null,
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
    getYesno().then((res) => {
      this.yesNoFilterData = res.data;
    });
    this.getOrgList();
  },
  methods: {
    setStatusValue(event) {
      this.personTemp.status = event;
    },
    setDomainValue(event) {
      this.personTemp.domain = event;
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
    isDefaultFileters(value) {
      let data = "";
      this.yesNoFilterData.map(function(item) {
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
          this.tableData = res.data;
          this.orgId = res.data[0].orgId;
          this.getPersonList(this.orgId);
        });
      } else {
        selectPlatformOrg().then((res) => {
          this.tableData = res.data;
          this.orgId = res.data[0].orgId;
          this.getPersonList(this.orgId);
        });
      }
    },
    clickOrg(row) {
      this.orgId = row.orgId;
      this.getPersonList(row.orgId);
    },
    getPersonList(orgId) {
      selectPerson(this.paginations.pageIndex, this.paginations.pageSize, {
        orgId: orgId,
      }).then((res) => {
        this.paginations.total = res.data.total;
        this.tablePersonData = res.data.list;
      });
    },
    handleDelete(row) {
      this.$confirm("是否确定删除此人员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deletePersonSoft(row.personId).then(() => {
            this.deleteSuccessMsg();
            this.getPersonList(this.orgId);
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
          });
        });
    },
    handleEdit(row) {
      this.personTemp = row;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    resetTemp() {
      this.personTemp = {
        address: null,
        creOrgId: null,
        domain: null,
        email: null,
        employeeNo: null,
        isDefault: "Y",
        mobile: null,
        nameCn: null,
        nameEn: null,
        office: null,
        orgId: null,
        personId: null,
        phone: null,
        seqno: null,
        status: null,
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
          this.personTemp.orgId = this.orgId;
          addPerson(this.personTemp).then(() => {
            this.saveSuccessMsg();
            this.dialogFormVisible = false;
            this.getPersonList(this.orgId);
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.personTemp.orgId = this.orgId;
          updatePerson(this.personTemp).then(() => {
            this.updateSuccessMsg();
            this.dialogFormVisible = false;
            this.getPersonList(this.orgId);
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
      this.getPersonList(this.orgId);
    },
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getPersonList(this.orgId);
    },
    setPrincipalCanCreateValue(event) {
      this.personTemp.isDefault = event;
    },
    saveSuccessMsg() {
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
    deleteSuccessMsg() {
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    },
    updateSuccessMsg() {
      this.$message({
        type: "success",
        message: "修改成功!",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
