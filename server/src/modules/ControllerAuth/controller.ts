
import { injectMap } from '#lib/DI';
import { isNullOrUndefined, typeKey } from '#lib/utils';

import type { PlayerCreatureOutputDTO, UserFlatOutputDTO, UserInputDTO, UserOutputDTO } from '#lib/dto';
import type { User } from '#modules/StorageUser/@types';
import { UserRepositoryInjectionToken } from '#modules/StorageUser';

import { configInjectionToken } from '#modules/Config';
import { loggerInjectionToken } from '#modules/Logger';

import { AuthControllerContext } from './@types';
import { AuthControllerTypeSymbol } from './constants';
import { InvalidCredentialsError, TokenInvalidError, UnknownError } from './errors';
import { buildHash, buildToken, compareHash, verifyToken } from './utils';

const transformUser = {
  toFlatDTO(user: User): UserFlatOutputDTO {
    return {
      id: user.id,
      playerCreatureId: user.playerCreatureId,
    };
  },
  toDTO(user: User, playerCreature: PlayerCreatureOutputDTO): UserOutputDTO {
    return {
      id: user.id,
      playerCreature,
    };
  }
};

const whoAmI = async (context: AuthControllerContext, token: string): Promise<UserFlatOutputDTO | null> => {
  const user = await getUserByToken(context, token);
  if (user instanceof Error) return null;
  if (user === null) return null;

  return transformUser.toFlatDTO(user);
};

const getUserByToken = async (context: AuthControllerContext, token: string): Promise<User | null | TokenInvalidError> => {
  const tokenPayload = await verifyToken(token, context.providers.config.jwtSecret);
  if (tokenPayload instanceof Error) {
    context.providers.logger.error(['AuthController', 'getUserByToken'], tokenPayload.message);
    return new TokenInvalidError(token);
  }

  const id = tokenPayload.id;

  if (isNullOrUndefined(id) || typeof id !== 'string') {
    context.providers.logger.error(['AuthController', 'getUserByToken'], `Token payload is invalid ${JSON.stringify(tokenPayload)}`);
    return new TokenInvalidError(token);
  }

  return context.providers.userStorage.getUserById(id);
};

const signIn = async (context: AuthControllerContext, login: string, password: string): Promise<string | InvalidCredentialsError> => {
  const user = await context.providers.userStorage.getUserByLogin(login);
  if (user === null) return new InvalidCredentialsError();

  const isPasswordEqual = await compareHash(password, user.password);
  if (isPasswordEqual instanceof Error) {
    context.providers.logger.error(['AuthController', 'signIn'], isPasswordEqual.message);
    return new InvalidCredentialsError();
  }
  if (!isPasswordEqual) return new InvalidCredentialsError();

  const token = await buildToken(user.id, context.providers.config.jwtSecret);
  if (token instanceof Error) {
    context.providers.logger.error(['AuthController', 'signIn'], token.message);
    return new InvalidCredentialsError();
  }

  return token;
};

const signOut = async (context: AuthControllerContext, user: User): Promise<boolean> => {
  return true;
};

const signUp = async (context: AuthControllerContext, userDTO: UserInputDTO): Promise<string | UnknownError> => {
  const passwordHash = await buildHash(userDTO.password);
  if (passwordHash instanceof Error) {
    context.providers.logger.error(['AuthController', 'signIn'], passwordHash.message);
    return new UnknownError();
  }

  userDTO.password = passwordHash;

  console.log(userDTO);

  const user = await context.providers.userStorage.createUser(userDTO);
  if (user === null) return new UnknownError();

  const token = await buildToken(user.id, context.providers.config.jwtSecret);
  if (token instanceof Error) {
    context.providers.logger.error(['AuthController', 'signUp'], token.message);
    return new UnknownError();
  }

  return token;
};

export const getAuthController = () => {
  const providers = injectMap({
    config: configInjectionToken,
    logger: loggerInjectionToken,
    userStorage: UserRepositoryInjectionToken
  });

  const context: AuthControllerContext = {
    providers,
  };

  return <const>{
    [typeKey]: AuthControllerTypeSymbol,
    whoAmI: whoAmI.bind(null, context),
    signIn: signIn.bind(null, context),
    signUp: signUp.bind(null, context),
    signOut: signOut.bind(null, context),
    getUserByToken: getUserByToken.bind(null, context),
  };
};

export type AuthController = ReturnType<typeof getAuthController>;
