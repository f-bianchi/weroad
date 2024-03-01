<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import router from '@/router';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import SpinnerIcon from '@/components/SpinnerIcon.vue';
import { useStore } from '@/store';
import { deleteTour, createTour, updateTour, type TourBody } from '@/api/tours';
import { type Tour } from '@/models/tour';
import { formatDateForDB, formatDate } from '@/utils/dates';
import VueDatePicker from '@vuepic/vue-datepicker';

const props = defineProps<{
  tour: Tour;
  travelId: string;
}>();

const form = reactive<{ name: string; dates: Date[]; price: number }>({
  name: '',
  dates: [new Date(), new Date()],
  price: 0,
});

const loading = ref(false);
const store = useStore();

const isEditing = computed(() => !!props.tour.id);
const listPath = computed(() => `/admin/travels/${props.travelId}/tours`);

const formatDates = (dates: Date[]) => `${formatDate(dates[0])} - ${formatDate(dates[1])}`;

onMounted(async () => {
  form.name = props.tour.name;
  form.dates = [new Date(props.tour.startingDate), new Date(props.tour.endingDate)];
  form.price = props.tour.price;
});

const handleSubmit = async () => {
  loading.value = true;

  try {
    const tour: TourBody = {
      travelId: props.travelId,
      name: form.name,
      price: form.price,
      startingDate: formatDateForDB(form.dates[0]),
      endingDate: formatDateForDB(form.dates[1]),
    };
    if (isEditing.value) {
      await updateTour(props.tour.id!, tour);
    } else {
      await createTour(tour);
    }
    router.replace(listPath.value);
  } catch (err) {
    store.dispatch('showHttpError', err);
  } finally {
    loading.value = false;
  }
};

const removeTour = async () => {
  loading.value = false;
  try {
    await deleteTour(props.tour.id!);
    router.replace(listPath.value);
  } catch (err) {
    store.dispatch('showHttpError', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-16">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            {{ isEditing ? `Edit tour` : 'Create new tour' }}
          </h2>
          <p v-if="isEditing" class="mt-1 text-sm text-gray-700">#{{ tour.id }}</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
                Name *
              </label>
              <div class="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  v-model="form.name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
                Price (in €) *
              </label>
              <div class="mt-2">
                <input
                  type="number"
                  step=".01"
                  name="price"
                  id="price"
                  required
                  v-model="form.price"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="slug" class="block text-sm font-medium leading-6 text-gray-900">
                Dates *
              </label>
              <div class="mt-2">
                <VueDatePicker
                  required
                  v-model="form.dates"
                  :enableTimePicker="false"
                  autoApply
                  range
                  :format="formatDates"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center gap-x-6">
        <div class="grow">
          <ConfirmDialog
            v-if="isEditing"
            title="Attention"
            message="Are you sure you want to remove this tour?"
            @confirm="removeTour"
            v-slot="scope"
          >
            <button
              @click="scope.toggle"
              type="button"
              class="rounded bg-rose-50 px-2 py-1 text-sm font-semibold text-rose-600 shadow-sm hover:bg-rose-100"
            >
              <SpinnerIcon v-if="loading" />
              Delete
            </button>
          </ConfirmDialog>
        </div>
        <RouterLink
          :to="listPath"
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </RouterLink>
        <button
          type="submit"
          class="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          <SpinnerIcon v-if="loading" />
          Save
        </button>
      </div>
    </form>
  </div>
</template>
