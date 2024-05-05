import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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

function App() {
  return (
    <Container>
      <ReactConversation
        qas={[
          [
            () => {
              return <Typography>What's your first name ?</Typography>;
            },
            (ref) => (
              <TextField
                inputRef={ref}
                required
                id="first-name"
                label="Type your first name"
                InputLabelProps={{ shrink: true }}
              />
            ),
          ],

          [
            () => {
              return <Typography>How long have you been doing Frontend developement ?</Typography>;
            },
            (ref) => (
              <TextField
                inputRef={ref}
                required
                id="frontend-experience"
                label="Years of experience"
                InputLabelProps={{ shrink: true }}
                type="number"
              />
            ),
          ],

          [
            () => {
              return <Typography>Have you ever hold a leadership position ?</Typography>;
            },
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
            () => {
              return <Typography>Do you need a working sponsorship ?</Typography>;
            },
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
            () => {
              return <Typography>When could you start earlier ?</Typography>;
            },

            (ref) => <TextField inputRef={ref} required id="starting-time" type="date" />,
          ],

          [
            () => {
              return <Typography>What are your salary expectation ?</Typography>;
            },
            (ref) => (
              <TextField
                inputRef={ref}
                required
                id="salary"
                label="Salary expectation"
                InputLabelProps={{ shrink: true }}
                type="number"
              />
            ),
          ],

          [
            () => {
              return <Typography>What technologies do you have a professional experience with ?</Typography>;
            },
            (ref) => (
              <Autocomplete
                style={{ width: 500 }}
                ref={ref}
                multiple
                id="technos"
                options={[
                  { language: "javascript", techno: "react" },
                  { language: "typescript", techno: "angular" },
                  { language: "php", techno: "laravel" },
                  { language: "python", techno: "Django" },
                  { language: "Node.js", techno: "Express" },
                ]}
                getOptionLabel={(option) => option.techno}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Techos" />}
              />
            ),
          ],
        ]}
      />
    </Container>
  );
}

export default App;
