<script setup lang="ts">

interface BarProps {
  barColor: string;
  fillPercentages: number;
}
const props = defineProps<BarProps>();

</script>

<template>
  <div :class="classes.Bar">
    <slot></slot>
    <div :class="classes.background"></div>
  </div>
</template>

<style scoped module="classes">
.Bar {
  display: grid;
  position: relative;
  padding: 0 8px;

  .background {
    position: absolute;
    z-index: -1;
    height: 100%;
    width: v-bind(props.fillPercentages + '%');
    background-color: v-bind(props.barColor);
    transition: width 0.2s linear;
  }
}

</style>
