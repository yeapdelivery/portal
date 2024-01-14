"use client";

import { useState, useEffect } from "react";

interface ScreenSize {
  width?: number;
  height?: number;
}

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 1024,
    height: 700,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
