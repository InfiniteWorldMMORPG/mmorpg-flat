import type { GameMap } from './GameMap';
import type { BattleMapTemplate } from './BattleMapTemplate';
import type { Creature } from './Creature';

export interface GameLocation {
  id: UUIDv4;
  coordinates: Vector2;
  mapId: GameMap['id'];
  battleMapTemplateId: BattleMapTemplate['id'];
  creatures: Creature[];
}
