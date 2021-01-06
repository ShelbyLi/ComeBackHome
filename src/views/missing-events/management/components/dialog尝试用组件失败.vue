<template>
  <el-dialog
    :title="textMap[dialogAttributes.dialogStatus]"
    :visible.sync="dialogAttributes.dialogFormVisible"
  >
    <el-form
      ref="dataForm"
      :rules="rules"
      :model="tempEventForm"
      label-position="left"
      label-width="120px"
      style="width: 400px; margin-left: 50px"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="tempEventForm.name" />
      </el-form-item>
      <el-form-item label="身份证" prop="idNumber">
        <el-input v-model="tempEventForm.idNumber" />
      </el-form-item>
      <el-form-item label="血型" prop="bloodType">
        <el-select
          v-model="tempEventForm.bloodTypeOptions"
          class="filter-item"
          placeholder="请选择"
        >
          <el-option
            v-for="item in bloodTypeOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-cascader
          v-model="tempEventForm.livingAddressCode"
          size="large"
          placeholder="选择区域"
          :options="addressCodeOptions"
        >
        </el-cascader>
        <el-input
          v-model="tempEventForm.livingAddressDetail"
          placeholder="详细地址"
        />
      </el-form-item>
      <el-form-item label="近期照片"> 照片 </el-form-item>
      <el-form-item label="身高" prop="height">
        <el-input v-model="tempEventForm.height" />
      </el-form-item>
      <el-form-item label="体重" prop="weight">
        <el-input v-model="tempEventForm.weight" />
      </el-form-item>
      <el-form-item label="走失时间" prop="missingTime">
        <el-date-picker
          v-model="tempEventForm.missingTime"
          type="datetime"
          placeholder="请选择时间"
          default-value=""
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item label="走失地址" prop="address">
        <el-cascader
          v-model="tempEventForm.missingAddressCode"
          size="large"
          placeholder="选择区域"
          :options="addressCodeOptions"
        >
        </el-cascader>
        <el-input
          v-model="tempEventForm.missingAddressDetail"
          placeholder="详细地址"
        />
      </el-form-item>
      <el-form-item label="衣着" prop="clothing">
        <el-input v-model="tempEventForm.clothing" />
      </el-form-item>
      <el-form-item label="身体状况" prop="physicalCondition">
        <el-input v-model="tempEventForm.physicalCondition" />
      </el-form-item>
      <el-form-item label="其他描述" prop="briefIntro">
        <el-input v-model="tempEventForm.briefIntro" />
      </el-form-item>
      <el-form-item label="紧急联系人1" prop="emergencyContact1">
        <el-input v-model="tempEventForm.emergencyContact1" />
        <el-input v-model="tempEventForm.phoneNumber1" />
      </el-form-item>
      <el-form-item label="紧急联系人1" prop="emergencyContact2">
        <el-input v-model="tempEventForm.emergencyContact2" />
        <el-input v-model="tempEventForm.phoneNumber2" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false"> 取消 </el-button>
      <el-button
        type="primary"
        @click="dialogStatus === 'create' ? createData() : updateData()"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  // props: ["dialogStatus", "dialogFormVisible"],
  props: {
    dialogAttributes: {
      type: Object,
      default: () => {
        return {
          dialogStatus: "create",
          dialogFormVisible: flase,
        };
      },
    },
  },
  data() {
    return {
      // 添加/编辑 对话框
      tempEventForm: {
        name: undefined,
        idNumber: undefined,
        bloodType: undefined,
        livingAddressCode: undefined,
        livingAddressDetail: undefined,
        recentPhotos: undefined,
        height: "",
        weight: "",
        missingTime: "",
        missingAddressCode: "",
        missingAddressDetail: "",
        clothing: "",
        physicalCondition: "",
        briefIntro: undefined,
        emergencyContact1: "",
        phoneNumber1: "",
        emergencyContact2: "",
        phoneNumber2: "",
      },
      // dialogFormVisible: false,
      // dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [],
        // type: [
        //   { required: true, message: "type is required", trigger: "change" },
        // ],
        idNumber: [],
        bloodType: [],
        address: [],
        height: [],
        weight: [],
        missingTime: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        // title: [
        //   { required: true, message: "title is required", trigger: "blur" },
        // ],
        clothing: [],
        physicalCondition: [],
        briefIntro: [],
        emergencyContact1: [],
        emergencyContact2: [],
      },
      // 设置只能选择当前日期及之后的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      bloodTypeOptions: ["A", "B", "AB", "O", "其他"],
    };
  },
  watch: {
    // data: (n, o) => {
    //   //箭头函数  不然会发生this改变
    //   console.log(n.img);
    //   this.imgs = n.img;
    // },
    dialogAttributes(newVal, oldVal) {
      const _this = this;
      const param = newVal;
      if (param.dialogStatus === "create") {
        _this.dialogStatus = "create";
      }
      if (param.dialogFormVisible) {
        _this.dialogFormVisible = true;
      }
      this.$nextTick(function () {
        console.log(_this.$refs.dialogAttributes);
        //...
      });
    },
  },
  created: {
    test() {
      console.log("子组件");
    },
  },
  methods: {
    resetTemp() {
      this.tempEventForm = {
        timestamp: new Date(),
      };
    },
    // handleCreate() {
    //   // TODO
    //   this.resetTemp();
    //   this.dialogStatus = "create";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["dataForm"].clearValidate();
    //   });
    // },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          // TODO 发起请求 创建表单
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          createEvent(this.temp).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
  },
};
</script>