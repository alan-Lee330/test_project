<template>
    <el-container>
        <el-header>
            <div class="logo">
                <img src="@assets/img/logo.png" alt="">
                <h1>电商后台管理系统</h1>
            </div>
            <el-button type="info" @click="logOut">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="asideMenuFlag ? '64px' : '200px'">
                <div class="menu-flex" @click = 'menuFlexClick'>| | |</div>
                <el-menu
                 background-color="#333744" text-color="#ffffff" unique-opened :collapse="asideMenuFlag"
                 :collapse-transition="false" router :default-active="activePath">

                    <el-submenu v-for ='item in asideMenu'  :key="item.id" :index="item.id + ''">
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                            <el-menu-item v-for ='citem in item.children' :key="citem.id" :index="'/' + citem.path">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>{{citem.authName}}</span>
                                </template>
                            </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {reqAsideMenu} from '@network/api'

    export default {
        name: "Home",
        data(){
            return {
                asideMenu:[],
                icons:{
                    '125':'iconfont icon-user',
                    '103':'iconfont icon-tijikongjian',
                    '101':'iconfont icon-shangpin',
                    '102':'iconfont icon-danju',
                    '145':'iconfont icon-baobiao',
                },
                asideMenuFlag:false
            }
        },
        created() {
            this.getAsideMenu()

        },
        methods:{
            // 请求侧边栏数据
            //  getAsideMenu() {
            //   reqAsideMenu().then(data =>{
            //       console.log(data)
            //   })
            // },
            async getAsideMenu(){
                const result = await reqAsideMenu()
                // console.log(result)
                if(result.meta.status !== 200){
                    return this.$message.error('获取信息失败')
                }
                this.asideMenu = result.data
            },
            // 退出
            logOut(){
                this.$confirm('您确定要退出本次登录吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push('/login')
                    sessionStorage.clear()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出登录'
                    });
                });

            },
            menuFlexClick(){
                this.asideMenuFlag = !this.asideMenuFlag
            }
        },
        computed:{
            // 设置激活默认展示项以及点击后展示项的路由的展示
            // 包含孙子路由
            activePath(){
                    const childs = []
                    this.asideMenu.forEach(item => {
                        item.children.forEach(cItem => {
                            childs.push("/"+cItem.path)
                        })
                    })
                    const cItem = childs.find(item => {
                        return this.$route.path.indexOf(item) >= 0
                    })
                    return cItem

                // 不包含孙子路由
                // return this.$route.path

            }
        }
    }
</script>

<style scoped lang="less">
  .el-container{
      height: 100%;
  }
  .el-header{
      background: #373d41;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo{
          width: 300px;
          height: 55px;
          display: flex;
          align-items: center;
          img{
              width: 55px;
          }
          h1{
              font-size: 20px;
              color: #ffffff;
              margin-left: 20px;
          }
      }
}
  .el-aside{
      background: #333744;
      height: 100%;
      .menu-flex{
          background: #4a5064;
          text-align: center;
          color: #ffffff;
          font-size: 12px;
          line-height: 24px;
          cursor: pointer;
      }
      .el-menu{
          border-right: none;
      }
  }
  .el-main{
      background: #eaedf1;
      height: 100%;
  }
    .iconfont{
        margin-right: 10px;
    }
</style>