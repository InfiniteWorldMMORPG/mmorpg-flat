import type { UUIDv4, Vector2 } from '#modules/Common';

export interface BattleLocation {
  id: UUIDv4;
  coordinates: Vector2;
  battleLocationTemplateId: UUIDv4;
  battleId: UUIDv4;
  creatureId: UUIDv4 | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Battle {
  id: UUIDv4;
  battleMapTemplateId: UUIDv4;
  globalLocationId: UUIDv4;
  isFinished: boolean;
  result: any; // Some unshaped json
  createdAt: Date;
  updatedAt: Date;
}

export interface BattleRound {
  id: UUIDv4;
  battleId: UUIDv4;
  index: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BattleIntention {
  id: UUIDv4;
  battleRoundId: UUIDv4;
  sourceCreatureId: UUIDv4;
  targetCreatureId: UUIDv4 | null;
  targetBattleLocationId: UUIDv4 | null;
  skillId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}

export interface BattleLocationTemplate {
  id: UUIDv4;
  coordinateX: number;
  coordinateY: number;
  battleMapTemplateId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}

export interface BattleMapTemplate {
  id: UUIDv4;
  sizeX: number;
  sizeY: number;
  createdAt: Date;
  updatedAt: Date;
}
