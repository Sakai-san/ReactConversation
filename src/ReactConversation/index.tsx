import React, { FC, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";
import QA from "./QA";

type ReactConversationProps = {
  qas: Array<[() => ReactNode, (ref: React.Ref) => ReactNode]>;
};

const ReactConversation: FC<ReactConversationProps> = ({ qas }) => {
  const [position, setPostion] = useState(0);

  // refs is re-initialized each time the component re-renders
  const refs: Array<HTMLElement> = [];

  const questionsCount = qas.length;
  const next = () => setPostion((position) => position + 1);

  const asked = qas.slice(0, position + 1);

  return (
    <Stack useFlexGap gap={2}>
      {asked.map((qa, index) => (
        <QA
          ref={(el: HTMLElement) => {
            refs[index] = el;
          }}
          key={index}
          qa={qa}
        />
      ))}
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
