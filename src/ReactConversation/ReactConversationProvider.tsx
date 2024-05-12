import {
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  useRef,
  MutableRefObject,
} from "react";

interface ReactConversationContext {
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
  inputNodes: MutableRefObject<Array<HTMLElement> | undefined>;
  setInputNode: (position: number, newNode: HTMLElement) => void;
  getInputNode: (position: number) => HTMLElement;
  getPositionInConversation: (node: HTMLElement) => number;
}

const ReactConversationContext = createContext<ReactConversationContext>({} as ReactConversationContext);

function ReactConversationProvider({ children }: PropsWithChildren) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const inputNodes = useRef<Array<HTMLElement>>([]);
  const setInputNode = (position: number, newNode: HTMLElement) => {
    inputNodes.current[position] = newNode;
  };
  const getInputNode = (position: number) => inputNodes.current[position];
  const getPositionInConversation = (node: HTMLElement) =>
    inputNodes.current.findIndex((inputNode) => inputNode === node);

  return (
    <ReactConversationContext.Provider
      value={{
        currentPosition,
        setCurrentPosition,
        inputNodes,
        setInputNode,
        getInputNode,
        getPositionInConversation,
      }}
    >
      {children}
    </ReactConversationContext.Provider>
  );
}

function useReactConversation() {
  const context = useContext(ReactConversationContext);
  if (!Object.keys(context).length) {
    throw new Error(
      "Programming Error: Application has to be wrapped around ReactConversationProvier. Context not found."
    );
  }
  return context;
}

export { ReactConversationContext, ReactConversationProvider, useReactConversation };
