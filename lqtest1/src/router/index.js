import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@views/login/Login')
const Home = () => import('@views/home/Home')
const Users = () => import('@views/users/Users')
const Roles = () => import('@views/roles/Roles')
const Rights = () => import('@views/rights/Rights')


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home,
      redirect:'/users',
      children:[
        {
          path:'/users',
          component:Users
        },
        {
          path:'/roles',
          component:Roles
        },
        {
          path:'/rights',
          component:Rights
        }
      ]
    },


]



const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if(to.path !=='/login'){
    if(token){
      next()
    }else{
      next('/login')
    }
  }
  next()
} )

export default router
