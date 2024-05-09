import { Ref, ReactElement, forwardRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

export type QAProps = {
  qa: [ReactElement, ((ref?: Ref<HTMLElement>) => ReactElement) | ReactElement];
};

const QA = forwardRef<HTMLElement, QAProps>(({ qa }, ref) => {
  const [question, renderAnswer] = qa;

  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack>
        <Box alignSelf="start">{question}</Box>
        <Box alignSelf="end">{typeof renderAnswer === "function" ? renderAnswer(ref) : renderAnswer}</Box>
      </Stack>
    </Paper>
  );
});

export default QA;
