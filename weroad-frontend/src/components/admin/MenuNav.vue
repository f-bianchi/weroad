<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { NavigationItem } from '@/models/navigation'
import type { User } from '@/models/user'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import { store } from '@/store'

defineProps<{
  navigation: NavigationItem[]
  user?: User
}>()
</script>

<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
    <div class="flex h-16 shrink-0 items-center">
      <img class="h-8 w-auto" src="../assets/logo.png" alt="WeRoad" />
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <RouterLink
                :to="item.path"
                :class="[
                  item.current
                    ? 'bg-gray-50 text-rose-600'
                    : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current ? 'text-rose-600' : 'text-gray-400 group-hover:text-rose-600',
                    'h-6 w-6 shrink-0'
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-if="user" class="-mx-6 mt-auto mb-4 flex flex-col">
          <div
            class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-5 text-gray-900 w-full text-left"
          >
            <img class="h-8 w-8 rounded-full bg-gray-50" :src="user.image" />
            <span class="sr-only">Your profile</span>
            <span aria-hidden="true">
              {{ user.email }}
              <br />
              <small>{{ user.roles.map((r) => r.name).join(', ') }}</small>
            </span>
          </div>
          <ConfirmDialog
            title="Logout"
            message="Are you sure you want to logout?"
            @confirm="store.dispatch('logout')"
            v-slot="scope"
          >
            <button
              @click="scope.toggle"
              class="mx-6 rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              Logout
            </button>
          </ConfirmDialog>
        </li>
      </ul>
    </nav>
  </div>
</template>
