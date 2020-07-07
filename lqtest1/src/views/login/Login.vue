<template>
    <div class="login-box">

        <div class="login">

            <div class="imge-box">
                <img src="@assets/img/logo.png">
            </div>


            <el-form ref="form" :rules="rules" :model="login_form">

                <el-form-item prop="username">
                    <el-input v-model="login_form.username">
                        <i slot="prefix" class="iconfont icon-user" ></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="login_form.password"  type="password">
                        <i slot="prefix" class="iconfont icon-3702mima"></i>
                    </el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click ="loginClick">登录</el-button>
                    <el-button type="info"  @click ="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {reqLogin} from '@network/api'

    export default {
        name: "Login",
        data(){
            return {

                // 表单input框的验证规则
                rules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },

                // 收集input框的数据
                login_form:{
                    username:'admin',
                    password:'123456'
                }
            }
        },
        methods:{
            // 登录的点击事件,验证整个表单
            loginClick(){
                this.$refs.form.validate(async valid =>{
                    if(!valid){
                        return
                    }
                    // 发送登录请求
                    const result = await reqLogin(this.login_form)
                    const{status,msg} = result.meta
                    if(status !==200){
                        // 登陆失败
                       return  this.$message.error({
                           message:msg,
                           duration:1000
                       });
                    }
                    // if(result.meta.status !==200){
                    //     this.$message.error(result.meta.msg);
                    // }

                    // 登录成功
                    // 保存token
                    const {token} = result.data
                    sessionStorage.setItem('token',token)

                    //跳转页面
                    this.$router.replace('/home')
                })






            },
            // 点击重置form表单按钮
            resetForm(){
                this.$refs.form.resetFields()

            },
        }
    }
</script>

<style scoped lang="less">
.login-box{
    width: 100%;
    height: 100%;
    background: #2b4b6b;
    display: flex;
    align-items: center;
    justify-content: center;
    .login{
        width: 450px;
        height: 300px;
        background: #ffffff;
        position: absolute;
        border-radius: 5px;
        .imge-box{
            width: 152px;
            height: 152px;
            background: white;
            /*border: 10px solid #fff;*/
            border-radius: 50%;
            position: absolute;
            left:50%;
            transform: translate(-50%,-50%);
            box-shadow: 0 0 10px #dddddd;
            padding: 10px;
            img{
                width: 100%;
                height: 100%;
                background: #eee;
                border-radius: 50%;
            }
        }
        .el-form{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 20px;
            .btns{
                text-align: right;
            }
        }
    }
}
</style>