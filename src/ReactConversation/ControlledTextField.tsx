import { FC } from "react";
import { Controller, useFormContext, ControllerProps } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type ControlledTextFieldProps = Pick<ControllerProps, "name"> & { TextFieldProps: TextFieldProps };

const ControlledTextField: FC<ControlledTextFieldProps> = ({ name, TextFieldProps }) => {
  const formContext = useFormContext();
  const {
    control,
    formState: { isSubmitting },
  } = formContext;
  console.log("formContext", formContext);
  console.log("gender state", formContext.control.getFieldState("gender", formContext.formState));
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
