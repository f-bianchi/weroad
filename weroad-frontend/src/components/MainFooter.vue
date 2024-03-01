<script setup lang="ts">
import type { Notification } from '@/models/notification';
import { useStore } from '@/store';
import { ref } from 'vue';

const store = useStore();

const email = ref('');

const handleSubmit = async () => {
  const notification: Notification = {
    title: 'Newsletter',
    message: `${email.value} subscribed successfully!`,
    type: 'success',
  };
  store.dispatch('showNotification', notification);
  email.value = '';
};
</script>

<template>
  <footer class="bg-gray-800" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
      <div class="pt-8 lg:flex lg:items-center lg:justify-between">
        <div>
          <h3 class="text-sm font-semibold leading-6 text-white">Subscribe to our newsletter</h3>
          <p class="mt-1 text-sm leading-6 text-gray-300">
            The best travel advice, directly to your inbox.
          </p>
        </div>
        <form class="mt-6 sm:flex sm:max-w-md lg:mt-0" @submit.prevent="handleSubmit">
          <label for="email-address" class="sr-only">Email address</label>
          <input
            type="email"
            name="email-address"
            id="email-address"
            autocomplete="email"
            required
            v-model="email"
            class="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:w-56 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div class="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
        <p class="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
          &copy; 2024 WeRoad, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
