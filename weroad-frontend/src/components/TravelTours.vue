<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { type Tour, type TourFilters } from '@/models/tour';
import { getTravelTours } from '@/api/tours';
import { PAGE_SIZE_DEFAULT, type OrderType } from '@/models/pagination';
import TravelToursFilters from './TravelToursFilters.vue';

const tours = ref<Tour[]>();
const route = useRoute();
const loading = ref(false);

const filters = computed((): TourFilters => {
  const { page, sort, order, priceFrom, priceTo } = route.query;
  const p = Number((page || '1').toString());
  return {
    page: isNaN(p) ? 1 : p,
    pageSize: PAGE_SIZE_DEFAULT,
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
      tours.value = await getTravelTours(route.params.slug.toString(), filters.value);
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
  <div class="bg-gray-50 mt-12 pb-40">
    <section aria-labelledby="filter-heading">
      <TravelToursFilters :filters="filters" />
    </section>
  </div>
</template>
