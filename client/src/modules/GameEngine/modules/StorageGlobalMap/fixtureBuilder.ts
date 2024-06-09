import { compareVectors2, createUUIDv4, isNullOrUndefined, type UUIDv4, type Vector2 } from '#lib/utils';

import type { GlobalMap, GlobalLocation } from './@types';

const buildLocation = (data: Omit<GlobalLocation, 'id' | 'createdAt' | 'updatedAt'>): GlobalLocation => {
  return {
    ...data,
    id: createUUIDv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const generateLocations = (map: GlobalMap): GlobalLocation[] => {
  const locations: GlobalLocation[] = [];
  const maxX = map.sizeX - 1;
  const maxY = map.sizeY - 1;
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      locations.push(buildLocation({
        coordinateX: x,
        coordinateY: y,
        mapId: map.id,
        battleMapTemplateId: createUUIDv4(),
        moveCost: 1,
        canMove: x >= 2 && y >= 2 && x <= maxX - 2 && y <= maxY - 2,
      }));
    }
  }
  return locations;
};

export const buildMap = (size: Vector2, id: UUIDv4 = createUUIDv4()): GlobalMap => {
  return {
    id,
    sizeX: size[0],
    sizeY: size[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// const globalLocationList = generateLocations(globalMap);
// globalMap.locations = globalLocationList;

export const map = buildMap([9, 9], 'b24025f9-16a8-4ac3-b04d-3d466201ace8');
export const locations = generateLocations(map);
export const centerMapCoordinates: Vector2 = [Math.floor(map.sizeX / 2), Math.floor(map.sizeY / 2)];

export const centerMapLocation: GlobalLocation = locations.find(
  (location) => compareVectors2([location.coordinateX, location.coordinateY], centerMapCoordinates),
) ?? locations[0];
