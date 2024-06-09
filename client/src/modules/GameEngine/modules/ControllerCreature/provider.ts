import { type InjectionToken, provide } from '#lib/DI';
import { typeKey } from '#lib/utils';

import { CreatureControllerTypeSymbol } from './constants';
import { getCreatureController, type CreatureController } from './controller';

export const CreatureControllerInjectionToken: InjectionToken<CreatureController> = {
  id: Symbol(CreatureControllerTypeSymbol),
  guard(value: unknown): value is CreatureController {
    return typeof value === 'object' && value != null && typeKey in value && value[typeKey] === CreatureControllerTypeSymbol;
  },
};

export const provider = async (): Promise<void> => {
  const controller = getCreatureController();

  provide(CreatureControllerInjectionToken, controller);
};
