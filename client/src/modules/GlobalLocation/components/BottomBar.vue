<script setup lang="ts">
import { isNullOrUndefined } from '#lib/utils';

import * as Icons from '#modules/Common/components/Icons';

import type { SkillBar } from '../stores/@types/SkillBar';

interface BottomBarProps {
  skillBar: SkillBar;
}

const props = defineProps<BottomBarProps>();

const isValidIconComponentName = (iconURL: string): boolean => {
  if (!iconURL.startsWith('!COMPONENT=')) return false;

  const iconComponentName = iconURL.replace('!COMPONENT=', '');

  return iconComponentName in Icons;
};

const getIconComponent = (iconURL: string): typeof Icons[keyof typeof Icons] => {
  const iconComponentName = iconURL.replace('!COMPONENT=', '');

  const component = Icons[iconComponentName as keyof typeof Icons];

  if (isNullOrUndefined(component)) throw new Error(`Component with name ${iconComponentName} not found`);

  return component;
};

</script>

<template>
  <div :class="classes.BottomBar">
      <div :class="classes.skillBar">
        <template v-for="cell in props.skillBar.cells" :key="cell.id">
          <div :class="{
            [classes.cell]: true,
            [classes.active]: !isNullOrUndefined(cell.skill)
          }">
          <template v-if="!isNullOrUndefined(cell.skill)">
            <component
              v-if="isValidIconComponentName(cell.skill.skill.iconURL)"
              :is="getIconComponent(cell.skill.skill.iconURL)"
              class="icon"
            />
            <div v-else :class="classes.cell">{{ cell.skill.skill.name }}</div>
          </template>
          </div>
        </template>
      </div>
      <div class="item-bar">
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
        <div class="item-bar-cell"></div>
      </div>
    </div>
</template>

<style scoped module="classes">
.BottomBar {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  background: white;

  .cell {
    width: 100%;
    height: 100%;
    padding: 6px;
    place-self: center;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 8px;
    &.active {
      &:hover {
        background-color: hsl(0deg 0% 0% / 40%);
      }
    }
  }

  .skillBar {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 56px;
    grid-template-columns: repeat(5, 1fr);
    place-items: stretch;
    color: black;
    padding: 4px;
    box-sizing: border-box;
    gap: 4px;

    .cell {
      width: 100%;
      height: 100%;
      padding: 6px;
      place-self: center;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 8px;
      &:hover {
        background-color: hsl(0deg 0% 0% / 40%);
      }
    }
  }
  .itemBar {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 56px;
    grid-template-columns: repeat(5, 1fr);
    place-items: stretch;
    color: black;
    padding: 4px;
    box-sizing: border-box;
    gap: 4px;

    .cell {
      width: 100%;
      height: 100%;
      padding: 6px;
      place-self: center;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 8px;
      &:hover {
        background-color: hsl(0deg 0% 0% / 40%);
      }
    }
  }

}

</style>
