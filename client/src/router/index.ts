import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import { useUserStore } from '@/stores/userStore'
import { handleRefresh } from '@/api/actions/userActions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
  ],
})

router.beforeEach(async (to, _, next) => {
  const store = useUserStore()
  if (!store.getUser && !store.getToken) {
    try {
      await handleRefresh()
    } catch (err) {
      console.log(err)
      return next('/login')
    }
  }

  if (to.meta.requiresAuth && !store.getUser) {
    return next('/login')
  }

  if ((to.name === 'login' || to.name === 'signup') && store.getUser) {
    return next('/')
  }

  next()
})

export default router
