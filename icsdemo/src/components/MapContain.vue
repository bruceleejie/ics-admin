<template>
	<div class="container">
		<el-input type="text" id="suggestId" name="address_detail" placeholder="请搜索检索地点的关键字进行搜索" v-model="address_detail" class="input_style"></el-input>
		<!--<div id="searchResult" ref="searchResult" style="border: 1px solid #c0c0c0; width: 150px; height: auto; display: block; position: absolute;"></div>-->
		<!--<input type="text" id="suggestId" name="address_detail" placeholder="如门牌号等" v-model="address_detail" class="input_style">-->
    	<div id="allmap" class="allmap"></div>
    	<el-form :model="userAddress">
			<el-row>
				<el-col :span="10">
					<el-form-item label="地址" :label-width="labelWidth">
						<el-input v-model="userAddress.address" auto-complete="off" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="地址经度" :label-width="formLabelWidth">
						<el-input v-model="userAddress.longitude" auto-complete="off" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item label="地址纬度" :label-width="formLabelWidth" >
						<el-input v-model="userAddress.latitude" auto-complete="off" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item >
				<el-button type="primary" @click="onSubmit">确认地址</el-button>
				<el-button @click="onCancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {MP} from './map'
	
	export default {
		name: 'MapContain',
		data () {
			return {
				userAddress: {
					address: '',
					longitude: '',
					latitude: '',
					dialogShow: false
				},
				address_detail: '', //详细地址
         		userlocation: {
         			lng:"",
         			lat:""
         		},
         		labelWidth: '80px',
         		formLabelWidth: '120px'
			}
		},
		mounted() {
			this.$nextTick(function () {
				// 请下载本demo的小git们，使用自己的key，谢谢。
          		MP("your API key").then( BMap => {
            		var th = this
		            var map = new BMap.Map("allmap");// 创建Map实例
		            map.centerAndZoom("深圳", 14)
//		            var point = new BMap.Point(116.404, 39.915); // 创建点坐标
//		            map.centerAndZoom(point,15);
		            map.enableScrollWheelZoom();
		            var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		              {"input" : "suggestId"
		              ,"location" : map
		            })
            		var myValue
            		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
              			var _value = e.item.value;
              			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
               			th.address_detail = myValue
//						th.$refs.searchResult.innerHTML = myValue
              			setPlace();
            		});
            		
            		var geoc = new BMap.Geocoder()

	            	function setPlace(){
	              		map.clearOverlays();    //清除地图上所有覆盖物
			            function myFun(){
			                th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			                map.centerAndZoom(th.userlocation, 18);
			                map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
			                geoc.getLocation(th.userlocation, function(rs) {
								let addComp = rs.addressComponents
								markerAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
								console.log('点击的地址信息是；'+markerAddress)
								th.userAddress.address = markerAddress
							})
			                th.userAddress.longitude = th.userlocation.lng
							th.userAddress.latitude = th.userlocation.lat
			            }
		              	var local = new BMap.LocalSearch(map, { //智能搜索
		                	onSearchComplete: myFun 
		              	});
		              	local.search(myValue);
	            	}
	            	
	            	let markerAddress = null
	            	var marker = null
	            	
	            	map.addEventListener("click", function(e) {
	            		map.clearOverlays(marker)
	            		var addPoint = new BMap.Point(e.point.lng,e.point.lat)
						marker = new BMap.Marker(addPoint)
						map.addOverlay(marker)
						
						geoc.getLocation(e.point, function(rs) {
							let addComp = rs.addressComponents
							markerAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
							console.log('点击的地址信息是；'+markerAddress)
							th.userAddress.address = markerAddress
						})
						th.userAddress.longitude = e.point.lng
						th.userAddress.latitude = e.point.lat
	            	})
            	})
          	})
		},
		methods: {
			onSubmit() {
//				alert('我进来了')
				let self = this
				console.log(self.userAddress)
				self.$emit('userLocation', self.userAddress)
				self.userAddress = {
					address: null,
					longitude: null,
					latitude: null,
					dialogShow: false
				}
				self.address_detail = null
			},
			onCancel() {
				let self = this
				self.userAddress = {
					address: null,
					longitude: null,
					latitude: null,
					dialogShow: false
				}
				console.log(self.userAddress)
				self.$emit('userLocation', self.userAddress)
//				self.userAddress = null
//				self.address_detail = null
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss'>
.tangram-suggestion-main {
	z-index: 3000;
	top: 285px !important;
}

.container{
	position: relative;
	
	.input_style {
		
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 100;
		width: 40%;
	}
	
	.allmap {
		/*width: 400px !important;*/
		height: 600px;
		overflow: hidden;
		/*margin-left: 20px;*/
	}
	.el-form {
		width: 100%;
		.el-row {
			width: 100%;
		    padding: 20px 0 0 0;
		    height: 60px;
			.el-col {
				/*width: 50%;*/
			}
		}
	}
}
	
</style>