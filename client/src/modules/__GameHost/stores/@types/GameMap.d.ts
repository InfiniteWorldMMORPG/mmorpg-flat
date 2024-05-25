import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';
import type { Vector2 } from '#modules/__GameHost/@types/Vector';
import type { GameLocation } from './GameLocation';

export interface GameMap {
  id: UUIDv4;
  size: Vector2;
  locations: GameLocation[];
}
