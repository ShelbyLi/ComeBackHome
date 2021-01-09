<template>
  <div>
    <el-form
      ref="updateForm"
      :model="updateForm"
      :rules="updateRules"
      status-icon
      label-width="80px"
      hide-required-asterisk
    >
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model="updateForm.oldPwd" clearable type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="updateForm.newPwd" clearable type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input
          v-model="updateForm.checkPwd"
          clearable
          type="password"
        />
      </el-form-item>
      <!-- <el-form-item> -->
      <div style="float: right">
        <el-button @click="resetForm('updateForm')">重置</el-button>
        <el-button type="primary" @click="handleUpdate">修改</el-button>
        <!-- </el-form-item> -->
      </div>
    </el-form>

    <!-- <el-button type="primary" @click="submit">修改</el-button> -->
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { changePwd, getInfo } from "@/api/admin";
import { validPassword } from "@/utils/validate";

export default {
  props: {
    admin: {
      type: Object,
      default: () => {
        return {
          password: "",
        };
      },
    },
  },
  // computed: {
  //   ...mapGetters([
  //     // 'name',
  //     // 'avatar',
  //     // 'roles',
  //     // 'phoneNumber',
  //     // 'briefInfo',
  //     // 'nickname',
  //     "password",
  //   ]),
  // },
  data() {
    const validateOldPassword = (rule, value, callback) => {
      if (value.length < 8) {
        // 登录只需判断长短
        callback(new Error("密码至少需要8位"));
      } else if (value.length > 16) {
        callback(new Error("密码不能超过16位"));
      // } else if (value !== this.password) {
      //   callback(new Error("与原密码不符"));
      } else {
        callback();
      }
    };
    const validateNewPassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error("密码必须在8-16位, 且包含数字, 小写字母, 大写字母"));
      } else if (value === this.password) {
        callback(new Error("新密码需与原密码不同"));
      } else {
        callback();
      }
    };
    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.updateForm.newPwd) {
        console.log(this.updateForm.newPwd);
        console.log(value);
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      // checkPwd: '',
      updateForm: {
        // oldPassword: "AAAaaa111",
        oldPwd: "Aa1111111",
        newPwd: "Aa1111111",
        checkPwd: "Aa1111111",
      },
      updateRules: {
        oldPwd: [
          { required: true, trigger: "blur", validator: validateOldPassword },
        ],
        newPwd: [
          { required: true, trigger: "blur", validator: validateNewPassword },
        ],
        checkPwd: [
          { required: true, trigger: "blur", validator: validateCheckPassword },
        ],
      },
    };
  },
  methods: {
    handleUpdate() {
      // this.$message({
      //   message: "User information has been updated successfully",
      //   type: "success",
      //   duration: 5 * 1000,
      // });
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          var temp = {
            originalPwd: this.updateForm.oldPwd,
            newPwd: this.updateForm.newPwd
          }
          changePwd(temp).then(() => {
            // this.list.unshift(this.temp)
            // this.dialogFormVisible = false;
            this.$message({
              message: "更新密码成功",
              type: "success",
              duration: 2000,
            });
            // 刷新表格 即再获取一次
            // this.getEventsList();
            // this.$router.push({ path: this.path});
            this.resetForm('updateForm')
            getInfo()
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>