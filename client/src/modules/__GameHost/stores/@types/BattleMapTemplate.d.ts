import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';
import type { Vector2 } from '#modules/__GameHost/@types/Vector';

export interface BattleLocationTemplate {
  id: UUIDv4;
  coordinates: Vector2;
}

export interface BattleMapTemplate {
  id: UUIDv4;
  size: Vector2;
  locations: BattleLocationTemplate[];
}
