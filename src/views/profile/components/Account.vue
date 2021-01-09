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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="updateForm.name" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="updateForm.nickname" />
      </el-form-item>
      <el-form-item label="简介" prop="briefInfo">
        <el-input
          type="textarea"
          placeholder="介绍一下自己吧"
          v-model="updateForm.briefInfo"
          maxlength="250"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
        >
          上传新头像
        </el-button>
      </el-form-item>
      <div style="float: right">
        <el-button @click="resetForm('updateForm')">重置</el-button>
        <el-button type="primary" @click="handleUpdate">修改</el-button>
      </div>
    </el-form>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
    <!-- TODO 上传图像的地址和data -->
  </div>
</template>

<script>
import ImageCropper from "@/components/ImageCropper";
import { updateBasicInfo, getInfo } from "@/api/admin";
export default {
  components: { ImageCropper },
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
          name: "",
          nickname: "",
          briefInfo: "",
        };
      },
    },
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error("姓名至少2个字符"));
      } else if (value.length > 4) {
        callback(new Error("姓名不能超过4个字符"));
      } else {
        callback();
      }
    };
    const validateNickname = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error("昵称至少2个字符"));
      } else if (value.length > 15) {
        callback(new Error("姓名不能超过15个字符"));
      } else {
        callback();
      }
    };
    return {
      updateForm: {
        name: this.admin.name,
        nickname: this.admin.nickname,
        briefInfo: this.admin.briefInfo,
      },
      updateRules: {
        name: [{ required: true, trigger: "blur", validator: validateName }],
        nickname: [{ trigger: "blur", validator: validateNickname }],
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",
    };
  },
  methods: {
    handleUpdate() {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          updateBasicInfo(this.updateForm).then(() => {
            // this.list.unshift(this.temp)
            this.$message({
              message: "更新基本信息成功",
              type: "success",
              duration: 2000,
            });
            getInfo();
            this.resetForm("updateForm");
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.image = resData.files.avatar;
    },
    close() {
      this.imagecropperShow = false;
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>