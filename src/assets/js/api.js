import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'
import './util.js'
import util from "./util";

// 请求地址
const baseURL = '';
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 10000
})
let mask = {}; //遮罩对象

let pending = {}  //声明一个对象来存储每次请求的唯一标识和取消函数
let CancelToken = axios.CancelToken //axios的CancelToken
const removePending = (key) => {
  if (pending[key]) { //如果是重复请求，执行cancelToken
    pending[key]('取消重复')
  }
  delete pending[key] //删除标识
};
const getSign = (config = {}) => { //请求的唯一标识：接口+请求参数
  return config.url + '?' + config.data
};
/*请求拦截器*/
service.interceptors.request.use(function (config) {
  let sign = getSign(config);
  removePending(sign);
  config.cancelToken = new CancelToken((c) => { //创建cancel token
    pending[sign] = c
  });

  //发送请求之前
  if (config[0] == true) {
    mask = Loading.service({fullscreen: true, text: '拼命加载中....'})
  }
  //让每个请求携带Authorization
  if (config.type === 'upload') {
    config.headers['Content-Type'] = 'multipart/form-data;'
  }
  // if (store.getters.token) {
  //   config.headers['Authorization'] = getToken()
  // }
  return config
}, function (error) {
  mask.close();
  //请求出错
  return Promise.reject(error)
});

/*响应拦截器*/
service.interceptors.response.use(function (res) {
  let sign = getSign(res.config)
  removePending(sign) //移除已完成的请求
  /*数据响应*/
  if (res.status === 200) {
    if (res.data.status == '999') {
      // removeToken()
      // Cookies.set('status', 999)
      location.reload()
    } else if (res.data.status == '403') {
      // removeToken()
      // Cookies.set('status', 403)
      location.reload()
    } else {
      // Cookies.remove('status')
    }
    if (typeof mask.close == 'function') {
      mask.close()
    }
  }
  // 判断一下响应中是否有 token，如果有就直接使用此token替换掉本地的token
  var token = res.headers.authorization
  if (token) {
    // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    // this.$store.dispatch('RefreshToken', token)
  }
  return res
}, function (error) {
  //响应出错
  mask.close();
  return Promise.reject(error)
});

Vue.prototype.$ajax = service;
Vue.prototype.$ajaxPost = function (url, data, config, isMask) {
  console.log(isMask);
  if (config === 'upload') {
    return service.post(url, data, {type: 'upload'})
  }
  if (config == true || arguments[3] == true) {
    return service.post(url, JSON.stringify(data), true)
  } else {
    return service.post(url, JSON.stringify(data), config)
  }
}
Vue.prototype.$ajaxGet = function (url, data, config, isMask) {
  console.log(isMask);
  let get_url = util.getUrlPara(url, data, this);
  if (config == true || arguments[2] == true) {
    return service.get(get_url, true)
  } else {
    return service.get(get_url, config)
  }
};
export { baseURL }
export default service
