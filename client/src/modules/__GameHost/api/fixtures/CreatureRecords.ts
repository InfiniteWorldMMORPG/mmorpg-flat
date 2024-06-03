import { createUUIDv4, isNullOrUndefined } from '#modules/Common';

import type { CreatureTemplate, CreatureSpawnerTemplate, GlobalLocation, Battle, Creature } from '../../stores/@types';
import { basePlayerSpawnLocation } from './GlobalMap';
import { skillMap, standartBattleSkillList } from './SkillRecords';


export const creatureTemplates: Record<CreatureTemplate['id'], CreatureTemplate> = {
  [createUUIDv4()]: {
    id: '',
    name: 'triangle',
    avatarURL: '',
    level: 1,
    maxStats: {
      exp: 0,
      healthPoints: 3,
      attack: 1,
      armor: 1,
      movePoints: 0,
      movePointsRegeneration: 0,
      actionPoints: 1,
    },
    skills: standartBattleSkillList.map((skill) => ({ id: createUUIDv4(), skillId: skill.id, cooldown: 0 })),
  },
  [createUUIDv4()]: {
    id: '',
    name: 'Player X',
    avatarURL: '',
    level: 1,
    maxStats: {
      exp: 3,
      healthPoints: 5,
      attack: 1,
      armor: 0,
      movePoints: 5,
      movePointsRegeneration: 1,
      actionPoints: 2,
    },
    skills: Object.values(skillMap).map((skill) => ({ id: createUUIDv4(), skillId: skill.id, cooldown: 0 })),
  },
};

for (const [id, value] of Object.entries(creatureTemplates)) value.id = id;

const triangleCreatureTemplate = Object.values(creatureTemplates).find((creatureTemplate) => creatureTemplate.name === 'triangle');
if (isNullOrUndefined(triangleCreatureTemplate)) throw new Error('No triangle creature template');

const playerCreatureTemplate = Object.values(creatureTemplates).find((creatureTemplate) => creatureTemplate.name === 'Player X');
if (isNullOrUndefined(playerCreatureTemplate)) throw new Error('No player creature template');

export const creatureSpawnerTemplates: Record<CreatureSpawnerTemplate['id'], CreatureSpawnerTemplate> = {
  [createUUIDv4()]: {
    id: '',
    level: 1,
    spawnInterval: 1000,
    spawnCount: 1,
    creatureTemplateId: triangleCreatureTemplate.id,
  },
};

for (const [id, value] of Object.entries(creatureSpawnerTemplates)) value.id = id;


export const createCreatureByTemplate = (creatureTemplate: CreatureTemplate, location: GlobalLocation, battle?: Battle): Creature => ({
  id: createUUIDv4(),
  templateId: creatureTemplate.id,
  name: creatureTemplate.name,
  avatarURL: creatureTemplate.avatarURL,
  level: creatureTemplate.level,
  maxStats: creatureTemplate.maxStats,
  currentStats: {
    exp: 0,
    healthPoints: creatureTemplate.maxStats.healthPoints,
    attack: creatureTemplate.maxStats.attack,
    armor: creatureTemplate.maxStats.armor,
    movePoints: creatureTemplate.maxStats.movePoints,
    movePointsRegeneration: creatureTemplate.maxStats.movePointsRegeneration,
    actionPoints: creatureTemplate.maxStats.actionPoints,
  },
  skills: creatureTemplate.skills,
  locationId: location.id,
  battleId: battle?.id ?? null,
});


export const mainPlayerCreature = createCreatureByTemplate(playerCreatureTemplate, basePlayerSpawnLocation);
mainPlayerCreature.name = '3@H@T0P';

export const creatures: Record<Creature['id'], Creature> = {
  [mainPlayerCreature.id]: mainPlayerCreature,
};
