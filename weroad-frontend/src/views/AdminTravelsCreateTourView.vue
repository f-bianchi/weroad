<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { RoleName, type User } from '@/models/user'

const user: User = {
  email: '',
  roles: [{ id: '', name: RoleName.Editor }]
}
</script>

<template>
  <UserForm :user="user" />
</template>
