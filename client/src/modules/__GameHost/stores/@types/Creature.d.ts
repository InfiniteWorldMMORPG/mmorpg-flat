import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';

import type { GlobalLocation } from './GlobalMap';
import type { Battle } from './Battle';
import type { Skill } from './Skill';

export interface Stats {
  exp: number;
  healthPoints: number;
  attack: number;
  armor: number;
  movePoints: number;
  movePointsRegeneration: number;
  actionPoints: number;
}

export interface CreatureTemplate {
  id: UUIDv4;
  name: string;
  level: number;
  maxStats: Stats;
  skills: CreatureSkill[];
  avatarURL: string;
}

// Unit?
export interface Creature {
  id: UUIDv4;
  templateId: CreatureTemplate['id'];
  name: string;
  avatarURL: string;
  level: number;
  maxStats: Stats;
  currentStats: Stats;
  skills: CreatureSkill[];
  locationId: GlobalLocation['id'];
  battleId: Battle['id'] | null;
}

export interface CreatureSkill {
  id: UUIDv4;
  cooldown: number; // если 0 то готов к использованию
  skillId: Skill['id'];
}

export interface PlayerCreature extends Creature {
}

export interface CreatureSpawnerTemplate {
  id: UUIDv4;
  level: number;
  creatureTemplateId: CreatureTemplate['id'];
  spawnInterval: number;
  spawnCount: number;
}

export interface CreatureSpawner {
  id: UUIDv4;
  creatureSpawnerTemplateId: CreatureSpawnerTemplate['id'];
  location: GlobalLocation['id'];
}
