<template>
  <div>
    <input v-model.number="center.lng" />
    <input v-model.number="center.lat" />
    <input v-model.number="zoom" />
    <baidu-map
      class="bm-view"
      ak="gXf3p5GBCNZcuVetyFPN81cL3jhCR3Ii"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      :mapStyle="mapStyle"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
      @ready="handler"
    >
      <bm-view style="width: 100%; height: 300px; flex: 1"></bm-view>
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
      <bm-local-search
        :keyword="keyword"
        :auto-viewport="true"
        :nearby="circlePath"
      ></bm-local-search>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
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
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation";
import BmTraffic from "vue-baidu-map/components/layers/Traffic";
import BmLocalSearch from "vue-baidu-map/components/search/LocalSearch";
import BmCircle from "vue-baidu-map/components/overlays/Circle";
import BmCityList from 'vue-baidu-map/components/controls/CityList'

export default {
  components: {
    BaiduMap,
    BmView,
    BmScale,
    BmNavigation,
    BmMapType,
    BmOverviewMap,
    BmGeolocation,
    BmTraffic,
    BmLocalSearch,
    BmCircle,
    BmCityList,
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      // center: "杭州",
      zoom: 3,
      keyword: "养老院",
      location: "海宁",
      circlePath: {
        center: {
          lng: 116.404,
          lat: 39.915,
        },
        radius: 10000,
      },
      mapStyle: {
        styleJson: [
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#212121",
            },
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              color: "#2b2b2b",
            },
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              lightness: -42,
              saturation: -91,
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              lightness: -77,
              saturation: -94,
            },
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#1b1b1b",
            },
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              color: "#181818",
            },
          },
          {
            featureType: "subway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#181818",
            },
          },
          {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
              lightness: -52,
            },
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#313131",
            },
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
              color: "#8b8787",
            },
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              color: "#1b1b1b",
            },
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              lightness: -75,
              saturation: -91,
            },
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              lightness: -65,
            },
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              lightness: -40,
            },
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#8b8787",
              weight: "1",
              lightness: -29,
            },
          },
        ],
      },
      // predictDate: {
      //   weekday: 7,
      //   hour: 12,
      // },
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
  },
};
</script>

<style>
.bm-view {
  width: 100%;
  height: 1000px;
  /* height: 100%; */
}
</style>