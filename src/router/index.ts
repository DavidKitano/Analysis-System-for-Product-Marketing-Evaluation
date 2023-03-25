import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      //! 登录注册一体
      component: () => import('@/views/AuthView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }
  else {
    document.title = "产品营销评价分析系统";
  }

  const token = localStorage.getItem('token');
  if (token && (String(to.path) === '/auth')) {
    next('/home');
  }
  else {
    next();
  }
})

export default router
