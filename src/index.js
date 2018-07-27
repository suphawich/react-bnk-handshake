import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    // primary: { main: pink[300] }, // Purple and green play nicely together.
    // secondary: { main: pink[500] }, // This is just green.A700 as hex.
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
