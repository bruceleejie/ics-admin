<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  const animationDuration = 3000;
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '500px'
      },
      height: {
        type: String,
        default: '300px'
      },
      barData: {
      	type: Object,
        default: {}
      }
    },
    data() {
      return {
        chart: null,
        option: {
        	title: {
            text: '数据接收发送情况',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['已发送数据', '已接收数据', '丢弃数据', '接受错误数据', '发送错误数据'],
            axisLabel: {
            	interval: 0
//          	textStyle: {
//          		fontSize: 16
//          	}
            },
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '数据量（G）',
            type: 'bar',
            stack: 'vistors',
            barWidth: '50%',
            data: [],
            animationEasing: 'cubicInOut',
            animationDuration: 1600
          }]
        }
      }
    },
    watch: {
			barData: {
				handler (newValue, oldValue) {        			
					this.initChart()
				},
				deep: true
			}
		},
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
      	let self = this
        self.chart = echarts.init(self.$el, 'macarons');
//      console.log('柱状图的数据是：', self.barData)
        
        self.option.series[0].data[0] = self.delBYTESize(self.barData.bytes_sent)
        self.option.series[0].data[1] = self.delBYTESize(self.barData.bytes_recv)
        self.option.series[0].data[2] = self.delBYTESize(self.barData.dropin)
        self.option.series[0].data[3] = self.delBYTESize(self.barData.errin)
        self.option.series[0].data[4] = self.delBYTESize(self.barData.errout)
        self.chart.setOption(self.option, {lazyUpdate: true, notMerge: true, silent: false})
      },
      delBYTESize(v) {
      	return (v/(1024*1024*1024)).toFixed(2);
//      if(v >= (1024*1024*1024*1024))
//      	return (v/(1024*1024*1024*1024)).toFixed(2);
////      	return (v/(1024*1024*1024*1024)).toFixed(2) + 'T';
//      if(v >= (1024*1024*1024))
//      	return (v/(1024*1024*1024)).toFixed(2);
////      	return (v/(1024*1024*1024)).toFixed(2) + 'G';
//      else if(v >= (1024*1024))
//      	return (v/(1024*1024)).toFixed(2);
////      	return (v/(1024*1024)).toFixed(2) + 'M';
//      else if(v >= 1024)
//      	return (v/1024).toFixed(2);
////      	return (v/1024).toFixed(2) + 'K';
//      else
//      	return v + 'BYTE';
	    },
    }
}
</script>
