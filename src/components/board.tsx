"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import Tile, { TileProps } from "@/components/tile";

import {
  generateHomeTiles,
  getNewPositionIfValid,
  shuffleTiles,
} from "@/lib/board.lib";
import { getTileHeightEm, getTileWidthEm } from "@/lib/board.layout";

interface Props {
  rowCount: number;
  columnCount: number;
}

export default function Board({ rowCount, columnCount }: Props) {
  const [playerClicks, setPlayerClicks] = useState(0);
  const [playerMoves, setPlayerMoves] = useState(0);
  const [tiles, setTiles] = useState<TileProps[]>([]);

  useEffect(() => {
    setTiles(
      generateHomeTiles(
        rowCount,
        columnCount
        // Math.round(Math.random() * TOTAL_POSITIONS)
      )
    );
  }, [rowCount, columnCount]);

  const handleShuffleClick = () => {
    setTiles(shuffleTiles(tiles, rowCount, columnCount));
  };

  const handleTileClick = (index: number) => {
    setPlayerClicks((prev) => prev + 1);
    const newPosition = getNewPositionIfValid(
      index,
      tiles,
      rowCount,
      columnCount
    );
    if (newPosition) {
      setPlayerMoves((prev) => prev + 1);
      setTiles((ts) =>
        ts.map((t) =>
          t.index === index ? { ...t, currentPosition: { ...newPosition } } : t
        )
      );
    }
  };

  return (
    <div style={{ backgroundColor: "yellow", color: "black" }}>
      <div>
        Board ({playerMoves} moves, {playerClicks} clicks)
      </div>
      <Button onClick={handleShuffleClick}>Shuffle</Button>
      <div
        style={{
          width: `${getTileWidthEm() * columnCount}em`,
          height: `${getTileHeightEm() * rowCount}em`,
          borderColor: "blue",
          borderWidth: 1,
          borderStyle: "solid",
          position: "relative",
        }}
      >
        {tiles?.map((t) => (
          <Tile
            key={t.index}
            index={t.index}
            label={t.label}
            homePosition={t.homePosition}
            currentPosition={t.currentPosition}
            onClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
}
