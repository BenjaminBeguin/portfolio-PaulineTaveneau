import MobileDetect from 'mobile-detect';

import { store } from '../store'

import VueRouter from 'vue-router'
import routes from './routes';

import { transitionManager } from '../helpers/TransitionManager'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
});

router.beforeEach((to, from, next) => {
  const mobile = new MobileDetect(window.navigator.userAgent).mobile();

  if((window.innerWidth <= 768 || mobile) && to.name !== 'about') {
    router.replace('/about');
  }

  transitionManager.beforeRouteChange(to, from, next);
});

router.afterEach((to, from) => {
  transitionManager.afterRouteChange(to, from);
});

export default router;
