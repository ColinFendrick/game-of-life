import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import Cell from './Cell'

class Gameboard extends Component {
  render () {
    const Repeat = props => {
      let items = []
      for (let i = 0; i < props.width; i++) {
        items.push(props.children(i))
      }
      return <div>{items}</div>
    }

    return <div className='Gameboard'>
      <Repeat width={store.size.width}>
        {index => <Cell key={index} pos={[index, 3]} />}
      </Repeat>
    </div>
  }
}

export default observer(Gameboard)
