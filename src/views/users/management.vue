<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.phoneNumber"
        placeholder="手机号"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.idNumber"
        placeholder="身份证"
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
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" width="60px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column width="57px" align="center">
        <template slot-scope="{ row }">
          <el-avatar size="medium" :src="row.headPortrait" fit="contain">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="90px" align="center">
        <template slot-scope="{ row }">
          <!-- <div style="width=2px">
            <el-avatar size="medium" :src="row.headPortrait" fit="contain">
            </el-avatar>
          </div> -->
          <span>{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        width="155px"
        align="center"
        prop="registrationTime"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            row.registrationTime | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phoneNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="身份证" width="175px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.idNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住址" width="210px" align="center">
        <template slot-scope="{ row }">
          <span> {{ row.livingAddressCode | AddressCodeToText }}</span>
        </template>
      </el-table-column>
      <!-- TODO 直接跳转到相应页面查看详情 -->
      <el-table-column
        label="上传走失事件数"
        width="88px"
        align="center"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.missingEventsCnt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上传线索数"
        width="75px"
        align="center"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.cluesCnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110px" align="center">
        <template slot-scope="{ row }">
          <!-- <el-tooltip content="查看详情" effect="light" placement="top">
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              size="median"
              @click="handleFetchClues(row.eventId)"
            >
            </el-button>
          </el-tooltip> -->
          <!-- TODO 用户诚信记录 暂停权限多少天 此处能有人工暂停和恢复的入口 -->
          <!-- <el-tooltip content="停止该用户操作权限" effect="light" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="median"
              @click="handleUpdate(row)"
            >
            </el-button>
          </el-tooltip> -->
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
      @pagination="getUsersList"
    />
  </div>
</template>

<script>
import { fetchUsersList, deleteUser } from "@/api/users";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves"; // waves directive
import { regionDataPlus, regionData } from "element-china-area-data";

export default {
  name: "UserManagement",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0, // 我不知道有啥用
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        phoneNumber: '',
        idNumber: '',
        addressCode: '',
        sort: "-registrationTime",
      },
      addressCodePlusOptions: regionDataPlus,
      addressCodeOptions: regionData,
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      this.listLoading = true;
      fetchUsersList(this.listQuery).then((response) => {
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
      this.getUsersList();
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "registrationTime") {
        this.sortByRegistrationTime(order);
      } else if (prop === "missingEventsCnt") {
        this.sortByMissingEventsCnt(order);
      } else if (prop === "cluesCnt") {
        this.sortByCluesCnt(order);
      }
    },
    sortByRegistrationTime(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+registrationTime";
      } else {
        this.listQuery.sort = "-registrationTime";
      }
      this.handleFilter();
    },
    sortByMissingEventsCnt(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+missingEventsCnt";
      } else {
        this.listQuery.sort = "-missingEventsCnt";
      }
      this.handleFilter();
    },
    sortByCluesCnt(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+cluesCnt";
      } else {
        this.listQuery.sort = "-cluesCnt";
      }
      this.handleFilter();
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该用户信息 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(row.userId).then(() => {
            this.$notify({
              title: "成功",
              message: "删除事件成功",
              type: "success",
              duration: 2000,
            });
            this.getUsersList();
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