<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import router from '@/router'
import ConfirmDialog from './ConfirmDialog.vue'
import SpinnerIcon from './SpinnerIcon.vue'
import { useStore } from '@/store'
import type { Travel } from '@/models/travel'
import { createTravel, updateTravel, type TravelBody, deleteTravel } from '@/api/travels'

const props = defineProps<{
  travel: Travel
}>()

const form = reactive<TravelBody>({
  name: '',
  isPublic: false,
  slug: '',
  description: '',
  numberOfDays: 1,
  numberOfNights: 0
})

const loading = ref(false)
const store = useStore()

const isEditing = computed(() => !!props.travel.id)

watch(form, () => {
  form.numberOfNights = form.numberOfDays > 1 ? form.numberOfDays - 1 : 0
})

onMounted(async () => {
  form.name = props.travel.name
  form.isPublic = props.travel.isPublic
  form.slug = props.travel.slug
  form.description = props.travel.description
  form.numberOfDays = props.travel.numberOfDays
  form.numberOfNights = props.travel.numberOfNights
})

const handleSubmit = async () => {
  loading.value = true

  try {
    if (isEditing.value) {
      await updateTravel(props.travel.id!, form)
    } else {
      await createTravel(form)
    }
    router.replace('/admin/travels')
  } catch (err) {
    console.log(store)
    store.dispatch('showHttpError', err)
  } finally {
    loading.value = false
  }
}

const removeTravel = async () => {
  loading.value = false
  try {
    await deleteTravel(props.travel.id!)
    router.replace('/admin/travels')
  } catch (err) {
    store.dispatch('showHttpError', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <form @submit.prevent="handleSubmit">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-8">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            {{ isEditing ? `Edit travel` : 'Create new travel' }}
          </h2>
          <p v-if="isEditing" class="mt-1 text-sm text-gray-700">#{{ travel.id }}</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="relative flex gap-x-3 sm:col-span-6">
              <div class="flex h-6 items-center">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  v-model="form.isPublic"
                  class="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-600"
                />
              </div>
              <div class="text-sm leading-6">
                <label for="comments" class="font-medium text-gray-900 cursor-pointer"
                  >Public</label
                >
                <p class="text-gray-500">Check to publish the travel.</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
                >Name *</label
              >
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
              <label for="slug" class="block text-sm font-medium leading-6 text-gray-900"
                >Slug *</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  v-model="form.slug"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="about" class="block text-sm font-medium leading-6 text-gray-900"
                >Description *</label
              >
              <div class="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows="10"
                  equired
                  v-model="form.description"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
                >Number of days *</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="days"
                  id="days"
                  step="1"
                  min="1"
                  required
                  v-model="form.numberOfDays"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="slug" class="block text-sm font-medium leading-6 text-gray-900"
                >Number of nights *</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="nights"
                  id="nights"
                  step="1"
                  min="0"
                  required
                  v-model="form.numberOfNights"
                  disabled
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                />
              </div>
            </div>
          </div>

          <div class="mt-12" v-if="isEditing">
            <ConfirmDialog
              title="Attention"
              message="Are you sure you want to remove this travel?"
              @confirm="removeTravel"
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
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <RouterLink
          to="/admin/travels"
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
