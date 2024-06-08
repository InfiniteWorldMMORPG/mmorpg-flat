import type { UUIDv4 } from '#lib/utils';

import type { GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO } from './GlobalMap.dto';
import type { SkillOutputDTO } from './Skill.dto';

interface CreatureStats {
  exp: number;
  healthPoints: number;
  attack: number;
  armor: number;
  movePoints: number;
  movePointsRegeneration: number;
  actionPoints: number;
}

export interface CreatureFlatOutputDTO {
  id: UUIDv4;
  name: string;
  avatarURL: string;
  level: number;
  maxStats: CreatureStats;
  currentStats: CreatureStats;
  locationId: UUIDv4;
}

export interface CreatureOutputDTO {
  id: UUIDv4;
  name: string;
  avatarURL: string;
  level: number;
  maxStats: CreatureStats;
  currentStats: CreatureStats;
  skills: CreatureSkillOutputDTO[];
  location: GlobalLocationFlatOutputDTO;
}

export interface CreatureSkillFlatOutputDTO {
  id: UUIDv4;
  cooldown: number; // если 0 то готов к использованию
  skillId: UUIDv4;
}

export interface CreatureSkillOutputDTO {
  id: UUIDv4;
  cooldown: number; // если 0 то готов к использованию
  skill: SkillOutputDTO;
}

export interface PlayerCreatureFlatOutputDTO extends CreatureFlatOutputDTO {
}

export interface PlayerCreatureOutputDTO extends CreatureOutputDTO {
}
