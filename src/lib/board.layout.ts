import type { Position, BoardSize } from "@/types";

interface WindowDimensions {
  width: number;
  height: number;
}

function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

export const getTileWidthPx = ({ columnCount }: BoardSize) => {
  const w = getWindowDimensions();

  if(w.width) {
    return Math.min(w.width / columnCount, 160);
  }

  return 160;
};
export const getTileHeightPx = () => 160;

export const getTileStyle = (
  { x, y }: Position,
  homePosition: Position,
  board: BoardSize
): React.CSSProperties => {
  const isInHomePosition = homePosition.x === x && homePosition.y == y;

  return {
    position: "absolute",
    top: `${y * getTileHeightPx()}px`,
    left: `${x * getTileWidthPx(board)}px`,
    width: `${getTileWidthPx(board)}px`,
    height: `${getTileHeightPx()}px`,
    border: isInHomePosition
      ? `1px solid #73AD21`
      : `1px solid rgb(173, 35, 33)`,
    backgroundColor: isInHomePosition ? "#111111A0" : "#11111170",
  };
};
