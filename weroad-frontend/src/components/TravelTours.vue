<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type Tour, type TourFilters } from '@/models/tour';
import { getTravelTours } from '@/api/tours';
import { type OrderType } from '@/models/pagination';
import TravelToursFilters from './TravelToursFilters.vue';
import { formatDate } from '@/utils/dates';
import { formatPrice } from '@/utils/price';
import TableRowEmpty from '@/components/TableRowEmpty.vue';
import PaginationRouter from './PaginationRouter.vue';
import { getPaginationFromRoute } from '@/utils/pagination';

const DATE_FORMATTER: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
};

const tours = ref<Tour[]>();
const totalItems = ref(0);
const route = useRoute();
const loading = ref(false);

const filters = computed((): TourFilters => {
  const { page, pageSize } = getPaginationFromRoute(route);
  const { sort, order, priceFrom, priceTo } = route.query;
  return {
    page,
    pageSize,
    sort: sort ? sort.toString() : undefined,
    order: order ? (order.toString() as OrderType) : undefined,
    priceTo: priceTo ? Number(priceTo.toString()) : undefined,
    priceFrom: priceFrom ? Number(priceFrom.toString()) : undefined,
  };
});

watch(
  route,
  async () => {
    loading.value = true;
    try {
      const { items, total } = await getTravelTours(route.params.slug.toString(), filters.value);
      tours.value = items;
      totalItems.value = total;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="bg-gray-10 mt-12 pb-8">
    <section aria-labelledby="filter-heading">
      <TravelToursFilters :filters="filters" />
    </section>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="mt-4 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                  >
                    Dates
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <TableRowEmpty v-if="!tours?.length" :col-span="3" />
                <tr v-for="tour in tours" :key="tour.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-light text-gray-900 sm:pl-0"
                  >
                    From
                    <span class="font-medium">{{
                      formatDate(tour.startingDate, DATE_FORMATTER)
                    }}</span>
                    to
                    <span class="font-medium">{{
                      formatDate(tour.endingDate, DATE_FORMATTER)
                    }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ tour.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatPrice(tour.price) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PaginationRouter v-if="tours?.length" :total-items="totalItems" />
    </div>
  </div>
</template>
