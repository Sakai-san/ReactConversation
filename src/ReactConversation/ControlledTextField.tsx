import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ControlledInput } from "./types";

type ControlledTextFieldProps = ControlledInput<{ TextFieldProps: TextFieldProps }>;

const ControlledTextField: FC<ControlledTextFieldProps> = ({ name, TextFieldProps }) => {
  const formContext = useFormContext();
  const {
    control,
    formState: { isSubmitting },
  } = formContext;
  console.log("formContext", formContext);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          helperText={fieldState.error?.message ?? " "}
          error={Boolean(fieldState.error)}
          disabled={isSubmitting}
          {...TextFieldProps}
        />
      )}
    />
  );
};

export default ControlledTextField;
