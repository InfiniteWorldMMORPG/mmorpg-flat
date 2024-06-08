import { type InjectionToken, provide } from '#lib/DI';
import { typeKey } from '#lib/utils';

import { AuthControllerTypeSymbol } from './constants';
import { getAuthController, type AuthController } from './controller';

export const AuthControllerInjectionToken: InjectionToken<AuthController> = {
  id: Symbol(AuthControllerTypeSymbol),
  guard(value: unknown): value is AuthController {
    return typeof value === 'object' && value != null && typeKey in value && value[typeKey] === AuthControllerTypeSymbol;
  },
};

export const provider = async (): Promise<void> => {
  const controller = getAuthController();

  provide(AuthControllerInjectionToken, controller);
};
