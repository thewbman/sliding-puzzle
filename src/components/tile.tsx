"use client";
import Image from "next/image";
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
  board,
  onClick,
}: Readonly<PropsWithFunction>) {
  const isInHomePosition =
    homePosition.x === currentPosition.x && homePosition.y == currentPosition.y;
  const tileClassName = `tile row-${currentPosition.y} column-${
    currentPosition.x
  }${isInHomePosition ? " isInHomePosition" : " isNotInHomePosition"}`;

  const backgroundImageTopPct = -100 * homePosition.y;
  const backgroundImageLeftPct = -100 * homePosition.x;
  const backgroundImageTranslate = `translate(${backgroundImageTopPct},${backgroundImageTopPct})`;
  const backgroundImageWidth = `${100 * board.columnCount}%`;
  const backgroundImageHeight = `${100 * board.rowCount}%`;

  return (
    <div className={tileClassName} onClick={() => onClick(index)}>
      <Typography
        className="label"
        align="center"
        variant="h2"
        style={{ zIndex: 10, position: "relative" }}
      >
        {label}
      </Typography>
      {board.imageUrl ? (
        <div className="backgroundImageContainer">
          <Image
            className="backgroundImage"
            alt="tile"
            src={board.imageUrl}
            width={500}
            height={500}
            quality={100}
            style={{
              position: "absolute",
              top: `${backgroundImageTopPct}%`,
              left: `${backgroundImageLeftPct}%`,
              transform: backgroundImageTranslate,
              height: backgroundImageHeight,
              width: backgroundImageWidth,
              maxWidth: backgroundImageWidth,
              zIndex: 1,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
