import { RefCallBack } from "react-hook-form";

export const decorateCallbackRef =
  (componentRef: React.MutableRefObject<HTMLElement | undefined>) =>
  (refCallback: RefCallBack) =>
  (...element: Parameters<RefCallBack>) => {
    refCallback(element[0]);
    componentRef.current = element[0];
  };
