<script setup lang="ts">
import type { GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO } from '#lib/dto';
import { isNearbyCoordinates } from '#lib/utils';

interface MiniMapProps {
  locations: GlobalLocationFlatOutputDTO[];
  playerLocation: GlobalLocationOutputDTO;
}

const props = defineProps<MiniMapProps>();

const emit = defineEmits<{
  (eventName: 'playerChangeGlobalLocation', location: GlobalLocationFlatOutputDTO): void;
}>();

const playerChangeGlobalLocation = (location: GlobalLocationFlatOutputDTO): void => {
  emit('playerChangeGlobalLocation', location);
};

</script>

<template>
  <div :class="classes.Minimap">
    <div
      v-for="location in props.locations"
      :key="location.id"
      :class="{
        [classes['locationCell']]: true,
        [classes['impassable']]: !location.canMove,
        [classes['canMove']]: location.canMove
          && isNearbyCoordinates(props.playerLocation.coordinates, location.coordinates, 1)
          && location.id !== props.playerLocation.id,
      }"
      @click="playerChangeGlobalLocation(location)"
    >
    <span v-if="location.id === props.playerLocation.id">X</span>
    <span v-else :class="classes.coordinatesLabel">{{ location.coordinates[0] }} : {{ location.coordinates[1] }}</span>
    </div>
  </div>
</template>

<style scoped module="classes">
.Minimap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);

  .locationCell {
    border: 1px solid hsl(0deg 0% 0% / 100%);
    background: hsl(0deg 0% 100% / 40%);
    cursor: default;
    box-sizing: border-box;

    display: grid;
    place-items: center;
    user-select: none;
    position: relative;

    &.impassable {
      background-color: hsl(0deg 0% 0% / 100%);
      cursor: no-drop;
    }

    &.canMove {
      cursor: pointer;
    }

    .coordinatesLabel {
      position: absolute;
      z-index: 0;
      color: hsl(0deg 0% 100% / 40%);
    }
  }
}

</style>
