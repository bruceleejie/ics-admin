<template>
	<div class="addressContainer">
		<el-row class="panel-title">
			<div class="fr">
				<el-button type="primary" size="small" @click="openAddParameter" icon="el-icon-plus">添加地址信息</el-button>
			</div>
		</el-row>
		<div class="parameterTable">
			<el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" style="width: 100%; margin-top: 10px;" stripe border>
				<el-table-column label="序号" type="index" width="50"></el-table-column>
				<!--<el-table-column prop="id" label="地址id" width="100"></el-table-column>-->
				<el-table-column prop="name" label="地名" width="150"></el-table-column>
				<el-table-column prop="address" label="地址详细信息" min-width="250"></el-table-column>
				<el-table-column prop="longitude" label="经度" width="200"></el-table-column>
				<el-table-column prop="latitude" label="纬度" width="200"></el-table-column>
				<el-table-column prop="enable" label="是否可用" width="90">
					<template slot-scope="scope">
						<!--<el-button type="success" plain size="mini" @click="changeEnable(scope.row)" v-show="scope.row.enable == 1 ? true : false">已启用</el-button>
						<el-button type="danger" plain size="mini" style="margin-left: 0px;"
							@click="changeEnable(scope.row)" v-show="scope.row.enable == 0 ? true : false">已禁用</el-button>-->
	                    <a href="javascript:;" @click="changeEnable(scope.row)" v-show="scope.row.enable == 1 ? true : false" style="color: #13ce66;">已启用</a>
	                    <a href="javascript:;" @click="changeEnable(scope.row)" v-show="scope.row.enable == 0 ? true : false" style="color: #ff4949;">已禁用</a>
	            	</template>
				</el-table-column>
				<el-table-column label="操作" width="185">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" @click="openUpdate(scope.row)" size="mini" plain>修改</el-button>
						<el-button type="danger" icon="el-icon-delete" @click="startDelete(scope.row.id)" size="mini" plain>删除</el-button> 
					</template>
				</el-table-column>
			</el-table>
			<div class="bottom-toolbar">
	            <div class="fr">
	                <el-pagination
	                	background
	                	@size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
	                </el-pagination>
	            </div>
	        </div>
		</div>
		<!-- 新增地址信息 -->
		<div class="add-parameter-dialog">
			<el-dialog title="添加地址" :visible.sync="dialogAddFormVisible">
				<el-form :model="addForm" :rules="addAddressRules">
					<el-form-item label="地址名称" :label-width="formLabelWidth">
						<el-input v-model="addForm.name" auto-complete="off" placeholder="请输入参数名"></el-input>
					</el-form-item>
					<el-row :gutter="10">
						<el-col :span="19">
							<el-form-item label="地址详细信息" :label-width="formLabelWidth">
								<el-input v-model="addForm.locate" placeholder="请从地图上点选用户地址" :disabled="true" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-button @click="initMap">打开地图选择地址</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item label="经度" :label-width="formLabelWidth" >
								<el-input v-model="addForm.longitude" placeholder="请选择经度" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="纬度" :label-width="formLabelWidth" >
								<el-input v-model="addForm.latitude" placeholder="请选择纬度" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="地址状态" :label-width="formLabelWidth">
					   <el-select v-model="addForm.enable" placeholder="请选择地址是否可用">
					      	<el-option v-for="item in enableType" :key="item.value" :label="item.label" :value="item.value">
	                    		<span style="float: left">{{ item.label }}</span>
	                    		<!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
	                    	</el-option>
					    </el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addAddressSubmit" :loading="btnloading">提 交</el-button>
					<el-button @click="dialogAddFormVisible = false">取 消</el-button>
				</div>
			</el-dialog>
		</div>
		<!-- 添加地址的地图 -->
		<el-dialog title="用户选择地址" :visible.sync="dialogBMapVisible" width="80%">
			<MapContain v-on:userLocation="userLocation"></MapContain>
		</el-dialog>
		<!-- 修改地址信息 -->
		<div class="add-parameter-dialog">
			<el-dialog title="修改地址" :visible.sync="dialogUpdateFormVisible">
				<el-form :model="updateForm" :rules="addAddressRules">
					<!--<el-form-item label="参数id" :label-width="formLabelWidth" placeholder="请输入">
						<el-input v-model="updateForm.id" auto-complete="off" readonly></el-input>
					</el-form-item>-->
					<el-form-item label="参数名称" :label-width="formLabelWidth" prop="name">
						<el-input v-model="updateForm.name" auto-complete="off" placeholder="请输入参数名"></el-input>
					</el-form-item>
					<el-row :gutter="10">
						<el-col :span="19">
							<el-form-item label="地址详细信息" :label-width="formLabelWidth">
								<el-input v-model="updateForm.locate" placeholder="请从地图上点选用户地址" :disabled="true" ></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-button @click="initMap">打开地图选择地址</el-button>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item label="经度" :label-width="formLabelWidth" >
								<el-input v-model="updateForm.longitude" placeholder="请选择经度" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="纬度" :label-width="formLabelWidth" >
								<el-input v-model="updateForm.latitude" placeholder="请选择纬度" :disabled="true"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="地址状态" :label-width="formLabelWidth" prop="modify">
						<el-select v-model="updateForm.enable" placeholder="请选择地址是否可用">
					      	<el-option v-for="item in enableType" :key="item.value" :label="item.label" :value="item.value">
	                    		<span style="float: left">{{ item.label }}</span>
	                    		<!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
	                    	</el-option>
					    </el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="updateFormeter" :loading="btnloading">提 交</el-button>
					<el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
				</div>
			</el-dialog>
		</div>
				

	</div>
