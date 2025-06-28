import Typography from "@mui/material/Typography";

import type { Position } from "@/types";
import { getTileStyle } from "@/lib/board.layout";

export interface TileProps {
  index: number;
  label: string;
  currentPosition: Position;
  homePosition: Position;
}

interface PropsWithFunction extends TileProps {
  onClick: (i: number) => void;
}

export default function Tile({
  index,
  label,
  currentPosition,
  homePosition,
  onClick,
}: Readonly<PropsWithFunction>) {
  return (
    <div
      style={getTileStyle(currentPosition, homePosition)}
      onClick={() => onClick(index)}
    >
      <Typography align="center" variant="h2">{label}</Typography>
      <Typography align="center">
        Home: {JSON.stringify(homePosition)}
      </Typography>
    </div>
  );
}
