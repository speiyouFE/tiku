import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  mode:"history",
  base : '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: '/list',
      name: 'PaperList',
      component: resolve => require(['@/views/PaperList'], resolve)
    },
    {
      path: '/about',
      name: 'About',
      component: resolve => require(['@/views/About'], resolve)
    },
    {
      path: '/demo',
      name: 'Demo',
      component: resolve => require(['@/views/Demo'], resolve)
    }
  ]
})
