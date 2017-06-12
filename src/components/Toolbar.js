import React from 'react'

export default () => {
  const _button = () => {
    console.log('hey buddy')
  }
  return <div className='Toolbar'>
    <div className='tool-input'>
      <input type='range' min='0' max='120' />
      Width
    </div>
    <div className='tool-input'>
      <input type='range' min='0' max='120' />
      Height
    </div>
    <div className='tool-button'>
      <img src='https://image.flaticon.com/icons/png/512/27/27185.png'
        style={{'width': '100%'}}
        onClick={() => _button()}
      />
    </div>
  </div>
}
