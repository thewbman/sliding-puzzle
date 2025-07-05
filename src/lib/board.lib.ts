import type { Position, BoardSetup } from "@/types";
import { TileProps } from "@/components/tile";

export const generateHomeTiles = (
  board: BoardSetup
): TileProps[] => {
  const maxTiles = board.rowCount * board.columnCount - 1;
  const indexToRemove = board.randomHolePlacement
    ? Math.floor(Math.random() * board.columnCount * board.rowCount)
    : undefined;

  let numberLabel = 0;
  const tiles: TileProps[] = [];

  for (let y = 0; y < board.rowCount; y++) {
    for (let x = 0; x < board.columnCount; x++) {
      numberLabel++;
      const tile: TileProps = {
        index: numberLabel - 1,
        label: `${numberLabel}`,
        homePosition: { x, y },
        currentPosition: { x, y },
        board,
      };
      tiles.push(tile);
    }
  }

  if (
    indexToRemove === undefined ||
    indexToRemove === null ||
    indexToRemove < 0 ||
    indexToRemove > maxTiles
  ) {
    return tiles.slice(0, -1);
  }

  return tiles.filter((t) => t.index !== indexToRemove);
};

export const shuffleTiles = (
  input: TileProps[],
  board: BoardSetup
): TileProps[] => {
  const MOVE_ATTEMPTS = 5000; // most will not be valid
  let successfulMoves = 0;

  let tiles = [...input];

  for (let y = 0; y < MOVE_ATTEMPTS; y++) {
    const r = Math.floor(Math.random() * tiles.length);
    if (r >= 0 && r < tiles.length) {
      const indexToTry = tiles[r]?.index ?? 0;
      const newPosition = getNewPositionIfValid(indexToTry, tiles, board);
      if (newPosition) {
        successfulMoves++;
        tiles = tiles.map((t) =>
          t.index === indexToTry
            ? { ...t, currentPosition: { ...newPosition } }
            : t
        );
        // } else {
        //   console.warn("unable to move tile", indexToTry);
      }
    } else {
      console.error("expectected array index when shuffling", r);
    }
  }

  console.warn("overall shuffle results", successfulMoves, MOVE_ATTEMPTS);

  return tiles;
};

export const getNewPositionIfValid = (
  index: number,
  tiles: TileProps[],
  board: BoardSetup
): Position | null => {
  if (!tiles?.length) {
    return null;
  }

  const currentPosition = tiles.find((t) => t.index === index)?.currentPosition;

  if (!currentPosition) {
    return null;
  }

  const adjacentPositions = [
    { x: currentPosition.x, y: currentPosition.y + 1 },
    { x: currentPosition.x + 1, y: currentPosition.y },
    { x: currentPosition.x, y: currentPosition.y - 1 },
    { x: currentPosition.x - 1, y: currentPosition.y },
  ];

  const movablePosition = adjacentPositions
    .filter((a) => {
      if (
        a.x >= board.columnCount ||
        a.x < 0 ||
        a.y >= board.rowCount ||
        a.y < 0
      ) {
        return false;
      }

      return !tiles.find(
        (t) => t.currentPosition.x === a.x && t.currentPosition.y === a.y
      );
    })
    ?.find((x) => x);

  return movablePosition ?? null;
};
