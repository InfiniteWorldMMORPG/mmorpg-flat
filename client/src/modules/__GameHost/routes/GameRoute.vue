<script setup lang="ts">
import { IntentionType, type GlobalIntention, type GlobalLocation } from '../stores/@types';
import { isNearbyLocation, useGameStore } from '../stores';
import UserInfo from '../common/components/UserInfo.vue';

import { createUUIDv4, isNullOrUndefined } from '../utils';
import { skills } from '../stores/fixtures';

const gameStore = useGameStore();

gameStore.init();

setInterval(() => {
  if (gameStore.playerCreature !== null) {
    gameStore.playerCreature.currentStats.healthPoints += Number(Math.random() < 0.5) * 2 - 1;
  }
}, 5000);

const playerChangeGlobalLocation = (location: GlobalLocation): void => {
  const skill = Object.values(skills).find(skill => skill.slug === 'GlobalMove');
  if (isNullOrUndefined(skill)) return;

  if (isNullOrUndefined(gameStore.playerCreature)) return;

  const intention: GlobalIntention = {
    id: createUUIDv4(),
    sourceCreatureId: gameStore.playerCreature.id,
    targetCreatureId: null,
    targetLocationId: location.id,
    type: IntentionType.TARGET_TO_LOCATION,
    skillId: skill.id,
  };

  gameStore.runGlobalIntention(intention);
};

</script>

<template>
  <div class="layout">
    <UserInfo :playerCreature="gameStore.playerCreature" />
    <div class="location"></div>
    <div class="sidebar">
      <div class="creatures-list">
        <div class="creatures-list-header">Creatures on Location</div>
        <div class="creatures-list-item">User</div>
      </div>
      <div class="minimap">
        <div v-for="location in gameStore.minimapLocations" :key="location.id" :class="{
          'minimap-location-cell': true,
          'minimap-location-cell-impassable': !location.canMove,
          'minimap-location-cell-can-move': location.canMove && isNearbyLocation(gameStore.playerLocation, location, 1),
        }" @click="playerChangeGlobalLocation(location)">
          <span v-if="location.id === gameStore.playerCreature?.locationId">X</span>
        </div>
      </div>
    </div>
    <div class="bottombar">
      <div class="skill-bar">
        <div class="skill-bar-cell"></div>
        <div class="skill-bar-cell"></div>
        <div class="skill-bar-cell"></div>
        <div class="skill-bar-cell"></div>
        <div class="skill-bar-cell"></div>
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
}

.minimap-location-cell-impassable {
  background-color: hsl(0deg 0% 0% / 100%);
  cursor: no-drop;
}

.minimap-location-cell-can-move {
  cursor: pointer;
}

.bottombar {
  grid-column: 1;
  grid-row: 2;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  background: white;
}
</style>
