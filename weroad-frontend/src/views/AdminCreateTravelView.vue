<script setup lang="ts">
import TravelForm from '@/components/TravelForm.vue'
import type { Travel } from '@/models/travel'

const travel: Travel = {
  name: '',
  isPublic: false,
  slug: '',
  description: '',
  numberOfDays: 1,
  numberOfNights: 1,
  tours: []
}
</script>

<template>
  <TravelForm :travel="travel" />
</template>
