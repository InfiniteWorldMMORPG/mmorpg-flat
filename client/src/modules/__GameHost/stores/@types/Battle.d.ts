import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';

import type { BattleMapTemplate, BattleLocation } from './BattleMapTemplate';
import type { GameLocation } from './GameLocation';
import type { Creature } from './Creature';
import type { Intention } from './Intention';

export interface Battle {
  id: UUIDv4;
  gameLocationId: GameLocation[id];
  template: BattleMapTemplate;
  locations: BattleLocation[];
  creatures: Creature[];
  rounds: Round[];
}

export interface Round {
  battleId: Battle['id'];
  roundIndex: number;
  intentions: Intention[];
  createdAt: Date;
  updatedAt: Date;
}
