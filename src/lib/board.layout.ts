import type { Position } from "@/types";

export const getTileWidthEm = () => 10;
export const getTileHeightEm = () => 10;

export const getTileStyle = (
  { x, y }: Position,
  homePosition: Position
): React.CSSProperties => {
  const isInHomePosition = homePosition.x === x && homePosition.y == y;

  return {
    position: "absolute",
    top: `${y * getTileHeightEm()}em`,
    left: `${x * getTileWidthEm()}em`,
    width: `${getTileWidthEm()}em`,
    height: `${getTileHeightEm()}em`,
    border: isInHomePosition ? `1px solid #73AD21` : `1px solid rgb(173, 35, 33)`,
    backgroundColor: isInHomePosition ? "#111111A0" : "#11111170",
  };
};
