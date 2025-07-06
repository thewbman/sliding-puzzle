"use client";
import Typography from "@mui/material/Typography";

import type { Position } from "@/types";

import "./blankTile.css";

interface Props {
  position: Position;
}

interface PropsWithFunction extends Props {
  onClick: () => void;
}

export default function BlankTile({
  position,
  onClick,
}: Readonly<PropsWithFunction>) {
  const blankTileClassName = `blank-tile row-${position.y} column-${position.x}`;

  return (
    <div
      className={blankTileClassName}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <Typography
        className="label"
        align="center"
        variant="h2"
        style={{ zIndex: 10, position: "relative" }}
      >
        X
      </Typography>
    </div>
  );
}
