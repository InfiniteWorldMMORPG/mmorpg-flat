<script setup lang="ts">

interface UserStat {
  name: string
  value: number
}

defineProps<UserStat>();
</script>

<template>
  <div class="user-stat">{{ name }}: {{ value }}</div>
</template>

<style>
.user-stat {
  margin-left: 10px;
}
</style>
