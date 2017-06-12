import React from 'react'
import store from '../store'
import { observer } from 'mobx-react'

const Intro = ({ history }) => (
  <div className='Intro'>
    <div>Set initial conditions</div>
    <div>
      <input type='number' min='0' name='hello' />Initial cells
    </div>
    <button onClick={() => history.push('/game')}>
      Click me to start
    </button>
  </div>
)

export default observer(Intro)
