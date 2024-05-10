import { useEffect, useRef } from "react";

export const useFocusOnMount = () => {
  const componentRef = useRef<HTMLElement>();

  useEffect(() => {
    componentRef.current?.querySelector?.("input")?.focus();
  }, []);

  return componentRef;
};
