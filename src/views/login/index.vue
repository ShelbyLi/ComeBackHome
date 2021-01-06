<template>
  <div class="login-container">
    <!-- 登录表 -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- title -->
      <div class="title-container">
        <h3 class="title">Come Back Home - 后台系统</h3>
      </div>

      <!-- 表单项1 -->
      <el-form-item prop="phoneNumber">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          <i class="el-icon-mobile" />
        </span>
        <el-input
          ref="phoneNumber"
          v-model="loginForm.phoneNumber"
          placeholder="139XXXX0000"
          name="phoneNumber"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 表单项2 -->
      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 登录按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
      <!-- <el-button :loading="loading" type="info" style="width:29%;margin-bottom:30px;" @click.native.prevent="handleToRegister">去注册</el-button> -->
      <!-- 下面的提示 -->
      <!-- <div class="tips">
        <span style="margin-right:20px;">phoneNumber: admin</span>
        <span> password: any</span>
      </div> -->
      <div style="display: flex; justify-content: space-between">
        <!-- <div class="tips">
          <span>没有账号?</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">注册</span>
          <span>Password : any</span>
        </div> -->
        <el-button
          class="register-button"
          type="info"
          style="width: 30%; margin-bottom: 30px"
          @click="handleToRegister"
        >
          注册
        </el-button>
        <el-button
          class="thirdparty-button"
          type="info"
          style="width: 30%; margin-bottom: 30px"
          @click="showDialog = true"
        >
          第三方登录
        </el-button>
      </div>
    </el-form>
    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { login } from "@/api/admin"
import { validPhoneNumber } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";

export default {
  name: "Login",
  components: { SocialSign },
  data() {
    const validatePhoneNumber = (rule, value, callback) => {
      // 一个常量 跟一个匿名函数 (callback 就是一个函数指针)
      if (!validPhoneNumber(value)) {
        // 调用了@/utils/validate 中的validPhoneNumber()
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        // 登录只需判断长短
        callback(new Error("密码至少需要8位"));
      } else if (value.length > 16) {
        callback(new Error("密码不能超过16位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        phoneNumber: "12345678901",
        password: "111111",
      },
      loginRules: {
        phoneNumber: [
          { required: true, trigger: "blur", validator: validatePhoneNumber },
        ], // validator都是封装好的
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password", // 定义一个字符串 method中改变 控制密码的表单项的类型
      redirect: undefined,
      showDialog: false,
      capsTooltip: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.phoneNumber === "") {
      this.$refs.phoneNumber.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // login(this.loginForm) 在store里面有
          this.$store
            .dispatch("admin/login", this.loginForm)
            .then(() => {
              // 传值给vuex的mutation改变state; 视频中的是保存在session中 这里是vuex (?)
              this.$router.push({ path: this.redirect || "/" }); // 跳转到/
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleToRegister() {
      this.$router.push("/register");
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .register-button {
    // position: absolute;
    // right: 0;
    position: relative;
    bottom: 6px;
  }
  .thirdparty-button {
    // position: absolute;
    position: relative;
    // left: 258px;
    // right: 0px;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
