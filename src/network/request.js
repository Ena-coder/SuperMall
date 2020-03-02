import axios from 'axios'

// 方法1：传入一个succes函数，failure函数
export function request(config){
  // 1.创建axioss实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    // baseURL:'http://123.207.32.32:8000/api/v2',
    // baseURL = "http://106.54.54.237:8000/api/v1",
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