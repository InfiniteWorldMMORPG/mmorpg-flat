<script setup lang="ts">
import { ref } from 'vue';
defineProps({
  header: { type: String, required: true },
});

const isOpen = ref(false);
const changeSpoiler = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="spoiler">
    <div class="spoiler-header" @click="changeSpoiler">
      <span class="spoiler-toggle-btn">{{ header }}</span>
      <div class="spoiler-toggle-arrow"> {{isOpen ? '˄' : '˅' }}</div>
    </div>
    <div class="spoiler-body" v-if="isOpen">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.spoiler-header {
  display: grid;
  grid-template-columns: 1fr 32px;
  grid-template-rows: 1fr;
  cursor: pointer;
}
.spoiler-toggle-arrow{
  display: flex;
  justify-content: right;
}
</style>
