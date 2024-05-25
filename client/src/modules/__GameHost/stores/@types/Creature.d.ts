import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';

import type { CreatureTemplate } from './CreatureTemplate';
import type { GameLocation } from './GameLocation';
import type { Stats } from './Stats';

export interface CreatureTemplate {
  id: UUIDv4;
  name: string;
  level: number;
  maxStats: Stats;
  skills: CreatureSkill[];
}

// Unit?
export interface Creature {
  id: UUIDv4;
  templateId: CreatureTemplate['id'];
  name: string;
  level: number;
  maxStats: Stats;
  currentStats: Stats;
  skills: CreatureSkill[];
  location: GameLocation['id'];
  battleLocation: GameLocation['id'] | null;
}

export interface CreatureSkill {
  id: UUIDv4;
  cooldown: number; // если 0 то готов к использованию
  skillId: Skill['id'];
}

export interface User extends Creature {
}
