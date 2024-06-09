import type { CreatureOutputDTO } from '#lib/dto';
import type { UUIDv4 } from '#lib/utils';

export interface User {
  id: UUIDv4;
  playerCreatureId: UUIDv4;
  playerCreature: CreatureOutputDTO | null;
}
