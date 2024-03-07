<script setup lang="ts"></script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 bg-white bg-opacity-60">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">WeRoad</span>
          <img class="h-8 w-auto" src="../assets/logo.png" alt="WeRoad" />
        </RouterLink>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <RouterLink to="/admin" class="text-sm font-semibold leading-6 text-gray-900">
          Admin <span aria-hidden="true">&rarr;</span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
