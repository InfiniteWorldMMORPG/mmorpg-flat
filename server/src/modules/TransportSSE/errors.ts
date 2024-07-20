import { UUIDv4 } from '#lib/utils';

export class ErrorListenerNotFound extends Error {
  constructor(userId: UUIDv4) {
    super(`Listener for user ${userId} not found!`);
  }
}
