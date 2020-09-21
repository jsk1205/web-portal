<!--  -->
<template>
  <div>
    <div v-if="isShowDataManager" v-show="isShowDataManager" class="dataBox">
      <div class="navTxt">
        <div class="txt">数据管理</div>
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
      </div>

      <div class="Box">
        <div v-for="(item, index) in CategoryEntityList" :key="index">
          <div class="tags">
            {{ item.name }}

            <el-dropdown v-if="item.isNative === 'N'">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline" />
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(Category, index) in Categoryoperate"
                  :key="index"
                  @click.native="categoryEdit(index, item)"
                  >{{ Category }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="tagesBox">
            <div
              v-for="(items, index) in item.entities"
              :key="index"
              class="contain"
            >
              <sapn
                class="icon"
                v-if="index % 3 == 0"
                :class="'el-icon-' + items.logo"
                style="color:#1E9FFF;"
              />
              <sapn
                class="icon"
                v-else-if="index % 3 == 1"
                :class="'el-icon-' + items.logo"
                style="color:#50D2C2;"
              />
              <sapn
                class="icon"
                v-else
                :class="'el-icon-' + items.logo"
                style="color:#FDA701;"
              />
              <span
                style="padding:0 10px;width:100px; overflow: hidden;text-align: center;"
                >{{ items.name }}</span
              >
              <div style="width: 20px; height: 20px;">
                <el-dropdown v-if="items.isNative === 'N'">
                  <span class="el-dropdown-link">
                    <i class="el-icon-edit-outline" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(Entity, index) in Entityoperate"
                      :key="index"
                      @click.native="entityEdit(index, items)"
                      >{{ Entity }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isShowSortDialog">
        <el-dialog
          title="添加分类"
          width="40%"
          :visible.sync="isShowSortDialog"
          :before-close="closeDialog"
          :close-on-click-modal="false"
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
          :close-on-click-modal="false"
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
            <el-form-item label="父实体">
              <el-select
                v-model="entityTemp.parentId"
                style="width:100%"
                placeholder="请选择父实体"
              >
                <el-option
                  v-for="item in AllEntityList"
                  :key="item.entityId"
                  :label="item.name"
                  :value="item.entityId"
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
    <DataItem
      v-if="isShowDataItem"
      v-show="isShowDataItem"
      @showDataManager="showDataManager"
      :entityId="entityId"
    />
  </div>
</template>

<script>
import {
  addEntity,
  getCategoryEntityList,
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
import elementIcons from "./element-icons";
import { getEntityType } from "@/api/fliterApi.js";
import DataItem from "./DataItem";
export default {
  components: { DataItem },
  data() {
    return {
      entityId: null,
      elementIcons,
      isShowSortDialog: false,
      isShowEntityDialog: false,
      isShowDataItem: false,
      isShowDataManager: true,
      CategoryEntityList: [],
      CategoryList: [],
      EntityTypeList: [],
      Entityoperate: ["编辑属性", "编辑数据项", "编辑表单", "编辑视图", "删除"],
      Categoryoperate: ["编辑属性", "删除"],
      AllEntityList: [],
      isCreateOrUpdateCategory: "create",
      isCreateOrUpdateEntity: "create",
      categoryTemp: {
        name: null,
        objId: null,
        isNative: "N",
        seqno: 0,
        parentId: 0,
      },
      entityTemp: {
        categoryId: "",
        logo: null,
        name: null,
        objId: null,
        isNative: "N",
        parentId: null,
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
    };
  },
  computed: {},
  mounted() {
    getEntityType().then((res) => {
      this.EntityTypeList = res.data;
    });
    this.getAllEntity();
    this.getSortList();
  },
  methods: {
    getAllEntity() {
      getEntityList({ objId: getStore("appId"), isDeleted: "N" }).then(
        (res) => {
          this.AllEntityList = res.data;
        }
      );
    },
    AddSort() {
      this.isShowSortDialog = true;
    },
    AddEntity() {
      this.isShowEntityDialog = true;
      this.entityTemp.logo = elementIcons[0];
      this.getAllEntity();
      this.getCategoryList();
    },
    categoryEdit(index, entity) {
      switch (index) {
        case 0:
          this.getCategoryDetail(entity.id);
          break;
        case 1:
          deleteCategory(entity.id).then((res) => {
            if (res.code === 1402) {
              this.$message({
                message: res.message,
              });
            } else {
              this.getSortList();
            }
          });
          break;
      }
    },
    entityEdit(index, entity) {
      switch (index) {
        case 0:
          this.getEntityDetail(entity.id);
          this.getCategoryList();
          break;
        case 1:
          this.entityId = entity.id;
          this.isShowDataItem = true;
          this.isShowDataManager = false;
          break;
        case 4:
          deleteEntity(entity.id).then(() => {
            this.getSortList();
          });
          break;
      }
    },
    getSortList() {
      const _this = this;
      getCategoryEntityList(getStore("appId"), "10").then((res) => {
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
        isNative: "N",
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
        isNative: "N",
        parentId: null,
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
            that.closeDialog();
          });
        }
      });
    },
    setEntityLogo(value) {
      this.entityTemp.logo = value;
    },
    getCategoryList() {
      selectCategoryList({
        objId: getStore("appId"),
        type: "10",
      }).then((res) => {
        this.CategoryList = res.data;
      });
    },
    getEntityDetail(id) {
      selectEntityDetail(id).then((res) => {
        this.isCreateOrUpdateEntity = "update";
        this.entityTemp = res.data;
        this.isShowEntityDialog = true;
      });
    },
    getCategoryDetail(id) {
      selectCategoryDetail(id).then((res) => {
        this.isCreateOrUpdateCategory = "update";
        this.isShowSortDialog = true;
        this.categoryTemp = res.data;
      });
    },
    showDataManager() {
      this.$nextTick(() => {
        this.isShowDataItem = false;
        this.isShowDataManager = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dataBox {
  display: flex;
  flex-direction: column;
  padding: 1%;
  background-color: #ffffff;
  .navTxt {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    padding: 5px 15px;
    .txt {
      color: #333;
      font-size: 20px;
      font-weight: bold;
    }
    .circle {
      cursor: pointer;
      i {
        font-size: 26px;
      }
    }
  }

  .Box {
    padding-left: 20px;
    .tags {
      font-size: 16px;
      margin: 30px 0px;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        margin-left: 5px;
        color: #999999;
        cursor: pointer;
      }
    }
    .tagesBox {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      .contain {
        width: 180px;
        height: 70px;
        border: 1px solid #ddd;
        padding: 20px;
        margin: 10px;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        border-radius: 1px;
        .icon {
          font-size: 25px;
        }
        i {
          font-size: 20px;
          cursor: pointer;
          color: #409eff;
          margin-left: 10px;
          display: none;
        }
        &:hover {
          background: #f3f3f3;
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;
          border-right: 2px solid rgb(172, 161, 161);
          border-bottom: 2px solid rgb(172, 161, 161);
        }
        &:hover i {
          display: block;
        }
      }
    }
  }

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
}
</style>
