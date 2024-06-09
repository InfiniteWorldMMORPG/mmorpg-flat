import type { UUIDv4 } from '#lib/utils';

export interface User {
  id: UUIDv4;
  nickname: string;
  login: string;
  email: string;
  password: string;
  playerCreatureId: UUIDv4;
  createdAt: Date;
  updatedAt: Date;
}
