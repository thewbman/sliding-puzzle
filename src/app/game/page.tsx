"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useImageSize } from "react-image-size";

import Board from "@/components/board";

export default function GamePage() {
  const DEFAULT_ROWS = 4;
  const DEFAULT_COLUMNS = 3;
  const LOWER_IMAGE_NUMBER = 1680;
  const UPPER_IMAGE_NUMBER = 2320;

  const [rowCount, setRowCount] = useState(DEFAULT_ROWS);
  const [columnCount, setColumnCount] = useState(DEFAULT_COLUMNS);
  const [randomHolePlacement, setRandomHolePlacement] = useState(false);
  const [imageNumber, setImageNumber] = useState(
    Math.floor(
      LOWER_IMAGE_NUMBER +
        Math.random() * (UPPER_IMAGE_NUMBER - LOWER_IMAGE_NUMBER)
    )
  );

  const nums = [2, 3, 4, 5, 6];
  const imageNums = Array.from(
    Array(UPPER_IMAGE_NUMBER - LOWER_IMAGE_NUMBER).keys()
  ).map((n) => n + LOWER_IMAGE_NUMBER);

  const imgUrl = `https://freenaturestock.com/wp-content/uploads/freenaturestock-${imageNumber}.jpg`;

  const [dimensions, { loading, error }] = useImageSize(imgUrl);

  const aspectRatio =
    dimensions?.height && dimensions?.width
      ? (columnCount * dimensions.height) / (rowCount * dimensions.width)
      : 0.1;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography>Game</Typography>
        <TextField
          select
          label="Rows"
          defaultValue={DEFAULT_ROWS}
          slotProps={{
            select: {
              native: true,
            },
          }}
          style={{
            color: "white",
            backgroundColor: "silver",
            marginTop: "1em",
            marginLeft: "10px",
          }}
          onChange={(e) => setRowCount(parseInt(e.target.value))}
        >
          {nums.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </TextField>
        <TextField
          select
          label="Columns"
          defaultValue={DEFAULT_COLUMNS}
          slotProps={{
            select: {
              native: true,
            },
          }}
          style={{
            color: "white",
            backgroundColor: "silver",
            marginTop: "1em",
            marginLeft: "10px",
          }}
          onChange={(e) => setColumnCount(parseInt(e.target.value))}
        >
          {nums.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </TextField>

        <Checkbox
          style={{
            color: "white",
            backgroundColor: "silver",
            marginTop: "1em",
            marginLeft: "10px",
          }}
          onChange={(e) => setRandomHolePlacement(e.target.checked)}
        />

        <TextField
          select
          label="Image"
          defaultValue={imageNumber}
          slotProps={{
            select: {
              native: true,
            },
          }}
          style={{
            color: "white",
            backgroundColor: "silver",
            marginTop: "1em",
            marginLeft: "10px",
          }}
          onChange={(e) => setImageNumber(parseInt(e.target.value))}
        >
          {imageNums.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </TextField>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {loading ? (
          "Loading"
        ) : error ? (
          `Error loading image - please try another image`
        ) : (
          <Board
            rowCount={rowCount}
            columnCount={columnCount}
            aspectRatio={aspectRatio}
            randomHolePlacement={randomHolePlacement}
            imageUrl={imgUrl}
          />
        )}
      </div>
    </div>
  );
}
