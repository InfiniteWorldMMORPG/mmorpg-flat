import { type InjectionToken, provide } from '#lib/DI';
import { typeKey } from '#lib/utils';

import { GlobalMapControllerTypeSymbol } from './constants';
import { getGlobalMapController, type GlobalMapController } from './controller';

export const GlobalMapControllerInjectionToken: InjectionToken<GlobalMapController> = {
  id: Symbol(GlobalMapControllerTypeSymbol),
  guard(value: unknown): value is GlobalMapController {
    return typeof value === 'object' && value != null && typeKey in value && value[typeKey] === GlobalMapControllerTypeSymbol;
  },
};

export const provider = async (): Promise<void> => {
  const controller = getGlobalMapController();

  provide(GlobalMapControllerInjectionToken, controller);
};
