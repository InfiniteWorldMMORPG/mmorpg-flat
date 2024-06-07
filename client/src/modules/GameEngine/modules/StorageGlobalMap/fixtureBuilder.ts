import { compareVectors2, createUUIDv4, isNullOrUndefined, type Vector2 } from '#lib/utils';

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

export const buildMap = (size: Vector2): GlobalMap => {
  return {
    id: createUUIDv4(),
    sizeX: size[0],
    sizeY: size[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// const globalLocationList = generateLocations(globalMap);
// globalMap.locations = globalLocationList;

// const centerMapCoordinates: Vector2 = [Math.floor(globalMap.size[0] / 2), Math.floor(globalMap.size[1] / 2)];

// const centerMapLocation = globalLocationList.find((location) => compareVectors2(location.coordinates, centerMapCoordinates));

// if (isNullOrUndefined(centerMapLocation)) throw new Error('Center map location not found');

// export const basePlayerSpawnLocation: GlobalLocation = centerMapLocation;
