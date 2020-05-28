import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// console.log(JSONBig.parse('{"id": 1245953273786007552}').id.toString())
// console.log(JSON.parse('{"id": 1245953273786007552}'))
// 通过 JSONBig.stringify 也会让 id 保留是数字的形式

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 自定义后端返回的原始数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      // 可能后端返回的不是 JSON 格式的字符串
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  // 还没有发出去的请求出错了，会触发这里
  return Promise.reject(error)
})

export default request
