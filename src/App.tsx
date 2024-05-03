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
import FormLabel from "@mui/material/FormLabel";

function App() {
  return (
    <Container>
      <ReactConversation
        qas={[
          [
            () => {
              return <Typography>What's your first name ? </Typography>;
            },
            (ref) => <TextField inputRef={ref} required id="outlined-required" label="Type your first name" />,
          ],

          [
            () => {
              return <Typography>How long have you been doing Frontend developement ? </Typography>;
            },
            (ref) => <TextField inputRef={ref} required id="outlined-required" label="Years of experience" />,
          ],

          [
            () => {
              return <Typography>Have you ever hold a leadership position ?</Typography>;
            },
            (ref) => (
              <FormControl ref={ref}>
                <FormLabel id="demo-row-radio-buttons-group-label">Held a leader position</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>
            ),
          ],

          [
            () => {
              return <Typography>Do you need a working sponsorship ? </Typography>;
            },
            (ref) => <TextField inputRef={ref} required id="outlined-required" label="Years of experience" />,
          ],

          [
            () => {
              return <Typography>When could you start earlier ? </Typography>;
            },

            (ref) => <TextField inputRef={ref} required id="outlined-required" label="Years of experience" />,
          ],

          [
            () => {
              return <Typography>What are your salary expectation ? </Typography>;
            },
            (ref) => <TextField inputRef={ref} required id="outlined-required" label="Years of experience" />,
          ],
        ]}
      />
    </Container>
  );
}

export default App;
