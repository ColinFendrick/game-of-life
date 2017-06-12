import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import Cell from './Cell'

class Gameboard extends Component {
  render () {
    const Repeat = props => {
      let items = []
      for (let i = 0; i <= props.width; i++) {
        for (let j = 0; j <= props.height; j++) {
          items.push(props.children(i, j))
        }
      }
      return <div>{items}</div>
    }

    return <div className='Gameboard'>
      <Repeat width={store.size.width} height={store.size.height}>
        {(i, j) => <Cell key={[i, j]} pos={[i, j]} />}
      </Repeat>
    </div>
  }
}

export default observer(Gameboard)
