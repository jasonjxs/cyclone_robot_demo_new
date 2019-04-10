// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import ElementUI from 'element-ui'
import App from './App'
import Vuex from 'vuex'
import VCharts from 'v-charts'
import FastClick from 'fastclick'

Vue.use(ElementUI)
Vue.use(VCharts)
FastClick.attach(document.body)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    count: 0,
    // color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
    color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
