import { z } from 'zod';

import type { UUIDv4 } from '#lib/utils';

// export interface GlobalIntentionInputDTO {
//   sourceCreatureId: UUIDv4;
//   skillId: UUIDv4;
//   targetCreatureId: UUIDv4 | null;
//   targetGlobalLocationId: UUIDv4 | null;
// }

export const GlobalIntentionInputDTOSchema = z.object({
  sourceCreatureId: z.string().uuid(),
  skillId: z.string().uuid(),
  targetCreatureId: z.string().uuid().or(z.literal(null)),
  targetGlobalLocationId: z.string().uuid().or(z.literal(null)),
});

export type GlobalIntentionInputDTO = z.infer<typeof GlobalIntentionInputDTOSchema>;
