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

// 添加新用户
export const reqAddUser = (userInfo) => request({url:'users',method:'post',data:userInfo})

// 编辑用户信息
export const reqEditUser = (id,email,mobile) => request({url:`users/${id}`,method:'put',data:{email,mobile}})

// 删除用户列表当前项请求
export  const reqDelUserInfo = (id) => request({url:`users/${id}`,method:'delete',})

// 用户权限分配请求
export  const reqAllotRights = () => request({url:'roles',method:'get',})

// 选中分配用户角色
export  const  reqUesrRole = (id,rid) => request({url:`users/${id}/role`,method:'put',data:{rid}})