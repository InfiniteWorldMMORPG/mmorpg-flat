<script setup lang="ts">
import { MRSpoiler, MRBar, MRKVRow } from '#modules/Common/components/core';
import { ref } from 'vue';

const health = ref({
  current: 0,
  max: 10,
});

setInterval(() => {
  if (health.value.current < health.value.max) {
    health.value.current += 1;
  } else {
    health.value.current = 0;
  }
}, 1000);

</script>

<template>
  <div class="layout">
    <main>
      Home
    </main>

    <MRSpoiler headerLabel="Stats" class="tmp" bodyClass="tmp2">
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </MRSpoiler>

    <MRBar barColor="red" :fillPercentages="health.current / health.max * 100" >
      <MRKVRow keyLabel="Health" :valueLabel="`${health.current} / ${health.max}`" />
    </MRBar>
  </div>
</template>

<style scoped>

.tmp {
  width: 500px;
}

.layout {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

:deep(.tmp2) {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 48px);
  gap: 8px;
  place-items: center start;
}

</style>
