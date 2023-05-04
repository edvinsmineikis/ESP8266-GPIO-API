import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import PinControl from './PinControl';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const theme = createTheme({
  palette: {
    primary: {
      light: '#35afea',
      main: '#039be5',
      dark: '#026ca0'
    },
    secondary: {
      light: '#ea605d',
      main: '#e53935',
      dark: '#a02725'
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div">
              ESP8266 NodeMCU GPIO Control Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid2 container spacing={1} style={{ marginTop: "16px"}}>
          {[...Array(5)].map((e, i) => (
            <Grid2 xs="auto">
              <PinControl pinNumber={i} />
            </Grid2>
          ))}
          {[...Array(2)].map((e, i) => (
            <Grid2 xs="auto">
              <PinControl pinNumber={i+9} />
            </Grid2>
          ))}
          {[...Array(5)].map((e, i) => (
            <Grid2 xs="auto">
              <PinControl pinNumber={i+12} />
            </Grid2>
          ))}
        </Grid2>
      </div>
    </ThemeProvider>
  );
}

export default App;
