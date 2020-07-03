import axios from 'axios'
export const request = (config) => {
    const ins = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:2000
    })
    ins.interceptors.response.use(response =>{
        return response.data
    })
    ins.interceptors.response.use(config =>{
        return config
    })
    return ins(config)

}