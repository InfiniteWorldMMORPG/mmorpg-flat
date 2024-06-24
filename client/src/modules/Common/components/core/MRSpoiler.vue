<script setup lang="ts">
import { ref } from 'vue';

import { ChevronDownIcon, ChevronUpIcon } from '../Icons';

interface MRSpoilerProps {
  headerLabel: string;
  bodyClass?: string;
}
const props = defineProps<MRSpoilerProps>();

const isOpen = ref(false);
const changeSpoiler = () => {
  isOpen.value = !isOpen.value;
};

</script>

<template>
  <div :class="classes.MRSpoiler">
    <div :class="classes.header" @click="changeSpoiler">
      <span :class="classes.label">{{ props.headerLabel }}</span>
      <ChevronDownIcon v-if="!isOpen" :class="classes.icon"/>
      <ChevronUpIcon v-else :class="classes.icon"/>
    </div>
    <div v-if="isOpen" :class="[classes.body, props.bodyClass]">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped module="classes">
.MRSpoiler {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px auto;
  gap: 8px;

  .header {
    display: grid;
    grid-template-columns: 1fr 48px;
    grid-template-rows: 1fr;
    cursor: pointer;
    fill: currentColor;
    user-select: none;

    .label {
      place-self: center start;
    }

    .icon {
      width: 24px;
      height: 24px;
      place-self: center;
    }
  }

  .body {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
  }
}

</style>
