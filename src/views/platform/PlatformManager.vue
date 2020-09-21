<template>
  <div class="fillcontain">
    <el-row v-if="platListIsShow" v-show="platListIsShow">
      <el-col v-for="(platForm, index) in platList" :key="index" class="contain" :span="8">
        <el-card style="height:250px;" shadow="hover">
          <div class="card-content">
            <img :src="logo" class="logo-css">
            <el-divider direction="vertical" />
            <div class="content">
              <div class="title">
                {{
                  platForm.fullCname
                }}
              </div>
              <div class="discribe">
                {{
                  platForm.outline
                }}
              </div>
              <div class="footBtn">
                <el-button
                  class="btnid"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click.native="handleEdit(platForm.platformId)"
                />
                <el-button
                  v-show="isShow(platForm.status)"
                  class="btnid"
                  type="danger"
                  icon="el-icon-lock"
                  circle
                  @click.native="handleRefuse(platForm.platformId)"
                />
                <el-button
                  v-show="isShow(platForm.status)"
                  class="btnid"
                  type="success"
                  icon="el-icon-check"
                  circle
                  @click.native="handlePass(platForm.platformId)"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <PlatformInfo
      v-if="platFormInfoIsShow"
      v-show="platFormInfoIsShow"
      @showPlatFormList="showPlatFormList"
    />
  </div>
</template>

<script>
import PlatformInfo from './PlatformInfo'
import {
  deletePlatform,
  selectPlatformById,
  selectPlatformList,
  platformPass,
  platformRefuse
} from '@/api/platformApi.js'
import { getPlateformStatus } from '@/api/fliterApi.js'
import logoImg from '@/assets/platformLogo.png'
import { setStore } from '@/utils/mUtils'
export default {
  components: { PlatformInfo },
  data() {
    return {
      platListIsShow: true,
      platFormInfoIsShow: false,
      logo: logoImg,
      platformId: null,
      platList: [],
      loading: true,
      statusFilterData: []
    }
  },
  mounted() {
    getPlateformStatus().then(res => {
      this.statusFilterData = res.data
    })
    this.getPlatformList()
  },
  methods: {
    getPlatformList() {
      selectPlatformList({}).then(res => {
        this.platList = res.data
      })
    },
    handleDelete(row) {
      deletePlatform(row.platformId).then(() => {
        this.getPlatformList()
      })
    },
    handleEdit(platformId) {
      setStore('platformId', platformId)
      this.$nextTick(() => {
        this.platListIsShow = false
        this.platFormInfoIsShow = true
      })
    },
    showPlatFormList() {
      this.$nextTick(() => {
        this.platListIsShow = true
        this.platFormInfoIsShow = false
        this.getPlatformList()
      })
    },
    handleSelect(row) {
      selectPlatformById(row.platformId).then(() => {})
    },
    handlePass(platformId) {
      platformPass(platformId).then(() => {
        this.getPlatformList()
      })
    },
    handleRefuse(platformId) {
      platformRefuse(platformId).then(() => {
        this.getPlatformList()
      })
    },
    isShow(status) {
      switch (status) {
        case '1':
          return false
        case '2':
          return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fillcontain {
  .contain {
    padding-top: 25px;
    padding-left: 25px;
    padding-right: 25px;

    .card-content {
      display: flex;
      height: 210px;
      align-items: center;
      .logo-css {
        width: 25%;
        float: left;
      }
      .content {
        float: right;
        width: 263px;
        height: 179px;
        position: relative;
        .title {
          text-align: center;
          line-height: 60px;
          font-size: 20px;
        }

        .discribe {
          line-height: 30px;
          font-size: 16px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 2;
        }
        .footBtn {
          text-align: right;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
}

.el-divider--vertical {
  height: 179px;
  margin-left: 20px;
  margin-right: 20px;
  width: 1px;
}

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
</style>
