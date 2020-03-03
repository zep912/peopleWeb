import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'layout',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/home/'),
        name: 'home'
      },
      {
        path: '/government',
        name: 'government',
        component: () => import('../views/government/')
      },
      {
        path: '/law',
        name: 'law',
        component: () => import('../views/law/')
      },
      {
        path: '/lawer',
        name: 'lawer',
        component: () => import('../views/lawer/')
      },
      {
        path: '/propaganda',
        name: 'propaganda',
        component: () => import('../views/propaganda/'),
      },
      {
        path: '/map',
        name: 'map',
        component: () => import('../views/map/')
      },
      {
        path: '/mailbox',
        name: 'mailbox',
        component: () => import('../views/mailbox/')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/userInfo/')
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

export default router
