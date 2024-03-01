<script setup lang="ts">
import { RouterView } from 'vue-router';
import NotificationAlert from './components/NotificationAlert.vue';
import '@vuepic/vue-datepicker/dist/main.css';
</script>

<template>
  <NotificationAlert />
  <RouterView />
</template>
