export type UUIDv4 = string;

export const createUUIDv4 = (): UUIDv4 => self.crypto.randomUUID();
