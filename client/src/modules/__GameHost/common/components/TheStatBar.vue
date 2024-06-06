<script setup lang="ts">

interface Props {
  name: string
  value: [number, number]
}

defineProps<Props>();
</script>

<template>
  <div class="bar">
    <div class="key">{{ name }}:</div>
    <div class="value">
      {{ value[0] }} / {{ value[1] }}
    </div>
  </div>
</template>

<style>
.bar {
  display: grid;
  grid-column: 2/4;
  grid-template-columns: 1fr 64px;
  grid-template-rows: 1fr;
}
</style>
