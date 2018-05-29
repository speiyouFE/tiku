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
      path: '/demo',
      name: 'Demo',
      //component:Demo
      component: resolve => require(['@/views/Demo'], resolve)
    }
  ]
})
