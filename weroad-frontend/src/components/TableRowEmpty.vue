<script setup lang="ts">
defineProps<{
  colSpan: number;
}>();
</script>

<template>
  <tr>
    <td
      :colSpan="colSpan"
      class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 italic"
    >
      No result
    </td>
  </tr>
</template>
