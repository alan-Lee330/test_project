<template>
    <div>
        <breadcrumb :itemsMenu="['首页','用户管理','用户列表']"></breadcrumb>

        <el-card>
            <el-row :gutter='20'>
                <el-col :span="8">
                    <el-input>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table :data="usersData" style="width: 100%" border>
                <el-table-column label="" type="index"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column prop="mg_state" label="状态">
                    <template slot-scope="statusInfo">
                        <el-switch>
                                v-model="statusInfo.row.mg_state"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="操作" width="200px">
                    <template slot-scope="operateInfo">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger"  size="mini" icon="el-icon-delete" circle></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
                            <el-button type="warning" size="mini" icon="el-icon-setting" circle></el-button>
                        </el-tooltip>



                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="usersParams.pagenum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>

    </div>

</template>

<script>
    import Breadcrumb from '@components/Breadcrumb'
    import {reqUserList} from "@network/api";

    export default {
        name: "Users",
        components:{
            Breadcrumb
        },
        data(){
            return{
                // 表格数据
                usersData: [],
                usersParams:{
                    query:'',
                    pagenum:1,
                    pagesize:2
                },
                total:0

            }
        },
        created() {
            this.getUserList()
        },
        methods:{
            // 获取用户列表
            async getUserList(){
                const result = await reqUserList(this.usersParams)
                console.log(result)
                // 请求不成功
                if(result.meta.status !== 200){return this.$message.error('获取用户列表失败')}
                    const {users,total} = result.data
                    this.usersData = users
                    this.total = total

            },

            handleSizeChange(size){
                this.usersParams.pagesize = size
                this.getUserList()
            },
            handleCurrentChange(page){
                this.usersParams.pagenum = page
                this.getUserList()
            },
        }
    }
</script>

<style scoped>

</style>