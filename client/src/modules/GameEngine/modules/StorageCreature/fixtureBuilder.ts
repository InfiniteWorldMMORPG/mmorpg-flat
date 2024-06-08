import { centerMapLocation } from '#ge-modules/StorageGlobalMap/fixtureBuilder';
import { createUUIDv4, type UUIDv4 } from '#lib/utils';

import type { Creature, CreatureSkill, CreatureTemplate, CreatureTemplateSkill, Skill } from './@types';

export const buildCreatureTemplate = (data: Omit<CreatureTemplate, 'id' | 'createdAt' | 'updatedAt'>): CreatureTemplate => {
  return {
    id: createUUIDv4(),
    name: data.name,
    avatarURL: data.avatarURL,
    level: data.level,
    maxStats: data.maxStats,
    initCurrentStats: data.initCurrentStats,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const triangleCreatureTemplate = buildCreatureTemplate({
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
  initCurrentStats: {
    exp: 0,
    healthPoints: 3,
    attack: 1,
    armor: 1,
    movePoints: 0,
    movePointsRegeneration: 0,
    actionPoints: 1,
  },
});

export const playerCreatureTemplate = buildCreatureTemplate({
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
  initCurrentStats: {
    exp: 0,
    healthPoints: 5,
    attack: 1,
    armor: 0,
    movePoints: 5,
    movePointsRegeneration: 1,
    actionPoints: 2,
  },
});

export const buildSkill = (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Skill => {
  return {
    id: createUUIDv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  };
};

export enum SkillType {
  ATTACK = 'ATTACK',
  HEAL = 'HEAL',
  MOVE = 'MOVE',
}

export const battleBaseAttackSkill = buildSkill({
  slug: 'BattleBaseAttack',
  name: 'Базовая атака',
  description: '',
  cooldown: 0,
  type: SkillType.ATTACK,
  iconURL: '!COMPONENT=AttackIcon',
});

export const battleBaseHealSkill = buildSkill({
  slug: 'BattleBaseHeal',
  name: 'Базовое лечение',
  description: '',
  cooldown: 2,
  type: SkillType.HEAL,
  iconURL: '!COMPONENT=HealIcon',
});

export const battleMoveSkill = buildSkill({
  slug: 'BattleMove',
  name: 'Идти',
  description: '',
  cooldown: 0,
  type: SkillType.MOVE,
  iconURL: '!COMPONENT=MoveIcon',
});

export const globalMoveSkill = buildSkill({
  slug: 'GlobalMove',
  name: 'Перейти',
  description: '',
  cooldown: 0,
  type: SkillType.MOVE,
  iconURL: '!COMPONENT=MoveIcon',
});

export const globalAttackSkill = buildSkill({
  slug: 'GlobalAttack',
  name: 'Напасть',
  description: '',
  cooldown: 0,
  type: SkillType.ATTACK,
  iconURL: '!COMPONENT=StartBattleIcon',
});

export const buildCreatureTemplateSkillRelation = (creatureTemplateId: UUIDv4, skillId: UUIDv4): CreatureTemplateSkill => {
  return {
    id: createUUIDv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    creatureTemplateId,
    skillId,
  };
};

export const creatureTriangleTemplateSkills = [
  buildCreatureTemplateSkillRelation(triangleCreatureTemplate.id, battleBaseAttackSkill.id),
  buildCreatureTemplateSkillRelation(triangleCreatureTemplate.id, battleMoveSkill.id),
];

export const creaturePlayerTemplateSkills = [
  buildCreatureTemplateSkillRelation(playerCreatureTemplate.id, battleBaseAttackSkill.id),
  buildCreatureTemplateSkillRelation(playerCreatureTemplate.id, battleBaseHealSkill.id),
  buildCreatureTemplateSkillRelation(playerCreatureTemplate.id, battleMoveSkill.id),
  buildCreatureTemplateSkillRelation(playerCreatureTemplate.id, globalMoveSkill.id),
  buildCreatureTemplateSkillRelation(playerCreatureTemplate.id, globalAttackSkill.id),
];

export const buildCreature = (
  template: CreatureTemplate,
  name: string,
  locationId: string,
  id: UUIDv4 = createUUIDv4(),
): Creature => {
  return {
    id,
    name: name,
    avatarURL: template.avatarURL,
    level: template.level,
    maxStats: structuredClone(template.maxStats),
    currentStats: structuredClone(template.initCurrentStats),
    templateId: template.id,
    globalLocationId: locationId,
    battleId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const buildCreatureSkill = (creatureId: UUIDv4, skillId: UUIDv4): CreatureSkill => {
  return {
    id: createUUIDv4(),
    creatureId,
    skillId,
    cooldown: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const buildCreatureSkillRelationList = (creatureId: UUIDv4, creatureTemplateSkillList: CreatureTemplateSkill[]): CreatureSkill[] => {
  return creatureTemplateSkillList.map(({ skillId }) => buildCreatureSkill(creatureId, skillId));
};

export const player = buildCreature(playerCreatureTemplate, '3@H@T0P', centerMapLocation.id, 'bbc932e0-e3fa-42ca-9446-1528c8f47e8e');
export const playerSkills = buildCreatureSkillRelationList(player.id, creaturePlayerTemplateSkills);

