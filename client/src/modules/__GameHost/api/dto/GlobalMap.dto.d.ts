import type { UUIDv4, Vector2 } from '#modules/Common';

import type { CreatureFlatOutputDTO } from './Creature.dto';

export interface GlobalMapOutputDTO {
  id: UUIDv4;
  size: Vector2;
  locations: GlobalLocationFlatOutputDTO[];
}

export interface GlobalLocationFlatOutputDTO {
  id: UUIDv4;
  coordinates: Vector2;
  moveCost: number;
  canMove: boolean;
}

export interface GlobalLocationOutputDTO {
  id: UUIDv4;
  coordinates: Vector2;
  creatures: CreatureFlatOutputDTO[];
  moveCost: number;
  canMove: boolean;
}
