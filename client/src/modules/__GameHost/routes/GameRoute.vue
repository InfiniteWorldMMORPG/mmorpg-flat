<script setup lang="ts">
import { isNullOrUndefined, isNearbyLocation, isNearbyCoordinates } from '#lib/utils';

import type { GlobalIntentionInputDTO, GlobalLocationFlatOutputDTO } from '#lib/dto';

import { useGameStore } from '../stores';
import UserInfo from '../common/components/UserInfo.vue';

const gameStore = useGameStore();

const playerChangeGlobalLocation = (location: GlobalLocationFlatOutputDTO): void => {
  const player = gameStore.playerCreature;
  if (isNullOrUndefined(player)) return;

  if (player.location.id === location.id) return;

  const creatureSkill = player.skills.find((creatureSkill) => creatureSkill.skill.slug === 'GlobalMove');
  if (isNullOrUndefined(creatureSkill)) return;

  const intention: GlobalIntentionInputDTO = {
    sourceCreatureId: player.id,
    targetCreatureId: null,
    targetGlobalLocationId: location.id,
    skillId: creatureSkill.skill.id,
  };

  gameStore.applyGlobalIntention(intention);
};

</script>

<template>
  <div class="layout">
    <UserInfo v-if="!isNullOrUndefined(gameStore.playerCreature)" :playerCreature="gameStore.playerCreature" />
    <div class="location"></div>
    <div class="sidebar">
      <div class="creatures-list">
        <div class="creatures-list-header">Creatures on Location</div>
        <div class="creatures-list-item">User</div>
      </div>
      <div v-if="!isNullOrUndefined(gameStore.playerLocation)" class="minimap">
        <div
          v-for="location in gameStore.minimapLocations"
          :key="location.id"
          :class="{
            'minimap-location-cell': true,
            'minimap-location-cell-impassable': !location.canMove,
            'minimap-location-cell-can-move': location.canMove
              && isNearbyCoordinates(gameStore.playerLocation.coordinates, location.coordinates, 1)
              && location.id !== gameStore.playerLocation?.id,
          }"
          @click="playerChangeGlobalLocation(location)"
        >
        <span v-if="location.id === gameStore.playerLocation.id">X</span>
        <span v-else class="minimap-location-coordinates">{{ location.coordinates[0] }} : {{ location.coordinates[1] }}</span>
        </div>
      </div>
    </div>
    <div class="bottombar">
      <div class="skill-bar">
        <div
          v-for="creatureSkill in gameStore.playerCreature?.skills ?? []"
          :key="creatureSkill.id"
          class="skill-bar-cell"
        >{{ creatureSkill.skill.name }}</div>
      </div>
      <div class="item-bar">
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 256px;
  grid-template-rows: 1fr 64px;
  position: relative;
}

.location {
  grid-column: 1;
  grid-row: 1;
}

.sidebar {
  grid-column: 2;
  grid-row: 1/3;

  display: grid;
  grid-template-rows: 1fr 256px;
  grid-template-columns: 1fr;

  background: blue;
}

.creatures-list {
  grid-column: 1;
  grid-row: 1;
  margin: 10px;
}

.minimap {
  grid-column: 1;
  grid-row: 2;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.minimap-location-cell {
  border: 1px solid hsl(0deg 0% 0% / 100%);
  background: hsl(0deg 0% 100% / 40%);
  cursor: default;
  box-sizing: border-box;

  display: grid;
  place-items: center;
  user-select: none;
  position: relative;
}

.minimap-location-cell-impassable {
  background-color: hsl(0deg 0% 0% / 100%);
  cursor: no-drop;
}

.minimap-location-cell-can-move {
  cursor: pointer;
}

.minimap-location-coordinates {
  position: absolute;
  z-index: 0;
  color: hsl(0deg 0% 100% / 40%);
}

.bottombar {
  grid-column: 1;
  grid-row: 2;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  background: white;
}

.skill-bar {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  color: black;
}

</style>
