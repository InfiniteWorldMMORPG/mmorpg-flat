<script setup lang="ts">
import { IntentionType, type GlobalIntention, type GlobalLocation } from '../stores/@types';
import { isNearbyLocation, useGameStore } from '../stores';

import AvatarIcon from '../common/components/AvatarIcon.vue';
import { createUUIDv4, isNullOrUndefined } from '../../Common/utils';
import { skills } from '../api/fixtures';

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
    <div class="user-info">
      <div class="user-info-main">
        <div class="user-avatar">
          <AvatarIcon />
        </div>
        <div class="user-name" :title="gameStore.playerCreature?.name">{{ gameStore.playerCreature?.name }}</div>
        <div class="user-level">Level: {{ gameStore.playerCreature?.level }}</div>
        <div class="user-expirience bar">
          <div class="key">Exp:</div>
          <div class="value">
            {{ gameStore.playerCreature?.currentStats.exp }} / {{ gameStore.playerCreature?.maxStats.exp }}
          </div>
        </div>
        <div class="user-health-points bar">
          <div class="key">HP:</div>
          <div class="value">
            {{ gameStore.playerCreature?.currentStats.healthPoints}} / {{gameStore.playerCreature?.maxStats.healthPoints }}
          </div>
        </div>
        <div class="user-move-points bar">
          <div class="key">Move points:</div>
          <div class="value">
            {{ gameStore.playerCreature?.currentStats.movePoints }} / {{ gameStore.playerCreature?.maxStats.movePoints }}
          </div>
        </div>
      </div>
      <div class="user-stats spoiler">
        <div class="spoiler-header">
          <span class="spoiler-toggle-btn">Stats</span>
          <div class="spoiler-toggle-btn">^</div>
        </div>
        <div class="user-stats-attack">Attack: {{ gameStore.playerCreature?.currentStats.attack }}</div>
        <div class="user-stats-armor">Armor: {{ gameStore.playerCreature?.currentStats.armor }}</div>
      </div>
    </div>
    <div class="location"></div>
    <div class="sidebar">
      <div class="creatures-list">
        <div class="creatures-list-header">Creatures on Location</div>
        <div class="creatures-list-item">User</div>
      </div>
      <div class="minimap">
        <div
          v-for="location in gameStore.minimapLocations"
          :key="location.id"
          :class="{
            'minimap-location-cell': true,
            'minimap-location-cell-impassable': !location.canMove,
            'minimap-location-cell-can-move': location.canMove && isNearbyLocation(gameStore.playerLocation, location, 1),
          }"
          @click="playerChangeGlobalLocation(location)"
        >
          <span v-if="location.id === gameStore.playerCreature?.locationId">X</span>
        </div>
      </div>
    </div>
    <div class="bottombar">
      <div class="skill-bar">
        <div
          v-for="location in gameStore.minimapLocations"
          class="skill-bar-cell"
        ></div>
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

.bar {
  display: grid;
  grid-template-columns: 1fr 64px;
  grid-template-rows: 1fr;
}

.spoiler-header {
  display: grid;
  grid-template-columns: 1fr 32px;
  grid-template-rows: 1fr;
}

.user-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 256px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  gap: 32px 0px;
}

.user-info-main {
  grid-column: 1;
  grid-row: 1;

  display: grid;
  grid-template-columns: 64px 128px 64px;
  grid-template-rows: 32px 32px 32px 32px auto;

  background: hsl(220deg 100% 50% / 40%);
}

.user-avatar {
  grid-column: 1;
  grid-row: 1/3;

  display: grid;
  place-items: center;

  padding: 4px;
}

.user-name {
  grid-column: 2;
  grid-row: 1;

  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
}

.user-level {
  grid-column: 3;
  grid-row: 1;
}

.user-expirience {
  grid-column: 2/4;
  grid-row: 2;
}

.user-health-points {
  grid-column: 2/4;
  grid-row: 3;
}

.user-move-points {
  grid-column: 2/4;
  grid-row: 4;
}

.user-stats {
  grid-column: 1;
  grid-row: 2;
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
