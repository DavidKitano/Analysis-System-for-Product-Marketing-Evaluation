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
      meta: {
        title: 'Homepage - Æ System'
      },
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      meta: {
        title: 'Login & Register - Æ System'
      },
      //! 登录注册一体
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      meta: {
        title: '404 Not Found - Æ System'
      },
      component: () => import('@/views/ErrorPage.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = String(to.meta.title);
  }
  else {
    document.title = "Æ System";
  }

  // const token = localStorage.getItem('token');
  // 正常情况下应该localStorage存token，由于项目时间紧、该部分不是着重点以及与后端的沟通本处采用session
  const session = sessionStorage.getItem('username')
  if (session && (String(to.path) === '/auth')) {
    next('/home');
  }
  else {
    next();
  }
})

export default router
