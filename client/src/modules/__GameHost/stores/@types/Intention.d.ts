import type { UUIDv4 } from '#modules/__GameHost/utils/uuid';
import type { Vector2 } from '#modules/__GameHost/@types/Vector';

import type { Creature } from './Creature';
import type { IntentionType } from './IntentionType';
import type { Skill } from './Skill';
import type { Battle } from './Battle';

export interface Intention {
  id: UUIDv4;
  battleId: Battle['id'];
  roundIndex: number;
  sourceCreatureId: Creature['id'];
  targetCreatureId: Creature['id'] | null;
  targetLocation: Vector2 | null;
  type: IntentionType;
  skillId: Skill['id'];
  createdAt: Date;
  updatedAt: Date;
}
