"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import Tile, { TileProps } from "@/components/tile";

import {
  generateHomeTiles,
  getNewPositionIfValid,
  shuffleTiles,
} from "@/lib/board.lib";
import { getTileHeightPx, getTileWidthPx } from "@/lib/board.layout";
import { BoardSize } from "@/types";
import useScreenSize from "@/hooks/screen-size.hook";

export default function Board(board: Readonly<BoardSize>) {
  const [playerClicks, setPlayerClicks] = useState(0);
  const [playerMoves, setPlayerMoves] = useState(0);
  const [tiles, setTiles] = useState<TileProps[]>([]);

  const screenSize = useScreenSize();

  useEffect(() => {
    setTiles(
      generateHomeTiles(
        board
        // Math.round(Math.random() * TOTAL_POSITIONS)
      )
    );
  }, [board]);

  const handleShuffleClick = () => {
    setTiles(shuffleTiles(tiles, board));
  };

  const handleTileClick = (index: number) => {
    setPlayerClicks((prev) => prev + 1);
    const newPosition = getNewPositionIfValid(index, tiles, board);
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
          width: `${getTileWidthPx(board, screenSize) * board.columnCount}px`,
          height: `${getTileHeightPx() * board.rowCount}px`,
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
            board={board}
            onClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
}
