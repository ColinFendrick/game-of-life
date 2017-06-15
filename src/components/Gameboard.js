import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import Cell from './Cell'

class Gameboard extends Component {
  render () {
    const Repeat = props => {
      let items = []
      for (let i = 0; i <= props.rows; i++) {
        for (let j = 0; j <= props.cols; j++) {
          items.push(props.children(i, j))
        }
      }

      return <div className='Gameboard'>
        <div className='game'>
          {items}
        </div>
      </div>
    }

    return <Repeat rows={store.size.rows} cols={store.size.cols}>
      {(i, j) => <Cell key={[i, j]} pos={[i, j]} />}
    </Repeat>
  }
}

export default observer(Gameboard)
