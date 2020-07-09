<template>
    <div>
        <breadcrumb :itemsMenu="['首页','用户管理','用户列表']"></breadcrumb>

        <el-card>
            <el-row :gutter='20'>
                <el-col :span="8">
                    <el-input v-model="usersParams.query" placeholder="请输入内容" clearable @clear="clearSearch">
                        <el-button slot="append" icon="el-icon-search" @click="userListSearch"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addUser">添加用户</el-button>
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
                        <el-switch @change="statusChange(statusInfo.row)"
                                v-model="statusInfo.row.mg_state"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="操作" width="200px">
                    <template slot-scope="operateInfo">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
                            <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="editUserInfo(operateInfo.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger"  size="mini" icon="el-icon-delete" circle @click="delUserInfo(operateInfo.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
                            <el-button type="warning" size="mini" icon="el-icon-setting" circle @click="allotRights(operateInfo.row)"></el-button>
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

        <add-or-edit-dialog ref="addNewUser" :userInfo="userInfo" @refreshPage="refreshPage"></add-or-edit-dialog>
        <allot-rights ref="allotRights" :allotUserInfo="allotUserInfo" :allotRoleList="allotRoleList" @refreshPage="refreshPage"></allot-rights>

    </div>

</template>

<script>
    import Breadcrumb from '@components/Breadcrumb'
    import {reqUserList,reqChangeStatus,reqDelUserInfo,reqAllotRights} from "@network/api";
    import AddOrEditDialog from "./childcom/AddOrEditDialog";
    import AllotRights from "./childcom/AllotRights";

    export default {
        name: "Users",
        components:{
            Breadcrumb,
            AddOrEditDialog,
            AllotRights
        },
        data(){
            return{
                // 表格数据
                usersData: [],
                usersParams:{
                    query:'', //搜索关键字
                    pagenum:1,
                    pagesize:2
                },
                total:0,
                userInfo:{},
                allotUserInfo:{},
                allotRoleList:[] //角色列表信息
            }
        },
        created() {
            this.getUserList()
        },
        methods:{
            // 获取用户列表
            async getUserList(){
                const result = await reqUserList(this.usersParams)
                // console.log(result)
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

            userListSearch(){
                this.usersParams.pagenum = 1
                this.getUserList()
            },

            clearSearch(){
                this.getUserList()
            },

            async statusChange(userInfo){
                const {id,mg_state} = userInfo
                const result = await reqChangeStatus(id,mg_state)
                if(result.meta.status !== 200) return this.$message.error('设置状态失败');
                this.$message.success('设置状态成功')
            },

            addUser(){
                this.userInfo = {}
                this.$refs.addNewUser.dialogVisible = true
            },

            editUserInfo(userInfo){
                this.$refs.addNewUser.dialogVisible = true
                this.userInfo = userInfo
            },
            delUserInfo(id){

                this.$confirm('确定要删除该用户信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await reqDelUserInfo(id)
                    if(result.meta.status !== 200) return this.$message.error('删除失败')
                    this.$message.success('删除成功')
                    this.getUserList()
                    // this.usersParams.pagenum = 1
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async allotRights(userinfo){

                this.$refs.allotRights.dialogVisible = true
                this.allotUserInfo =userinfo
                const result = await reqAllotRights()
                if(result.meta.status !== 200) return this.$message.error('获取角色列表失败')
                this.allotRoleList = result.data
            },

            //添加用户后刷新页面
            refreshPage(){
                this.getUserList()
            }
        }
    }
</script>

<style scoped>

</style>