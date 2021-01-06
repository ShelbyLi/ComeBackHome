<template>
  <div class="login-container">
    <el-form
      ref="updateForm"
      :model="registerForm"
      :rules="updateRules"
      label-position="left"
    >
      <!-- 旧密码 -->
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
            v-model="updateForm.password"
            :type="passwordType"
            placeholder="请输入旧密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- 新密码 -->
      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="newPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="newPassword"
            v-model="updateForm.newPassword"
            :type="passwordType"
            placeholder="新密码 8~18位 需同时包含大小写字母和数字"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handelChangePwd"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-button
        style="width: 30%; margin-bottom: 30px"
        @click="handelChangePwd"
      >
        确认修改
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validPassword } from "@/utils/validate";

export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      // 旧密码只判断长度是否正确
      if (value.length < 6) {
        callback(new Error("密码至少需要6位"));
      } else if (value.length > 16) {
        callback(new Error("密码不能超过16位"));
      } else {
        callback();
      }
    };
    const validateNewPassword = (rule, value, callback) => {
      // 新密码需判断规则
      if (!validPassword(value)) {
        callback(new Error("密码必须在8-16位, 且包含数字, 小写字母, 大写字母"));
      } else {
        callback();
      }
    };
    return {
      updateForm: {
        password: "Aa111111",
        newPassword: "Aaaaaaa1",
      },
      registerRules: {
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        newPassword: [
          { required: true, trigger: "blur", validator: validateNewPassword },
        ],
      },
      loading: false,
      passwordType: "password", // 定义一个字符串 method中改变 控制密码的表单项的类型
      redirect: undefined,
      capsTooltip: false,
    };
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
    handelChangePwd() {},
  },
};
</script>

<style lang="scss">
$bg:#ffffff;
$light_gray:rgb(0, 0, 0);
$cursor: rgb(0, 0, 0);

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

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
      // color: $light_gray;
      // height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    // color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #ffffff;
$light_gray: rgb(255, 255, 255);

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
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
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  // .title-container {
  //   position: relative;

  //   .title {
  //     font-size: 26px;
  //     // color: $light_gray;
  //     margin: 0px auto 40px auto;
  //     text-align: center;
  //     font-weight: bold;
  //   }
  // }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  // .register-button {
  //   // position: absolute;
  //   // right: 0;
  //   position: relative;
  //   bottom: 6px;
  // }
  // .thirdparty-button {
  //   // position: absolute;
  //   position: relative;
  //   // left: 258px;
  //   // right: 0px;
  //   bottom: 6px;
  // }
}
</style>
