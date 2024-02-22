import type { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';

export interface State {
  count: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0
  }
});

export function useStore() {
  return vuexUseStore(key);
}