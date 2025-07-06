"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import Tile, { TileProps } from "@/components/tile";
import BlankTile from "@/components/blankTile";

import {
  generateHomeTiles,
  getNewPositionIfValid,
  shuffleTiles,
} from "@/lib/board.lib";
import { BoardSetup, Position } from "@/types";

import "./board.variables.css";
import "./board.css";

export default function Board(board: Readonly<BoardSetup>) {
  const [playerClicks, setPlayerClicks] = useState(0);
  const [playerMoves, setPlayerMoves] = useState(0);
  const [tiles, setTiles] = useState<TileProps[]>([]);
  const [showTileLabel, setShowTileLabel] = useState(false);
  const [emptyPosition, setEmptyPosition] = useState<Position | null>(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const { homeTiles, blankPosition } = generateHomeTiles(board);
    setTiles(homeTiles);
    setEmptyPosition(blankPosition);
    setPlayerClicks(0);
    setPlayerMoves(0);
  }, [board]);

  useEffect(() => {
    setSolved(
      tiles.every(
        (t) =>
          t.currentPosition.x === t.homePosition.x &&
          t.currentPosition.y === t.homePosition.y
      )
    );
  }, [tiles]);

  const handleShuffleClick = () => {
    const { updateTiles, blankPosition } = shuffleTiles(tiles, board);
    setTiles(updateTiles);
    setEmptyPosition(blankPosition);
    setPlayerClicks(0);
    setPlayerMoves(0);
  };

  const handleTileClick = (index: number) => {
    setPlayerClicks((prev) => prev + 1);
    const { newPosition, previousPosition } = getNewPositionIfValid(
      index,
      tiles,
      board
    );
    if (newPosition) {
      setPlayerMoves((prev) => prev + 1);
      setTiles((ts) =>
        ts.map((t) =>
          t.index === index ? { ...t, currentPosition: { ...newPosition } } : t
        )
      );
      if (previousPosition) {
        setEmptyPosition({ ...previousPosition });
      }
    }
    // TODO add multi-moves in a straight line
  };

  const handleBlankTileClick = () => {
    setShowTileLabel((prev) => !prev);
  };

  const wrapperClassName = `board-container total-rows-${board.rowCount} total-columns-${board.columnCount}`;
  const boardClassName = `board${showTileLabel ? " showTileLabel" : ""}`;

  return (
    <div
      className={wrapperClassName}
      style={{ "--tile-aspect-ratio": board.aspectRatio }}
    >
      <Typography>
        Board ({playerMoves} moves, {playerClicks} clicks)
        {solved ? " SOLVED!!!!" : ""}
      </Typography>
      <Button onClick={handleShuffleClick}>Shuffle</Button>
      <div className={boardClassName}>
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
        {emptyPosition ? (
          <BlankTile position={emptyPosition} onClick={handleBlankTileClick} />
        ) : null}
      </div>
    </div>
  );
}
