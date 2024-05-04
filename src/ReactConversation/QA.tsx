import React, { ReactElement, forwardRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export type QAProps = {
  qa: [() => ReactElement, (ref: React.Ref<HTMLElement>) => ReactElement];
};

const QA = forwardRef<HTMLElement, QAProps>(({ qa }, ref) => {
  const [renderQuestion, renderAnswer] = qa;

  return (
    <Stack>
      <Box alignSelf="start">{renderQuestion()}</Box>
      <Box alignSelf="end">{renderAnswer(ref)}</Box>
    </Stack>
  );
});

export default QA;
