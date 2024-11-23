import { CreatureFlatOutputDTO, CreatureOutputDTO } from '#lib/dto';
import { Creature, CreatureWithDependencies } from './@types';

export const fromCreatureToCreatureFlatOutputDTO = (creature: Creature): CreatureFlatOutputDTO => {
  return {
    id: creature.id,
    name: creature.name,
    avatarURL: creature.avatarURL,
    level: creature.level,
    maxStats: creature.maxStats,
    currentStats: creature.currentStats,
    globalLocationId: creature.globalLocationId,
  };
};

export const fromCreatureToCreatureOutputDTO = (creature: CreatureWithDependencies): CreatureOutputDTO => {
  return {
    id: creature.id,
    name: creature.name,
    avatarURL: creature.avatarURL,
    level: creature.level,
    maxStats: creature.maxStats,
    currentStats: creature.currentStats,
    skills: creature.skills,
    location: creature.location,
  };
};
