<template>
  <div class="chart-container">
    <chart height="70%" width="70%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/Map'

export default {
  name: 'MixChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

