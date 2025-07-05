"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
// import { useImageSize } from "react-image-size";

import Board from "@/components/board";

export default function GamePage() {
  const DEFAULT_ROWS = 4;
  const DEFAULT_COLUMNS = 3;
  const LOWER_IMAGE_NUMBER = 1680;
  const UPPER_IMAGE_NUMBER = 2320;

  const fullImageRef = useRef<HTMLImageElement>(null);
  const [rowCount, setRowCount] = useState(DEFAULT_ROWS);
  const [columnCount, setColumnCount] = useState(DEFAULT_COLUMNS);
  const [aspectRatio, setAspectRatio] = useState(0);
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

  // const [dimensions, { loading, error }] = useImageSize(imgUrl);

  const handleImageLoaded = useCallback(() => {
    if (
      fullImageRef.current?.offsetWidth &&
      fullImageRef.current?.offsetHeight
    ) {
      console.warn(
        "image offset",
        fullImageRef.current?.offsetWidth,
        fullImageRef.current?.offsetHeight
      );
      setAspectRatio(
        (columnCount * fullImageRef.current.offsetHeight) /
          (rowCount * fullImageRef.current.offsetWidth)
      );
    }
  }, [columnCount, rowCount]);

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
          onChange={(e) => {
            setAspectRatio(0);
            setRowCount(parseInt(e.target.value));
          }}
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
          onChange={(e) => {
            setAspectRatio(0);
            setColumnCount(parseInt(e.target.value));
          }}
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
          onChange={(e) => {
            setAspectRatio(0);
            setRandomHolePlacement(e.target.checked);
          }}
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
          onChange={(e) => {
            setAspectRatio(0);
            setImageNumber(parseInt(e.target.value));
          }}
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
        {aspectRatio > 0.1 ? (
          <Board
            rowCount={rowCount}
            columnCount={columnCount}
            aspectRatio={aspectRatio}
            randomHolePlacement={randomHolePlacement}
            imageUrl={imgUrl}
          />
        ) : (
          <div style={{ position: "relative", minWidth: 500 }}>
            <div
              style={{
                backgroundColor: "#000000",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                minHeight: 750,
              }}
            >
              Loading
            </div>
            <Image
              ref={fullImageRef}
              src={imgUrl}
              alt={"preload image to get size"}
              width={500}
              height={500}
              quality={100}
              onLoad={() => handleImageLoaded()}
              style={{ zIndex: -1, position: "absolute", top: 0, left: 0 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
