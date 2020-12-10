import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
// import request from './utils/request'
import axios from './utils/axios.js'

import store from './store/index'
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
