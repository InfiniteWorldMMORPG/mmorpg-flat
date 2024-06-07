<script setup lang="ts">
import { computed } from 'vue';
interface UseStatBar {
  name: string;
  value: [number, number];
  color: string;
}

const props = defineProps<UseStatBar>();
const getHPfullness = computed(() => {
  const result = (props.value[0] / props.value[1]) * 100;

  return `${result > 100 ? 100 : result}%`;
});
</script>

<template>
  <div class="bar">
    <div class="bar-color"></div>
    <div class="key">{{ name }}:</div>
    <div class="value">{{ value[0] }} / {{ value[1] }}</div>
  </div>
</template>

<style>
.bar {
  display: grid;
  grid-column: 2/4;
  grid-template-columns: 1fr 64px;
  grid-template-rows: 1fr;
  position: relative;
  margin: 2px 0;
}

.bar-color {
  position: absolute;
  grid-column: 1/4;
  width: v-bind(getHPfullness);
  height: 100%;
  z-index: -1;
  background-color: v-bind(color);
}
</style>
