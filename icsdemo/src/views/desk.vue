<template>
	<div class="deskContainer">
		<el-row class="deskContent">
			<el-col class="deskItem">
				<div class="iconArea" @click="organizeDetail">
					<p></p>
					<h2>组织结构</h2>
					<h6>查看详情>></h6>
				</div>
			</el-col>
			<el-col class="deskItem">
				<div class="iconArea" @click="userDetail">
					<p></p>
					<h2>地址管理</h2>
					<h6>查看详情>></h6>
				</div>
			</el-col>
			<el-col class="deskItem">
				<div class="iconArea" @click="groupDetail">
					<p></p>
					<h2>群组管理</h2>
					<h6>查看详情>></h6>
				</div>
			</el-col>
			<el-col class="deskItem">
				<div class="iconArea" @click="deviceDetail">
					<p></p>
					<h2>设备管理</h2>
					<h6>查看详情>></h6>
				</div>
			</el-col>
			<el-col class="deskItem">
				<div class="iconArea" @click="infoDetail">
					<p></p>
					<h2>信息查询</h2>
					<h6>查看详情>></h6>
				</div>
			</el-col>
			<el-col class="deskItem" v-show="superAdminShow">
				<div class="iconArea" @click="appDetail">
					<p></p>
					<h2>应用管理</h2>
					<h6>查看详情>></h6>
				</div>
			</el-col>
			<el-col class="deskItem" v-show="superAdminShow">
				<div class="iconArea" @click="systemDetail">
					<p></p>
					<h2>系统管理</h2>
					<h6>查看详情>></h6>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Desktable',
		data() {
			return {
				superAdminShow: true
			}
		},
		computed: {
		},
		created() {
		},
		methods: {
			organizeDetail () {
				let self = this
				self.$router.push({path: '/index/tree'})
			},
			userDetail () {
				let self = this
				self.$router.push({path: '/index/userinfo'})
			},
			groupDetail () {
				let self = this
				self.$message({type: 'error', message: '此功能暂未开通'})
//				self.$router.push({path: '/index/group'})
			},
			deviceDetail () {
				let self = this
				self.$message({type: 'error', message: '此功能暂未开通'})
//				self.$router.push({path: '/index/device/monitor'})
			},
			infoDetail () {
				let self = this
				self.$message({type: 'error', message: '此功能暂未开通'})
//				self.$router.push({path: '/index/information/sosinfo'})
			},
			appDetail () {
				let self = this
				self.$message({type: 'error', message: '此功能暂未开通'})
//				self.$router.push({path: '/index/application/android'})
			},
			systemDetail () {
				let self = this
				self.$message({type: 'error', message: '此功能暂未开通'})
//				self.$router.push({path: '/index/system'})
			}
		}

	}
</script>

<style rel="stylesheet/scss" lang='scss'>
	.deskContainer{
		/*position: relative;*/
		background: #fff;
	    height: 100%;
	    /*padding-top: 148px;*/
		
		.el-row{
			/*position: absolute;
			top: 50%;
			left: 20%;*/
			/*max-width: 1010px;*/
			/*width: 100%;*/
			/*margin: 0 auto;*/
			/*padding-left: 40px;*/
			
			.el-col{
				/*border: 1px solid #2C3E50 !important;*/
				/*width: 202px;
				height: auto;*/
				
				.iconArea{
					h2{
						font-size: 22px;
						color: #000;
						line-height: 1;
						margin-top: 30px;
					}
					h6{
						font-size: 14px;
						color: #666;
						line-height: 1;
						margin-top: 20px;
						
					}
					&:hover {
						cursor: pointer;
					}
					&:hover p {
						transform: scale(1.2);
						transition: all 1s ease 0.5s;
					}
					p{
						content: '';
						background: url(../assets/icon.png) no-repeat center;
						width: 112px;
						height: 112px;
						margin: 0 auto;
					}
					/*&:hover p img{
						transform: scale(1.2);
						transition: all 1s ease 0.5s;
					}*/
					/*p{
						height: 112px;
						img{
							width: 112px;
							height: 112px;
						}
					}*/
					
				}
			}
		}
		.deskContent {
			height: 100%;
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			align-content: center;
			
			.deskItem {
				width: 200px;
				flex: none;
				
				&:nth-child(1) .iconArea p {
					background-position: -122px 0px;
				}
				&:nth-child(2) .iconArea p {
					background-position: -610px 0px;
				}
				&:nth-child(3) .iconArea p {
					background-position: -366px 0px;
				}
				&:nth-child(4) .iconArea p {
					background-position: 0px 0px;
				}
				&:nth-child(5) .iconArea p {
					background-position: -488px 0px;
				}
				&:nth-child(6) .iconArea p {
					background-position: -244px 0px;
				}
				&:nth-child(7) .iconArea p {
					background-position: -732px 0px;
				}
			}
		}
	}
</style>