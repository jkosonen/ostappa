// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import VueOnsen from 'vue-onsenui';
import VueApiRequest from 'vue-api-request';

import App from './App'
//import router from './router'
import store from './vuex/';
import api from './api/';

import CustomToolbar from './components/partials/CustomToolbar.vue';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.use(VueOnsen);
Vue.use(Vuex);
VueApiRequest.setAPI(api);
Vue.use(VueApiRequest);
Vue.component('custom-toolbar', CustomToolbar); // Common toolbar

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //router,
  render: h => h(App),
  store: new Vuex.Store(store)
})
