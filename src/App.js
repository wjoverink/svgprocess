import React, { Component } from 'react'
import MainPage from './components/MainPage/MainPage'
import CssBaseline from '@material-ui/core/CssBaseline'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MainPage />
      </React.Fragment>
    )
  }
}



export default App
