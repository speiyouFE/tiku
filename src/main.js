/* eslint-disable */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// package 样式文件
import '@/packages/theme/sealui.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// packages文件
import SealUI from 'sealui';
Vue.use(SealUI);

// 插件
import RequestPlugin from './plugins/request/index.js'
Vue.use(RequestPlugin);

Vue.config.productionTip = false

router.beforeEach((route, redirect, next) => {
  NProgress.start();
  next();
});

router.afterEach(route => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#__CHN_APP')
