import { provider as loggerProvider } from '#ge-modules/Logger';
import { provider as configProvider } from '#ge-modules/Config';
import { provider as storageProvider } from '#ge-modules/Storage';
import { provider as storageGlobalMapProvider } from '#ge-modules/StorageGlobalMap';
import { provider as transportHTTPProvider } from '#ge-modules/TransportHTTP';
import { provider as transportSSEProvider } from '#ge-modules/TransportSSE';

const providers = <const>[
  configProvider,
  loggerProvider,
  storageProvider,
  storageGlobalMapProvider,
  transportHTTPProvider,
  transportSSEProvider,
];

export const initProviders = async () => {
  for (const initProvider of providers) await initProvider();
};
