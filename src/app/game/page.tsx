"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import Board from "@/components/board";

export default function GamePage() {
  const [rowCount, setRowCount] = useState(4);
  const [columnCount, setColumnCount] = useState(3);
  const [aspectRatio, setAspectRatio] = useState(0.8);
  const [randomHolePlacement, setRandomHolePlacement] = useState(false);

  const nums = [2, 3, 4, 5, 6];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography>Game</Typography>
        <TextField
          select
          label="Rows"
          defaultValue={4}
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
          defaultValue={3}
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
        <TextField
          select
          label="Aspect Ratio"
          defaultValue={2}
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
          onChange={(e) =>
            setAspectRatio(parseFloat(`1.${e.target.value}`) - 0.2)
          }
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
        ></Checkbox>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Board
          rowCount={rowCount}
          columnCount={columnCount}
          aspectRatio={aspectRatio}
          randomHolePlacement={randomHolePlacement}
        />
      </div>
    </div>
  );
}
