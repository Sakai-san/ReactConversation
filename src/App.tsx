//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";

import { useState } from "react";
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

function App() {
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>();
  const updateFormValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  console.log("formValues", formValues);
  return (
    <Container>
      <Box component="form" noValidate autoComplete="off">
        <ReactConversation
          qas={[
            (ref) => [
              <Typography>What's your first name ?</Typography>,
              <TextField
                inputRef={ref}
                required
                name="firstName"
                id="first-name"
                label="First name"
                inputProps={{ autoComplete: "new-password" }}
              />,
            ],

            (ref) => [
              <Typography>How long have you been doing Frontend developement ?</Typography>,
              <TextField
                inputRef={ref}
                required
                name="yearsExperience"
                id="frontend-experience"
                label="Years of experience"
                type="number"
              />,
            ],

            (ref) => [
              <Typography>Have you ever hold a leadership position ?</Typography>,
              <FormControl>
                <RadioGroup ref={ref} row name="leadership-position-radio-buttons-group">
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>,
            ],

            (ref) => [
              <Typography>Do you need a working sponsorship ?</Typography>,
              <FormControl>
                <RadioGroup ref={ref} row name="sponsorship-radio-buttons-group">
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>,
            ],

            (ref) => [
              <Typography>When could you start earlier ?</Typography>,
              <TextField inputRef={ref} required name="startingTime" id="starting-time" type="date" />,
            ],

            (ref) => [
              <Typography>What are your salary expectation ?</Typography>,
              <TextField
                inputRef={ref}
                required
                name="expectedSalary"
                id="salary"
                label="Salary expectation"
                InputLabelProps={{ shrink: true }}
                type="number"
              />,
            ],

            (ref) => [
              <Typography>What technologies do you have a professional experience with ?</Typography>,
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
              />,
            ],
          ]}
        />
      </Box>
    </Container>
  );
}

export default App;
