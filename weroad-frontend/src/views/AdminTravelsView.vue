<script setup lang="ts">
import type { Travel } from '@/models/travel';
import { ref, onMounted } from 'vue';
import { getTravels } from '@/api/travels';
import { useStore } from '@/store';
import TravelsList from '@/components/TravelsList.vue';

const travels = ref<Travel[]>([]);
const store = useStore();

onMounted(async () => {
  try {
    travels.value = await getTravels();
  } catch (err) {
    store.dispatch('showHttpError', err);
  }
});
</script>

<template>
  <TravelsList :travels="travels" />
</template>
