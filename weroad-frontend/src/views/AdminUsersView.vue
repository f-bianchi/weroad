<script setup lang="ts">
import { getUsers } from '@/api/users';
import UsersList from '@/components/UsersList.vue';
import type { User } from '@/models/user';
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';

const users = ref<User[]>([]);
const store = useStore();

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch (err) {
    store.dispatch('showHttpError', err);
  }
});
</script>

<template>
  <UsersList :users="users" />
</template>
