import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Loading } from 'element-ui'
import './util.js'

// 请求地址
const baseURL = 'http://59.44.27.201:9010/jjkj/sfj/api';
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  showMask: false
});
Vue.prototype.$ajax = service;
let loading = {};

service.interceptors.request.use((config) => {
  if (config[0]) {
    loading = Loading.service({fullscreen: true, text: '拼命加载中....'})
  }
  // let token = Cookies.get('token');
  // config.headers['optDevice'] = 'PC'
  // if (token) {
  //   config.headers['Authorization'] = token
  // }
  return config
}, function (error) {
  return Promise.reject(error)
});

service.interceptors.response.use((res) => {
  if (res.status === 200) {
    if (res.data.code == 402 || res.data.code == 401) {
      console.log('未登录');
      // setTimeout(() => {
        // Cookies.remove('token')
        // window.localStorage.clear()
        // window.sessionStorage.clear()
        // router.push({path: '/login'}, () => {
        //   window.location.reload()
        // })
      // }, 1000)
    }
    if (typeof loading.close == 'function') {
      loading.close()
    }
  }
  return res
}, function (error) {
  loading.close && loading.close();
  return Promise.reject(error)
});

const geSearchParams = (req) => {
  let arr = [];
  Object.keys(req).forEach((key) => {
    arr.push(key + '=' + req[key])
  });
  return arr.join('&')
};

Vue.prototype.$ajaxGet = function (url, data, config) {
  let getUrl = url + '?' + geSearchParams(data);
  return this.$ajax.get(getUrl, config);
};

Vue.prototype.$ajaxPost = function (url, data, config) {
  if (!(data instanceof FormData)) {
    return this.$ajax.post(url, data, config)
  }
  return this.$ajax.post(url, qs.stringify(data), config)
};

export { baseURL }
export default service
