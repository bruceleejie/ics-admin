<template>
	<div class="tac">
		<el-menu :default-active="$route.path" class="el-menu-vertical-demo">
			<el-submenu index="1">
				<template slot="title" ref="title" :style="stylenew" class="freeTitle">
					<!--<i class="el-icon-setting"></i>-->
					<i class="fa fa-sitemap"></i>
					<span>组织管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1"><router-link to="/index/tree">组织结构</router-link></el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title" class="freeTitle">
					<i class="fa fa-user"></i>
					<span>地址管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="2-1"><router-link to="/index/address">地址列表</router-link></el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!--<el-submenu index="3">
				<template slot="title" class="freeTitle">
					<i class="fa fa-group"></i>
					<span>群组管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="3-1"><router-link to="/index/group">群组列表</router-link></el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title" class="freeTitle">
					<i class="fa fa-desktop"></i>
					<span>设备管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="4-1"><router-link to="/index/device/monitor">监控设备</router-link></el-menu-item>
					<el-menu-item index="4-2"><router-link to="/index/device/meetingte">会议终端</router-link></el-menu-item>
					<el-menu-item index="4-3"><router-link to="/index/device/sipserver">sip服务器</router-link></el-menu-item>
					<el-menu-item index="4-4"><router-link to="/index/device/rtspserver">监控服务器</router-link></el-menu-item>
					<el-menu-item index="4-5"><router-link to="/index/device/pstn">PSTN网关</router-link></el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="fa fa-bar-chart"></i>
					<span>信息管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="5-1"><router-link to="/index/information/sosinfo">SOS信息</router-link></el-menu-item>
					<el-menu-item index="5-2"><router-link to="/index/information/signinfo">签到信息</router-link></el-menu-item>
					<el-menu-item index="5-3"><router-link to="/index/information/evidence">取证信息</router-link></el-menu-item>
					<el-menu-item index="5-4"><router-link to="/index/information/taskinfo">任务信息</router-link></el-menu-item>
					<el-menu-item index="5-5"><router-link to="/index/information/markinfo">标记信息</router-link></el-menu-item>
					<el-menu-item index="5-6"><router-link to="/index/information/converse">通话记录</router-link></el-menu-item>
					<el-menu-item index="5-7"><router-link to="/index/information/imessage">短消息记录</router-link></el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<i class="fa fa-align-left"></i>
					<span>应用管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="6-1"><router-link to="/index/application/android">移动端应用</router-link></el-menu-item>
					<el-menu-item index="6-2"><router-link to="/index/application/windows">Windows应用</router-link></el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="7">
				<template slot="title" class="freeTitle">
					<i class="fa fa-gears"></i>
					<span>系统管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="7-1"><router-link to="/index/system">参数列表</router-link></el-menu-item>
				</el-menu-item-group>
			</el-submenu>-->
		</el-menu>
	</div>
			

</template>

<script>
	export default{
		name: "Navleft",
		data () {
			return {
				tshow: false,
				stylenew: {
					height: '',
					lineHeight: '',
					fontSize: ''
				},
//				adminShow: true
			}
		},
		mounted () {
//			this.handleResize()
		},
		created() {
			
//			this.handleResize()
		},
		methods: {
			handleResize () {
				let self = this
				let chromeHeight = window.innerHeight
				if (chromeHeight > 900) {

				} else if (chromeHeight < 650) {
					self.stylenew.height = 70
					self.stylenew.fontSize = 16
					self.stylenew.lineHeight = 70

				}
			},
		}
	}
	
</script>

<style rel="stylesheet/scss" lang='scss'>
	
	.tac {
		padding-bottom: 20px;
    	background: #ffffff;
    	/*background: #FAFAFA;*/
	}
	.el-menu-vertical-demo{
		
		.el-submenu {
			
			.el-submenu__title {
				
				font-size: 20px;
				color: #000000;
				/*background: #FAFAFA;*/
				/*padding: 0 30px !important;*/
				/*text-align: left;*/
				height: 80px;
				line-height: 80px;
				
				.el-submenu__icon-arrow {
					display: none;
				}
				i{
					color: #103241;
					margin-right: 10px;
				}
				&:hover {
					/*background: none;*/
					border-left: 1px solid #ffffff;
					box-shadow: #e4e4e4 0px 2px 7px 1px;
					background-color: #FFFFFF !important;
				}
			}
			
			ul.el-menu--inline {
				
				.el-menu-item-group{
					.el-menu-item {
						padding: 0px !important;
						font-size: 16px;
						/*color: #000000;*/
						a {
							display: block;
							margin-left: 26px;
							&.active{
								color: #409EFF;
							}
						}
					}
				}
			}
		}
		.el-menu-item-group__title{
			display: none;
		}
	}
	
	

	.freeTitle{
		background: #E6F1FE !important;
	}
</style>