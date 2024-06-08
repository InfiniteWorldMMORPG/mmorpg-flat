import { type InjectionToken, provide, inject } from '#lib/DI';
import { GlobalMapRepositoryInjectionToken } from '#ge-modules/StorageGlobalMap';
import { AuthControllerInjectionToken } from '#ge-modules/ControllerAuth';
import { GlobalMapControllerInjectionToken } from '#ge-modules/ControllerGlobalMap';
import type { GlobalIntentionInputDTO, UserFlatOutputDTO } from '#lib/dto';
import type { User } from '#ge-modules/StorageUser/@types';
import { CreatureControllerInjectionToken } from '#ge-modules/ControllerCreature';

export interface RequestContext {
  user: User;
}

export interface TranportHTTP {
  connect(token: string): Promise<UserFlatOutputDTO | null>;
  applyGlobalIntention(token: string, intention: GlobalIntentionInputDTO): Promise<null | undefined>;
}

export const TransportHTTPInjectionToken: InjectionToken<TranportHTTP> = {
  id: Symbol('TransportHTTP'),
  guard(value: unknown): value is TranportHTTP {
    return typeof value === 'object' && value != null && 'connect' in value && 'applyGlobalIntention' in value;
  },
};

export const provider = async (): Promise<void> => {
  const authController = inject(AuthControllerInjectionToken);
  const globalMapController = inject(GlobalMapControllerInjectionToken);
  const creatureController = inject(CreatureControllerInjectionToken);

  const transport = {
    async connect(token: string): Promise<UserFlatOutputDTO | null> {
      const user = await authController.whoAmI(token);
      if (user === null) return null;
      await creatureController.sendPlayerUpdate({ user });
      await globalMapController.sendGlobalMapUpdate({ user });
      return user;
    },
    async applyGlobalIntention(token: string, intention: GlobalIntentionInputDTO) {
      const user = await authController.whoAmI(token);
      if (user === null) return null; // @TODO(ikos) return Error?
      const context: RequestContext = {
        user,
      };
      await globalMapController.applyGlobalIntention(context, intention);
    },
  };

  provide(TransportHTTPInjectionToken, transport);
};
