import { injectMap, injectMapLazy } from '#lib/DI';
import type { GlobalIntentionInputDTO, GlobalLocationFlatOutputDTO, GlobalLocationOutputDTO, GlobalMapOutputDTO } from '#lib/dto';
import { isNearbyLocation, typeKey } from '#lib/utils';

import { CreatureRepositoryInjectionToken } from '#modules/StorageCreature';
import type { Creature } from '#modules/StorageCreature/@types';
import { GlobalMapRepositoryInjectionToken } from '#modules/StorageGlobalMap';
import type { GlobalLocation, GlobalLocationWithDependencies } from '#modules/StorageGlobalMap/@types';
import { TransportSSEInjectionToken } from '#modules/TransportSSE';
import { configInjectionToken } from '#modules/Config';
import { loggerInjectionToken } from '#modules/Logger';
import { fromCreatureToCreatureFlatOutputDTO } from '#modules/StorageCreature/serializers';
import { UserRepositoryInjectionToken } from '#modules/StorageUser';
import type { User } from '#modules/StorageUser/@types';
import { SSETransportEventName } from '#modules/TransportSSE/@types';

import { GlobalMapControllerContext } from './@types';
import { GlobalMapControllerTypeSymbol } from './constants';
import { InvalidIntentionError, LocationIsNotAdjacentError, LocationIsNotMovableError, NotEnoughMovePointsError } from './errors';


const globalLocationTransformer = {
  toGlobalLocationFlatOutputDTO(globalLocation: GlobalLocation): GlobalLocationFlatOutputDTO {
    return {
      id: globalLocation.id,
      coordinates: [globalLocation.coordinateX, globalLocation.coordinateY],
      moveCost: globalLocation.moveCost,
      canMove: globalLocation.canMove,
    };
  },

  toGlobalLocationOutputDTO(globalLocation: GlobalLocationWithDependencies): GlobalLocationOutputDTO {
    return {
      id: globalLocation.id,
      coordinates: [globalLocation.coordinateX, globalLocation.coordinateY],
      moveCost: globalLocation.moveCost,
      canMove: globalLocation.canMove,
      creatures: globalLocation.creatures.map(fromCreatureToCreatureFlatOutputDTO),
    };
  },
};

const sendGlobalMapUpdate = async (context: GlobalMapControllerContext, location: GlobalLocation): Promise<void> => {

  const { creatureStorage, globalMapStorage, userStorage } = context.providers;

  const creatures = await creatureStorage.findCreatureByGlobalLocationId(location.id);

  for (const creature of creatures) {
    const user = await userStorage.getUserByCreatureId(creature.id);
    if (user === null) continue;

    const userNearestLocations = await globalMapStorage.getNearestLocationsForMap(
      location.mapId,
      [location.coordinateX, location.coordinateY],
      2,
    );

    const globalMapOutput: GlobalMapOutputDTO = {
      id: location.mapId,
      locations: userNearestLocations.map(globalLocationTransformer.toGlobalLocationOutputDTO),
    };

    const result = context.providers.sseTransport.sendEventMessage(
      user.id,
      SSETransportEventName.globalMapUpdate,
      JSON.stringify(globalMapOutput),
    );

    if (result instanceof Error) {
      context.providers.logger.error(['GlobalMapController', 'sendGlobalMapUpdate'], result.message);
    }
  }
};

const sendGlobalMapUpdateToUser = async (context: GlobalMapControllerContext, user: User): Promise<void> => {

  const { creatureStorage, globalMapStorage } = context.providers;

  const player = await creatureStorage.getFlatCreatureById(user.playerCreatureId);
  if (player === null) return;

  const playerLocation = await globalMapStorage.getLocationById(player.globalLocationId);
  if (playerLocation === null) return;

  const userNearestLocations = await globalMapStorage.getNearestLocationsForMap(
    playerLocation.mapId,
    [playerLocation.coordinateX, playerLocation.coordinateY],
    2,
  );

  const globalMapOutput: GlobalMapOutputDTO = {
    id: playerLocation.mapId,
    locations: userNearestLocations.map(globalLocationTransformer.toGlobalLocationOutputDTO),
  };

  const result = context.lazyProviders.sseTransport().sendEventMessage(
    user.id,
    SSETransportEventName.globalMapUpdate,
    JSON.stringify(globalMapOutput),
  );

  if (result instanceof Error) {
    context.providers.logger.error(['GlobalMapController', 'sendGlobalMapUpdate'], result.message);
  }
};

