import type { CreatureSkillOutputDTO } from '#lib/dto';

export interface SkillBar {
  type: string;
  cells: {
    id: number;
    skill: CreatureSkillOutputDTO | null;
  }[];
}
