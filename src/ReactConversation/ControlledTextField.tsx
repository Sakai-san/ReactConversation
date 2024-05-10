import { ReactElement, useEffect, useRef } from "react";
import { Controller, useFormContext, UseControllerProps, FieldPath, FieldValues, RefCallBack } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

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

  const reference = useRef<HTMLElement>();

  const decorateCallbackRef = (refCallback: RefCallBack) => (element: Parameters<RefCallBack>) => {
    refCallback(element[0]);
    reference.current = element[0];
  };

  useEffect(() => {
    reference.current?.querySelector?.("input")?.focus();
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          ref={decorateCallbackRef(field.ref)}
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
