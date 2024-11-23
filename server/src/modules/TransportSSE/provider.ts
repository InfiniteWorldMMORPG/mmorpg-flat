import { type InjectionToken, provide } from '#lib/DI';

import { type TransportSSE, build } from './transport';

export const TransportSSEInjectionToken: InjectionToken<TransportSSE> = {
  id: Symbol('TransportSSE'),
  guard(value: unknown): value is TransportSSE {
    return typeof value === 'object' && value != null && 'subscribeUserToEvent' in value && 'sendEventMessage' in value;
  },
};

export const provider = async (): Promise<void> => {
  const transport = build();

  provide(TransportSSEInjectionToken, transport);
};
