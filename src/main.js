import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

let config = {
  apiKey: "AIzaSyC7SGRcskQmVWMrt2gZT_9o_Qz5O8f4qRU",
  authDomain: "youngfox-blackjack.firebaseapp.com",
  databaseURL: "https://youngfox-blackjack.firebaseio.com",
  projectId: "youngfox-blackjack",
  storageBucket: "youngfox-blackjack.appspot.com",
  messagingSenderId: "82165920548"
}

firebase.initializeApp(config)
Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
