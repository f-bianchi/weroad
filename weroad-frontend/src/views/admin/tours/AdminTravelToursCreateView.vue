<script setup lang="ts">
import TourForm from '@/components/admin/TourForm.vue';
import type { Tour } from '@/models/tour';
import { useRoute } from 'vue-router';

const route = useRoute();

const tour: Tour = {
  name: '',
  startingDate: '',
  endingDate: '',
  price: 0,
};
</script>

<template>
  <TourForm :tour="tour" :travel-id="route.params.travelId.toString()" />
</template>
