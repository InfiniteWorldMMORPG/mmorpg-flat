import type { UUIDv4 } from '#/modules/Common/utils/uuid';

import type { SkillType } from './SkillType';

export interface Skill {
  id: UUIDv4; // custom uniq name
  slug: string;
  name: string;
  description: string;
  cooldown: number;
  type: SkillType;
}
