import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import AdminView from '@/views/AdminView.vue'
import AdminUsersView from '@/views/AdminUsersView.vue'
import AdminTravelsView from '@/views/AdminTravelsView.vue'
import AdminEditUserView from '@/views/AdminEditUserView.vue';
import AdminCreateUserView from '@/views/AdminCreateUserView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AboutView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/admin',
      component: AdminView,
      beforeEnter: async (to, from, next) => {
        const token = localStorage.getItem('token')
        if (!token) {
          return next('/login')
        }
        next()
      },
      children: [
        {
          path: '',
          redirect: '/admin/travels'
        },
        {
          path: 'users',
          component: AdminUsersView
        },
        {
          path: 'users/create',
          component: AdminCreateUserView
        },
        {
          path: 'users/:id',
          component: AdminEditUserView
        },
        {
          path: 'travels',
          component: AdminTravelsView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
