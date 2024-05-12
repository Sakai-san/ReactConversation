import { useEffect } from "react";
import { useReactConversation } from "./ReactConversationProvider";

export const useFocusOnMount = () => {
  const { currentPosition, getInputNode } = useReactConversation();

  useEffect(() => {
    getInputNode(currentPosition)?.querySelector?.("input")?.focus();
  }, []);
};
