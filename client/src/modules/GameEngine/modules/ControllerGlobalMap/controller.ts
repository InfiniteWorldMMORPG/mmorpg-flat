import { inject } from '#lib/DI';
import type { CreatureFlatOutputDTO, GlobalIntentionInputDTO, GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO, GlobalMapOutputDTO } from '#lib/dto';
import { typeKey, isNearbyLocation } from '#lib/utils';

import type { Creature } from '#ge-modules/StorageCreature/@types';
import { CreatureRepositoryInjectionToken } from '#ge-modules/StorageCreature';
import type { GlobalLocation } from '#ge-modules/StorageGlobalMap/@types';
import { GlobalMapRepositoryInjectionToken } from '#ge-modules/StorageGlobalMap';
import type { RequestContext } from '#ge-modules/TransportHTTP';
import { TransportSSEInjectionToken } from '#ge-modules/TransportSSE';

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

const moveCreatureToGlobalLocation = async (
  creature: Creature,
  currentLocation: GlobalLocation,
  targetLocation: GlobalLocation,
): Promise<void | Error> => {
  if (!targetLocation.canMove) return new Error('Location is not movable');
  if (targetLocation.moveCost > creature.currentStats.movePoints) return new Error('Not enough move points');

  if (currentLocation !== null && !isNearbyLocation(currentLocation, targetLocation, 1)) {
    return new Error('Not adjacent locations');
  }

  creature.globalLocationId = targetLocation.id;
  creature.currentStats.movePoints -= targetLocation.moveCost;

  const creatureStorage = inject(CreatureRepositoryInjectionToken);
  await creatureStorage.updateCreature(creature);
};

const applyGlobalIntention = async (context: RequestContext, intentionData: GlobalIntentionInputDTO): Promise<void | Error> => {
  const globalMapStorage = inject(GlobalMapRepositoryInjectionToken);

  if (context.user.playerCreatureId !== intentionData.sourceCreatureId) {
    return Error('Invalid sourceCreature');
  }

  const creatureStorage = inject(CreatureRepositoryInjectionToken);
  const sourceCreature = await creatureStorage.getFlatCreatureById(intentionData.sourceCreatureId);
  if (sourceCreature === null) {
    return Error('Invalid sourceCreature');
  }

  const [creatureSkill, skill] = await creatureStorage.findCreatureSkill(sourceCreature.id, intentionData.skillId);
  if (skill === null) return Error('Invalid skill');

  const currentLocation = await globalMapStorage.getLocationById(sourceCreature.globalLocationId);
  if (currentLocation === null) return Error('Invalid source creature current location');

  let targetLocation: GlobalLocation | null = null;
  if (intentionData.targetGlobalLocationId !== null) {
    targetLocation = await globalMapStorage.getLocationById(intentionData.targetGlobalLocationId);
  }

  let targetCreature: Creature | null = null;
  if (intentionData.targetCreatureId !== null) {
    targetCreature = await creatureStorage.getFlatCreatureById(intentionData.targetCreatureId);
  }

  switch (skill.slug) {
    case 'GlobalMove': {
      if (targetLocation === currentLocation) return Error('Intention invalid');
      if (targetLocation === null) return Error('Intention invalid');
      const result = await moveCreatureToGlobalLocation(sourceCreature, currentLocation, targetLocation);
      if (result instanceof Error) return result;
      break;
    }
    default: {
      console.warn('Unknown global intention', intentionData);
      return Error('Unknown global intention');
    }
  }
  await globalMapStorage.createGlobalIntention(intentionData);
};



export const getGlobalMapController = () => {

  return <const>{
    [typeKey]: GlobalMapControllerTypeSymbol,
    sendGlobalMapUpdate: sendGlobalMapUpdate,
    applyGlobalIntention: applyGlobalIntention,
  };
};

export type GlobalMapController = ReturnType<typeof getGlobalMapController>;
