<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="管理员姓名"
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
            <!-- <el-form-item label="详细地址">
              <span
                >{{ props.row.livingAddressCode | AddressCodeToText }}
                {{ props.row.livingAddressDetail }}</span
              >
            </el-form-item> -->
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
      <el-table-column
        label="本月度指挥统计"
        width="150px"
        align="center"
        prop="monthlyCount"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.monthlyCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="本季度指挥统计"
        width="150px"
        align="center"
        prop="seasonallyCount"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.seasonallyCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="本年度指挥统计"
        width="150px"
        align="center"
        prop="yearlyCount"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>{{ row.yearlyCount }}</span>
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
              :disabled="currentRole !== 'root'"
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
      @pagination="getAdminsList"
    />
  </div>
</template>

<script>
import { fetchAdminsList, deleteAdmin } from "@/api/admins";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves"; // waves directive
import { mapGetters } from "vuex";

export default {
  name: "AdminManagement",
  components: { Pagination },
  directives: { waves },
  computed: {
    ...mapGetters([
      // 'name',
      // 'phoneNumber',
      // 'nickname',
      // 'avatar',
      "roles",
    ]),
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
        phoneNumber: "",
        idNumber: "",
        // addressCode: '',
        sort: "-monthlyCount",
      },
      currentRole: "admin",
    };
  },
  created() {
    // if (this.roles==='root') {
    if (this.roles.includes("root")) {
      this.currentRole = "root";
    }
    this.getAdminsList();
  },
  methods: {
    getAdminsList() {
      this.listLoading = true;
      fetchAdminsList(this.listQuery).then((response) => {
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
      if (prop === "monthlyCount") {
        this.sortByMonthlyCount(order);
      } else if (prop === "seasonallyCount") {
        this.sortBySeasonallyCount(order);
      } else if (prop === "yearlyCount") {
        this.sortByYearlyCount(order);
      }
    },
    sortByMonthlyCount(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+monthlyCount";
      } else {
        this.listQuery.sort = "-monthlyCount";
      }
      this.handleFilter();
    },
    sortBySeasonallyCount(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+seasonallyCount";
      } else {
        this.listQuery.sort = "-seasonallyCount";
      }
      this.handleFilter();
    },
    sortByYearlyCount(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+yearlyCount";
      } else {
        this.listQuery.sort = "-yearlyCount";
      }
      this.handleFilter();
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该管理员 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAdmin(row.adminId).then(() => {
            this.$notify({
              title: "成功",
              message: "删除管理员成功",
              type: "success",
              duration: 2000,
            });
            this.getAdminsList();
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