<template>
  <div class="app-container">
    <div v-if="admin">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <!-- <user-card :user="user" /> -->
          <user-card :admin="admin" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <!-- <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane> -->
              <el-tab-pane label="我指挥的事件" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="我的基本信息" name="account">
                <account :user="admin" />
                <!-- <account: :admin="admin" /> -->
                <!-- TODO why一定要:user -->
              </el-tab-pane>
              <el-tab-pane label="账号安全" name="security">
                <security />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
// import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import Security from './components/Security'

export default {
  name: 'Profile',
  // components: { UserCard, Activity, Timeline, Account },
  components: { UserCard, Timeline, Account, Security },
  data() {
    return {
      // user: {},
      admin: {},
      activeTab: 'security'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'phoneNumber',
      'briefInfo',
      'nickname',
      'password'
    ])
  },
  created() {
    // this.getUser()
    this.getAdmin()
  },
  methods: {
    // getUser() {
    //   this.user = {
    //     name: this.name,
    //     role: this.roles.join(' | '),
    //     email: 'admin@test.com',
    //     avatar: this.avatar
    //   }
    // }
    getAdmin() {
      this.admin = {
        name: this.name,
        nickname: this.nickname,
        role: this.roles.join(' | '),
        avatar: this.avatar,
        phoneNumber: this.phoneNumber,
        briefInfo: this.briefInfo
      }
    }
  }
}
</script>
