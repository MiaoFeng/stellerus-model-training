<script setup lang="ts">
import { ref, watch} from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GraphicComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent, GraphicComponent])

const props = defineProps({
   series: {
        type: Array,
        required: false,
    },
    suffix: {
        type: String,
        required: false,
        default: '个'
    },
    data: {
        type: Array,
        required: false
    },
    colors: {
        type: Array,
        required: false
    }
})

const chartOptions =ref({
    tooltip: {
    trigger: 'item'
    },
    series: [
    {
        type: 'pie',
        radius: ['70%', '90%'],
        center: ['50%', '50%'],
        hoverAnimation: false,
        itemStyle: {
            normal: {
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetX: 8,
                shadowOffsetY: 8,
                // borderColor: '#fff',
            }
        },
        avoidLabelOverlap: false,
        padAngle: 3,
        label: {
            show: false,
            position: 'center'
        },
        labelLine: {
            show: false
        },
        data: props?.data
    }, {
        name: '背景',
        type: 'pie',
        radius: ['90%', '95%'],
        center: ['50%', '50%'],
        z: 10,
        hoverAnimation: false,
        animation: false,
        selectedMode: false,
        silent: true,
        tooltip: {
            show: false,
        },
        itemStyle: {
            label: {show: false},
            labelLine: {show: false},
            color: 'rgba(255,144,0,0.4)'
        },
        avoidLabelOverlap: false,
        padAngle: 3,
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        data: [{
            value: 1,
            z: 1,
            label: {
                show: true,
                position: 'center',
                formatter: () => {
                    return `{bg|}`
                },
                rich: {
                    bg: {
                        left: 'center',
                        width: 96,
                        height: 96,
                        backgroundColor: {
                            image: '@/assets/images/common/circular_styleBG.png'
                        }
                    }
                }
            },
            itemStyle: {
                borderWidth: 2,
                borderColor: '#2c6469'
            }
        }]
    }
    ],
    color: props?.colors ? props?.colors : [ '#1AF7C3', '#F3FD56', '#F6A74A', '#FF4A6F' ]
})
const chartInstance = ref(null)

watch(() => props.data, (newVal) => {
    if(chartInstance.value) {
        chartOptions.value.series[0].data = newVal
        chartInstance.value.setOption(chartOptions)
    }
}, {deep: true})
</script> 

<template>
    <div>
        <v-chart
            :option="chartOptions" 
            ref="chartInstance"
            autoresize
            class="chart"
        />
    </div>
</template>
<style lang="scss" scoped>
.chart {
    width: 96px;
    height: 96px;
}
</style>