import { AuthControllerInjectionToken } from '#modules/ControllerAuth';
import { type InjectionToken, provide, inject } from '#lib/DI';
import type { UUIDv4 } from '#lib/utils';

export interface TransportSSE {
  clients: Record<UUIDv4, EventTarget>;
  connect(token: string): Promise<EventTarget | null>;
}

export const TransportSSEInjectionToken: InjectionToken<TransportSSE> = {
  id: Symbol('TransportSSE'),
  guard(value: unknown): value is TransportSSE {
    return typeof value === 'object' && value != null && 'connect' in value;
  },
};

export const provider = async (): Promise<void> => {
  const authController = inject(AuthControllerInjectionToken);

  const transport: TransportSSE = {
    clients: {},
    async connect(token: string): Promise<EventTarget | null> {
      const user = await authController.whoAmI(token);
      if (user === null) return null;

      if (user.id in this.clients) return this.clients[user.id];

      this.clients[user.id] = new EventTarget();
      return this.clients[user.id];
    }
  };

  provide(TransportSSEInjectionToken, transport);
};
