<script setup lang="ts">
import TravelForm from '@/components/admin/TravelForm.vue';
import { type Travel, INITIAL_MOODS } from '@/models/travel';

const travel: Travel = {
  name: '',
  isPublic: false,
  slug: '',
  description: '',
  numberOfDays: 1,
  numberOfNights: 1,
  tours: [],
  moods: { ...INITIAL_MOODS },
};
</script>

<template>
  <TravelForm :travel="travel" />
</template>
