<script setup lang="ts">
import TravelToursSort from '@/components/TravelToursSort.vue';
import { type TourFilters } from '@/models/tour';
import router from '@/router';
import { formatDate, formatDateISO8601, formatDateShort } from '@/utils/dates';
import { isIncluded, undefinizy } from '@/utils/general';
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import VueDatePicker from '@vuepic/vue-datepicker';
import { computed } from 'vue';
import { useRoute, type RouteQueryAndHash } from 'vue-router';

const props = defineProps<{
  filters: TourFilters;
}>();

interface FilterOption {
  name: string;
  to: RouteQueryAndHash;
  current: boolean;
  undo: RouteQueryAndHash;
}

const route = useRoute();

const priceOptions = computed((): FilterOption[] => {
  return [
    { label: `Less than 1000`, filter: { priceTo: 1000, priceFrom: undefined } },
    { label: `Between 1000 and 2000`, filter: { priceFrom: 1000, priceTo: 2000 } },
    { label: `Greater than 2000`, filter: { priceFrom: 2000, priceTo: undefined } },
  ].map((option) => ({
    name: option.label,
    to: { query: { ...route.query, ...option.filter, page: 1 } },
    undo: { query: { ...route.query, ...undefinizy(option.filter), page: 1 } },
    current: isIncluded(option.filter, props.filters),
  }));
});

const datesModel = computed(() => {
  const { startingDate, endingDate } = props.filters;
  return [startingDate || '', endingDate || ''];
});

const datesOptions = computed((): FilterOption[] => {
  const { startingDate, endingDate } = props.filters;
  return [
    {
      name: `Starting: ${formatDateShort(startingDate)}`,
      to: {},
      undo: { query: { ...route.query, startingDate: undefined, page: 1 } },
      current: !!startingDate,
    },
    {
      name: `Ending: ${formatDateShort(endingDate)}`,
      to: {},
      undo: { query: { ...route.query, endingDate: undefined, page: 1 } },
      current: !!endingDate,
    },
  ];
});

const formatDates = (dates: Date[]) => `${formatDate(dates[0])} - ${formatDate(dates[1])}`;

const updateDates = (dates: Date[]) => {
  const [startingDate, endingDate] = dates;
  router.replace({
    query: {
      ...route.query,
      startingDate: startingDate ? formatDateISO8601(startingDate) : undefined,
      endingDate: endingDate ? formatDateISO8601(endingDate) : undefined,
      page: 1,
    },
  });
};

const activeFilters = computed((): FilterOption[] => {
  return [...priceOptions.value, ...datesOptions.value].filter((option) => option.current);
});
</script>

<template>
  <div class="border-b border-gray-200 bg-white pb-4">
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <TravelToursSort :filters="filters" />

      <div class="block">
        <div class="flex">
          <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
            <Popover class="relative inline-block px-4 text-left">
              <PopoverButton
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Price</span>
                <ChevronDownIcon
                  class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <PopoverPanel
                  v-slot="{ close }"
                  class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <form class="space-y-4">
                    <RouterLink
                      @click="close"
                      replace
                      :to="option.to"
                      v-for="option in priceOptions"
                      :key="option.name"
                      class="flex items-center cursor-pointer"
                    >
                      <input
                        :id="`filter-price-${option.name}`"
                        name="price"
                        type="checkbox"
                        :checked="option.current"
                        class="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                      />
                      <label
                        :for="`filter-price-${option.name}`"
                        class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {{ option.name }}
                      </label>
                    </RouterLink>
                  </form>
                </PopoverPanel>
              </transition>
            </Popover>
            <Popover class="relative inline-block px-4 text-left">
              <PopoverButton
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span>Dates</span>
                <ChevronDownIcon
                  class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </PopoverButton>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <PopoverPanel
                  v-slot="{ close }"
                  class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <VueDatePicker
                    inline
                    required
                    :enableTimePicker="false"
                    range
                    :model-value="datesModel"
                    :format="formatDates"
                    @update:model-value="
                      (dates) => {
                        updateDates(dates);
                        close();
                      }
                    "
                  />
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-100">
    <div class="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
      <h3 class="py-2 text-sm font-medium text-gray-500">Filters</h3>

      <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

      <div class="mt-2 sm:ml-4 sm:mt-0">
        <div class="-m-1 flex flex-wrap items-center">
          <span
            v-for="activeFilter in activeFilters"
            :key="activeFilter.name"
            class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
          >
            <span>{{ activeFilter.name }}</span>
            <RouterLink
              replace
              :to="activeFilter.undo"
              type="button"
              class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
            >
              <span class="sr-only">Remove filter for {{ activeFilter.name }}</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </RouterLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
