import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useReactConversation } from "./ReactConversationProvider";

export const useFocusOnMount = () => {
  const { setFocus } = useFormContext();

  const { currentPosition, getInputNode, getPositionInConversation } = useReactConversation();

  useEffect(() => {
    // postion of the question in the conversation
    const currentNode = getInputNode(currentPosition);
    const questionPosition = getPositionInConversation(currentNode);
    if (questionPosition === currentPosition && "name" in currentNode) {
      console.log("setFocus", currentNode.name);
      setFocus(currentNode.name);
      // currentNode?.querySelector?.("input")?.focus();
    }
  }, []);
};
