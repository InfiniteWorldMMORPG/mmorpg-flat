import { provider as loggerProvider } from '#ge-modules/Logger';
import { provider as configProvider } from '#ge-modules/Config';

import { provider as storageProvider } from '#ge-modules/Storage';
import { provider as globalMapStorageProvider } from '#ge-modules/StorageGlobalMap';
import { provider as creatureStorageProvider } from '#ge-modules/StorageCreature';
import { provider as userStorageProvider } from '#ge-modules/StorageUser';

import { provider as authControllerProvider } from '#ge-modules/ControllerAuth';
import { provider as globalMapControllerProvider } from '#ge-modules/ControllerGlobalMap';
import { provider as creatureControllerProvider } from '#ge-modules/ControllerCreature';

import { provider as transportHTTPProvider } from '#ge-modules/TransportHTTP';
import { provider as transportSSEProvider } from '#ge-modules/TransportSSE';

const providers = <const>[
  configProvider,
  loggerProvider,
  storageProvider,
  userStorageProvider,
  globalMapStorageProvider,
  creatureStorageProvider,
  authControllerProvider,
  globalMapControllerProvider,
  creatureControllerProvider,
  transportHTTPProvider,
  transportSSEProvider,
];

export const initProviders = async () => {
  for (const initProvider of providers) await initProvider();
};
