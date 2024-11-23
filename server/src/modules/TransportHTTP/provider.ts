import { type InjectionToken, provide } from '#lib/DI';

import { type TransportHTTP, build } from './transport';

// export interface TranportHTTP {
//   connect(token: string): Promise<UserFlatOutputDTO | null>;
//   applyGlobalIntention(token: string, intention: GlobalIntentionInputDTO): Promise<null | undefined>;
//   disconnect(token: string): Promise<void>;
//   refresh(token: string): Promise<void>;
// }

export const TransportHTTPInjectionToken: InjectionToken<TransportHTTP> = {
  id: Symbol('TransportHTTP'),
  guard(value: unknown): value is TransportHTTP {
    return typeof value === 'object' && value != null;
  },
};

export const provider = async (): Promise<void> => {
  // const authController = inject(AuthControllerInjectionToken);
  // const globalMapController = inject(GlobalMapControllerInjectionToken);
  // const creatureController = inject(CreatureControllerInjectionToken);

  // const transport: TranportHTTP = {
  //   async connect(token: string): Promise<UserFlatOutputDTO | null> {
  //     const user = await authController.whoAmI(token);
  //     if (user === null) return null;
  //     await creatureController.sendPlayerUpdate({ user });
  //     await globalMapController.sendGlobalMapUpdate({ user });
  //     return user;
  //   },
  //   async applyGlobalIntention(token: string, intention: GlobalIntentionInputDTO) {
  //     const user = await authController.whoAmI(token);
  //     if (user === null) return null; // @TODO(ikos) return Error?
  //     const context: RequestContext = {
  //       user,
  //     };
  //     const result = await globalMapController.applyGlobalIntention(context, intention);
  //     console.log(result);
  //     if (result instanceof Error) return null;
  //     await creatureController.sendPlayerUpdate({ user });
  //     await globalMapController.sendGlobalMapUpdate({ user });
  //   },
  //   async disconnect(token: string) {},
  //   async refresh(token: string) {
  //     const user = await authController.whoAmI(token);
  //     if (user === null) return;
  //     await creatureController.sendPlayerUpdate({ user });
  //     await globalMapController.sendGlobalMapUpdate({ user });
  //   },
  // };

  const transport = build();

  provide(TransportHTTPInjectionToken, transport);
};
