<script setup lang="ts">
import { getUsers } from '@/api/users';
import UsersList from '@/components/UsersList.vue';
import type { User } from '@/models/user';
import { onMounted, ref } from 'vue';

const users = ref<User[]>([]);

onMounted(async () => {
  try {
    users.value = await getUsers();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <UsersList :users="users" />
</template>
