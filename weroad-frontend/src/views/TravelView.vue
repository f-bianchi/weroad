<script setup lang="ts">
import { getPublicTravel } from '@/api/travels';
import MainHeader from '@/components/MainHeader.vue';
import SpinnerIcon from '@/components/SpinnerIcon.vue';
import MoodIndicator from '@/components/MoodIndicator.vue';
import { MOODS_PROPS, TRAVEL_IMAGE_PREVIEW, type Travel } from '@/models/travel';
import { useStore } from '@/store';
import { getStartingPrice } from '@/utils/travel';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import TravelTours from '@/components/TravelTours.vue';

const travel = ref<Travel>();
const store = useStore();
const route = useRoute();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    travel.value = await getPublicTravel(route.params.slug.toString());
  } catch (err) {
    store.dispatch('showHttpError', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <SpinnerIcon v-if="loading" />
  <MainHeader />
  <div class="relative overflow-hidden bg-white" v-if="travel">
    <div aria-hidden="true" class="absolute inset-0">
      <div class="absolute inset-0 mx-auto overflow-hidden">
        <img :src="TRAVEL_IMAGE_PREVIEW + travel.slug" :alt="travel.slug"
          class="h-full w-full object-cover object-center" />
      </div>
      <div class="absolute inset-0 bg-white bg-opacity-50" />
      <div class="absolute inset-0 bg-gradient-to-t from-white via-white" />
    </div>

    <section class="relative mx-auto flex flex-col items-center px-4 pt-72 text-center sm:px-6 lg:px-8 pb-16">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <h2 id="sale-heading" class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          {{ travel.name }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-xl text-gray-600 font-light">
          {{ travel.numberOfDays }} days
          <svg viewBox="0 0 2 2" class="mx-1 h-0.5 w-0.5 flex-none fill-black/50 inline-flex">
            <circle cx="1" cy="1" r="1" />
          </svg>
          From {{ getStartingPrice(travel) }}
        </p>
      </div>
    </section>

    <section class="relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-7xl">
        <div class="space-y-16 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-y-0">
          <MoodIndicator :label="prop" :value="travel.moods[prop]" v-for="prop in MOODS_PROPS" :key="prop" />
        </div>
      </div>
    </section>

    <section class="relative mx-auto px-4 py-16 sm:px-8 lg:px-8 max-w-2xl lg:max-w-7xl">
      <p class="mt-4 block font-light not-italic text-gray-900 text-lg whitespace-pre-line">
        {{ travel.description }}
      </p>
    </section>

    <section class="relative mx-auto px-4 py-16 sm:px-8 lg:px-8 max-w-2xl lg:max-w-7xl">
      <h2 id="testimonial-heading" class="text-2xl font-bold tracking-tight text-gray-900">
        Available dates
      </h2>
      <TravelTours />
    </section>
  </div>
</template>
