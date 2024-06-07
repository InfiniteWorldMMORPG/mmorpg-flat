import { createUUIDv4 } from '#lib/utils';

import { type SkillOutputDTO, SkillType } from '../../../../lib/dto';

export const skillMap: Record<SkillOutputDTO['id'], SkillOutputDTO> = {
  [createUUIDv4()]: {
    id: '',
    slug: 'BattleBaseAttack',
    name: 'Базовая атака',
    description: '',
    cooldown: 0,
    type: SkillType.ATTACK,
    iconURL: '!COMPONENT=AttackIcon',
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'BattleBaseHeal',
    name: 'Базовое лечение',
    description: '',
    cooldown: 2,
    type: SkillType.HEAL,
    iconURL: '!COMPONENT=HealIcon',
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'BattleMove',
    name: 'Идти',
    description: '',
    cooldown: 0,
    type: SkillType.MOVE,
    iconURL: '!COMPONENT=MoveIcon',
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'GlobalMove',
    name: 'Перейти',
    description: '',
    cooldown: 0,
    type: SkillType.MOVE,
    iconURL: '!COMPONENT=MoveIcon',
  },
  [createUUIDv4()]: {
    id: '',
    slug: 'GlobalAttack',
    name: 'Напасть',
    description: '',
    cooldown: 0,
    type: SkillType.ATTACK,
    iconURL: '!COMPONENT=StartBattleIcon',
  },
};

for (const [id, value] of Object.entries(skillMap)) value.id = id;

export const standartBattleSkillList = Object.values(skillMap).filter((skill) => ['BattleBaseAttack', 'BattleMove'].includes(skill.slug));
