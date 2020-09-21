<template>
  <div class="platform-model-info-class">
    <div v-if="platFormInfoIsShow" v-show="platFormInfoIsShow">
      <el-row>
        <el-col class="view-header">
          <div>
            <div class="view-header-image">
              <img
                v-if="websiteinfoTemp.logoUrl"
                class="image"
                :src="websiteinfoTemp.logoUrl"
                alt
              />
              <img v-else class="image" :src="logo" alt />
            </div>

            <div class="view-header-text">
              <span>{{ platformTemp.fullCname }}</span>
              <span class="text">{{ platformTemp.outline }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-divider />
      <el-row class="view-contain">
        <el-col>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="应用管理" name="first">
              <el-row>
                <el-col v-for="(app, index) in appList" :key="index" :span="4">
                  <el-card class="box-card" shadow="hover">
                    <div class="app-image-class">
                      <img class="applogo" :src="appLogo" />
                    </div>
                    <div class="app-title-class">
                      <span>{{ app.fullCname }}</span>
                    </div>
                    <div class="text">
                      <span>{{ app.outline }}</span>
                    </div>
                    <div class="app-btn-class">
                      <el-button
                        type="primary"
                        circle
                        class="btnid"
                        icon="el-icon-edit"
                        @click="handleEdit(app.appId)"
                      />
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        @click="handleDelete(app.appId)"
                      />
                      <el-button
                        type="success"
                        icon="el-icon-success"
                        circle
                        @click="handleSubmit(app.appId)"
                      />
                    </div>
                  </el-card>
                </el-col>
                <el-card class="box-card" shadow="hover">
                  <div class="app-class-add">
                    <svg-icon icon-class="add_no" @click="handleCreate" />
                  </div>
                </el-card>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="基本设置" name="second">
              <div class="form-content">
                <el-form
                  ref="dataForm"
                  :rules="rules"
                  :model="platformTemp"
                  label-position="right"
                  label-width="100px"
                  style="padding-top: 80px;"
                >
                  <div class="content">
                    <div class="content-left">
                      <el-form-item prop="fullCname" label="中文名称">
                        <el-input
                          v-model="platformTemp.fullCname"
                          placeholder="请输入中文名称"
                        />
                      </el-form-item>
                      <el-form-item label="英文名称">
                        <el-input
                          v-model="platformTemp.fullEname"
                          placeholder="请输入英文名称"
                        />
                      </el-form-item>
                      <el-form-item label="联系人姓名">
                        <el-input
                          v-model="platformTemp.contactName"
                          placeholder="请输入联系人姓名"
                        />
                      </el-form-item>
                      <el-form-item label="联系人电话">
                        <el-input
                          v-model="platformTemp.contactPhone"
                          placeholder="请输入联系人电话"
                        />
                      </el-form-item>
                      <el-form-item prop="status" label="状态">
                        <el-select
                          v-model="platformTemp.status"
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
                    <div class="content-right">
                      <el-form-item label="中文简称">
                        <el-input
                          v-model="platformTemp.shortCname"
                          placeholder="请输入中文简称"
                        />
                      </el-form-item>
                      <el-form-item label="英文简称">
                        <el-input
                          v-model="platformTemp.shortEname"
                          placeholder="请输入英文简称"
                        />
                      </el-form-item>
                      <el-form-item label="联系人邮箱">
                        <el-input
                          v-model="platformTemp.contactEmail"
                          placeholder="请输入联系人邮箱"
                        />
                      </el-form-item>
                      <el-form-item>
                        <el-input
                          v-model="platformTemp.outline"
                          style="width: 490px"
                          type="textarea"
                          :rows="5"
                          placeholder="请输入简要描述"
                        />
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
                <div slot="footer" class="form-footer">
                  <el-button
                    type="primary"
                    class="affirm-btn"
                    @click="submitPlatformForm"
                    >保存</el-button
                  >
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="网站信息" name="third">
              <div class="form-content">
                <el-form
                  ref="websiteInfoDataForm"
                  :rules="rules"
                  :model="websiteinfoTemp"
                  label-position="right"
                  label-width="120px"
                >
                  <div
                    class="content"
                    style="height: 470px;
                overflow-y: auto;"
                  >
                    <div class="content-left">
                      <el-upload
                        action
                        class="div-logo-class"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="setPlatformWebsiteInfoLogo"
                        accept="image/jpg, image/jpeg, image/png"
                      >
                        <img
                          v-if="websiteinfoTemp.logoUrl"
                          class="logo"
                          :src="websiteinfoTemp.logoUrl"
                          alt
                        />
                        <img v-else class="logo" :src="logo" alt />
                      </el-upload>
                      <el-form-item label="中文名称">
                        <el-input
                          v-model="websiteinfoTemp.fullCname"
                          placeholder="请输入中文名称"
                        />
                      </el-form-item>
                      <el-form-item label="英文名称">
                        <el-input
                          v-model="websiteinfoTemp.fullEname"
                          placeholder="请输入英文名称"
                        />
                      </el-form-item>
                      <el-form-item label="公司简称">
                        <el-input
                          v-model="websiteinfoTemp.smsTitle"
                          placeholder="请输入公司简称"
                        />
                      </el-form-item>
                      <el-form-item label="版权信息">
                        <el-input
                          v-model="websiteinfoTemp.copyright"
                          placeholder="请输入版权信息"
                        />
                      </el-form-item>
                      <el-form-item label="ICP备案号">
                        <el-input
                          v-model="websiteinfoTemp.icpNo"
                          placeholder="请输入ICP备案号"
                        />
                      </el-form-item>
                      <el-form-item label="SMTP账号">
                        <el-input
                          v-model="websiteinfoTemp.smtpUsername"
                          placeholder="请输入SMTP账号"
                        />
                      </el-form-item>
                      <el-form-item label="客服QQ">
                        <el-input
                          v-model="websiteinfoTemp.qqNo"
                          placeholder="请输入客服QQ"
                        />
                      </el-form-item>
                      <el-form-item label="SEO关键字1">
                        <el-input
                          v-model="websiteinfoTemp.seoKey1"
                          placeholder="请输入SEO关键字1"
                        />
                      </el-form-item>
                      <el-form-item label="SEO关键字3">
                        <el-input
                          v-model="websiteinfoTemp.seoKey3"
                          placeholder="请输入SEO关键字3"
                        />
                      </el-form-item>
                      <el-form-item label="SEO关键字5">
                        <el-input
                          v-model="websiteinfoTemp.seoKey5"
                          placeholder="请输入SEO关键字5"
                        />
                      </el-form-item>
                    </div>
                    <div class="content-right">
                      <el-upload
                        action
                        class="div-logo-class"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="setPlatformWebsiteInfoPbqrUrl"
                        accept="image/jpg, image/jpeg, image/png"
                      >
                        <img
                          v-if="websiteinfoTemp.pbqrUrl"
                          class="logo"
                          :src="websiteinfoTemp.pbqrUrl"
                          alt
                        />
                        <img v-else class="logo" :src="logo" alt />
                      </el-upload>
                      <el-upload
                        action
                        class="div-logo-class"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="setPlatformWebsiteInfoBglgUrl"
                        accept="image/jpg, image/jpeg, image/png"
                      >
                        <img
                          v-if="websiteinfoTemp.bglgUrl"
                          class="logo"
                          :src="websiteinfoTemp.bglgUrl"
                          style="margin-left:100px"
                          alt
                        />
                        <img
                          v-else
                          class="logo"
                          :src="logo"
                          style="margin-left:100px"
                          alt
                        />
                      </el-upload>
                      <el-form-item label="中文简称">
                        <el-input
                          v-model="websiteinfoTemp.shortCname"
                          placeholder="请输入中文简称"
                        />
                      </el-form-item>
                      <el-form-item label="英文简称">
                        <el-input
                          v-model="websiteinfoTemp.shortEname"
                          placeholder="请输入英文简称"
                        />
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <el-input
                          v-model="websiteinfoTemp.phone"
                          placeholder="请输入联系电话"
                        />
                      </el-form-item>
                      <el-form-item label="简要描述">
                        <el-input
                          v-model="websiteinfoTemp.outline"
                          placeholder="请输入简要描述"
                        />
                      </el-form-item>
                      <el-form-item label="SMTP服务器">
                        <el-input
                          v-model="websiteinfoTemp.smtpServer"
                          placeholder="请输入SMTP服务器"
                        />
                      </el-form-item>
                      <el-form-item label="SMTP密码">
                        <el-input
                          v-model="websiteinfoTemp.smtpPassword"
                          placeholder="请输入SMTP密码"
                        />
                      </el-form-item>
                      <el-form-item label="主题颜色">
                        <el-input
                          v-model="websiteinfoTemp.themeColor"
                          placeholder="请输入主题颜色"
                        />
                      </el-form-item>
                      <el-form-item label="SEO关键字2">
                        <el-input
                          v-model="websiteinfoTemp.seoKey2"
                          placeholder="请输入SEO关键字2"
                        />
                      </el-form-item>
                      <el-form-item label="SEO关键字4">
                        <el-input
                          v-model="websiteinfoTemp.seoKey4"
                          placeholder="请输入SEO关键字4"
                        />
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
                <div slot="footer" class="form-footer">
                  <el-button
                    type="primary"
                    class="affirm-btn"
                    @click="submitWebSiteInfoForm"
                    >保存</el-button
                  >
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="网站介绍" name="fourth">
              <h1>定时任务补偿</h1>
            </el-tab-pane>
            <el-tab-pane label="注册协议" name="fifth">
              <h1>定时任务补偿</h1>
            </el-tab-pane>
            <el-tab-pane label="域名配置" name="sixth">
              <div class="form-content">
                <el-form
                  ref="websiteDoMainDataForm"
                  :rules="rules"
                  :model="websiteDoMainTemp"
                  label-position="right"
                  label-width="100px"
                  style="padding-top: 80px;"
                >
                  <div class="content">
                    <div class="content-left">
                      <el-form-item label="主域名">
                        <el-input
                          v-model="websiteDoMainTemp.domainName"
                          placeholder="请输入主域名"
                        />
                      </el-form-item>
                      <el-form-item label="H5域名">
                        <el-input v-model="websiteDoMainTemp.h5Host" />
                      </el-form-item>
                      <el-form-item label="H5域名IP">
                        <el-input v-model="websiteDoMainTemp.h5Ip" />
                      </el-form-item>
                    </div>
                    <div class="content-right">
                      <el-form-item label="PC域名">
                        <el-input v-model="websiteDoMainTemp.pcHost" />
                      </el-form-item>
                      <el-form-item label="PC域名IP">
                        <el-input v-model="websiteDoMainTemp.pcIp" />
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
                <div slot="footer" class="form-footer">
                  <el-button
                    type="primary"
                    class="affirm-btn"
                    @click="submtitWebsiteDoMainForm"
                    >保存</el-button
                  >
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="证书管理" name="seventh">
              <h1>证书管理</h1>
            </el-tab-pane>
          </el-tabs>
          <svg-icon
            v-show="goBackIsShow"
            style="width:40px; height:40px;position: absolute;bottom: 94%;left: 96%;"
            icon-class="back"
            @click="goBack"
          />
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogFormVisible"
        title="选择应用模板"
        @close="dialogCloseBefore"
      >
        <div style="height:500px">
          <el-form
            ref="appForm"
            :model="appTemp"
            :rules="rules"
            label-position="right"
            label-width="120px"
          >
            <el-form-item prop="appName" label="应用名称">
              <el-input
                v-model="appTemp.appName"
                placeholder="请输入应用名称"
              />
            </el-form-item>
            <el-form-item prop="tempIdValue" label="应用模板">
              <el-select
                v-model="appTemp.tempIdValue"
                style="width:100%"
                placeholder="请选择模板"
              >
                <el-option
                  v-for="template in tempList"
                  :key="template.tplId"
                  :label="template.fullCname"
                  :value="template.tplId"
                  >{{ template.fullCname }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-form>

          <el-form
            ref="customer"
            :model="customer"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item label="用户类别">
              <div class="module-border">
                <el-switch
                  v-model="usertype"
                  active-text="企业"
                  inactive-text="个人"
                  @change="typeChange"
                />
              </div>
            </el-form-item>
            <div v-show="personDivIsShow">
              <el-form-item prop="nameCn" label="姓名">
                <el-input
                  v-model="customer.nameCn"
                  type="text"
                  placeholder="请输入姓名"
                />
              </el-form-item>
              <el-form-item prop="idcardNo" label="身份证号">
                <el-input
                  v-model="customer.idcardNo"
                  type="text"
                  placeholder="请输入身份证号"
                />
              </el-form-item>
            </div>
          </el-form>

          <el-form
            ref="business"
            :model="business"
            :rules="businessRules"
            label-width="120px"
          >
            <div v-show="companyDivIsShow">
              <el-form-item prop="fullCname" label="企业名称">
                <el-input
                  v-model="business.fullCname"
                  type="text"
                  placeholder="请输入企业名称"
                />
              </el-form-item>
              <el-form-item prop="socialCode" label="社会信用代码">
                <el-input
                  v-model="business.socialCode"
                  type="text"
                  placeholder="请输入社会信用代码"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="createAppData">确认</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogFormVisible1"
        title="应用生成模板"
        @close="dialogCloseBefore1"
      >
        <div style="height:500px">
          <el-form
            ref="appToTemp"
            :model="appTemp"
            :rules="rules"
            label-position="right"
            label-width="100px"
          >
            <el-form-item prop="templateName" label="模板名称">
              <el-input
                v-model="appTemp.templateName"
                placeholder="请输入模板名称"
              />
            </el-form-item>
            <el-form-item prop="domain" label="领域范围">
              <div class="module-border">
                <el-radio-group
                  v-model="appTemp.domain"
                  style="margin-left:10px;"
                >
                  <el-radio
                    v-for="item in domainFilterData"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    >{{ item.text }}</el-radio
                  >
                </el-radio-group>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="submitAppToTemplate"
            >确认</el-button
          >
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
        </div>
      </el-dialog>
    </div>

    <AppManager
      v-if="appManagerIsShow"
      v-show="appManagerIsShow"
      @showPlatFormInfo="showPlatFormInfo"
    />
  </div>
</template>

<script>
import AppManager from "./AppManager";

import {
  deleteApp,
  selectAppListByDomain,
  selectAppListByPlatform,
  addAppByTemplate,
} from "@/api/appApi.js";
import {
  selectTemplateListByDomain,
  selectTemplateListByPlatform,
  addTemplateByApp,
} from "@/api/templateApi.js";
import { setStore, getStore } from "@/utils/mUtils";
import { getPlateformStatus, getDomain } from "@/api/fliterApi.js";
import { selectPlatformById, updatePlatform } from "@/api/platformApi.js";
import {
  updateWebsitedomain,
  selectWebsitedomain,
} from "@/api/websitedomainApi.js";
import { updateWebsiteinfo, selectWebsiteinfo } from "@/api/websiteinfoApi.js";
import logoImg from "@/assets/platformLogo.png";
import appLogoImg from "@/assets/appLogo.png";
import { getToken } from "@/utils/auth";
export default {
  name: "Platforminfo",
  components: { AppManager },
  data() {
    return {
      logo: logoImg,
      appLogo: appLogoImg,
      appManagerIsShow: false,
      goBackIsShow: true,
      platFormInfoIsShow: true,
      activeName: "first",
      temp: {},
      appList: [],
      domainFilterData: [],
      statusFilterData: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      usertype: false,
      personDivIsShow: true,
      companyDivIsShow: false,
      customer: { nameCn: "", idcardNo: "" },
      business: { fullCname: "", socialCode: "" },
      rules: {
        fullCname: [
          { required: true, message: "请输入中文名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        tempIdValue: [
          { required: true, message: "请选择应用模板", trigger: "change" },
        ],
        appName: [
          { required: true, message: "请输入应用名称", trigger: "blur" },
        ],
        templateName: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
        ],
        domain: [
          { required: true, message: "请选择领域范围", trigger: "change" },
        ],
        nameCn: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        idcardNo: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur",
          },
        ],
      },
      businessRules: {
        fullCname: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        socialCode: [
          { required: true, message: "请输入社会信用代码", trigger: "blur" },
        ],
      },
      platformTemp: {
        platformId: null,
        contactEmail: null,
        contactName: null,
        contactPhone: null,
        fullCname: null,
        fullEname: null,
        outline: null,
        shortCname: null,
        shortEname: null,
        status: null,
      },
      websiteinfoTemp: {
        bglgUrl: null,
        copyright: null,
        fullCname: null,
        fullEname: null,
        icpNo: null,
        logoUrl: null,
        objId: null,
        outline: null,
        pbqrUrl: null,
        phone: null,
        qqNo: null,
        seoKey1: null,
        seoKey2: null,
        seoKey3: null,
        seoKey4: null,
        seoKey5: null,
        shortCname: null,
        shortEname: null,
        smsTitle: null,
        smtpPassword: null,
        smtpServer: null,
        smtpUsername: null,
        themeColor: null,
        type: null,
      },
      websiteDoMainTemp: {
        domainName: null,
        h5Host: null,
        h5Ip: null,
        objId: null,
        pcHost: null,
        pcIp: null,
        type: null,
      },
      appTemp: {
        appName: null,
        tempIdValue: null,
        domain: null,
        templateName: null,
      },
      tempList: [],
      appId: null,
    };
  },
  mounted() {
    this.getAppListDomain();
    this.getTemplateList();
    getDomain().then((res) => {
      this.domainFilterData = res.data;
      this.domainFilterData.splice(2, 2);
    });
    getPlateformStatus().then((res) => {
      this.statusFilterData = res.data;
    });
  },
  methods: {
    getAppListDomain() {
      this.platformTemp.platformId = getStore("platformId");
      if (getToken("Access") === "DA") {
        selectAppListByDomain({
          platformId: this.platformTemp.platformId,
        }).then((res) => {
          this.appList = res.data;
          this.getPlatformDetail();
          this.getWebsiteInfoDetail();
          this.getWebsiteDoMainDetail();
        });
      } else {
        this.goBackIsShow = false;
        selectAppListByPlatform({}).then((res) => {
          this.appList = res.data;
          this.getPlatformDetail();
          this.getWebsiteInfoDetail();
          this.getWebsiteDoMainDetail();
        });
      }
    },
    getPlatformDetail() {
      selectPlatformById(this.platformTemp.platformId).then((res) => {
        this.platformTemp = res.data;
      });
    },
    submitPlatformForm() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          updatePlatform(this.platformTemp).then(() => {
            this.saveSuccessMsg();
            this.getPlatformDetail();
          });
        }
      });
    },
    getWebsiteInfoDetail() {
      this.websiteinfoTemp.objId = this.platformTemp.platformId;
      this.websiteinfoTemp.type = "P";
      selectWebsiteinfo(this.websiteinfoTemp).then((res) => {
        if (res.data.length > 0) {
          this.websiteinfoTemp = res.data[0];
        }
      });
    },
    submitWebSiteInfoForm() {
      updateWebsiteinfo(this.websiteinfoTemp).then(() => {
        this.saveSuccessMsg();
        this.getWebsiteInfoDetail();
      });
    },
    getWebsiteDoMainDetail() {
      this.websiteDoMainTemp.objId = this.platformTemp.platformId;
      this.websiteDoMainTemp.type = "P";
      selectWebsitedomain(this.websiteDoMainTemp).then((res) => {
        this.websiteDoMainTemp = res.data[0];
      });
    },
    submtitWebsiteDoMainForm() {
      updateWebsitedomain(this.websiteDoMainTemp).then(() => {
        this.saveSuccessMsg();
        this.getWebsiteDoMainDetail();
      });
    },
    getTemplateList() {
      if (getToken("Access") === "DA") {
        selectTemplateListByDomain({}).then((res) => {
          this.tempList = res.data;
        });
      } else {
        selectTemplateListByPlatform({}).then((res) => {
          this.tempList = res.data;
        });
      }
    },
    handleCreate() {
      this.dialogFormVisible = true;
    },
    dialogCloseBefore() {
      this.appTemp.appName = null;
      this.appTemp.tempIdValue = null;
      this.$refs["appForm"].clearValidate();
    },
    dialogCloseBefore1() {
      this.appId = null;
      this.appTemp.templateName = null;
      this.appTemp.domain = null;
      this.$refs["appToTemp"].clearValidate();
    },
    createAppData() {
      this.$refs["appForm"].validate((valid) => {
        if (valid) {
          if (this.usertype) {
            this.submitAppData(
              this.appTemp.tempIdValue,
              this.appTemp.appName,
              this.platformTemp.platformId,
              "B",
              this.business.socialCode,
              this.business.fullCname
            );
          } else {
            this.submitAppData(
              this.appTemp.tempIdValue,
              this.appTemp.appName,
              this.platformTemp.platformId,
              "C",
              this.customer.idcardNo,
              this.customer.nameCn
            );
          }
        }
      });
    },
    submitAppData(tplId, fullCname, platFormId, ownerType, id, name) {
      addAppByTemplate(tplId, fullCname, platFormId, ownerType, id, name).then(
        (res) => {
          this.handleEdit(res.data);
          this.business.fullCname = "";
          this.business.socialCode = "";
          this.customer.nameCn = "";
          this.customer.idcardNo = "";
          this.dialogFormVisible = false;
        }
      );
    },
    handleEdit(appId) {
      setStore("appId", appId);
      this.$nextTick(() => {
        this.appManagerIsShow = true;
        this.platFormInfoIsShow = false;
      });
    },
    handleDelete(appId) {
      deleteApp(appId).then(() => {
        this.deleteSuccessMsg();
        this.getAppListDomain();
      });
    },
    handleSubmit(appId) {
      this.appId = appId;
      this.dialogFormVisible1 = true;
    },
    submitAppToTemplate() {
      this.$refs["appToTemp"].validate((valid) => {
        if (valid) {
          addTemplateByApp(
            this.appId,
            this.appTemp.templateName,
            this.platformTemp.platformId,
            this.appTemp.domain
          ).then(() => {
            this.saveSuccessMsg();
            this.dialogFormVisible1 = false;
          });
        }
      });
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
    checkImg(file) {
      let fileSize = 0;
      const fileMaxSize = 5 * 1024 * 1024;
      if (file) {
        fileSize = file.size;
        if (fileSize > fileMaxSize) {
          alert("文件大小不能大于5M！");
          file.value = "";
          return false;
        } else if (fileSize <= 0) {
          alert("文件大小不能为0M！");
          file.value = "";
          return false;
        }
      } else {
        return false;
      }
      return true;
    },
    setPlatformWebsiteInfoLogo(file) {
      if (this.checkImg(file)) {
        var reader = new FileReader();
        let imgFile;
        var that = this;
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          imgFile = e.target.result;
          that.websiteinfoTemp.logoUrl = imgFile;
        };
      }
    },
    setPlatformWebsiteInfoBglgUrl(file) {
      if (this.checkImg(file)) {
        var reader = new FileReader();
        let imgFile;
        var that = this;
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          imgFile = e.target.result;
          that.websiteinfoTemp.bglgUrl = imgFile;
        };
      }
    },
    setPlatformWebsiteInfoPbqrUrl(file) {
      if (this.checkImg(file)) {
        var reader = new FileReader();
        let imgFile;
        var that = this;
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          imgFile = e.target.result;
          that.websiteinfoTemp.pbqrUrl = imgFile;
        };
      }
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
    goBack() {
      this.$emit("showPlatFormList");
    },
    showPlatFormInfo() {
      this.$nextTick(() => {
        this.platFormInfoIsShow = true;
        this.appManagerIsShow = false;
        this.getAppListDomain();
      });
    },
    typeChange() {
      if (this.usertype) {
        this.personDivIsShow = false;
        this.companyDivIsShow = true;
      } else {
        this.personDivIsShow = true;
        this.companyDivIsShow = false;
      }
    },
  },
};
</script>

<style lang="scss">
.module-border {
        border: 1px solid #dcdfe6;
        background-color: white;
        height: 50px;
        border-left: none;
      }
      </style>
