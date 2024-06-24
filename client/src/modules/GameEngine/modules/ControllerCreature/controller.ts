import { TransportSSEInjectionToken } from '#ge-modules/TransportSSE';
import { inject } from '#lib/DI';
import type { CreatureFlatOutputDTO, CreatureOutputDTO, CreatureSkillOutputDTO, GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO, SkillType } from '#lib/dto';
import { typeKey } from '#lib/utils';

import { CreatureRepositoryInjectionToken } from '#ge-modules/StorageCreature';
import { GlobalMapRepositoryInjectionToken } from '#ge-modules/StorageGlobalMap';
import type { GlobalLocation } from '#ge-modules/StorageGlobalMap/@types';
import type { RequestContext } from '#ge-modules/TransportHTTP';

import { CreatureControllerTypeSymbol } from './constants';

const globalLocationTransformer = {
  toGlobalLocationFlatOutputDTO(globalLocation: GlobalLocation): GlobalLocationFlatOutputDTO {
    return {
      id: globalLocation.id,
      coordinates: [globalLocation.coordinateX, globalLocation.coordinateY],
      moveCost: globalLocation.moveCost,
      canMove: globalLocation.canMove,
    };
  },

  toGlobalLocationOutputDTO(globalLocation: GlobalLocation, creatures: CreatureFlatOutputDTO[]): GlobalLocationOutputDTO {
    return {
      id: globalLocation.id,
      coordinates: [globalLocation.coordinateX, globalLocation.coordinateY],
      moveCost: globalLocation.moveCost,
      canMove: globalLocation.canMove,
      creatures,
    };
  },
};

const sendPlayerUpdate = async (context: RequestContext): Promise<void> => {
  const creatureStorage = inject(CreatureRepositoryInjectionToken);

  const player = await creatureStorage.getFlatCreatureById(context.user.playerCreatureId);
  if (player === null) return;

  const globalMapStorage = inject(GlobalMapRepositoryInjectionToken);

  const playerLocation = await globalMapStorage.getLocationById(player.globalLocationId);
  if (playerLocation === null) return;

  const skills = await creatureStorage.getSkillsByCreatureId(player.id);

  const creaturesOnLocation = await creatureStorage.findCreatureByGlobalLocationId(playerLocation.id);

  const playerOutput: CreatureOutputDTO = {
    id: player.id,
    name: player.name,
    avatarURL: player.avatarURL,
    level: player.level,
    maxStats: player.maxStats,
    currentStats: player.currentStats,
    skills: skills.map((creatureSkill): CreatureSkillOutputDTO => ({
      id: creatureSkill.id,
      cooldown: creatureSkill.cooldown,
      skill: {
        id: creatureSkill.skill.id,
        slug: creatureSkill.skill.slug,
        name: creatureSkill.skill.name,
        description: creatureSkill.skill.description,
        cooldown: creatureSkill.skill.cooldown,
        type: creatureSkill.skill.type as SkillType,
        iconURL: creatureSkill.skill.iconURL,
      },
    })),
    location: globalLocationTransformer.toGlobalLocationOutputDTO(playerLocation, creaturesOnLocation),
  };

  const transportSSE = inject(TransportSSEInjectionToken);
  transportSSE.dispatchEvent(new CustomEvent('playerUpdate', { detail: playerOutput })); // user????? not for now
};

export const getCreatureController = () => {

  return <const>{
    [typeKey]: CreatureControllerTypeSymbol,
    sendPlayerUpdate: sendPlayerUpdate,
  };
};

export type CreatureController = ReturnType<typeof getCreatureController>;
