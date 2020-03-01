import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/government',
    name: 'government',
    component: () => import('../views/government.vue')
  },
  {
    path: '/law',
    name: 'law',
    component: () => import('../views/law.vue')
  },
  {
    path: '/lawer',
    name: 'lawer',
    component: () => import('../views/lawer.vue')
  },
  {
    path: '/propaganda',
    name: 'propaganda',
    component: () => import('../views/propaganda.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map.vue')
  },
  {
    path: '/mailbox',
    name: 'mailbox',
    component: () => import('../views/mailbox.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
