//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";
import { useState } from "react";
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
import Button from "@mui/material/Button";
import ReactConversation from "./ReactConversation";

const defaultValues = {
  firstName: "",
  yearsExperience: "",
  gender: "",
};

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  yearsExperience: z.string().min(1, "Years of experience is required"),
  gender: z.string().min(1, "Gender is required"),
});

type ValidationSchema = z.infer<typeof schema>;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, reset, watch, control, register, ...others } = useForm<ValidationSchema>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setIsLoading(true);
    await console.log(data);
    setIsLoading(true);
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
                        <FormControlLabel value="female" control={<Radio disabled={isLoading} />} label="Female" />
                        <FormControlLabel value="male" control={<Radio disabled={isLoading} />} label="Male" />
                        <FormControlLabel value="other" control={<Radio disabled={isLoading} />} label="Other" />
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
                      disabled={isLoading}
                      id="first-name"
                      label="First name"
                      inputProps={{ autoComplete: "new-password" }}
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
                      disabled={isLoading}
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
                <RadioGroup ref={ref} row name="leadership-position-radio-buttons-group">
                  <FormControlLabel value="no" disabled={isLoading} control={<Radio />} label="No" />
                  <FormControlLabel value="yes" disabled={isLoading} control={<Radio />} label="Yes" />
                </RadioGroup>
              ),
            ],

            [
              <Typography>Do you need a working sponsorship ?</Typography>,
              (ref) => (
                <RadioGroup ref={ref} row name="sponsorship-radio-buttons-group">
                  <FormControlLabel value="no" disabled={isLoading} control={<Radio />} label="No" />
                  <FormControlLabel value="yes" disabled={isLoading} control={<Radio />} label="Yes" />
                </RadioGroup>
              ),
            ],

            [
              <Typography>When could you start earlier ?</Typography>,
              (ref) => (
                <TextField
                  inputRef={ref}
                  disabled={isLoading}
                  required
                  name="startingTime"
                  id="starting-time"
                  type="date"
                />
              ),
            ],

            [
              <Typography>What are your salary expectation ?</Typography>,
              (ref) => (
                <TextField
                  inputRef={ref}
                  required
                  disabled={isLoading}
                  name="expectedSalary"
                  id="salary"
                  label="Salary expectation"
                  InputLabelProps={{ shrink: true }}
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
                  disabled={isLoading}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} inputRef={ref} label="Techos" />}
                />
              ),
            ],
          ]}
        />
        {Boolean(others.formState.errors) && (
          <Button type="submit" variant="contained">
            Submit
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default App;
