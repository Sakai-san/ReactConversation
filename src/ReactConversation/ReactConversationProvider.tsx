import { Dispatch, SetStateAction, createContext, useContext, MutableRefObject } from "react";

interface ReactConversationContext {
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
  inputNodes: MutableRefObject<Array<HTMLElement> | undefined>;
  setInputNode: (position: number, newNode: HTMLElement) => void;
  getInputNode: (position: number) => HTMLElement;
  getPositionInConversation: (node: HTMLElement) => number;
}

const ReactConversationContext = createContext<ReactConversationContext>({} as ReactConversationContext);

function useReactConversation() {
  const context = useContext(ReactConversationContext);
  if (!Object.keys(context).length) {
    throw new Error(
      "Programming Error: Application has to be wrapped around ReactConversationProvier. Context not found."
    );
  }
  return context;
}

export { ReactConversationContext, useReactConversation };
