export type UUIDv4 = string;

let createUUIDv4: () => UUIDv4;

if ('crypto' in globalThis) {
  createUUIDv4 = (): UUIDv4 => globalThis.crypto.randomUUID();
} else {
  const crypto = require('node:crypto');
  createUUIDv4 = (): UUIDv4 => crypto.randomUUID();
}

export { createUUIDv4 };
