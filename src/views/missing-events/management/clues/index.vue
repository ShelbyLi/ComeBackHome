<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.uploadPerson"
        placeholder="发现人"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.level"
        placeholder="等级"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in levelOptions"
          :key="item"
          :label="item"
          :value="item"
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
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button> -->
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button> -->
    </div>
    <el-table
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
          <el-form label-position="left">
            <el-form-item label="描述">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="照片">
              <el-image
                :key="img"
                v-for="img in props.row.clueImgs"
                fit="cover"
                style="width: 100px; height: 100px; margin: 10px"
                :src="img"
                :preview-src-list="props.row.clueImgs"
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
      <el-table-column
        label="发现时间"
        width="170px"
        align="center"
        prop="uploadTime"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{
            row.uploadTime | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发现人" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.uploadPerson }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发现地点"
        width="380px"
        align="left"
        prop="address"
        sortable="custom"
      >
        <template slot-scope="{ row }">
          <span>
            {{ row.foundAddressCode | CodeToText }}
            {{ row.foundAddressDetail }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="重要性" width="140px">
        <template slot-scope="{ row }">
          <template v-if="row.edit">
            <el-rate
              v-model="row.level"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              :max="3"
              style="margin-top: 8px"
            />
            <el-button
              class="cancel-btn"
              size="median"
              icon="el-icon-refresh"
              type="warning"
              circle
              @click="cancelEdit(row)"
            >
            </el-button>
          </template>
          <span v-else
            ><svg-icon
              v-for="n in +row.level"
              :key="n"
              icon-class="star"
              class="meta-item__icon"
          /></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="{ row }">
          <el-tooltip content="编辑重要性" effect="light" placement="top">
            <el-button
              v-if="row.edit"
              type="success"
              size="median"
              icon="el-icon-check"
              circle
              @click="confirmEdit(row)"
            >
            </el-button>
            <el-button
              v-else
              type="primary"
              size="median"
              icon="el-icon-edit"
              circle
              @click="row.edit = !row.edit"
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
      @pagination="getCluesList"
    />
    <!-- FIXME 页面上没有? -->
  </div>
</template>

<script>
import { deleteClue, fetchClues, updateClueLevel } from "@/api/missing-events";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import EleUploadVideo from "vue-ele-upload-video";
import {
  regionDataPlus,
  CodeToText,
  regionData,
} from "element-china-area-data";
export default {
  name: "clues",
  components: { Pagination, EleUploadVideo },
  directives: { waves },
  filters: {
    CodeToText(code) {
      const province = CodeToText[code.substring(0, 2) + "0000"];
      const city = CodeToText[code.substring(0, 4) + "00"];
      const county = CodeToText[code];
      return province + " " + city + " " + county;
    },
  },
  data() {
    return {
      listLoading: false,
      list: null,
      total: 0,
      listQuery: {
        eventId: "",
        page: 1,
        limit: 20,
        uploadPerson: "",
        addressCode: "",
        level: "",
        sort: "-createdTime",
      },
      levelOptions: [1, 2, 3],
    };
  },
  created() {
    this.getParams();
    this.getCluesList();
  },
  methods: {
    getParams() {
      this.listQuery.eventId = this.$route.query.eventId;
      // console.log(this.$route.query.event_id);
    },
    // getCluesList() {
    //   this.listLoading = true;
    //   fetchClues(this.listQuery).then((response) => {
    //     this.list = response.data.records;
    //     this.total = response.data.total;
    //     this.listLoading = false;
    //   });
    // },
    async getCluesList() {
      this.listLoading = true;
      const { data } = await fetchClues(this.listQuery);
      const items = data.records;
      this.list = items.map((v) => {
        this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
        v.originalLevel = v.level; //  will be used when user click the cancel botton
        return v;
      });
      this.listLoading = false;
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getCluesList();
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "uploadTime") {
        this.sortByCreatedTime(order);
      } else if (prop === "address") {
        this.sortByAddress(order);
      }
    },
    sortByCreatedTime(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+uploadTime";
      } else {
        this.listQuery.sort = "-uploadTime";
      }
      this.handleFilter();
    },
    sortByAddress(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+address";
      } else {
        this.listQuery.sort = "-address";
      }
      this.handleFilter();
    },
    // 行内操作
    // handleUpdate() {

    // }
    cancelEdit(row) {
      row.level = row.originalLevel;
      row.edit = false;
      this.$message({
        message: "操作已取消",
        type: "warning",
      });
    },
    confirmEdit(row) {
      row.edit = false;
      updateClueLevel(row).then(() => {
        // row.originalTitle = row.title;
        this.$notify({
          title: "成功",
          message: "该线索重要性已更新",
          type: "success",
          duration: 2000,
        });
      });
      this.getCluesList();
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文事件 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteClue(row.clueId).then(() => {
            this.$notify({
              title: "成功",
              message: "删除线索成功",
              type: "success",
              duration: 2000,
            });
            this.getCluesList();
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
  watch: {
    $route: "getParams",
  },
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 12px;
}
</style>
