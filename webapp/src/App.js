import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import PinControl from './PinControl';

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
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div">
              ESP8266 NodeMCU Control Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <PinControl />
      </div>
    </ThemeProvider>
  );
}

export default App;
