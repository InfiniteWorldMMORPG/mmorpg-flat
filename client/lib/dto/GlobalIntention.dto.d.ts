import type { UUIDv4 } from '#lib/utils';

export interface GlobalIntentionInputDTO {
  sourceCreatureId: UUIDv4;
  skillId: UUIDv4;
  targetCreatureId: UUIDv4 | null;
  targetLocationId: UUIDv4 | null;
}
