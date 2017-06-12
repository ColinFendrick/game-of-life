import React, { Component } from 'react'
import Gameboard from './Gameboard'
import Header from './Header'
import Toolbar from './Toolbar'

class App extends Component {
  render () {
    return <div>
      <Header />
      <Gameboard />
      <Toolbar />
    </div>
  }
}

export default App
