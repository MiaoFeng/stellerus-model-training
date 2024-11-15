<script setup lang="ts">
import { ref, watch } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';

use([CanvasRenderer, GridComponent, LegendComponent, TooltipComponent, RadarChart]);

const props = defineProps({
    data: {
        type: Array,
        default: () => {
          return [
        {
          value: [0, 0, 0, 0],
          name: 'Train'
        },
        {
          value: [0, 0, 0, 0],
          name: 'Validation'
        },
        {
          value: [0, 0, 0, 0],
          name: 'Test'
        },
      ];
        }
    },
    height: {
      type: String,
      default: '320px'
    },
    unit: {
        type: String,
        default: ''
    },
    colors: {
        type: Array,
        default: () => {
          return ['#FF4A6F', '#04BD9A']
        }
    }
})

const chartInstance = ref(null)
const chartOptions = ref({
tooltip:{
    show: true
  },
  grid: {
    top: 10,
    left: 40,
    right: 16,
    bottom: 20
  },
  legend: {
    show: false,
    top: 0,
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
    data: ['Train', 'Validation', 'Test' ]    
  },
  radar: {
    indicator: [
      { name: 'AUC', max: 1},
      { name: 'F1', max: 1 },
      { name: 'Precision', max: 1 },
      { name: 'Recall', max: 1 },
    ]
  },
  series: [
  {
      type: 'radar',
      data: [
        {
          value: [0, 0, 0, 0],
          name: 'Train'
        },
        {
          value: [0, 0, 0, 0],
          name: 'Validation'
        },
        {
          value: [0, 0, 0, 0],
          name: 'Test'
        },
      ]
    }
  ]
});

//数据变化时更新图表
watch(() => props.data, (newVal) => {
    if(chartInstance.value) {
      chartOptions.value.series[0].data = newVal
      // chartInstance.value.setOption(chartOptions)
      console.log(newVal)
    }
}, {deep: true})

</script>

<template>
    <div style="width: 100%" :style="{ 'height': height }">
        <v-chart 
            :option="chartOptions"
            ref="chartInstance" 
            class="chart"
            autoresize
        />
    </div>
</template>
<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>