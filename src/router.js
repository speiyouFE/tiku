import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? "hash" : "history",
  base : '/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/views/Index'], resolve)
    },
    // 查询班次
    {
      path: '/papercourse',
      name: 'PaperCourse',
      component: resolve => require(['@/views/Course'], resolve)
    },
    {
      path: '/courselist',
      name: 'Courselist',
      component: resolve => require(['@/views/Courselist'], resolve)
    },

    // 文件夹
    {
      path: '/paperfolder',
      name: 'PaperFolders',
      component: resolve => require(['@/views/Folders'], resolve)
    },
    {
      path: '/paperlist',
      name: 'PaperList',
      component: resolve => require(['@/views/Papers'], resolve)
    },

    {
      path: '/demo',
      name: 'Demo',
      //component:Demo
      component: resolve => require(['@/views/Demo'], resolve)
    }
  ]
})
