import { Ref, ReactElement, forwardRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export type QAProps = {
  qa: (ref: Ref<HTMLElement>) => [ReactElement, ReactElement];
};

const QA = forwardRef<HTMLElement, QAProps>(({ qa }, ref) => {
  const [question, answer] = qa(ref);

  return (
    <Stack>
      <Box alignSelf="start">{question}</Box>
      <Box alignSelf="end">{answer}</Box>
    </Stack>
  );
});

export default QA;
