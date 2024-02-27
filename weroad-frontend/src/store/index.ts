import { RoleName, type User } from '@/models/user'
import { type Notification } from '@/models/notification'
import router from '@/router'
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import type { AxiosError } from 'axios'

export interface State {
  user?: User
  notifications: Notification[]
}

export const key: InjectionKey<Store<State>> = Symbol('key-store')

export const store = createStore<State>({
  state: {
    notifications: []
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user
    },
    pushNotification(state, notification: Notification) {
      state.notifications.push(notification)
    },
    deleteNotification(state, index: number) {
      state.notifications.splice(index, 1)
    }
  },
  actions: {
    me({ commit }, user: User) {
      commit('setUser', user)
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('setUser', undefined)
      router.push('/')
    },
    showNotification({ commit }, notification: Notification) {
      commit('pushNotification', notification)
    },
    showHttpError({ commit }, error: AxiosError) {
      const { response } = error as AxiosError
      const { data, status = 500 } = response || {}
      const notification: Notification = {
        type: 'error',
        title: `Error ${status}`,
        message: (data as any).message || 'Generic error'
      }
      commit('pushNotification', notification)
    },
    closeNotification({ commit }, index: number) {
      commit('deleteNotification', index)
    }
  },
  getters: {
    isAdmin: (state): boolean => {
      if (!state.user) return false
      return state.user.roles.some((r) => r.name === RoleName.Admin)
    },
    notifications: (state) => state.notifications || []
  }
})

export function useStore() {
  return vuexUseStore<State>(key)
}
