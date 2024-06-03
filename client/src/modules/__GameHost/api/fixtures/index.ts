import { isNullOrUndefined } from '../../../Common/utils';
import { createUUIDv4 } from '../../../Common/utils/uuid';
import {
  type BattleMapTemplate, type Creature, type CreatureSpawner,
  type CreatureSpawnerTemplate, type CreatureTemplate,
  type GlobalLocation, type GlobalMap, type Skill,
  SkillType,
  type Battle,
} from '../../stores/@types';

export const battleMapTemplates: Record<BattleMapTemplate['id'], BattleMapTemplate> = {
  '1': {
    id: '1',
    size: [5, 5],
    locations: [
      { id: '1', coordinates: [0, 0] },
      { id: '2', coordinates: [0, 1] },
      { id: '3', coordinates: [0, 2] },
      { id: '4', coordinates: [0, 3] },
      { id: '5', coordinates: [0, 4] },

      { id: '6', coordinates: [1, 0] },
      { id: '7', coordinates: [1, 1] },
      { id: '8', coordinates: [1, 2] },
      { id: '9', coordinates: [1, 3] },
      { id: '10', coordinates: [1, 4] },

      { id: '11', coordinates: [2, 0] },
      { id: '12', coordinates: [2, 1] },
      { id: '13', coordinates: [2, 2] },
      { id: '14', coordinates: [2, 3] },
      { id: '15', coordinates: [2, 4] },

      { id: '16', coordinates: [3, 0] },
      { id: '17', coordinates: [3, 1] },
      { id: '18', coordinates: [3, 2] },
      { id: '19', coordinates: [3, 3] },
      { id: '20', coordinates: [3, 4] },

      { id: '21', coordinates: [4, 0] },
      { id: '22', coordinates: [4, 1] },
      { id: '23', coordinates: [4, 2] },
      { id: '24', coordinates: [4, 3] },
      { id: '25', coordinates: [4, 4] },
    ],
  },
};

for (const [id, value] of Object.entries(battleMapTemplates)) value.id = id;

