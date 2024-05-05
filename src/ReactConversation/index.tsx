import { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import QA, { QAProps } from "./QA";

type ReactConversationProps = {
  qas: Array<QAProps["qa"]>;
};

const ReactConversation: FC<ReactConversationProps> = ({ qas }) => {
  const [position, setPostion] = useState(0);
  const questionsCount = qas.length;

  // refs is re-initialized each time the component re-renders and populated in batch after rendering
  const refs: Array<HTMLElement> = [];

  const next = () => setPostion((position) => position + 1);

  const asked = qas.slice(0, position + 1);

  useEffect(() => {
    if (refs[position]) {
      refs[position].focus();
    }
  }, [qas, position]);

  return (
    <Stack useFlexGap gap={3}>
      {asked.map((qa, index) => {
        const [question, renderAnswer] = qa;

        return (
          <Paper key={index} elevation={4} sx={{ p: 2 }}>
            <Stack>
              <Box alignSelf="start">{question}</Box>
              <Box alignSelf="end">
                {renderAnswer((el: HTMLElement) => {
                  refs[index] = el;
                })}
              </Box>
            </Stack>
          </Paper>
        );
        // return (
        //   <QA
        //     key={index}
        //     qa={qa}
        //     ref={(el: HTMLElement) => {
        //       refs[index] = el;
        //     }}
        //   />
        // );
      })}
      {position < questionsCount - 1 && (
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
  );
};

export default ReactConversation;
