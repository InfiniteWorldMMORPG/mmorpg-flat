import type { CreatureOutputDTO, GlobalIntentionInputDTO, GlobalMapOutputDTO, UserFlatOutputDTO } from '#lib/dto';
import { main } from '#modules/GameEngine';

const { httpAPI, sseAPI } = await main();

export const whoAmI = async (): Promise<UserFlatOutputDTO | null> => {
  const token = '';
  return httpAPI.connect(token);
};

export const refresh = async (): Promise<void> => {
  const token = '';
  await httpAPI.refresh(token);
};

export const sendGlobalIntentionToServer = async (intention: GlobalIntentionInputDTO): Promise<void> => {
  const token = '';
  await httpAPI.applyGlobalIntention(token, intention);
};

export const subscribeOnGlobalMapUpdate = async (callback: (map: GlobalMapOutputDTO) => void): Promise<void> => {
  const eventSource = await sseAPI.connect('');
  if (eventSource === null) return; // @TODO(ikos): нужно подумать как сообщать об ошибке

  eventSource.addEventListener('globalMapUpdate', (event: Event) => {
    const map: GlobalMapOutputDTO = (event as CustomEvent<GlobalMapOutputDTO>).detail;
    console.log('globalMapUpdate', map);
    callback(map);
  });
};

export const subscribeOnPlayerUpdate = async (callback: (player: CreatureOutputDTO) => void): Promise<void> => {
  const eventSource = await sseAPI.connect('');
  if (eventSource === null) return; // @TODO(ikos): нужно подумать как сообщать об ошибке

  eventSource.addEventListener('playerUpdate', (event: Event) => {
    const player: CreatureOutputDTO = (event as CustomEvent<CreatureOutputDTO>).detail;
    console.log('playerUpdate', player);
    callback(player);
  });
};
