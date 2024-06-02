import type { UUIDv4 } from '#modules/Common';

import type { SkillType } from './SkillType';

export interface SkillOutputDTO {
  id: UUIDv4;
  slug: string;
  name: string;
  description: string;
  cooldown: number;
  type: SkillType;
  iconURL: string; // ex. "https://example.com/abc.png" or "!COMPONENT=MoveIcon"
}
