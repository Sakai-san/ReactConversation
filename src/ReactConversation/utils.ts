import { MutableRefObject } from "react";
import { RefCallBack } from "react-hook-form";

export const decorateCallbackRef =
  (componentRef: MutableRefObject<HTMLElement | undefined>) =>
  (refCallback: RefCallBack) =>
  (...element: Parameters<RefCallBack>) => {
    refCallback(element[0]);
    componentRef.current = element[0];
  };
