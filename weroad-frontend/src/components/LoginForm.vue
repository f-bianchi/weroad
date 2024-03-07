<script setup lang="ts">
import { reactive, ref } from 'vue';
import SpinnerIcon from '@/components/SpinnerIcon.vue';
import router from '@/router';
import { login } from '@/api/auth';
import { useStore } from '@/store';

const form = reactive({
  email: '',
  password: '',
});

const loading = ref(false);
const store = useStore();

const handleSubmit = async () => {
  loading.value = true;

  try {
    const token = await login(form.email, form.password);
    localStorage.setItem('token', token);
    router.push('/admin/travels');
  } catch (err) {
    store.dispatch('showHttpError', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <RouterLink to="/">
        <img class="mx-auto h-10 w-auto" src="../assets/logo.png" alt="WeRoad" />
      </RouterLink>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" id="email" class="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model.trim="form.email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model.trim="form.password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="items-center flex w-full justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            <SpinnerIcon v-if="loading" />
            Sign in
          </button>
        </div>
      </form>
    </div>
    <p className="mt-10 text-center text-sm text-gray-500">
      <RouterLink to="/" className="font-medium leading-6 text-rose-600 hover:text-rose-500">
        Go to home
      </RouterLink>
    </p>
  </div>
</template>
