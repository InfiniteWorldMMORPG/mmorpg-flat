<script setup lang="ts">

interface SidebarCreatureListProps {
  playerLocation: GlobalLocationOutputDTO;
}

const props = defineProps<SidebarCreatureListProps>();

</script>

<template>
  <div :class="classes.CreatureList">
    <div :class="classes.header">Creatures on Location</div>
    <div
      v-for="creature in props.playerLocation.creatures"
      :key="creature.id"
      :class="classes.item"
    >
      {{creature.name}}
    </div>
  </div>
</template>

<style scoped module="classes">

.CreatureList {
  display: grid;
  grid-template-columns: 8px 1fr 8px;
  grid-template-rows: 40px;
  grid-auto-flow: row;
  grid-auto-rows: 28px;
  gap: 4px 0;

  place-items: center start;

  .header {
    grid-column: 1 / 4;
    grid-row: 1;
    place-self: stretch;
    display: grid;
    place-items: center;
    border: 1px solid black;
    border-style: solid;
    box-sizing: border-box;
  }

  .item {
    grid-column: 2;
  }
}

</style>
