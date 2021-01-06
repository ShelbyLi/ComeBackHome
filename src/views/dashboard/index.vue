<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">phoneNumber: {{ phoneNumber }}</div>
    <div class="dashboard-text">nickname: {{ nickname }}</div>
    <div class="dashboard-text">avatar: {{ avatar }}</div>
    <div class="dashboard-text">avatar: {{ roles }}</div>
    <!-- <button @click="testclick"></button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'phoneNumber',
      'nickname',
      'avatar',
      'roles'
    ])
  },
  methods: {
    // testclick() {
    //   console.log(this.$store.state.name)
    // }
    
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
