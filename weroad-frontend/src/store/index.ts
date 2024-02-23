import { RoleName, type User } from '@/models/user'
import router from '@/router'
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'

export interface State {
  user?: User
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {},
  mutations: {
    setUser(state, user: User) {
      state.user = user
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
    }
  },
  getters: {
    isAdmin: (state): boolean => {
      if (!state.user) return false
      return state.user.roles.some((r) => r.name === RoleName.Admin)
    }
  }
})

export function useStore() {
  return vuexUseStore<State>(key)
}