</template>

<script>
	import MapContain from '@/components/MapContain'
	
	export default {
		name: 'szaddress',
		components: {
			MapContain
		},
		data() {
			return {
				input: '',
				currentPage: 1, // 当前页码
                total: 0, // 数据总条目
                length: 10, // 每页默认显示10条数据
				loading: true,
				tableData: [{
		            id: 0, // 地址id
		            name: '', // 地址名
		            address: '', // 地点详细地址
		            longitude: 1, // 地址经度
		            latitude: 1, // 地址纬度
		            enable: 0, // 地址是否可用
		        }],
		        dialogAddFormVisible: false,
			    dialogUpdateFormVisible: false,
			    dialogBMapVisible: false, // 地图组件显示
			    addForm: {
			    	name: '', // 地址名称
		            locate: '', // 地点详细地址
		            longitude: 1, // 地址经度
		            latitude: 1, // 地址纬度
		            enable: 0, // 地址是否可用
			    },
			    updateForm: {
			      	id: 0, // 地址id
			      	name: '', // 地址名称
		            locate: '', // 地点详细地址
		            longitude: 1, // 地址经度
		            latitude: 1, // 地址纬度
		            enable: 0, // 地址是否可用
			    },
			    enableType: [
			    	{value: 1, label: '可用'},
					{value: 0, label: '不可用'}
				],
			    addAddressRules: {
                    name: [
                        {required: true, message: '请输入地址名称', trigger: 'blur'}
                    ],
                    locate: [
                        {required: true, message: '请输入地址详细信息', trigger: 'blur'}
                    ],
                    longitude: [
                        {required: true, message: '请输入地址经度', trigger: 'blur'}
                    ],
                    latitude: [
                        {required: true, message: '请输入地址纬度', trigger: 'blur'}
                    ],
                    modify: [
                        {required: true, message: '请选择地址状态', trigger: 'blur'}
                    ],
                },
                btnloading: false,
			    formLabelWidth: '120px'
			}
		},
		computed: {
			
		},
		mounted () {
		},
		created() {
			let self = this
			self.getData()
		},
		methods: {
		  	//获取数据
			getData() {
				let self = this
				self.tableData = []
				self.loading = true
				self.getSzAddress()
			},

			// 开启修改弹框
			openUpdate(obj){
				let self = this
				self.updateForm = {
					id: obj.id,
					name: obj.name,
					locate: obj.address,
					longitude: obj.longitude,
					latitude: obj.latitude,
					enable: obj.enable
				}
				self.dialogUpdateFormVisible = true
			},
			// 修改系统参数
			updateFormeter() {
				let self = this
				if (self.updateForm.name == null || self.updateForm.name == '' || self.updateForm.name == ' ') {
					self.$message({type: 'error',message: '地址名称不能为空'})
					return false
				} else if (self.updateForm.locate == null || self.updateForm.locate == '' || self.updateForm.locate == ' ') {
					self.$message({type: 'error',message: '地址详细信息不能为空'})
					return false
				} else if (self.updateForm.enable == undefined) {
					self.$message({type: 'error',message: '请选择地址是否可用'})
					return false
				} 
				self.btnloading = true
				self.btnloading = false
				self.dialogUpdateFormVisible = false
				self.$message({type: 'info',message: '暂不支持修改操作'})
			},
			
			// 开启新增弹框
			openAddParameter() {
				let self = this
				self.addForm = {
					name: null,
					locate: null,
					longitude: null,
					latitude: null,
					enable: 1
				}
				self.dialogAddFormVisible = true
			},
			// 添加参数配置
			addAddressSubmit() {
				let self = this
				if (self.addForm.name == null || self.addForm.name == '' || self.addForm.name == ' ') {
					self.$message({type: 'error',message: '地址名称不能为空'})
					return false
				} else if (self.addForm.locate == null || self.addForm.locate == '' || self.addForm.locate == ' ') {
					self.$message({type: 'error',message: '地址经纬度不能为空'})
					return false
				} else if (self.addForm.enable == undefined) {
					self.$message({type: 'error',message: '请选择地址是否可用'})
					return false
				}
				self.btnloading = true
				// 这里可以写提交请求的方法
				console.log('新增的数据是：', self.addForm)
				self.btnloading = false
				self.dialogAddFormVisible = false
			},
			// 打开地图弹框
		  	initMap(){
				this.dialogBMapVisible = true
			},
			userLocation: function (data) {
				console.log('我这里打印子组件的值', data)
				if (data.address == null) {
					this.dialogBMapVisible = data.dialogShow
				} else {
					this.dialogBMapVisible = data.dialogShow
					this.addForm.locate = data.address
					this.addForm.longitude = data.longitude
					this.addForm.latitude = data.latitude
				}
			},
			// 开启删除提示框
			startDelete (id) {
				let self = this;
                self.$confirm('请确认是否删除此系统配置?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.deleteAddress(id)
                }).catch((err) => {
                	console.log(err)
                });
			},
			// 删除系统配置
			deleteAddress(id) {
				let self = this
				// 传入删除项的id，提交后台，即可删除
				console.log('删除项id是：', id)
				self.$message({type: 'info',message: '暂不支持删除操作'})
		  	},
			// 查询系统参数
			getSzAddress () {
				let self = this
				self.tableData  = []
				self.$ajax.get('/api/buildings').then((res) => {
					if (res.data.errno == 0) {
						self.tableData = res.data.data
						self.loading = false
					} else {
						
					}
				}).catch((err) => {
					
				})
			},
			changeEnable (obj) {
				let self = this
				console.log('修改的数据是：', obj)
			},
			//页码选择
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log('this.currentPage ', this.currentPage);
                this.getData()
            },
            // 每页数量选择
            handleSizeChange(val) {
            	this.length = val;
                console.log('this.length ', this.length);
                this.getData()
            },
		}
	
	}
