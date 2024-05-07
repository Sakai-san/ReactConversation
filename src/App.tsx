//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";
import { z } from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import ReactConversation from "./ReactConversation";

const defaultValues = {
  gender: "",
  firstName: "",
  yearsExperience: "",
  hasHoldLearship: "",
  sponsorshipNeeded: "",
  startingTime: "",
};

const schema = z.object({
  gender: z.string().min(1, "Gender is required"),
  firstName: z.string().min(1, "First name is required"),
  yearsExperience: z.string().min(1, "Years of experience is required"),
  hasHoldLearship: z.string().min(1, "Leadership position is required"),
  sponsorshipNeeded: z.string().min(1, "Sponsorship needed is required"),
  startingTime: z.string().min(1, "Starting time is required"),
});

type ValidationSchema = z.infer<typeof schema>;

function App() {
  const {
    handleSubmit,
    reset,
    watch,
    control,
    register,
    formState: { isSubmitting, isValid },
    ...others
  } = useForm<ValidationSchema>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    await Promise.resolve(console.log("data", data));
  };

  console.log("others", others);

  return (
    <Container>
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
                      <FormLabel ref={ref} id="demo-error-radios">
                        Gender
                      </FormLabel>
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
              (ref) => (
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
              ),
            ],

            [
              <Typography>How long have you been doing Frontend developement ?</Typography>,
              (ref) => (
                <Controller
                  control={control}
                  name="yearsExperience"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      helperText={fieldState.error?.message ?? " "}
                      error={Boolean(fieldState.error)}
                      required
                      disabled={isSubmitting}
                      id="frontend-experience"
                      label="Years of experience"
                      type="number"
                    />
                  )}
                />
              ),
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
              (ref) => (
                <Controller
                  control={control}
                  name="startingTime"
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      inputRef={ref}
                      helperText={fieldState.error?.message ?? " "}
                      error={Boolean(fieldState.error)}
                      required
                      disabled={isSubmitting}
                      id="starting-time"
                      label="Starting time"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              ),
            ],

            [
              <Typography>What are your salary expectation ?</Typography>,
              (ref) => (
                <TextField
                  inputRef={ref}
                  required
                  disabled={isSubmitting}
                  name="expectedSalary"
                  id="salary"
                  label="Salary expectation"
                  type="number"
                />
              ),
            ],

            [
              <Typography>What technologies do you have a professional experience with ?</Typography>,
              (ref) => (
                <Autocomplete
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
                  renderInput={(params) => <TextField {...params} inputRef={ref} label="Techos" />}
                />
              ),
            ],
          ]}
        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} disabled={!isValid}>
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
}

export default App;
