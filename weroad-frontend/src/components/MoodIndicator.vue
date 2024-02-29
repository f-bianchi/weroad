<script setup lang="ts">
import { computed } from 'vue'
import { type MoodsType } from '@/models/travel'

const RADIUS = 50
const STROKE = 10
const circumference = RADIUS * 2 * Math.PI

const props = defineProps<{
  label: MoodsType
  value: number
}>()

const percentage = computed(() => circumference - (props.value / 100) * circumference)

const color = computed(() => {
  switch (props.label) {
    case 'nature':
      return 'text-green-700'
    case 'relax':
      return 'text-sky-600'
    case 'culture':
      return 'text-orange-600'
    case 'history':
      return 'text-yellow-500'
    case 'party':
      return 'text-indigo-500'
    default:
      return 'text-rose-700'
  }
})
</script>

<template>
  <div class="flex item-center flex-col text-center">
    <p class="text-lg capitalize font-semibold" :class="color">{{ label }}</p>
    <div class="mt-6 block font-semibold not-italic text-gray-900">
      <div class="flex items-center justify-center -m-6 overflow-hidden">
        <svg class="w-32 h-32 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
          <circle
            class="text-gray-300"
            :stroke-width="STROKE"
            stroke="currentColor"
            fill="transparent"
            :r="RADIUS"
            :cx="RADIUS + STROKE"
            :cy="RADIUS + STROKE"
          />
          <circle
            :class="color"
            :stroke-width="STROKE"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="percentage"
            stroke-linecap="round"
            stroke="currentColor"
            fill="transparent"
            :r="RADIUS"
            :cx="RADIUS + STROKE"
            :cy="RADIUS + STROKE"
          />
        </svg>
        <span class="absolute text-2xl" :class="color">{{ value }}%</span>
      </div>
    </div>
  </div>
</template>
