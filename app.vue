<template>
 <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './store/useAuthStore';

const authStore = useAuthStore()

onMounted(()=> {
  authStore.fetchUser();
})
</script>