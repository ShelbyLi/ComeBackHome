<template>
  <div>
    <section>
      <figure>
        <chart
          :options="bar"
          ref="bar"
          theme="ovilia-green"
          autoresize
          @zr:click="handleZrClick"
          @click="handleClick"
        />
      </figure>
    </section>
  </div>
</template>

<script>
import qs from "qs";
import ECharts from "@/components/ECharts/ECharts";
import "echarts/lib/chart/bar";
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'

import getBar from "./data/bar";

import theme from './data/theme.json'
ECharts.registerTheme('ovilia-green', theme)

export default {
  components: {
    chart: ECharts,
  },
  data() {
    return {
      bar: getBar(), // 一些配置都是写在data文件里的
    };
  },

  methods: {
    handleClick() {
      console.log("click from echarts");
    },
    handleZrClick() {
      console.log("click from zrender");
    },
  },
  // mounted() {
  //   let dataIndex = -1;
  //   const pie = this.$refs.pie;
  //   const dataLen = pie.options.series[0].data.length;

  //   setInterval(() => {
  //     pie.dispatchAction({
  //       type: "downplay",
  //       seriesIndex: 0,
  //       dataIndex,
  //     });
  //     dataIndex = (dataIndex + 1) % dataLen;
  //     pie.dispatchAction({
  //       type: "highlight",
  //       seriesIndex: 0,
  //       dataIndex,
  //     });
  //     // 显示 tooltip
  //     pie.dispatchAction({
  //       type: "showTip",
  //       seriesIndex: 0,
  //       dataIndex,
  //     });
  //   }, 1000);
  // },
};
</script>