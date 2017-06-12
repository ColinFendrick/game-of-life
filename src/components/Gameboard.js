import React, { Component } from 'react'

class Gameboard extends Component {
  render () {
    return <div className='Gameboard'>
      <div />
      <div style={{'gridColumn': '19'}} />
      <div style={{'gridRow': '3'}} />
    </div>
  }
}

export default Gameboard
