<template>
  <div class="register_page">
    <div class="head">
      <div
        style="padding-top: 10px;
    padding-left: 400px;"
      >
        <el-image style="width: 60px;height: 60px" :src="require('@/assets/platformLogo.png')" />
        <el-button
          type="primary"
          style="display: block;
    margin-top: 34px;
    margin-right: 400px;
    float: right;"
          @click="login"
        >登录
        </el-button>
      </div>
    </div>
    <div class="form_contianer">
      <div class="titleArea rflex">
        <span class="title" v-text="companyRegister" />
      </div>
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="rules"
        class="register_form"
        label-width="110px"
      >
        <el-form-item prop="username" label="登录名">
          <el-input
            v-model="registerForm.username"
            class="area"
            type="text"
            placeholder="请输入登录名"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="registerForm.password"
            class="area"
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input
            v-model="registerForm.confirmPassword"
            class="area"
            type="password"
            placeholder="请再次输入密码"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="contactname" label="联系人姓名">
          <el-input
            v-model="registerForm.contactname"
            class="area"
            type="text"
            placeholder="联系人姓名"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="contactemail" label="联系人邮箱">
          <el-input
            v-model="registerForm.contactemail"
            class="area"
            type="text"
            placeholder="联系人邮箱"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="companyname" label="公司名称">
          <el-input
            v-model="registerForm.companyname"
            class="area"
            type="text"
            placeholder="企业名称"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="companycode" label="企业信用代码">
          <el-input
            v-model="registerForm.companycode"
            class="area"
            type="text"
            placeholder="企业信用代码"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="userPhone" label="手机号">
          <el-input
            v-model="registerForm.userPhone"
            class="area"
            placeholder="请输入手机号"
            @keyup.enter.native="submitForm('registerForm')"
          />
        </el-form-item>
        <el-form-item prop="checkCode" label="短信验证码">
          <el-input
            v-model="registerForm.checkCode"
            style="width: 52%;display: inline-block"
            class="area"
            placeholder="请输入验证码"
            @keyup.enter.native="submitForm('registerForm')"
          />
          <el-button style="width: 46%;height: 39px" type="success" :disabled="disabled=!show" @click="send">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{ count }} s</span>
          </el-button>

        </el-form-item>
        <el-form-item prop="checkCode" label="营业执照" style="background: url('../assets/img/upload.jpg')">
          <el-upload action="" style="width: 40%">
            <el-image :src="require('@/assets/img/upload.jpg')" />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitCompanyRegisterForm">企业注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const TIME_COUNT = 60 // 更改倒计时时间
export default {
  name: 'Register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
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
      companyRegister: '企业注册',
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        contactname: '',
        contactemail: '',
        companyname: '',
        companycode: '',
        userPhone: '',
        checkCode: ''
      },
      show: true,
      count: '',
      timer: null,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /[^\d]/g, message: '密码不能是纯数字', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }

        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        userPhone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],

        checkCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        contactname: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        contactemail: [
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        companyname: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companycode: [
          { required: true, message: '请输入企业信用代码', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入正确的企业信用代码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    send() {
      if (!this.registerForm.userPhone) {
        this.$message({
          message: '请输入手机号',
          center: true
        }
        )
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
    submitForm(registerForm) {
    },
    submitCompanyRegisterForm() {
    },
    login() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">

  .head {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid grey;

  }

  .register_page {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    /*background: url(../assets/img/bg9.jpg) no-repeat center center;*/
    background-size: 100% 100%;
  }

  .form_contianer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 500px;
    border-radius: 5px;
    padding: 25px;
    text-align: center;

    .titleArea {
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-size: 22px;
      width: 100%;
      padding-bottom: 20px;

      .logo {
        width: 40px;
        margin-right: 10px;
      }

      .title {
        font-size: 30px;

        i {
          color: #ff6c60;
        }
      }
    }

    .buttontest {
      width: 60%;
      height: 50px;
      background-color: #ca1c1c;
      text-decoration-color: white;
    }

  }

  .register_form {
    .el-button--primary {
      background-color: #ff7c1a;
      border: 1px solid #ffffff;
    }

    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }

    .el-form-item {
      .el-form-item__label {
        line-height: 43px;
      }

      .el-input__inner {
        height: 40px;
      }

    }
  }

  .area {
    height: 50%;
    font-size: 14px;

    .form {
      width: 90%;
      margin-top: 20px;
    }
  }
</style>
