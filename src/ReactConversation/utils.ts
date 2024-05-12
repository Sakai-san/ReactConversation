import { RefCallBack } from "react-hook-form";

export const decorateCallbackRef =
  (currentPosition: number) =>
  (setInputNode: (position: number, newNode: HTMLElement) => void) =>
  (refCallback: RefCallBack) =>
  (...element: Parameters<RefCallBack>) => {
    refCallback(element[0]);
    setInputNode(currentPosition, element[0]);
  };
