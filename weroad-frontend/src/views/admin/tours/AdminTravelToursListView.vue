<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getTours } from '@/api/tours';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import ToursList from '@/components/admin/ToursList.vue';
import type { Tour } from '@/models/tour';
import SpinnerIcon from '@/components/SpinnerIcon.vue';
import { getPaginationFromRoute } from '@/utils/pagination';

const tours = ref<Tour[]>([]);
const store = useStore();
const route = useRoute();
const loading = ref(false);
const totalItems = ref(0);

const travelId = computed(() => route.params.travelId.toString());
const pagination = computed(() => getPaginationFromRoute(route));

onMounted(async () => {
  loading.value = true;

  try {
    const { items, total } = await getTours(travelId.value, pagination.value);
    tours.value = items;
    totalItems.value = total;
  } catch (err) {
    store.dispatch('showHttpError', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <SpinnerIcon v-if="loading" />
  <ToursList :tours="tours" :travel-id="travelId" :total-items="totalItems" />
</template>
