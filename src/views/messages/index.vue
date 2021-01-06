<template>
  <div class="app-container">
    <!-- <div v-if="admin"> -->
      <el-row :gutter="20">

        <el-col :span="24" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="新的线索审核" name="newClues">
                <new-clues />
              </el-tab-pane>
              <el-tab-pane label="新的志愿者审核" name="newVolunteers">
                <new-volunteers />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    <!-- </div> -->
  </div>
</template>

<script>
import NewClues from './components/NewClues'
import newVolunteers from './components/NewVolunteers'

export default {
  name: 'Message',
  components: { NewClues, newVolunteers },
  data() {
    return {
      activeTab: 'newClues',
    };
  },
};
</script>
