"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import Tile, { TileProps } from "@/components/tile";

import {
  generateHomeTiles,
  getNewPositionIfValid,
  shuffleTiles,
} from "@/lib/board.lib";
import { BoardSize } from "@/types";

import "./board.variables.css";
import "./board.css";

export default function Board(board: Readonly<BoardSize>) {
  const [playerClicks, setPlayerClicks] = useState(0);
  const [playerMoves, setPlayerMoves] = useState(0);
  const [tiles, setTiles] = useState<TileProps[]>([]);

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
    setPlayerClicks(0);
    setPlayerMoves(0);
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

  const wrapperClassName = `board-container total-rows-${board.rowCount} total-columns-${board.columnCount}`;

  return (
    <div
      className={wrapperClassName}
      style={{ "--tile-aspect-ratio": board.aspectRatio }}
    >
      <Typography>
        Board ({playerMoves} moves, {playerClicks} clicks)
      </Typography>
      <Button onClick={handleShuffleClick}>Shuffle</Button>
      <div className="board">
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
