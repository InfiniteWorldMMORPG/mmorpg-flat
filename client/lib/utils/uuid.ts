export type UUIDv4 = string;

let createUUIDv4: () => UUIDv4;

if ('crypto' in self) {
  createUUIDv4 = (): UUIDv4 => self.crypto.randomUUID();
} else {
  const crypto = await import('node:crypto');
  createUUIDv4 = (): UUIDv4 => crypto.randomUUID();
}

export { createUUIDv4 };
