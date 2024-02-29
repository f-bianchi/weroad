<script setup lang="ts">
import { getStartingPrice } from '@/utils/travel'
import { type Travel, TRAVEL_IMAGE_PREVIEW } from '@/models/travel'
import { computed } from 'vue'

const props = defineProps<{
  travel: Travel
}>()

const startingPrice = computed(() => getStartingPrice(props.travel))
</script>

<template>
  <article
    class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-64 sm:pt-48 lg:pt-64"
  >
    <img
      :src="TRAVEL_IMAGE_PREVIEW + travel.slug"
      alt=""
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
    <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

    <div
      class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"
    >
      <span class="mr-8">{{ travel.numberOfDays }} days</span>
      <div class="-ml-4 flex items-center gap-x-4">
        <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
          <circle cx="1" cy="1" r="1" />
        </svg>
        <div class="flex gap-x-2.5">From {{ startingPrice }}</div>
      </div>
    </div>
    <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
      <RouterLink :to="`/travels/${travel.slug}`">
        <span class="absolute inset-0" />
        {{ travel.name }}
      </RouterLink>
    </h3>
  </article>
</template>
