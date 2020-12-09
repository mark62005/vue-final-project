import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/pages/Dashboard';
import Products from '@/components/pages/Products';


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
          name: 'adminProducts',
          component: Products,
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
