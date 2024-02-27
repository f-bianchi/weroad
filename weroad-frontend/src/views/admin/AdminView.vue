<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MenuMobile from '@/components/admin/MenuMobile.vue'
import MenuDesktop from '@/components/admin/MenuDesktop.vue'
import { RocketLaunchIcon, UsersIcon } from '@heroicons/vue/24/outline'
import type { NavigationItem } from '@/models/navigation'
import { me } from '@/api/auth'
import { useStore } from '@/store'

const route = useRoute()
const store = useStore()

const navigation = computed((): NavigationItem[] => {
  const menu = [
    {
      name: 'Travels',
      path: '/admin/travels',
      icon: RocketLaunchIcon,
      current: route.path.startsWith('/admin/travels')
    }
  ]
  if (store.getters.isAdmin) {
    menu.push({
      name: 'Users',
      path: '/admin/users',
      icon: UsersIcon,
      current: route.path.startsWith('/admin/users')
    })
  }
  return menu
})

onMounted(async () => {
  try {
    const user = await me()
    store.dispatch('me', user)
  } catch (err) {
    store.dispatch('showHttpError', err)
  }
})

const user = computed(() => store.state.user)
</script>

<template>
  <div>
    <MenuMobile :navigation="navigation" :user="user" />
    <MenuDesktop :navigation="navigation" :user="user" />

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
