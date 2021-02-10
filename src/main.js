// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { store } from './store'
import routes from "./routers"
import VeeValidate from 'vee-validate'
import CxltToastr from 'cxlt-vue2-toastr'

window.eventBus = new Vue()

const toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
}

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(CxltToastr, toastrConfigs)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(store);
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'todo',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')