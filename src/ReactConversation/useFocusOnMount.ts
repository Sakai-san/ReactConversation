import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useReactConversation } from "./ReactConversationProvider";

export const useFocusOnMount = (name) => {
  const { setFocus } = useFormContext();
  const { currentPosition, getInputNode, getPositionInConversation } = useReactConversation();

  useEffect(() => {
    // postion of the question in the conversation
    const currentNode = getInputNode(currentPosition);
    const questionPosition = getPositionInConversation(currentNode);
    if (questionPosition === currentPosition) {
      //      currentNode?.querySelector?.("input")?.focus();

      setFocus(name);
    }
  }, []);
};
