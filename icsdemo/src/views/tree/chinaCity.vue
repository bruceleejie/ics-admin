<template>
	<div class="orgContainer">
		<div class="panel-title">
            <div class="fl">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="width: 250px" maxlength="32"></el-input>
                <!--<el-button type="primary" @click=""></el-button>-->
            </div>
            <div class="fr">
            	<el-button type="primary" size="small" @click="openAddOrgDialog" icon="el-icon-plus">新增组织</el-button>
                <el-button type="primary" size="small" @click="openSortDeptDialog" icon="el-icon-sort">调整组织顺序</el-button>
            </div>
		</div>
        <el-tree ref="tree"
        	:data="data"
        	v-loading="loading" element-loading-text="拼命加载中" @node-click="handleNodeClick"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="true"
            :render-content="renderContent">
        </el-tree>
        
        <!-- 调整顺序 -->
		<el-dialog title="调整组织顺序" :visible.sync="sortDeptVisible" class="sortTable">
			<el-row class="panel-title">
				<div class="fl">
					父组织：
					<el-cascader 
						:options="orgSelectOptions" :props="props"
						v-model="sortSelectedOptions" placeholder="请选择要调整的组织"
						@change="handleOrgChange" class="orgSelectInput" size="medium"></el-cascader>
				</div>

			</el-row>
			<div class="sortContent">
				<div class="dataHeader">
					<span>序号</span>
					<span>组织名称</span>
					<span>组织状态</span>
				</div>
				<draggable v-model="sortData" group="department" class="dragBox"
					@start="drag=true" @end="drag=false" @change="changeItem">
		  			<div v-for="(element, index) in sortData" :key="element.id" class="drag-item">
		  				<span>{{ index+1 }}</span>
		  				<span>{{element.label}}</span>
		  				<span v-text="element.enable == 1 ? '可用' : '禁用'"></span>
		  			</div>
				</draggable>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="sortDeptSubmit" :loading="btnloading">提 交</el-button>
				<el-button @click="cancleSort">取 消</el-button>
			</div>
		</el-dialog>
		<!--新增组织-->
        <div class="add-org-dialog">
        <el-dialog title="新增组织" :visible.sync="addDepartmentVisible">
			<el-form :model="addDepartment" label-width="80px" ref="addDepartment">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addDepartment.name" auto-complete="off" placeholder="请输入组织名称" ref="deptName" @input="checkDeptName(addDepartment.name)"></el-input>
                </el-form-item>
                <el-form-item label="父组织" prop="pid">
                    <el-cascader 
						:options="orgSelectOptions" :props="props"
						v-model="addDepartment.parent" placeholder="请选择父组织"
						@change="handleChange" class="orgSelectInput" size="medium"></el-cascader>
                </el-form-item>
                <el-form-item label="是否可用" prop="enabled">
                	<el-select v-model="addDepartment.enable" placeholder="请选择是否可用">
                		<el-option v-for="item in enableType" :key="item.value" :label="item.label" :value="item.value">
                			<span style="float: left">{{ item.label }}</span>
                		</el-option>
                   	</el-select>
                </el-form-item>
            </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addOrgSubmit" :loading="btnloading">提 交</el-button>
				<el-button @click="addDepartmentVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		</div>
	</div>
</template>

