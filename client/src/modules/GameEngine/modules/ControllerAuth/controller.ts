import { inject } from '#lib/DI';
import { createUUIDv4, typeKey, type UUIDv4, type Vector2 } from '#lib/utils';
import type { GlobalMapOutputDTO } from '#lib/dto';
import { TransportSSEInjectionToken } from '#ge-modules/TransportSSE';
import { TransportHTTPInjectionToken } from '#ge-modules/TransportHTTP';

import { GlobalMapControllerTypeSymbol } from './constants';



const sendUserGlobalMapUpdate = (user: User, sessionId: UUIDv4): void => {
  const globalMap: GlobalMapOutputDTO = ;
  const transportSSE = inject(TransportSSEInjectionToken);
  transportSSE.dispatchEvent(new CustomEvent('globalMapUpdate', { detail: globalMap })); // user????? not for now
};

const createGlobalIntention = (user: User, sessionId: UUIDv4): void => {
  const globalMap: GlobalMapOutputDTO = ;
  const transportSSE = inject(TransportSSEInjectionToken);
  transportSSE.dispatchEvent(new CustomEvent('globalMapUpdate', { detail: globalMap })); // user????? not for now
};

export const getGlobalMapController = () => {
  const transportHTTP = inject(TransportHTTPInjectionToken);
  transportHTTP.addEventListener('GlobalIntentionApply', callback)

  return <const>{
    [typeKey]: GlobalMapControllerTypeSymbol,
    createGlobalIntention,
  };
};

export type GlobalMapController = ReturnType<typeof getGlobalMapController>;
