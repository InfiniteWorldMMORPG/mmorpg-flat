import type { UUIDv4 } from '#modules/Common';

import type { PlayerCreatureOutputDTO } from './Creature.dto';

export interface UserFlatOutputDTO {
  id: UUIDv4;
  playerCreatureId: UUIDv4;
}

export interface UserOutputDTO {
  id: UUIDv4;
  playerCreature: PlayerCreatureOutputDTO;
}
