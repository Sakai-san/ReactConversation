import {
  PropsWithChildren,
  FC,
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  useRef,
  MutableRefObject,
} from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";
import QA, { QAProps } from "./QA";

interface ReactConversationContext {
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
  inputNodes: MutableRefObject<Array<HTMLElement> | undefined>;
  setInputNode: (position: number, newNode: HTMLElement) => void;
}

const ReactConversationContext = createContext<ReactConversationContext>({} as ReactConversationContext);

function ReactConversationProvider({ children }: PropsWithChildren) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const inputNodes = useRef<Array<HTMLElement>>([]);
  const setInputNode = (position: number, newNode: HTMLElement) =>
    inputNodes.current.map((node, index) => (index !== position ? node : newNode));

  return (
    <ReactConversationContext.Provider
      value={{
        currentPosition,
        setCurrentPosition,
        inputNodes,
        setInputNode,
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

type ReactConversationProps = {
  qas: Array<QAProps["qa"]>;
};

const ReactConversation: FC<ReactConversationProps> = ({ qas }) => {
  const formContext = useFormContext();
  const { currentPosition, setCurrentPosition } = useReactConversation();
  const questionsCount = qas.length;

  const next = () => setCurrentPosition((prevState) => prevState + 1);

  const asked = qas.slice(0, currentPosition + 1);

  const {
    control,
    formState: { isSubmitting },
  } = formContext;

  console.group("ReactConversation");
  console.log("formContext", formContext);
  console.log("formContext.control._fields", formContext.control._fields);
  console.log("formContext.formState", formContext.getFieldState("yearsExperience", formContext.formState));
  console.log("formContext.getValues()", formContext.getValues());
  console.groupEnd();

  return (
    <ReactConversationProvider>
      <Stack useFlexGap gap={3}>
        {asked.map((qa, index) => (
          <QA key={index} qa={qa} />
        ))}
        {currentPosition < questionsCount - 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={next} variant="outlined" endIcon={<ChevronRightIcon />}>
              Next
            </Button>
          </Box>
        )}
      </Stack>
    </ReactConversationProvider>
  );
};

export default ReactConversation;
export { ReactConversationContext, ReactConversationProvider, useReactConversation };
