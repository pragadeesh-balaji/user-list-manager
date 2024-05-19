import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize({
        width: window.innerWidth,
        height: window.height,
      });
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return size;
};
