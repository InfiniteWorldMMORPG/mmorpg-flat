import { UUIDv4 } from '#lib/utils';

export class TokenInvalidError extends Error {
  constructor(token: string) {
    super(`Auth token ${token} is invalid!`);
  }
}

export class UserNotFoundError extends Error {
  constructor(userId: UUIDv4) {
    super(`User with id ${userId} not found!`);
  }
}

export class UnknownError extends Error {
  constructor() {
    super('Unknown error!');
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid login or password!');
  }
}
