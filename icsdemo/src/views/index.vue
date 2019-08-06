<template>
	<div class="indexContainer">
		<el-container class="big-container">
			<el-header>
				<!--<h2></h2>-->
				<h2>ICS-Demo</h2>
				<!--background-color="#1f2d3d"-->
				<el-menu
				  class="el-menu-demo"
				  mode="horizontal"
				  background-color="#fff"
				  text-color="#fff"
				  active-text-color="#fff">
					<el-submenu index="1">
						<template slot="title"><i class="fa fa-user-circle fa-fw"></i>{{ this.user.nickname }}</template>
						<el-menu-item index="1-1" class="spe-item">
							<a href="javascript:;" @click="adminInfo">
								<span>个人信息</span>
							</a>
						</el-menu-item>
						<el-menu-item index="1-2" class="spe-item">
							<a href="javascript:;" @click="adminLogout">
								<span>安全退出</span>
							</a>
						</el-menu-item>
					</el-submenu>
					<el-menu-item index="2" >
						<router-link to="/index/desk"><i class="fa fa-desktop fa-fw"></i>桌面</router-link>
					</el-menu-item>
					<el-menu-item index="4" >
						<span>
							<router-link to="/index/system"><i class="fa fa-info-circle fa-fw"></i>系统信息</router-link>
						</span>
					</el-menu-item>
				</el-menu>
			</el-header>
			<el-container class="body-container">
				<el-aside ><!-- width="280px" -->
					<el-scrollbar style="height: 100%;">
						<navleft :adminShow="adminDept"></navleft>
					</el-scrollbar>
				</el-aside>
				<el-main>
					<router-view ></router-view>
					<!--<el-scrollbar style="height: 100%;">
						<div class="mainContent">
						</div>
					</el-scrollbar>-->
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>

	import Navleft from '@/components/Navleft'
	
	export default {
		name: 'indexDesk',
		components: {
			Navleft
		},
		data() {
			return {
		        user: {
		        	id: '',
		        	login: '',
		        	pwd: '',
		        	nickname: '游客',
		        	dept: -1,
		        	default_group: '',
		        	employee: '',
		        	role: '',
		        	level: '',
		        	sip: '',
		        	sip_server: '',
		        	locate: '',
		        	longitude: '',
		        	latitude: '',
		        	height: '',
		        	phone: '',
		        	mobile: '',
					email: '',
					enable: 1,
					position: '',
					register: '',
					token: ''
		        },
		        adminDept: '',
		        menuShow: false
			};
		},
		created () {
		},
		computed: {
			
		},
		methods: {
			adminInfo() {
				let self = this
				self.$message({message: '游客暂无此功能'})
//				self.$router.push({path: '/index/admininfo'})
//				this.$router.replace({name: 'Personinfo'});
			},
			handleNodeClick(data) {
				console.log(data);
			},
			// 安全退出
			adminLogout() {
				let self = this
				// 此处可以写退出需要的方法和请求
				self.$router.replace({path: '/'})
			},
		}
	
	}
</script>

<style rel="stylesheet/scss" lang='scss'>
	@import "src/styles/header.scss";

	.indexContainer {
		width: 100%;
		height: 100%;
		/*background: #2C3E50;*/
		.big-container {
			width: 100%;
			height: 100%;
			/*min-height: 100% !important;*/
			
			.el-header {
				/*background: #1f2d3d;*/
				position: fixed;
				z-index: 10;
				color: #FFFFFF;
				height: 72px !important;
				padding: 0px;
				width: 100%;
				/*h2 {
					background: url(../assets/logo-gm-headicon.png) center no-repeat;
					width: 340px;
					height: 40px;
					margin: 16px 2%;
					float: left;
				}*/
				h2 {
					float: left;
					margin-left: 3%;
					line-height: 1;
					margin-top: 25px;
					font-size: 24px;
				}
				.el-menu {
					/*width: 300px;*/
					width: auto;
					float: right;
					height: 72px;
					border-bottom: none !important;
					/*padding: 0 40px;*/
					padding-right: 2%;
					.el-submenu__icon-arrow{
						color: #FFFFFF;
					}
					.el-menu--popup {
						background-color: #FFFFFF !important;
						width: 160px !important;
						text-align: center;
					}
				}
				.el-submenu__title i.fa, .el-menu-item i.fa {
					width: 18px;
					height: 18px;
					color: #FFFFFF;
					margin-right: 5px;
				}
			}
			.body-container {
				width: 100%;
				height: calc(100% - 72px);
				/*height: 100%;*/
				position: relative;
				/*overflow-y: auto;*/
				padding: 72px 0 0 0;
				/*position: fixed;
				top: 72px;*/

				.el-aside {
					/*background: #d3dce6;*/
					background: #ffffff;
					/*background: #EEEEEE;*/
					color: #333;
					text-align: center;
					line-height: 200px;
					/*height: 100%;*/
					width: 15% !important;
					
					.el-menu {
						border: 0px;
					}
					.el-scrollbar__wrap {
					  overflow-x: hidden;
					}
				}
				.el-main{
					width: 85%;
					/*height: 100%;*/
					background: #EEEEEE;
					color: #333;
					text-align: center;
					padding: 0px !important;
					overflow-y: auto;
					border-left: 2px solid #E4E4E4;
					
					/*line-height: 160px;*/
					.mainContent {
						/*width: 100%;
						height: 100%;*/
						padding: 10px !important;
						/*overflow-y: scroll;*/
					}
					.el-scrollbar__wrap {
						overflow-x: hidden;
					}
				}
			}
			
		}
		
	}
	.spe-item{
		width: 150px !important;
		a {
			display: block;
		}
	}
</style>