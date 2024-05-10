import { ReactElement } from "react";
import { Controller, useFormContext, UseControllerProps, FieldPath, FieldValues, RefCallBack } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useFocusOnMount } from "./useFocusOnMount";
import { decorateCallbackRef } from "./utils";

type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<UseControllerProps<TFieldValues, TName>, "name" | "defaultValue"> & {
  TextFieldProps: TextFieldProps;
};

const ControlledTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  defaultValue,
  TextFieldProps,
}: ControlledTextFieldProps<TFieldValues, TName>): ReactElement<ControlledTextFieldProps<TFieldValues, TName>> => {
  const formContext = useFormContext();
  const {
    control,
    formState: { isSubmitting },
  } = formContext;

  const componentRef = useFocusOnMount();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          ref={decorateCallbackRef(componentRef)(field.ref)}
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
