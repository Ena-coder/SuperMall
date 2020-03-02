import axios from 'axios'
import mock from "@/mock/mock.js";
// 封装axios的post请求
export function fetch(config) {
  // 1.创建axioss实例
  const instance = axios.create({
    timeout:5000
  })
  // 2.axios的拦截器——被拦截者.interceptors
  // 拦截实例
  instance.interceptors.request.use(//请求拦截(实际就是拦截config)
  config => {
      return config
    },err => {
      console.log(err);
    }
  )
  instance.interceptors.response.use(//响应拦截
    res => {//成功拦截结果
      return res.data
    },err => {//失败拦截结果
      console.log(err);
    }
  )
  // 3.发送真正的网络请求
  return instance(config)
}











// // 请求拦截器
// axios.interceptors.request.use(function(config) {
//   return config;
// }, function(error) {
//   return Promise.reject(error);
// })
// // 响应拦截器
// axios.interceptors.response.use(function(response) {
// return response;
// }, function(error) {
// return Promise.reject(error);
// })

// // 封装axios的post请求
// export function fetch(url, params) {
// return new Promise((resolve, reject) => {
//   axios.post(url, params)
//     .then(response => {
//       resolve(response.data);
//     })
//     .catch((error) => {
//       reject(error);
//     })
// })
// }

// export default {
// get_news(url, params) {
//   return fetch(url, params);
// }
// }



















