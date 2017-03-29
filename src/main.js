import './scss/main.scss';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import router from './config/router';

import App from './App'

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
});
