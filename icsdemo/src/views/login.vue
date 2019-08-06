<template>
	<div class="loginContainer">
		<el-form autoComplete="on" 
			:model="loginForm" :rules="loginRules" 
			ref="loginForm" label-position="left" 
			label-width="0px" class="card-box login-form">
			
			<h3 class="title">系统登录</h3>
			<el-form-item prop="username">
				<i class="fa fa-user"></i>
				<el-input name="username" type="text" v-model="loginForm.username" autoComplete="off"
					ref="loginAccount" @input="checkAccountName(loginForm.username)" placeholder="用户名">
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<i class="fa fa-lock"></i>
				<el-input name="password" type="password" @keyup.enter.native="handleLogin"
					 v-model="loginForm.password" autoComplete="off" placeholder="密码" maxlength="16">
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="width:100%;" :loading="loading" @click="handleLogin">
					登录
				</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	
	export default {

		name: 'login',
		data() {
			const validateUsername = (rule, value, callback) => {
				let valLen = 0
				if(value.length < 1) {
					callback(new Error('用户名不能为空'))
				} else {
					for (let i=0; i<value.length; i++) {
						let item = value.charAt(i)
						if (item.match(/[^\x00-\xff]/ig) !== null) {
							valLen += 2
						} else {
							valLen += 1
						}
					}
					if (valLen > 32) {
						callback(new Error('用户名不超过32位'))
					} 
				}
			};
			const validatePass = (rule, value, callback) => {
				let valLen = 0
				if(value.length < 0) {
					callback(new Error('密码不能小于0位'));
				} else {
					for (let i=0; i<value.length; i++) {
						let item = value.charAt(i)
						if (item.match(/[^\x00-\xff]/ig) !== null) {
							valLen += 2
						} else {
							valLen += 1
						}
					}
					if (valLen > 32) {
						callback(new Error('密码不超过32位'))
					} 
				}
			};
			return {
				loginForm: {
					username: '',
					password: '',
//					type: 'web'
				},
				loginRules: {
					username: [{required: true, trigger: 'blur', validator: validateUsername}],
					password: [{required: true, trigger: 'blur', validator: validatePass}]
				},
				loading: false,
				showDialog: false
			}
		},
		watch: {
			
		},
		methods: {
			handleLogin() {
//				this.$router.replace({path: '/index'})
				let self = this
				let nameLen = 0
				for (let i=0; i<self.loginForm.username.length; i++) {
					let item = self.loginForm.username.charAt(i)
					if (item.match(/[^\x00-\xff]/ig) !== null) {
						nameLen += 2
					} else {
						nameLen += 1
					}
				}
				if (self.loginForm.username == '' || self.loginForm.username == ' ' || self.loginForm.username == null) {
					self.$message({type: 'error', message: '用户名不能为空'})
					return false
				} else if (self.loginForm.password == '' || self.loginForm.password == ' ' || self.loginForm.password == null) {
					self.$message({type: 'error', message: '密码不能为空'})
					return false
				} else if (nameLen > 32) {
					self.$message({type: 'error', message: '用户名长度不能超过32位'})
					return false
				} else if (self.loginForm.password.length > 32) {
					self.$message({type: 'error', message: '密码长度不能超过32位'})
					return false
				}
				// 此处可以写登录请求的方法
				self.$router.replace({path: '/index'})
			},
			checkAccountName (accountVal) {
				let self = this
				let valLen = 0
				let inputLogin = self.$refs.loginAccount
				for (let i=0; i<accountVal.length; i++) {
					let item = accountVal.charAt(i)
					if (item.match(/[^\x00-\xff]/ig) !== null) {
						valLen += 2
					} else {
						valLen += 1
					}
				}
				if (valLen > 32) {
					self.loginForm.username = accountVal.substr(0, accountVal.length - 1)
					self.$message({type: 'error',message: '登录用户名不能超过32位长度'})
					inputLogin.blur()
				}
			}
		},
		created() {
			
		},
		destroyed() {
			
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/styles/mixin.scss";
	.tips {
		font-size: 14px;
	    color: #fff;
	    margin-bottom: 5px;
	}
	.loginContainer {
		@include relative;
	    /*height: 100vh;*/
	    /*background-color: #2d3a4b;*/
	    width: 100%;
	    height: 100%;
		background: url('../assets/bg-login.png') no-repeat center;
		background-size: cover;
	    
	    input:-webkit-autofill {
	      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
	      -webkit-text-fill-color: #fff !important;
	    }
	    input {
	    	background: transparent;
	      	border: 0px;
	      	-webkit-appearance: none;
	      	border-radius: 0px;
	      	padding: 12px 5px 12px 15px;
	      	color: #eeeeee;
	      	height: 47px;
	    }
	    .el-input {
	    	display: inline-block;
	      	height: 47px;
	      	width: 85%;
	    }
	    .svg-container {
	      	padding: 6px 5px 6px 15px;
	      	color: #889aa4;
	    }
	    .title {
	      	font-size: 26px;
	     	font-weight: normal;
	      	color: #eeeeee;
	      	margin: 0px auto 40px auto;
	      	text-align: center;
	      	font-weight: bold;
	    }
	    .login-form {
	      	position: absolute;
	      	top: calc(50% - 250px);
	      	left: calc(50% - 200px);
	      	width: 400px;
	      	padding: 35px 35px 15px 35px;
	     	/*margin: 120px auto;*/
	    }
	    .el-form-item {
	      	border: 1px solid rgb(3, 130, 227);
	      	background: rgba(0, 0, 0, 0.1);
	      	border-radius: 5px;
	      	color: #454545;
	    }
	    .forget-pwd {
	      	color: #fff;
	    }
	    .el-form-item__content {
	    	i{
	    		color: #0382e3;
	    	}
	    }
  	}
</style>