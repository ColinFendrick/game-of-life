import React, { Component } from 'react'
import store from '../store'
import { observer } from 'mobx-react'

class Toolbar extends Component {
  componentDidMount () {
    store.setActive()
  }

  componentDidUpdate () {
    store.setActive()
  }

  render () {
    return <div className='Toolbar'>
      <div className='tool-input'>
        <input type='range' min='30' max='120'
          value={store.size.width}
          defaultValue='30'
          onChange={e => store.change('cols', e.target.value)}
        />
      Width {store.size.cols}
      </div>
      <div className='tool-input'>
        <input type='range' min='30' max='120'
          value={store.size.height}
          defaultValue='30'
          onChange={e => store.change('rows', e.target.value)}
        />
      Height {store.size.rows}
      </div>
      <div className='tool-input'>
        <input type='range' min='10' max='2000'
          value={store.timer}
          onChange={e => store.setTimer(e.target.value)}
        />
      Timer {store.timer}(ms)
      </div>
      <div className='tool-input'>
        <input type='range' min='0' max={(store.size.rows - 3) * (store.size.cols - 3)}
          value={store.random}
          onChange={e => store.setRandom(e.target.value)} />
          Cells {store.random}
      </div>
      <div className='tool-button'>
        <img src='https://image.flaticon.com/icons/png/512/27/27185.png'
          style={{'width': '100%'}}
          onClick={() => store.start()}
        />
      </div>
    </div>
  }
}

export default observer(Toolbar)
