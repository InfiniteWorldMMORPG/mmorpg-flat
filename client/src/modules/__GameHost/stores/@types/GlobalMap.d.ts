import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';
import type { Vector2 } from '#modules/__GameHost/@types/Vector';

import type { BattleMapTemplate } from './BattleMapTemplate';
import type { Creature, CreatureSpawner } from './Creature';
import type { Skill } from './Skill';
import type { IntentionType } from './IntentionType';

export interface GlobalMap {
  id: UUIDv4;
  size: Vector2;
  locations: GlobalLocation[];
}

export interface GlobalLocation {
  id: UUIDv4;
  coordinates: Vector2;
  mapId: GlobalMap['id'];
  battleMapTemplateId: BattleMapTemplate['id'];
  creatures: Creature[];
  spawners: CreatureSpawner[];
  moveCost: number;
  canMove: boolean;
}

export interface GlobalIntention {
  id: UUIDv4;
  sourceCreatureId: Creature['id'];
  targetCreatureId: Creature['id'] | null;
  targetLocationId: GlobalLocation['id'] | null;
  type: IntentionType;
  skillId: Skill['id'];
}
