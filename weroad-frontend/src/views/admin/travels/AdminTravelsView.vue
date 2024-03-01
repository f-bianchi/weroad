<script setup lang="ts">
import type { Travel } from '@/models/travel';
import { ref, computed, watch } from 'vue';
import { getTravels } from '@/api/travels';
import { useStore } from '@/store';
import TravelsList from '@/components/admin/TravelsList.vue';
import { useRoute } from 'vue-router';
import { getPaginationFromRoute } from '@/utils/pagination';

const travels = ref<Travel[]>([]);
const totalItems = ref(0);
const store = useStore();
const route = useRoute();

const pagination = computed(() => getPaginationFromRoute(route));

watch(
  route,
  async () => {
    try {
      const { items, total } = await getTravels(pagination.value);
      totalItems.value = total;
      travels.value = items;
    } catch (err) {
      store.dispatch('showHttpError', err);
    }
  },
  { immediate: true },
);
</script>

<template>
  <TravelsList :travels="travels" :total-items="totalItems" />
</template>
