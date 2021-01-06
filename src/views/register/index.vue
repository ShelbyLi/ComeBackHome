<template>
  <div class="login-container">
    <!-- 登录表 -->
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on" label-position="left">
    <!-- title -->
      <div class="title-container">
        <h3 class="title">Come Back Home - 后台系统</h3>
      </div>
      <!-- 表单项1 -->
      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="name"
          v-model="registerForm.name"
          placeholder="姓名 如:张三"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 表单项2 -->
      <el-form-item prop="nickname">
        <span class="svg-container">
          <svg-icon icon-class="peoples" />
        </span>
        <el-input
          ref="nickname"
          v-model="registerForm.nickname"
          placeholder="昵称 (若不填默认姓名)"
          name="nickname"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 表单项3 -->
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="密码 8~18位 需同时包含大小写字母和数字"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 表单项4 -->
      <el-form-item prop="idNumber">
        <span class="svg-container">
          <i class="el-icon-postcard" />
        </span>
        <el-input
          ref="idNumber"
          v-model="registerForm.idNumber"
          placeholder="身份证号 如:33XXXX19901111XXXX"
          name="idNumber"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 表单项5 -->
      <el-form-item prop="phoneNumber">
        <span class="svg-container">
          <i class="el-icon-mobile" />
        </span>
        <el-input
          ref="phoneNumber"
          v-model="registerForm.phoneNumber"
          placeholder="手机号 如:139XXXX0000"
          name="phoneNumber"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 表单项6 -->
      <div style="display: flex; justify-content: space-between; align-items:center">
        <el-form-item prop="phoneNumber">
          <span class="svg-container">
            <i class="el-icon-s-check" />
          </span>
          <el-input
            ref="vertificationCode"
            v-model="registerForm.vertificationCode"
            placeholder="验证码"
            name="vertificationCode"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-button class="register-button" type="primary" style="width:30%;" @click="handleSendVerificationCode">
          发送验证码
        </el-button>
      </div>
      <!-- 注册按钮 -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
      <div style="display: flex;justify-content: space-between">
        <el-button class="register-button" type="info" style="width:30%;margin-bottom:30px;" @click="handleToLogin">
          登录
        </el-button>
        <!-- <el-button class="thirdparty-button" type="info" style="width:30%;margin-bottom:30px;" @click="showDialog=true">
          第三方登录
        </el-button> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import { validPhoneNumber } from '@/utils/validate'
import { validIdNumber } from '@/utils/validate'
import { validPassword} from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('姓名至少2个字符'))
      } else if (value.length > 4) {
        callback(new Error('姓名不能超过4个字符'))
      } else {
        callback()
      }
    }
    const validateNickname = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('昵称至少2个字符'))
      } else if (value.length > 15) {
        callback(new Error('姓名不能超过15个字符'))
      } else {
        callback()
      }
    }
    const validatePhoneNumber = (rule, value, callback) => { // 一个常量 跟一个匿名函数 (callback 就是一个函数指针)
      if (!validPhoneNumber(value)) { // 调用了@/utils/validate 中的validPhoneNumber()
        callback(new Error('请输入11位合法的手机号'))
      } else {
        callback()
      }
    }
    const validateIdNumber = (rule, value, callback) => {
      if (!validIdNumber(value)) {
        callback(new Error('请输入合法的身份证'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      // if (value.length < 6) {
      //   callback(new Error('密码至少需要6位'))
      // } else if (value.length > 16) {
      //   callback(new Error('密码不能超过16位'))
      // } else {
      //   callback()
      // }
      if (!validPassword(value)) {
        callback(new Error('密码必须在8-16位, 且包含数字, 小写字母, 大写字母'))
      } else {
        callback()
      }
    }
    const validateVertificationCode = (rule, value, callback) => {
      // // 简单验证验证码是否6位
      // if (value.length !== 6) {
      //   callback(new Error('验证码为6位数字'))
      // } else {
      //   callback()
      // }
      // TODO 验证码规则还是之后来写吧
    }
    return {
      registerForm: {
        name: '张三',
        nickname: '',
        phoneNumber: '12345678901',
        idNumber: '330481199911250041',
        password: 'Aa111111',
        vertificationCode: ''
      },
      registerRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        nickname: [{ trigger: 'blur', validator: validateNickname }],
        phoneNumber: [{ required: true, trigger: 'blur', validator: validatePhoneNumber }], // validate都是封装好的
        idNumber: [{ required: true, trigger: 'blur', validator: validateIdNumber }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        vertificationCode: [{ required: true, trigger: 'blur', validator: validateVertificationCode }]
      },
      loading: false,
      passwordType: 'password', // 定义一个字符串 method中改变 控制密码的表单项的类型
      redirect: undefined,
      capsTooltip: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    if (this.registerForm.name === '') {
      this.$refs.username.focus()
    } else if (this.registerForm.phoneNumber === '') {
      this.$refs.phoneNumber.focus()
    } else if (this.registerForm.idNumber === '') {
      this.$refs.idNumber.focus()
    } else if (this.registerForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      console.log(this.$refs.registerForm.validate());
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('admin/register', this.registerForm).then(() => { // 传值给vuex的mutation改变state; 视频中的是保存在session中 这里是vuex (?)
            console.log('这里居然没到')
            this.$router.push({ path: this.redirect || '/' }) // 跳转到/
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleToLogin() {
      this.$router.push('/login')
    },
    handleSendVerificationCode() {
      // TODO 发送验证码
      
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
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
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 95px 35px 0; // 改了高度 使可以不滚动
    margin: 0 auto;
    overflow: hidden;
  }

  // .tips {
  //   font-size: 14px;
  //   color: #fff;
  //   margin-bottom: 10px;

  //   span {
  //     &:first-of-type {
  //       margin-right: 16px;
  //     }
  //   }
  // }

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
}
</style>
