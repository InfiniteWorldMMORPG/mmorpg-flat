import type { UUIDv4 } from '#/modules/Common/utils/uuid';
import type { Vector2 } from '#modules/__GameHost/@types/Vector';

import type { BattleMapTemplate } from './BattleMapTemplate';
import type { GlobalLocation } from './GlobalMap';
import type { Creature } from './Creature';
import type { IntentionType } from './IntentionType';
import type { Skill } from './Skill';

export interface BattleLocation {
  id: UUIDv4;
  coordinates: Vector2;
  creature: Creature | null;
}

export interface Battle {
  id: UUIDv4;
  globalLocationId: GlobalLocation['id'];
  template: BattleMapTemplate;
  locations: BattleLocation[];
  creatures: Creature[];
  rounds: Round[];
}

export interface Round {
  battleId: Battle['id'];
  roundIndex: number;
  intentions: BattleIntention[];
}

export interface BattleIntention {
  id: UUIDv4;
  battleId: Battle['id'];
  roundIndex: number;
  sourceCreatureId: Creature['id'];
  targetCreatureId: Creature['id'] | null;
  targetLocation: Vector2 | null;
  type: IntentionType;
  skillId: Skill['id'];
}

