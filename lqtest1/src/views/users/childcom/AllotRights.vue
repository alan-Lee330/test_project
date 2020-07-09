<template>
    <div>
        <el-dialog
                title="分配角色"
                :visible="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <p>
                当前用户：{{allotUserInfo.username}}
            </p>
            <br>
            <p>
                当前角色：{{allotUserInfo.role_name}}
            </p>
            <br>

                分配新角色：<el-select v-model="seletValue" placeholder="请选择">
                <el-option
                    v-for="item in allotRoleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
            </el-option>
            </el-select>

            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="allotRole()">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {reqUesrRole} from '@network/api'

    export default {
        name: "AllotRights",
        data(){
            return {
                dialogVisible:false,
                seletValue:'' //选中的Id项
            }
        },
        props:{
            allotUserInfo:{
                type:Object,
                default() {
                    return {}
                }
            },
            allotRoleList:{
                type:Array,
                default() {
                    return []
                }
            }
        },
        methods:{
            handleClose(){
                this.dialogVisible = false
                this.seletValue = ''
            },
            async allotRole(){
                if(!this.seletValue) return this.dialogVisible = false
               const id = this.allotUserInfo.id
               // const id =1;
                const rid = this.seletValue
             //   console.log(id,rid)
                const result = await reqUesrRole(id,rid)
                if(result.meta.status !== 200) return this.$message.error('分配角色失败')
                this.dialogVisible = false
                this.$message.success('角色分配成功')
                this.$emit('refreshPage')

                // 选中发请求

            },
            // allotRole(){
            //     console.log('test');
            // }
        }
    }
</script>

<style scoped>

</style>