import { initProviders } from './providers';

export const init = async (): Promise<void> => {
  await initProviders();
};
