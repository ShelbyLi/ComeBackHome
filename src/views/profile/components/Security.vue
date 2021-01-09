<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane label="修改密码">
        <change-pwd />
      </el-tab-pane>
      <el-tab-pane label="修改手机号">
        <change-phone-number />
      </el-tab-pane>
      <el-tab-pane label="注销">
        <div style="display: flex; justify-content: center">
          <el-button
            type="danger"
            style="width: 80%"
            @click="handleCancellation"
            >注销</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ChangePhoneNumber from "./components/ChangePhoneNumber.vue";
import ChangePwd from "./components/ChangePwd.vue";
import { cancellation } from "@/api/admin";
export default {
  components: { ChangePwd, ChangePhoneNumber },
  props: {
    admin: {
      type: Object,
      default: () => {
        return {
          name: "",
          nickname: "",
          briefInfo: "",
        };
      },
    },
  },
  data() {
    return {
      updateForm: {
        password: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    handleCancellation() {
      // this.$message({
      //   message: "User information has been updated successfully",
      //   type: "success",
      //   duration: 5 * 1000,
      // });
      this.$confirm("此操作将永久关于您的数据 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cancellation().then(() => {
          this.logout()
          this.$message({
            message: "注销成功",
            type: "success",
            duration: 2000,
          });
        });
      });
    },
    async logout() {
      await this.$store.dispatch('admin/logout')
      this.$router.push(`/login`)
    }
  },
};
</script>

