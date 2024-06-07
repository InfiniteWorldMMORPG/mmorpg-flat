<script setup lang="ts">

interface UserStatProps {
  name: string
  value: number
}

defineProps<UserStatProps>();
</script>

<template>
  <div class="user-stat">{{ name }}: {{ value }}</div>
</template>

<style>
.user-stat {
  margin-left: 10px;
}
</style>
