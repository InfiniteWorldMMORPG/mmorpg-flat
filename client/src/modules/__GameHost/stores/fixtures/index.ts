import { isNullOrUndefined } from '../../utils';
import { createUUIDv4 } from '../../utils/uuid';
import {
  type BattleMapTemplate, type Creature, type CreatureSpawner,
  type CreatureSpawnerTemplate, type CreatureTemplate,
  type GlobalLocation, type GlobalMap, type Skill,
  SkillType,
  type Battle,
} from '../@types';

export const battleMapTemplates: Record<BattleMapTemplate['id'], BattleMapTemplate> = {
  '1': {
    id: '1',
    size: [5, 5],
    locations: [
      { id: '1', coordinates: [0, 0] },
      { id: '2', coordinates: [0, 1] },
      { id: '3', coordinates: [0, 2] },
      { id: '4', coordinates: [0, 3] },
      { id: '5', coordinates: [0, 4] },

      { id: '6', coordinates: [1, 0] },
      { id: '7', coordinates: [1, 1] },
      { id: '8', coordinates: [1, 2] },
      { id: '9', coordinates: [1, 3] },
      { id: '10', coordinates: [1, 4] },

      { id: '11', coordinates: [2, 0] },
      { id: '12', coordinates: [2, 1] },
      { id: '13', coordinates: [2, 2] },
      { id: '14', coordinates: [2, 3] },
      { id: '15', coordinates: [2, 4] },

      { id: '16', coordinates: [3, 0] },
      { id: '17', coordinates: [3, 1] },
      { id: '18', coordinates: [3, 2] },
      { id: '19', coordinates: [3, 3] },
      { id: '20', coordinates: [3, 4] },

      { id: '21', coordinates: [4, 0] },
      { id: '22', coordinates: [4, 1] },
      { id: '23', coordinates: [4, 2] },
      { id: '24', coordinates: [4, 3] },
      { id: '25', coordinates: [4, 4] },
    ],
  },
};

for (const [id, value] of Object.entries(battleMapTemplates)) value.id = id;

export const skills: Record<Skill['id'], Skill> = {
  [createUUIDv4()]: {
    id: '',
    slug: 'BattleBaseAttack',
    name: 'Базовая атака',
    description: '',
    cooldown: 0,
    type: SkillType.ATTACK,
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'BattleBaseHeal',
    name: 'Базовое лечение',
    description: '',
    cooldown: 2,
    type: SkillType.HEAL,
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'BattleMove',
    name: 'Идти',
    description: '',
    cooldown: 0,
    type: SkillType.MOVE,
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'GlobalMove',
    name: 'Перейти',
    description: '',
    cooldown: 0,
    type: SkillType.MOVE,
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'GlobalAttack',
    name: 'Напасть',
    description: '',
    cooldown: 0,
    type: SkillType.ATTACK,
  },
};

for (const [id, value] of Object.entries(skills)) value.id = id;

const standartSkills = Object.values(skills).filter((skill) => ['BattleBaseAttack', 'BattleMove'].includes(skill.slug));

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
    skills: standartSkills.map((skill) => ({ id: createUUIDv4(), skillId: skill.id, cooldown: 0 })),
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
    skills: Object.values(skills).map((skill) => ({ id: createUUIDv4(), skillId: skill.id, cooldown: 0 })),
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

const generateLocations = (map: GlobalMap): GlobalLocation[] => {
  const locations: GlobalLocation[] = [];
  const maxX = map.size[0] - 1;
  const maxY = map.size[1] - 1;
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      locations.push({
        id: createUUIDv4(),
        coordinates: [x, y],
        mapId: map.id,
        battleMapTemplateId: '1',
        creatures: [],
        spawners: [],
        moveCost: 1,
        canMove: x >= 2 && y >= 2 && x <= maxX - 2 && y <= maxY - 2,
      });
    }
  }
  return locations;
};


export const globalMap: GlobalMap = {
  id: '1',
  size: [9, 9],
  locations: [],
};

export const globalLocations: GlobalLocation[] = generateLocations(globalMap);
globalMap.locations = globalLocations;

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

const centerMapLocation = globalLocations.find((location) => {
  return location.coordinates[0] === Math.floor(globalMap.size[0] / 2)
    && location.coordinates[1] === Math.floor(globalMap.size[1] / 2);
});
if (isNullOrUndefined(centerMapLocation)) throw new Error('Center map location not found');

export const globalMapCenterLocation = centerMapLocation;

export const mainPlayerCreature = createCreatureByTemplate(playerCreatureTemplate, centerMapLocation);
mainPlayerCreature.name = '3@H@T0P';

export const creatures: Record<Creature['id'], Creature> = {
  [mainPlayerCreature.id]: mainPlayerCreature,
};


