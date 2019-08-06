<template>
    <span>
        <span>
          <!--<span class="label">{{ params.node.label }}</span>-->
          <span class="label">{{ params.data.label }}</span>
          <el-tag v-if="params.data.id" type="primary">{{ params.data.id }}</el-tag>
        </span>
        <!--
        	<div class="node">
          <span class="label">{{ params.node.label }}</span>
          <el-tag v-if="params.data.id" type="primary">{{ params.data.id }}</el-tag>
        </div>
        -->
        
        <el-dropdown class="dropdown" @click="onHandleCommand">
            <el-button type="primary" size="mini">
                <i class="el-icon-setting el-icon--left"></i>
                    管理该组织
            </el-button>
            <el-dropdown-menu class="dropdown-menu" slot="dropdown">
                <!--<el-dropdown-item command="addUser">
                    <a class="dropdown-btn" @click="onHandleCommand('addUser')">
                        <i class="icon fa fa-user-plus"></i>
                        <span>添加组织成员</span>
                    </a>
                </el-dropdown-item>-->
                <el-dropdown-item command="addSub">
                    <a class="dropdown-btn" @click="onHandleCommand('addSub')">
                        <i class="el-icon-plus"></i>
                        <span>新增下级组织</span>
                    </a>
                </el-dropdown-item>
                <el-dropdown-item command="update">
                    <a class="dropdown-btn" @click="onHandleCommand('update')">
                        <i class="el-icon-edit"></i>
                        <span>修改组织信息</span>
                    </a>
                </el-dropdown-item>
                <el-dropdown-item command="delete">
                    <a class="dropdown-btn" @click="onHandleCommand('delete')">
                        <i class="icon el-icon-delete"></i>
                        <span>删除组织</span>
                    </a>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </span>
</template>

<script>
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
    export default {
        components: {ElButton},
        name: 'rendernode',
        props: {
            params: {
                type: Object,
                required: true
            },
            menuItemClick: {
                type: Function,
                default: null
            }
        },
        created () {
//      	console.log('打印数据', this.params)
        },
        methods: {
            onHandleCommand(command) {
                this.menuItemClick(command, this.params);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
	.label {
        margin-right: 20px
    }

    .dropdown {
        float: right;
        margin-right: 20px;
        position: absolute !important;
        right: 0px;
        .title {
            background-color: #13ce66;
        }
    }

    .dropdown-menu {
        position: absolute;
        right: 0;
        top: 100%;
        width: 150px;
        border-radius: 5px;
        .dropdown-list {
            padding: 0;
            line-height: normal;
        }
        .dropdown-btn {
            display: block;
            font-size: 13px;
            text-align: left;
            cursor: pointer;
            .icon {
                margin-right: 5px;
            }
        }
    }
	
	/*.treeNode{
		width: 100%;
		padding-left: 10px ;
		
		.node {
			float: left;
			
			.label {
		        margin-right: 20px
		    }
		}
		
	    .dropdown {
	        float: right;
	        margin-right: 20px;
	        position: relative;
	        
	        .title {
	            background-color: #13ce66;
	        }
	    }
	    
	    .dropdown-menu {
            position: absolute;
            right: 0;
            top: 100%;
            width: 130px;
            border-radius: 5px;
            
            .dropdown-list {
                padding: 0;
                line-height: normal;
            }
            .dropdown-btn {
                display: block;
                font-size: 13px;
                text-align: left;
                cursor: pointer;
                
                .icon {
                    margin-right: 5px;
                }
            }
        }
	}*/
	
    
</style>
