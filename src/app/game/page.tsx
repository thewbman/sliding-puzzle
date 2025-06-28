"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Board from "@/components/board";

export default function GamePage() {
  const [rowCount, setRowCount] = useState(3);
  const [columnCount, setColumnCount] = useState(3);
  const [aspectRatio, setAspectRatio] = useState(1.1);

  const nums = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Typography>Game</Typography>
        <TextField
          select
          label="Rows"
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
          defaultValue={1}
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
            setAspectRatio(parseFloat(`1.${e.target.value}`) - 0.3)
          }
        >
          {nums.map((n) => (
            <option key={n} value={n}>
              {n - 3}
            </option>
          ))}
        </TextField>
      </div>
      <Board
        rowCount={rowCount}
        columnCount={columnCount}
        aspectRatio={aspectRatio}
      />
    </div>
  );
}
