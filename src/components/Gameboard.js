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
      <Cell test='hey' />
    </div>
  }
}

export default observer(Gameboard)
