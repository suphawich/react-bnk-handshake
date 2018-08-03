import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import yellow from '@material-ui/core/colors/yellow'

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[400] }, // Purple and green play nicely together.
    secondary: { main: yellow[700] }, // This is just green.A700 as hex.
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App mobileSize={320} />
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
