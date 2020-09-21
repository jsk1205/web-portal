<template>
  <div class="platform-model-info-class">
    <div v-if="isShowModelList" v-show="isShowModelList">
      <el-row>
        <el-col v-for="(template, index) in tempList" :key="index" class="view-contain2" :span="6">
          <el-card shadow="hover">
            <div class="card-content">
              <div class="content">
                <div class="title">
                  <img v-if="template.logoUrl" class="logo-css" :src="template.logoUrl" alt>
                  <img v-else class="logo-css" :src="logo" alt>
                  <span class="name">{{ template.fullCname }}</span>
                </div>
                <div class="discribe">{{ template.outline }}</div>
                <div class="footBtn">
                  <el-button
                    class="btnid"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click.native="handleEdit(template)"
                  />
                  <el-button
                    class="btnid"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click.native="handleDelete(template)"
                  />
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-card class="box-card2" shadow="hover">
          <div class="app-class-add">
            <svg-icon class="logo-css" icon-class="add_no" @click="handleCreate" />
          </div>
        </el-card>
      </el-row>
    </div>
    <modelInfo v-if="isShowModelInfo" v-show="isShowModelInfo" @showModelList="showModelList" />
  </div>
</template>

<script>
import ModelInfo from './ModelInfo'
import {
  deleteTemplate,
  selectTemplateListByDomain,
  selectTemplateListByPlatform
} from '@/api/templateApi.js'
import { getToken } from '@/utils/auth'
import logoImg from '@/assets/templateLogo.png'
import { setStore } from '@/utils/mUtils'
export default {
  components: { ModelInfo },
  data() {
    return {
      logo: logoImg,
      isShowModelList: true,
      isShowModelInfo: false,
      tempList: [],
      loading: true
    }
  },
  mounted() {
    this.getTemplateList()
  },
  methods: {
    getTemplateList() {
      if (getToken('Access') === 'DA') {
        selectTemplateListByDomain({}).then(res => {
          this.tempList = res.data
        })
      } else {
        selectTemplateListByPlatform({}).then(res => {
          this.tempList = res.data
        })
      }
    },
    handleDelete(template) {
      deleteTemplate(template.tplId).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getTemplateList()
      })
    },
    handleEdit(template) {
      setStore('templateId', template.tplId)
      this.$nextTick(() => {
        this.isShowModelList = false
        this.isShowModelInfo = true
      })
    },
    handleCreate() {
      setStore('templateId', '')
      this.$nextTick(() => {
        this.isShowModelList = false
        this.isShowModelInfo = true
      })
    },
    showModelList() {
      this.$nextTick(() => {
        this.isShowModelList = true
        this.isShowModelInfo = false
        this.getTemplateList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #dcdfe6;
  border-color: #dcdfe6;
}
.el-button--danger {
  background-color: #dcdfe6;
  border-color: #dcdfe6;
}
.el-button--success {
  background-color: #dcdfe6;
  border-color: #dcdfe6;
}

.el-card__body {
  padding: 5px;
}
</style>
