<script setup lang="ts">
import type { Travel } from '@/models/travel'
import { useStore } from '@/store'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

defineProps<{
  travels: Travel[]
}>()

const store = useStore()
const isAdmin = computed(() => store.getters.isAdmin)
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Travels</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the travels</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <RouterLink
          to="/admin/travels/create"
          v-if="isAdmin"
          class="block rounded-md bg-rose-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Add travel
        </RouterLink>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tours
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Days
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="travel in travels" :key="travel.id">
                  <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:pl-6">
                    <div class="text-gray-900">{{ travel.name }}</div>
                    <div class="mt-1 text-gray-500">{{ travel.slug }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ travel.tours.length }}
                    <RouterLink
                      :to="`/admin/travels/${travel.id}/tours`"
                      type="button"
                      class="ml-2 inline-flex items-center gap-x-1.5 rounded bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600 shadow-sm hover:bg-orange-100"
                    >
                      Manage
                      <ArrowRightIcon class="h-4 w-4" aria-hidden="true" />
                    </RouterLink>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ travel.numberOfDays }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      v-if="travel.isPublic"
                      class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >
                      Public
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                    >
                      Draft
                    </span>
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <RouterLink
                      :to="`/admin/travels/${travel.id}`"
                      class="text-rose-600 hover:text-rose-900"
                      v-if="isAdmin"
                    >
                      Edit
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
