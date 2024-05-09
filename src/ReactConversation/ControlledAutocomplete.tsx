import { ReactElement } from "react";
import { Controller, useFormContext, UseControllerProps, FieldPath, FieldValues } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

type ControlledAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<UseControllerProps<TFieldValues, TName>, "name" | "defaultValue"> & {
  AutocompleteProps: AutocompleteProps;
};

const ControlledAutocomplete = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  defaultValue,
  AutocompleteProps,
}: ControlledAutocompleteProps<TFieldValues, TName>): ReactElement<
  ControlledAutocompleteProps<TFieldValues, TName>
> => {
  const formContext = useFormContext();
  const {
    control,
    formState: { isSubmitting },
  } = formContext;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          onChange={(event, value, reason, details) => field.onChange(value)}
          style={{ width: 500 }}
          multiple
          id="technos"
          options={[
            "react",
            "Java EE",
            "Spring Boot",
            "php",
            "laravel",
            "symphony",
            "Django",
            "nodejs",
            "Express",
            "Angular",
            "AngularJS",
            "python",
            "TypeScript",
          ]}
          disabled={isSubmitting}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Techos"
              helperText={fieldState.error?.message ?? " "}
              error={Boolean(fieldState.error)}
            />
          )}
          {...AutocompleteProps}
        />
      )}
    />
  );

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
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

export default ControlledAutocomplete;
