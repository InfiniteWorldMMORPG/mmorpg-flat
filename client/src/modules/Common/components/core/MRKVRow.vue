<script setup lang="ts">
interface MRKVRowProps {
  keyLabel: string;
  valueLabel: string | number | boolean;
}
const props = defineProps<MRKVRowProps>();

</script>

<template>
  <div :class="classes.MRKVRow">
    <span :class="classes.key">{{ props.keyLabel }}:</span>
    <span :class="classes.value">{{ props.valueLabel }}</span>
  </div>
</template>

<style scoped module="classes">
.MRKVRow {
  height: 32px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  gap: 8px;

  .key {
    place-self: center start;
  }

  .value {
    place-self: center end;
  }
}

</style>
