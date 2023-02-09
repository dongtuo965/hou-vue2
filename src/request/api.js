import request from './request.js';
// get请求不传参时
export const getshebei = () => request.get('/scoreList')
// export const getshebei = () => request.get('/shebei')

// get请求传参时
// export const GetsearchData = (params) => request.get('/list',{params})
// post请求
// export const logininfoInterFace = () => request.post('/users/login?username=zhangsanabc&password=aaa111')
export const logininfoInterFace = (params) => request.post('/admin/login',params)
// export const checkcity = (params) => request.post('/list', params)

// 上传的接口
export const uploadFiles = (params) => request.post('/api/modulation/assistant/investigation/feedBack', params )


// getuserinfo().then(res=>{
//     console.log(res)
// }).catch(err=>{
//     console.log(err)
// })

