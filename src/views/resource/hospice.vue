<template>
  <div class="app-container">
    <!-- <input v-model.number="center.lng" />
    <input v-model.number="center.lat" />
    <input v-model.number="zoom" /> -->
    <div class="filter-container">
      <!-- <el-input
        v-model="location"
        placeholder="地点"
        clearable
        style="width: 150px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      /> -->
      <!-- <el-cascader
        v-model="addressCode"
        size="large"
        placeholder="选择区域"
        :options="addressCodeOptions"
        clearable
        class="filter-item"
      >
      </el-cascader> -->
      <el-select
        v-model="keyword"
        class="filter-item"
        allow-create
        filterable
        clearable
        placeholder="请选择/输入"
      >
        <el-option
          v-for="item in resourceOptions"
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
    </div>
    <baidu-map
      class="bm-view"
      ak="gXf3p5GBCNZcuVetyFPN81cL3jhCR3Ii"
      :center="circlePath.center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
      @ready="handler"
    >
      <bm-view style="width: 100%; height: 450px; flex: 1"></bm-view>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type> -->
      <bm-overview-map
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :isOpen="true"
      ></bm-overview-map>
      <!-- <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation> -->
      <!-- <bm-traffic
        :predictDate="{
          weekday: 7,
          hour: 12,
        }"
      ></bm-traffic> -->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        :nearby="circlePath"
      ></bm-local-search>
      <bm-circle
        :center="circlePath.center"
        :radius="circlePath.radius"
        :editing="true"
        @mouseout="updateCirclePath"
      ></bm-circle>
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
  </div>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmMapType from "vue-baidu-map/components/controls/MapType";
import BmOverviewMap from "vue-baidu-map/components/controls/OverviewMap";
// import BmGeolocation from "vue-baidu-map/components/controls/Geolocation";
// import BmTraffic from "vue-baidu-map/components/layers/Traffic";
import BmCityList from "vue-baidu-map/components/controls/CityList";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch";
import BmCircle from "vue-baidu-map/components/overlays/Circle";
import {
  regionDataPlus,
  provinceAndCityData,
  CodeToText,
} from "element-china-area-data";
import waves from "@/directive/waves"; // waves directive

export default {
  directives: { waves },
  components: {
    BaiduMap,
    BmView,
    BmScale,
    BmNavigation,
    BmMapType,
    BmOverviewMap,
    // BmGeolocation,
    // BmTraffic,
    BmCityList,
    BmLocalSearch,
    BmCircle,
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      // center: "杭州",
      zoom: 3,
      // predictDate: {
      //   weekday: 7,
      //   hour: 12,
      // },
      // keyword: resourceOptions[0],
      keyword: '派出所',
      circlePath: {
        center: {
          lng: 116.404,
          lat: 39.915,
        },
        radius: 10000,
      },
      // addressCodeOptions: provinceAndCityData,
      // addressCode: "",
      resourceOptions: ['派出所', '医院', '养老院'],
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
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
    updateCirclePath(e) {
      this.circlePath.center = e.target.getCenter();
      this.circlePath.radius = e.target.getRadius();
    },
    handleFilter() {
      // this.location = CodeToText[this.addressCode[1]]
      this.circlePath.center = this.center;
    },
  },
};
</script>

<style>
.bm-view {
  width: 100%;
  height: 1200px;
  /* height: 300px; */
  /* height: 100%; */
}
</style>