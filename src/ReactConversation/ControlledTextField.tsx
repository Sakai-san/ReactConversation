import { FC } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";

type ControlledTextFieldProps = {};

const ControlledTextField: FC<ControlledTextFieldProps> = () => {
  return (
    <Controller
      control={control}
      name="firstName"
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          inputRef={ref}
          helperText={fieldState.error?.message ?? " "}
          error={Boolean(fieldState.error)}
          required
          disabled={isSubmitting}
          id="first-name"
          label="First name"
        />
      )}
    />
  );
};

export default ControlledTextField;
