import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import reg from '../views/reg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/reg',
    name: 'reg',
    component: reg
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
