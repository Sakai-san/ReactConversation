import { FC } from "react";
import { useForm, Controller, SubmitHandler, useFormContext, ControllerProps } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type ControlledTextFieldProps = Pick<ControllerProps, "name"> & { TextFieldProps: TextFieldProps };

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
          //          inputRef={ref}
          helperText={fieldState.error?.message ?? " "}
          error={Boolean(fieldState.error)}
          required
          disabled={isSubmitting}
          {...TextFieldProps}
        />
      )}
    />
  );
};

export default ControlledTextField;
