<script setup lang="ts">
import type { Travel } from '@/models/travel';
import { ref, onMounted } from 'vue';
import { getTravel } from '@/api/travels';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import SpinnerIcon from '@/components/SpinnerIcon.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const travel = ref<Travel>();
const store = useStore();
const route = useRoute();
const router = useRouter();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;

  try {
    travel.value = await getTravel(route.params.travelId.toString());
  } catch (err) {
    store.dispatch('showHttpError', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template v-if="travel">
  <SpinnerIcon v-if="loading" />
  <template v-if="travel">
    <div class="border-b border-gray-200 pb-5 mb-8 flex gap-4 items-center">
      <button @click="router.go(-1)">
        <ArrowLeftIcon class="h-6 w-6" />
      </button>
      <div>
        <h3 class="text-base font-semibold leading-6 text-gray-900">{{ travel.name }}</h3>
        <p class="mt-2 max-w-4xl text-sm text-gray-500">{{ travel.slug }}</p>
      </div>
    </div>
    <RouterView />
  </template>
</template>
