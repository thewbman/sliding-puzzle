"use client";
import Typography from "@mui/material/Typography";

import type { BoardSetup, Position } from "@/types";

import "./tile.css";

export interface TileProps {
  index: number;
  label: string;
  currentPosition: Position;
  homePosition: Position;
  board: BoardSetup;
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

  const isInHomePosition =
    homePosition.x === currentPosition.x && homePosition.y == currentPosition.y;
  const tileClassName = `tile row-${currentPosition.y} column-${
    currentPosition.x
  }${isInHomePosition ? " isInHomePosition" : ""}`;

  return (
    <div className={tileClassName} onClick={() => onClick(index)}>
      <Typography align="center" variant="h2">
        {label}
      </Typography>
      <Typography align="center">
        Home: {JSON.stringify(homePosition)}
      </Typography>
    </div>
  );
}
