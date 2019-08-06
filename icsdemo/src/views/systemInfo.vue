<template>
	<div class="dashboard-container" v-loading="loading" element-loading-text="拼命加载中">
		<div class="userCountDiv">
    		<div class="line">
                <span class="title">当前在线人数:</span>
                <span class="text">{{ userCount.online }}人</span>
            </div>
			<div class="line">
                <span class="title">总注册人数:</span>
                 <span class="text">{{ userCount.total }}人</span>
            </div>
    	</div>
    	<div class="" v-show="tableData? true : false">
    		<el-tabs type="border-card" >
	    		<el-tab-pane v-for="(item, index) in tableData" :key="index">
	    			<span slot="label"> 服务器名称：{{ item.server }}</span>
	    			<div class="serverContent">
			    		<div class="pieContainer">
			    			<div class="pieItem">
			    				<PieChart :pieData="item.info.memory" />
			    			</div>
			    			<div class="pieItem">
			    				<DiskPieChart :diskData="item.info.disk" />
			    			</div>
			    			<div class="pieItem">
			    				<BarChart :barData="item.info.net" />
			    			</div>
			    		</div>
			    		<div class="efficientContainer">
			    			<div class="efficientTitle">当前服务器是{{ item.info.cpu.length }}核CPU，每个CPU的运行效率如下：</div>
			    			<div class="efficientContent">
				    			<!-- 下面div可用 -->
				    			<div class="cpu" v-for="cpu in item.info.cpu">
					                <CpuChart :cpu={cpu} />
					            </div>
			    			</div>
				    			
			    		</div>
			    		
	    			</div>
	    		</el-tab-pane>
	    	</el-tabs>
    	</div>
    	<div class="noDataDiv" v-show="tableData == [] ? true : false">
    		服务器出错了，当前页面暂时无法访问，请刷新页面或访问其他页面！
    	</div>
	</div>
</template>

<script>
  	import CpuChart from './dashboard/cpuChart'
    import PieChart from './dashboard/pieChart'
    import DiskPieChart from './dashboard/diskpieChart'
    import BarChart from './dashboard/barChart'
    
	export default {
		name: 'Systeminfo',
		components: {
			CpuChart,
			PieChart,
			DiskPieChart,
			BarChart
		},
		data() {
			return {
				tableData: {},
            	cpu: [],
            	fileStorage: {},
            	memory: {},
            	user: {},
            	serverName: '',
            	
                os: [],
                userCount:{
                    total:0,
                    online:0,
                },
                task:[],
                sos:[],
                updateTimer: null,
                loading: false
			}
		},
		computed: {

		},
		created() {
			let that = this
            that.loading = true
            that.tableData  = {}
            that.getData()
            that.updateTimer = setInterval(function () {
                that.getData()
            }, 5000)
	    },
		methods: {
			getData () {
				let self = this
				
				self.$ajax.get('/api/systeminfo').then((res) => {
					if (res.data.errno == 0) {
						self.userCount.online = res.data.data.online
						self.userCount.total = res.data.data.total
						self.tableData = res.data.data.servers
						self.loading = false
					} else {
						
					}
				}).catch((err) => {
					
				})
			}
		},
        beforeDestroy() {
        	if (this.updateTimer) {
        		clearInterval(this.updateTimer)
        	}
        }
	
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.dashboard-container{
		background: #fff;
	    min-height: 100%;
	   	padding: 10px;
		text-align: left;
		
		.noDataDiv {
    		width: 100%;
    		height: 500px;
    		text-align: center;
    		font-size: 24px;
    		line-height: 500px;
    	}
    	.userCountDiv {
    		padding: 20px;
    		
    		.line {
		        width: 300px;
		        display: inline-block;
		        .title {
		            float: left;
		            display: block;
		            width: 40%;
		            font-size: 15px;
		            color: #5e6d82;
		            line-height: 1.5em;
		            text-align: right;
		        }
		        .text {
		            float: right;
		            display: block;
		            font-size: 15px;
		            color: #5e6d82;
		            line-height: 1.5em;
		            text-align: left;
		            width: 50%;
		        }
		    }
    	}
    	
		.serverContent {
			
			.pieContainer {
				width: 95%;
				margin: 0 auto;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				
				.pieItem {
					display: inline-block;
				}
			}
			
			.efficientContainer {
				width: 90%;
				min-height: 300px;
				margin: 10px auto;
				
				.efficientTitle {
					text-align: center;
					margin: 10px;
				}
				.efficientContent {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					.efficiency {
						width: 150px;
						height: 150px;
						padding: 10px;
					}
				}
				
			}
		}
	}
</style>