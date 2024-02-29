<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { type Tour, type TourFilters } from '@/models/tour';
import { getTravelTours } from '@/api/tours';
import { PAGE_SIZE_DEFAULT, type OrderType } from '@/models/pagination';

const tours = ref<Tour[]>();
const route = useRoute();
const loading = ref(false);

const sortOptions = computed(() => {
  return [
    { name: 'Price low to high', to: { query: { ...route.query, sort: 'price', order: 'ASC' } }, current: true },
    { name: 'Price high to low', to: { query: { ...route.query, sort: 'price', order: 'DESC' } }, current: false },
  ];
});

const filters1 = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: true },
      { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
      { value: 'pants-shorts', label: 'Pants & Shorts', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS', checked: false },
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'xl', label: 'XL', checked: false },
      { value: '2xl', label: '2XL', checked: false },
    ],
  },
];

const activeFilters = [{ value: 'objects', label: 'Objects' }];

const filters = computed((): TourFilters => {
  const { page, sort, order } = route.query;
  const p = Number((page || '1').toString());
  return {
    page: isNaN(p) ? 1 : p,
    pageSize: PAGE_SIZE_DEFAULT,
    sort: sort ? sort.toString() : undefined,
    order: order ? <OrderType>order.toString() : undefined,
  };
});

onMounted(async () => {
  loading.value = true;
  try {
    tours.value = await getTravelTours(route.params.slug.toString(), filters.value);
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div class="bg-gray-50 mt-12">
    <!-- Filters -->
    <section aria-labelledby="filter-heading">
      <div class="border-b border-gray-200 bg-white pb-4">
        <div class="mx-auto flex max-w-7xl items-center justify-between">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true" />
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                  <a :href="option.href"
                    :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{
                      option.name }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <div class="block">
            <div class="flow-root">
              <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
                <Popover v-for="(section, sectionIdx) in filters1" :key="section.name"
                  class="relative inline-block px-4 text-left">
                  <PopoverButton
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>{{ section.name }}</span>
                    <span v-if="sectionIdx === 0"
                      class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">1</span>
                    <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true" />
                  </PopoverButton>

                  <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <PopoverPanel
                      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form class="space-y-4">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                          <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value"
                            type="checkbox" :checked="option.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-${section.id}-${optionIdx}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ option.label
                            }}</label>
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>
            </div>
          </div>
        </div>
      </div>

      <!-- Active filters -->
      <div class="bg-gray-100">
        <div class="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
          <h3 class="text-sm font-medium text-gray-500">
            Filters
            <span class="sr-only">, active</span>
          </h3>

          <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

          <div class="mt-2 sm:ml-4 sm:mt-0">
            <div class="-m-1 flex flex-wrap items-center">
              <span v-for="activeFilter in activeFilters" :key="activeFilter.value"
                class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900">
                <span>{{ activeFilter.label }}</span>
                <button type="button"
                  class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500">
                  <span class="sr-only">Remove filter for {{ activeFilter.label }}</span>
                  <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>