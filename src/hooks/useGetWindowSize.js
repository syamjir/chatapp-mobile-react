import { useEffect, useState } from "react";

function useGetWindowSize() {
  //768 px for md in tailwind
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(function () {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default useGetWindowSize;
