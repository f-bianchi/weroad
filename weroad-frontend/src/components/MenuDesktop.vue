<script setup lang="ts">
import type { NavigationItem } from '@/models/navigation'
import { type User } from '@/models/user'
import MenuNav from './MenuNav.vue'

defineProps<{
  navigation: NavigationItem[]
  user?: User
}>()
</script>

<template>
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <MenuNav :navigation="navigation" :user="user" />
  </div>
</template>
