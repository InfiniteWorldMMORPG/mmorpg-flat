import { TransportSSEInjectionToken } from '#ge-modules/TransportSSE';
import { inject } from '#lib/DI';
import type { CreatureFlatOutputDTO, GlobalIntentionInputDTO, GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO, GlobalMapOutputDTO } from '#lib/dto';
import { typeKey } from '#lib/utils';

import { CreatureRepositoryInjectionToken } from '#ge-modules/StorageCreature';
import { GlobalMapRepositoryInjectionToken } from '#ge-modules/StorageGlobalMap';
import type { GlobalLocation } from '#ge-modules/StorageGlobalMap/@types';
import type { RequestContext } from '#ge-modules/TransportHTTP';

import { GlobalMapControllerTypeSymbol } from './constants';


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

const sendGlobalMapUpdate = async (context: RequestContext): Promise<void> => {
  const creatureStorage = inject(CreatureRepositoryInjectionToken);

  const player = await creatureStorage.getFlatCreatureById(context.user.playerCreatureId);
  if (player === null) return;

  const globalMapStorage = inject(GlobalMapRepositoryInjectionToken);

  const playerLocation = await globalMapStorage.getLocationById(player.globalLocationId);
  if (playerLocation === null) return;

  const globalMap = await globalMapStorage.getMapById(playerLocation.mapId);
  if (globalMap === null) return;

  const userNearestLocations = await globalMapStorage.getNearestLocationsForMap(
    globalMap.id,
    [playerLocation.coordinateX, playerLocation.coordinateY],
    2,
  );

  const globalMapOutput: GlobalMapOutputDTO = {
    id: globalMap.id,
    size: [globalMap.sizeX, globalMap.sizeY],
    locations: userNearestLocations.map(globalLocationTransformer.toGlobalLocationFlatOutputDTO),
  };

  const transportSSE = inject(TransportSSEInjectionToken);
  transportSSE.dispatchEvent(new CustomEvent('globalMapUpdate', { detail: globalMapOutput })); // user????? not for now
};

const applyGlobalIntention = async (context: RequestContext, intentionData: GlobalIntentionInputDTO): Promise<void> => {
  const globalMapStorage = inject(GlobalMapRepositoryInjectionToken);
  await globalMapStorage.createGlobalIntention(intentionData);

  await sendGlobalMapUpdate(context);
};

export const getGlobalMapController = () => {

  return <const>{
    [typeKey]: GlobalMapControllerTypeSymbol,
    sendGlobalMapUpdate: sendGlobalMapUpdate,
    applyGlobalIntention: applyGlobalIntention,
  };
};

export type GlobalMapController = ReturnType<typeof getGlobalMapController>;
