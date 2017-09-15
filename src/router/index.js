import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Profile from '@/components/Hello'
//import { requireAuth } from '../auth/';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: requireAuth
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
})
