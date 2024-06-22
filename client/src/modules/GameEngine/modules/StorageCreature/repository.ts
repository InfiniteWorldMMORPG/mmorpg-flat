import { typeKey, type UUIDv4 } from '#lib/utils';

import type {
  Creature, CreatureSkill,
  CreatureSpawner, CreatureSpawnerTemplate,
  CreatureTemplate, CreatureTemplateSkill,
  Skill,
} from './@types';
import { CreatureRepositoryTypeSymbol } from './constants';
import {
  battleBaseAttackSkill,
  battleBaseHealSkill,
  battleMoveSkill,
  creaturePlayerTemplateSkills,
  creatureTriangleTemplateSkills,
  globalAttackSkill,
  globalMoveSkill,
  player,
  playerCreatureTemplate, playerSkills, triangleCreatureTemplate
} from './fixtureBuilder';

const skillStorage: Map<UUIDv4, Skill> = new Map();
const creatureTemplateStorage: Map<UUIDv4, CreatureTemplate> = new Map();
const creatureTemplateSkillStorage: Map<UUIDv4, CreatureTemplateSkill> = new Map();
const creatureStorage: Map<UUIDv4, Creature> = new Map();
const creatureSkillStorage: Map<UUIDv4, CreatureSkill> = new Map();
const creatureSpawnerTemplateStorage: Map<UUIDv4, CreatureSpawnerTemplate> = new Map();
const creatureSpawnerStorage: Map<UUIDv4, CreatureSpawner> = new Map();

const init = () => {
  creatureTemplateStorage.set(triangleCreatureTemplate.id, triangleCreatureTemplate);
  creatureTemplateStorage.set(playerCreatureTemplate.id, playerCreatureTemplate);

  skillStorage.set(battleBaseAttackSkill.id, battleBaseAttackSkill);
  skillStorage.set(battleBaseHealSkill.id, battleBaseHealSkill);
  skillStorage.set(battleMoveSkill.id, battleMoveSkill);
  skillStorage.set(globalMoveSkill.id, globalMoveSkill);
  skillStorage.set(globalAttackSkill.id, globalAttackSkill);

  creatureTriangleTemplateSkills.forEach(
    (creatureTemplateSkill) => creatureTemplateSkillStorage.set(creatureTemplateSkill.id, creatureTemplateSkill),
  );
  creaturePlayerTemplateSkills.forEach(
    (creatureTemplateSkill) => creatureTemplateSkillStorage.set(creatureTemplateSkill.id, creatureTemplateSkill),
  );

  creatureStorage.set(player.id, player);
  playerSkills.forEach((creatureSkill) => creatureSkillStorage.set(creatureSkill.id, creatureSkill));

};

const getFlatCreatureById = async (id: UUIDv4): Promise<Creature | null> => {
  return creatureStorage.get(id) ?? null;
};

const findCreatureByGlobalLocationId = async (locationId: UUIDv4): Promise<Creature[]> => {
  const result = [];

  for (const creature of creatureStorage.values()) {
    if (creature.globalLocationId === locationId) result.push(creature);
  }

  return result;
};

const getFullCreatureById = async (id: UUIDv4): Promise<Creature | null> => {
  return null;
};

const updateCreature = async (creature: Creature): Promise<void> => {
  creatureStorage.set(creature.id, creature);
};

const getSkillsByCreatureId = async (creatureId: UUIDv4): Promise<Array<CreatureSkill & { skill: Skill }>> => {
  const result: Array<CreatureSkill & { skill: Skill }> = [];
  for (const creatureSkill of creatureSkillStorage.values()) {
    if (creatureSkill.creatureId === creatureId) result.push({ ...creatureSkill, skill: skillStorage.get(creatureSkill.skillId)! });
  }
  return result;
};

const getSkillById = async (id: UUIDv4): Promise<Skill | null> => {
  return skillStorage.get(id) ?? null;
};

const findCreatureSkill = async (creatureId: UUIDv4, skillId: UUIDv4): Promise<[CreatureSkill | null, Skill | null]> => {
  for (const creatureSkill of creatureSkillStorage.values()) {
    if (creatureSkill.creatureId === creatureId && creatureSkill.skillId === skillId) {
      const skill = await getSkillById(creatureSkill.skillId);
      return [creatureSkill, skill];
    }
  }
  return [null, null];
};

export const getCreatureRepository = () => {
  init();
  return <const>{
    [typeKey]: CreatureRepositoryTypeSymbol,
    getFlatCreatureById,
    updateCreature,
    getSkillsByCreatureId,
    findCreatureSkill,
    findCreatureByGlobalLocationId,
  };
};

export type CreatureRepository = ReturnType<typeof getCreatureRepository>;
