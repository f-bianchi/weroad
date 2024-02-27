<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import router from '@/router'
import { createUser, deleteUser, updateUser, type UserBody } from '@/api/users'
import { RoleName, type User } from '@/models/user'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import ConfirmDialog from './ConfirmDialog.vue'
import SpinnerIcon from './SpinnerIcon.vue'
import { useStore } from '@/store'
const ROLES = [RoleName.Admin, RoleName.Editor]

const props = defineProps<{
  user: User
}>()

const form = reactive<UserBody>({
  email: '',
  password: '',
  roles: []
})

const loading = ref(false)
const store = useStore()

const isEditing = computed(() => !!props.user.id)

onMounted(async () => {
  form.email = props.user.email
  form.roles = props.user.roles.map((r) => r.name)
})

const handleSubmit = async () => {
  loading.value = true

  try {
    if (isEditing.value) {
      await updateUser(props.user.id!, form)
    } else {
      await createUser(form)
    }
    router.replace('/admin/users')
  } catch (err) {
    store.dispatch('showHttpError', err)
  } finally {
    loading.value = false
  }
}

const removeUser = async () => {
  loading.value = false
  try {
    await deleteUser(props.user.id!)
    router.replace('/admin/users')
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
            {{ isEditing ? `Edit user` : 'Create new user' }}
          </h2>
          <p v-if="isEditing" class="mt-1 text-sm text-gray-700">#{{ user.id }}</p>

          <div class="mt-8">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
              Email *
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="form.email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-8">
            <label for="new-password" class="block text-sm font-medium leading-6 text-gray-900">
              Password {{ isEditing ? '(leave blank to keep unchanged)' : '*' }}
            </label>
            <div class="mt-2">
              <input
                id="new-password"
                name="new-password"
                type="password"
                autocomplete="new-password"
                v-model="form.password"
                :required="!isEditing"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-8">
            <Listbox as="div" v-model="form.roles" multiple>
              <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                Roles *
              </ListboxLabel>
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-600 sm:text-sm sm:leading-6"
                >
                  <span class="block truncate">{{ form.roles.join(', ') }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition ease-in duration-100"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      as="template"
                      v-for="role in ROLES"
                      :key="role"
                      :value="role"
                      :disabled="form.roles.length === 1 && form.roles[0] === role"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'bg-rose-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        ]"
                      >
                        <span
                          :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']"
                        >
                          {{ role }}</span
                        >
                        <span
                          v-if="selected"
                          :class="[
                            active ? 'text-white' : 'text-rose-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          ]"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>

          <div class="mt-12" v-if="isEditing">
            <ConfirmDialog
              title="Attention"
              message="Are you sure you want to remove this user?"
              @confirm="removeUser"
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
          to="/admin/users"
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
