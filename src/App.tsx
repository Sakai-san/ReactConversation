//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";

import ReactConversation from "./ReactConversation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";

const defaultValues = {
  firstName: "",
  yearsExperience: "",
};

function App() {
  const { handleSubmit, reset, watch, control, register, ...others } = useForm({ defaultValues });

  const onSubmit = (data) => console.log(data);

  console.log("others", others);

  return (
    <Container>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <ReactConversation
          qas={[
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
                <FormControl>
                  <RadioGroup ref={ref} row name="leadership-position-radio-buttons-group">
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </FormControl>
              ),
            ],

            [
              <Typography>Do you need a working sponsorship ?</Typography>,
              (ref) => (
                <FormControl>
                  <RadioGroup ref={ref} row name="sponsorship-radio-buttons-group">
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </FormControl>
              ),
            ],

            [
              <Typography>When could you start earlier ?</Typography>,
              (ref) => <TextField inputRef={ref} required name="startingTime" id="starting-time" type="date" />,
            ],

            [
              <Typography>What are your salary expectation ?</Typography>,
              (ref) => (
                <TextField
                  inputRef={ref}
                  required
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
