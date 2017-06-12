import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import Cell from './Cell'

class Gameboard extends Component {
  render () {
    const cells = () => {
      for (let i = 0; i <= store.size.width; i++) {
        return <Cell key={i} test={i} />
      }
    }
    return <div className='Gameboard'>
      {cells}
      <Cell pos={[4, 9]} />
      <Cell pos={[6, 1]} />
      <Cell pos={[1, 1]} />
      <Cell pos={[1, 3]} />
      <Cell pos={[7, 4]} />
    </div>
  }
}

export default observer(Gameboard)
