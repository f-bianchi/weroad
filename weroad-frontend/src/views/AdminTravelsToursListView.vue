<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTours } from '@/api/tours'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import ToursList from '@/components/ToursList.vue'
import type { Tour } from '@/models/tour'

const tours = ref<Tour[]>([])
const store = useStore()
const route = useRoute()
const loading = ref(false)

onMounted(async () => {
  loading.value = true

  try {
    tours.value = await getTours(route.params.id.toString())
  } catch (err) {
    store.dispatch('showHttpError', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <ToursList :tours="tours" />
</template>
