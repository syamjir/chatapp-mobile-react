import { useEffect, useRef } from "react";

export function useFocusInput() {
  const elRef = useRef(null);
  useEffect(function () {
    elRef.current.focus();
  }, []);
  return elRef;
}
