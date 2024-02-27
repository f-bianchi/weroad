<script setup lang="ts">
import { getTravel } from '@/api/travels'
import SpinnerIcon from '@/components/SpinnerIcon.vue'
import TravelForm from '@/components/admin/TravelForm.vue'
import type { Travel } from '@/models/travel'
import { useStore } from '@/store'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const travel = ref<Travel>()
const route = useRoute()
const store = useStore()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    travel.value = await getTravel(route.params.id.toString())
  } catch (err) {
    store.dispatch('showHttpError', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <SpinnerIcon v-if="loading" />
  <TravelForm v-if="travel" :travel="travel" />
</template>
