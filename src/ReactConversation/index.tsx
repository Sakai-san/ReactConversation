import React, { FC, ReactNode, useState, cloneElement, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";
// import QA from "./QA";

type ReactConversationProps = {
  qas: Array<[() => ReactNode, (ref: React.Ref) => ReactNode]>;
};

const ReactConversation: FC<ReactConversationProps> = ({ qas }) => {
  const [position, setPostion] = useState(0);
  const questionsCount = qas.length;

  const thomasRefs = useRef([]);
  // refs is re-initialized each time the component re-renders
  const refs: Array<HTMLElement> = [];

  const next = () => setPostion((position) => position + 1);

  const asked = qas.slice(0, position + 1);

  console.log("refs", refs);
  console.log("thomasRefs", thomasRefs);

  useEffect(() => {
    if (thomasRefs.current[position]) {
      console.log("thomasRefs.current[position]", thomasRefs.current[position]);

      thomasRefs.current[position].focus?.();
    }
  }, [qas, position]);

  return (
    <Stack useFlexGap gap={2}>
      {asked.map((qa, index) => {
        const [renderQuestion, renderAnswer] = qa;
        return (
          <Stack key={index}>
            <Box alignSelf="start">{renderQuestion()}</Box>
            <Box alignSelf="end">
              {renderAnswer((el: HTMLElement) => {
                thomasRefs.current[index] = el;
                refs[index] = el;
              })}
            </Box>
          </Stack>
        );
      })}
      {position < questionsCount - 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button sx={{}} onClick={next} variant="contained" endIcon={<ChevronRightIcon />}>
            Next
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default ReactConversation;
