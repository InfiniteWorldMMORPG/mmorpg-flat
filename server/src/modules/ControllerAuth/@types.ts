import { Config } from '#modules/Config';
import { Logger } from '#modules/Logger';
import { UserRepository } from '#modules/StorageUser';

export interface AuthControllerContext {
  providers: {
    config: Config;
    logger: Logger;
    userStorage: UserRepository;
  };
}
