// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import ElementUI from 'element-ui'
import App from './App'
import VCharts from 'v-charts'
import FastClick from 'fastclick'

Vue.use(ElementUI)
Vue.use(VCharts)
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
