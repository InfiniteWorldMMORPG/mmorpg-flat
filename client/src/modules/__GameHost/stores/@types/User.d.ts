import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';

import type { PlayerCreature } from './Creature';

export interface User {
  id: UUIDv4;
  playerCreatureId: PlayerCreature['id'];
}
