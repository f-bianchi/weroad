<script setup lang="ts">
import { getPublicTravels } from '@/api/travels';
import MainHeader from '@/components/MainHeader.vue';
import PaginationRouter from '@/components/PaginationRouter.vue';
import TravelCard from '@/components/TravelCard.vue';
import { type Travel } from '@/models/travel';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MainFooter from '@/components/MainFooter.vue';
import { getPaginationFromRoute } from '@/utils/pagination';

const travels = ref<Travel[]>([]);
const totalItems = ref(0);
const route = useRoute();

const pagination = computed(() => getPaginationFromRoute(route));

const fetchData = async () => {
  try {
    const { items, total } = await getPublicTravels(pagination.value);
    totalItems.value = total;
    travels.value = items;
  } catch (err) {
    console.log(err);
  }
};

watch(
  route,
  () => {
    fetchData();
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <MainHeader />
  <div class="bg-white py-16 sm:pt-48">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bring your backpack, we'll bring the friends
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Adventure travel for millennials in small groups
        </p>
      </div>
      <div
        class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <TravelCard v-for="travel in travels" :key="travel.id" :travel="travel" />
      </div>
      <PaginationRouter :total-items="totalItems" />
    </div>
  </div>
  <MainFooter />
</template>
