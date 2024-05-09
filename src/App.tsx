//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";
import { z } from "zod";
import { useForm, Controller, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import ReactConversation from "./ReactConversation";
import ControlledTextField from "./ReactConversation/ControlledTextField";
import ControlledAutocomplete from "./ReactConversation/ControlledAutocomplete";

const defaultValues = {
  gender: "",
  firstName: "",
  yearsExperience: "",
  hasHoldLearship: "",
  sponsorshipNeeded: "",
  startingTime: "",
  expectedSalary: "",
  technos: [],
};

const schema = z.object({
  gender: z.string().min(1, "Gender is required"),
  firstName: z.string().min(1, "First name is required"),
  yearsExperience: z.string().min(1, "Years of experience is required"),
  hasHoldLearship: z.string().min(1, "Leadership position is required"),
  sponsorshipNeeded: z.string().min(1, "Sponsorship needed is required"),
  startingTime: z.string().min(1, "Starting time is required"),
  expectedSalary: z.string().min(1, "Salary expectation is required"),
  technos: z.array(z.string()),
});

type ValidationSchema = z.infer<typeof schema>;

function App() {
  const formContext = useForm<ValidationSchema>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const { handleSubmit, control, formState } = formContext;
  const { isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    await Promise.resolve(console.log("data", data));
  };

  return (
    <Container>
      <FormProvider {...formContext}>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <ReactConversation
            qas={[
              [
                <Typography>What's your gender ?</Typography>,
                (ref) => (
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field, fieldState }) => (
                      <FormControl error={Boolean(fieldState.error)} variant="filled">
                        <FormLabel id="demo-error-radios">Gender</FormLabel>
                        <RadioGroup {...field} row aria-labelledby="demo-error-radios" name="gender">
                          <FormControlLabel value="female" control={<Radio disabled={isSubmitting} />} label="Female" />
                          <FormControlLabel value="male" control={<Radio disabled={isSubmitting} />} label="Male" />
                          <FormControlLabel value="other" control={<Radio disabled={isSubmitting} />} label="Other" />
                        </RadioGroup>
                        <FormHelperText>{fieldState.error?.message ?? " "}</FormHelperText>
                      </FormControl>
                    )}
                  />
                ),
              ],

              [
                <Typography>What's your first name ?</Typography>,
                <ControlledTextField
                  name="firstName"
                  TextFieldProps={{ label: "First name", id: "first-name", required: true }}
                />,
              ],

              [
                <Typography>How long have you been doing Frontend developement ?</Typography>,
                <ControlledTextField
                  name="yearsExperience"
                  TextFieldProps={{
                    label: "Years of experience",
                    id: "years-experience",
                    required: true,
                    type: "number",
                  }}
                />,
              ],

              [
                <Typography>Have you ever hold a leadership position ?</Typography>,
                (ref) => (
                  <Controller
                    control={control}
                    name="hasHoldLearship"
                    render={({ field, fieldState }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel ref={ref} value="no" disabled={isSubmitting} control={<Radio />} label="No" />
                        <FormControlLabel value="yes" disabled={isSubmitting} control={<Radio />} label="Yes" />
                      </RadioGroup>
                    )}
                  />
                ),
              ],

              [
                <Typography>Do you need a working sponsorship ?</Typography>,
                (ref) => (
                  <Controller
                    control={control}
                    name="sponsorshipNeeded"
                    render={({ field, fieldState }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel ref={ref} value="no" disabled={isSubmitting} control={<Radio />} label="No" />
                        <FormControlLabel value="yes" disabled={isSubmitting} control={<Radio />} label="Yes" />
                      </RadioGroup>
                    )}
                  />
                ),
              ],

              [
                <Typography>When could you start earliest ?</Typography>,
                <ControlledTextField
                  name="startingTime"
                  TextFieldProps={{
                    id: "starting-time",
                    label: "Starting time",
                    type: "date",
                    required: true,
                    InputLabelProps: { shrink: true },
                  }}
                />,
              ],

              [
                <Typography>What are your salary expectation ?</Typography>,
                <ControlledTextField
                  name="expectedSalary"
                  TextFieldProps={{
                    id: "salary",
                    label: "Salary expectation",
                    type: "number",
                    required: true,
                  }}
                />,
              ],

              [
                <Typography>What technologies do you have a professional experience with ?</Typography>,

                <ControlledAutocomplete
                  name="technos"
                  AutocompleteProps={{
                    id: "technos",
                    options: [
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
                    ],
                  }}
                />,

                /*(ref) => (
                  <Controller
                    control={control}
                    name="technos"
                    render={({ field, fieldState }) => (
                      <Autocomplete
                        {...field}
                        onChange={(event, value, reason, details) => field.onChange(value)}
                        style={{ width: 500 }}
                        multiple
                        disabled={isSubmitting}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputRef={ref}
                            label="Techos"
                            helperText={fieldState.error?.message ?? " "}
                            error={Boolean(fieldState.error)}
                          />
                        )}
                      />
                    )}
                  />
                )*/
              ],
            ]}
          />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={!isValid}>
            Submit
          </LoadingButton>
        </Box>
      </FormProvider>
    </Container>
  );
}

export default App;
