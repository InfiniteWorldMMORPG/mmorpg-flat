<script setup lang="ts">
import { isNullOrUndefined } from '#lib/utils';

import { useGameStore } from '../stores';
import UserInfo from '../components/UserInfo.vue';
import SidebarCreatureList from '../components/SidebarCreatureList.vue';
import MiniMap from '../components/MiniMap.vue';
import BottomBar from '../components/BottomBar.vue';

const gameStore = useGameStore();

</script>

<template>
  <div class="layout">
    <UserInfo v-if="!isNullOrUndefined(gameStore.playerCreature)" :playerCreature="gameStore.playerCreature" />

    <div class="location"></div>

    <div v-if="!isNullOrUndefined(gameStore.playerLocation)" class="sidebar">
      <SidebarCreatureList
        class="creatureList"
        :playerLocation="gameStore.playerLocation"
      />
      <MiniMap
        class="minimap"
        :locations="gameStore.minimapLocations"
        :playerLocation="gameStore.playerLocation"
        @playerChangeGlobalLocation="gameStore.playerChangeGlobalLocation"
      />
    </div>

    <BottomBar
      class="bottombar"
      :skillBar="gameStore.skillBar"
    />
  </div>
</template>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  box-sizing: border-box;


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

.creatureList {
  grid-column: 1;
  grid-row: 1;
}

.minimap {
  grid-column: 1;
  grid-row: 2;
}

.bottombar {
  grid-column: 1;
  grid-row: 2;
}


</style>
