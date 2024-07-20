import type { Vector2 } from './Vector';

export const isNearbyCoordinates = (a: Vector2, b: Vector2, distance: number): boolean => {
  return (Math.abs(a[0] - b[0]) <= distance && Math.abs(a[1] - b[1]) <= distance);
};

interface SimpleLocation {
  coordinateX: number;
  coordinateY: number;
}

export const isNearbyLocation = (a: SimpleLocation, b: SimpleLocation, distance: number): boolean => {
  return (Math.abs(a.coordinateX - b.coordinateX) <= distance && Math.abs(a.coordinateY - b.coordinateY) <= distance);
};
