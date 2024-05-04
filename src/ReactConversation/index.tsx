import React, { FC, ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";

type ReactConversationProps = {
  qas: Array<[() => ReactNode, (ref: React.Ref) => ReactNode]>;
};

const renderRow = (row: [() => ReactNode, (ref: React.Ref) => ReactNode], index: number) => {
  const [renderQuestion, renderAnswer] = row;

  return (
    <Stack key={index}>
      <Box alignSelf="start">{renderQuestion()}</Box>
      <Box alignSelf="end">{renderAnswer()}</Box>
    </Stack>
  );
};

const ReactConversation: FC<ReactConversationProps> = ({ qas }) => {
  const [position, setPostion] = useState(0);

  const questionsCount = qas.length;
  const next = () => (questionsCount === position - 1 ? undefined : setPostion((position) => position + 1));

  const asked = qas.slice(0, position + 1);

  return (
    <Stack useFlexGap gap={2}>
      {asked.map((qa, index) => renderRow(qa, index))}

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
    </Stack>
  );
};

export default ReactConversation;
