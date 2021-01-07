import Vue from "vue";
import App from "./App.vue";
import Element from 'element-ui'
import i18n from '@/i18n'
import router from "./router";
import "./plugins/element.js";
import axios from './utils/axios.js'

import store from './store/index'

Vue.config.productionTip = false;

Vue.use(Element, {
  size: 'default',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$axios = axios

window.onbeforeunload = function(){
  var a = "refresh"
  sessionStorage.setItem("refresh", a)
}

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
