<template>
  <div class="login_page">
    <div class="content_page">
      <div class="form_contianer">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login_form">
          <el-form-item prop="username">
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              type="text"
              placeholder="用户名"
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="footBtn">
          <el-button
            :loading="loading"
            type="primary"
            @click="submitForm('loginForm')"
            class="submit_btn"
          >登录</el-button>
          <el-button
            class="register_btn"
            style=" background: rgba(255, 255, 255, 0); border: 0;float:right;color: rgb(75, 27, 250);"
            @click="platformRegister"
          >立即注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/userApi";
import logoImg from "@/assets/platformLogo.png";
export default {
  data() {
    return {
      appName: "光大银行公证处",
      logoUrl: logoImg,
      loginForm: {
        username: "",
        password: "",
        dns: ""
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // getLoginConfig().then(res => {
    //   this.appName = res.sysName;
    // });
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          const address = window.location.href;
          // console.log("http://"+address.split("//")[1].split("/")[0])
          const dns = address.substring(0, address.lastIndexOf(":"));
          // this.loginForm.dns = "http://" + address.split("//")[1];
          this.loginForm.dns = dns;
          this.loading = true;
          login(this.loginForm)
            .then(res => {
              this.$store
                .dispatch("user/login", res)
                .then(() => {
                  this.$router.push({ path: "/Index" });
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    personRegister() {
      this.$router.push({ path: "/PersonRegister" });
    },
    companyRegister() {
      this.$router.push({ path: "/CompanyRegister" });
    },
    platformRegister() {
      this.$router.push({ path: "/PlatformRegister" });
    }
  }
};
</script>

<style lang="scss">
.login_page {
  height: 100%;
  .content_page {
    height: 50%;
    transform: translate(0, 50%);
    background: url(../../assets/loginBg.png);
    .form_contianer {
      width: 550px;
      height: 500px;
      border-radius: 3px;
      position: absolute;
      left: 80%;
      background: #fff0;
      top: 50%;
      .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -80%);
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #eee;
        }
      }

      .login_form {
        height: 44%;
        margin-top: 77px;
        .el-input {
          position: relative;
          font-size: 18px;
          display: inline-block;
          width: 100%;
        }

        .el-input {
          position: relative;
          font-size: 25px;
          display: inline-block;
          width: 100%;
        }
        .el-input__prefix,
        .el-input__suffix {
          position: absolute;
          top: 0;
          -webkit-transition: all 0.3s;
          height: 100%;
          width: 45px;
          color: #c0c4cc;
          text-align: center;
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
        .el-input--prefix .el-input__inner {
          padding-left: 50px;
        }
        .el-input__inner {
          -webkit-appearance: none;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: 22px;
          height: 60px;
          line-height: 40px;
          outline: 0;
          padding: 0 15px;
          -webkit-transition: border-color 0.2s
            cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          width: 100%;
        }
        .el-form-item__content {
          line-height: 60px;
          position: relative;
          font-size: 18px;
          margin-top: 8px;
        }
      }

      .footBtn {
        margin-bottom: 10px;
        .submit_btn {
          width: 100%;
          height: 60px;
          font-weight: bold;
          font-size: 22px;
        }
        .register_btn {
          font-size: 18px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

