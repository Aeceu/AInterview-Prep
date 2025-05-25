import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore()
  if (!store.getUser) {
    try {
      await handleRefresh()
    } catch (err) {
      console.log(err)
    }
  }

  next()
})

export default router
