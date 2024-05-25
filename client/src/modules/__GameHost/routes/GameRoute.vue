<script setup lang="ts">
import AvatarIcon from '../common/components/AvatarIcon.vue';


</script>

<template>
  <div class="layout">
    <div class="user-info">
      <div class="user-info-main">
        <div class="user-avatar">
          <AvatarIcon />
        </div>
        <div class="user-name" title="My Super NickName">My Super NickName</div>
        <div class="user-level">Level: 1</div>
        <div class="user-expirience bar">
          <div class="key">Exp:</div>
          <div class="value">0 / 5</div>
        </div>
        <div class="user-health-points bar">
          <div class="key">HP:</div>
          <div class="value">10 / 10</div>
        </div>
        <div class="user-move-points bar">
          <div class="key">Move points:</div>
          <div class="value">5 / 5</div>
        </div>
      </div>
      <div class="user-stats spoiler">
        <div class="spoiler-header">
          <span class="spoiler-toggle-btn">Stats</span>
          <div class="spoiler-toggle-btn">^</div>
        </div>
        <div class="user-stats-attack">Attack: 1</div>
        <div class="user-stats-armor">Armor: 0</div>
      </div>
    </div>
    <div class="location"></div>
    <div class="sidebar">
      <div class="creatures-list">
        <div class="creatures-list-header">Creatures on Location</div>
        <div class="creatures-list-item">User</div>
      </div>
      <div class="minimap">
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>

        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>

        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell">X</div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>

        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>

        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
        <div class="minimap-location-cell"></div>
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
  border: 1px solid black;
  box-sizing: border-box;

  display: grid;
  place-items: center;
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
