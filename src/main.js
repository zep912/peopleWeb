import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/js/api'
import Cookies from 'js-cookie'
import BaiduMap from 'vue-baidu-map'
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$Cookies = Cookies;
Vue.use(BaiduMap, {
  /* 需要注册百度地图开发者来获取你的ak */
  ak: 'u6vzTey4WMBeVAbC3SokRMGT3br2sejy'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
