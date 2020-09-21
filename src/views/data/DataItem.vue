<template>
  <div class="manager-contain">
    <div class="content-header-search">
      <svg-icon
        :icon-class="add_icon_name"
        @mouseover="handleAddMouseOver"
        @mouseleave="handleAddMouseLeave"
        @click="handleCreate"
      />
      <svg-icon icon-class="back" @click="goBack" />
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
        <el-table-column label="名称" align="center">
          <template scope="scope">
            <div
              style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 1;-webkit-box-orient: vertical;"
            >{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="字段名称" align="center">
          <template scope="scope">
            <div
              style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;"
            >{{ scope.row.fieldName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性名称" align="center">
          <template scope="scope">
            <div
              style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;"
            >{{ scope.row.attributeName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="字段类型" align="center">
          <template slot-scope="scope">
            {{
            fieldDataTypeFilters(scope.row.dataType)
            }}
          </template>
        </el-table-column>
        <el-table-column property="totalLength" label="总长度" align="center"></el-table-column>
        <el-table-column property="decimalLength" label="小数点长度" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <svg-icon style="color:#bfcbd9" icon-class="edit" @click="handleEdit(scope.row)" />
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
    </div>
    <el-dialog
      :title="dialogStatus === 'create' ? '添加数据项' : '修改数据项'"
      :visible.sync="dialogFormVisible"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
      >
        <el-form-item prop="name" label="数据项名称">
          <el-input v-model="temp.name" placeholder="请输入数据项名称" />
        </el-form-item>
        <el-form-item prop="fieldName" label="字段名称">
          <el-input v-model="temp.fieldName" placeholder="请输入字段名称" />
        </el-form-item>
        <el-form-item prop="attributeName" label="属性名称">
          <el-input v-model="temp.attributeName" placeholder="请输入属性名称" />
        </el-form-item>
        <el-form-item prop="dataType" label="字段类型">
          <el-select v-model="temp.dataType" style="width:100%" placeholder="请选择字段类型">
            <el-option
              v-for="item in dataTypes"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="totalLength" label="总长度">
          <el-input
            v-model="temp.totalLength"
            placeholder="请输入总长度"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          />
        </el-form-item>
        <el-form-item prop="decimalLength" label="小数点长度">
          <el-input
            v-model="temp.decimalLength"
            placeholder="请输入小数点长度"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
          />
        </el-form-item>
        <el-form-item prop="allowEmpty" label="允许为空">
          <el-select v-model="temp.allowEmpty" style="width:100%" placeholder="请选择是否为空">
            <el-option
              v-for="item in yesNoFilterData"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="temp.seqno" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >确认</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addDataItem,
  deleteDataItem,
  updateDataItem,
  getDataItemList
} from "@/api/dataItem.js";
import { getDataType, getYesno } from "@/api/fliterApi.js";
import { Message } from "element-ui";
export default {
  props: {
    entityId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      add_icon_name: "add_no",
      tableData: [],
      dataTypes: [],
      yesNoFilterData: [],
      // 需要给分页组件传的信息
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 15, // 1页显示多少条
        pageSizes: [15, 20], // 每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {
        allowEmpty: null,
        dataType: null,
        decimalLength: null,
        attributeName: null,
        entityId: null,
        fieldName: null,
        isNative: "N",
        itemId: null,
        name: null,
        seqno: null,
        totalLength: null
      },
      rules: {
        name: [
          { required: true, message: "请输入数据项名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur"
          }
        ],
        fieldName: [
          { required: true, message: "请输入字段名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur"
          }
        ],
        attributeName: [
          { required: true, message: "请输入属性名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur"
          }
        ],

        dataType: [
          { required: true, message: "请选择字段类型", trigger: "change" }
        ],
        totalLength: [
          { required: true, message: "请输入总长度", trigger: "blur" }
        ],
        decimalLength: [
          { required: true, message: "请输入小数点长度", trigger: "blur" }
        ],
        allowEmpty: [
          { required: true, message: "请选择是否为空", trigger: "change" }
        ]
      }
    };
  },
  watch: {},
  created() {},
  mounted() {
    getDataType().then(res => {
      this.dataTypes = res.data;
    });
    getYesno().then(res => {
      this.yesNoFilterData = res.data;
    });
    this.getDataItemList();
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
    handleAddMouseOver() {
      this.add_icon_name = "add_yes";
    },
    handleAddMouseLeave() {
      this.add_icon_name = "add_no";
    },
    getDataItemList() {
      getDataItemList(this.paginations.pageIndex, this.paginations.pageSize, {
        entityId: this.entityId
      }).then(res => {
        this.paginations.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getDataItemList();
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getDataItemList();
    },
    handleDelete(row) {
      this.$confirm("是否确定删除此数据项?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(() => {
          deleteDataItem(row.itemId).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getDataItemList();
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除"
          });
        });
    },
    handleEdit(row) {
      this.temp = row;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetTemp() {
      this.temp = {
        allowEmpty: null,
        dataType: null,
        decimalLength: null,
        attributeName: null,
        entityId: null,
        fieldName: null,
        isNative: "N",
        itemId: null,
        name: null,
        seqno: null,
        totalLength: null
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
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.entityId = this.entityId;
          addDataItem(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.getDataItemList();
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          updateDataItem(this.temp).then(() => {
            this.dialogFormVisible = false;
            this.getDataItemList();
          });
        }
      });
    },
    goBack() {
      this.$emit("showDataManager");
    },
    closeDialog() {
      this.resetTemp();
      this.dialogFormVisible = false;
      this.$refs["dataForm"].clearValidate();
    },
    fieldDataTypeFilters(value) {
      let data = "";
      this.dataTypes.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
</style>