<script>
	import RenderNode from './RenderNode'
	import draggable from 'vuedraggable'
	
	export default {
		name: 'chinaCity',
		components: {
			RenderNode,
			draggable
		},
		data() {
			return {
				loading: true,
                filterText: '',
                data: [],
                sortData: [], // 排序的data
                orgSelectOptions: [], // 级联选择选项
                sortSelectedOptions: [], // 级联选择已选项
                props: {
                	multiple: false,
                	checkStrictly: true
                },
                odata: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                addDepartment: {
                    name: '',
                    parent: [], // 父组织id
                    enable: 1
                },
                addDepartmentVisible: false, // 新增界面是否显示
                addSubDepartmentVisible: false, // 新增下级页面是否显示
                btnloading: false,
				orgList: [],
				orgPath: [], // 叶子节点路径
                sortDeptVisible: false,
				enableType: [
					{value: 1, label: '可用'},
					{value: 0, label: '不可用'}
				],
				deptNameFlag: true, // 名称合理性
			}
			
		},
		watch: {
            filterText(val) {
            	let self = this
            	console.log('输入的值是：',val)
            	let valLen = 0
            	for (let i=0; i<val.length; i++) {
					let item = val.charAt(i)
					if (item.match(/[^\x00-\xff]/ig) !== null) {
						valLen += 2
					} else {
						valLen += 1
					}
				}
				if (valLen > 32) {
					self.$message({type: 'error', message: '关键字不能超过32位'})
					return false
				} else {
					self.$refs.tree.filter(val)
				}
            }
        },
		computed: {
			
		},
        created () {
        	let that = this
        	that.getData()
        },
		methods: {
			//获取数据
            getData () {
            	let self = this
            	self.loading = true
            	self.searchOrgAll()
            	// 获取所有的组织数据信息（tree）
            },

			// 管理员查询所在组织和所有子组织并以树形显示
			// 同时得到组织list在新增子组织和修改组织时使用
			searchOrgAll() {
				let self = this
				self.data  = []
				self.$ajax.get('/api/china').then((res) => {
					if (res.data.errno == 0) {
						let treeData = {
							name: '父级',
							children: []
						}
						treeData.children = res.data.data
						self.data = treeData.children
						// 去掉树形数据中children为空的字段
						let $map = function(childs) {
							for (let i=0; i<childs.length; i++) {
								self.orgList.push(childs[i])
								let item = childs[i]
								item.value = item.id
								if (item.children.length == 0) {
									delete item.children
								} else {
									$map(item.children)
								}
							}
						}
						$map(treeData.children)
						self.orgSelectOptions = treeData.children
						self.loading = false
					} else {
						
					}
				}).catch((err) => {
					
				})
			},

            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },

            handleNodeClick (data) {
            	console.log('点击节点是：', data)
            },
            handleChange (value) {
            	console.log('当前节点是：', value)
            },
            // 改变父节点得到子组织信息
            handleOrgChange (value) {
            	let self = this
            	console.log('选择的节点是：', value, self.orgSelectOptions)
            	let deptId = value[value.length - 1]
            	console.log('最后一项的组织id是：', deptId, self.orgList)
            	self.sortData = []
            	for (let i=0; i<self.orgList.length; i++) {
            		if (deptId == self.orgList[i].pid) {
            			self.sortData.push(self.orgList[i])
            		}
            	}
            },
            // 拖动的节点
            changeItem (event) {
            	console.log(event)
            },
            // 提交修改组织顺序
            sortDeptSubmit () {
            	let self = this
            	self.btnloading = true
            	let pid = self.sortSelectedOptions[self.sortSelectedOptions.length - 1]
            	let subarr = []
            	for (let i=0; i<self.sortData.length; i++) {
            		subarr.push(self.sortData[i].id)
            	}
            	// 这里可以写排序请求的方法
            	console.log('排序后的data是：', subarr)
            	self.btnloading = false
            	self.$message({type: 'error',message: '排序成功'})
            	self.sortSelectedOptions = []
            	self.sortData = []
            	self.sortDeptVisible = false
            },
            // 取消修改组织顺序
            cancleSort () {
            	let self = this
				self.sortSelectedOptions = []
				self.sortData = []
				self.sortDeptVisible = false
            },
            // 打开组织调整顺序弹框
            openSortDeptDialog () {
            	let self = this
//          	let curDept = []
            	self.sortData = []
//          	curDept[0] = parseInt(sessionStorage.getItem('dept'))
//				console.log('组织：', sessionStorage.getItem('dept'), curDept)
//				self.sortSelectedOptions = curDept
//				console.log('备选信息是：', self.orgSelectOptions, self.orgList)
//				if (sessionStorage.getItem('dept') == self.orgSelectOptions[0].id) {
//					self.sortData = self.orgSelectOptions[0].children
//				}
				
                self.sortDeptVisible = true
            },
            // 新增组织
            openAddOrgDialog () {
            	this.addDepartment = {
					name: '',
                    parent: [],
                    enable: 1
				}
				this.addDepartmentVisible = true
            },
            addOrgSubmit () {
            	let self = this
            	console.log('新增数据是：', self.addDepartment)
            },

            handleAddUser(data) {
               
            },
            handleAddSubDepartment (data) {
            	let self = this
            	console.log('传过来的数据是：', data)
            	self.$message({type: 'info',message: '暂不支持新增子组织操作'})
            },
            handleUpdateDepartment (data) {
            	let self = this
            	console.log('传过来的数据是：', data)
            	self.$message({type: 'info',message: '暂不支持修改组织操作'})
            },

            onAddUserSubmit() {
                let that = this;
            },
            // 开启删除（组织）组织弹框
            handleDeleteDepartment(data) {
                let self = this;
				let id = data.id
                self.$confirm('请确认是否删除此组织?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.deleteOrg(id)
                }).catch((err) => {
                	console.log(err)
//                  self.$message({type: 'success', message: err})
                })
            },
            // 删除（组织）组织信息
			deleteOrg (id) {
				let self = this
				self.$message({type: 'info',message: '暂不支持删除操作'})
			},
			// 校验输入框长度
			checkDeptName (val) {
				let self = this
				let deptnameVal= self.$refs.deptName
				let valLen = 0
				if(val.length < 1) {
					self.$message({type: 'error',message: '组织名称不能为空'})
					return false
				} else {
					for (let i=0; i<val.length; i++) {
						let item = val.charAt(i)
						if (item.match(/[^\x00-\xff]/ig) !== null) {
							valLen += 2
						} else {
							valLen += 1
						}
					}
					if (valLen > 32) {
						self.deptNameFlag = false
						self.$message({type: 'error', message: '组织名称不得超过32个字符'})
						deptnameVal.blur()					
					} else {
						self.deptNameFlag = true
					}
				}
			},

            handleCommand(command, {node, data, store}) {

                if (command == 'addUser') {
//                  this.handleAddUser(data);
                } else if (command == 'addSub') {
                    this.handleAddSubDepartment(data);
                } else if (command == 'addAdmin') {

                } else if (command == 'update') {
                    this.handleUpdateDepartment(data);
                } else if (command == 'delete') {
                	console.log(data)
                    this.handleDeleteDepartment(data);
                }
            },

            renderContent(h, {node, data, store}) {
                return (<RenderNode menuItemClick = {this.handleCommand} params={{ node, data, store}} />);
            }
		}
	
	}
