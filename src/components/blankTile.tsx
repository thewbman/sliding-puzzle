"use client";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

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
      <div className="icon-wrapper">
        <VisibilityIcon className="visibility-icon" />
        <VisibilityOffIcon className="visibility-off-icon" />
        <ThumbUpIcon className="thumb-up-icon" />
      </div>
    </div>
  );
}
