import { provider as loggerProvider } from '#modules/Logger';
import { provider as configProvider } from '#modules/Config';

import { provider as storageProvider } from '#modules/Storage';
import { provider as globalMapStorageProvider } from '#modules/StorageGlobalMap';
import { provider as creatureStorageProvider } from '#modules/StorageCreature';
import { provider as userStorageProvider } from '#modules/StorageUser';

import { provider as authControllerProvider } from '#modules/ControllerAuth';
import { provider as globalMapControllerProvider } from '#modules/ControllerGlobalMap';
import { provider as creatureControllerProvider } from '#modules/ControllerCreature';

import { provider as transportHTTPProvider } from '#modules/TransportHTTP';
import { provider as transportSSEProvider } from '#modules/TransportSSE';

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
