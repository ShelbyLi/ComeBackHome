<template>
  <el-form>
    <el-form-item label="旧密码">
      <el-input />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    admin: {
      type: Object,
      default: () => {
        return {
          password: ''
        }
      }
    }
  },
  data () {
    return {
      updateForm: {
        newPassword: ''
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>