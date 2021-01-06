<template>
  <baidu-map
    class="bm-view"
    ak="gXf3p5GBCNZcuVetyFPN81cL3jhCR3Ii"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    mapType="BMAP_SATELLITE_MAP"
    @ready="handler"
  >
    <!-- <template v-for="(it, index) in ms">
      <bm-marker
        :key="it.id"
        :position="it.position"
        @click="markclick(it, index)"
        @mouseover="markover(it, index)"
        :icon="it.if ? iocn : newincon"
        @mouseout="markout(it, index)"
      >
        <bm-info-window :show="it.show" :position="it.position">
          <p v-text="it.mess"></p>
        </bm-info-window>
      </bm-marker>
    </template> -->
  </baidu-map>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: {
    BaiduMap,
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      // center: "杭州",
      zoom: 3,
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      // this.center = "杭州"
      this.zoom = 15;
      
    },
  },
};
</script>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>