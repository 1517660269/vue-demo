import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import "@/css/global.css"
import router from "./router/router";
import axios from "axios";
import store from "./store/store";

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
