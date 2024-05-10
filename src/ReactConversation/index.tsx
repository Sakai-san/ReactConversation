import { FC, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";
import QA, { QAProps } from "./QA";

type ReactConversationProps = {
  qas: Array<QAProps["qa"]>;
};

const ReactConversation: FC<ReactConversationProps> = ({ qas }) => {
  const formContext = useFormContext();
  const [position, setPostion] = useState(0);
  const questionsCount = qas.length;

  // refs is re-initialized each time the component re-renders and populated in batch after rendering
  const refs: Array<HTMLElement> = [];

  const next = () => setPostion((position) => position + 1);

  const asked = qas.slice(0, position + 1);

  const {
    control,
    formState: { isSubmitting },
  } = formContext;

  console.log("formContext", formContext);
  console.log("formContext.control._fields", formContext.control._fields);
  console.log("formContext.formState", formContext.getFieldState("yearsExperience", formContext.formState));
  console.log("formContext.getValues()", formContext.getValues());

  return (
    <Stack useFlexGap gap={3}>
      {asked.map((qa, index) => (
        <QA
          key={index}
          qa={qa}
          ref={(el: HTMLElement) => {
            refs[index] = el;
          }}
        />
      ))}
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
