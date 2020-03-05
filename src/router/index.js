import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'layout',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: '/',
        name: '首页',
        component: () => import('../views/home/')
      },
      {
        path: '/government',
        name: '政务公开',
        component: () => import('../views/government/')
      },
      {
        path: '/law',
        name: '法律服务',
        component: () => import('../views/law/')
      },
      {
        path: '/lawer',
        name: '律师信息',
        component: () => import('../views/lawer/')
      },
      {
        path: '/propaganda',
        name: '普法宣传',
        component: () => import('../views/propaganda/'),
      },
      {
        path: '/map',
        name: '司法地图',
        component: () => import('../views/map/')
      },
      {
        path: '/mailbox',
        name: '局长信箱',
        component: () => import('../views/mailbox/')
      },
      {
        path: '/register',
        name: '账号注册',
        component: () => import('../views/register.vue')
      },
      {
        path: '/user',
        name: '个人中心',
        component: () => import('../views/userInfo/'),
      },
      {
        path: '/user/consult',
        name: '个人中心',
        component: () => import('../views/userInfo/consult'),
      },
      {
        path: '/lawer/lawerInfo',
        name: '律师详情',
        component: () => import('../views/lawer/lawerInfo')
      },
      {
        path: '/propaganda/getInfo',
        name: '',
        component: () => import('../views/propaganda/getInfo')
      },
      {
        path: '/propaganda/video',
        name: '司法培训',
        component: () => import('../views/propaganda/video')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login.vue'),
    children: []
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 需要登录的页面url
const blackList = ['/law'];
router.beforeEach((to, from, next) => {
  if (blackList.includes(to.path)) {
    if (Cookies.get('token')) { //判断本地是否存在token
      next()
    } else {
      Cookies.set('toPath', to.path === '/login' ? '' : to.path);
      if (to.path === '/login') {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  } else {
    next()
  }
});


export default router
