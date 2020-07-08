import {request} from "./request";

// 登录请求
export const reqLogin = ({username,password}) =>request({
        url:'login',
        method:'post',
        data:{username,password}
    })


// 左侧侧边栏数据请求
//     ,headers:{Authorization : sessionStorage.getItem('token')}
export const reqAsideMenu = () => request({url:'menus',method:'get'})

// 用户管理数据请求，获取用户列表数据
export const reqUserList = (params) => request({url:'users',method:'get',params})

// 用户状态改变请求数据
export const reqChangeStatus = (uId,type) => request({url:`users/${uId}/state/${type}`,method:'put'})