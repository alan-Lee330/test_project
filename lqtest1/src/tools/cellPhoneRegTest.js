// 手机正则验证
export const regMobile = (rule, value, callback) => {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(value)) return callback(new Error('请输入正确的手机号'))
    callback()
}