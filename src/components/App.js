import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Gameboard from './Gameboard'
import Intro from './Intro'

class App extends Component {
  render () {
    return <Router>
      <div>
        <Route exact path='/' component={Intro} />
        <Route exact path='/game' component={Gameboard} />
      </div>
    </Router>
  }
}

export default App
