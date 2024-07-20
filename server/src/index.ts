import { TransportHTTPInjectionToken } from '#modules/TransportHTTP';
import { TransportSSEInjectionToken } from '#modules/TransportSSE';
import { init } from '#modules/_ROOT_';
import { inject } from '#lib/DI';

export const main = async () => {
  await init();

  const transportHTTP = inject(TransportHTTPInjectionToken);
  const transportSSE = inject(TransportSSEInjectionToken);

  return {
    httpAPI: transportHTTP,
    sseAPI: transportSSE,
  };
};
