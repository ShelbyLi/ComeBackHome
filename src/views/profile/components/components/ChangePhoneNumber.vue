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
      <el-form-item label="新手机号" prop="newPhoneNumber">
        <el-input v-model="updateForm.newPhoneNumber" clearable />
      </el-form-item>
      <el-form-item label="验证码" prop="vertificationCode">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <el-input
            v-model="updateForm.vertificationCode"
            clearable
          />
          <el-button type="primary" @click="handleSendVertificationCode">发送验证码</el-button>
        </div>
      </el-form-item>
      <div style="float: right">
        <el-button @click="resetForm('updateForm')">重置</el-button>
        <el-button type="primary" @click="handleUpdate">修改</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // TODO 改成外面传进来的(account usercard那种)
import { changePhoneNumber, getInfo } from "@/api/admin";
import { validPhoneNumber } from "@/utils/validate";

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
  computed: {
    ...mapGetters([
      // 'name',
      // 'avatar',
      // 'roles',
      'phoneNumber',
      // 'briefInfo',
      // 'nickname',
      // "password",
    ]),
  },
  data() {
    const validatePhoneNumber = (rule, value, callback) => {
      // 一个常量 跟一个匿名函数 (callback 就是一个函数指针)
      if (value === this.phoneNumber) {
        callback(new Error("请输入与原手机号不同的号码"));
      } else if (!validPhoneNumber(value)) {
        // 调用了@/utils/validate 中的validPhoneNumber()
        callback(new Error("请输入11位合法的手机号"));
      } else {
        callback();
      }
    };
    const validateVertificationCode = (rule, value, callback) => {
      // // 简单验证验证码是否6位
      // if (value.length !== 6) {
      //   callback(new Error('验证码为6位数字'))
      // } else {
      callback();
      // }
      // TODO 验证码规则还是之后来写吧
    };
    return {
      updateForm: {
        newPhoneNumber: "",
        vertificationCode: "",
      },
      updateRules: {
        newPhoneNumber: [
          { required: true, trigger: "blur", validator: validatePhoneNumber },
        ],
        vertificationCode: [
          {
            required: true,
            trigger: "blur",
            validator: validateVertificationCode,
          },
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
          changePhoneNumber(this.updateForm).then(() => {
            // this.list.unshift(this.temp)
            this.$message({
              message: "更新手机号成功",
              type: "success",
              duration: 2000,
            });
            // 刷新表格 即再获取一次
            // this.getEventsList();
            // this.$router.push({ path: this.path});
            this.resetForm("updateForm");
            getInfo();
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSendVertificationCode() {
      // TODO 验证码
    },
  },
};
</script>