const moveCreatureToGlobalLocation = async (
  context: GlobalMapControllerContext,
  creature: Creature,
  currentLocation: GlobalLocation,
  targetLocation: GlobalLocation,
): Promise<void | LocationIsNotMovableError | LocationIsNotAdjacentError | NotEnoughMovePointsError> => {
  if (!targetLocation.canMove) return new LocationIsNotMovableError();
  if (targetLocation.moveCost > creature.currentStats.movePoints) return new NotEnoughMovePointsError();

  if (!isNearbyLocation(currentLocation, targetLocation, 1)) return new LocationIsNotAdjacentError();

  creature.globalLocationId = targetLocation.id;
  creature.currentStats.movePoints -= targetLocation.moveCost;

  await context.providers.creatureStorage.updateCreature(creature);
};

const applyGlobalIntention = async (
  context: GlobalMapControllerContext,
  user: User,
  intentionData: GlobalIntentionInputDTO,
): Promise<void | InvalidIntentionError> => {
  const globalMapStorage = context.providers.globalMapStorage;

  if (user.playerCreatureId !== intentionData.sourceCreatureId) {
    context.providers.logger.error(
      ['ControllerGlobalMap', 'applyGlobalIntention'],
      `Player ${user.playerCreatureId} is not equal to intention source creature ${intentionData.sourceCreatureId}`,
    );
    return new InvalidIntentionError();
  }

  const creatureStorage = context.providers.creatureStorage;
  const sourceCreature = await creatureStorage.getFlatCreatureById(intentionData.sourceCreatureId);
  if (sourceCreature === null) {
    context.providers.logger.error(
      ['ControllerGlobalMap', 'applyGlobalIntention'],
      `Intention source creature with id ${intentionData.sourceCreatureId} not found!`,
    );
    return new InvalidIntentionError();
  }

  const [creatureSkill, skill] = await creatureStorage.findCreatureSkill(sourceCreature.id, intentionData.skillId);
  if (skill === null) {
    context.providers.logger.error(
      ['ControllerGlobalMap', 'applyGlobalIntention'],
      `Intention skill with id ${intentionData.skillId} not found!`,
    );
    return new InvalidIntentionError();
  }

  const currentLocation = await globalMapStorage.getLocationById(sourceCreature.globalLocationId);
  if (currentLocation === null) {
    context.providers.logger.error(
      ['ControllerGlobalMap', 'applyGlobalIntention'],
      `Intention source creature ${ sourceCreature.id} current location not found!`,
    );
    return new InvalidIntentionError();
  }

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
      const result = await moveCreatureToGlobalLocation(context, sourceCreature, currentLocation, targetLocation);
      if (result instanceof Error) return result;

      await sendGlobalMapUpdate(context, currentLocation);
      await sendGlobalMapUpdate(context, targetLocation);
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
  const providers = injectMap({
    config: configInjectionToken,
    logger: loggerInjectionToken,
    globalMapStorage: GlobalMapRepositoryInjectionToken,
    creatureStorage: CreatureRepositoryInjectionToken,
    userStorage: UserRepositoryInjectionToken,
  });

  const lazyProviders = injectMapLazy({
    sseTransport: TransportSSEInjectionToken,
  });

  const context: GlobalMapControllerContext = {
    providers, lazyProviders,
  };

  return <const>{
    [typeKey]: GlobalMapControllerTypeSymbol,
    sendGlobalMapUpdate: sendGlobalMapUpdate.bind(null, context),
    sendGlobalMapUpdateToUser: sendGlobalMapUpdateToUser.bind(null, context),
    applyGlobalIntention: applyGlobalIntention.bind(null, context),
  };
};

export type GlobalMapController = ReturnType<typeof getGlobalMapController>;
