<template>
  <div class="manager-contain">
    <div class="table-contain2">
      <div class="table-contain-left">
        <div class="circle">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-circle-plus-outline" style="color:#b2b2b2" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="AddSort"
                >添加分类</el-dropdown-item
              >
              <el-dropdown-item @click.native="AddEntity"
                >添加实体</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-table
          :data="CategoryEntityList"
          border
          stripe
          highlight-current-row
          row-key="id"
          height="770"
          :default-expand-all="false"
          :tree-props="{ children: 'entities', hasChildren: 'hasChildren' }"
          @row-click="clickOrg"
          @cell-mouse-enter="handleMouseEnter"
          @cell-mouse-leave="handleMouseOut"
        >
          <el-table-column prop="name" label="名称" align="left" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div>
                <svg-icon
                  style="color:#bfcbd9"
                  icon-class="edit"
                  @click.stop
                  @click="handleEdit(scope.row)"
                />
                <svg-icon
                  style="color:#bfcbd9"
                  icon-class="delete"
                  @click.stop
                  @click="handleDelete(scope.row)"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-contain-right">
        <div class="circle">
          <svg-icon
            icon-class="sync"
            @click.stop
            @click="clickSyncDataItem()"
          />
        </div>
        <el-table
          :data="tableData"
          border
          stripe
          height="770"
          highlight-current-row
          style="width:100%"
          @cell-mouse-enter="handleMouseEnter"
          @cell-mouse-leave="handleMouseOut"
        >
          <el-table-column label="名称" align="center">
            <template scope="scope">
              <div
                style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 1;-webkit-box-orient: vertical;"
              >
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="字段名称" align="center">
            <template scope="scope">
              <div
                style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;"
              >
                {{ scope.row.fieldName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="字段类型" align="center">
            <template slot-scope="scope">{{
              fieldDataTypeFilters(scope.row.dataType)
            }}</template>
          </el-table-column>
          <el-table-column property="totalLength" label="总长度" align="center">
          </el-table-column>
          <el-table-column
            property="decimalLength"
            label="小数点长度"
            align="center"
          >
          </el-table-column>
        </el-table>
        
      </div>
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
    <div v-if="isShowSortDialog">
      <el-dialog
        title="添加分类"
        width="40%"
        :visible.sync="isShowSortDialog"
        :before-close="closeDialog"
      >
        <el-form
          ref="sortDataForm"
          :model="categoryTemp"
          :rules="sortRules"
          label-position="right"
          label-width="100px"
        >
          <el-form-item prop="name" label="分类名称">
            <el-input v-model="categoryTemp.name" />
          </el-form-item>
          <el-form-item label="序号">
            <el-input v-model="categoryTemp.seqno" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              isCreateOrUpdateCategory == 'create'
                ? submitCategoryData()
                : updateCategoryData()
            "
            >确 定</el-button
          >
          <el-button @click="closeDialog">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-if="isShowEntityDialog">
      <el-dialog
        title="添加实体"
        :visible.sync="isShowEntityDialog"
        width="30%"
        :before-close="closeDialog"
      >
        <el-form
          ref="entityDataForm"
          :model="entityTemp"
          :rules="entityRules"
          label-position="right"
          label-width="100px"
          style="margin:19px;"
        >
          <el-form-item prop="name" label="实体名称">
            <el-input v-model="entityTemp.name" />
          </el-form-item>
          <el-form-item prop="categoryId" label="所属类别">
            <el-select
              v-model="entityTemp.categoryId"
              style="width:100%"
              placeholder="请选择类别"
            >
              <el-option
                v-for="item in CategoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="type" label="类型">
            <el-select
              v-model="entityTemp.type"
              style="width:100%"
              placeholder="请选择类型"
            >
              <el-option
                v-for="item in EntityTypeList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="序号">
            <el-input v-model="entityTemp.seqno" />
          </el-form-item>
          <el-form-item label="自定义图标">
            <div class="grid">
              <div v-for="item in elementIcons" :key="item">
                <div class="icon-item">
                  <el-button
                    v-if="entityTemp.logo == item"
                    style="color: #409eff;background: #ecf5ff;border-color: #b3d8ff;"
                    :icon="'el-icon-' + item"
                    @click="setEntityLogo(item)"
                  />
                  <el-button
                    v-else
                    :icon="'el-icon-' + item"
                    @click="setEntityLogo(item)"
                  />
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              isCreateOrUpdateEntity == 'create'
                ? submitEntityData()
                : updateEntityData()
            "
            >确 定</el-button
          >
          <el-button @click="closeDialog">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  addEntity,
  getSystemCategoryEntityList,
  getEntityList,
  deleteEntity,
  updateEntity,
  selectEntityDetail,
} from "@/api/dataEntityApi.js";
import {
  addCategory,
  selectCategoryList,
  selectCategoryDetail,
  updateCategory,
  deleteCategory,
} from "@/api/categoryApi.js";
import { getStore } from "@/utils/mUtils";
import elementIcons from "../data/element-icons";
import { getEntityType } from "@/api/fliterApi.js";
import { getDataItemList, syncDataItem } from "@/api/dataItem.js";
import { getDataType, getYesno } from "@/api/fliterApi.js";
export default {
  name: "",
  data() {
    return {
      elementIcons,
      add_icon_name: "add_no",
      elementIcons,
      entityId: null,
      entityType: null,
      isShowSortDialog: false,
      isShowEntityDialog: false,
      EntityTypeList: [],
      CategoryEntityList: [],
      CategoryList: [],
      isCreateOrUpdateCategory: "create",
      isCreateOrUpdateEntity: "create",
      categoryTemp: {
        name: null,
        objId: null,
        isNative: "Y",
        seqno: 0,
        parentId: 0,
      },
      entityTemp: {
        categoryId: "",
        logo: null,
        name: null,
        objId: null,
        parentId: null,
        isNative: "Y",
        seqno: 0,
        type: null,
      },
      sortRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      },
      entityRules: {
        name: [{ required: true, message: "请输入实体名称", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择类别", trigger: "change" },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
      tableData: [],
      dataTypes: [],
      yesNoFilterData: [],
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
    getEntityType().then((res) => {
      this.EntityTypeList = res.data;
    });
    this.getSortList();
    getDataType().then((res) => {
      this.dataTypes = res.data;
    });
    getYesno().then((res) => {
      this.yesNoFilterData = res.data;
    });
  },
  methods: {
    handleAddMouseOver() {
      this.add_icon_name = "add_yes";
    },
    handleAddMouseLeave() {
      this.add_icon_name = "add_no";
    },
    handleMouseEnter: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#42b983";
      cell.children[0].children[0].children[1].style.color = "#f56c6c";
    },
    handleMouseOut: function(row, column, cell, event) {
      cell.children[0].children[0].children[0].style.color = "#bfcbd9";
      cell.children[0].children[0].children[1].style.color = "#bfcbd9";
    },
    clickOrg(row) {
      if (row.editFlag == "ST") {
        this.entityId = row.id;
        this.entityType = row.type;
        this.getDataItemList(row.id);
      } else {
        this.paginations.total = 0;
        this.tableData = null;
      }
    },
    handleEdit(row) {
      if (row.editFlag == "FL") {
        selectCategoryDetail(row.id).then((res) => {
          this.isCreateOrUpdateCategory = "update";
          this.isShowSortDialog = true;
          this.categoryTemp = res.data;
        });
      } else {
        selectCategoryList({
          objId: getStore("appId"),
          type: "10",
        }).then((res) => {
          this.CategoryList = res.data;
        });
        selectEntityDetail(row.id).then((res) => {
          this.isCreateOrUpdateEntity = "update";
          this.entityTemp = res.data;
          this.isShowEntityDialog = true;
        });
      }
    },
    clickSyncDataItem() {
      if (this.entityId != null && this.entityType != null) {
        syncDataItem(this.entityId, this.entityType).then(() => {
          this.getDataItemList(this.entityId);
        });
      } else {
        this.$message({
          message: "请选中左侧实体",
        });
      }
    },
    handleDelete(row) {
      if (row.editFlag == "FL") {
        deleteCategory(row.id).then((res) => {
          if (res.code === 1402) {
            this.$message({
              message: res.message,
            });
          } else {
            this.getSortList();
          }
        });
      } else {
        deleteEntity(row.id).then(() => {
          this.getSortList();
        });
      }
    },
    AddSort() {
      this.isShowSortDialog = true;
    },
    AddEntity() {
      selectCategoryList({
        objId: getStore("appId"),
        type: "10",
      }).then((res) => {
        this.CategoryList = res.data;
        if (this.CategoryList.length > 0) {
          this.isShowEntityDialog = true;
          this.entityTemp.logo = elementIcons[0];
        } else {
          this.$message({
            message: "请先添加分类",
          });
        }
      });
    },

    getSortList() {
      const _this = this;
      getSystemCategoryEntityList(getStore("appId"), "10").then((res) => {
        if (res.data) {
          _this.CategoryEntityList = res.data[0].categories;
        }
      });
    },
    closeDialog() {
      this.resetcategoryTemp();
      this.resetEntityTemp();
      this.isShowSortDialog = false;
      this.isShowEntityDialog = false;
      this.$refs["sortDataForm"].clearValidate();
      this.$refs["entityDataForm"].clearValidate();
    },
    resetcategoryTemp() {
      this.categoryTemp = {
        name: null,
        objId: null,
        isNative: "Y",
        seqno: 0,
        parentId: 0,
      };
    },
    resetEntityTemp() {
      this.entityTemp = {
        categoryId: "",
        logo: null,
        name: null,
        objId: null,
        parentId: null,
        isNative: "Y",
        seqno: 0,
        type: null,
      };
    },
    submitCategoryData() {
      let that = this;
      this.$refs["sortDataForm"].validate((valid) => {
        if (valid) {
          that.categoryTemp.objId = getStore("appId");
          addCategory(this.categoryTemp).then(() => {
            this.getSortList();
            this.resetcategoryTemp();
            this.closeDialog();
          });
        }
      });
    },
    updateCategoryData() {
      this.$refs["sortDataForm"].validate((valid) => {
        if (valid) {
          updateCategory(this.categoryTemp).then(() => {
            this.getSortList();
            this.resetcategoryTemp();
            this.closeDialog();
          });
        }
      });
    },
    submitEntityData() {
      const that = this;
      this.$refs["entityDataForm"].validate((valid) => {
        if (valid) {
          that.entityTemp.objId = getStore("appId");
          addEntity(this.entityTemp).then(() => {
            that.getSortList();
            that.resetEntityTemp();
            that.closeDialog();
          });
        }
      });
    },
    updateEntityData() {
      const that = this;
      this.$refs["entityDataForm"].validate((valid) => {
        if (valid) {
          updateEntity(this.entityTemp).then(() => {
            that.isCreateOrUpdateEntity = "create";
            that.getSortList();
            that.resetEntityTemp();
            that.closeDialog();
          });
        }
      });
    },
    setEntityLogo(value) {
      this.entityTemp.logo = value;
    },
    getDataItemList(entityId) {
      getDataItemList(this.paginations.pageIndex, this.paginations.pageSize, {
        entityId: entityId,
      }).then((res) => {
        this.paginations.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getDataItemList(this.entityId);
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page;
      this.getDataItemList(this.entityId);
    },
    fieldDataTypeFilters(value) {
      let data = "";
      this.dataTypes.map(function(item) {
        if (value === item.value) {
          data = item.text;
        }
      });
      return data;
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  height: 170px;
  overflow-y: auto;
  position: relative;
}

.icon-item {
  margin: 5px;
  text-align: center;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}
</style>
