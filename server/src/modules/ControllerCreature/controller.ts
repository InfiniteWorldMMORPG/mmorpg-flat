import { TransportSSEInjectionToken } from '#modules/TransportSSE';
import { inject } from '#lib/DI';
import type { CreatureFlatOutputDTO, CreatureOutputDTO, CreatureSkillOutputDTO, GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO, SkillType } from '#lib/dto';
import { isNullOrUndefined, typeKey } from '#lib/utils';

import { CreatureRepositoryInjectionToken } from '#modules/StorageCreature';
import { GlobalMapRepositoryInjectionToken } from '#modules/StorageGlobalMap';
import type { GlobalLocation } from '#modules/StorageGlobalMap/@types';
import type { RequestContext } from '#modules/TransportHTTP';

import { CreatureControllerTypeSymbol } from './constants';
import { User } from '#modules/StorageUser/@types';
import { Creature } from '#modules/StorageCreature/@types';
import { SSETransportEventName } from '#modules/TransportSSE/@types';

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

// const sendPlayerUpdate = async (context: RequestContext): Promise<void> => {
//   const transportSSE = inject(TransportSSEInjectionToken);
//   const userSoket = transportSSE.clients[context.user.id];

//   if (isNullOrUndefined(userSoket)) return;

//   const creatureStorage = inject(CreatureRepositoryInjectionToken);

//   const player = await creatureStorage.getFlatCreatureById(context.user.playerCreatureId);
//   if (player === null) return;

//   const globalMapStorage = inject(GlobalMapRepositoryInjectionToken);

//   const playerLocation = await globalMapStorage.getLocationById(player.globalLocationId);
//   if (playerLocation === null) return;

//   const skills = await creatureStorage.getSkillsByCreatureId(player.id);

//   const creaturesOnLocation = await creatureStorage.findCreatureByGlobalLocationId(playerLocation.id);

//   const playerOutput: CreatureOutputDTO = {
//     id: player.id,
//     name: player.name,
//     avatarURL: player.avatarURL,
//     level: player.level,
//     maxStats: player.maxStats,
//     currentStats: player.currentStats,
//     skills: skills.map((creatureSkill): CreatureSkillOutputDTO => ({
//       id: creatureSkill.id,
//       cooldown: creatureSkill.cooldown,
//       skill: {
//         id: creatureSkill.skill.id,
//         slug: creatureSkill.skill.slug,
//         name: creatureSkill.skill.name,
//         description: creatureSkill.skill.description,
//         cooldown: creatureSkill.skill.cooldown,
//         type: creatureSkill.skill.type as SkillType,
//         iconURL: creatureSkill.skill.iconURL,
//       },
//     })),
//     globalLocation: globalLocationTransformer.toGlobalLocationOutputDTO(playerLocation, creaturesOnLocation),
//   };

//   userSoket.dispatchEvent(new CustomEvent('playerUpdate', { detail: playerOutput }));
// };

const sendPlayerUpdate = async (user: User): Promise<void> => {
  const transportSSE = inject(TransportSSEInjectionToken);
  const userIsSubscribed = transportSSE.checkUserIsSubscribedToEvent(user.id, SSETransportEventName.playerUpdate);

  if (!userIsSubscribed) return;

  const creatureStorage = inject(CreatureRepositoryInjectionToken);

  const player = await creatureStorage.getFlatCreatureById(user.playerCreatureId);
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
    globalLocation: globalLocationTransformer.toGlobalLocationOutputDTO(playerLocation, creaturesOnLocation),
  };

  const result = transportSSE.sendEventMessage(user.id, SSETransportEventName.playerUpdate, JSON.stringify(playerOutput));

  if (result instanceof Error) {
    // context.providers.logger.error(['GlobalMapController', 'sendGlobalMapUpdate'], result.message);
    console.log('!!!!!!!!!!!!!!!!!!!', result);
    // @TODO: send error throught logger
  }
};

export const getCreatureController = () => {

  return <const>{
    [typeKey]: CreatureControllerTypeSymbol,
    sendPlayerUpdate: sendPlayerUpdate,
  };
};

export type CreatureController = ReturnType<typeof getCreatureController>;
