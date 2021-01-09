<template>
  <div class="dashboard-editor-container">
    <!-- <div> -->
    <el-row
      style="background: #404a59; padding: 16px 16px; margin-bottom: 32px"
    >
      <div class="chart-container">
        <chart
          :options="map"
          :init-options="initOptions"
          height="700px"
          width="100%"
          ref="map"
          autoresize
          @click="handelClickMap"
        />
      </div>
    </el-row>
    <el-row type="flex" :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <chart
            :options="pie"
            :init-options="initOptions"
            ref="pie"
            autoresize
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <chart
            :options="bar"
            :init-options="initOptions"
            ref="bar"
            autoresize
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <chart
            :options="bar2"
            :init-options="initOptions"
            ref="bar2"
            autoresize
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getOptionData } from "@/api/volunteers";

import qs from "qs";
import ECharts from "@/components/ECharts/ECharts";

import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/map";
import "echarts/lib/chart/pie";
// import "echarts/lib/chart/line";  // TODO 加line的就会报错 怀疑是组件写的有问题?
import "echarts/lib/chart/bar";

import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";
// import "echarts/lib/component/dataZoom";
import "zrender/lib/svg/svg";
import "echarts/lib/component/axis";

// import map from "./data/map";
import { getMapOption } from "./data/map";
// import pie from "./data/pie";
import { getPieOption } from "./data/pie";
// import line from "./data/line"; // TODO 用line会报错?
// import bar from "./data/bar";
import { getBarOption } from "./data/bar";
// import bar2 from "./data/bar2";
import { getBar2Option } from "./data/bar2";

// built-in theme
import "echarts/theme/dark";
// custom theme
import theme from "@/components/ECharts/theme.json";
// Map of China
import chinaMap from "@/components/ECharts/china.json";
import formats from "qs/lib/formats";
// registering map data
ECharts.registerMap("china", chinaMap);
// registering custom theme
ECharts.registerTheme("ovilia-green", theme);

export default {
  components: {
    chart: ECharts,
  },
  mounted() {
    this.getOptionData();
  },
  data() {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true });
    return {
      options,
      map: {},
      pie: {},
      // line,
      bar: {},
      bar2: {},
      initOptions: {
        renderer: options.renderer || "canvas", // 渲染? 帆布?
      },
    };
  },
  methods: {
    getOptionData() {
      // this.getPieOptionData()
      this.getBarOptionData()
      // this.getBar2OptionData();
      // this.getMapOptionData();
    },
    getPieOptionData() {
      // TODO 传入参数有待修改
      getOptionData("pie").then((response) => {
        this.pie = getPieOption(response.data);
      });
    },
    getBarOptionData() {
      getOptionData("bar").then((response) => {
        console.log(response.data);
        this.bar = getBarOption(response.data);
      });
    },
    getBar2OptionData() {
      getOptionData("bar2").then((response) => {
        console.log(response.data);
        this.bar2 = getBar2Option(response.data);
      });
    },
    getMapOptionData() {
      getOptionData("map").then((response) => {
        console.log(response.data);
        this.map = getMapOption(response.data);
      });
    },
    handelClickMap() {
      // this.options.geo.map = "北京";
      // TODO 放大每个省份
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #404a59;
  position: relative;

  .chart-wrapper {
    background: #404a59;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
