import { ReactElement } from "react";
import { Controller, useFormContext, UseControllerProps, FieldPath, FieldValues } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { useFocusOnMount } from "./useFocusOnMount";
import { decorateCallbackRef } from "./utils";

type ControlledAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<UseControllerProps<TFieldValues, TName>, "name" | "control" | "defaultValue"> & {
  AutocompleteProps: Omit<AutocompleteProps<TFieldValues[TName], true, false, false>, "renderInput">;
  TextFieldProps: TextFieldProps;
};

const ControlledAutocomplete = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  defaultValue,
  AutocompleteProps,
  TextFieldProps,
}: ControlledAutocompleteProps<TFieldValues, TName>): ReactElement<
  ControlledAutocompleteProps<TFieldValues, TName>
> => {
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
        <Autocomplete
          {...field}
          onChange={(event, value, reason, details) => field.onChange(value)}
          multiple
          disabled={isSubmitting}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              ref={decorateCallbackRef(componentRef)(field.ref)}
              helperText={fieldState.error?.message ?? " "}
              error={Boolean(fieldState.error)}
              {...TextFieldProps}
            />
          )}
          {...AutocompleteProps}
        />
      )}
    />
  );
};

export default ControlledAutocomplete;
