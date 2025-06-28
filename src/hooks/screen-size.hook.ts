"use client";
import { useEffect, useState } from "react";

import type { ScreenSize } from "@/types";

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    };

    handleResize();

    window?.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
}
