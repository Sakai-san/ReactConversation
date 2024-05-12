// import { useEffect, useRef } from "react";
// import { useReactConversation } from "./ReactConversationProvider";

// export const useFocusOnMount = () => {
//   const componentRef = useRef<HTMLElement>();

//   const { currentPosition, getInputNode } = useReactConversation();

//   useEffect(() => {
//     //    getInputNode(currentPosition)?.querySelector?.("input")?.focus();
//     componentRef.current?.querySelector?.("input")?.focus();
//   }, []);
//   return componentRef;
// };

import { useEffect } from "react";
import { useReactConversation } from "./ReactConversationProvider";

export const useFocusOnMount = () => {
  const { currentPosition, getInputNode } = useReactConversation();

  useEffect(() => {
    getInputNode(currentPosition)?.querySelector?.("input")?.focus();
  }, [currentPosition]);
};