</script>

<style rel="stylesheet/scss" lang='scss' >

	.addressContainer{
		min-height: 100%;
		background: #FFFFFF;
		padding: 10px;
		
		.fl {
	        float: left;
	    }
	
	    .fr {
	        float: right;
	    }

		
		.panel-title {
	        height: 45px;
	        line-height: 45px;
	        width: 100%;
	        
	        .panel_title_select {
	            display: inline-block;
	            
	            .el-input__inner {
	                height: 28px;
	            }
	        }
	    }
		
		.el-form{
    		.el-select{
    			width: 100%;
    		}
    	}
    	
    	.el-table {
    		
    		.el-table__header-wrapper {
				line-height: 50px;
			}
    		th {
    			text-align: center;
    			padding: 0px;
	    		color: #000000 !important;
				background: #E4E4E4 !important;
			}
    	}
    	
    	.add-parameter-dialog {
    		z-index: 20;
    		
		  	.el-dialog {
			  	width: 60%;
			  	/*background: #e4e4e4;*/
			  	.el-dialog__header {
				  	line-height: 30px;
			    	padding-top: 35px;
				}
			}
			.dialog-footer{
				padding-top: 0;
				line-height: 50px;
			}
		}
		.bottom-toolbar {
    		/*margin-top: 15px;*/
		    padding: 15px 0;
		    overflow: hidden;
    	}
		.parameterTable{
			width: 100%;
		}
	}
</style>