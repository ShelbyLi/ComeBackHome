<template>
  <el-form>
    <el-form-item label="姓名">
      <!-- <el-input v-model.trim="user.name" /> -->
      <el-input v-model.trim="admin.name" />
    </el-form-item>
    <el-form-item label="昵称">
      <!-- <el-input v-model.trim="user.email" /> -->
      <el-input v-model.trim="admin.nickname" />
    </el-form-item>
    <el-form-item label="简介">
      <!-- <el-input v-model.trim="admin.briefInfo" /> -->
      <el-input
        type="textarea"
        placeholder="介绍一下自己吧"
        v-model.trim="admin.briefInfo"
        maxlength="250"
        show-word-limit
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    // user: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       name: '',
    //       email: ''
    //     }
    //   }
    // }
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
        name: '',
        nickname: '',
        briefInfo: ''
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
