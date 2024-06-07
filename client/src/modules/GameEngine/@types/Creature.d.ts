import type { UUIDv4 } from '#lib/utils';

export interface Skill {
  id: UUIDv4;
  slug: string;
  name: string;
  description: string;
  cooldown: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Stats {
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
  avatarURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatureSkill {
  id: UUIDv4;
  creatureTemplateId: UUIDv4;
  skillId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}

// Unit?
export interface Creature {
  id: UUIDv4;
  templateId: UUIDv4;
  name: string;
  avatarURL: string;
  level: number;
  maxStats: Stats;
  currentStats: Stats;
  globalLocationId: UUIDv4;
  battleId: UUIDv4 | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatureSkill {
  id: UUIDv4;
  cooldown: number; // если 0 то готов к использованию
  creatureId: UUIDv4;
  skillId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatureSpawnerTemplate {
  id: UUIDv4;
  level: number;
  creatureTemplateId: UUIDv4;
  spawnInterval: number;
  spawnCount: number;
  spawnLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatureSpawner {
  id: UUIDv4;
  creatureSpawnerTemplateId: CreatureSpawnerTemplate['id'];
  globalLocationId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: UUIDv4;
  nickname: string;
  login: string;
  email: string;
  password: string;
  playerCreatureId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}
