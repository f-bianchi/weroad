<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  page: number;
  pageSize: number;
  totalItems: number;
}>();

const pages = computed((): number[] => {
  const totalPages = Math.ceil(props.totalItems / props.pageSize);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
});
</script>

<template>
  <div class="flex items-center justify-between bg-white py-8">
    <div class="flex flex-1 items-end justify-center">
      <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <RouterLink
          replace
          :to="{ query: { page: props.page - 1 } }"
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          :class="props.page <= 1 ? 'pointer-events-none' : ''"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </RouterLink>

        <RouterLink
          replace
          :to="{ query: { page } }"
          aria-current="page"
          v-for="page in pages"
          :key="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          :class="
            props.page === page
              ? 'pointer-events-none ring-0 z-10 bg-rose-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600'
              : 'ring-1'
          "
        >
          {{ page }}
        </RouterLink>

        <RouterLink
          replace
          :to="{ query: { page: props.page + 1 } }"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          :class="props.page >= pages.length ? 'pointer-events-none' : ''"
        >
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
