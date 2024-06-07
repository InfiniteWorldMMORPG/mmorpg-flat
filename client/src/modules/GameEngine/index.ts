import { TransportHTTPInjectionToken } from '#ge-modules/TransportHTTP';
import { TransportSSEInjectionToken } from '#ge-modules/TransportSSE';
import { init } from '#ge-modules/_ROOT_';
import { inject } from '#lib/DI';

export const main = async () => {
  await init();

  const transportHTTP = inject(TransportHTTPInjectionToken);
  const transportSSE = inject(TransportSSEInjectionToken);

  return {
    createGlobalIntention,
    createBattleIntention,
    sseAPI: transportSSE,
  };
};
