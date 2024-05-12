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
}

const ReactConversationContext = createContext<ReactConversationContext>({} as ReactConversationContext);

function ReactConversationProvider({ children }: PropsWithChildren) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const inputNodes = useRef<Array<HTMLElement>>([]);
  const setInputNode = (position: number, newNode: HTMLElement) => {
    inputNodes.current = inputNodes.current.map((node, index) => (index === position ? newNode : node));
  };
  const getInputNode = (position: number) => inputNodes.current[position];

  console.group("ReactConversationContext");
  console.log("inputNodes", inputNodes);
  console.groupEnd();

  return (
    <ReactConversationContext.Provider
      value={{
        currentPosition,
        setCurrentPosition,
        inputNodes,
        setInputNode,
        getInputNode,
      }}
    >
      {children}
    </ReactConversationContext.Provider>
  );
}

function useReactConversation() {
  const context = useContext(ReactConversationContext);
  if (!Object.keys(context).length) {
    throw new Error("Programming Error: Application has to be wrapped in SceneMapsContext. Context not found.");
  }
  return context;
}

export { ReactConversationContext, useReactConversation };
