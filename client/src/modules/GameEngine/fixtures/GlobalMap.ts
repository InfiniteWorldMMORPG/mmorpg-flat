import { compareVectors2, createUUIDv4, isNullOrUndefined, type Vector2 } from '#lib/utils';
import type { GlobalLocationFlatOutputDTO, GlobalMapOutputDTO } from '../../../../lib/dto';

const generateLocations = (map: GlobalMapOutputDTO): GlobalLocationFlatOutputDTO[] => {
  const locations: GlobalLocationFlatOutputDTO[] = [];
  const maxX = map.size[0] - 1;
  const maxY = map.size[1] - 1;
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      locations.push({
        id: createUUIDv4(),
        coordinates: [x, y],
        moveCost: 1,
        canMove: x >= 2 && y >= 2 && x <= maxX - 2 && y <= maxY - 2,
      });
    }
  }
  return locations;
};

export const globalMap: GlobalMapOutputDTO = {
  id: createUUIDv4(),
  size: [9, 9],
  locations: [],
};

const globalLocationList = generateLocations(globalMap);
globalMap.locations = globalLocationList;

const centerMapCoordinates: Vector2 = [Math.floor(globalMap.size[0] / 2), Math.floor(globalMap.size[1] / 2)];

const centerMapLocation = globalLocationList.find((location) => compareVectors2(location.coordinates, centerMapCoordinates));

if (isNullOrUndefined(centerMapLocation)) throw new Error('Center map location not found');

export const basePlayerSpawnLocation: GlobalLocationFlatOutputDTO = centerMapLocation;
