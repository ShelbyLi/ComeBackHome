<template>
  <div>
    <el-tabs tab-position="left" style="height: 200px;">
    <el-tab-pane label="修改密码">
      <change-pwd/>
    </el-tab-pane>
    <!-- <el-tab-pane label="修改手机号">
      <change-phone-number/>
    </el-tab-pane>
    <el-tab-pane label="注销">
      <el-button type="danger" @click="cancellation">注销<el-button>
    </el-tab-pane> -->
  </el-tabs>
    <!-- <el-form-item>
      <el-button type="primary" @click="submit">修改</el-button>
    </el-form-item> -->
  </div>
</template>

<script>
import ChangePhoneNumber from './components/ChangePhoneNumber.vue'
import ChangePwd from './components/ChangePwd.vue'
export default {
  components: { ChangePwd, ChangePhoneNumber },
  props: {
    admin: {
      type: Object,
      default: () => {
        return {
          name: '',
          nickname: '',
          briefInfo: ''
        }
      }
    }
  },
  data() {
    return {
      updateForm: {
        password: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    cancellation() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>

