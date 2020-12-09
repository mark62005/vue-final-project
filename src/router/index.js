import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/pages/Dashboard';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { requiresAuth: true },
        },

        {
          path: 'orders',
          name: 'orders',
          component: Orders,
          meta: { requiresAuth: true },
        },

        {
          path: 'coupons',
          name: 'coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
      ],
    },

    {
      path: '*',
      redirect: '/login',
    },
  ],
});
