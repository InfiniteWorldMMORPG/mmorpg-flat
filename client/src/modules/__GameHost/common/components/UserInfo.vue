<script setup lang="ts">
import SpoilerStats from './SpoilerStats.vue';
import TheStat from './TheStat.vue';
import TheStatBar from './TheStatBar.vue';
import AvatarIcon from './AvatarIcon.vue';
import { useGameStore } from '../../stores';
import { computed } from 'vue';

const gameStore = useGameStore();

const userStatsKeys = [
  { name: 'Exp', PlayerCreatureName: 'exp' },
  { name: 'HP', PlayerCreatureName: 'healthPoints' },
  { name: 'Move points', PlayerCreatureName: 'movePoints' },
];
const userStats = computed(() => {
  return userStatsKeys.map(({ name, PlayerCreatureName }) => {
    return {
      name,
      value: [
        gameStore.playerCreature?.currentStats[PlayerCreatureName],
        gameStore.playerCreature?.maxStats[PlayerCreatureName]],
    };
  });
});
</script>

<template>
  <div class="user-info">
    <div class="user-info-main">
      <div class="user-avatar">
        <AvatarIcon />
      </div>
      <div class="user-name" :title="gameStore.playerCreature?.name">
        {{ gameStore.playerCreature?.name }}
      </div>
      <div class="user-level">Level: {{ gameStore.playerCreature?.level }}</div>
      <TheStatBar v-for="stat in userStats" :key="stat.name" :name="stat.name" :value="stat.value" />
    </div>

    <SpoilerStats header="Stats">
      <TheStat name="Attack" :value="gameStore.playerCreature?.currentStats.healthPoints" />
      <TheStat name="Armor" :value="gameStore.playerCreature?.currentStats.healthPoints" />
    </SpoilerStats>
  </div>
</template>

<style>
.bar {
  display: grid;
  grid-column: 2/4;
  grid-template-columns: 1fr 64px;
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

.user-stats {
  grid-column: 1;
  grid-row: 2;
}
</style>
