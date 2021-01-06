<template>
  <div class="app-container">
    <!-- 过滤器们 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.createdPerson"
        placeholder="上报人"
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        placeholder="走失人姓名"
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-cascader
        v-model="listQuery.addressCode"
        size="large"
        placeholder="选择区域"
        :options="addressCodeOptions"
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
      <el-table-column
        label="编号"
        width="80px"
        align="center"
        prop="id"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
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
          <span>{{ row.createdTime | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
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
          <span>{{ row.missingTime | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="走失地点" width="210px" align="center">
        <template slot-scope="{ row }">
          <span> {{ row.missingAddressCode | CodeToText }}</span>
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
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="handleUpdate(row)"
          >
            编辑
          </el-button>
          <el-button
            :disabled="!row.canStart"
            size="mini"
            type="success"
            plain
            @click="handleModifyStatus(row, '2')"
          >
            发起任务
          </el-button>
          <!-- <el-button
            v-if="!row.canStart"
            size="mini"
            type="success"
            plain
            @click="handleModifyStatus(row, 'draft')"
          >
            发起任务
          </el-button> -->
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            plain
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
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
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
    <dialog :dialog-attributes="dialogAttributes" />
  </div>
</template>

<script>
import {
  fetchEventsList,
  fetchPv,
  createEvent,
  updateEvent,
} from "@/api/missing-events";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { regionDataPlus, CodeToText } from "element-china-area-data";
// import AddressCodeToText from '@/filters'
import getArrayIndex from "@/utils";
import Dialog from "./components/dialog";

// 需要在前面先定义常量 因为函数中还要用到 不能直接写在data()里
const eventStatusOptions = ["待找回", "已找回", "待认领"];

const eventTypeOptions = ["未达到", "已达到", "任务中"];

export default {
  name: "MissingEventsManagement",
  components: { Pagination, Dialog },
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
    CodeToText(code) {
      const province = CodeToText[code.substring(0, 2) + "0000"];
      const city = CodeToText[code.substring(0, 4) + "00"];
      const county = CodeToText[code];
      return province + " " + city + " " + county;
    },
    // AddressCodeToText()
  },
  data() {
    return {
      tableKey: 0, // 我不知道有啥用
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        createdPerson: undefined,
        name: undefined,
        addressCode: undefined,
        importance: undefined,
        status: undefined,
        onlyCanStart: true,
        sort: "-id",
      },
      addressCodeOptions: regionDataPlus,
      importanceOptions: [1, 2, 3],
      eventStatusOptions,
      // // 添加/编辑 对话框
      // tempEventForm: {
      //   name: undefined,
      //   idNumber: undefined,
      //   bloodType: undefined,
      //   livingAddressCode: undefined,
      //   livingAddressDetail: undefined,
      //   recentPhotos: undefined,
      //   height: "",
      //   weight: "",
      //   missingTime: "",
      //   missingAddressCode: "",
      //   missingAddressDetail: "",
      //   clothing: "",
      //   physicalCondition: "",
      //   briefIntro: undefined,
      //   emergencyContact1: "",
      //   phoneNumber1: "",
      //   emergencyContact2: "",
      //   phoneNumber2: "",
      // },
      // dialogFormVisible: false,
      // dialogStatus: "",
      dialogAttributes: {
        dialogFormVisible: false,
        dialogStatus: "",
      },
      // textMap: {
      //   update: "编辑",
      //   create: "创建",
      // },
      // dialogPvVisible: false,
      // pvData: [],
      // rules: {
      //   name: [],
      //   // type: [
      //   //   { required: true, message: "type is required", trigger: "change" },
      //   // ],
      //   idNumber: [],
      //   bloodType: [],
      //   address: [],
      //   height: [],
      //   weight: [],
      //   missingTime: [
      //     {
      //       type: "date",
      //       required: true,
      //       message: "timestamp is required",
      //       trigger: "change",
      //     },
      //   ],
      //   // title: [
      //   //   { required: true, message: "title is required", trigger: "blur" },
      //   // ],
      //   clothing: [],
      //   physicalCondition: [],
      //   briefIntro: [],
      //   emergencyContact1: [],
      //   emergencyContact2: []
      // },
      // // 设置只能选择当前日期及之后的日期
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   },
      // },
      // bloodTypeOptions: ["A", "B", "AB", "O", "其他"],
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
        this.list = response.data.items;
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
      if (prop === "id") {
        this.sortByID(order);
      } else if (prop === "createdTime") {
        this.sortByCreatedTime(order);
      } else if (prop === "missingTime") {
        this.sortByMissingTime(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
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
    // resetTemp() {
    //   this.tempEventForm = {
    //     timestamp: new Date(),
    //   };
    // },
    handleCreate() {
      // TODO
      // this.resetTemp();
      console.log("添加按钮");
      // this.dialogStatus = "create";
      // this.dialogFormVisible = true;
      this.dialogAttributes.dialogStatus = "create"
      this.dialogAttributes.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    // createData() {
    //   this.$refs["dataForm"].validate((valid) => {
    //     if (valid) {
    //       // TODO 发起请求 创建表单
    //       // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       // this.temp.author = 'vue-element-admin'
    //       createEvent(this.temp).then(() => {
    //         // this.list.unshift(this.temp)
    //         this.dialogFormVisible = false;
    //         this.$notify({
    //           title: "Success",
    //           message: "Created Successfully",
    //           type: "success",
    //           duration: 2000,
    //         });
    //       });
    //     }
    //   });
    // },
    // 对行的操作
    handleModifyStatus(row, type) {
      this.$message({
        message: "成功启动归家行动",
        type: "success",
      });
      row.type = type;
      // TODO 发起请求
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