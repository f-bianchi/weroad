import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import AdminUsersView from '@/views/admin/users/AdminUsersView.vue'
import AdminTravelsView from '@/views/admin/travels/AdminTravelsView.vue'
import AdminEditUserView from '@/views/admin/users/AdminEditUserView.vue'
import AdminCreateUserView from '@/views/admin/users/AdminCreateUserView.vue'
import AdminCreateTravelView from '@/views/admin/travels/AdminCreateTravelView.vue'
import AdminEditTravelView from '@/views/admin/travels/AdminEditTravelView.vue'
import AdminTravelToursView from '@/views/admin/tours/AdminTravelToursView.vue'
import AdminTravelToursListView from '@/views/admin/tours/AdminTravelToursListView.vue'
import AdminTravelToursCreateView from '@/views/admin/tours/AdminTravelToursCreateView.vue'
import AdminTravelToursEditView from '@/views/admin/tours/AdminTravelToursEditView.vue'
import TravelView from '@/views/TravelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/travels/:slug',
      component: TravelView
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
        },
        {
          path: 'travels/create',
          component: AdminCreateTravelView
        },
        {
          path: 'travels/:id',
          component: AdminEditTravelView
        },
        {
          path: 'travels/:travelId/tours',
          component: AdminTravelToursView,
          children: [
            {
              path: '',
              component: AdminTravelToursListView
            },
            {
              path: 'create',
              component: AdminTravelToursCreateView
            },
            {
              path: ':id',
              component: AdminTravelToursEditView
            }
          ]
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
