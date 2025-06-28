"use client";
import type { Position, BoardSize, ScreenSize } from "@/types";

export const getTileWidthPx = ({ columnCount }: BoardSize, w: ScreenSize) => {
  if (w?.width) {
    return Math.min(w.width / columnCount , 160);
  }

  return 160;
};
export const getTileHeightPx = () => 160;

export const getTileStyle = (
  { x, y }: Position,
  homePosition: Position,
  board: BoardSize,
  w: ScreenSize
): React.CSSProperties => {
  const isInHomePosition = homePosition.x === x && homePosition.y == y;

  return {
    position: "absolute",
    top: `${y * getTileHeightPx()}px`,
    left: `${x * getTileWidthPx(board, w)}px`,
    width: `${getTileWidthPx(board, w)}px`,
    height: `${getTileHeightPx()}px`,
    border: isInHomePosition
      ? `1px solid #73AD21`
      : `1px solid rgb(173, 35, 33)`,
    backgroundColor: isInHomePosition ? "#111111A0" : "#11111170",
  };
};
