import React from 'react'
import store from '../store'
import { observer } from 'mobx-react'

export default observer(() => {
  const _button = () => {
    console.log('hey buddy')
  }
  return <div className='Toolbar'>
    <div className='tool-input'>
      <input type='range' min='0' max='120'
        value={store.size.width}
        onChange={e => store.change('cols', e.target.value)}
      />
      Width {store.size.cols}
    </div>
    <div className='tool-input'>
      <input type='range' min='0' max='120'
        value={store.size.height}
        onChange={e => store.change('rows', e.target.value)}
      />
      Height {store.size.rows}
    </div>
    <div className='tool-button'>
      <img src='https://image.flaticon.com/icons/png/512/27/27185.png'
        style={{'width': '100%'}}
        onClick={() => _button()}
      />
    </div>
  </div>
})
