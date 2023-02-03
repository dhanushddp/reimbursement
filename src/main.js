import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import employeStore from './stores/employeStore.js'
import managerStore from './stores/managerStore'
import financeStore from './stores/financeStore'
import directorStore from './stores/directorStore'
import presidentStore from './stores/presidentStore'
import VueRouter from 'vue-router'
import router from '../src/routerConfig/routerConfig.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  modules: {
    employeStore ,
    managerStore,
    financeStore,
    directorStore,
    presidentStore}
}
)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')