<template>
  <div class="register_page">
    <div class="form_contianer">
      <div class="titleArea">
        <span class="title">{{ personRegister }}</span>
        <div class="loginBtn">
          <span>已有账号?</span>
          <el-button @click="login">登录</el-button>
        </div>
      </div>

      <el-form
        ref="platForm"
        :model="platForm"
        class="registerForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item prop="fullCname" label="平台名称">
          <el-input v-model="platForm.fullCname" type="text" placeholder="请输入平台名称" />
        </el-form-item>
      </el-form>
      <el-form
        ref="websiteDomain"
        :model="websiteDomain"
        class="registerForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item prop="pcHost" label="登录域名">
          <el-input v-model="websiteDomain.pcHost" type="text" placeholder="请输入登录域名" />
        </el-form-item>
      </el-form>
      <el-form ref="user" :model="user" class="registerForm" :rules="rules" label-width="150px">
        <el-form-item prop="username" label="管理员账号">
          <el-input v-model="user.username" type="text" placeholder="请输入管理员账号" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="user.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="user.confirmPassword" type="password" placeholder="请再次输入密码" />
        </el-form-item>
      </el-form>

      <el-form
        ref="customer"
        :model="customer"
        class="registerForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="用户类别">
          <div class="module-border">
            <el-switch v-model="usertype" active-text="企业" inactive-text="个人" @change="typeChange" />
          </div>
        </el-form-item>
        <div v-show="personDivIsShow">
          <el-form-item prop="nameCn" label="姓名">
            <el-input v-model="customer.nameCn" type="text" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item prop="idcardNo" label="身份证号">
            <el-input v-model="customer.idcardNo" type="text" placeholder="请输入身份证号" />
          </el-form-item>
        </div>
      </el-form>

      <el-form
        ref="business"
        :model="business"
        class="registerForm"
        :rules="businessRules"
        label-width="150px"
      >
        <div v-show="companyDivIsShow">
          <el-form-item prop="fullCname" label="企业名称">
            <el-input v-model="business.fullCname" type="text" placeholder="请输入企业名称" />
          </el-form-item>
          <el-form-item prop="socialCode" label="社会信用代码">
            <el-input v-model="business.socialCode" type="text" placeholder="请输入社会信用代码" />
          </el-form-item>
        </div>
      </el-form>
      <el-button type="primary" class="register_btn" @click="submitPlatformRegisterForm">注册</el-button>
    </div>
  </div>
</template>

<script>
import { registerPlatform } from '@/api/platformApi.js'
import { Message } from 'element-ui'
const TIME_COUNT = 60 // 更改倒计时时间
export default {
  name: 'Register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    return {
      personRegister: '欢迎注册',
      usertype: false,
      personDivIsShow: true,
      companyDivIsShow: false,
      user: { username: '', password: '', confirmPassword: '', type: '' },
      platForm: { fullCname: '', ownerType: '' },
      websiteDomain: { pcHost: '' },
      customer: { nameCn: '', idcardNo: '' },
      business: { fullCname: '', socialCode: '' },
      show: true,
      count: '',
      timer: null,
      rules: {
        fullCname: [
          { required: true, message: '请输入平台名称', trigger: 'blur' }
        ],
        pcHost: [
          { required: true, message: '请输入平台域名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入管理员账号', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            required: true,
            pattern: /[^\d]/g,
            message: '密码不能是纯数字',
            trigger: 'blur'
          },
          {
            required: true,
            min: 6,
            max: 16,
            message: '长度在 6 到 16 个字符',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        userPhone: [{ required: true, validator: checkPhone, trigger: 'blur' }],

        checkCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        nameCn: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        idcardNo: [
          {
            required: true,
            message: '请输入身份证号',
            trigger: 'blur'
          }
        ]
      },
      businessRules: {
        fullCname: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        socialCode: [
          { required: true, message: '请输入社会信用代码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    typeChange() {
      if (this.usertype) {
        this.personDivIsShow = false
        this.companyDivIsShow = true
      } else {
        this.personDivIsShow = true
        this.companyDivIsShow = false
      }
    },
    send() {
      if (!this.registerForm.userPhone) {
        this.$message({
          message: '请输入手机号',
          center: true
        })
      } else {
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer) // 清除定时器
              this.timer = null
            }
          }, 1000)
        }
      }
    },
    submitPlatformRegisterForm() {
      this.$refs['platForm'].validate(valid => {
        if (valid) {
          this.$refs['websiteDomain'].validate(valid => {
            if (valid) {
              this.$refs['user'].validate(valid => {
                if (valid) {
                  if (this.usertype) {
                    this.customer.nameCn = ''
                    this.customer.idcardNo = ''
                    this.platForm.ownerType = 'C'
                    this.user.type = 'C'
                    this.$refs['business'].validate(valid => {
                      if (valid) {
                        this.submitData()
                      }
                    })
                  } else {
                    this.business.fullCname = ''
                    this.business.socialCode = ''
                    this.platForm.ownerType = 'B'
                    this.user.type = 'B'
                    this.$refs['customer'].validate(valid => {
                      if (valid) {
                        this.submitData()
                      }
                    })
                  }
                }
              })
            }
          })
        }
      })
    },
    submitData() {
      registerPlatform({
        user: this.user,
        platForm: this.platForm,
        websiteDomain: this.websiteDomain,
        customer: this.customer,
        business: this.business
      }).then(() => {
        Message({
          message: '平台注册成功',
          type: 'success',
          duration: 3 * 1000
        })
        this.$router.push({ path: '/' })
      })
    },
    login() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
.register_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  background: url(../../assets/loginRegisterBg.png) no-repeat center center;
  background-size: 100% 100%;

  .form_contianer {
    position: absolute;
    border: 1px solid rgb(239, 239, 240);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.9);
    width: 800px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .titleArea {
      text-align: left;
      .title {
        font-size: 38px;
      }
      .loginBtn {
        .el-button {
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          background: rgba(255, 255, 255, 0);
          border: 0;
          -webkit-appearance: none;
          text-align: center;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding: 10px 3px;
          outline: 0;
          margin: 0;
          font-family: "msyh";
          color: rgb(75, 27, 250);
          -webkit-transition: 0.1s;
          transition: 0.1s;
          font-weight: 500;
          font-size: 18px;
        }
      }
    }
    .registerForm {
      margin-left: 50px;
      margin-right: 50px;

      .el-switch__label * {
        line-height: 1;
        font-size: 20px;
        display: inline-block;
      }
      .el-switch {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        font-size: 22px;
        line-height: 20px;
        height: 50px;
        vertical-align: middle;
      }
      .el-form-item__error {
        color: #f56c6c;
        font-size: 16px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
      }

      .el-form--label-left {
        text-align: right;
      }

      .el-form--label-left .el-form-item__label {
        text-align: right;
      }

      .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        background-color: #f5f7fa;
        border: 1px solid #dcdfe6;
        border-radius: 1px;
        font-size: 20px;
        color: #606266;
        line-height: 48px;
        font-weight: normal;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }

      .el-input__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 1px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: 22px;
        height: 50px;
        border-left: none;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color 0.2s
          cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
      }

      .module-border {
        border: 1px solid #dcdfe6;
        background-color: white;
        height: 50px;
        border-left: none;
      }
    }
    .register_btn {
      width: 87%;
      font-weight: bold;
      font-size: 22px;
    }
  }
}
</style>
