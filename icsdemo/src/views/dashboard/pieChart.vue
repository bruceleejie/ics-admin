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
        default: '350px'
//      default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      pieData: {
      	type: Object,
      	default: {}
      }
    },
    data() {
      return {
        chart: null,
        option: {
        	title: {
            text: '服务器内存使用情况',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
          	orient: 'vertical',
          	type: 'plain',
          	x: 'center',
          	bottom: '10%',
            data: ['占用内存', '剩余内存']
          },
          calculable: true,
        	series: [{
        		name: '内存使用情况',
	          type: 'pie',
	          radius: '40%',
	          roseType: false,
	          labelLine: {
	          	normal: {
	          		length: 20,
	          		length2: 70
	          	}
	          },
	          label: {
	          	normal: {
	          		formatter: '{b}: {c} \n\n',
	          		padding: [0, -90]
	          	}
	          },
	          data: [
	            { value: 100, name: '占用内存（G）' },
	            { value: 400, name: '剩余内存（G）' }
	          ],
	          animationEasing: 'cubicInOut',
	          animationDuration: 1600
        	}]
        }
      };
    },
    watch: {
			pieData: {
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
        self.option.series[0].data[0].value = self.delBYTESize(self.pieData.used)
        self.option.series[0].data[1].value = self.delBYTESize(self.pieData.available)
        console.log('内存数据是：', self.pieData, self.delBYTESize(self.pieData.used), self.delBYTESize(self.pieData.available))
        self.chart.setOption(self.option, {lazyUpdate: true, notMerge: true, silent: false})
      },
      delBYTESize(v) {
      	return (v/(1024*1024*1024)).toFixed(2);
//      if(v >= (1024*1024*1024*1024)) {
//      	console.log('我是T')
//      	return (v/(1024*1024*1024*1024)).toFixed(2);
////      	return (v/(1024*1024*1024*1024)).toFixed(2) + 'T';
//      } else if(v >= (1024*1024*1024)) {
//      	console.log('我是G')
//      	return (v/(1024*1024*1024)).toFixed(2);
////      	return (v/(1024*1024*1024)).toFixed(2) + 'G';
//      } else if(v >= (1024*1024)) {
//      	console.log('我是M')
//      	return (v/(1024*1024)).toFixed(2);
////      	return (v/(1024*1024)).toFixed(2) + 'M';
//      } else if(v >= 1024) {
//      	console.log('我是K')
//      	return (v/1024).toFixed(2);
////      	return (v/1024).toFixed(2) + 'K';
//      } else {
//      	return v + 'BYTE';
//      }
	    },
    }
}
</script>
