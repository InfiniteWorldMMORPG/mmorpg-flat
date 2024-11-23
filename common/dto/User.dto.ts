import { z } from 'zod';

import type { UUIDv4 } from '#lib/utils';

import type { PlayerCreatureOutputDTO } from './Creature.dto';

export const UserFlatOutputDTOSchema = z.object({
  id: z.string().uuid(),
  playerCreatureId: z.string().uuid(),
});

export type UserFlatOutputDTO = z.infer<typeof UserFlatOutputDTOSchema>;

export const UserOutputDTOSchema = z.object({
  id: z.string().uuid(),
  playerCreature: z.any(), // PlayerCreatureOutputDTO;
});

export type UserOutputDTO = z.infer<typeof UserOutputDTOSchema>;

export const UserInputDTOSchema = z.object({
  nickname: z.string(),
  login: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UserInputDTO = z.infer<typeof UserInputDTOSchema>;

export const SignInInputDTOSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export type SignInInputDTO = z.infer<typeof SignInInputDTOSchema>;

export const SignUpInputDTOSchema = z.object({
  nickname: z.string(),
  login: z.string(),
  email: z.string(),
  password: z.string(),
});

export type SignUpInputDTO = z.infer<typeof SignUpInputDTOSchema>;
