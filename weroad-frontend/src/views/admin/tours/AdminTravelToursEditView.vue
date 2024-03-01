<script setup lang="ts">
import { getTour } from '@/api/tours';
import SpinnerIcon from '@/components/SpinnerIcon.vue';
import TourForm from '@/components/admin/TourForm.vue';
import type { Tour } from '@/models/tour';
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tour = ref<Tour>();
const loading = ref(false);
const store = useStore();

onMounted(async () => {
  loading.value = true;
  try {
    tour.value = await getTour(route.params.id.toString());
  } catch (err) {
    store.dispatch('showHttpError', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <SpinnerIcon v-if="loading" />
  <TourForm v-if="tour" :tour="tour" :travel-id="route.params.travelId.toString()" />
</template>
