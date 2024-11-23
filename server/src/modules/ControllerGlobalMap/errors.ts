export class InvalidIntentionError extends Error {
  constructor() {
    super('Invalid intention');
  }
}

export class NotEnoughMovePointsError extends Error {
  constructor() {
    super('Not enough move points');
  }
}

export class LocationIsNotMovableError extends Error {
  constructor() {
    super('Location is not movable');
  }
}

export class LocationIsNotAdjacentError extends Error {
  constructor() {
    super('Location is not adjacent');
  }
}
