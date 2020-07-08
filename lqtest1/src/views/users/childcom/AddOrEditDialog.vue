<template>
    <div>
        <el-dialog
                :title="userInfo.id || userInfo.username ? '修改用户' : '添加用户'"
                :visible="dialogVisible"
                width="50%"
                :before-close="handleClose">

            <el-form ref="userform" :model="userform" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userform.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userform.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userform.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="userform.mobile"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {regMobile} from '@tools/cellPhoneRegTest'


    export default {
        name: "AddOrEditDialog", //控制添加用户对话框显示隐藏
        props:{
            userInfo:{
                type: Object,
                default(){
                    return {}
                }

            }
        },
        data(){
            return {
                dialogVisible:false,
                userform:{
                    username:'',
                    password:'',
                    email:'',
                    mobile:'',
                },
                rules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    email:[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    mobile:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator: regMobile,trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handleClose(){
                this.$refs.userform.resetFields()
                this.dialogVisible = false
            },
            closeDialog(){
                this.$refs.userform.resetFields()
                this.dialogVisible = false
            }
        }
    }
</script>

<style scoped>

</style>