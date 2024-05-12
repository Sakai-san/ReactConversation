import {
  FC,
  PropsWithChildren,
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
import { ReactConversationContext } from "./ReactConversationProvider";

type ReactConversationProps = {
  qas: Array<QAProps["qa"]>;
};

const ReactConversation: FC<ReactConversationProps> = ({ qas }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const inputNodes = useRef<Array<HTMLElement>>([]);
  const setInputNode = (position: number, newNode: HTMLElement) => {
    inputNodes.current = inputNodes.current.map((node, index) => (index === position ? newNode : node));
  };
  const getInputNode = (position: number) => inputNodes.current[position];

  console.group("ReactConversationContext");
  console.log("inputNodes", inputNodes);
  console.groupEnd();

  const formContext = useFormContext();

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
    <ReactConversationContext.Provider
      value={{
        currentPosition,
        setCurrentPosition,
        inputNodes,
        setInputNode,
        getInputNode,
      }}
    >
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
    </ReactConversationContext.Provider>
  );
};

export default ReactConversation;
