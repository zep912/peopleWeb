import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/js/api'
import Cookies from 'js-cookie'

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$Cookies = Cookies;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
