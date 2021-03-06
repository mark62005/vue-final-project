// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './components/filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// CORS
// // method 1
// axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next);
  // meta: { requiresAuth: true }
  if (to.meta.requiresAuth) {
    // console.log('這裡需要驗證 !');
    const api = `${process.env.API_PATH}/api/user/check`;
    axios.post(api).then((res) => {
      if (res.data.success) next();
      else next({ name: 'login' });
    });
  } else next();
});
