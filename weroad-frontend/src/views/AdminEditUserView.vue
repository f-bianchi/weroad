<script setup lang="ts">
import { getUser } from '@/api/users';
import SpinnerIcon from '@/components/SpinnerIcon.vue';
import UserForm from '@/components/UserForm.vue';
import type { User } from '@/models/user';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const user = ref<User>();
const route = useRoute();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    user.value = await getUser(route.params.id.toString());
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <SpinnerIcon v-if="loading" />
  <UserForm v-if="user" :user="user" />
</template>
