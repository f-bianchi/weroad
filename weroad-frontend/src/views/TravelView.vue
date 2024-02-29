<script setup lang="ts">
import { getPublicTravels } from '@/api/travels'
import MainHeader from '@/components/MainHeader.vue'
import { type Travel } from '@/models/travel'
import { onMounted, ref } from 'vue'

const travel = ref<Travel>()

onMounted(async () => {})
</script>

<template>
  <MainHeader />
</template>
