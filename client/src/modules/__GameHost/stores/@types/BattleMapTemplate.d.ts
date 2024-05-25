import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';
import type { Vector2 } from '#modules/__GameHost/@types/Vector';

import type { Creature } from './Creature';

export interface BattleLocation {
  id: UUIDv4;
  coordinates: Vector2;
  creatures: Creature[];
}

export interface BattleMapTemplate {
  id: UUIDv4;
  type: string;
  size: Vector2;
  locations: BattleLocation[];
}