</script>

<style rel="stylesheet/scss" lang='scss'>
@import "@/styles/common.scss";

	.orgContainer {
		background: #fff;
	    min-height: 100%;
	    padding: 10px;
	    width: 100%;
	    
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
	    
	    .el-tree {
	    	width: 100%;
	    	margin-top: 10px;
	    	/*margin: 10px 20px;*/
	    	border: 1px solid #EFEFEF;
	    	
	    	.el-tree-node__content {
	    		padding: 20px 0px;
				width: 100% !important;
				height: 36px !important;
				line-height: 36px !important;
			}
	    }
	    .el-form{
    		.el-select{
    			width: 100%;
    		}
    		.el-form-item {
    			
				.el-form-item__content {
					
					.orgSelectInput {
						width: 100%;
						padding-left: 0px;
						height: 38px;
						
						input {
							height: 38px;
						}
					}
				}
			}
    	}
    	.sortTable {
    		.sortContent {
    			.dataHeader {
	    			span {
	    				
	    				&:nth-child(1) {
    						width: 20%;
    					}
    					&:nth-child(2) {
    						width: 40%;
    					}
    					&:nth-child(3) {
    						width: 40%;
    					}
	    			}
	    		}
	    		.dragBox {
	    			.drag-item {
	    				
	    				span {
	    					text-align: center;
	    					word-break: normal;
	    					white-space: pre-wrap;
	    					word-wrap: break-word;
	    					
	    					&:nth-child(1) {
	    						width: 20%;
	    					}
	    					&:nth-child(2) {
	    						width: 40%;
	    					}
	    					&:nth-child(3) {
	    						width: 40%;
	    					}
	    				}
	    			}
	    		}
    		}
    	}
    	.add-org-dialog {
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
    	
    	.el-dialog{
    		/*.el-dialog__header{
    			height: 54px;
    		}
    		.el-dialog__footer{
    			height: 70px;
    		}*/
    	}
    	
	    
	    .bottom-toolbar {
	        margin-top: 15px;
	        padding: 15px 0;
	        overflow: hidden;
	    }
	
	    .fl {
	        float: left;
	    }
	
	    .fr {
	        float: right;
	    }
	
	    
	}
</style>