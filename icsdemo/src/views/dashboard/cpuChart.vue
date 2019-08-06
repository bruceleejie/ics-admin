<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts';

    require('echarts/theme/macarons'); // echarts 主题

    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '200px'
            },
            cpu: {
                type: Object,
                default: 0
            }
        },
        data() {
            return {
                chart: null,
                option: {
                	series: [{
                		type: 'gauge',
                        radius: '90%',
                        title: {
                        	fontSize: 14
                        },
                        detail: {
                        	fontSize: 17,
                        	formatter: '{value}%'
                        },
                        data: [{
                        	value: 100, 
                        	name: 'CPU使用率'
                        }],
                        axisLine: {
                        	show: true,
                        	lineStyle: {
                        		width: 15
                        	}
                        },
                        splitLine: {
                        	show: true,
                        	length: 20
                        },
                        pointer: {
                        	show: true,
                        	length: '70%',
                        	width: 5
                        },
                        animationEasing: 'cubicInOut',
        				animationDuration: 1600
                	}]
                }
            };
        },
        watch: {
        	cpu: {
        		handler (newValue, oldValue) {        			
        			this.initChart()
        		},
        		deep: true
        	}
        },
        created () {
//      	console.log('我在created')
        },
        mounted() {
//      	console.log('我在mounted')
            this.initChart()
        },
        updated () {
//      	console.log('我在updated')
        },
        activated () {
//      	console.log('我在activated')
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null;
        },
        methods: {
            initChart() {
            	this.chart = echarts.init(this.$el, 'gauge')
            	this.option.series[0].data[0].value = this.cpu.cpu
            	console.log(`cpu`, this.option)
            	this.chart.setOption(this.option, {lazyUpdate: true, notMerge: true, silent: false})
			}
        }
    }
</script>
