import type { User } from '@/models/user';
import type { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';

export interface State {
  user?: User;
}

interface PayloadLogin {
  user: User;
  token: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {},
  mutations: {
    setUser(state, user: User) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, { user, token }: PayloadLogin) {
      localStorage.setItem('token', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('setUser', undefined);
    }
  },
  getters: {
    isAuthenticated: state => !!state.user
  }
});

export function useStore() {
  return vuexUseStore(key);
}