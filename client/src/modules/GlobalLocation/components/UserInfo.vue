<script setup lang="ts">
import type { CreatureOutputDTO } from '#lib/dto';

import { MRSpoiler, MRBar, MRKVRow, AvatarIcon } from '#modules/Common/components';


defineProps<{ playerCreature: CreatureOutputDTO }>();

const BAR_COLORS = {
  hp: 'hsl(120deg 100% 50%)',
  movePoints: 'hsl(240deg 100% 50%)',
  exp: 'hsl(0deg 0% 49.75% / 50%)',
};
</script>

<template>
  <div :class="classes.UserInfo">
    <div :class="classes.base">
      <AvatarIcon :class="classes.avatar"/>
      <div :class="classes.userName" :title="playerCreature.name">
        {{ playerCreature.name }}
      </div>
      <div :class="classes.userLevel">Level: {{ playerCreature.level }}</div>
      <MRBar
        :barColor="BAR_COLORS.exp"
        :fill-percentages="playerCreature.currentStats.exp / playerCreature.maxStats.exp * 100"
        :class="classes.expBar"
      >
        <MRKVRow keyLabel="Exp" :valueLabel="`${playerCreature.currentStats.exp} / ${playerCreature.maxStats.exp}`" />
      </MRBar>
      <MRBar
        :barColor="BAR_COLORS.hp"
        :fill-percentages="playerCreature.currentStats.healthPoints / playerCreature.maxStats.healthPoints * 100"
        :class="classes.healthBar"
      >
        <MRKVRow keyLabel="Health" :valueLabel="`${playerCreature.currentStats.healthPoints} / ${playerCreature.maxStats.healthPoints}`" />
      </MRBar>
      <MRBar
        :barColor="BAR_COLORS.movePoints"
        :fill-percentages="playerCreature.currentStats.movePoints / playerCreature.maxStats.movePoints * 100"
        :class="classes.movePointBar"
      >
        <MRKVRow keyLabel="Move points" :valueLabel="`${playerCreature.currentStats.movePoints} / ${playerCreature.maxStats.movePoints}`" />
      </MRBar>
    </div>

    <MRSpoiler headerLabel="Stats" :bodyClass="classes['user-stats']">
      <MRKVRow keyLabel="Attack" :valueLabel="playerCreature.currentStats.attack" />
      <MRKVRow keyLabel="Armor" :valueLabel="playerCreature.currentStats.armor" />
    </MRSpoiler>
  </div>
</template>

<style scoped module="classes">
.UserInfo {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 264px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  gap: 32px 0px;

  .base {
    grid-column: 1;
    grid-row: 1;

    display: grid;
    grid-template-columns: 64px 128px 64px;
    grid-template-rows: 32px 32px 32px 32px auto;
    gap: 4px;

    border-radius: 8px;
    overflow: hidden;

    background: hsl(220deg 100% 50% / 40%);

    .avatar {
      grid-column: 1;
      grid-row: 1/3;

      place-self: center;

      box-sizing: border-box;
      padding: 4px;
    }

    .userName {
      grid-column: 2;
      grid-row: 1;

      text-overflow: ellipsis;
      text-wrap: nowrap;
      overflow: hidden;
    }

    .userLevel {
      grid-column: 3;
      grid-row: 1;
    }

    .expBar {
      grid-column: 2 / 4;
    }
    .healthBar {
      grid-column: 1 / 4;
    }
    .movePointBar {
      grid-column: 1 / 4;
    }
  }

  .userStats {
    grid-column: 1;
    grid-row: 2;
  }
}

</style>
