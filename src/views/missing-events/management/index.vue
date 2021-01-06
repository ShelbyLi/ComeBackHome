<template>
  <div class="app-container">
    <!-- 过滤器们 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.createdPerson"
        placeholder="上报人"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        placeholder="走失人姓名"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-cascader
        v-model="listQuery.addressCode"
        size="large"
        placeholder="选择区域"
        :options="addressCodePlusOptions"
        clearable
        class="filter-item"
      >
      </el-cascader>
      <el-select
        v-model="listQuery.importance"
        placeholder="等级"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.status"
        placeholder="事件状态"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in eventStatusOptions"
          :key="item"
          :label="item"
          :value="eventStatusOptions.getArrayIndex(item)"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
      <!-- <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        reviewer
      </el-checkbox> -->
      <el-tooltip
        content="达到启动标准 (状态必为待找回)"
        effect="dark"
        placement="bottom"
      >
        <el-switch
          v-model="listQuery.onlyCanStart"
          active-text="仅显示可启动任务"
          style="margin-left: 15px"
          active-color="#13ce66"
          @change="handleChangeOnlyCanStart"
        >
        </el-switch>
      </el-tooltip>
    </div>
    <!-- 表格 -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <!-- <el-table-column
        label="编号"
        width="80px"
        align="center"
        prop="id"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="序号" width="80px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="上报时间"
        width="153px"
        align="center"
        prop="createdTime"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            row.createdTime | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上报人" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createdPerson }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }} </span>
          <el-tag :type="row.status | tagStatusFilter">{{
            row.status | statusFilter
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="走失时间"
        width="155px"
        align="center"
        prop="missingTime"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            row.missingTime | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="走失地点" width="210px" align="center">
        <template slot-scope="{ row }">
          <span> {{ row.missingAddressCode | AddressCodeToText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="等级" width="80px">
        <template slot-scope="{ row }">
          <span
            ><svg-icon
              v-for="n in +row.importance"
              :key="n"
              icon-class="star"
              class="meta-item__icon"
          /></span>
        </template>
      </el-table-column>
      <el-table-column label="启动标准" width="80px" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{ row.status | StatusFilter }}</span> -->
          <el-tag :type="row.type | tagTypeFilter">
            {{ row.type | typeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <template slot-scope="{ row }">
          <el-tooltip content="查看详情" effect="light" placement="top">
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              size="median"
              @click="handleFetchClues(row.eventId)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="编辑" effect="light" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="median"
              @click="handleUpdate(row)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip content="启动归家行动" effect="light" placement="top">
            <el-button
              :disabled="!row.canStart"
              size="median"
              type="success"
              icon="el-icon-s-flag"
              circle
              @click="handleModifyStatus(row)"
            >
            </el-button>
          </el-tooltip>
          <!-- <el-button
            v-if="!row.canStart"
            size="mini"
            type="success"
            plain
            @click="handleModifyStatus(row, 'draft')"
          >
            发起任务
          </el-button> -->
          <el-tooltip content="删除" effect="light" placement="top">
            <el-button
              size="median"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(row)"
            >
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getEventsList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempEventForm"
        label-position="right"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="tempEventForm.name" clearable />
        </el-form-item>
        <el-form-item label="身份证" prop="idNumber">
          <el-input v-model="tempEventForm.idNumber" clearable />
        </el-form-item>
        <el-form-item label="血型">
          <el-select
            v-model="tempEventForm.bloodTypeOptions"
            class="filter-item"
            allow-create
            filterable
            clearable
            placeholder="请选择(若为稀有血型请输入)"
          >
            <el-option
              v-for="item in bloodTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="住址" prop="livingAddressCode">
          <el-cascader
            v-model="tempEventForm.livingAddressCode"
            size="large"
            placeholder="选择区域 (可搜索)"
            clearable
            filterable
            :options="addressCodeOptions"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item prop="livingAddressDetail">
          <el-input
            v-model="tempEventForm.livingAddressDetail"
            placeholder="详细地址"
            type="textarea"
            clearable
          />
        </el-form-item>

        <el-form-item label="身高(cm)" prop="height">
          <el-input
            v-model="tempEventForm.height"
            placeholder="单位: cm"
            clearable
          />
        </el-form-item>
        <el-form-item label="体重(kg)" prop="weight">
          <el-input
            v-model="tempEventForm.weight"
            placeholder="单位: kg"
            clearable
          />
        </el-form-item>
        <el-form-item label="走失时间" prop="missingTime">
          <el-date-picker
            v-model="tempEventForm.missingTime"
            type="datetime"
            placeholder="请选择时间"
            clearable
            default-value=""
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="走失地址" prop="missingAddressCode">
          <el-cascader
            v-model="tempEventForm.missingAddressCode"
            size="large"
            placeholder="选择区域 (可搜索)"
            clearable
            filterable
            :options="addressCodeOptions"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item prop="missingAddressDetail">
          <el-input
            v-model="tempEventForm.missingAddressDetail"
            placeholder="详细地址"
            type="textarea"
            clearable=""
          />
        </el-form-item>
        <!-- 尝试复合型输入框 好像不行 -->
        <!-- <el-form-item label="走失地址" prop="missingAddressCode">
          <el-input
            v-model="tempEventForm.missingAddressDetail"
            placeholder="详细地址"
            
            clearable=""
          />
          <el-cascader
            v-model="tempEventForm.missingAddressCode"
            slot="prepend"
            size="large"
            placeholder="选择区域 (可搜索)"
            clearable
            filterable
            :options="addressCodeOptions"
          >
          </el-cascader>
        </el-form-item> -->
        <el-form-item label="近期照片">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handlePhotoSuccess"
          >
            <!-- TODO action里加地址 elementui的源码还有css 没复制 -->
            <img
              v-if="tempEventForm.recentPhotos"
              :src="tempEventForm.recentPhotos"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="衣着" prop="clothing">
          <el-input v-model="tempEventForm.clothing" clearable="" />
        </el-form-item>
        <el-form-item label="身体状况" prop="physicalCondition">
          <el-input v-model="tempEventForm.physicalCondition" clearable="" />
        </el-form-item>
        <el-form-item label="其他描述" prop="briefIntro">
          <el-input
            v-model="tempEventForm.briefIntro"
            type="textarea"
            clearable=""
          />
        </el-form-item>
        <el-form-item label="紧急联系人1" prop="emergencyContact1">
          <el-input v-model="tempEventForm.emergencyContact1" clearable="" />
        </el-form-item>
        <el-form-item label="联系方式1" prop="phoneNumber1">
          <el-input v-model="tempEventForm.phoneNumber1" clearable="" />
        </el-form-item>
        <el-form-item label="紧急联系人2" prop="emergencyContact2">
          <el-input v-model="tempEventForm.emergencyContact2" clearable="" />
        </el-form-item>
        <el-form-item label="联系方式2" prop="phoneNumber2">
          <el-input v-model="tempEventForm.phoneNumber2" clearable="" />
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
  </div>
</template>

<script>
import {
  fetchEventsList,
  // fetchClues,
  createEvent,
  updateEvent,
  deleteEvent,
  startTask,
} from "@/api/missing-events";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  regionDataPlus,
  // CodeToText,
  regionData,
} from "element-china-area-data";
// import AddressCodeToText from '@/filters'
import getArrayIndex from "@/utils";
import {
  validPhoneNumber,
  validIdNumber,
  validPassword,
} from "@/utils/validate";

// 需要在前面先定义常量 因为函数中还要用到 不能直接写在data()里
const eventStatusOptions = ["待找回", "已找回", "待认领"];

const eventTypeOptions = ["未达到", "已达到", "任务中"];

export default {
  name: "MissingEventsManagement",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      // return eventStatusKeyValue[status];
      return eventStatusOptions[status];
    },
    typeFilter(type) {
      return eventTypeOptions[type];
    },
    tagStatusFilter(status) {
      const statusMap = ["success", "primary", "primary"];
      return statusMap[status];
    },
    tagTypeFilter(type) {
      const typeMap = ["info", "success", "warning"];
      return typeMap[type];
    },
    // CodeToText(code) {
    //   const province = CodeToText[code.substring(0, 2) + "0000"];
    //   const city = CodeToText[code.substring(0, 4) + "00"];
    //   const county = CodeToText[code];
    //   return province + " " + city + " " + county;
    // },
    // AddressCodeToText()
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value && !rule.required) {
        callback();
      } else if (value) {
        if (!value) {
          callback(new Error("请输入姓名"));
        } else {
          if (value.length < 2) {
            callback(new Error("姓名至少2个字符"));
          } else if (value.length > 4) {
            callback(new Error("姓名不能超过4个字符"));
          } else {
            callback();
          }
        }
      }
    };
    const validatePhoneNumber = (rule, value, callback) => {
      // 一个常量 跟一个匿名函数 (callback 就是一个函数指针)
      // return true // FIXME
      callback();
      if (!validPhoneNumber(value)) {
        // 调用了@/utils/validate 中的validPhoneNumber()
        callback(new Error("请输入11位合法的手机号"));
      } else {
        callback();
      }
    };
    const validateIdNumber = (rule, value, callback) => {
      if (!validIdNumber(value)) {
        callback(new Error("请输入合法的身份证"));
      } else {
        callback();
      }
    };
    return {
      tableKey: 0, // 我不知道有啥用
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        createdPerson: '',
        name: '',
        addressCode: '',
        importance: '',
        status: '',
        onlyCanStart: true,
        sort: "-createdTime",
      },
      addressCodePlusOptions: regionDataPlus,
      addressCodeOptions: regionData,
      importanceOptions: [1, 2, 3],
      eventStatusOptions,
      // // 添加/编辑 对话框
      tempEventForm: {
        eventId: "",
        name: "张三",
        idNumber: "330481199911250041",
        bloodType: "",
        livingAddressCode: "330105",
        livingAddressDetail: "运河上街",
        recentPhotos: "",
        height: "111",
        weight: "111",
        missingTime: new Date(),
        missingAddressCode: "330105",
        missingAddressDetail: "运河上街2",
        clothing: "",
        physicalCondition: "",
        briefIntro: "",
        emergencyContact1: "张三他爸",
        phoneNumber1: "12345678901",
        emergencyContact2: "",
        phoneNumber2: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [
          {
            required: true,
            // message: "请输入姓名",
            trigger: "blur",
            validator: validateName,
          },
        ],
        idNumber: [
          { required: true, trigger: "blur", validator: validateIdNumber },
        ],
        // bloodType: [],
        livingAddressCode: [
          { required: true, message: "请选择住址所在区域", trigger: "blur" },
        ],
        livingAddressDetail: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        height: [{ required: true, message: "请输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "请输入体重", trigger: "blur" }],
        missingTime: [
          {
            type: "date",
            required: true,
            message: "请输入走失时间",
            trigger: "blur",
          },
        ],
        missingAddressCode: [
          { required: true, message: "请选择走失所在区域", trigger: "blur" },
        ],
        missingAddressDetail: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        emergencyContact1: [
          {
            required: true,
            trigger: "blur",
            validator: validateName,
          },
        ],
        phoneNumber1: [
          { required: true, trigger: "blur", validator: validatePhoneNumber },
        ],
        emergencyContact2: [
          {
            trigger: "blur",
            validator: validateName,
          },
        ],
        phoneNumber2: [{ trigger: "blur", validator: validatePhoneNumber }],
        clothing: [],
        physicalCondition: [],
        briefIntro: [],
      },
      // 设置只能选择当前日期及之后的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      bloodTypeOptions: ["A型", "B型", "AB型", "O型"],
      // 下载
      downloadLoading: false,
    };
  },
  created() {
    this.getEventsList();
  },
  methods: {
    getEventsList() {
      this.listLoading = true;
      fetchEventsList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;

        // Just to simulate the time of the request
        // TODO 删除
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    // 筛选 过滤
    handleFilter() {
      this.listQuery.page = 1;
      this.getEventsList();
    },
    // 查询
    handleChangeOnlyCanStart(value) {
      this.listQuery.onlyCanStart = value;
      this.handleFilter();
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;
      // if (prop === "id") {
      //   this.sortByID(order);
      // } else 
      if (prop === "createdTime") {
        this.sortByCreatedTime(order);
      } else if (prop === "missingTime") {
        this.sortByMissingTime(order);
      }
    },
    // sortByID(order) {
    //   if (order === "ascending") {
    //     this.listQuery.sort = "+id";
    //   } else {
    //     this.listQuery.sort = "-id";
    //   }
    //   this.handleFilter();
    // },
    sortByCreatedTime(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+createdTime";
      } else {
        this.listQuery.sort = "-createdTime";
      }
      this.handleFilter();
    },
    sortByMissingTime(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+missingTime";
      } else {
        this.listQuery.sort = "-missingTime";
      }
      this.handleFilter();
    },
    // 对话框 添加 编辑
    resetTemp() {
      this.tempEventForm = {
        missingTime: new Date(),
      };
    },
    handleCreate() {
      // TODO 调试用 不能每次我输入吧 想累死我
      // this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.tempEventForm.missingTime = +new Date(
            this.tempEventForm.missingTime
          ); // 将时间转换成时间戳
          // new Promise((resolve, reject) => {
          createEvent(this.tempEventForm).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建事件成功",
              type: "success",
              duration: 2000,
            });
            // 刷新表格 即再获取一次
            this.getEventsList();
          });
          // .catch((error) => {
          //   reject(error);
          // });
          // });
        }
      });
    },
    handlePhotoSuccess(res, file) {
      this.tempEventForm.recentPhotos = URL.createObjectURL(file.raw);
    },
    handleUpdate(row) {
      this.tempEventForm = Object.assign({}, row); // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempEventForm1 = Object.assign({}, this.tempEventForm);
          tempEventForm1.missingTime = +new Date(tempEventForm1.missingTime);
          updateEvent(this.tempEventForm).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新事件成功",
              type: "success",
              duration: 2000,
            });
            // 刷新表格 即再获取一次
            this.getEventsList();
          });
        }
      });
    },
    // 对行的操作
    handleFetchClues(eventId) {
      // fetchClues(eventId).then((response) => {
      // this.pvData = response.data.pvData
      // this.dialogPvVisible = true
      this.$router.push({
        path: "/missing-events/management/clues",
        // name: 'clues',
        query: { eventId: eventId },
        // params: {id: eventId},
      });
      // });
    },
    handleModifyStatus(row) {
      this.$confirm("此操作将针对该事件启动归家行动 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          startTask(row.eventId).then(() => {
            this.$notify({
              title: "成功",
              message: "行动启动成功",
              type: "success",
              duration: 2000,
            });
            // this.getEventsList();
            // TODO 跳转到指挥
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该事件 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteEvent(row.eventId).then(() => {
            this.$notify({
              title: "成功",
              message: "删除事件成功",
              type: "success",
              duration: 2000,
            });
            this.getEventsList();
          });
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
    // 关于导出excel的函数
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "createdTime" || j === "missingTime") {
            return parseTime(v[j]);
          } else if (j === "status") {
            return this.$options.filters["statusFilter"](v[j]); // 在method中使用过滤器
            // return statusFilter(v[j])
          } else if (j === "type") {
            return this.$options.filters["typeFilter"](v[j]);
          } else if (j === "missingAddressCode") {
            return this.$options.filters["CodeToText"](v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "上报时间",
          "上报人",
          "姓名",
          "状态",
          "走失时间",
          "走失地点",
          "等级",
          "类型",
        ];
        const filterVal = [
          "createdTime",
          "createdPerson",
          "name",
          "status",
          "missingTime",
          "missingAddressCode",
          "importance",
          "type",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "走失事件-list",
        });
        this.downloadLoading = false;
      });
    },
  },
};
</script>