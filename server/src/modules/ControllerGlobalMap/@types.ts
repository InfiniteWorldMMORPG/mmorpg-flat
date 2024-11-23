import type { Config } from '#modules/Config';
import type { Logger } from '#modules/Logger';
import type { CreatureRepository } from '#modules/StorageCreature';
import type { GlobalMapRepository } from '#modules/StorageGlobalMap';
import type { UserRepository } from '#modules/StorageUser';
import type { TransportSSE } from '#modules/TransportSSE';

export interface GlobalMapControllerContext {
  providers: {
    config: Config;
    logger: Logger;
    globalMapStorage: GlobalMapRepository;
    creatureStorage: CreatureRepository;
    userStorage: UserRepository;
  };
  lazyProviders: {
    sseTransport: () => TransportSSE;
  };
}
