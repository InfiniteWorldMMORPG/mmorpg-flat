export type Vector2 = [x: number, y: number];
export type Vector3 = [x: number, y: number, z: number];

export const compareVectors2 = (a: Vector2, b: Vector2) => a[0] === b[0] && a[1] === b[1];

export const compareVectors3 = (a: Vector3, b: Vector3) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
