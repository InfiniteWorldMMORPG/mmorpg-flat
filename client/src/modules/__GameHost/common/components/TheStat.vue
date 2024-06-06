<script setup lang="ts">

interface Props {
  name: string
  value: number
}

defineProps<Props>();
</script>

<template>
  <div class="user-stat">{{name}}: {{ value }}</div>
</template>

<style>
.user-stat {
  margin-left: 10px;
}
</style>
