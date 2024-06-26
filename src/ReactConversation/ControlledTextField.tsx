import { ReactElement } from "react";
import { Controller, useFormContext, UseControllerProps, FieldPath, FieldValues } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useFocusOnMount } from "./useFocusOnMount";
import { useReactConversation } from "./ReactConversationProvider";
import { decorateCallbackRef } from "./utils";

type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<UseControllerProps<TFieldValues, TName>, "name" | "control" | "defaultValue"> & {
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
  const { setInputNode, currentPosition } = useReactConversation();

  const {
    control,
    formState: { isSubmitting },
  } = formContext;

  useFocusOnMount(name);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field }, fieldState }) => (
        <TextField
          {...field}
          inputRef={decorateCallbackRef(currentPosition)(setInputNode)(ref)}
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
