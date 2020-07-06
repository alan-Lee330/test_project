import {request} from "./request";

// 登录请求
export const reqLogin = ({username,password}) =>request({
        url:'login',
        method:'post',
        data:{username,password}
    })


// 左侧侧边栏数据请求
//     ,headers:{Authorization : sessionStorage.getItem('token')}
export  const reqAsideMenu = () => request({url:'menus',method:'get'})