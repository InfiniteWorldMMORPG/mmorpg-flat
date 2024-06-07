import { type InjectionToken, provide } from '#lib/DI';

export const TransportHTTPInjectionToken: InjectionToken<EventTarget> = {
  id: Symbol('TransportHTTP'),
  guard(value: unknown): value is EventTarget {
    return typeof value === 'object' && value != null && value instanceof EventTarget;
  },
};

export const provider = async (): Promise<void> => {
  const eventSource: EventTarget = new EventTarget();

  provide(TransportHTTPInjectionToken, eventSource);
};
