<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="志愿者姓名"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.isPause"
        placeholder="是否暂停活动"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in isPauseTextOptions"
          :key="item"
          :label="item"
          :value="isPauseTextOptions.getArrayIndex(item)"
        />
      </el-select>
      <el-select
        v-model="listQuery.isPass"
        placeholder="是否通过审核"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in isPassTextOptions"
          :key="item"
          :label="item"
          :value="isPassTextOptions.getArrayIndex(item)"
        />
      </el-select>
      <el-cascader
        v-model="listQuery.addressCode"
        size="large"
        placeholder="选择区域"
        :options="addressCodePlusOptions"
        clearable
        class="filter-item"
      >
      </el-cascader>
      <el-input
        v-model="listQuery.examinerName"
        placeholder="审核人"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>
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
      <el-table-column type="expand" width="50px" align="right">
        <template slot-scope="props">
          <!-- <template> -->
          <el-form label-position="left" label-width="100px">
            <!-- <el-form-item label="头像">
              <el-image
                :key="img"
                v-for="img in props.row.headPortrait"
                fit="cover"
                style="width: 100px; height: 100px; margin: 10px"
                :src="img"
                :preview-src-list="props.row.headPortrait"
              >
              </el-image>
            </el-form-item> -->
            <el-form-item label="详细地址">
              <span
                >{{ props.row.livingAddressCode | AddressCodeToText }}
                {{ props.row.livingAddressDetail }}</span
              >
            </el-form-item>
            <el-form-item label="简介">
              <span>{{ props.row.briefIntro }}</span>
            </el-form-item>
            <el-form-item label="志愿者证书">
              <el-image
                :key="img"
                v-for="img in props.row.certificateImgs"
                fit="cover"
                style="width: 100px; height: 100px; margin: 10px"
                :src="img"
                :preview-src-list="props.row.certificateImgs"
              >
              </el-image>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="50px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="140px" align="center">
        <template slot-scope="{ row }">
          <el-tag v-if="row.isPause" type="warning">{{
            row.isPause | isPauseTextFilter
          }}</el-tag>
          <span>{{ row.name }} </span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phoneNumber }} </span>
        </template>
      </el-table-column>
      <el-table-column label="住址" width="210px" align="center">
        <template slot-scope="{ row }">
          <span> {{ row.livingAddressCode | AddressCodeToText }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间"
        width="155px"
        align="center"
        prop="missingTime"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            row.applicationTime | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参与行动总次数"
        width="88px"
        align="center"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.volunteerCount }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="参与行动总时间"
        width="88px"
        align="center"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.volunteerDuration | min2hour }} </span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="80px" align="center">
        <template slot-scope="{ row }">
          <!-- <span>{{ row.status | StatusFilter }}</span> -->
          <el-tag :type="row.isPass | isPassTypeFilter">
            {{ row.isPass | isPassTextFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核人" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.examinerName }} </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-tooltip
            v-if="!row.isPass"
            content="审核"
            effect="light"
            placement="top"
          >
            <el-button
              type="success"
              icon="el-icon-s-claim"
              circle
              size="median"
              @click="handleCheck(row)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip
            v-else
            content="暂停志愿者活动"
            effect="light"
            placement="top"
          >
            <el-button
              :disabled="Boolean(row.isPause)"
              type="warning"
              icon="el-icon-minus"
              circle
              size="median"
              @click="handlePause(row)"
            >
            </el-button>
          </el-tooltip>
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
      @pagination="getVolunteersList"
    />

    <el-dialog title="审核" :visible.sync="dialogFormVisible">
      <el-form label-position="right" label-width="100px">
        <!-- <el-form-item label="详细地址">
          <span
            >{{ props.row.livingAddressCode | AddressCodeToText }}
            {{ props.row.livingAddressDetail }}</span
          >
        </el-form-item> -->
        <el-form-item label="申请理由">
          <span>{{ dialogForm.applicationReasons }}</span>
        </el-form-item>
        <el-form-item label="志愿者证书">
          <el-image
            :key="img"
            v-for="img in dialogForm.certificateImgs"
            fit="cover"
            style="width: 100px; height: 100px; margin: 10px"
            :src="img"
            :preview-src-list="dialogForm.certificateImgs"
          >
          </el-image>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="warning"
          @click="passVerification(false)"
        >
          不予通过
        </el-button>
        <el-button
          type="success"
          @click="passVerification(true)"
        >
          通过审核
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchVolunteersList,
  pauseVolunteer,
  deleteVolunteer,
  passVolunteerVerification
} from "@/api/volunteers";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination";
import { regionDataPlus, regionData } from "element-china-area-data";

const isPauseTextOptions = ["正常活动", "暂停活动"];
const isPassTextOptions = ["待审核", "已通过"];
export default {
  name: "VolunteersManagement",
  components: { Pagination },
  directives: { waves },
  filters: {
    isPassTextFilter(isPass) {
      // const textMap = ["审核中", "已通过"];
      // return textMap[isPass];
      return isPassTextOptions[isPass];
    },
    isPassTypeFilter(isPass) {
      const typeMap = ["warning", "success"];
      return typeMap[isPass];
    },
    isPauseTextFilter(isPause) {
      // const textMap = ["正常", "暂停活动"];
      // return textMap[isPause];
      return isPauseTextOptions[isPause];
    },
    min2hour(duration) {
      var h = parseInt(duration / 60);
      var m = duration % 60;
      return h + "h " + m + "min";
    },
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
        name: "",
        isPause: "",
        isPass: "",
        addressCode: "",
        examinerName: "",
        sort: "-applicationTime",
      },
      isPauseTextOptions,
      isPassTextOptions,
      addressCodePlusOptions: regionDataPlus,
      dialogFormVisible: false,
      dialogForm: {
        volunteerId: '',
        applicationReasons: '',
        certificateImgs: [],
      }
    };
  },
  created() {
    this.getVolunteersList();
  },
  methods: {
    getVolunteersList() {
      this.listLoading = true;
      fetchVolunteersList(this.listQuery).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        // Just to simulate the time of the request
        // TODO 删除
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getVolunteersList();
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "applicationTime") {
        this.sortByApplicationTime(order);
      } else if (prop === "volunteerCount") {
        this.sortByVolunteerCount(order);
      } else if (prop === "volunteerCount") {
        this.sortByVolunteerDuration(order);
      }
    },
    sortByApplicationTime(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+applicationTime";
      } else {
        this.listQuery.sort = "-applicationTime";
      }
      this.handleFilter();
    },
    sortByVolunteerCount(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+volunteerCount";
      } else {
        this.listQuery.sort = "-volunteerCount";
      }
      this.handleFilter();
    },
    sortByVolunteerDuration(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+volunteerDuration";
      } else {
        this.listQuery.sort = "-volunteerDuration";
      }
      this.handleFilter();
    },
    // 操作
    handleCheck(row) {
      // this.tempEventForm = Object.assign({}, row); // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.dialogForm.volunteerId = row.volunteerId
      this.dialogForm.applicationReasons = row.applicationReasons
      this.dialogForm.certificateImgs = row.certificateImgs
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    passVerification(isPass) {
      const data = {
        volunteerId: this.dialogForm.volunteerId,
        isPass: isPass
      }
      passVolunteerVerification(data).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "审核成功",
              type: "success",
              duration: 2000,
            });
            // 刷新表格 即再获取一次
            this.getVolunteersList();
          });
    },
    handlePause(row) {
      this.$confirm("此操作将暂停该志愿者活动 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          pauseVolunteer(row.volunteerId).then(() => {
            this.$notify({
              title: "成功",
              message: "暂停志愿者活动成功",
              type: "success",
              duration: 2000,
            });
            this.getVolunteersList();
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
      this.$confirm("此操作将永久删除该志愿者 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteVolunteer(row.volunteerId).then(() => {
            this.$notify({
              title: "成功",
              message: "删除志愿者成功",
              type: "success",
              duration: 2000,
            });
            this.getVolunteersList();
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
  },
};
</script>